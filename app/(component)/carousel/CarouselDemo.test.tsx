import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { expect, it } from "vitest"
import CarouselPage from "./page"

it("pairs each Carousel demo with its own tree and restarts markers for the second demo", async () => {
  const { container } = render(<CarouselPage />)
  await screen.findByRole("region", { name: "Demo 1：群組式輪播" })
  await waitFor(() => expect(container.querySelectorAll("[data-pair-card]")).toHaveLength(5))
  const workspaces = container.querySelectorAll("[data-demo-workspace]")
  expect(workspaces).toHaveLength(2)
  expect([...workspaces[0].querySelectorAll("[data-pair-card]")].map((card) => card.getAttribute("data-pair-card"))).toEqual(["A", "B", "C"])
  expect([...workspaces[1].querySelectorAll("[data-pair-card]")].map((card) => card.getAttribute("data-pair-card"))).toEqual(["A", "B"])
  expect(workspaces[0].querySelectorAll("[data-demo-host] > div")).toHaveLength(1)
  expect(workspaces[1].querySelectorAll("[data-demo-host] > div")).toHaveLength(1)
  for (const link of within(workspaces[0] as HTMLElement).getAllByRole("link", { name: "返回互動 Demo" })) expect(link).toHaveAttribute("href", "#interactive-demo-heading")
  for (const link of within(workspaces[1] as HTMLElement).getAllByRole("link", { name: "返回互動 Demo" })) expect(link).toHaveAttribute("href", "#carousel-demo-2-heading")
})

it("updates only the tree belonging to the demo being operated", async () => {
  const user = userEvent.setup()
  const { container } = render(<CarouselPage />)
  const demo1 = await screen.findByRole("region", { name: "Demo 1：群組式輪播" })
  const demo2 = screen.getByRole("region", { name: "Demo 2：Tab 型輪播" })
  const trees = container.querySelectorAll("[data-demo-reading]")
  await user.click(await within(demo1).findByRole("button", { name: "下一張" }))
  await waitFor(() => expect(trees[0]).toHaveTextContent("夜間導覽"))
  expect(trees[1]).toHaveTextContent("秋季特展")
  expect(trees[1]).not.toHaveTextContent("夜間導覽")
  await user.click(within(demo2).getByRole("tab", { name: "第 3 張：親子工作坊" }))
  await waitFor(() => expect(trees[1]).toHaveTextContent("親子工作坊"))
  expect(trees[0]).toHaveTextContent("夜間導覽")
  expect(trees[0]).not.toHaveTextContent("親子工作坊")
})
