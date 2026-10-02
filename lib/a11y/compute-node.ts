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
   * 目前的狀態，每一項是「屬性=值」，例如 ["aria-expanded=false"]。
   * 順序固定，見 STATUS_ORDER。
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

// 狀態的輸出順序固定成這一份清單的順序，而不是屬性在 DOM 上的書寫順序 ——
// 否則同一個元件在不同頁面會顯示出不同排列，讀者會以為那是有意義的差別。
const STATUS_ORDER = [
  "expanded",
  "checked",
  "selected",
  "pressed",
  "disabled",
  "readonly",
  "required",
  "invalid",
  "busy",
  "current",
] as const

type StatusKey = (typeof STATUS_ORDER)[number]

/**
 * 每個狀態輸出成「屬性=值」，例如 aria-expanded=false。
 *
 * 屬性名用的是「DOM 上真的找得到的那一個」。原生元素的勾選與停用狀態沒有對應的
 * aria-* 屬性，瀏覽器直接把原生屬性映射進無障礙樹 —— 這種情況就寫 checked=true、
 * disabled=true，而不是憑空寫一個 DOM 上不存在的 aria-checked。
 *
 * 值用的是真實值：true / false / mixed / page，不是 expanded、collapsed 這類
 * 無障礙樹的狀態名。那些名字是螢幕閱讀器播報用的，不是屬性的值。
 */
function collectStatus(el: Element): string[] {
  const found = new Map<StatusKey, string>()
  const attr = (name: string) => el.getAttribute(name)

  /** ARIA 屬性存在且值在允許範圍內時收錄。 */
  const fromAria = (key: StatusKey, name: string, allowed: readonly string[]) => {
    const value = attr(name)
    if (value !== null && allowed.includes(value)) found.set(key, `${name}=${value}`)
  }

  fromAria("expanded", "aria-expanded", ["true", "false"])
  fromAria("checked", "aria-checked", ["true", "false", "mixed"])
  fromAria("selected", "aria-selected", ["true"])
  fromAria("pressed", "aria-pressed", ["true", "false", "mixed"])

  // 原生 checkbox / radio：勾選狀態在 property 上，而且沒有 aria-checked。
  // 只在作者沒有明寫 aria-checked 時才用它，明寫的優先。
  if (
    el instanceof HTMLInputElement &&
    (el.type === "checkbox" || el.type === "radio") &&
    !found.has("checked")
  ) {
    found.set("checked", el.indeterminate ? "indeterminate=true" : `checked=${el.checked}`)
  }

  // 停用、唯讀、必填：原生屬性與 ARIA 屬性都算，以實際存在的那一個為準。
  if (attr("aria-disabled") === "true") found.set("disabled", "aria-disabled=true")
  else if (el.hasAttribute("disabled")) found.set("disabled", "disabled=true")

  if (attr("aria-readonly") === "true") found.set("readonly", "aria-readonly=true")
  else if (el.hasAttribute("readonly")) found.set("readonly", "readonly=true")

  if (attr("aria-required") === "true") found.set("required", "aria-required=true")
  else if (el.hasAttribute("required")) found.set("required", "required=true")

  const invalid = attr("aria-invalid")
  if (invalid && invalid !== "false") found.set("invalid", `aria-invalid=${invalid}`)

  if (attr("aria-busy") === "true") found.set("busy", "aria-busy=true")

  // aria-current 的值本身有意義（page / step / date…），原樣輸出。
  const current = attr("aria-current")
  if (current && current !== "false") found.set("current", `aria-current=${current}`)

  return STATUS_ORDER.filter((key) => found.has(key)).map((key) => found.get(key)!)
}

function resolveRole(el: Element): string {
  const explicit = (el.getAttribute("role") ?? "").trim()
  if (explicit) {
    // role 允許空白分隔的備援清單；瀏覽器取第一個認得的值，這裡取第一個。
    const first = explicit.split(/\s+/)[0]
    if (first) return first
  }
  return implicitRole(el)
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
