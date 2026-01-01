import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Agent A - The Advisor (Audit Agent)
// Per PRD: Search + Gemini analysis + Deterministic scoring

interface ScanRequest {
    url: string;
    city: string;
    keyword: string;
}

interface ScanResult {
    score: number;
    breakdown: {
        topThreePresence: { found: boolean; points: number };
        hoursVisible: { found: boolean; points: number };
        keywordPresent: { found: boolean; points: number };
        cityPresent: { found: boolean; points: number };
    };
    aiSummary: string;
    missingData: string[];
    timestamp: string;
    status: 'completed' | 'failed';
    error?: string;
}

// Extract business name from URL
function extractBusinessName(url: string): string {
    try {
        const hostname = new URL(url).hostname;
        const name = hostname.replace(/^www\./, '').split('.')[0];
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    } catch {
        return 'Business';
    }
}

// Real web search using fetch (works without API keys)
async function searchWeb(query: string): Promise<string[]> {
    console.log(`[Agent A] Searching: "${query}"`);

    try {
        // Use DuckDuckGo HTML search (no API key required)
        const encodedQuery = encodeURIComponent(query);
        const response = await fetch(
            `https://html.duckduckgo.com/html/?q=${encodedQuery}`,
            {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Search failed: ${response.status}`);
        }

        const html = await response.text();

        // Extract result snippets using regex (simple parsing)
        const resultRegex = /<a class="result__snippet"[^>]*>([^<]+)<\/a>/g;
        const titleRegex = /<a class="result__a"[^>]*>([^<]+)<\/a>/g;

        const snippets: string[] = [];
        let match;

        // Get titles
        while ((match = titleRegex.exec(html)) !== null && snippets.length < 10) {
            snippets.push(match[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
        }

        // Get snippets
        while ((match = resultRegex.exec(html)) !== null && snippets.length < 15) {
            snippets.push(match[1].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
        }

        if (snippets.length === 0) {
            // Fallback if parsing failed
            return [
                `Searching for: ${query}`,
                'Results may include local business listings',
                'Hours and contact information may be available',
            ];
        }

        return snippets;
    } catch (error) {
        console.error('[Agent A] Search error:', error);
        // Return fallback results for demo
        return [
            `Search performed for: ${query}`,
            'Unable to retrieve live results - using analysis mode',
        ];
    }
}

// Scrape basic info from the business website
async function scrapeWebsite(url: string): Promise<{ title: string; content: string; hasHours: boolean; hasAddress: boolean }> {
    console.log(`[Agent A] Scraping: ${url}`);

    try {
        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            },
        });

        if (!response.ok) {
            throw new Error(`Scrape failed: ${response.status}`);
        }

        const html = await response.text();

        // Extract title
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const title = titleMatch ? titleMatch[1] : '';

        // Get text content (simplified)
        const textContent = html
            .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
            .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .substring(0, 5000);

        // Check for common patterns
        const hasHours = /\b(hours|open|close|am|pm|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i.test(textContent);
        const hasAddress = /\b(\d+\s+\w+\s+(st|street|ave|avenue|rd|road|blvd|boulevard|dr|drive))\b/i.test(textContent);

        return { title, content: textContent, hasHours, hasAddress };
    } catch (error) {
        console.error('[Agent A] Scrape error:', error);
        return { title: '', content: '', hasHours: false, hasAddress: false };
    }
}

// Call Gemini to analyze
async function analyzeWithGemini(
    businessName: string,
    city: string,
    keyword: string,
    searchResults: string[],
    websiteData: { title: string; content: string; hasHours: boolean; hasAddress: boolean }
): Promise<{
    inTopThree: boolean;
    hoursVisible: boolean;
    keywordPresent: boolean;
    cityPresent: boolean;
    summary: string;
    missingData: string[];
}> {
    const geminiApiKey = process.env.GEMINI_API_KEY;

    // Check if business appears in search results
    const businessInResults = searchResults.some(r =>
        r.toLowerCase().includes(businessName.toLowerCase())
    );

    // Check if keyword and city appear in website content
    const keywordInContent = websiteData.content.toLowerCase().includes(keyword.toLowerCase());
    const cityInContent = websiteData.content.toLowerCase().includes(city.toLowerCase());

    if (!geminiApiKey) {
        // Deterministic analysis without Gemini
        console.log('[Agent A] No Gemini API key - using deterministic analysis');

        const missingData: string[] = [];
        if (!websiteData.hasHours) missingData.push('Business hours not clearly displayed');
        if (!websiteData.hasAddress) missingData.push('Physical address not found');
        if (!keywordInContent) missingData.push(`Service keyword "${keyword}" not prominent on website`);
        if (!cityInContent) missingData.push(`City "${city}" not mentioned on website`);
        if (!businessInResults) missingData.push('Business not appearing in top search results');

        return {
            inTopThree: businessInResults,
            hoursVisible: websiteData.hasHours,
            keywordPresent: keywordInContent,
            cityPresent: cityInContent,
            summary: `Analysis for ${businessName}: ${businessInResults ? 'Found in search results.' : 'Not found in top search results.'} ${websiteData.hasHours ? 'Hours are visible.' : 'Hours are not clearly displayed.'} ${keywordInContent ? 'Service keyword present.' : 'Service keyword could be more prominent.'} ${cityInContent ? 'Location is mentioned.' : 'Location is not clearly stated.'}`,
            missingData,
        };
    }

    try {
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are a GEO (Generative Engine Optimization) analyst. Analyze this business's AI search visibility.

Business: ${businessName}
Target City: ${city}
Target Keyword: ${keyword}
Website Title: ${websiteData.title}

Search Results for "Best ${keyword} in ${city}":
${searchResults.slice(0, 5).join('\n')}

Website Content Sample:
${websiteData.content.substring(0, 1000)}

Determine:
1. Is the business appearing in the top 3 search results? (true/false)
2. Are business hours visible and clear? (true/false)
3. Is the target keyword "${keyword}" present and prominent? (true/false)
4. Is the city "${city}" clearly mentioned? (true/false)

Respond ONLY with valid JSON:
{
  "inTopThree": boolean,
  "hoursVisible": boolean,
  "keywordPresent": boolean,
  "cityPresent": boolean,
  "summary": "2-3 sentence professional analysis",
  "missingData": ["array", "of", "specific", "issues"]
}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }

        throw new Error('Failed to parse Gemini response');
    } catch (error) {
        console.error('[Agent A] Gemini error:', error);
        // Fallback to deterministic analysis
        return {
            inTopThree: businessInResults,
            hoursVisible: websiteData.hasHours,
            keywordPresent: keywordInContent,
            cityPresent: cityInContent,
            summary: `Analysis for ${businessName} in ${city}. AI analysis partially completed.`,
            missingData: ['Full AI analysis could not be completed - please retry'],
        };
    }
}

// Calculate deterministic score per PRD
function calculateScore(analysis: {
    inTopThree: boolean;
    hoursVisible: boolean;
    keywordPresent: boolean;
    cityPresent: boolean;
}): { score: number; breakdown: ScanResult['breakdown'] } {
    const breakdown = {
        topThreePresence: {
            found: analysis.inTopThree,
            points: analysis.inTopThree ? 40 : 0
        },
        hoursVisible: {
            found: analysis.hoursVisible,
            points: analysis.hoursVisible ? 20 : 0
        },
        keywordPresent: {
            found: analysis.keywordPresent,
            points: analysis.keywordPresent ? 20 : 0
        },
        cityPresent: {
            found: analysis.cityPresent,
            points: analysis.cityPresent ? 20 : 0
        },
    };

    const score =
        breakdown.topThreePresence.points +
        breakdown.hoursVisible.points +
        breakdown.keywordPresent.points +
        breakdown.cityPresent.points;

    return { score: Math.min(score, 100), breakdown };
}

export async function POST(request: NextRequest) {
    try {
        const body: ScanRequest = await request.json();
        const { url, city, keyword } = body;

        if (!url || !city || !keyword) {
            return NextResponse.json(
                { error: 'Missing required fields: url, city, keyword' },
                { status: 400 }
            );
        }

        console.log(`[Agent A] Starting scan for ${url} | ${keyword} in ${city}`);

        const businessName = extractBusinessName(url);

        // Step 1: Search the web (per PRD)
        const query1 = `Best ${keyword} in ${city}`;
        const query2 = `${businessName} ${city} reviews`;

        const [results1, results2, websiteData] = await Promise.all([
            searchWeb(query1),
            searchWeb(query2),
            scrapeWebsite(url),
        ]);

        const allResults = [...results1, ...results2];

        // Step 2: Analyze with Gemini (or deterministic fallback)
        const analysis = await analyzeWithGemini(businessName, city, keyword, allResults, websiteData);

        // Step 3: Calculate deterministic score (per PRD - system calculated, not Gemini)
        const { score, breakdown } = calculateScore(analysis);

        const result: ScanResult = {
            score,
            breakdown,
            aiSummary: analysis.summary,
            missingData: analysis.missingData,
            timestamp: new Date().toISOString(),
            status: 'completed',
        };

        console.log(`[Agent A] Scan complete. Score: ${score}/100`);

        return NextResponse.json(result);
    } catch (error) {
        console.error('[Agent A] Scan failed:', error);
        return NextResponse.json(
            {
                score: 0,
                breakdown: {
                    topThreePresence: { found: false, points: 0 },
                    hoursVisible: { found: false, points: 0 },
                    keywordPresent: { found: false, points: 0 },
                    cityPresent: { found: false, points: 0 },
                },
                aiSummary: 'Scan failed. Please check the URL and try again.',
                missingData: ['Scan could not be completed'],
                timestamp: new Date().toISOString(),
                status: 'failed',
                error: error instanceof Error ? error.message : 'Unknown error',
            },
            { status: 500 }
        );
    }
}
