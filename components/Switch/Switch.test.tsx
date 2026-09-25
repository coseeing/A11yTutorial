import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it, vi } from "vitest"
import { Switch } from "./Switch"

function Controlled({ label = "深色模式" }: { label?: string }) {
  const [on, setOn] = useState(false)
  return <Switch label={label} checked={on} onCheckedChange={setOn} />
}

describe("Switch", () => {
  // APG-SWT-004：在 accessibility tree 中呈現 switch 角色
  it("角色是 switch 而不是 checkbox", () => {
    render(<Switch label="深色模式" checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByRole("switch", { name: "深色模式" })).toBeInTheDocument()
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()
  })

  // APG-SWT-005：具有無障礙名稱
  it("名稱來自可見標籤", () => {
    render(<Switch label="深色模式" checked={false} onCheckedChange={() => {}} />)
    expect(screen.getByText("深色模式")).toBeVisible()
    expect(screen.getByRole("switch", { name: "深色模式" })).toBeInTheDocument()
  })

  // APG-SWT-006：正確呈現開啟與關閉狀態
  it("開關狀態反映在 checked 上", async () => {
    const user = userEvent.setup()
    render(<Controlled />)

    expect(screen.getByRole("switch", { name: "深色模式" })).not.toBeChecked()

    await user.click(screen.getByRole("switch", { name: "深色模式" }))

    expect(screen.getByRole("switch", { name: "深色模式" })).toBeChecked()
  })

  // APG-SWT-001：Space 可切換
  it("Space 可切換狀態", async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    const control = screen.getByRole("switch", { name: "深色模式" })

    control.focus()
    await user.keyboard(" ")

    expect(control).toBeChecked()
  })

  // APG-SWT-003：切換時標籤保持不變
  it("切換前後標籤完全相同", async () => {
    const user = userEvent.setup()
    render(<Controlled />)

    const before = screen.getByRole("switch").getAttribute("aria-label") ??
      screen.getByRole("switch", { name: "深色模式" }).textContent
    await user.click(screen.getByRole("switch", { name: "深色模式" }))

    expect(screen.getByRole("switch", { name: "深色模式" })).toBeInTheDocument()
    const after = screen.getByRole("switch").getAttribute("aria-label") ??
      screen.getByRole("switch", { name: "深色模式" }).textContent
    expect(after).toBe(before)
  })

  // APG-SWT-008：補充說明
  it("aria-describedby 帶出補充說明", () => {
    render(
      <>
        <Switch
          label="深色模式"
          checked={false}
          onCheckedChange={() => {}}
          aria-describedby="hint"
        />
        <p id="hint">會同步套用到所有裝置。</p>
      </>,
    )
    expect(screen.getByRole("switch", { name: "深色模式" })).toHaveAccessibleDescription(
      "會同步套用到所有裝置。",
    )
  })

  it("disabled 時不觸發變更", async () => {
    const user = userEvent.setup()
    const onCheckedChange = vi.fn()
    render(
      <Switch label="深色模式" checked={false} onCheckedChange={onCheckedChange} disabled />,
    )
    await user.click(screen.getByRole("switch", { name: "深色模式" }))
    expect(onCheckedChange).not.toHaveBeenCalled()
  })

  // 這條測的是 CSS 選擇器成立的前提，不是 CSS 本身。
  //
  // 視覺軌道靠 Tailwind 的 peer-focus-visible 畫出 focus ring，而 peer 變體產生
  // 的是同層選擇器（~）—— 軌道一旦被包進別的元素裡，選擇器就永遠選不到，focus
  // ring 會無聲消失。jsdom 不算 CSS，驗不了樣式，但驗得了結構。
  it("視覺軌道是 input 的下一個兄弟節點，peer 選擇器才成立", () => {
    render(<Switch label="深色模式" checked={false} onCheckedChange={() => {}} />)
    const input = screen.getByRole("switch", { name: "深色模式" })
    const track = input.nextElementSibling

    expect(track).not.toBeNull()
    expect(track).toHaveAttribute("aria-hidden", "true")
    expect(input.className).toContain("peer")
    expect(track!.className).toContain("peer-focus-visible:ring-2")
  })
})