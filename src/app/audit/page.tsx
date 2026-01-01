"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    status: string;
    businessUrl: string;
    city: string;
    keyword: string;
}

export default function AuditPage() {
    const router = useRouter();
    const [result, setResult] = useState<ScanResult | null>(null);

    useEffect(() => {
        const stored = sessionStorage.getItem('scanResult');
        if (stored) {
            setResult(JSON.parse(stored));
        } else {
            router.push('/');
        }
    }, [router]);

    if (!result) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'text-emerald-600';
        if (score >= 50) return 'text-amber-600';
        return 'text-slate-600';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Strong';
        if (score >= 50) return 'Moderate';
        return 'Needs Work';
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="/" className="text-xl font-semibold text-slate-900 tracking-tight">
                        Verity
                    </a>
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                        <a href="/how-it-works" className="text-slate-600 hover:text-slate-900">How it Works</a>
                        <a href="/about" className="text-slate-600 hover:text-slate-900">About</a>
                        <a href="/faq" className="text-slate-600 hover:text-slate-900">FAQ</a>
                    </div>
                </div>
            </nav>

            <main className="py-12 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                            AI Visibility Audit
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-900 mb-1">
                            {result.businessUrl}
                        </h1>
                        <p className="text-sm text-slate-500">
                            {result.keyword} in {result.city}
                        </p>
                    </div>

                    {/* Score Card */}
                    <div className="bg-slate-50 border border-slate-200 p-8 mb-8">
                        <div className="text-center mb-8">
                            <div className={`text-6xl font-bold ${getScoreColor(result.score)} mb-2`}>
                                {result.score}
                            </div>
                            <div className="text-sm text-slate-500 uppercase tracking-wide">
                                AI Readiness Score · {getScoreLabel(result.score)}
                            </div>
                        </div>

                        {/* Breakdown */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 border border-slate-200 bg-white">
                                <div className={`text-2xl font-semibold mb-1 ${result.breakdown.topThreePresence.found ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {result.breakdown.topThreePresence.points}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Top 3 Presence</div>
                            </div>
                            <div className="text-center p-4 border border-slate-200 bg-white">
                                <div className={`text-2xl font-semibold mb-1 ${result.breakdown.hoursVisible.found ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {result.breakdown.hoursVisible.points}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Hours Visible</div>
                            </div>
                            <div className="text-center p-4 border border-slate-200 bg-white">
                                <div className={`text-2xl font-semibold mb-1 ${result.breakdown.keywordPresent.found ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {result.breakdown.keywordPresent.points}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">Keyword Found</div>
                            </div>
                            <div className="text-center p-4 border border-slate-200 bg-white">
                                <div className={`text-2xl font-semibold mb-1 ${result.breakdown.cityPresent.found ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {result.breakdown.cityPresent.points}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wide">City Present</div>
                            </div>
                        </div>
                    </div>

                    {/* AI Summary */}
                    <div className="bg-slate-50 border border-slate-200 p-6 mb-8">
                        <h2 className="text-sm font-medium text-slate-900 uppercase tracking-wide mb-3">Analysis</h2>
                        <p className="text-slate-600 leading-relaxed">{result.aiSummary}</p>
                    </div>

                    {/* Missing Data */}
                    {result.missingData.length > 0 && (
                        <div className="bg-amber-50 border border-amber-200 p-6 mb-8">
                            <h2 className="text-sm font-medium text-amber-800 uppercase tracking-wide mb-3">Missing Data</h2>
                            <ul className="space-y-2">
                                {result.missingData.map((item, index) => (
                                    <li key={index} className="flex items-start gap-2 text-amber-700">
                                        <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* CTA - Unlock Files */}
                    <div className="border border-slate-200 p-6 text-center">
                        <h2 className="text-lg font-semibold text-slate-900 mb-2">Fix Your AI Visibility</h2>
                        <p className="text-slate-600 mb-6 max-w-md mx-auto">
                            Get your custom llms.txt and JSON-LD schema files.
                            Install them on your site so AI systems can find and recommend you.
                        </p>
                        <button className="px-8 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                            Unlock Files — $197
                        </button>
                        <p className="text-xs text-slate-400 mt-4">One-time purchase. No subscription.</p>
                    </div>

                    {/* Metadata */}
                    <div className="mt-8 text-center text-xs text-slate-400">
                        <p>Scan completed: {new Date(result.timestamp).toLocaleString()}</p>
                        <p>Model: Gemini 1.5 Flash</p>
                    </div>
                </div>
            </main>
        </div>
    );
}
