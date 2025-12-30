import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

import { Sidebar } from "@/components/ui/navigation/sidebar"
import { siteConfig } from "./siteConfig"
import DesktopOnlyWrapper from "@/components/DesktopOnlyWrapper"

export const metadata: Metadata = {
  metadataBase: new URL("https://yoururl.com"),
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: [],
  authors: [{ name: "yourname", url: "" }],
  creator: "yourname",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: "Tremor OSS Dashboard",
    creator: "@tremorlabs",
  },
  icons: { icon: "/favicon.ico" },
}

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll scroll-auto antialiased selection:bg-orange-100 selection:text-orange-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-screen-2xl">
          <ThemeProvider defaultTheme="system" attribute="class">
            <Sidebar />
            <main className="lg:pl-72">
              <DesktopOnlyWrapper>{children}</DesktopOnlyWrapper>
            </main>
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}
