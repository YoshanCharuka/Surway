import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});
import Navbar from "../components/navbar";
import Footer from "../components/footer"; // Import the footer you just built


export const metadata: Metadata = {
  title: "Survey Services",
  description: "Expert land and property survey services",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body suppressHydrationWarning className={`${roboto.variable} antialiased flex flex-col min-h-screen font-sans`}>
        {/* 1. Navbar: Placed here so it persists across all tabs */}
        <Navbar />

        {/* 2. Main Content: pt-24 ensures content isn't hidden behind a fixed navbar */}
        <main className="flex-grow">
          {children}
        </main>

        {/* 3. Footer: Stays at the bottom of every page */}
        <Footer />
      </body>
    </html>
  );
}