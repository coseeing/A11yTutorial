export type CatalogEntry = {
  slug: string
  name: string
  summary: string
  source: "apg" | "practice"
  sourcePath: string
  roles: string[]
  attributes: string[]
  aria: { attr: string; value: string; purpose: string }[]
  wcag: { id: string; name: string; level: string; note: string; href: string }[]
  apg: { id: string; name: string; expectation: string; topic: string }[]
}

export type CatalogView = "overview" | "wcag" | "roles"
export type CatalogGroup = { id: string; name: string; level?: string; entries: CatalogEntry[] }

const normalize = (text: string) => text.normalize("NFKC").toLocaleLowerCase().trim()

export function searchCatalog(entries: CatalogEntry[], query: string) {
  const terms = normalize(query).split(/\s+/).filter(Boolean)
  return entries.filter((entry) => {
    const text = normalize([
      entry.name, entry.summary, ...entry.roles, ...entry.attributes,
      ...entry.aria.map((a) => `${a.attr} ${a.value} ${a.purpose}`),
      ...entry.wcag.map((s) => `${s.id} ${s.name} ${s.note}`),
      ...entry.apg.map((r) => `${r.id} ${r.name} ${r.expectation} ${r.topic}`),
    ].join(" "))
    return terms.every((term) => text.includes(term))
  })
}

export function groupCatalog(entries: CatalogEntry[], view: Exclude<CatalogView, "overview">): CatalogGroup[] {
  const groups = new Map<string, CatalogGroup>()
  for (const entry of entries) {
    const keys = view === "wcag" ? entry.wcag.map((s) => ({ id: s.id, name: s.name, level: s.level })) : entry.roles.map((role) => ({ id: role, name: role, level: undefined }))
    for (const key of keys) {
      if (!groups.has(key.id)) groups.set(key.id, { ...key, entries: [] })
      groups.get(key.id)!.entries.push(entry)
    }
  }
  return [...groups.values()].sort((a, b) => a.id.localeCompare(b.id, "en", { numeric: true }))
}

export function matchReason(entry: CatalogEntry, query: string) {
  const value = normalize(query)
  if (!value) return null
  const attr = entry.aria.find((a) => normalize(`${a.attr} ${a.value} ${a.purpose}`).includes(value))
  if (attr) return { label: "ARIA 屬性", text: `${attr.attr}：${attr.purpose}`, section: "aria" }
  const sc = entry.wcag.find((s) => normalize(`${s.id} ${s.name} ${s.note}`).includes(value))
  if (sc) return { label: "WCAG 對應", text: `${sc.id} ${sc.name}`, section: "wcag" }
  if (entry.roles.some((r) => normalize(r).includes(value))) return { label: "角色語意", text: entry.roles.join(" · "), section: "aria" }
  const rule = entry.apg.find((r) => normalize(`${r.id} ${r.name} ${r.expectation} ${r.topic}`).includes(value))
  if (rule) return { label: "APG 規則", text: rule.name, section: "apg" }
  return null
}
