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

  // /landmark-regions 那一頁把這兩個擺在一起對照：同樣是 <header>，
  // 包在 main 裡面就不是 banner 了。
  it("header 被 main 包住也是 generic", () => {
    const wrapper = el("<main><header></header></main>")
    document.body.append(wrapper)
    expect(implicitRole(wrapper.querySelector("header")!)).toBe("generic")
    wrapper.remove()
  })

  it("footer 在頁面層級是 contentinfo，被 article 包住則是 generic", () => {
    const page = el("<footer></footer>")
    document.body.append(page)
    expect(implicitRole(page)).toBe("contentinfo")
    page.remove()

    const wrapper = el("<article><footer></footer></article>")
    document.body.append(wrapper)
    expect(implicitRole(wrapper.querySelector("footer")!)).toBe("generic")
    wrapper.remove()
  })

  it("search 是搜尋地標", () => {
    expect(implicitRole(el("<search></search>"))).toBe("search")
  })

  // form 與 section 只有具名時才是地標 —— 沒有名字的地標在地標清單裡
  // 只會顯示角色名，使用者分不出是哪一個，所以規範乾脆不讓它成為地標。
  it("form 與 section 只有具備無障礙名稱時才是地標", () => {
    expect(implicitRole(el("<form></form>"))).toBe("generic")
    expect(implicitRole(el('<form aria-label="訂閱更新通知"></form>'))).toBe("form")
    expect(implicitRole(el('<form aria-labelledby="h"></form>'))).toBe("form")

    expect(implicitRole(el("<section></section>"))).toBe("generic")
    expect(implicitRole(el('<section aria-label="本週更新"></section>'))).toBe("region")
    expect(implicitRole(el('<section aria-labelledby="h"></section>'))).toBe("region")
  })

  it("未知元素回傳 generic", () => {
    expect(implicitRole(el("<span>文字</span>"))).toBe("generic")
    expect(implicitRole(el("<div></div>"))).toBe("generic")
  })
})
