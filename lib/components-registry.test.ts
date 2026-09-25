import { describe, expect, it } from "vitest"
import { mustDemo } from "./apg-rules"
import { COMPONENTS, findComponent } from "./components-registry"

describe("components registry", () => {
  it("slug 不重複", () => {
    const slugs = COMPONENTS.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("slug 是小寫、只含英數與連字號", () => {
    for (const c of COMPONENTS) {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it("每一筆都有名稱與說明", () => {
    for (const c of COMPONENTS) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.summary.length).toBeGreaterThan(0)
    }
  })

  it("findComponent 依 slug 找得到，找不到時回傳 undefined", () => {
    expect(findComponent("dialog")?.name).toBe("Dialog")
    expect(findComponent("不存在的元件")).toBeUndefined()
  })

  it("涵蓋全部 20 個 APG 元件", () => {
    // 數量釘死是有意的：知識難度 2 的規則散落在全部 20 個元件上，少一個就代表
    // 有幾條必做的規則沒有落腳處。要改這個數字，得先確認範圍真的變了。
    expect(COMPONENTS).toHaveLength(20)
  })

  it("dialog 已完成", () => {
    expect(findComponent("dialog")?.status).toBe("done")
  })

  it("已完成的元件必須涵蓋它全部的難度 2 規則", () => {
    for (const c of COMPONENTS.filter((c) => c.status === "done")) {
      const required = mustDemo(c.slug).map((r) => r.id)
      expect(c.coveredRules ?? [], c.slug).toEqual(required)
    }
  })

  it("規劃中的元件不宣告覆蓋率", () => {
    for (const c of COMPONENTS.filter((c) => c.status === "planned")) {
      expect(c.coveredRules, c.slug).toBeUndefined()
    }
  })
})