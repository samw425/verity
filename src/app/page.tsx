"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [city, setCity] = useState("");
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, city, keyword }),
      });

      const result = await response.json();

      sessionStorage.setItem('scanResult', JSON.stringify({
        ...result,
        businessUrl: url,
        city,
        keyword,
      }));

      router.push('/audit');
    } catch (error) {
      console.error('Scan failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
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

      {/* Hero */}
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight mb-6">
            Be the answer.
          </h1>
          <p className="text-lg text-slate-600 mb-12 max-w-xl mx-auto">
            When customers ask ChatGPT, Google, or any AI for the best in town—Verity makes sure it&apos;s you.
          </p>

          {/* Scan Form */}
          <form onSubmit={handleScan} className="bg-slate-50 border border-slate-200 p-6 md:p-8 shadow-sm">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="text-left">
                <label htmlFor="url" className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  Your Website
                </label>
                <input
                  id="url"
                  type="url"
                  placeholder="https://yourbusiness.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label htmlFor="city" className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  placeholder="San Francisco"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
              <div className="text-left">
                <label htmlFor="keyword" className="block text-xs font-medium text-slate-500 uppercase tracking-wide mb-2">
                  You Are A
                </label>
                <input
                  id="keyword"
                  type="text"
                  placeholder="dentist"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto px-8 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Scanning..." : "Check AI Visibility"}
            </button>
          </form>

          {/* Trust Bullets */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Free scan</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>No login required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Results in 30 seconds</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Shift Section */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-6">
            Search is changing. Fast.
          </h2>
          <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto mb-12">
            Google AI Overview, ChatGPT, and other AI systems don&apos;t show a list of links.
            They give one direct answer. If that answer isn&apos;t you, you&apos;re invisible.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">73%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">of searches will be AI-powered by 2026</div>
            </div>
            <div className="text-center p-6 bg-white border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">1.2B</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">ChatGPT queries per month</div>
            </div>
            <div className="text-center p-6 bg-white border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">47%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">never scroll past AI answers</div>
            </div>
            <div className="text-center p-6 bg-white border border-slate-200">
              <div className="text-3xl font-bold text-slate-900 mb-2">~0%</div>
              <div className="text-xs text-slate-500 uppercase tracking-wide">of local businesses are ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-6">
            Why AI can&apos;t find your business
          </h2>
          <p className="text-slate-600 text-center mb-12">
            AI systems don&apos;t crawl websites like Google used to. They need structured, machine-readable data to understand who you are. Without it, you don&apos;t exist.
          </p>

          <div className="space-y-6">
            <div className="flex gap-4 p-6 border border-slate-200 bg-white">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">No structured data</h3>
                <p className="text-slate-600 text-sm">Your website has information, but AI can&apos;t parse it. It needs schema markup and llms.txt files to understand your services, hours, and location.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 border border-slate-200 bg-white">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">Inconsistent information</h3>
                <p className="text-slate-600 text-sm">Your name, address, and phone number appear differently across the web. AI doesn&apos;t know which version to trust.</p>
              </div>
            </div>

            <div className="flex gap-4 p-6 border border-slate-200 bg-white">
              <div className="flex-shrink-0 w-10 h-10 bg-amber-100 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-slate-900 mb-1">No verification signals</h3>
                <p className="text-slate-600 text-sm">AI systems prioritize businesses they can verify. Without proper markup, there&apos;s no way to confirm you&apos;re legitimate.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-6">
            What Verity does for you
          </h2>
          <p className="text-slate-600 text-center mb-12">
            We don&apos;t promise rankings. We provide the infrastructure that makes recommendation possible.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-slate-200">
              <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">llms.txt File</h3>
              <p className="text-slate-600 text-sm">A machine-readable file that tells AI exactly who you are, what you do, and where you&apos;re located. Think robots.txt, but for AI.</p>
            </div>

            <div className="p-6 bg-white border border-slate-200">
              <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">JSON-LD Schema</h3>
              <p className="text-slate-600 text-sm">Structured markup that tells AI your hours, services, pricing model, and verified credentials. The format Google and other AI providers prefer.</p>
            </div>

            <div className="p-6 bg-white border border-slate-200">
              <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Visibility Score</h3>
              <p className="text-slate-600 text-sm">A 0-100 score that tells you exactly where you stand. We break down what&apos;s working and what&apos;s missing—no black boxes.</p>
            </div>

            <div className="p-6 bg-white border border-slate-200">
              <div className="w-10 h-10 bg-indigo-100 flex items-center justify-center mb-4">
                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">Monitoring Alerts</h3>
              <p className="text-slate-600 text-sm">We re-scan your visibility weekly and alert you if something changes. AI systems evolve—your infrastructure should keep up.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-slate-600">1</span>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Deep Scan</h3>
              <p className="text-sm text-slate-500">We query AI systems the way your customers do and measure what they see.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-slate-600">2</span>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Diagnosis</h3>
              <p className="text-sm text-slate-500">You get a score and a breakdown of exactly what&apos;s missing or unclear.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-slate-600">3</span>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Entity Sync</h3>
              <p className="text-sm text-slate-500">We generate custom files that AI systems can parse and trust.</p>
            </div>
            <div>
              <div className="w-12 h-12 bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <span className="text-lg font-semibold text-slate-600">4</span>
              </div>
              <h3 className="font-medium text-slate-900 mb-2">Defense</h3>
              <p className="text-sm text-slate-500">Weekly monitoring ensures you stay visible as AI systems evolve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-6 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-slate-600 mb-12">
            No subscriptions required. Get what you need, pay once.
          </p>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="p-8 bg-white border border-slate-200 text-left">
              <h3 className="font-semibold text-slate-900 mb-2">Entity Infrastructure Pack</h3>
              <div className="text-3xl font-bold text-slate-900 mb-4">$197 <span className="text-sm font-normal text-slate-500">one-time</span></div>
              <ul className="space-y-3 text-sm text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Custom llms.txt file
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  JSON-LD schema markup
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Installation instructions
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Lifetime access
                </li>
              </ul>
              <button className="w-full py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700">
                Get Started
              </button>
            </div>

            <div className="p-8 bg-white border border-slate-200 text-left">
              <h3 className="font-semibold text-slate-900 mb-2">Sentry Monitoring</h3>
              <div className="text-3xl font-bold text-slate-900 mb-4">$79 <span className="text-sm font-normal text-slate-500">/month</span></div>
              <ul className="space-y-3 text-sm text-slate-600 mb-6">
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weekly visibility scans
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Score change alerts
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Competitive benchmarking
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-emerald-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Cancel anytime
                </li>
              </ul>
              <button className="w-full py-3 border border-slate-200 text-slate-700 font-medium hover:bg-slate-50">
                Add Monitoring
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-6">
            The first business to be verified wins.
          </h2>
          <p className="text-slate-600 mb-8">
            AI doesn&apos;t show 10 results. It shows one answer.
            Make sure it&apos;s you before your competitor gets there first.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-8 py-3 bg-indigo-600 text-white font-medium hover:bg-indigo-700"
          >
            Check Your AI Visibility
          </button>
        </div>
      </section>
    </div>
  );
}
