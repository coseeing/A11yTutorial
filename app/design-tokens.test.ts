import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

// 這個專案的 spacing 刻度是自訂的（globals.css 的 @theme），只定義了特定幾個數字。
// 用到沒定義的數字時 Tailwind 不會報錯，而是安靜地退回它自己的 0.25rem 預設刻度 ——
// w-44 會變成 11rem 而不是 4.4rem，是原本意圖的兩倍半。
//
// 這種錯誤編譯得過、型別檢查得過、單元測試也得過，只有肉眼看得出來。所以在這裡擋。

const SPACING_TOKENS = new Set(
  [...readFileSync("app/globals.css", "utf8").matchAll(/--spacing-(\d+):/g)].map((m) => m[1]),
)

const UTILITY = new RegExp(
  "(?<![\\w-])(" +
    [
      "size", "w", "h", "min-w", "min-h", "max-w", "max-h",
      "gap", "gap-x", "gap-y", "space-x", "space-y",
      "p", "px", "py", "pt", "pb", "ps", "pe",
      "m", "mx", "my", "mt", "mb", "ms", "me",
      "top", "bottom", "left", "right", "inset",
    ].join("|") +
    ")-(\\d+)(?![\\w.\\[])",
  "g",
)

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (entry === "node_modules" || entry === ".next") return []
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return path.endsWith(".tsx") ? [path] : []
  })
}

/**
 * 去掉註解 —— 註解裡談論某個類別名稱是正當的（「別用 w-44，因為…」），
 * 不該被當成違規。只處理 // 與 block 註解，字串內的 // 在 className 裡不會出現。
 */
function stripComments(source: string): string[] {
  let inBlock = false
  return source.split("\n").map((line) => {
    let out = ""
    let i = 0
    while (i < line.length) {
      if (inBlock) {
        const end = line.indexOf("*/", i)
        if (end === -1) return out
        inBlock = false
        i = end + 2
        continue
      }
      const block = line.indexOf("/*", i)
      const lineComment = line.indexOf("//", i)
      if (lineComment !== -1 && (block === -1 || lineComment < block)) {
        return out + line.slice(i, lineComment)
      }
      if (block !== -1) {
        out += line.slice(i, block)
        inBlock = true
        i = block + 2
        continue
      }
      return out + line.slice(i)
    }
    return out
  })
}

describe("design tokens", () => {
  it("spacing 類別只使用 globals.css 定義的刻度", () => {
    const offenders: string[] = []

    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      stripComments(readFileSync(file, "utf8"))
        .forEach((line, i) => {
          for (const match of line.matchAll(UTILITY)) {
            const value = match[2]
            // 0 不受刻度影響，任何刻度下都是 0。
            if (value === "0" || SPACING_TOKENS.has(value)) continue
            offenders.push(`${file}:${i + 1}  ${match[0]}`)
          }
        })
    }

    expect(
      offenders,
      `以下類別用了未定義的 spacing 刻度，Tailwind 會退回 0.25rem 預設值。` +
        `改用已定義的 token，或寫成 arbitrary value（例如 w-[4.4rem]）：\n${offenders.join("\n")}`,
    ).toEqual([])
  })
})
