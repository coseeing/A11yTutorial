import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { beforeAll, describe, expect, it } from "vitest"
import { stubNativeDialog } from "@/lib/test/dialog-stub"
import { DialogCombobox } from "./DialogCombobox"

const DATES = ["11 月 1 日", "11 月 8 日", "11 月 15 日"]

beforeAll(stubNativeDialog)

function Harness({ initial = "" }: { initial?: string }) {
  const [value, setValue] = useState(initial)
  return <DialogCombobox label="出發日期" options={DATES} value={value} onValueChange={setValue} />
}

const combobox = () => screen.getByRole("combobox", { name: "出發日期" })

describe("DialogCombobox", () => {
  // APG-CBX-030：彈出內容是 dialog 時必須明寫 aria-haspopup
  it("aria-haspopup 明寫為 dialog", () => {
    render(<Harness />)
    expect(combobox()).toHaveAttribute("aria-haspopup", "dialog")
    expect(combobox()).toHaveAttribute("aria-expanded", "false")
  })

  // readOnly 而非 disabled：disabled 的元素不可聚焦，鍵盤使用者就打不開對話框了。
  it("輸入框唯讀但仍可聚焦", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    expect(combobox()).toHaveAttribute("readonly")
    expect(combobox()).not.toBeDisabled()

    await user.tab()
    expect(combobox()).toHaveFocus()
  })

  it("Enter 與 Alt + ↓ 都能打開對話框", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("{Enter}")
    expect(combobox()).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("dialog", { name: "選擇出發日期" })).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "取消" }))
    await waitFor(() => expect(combobox()).toHaveAttribute("aria-expanded", "false"))

    await user.keyboard("{Alt>}{ArrowDown}{/Alt}")
    expect(combobox()).toHaveAttribute("aria-expanded", "true")
  })

  // APG-CBX-025：確定後對話框關閉、值帶入 combobox、焦點回到 combobox
  it("按確定帶入值並把焦點移回輸入框", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.click(combobox())
    await user.click(screen.getByRole("radio", { name: "11 月 8 日" }))
    await user.click(screen.getByRole("button", { name: "確定" }))

    await waitFor(() => expect(combobox()).toHaveValue("11 月 8 日"))
    expect(combobox()).toHaveFocus()
    expect(combobox()).toHaveAttribute("aria-expanded", "false")
  })

  // 取消的意思是「我不要改」，不是「把原本的清掉」。
  it("按取消保留原值，焦點同樣移回輸入框", async () => {
    const user = userEvent.setup()
    render(<Harness initial="11 月 1 日" />)

    await user.click(combobox())
    await user.click(screen.getByRole("radio", { name: "11 月 15 日" }))
    await user.click(screen.getByRole("button", { name: "取消" }))

    await waitFor(() => expect(combobox()).toHaveAttribute("aria-expanded", "false"))
    expect(combobox()).toHaveValue("11 月 1 日")
    expect(combobox()).toHaveFocus()
  })

  // 對話框裡的暫定選擇不該外洩：取消之後再打開，看到的是目前的值而不是上次按過的那個。
  it("取消後重開，對話框裡選的是目前的值", async () => {
    const user = userEvent.setup()
    render(<Harness initial="11 月 1 日" />)

    await user.click(combobox())
    await user.click(screen.getByRole("radio", { name: "11 月 15 日" }))
    await user.click(screen.getByRole("button", { name: "取消" }))

    await user.click(combobox())
    expect(screen.getByRole("radio", { name: "11 月 1 日" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "11 月 15 日" })).not.toBeChecked()
  })
})
