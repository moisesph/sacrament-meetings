import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan and review sacrament meetings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSans.variable} flex min-h-screen flex-col`}>
        <Header />

        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
