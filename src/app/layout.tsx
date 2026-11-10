import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "katex/dist/katex.min.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GATE DA 2027 Prep",
  description: "Previous-year GATE DA questions, solutions, topic analysis and study roadmap",
};

const NAV = [
  { href: "/", label: "Analysis" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/subjects", label: "Learn" },
  { href: "/formulas", label: "Formulas" },
  { href: "/practice", label: "Practice" },
  { href: "/questions", label: "Past papers Qs" },
  { href: "/syllabus", label: "Syllabus" },
  { href: "/papers", label: "Papers" },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-3">
            <Link href="/" className="shrink-0 font-bold">
              GATE <span className="text-accent">DA</span> 2027
            </Link>
            <nav className="flex gap-1 text-sm">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="rounded-md px-2.5 py-1.5 whitespace-nowrap text-muted hover:bg-card hover:text-foreground"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <footer className="mx-auto max-w-6xl px-4 pb-10 text-xs text-muted">
          Questions and official answer keys come from the GATE organising institutes (IISc 2024, IIT Roorkee 2025,
          IIT Guwahati 2026). Solutions and topic tags were generated with AI. Where a solution is marked
          &quot;unverified&quot;, check it against the official key.
        </footer>
      </body>
    </html>
  );
}
