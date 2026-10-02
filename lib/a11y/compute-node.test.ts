import { afterEach, describe, expect, it } from "vitest"
import { computeA11yNode } from "./compute-node"

function mount(html: string): Element {
  const host = document.createElement("div")
  host.innerHTML = html
  document.body.append(host)
  const first = host.firstElementChild
  if (!first) throw new Error("測試 HTML 沒有元素")
  return first
}

afterEach(() => {
  document.body.innerHTML = ""
})

describe("computeA11yNode", () => {
  it("元素不存在時回傳 null", () => {
    expect(computeA11yNode(null)).toBeNull()
    expect(computeA11yNode(undefined)).toBeNull()
  })

  it("aria-hidden 或 hidden 的元素不在無障礙樹中", () => {
    expect(computeA11yNode(mount('<button aria-hidden="true">關閉</button>'))).toBeNull()
    expect(computeA11yNode(mount("<button hidden>關閉</button>"))).toBeNull()
  })

  it("未開啟的 dialog 不在無障礙樹中", () => {
    expect(computeA11yNode(mount("<dialog><h2>標題</h2></dialog>"))).toBeNull()
  })

  it("已開啟的 dialog 有 dialog role", () => {
    const node = computeA11yNode(mount('<dialog open aria-label="設定"></dialog>'))
    expect(node).not.toBeNull()
    expect(node!.role).toBe("dialog")
    expect(node!.name).toBe("設定")
  })

  it("明寫的 role 優先於 implicit role", () => {
    const node = computeA11yNode(mount('<div role="alert">錯誤</div>'))
    expect(node!.role).toBe("alert")
  })

  it("role 有多個值時取第一個支援的", () => {
    const node = computeA11yNode(mount('<div role="doc-tip note">提示</div>'))
    expect(node!.role).toBe("doc-tip")
  })

  it("從內容算出 accessible name", () => {
    const node = computeA11yNode(mount("<button>儲存變更</button>"))
    expect(node!.name).toBe("儲存變更")
  })

  it("aria-label 覆蓋內容文字", () => {
    const node = computeA11yNode(mount('<button aria-label="關閉對話框">×</button>'))
    expect(node!.name).toBe("關閉對話框")
  })

  it("aria-describedby 取得描述，與 name 是兩回事", () => {
    const node = computeA11yNode(
      mount(`<dialog open aria-labelledby="t" aria-describedby="d">
        <h2 id="t">刪除這筆紀錄？</h2>
        <p id="d">刪除後無法復原。</p>
      </dialog>`),
    )
    expect(node!.name).toBe("刪除這筆紀錄？")
    expect(node!.description).toBe("刪除後無法復原。")
  })

  it("沒有描述時 description 為空字串", () => {
    expect(computeA11yNode(mount("<button>送出</button>"))!.description).toBe("")
  })

  it("沒有名稱時 name 為空字串", () => {
    const node = computeA11yNode(mount("<div></div>"))
    expect(node!.name).toBe("")
  })

  it("aria-expanded 原樣輸出屬性與值", () => {
    expect(computeA11yNode(mount('<button aria-expanded="true">更多</button>'))!.status)
      .toEqual(["aria-expanded=true"])
    expect(computeA11yNode(mount('<button aria-expanded="false">更多</button>'))!.status)
      .toEqual(["aria-expanded=false"])
  })

  it("aria-checked 三態", () => {
    const checked = (v: string) =>
      computeA11yNode(mount(`<div role="checkbox" aria-checked="${v}"></div>`))!.status
    expect(checked("true")).toEqual(["aria-checked=true"])
    expect(checked("false")).toEqual(["aria-checked=false"])
    expect(checked("mixed")).toEqual(["aria-checked=mixed"])
  })

  it("aria-pressed 三態都輸出", () => {
    const pressed = (v: string) =>
      computeA11yNode(mount(`<button aria-pressed="${v}">靜音</button>`))!.status
    expect(pressed("true")).toEqual(["aria-pressed=true"])
    expect(pressed("false")).toEqual(["aria-pressed=false"])
    expect(pressed("mixed")).toEqual(["aria-pressed=mixed"])
    // 不是 toggle 的按鈕不該有這些
    expect(computeA11yNode(mount("<button>送出</button>"))!.status).toEqual([])
  })

  // 同一個狀態只輸出一次，而且顯示實際存在的那個屬性。
  it("停用狀態以實際存在的屬性呈現，不重複輸出", () => {
    expect(computeA11yNode(mount("<button disabled>送出</button>"))!.status)
      .toEqual(["disabled=true"])
    expect(computeA11yNode(mount('<button aria-disabled="true">送出</button>'))!.status)
      .toEqual(["aria-disabled=true"])
    // 兩個都在時以 ARIA 為準，只輸出一項
    expect(computeA11yNode(mount('<button disabled aria-disabled="true">送出</button>'))!.status)
      .toEqual(["aria-disabled=true"])
  })

  // 原生 checkbox 沒有 aria-checked —— 勾選狀態在 property 上，瀏覽器直接把它
  // 映射進無障礙樹。寫一個 DOM 上不存在的 aria-checked 會誤導讀者。
  it("原生 checkbox 顯示 checked 而不是 aria-checked", () => {
    const input = mount('<input type="checkbox" aria-label="同意">') as HTMLInputElement
    expect(computeA11yNode(input)!.status).toEqual(["checked=false"])
    input.checked = true
    expect(computeA11yNode(input)!.status).toEqual(["checked=true"])
    input.indeterminate = true
    expect(computeA11yNode(input)!.status).toEqual(["indeterminate=true"])
  })

  it("原生 checkbox 若明寫 aria-checked，以它為準", () => {
    const input = mount('<input type="checkbox" aria-checked="mixed" aria-label="全選">')
    expect(computeA11yNode(input)!.status).toEqual(["aria-checked=mixed"])
  })

  it("aria-current 帶出其值", () => {
    const node = computeA11yNode(mount('<a href="/x" aria-current="page">目前</a>'))
    expect(node!.status).toEqual(["aria-current=page"])
  })

  it("aria-current=false 不算狀態", () => {
    const node = computeA11yNode(mount('<a href="/x" aria-current="false">其他</a>'))
    expect(node!.status).toEqual([])
  })

  // open 與 modal 都不收：螢幕閱讀器開關對話框時兩個都不會唸出來。
  // open 是 HTML 屬性，無障礙樹裡沒有對應狀態；modal 是輔助科技用來決定
  // 要不要限制瀏覽範圍的內部旗標，不是播報內容。
  it("open 與 modal 都不算狀態", () => {
    const modal = computeA11yNode(
      mount('<dialog open aria-modal="true" aria-label="設定"></dialog>'),
    )
    expect(modal!.status).toEqual([])

    const details = computeA11yNode(mount("<details open><summary>更多</summary>內容</details>"))
    expect(details!.status).toEqual([])
  })

  it("沒有任何狀態時 status 是空陣列", () => {
    expect(computeA11yNode(mount("<button>送出</button>"))!.status).toEqual([])
  })

  it("狀態順序穩定，不隨屬性書寫順序改變", () => {
    const a = computeA11yNode(mount('<button aria-disabled="true" aria-expanded="true">A</button>'))
    const b = computeA11yNode(mount('<button aria-expanded="true" aria-disabled="true">B</button>'))
    expect(a!.status).toEqual(["aria-expanded=true", "aria-disabled=true"])
    expect(b!.status).toEqual(a!.status)
  })
})
