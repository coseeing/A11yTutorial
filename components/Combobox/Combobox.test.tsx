import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { Combobox } from "./Combobox"

const CITIES = ["臺北市", "新北市", "臺中市", "臺南市"]

function Harness({ onCommit }: { onCommit?: (value: string) => void } = {}) {
  const [value, setValue] = useState("")
  return (
    <>
      <Combobox
        label="縣市"
        options={CITIES}
        value={value}
        onValueChange={(next) => {
          setValue(next)
          onCommit?.(next)
        }}
      />
      <button type="button">送出</button>
    </>
  )
}

const input = () => screen.getByRole("combobox", { name: "縣市" })

describe("Combobox", () => {
  // APG-CBX-026 / 034：角色在 input 上，名稱來自 label 且與值分得開
  it("輸入元件具 combobox 角色，名稱來自 label", () => {
    render(<Harness />)
    expect(input().tagName).toBe("INPUT")
    expect(input()).toHaveAccessibleName("縣市")
  })

  // APG-CBX-030：彈出內容是 listbox 時可以省略 aria-haspopup
  it("listbox 型彈出內容不寫 aria-haspopup", () => {
    render(<Harness />)
    expect(input()).not.toHaveAttribute("aria-haspopup")
  })

  // APG-CBX-035：aria-autocomplete 要如實反映行為
  it("aria-autocomplete 是 list", () => {
    render(<Harness />)
    expect(input()).toHaveAttribute("aria-autocomplete", "list")
  })

  // APG-CBX-031：aria-expanded 反映彈出內容的顯示狀態
  it("aria-expanded 隨清單展開與收起改變", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    expect(input()).toHaveAttribute("aria-expanded", "false")
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument()

    await user.tab()
    await user.keyboard("{ArrowDown}")

    expect(input()).toHaveAttribute("aria-expanded", "true")
    expect(screen.getByRole("listbox", { name: "縣市建議" })).toBeInTheDocument()
  })

  it("輸入即篩選建議值", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("臺")

    const options = screen.getAllByRole("option")
    expect(options.map((o) => o.textContent)).toEqual(["臺北市", "臺中市", "臺南市"])
  })

  // APG-CBX-036：彈出內容出現後第一個建議值自動選取，失焦時成為值
  it("第一個建議值自動選取，離開欄位時成為值", async () => {
    const user = userEvent.setup()
    const onCommit = vi.fn()
    render(<Harness onCommit={onCommit} />)

    await user.tab()
    await user.keyboard("新")

    expect(screen.getByRole("option", { name: "新北市" })).toHaveAttribute(
      "aria-selected",
      "true",
    )

    await user.tab()
    expect(onCommit).toHaveBeenCalledWith("新北市")
    expect(input()).toHaveValue("新北市")
  })

  // 使用者自己挑過之後，自動選取就不該再覆蓋他的選擇。
  it("使用者用方向鍵挑過之後，離開欄位不會換成別的建議值", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("臺{ArrowDown}{Enter}")

    expect(input()).toHaveValue("臺中市")

    await user.tab()
    expect(input()).toHaveValue("臺中市")
  })

  // 焦點全程留在輸入框 —— 焦點一移到選項上，使用者就不能繼續打字了。
  it("方向鍵移動 aria-activedescendant，焦點不離開輸入框", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("臺")
    const first = input().getAttribute("aria-activedescendant")

    await user.keyboard("{ArrowDown}")

    expect(input()).toHaveFocus()
    expect(input().getAttribute("aria-activedescendant")).not.toBe(first)
  })

  it("Enter 選取作用中的建議值並收起清單", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("臺北{Enter}")

    expect(input()).toHaveValue("臺北市")
    expect(input()).toHaveAttribute("aria-expanded", "false")
  })

  // 第一次 Esc 只收清單，第二次才清字 —— 一次全清會讓誤按的人失去整段輸入。
  it("Esc 先收起清單，再按一次才清掉輸入", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("臺北")
    expect(input()).toHaveAttribute("aria-expanded", "true")

    await user.keyboard("{Escape}")
    expect(input()).toHaveAttribute("aria-expanded", "false")
    expect(input()).toHaveValue("臺北")

    await user.keyboard("{Escape}")
    expect(input()).toHaveValue("")
  })

  // 沒有符合的建議時不要放空的 option —— 那會被唸成一個可選卻沒有內容的項目。
  it("沒有符合的建議時清單裡沒有任何 option", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    await user.tab()
    await user.keyboard("花蓮")

    expect(screen.getByRole("listbox", { name: "縣市建議" })).toBeInTheDocument()
    expect(screen.queryAllByRole("option")).toHaveLength(0)
    expect(screen.getByText("沒有符合的選項")).toBeInTheDocument()
  })

  // 展開鈕不該多佔一個停留點：鍵盤使用者已經有 Alt + ↓。
  it("展開鈕不在 Tab 順序裡", () => {
    render(<Harness />)
    expect(screen.getByRole("button", { name: "顯示建議清單" })).toHaveAttribute(
      "tabindex",
      "-1",
    )
  })

  // 焦點永遠留在輸入框，所以瀏覽器不會替清單捲動 —— 方向鍵走到看不見的選項時，
  // 得自己把它帶進可視範圍。jsdom 沒有實作 scrollIntoView，這裡攔下來看它
  // 有沒有被呼叫、呼叫在哪個元素上。
  describe("作用中的選項會被捲進可視範圍", () => {
    const calls: Element[] = []

    beforeEach(() => {
      calls.length = 0
      HTMLElement.prototype.scrollIntoView = vi.fn(function (this: HTMLElement) {
        calls.push(this)
      })
    })

    it("方向鍵移動時捲到新的作用中選項", async () => {
      const user = userEvent.setup()
      render(<Harness />)

      await user.tab()
      await user.keyboard("{ArrowDown}")
      calls.length = 0

      await user.keyboard("{ArrowDown}")

      const active = screen.getByRole("option", { name: "新北市" })
      expect(calls.at(-1)).toBe(active)
      expect(active).toHaveAttribute("aria-selected", "true")
    })

    it("只捲剛好夠的距離，不把清單跳到正中間", async () => {
      const user = userEvent.setup()
      render(<Harness />)

      await user.tab()
      await user.keyboard("{ArrowDown}{ArrowDown}")

      const scroll = HTMLElement.prototype.scrollIntoView as ReturnType<typeof vi.fn>
      expect(scroll).toHaveBeenCalledWith({ block: "nearest" })
    })

    it("清單收起來時不捲", async () => {
      const user = userEvent.setup()
      render(<Harness />)

      await user.tab()
      await user.keyboard("{ArrowDown}{Escape}")
      calls.length = 0

      await user.keyboard("{Escape}")
      expect(calls).toHaveLength(0)
    })
  })
})
