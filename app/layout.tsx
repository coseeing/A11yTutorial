import type { Metadata } from "next"
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
        <main id="main" className="demo-shell flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
