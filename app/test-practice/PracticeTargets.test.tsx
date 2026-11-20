import { render, screen } from "@testing-library/react"
import { computeAccessibleName } from "dom-accessibility-api"
import { describe, expect, it } from "vitest"
import NavigationPracticePage from "./1/page"
import HeadingsPracticePage from "./2/page"
import RemindersPracticePage from "./3/page"

describe("workshop inspection targets", () => {
  it("keeps the unnamed navigation target distinct from the named control and adjacent repeated links", () => {
    const { container } = render(<NavigationPracticePage />)
    const arrow = container.querySelector('a[href$="/test-practice/2/"]')!
    expect(computeAccessibleName(arrow)).toBe("")
    expect(screen.getByRole("link", { name: "前往交通資訊" })).toHaveAttribute("href", "#workshop-travel")
    const course = screen.getByRole("link", { name: "瀏覽課程場次" })
    const availability = screen.getByRole("link", { name: "查看剩餘名額" })
    expect(course.nextElementSibling).toBe(availability)
    expect(course.getAttribute("href")).toBe(availability.getAttribute("href"))
  })

  it("preserves the contrasting table semantics and the suspicious image alternative", () => {
    const { container } = render(<HeadingsPracticePage />)
    const tables = container.querySelectorAll("table")
    expect(tables[0].querySelectorAll('th[scope="col"]')).toHaveLength(3)
    expect(tables[1].querySelectorAll("th")).toHaveLength(0)
    expect(screen.getByRole("img", { name: "image" })).toBeInTheDocument()
  })

  it("exposes the two independent form errors alongside a correctly associated label", () => {
    const { container } = render(<RemindersPracticePage />)
    const name = container.querySelector("#practice-name")!
    expect(computeAccessibleName(name)).toBe("")
    const email = screen.getByRole("textbox", { name: "電子信箱" })
    expect(email).toHaveAttribute("aria-describedby", "practice-email-help")
    expect(container.querySelector("#practice-email-help")).toBeNull()
    expect(container.querySelector("#practice-contact-help")).toHaveTextContent("僅用於通知課程異動。")
    expect(container.querySelector('img[alt=""]')).toBeInTheDocument()
  })
})
