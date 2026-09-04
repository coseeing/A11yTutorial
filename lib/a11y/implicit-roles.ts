// tagName → implicit ARIA role。
//
// 只涵蓋 demo 站會用到的元素，不是 HTML-AAM 的完整實作 — 目的是讓
// Accessibility Tree 面板在元件沒有明寫 role 時仍能顯示正確的值，而不是留白。
// 對應不到的一律回傳 "generic"，寧可誠實地說不知道，也不要猜錯。

const INPUT_ROLES: Record<string, string> = {
  button: "button",
  checkbox: "checkbox",
  color: "generic",
  date: "generic",
  "datetime-local": "generic",
  email: "textbox",
  file: "generic",
  hidden: "none",
  image: "button",
  month: "generic",
  number: "spinbutton",
  password: "generic",
  radio: "radio",
  range: "slider",
  reset: "button",
  search: "searchbox",
  submit: "button",
  tel: "textbox",
  text: "textbox",
  time: "generic",
  url: "textbox",
  week: "generic",
}

const TAG_ROLES: Record<string, string> = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  del: "deletion",
  details: "group",
  dfn: "term",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  hr: "separator",
  html: "document",
  ins: "insertion",
  li: "listitem",
  main: "main",
  math: "math",
  menu: "list",
  meter: "meter",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  option: "option",
  output: "status",
  p: "paragraph",
  progress: "progressbar",
  search: "search",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  thead: "rowgroup",
  tr: "row",
  ul: "list",
}

/** header / footer 只有在不被這些元素包住時，才是 banner / contentinfo。 */
const SECTIONING =
  "article, aside, main, nav, section, [role='article'], [role='complementary'], [role='main'], [role='navigation'], [role='region']"

export function implicitRole(el: Element): string {
  const tag = el.tagName.toLowerCase()

  if (tag === "a" || tag === "area") {
    return el.hasAttribute("href") ? "link" : "generic"
  }

  if (tag === "input") {
    const type = (el.getAttribute("type") ?? "text").toLowerCase()
    return INPUT_ROLES[type] ?? "textbox"
  }

  if (tag === "select") {
    const size = Number(el.getAttribute("size") ?? "1")
    return el.hasAttribute("multiple") || size > 1 ? "listbox" : "combobox"
  }

  if (tag === "img") {
    // alt="" 是作者明說「這是裝飾」；沒有 alt 屬性則是遺漏，仍當作圖片。
    return el.getAttribute("alt") === "" ? "presentation" : "img"
  }

  if (tag === "th") {
    const scope = (el.getAttribute("scope") ?? "").toLowerCase()
    if (scope === "row" || scope === "rowgroup") return "rowheader"
    return "columnheader"
  }

  if (tag === "td") {
    return "cell"
  }

  if (tag === "form" || tag === "section") {
    // 只有具備 accessible name 時才成為地標，否則是普通容器。
    const named =
      el.hasAttribute("aria-label") ||
      el.hasAttribute("aria-labelledby") ||
      el.hasAttribute("title")
    if (!named) return "generic"
    return tag === "form" ? "form" : "region"
  }

  if (tag === "header" || tag === "footer") {
    if (el.parentElement?.closest(SECTIONING)) return "generic"
    return tag === "header" ? "banner" : "contentinfo"
  }

  return TAG_ROLES[tag] ?? "generic"
}
