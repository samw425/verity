# 🏛️ VERITY AI — PRODUCT REQUIREMENTS DOCUMENT (PRD)
**VERSION**: 4.0 — MEGA BLUEPRINT (Authoritative, Final for V1)
**PROJECT LEAD**: Antigravity
**STATUS**: Source of Truth

---

## 1. PRODUCT VISION & POSITIONING

Verity AI is not SEO.
Verity AI is not rank tracking.
Verity AI is not marketing software.

**Verity AI is infrastructure.**

Its purpose is to measure, explain, and generate the foundational data structures that large language models and AI search systems rely on when recommending real-world businesses.

The platform does not promise rankings.
It promises verifiability, clarity, and structure.

**Brand Promise:**
> "The Infrastructure of Truth."

Every output must be:
- Explainable
- Timestamped
- Reproducible
- Calm and factual

No fear-based language. No hype. No manipulation.

### Brand Naming Strategy
- **Logo**: Verity (standalone)
- **Product Name**: Verity AI
- **Example Copy**: "Verity AI is the infrastructure layer for AI search."
- **Long-term**: This lets us ride the AI wave now but drop "AI" later without rebranding trauma.

---

## 2. BRAND IDENTITY & DESIGN SYSTEM

The UI must feel closer to Stripe or a financial terminal than a growth tool.

**Visual Tone:**
- Stripe-like
- Medical-grade clean
- Neutral and authoritative

**Color System:**
- Backgrounds: Pure White and Slate-50
- Primary Actions: Indigo-600 (used sparingly)
- Success / Verified: Emerald-500
- Warnings / Missing Data: Amber-500
- Red is explicitly forbidden

**Typography:**
- Inter (Google Font)
- Body: 400
- Headers: 600
- Scores / Gauges: 800

**UI Rules:**
- Sharp corners
- 1px Slate-200 borders
- shadow-sm only
- No gradients
- No animations beyond subtle transitions

---

## 3. TECHNICAL ARCHITECTURE (ZERO-BUDGET ENFORCED)

No substitutions. No upgrades. No paid APIs.

| Component | Technology |
|:---|:---|
| **Frontend** | Next.js 14 (App Router) |
| **Backend & Database** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth — Magic Links only (no passwords, no OAuth) |
| **Payments** | Stripe Checkout + Webhooks (idempotent) |
| **AI** | Google Gemini 1.5 Flash (free tier only) |
| **Search** | DuckDuckGo via `duckduckgo_search` Python library |
| **Scraping** | Python `requests` + BeautifulSoup4 |
| **Email** | Resend (free tier only) |

**Rate Limits:**
- Maximum 3 scans per IP per day
- One active scan per user at a time

---

## 4. DATA MODEL & STORAGE RULES

**Users:**
- Linked to Supabase Auth
- Store: email, Stripe customer ID, subscription tier, creation timestamp

**Scans:**
- Immutable point-in-time snapshots
- Store: URL, city, keyword, score (0-100), AI summary, missing data, raw AI output, status, timestamp
- Never overwritten

**Assets:**
- Current unlocked state for a user
- Points to most recent generated version

**Asset Versions:**
- Every generation creates a new version
- Stores: llms.txt content, JSON-LD schema, creation timestamp
- Never deleted

**Feedback:**
- Captures bugs, feature requests, enterprise inquiries

---

## 5. AGENT SYSTEM (ANTIGRAVITY ORCHESTRATOR)

### Agent A — The Advisor (Audit Agent)
**Trigger:** User submits scan
**Process:**
1. Search: "Best [keyword] in [city]"
2. Search: "[Business Name] [City] reviews and hours"
3. Pass results to Gemini with GEO analyst instructions

**Scoring (System-calculated, not Gemini):**
| Factor | Points |
|:---|:---|
| Top 3 presence | 40 |
| Correct hours visible | 20 |
| Keyword present | 20 |
| City present | 20 |
| **Total** | 100 max |

### Agent B — The Architect (Fulfillment Agent)
**Trigger:** Stripe webhook confirms $197 payment
**Process:**
1. Scrape homepage and about page
2. Generate llms.txt and JSON-LD via Gemini
3. Validate structure
4. Create asset version
5. Unlock for user

### Agent C — The Sentry (Monitoring Agent)
**Trigger:** Weekly cron job
**Process:**
1. Re-run Agent A for Sentry subscribers
2. Compare scores
3. Alert if: score drops 10+ points OR falls below 50

---

## 6. FRONTEND PAGES

| Page | Purpose |
|:---|:---|
| **Home** | Hero + scan form |
| **Audit Result** | Score gauge + blurred files + CTA |
| **Dashboard** | My Files + Sentry status |
| **About** | "Infrastructure of Truth" positioning |
| **FAQ** | GEO education |
| **How It Works** | 4-step process |
| **White Glove** | Enterprise application |

---

## 7. PRICING

| Product | Price |
|:---|:---|
| Entity Infrastructure Pack | $197 one-time |
| Sentry Monitoring | $79/month |
| Enterprise Audit | $2,500 (manual invoice) |

---

## 8. EXECUTION ORDER

1. Initialize Next.js and Supabase
2. Implement auth and database schema
3. Build Agent A with deterministic scoring
4. Build Home and Audit pages
5. Integrate Stripe and Agent B
6. Build Dashboard, About, FAQ, How It Works
7. Implement Sentry monitoring
8. Enforce rate limits and failure handling

**No scope expansion. No paid services. No speculative features.**
**Revenue first. Iteration second.**
