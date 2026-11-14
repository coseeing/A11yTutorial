import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DialogDemo } from "./DialogDemo"

it("saves profile edits locally and discards cancelled changes", async () => {
  render(<DialogDemo />)
  const frame = screen.getByTitle("Dialog 局部示範視窗") as HTMLIFrameElement
  await waitFor(() => expect(frame.contentDocument?.querySelector("button")).not.toBeNull())
  const doc = frame.contentDocument!
  const dialog = doc.querySelector<HTMLDialogElement>("dialog")!
  dialog.showModal = function () { this.open = true }
  dialog.close = function () { this.open = false }
  const user = userEvent.setup({ document: doc })
  const ui = within(doc.body)
  await user.click(ui.getByRole("button", { name: "編輯個人資料" }))
  const input = ui.getByRole("textbox", { name: "顯示名稱（必填）" })
  await user.clear(input)
  await user.click(ui.getByRole("button", { name: "儲存" }))
  expect(dialog).toHaveAttribute("open")
  await user.type(input, " 新名稱 ")
  await user.click(ui.getByRole("button", { name: "儲存" }))
  expect(dialog).not.toHaveAttribute("open")
  expect(ui.getByText("目前顯示名稱：新名稱")).toBeInTheDocument()
  await user.click(ui.getByRole("button", { name: "編輯個人資料" }))
  expect(input).toHaveValue("新名稱")
  await user.clear(input)
  await user.type(input, "未儲存的名稱")
  await user.click(ui.getByRole("button", { name: "取消" }))
  expect(ui.getByText("目前顯示名稱：新名稱")).toBeInTheDocument()
  await user.click(ui.getByRole("button", { name: "編輯個人資料" }))
  expect(input).toHaveValue("新名稱")
})
