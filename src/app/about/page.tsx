import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About — Verity AI",
    description: "The Infrastructure of Truth. Verity AI bridges physical business reality with the global AI brain.",
};

export default function AboutPage() {
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
                        <a href="/about" className="text-slate-900 font-medium">About</a>
                        <a href="/faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-2xl mx-auto">
                    <h1 className="text-4xl font-semibold text-slate-900 leading-tight tracking-tight mb-6">
                        The Infrastructure of Truth.
                    </h1>

                    <div className="prose prose-slate max-w-none">
                        <p className="text-lg text-slate-600 leading-relaxed mb-8">
                            Verity AI exists to bridge physical business reality with the global AI brain.
                        </p>

                        <p className="text-slate-600 leading-relaxed mb-6">
                            For decades, SEO optimized links. The game was about manipulating search engine algorithms
                            to rank higher in a list of blue links. That era is ending.
                        </p>

                        <p className="text-slate-600 leading-relaxed mb-6">
                            Today&apos;s customers don&apos;t browse—they ask. They open ChatGPT, Gemini, or Perplexity
                            and say: &quot;Who&apos;s the best dentist near me?&quot; The AI responds with a direct recommendation,
                            not a list of links.
                        </p>

                        <p className="text-slate-600 leading-relaxed mb-6">
                            <strong className="text-slate-900">GEO optimizes facts.</strong> We structure business data
                            so AI systems can trust it, verify it, and recommend it with confidence.
                        </p>

                        <div className="border-t border-slate-200 pt-8 mt-8">
                            <h2 className="text-xl font-semibold text-slate-900 mb-4">What We Believe</h2>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Transparency over hype. Every score is explainable.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Data integrity is non-negotiable. We never fabricate signals.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span>Your business reality deserves AI representation.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
