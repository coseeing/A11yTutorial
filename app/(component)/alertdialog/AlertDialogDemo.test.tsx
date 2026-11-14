import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, expect, it } from "vitest"
import { stubNativeDialog } from "@/lib/test/dialog-stub"
import { DemoWorkspace } from "@/components/demo/DemoWorkspace"
import { AlertDialogDemo } from "./AlertDialogDemo"

beforeAll(stubNativeDialog)

it("opens the real AlertDialog inside its own viewport and observes its actual state", async () => {
  render(<DemoWorkspace><AlertDialogDemo /></DemoWorkspace>)
  const frame = screen.getByTitle("Alert Dialog 局部示範視窗") as HTMLIFrameElement
  await waitFor(() => expect(frame.contentDocument?.querySelector("button")).not.toBeNull())
  const doc = frame.contentDocument!
  const dialog = doc.querySelector<HTMLDialogElement>("dialog")!
  dialog.showModal = function () { this.open = true }
  dialog.close = function () {
    this.open = false
    const event = doc.createEvent("Event")
    event.initEvent("close", false, false)
    this.dispatchEvent(event)
  }
  const user = userEvent.setup({ document: doc })
  const card = await screen.findByTestId("a11y-tree-values")
  expect(card).toHaveAttribute("data-pending", "true")
  await user.click(within(doc.body).getByRole("button", { name: "刪除帳號" }))
  await waitFor(() => expect(card).not.toHaveAttribute("data-pending"))
  expect(dialog).toHaveAttribute("aria-modal", "true")
  expect(within(doc.body).getByRole("button", { name: "取消" })).toHaveFocus()
  expect(document.querySelector("dialog[open]")).toBeNull()
  expect(within(card).getByTestId("a11y-tree-role")).toHaveTextContent("alertdialog")
  expect(within(card).getByTestId("a11y-tree-name")).toHaveTextContent("確定要刪除帳號嗎？")
  fireEvent.click(within(doc.body).getByRole("button", { name: "查看 Accessibility Tree" }))
  expect(card.closest("[data-pair-card]")).toHaveFocus()
  expect(dialog).toHaveAttribute("open")
  fireEvent.click(within(doc.body).getByRole("button", { name: "取消" }))
  await waitFor(() => expect(card).toHaveAttribute("data-stale", "true"))
  expect(card).toHaveTextContent("確定要刪除帳號嗎？")
})

it("also preserves a separate whole-page modal experience with the same semantics", async () => {
  const user = userEvent.setup()
  render(<DemoWorkspace><AlertDialogDemo /></DemoWorkspace>)
  await user.click(await screen.findByRole("button", { name: "體驗全頁模態視窗" }))
  expect(screen.getByRole("alertdialog", { name: "確定要刪除帳號嗎？" })).toHaveAttribute("aria-modal", "true")
  await waitFor(() => expect(screen.getByTestId("a11y-tree-values")).not.toHaveAttribute("data-pending"))
  await user.click(screen.getByRole("button", { name: "取消" }))
  await waitFor(() => expect(screen.getByTestId("a11y-tree-values")).toHaveAttribute("data-stale", "true"))
})
