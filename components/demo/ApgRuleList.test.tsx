import { render, screen, within } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { ApgRuleList } from "./ApgRuleList"
import { type ApgRule, rulesFor } from "@/lib/apg-rules"
import { COMPONENTS } from "@/lib/components-registry"

/** 卡片上不再印規則編號，所以用規則名稱認人 —— 同一個元件內不重複。 */
const cardFor = (rule: ApgRule) => screen.getByText(rule.name).closest("li")!

const listed = (slug: string) => rulesFor(slug).filter((r) => r.difficulty !== 3)

describe("ApgRuleList", () => {
  it("列出難度 1 與 2 的規則，難度 3 不列", () => {
    render(<ApgRuleList slug="accordion" />)

    const skipped = rulesFor("accordion").filter((r) => r.difficulty === 3)
    expect(listed("accordion").length).toBeGreaterThan(0)
    expect(skipped.length).toBeGreaterThan(0)

    for (const rule of listed("accordion")) {
      expect(screen.getByText(rule.name), rule.id).toBeInTheDocument()
    }
    for (const rule of skipped) {
      expect(screen.queryByText(rule.name), rule.id).not.toBeInTheDocument()
    }
  })

  // 難度 2 是必須實作到 demo 上的那些。畫面上不再標難度，所以順序是唯一
  // 還在表達這件事的東西 —— 排錯了不會有任何視覺線索。
  it("難度 2 的規則全部排在難度 1 之前", () => {
    render(<ApgRuleList slug="accordion" />)

    const order = screen.getAllByRole("listitem").map((li) => {
      const rule = listed("accordion").find((r) => within(li).queryByText(r.name))
      return rule!.difficulty
    })

    expect(order).toEqual([...order].sort((a, b) => b - a))
    expect(new Set(order)).toEqual(new Set([2, 1]))
  })

  it("每一條都附上無障礙主題與預期行為", () => {
    render(<ApgRuleList slug="disclosure" />)
    for (const rule of listed("disclosure")) {
      const card = cardFor(rule)
      expect(within(card).getByText(rule.topic), rule.id).toBeInTheDocument()
      expect(within(card).getByText(rule.expectation), rule.id).toBeInTheDocument()
    }
  })

  // 卡片上刻意不印規則編號：這一區是讀來理解規則在講什麼的，不是核對編號的。
  it("不顯示規則編號", () => {
    render(<ApgRuleList slug="disclosure" />)
    for (const rule of listed("disclosure")) {
      expect(screen.queryByText(rule.id), rule.id).not.toBeInTheDocument()
    }
  })

  it("不顯示難度標籤", () => {
    render(<ApgRuleList slug="accordion" />)
    expect(screen.queryByText(/^難度 \d$/)).not.toBeInTheDocument()
  })

  // 必做的不標，否則整頁都是同一個標籤；選做的才標出來。
  it("只標出選做的規則", () => {
    render(<ApgRuleList slug="tabs" />)
    const optional = listed("tabs").filter((r) => !r.required)
    const required = listed("tabs").filter((r) => r.required)

    expect(optional.length).toBeGreaterThan(0)
    expect(screen.getAllByText("選做")).toHaveLength(optional.length)

    for (const rule of required) {
      expect(within(cardFor(rule)).queryByText("選做"), rule.id).not.toBeInTheDocument()
    }
  })

  // 非 APG pattern 沒有規則編號可列。整個區塊消失會讓讀者以為漏了，
  // 所以明講為什麼是空的。
  it("沒有 APG 規則時說明原因，而不是留白", () => {
    render(<ApgRuleList slug="toast" />)
    expect(rulesFor("toast")).toHaveLength(0)
    expect(screen.getByText(/APG 沒有這個 pattern/)).toBeInTheDocument()
  })
})

// 這個區塊是逐頁手動加上去的，漏一頁不會有任何東西發出聲音 ——
// 讀者只會在某一頁的目錄裡少看到一項，而那很難發現。
describe("每個元件頁都有 APG 規則區塊", () => {
  for (const component of COMPONENTS) {
    it(component.slug, () => {
      const page = readFileSync(`app/(component)/${component.slug}/page.tsx`, "utf8")
      expect(page).toContain('id: "apg"')
      expect(page).toContain('title: "APG 規則"')
      expect(page).toContain(`<ApgRuleList slug="${component.slug}" />`)
    })
  }
})
