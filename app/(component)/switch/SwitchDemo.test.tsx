import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { DemoWorkspace } from "@/components/demo/DemoWorkspace"
import { SwitchDemo } from "./SwitchDemo"

it("tracks the operated switch while keeping its real accessible name and state", async () => {
  const user = userEvent.setup()
  render(<DemoWorkspace><SwitchDemo /></DemoWorkspace>)
  await screen.findByRole("group", { name: /標記 B，\s*switch「推播通知」/ })
  const removedMarkers: MutationRecord[] = []
  const observer = new MutationObserver((records) => removedMarkers.push(...records.filter((record) => record.attributeName === "data-pair-card" && record.oldValue === "B")))
  observer.observe(document.body, { attributes: true, attributeOldValue: true, subtree: true })
  await user.click(await screen.findByRole("switch", { name: "電子郵件" }))
  const card = await screen.findByRole("group", { name: /標記 B，\s*switch「電子郵件」/ })
  await waitFor(() => expect(within(card).getByTestId("a11y-tree-status")).toHaveTextContent("checked=true"))
  await user.tab()
  await waitFor(() => expect(screen.getByRole("group", { name: /標記 B，\s*switch「簡訊」/ })).toBeInTheDocument())
  await user.keyboard(" ")
  expect(screen.getByRole("switch", { name: "簡訊" })).toBeChecked()
  observer.disconnect()
  expect(removedMarkers).toHaveLength(0)
})
