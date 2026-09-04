import { computeAccessibleName } from "dom-accessibility-api"
import { implicitRole } from "./implicit-roles"

export type A11yNode = {
  /** ARIA role，明寫的 role 屬性優先，否則由 tagName 推導。 */
  role: string
  /** Accessible name，依 accname 規範計算；沒有名稱時為空字串。 */
  name: string
  /** 目前的狀態，例如 ["open", "modal"]。順序固定，見 STATUS_ORDER。 */
  status: string[]
}

// 狀態的輸出順序固定成這一份清單的順序，而不是屬性在 DOM 上的書寫順序 —
// 否則同一個元件在不同頁面會顯示出不同排列，讀者會以為那是有意義的差別。
const STATUS_ORDER = [
  "open",
  "modal",
  "expanded",
  "collapsed",
  "checked",
  "unchecked",
  "mixed",
  "selected",
  "pressed",
  "disabled",
  "readonly",
  "required",
  "invalid",
  "busy",
] as const

function resolveRole(el: Element): string {
  const explicit = (el.getAttribute("role") ?? "").trim()
  if (explicit) {
    // role 允許空白分隔的備援清單；瀏覽器取第一個認得的值，這裡取第一個。
    const first = explicit.split(/\s+/)[0]
    if (first) return first
  }
  return implicitRole(el)
}

function collectStatus(el: Element): string[] {
  const found = new Set<string>()
  const attr = (name: string) => el.getAttribute(name)

  if (el.hasAttribute("open")) found.add("open")
  if (attr("aria-modal") === "true") found.add("modal")

  const expanded = attr("aria-expanded")
  if (expanded === "true") found.add("expanded")
  if (expanded === "false") found.add("collapsed")

  const checked = attr("aria-checked")
  if (checked === "true") found.add("checked")
  if (checked === "false") found.add("unchecked")
  if (checked === "mixed") found.add("mixed")

  // 原生 checkbox / radio 的勾選狀態不在屬性上，要讀 property。
  if (el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio")) {
    if (el.indeterminate) found.add("mixed")
    else found.add(el.checked ? "checked" : "unchecked")
  }

  if (attr("aria-selected") === "true") found.add("selected")

  const pressed = attr("aria-pressed")
  if (pressed === "true" || pressed === "mixed") found.add("pressed")

  if (el.hasAttribute("disabled") || attr("aria-disabled") === "true") found.add("disabled")
  if (el.hasAttribute("readonly") || attr("aria-readonly") === "true") found.add("readonly")
  if (el.hasAttribute("required") || attr("aria-required") === "true") found.add("required")

  const invalid = attr("aria-invalid")
  if (invalid && invalid !== "false") found.add("invalid")

  if (attr("aria-busy") === "true") found.add("busy")

  const ordered = STATUS_ORDER.filter((s) => found.has(s)) as string[]

  // aria-current 的值本身有意義（page / step / date…），所以帶值輸出，排在最後。
  const current = attr("aria-current")
  if (current && current !== "false") {
    ordered.push(`current=${current === "true" ? "true" : current}`)
  }

  return ordered
}

function isInAccessibilityTree(el: Element): boolean {
  if (el.getAttribute("aria-hidden") === "true") return false
  if (el.hasAttribute("hidden")) return false
  // 未開啟的原生 <dialog> 仍留在 DOM 中，但不在無障礙樹裡。
  if (el.tagName.toLowerCase() === "dialog" && !el.hasAttribute("open")) return false
  if (el.closest('[aria-hidden="true"]')) return false
  return true
}

/**
 * 算出一個 DOM 元素在無障礙樹中的樣貌。
 * 回傳 null 代表該元素不在無障礙樹中（不存在、被隱藏、或是未開啟的 dialog）。
 */
export function computeA11yNode(el: Element | null | undefined): A11yNode | null {
  if (!el) return null
  if (!isInAccessibilityTree(el)) return null

  return {
    role: resolveRole(el),
    name: computeAccessibleName(el),
    status: collectStatus(el),
  }
}
