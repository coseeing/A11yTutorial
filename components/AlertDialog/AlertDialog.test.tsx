import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { beforeAll, describe, expect, it, vi } from "vitest"
import { AlertDialog } from "./AlertDialog"

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

function Harness({ onConfirm = () => {} }: { onConfirm?: () => void }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        刪除帳號
      </button>
      <AlertDialog
        open={open}
        onClose={() => setOpen(false)}
        title="確定要刪除帳號嗎？"
        message="刪除後所有資料將立即永久移除，無法復原。"
        confirmLabel="永久刪除"
        onConfirm={() => {
          onConfirm()
          setOpen(false)
        }}
      />
    </>
  )
}

describe("AlertDialog", () => {
  // APG-ALD-001：容器須具有 alertdialog 角色
  it("角色是 alertdialog 而不是 dialog", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "刪除帳號" }))

    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  // APG-ALD-002：須明確設定 aria-modal=true
  it("明寫 aria-modal=true，不依賴 showModal() 的隱含值", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "刪除帳號" }))

    expect(screen.getByRole("alertdialog")).toHaveAttribute("aria-modal", "true")
  })

  // APG-ALD-005：須以 aria-labelledby 關聯可見標題
  it("名稱來自可見標題", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "刪除帳號" }))

    expect(screen.getByRole("alertdialog", { name: "確定要刪除帳號嗎？" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "確定要刪除帳號嗎？" })).toBeVisible()
  })

  // APG-ALD-006：須以 aria-describedby 關聯警示訊息
  it("警示訊息成為它的無障礙補充說明", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "刪除帳號" }))

    expect(screen.getByRole("alertdialog")).toHaveAccessibleDescription(
      "刪除後所有資料將立即永久移除，無法復原。",
    )
  })

  // APG-ALD-007：焦點應落在影響最小的控制元件上
  it("開啟時焦點落在取消鈕，而不是破壞性的那顆", async () => {
    const user = userEvent.setup()
    render(<Harness />)
    await user.click(screen.getByRole("button", { name: "刪除帳號" }))

    expect(await screen.findByRole("button", { name: "取消" })).toHaveFocus()
  })

  // APG-ALD-011：控制元件可正常操作
  it("確認鈕觸發回呼，取消鈕只關閉", async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(<Harness onConfirm={onConfirm} />)

    await user.click(screen.getByRole("button", { name: "刪除帳號" }))
    await user.click(screen.getByRole("button", { name: "取消" }))
    expect(onConfirm).not.toHaveBeenCalled()
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "刪除帳號" }))
    await user.click(screen.getByRole("button", { name: "永久刪除" }))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  // APG-ALD-010（關閉後焦點回到觸發元素）沒有單元測試：那是原生 <dialog> 的
  // 行為，瀏覽器免費提供。jsdom 沒有實作 showModal，補一個替身等於測我自己寫的
  // 替身而不是元件。這條改在瀏覽器實測。

  it("未開啟時不在無障礙樹中", () => {
    render(<Harness />)
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
  })
})
