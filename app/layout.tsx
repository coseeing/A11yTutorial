import type { Metadata } from "next"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { SiteNav } from "@/components/SiteNav/SiteNav"
import { SkipLink } from "@/components/demo/SkipLink"
import "./globals.css"

export const metadata: Metadata = {
  title: "A11y Tutorial",
  description: "無障礙元件展示站：可操作範例、accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen flex-col">
        <SkipLink />
        {/*
          SiteNav 包在 <header> 裡，整站才有 banner 地標。
          <header> 必須直接位於 body 情境下 —— 包進 main、section、article 之後
          它就只是個普通容器，不再是 banner。/landmark-regions 那一頁把這件事
          攤在面板上：PageHeader 也是 <header>，但它在 main 裡面，算出來的角色
          是 generic。
        */}
        <header>
          <SiteNav />
        </header>
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <DemoFooter />
      </body>
    </html>
  )
}
