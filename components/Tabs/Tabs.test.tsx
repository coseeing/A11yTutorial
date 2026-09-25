import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Tabs } from "./Tabs"

const ITEMS = [
  { label: "總覽", content: "總覽的內容" },
  { label: "設定", content: "設定的內容" },
  { label: "紀錄", content: <a href="/log">前往完整紀錄</a> },
]

describe("Tabs", () => {
  // APG-TAB-001 / 003：tablist 容器與其中的 tab
  it("tablist 裡有全部的 tab", () => {
    render(<Tabs items={ITEMS} label="帳號設定" />)
    const list = screen.getByRole("tablist", { name: "帳號設定" })
    expect(within(list).getAllByRole("tab")).toHaveLength(3)
  })

  // APG-TAB-002：有可見標籤時用 aria-labelledby，否則用 aria-label
  it("有可見標題時以 aria-labelledby 取名", () => {
    render(
      <>
        <h2 id="heading">帳號設定</h2>
        <Tabs items={ITEMS} labelledBy="heading" />
      </>,
    )
    const list = screen.getByRole("tablist", { name: "帳號設定" })
    expect(list).toHaveAttribute("aria-labelledby", "heading")
    expect(list).not.toHaveAttribute("aria-label")
  })

  // APG-TAB-004 / 008：tabpanel 角色，且由對應的 tab 命名
  it("面板是由對應 tab 命名的 tabpanel", () => {
    render(<Tabs items={ITEMS} label="帳號設定" />)
    const panel = screen.getByRole("tabpanel", { name: "總覽" })
    expect(panel).toHaveTextContent("總覽的內容")
  })

  // APG-TAB-006：aria-selected 只有作用中的為 true
  it("只有作用中的 tab 是 selected", () => {
    render(<Tabs items={ITEMS} label="帳號設定" />)
    expect(screen.getByRole("tab", { name: "總覽" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tab", { name: "設定" })).toHaveAttribute("aria-selected", "false")
  })

  // APG-TAB-007：只顯示作用中的面板
  it("同一時間只有一個面板可見", async () => {
    const user = userEvent.setup()
    render(<Tabs items={ITEMS} label="帳號設定" />)

    expect(screen.getAllByRole("tabpanel")).toHaveLength(1)

    await user.click(screen.getByRole("tab", { name: "設定" }))

    expect(screen.getAllByRole("tabpanel")).toHaveLength(1)
    expect(screen.getByRole("tabpanel", { name: "設定" })).toHaveTextContent("設定的內容")
  })

  // APG-TAB-009：整組只佔一個 Tab 停留點，焦點落在作用中的 tab
  it("tablist 整組只佔一個 Tab 停留點", async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">前一個元素</button>
        <Tabs items={ITEMS} label="帳號設定" />
      </>,
    )

    screen.getByRole("button", { name: "前一個元素" }).focus()
    await user.tab()

    expect(screen.getByRole("tab", { name: "總覽" })).toHaveFocus()
    expect(screen.getByRole("tab", { name: "設定" })).toHaveAttribute("tabindex", "-1")
  })

  // APG-TAB-011 / 014：方向鍵循環、Home / End
  it("左右方向鍵循環切換，Home 與 End 跳到兩端", async () => {
    const user = userEvent.setup()
    render(<Tabs items={ITEMS} label="帳號設定" />)
    screen.getByRole("tab", { name: "總覽" }).focus()

    await user.keyboard("{ArrowLeft}")
    expect(screen.getByRole("tab", { name: "紀錄" })).toHaveFocus()

    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "總覽" })).toHaveFocus()

    await user.keyboard("{End}")
    expect(screen.getByRole("tab", { name: "紀錄" })).toHaveFocus()

    await user.keyboard("{Home}")
    expect(screen.getByRole("tab", { name: "總覽" })).toHaveFocus()
  })

  // APG-TAB-016：水平 tablist 不攔截上下鍵，捲動功能要留給瀏覽器
  it("上下鍵不被攔截", async () => {
    const user = userEvent.setup()
    render(<Tabs items={ITEMS} label="帳號設定" />)
    const first = screen.getByRole("tab", { name: "總覽" })
    first.focus()

    await user.keyboard("{ArrowDown}")

    expect(first).toHaveFocus()
    expect(first).toHaveAttribute("aria-selected", "true")
  })

  // APG-TAB-015：面板內沒有可聚焦元素時才給 tabindex=0
  it("面板沒有可聚焦內容時可聚焦，有的時候不搶額外的停留點", async () => {
    const user = userEvent.setup()
    render(<Tabs items={ITEMS} label="帳號設定" />)

    // 「總覽」只有純文字 —— 面板自己要能被聚焦，否則鍵盤使用者讀不到它
    expect(screen.getByRole("tabpanel", { name: "總覽" })).toHaveAttribute("tabindex", "0")

    // 「紀錄」裡有連結 —— 面板不該再多佔一個停留點
    await user.click(screen.getByRole("tab", { name: "紀錄" }))
    expect(screen.getByRole("tabpanel", { name: "紀錄" })).not.toHaveAttribute("tabindex")
  })
})
