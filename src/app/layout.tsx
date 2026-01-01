import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Verity AI — Get Found in Google AI Overview",
  description: "When customers ask Google, ChatGPT, or Gemini for the best in town, Verity makes sure the answer is you.",
  keywords: ["GEO", "Generative Engine Optimization", "AI search", "Google AI Overview", "local business"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased bg-white text-slate-900`} suppressHydrationWarning>
        {children}

        {/* Global Footer */}
        <footer className="border-t border-slate-200 bg-slate-50 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs text-slate-500 leading-relaxed">
              Verity AI is independent. Not affiliated with Google, OpenAI, or any AI provider.
              Scores reflect readiness—not guaranteed placements.
            </p>
            <p className="text-xs text-slate-400 mt-4">
              © 2026 Verity AI
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
