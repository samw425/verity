import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "FAQ — Verity AI",
    description: "Frequently asked questions about Generative Engine Optimization and Verity AI.",
};

const faqs = [
    {
        question: "Is this SEO?",
        answer: "No. This is Generative Engine Optimization (GEO). SEO optimizes for search engine algorithms and link rankings. GEO optimizes for AI systems that provide direct answers and recommendations. Different problem, different solution."
    },
    {
        question: "Is this a subscription?",
        answer: "The Entity Infrastructure Pack is a one-time $197 purchase. It includes your llms.txt file and structured data schema. Sentry Monitoring is an optional $79/month subscription for ongoing visibility tracking."
    },
    {
        question: "How fast does it work?",
        answer: "Scans are instant—you'll see your score within seconds. However, AI systems update their knowledge bases on their own schedules, typically over days to weeks. Our infrastructure files are designed to be discovered on their next crawl."
    },
    {
        question: "What is llms.txt?",
        answer: "llms.txt is an emerging standard—like robots.txt but for AI systems. It provides structured, machine-readable information about your business that AI can parse and trust. It includes your identity, services, operating hours, and verification signals."
    },
    {
        question: "Do I need to modify my website?",
        answer: "For the audit: No. We analyze publicly available information. For the infrastructure files: You'll add them to your website's root directory, similar to adding a favicon. Simple copy-paste with instructions provided."
    },
    {
        question: "Which AI systems does this work with?",
        answer: "Verity AI optimizes for the major AI search systems including ChatGPT, Google Gemini, Perplexity, Claude, and others. The structured data format we generate is designed to be universally parseable."
    },
    {
        question: "What if my score is low?",
        answer: "A low score means there's missing or unclear data about your business in the AI ecosystem. That's exactly what our infrastructure files fix. Many businesses start with low scores—that's why they need GEO."
    },
    {
        question: "Do you guarantee rankings?",
        answer: "No. We guarantee clarity, structure, and verifiability. Rankings in AI systems depend on many factors outside our control. What we provide is the foundational data that makes recommendation possible."
    }
];

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Navigation */}
            <nav className="border-b border-slate-200 bg-white/80 backdrop-blur-sm fixed top-0 left-0 right-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <span className="text-xl font-semibold text-slate-900">Verity</span>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">AI</span>
                    </a>
                    <div className="flex items-center gap-6 text-sm">
                        <a href="/how-it-works" className="text-slate-600 hover:text-slate-900 transition-colors">How it Works</a>
                        <a href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
                        <a href="/faq" className="text-slate-900 font-medium">FAQ</a>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-semibold text-slate-900 leading-tight tracking-tight mb-12">
                        Frequently Asked Questions
                    </h1>

                    <div className="space-y-8">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-slate-100 pb-8 last:border-0">
                                <h2 className="text-lg font-medium text-slate-900 mb-3">{faq.question}</h2>
                                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
