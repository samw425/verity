import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How It Works — Verity AI",
    description: "Learn how Verity AI audits your AI visibility, diagnoses missing data, and generates AI-readable infrastructure.",
};

export default function HowItWorksPage() {
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
                        <a href="/how-it-works" className="text-slate-900 font-medium">How it Works</a>
                        <a href="/about" className="text-slate-600 hover:text-slate-900 transition-colors">About</a>
                        <a href="/faq" className="text-slate-600 hover:text-slate-900 transition-colors">FAQ</a>
                    </div>
                </div>
            </nav>

            {/* Content */}
            <main className="pt-32 pb-24 px-6">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-4xl font-semibold text-slate-900 leading-tight tracking-tight mb-6 text-center">
                        How Verity AI Works
                    </h1>
                    <p className="text-lg text-slate-600 text-center mb-16 max-w-2xl mx-auto">
                        Four steps from invisible to verified. No guesswork, no manipulation—just structured truth.
                    </p>

                    {/* Steps */}
                    <div className="space-y-16">
                        {/* Step 1 */}
                        <div className="flex gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                                    <span className="text-xl font-bold text-indigo-600">1</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 mb-3">Deep Scan</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Enter your business URL, target city, and primary keyword. Our system queries AI search
                                    systems to understand how—and if—your business appears when customers ask for recommendations.
                                </p>
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
                                    <strong className="text-slate-900">What we check:</strong> Top 3 presence, correct hours,
                                    keyword visibility, location accuracy, and data completeness.
                                </div>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                                    <span className="text-xl font-bold text-indigo-600">2</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 mb-3">Diagnosis</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    You receive a 0-100 AI Readiness Score with a detailed breakdown of what&apos;s working
                                    and what&apos;s missing. Every point is explainable—no black boxes.
                                </p>
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
                                    <strong className="text-slate-900">Common issues:</strong> Missing structured data,
                                    inconsistent NAP (Name, Address, Phone), no machine-readable service descriptions.
                                </div>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                                    <span className="text-xl font-bold text-indigo-600">3</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 mb-3">Entity Sync</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Unlock your custom AI infrastructure files: an llms.txt file and LocalBusiness JSON-LD schema.
                                    These files tell AI systems exactly who you are, what you do, and why you&apos;re trustworthy.
                                </p>
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
                                    <strong className="text-slate-900">One-time cost:</strong> $197 for both files with
                                    clear installation instructions. No subscriptions required.
                                </div>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center">
                                    <span className="text-xl font-bold text-indigo-600">4</span>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-slate-900 mb-3">Defense</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">
                                    Optionally subscribe to Sentry Monitoring. We re-scan your visibility weekly and alert you
                                    if your score drops or new issues emerge. Stay visible as AI systems evolve.
                                </p>
                                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600">
                                    <strong className="text-slate-900">Optional:</strong> $79/month for continuous monitoring
                                    and alerts. Cancel anytime.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-20 text-center">
                        <a
                            href="/"
                            className="inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                        >
                            Run Your Free Scan
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
