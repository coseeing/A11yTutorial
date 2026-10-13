import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Feed, type FeedArticle } from "./Feed"

const ARTICLES: FeedArticle[] = [
  { id: "a1", title: "焦點不該憑空消失", meta: "10 月 2 日", body: "按下關閉後焦點要回去。" },
  { id: "a2", title: "顏色不是唯一的訊息", meta: "9 月 28 日", body: "錯誤要用文字說出來。" },
  { id: "a3", title: "標題是給人用的目錄", meta: "9 月 15 日", body: "層級不要為字級而挑。" },
]

function Harness({ busy = false }: { busy?: boolean }) {
  return (
    <>
      <h2 id="heading">最新文章</h2>
      <Feed articles={ARTICLES} labelledBy="heading" busy={busy} afterId="after" />
      <button id="after" type="button">
        載入更多
      </button>
    </>
  )
}

describe("Feed", () => {
  // APG-FED-009：feed 具無障礙名稱
  it("容器是具名的 feed", () => {
    render(<Harness />)
    const feed = screen.getByRole("feed", { name: "最新文章" })
    expect(feed).toHaveAttribute("aria-labelledby", "heading")
  })

  // APG-FED-010 / 011：所有內容都在 article 裡，每篇名稱可區分
  it("每篇文章都是具名的 article，名稱彼此不同", () => {
    render(<Harness />)
    const articles = screen.getAllByRole("article")
    expect(articles).toHaveLength(3)

    const names = articles.map((article) => article.getAttribute("aria-labelledby"))
    expect(new Set(names).size).toBe(3)
    expect(screen.getByRole("article", { name: "焦點不該憑空消失" })).toBeInTheDocument()
  })

  // APG-FED-012：aria-describedby 指向文章的主要內容
  it("文章的補充說明指向它的內文", () => {
    render(<Harness />)
    const article = screen.getByRole("article", { name: "焦點不該憑空消失" })
    const describedBy = article.getAttribute("aria-describedby")
    expect(describedBy).toBe("a1-body")
    expect(within(article).getByText("按下關閉後焦點要回去。")).toHaveAttribute("id", describedBy)
  })

  // APG-FED-015：aria-busy 明寫 false，而不是省略 —— 面板上那一列要看得見變化
  it("aria-busy 兩種狀態都明寫在 DOM 上", () => {
    const quiet = render(<Harness />)
    expect(screen.getByRole("feed", { name: "最新文章" })).toHaveAttribute("aria-busy", "false")
    quiet.unmount()

    render(<Harness busy />)
    expect(screen.getByRole("feed", { name: "最新文章" })).toHaveAttribute("aria-busy", "true")
  })

  it("每篇文章帶著位置與總數", () => {
    render(<Harness />)
    const articles = screen.getAllByRole("article")
    expect(articles.map((a) => a.getAttribute("aria-posinset"))).toEqual(["1", "2", "3"])
    for (const article of articles) {
      expect(article).toHaveAttribute("aria-setsize", "3")
    }
  })

  // 文章可聚焦是這個 pattern 的前提 —— 沒有落腳點，Page Down 就沒有意義。
  it("Page Down 與 Page Up 在文章之間移動", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const first = screen.getByRole("article", { name: "焦點不該憑空消失" })
    first.focus()
    expect(first).toHaveFocus()

    await user.keyboard("{PageDown}")
    expect(screen.getByRole("article", { name: "顏色不是唯一的訊息" })).toHaveFocus()

    await user.keyboard("{PageUp}")
    expect(first).toHaveFocus()
  })

  it("最後一篇按 Page Down 留在原處，不跳出串流", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const last = screen.getByRole("article", { name: "標題是給人用的目錄" })
    last.focus()
    await user.keyboard("{PageDown}")

    expect(last).toHaveFocus()
  })

  // Ctrl + End 是「跳出整個串流」，落在 feed 之後的第一個可聚焦元素上。
  it("Ctrl + End 跳到 feed 之後的元素", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    screen.getByRole("article", { name: "顏色不是唯一的訊息" }).focus()
    await user.keyboard("{Control>}{End}{/Control}")

    expect(screen.getByRole("button", { name: "載入更多" })).toHaveFocus()
  })
})
