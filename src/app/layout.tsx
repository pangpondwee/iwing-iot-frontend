import type { Metadata } from "next";
import { Inter, Roboto_Mono, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import QueryClientProvider from "@/components/providers/query-client-provider";
import JotaiProvider from "@/components/providers/jotai-provider";
import { NextAuthProvider } from "@/components/providers/nextauth-provider";

export const metadata: Metadata = {
  title: "IWING IoT",
  description: "IoT Tracking Platform for IWING Lab",
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
  display: "swap",
});

const noto_sans_thai = Noto_Sans_Thai({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-thai",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto_mono.variable} ${noto_sans_thai.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextAuthProvider>
            <JotaiProvider>
              <QueryClientProvider>{children}</QueryClientProvider>
            </JotaiProvider>
            <Toaster />
          </NextAuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
