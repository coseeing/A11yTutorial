import { describe, expect, it } from "vitest"
import { cn } from "./cn"

describe("cn", () => {
  it("後面的 class 覆蓋前面衝突的 class", () => {
    expect(cn("p-16", "p-24")).toBe("p-24")
  })

  it("忽略 falsy 值", () => {
    expect(cn("p-16", false, undefined, "text-teal-700")).toBe("p-16 text-teal-700")
  })
})
