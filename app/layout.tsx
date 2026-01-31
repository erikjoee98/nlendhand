import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppShell from "./components/AppShell";

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    {
      path: "../public/fonts/Inter-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
  ],
});

const playfair = localFont({
  variable: "--font-playfair",
  display: "swap",
  src: [
    {
      path: "../public/fonts/PlayfairDisplay-Regular.woff2",
      weight: "400 700",
      style: "normal",
    },
    {
      path: "../public/fonts/PlayfairDisplay-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "LendAHand - Support Recovery",
  description: "Support recovery through transparent, direct impact giving.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-sans`}
      >
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
