import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

// Read literal data from the existing teaching pages, without running page code.
const read = (file) => ts.createSourceFile(file, fs.readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)
function literal(node) {
  if (ts.isStringLiteralLike(node)) return node.text
  if (ts.isNumericLiteral(node)) return Number(node.text)
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(literal)
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.filter(ts.isPropertyAssignment).map((p) => [p.name.text, literal(p.initializer)]))
  throw new Error(`Expected literal data: ${node.getText().slice(0, 100)}`)
}
function variable(file, name) {
  let result
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText() === name) result = literal(node.initializer)
    ts.forEachChild(node, visit)
  }
  visit(read(file))
  if (!result) throw new Error(`Missing ${name} in ${file}`)
  return result
}
function componentProps(file, componentName, prop) {
  const result = []
  function visit(node) {
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText() === componentName) {
      const attr = node.attributes.properties.find((p) => ts.isJsxAttribute(p) && p.name.text === prop)
      if (attr?.initializer && ts.isJsxExpression(attr.initializer)) result.push(...literal(attr.initializer.expression))
    }
    ts.forEachChild(node, visit)
  }
  visit(read(file))
  return result
}
const components = variable("lib/components-registry.ts", "COMPONENTS").filter((c) => c.status === "done")
const rules = variable("lib/apg-rules.ts", "APG_RULES").filter((r) => r.difficulty === 1 || r.difficulty === 2)
// Native/implicit and supporting roles documented outside the ARIA table's role rows.
// These additions are anchored to each page's actual explanation or demo, not inferred from its name.
const documentedRoles = {
  accordion: ["heading"],
  breadcrumb: ["navigation", "list", "listitem", "link"],
  button: ["link"],
  carousel: ["button", "tabpanel"],
  checkbox: ["group"],
  combobox: ["listbox", "option", "dialog"],
  "landmark-regions": ["banner", "navigation", "main", "search", "form", "region", "complementary", "contentinfo"],
  link: ["link"],
  listbox: ["option", "group"],
  switch: ["group"],
  table: ["table", "row", "columnheader", "rowheader", "cell"],
}
const knownRoles = new Set("alert alertdialog article banner button cell checkbox columnheader combobox complementary contentinfo dialog feed form grid gridcell group heading link list listbox listitem main navigation option radio radiogroup region row rowgroup rowheader search status switch table tab tablist tabpanel tooltip".split(" "))
const unique = (values) => [...new Set(values)].sort()
const catalog = components.map((component) => {
  const sourcePath = path.posix.join("app/(component)", component.slug, "page.tsx")
  const aria = componentProps(sourcePath, "AriaTable", "rows")
  const wcag = componentProps(sourcePath, "WcagList", "criteria")
  const apg = rules.filter((r) => r.component === component.slug).map(({ id, name, expectation, topic }) => ({ id, name, expectation, topic }))
  const roles = unique([
    ...aria.filter((r) => /^role(?:$|[（(])/.test(r.attr)).flatMap((r) => r.value.match(/[a-z]+/g) ?? []).filter((r) => knownRoles.has(r)),
    ...(documentedRoles[component.slug] ?? []),
  ])
  return {
    slug: component.slug, name: component.name, summary: component.summary,
    source: component.source ?? "apg", sourcePath, roles, aria, wcag, apg,
    attributes: unique(aria.flatMap((r) => r.attr.match(/aria-[a-z]+/g) ?? [])),
  }
})
if (catalog.some((c) => !c.wcag.length || !c.roles.length)) throw new Error("A published page is missing WCAG or role metadata")
const output = "// Generated from the existing component teaching pages. Run npm run generate:catalog.\nimport type { CatalogEntry } from \"./component-catalog\"\n\nexport const componentCatalog: CatalogEntry[] = " + JSON.stringify(catalog, null, 2) + "\n"
fs.writeFileSync("lib/component-catalog.generated.ts", output)
console.log(`Indexed ${catalog.length} component pages, ${unique(catalog.flatMap((c) => c.wcag.map((s) => s.id))).length} WCAG criteria and ${unique(catalog.flatMap((c) => c.roles)).length} roles.`)
