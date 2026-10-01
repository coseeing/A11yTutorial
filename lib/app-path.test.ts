import { describe, expect, it } from "vitest"
import { appBasePath, appPath } from "./app-path"

describe("appPath", () => {
  it("在沒有 basePath 的環境下原樣回傳", () => {
    expect(appBasePath).toBe("")
    expect(appPath("/dialog")).toBe("/dialog")
    expect(appPath("/")).toBe("/")
  })

  it("傳入的路徑一律以斜線開頭", () => {
    // 這是呼叫端的約定：appPath 只負責加前綴，不負責補斜線。
    expect(appPath("/brand/logo.svg")).toBe("/brand/logo.svg")
  })
})
