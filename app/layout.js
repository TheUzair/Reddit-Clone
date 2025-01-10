import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reddit Clone | Share & Discover",
  description: "A modern Reddit clone built with Next.js, React, and Tailwind CSS. Share, discover, and engage with content across various categories.",
  keywords: ["reddit", "social media", "community", "forum", "discussion"],
  authors: [{ name: "Mohd Uzair" }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 min-h-screen`}
      >
       <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
