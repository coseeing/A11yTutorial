import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { DemoWorkspace } from "./DemoWorkspace"
import { DemoStage } from "./DemoStage"
import { A11yTree } from "./A11yTree"
import { TabsDemo } from "@/app/(component)/tabs/TabsDemo"
import { AlertDemo } from "@/app/(component)/alert/AlertDemo"
import { CheckboxDemo } from "@/app/(component)/checkbox/CheckboxDemo"

describe("DemoWorkspace", () => {
  it("moves the real demo controls into the sticky dock and keeps property cards in the reading column", async () => {
    render(<DemoWorkspace><TabsDemo /></DemoWorkspace>)
    const dock = screen.getByRole("region", { name: "互動 Demo" })
    const selected = await within(dock).findByRole("tab", { name: "總覽", selected: true })
    expect(selected.closest("[data-demo-host]")).not.toBeNull()
    const card = await screen.findByRole("group", { name: /標記 A，\s*tab「總覽」/ })
    expect(card.closest("[data-demo-reading]")).not.toBeNull()
    expect(dock.contains(card)).toBe(false)
    expect(card).toHaveAttribute("data-pair-line", "solid")
    expect(screen.getByRole("group", { name: /標記 B，\s*tabpanel「總覽」/ })).toHaveAttribute("data-pair-line", "dashed")
    expect(screen.getByRole("group", { name: /標記 C，\s*tablist「帳號設定」/ })).toHaveAttribute("data-pair-line", "dotted")
    const legend = within(dock).getByRole("group", { name: "觀察對象標記" })
    expect(await within(legend).findByRole("link", { name: "查看標記 A：tab 的屬性" })).toHaveAttribute("href", `#${card.id}`)
    expect(within(legend).getByRole("link", { name: "查看標記 B：tabpanel 的屬性" })).toBeInTheDocument()
    expect(within(legend).getByRole("link", { name: "查看標記 C：tablist 的屬性" })).toBeInTheDocument()
  })

  it("updates both A and B titles on keyboard selection without polluting the tab's accessible name", async () => {
    const user = userEvent.setup()
    render(<DemoWorkspace><TabsDemo /></DemoWorkspace>)
    const overview = await screen.findByRole("tab", { name: "總覽", selected: true })
    overview.focus()
    await user.keyboard("{ArrowRight}")
    await waitFor(() => expect(screen.getByRole("group", { name: /標記 A，\s*tab「通知」/ })).toBeInTheDocument())
    expect(screen.getByRole("group", { name: /標記 B，\s*tabpanel「通知」/ })).toBeInTheDocument()
    expect(screen.getByRole("group", { name: /標記 C，\s*tablist「帳號設定」/ })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "通知", selected: true })).toHaveFocus()
    expect(screen.queryByRole("tab", { name: /A.*通知/ })).not.toBeInTheDocument()
    const control = screen.getByRole("tab", { name: "紀錄" })
    await user.click(control)
    await waitFor(() => expect(screen.getByRole("group", { name: /標記 B，\s*tabpanel「紀錄」/ })).toBeInTheDocument())
  })

  it("applies the same pairing to other components and preserves their live state", async () => {
    const user = userEvent.setup()
    const { unmount } = render(<DemoWorkspace><AlertDemo /></DemoWorkspace>)
    await user.click(await screen.findByRole("button", { name: "觸發警示" }))
    await waitFor(() => expect(screen.getByRole("group", { name: /標記 A，\s*alert（無名稱）/ })).toBeInTheDocument())
    expect(screen.getByRole("alert")).toHaveTextContent("儲存失敗")
    unmount()
    render(<DemoWorkspace><CheckboxDemo /></DemoWorkspace>)
    const all = await screen.findByRole("checkbox", { name: "全部選取" })
    await user.click(all)
    const card = await screen.findByRole("group", { name: /標記 B，\s*checkbox「全部選取」/ })
    await waitFor(() => expect(within(card).getByTestId("a11y-tree-status")).toHaveTextContent("checked=true"))
  })

  it("keeps DemoStage usable outside the page workspace", () => {
    render(<DemoStage id="standalone"><button>獨立範例</button></DemoStage>)
    expect(screen.getByRole("button", { name: "獨立範例" }).closest("#standalone")).not.toBeNull()
  })

  it("lets readers inspect live properties without an extra automatic-announcement control", async () => {
    const user = userEvent.setup()
    render(<DemoWorkspace><TabsDemo /></DemoWorkspace>)
    const card = await screen.findByRole("group", { name: /標記 A，\s*tab「總覽」/ })
    const values = within(card).getByTestId("a11y-tree-values")
    expect(screen.queryByRole("checkbox", { name: /播報屬性/ })).not.toBeInTheDocument()
    expect(values).toHaveAttribute("aria-live", "off")
    expect(card).toHaveAttribute("tabindex", "-1")
    await user.click(screen.getByRole("tab", { name: "通知" }))
    await waitFor(() => expect(screen.getByRole("group", { name: /標記 A，\s*tab「通知」/ })).toBeInTheDocument())
    expect(screen.getByRole("tab", { name: "通知" })).toHaveAttribute("aria-selected", "true")
    expect(values).toHaveAttribute("aria-live", "off")
  })
})
