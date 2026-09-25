import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { ControlGroup } from "./ControlGroup"

describe("ControlGroup", () => {
  // APG-CHK-006 / APG-SWT-007：群組須具有無障礙名稱
  it("是一個以標籤命名的 group", () => {
    render(
      <ControlGroup label="通知方式">
        <input type="checkbox" aria-label="電子郵件" />
      </ControlGroup>,
    )
    expect(screen.getByRole("group", { name: "通知方式" })).toBeInTheDocument()
  })

  // APG-CHK-007 / APG-SWT-008：群組的補充說明須以 aria-describedby 關聯
  it("補充說明以 aria-describedby 關聯到群組本身", () => {
    render(
      <ControlGroup label="通知方式" description="至少選擇一種，否則我們無法通知你。">
        <input type="checkbox" aria-label="電子郵件" />
      </ControlGroup>,
    )
    const group = screen.getByRole("group", { name: "通知方式" })
    expect(group).toHaveAccessibleDescription("至少選擇一種，否則我們無法通知你。")
  })

  it("沒有補充說明時不掛空的 aria-describedby", () => {
    render(
      <ControlGroup label="通知方式">
        <input type="checkbox" aria-label="電子郵件" />
      </ControlGroup>,
    )
    expect(screen.getByRole("group", { name: "通知方式" })).not.toHaveAttribute(
      "aria-describedby",
    )
  })

  it("群組名稱是可見的文字，不是只給輔助科技的標籤", () => {
    render(
      <ControlGroup label="通知方式">
        <input type="checkbox" aria-label="電子郵件" />
      </ControlGroup>,
    )
    expect(screen.getByText("通知方式")).toBeVisible()
  })
})
