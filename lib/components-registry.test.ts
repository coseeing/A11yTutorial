import { describe, expect, it } from "vitest"
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

  it("dialog 已完成", () => {
    expect(findComponent("dialog")?.status).toBe("done")
  })
})
