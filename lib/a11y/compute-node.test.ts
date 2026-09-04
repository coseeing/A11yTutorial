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

  it("沒有名稱時 name 為空字串", () => {
    const node = computeA11yNode(mount("<div></div>"))
    expect(node!.name).toBe("")
  })

  it("aria-expanded 轉成 expanded / collapsed", () => {
    expect(computeA11yNode(mount('<button aria-expanded="true">更多</button>'))!.status)
      .toContain("expanded")
    expect(computeA11yNode(mount('<button aria-expanded="false">更多</button>'))!.status)
      .toContain("collapsed")
  })

  it("aria-checked 三態", () => {
    expect(computeA11yNode(mount('<div role="checkbox" aria-checked="true"></div>'))!.status)
      .toContain("checked")
    expect(computeA11yNode(mount('<div role="checkbox" aria-checked="false"></div>'))!.status)
      .toContain("unchecked")
    expect(computeA11yNode(mount('<div role="checkbox" aria-checked="mixed"></div>'))!.status)
      .toContain("mixed")
  })

  it("原生 disabled 與 aria-disabled 都算 disabled，且不重複", () => {
    const node = computeA11yNode(mount('<button disabled aria-disabled="true">送出</button>'))
    expect(node!.status.filter((s) => s === "disabled")).toHaveLength(1)
  })

  it("原生 checkbox 的 checked 狀態", () => {
    const input = mount('<input type="checkbox" aria-label="同意">') as HTMLInputElement
    expect(computeA11yNode(input)!.status).toContain("unchecked")
    input.checked = true
    expect(computeA11yNode(input)!.status).toContain("checked")
  })

  it("aria-current 帶出其值", () => {
    const node = computeA11yNode(mount('<a href="/x" aria-current="page">目前</a>'))
    expect(node!.status).toContain("current=page")
  })

  it("aria-current=false 不算狀態", () => {
    const node = computeA11yNode(mount('<a href="/x" aria-current="false">其他</a>'))
    expect(node!.status).not.toContain("current=false")
  })

  it("aria-modal 與 open 一起出現在 modal dialog 上", () => {
    const node = computeA11yNode(mount('<dialog open aria-modal="true" aria-label="設定"></dialog>'))
    expect(node!.status).toEqual(expect.arrayContaining(["open", "modal"]))
  })

  it(":modal 不被環境支援時不會炸掉，仍回報 open", () => {
    // jsdom 不認得 :modal pseudo-class，matches() 會丟 SyntaxError。
    const node = computeA11yNode(mount('<dialog open aria-label="設定"></dialog>'))
    expect(node!.status).toContain("open")
    expect(node!.status).not.toContain("modal")
  })

  it("沒有任何狀態時 status 是空陣列", () => {
    expect(computeA11yNode(mount("<button>送出</button>"))!.status).toEqual([])
  })

  it("狀態順序穩定，不隨屬性書寫順序改變", () => {
    const a = computeA11yNode(mount('<button aria-disabled="true" aria-expanded="true">A</button>'))
    const b = computeA11yNode(mount('<button aria-expanded="true" aria-disabled="true">B</button>'))
    expect(a!.status).toEqual(b!.status)
  })
})
