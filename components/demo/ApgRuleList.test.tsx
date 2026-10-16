import { render, screen, within } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { ApgRuleList } from "./ApgRuleList"
import { rulesFor } from "@/lib/apg-rules"
import { COMPONENTS } from "@/lib/components-registry"

describe("ApgRuleList", () => {
  it("列出難度 1 與 2 的規則，難度 3 不列", () => {
    render(<ApgRuleList slug="accordion" />)

    const all = rulesFor("accordion")
    const listed = all.filter((r) => r.difficulty !== 3)
    const skipped = all.filter((r) => r.difficulty === 3)

    expect(listed.length).toBeGreaterThan(0)
    expect(skipped.length).toBeGreaterThan(0)

    for (const rule of listed) {
      expect(screen.getByText(rule.id), rule.id).toBeInTheDocument()
    }
    for (const rule of skipped) {
      expect(screen.queryByText(rule.id), rule.id).not.toBeInTheDocument()
    }
  })

  // 難度 2 是必須實作到 demo 上的那些，排在前面讀者才對得起前面的面板。
  it("難度 2 的規則排在難度 1 之前", () => {
    render(<ApgRuleList slug="accordion" />)
    const order = screen
      .getAllByRole("listitem")
      .map((li) => within(li).getByText(/^難度 \d$/).textContent)

    expect(new Set(order)).toEqual(new Set(["難度 2", "難度 1"]))
    expect(order).toEqual([...order].sort().reverse())
  })

  // 分組標題拿掉之後，難度就只剩下每張卡片上的標籤在說 ——
  // 少了它，讀者看不出哪幾條是必須實作到 demo 上的。
  it("每一條都標出自己的難度", () => {
    render(<ApgRuleList slug="accordion" />)
    for (const rule of rulesFor("accordion").filter((r) => r.difficulty !== 3)) {
      const card = screen.getByText(rule.id).closest("li")!
      expect(within(card).getByText(`難度 ${rule.difficulty}`), rule.id).toBeInTheDocument()
    }
  })

  it("每一條都附上規則名稱與預期行為", () => {
    render(<ApgRuleList slug="disclosure" />)
    for (const rule of rulesFor("disclosure").filter((r) => r.difficulty !== 3)) {
      const card = screen.getByText(rule.id).closest("li")!
      expect(within(card).getByText(rule.name)).toBeInTheDocument()
      expect(within(card).getByText(rule.expectation)).toBeInTheDocument()
    }
  })

  // 必做的不標，否則整頁都是同一個標籤；選做的才標出來。
  it("只標出選做的規則", () => {
    render(<ApgRuleList slug="tabs" />)
    const optional = rulesFor("tabs").filter((r) => r.difficulty !== 3 && !r.required)
    const required = rulesFor("tabs").filter((r) => r.difficulty !== 3 && r.required)

    expect(optional.length).toBeGreaterThan(0)
    expect(screen.getAllByText("選做")).toHaveLength(optional.length)

    for (const rule of required) {
      const card = screen.getByText(rule.id).closest("li")!
      expect(within(card).queryByText("選做")).not.toBeInTheDocument()
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
