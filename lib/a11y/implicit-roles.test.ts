import { describe, expect, it } from "vitest"
import { implicitRole } from "./implicit-roles"

// 用 <template> 而非 <div>：HTML parser 會把 <th>、<td> 這類只能出現在表格
// 裡的元素從一般容器中丟掉，template 的 fragment parsing 則允許任意內容。
function el(html: string): Element {
  const host = document.createElement("template")
  host.innerHTML = html
  const first = host.content.firstElementChild
  if (!first) throw new Error("測試 HTML 沒有元素")
  return first
}

describe("implicitRole", () => {
  it("button 是 button", () => {
    expect(implicitRole(el("<button>送出</button>"))).toBe("button")
  })

  it("有 href 的 a 是 link，沒有 href 的是 generic", () => {
    expect(implicitRole(el('<a href="/x">連結</a>'))).toBe("link")
    expect(implicitRole(el("<a>非連結</a>"))).toBe("generic")
  })

  it("input 依 type 決定 role", () => {
    expect(implicitRole(el('<input type="checkbox">'))).toBe("checkbox")
    expect(implicitRole(el('<input type="radio">'))).toBe("radio")
    expect(implicitRole(el('<input type="text">'))).toBe("textbox")
    expect(implicitRole(el("<input>"))).toBe("textbox")
    expect(implicitRole(el('<input type="search">'))).toBe("searchbox")
    expect(implicitRole(el('<input type="range">'))).toBe("slider")
    expect(implicitRole(el('<input type="submit">'))).toBe("button")
    expect(implicitRole(el('<input type="hidden">'))).toBe("none")
  })

  it("select 依 multiple / size 區分 combobox 與 listbox", () => {
    expect(implicitRole(el("<select></select>"))).toBe("combobox")
    expect(implicitRole(el("<select multiple></select>"))).toBe("listbox")
    expect(implicitRole(el('<select size="4"></select>'))).toBe("listbox")
  })

  it("標題依層級回傳 heading", () => {
    expect(implicitRole(el("<h1>標題</h1>"))).toBe("heading")
    expect(implicitRole(el("<h4>標題</h4>"))).toBe("heading")
  })

  it("dialog 是 dialog", () => {
    expect(implicitRole(el("<dialog></dialog>"))).toBe("dialog")
  })

  it("img 有 alt 是 img，alt 為空字串是 presentation", () => {
    expect(implicitRole(el('<img alt="貓">'))).toBe("img")
    expect(implicitRole(el('<img alt="">'))).toBe("presentation")
  })

  it("th 依 scope 區分 columnheader 與 rowheader", () => {
    expect(implicitRole(el('<th scope="col">欄</th>'))).toBe("columnheader")
    expect(implicitRole(el('<th scope="row">列</th>'))).toBe("rowheader")
  })

  it("地標元素", () => {
    expect(implicitRole(el("<nav></nav>"))).toBe("navigation")
    expect(implicitRole(el("<main></main>"))).toBe("main")
    expect(implicitRole(el("<aside></aside>"))).toBe("complementary")
  })

  it("header 在頁面層級是 banner，被 section 包住則是 generic", () => {
    const page = el("<header></header>")
    document.body.append(page)
    expect(implicitRole(page)).toBe("banner")
    page.remove()

    const wrapper = el("<section><header></header></section>")
    document.body.append(wrapper)
    const inner = wrapper.querySelector("header")!
    expect(implicitRole(inner)).toBe("generic")
    wrapper.remove()
  })

  it("未知元素回傳 generic", () => {
    expect(implicitRole(el("<span>文字</span>"))).toBe("generic")
    expect(implicitRole(el("<div></div>"))).toBe("generic")
  })
})
