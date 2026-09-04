import type { Metadata } from "next"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { SiteNav } from "@/components/SiteNav/SiteNav"
import "./globals.css"

export const metadata: Metadata = {
  title: "A11y 元件 Demo",
  description: "無障礙元件展示站：可操作範例、accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="typography-strong2 sr-only rounded-8 bg-teal-PRIMARY px-16 py-12 text-neutral-white focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        >
          跳到主要內容
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <DemoFooter />
      </body>
    </html>
  )
}
