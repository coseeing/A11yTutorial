import { describe, expect, it } from "vitest"
import { APG_RULES, mustDemo, rulesFor } from "./apg-rules"
import { COMPONENTS } from "./components-registry"

describe("APG 規則資料", () => {
  it("289 條規則、20 個元件、難度 2 共 119 條", () => {
    expect(APG_RULES).toHaveLength(289)
    expect(new Set(APG_RULES.map((r) => r.component)).size).toBe(20)
    expect(APG_RULES.filter((r) => r.difficulty === 2)).toHaveLength(119)
  })

  it("規則編號不重複", () => {
    const ids = APG_RULES.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("每條規則都有名稱與預期行為", () => {
    for (const r of APG_RULES) {
      expect(r.name, r.id).not.toBe("")
      expect(r.expectation, r.id).not.toBe("")
    }
  })

  it("每個元件都對應到 registry 裡的一筆", () => {
    const slugs = new Set(COMPONENTS.map((c) => c.slug))
    for (const component of new Set(APG_RULES.map((r) => r.component))) {
      expect(slugs, component).toContain(component)
    }
  })

  it("每個元件都至少有一條難度 2 的規則 —— 這是 20 個元件都要做的理由", () => {
    for (const c of COMPONENTS) {
      expect(mustDemo(c.slug).length, c.slug).toBeGreaterThan(0)
    }
  })

  // 陷阱一：這一列在 CSV 裡整列左移一格，未修復時難度會是空字串而被漏掉。
  it("APG-TIP-009 的欄位錯位已修復", () => {
    const rule = APG_RULES.find((r) => r.id === "APG-TIP-009")!
    expect(rule.difficulty).toBe(2)
    expect(rule.required).toBe(true)
    expect(rule.topic).toBe("元件語意")
    expect(rule.source).toBe("https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/")
    expect(mustDemo("tooltip").map((r) => r.id)).toContain("APG-TIP-009")
  })

  // 陷阱二：「知識難度(修)」為數字時優先於「知識難度」。
  it("知識難度(修) 的修正值優先於原始值", () => {
    const byId = Object.fromEntries(APG_RULES.map((r) => [r.id, r]))
    // 3 → 2，要納入必做
    expect(byId["APG-GRID-018"].difficulty).toBe(2)
    expect(byId["APG-TBL-003"].difficulty).toBe(2)
    // 3 → 1，排除在必做之外
    expect(byId["APG-CBX-032"].difficulty).toBe(1)
    expect(byId["APG-TAB-012"].difficulty).toBe(1)
  })

  it("rulesFor 取得單一元件的全部規則", () => {
    const acc = rulesFor("accordion")
    expect(acc).toHaveLength(10)
    expect(acc.every((r) => r.id.startsWith("APG-ACC-"))).toBe(true)
  })

  it("mustDemo 只回傳難度 2", () => {
    expect(mustDemo("accordion").map((r) => r.id)).toEqual([
      "APG-ACC-003",
      "APG-ACC-004",
      "APG-ACC-005",
      "APG-ACC-006",
      "APG-ACC-008",
      "APG-ACC-009",
      "APG-ACC-010",
    ])
  })
})
