import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DemoPage } from "./DemoPage"

const SECTIONS = [
  { id: "demo", title: "Demo", content: <p>範例內容</p> },
  { id: "keyboard", title: "鍵盤操作", content: <p>鍵盤內容</p> },
]

describe("DemoPage", () => {
  it("頁面標題是唯一的 h1", () => {
    render(<DemoPage title="Dialog" sections={SECTIONS} />)
    const h1s = screen.getAllByRole("heading", { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent("Dialog")
  })

  it("每個區塊是一個帶標題的 region，標題為 h2", () => {
    render(<DemoPage title="Dialog" sections={SECTIONS} />)
    expect(screen.getByRole("region", { name: "Demo" })).toBeInTheDocument()
    expect(screen.getByRole("region", { name: "鍵盤操作" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Demo" })).toBeInTheDocument()
  })

  it("目錄列出每個區塊並連到對應的 id", () => {
    render(<DemoPage title="Dialog" sections={SECTIONS} />)
    const toc = screen.getByRole("navigation", { name: "本頁目錄" })
    expect(within(toc).getByRole("link", { name: "Demo" })).toHaveAttribute("href", "#demo")
    expect(within(toc).getByRole("link", { name: "鍵盤操作" })).toHaveAttribute(
      "href",
      "#keyboard",
    )
  })

  it("區塊內容有被渲染", () => {
    render(<DemoPage title="Dialog" sections={SECTIONS} />)
    expect(screen.getByText("範例內容")).toBeInTheDocument()
    expect(screen.getByText("鍵盤內容")).toBeInTheDocument()
  })
})
