// 由 data/apg-pattern-rules.csv 產生 lib/apg-rules.ts。
//
// 執行：npm run generate:apg-rules
//
// 那份 CSV 是人工維護的試算表匯出，有兩處需要特別處理，都在下方標註。
// 改動這支腳本或換掉 CSV 之後，務必重跑並提交產生出來的 lib/apg-rules.ts。

import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const SOURCE = join(root, "data/apg-pattern-rules.csv")
const TARGET = join(root, "lib/apg-rules.ts")

// APG 的 Rule ID 前綴 → 本站的路由 slug。
// slug 沿用 APG pattern 網址片段，唯一例外是 DLG：APG 叫 dialog-modal，
// 這裡沿用較短的 dialog。
const COMPONENT_BY_PREFIX = {
  ACC: "accordion",
  ALD: "alertdialog",
  ALERT: "alert",
  BRD: "breadcrumb",
  BTN: "button",
  CAR: "carousel",
  CBX: "combobox",
  CHK: "checkbox",
  DISC: "disclosure",
  DLG: "dialog",
  FED: "feed",
  GRID: "grid",
  LBX: "listbox",
  LINK: "link",
  LMK: "landmark-regions",
  RAD: "radio",
  SWT: "switch",
  TAB: "tabs",
  TBL: "table",
  TIP: "tooltip",
}

/** RFC 4180：逗號分隔、雙引號括住、"" 表示一個字面雙引號。 */
function parseCsv(text) {
  const rows = []
  let row = []
  let field = ""
  let quoted = false

  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (quoted) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else {
          quoted = false
        }
      } else {
        field += c
      }
      continue
    }
    if (c === '"') quoted = true
    else if (c === ",") {
      row.push(field)
      field = ""
    } else if (c === "\r") {
      // 忽略，交給 \n 處理換行
    } else if (c === "\n") {
      row.push(field)
      rows.push(row)
      row = []
      field = ""
    } else {
      field += c
    }
  }
  if (field !== "" || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

const raw = parseCsv(readFileSync(SOURCE, "utf8"))
const header = raw[0].map((h) => h.trim())
const records = raw
  .slice(1)
  .filter((cells) => cells.some((c) => c.trim() !== ""))
  .map((cells) => Object.fromEntries(header.map((h, i) => [h, (cells[i] ?? "").trim()])))

/**
 * 陷阱一：APG-TIP-009 整列自「對應規範」起左移一格 —— 該欄在來源試算表是空的，
 * 匯出時整列往前擠。它真正的知識難度落在「必／選」欄，必／選 則落在「無障礙主題」。
 */
function repair(r) {
  if (r["Rule ID"] !== "APG-TIP-009") return r
  return {
    ...r,
    對應規範: "",
    狀態: r["對應規範"],
    檢測類型: r["狀態"],
    檢測工具: r["檢測類型"],
    來源連結: r["檢測工具"],
    分類: r["來源連結"],
    無障礙主題: r["分類"],
    "必／選": r["無障礙主題"],
    知識難度: r["必／選"],
    "知識難度(修)": "",
    檢測方式類型: r["知識難度(修)"],
    reviewer: r["檢測方式類型"],
  }
}

/** 陷阱二：「知識難度(修)」是修正值，為數字時優先於「知識難度」。 */
function difficulty(r) {
  const revised = r["知識難度(修)"]
  const value = /^[123]$/.test(revised) ? revised : r["知識難度"]
  if (!/^[123]$/.test(value)) {
    throw new Error(`${r["Rule ID"]} 的知識難度不是 1/2/3：${JSON.stringify(value)}`)
  }
  return Number(value)
}

const rules = records.map(repair).map((r) => {
  const id = r["Rule ID"]
  const prefix = id.match(/^APG-([A-Z]+)-\d+$/)?.[1]
  const component = COMPONENT_BY_PREFIX[prefix]
  if (!component) throw new Error(`未知的 Rule ID 前綴：${id}`)

  return {
    id,
    component,
    // Reviewed 欄是人工校潤過的版本，有就優先用。
    name: r["規則名稱 - Reviewed"] || r["規則名稱"],
    expectation: r["預期 - Reviewed"] || r["預期"],
    criteria: r["對應規範"].split("；").map((s) => s.trim()).filter(Boolean),
    topic: r["無障礙主題"],
    required: r["必／選"] === "必",
    difficulty: difficulty(r),
    source: r["來源連結"],
  }
})

rules.sort((a, b) => a.id.localeCompare(b.id))

const byComponent = {}
for (const rule of rules) (byComponent[rule.component] ??= []).push(rule)

const counts = Object.entries(byComponent)
  .map(([c, rs]) => `//   ${c.padEnd(18)} ${String(rs.length).padStart(3)} 條，難度 2 有 ${rs.filter((r) => r.difficulty === 2).length} 條`)
  .sort()
  .join("\n")

const out = `// 由 data/apg-pattern-rules.csv 自動產生 —— 請勿手動編輯。
// 重新產生：npm run generate:apg-rules
//
// 共 ${rules.length} 條規則，${Object.keys(byComponent).length} 個元件，其中知識難度 2 有 ${rules.filter((r) => r.difficulty === 2).length} 條。
${counts}

/** 知識難度。2 代表該規則必須實作到 demo 上。 */
export type ApgDifficulty = 1 | 2 | 3

export type ApgRule = {
  /** 規則編號，例如 "APG-ACC-003" */
  id: string
  /** 對應的元件 slug，與 components-registry 一致 */
  component: string
  /** 規則名稱（中文） */
  name: string
  /** 預期行為（中文） */
  expectation: string
  /** 對應規範，例如 ["APG Accordion Pattern", "SC 4.1.2 Name, Role, Value"] */
  criteria: string[]
  /** 無障礙主題，例如「元件語意」「焦點管理」 */
  topic: string
  /** 必做為 true，選做為 false */
  required: boolean
  difficulty: ApgDifficulty
  /** APG pattern 頁面網址 */
  source: string
}

export const APG_RULES: ApgRule[] = ${JSON.stringify(rules, null, 2)}

/** 某個元件的全部規則。 */
export function rulesFor(component: string): ApgRule[] {
  return APG_RULES.filter((r) => r.component === component)
}

/**
 * 某個元件中「必須實作到 demo 上」的規則 —— 知識難度為 2 的那些。
 * 這是決定元件頁交付範圍的依據。
 */
export function mustDemo(component: string): ApgRule[] {
  return rulesFor(component).filter((r) => r.difficulty === 2)
}
`

writeFileSync(TARGET, out)
console.log(
  `已產生 ${TARGET}：${rules.length} 條規則 / ${Object.keys(byComponent).length} 個元件 / 難度 2 共 ${rules.filter((r) => r.difficulty === 2).length} 條`,
)
