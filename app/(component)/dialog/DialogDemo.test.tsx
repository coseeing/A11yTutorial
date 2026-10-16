import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"
import { DialogDemo } from "./DialogDemo"
import { stubNativeDialog } from "@/lib/test/dialog-stub"

beforeAll(stubNativeDialog)

describe("DialogDemo", () => {
  it("初始狀態下對話框未開啟", () => {
    render(<DialogDemo />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("按下開啟鈕後對話框出現且有標題", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))

    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "刪除這筆紀錄？" })).toBeInTheDocument()
  })

  it("按下取消後對話框關閉", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))
    await user.click(await screen.findByRole("button", { name: "取消" }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  // 開啟前顯示的是 fallback 宣告值，不是空狀態 —— 讀者不必先猜到要按哪裡
  // 才看得到這一頁在講什麼。宣告值與實際值是否一致由
  // components/demo/A11yTree.fallback.test.tsx 釘住。
  it("A11yTree 在對話框開啟前先顯示宣告值，開啟後換成量到的值", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    const panel = await screen.findByTestId("a11y-tree-values")
    expect(panel).toHaveAttribute("data-pending", "true")
    expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("dialog")

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))

    // 觀察是非同步的（MutationObserver 加上 rAF 合批），點完要等它追上。
    await waitFor(() => {
      expect(screen.getByTestId("a11y-tree-values")).not.toHaveAttribute("data-pending")
    })
    expect(screen.getByTestId("a11y-tree-role")).toHaveTextContent("dialog")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("刪除這筆紀錄？")
    // name 是「這是什麼」，description 是名稱之後補充播報的說明 —— 兩者不同。
    expect(screen.getByTestId("a11y-tree-description")).toHaveTextContent(
      "刪除後無法復原，確定要繼續嗎？",
    )
  })
})
