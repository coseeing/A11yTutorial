import { describe, expect, it } from "vitest"
import { componentCatalog } from "./component-catalog.generated"
import { COMPONENTS } from "./components-registry"
import { groupCatalog, searchCatalog } from "./component-catalog"

describe("component catalog", () => {
  it("indexes exactly the published component pages", () => {
    expect(componentCatalog.map((c) => c.slug)).toEqual(COMPONENTS.filter((c) => c.status === "done").map((c) => c.slug))
    expect(componentCatalog.every((c) => c.wcag.length > 0 && c.roles.length > 0)).toBe(true)
  })
  it("finds the same component through its name, ARIA attribute, SC and APG rule", () => {
    for (const query of ["ACCORDION", "aria-expanded", "2.1.1", "APG-ACC-003", "標題層級"]) {
      expect(searchCatalog(componentCatalog, query).map((c) => c.slug)).toContain("accordion")
    }
    expect(searchCatalog(componentCatalog, "Accordion aria-expanded").map((c) => c.slug)).toEqual(["accordion"])
    expect(searchCatalog(componentCatalog, "not-a-real-component")).toEqual([])
  })
  it("groups Accordion and Button together without treating the pattern name as a role", () => {
    const groups = groupCatalog(componentCatalog, "roles")
    expect(groups.find((g) => g.id === "button")?.entries.map((c) => c.slug)).toEqual(expect.arrayContaining(["accordion", "button", "disclosure"]))
    expect(groups.some((g) => g.id === "accordion" || g.id === "toast")).toBe(false)
    expect(groups.find((g) => g.id === "status")?.entries.map((c) => c.slug)).toContain("toast")
  })
  it("includes only SCs actually listed in each teaching page and de-duplicates each group", () => {
    const groups = groupCatalog(componentCatalog, "wcag")
    expect(groups.find((g) => g.id === "2.1.1")?.entries.map((c) => c.slug)).toContain("accordion")
    expect(groups.find((g) => g.id === "4.1.3")?.entries.map((c) => c.slug)).not.toContain("accordion")
    for (const group of groups) expect(new Set(group.entries.map((e) => e.slug)).size).toBe(group.entries.length)
  })
})
