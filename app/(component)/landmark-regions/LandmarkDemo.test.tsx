import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import { computeA11yNode } from "@/lib/a11y/compute-node"
import { LandmarkDemo } from "./LandmarkDemo"

it("keeps the example landmarks in their own document and observes one real region at a time", async () => {
  const user = userEvent.setup()
  render(<main><LandmarkDemo /></main>)
  const frame = screen.getByTitle("Landmark Regions 獨立示範頁") as HTMLIFrameElement
  await waitFor(() => expect(frame.contentDocument?.querySelector("main")).not.toBeNull())
  const doc = frame.contentDocument!
  const frameUser = userEvent.setup({ document: doc })
  const selectArea = async (id: string) => {
    const basic: Record<string, string> = { "example-header": "頁首", "example-nav": "導覽列", "example-main": "主要內容", "example-footer": "頁尾" }
    const extra: Record<string, string> = { "example-search": "搜尋區", "example-form": "訂閱表單", "example-region": "本週更新", "example-unnamed": "未命名區塊", "example-inner-header": "文章標題區" }
    if (basic[id]) await frameUser.click(within(doc.body).getByRole("button", { name: `觀察${basic[id]}` }))
    else await user.click(screen.getByRole("button", { name: extra[id], hidden: true }))
  }
  await user.click(screen.getByText("其他地標與對照範例"))
  expect(document.querySelectorAll("main")).toHaveLength(1)
  for (const [id, role] of [["example-header", "banner"], ["example-main", "main"], ["example-footer", "contentinfo"], ["example-search", "search"], ["example-form", "form"], ["example-region", "region"], ["example-unnamed", "generic"], ["example-inner-header", "generic"]]) {
    await selectArea(id)
    expect(computeA11yNode(doc.getElementById(id))?.role).toBe(role)
  }
  expect(screen.getAllByTestId("a11y-tree-values")).toHaveLength(1)
  await selectArea("example-form")
  await waitFor(() => expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("form"))
  expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("訂閱更新通知")
  await selectArea("example-unnamed")
  await waitFor(() => expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("generic"))
  expect(within(doc.body).getByRole("main")).toBeInTheDocument()
})
