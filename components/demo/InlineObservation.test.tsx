import { render, waitFor } from "@testing-library/react"
import { expect, it, vi } from "vitest"
import { DemoWorkspace } from "./DemoWorkspace"
import { DemoStage } from "./DemoStage"
import { A11yTree } from "./A11yTree"

it("outlines each wrapped inline fragment without enclosing the surrounding sentence", async () => {
  const rect = (x: number, y: number, width: number, height: number) => ({ x, y, left: x, top: y, width, height, right: x + width, bottom: y + height, toJSON: () => ({}) }) as DOMRect
  const bounds = vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (this: HTMLElement) { return this.id === "inline-example" ? rect(0, 10, 220, 44) : rect(0, 0, 300, 200) })
  const fragments = vi.spyOn(HTMLElement.prototype, "getClientRects").mockImplementation(function (this: HTMLElement) { return (this.id === "inline-example" ? [rect(150, 10, 70, 20), rect(0, 34, 100, 20)] : [rect(0, 0, 300, 200)]) as unknown as DOMRectList })
  try {
    const { container } = render(<DemoWorkspace><DemoStage><p>說明文字<a id="inline-example" href="#" style={{ display: "inline" }}>行內連結</a>結尾文字</p></DemoStage><A11yTree selector="#inline-example" /></DemoWorkspace>)
    await waitFor(() => expect(container.querySelectorAll('[data-pair-outline="A"]')).toHaveLength(2))
    const boxes = [...container.querySelectorAll<HTMLElement>('[data-pair-outline="A"]')]
    expect(boxes.map((box) => box.style.width)).toEqual(["78px", "108px"])
    expect(container.querySelectorAll('[data-pair-overlay="A"] [aria-hidden="true"]')).toHaveLength(1)
  } finally { bounds.mockRestore(); fragments.mockRestore() }
})
