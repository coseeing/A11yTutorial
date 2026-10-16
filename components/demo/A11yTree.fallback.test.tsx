import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"
import { stubNativeDialog } from "@/lib/test/dialog-stub"
import { AlertDialogDemo } from "@/app/(component)/alertdialog/AlertDialogDemo"
import { ComboboxDemo } from "@/app/(component)/combobox/ComboboxDemo"
import { DialogDemo } from "@/app/(component)/dialog/DialogDemo"
import { GridDemo } from "@/app/(component)/grid/GridDemo"
import { TooltipDemo } from "@/app/(component)/tooltip/TooltipDemo"

// fallback 是整個面板唯一手寫的值，所以它會走鐘：改了對話框標題卻忘了改宣告，
// 面板就會在開啟前說謊，而且沒有任何東西會報錯。
//
// 這裡的每一條都做同一件事：讀下宣告的四列 → 真的去操作那個元件 → 比對量到的
// 四列一字不差。不需要知道值是什麼，只需要知道兩者必須相同。

beforeAll(stubNativeDialog)

const ROWS = ["role", "status", "name", "description"] as const

const panelAt = (index: number) => screen.getAllByTestId("a11y-tree-values")[index]

const valuesOf = (box: HTMLElement) =>
  ROWS.map((key) => within(box).getByTestId(`a11y-tree-${key}`).textContent?.trim())

/**
 * 比對第 index 個面板：宣告值 → 操作 → 量到的值。
 *
 * trigger 要讓目標真的進入無障礙樹；進去之後 data-pending 會消失，
 * 那就是「現在顯示的是量到的值」的訊號。
 */
async function expectFallbackMatchesReality(
  index: number,
  trigger: () => Promise<void>,
) {
  const before = panelAt(index)
  expect(before, "這個面板沒有宣告 fallback").toHaveAttribute("data-pending", "true")
  const declared = valuesOf(before)

  await trigger()

  await waitFor(() => {
    expect(panelAt(index)).not.toHaveAttribute("data-pending")
  })

  expect(valuesOf(panelAt(index))).toEqual(declared)
}

describe("fallback 宣告的值與實際量到的一致", () => {
  it("Dialog", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)
    await expectFallbackMatchesReality(0, async () => {
      await user.click(screen.getAllByRole("button")[0])
    })
  })

  it("Alert Dialog", async () => {
    const user = userEvent.setup()
    render(<AlertDialogDemo />)
    await expectFallbackMatchesReality(0, async () => {
      await user.click(screen.getAllByRole("button")[0])
    })
  })

  it("Tooltip 的提示本身", async () => {
    const user = userEvent.setup()
    render(<TooltipDemo />)
    await expectFallbackMatchesReality(1, async () => {
      await user.click(screen.getByRole("button", { name: "密碼規則" }))
    })
  })

  it("Combobox 的彈出清單", async () => {
    const user = userEvent.setup()
    render(<ComboboxDemo />)
    await expectFallbackMatchesReality(1, async () => {
      await user.click(screen.getByRole("combobox", { name: "縣市" }))
      await user.keyboard("{Alt>}{ArrowDown}{/Alt}")
    })
  })

  it("Combobox 自動選取的建議值", async () => {
    const user = userEvent.setup()
    render(<ComboboxDemo />)
    await expectFallbackMatchesReality(2, async () => {
      await user.click(screen.getByRole("combobox", { name: "縣市" }))
      await user.keyboard("{Alt>}{ArrowDown}{/Alt}")
    })
  })

  it("Combobox 對話框型開出來的對話框", async () => {
    const user = userEvent.setup()
    render(<ComboboxDemo />)
    await expectFallbackMatchesReality(4, async () => {
      await user.click(screen.getByRole("combobox", { name: "出發日期" }))
    })
  })

  it("Grid 選取的列", async () => {
    const user = userEvent.setup()
    render(<GridDemo />)
    await expectFallbackMatchesReality(2, async () => {
      await user.click(screen.getAllByRole("gridcell")[0])
      await user.keyboard(" ")
    })
  })
})

// 宣告值只是頂著，真的觀察到之後就該換成實際的 —— 否則面板會永遠停在手寫值上，
// 使用者操作了也看不出變化。
describe("fallback 只在還沒觀察到時頂著", () => {
  it("觀察到之後 data-pending 消失，提示那一行也不再說「操作之後」", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    expect(screen.getByTestId("a11y-tree-pending")).toBeInTheDocument()

    await user.click(screen.getAllByRole("button")[0])

    await waitFor(() => {
      expect(screen.queryByTestId("a11y-tree-pending")).not.toBeInTheDocument()
    })
  })
})
