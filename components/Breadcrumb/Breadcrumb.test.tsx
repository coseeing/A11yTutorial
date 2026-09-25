import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { Breadcrumb } from "./Breadcrumb"

const TRAIL = [
  { label: "首頁", href: "/" },
  { label: "元件", href: "/components" },
  { label: "Breadcrumb" },
]

describe("Breadcrumb", () => {
  // APG-BRD-001：須位於導覽地標內
  // APG-BRD-002：導覽地標須具備無障礙名稱
  it("是一個具名的 navigation 地標", () => {
    render(<Breadcrumb items={TRAIL} />)
    expect(screen.getByRole("navigation", { name: "麵包屑" })).toBeInTheDocument()
  })

  it("地標名稱可自訂", () => {
    render(<Breadcrumb items={TRAIL} label="你在這裡" />)
    expect(screen.getByRole("navigation", { name: "你在這裡" })).toBeInTheDocument()
  })

  // APG-BRD-003：目前頁面須設定 aria-current="page"
  it("最後一項是連結時標上 aria-current=page", () => {
    render(
      <Breadcrumb
        items={[
          { label: "首頁", href: "/" },
          { label: "Breadcrumb", href: "/breadcrumb" },
        ]}
      />,
    )
    const current = screen.getByRole("link", { name: "Breadcrumb" })
    expect(current).toHaveAttribute("aria-current", "page")
  })

  it("最後一項不是連結時，不需要 aria-current", () => {
    render(<Breadcrumb items={TRAIL} />)
    expect(screen.queryByRole("link", { name: "Breadcrumb" })).not.toBeInTheDocument()
    const nav = screen.getByRole("navigation", { name: "麵包屑" })
    expect(within(nav).getByText("Breadcrumb")).not.toHaveAttribute("aria-current")
  })

  it("只有最後一項是目前頁面，前面的都是一般連結", () => {
    render(<Breadcrumb items={TRAIL} />)
    expect(screen.getByRole("link", { name: "首頁" })).not.toHaveAttribute("aria-current")
    expect(screen.getByRole("link", { name: "元件" })).not.toHaveAttribute("aria-current")
  })

  it("以有序清單呈現層級", () => {
    render(<Breadcrumb items={TRAIL} />)
    const list = screen.getByRole("list")
    expect(within(list).getAllByRole("listitem")).toHaveLength(3)
  })

  it("分隔符號不進入無障礙樹", () => {
    render(<Breadcrumb items={TRAIL} />)
    const nav = screen.getByRole("navigation", { name: "麵包屑" })
    expect(nav.textContent).toContain("首頁")
    for (const sep of nav.querySelectorAll("[data-separator]")) {
      expect(sep).toHaveAttribute("aria-hidden", "true")
    }
  })
})
