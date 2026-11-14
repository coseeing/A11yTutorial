import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DemoWorkspace } from "./DemoWorkspace"
import { ListboxDemo } from "@/app/(component)/listbox/ListboxDemo"
import { LinkDemo } from "@/app/(component)/link/LinkDemo"
import { DialogDemo } from "@/app/(component)/dialog/DialogDemo"

it("follows the selected option's group when crossing listbox groups", async () => {
  const user = userEvent.setup()
  render(<DemoWorkspace><ListboxDemo /></DemoWorkspace>)
  await user.click(await screen.findByRole("option", { name: "超商取貨" }))
  await waitFor(() => expect(screen.getByRole("group", { name: /標記 B，\s*group「店到店」/ })).toBeInTheDocument())
  expect(screen.getByRole("group", { name: /標記 C，\s*option「超商取貨」/ })).toBeInTheDocument()
  await user.click(screen.getByRole("option", { name: /一般宅配/ }))
  await waitFor(() => expect(screen.getByRole("group", { name: /標記 B，\s*group「宅配」/ })).toBeInTheDocument())
})

it("observes only the actual text link, excluding the surrounding sentence", async () => {
  render(<DemoWorkspace><LinkDemo /></DemoWorkspace>)
  const link = await screen.findByRole("link", { name: "APG 的 Link Pattern" })
  expect(link).not.toHaveTextContent("想知道更多細節")
  await waitFor(() => expect(within(screen.getByRole("group", { name: /標記 A，\s*link「APG 的 Link Pattern」/ })).getByTestId("a11y-tree-name")).toHaveTextContent("APG 的 Link Pattern"))
})

it("opens Dialog inside the demo and provides an explicit path to its outside property card", async () => {
  render(<DemoWorkspace><DialogDemo /></DemoWorkspace>)
  const frame = screen.getByTitle("Dialog 局部示範視窗") as HTMLIFrameElement
  await waitFor(() => expect(frame.contentDocument?.querySelector("button")).not.toBeNull())
  const doc = frame.contentDocument!
  const dialog = doc.querySelector<HTMLDialogElement>("dialog")!
  dialog.showModal = function () { this.open = true }
  dialog.close = function () { this.open = false }
  const user = userEvent.setup({ document: doc })
  await user.click(within(doc.body).getByRole("button", { name: "編輯個人資料" }))
  expect(document.querySelector("dialog[open]")).toBeNull()
  expect(dialog).toHaveAttribute("open")
  const card = await screen.findByRole("group", { name: /標記 A，\s*dialog「編輯個人資料」/ })
  await waitFor(() => expect(within(card).getByTestId("a11y-tree-values")).not.toHaveAttribute("data-pending"))
  fireEvent.click(within(doc.body).getByRole("button", { name: "查看 Accessibility Tree" }))
  expect(card).toHaveFocus()
  await user.click(within(doc.body).getByRole("button", { name: "取消" }))
  await waitFor(() => expect(within(card).getByTestId("a11y-tree-values")).toHaveAttribute("data-stale", "true"))
})
