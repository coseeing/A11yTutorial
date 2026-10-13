import { render, screen } from "@testing-library/react"
import { readFileSync } from "node:fs"
import { describe, expect, it } from "vitest"
import { computeA11yNode } from "@/lib/a11y/compute-node"
import { LandmarkDemo } from "./LandmarkDemo"

/** 面板實際會顯示的 Role —— 走的是跟頁面上同一條路。 */
function roleOf(selector: string) {
  return computeA11yNode(document.querySelector(selector))?.role
}

describe("LandmarkDemo", () => {
  // APG-LMK-018：搜尋功能用搜尋地標，不是 form
  it("搜尋區塊是 search 地標", () => {
    render(<LandmarkDemo />)
    expect(roleOf("#landmark-demo search")).toBe("search")
    expect(document.querySelector("#landmark-demo search form")).toBeNull()
  })

  // APG-LMK-014 / 015：form 地標具識別用途的名稱，代表整份表單
  it("訂閱表單是具名的 form 地標", () => {
    render(<LandmarkDemo />)
    const form = document.querySelector("#landmark-demo form")!
    expect(roleOf("#landmark-demo form")).toBe("form")
    expect(form.getAttribute("aria-labelledby")).toBe("landmark-demo-form-heading")
    expect(computeA11yNode(form)?.name).toBe("訂閱更新通知")
  })

  // APG-LMK-017 / 020：section 只有具名時才是 region —— 這兩條就是這組對照組的重點
  it("具名的 section 是 region，沒有名稱的是 generic", () => {
    render(<LandmarkDemo />)
    expect(roleOf("#landmark-demo section[aria-labelledby]")).toBe("region")
    expect(roleOf("#landmark-demo section[data-demo='unnamed']")).toBe("generic")
  })

  it("具名 section 的名稱來自它的可見標題", () => {
    render(<LandmarkDemo />)
    const region = document.querySelector("#landmark-demo section[aria-labelledby]")!
    expect(computeA11yNode(region)?.name).toBe("本週更新")
  })

  // 這一頁有九個面板，每一個都該指認自己的觀察對象 ——
  // 同樣長相的面板擺九個卻沒有說明，讀者對不起來哪個是哪個。
  it("九個面板各有自己的觀察對象說明", () => {
    render(<LandmarkDemo />)
    const hints = screen.getAllByText(/^觀察對象：/)
    expect(hints).toHaveLength(9)
    expect(new Set(hints.map((el) => el.textContent)).size).toBe(9)
  })
})

// 這一頁的前四個與最後一個面板盯的是 app/layout.tsx 裡真正的地標，
// 不是 demo 區塊裡造出來的。那些元素在單元測試裡渲染不出來，所以改成
// 讀原始碼守住結構 —— layout 一改，這一頁的對照就不成立了。
describe("layout 的地標結構", () => {
  const layout = readFileSync("app/layout.tsx", "utf8")

  it("SiteNav 包在 body 層級的 <header> 裡，整站才有 banner", () => {
    expect(layout).toMatch(/<header>\s*<SiteNav \/>\s*<\/header>/)
  })

  it("主要內容是 <main id=\"main\">，略過連結才指得到", () => {
    expect(layout).toContain('<main id="main"')
    expect(layout).toContain('href="#main"')
  })

  it("<header> 與 <main> 都沒有被其他 sectioning 元素包住", () => {
    // body 的直接子元素依序是：略過連結、header、main、DemoFooter。
    // 只要 header 或 main 被包進 section/article 之類的元素，角色就不再是
    // banner 與 main —— 那正是這一頁第四個面板示範的陷阱。
    const body = layout.slice(layout.indexOf("<body"), layout.indexOf("</body>"))
    expect(body).not.toMatch(/<(section|article|aside|nav)[\s>][\s\S]*<header>/)
    expect(body).not.toMatch(/<(section|article|aside|nav)[\s>][\s\S]*<main /)
  })

  it("頁尾用 <footer>，算出 contentinfo", () => {
    const footer = readFileSync("components/demo/DemoFooter.tsx", "utf8")
    expect(footer).toContain("<footer")
    expect(layout).toContain("<DemoFooter />")
  })
})
