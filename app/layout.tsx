import type { Metadata } from "next";
import Link from 'next/link';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quotes dashboard",
  description: "Dashboard annotating quotes with mistakes in them",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-white border-b border-gray-200">
          <nav className="max-w-6xl mx-auto px-6">
            <div className="flex items-center h-14">

              <ul className="flex items-center gap-6 text-sm font-medium text-gray-600">

                <li>
                  <Link
                    href="/"
                    className="hover:text-(--secondary) transition"
                  >
                    Quotes
                  </Link>
                </li>

                <li>
                  <Link
                    href="/problems"
                    className="hover:text-(--secondary) transition"
                  >
                    Quotes with problems
                  </Link>
                </li>

              </ul>

            </div>
          </nav>
        </header>
        <h1 className="text-5xl p-4 bg-zinc-50 uppercase">Dashboard</h1>
        {children}
      </body>
    </html>
  );
}
