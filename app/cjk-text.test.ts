import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, it } from "vitest"

// JSX 把跨行的文字子節點用「一個空格」接起來。英文靠空格分詞，所以這是對的；
// 中文沒有詞間空格，接起來就是句子中間莫名多一個空格：
//
//   <p>
//     純資訊告知、不需要使用者立刻
//     採取行動
//   </p>
//
// 渲染出來是「不需要使用者立刻 採取行動」。這不會報錯、型別檢查過得了、
// 單元測試也過得了，只有把頁面讀一遍才看得出來。
//
// 寫法上的對策：中文散文一律寫成字串常數再以 {} 插入。字串字面值不能跨行，
// 自然就不會被接。

const CJK = "[\\u4e00-\\u9fff\\u3001\\u3002\\uff0c\\uff1a\\uff1b\\uff08\\uff09\\u300c\\u300d]"
const ENDS_WITH_CJK = new RegExp(CJK + "$")
const STARTS_WITH_CJK = new RegExp("^" + CJK)

type Line = { code: string; inTemplate: boolean }

/**
 * 去掉註解，並標出每一行是否位於 template literal 內。
 *
 * template literal 要排除：它的換行是真的換行（程式碼範例就靠這個排版），
 * 不會被 JSX 接成空格。
 */
function analyse(source: string): Line[] {
  const lines: Line[] = []
  let inBlockComment = false
  let inTemplate = false

  for (const line of source.split("\n")) {
    const startedInTemplate = inTemplate
    let code = ""
    let i = 0

    while (i < line.length) {
      if (inBlockComment) {
        const end = line.indexOf("*/", i)
        if (end === -1) break
        inBlockComment = false
        i = end + 2
        continue
      }
      if (inTemplate) {
        const end = line.indexOf("`", i)
        if (end === -1) break
        inTemplate = false
        i = end + 1
        continue
      }
      const block = line.indexOf("/*", i)
      const lineComment = line.indexOf("//", i)
      const template = line.indexOf("`", i)
      const next = [block, lineComment, template].filter((x) => x !== -1)
      if (next.length === 0) {
        code += line.slice(i)
        break
      }
      const at = Math.min(...next)
      code += line.slice(i, at)
      if (at === lineComment) break
      if (at === block) {
        inBlockComment = true
        i = at + 2
      } else {
        inTemplate = true
        i = at + 1
      }
    }

    lines.push({ code, inTemplate: startedInTemplate || inTemplate })
  }

  return lines
}

function sourceFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (entry === "node_modules" || entry === ".next") return []
    if (statSync(path).isDirectory()) return sourceFiles(path)
    return path.endsWith(".tsx") && !path.endsWith(".test.tsx") ? [path] : []
  })
}

describe("中文文字", () => {
  it("不把中文句子拆成多行 JSX 子節點", () => {
    const offenders: string[] = []

    for (const file of [...sourceFiles("app"), ...sourceFiles("components")]) {
      const lines = analyse(readFileSync(file, "utf8"))
      for (let i = 0; i < lines.length - 1; i++) {
        const current = lines[i]
        const next = lines[i + 1]
        if (current.inTemplate || next.inTemplate) continue

        const left = current.code.trimEnd()
        const right = next.code.trim()
        if (!left || !right) continue

        if (ENDS_WITH_CJK.test(left) && STARTS_WITH_CJK.test(right)) {
          offenders.push(`${file}:${i + 1}  …${left.slice(-10)} ⏎ ${right.slice(0, 10)}…`)
        }
      }
    }

    expect(
      offenders,
      "以下位置的中文句子被拆成多行，JSX 會在接合處插入一個空格。" +
        `請把整句寫成字串常數再以 {} 插入：\n${offenders.join("\n")}`,
    ).toEqual([])
  })
})
