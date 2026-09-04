import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"
import { DialogDemo } from "./DialogDemo"

// jsdom 尚未實作 <dialog> 的 showModal / close，補上足以驗證開關狀態的替身。
beforeAll(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.open = true
    }
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.open = false
      this.dispatchEvent(new Event("close"))
    }
  }
})

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

  it("A11yTree 在對話框開啟前後顯示不同內容", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    expect(await screen.findByTestId("a11y-tree-empty")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))

    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("dialog")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("刪除這筆紀錄？")
    // name 是「這是什麼」，description 是名稱之後補充播報的說明 —— 兩者不同。
    expect(screen.getByTestId("a11y-tree-description")).toHaveTextContent(
      "刪除後無法復原，確定要繼續嗎？",
    )
  })
})
