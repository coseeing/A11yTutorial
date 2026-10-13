import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"
import { Listbox, type ListboxGroup } from "./Listbox"

const GROUPS: ListboxGroup[] = [
  {
    label: "宅配",
    options: [
      { value: "home-standard", label: "一般宅配" },
      { value: "home-express", label: "急件宅配" },
    ],
  },
  {
    label: "店到店",
    options: [{ value: "store-a", label: "超商取貨" }],
  },
]

function Harness({ initial = "home-standard" }: { initial?: string }) {
  const [value, setValue] = useState(initial)
  return (
    <>
      <h2 id="heading">出貨方式</h2>
      <Listbox groups={GROUPS} value={value} onValueChange={setValue} labelledBy="heading" />
    </>
  )
}

describe("Listbox", () => {
  // APG-LBX-015 / 019：容器具 listbox 角色與無障礙名稱
  it("容器是具名的 listbox", () => {
    render(<Harness />)
    const list = screen.getByRole("listbox", { name: "出貨方式" })
    expect(list).toHaveAttribute("aria-labelledby", "heading")
  })

  // APG-LBX-016 / 017 / 018：選項隸屬於具名的 group，每個 group 至少一個選項
  it("每個群組都有名稱，而且至少有一個選項", () => {
    render(<Harness />)
    const groups = screen.getAllByRole("group")
    expect(groups.map((g) => g.getAttribute("aria-labelledby"))).not.toContain(null)
    expect(screen.getByRole("group", { name: "宅配" })).toBeInTheDocument()
    for (const group of groups) {
      expect(within(group).getAllByRole("option").length).toBeGreaterThan(0)
    }
  })

  // APG-LBX-021：選取狀態一律用 aria-selected，未選取時明寫 false
  it("每個選項都有 aria-selected，只有一個是 true", () => {
    render(<Harness />)
    const options = screen.getAllByRole("option")
    expect(options.map((o) => o.getAttribute("aria-selected"))).toEqual([
      "true",
      "false",
      "false",
    ])
  })

  // 焦點留在容器上，由 aria-activedescendant 指出作用中的選項 ——
  // 這是 Listbox 與 Radio Group 的 roving tabindex 最大的差別。
  it("方向鍵移動 aria-activedescendant，焦點不離開容器", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    const list = screen.getByRole("listbox", { name: "出貨方式" })

    await user.tab()
    expect(list).toHaveFocus()

    const first = list.getAttribute("aria-activedescendant")
    await user.keyboard("{ArrowDown}")

    expect(list).toHaveFocus()
    expect(list.getAttribute("aria-activedescendant")).not.toBe(first)
    expect(screen.getByRole("option", { name: "急件宅配" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })

  // 單選清單讓選取跟著焦點走，但到了邊界要停住 ——
  // 繞回去會讓使用者以為清單是無限的。
  it("方向鍵在頭尾停住，不繞回另一端", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.tab()

    await user.keyboard("{ArrowUp}")
    expect(screen.getByRole("option", { name: "一般宅配" })).toHaveAttribute(
      "aria-selected",
      "true",
    )

    await user.keyboard("{End}{ArrowDown}")
    expect(screen.getByRole("option", { name: "超商取貨" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })

  it("Home 與 End 跳到第一個與最後一個選項", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.tab()

    await user.keyboard("{End}")
    expect(screen.getByRole("option", { name: "超商取貨" })).toHaveAttribute(
      "aria-selected",
      "true",
    )

    await user.keyboard("{Home}")
    expect(screen.getByRole("option", { name: "一般宅配" })).toHaveAttribute(
      "aria-selected",
      "true",
    )
  })

  // 群組標題是靜態文字，不是選項 —— 給它 role=option 會讓方向鍵停在
  // 一個選不了的東西上。
  it("群組標題不是選項", () => {
    render(<Harness />)
    expect(screen.getAllByRole("option")).toHaveLength(3)
    expect(screen.queryByRole("option", { name: "宅配" })).not.toBeInTheDocument()
  })
})
