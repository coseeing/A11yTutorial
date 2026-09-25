import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"
import { RadioGroup } from "./RadioGroup"

const OPTIONS = [
  { value: "standard", label: "標準宅配" },
  { value: "express", label: "隔日到貨" },
  { value: "pickup", label: "超商取貨" },
]

function Controlled({ initial = "standard" }: { initial?: string | null }) {
  const [value, setValue] = useState<string | null>(initial)
  return (
    <RadioGroup label="配送方式" options={OPTIONS} value={value} onValueChange={setValue} />
  )
}

describe("RadioGroup", () => {
  // APG-RAD-008：所有單選按鈕須位於 role=radiogroup 內
  // APG-RAD-012：單選群組須具有無障礙名稱
  it("是一個具名的 radiogroup，所有選項都在裡面", () => {
    render(<Controlled />)
    const group = screen.getByRole("radiogroup", { name: "配送方式" })
    expect(within(group).getAllByRole("radio")).toHaveLength(3)
  })

  it("群組名稱來自可見的 legend，不是只給輔助科技的標籤", () => {
    render(<Controlled />)
    expect(screen.getByText("配送方式")).toBeVisible()
  })

  // APG-RAD-009：每個單選按鈕具有 radio 角色語意
  // APG-RAD-011：每個單選按鈕具有無障礙名稱
  it("每個選項都是具名的 radio", () => {
    render(<Controlled />)
    for (const option of OPTIONS) {
      expect(screen.getByRole("radio", { name: option.label })).toBeInTheDocument()
    }
  })

  // APG-RAD-010：正確呈現選取狀態
  it("只有一個被選取，其餘為未選取", () => {
    render(<Controlled />)
    expect(screen.getByRole("radio", { name: "標準宅配" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "隔日到貨" })).not.toBeChecked()
    expect(screen.getByRole("radio", { name: "超商取貨" })).not.toBeChecked()
  })

  // APG-RAD-013：群組或個別選項的補充說明
  it("群組層級的補充說明掛在 radiogroup 上", () => {
    render(
      <RadioGroup
        label="配送方式"
        description="離島地區僅提供標準宅配。"
        options={OPTIONS}
        value="standard"
        onValueChange={() => {}}
      />,
    )
    expect(screen.getByRole("radiogroup", { name: "配送方式" })).toHaveAccessibleDescription(
      "離島地區僅提供標準宅配。",
    )
  })

  it("個別選項的補充說明掛在該選項上", () => {
    render(
      <RadioGroup
        label="配送方式"
        options={[
          { value: "standard", label: "標準宅配" },
          { value: "express", label: "隔日到貨", description: "加收 120 元。" },
        ]}
        value="standard"
        onValueChange={() => {}}
      />,
    )
    expect(screen.getByRole("radio", { name: "隔日到貨" })).toHaveAccessibleDescription(
      "加收 120 元。",
    )
    expect(screen.getByRole("radio", { name: "標準宅配" })).toHaveAccessibleDescription("")
  })

  // APG-RAD-001：整組只佔一個 Tab 停留點，焦點落在已選取的項目上
  it("Tab 進入時焦點落在已選取的項目，整組只佔一個停留點", async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">前一個元素</button>
        <Controlled initial="express" />
        <button type="button">後一個元素</button>
      </>,
    )

    screen.getByRole("button", { name: "前一個元素" }).focus()
    await user.tab()
    expect(screen.getByRole("radio", { name: "隔日到貨" })).toHaveFocus()

    // 再按一次 Tab 就整組離開，不會逐一走過每個選項
    await user.tab()
    expect(screen.getByRole("button", { name: "後一個元素" })).toHaveFocus()
  })

  it("沒有任何選取時，焦點落在第一個項目", async () => {
    const user = userEvent.setup()
    render(
      <>
        <button type="button">前一個元素</button>
        <Controlled initial={null} />
      </>,
    )

    screen.getByRole("button", { name: "前一個元素" }).focus()
    await user.tab()

    expect(screen.getByRole("radio", { name: "標準宅配" })).toHaveFocus()
  })

  // APG-RAD-003：方向鍵移動並同時更新選取
  it("方向鍵移動焦點並同時改變選取，且在邊界循環", async () => {
    const user = userEvent.setup()
    render(<Controlled />)

    screen.getByRole("radio", { name: "標準宅配" }).focus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("radio", { name: "隔日到貨" })).toBeChecked()

    await user.keyboard("{ArrowDown}")
    await user.keyboard("{ArrowDown}")
    // 走過最後一個之後循環回第一個
    expect(screen.getByRole("radio", { name: "標準宅配" })).toBeChecked()

    await user.keyboard("{ArrowUp}")
    expect(screen.getByRole("radio", { name: "超商取貨" })).toBeChecked()
  })

  // APG-RAD-002：Space 選取焦點所在項目
  it("Space 可選取焦點所在的項目", async () => {
    const user = userEvent.setup()
    render(<Controlled initial={null} />)

    screen.getByRole("radio", { name: "超商取貨" }).focus()
    await user.keyboard(" ")

    expect(screen.getByRole("radio", { name: "超商取貨" })).toBeChecked()
  })
})
