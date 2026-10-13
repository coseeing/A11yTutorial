import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"
import { Carousel, type Slide } from "./Carousel"

const SLIDES: Slide[] = [
  { id: "s1", title: "秋季特展", body: "展期到 11 月底。" },
  { id: "s2", title: "夜間導覽", body: "每週五晚間出發。" },
  { id: "s3", title: "親子工作坊", body: "適合六歲以上。" },
]

function Harness({ selector }: { selector?: "buttons" | "tabs" }) {
  return (
    <>
      <h2 id="heading">近期活動</h2>
      <Carousel slides={SLIDES} labelledBy="heading" selector={selector} />
    </>
  )
}

const carousel = () => screen.getByRole("group", { name: "近期活動" })

/**
 * 全部的投影片。
 *
 * 不能只靠 role=group 來抓：輪播容器本身與圓點那一排都是 group。群組式的
 * 投影片靠 aria-roledescription=slide 認，Tab 型的則是 tabpanel。
 */
const slides = (role: "group" | "tabpanel") =>
  role === "tabpanel"
    ? screen.getAllByRole("tabpanel")
    : screen
        .getAllByRole("group")
        .filter((el) => el.getAttribute("aria-roledescription") === "slide")

/** 目前顯示中的那一張 —— 其餘的都帶著 hidden，不在無障礙樹裡。 */
const visibleSlide = (role: "group" | "tabpanel") =>
  slides(role).find((el) => !el.hasAttribute("hidden"))

describe("Carousel", () => {
  // APG-CAR-001 / 002 / 003：容器用 group、標上角色描述、具名且不含「輪播」
  it("容器是具名的 group，角色描述為 carousel", () => {
    render(<Harness />)
    expect(carousel()).toHaveAttribute("aria-roledescription", "carousel")
    expect(carousel()).toHaveAttribute("aria-labelledby", "heading")
    expect(carousel().getAttribute("aria-label")).toBeNull()
  })

  it("容器不是 region —— 這個輪播不適合成為地標", () => {
    render(<Harness />)
    expect(screen.queryByRole("region")).not.toBeInTheDocument()
  })

  // APG-CAR-011 / 012：群組式的投影片是 group 加 slide 角色描述，且具辨識性名稱
  it("群組式的投影片是 group，帶著 slide 角色描述與位置名稱", () => {
    render(<Harness selector="buttons" />)
    const slide = visibleSlide("group")

    expect(slide).toHaveAttribute("aria-roledescription", "slide")
    expect(slide).toHaveAccessibleName("第 1 張，共 3 張：秋季特展")
    expect(within(slide!).getByText("展期到 11 月底。")).toBeInTheDocument()
  })

  // APG-CAR-014：Tab 型的投影片改用 tabpanel，且不得加 aria-roledescription
  it("Tab 型的投影片是 tabpanel，而且不加角色描述", () => {
    render(<Harness selector="tabs" />)
    const panel = visibleSlide("tabpanel")

    expect(panel).not.toHaveAttribute("aria-roledescription")
    expect(panel).toHaveAccessibleName("第 1 張：秋季特展")
    expect(screen.queryByText("第 1 張，共 3 張：秋季特展")).not.toBeInTheDocument()
  })

  // APG-CAR-015 / 016：tablist 說明用途，每個 tab 指出它顯示哪一張
  it("Tab 型的 tablist 有說明用途的名稱，tab 名稱指出對應的投影片", () => {
    render(<Harness selector="tabs" />)
    const list = screen.getByRole("tablist", { name: "選擇要顯示的投影片" })
    expect(within(list).getAllByRole("tab").map((tab) => tab.textContent)).toEqual([
      "第 1 張：秋季特展",
      "第 2 張：夜間導覽",
      "第 3 張：親子工作坊",
    ])
  })

  it("Tab 型不再放一排圓點 —— 同一件事不給兩個入口", () => {
    render(<Harness selector="tabs" />)
    expect(screen.queryByRole("group", { name: "選擇輪播頁" })).not.toBeInTheDocument()
  })

  // APG-CAR-018 / 019 / 020：群組式選取器置於具名 group 內，每個是具名的原生 button
  it("群組式選取器是具名 group 裡的原生 button，名稱與投影片相符", () => {
    render(<Harness selector="buttons" />)
    const group = screen.getByRole("group", { name: "選擇輪播頁" })
    const dots = within(group).getAllByRole("button")

    expect(dots.map((dot) => dot.getAttribute("aria-label"))).toEqual([
      "第 1 張：秋季特展",
      "第 2 張：夜間導覽",
      "第 3 張：親子工作坊",
    ])
    for (const dot of dots) {
      expect(dot.tagName).toBe("BUTTON")
    }
  })

  // APG-CAR-021：目前那張的選取按鈕標 aria-disabled，但仍留在 Tab 順序裡
  it("目前那張的選取按鈕標 aria-disabled，且沒有被踢出 Tab 順序", async () => {
    const user = userEvent.setup()
    render(<Harness selector="buttons" />)
    const group = screen.getByRole("group", { name: "選擇輪播頁" })

    const current = within(group).getByRole("button", { name: "第 1 張：秋季特展" })
    expect(current).toHaveAttribute("aria-disabled", "true")
    // 原生 disabled 會讓它聚焦不到 —— 這正是不能用它的理由。
    expect(current).not.toBeDisabled()
    current.focus()
    expect(current).toHaveFocus()

    await user.click(within(group).getByRole("button", { name: "第 2 張：夜間導覽" }))

    expect(current).not.toHaveAttribute("aria-disabled")
    expect(
      within(group).getByRole("button", { name: "第 2 張：夜間導覽" }),
    ).toHaveAttribute("aria-disabled", "true")
  })

  // APG-CAR-006：播放控制的名稱隨下一個動作改變，而且不用 aria-pressed
  it("播放控制的名稱隨狀態改變，不使用 aria-pressed", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const play = screen.getByRole("button", { name: "播放輪播" })
    expect(play).not.toHaveAttribute("aria-pressed")

    await user.click(play)

    const stop = screen.getByRole("button", { name: "停止輪播" })
    expect(stop).not.toHaveAttribute("aria-pressed")
  })

  // APG-CAR-013：aria-live 隨播放狀態切換，且一律搭配 aria-atomic=false
  it("自動輪播中 aria-live 是 off，停下來才是 polite", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    const region = carousel().querySelector("[aria-live]")
    expect(region).toHaveAttribute("aria-live", "polite")
    expect(region).toHaveAttribute("aria-atomic", "false")

    await user.click(screen.getByRole("button", { name: "播放輪播" }))

    expect(region).toHaveAttribute("aria-live", "off")
  })

  // APG-CAR-004：上下張控制是原生 button，且會真的換張
  it("上一張與下一張是原生 button，並且會繞回另一端", async () => {
    const user = userEvent.setup()
    render(<Harness selector="buttons" />)

    const prev = screen.getByRole("button", { name: "上一張" })
    expect(prev.tagName).toBe("BUTTON")

    // 第一張按上一張 —— 繞到最後一張。這與方向鍵在清單裡不繞的設計不同：
    // 輪播本來就是循環的，使用者對它的預期也是循環。
    await user.click(prev)
    expect(visibleSlide("group")).toHaveAccessibleName("第 3 張，共 3 張：親子工作坊")

    await user.click(screen.getByRole("button", { name: "下一張" }))
    expect(visibleSlide("group")).toHaveAccessibleName("第 1 張，共 3 張：秋季特展")
  })

  it("Tab 型用方向鍵在分頁之間移動", async () => {
    const user = userEvent.setup()
    render(<Harness selector="tabs" />)

    screen.getByRole("tab", { name: "第 1 張：秋季特展" }).focus()
    await user.keyboard("{ArrowRight}")

    const second = screen.getByRole("tab", { name: "第 2 張：夜間導覽" })
    expect(second).toHaveFocus()
    expect(second).toHaveAttribute("aria-selected", "true")
    expect(visibleSlide("tabpanel")).toHaveAccessibleName("第 2 張：夜間導覽")
  })

  // 一次只有一張在無障礙樹裡 —— 其餘帶著 hidden，否則螢幕閱讀器會讀到三張的內容。
  //
  // getAllByRole 預設就會排除 hidden 的元素，所以「查得到幾個」本身就是答案；
  // 三張都在 DOM 裡這件事得改用 querySelectorAll 才看得到。
  it("三張都在 DOM 裡，但只有一張在無障礙樹裡", () => {
    render(<Harness selector="buttons" />)

    expect(document.querySelectorAll('[aria-roledescription="slide"]')).toHaveLength(3)
    expect(slides("group")).toHaveLength(1)
    expect(slides("group")[0]).toHaveAccessibleName("第 1 張，共 3 張：秋季特展")
  })
})
