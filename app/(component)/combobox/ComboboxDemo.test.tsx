import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, expect, it } from "vitest"
import { stubNativeDialog } from "@/lib/test/dialog-stub"
import ComboboxPage from "./page"

beforeAll(stubNativeDialog)

it("keeps the listbox and dialog demos in separate ABC and AB observation groups", async () => {
  const { container } = render(<ComboboxPage />)
  await waitFor(() => expect(container.querySelectorAll("[data-pair-card]")).toHaveLength(5))
  const groups = container.querySelectorAll("[data-demo-workspace]")
  expect(groups).toHaveLength(2)
  expect([...groups].map((group) => [...group.querySelectorAll("[data-pair-card]")].map((card) => card.getAttribute("data-pair-card")).join(""))).toEqual(["ABC", "AB"])
  expect(groups[1].querySelectorAll('a[href="#combobox-demo-2-heading"]')).toHaveLength(2)
})

it("keeps each demo's values and observation targets independent", async () => {
  const user = userEvent.setup()
  const { container } = render(<ComboboxPage />)
  const city = await screen.findByRole("combobox", { name: "縣市" })
  const frame = screen.getByTitle("Combobox 日期對話框局部示範視窗") as HTMLIFrameElement
  await waitFor(() => expect(frame.contentDocument?.querySelector("input")).not.toBeNull())
  const doc = frame.contentDocument!
  const dialog = doc.querySelector<HTMLDialogElement>("dialog")!
  dialog.showModal = function () { this.open = true }
  dialog.close = function () { this.open = false }
  const frameUser = userEvent.setup({ document: doc })
  const date = within(doc.body).getByRole("combobox", { name: "出發日期" })
  await user.type(city, "高")
  const trees = container.querySelectorAll("[data-demo-reading]")
  await waitFor(() => expect(trees[0]).toHaveTextContent("高雄市"))
  expect(date).toHaveValue("")
  await frameUser.click(date)
  expect(document.querySelector("dialog[open]")).toBeNull()
  expect(dialog).toHaveAttribute("open")
  expect(dialog).toHaveAttribute("aria-modal", "true")
  await waitFor(() => expect(trees[1]).toHaveTextContent("選擇出發日期"))
  const close = within(doc.body).getByRole("button", { name: "關閉" })
  const teachingLink = within(doc.body).getByRole("button", { name: "查看 Accessibility Tree" })
  close.focus()
  await frameUser.keyboard("{Shift>}{Tab}{/Shift}")
  expect(teachingLink).toHaveFocus()
  await frameUser.keyboard("{Tab}")
  expect(close).toHaveFocus()
  fireEvent.click(within(doc.body).getByRole("button", { name: "查看 Accessibility Tree" }))
  expect(trees[1].querySelector('[data-pair-card="B"]')).toHaveFocus()
  expect(dialog).toHaveAttribute("open")
  await frameUser.click(within(doc.body).getByRole("radio", { name: "11 月 8 日（週六）" }))
  await frameUser.click(within(doc.body).getByRole("button", { name: "確定" }))
  expect(date).toHaveValue("11 月 8 日（週六）")
  expect(city).toHaveValue("高雄市")
  expect(trees[0]).not.toHaveTextContent("11 月 8 日")
})
