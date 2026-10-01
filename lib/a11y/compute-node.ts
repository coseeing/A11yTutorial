import {
  computeAccessibleDescription,
  computeAccessibleName,
} from "dom-accessibility-api"
import { implicitRole } from "./implicit-roles"

export type A11yNode = {
  /** ARIA role，明寫的 role 屬性優先，否則由 tagName 推導。 */
  role: string
  /** Accessible name，依 accname 規範計算；沒有名稱時為空字串。 */
  name: string
  /**
   * Accessible description，通常來自 aria-describedby。與 name 是兩回事：
   * name 是「這是什麼」，description 是輔助科技在名稱之後補充播報的說明。
   * 沒有描述時為空字串。
   */
  description: string
  /**
   * 目前的狀態，例如 ["expanded"]。順序固定，見 STATUS_ORDER。
   *
   * 收錄的判準是「螢幕閱讀器會不會連同角色與名稱一起把它唸出來」，不是 ARIA
   * 規範的 state / property 分類。所以 required 與 readonly 留著 —— ARIA 把
   * 它們歸為 property，但 NVDA 確實會唸「必填」「唯讀」。
   *
   * 反過來，這兩個被排除：
   *   open   —— HTML 屬性，無障礙樹裡根本沒有這個狀態。對 <dialog> 也多餘：
   *             沒有 open 就不在樹裡，面板會顯示空狀態。
   *   modal  —— 開關對話框時沒有任何螢幕閱讀器會唸出「modal」。它是輔助科技
   *             用來決定要不要限制瀏覽範圍的內部旗標，不是播報內容。
   *
   * modal 的意義改在各元件頁的 ARIA 屬性表裡說明。
   */
  status: string[]
}

// 狀態的輸出順序固定成這一份清單的順序，而不是屬性在 DOM 上的書寫順序 —
// 否則同一個元件在不同頁面會顯示出不同排列，讀者會以為那是有意義的差別。
const STATUS_ORDER = [
  "expanded",
  "collapsed",
  "checked",
  "unchecked",
  "mixed",
  "selected",
  "pressed",
  "unpressed",
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

  // 三態都要輸出。只在 true 時出現會讓「這是一顆 toggle、目前沒按下」與
  // 「這根本不是 toggle」在面板上長得一模一樣。
  const pressed = attr("aria-pressed")
  if (pressed === "true") found.add("pressed")
  if (pressed === "false") found.add("unpressed")
  if (pressed === "mixed") found.add("mixed")

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
    description: computeAccessibleDescription(el),
    status: collectStatus(el),
  }
}
