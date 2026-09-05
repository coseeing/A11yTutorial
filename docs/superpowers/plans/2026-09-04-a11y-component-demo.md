# A11y Tutorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一個 Next.js 無障礙元件 demo 站，每個元件頁展示互動範例並即時揭露其 accessibility tree（Role / Name / Status）、鍵盤操作、ARIA 屬性、螢幕閱讀器行為與 WCAG 對應。

**Architecture:** Next.js App Router，元件庫與 design tokens 自 `SSO/center` 移植。核心是 `lib/a11y/` 兩支純函式（implicit role 推導、a11y node 計算）與其上的 `A11yTree` client 元件，透過 `MutationObserver` 即時反映 DOM 狀態。元件頁用共用的 `DemoPage` 版型，區塊內容由資料驅動，新增元件只需加一個 page + registry 一筆。

**Tech Stack:** Next.js 16 (App Router)、React 19、Tailwind CSS v4、TypeScript strict、`dom-accessibility-api`、Vitest + Testing Library (jsdom)。

**Spec:** `docs/superpowers/specs/2026-09-04-a11y-component-demo-design.md`

## Global Constraints

- 專案根目錄：`/Users/vic/Documents/project/a11y-tutorial`（已 `git init`，已有 `.gitignore` 與 spec commit）。
- 相依版本下限：`next@^16.2.6`、`react@^19.2.0`、`react-dom@^19.2.0`、`tailwindcss@^4.1.0`、`@tailwindcss/postcss@^4.1.0`、`typescript@^5.8.0`。
- **不得安裝** `@ory/*` 任何套件，**不得安裝** Storybook 任何套件。
- 介面文案一律繁體中文；`role`、`aria-*`、WCAG 條款編號等技術名詞保留英文原文。
- 字級不得直接使用 `text-*` utility，一律使用 `typography-*` 語意 class。
- 間距只使用 `--spacing-*` tokens（`p-16`、`gap-24` 等 4 的倍數），圓角只使用 `rounded-8/16/18/24/32`。
- focus 樣式全站統一為 `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY`，不得改用其他顏色。
- `Card` 表面不得加陰影（`Dialog` 的 modal 陰影是唯一例外，因為它浮在遮罩之上）。
- TypeScript 為 strict，`npm run typecheck` 必須無誤。
- 每個 task 結束時 commit，commit message 用 Conventional Commits 前綴（`feat:`／`test:`／`chore:`／`docs:`），並附上：
  ```
  Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
  ```

## 檔案結構

| 檔案 | 職責 |
|---|---|
| `package.json` / `tsconfig.json` / `next.config.mjs` / `postcss.config.mjs` | 專案設定 |
| `vitest.config.ts` / `vitest.setup.ts` | 單元測試環境 |
| `app/globals.css` | design tokens（`@theme`）+ `typography-*` + base layer |
| `app/layout.tsx` | `<html lang="zh-Hant">`、skip link、SiteNav、DemoFooter |
| `app/page.tsx` | 首頁元件入口清單 |
| `app/(component)/layout.tsx` | 元件頁共用外框 |
| `app/(component)/dialog/page.tsx` | Dialog 元件頁（server component，內容資料） |
| `app/(component)/dialog/DialogDemo.tsx` | Dialog 互動區（client component） |
| `lib/cn.ts` | `clsx` + `tailwind-merge` |
| `lib/app-path.ts` | 路徑前綴（本站無 basePath，回傳原值；讓移植元件免改） |
| `lib/components-registry.ts` | 元件清單，首頁與導覽的單一資料來源 |
| `lib/a11y/implicit-roles.ts` | tagName → implicit ARIA role |
| `lib/a11y/compute-node.ts` | DOM 元素 → `{ role, name, status }` |
| `components/*` | 自 `SSO/center` 移植的 design system 元件 |
| `components/demo/DemoPage.tsx` | 元件頁版型骨架（含 TOC 資料流） |
| `components/demo/DemoSection.tsx` | 單一區塊：`<section>` + `<h2>` + `Card` |
| `components/demo/DemoStage.tsx` | 互動範例的展示底盤 |
| `components/demo/PageToc.tsx` | 右側 sticky 目錄 |
| `components/demo/A11yTree.tsx` | Role / Name / Status 即時面板 |
| `components/demo/KeyboardTable.tsx` | 鍵盤操作表 |
| `components/demo/AriaTable.tsx` | ARIA 屬性表 |
| `components/demo/ScreenReaderNotes.tsx` | NVDA / VoiceOver 預期行為 |
| `components/demo/WcagList.tsx` | WCAG 條款清單 |
| `components/demo/CodeBlock.tsx` | 程式碼片段 |

---

### Task 1: 專案骨架與 design tokens

**Files:**
- Create: `package.json`、`tsconfig.json`、`next.config.mjs`、`postcss.config.mjs`
- Create: `lib/cn.ts`、`lib/app-path.ts`
- Create: `app/globals.css`、`app/layout.tsx`、`app/page.tsx`

**Interfaces:**
- Consumes: 無
- Produces: `cn(...inputs: ClassValue[]): string`；`appPath(path: string): string`；`appBasePath: string`；Tailwind theme tokens（`teal-*`、`orange-*`、`bg-light-*`、`spacing-*`、`radius-*`、`typography-*` class）

- [ ] **Step 1: 建立 package.json**

`/Users/vic/Documents/project/a11y-tutorial/package.json`：

```json
{
  "name": "a11y-tutorial",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "dom-accessibility-api": "^0.7.0",
    "next": "^16.2.6",
    "react": "^19.2.0",
    "react-dom": "^19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.0",
    "@types/node": "^22.15.0",
    "@types/react": "^19.0.0",
    "@types/react-dom": "^19.0.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.8.0"
  }
}
```

- [ ] **Step 2: 建立 TypeScript 與建置設定**

`tsconfig.json` — 直接複製 `SSO/center/tsconfig.json`：

```bash
cp /Users/vic/Documents/project/SSO/center/tsconfig.json /Users/vic/Documents/project/a11y-tutorial/tsconfig.json
cp /Users/vic/Documents/project/SSO/center/postcss.config.mjs /Users/vic/Documents/project/a11y-tutorial/postcss.config.mjs
```

`next.config.mjs`（不要 `basePath`，本站掛在網域根層）：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
}

export default nextConfig
```

- [ ] **Step 3: 建立 lib/cn.ts 與 lib/app-path.ts**

`lib/cn.ts`：

```ts
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

`lib/app-path.ts` — 本站沒有 basePath，但保留這層讓自 center 移植的元件不必逐一改寫：

```ts
// 本站掛在網域根層，沒有 basePath。保留此模組是為了讓自 SSO/center 移植的
// 元件（PageHeader、Footer 等）沿用同一個呼叫慣例而不必逐一改寫。
export const appBasePath = ""

export function appPath(path: string) {
  return path
}
```

- [ ] **Step 4: 移植 design tokens**

複製整份 globals.css 後刪掉 SSO 專屬的部分：

```bash
cp /Users/vic/Documents/project/SSO/center/app/globals.css /Users/vic/Documents/project/a11y-tutorial/app/globals.css
```

接著編輯 `app/globals.css`：

1. 刪除第 2 行 `@import "@ory/elements-react/theme/styles.css";`
2. 刪除檔案末尾所有 `.ory-elements` 相關規則（自註解 `/* Ory Elements brand theming.` 起到檔案結尾全部刪除）
3. 刪除 `@layer components` 中 SSO 認證頁專用的 class：`.auth-shell`、`.auth-column`、`.auth-column__footer`、`.auth-intro`、`.auth-title`、`.auth-copy`、`.utility-nav`
4. 在 `@layer components` 末尾加入本站的內容外殼與 reduced-motion 支援：

```css
  /* 頁面主體：介於導覽帶與 footer 之間，水平留白與上下兩條帶狀一致。 */
  .demo-shell {
    @apply relative px-20 py-48 tablet:px-40 desktop:px-80;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

（注意：上面的 `}` 是原本 `@layer components` 的收尾大括號，請對齊原檔結構，不要多寫或少寫。）

- [ ] **Step 5: 建立最小可執行的 layout 與首頁**

`app/layout.tsx`：

```tsx
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "A11y Tutorial",
  description: "無障礙元件展示站：可操作範例、accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen flex-col">
        <main id="main" className="demo-shell flex-1">
          {children}
        </main>
      </body>
    </html>
  )
}
```

`app/page.tsx`（暫時的佔位內容，Task 7 會換掉）：

```tsx
export default function HomePage() {
  return <h1 className="typography-headline1 text-teal-PRIMARY">A11y Tutorial</h1>
}
```

- [ ] **Step 6: 安裝相依並驗證建置**

Run:
```bash
cd /Users/vic/Documents/project/a11y-tutorial && npm install && npm run typecheck && npm run build
```
Expected: `npm install` 完成、`typecheck` 無輸出錯誤、`next build` 成功並列出 `/` 這條路由。

若 `next build` 抱怨缺少 `next-env.d.ts`，那是 Next 自動產生的檔案，重跑一次 build 即可。

- [ ] **Step 7: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: 專案骨架與 design tokens 移植

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: 單元測試環境

**Files:**
- Create: `vitest.config.ts`、`vitest.setup.ts`、`lib/cn.test.ts`
- Modify: `package.json`（新增 devDependencies）

**Interfaces:**
- Consumes: Task 1 的 `lib/cn.ts`
- Produces: `npm test` 可執行；測試檔慣例為與被測檔同目錄的 `*.test.ts` / `*.test.tsx`；jsdom 環境已備妥 `@testing-library/jest-dom` matchers

- [ ] **Step 1: 安裝測試相依**

Run:
```bash
cd /Users/vic/Documents/project/a11y-tutorial && npm install -D vitest@^3.2.0 @vitejs/plugin-react@^5.0.0 jsdom@^26.0.0 @testing-library/react@^16.3.0 @testing-library/dom@^10.4.0 @testing-library/jest-dom@^6.6.0 @testing-library/user-event@^14.6.0
```

- [ ] **Step 2: 建立 vitest 設定**

`vitest.config.ts`：

```ts
import { fileURLToPath } from "node:url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.ts", "**/*.test.tsx"],
    exclude: ["node_modules/**", ".next/**"],
  },
})
```

`vitest.setup.ts`：

```ts
import "@testing-library/jest-dom/vitest"
```

- [ ] **Step 3: 寫一個失敗的測試確認環境接通**

`lib/cn.test.ts`：

```ts
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
```

- [ ] **Step 4: 執行測試**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm test`
Expected: PASS，2 個測試通過。（`cn` 在 Task 1 已實作，這步驟只驗證測試環境本身接通。）

- [ ] **Step 5: 確認 tsconfig 認得 vitest globals**

編輯 `tsconfig.json`，在 `compilerOptions.types` 加入 vitest globals（若 `types` 欄位不存在就新增）：

```json
    "types": ["vitest/globals"],
```

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm run typecheck`
Expected: 無錯誤。

- [ ] **Step 6: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
test: 建立 Vitest + Testing Library 測試環境

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: implicit ARIA role 推導

**Files:**
- Create: `lib/a11y/implicit-roles.ts`
- Test: `lib/a11y/implicit-roles.test.ts`

**Interfaces:**
- Consumes: 無
- Produces: `implicitRole(el: Element): string` — 回傳該元素的 implicit ARIA role，無對應時回傳 `"generic"`

- [ ] **Step 1: 寫失敗的測試**

`lib/a11y/implicit-roles.test.ts`：

```ts
import { describe, expect, it } from "vitest"
import { implicitRole } from "./implicit-roles"

function el(html: string): Element {
  const host = document.createElement("div")
  host.innerHTML = html
  const first = host.firstElementChild
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
```

- [ ] **Step 2: 執行測試確認失敗**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run lib/a11y/implicit-roles.test.ts`
Expected: FAIL — `Failed to resolve import "./implicit-roles"`

- [ ] **Step 3: 實作**

`lib/a11y/implicit-roles.ts`：

```ts
// tagName → implicit ARIA role。
//
// 只涵蓋 demo 站會用到的元素，不是 HTML-AAM 的完整實作 — 目的是讓
// Accessibility Tree 面板在元件沒有明寫 role 時仍能顯示正確的值，而不是留白。
// 對應不到的一律回傳 "generic"，寧可誠實地說不知道，也不要猜錯。

const INPUT_ROLES: Record<string, string> = {
  button: "button",
  checkbox: "checkbox",
  color: "generic",
  date: "generic",
  "datetime-local": "generic",
  email: "textbox",
  file: "generic",
  hidden: "none",
  image: "button",
  month: "generic",
  number: "spinbutton",
  password: "generic",
  radio: "radio",
  range: "slider",
  reset: "button",
  search: "searchbox",
  submit: "button",
  tel: "textbox",
  text: "textbox",
  time: "generic",
  url: "textbox",
  week: "generic",
}

const TAG_ROLES: Record<string, string> = {
  article: "article",
  aside: "complementary",
  button: "button",
  datalist: "listbox",
  dd: "definition",
  del: "deletion",
  details: "group",
  dfn: "term",
  dialog: "dialog",
  dt: "term",
  fieldset: "group",
  figure: "figure",
  h1: "heading",
  h2: "heading",
  h3: "heading",
  h4: "heading",
  h5: "heading",
  h6: "heading",
  hr: "separator",
  html: "document",
  ins: "insertion",
  li: "listitem",
  main: "main",
  math: "math",
  menu: "list",
  meter: "meter",
  nav: "navigation",
  ol: "list",
  optgroup: "group",
  option: "option",
  output: "status",
  p: "paragraph",
  progress: "progressbar",
  search: "search",
  summary: "button",
  table: "table",
  tbody: "rowgroup",
  textarea: "textbox",
  tfoot: "rowgroup",
  thead: "rowgroup",
  tr: "row",
  ul: "list",
}

/** header / footer 只有在不被這些元素包住時，才是 banner / contentinfo。 */
const SECTIONING = "article, aside, main, nav, section, [role='article'], [role='complementary'], [role='main'], [role='navigation'], [role='region']"

export function implicitRole(el: Element): string {
  const tag = el.tagName.toLowerCase()

  if (tag === "a" || tag === "area") {
    return el.hasAttribute("href") ? "link" : "generic"
  }

  if (tag === "input") {
    const type = (el.getAttribute("type") ?? "text").toLowerCase()
    return INPUT_ROLES[type] ?? "textbox"
  }

  if (tag === "select") {
    const size = Number(el.getAttribute("size") ?? "1")
    return el.hasAttribute("multiple") || size > 1 ? "listbox" : "combobox"
  }

  if (tag === "img") {
    // alt="" 是作者明說「這是裝飾」；沒有 alt 屬性則是遺漏，仍當作圖片。
    return el.getAttribute("alt") === "" ? "presentation" : "img"
  }

  if (tag === "th") {
    const scope = (el.getAttribute("scope") ?? "").toLowerCase()
    if (scope === "row" || scope === "rowgroup") return "rowheader"
    return "columnheader"
  }

  if (tag === "td") {
    return "cell"
  }

  if (tag === "form" || tag === "section") {
    // 只有具備 accessible name 時才成為地標，否則是普通容器。
    const named =
      el.hasAttribute("aria-label") ||
      el.hasAttribute("aria-labelledby") ||
      el.hasAttribute("title")
    if (!named) return "generic"
    return tag === "form" ? "form" : "region"
  }

  if (tag === "header" || tag === "footer") {
    if (el.parentElement?.closest(SECTIONING)) return "generic"
    return tag === "header" ? "banner" : "contentinfo"
  }

  return TAG_ROLES[tag] ?? "generic"
}
```

- [ ] **Step 4: 執行測試確認通過**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run lib/a11y/implicit-roles.test.ts && npm run typecheck`
Expected: PASS，所有測試通過，typecheck 無誤。

- [ ] **Step 5: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: implicit ARIA role 推導

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: accessibility node 計算

**Files:**
- Create: `lib/a11y/compute-node.ts`
- Test: `lib/a11y/compute-node.test.ts`

**Interfaces:**
- Consumes: Task 3 的 `implicitRole(el: Element): string`
- Produces:
  ```ts
  export type A11yNode = { role: string; name: string; status: string[] }
  export function computeA11yNode(el: Element | null | undefined): A11yNode | null
  ```
  回傳 `null` 表示該元素不在無障礙樹中（不存在、`aria-hidden="true"`、`hidden`、未開啟的 `<dialog>`）。

- [ ] **Step 1: 寫失敗的測試**

`lib/a11y/compute-node.test.ts`：

```ts
import { afterEach, describe, expect, it } from "vitest"
import { computeA11yNode } from "./compute-node"

function mount(html: string): Element {
  const host = document.createElement("div")
  host.innerHTML = html
  document.body.append(host)
  const first = host.firstElementChild
  if (!first) throw new Error("測試 HTML 沒有元素")
  return first
}

afterEach(() => {
  document.body.innerHTML = ""
})

describe("computeA11yNode", () => {
  it("元素不存在時回傳 null", () => {
    expect(computeA11yNode(null)).toBeNull()
    expect(computeA11yNode(undefined)).toBeNull()
  })

  it("aria-hidden 或 hidden 的元素不在無障礙樹中", () => {
    expect(computeA11yNode(mount('<button aria-hidden="true">關閉</button>'))).toBeNull()
    expect(computeA11yNode(mount("<button hidden>關閉</button>"))).toBeNull()
  })

  it("未開啟的 dialog 不在無障礙樹中", () => {
    expect(computeA11yNode(mount("<dialog><h2>標題</h2></dialog>"))).toBeNull()
  })

  it("已開啟的 dialog 有 dialog role", () => {
    const node = computeA11yNode(mount('<dialog open aria-label="設定"></dialog>'))
    expect(node).not.toBeNull()
    expect(node!.role).toBe("dialog")
    expect(node!.name).toBe("設定")
  })

  it("明寫的 role 優先於 implicit role", () => {
    const node = computeA11yNode(mount('<div role="alert">錯誤</div>'))
    expect(node!.role).toBe("alert")
  })

  it("role 有多個值時取第一個支援的", () => {
    const node = computeA11yNode(mount('<div role="doc-tip note">提示</div>'))
    expect(node!.role).toBe("doc-tip")
  })

  it("從內容算出 accessible name", () => {
    const node = computeA11yNode(mount("<button>儲存變更</button>"))
    expect(node!.name).toBe("儲存變更")
  })

  it("aria-label 覆蓋內容文字", () => {
    const node = computeA11yNode(mount('<button aria-label="關閉對話框">×</button>'))
    expect(node!.name).toBe("關閉對話框")
  })

  it("沒有名稱時 name 為空字串", () => {
    const node = computeA11yNode(mount("<div></div>"))
    expect(node!.name).toBe("")
  })

  it("aria-expanded 轉成 expanded / collapsed", () => {
    expect(computeA11yNode(mount('<button aria-expanded="true">更多</button>'))!.status)
      .toContain("expanded")
    expect(computeA11yNode(mount('<button aria-expanded="false">更多</button>'))!.status)
      .toContain("collapsed")
  })

  it("aria-checked 三態", () => {
    expect(computeA11yNode(mount('<div role="checkbox" aria-checked="true"></div>'))!.status)
      .toContain("checked")
    expect(computeA11yNode(mount('<div role="checkbox" aria-checked="false"></div>'))!.status)
      .toContain("unchecked")
    expect(computeA11yNode(mount('<div role="checkbox" aria-checked="mixed"></div>'))!.status)
      .toContain("mixed")
  })

  it("原生 disabled 與 aria-disabled 都算 disabled，且不重複", () => {
    const node = computeA11yNode(mount('<button disabled aria-disabled="true">送出</button>'))
    expect(node!.status.filter((s) => s === "disabled")).toHaveLength(1)
  })

  it("原生 checkbox 的 checked 狀態", () => {
    const input = mount('<input type="checkbox" aria-label="同意">') as HTMLInputElement
    expect(computeA11yNode(input)!.status).toContain("unchecked")
    input.checked = true
    expect(computeA11yNode(input)!.status).toContain("checked")
  })

  it("aria-current 帶出其值", () => {
    const node = computeA11yNode(mount('<a href="/x" aria-current="page">目前</a>'))
    expect(node!.status).toContain("current=page")
  })

  it("aria-current=false 不算狀態", () => {
    const node = computeA11yNode(mount('<a href="/x" aria-current="false">其他</a>'))
    expect(node!.status).not.toContain("current=false")
  })

  it("aria-modal 與 open 一起出現在 modal dialog 上", () => {
    const node = computeA11yNode(mount('<dialog open aria-modal="true" aria-label="設定"></dialog>'))
    expect(node!.status).toEqual(expect.arrayContaining(["open", "modal"]))
  })

  it("沒有任何狀態時 status 是空陣列", () => {
    expect(computeA11yNode(mount("<button>送出</button>"))!.status).toEqual([])
  })

  it("狀態順序穩定，不隨屬性書寫順序改變", () => {
    const a = computeA11yNode(mount('<button aria-disabled="true" aria-expanded="true">A</button>'))
    const b = computeA11yNode(mount('<button aria-expanded="true" aria-disabled="true">B</button>'))
    expect(a!.status).toEqual(b!.status)
  })
})
```

- [ ] **Step 2: 執行測試確認失敗**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run lib/a11y/compute-node.test.ts`
Expected: FAIL — `Failed to resolve import "./compute-node"`

- [ ] **Step 3: 實作**

`lib/a11y/compute-node.ts`：

```ts
import { computeAccessibleName } from "dom-accessibility-api"
import { implicitRole } from "./implicit-roles"

export type A11yNode = {
  /** ARIA role，明寫的 role 屬性優先，否則由 tagName 推導。 */
  role: string
  /** Accessible name，依 accname 規範計算；沒有名稱時為空字串。 */
  name: string
  /** 目前的狀態，例如 ["open", "modal"]。順序固定，見 STATUS_ORDER。 */
  status: string[]
}

// 狀態的輸出順序固定成這一份清單的順序，而不是屬性在 DOM 上的書寫順序 —
// 否則同一個元件在不同頁面會顯示出不同排列，讀者會以為那是有意義的差別。
const STATUS_ORDER = [
  "open",
  "modal",
  "expanded",
  "collapsed",
  "checked",
  "unchecked",
  "mixed",
  "selected",
  "pressed",
  "disabled",
  "readonly",
  "required",
  "invalid",
  "busy",
] as const

function resolveRole(el: Element): string {
  const explicit = (el.getAttribute("role") ?? "").trim()
  if (explicit) {
    // role 允許空白分隔的備援清單；瀏覽器取第一個認得的值，這裡取第一個。
    const first = explicit.split(/\s+/)[0]
    if (first) return first
  }
  return implicitRole(el)
}

function collectStatus(el: Element): string[] {
  const found = new Set<string>()
  const attr = (name: string) => el.getAttribute(name)

  if (el.hasAttribute("open")) found.add("open")
  if (attr("aria-modal") === "true") found.add("modal")

  const expanded = attr("aria-expanded")
  if (expanded === "true") found.add("expanded")
  if (expanded === "false") found.add("collapsed")

  const checked = attr("aria-checked")
  if (checked === "true") found.add("checked")
  if (checked === "false") found.add("unchecked")
  if (checked === "mixed") found.add("mixed")

  // 原生 checkbox / radio 的勾選狀態不在屬性上，要讀 property。
  if (el instanceof HTMLInputElement && (el.type === "checkbox" || el.type === "radio")) {
    if (el.indeterminate) found.add("mixed")
    else found.add(el.checked ? "checked" : "unchecked")
  }

  if (attr("aria-selected") === "true") found.add("selected")

  const pressed = attr("aria-pressed")
  if (pressed === "true" || pressed === "mixed") found.add("pressed")

  if (el.hasAttribute("disabled") || attr("aria-disabled") === "true") found.add("disabled")
  if (el.hasAttribute("readonly") || attr("aria-readonly") === "true") found.add("readonly")
  if (el.hasAttribute("required") || attr("aria-required") === "true") found.add("required")

  const invalid = attr("aria-invalid")
  if (invalid && invalid !== "false") found.add("invalid")

  if (attr("aria-busy") === "true") found.add("busy")

  const ordered = STATUS_ORDER.filter((s) => found.has(s)) as string[]

  // aria-current 的值本身有意義（page / step / date…），所以帶值輸出，排在最後。
  const current = attr("aria-current")
  if (current && current !== "false") {
    ordered.push(`current=${current === "true" ? "true" : current}`)
  }

  return ordered
}

function isInAccessibilityTree(el: Element): boolean {
  if (el.getAttribute("aria-hidden") === "true") return false
  if (el.hasAttribute("hidden")) return false
  // 未開啟的原生 <dialog> 仍留在 DOM 中，但不在無障礙樹裡。
  if (el.tagName.toLowerCase() === "dialog" && !el.hasAttribute("open")) return false
  if (el.closest('[aria-hidden="true"]')) return false
  return true
}

/**
 * 算出一個 DOM 元素在無障礙樹中的樣貌。
 * 回傳 null 代表該元素不在無障礙樹中（不存在、被隱藏、或是未開啟的 dialog）。
 */
export function computeA11yNode(el: Element | null | undefined): A11yNode | null {
  if (!el) return null
  if (!isInAccessibilityTree(el)) return null

  return {
    role: resolveRole(el),
    name: computeAccessibleName(el),
    status: collectStatus(el),
  }
}
```

- [ ] **Step 4: 執行測試確認通過**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run && npm run typecheck`
Expected: PASS，全部測試通過，typecheck 無誤。

- [ ] **Step 5: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: 從 DOM 元素計算 accessibility node

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 5: 移植 design system 元件

**Files:**
- Create: `components/`（自 `SSO/center/components/` 複製，見下方清單）
- Create: `public/brand/`（自 `SSO/center/public/brand/` 複製）

**Interfaces:**
- Consumes: Task 1 的 `lib/cn.ts`、`lib/app-path.ts`
- Produces: 可直接 import 的 design system 元件，主要有
  - `Button` — `<Button variant="primary"|"small" theme=... href? onClick? isLoading? disabled?>`
  - `Card` — `<Card title? description? padded? className?>`
  - `Container` — `<Container as? className?>`
  - `Dialog` — `<Dialog open onClose title description? actions? size="sm"|"md">`
  - `PageHeader` — `<PageHeader title description?>`
  - `Table` — `<Table columns={TableColumn[]} rows={Record<string, ReactNode>[]}>`，`TableColumn = { key: string; label: ReactNode; width?: string }`
  - `Tag` — `<Tag>`
  - `Link` — `<Link href>`
  - `Icons` — 具名 icon 元件，含 `PlusIcon`

- [ ] **Step 1: 複製元件與品牌資產**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
cp -R /Users/vic/Documents/project/SSO/center/components ./components
mkdir -p public
cp -R /Users/vic/Documents/project/SSO/center/public/brand ./public/brand
```

- [ ] **Step 2: 移除依賴 @ory/* 與 SSO 業務邏輯的元件**

```bash
cd /Users/vic/Documents/project/a11y-tutorial/components
rm -rf AuthPage FlowForm Form EmailVerification SettingsTabs CoseeingIdentityCard Nav
rm -f SiteNav/LogoutButton.tsx
find . -name "*.stories.tsx" -delete
```

- [ ] **Step 3: 把 SiteNav 改寫成本站導覽**

`components/SiteNav/SiteNav.tsx` 整份替換為（移除 session / logout 依賴，logo 連回首頁）：

```tsx
import { appPath } from "@/lib/app-path"
import { cn } from "@/lib/cn"

// SiteNav — demo 站的主導覽帶。
//
// 沿用 SSO center 的深綠帶與 logo 處理，但拿掉登入狀態相關的邏輯：這個站沒有
// 帳號概念，導覽帶只負責標示身分與提供回首頁的路徑，因此維持 server component。

export function SiteNav({ className }: { className?: string }) {
  return (
    <nav
      aria-label="主要導覽"
      className={cn(
        "bg-teal-PRIMARY px-20 py-12 tablet:px-40 tablet:py-24 desktop:px-80",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between gap-24">
        <a
          href={appPath("/")}
          aria-label="A11y Tutorial 首頁"
          className="flex shrink-0 items-center gap-16 rounded-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
        >
          <img
            src={appPath("/brand/coseeing-logo-stacked.svg")}
            alt="Coseeing"
            className="h-[3.4rem] w-[6rem] tablet:hidden"
          />
          <img
            src={appPath("/brand/coseeing-logo.svg")}
            alt="Coseeing"
            className="hidden h-[3.13rem] w-[23.15rem] tablet:block"
          />
          <span className="typography-strong2 hidden text-bg-light-off-white tablet:inline">
            A11y Tutorial
          </span>
        </a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 4: 檢查沒有殘留的 @ory 依賴**

Run:
```bash
cd /Users/vic/Documents/project/a11y-tutorial && grep -rn "@ory" components/ lib/ app/ || echo "沒有殘留"
```
Expected: 印出「沒有殘留」。若仍有命中，刪除或改寫該檔案後重跑。

- [ ] **Step 5: 型別檢查**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm run typecheck`
Expected: 無錯誤。若有元件 import 到已刪除的模組，刪掉該元件（它屬於 SSO 專屬範圍）後重跑。

- [ ] **Step 6: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: 自 SSO center 移植 design system 元件

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 6: 站台外框（導覽、頁尾、skip link）

**Files:**
- Create: `components/demo/DemoFooter.tsx`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: Task 5 的 `SiteNav`、`cn`
- Produces: `<DemoFooter className?>`；`app/layout.tsx` 提供的 landmark 結構（banner / main#main / contentinfo）與 skip link

- [ ] **Step 1: 建立 DemoFooter**

`components/demo/DemoFooter.tsx`：

```tsx
import { cn } from "@/lib/cn"

// DemoFooter — 沿用 center footer 的米色帶與留白，但內容換成 demo 站自己的
// 說明。刻意不放大量外連：這個站的用途是展示元件，footer 只需交代它是什麼、
// 依據哪份規範。

const REFERENCES = [
  {
    name: "WCAG 2.2",
    href: "https://www.w3.org/TR/WCAG22/",
    description: "W3C Web Content Accessibility Guidelines 2.2",
  },
  {
    name: "ARIA Authoring Practices Guide",
    href: "https://www.w3.org/WAI/ARIA/apg/",
    description: "W3C ARIA Authoring Practices Guide",
  },
  {
    name: "ARIA 1.2",
    href: "https://www.w3.org/TR/wai-aria-1.2/",
    description: "W3C Accessible Rich Internet Applications 1.2",
  },
]

export function DemoFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-bg-light-beige", className)}>
      <div className="px-20 py-40 tablet:px-40 tablet:py-32 desktop:px-80 desktop:py-60">
        <div className="flex flex-col gap-32 tablet:flex-row tablet:justify-between">
          <div className="max-w-[48rem]">
            <p className="typography-strong1 m-0 mb-8 text-teal-PRIMARY">A11y Tutorial</p>
            <p className="typography-body2 m-0 text-teal-700">
              展示 design system 元件的無障礙實作：可操作範例、即時的 accessibility
              tree、鍵盤操作、ARIA 屬性與對應的 WCAG 條款。
            </p>
          </div>
          <nav aria-label="參考規範">
            <p className="typography-strong1 mb-16 text-teal-PRIMARY">參考規範</p>
            <ul className="typography-body2 m-0 flex list-none flex-col gap-8 p-0 text-teal-700">
              {REFERENCES.map((ref) => (
                <li key={ref.href}>
                  <a
                    href={ref.href}
                    aria-label={ref.description}
                    className="rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
                  >
                    {ref.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: 接進 layout**

`app/layout.tsx` 整份替換：

```tsx
import type { Metadata } from "next"
import { DemoFooter } from "@/components/demo/DemoFooter"
import { SiteNav } from "@/components/SiteNav/SiteNav"
import "./globals.css"

export const metadata: Metadata = {
  title: "A11y Tutorial",
  description: "無障礙元件展示站：可操作範例、accessibility tree、鍵盤操作與 WCAG 對應。",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-Hant">
      <body className="flex min-h-screen flex-col">
        <a
          href="#main"
          className="typography-strong2 sr-only rounded-8 bg-teal-PRIMARY px-16 py-12 text-neutral-white focus:not-sr-only focus:absolute focus:left-16 focus:top-16 focus:z-50"
        >
          跳到主要內容
        </a>
        <SiteNav />
        <main id="main" className="flex-1">
          {children}
        </main>
        <DemoFooter />
      </body>
    </html>
  )
}
```

註：`main` 這裡不套 `demo-shell`。首頁與元件頁都以 `PageHeader` 開場（全出血的深綠帶），內距由各頁自行決定。

- [ ] **Step 3: 驗證**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm run typecheck && npm run build`
Expected: 皆成功。

- [ ] **Step 4: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: 站台外框與 skip link

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: 元件 registry 與首頁

**Files:**
- Create: `lib/components-registry.ts`
- Test: `lib/components-registry.test.ts`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: Task 5 的 `PageHeader`、`Container`、`Tag`、`cn`
- Produces:
  ```ts
  export type ComponentStatus = "done" | "planned"
  export type ComponentEntry = {
    slug: string
    name: string
    summary: string
    status: ComponentStatus
  }
  export const COMPONENTS: ComponentEntry[]
  export const STATUS_LABEL: Record<ComponentStatus, string>
  export function findComponent(slug: string): ComponentEntry | undefined
  ```

- [ ] **Step 1: 寫失敗的測試**

`lib/components-registry.test.ts`：

```ts
import { describe, expect, it } from "vitest"
import { COMPONENTS, findComponent } from "./components-registry"

describe("components registry", () => {
  it("slug 不重複", () => {
    const slugs = COMPONENTS.map((c) => c.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })

  it("slug 是小寫、只含英數與連字號", () => {
    for (const c of COMPONENTS) {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/)
    }
  })

  it("每一筆都有名稱與說明", () => {
    for (const c of COMPONENTS) {
      expect(c.name.length).toBeGreaterThan(0)
      expect(c.summary.length).toBeGreaterThan(0)
    }
  })

  it("findComponent 依 slug 找得到，找不到時回傳 undefined", () => {
    expect(findComponent("dialog")?.name).toBe("Dialog")
    expect(findComponent("不存在的元件")).toBeUndefined()
  })

  it("dialog 已完成", () => {
    expect(findComponent("dialog")?.status).toBe("done")
  })
})
```

- [ ] **Step 2: 執行測試確認失敗**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run lib/components-registry.test.ts`
Expected: FAIL — `Failed to resolve import "./components-registry"`

- [ ] **Step 3: 實作 registry**

`lib/components-registry.ts`：

```ts
// 元件清單 — 首頁卡片與各處導覽的單一資料來源。
// 新增一個元件頁時，在這裡加一筆並建立對應的 app/(component)/<slug>/page.tsx。

export type ComponentStatus = "done" | "planned"

export type ComponentEntry = {
  /** 路由片段，同時是網址：/<slug> */
  slug: string
  /** 元件名稱，維持英文原名以對應程式碼 */
  name: string
  /** 一句話說明它解決什麼問題 */
  summary: string
  status: ComponentStatus
}

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "dialog",
    name: "Dialog",
    summary: "以原生 <dialog> 實作的強制回應對話框，焦點鎖定與 ESC 關閉由平台提供。",
    status: "done",
  },
  {
    slug: "button",
    name: "Button",
    summary: "可作為 <button> 或連結呈現的動作元件，含載入中與停用狀態。",
    status: "planned",
  },
]

export const STATUS_LABEL: Record<ComponentStatus, string> = {
  done: "已完成",
  planned: "規劃中",
}

export function findComponent(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((c) => c.slug === slug)
}
```

- [ ] **Step 4: 執行測試確認通過**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run lib/components-registry.test.ts`
Expected: PASS。

- [ ] **Step 5: 實作首頁**

`app/page.tsx` 整份替換：

```tsx
import { Container } from "@/components/Container/Container"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { Tag } from "@/components/Tag/Tag"
import { COMPONENTS, STATUS_LABEL } from "@/lib/components-registry"

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="A11y Tutorial"
        description="每個元件都附上可操作的範例、即時的 accessibility tree、鍵盤操作、ARIA 屬性與 WCAG 對應。"
      />
      <Container as="section" className="py-48 desktop:py-60">
        <h2 className="typography-headline3 m-0 mb-24 text-teal-700">元件清單</h2>
        <ul className="m-0 grid list-none gap-24 p-0 tablet:grid-cols-2 desktop:grid-cols-3">
          {COMPONENTS.map((component) => (
            <li key={component.slug}>
              <a
                href={`/${component.slug}`}
                className="flex h-full flex-col gap-12 rounded-24 border border-bg-warm-gray bg-neutral-white p-24 no-underline transition-colors hover:bg-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
              >
                <div className="flex items-center justify-between gap-12">
                  <h3 className="typography-headline4 m-0 text-teal-700">{component.name}</h3>
                  <Tag>{STATUS_LABEL[component.status]}</Tag>
                </div>
                <p className="typography-body2 m-0 text-teal-300">{component.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
```

註：整張卡片是單一連結，卡內只有標題、狀態、說明三段純文字，沒有巢狀互動元素，因此鍵盤上是一個 tab stop，符合預期。

- [ ] **Step 6: 驗證**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm test && npm run typecheck && npm run build`
Expected: 皆通過。

- [ ] **Step 7: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: 元件 registry 與首頁清單

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: A11yTree 面板

**Files:**
- Create: `components/demo/A11yTree.tsx`
- Test: `components/demo/A11yTree.test.tsx`

**Interfaces:**
- Consumes: Task 4 的 `computeA11yNode`、`A11yNode`；Task 1 的 `cn`
- Produces:
  ```tsx
  type A11yTreeProps = {
    /** 要觀察的元素，CSS selector。在 document 範圍內解析。 */
    selector: string
    /** 面板標題下方的說明文字 */
    hint?: string
    className?: string
  }
  export function A11yTree(props: A11yTreeProps): JSX.Element
  ```

用 selector 而非 ref，是因為 Dialog 這類元件在關閉時目標元素可能整個離開 DOM；selector 每次重算都重新解析，ref 會抓到失效的節點。

- [ ] **Step 1: 寫失敗的測試**

`components/demo/A11yTree.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { describe, expect, it } from "vitest"
import { A11yTree } from "./A11yTree"

function Harness() {
  const [expanded, setExpanded] = useState(false)
  return (
    <>
      <button
        id="target"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        更多選項
      </button>
      <A11yTree selector="#target" />
    </>
  )
}

describe("A11yTree", () => {
  it("顯示目標元素的 role 與 name", async () => {
    render(<Harness />)
    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("button")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("更多選項")
  })

  it("互動後狀態即時更新", async () => {
    const user = userEvent.setup()
    render(<Harness />)

    expect(await screen.findByTestId("a11y-tree-status")).toHaveTextContent("collapsed")

    await user.click(screen.getByRole("button", { name: "更多選項" }))

    expect(await screen.findByTestId("a11y-tree-status")).toHaveTextContent("expanded")
  })

  it("目標元素不存在時說明它不在無障礙樹中", async () => {
    render(<A11yTree selector="#沒有這個元素" />)
    expect(await screen.findByTestId("a11y-tree-empty")).toHaveTextContent(
      "元素目前不在無障礙樹中",
    )
  })

  it("面板本身有 group role 與名稱，狀態變動時通知輔助科技", async () => {
    render(<Harness />)
    const group = await screen.findByRole("group", { name: "Accessibility Tree" })
    expect(group).toBeInTheDocument()
    expect(screen.getByTestId("a11y-tree-values")).toHaveAttribute("aria-live", "polite")
  })
})
```

- [ ] **Step 2: 執行測試確認失敗**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run components/demo/A11yTree.test.tsx`
Expected: FAIL — `Failed to resolve import "./A11yTree"`

- [ ] **Step 3: 實作**

`components/demo/A11yTree.tsx`：

```tsx
"use client"

import { useEffect, useId, useState } from "react"
import { cn } from "@/lib/cn"
import { computeA11yNode, type A11yNode } from "@/lib/a11y/compute-node"

// A11yTree — 這個站的核心面板。
//
// 把一個 DOM 元素在無障礙樹中的樣貌攤開成 Role / Name / Status 三列，並且隨著
// 使用者的互動即時更新，讓「螢幕閱讀器會怎麼描述這個東西」變成看得見的東西。
//
// 目標以 CSS selector 指定而非 ref：Dialog 這類元件關閉時目標元素可能整個離開
// DOM，selector 每次重算都重新解析，ref 則會留住已失效的節點。

type A11yTreeProps = {
  /** 要觀察的元素，在 document 範圍內以 querySelector 解析。 */
  selector: string
  /** 面板標題下方的補充說明。 */
  hint?: string
  className?: string
}

type Row = {
  key: "role" | "name" | "status"
  label: string
  /** 標籤色塊 */
  chip: string
  /** 值欄外框 */
  frame: string
}

// 配色對齊 design tokens：Role 橘、Status 紅、Name 淺綠 —
// 與簡報中的 Accessibility Tree 圖示一致。
const ROWS: Row[] = [
  {
    key: "role",
    label: "Role",
    chip: "bg-orange-PRIMARY text-neutral-black",
    frame: "border-orange-PRIMARY",
  },
  {
    key: "status",
    label: "Status",
    chip: "bg-red-PRIMARY text-neutral-white",
    frame: "border-red-PRIMARY",
  },
  {
    key: "name",
    label: "Name",
    chip: "bg-teal-100/25 text-teal-700",
    frame: "border-teal-100",
  },
]

export function A11yTree({ selector, hint, className }: A11yTreeProps) {
  const [node, setNode] = useState<A11yNode | null>(null)
  const headingId = useId()

  useEffect(() => {
    let frame = 0

    const recompute = () => {
      const el = document.querySelector(selector)
      const next = computeA11yNode(el)
      // 只在值真的變了才 setState，否則 MutationObserver 的每次觸發都會重繪。
      setNode((prev) => (sameNode(prev, next) ? prev : next))
    }

    // MutationObserver 會在同一批 DOM 變動中連續觸發多次，用 rAF 收斂成一次計算。
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(recompute)
    }

    recompute()

    const observer = new MutationObserver(schedule)
    observer.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      characterData: true,
    })

    // 原生 checkbox 的 checked 是 property 不是 attribute，MutationObserver 看不到，
    // 所以另外聽這幾個事件。
    const events = ["input", "change", "click", "keyup", "focusin", "focusout"] as const
    for (const type of events) document.addEventListener(type, schedule, true)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      for (const type of events) document.removeEventListener(type, schedule, true)
    }
  }, [selector])

  return (
    <div
      role="group"
      aria-labelledby={headingId}
      className={cn(
        "rounded-24 border border-bg-warm-gray bg-neutral-white p-24 tablet:p-32",
        className,
      )}
    >
      <p id={headingId} className="typography-strong1 m-0 text-teal-700">
        Accessibility Tree
      </p>
      {hint ? <p className="typography-body2 mt-4 text-teal-300">{hint}</p> : null}

      <div data-testid="a11y-tree-values" aria-live="polite" className="mt-24">
        {node ? (
          <dl className="m-0 grid gap-16">
            {ROWS.map((row) => (
              <div key={row.key} className="flex flex-col gap-8 tablet:flex-row tablet:items-center">
                <dt
                  className={cn(
                    "typography-strong2 flex h-40 w-[10rem] shrink-0 items-center justify-center rounded-8",
                    row.chip,
                  )}
                >
                  {row.label}
                </dt>
                <dd
                  data-testid={`a11y-tree-${row.key}`}
                  className={cn(
                    "typography-body2 m-0 flex min-h-40 flex-1 items-center overflow-x-auto rounded-8 border-2 bg-neutral-white px-16 py-8 font-mono text-teal-700",
                    row.frame,
                  )}
                >
                  {formatValue(row.key, node)}
                </dd>
              </div>
            ))}
          </dl>
        ) : (
          <p data-testid="a11y-tree-empty" className="typography-body2 m-0 text-teal-300">
            元素目前不在無障礙樹中。
          </p>
        )}
      </div>
    </div>
  )
}

function formatValue(key: Row["key"], node: A11yNode): string {
  if (key === "role") return node.role
  // 空字串在等寬字裡看起來像壞掉，所以明講「（無）」。
  if (key === "name") return node.name || "（無 accessible name）"
  return node.status.length > 0 ? node.status.join(", ") : "（無狀態）"
}

function sameNode(a: A11yNode | null, b: A11yNode | null): boolean {
  if (a === null || b === null) return a === b
  return (
    a.role === b.role &&
    a.name === b.name &&
    a.status.length === b.status.length &&
    a.status.every((s, i) => s === b.status[i])
  )
}
```

- [ ] **Step 4: 執行測試確認通過**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run components/demo/A11yTree.test.tsx && npm run typecheck`
Expected: PASS，4 個測試通過。

若 `requestAnimationFrame` 在 jsdom 下造成測試 flaky，改用 `await screen.findBy…`（測試已如此撰寫）即可，不要改動實作。

- [ ] **Step 5: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: A11yTree 即時 accessibility tree 面板

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 9: demo 頁版型與區塊元件

**Files:**
- Create: `components/demo/DemoSection.tsx`、`components/demo/DemoStage.tsx`、`components/demo/PageToc.tsx`、`components/demo/CodeBlock.tsx`、`components/demo/KeyboardTable.tsx`、`components/demo/AriaTable.tsx`、`components/demo/ScreenReaderNotes.tsx`、`components/demo/WcagList.tsx`、`components/demo/DemoPage.tsx`
- Create: `app/(component)/layout.tsx`
- Test: `components/demo/DemoPage.test.tsx`

**Interfaces:**
- Consumes: Task 5 的 `Card`、`Container`、`PageHeader`、`Table`、`TableColumn`、`cn`
- Produces:
  ```tsx
  export type DemoSectionSpec = { id: string; title: string; content: React.ReactNode }
  export function DemoPage(props: { title: string; description: string; sections: DemoSectionSpec[] }): JSX.Element

  export function DemoSection(props: { id: string; title: string; children: React.ReactNode }): JSX.Element
  export function DemoStage(props: { children: React.ReactNode; className?: string }): JSX.Element
  export function PageToc(props: { sections: { id: string; title: string }[] }): JSX.Element
  export function CodeBlock(props: { code: string; label: string }): JSX.Element

  export type KeyboardRow = { keys: string; action: string }
  export function KeyboardTable(props: { rows: KeyboardRow[] }): JSX.Element

  export type AriaRow = { attr: string; value: string; purpose: string }
  export function AriaTable(props: { rows: AriaRow[] }): JSX.Element

  export function ScreenReaderNotes(props: { nvda: string[]; voiceOver: string[] }): JSX.Element

  export type WcagCriterion = { id: string; name: string; level: "A" | "AA" | "AAA"; note: string; href: string }
  export function WcagList(props: { criteria: WcagCriterion[] }): JSX.Element
  ```

- [ ] **Step 1: 寫失敗的測試**

`components/demo/DemoPage.test.tsx`：

```tsx
import { render, screen, within } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { DemoPage } from "./DemoPage"

const SECTIONS = [
  { id: "demo", title: "Demo", content: <p>範例內容</p> },
  { id: "keyboard", title: "鍵盤操作", content: <p>鍵盤內容</p> },
]

describe("DemoPage", () => {
  it("頁面標題是唯一的 h1", () => {
    render(<DemoPage title="Dialog" description="說明" sections={SECTIONS} />)
    const h1s = screen.getAllByRole("heading", { level: 1 })
    expect(h1s).toHaveLength(1)
    expect(h1s[0]).toHaveTextContent("Dialog")
  })

  it("每個區塊是一個帶標題的 region，標題為 h2", () => {
    render(<DemoPage title="Dialog" description="說明" sections={SECTIONS} />)
    expect(screen.getByRole("region", { name: "Demo" })).toBeInTheDocument()
    expect(screen.getByRole("region", { name: "鍵盤操作" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Demo" })).toBeInTheDocument()
  })

  it("目錄列出每個區塊並連到對應的 id", () => {
    render(<DemoPage title="Dialog" description="說明" sections={SECTIONS} />)
    const toc = screen.getByRole("navigation", { name: "本頁目錄" })
    expect(within(toc).getByRole("link", { name: "Demo" })).toHaveAttribute("href", "#demo")
    expect(within(toc).getByRole("link", { name: "鍵盤操作" })).toHaveAttribute(
      "href",
      "#keyboard",
    )
  })

  it("區塊內容有被渲染", () => {
    render(<DemoPage title="Dialog" description="說明" sections={SECTIONS} />)
    expect(screen.getByText("範例內容")).toBeInTheDocument()
    expect(screen.getByText("鍵盤內容")).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: 執行測試確認失敗**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run components/demo/DemoPage.test.tsx`
Expected: FAIL — `Failed to resolve import "./DemoPage"`

- [ ] **Step 3: 實作區塊元件**

`components/demo/DemoSection.tsx`：

```tsx
import { cn } from "@/lib/cn"

// DemoSection — 元件頁的一個區塊。<section> + <h2> + 白色卡面，
// 讓每個區塊在無障礙樹中都是一個具名的 region，螢幕閱讀器可以直接跳到。
export function DemoSection({
  id,
  title,
  children,
  className,
}: {
  id: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  const headingId = `${id}-heading`
  return (
    <section id={id} aria-labelledby={headingId} className={cn("scroll-mt-32", className)}>
      <h2 id={headingId} className="typography-headline3 m-0 mb-16 text-teal-700">
        {title}
      </h2>
      {children}
    </section>
  )
}
```

`components/demo/DemoStage.tsx`：

```tsx
import { cn } from "@/lib/cn"

// DemoStage — 互動範例的底盤。米白底把「可操作的東西」和周圍的說明文字區隔開，
// 不用陰影，維持整站的扁平表面。
export function DemoStage({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-16 rounded-24 border border-bg-warm-gray bg-bg-light-off-white p-24 tablet:p-32",
        className,
      )}
    >
      {children}
    </div>
  )
}
```

`components/demo/PageToc.tsx`：

```tsx
import { cn } from "@/lib/cn"

// PageToc — 右側目錄。desktop 才顯示：窄螢幕上它會把主內容擠掉，而頁面本身
// 夠短，直接捲動即可。
export function PageToc({
  sections,
  className,
}: {
  sections: { id: string; title: string }[]
  className?: string
}) {
  return (
    <nav
      aria-label="本頁目錄"
      className={cn("hidden w-[20rem] shrink-0 desktop:block", className)}
    >
      <div className="sticky top-32">
        <p className="typography-strong2 m-0 mb-12 text-teal-300">本頁目錄</p>
        <ul className="m-0 flex list-none flex-col gap-8 p-0">
          {sections.map((section) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="typography-body2 block rounded-8 px-12 py-8 text-teal-700 no-underline hover:bg-bg-light-beige focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
              >
                {section.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
```

`components/demo/CodeBlock.tsx`：

```tsx
// CodeBlock — 可捲動的程式碼片段。
//
// tabIndex={0} 是必要的：一個會橫向捲動的區域若無法用鍵盤聚焦，只有滑鼠使用者
// 看得到被裁掉的內容（WCAG 2.1.1）。有了焦點就需要可辨識的名稱，所以要求 label。
export function CodeBlock({ code, label }: { code: string; label: string }) {
  return (
    <pre
      tabIndex={0}
      role="region"
      aria-label={label}
      className="typography-body2 m-0 overflow-x-auto rounded-16 border border-bg-warm-gray bg-teal-700 p-24 font-mono text-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
    >
      <code>{code}</code>
    </pre>
  )
}
```

`components/demo/KeyboardTable.tsx`：

```tsx
import { Table } from "@/components/Table/Table"

export type KeyboardRow = {
  /** 按鍵，例如 "Esc"、"Tab"、"Shift + Tab" */
  keys: string
  action: string
}

const COLUMNS = [
  { key: "keys", label: "按鍵", width: "18rem" },
  { key: "action", label: "行為" },
]

export function KeyboardTable({ rows }: { rows: KeyboardRow[] }) {
  return (
    <Table
      columns={COLUMNS}
      rows={rows.map((row) => ({
        keys: (
          <kbd className="typography-strong2 inline-block rounded-8 border border-bg-warm-gray bg-bg-light-off-white px-8 py-4 font-mono text-teal-700">
            {row.keys}
          </kbd>
        ),
        action: row.action,
      }))}
    />
  )
}
```

`components/demo/AriaTable.tsx`：

```tsx
import { Table } from "@/components/Table/Table"

export type AriaRow = {
  /** 屬性名稱，例如 "aria-modal" */
  attr: string
  /** 本元件實際使用的值 */
  value: string
  purpose: string
}

const COLUMNS = [
  { key: "attr", label: "屬性", width: "18rem" },
  { key: "value", label: "值", width: "12rem" },
  { key: "purpose", label: "用途" },
]

export function AriaTable({ rows }: { rows: AriaRow[] }) {
  return (
    <Table
      columns={COLUMNS}
      rows={rows.map((row) => ({
        attr: <code className="font-mono text-teal-PRIMARY">{row.attr}</code>,
        value: <code className="font-mono text-teal-700">{row.value}</code>,
        purpose: row.purpose,
      }))}
    />
  )
}
```

`components/demo/ScreenReaderNotes.tsx`：

```tsx
// ScreenReaderNotes — 兩款螢幕閱讀器的預期播報內容並列。
//
// 分開列而不是寫一段「螢幕閱讀器會唸出…」，是因為 NVDA 與 VoiceOver 的實際
// 行為經常不同，混為一談會讓讀者以為只有一種正確答案。
function Column({ title, lines }: { title: string; lines: string[] }) {
  return (
    <div className="flex-1">
      <h3 className="typography-strong1 m-0 mb-12 text-teal-700">{title}</h3>
      <ul className="m-0 flex list-none flex-col gap-8 p-0">
        {lines.map((line, i) => (
          <li
            key={i}
            className="typography-body2 rounded-8 border border-bg-warm-gray bg-bg-light-off-white px-16 py-12 text-teal-700"
          >
            「{line}」
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ScreenReaderNotes({
  nvda,
  voiceOver,
}: {
  nvda: string[]
  voiceOver: string[]
}) {
  return (
    <div className="flex flex-col gap-24 tablet:flex-row">
      <Column title="NVDA（Windows）" lines={nvda} />
      <Column title="VoiceOver（macOS）" lines={voiceOver} />
    </div>
  )
}
```

`components/demo/WcagList.tsx`：

```tsx
export type WcagCriterion = {
  /** 條款編號，例如 "2.4.3" */
  id: string
  /** 條款名稱（中文） */
  name: string
  level: "A" | "AA" | "AAA"
  /** 這個元件為什麼與該條款有關 */
  note: string
  /** W3C Understanding 文件連結 */
  href: string
}

const LEVEL_STYLE: Record<WcagCriterion["level"], string> = {
  A: "bg-green-PRIMARY text-neutral-black",
  AA: "bg-blue-PRIMARY text-neutral-white",
  AAA: "bg-teal-PRIMARY text-neutral-white",
}

export function WcagList({ criteria }: { criteria: WcagCriterion[] }) {
  return (
    <ul className="m-0 flex list-none flex-col gap-16 p-0">
      {criteria.map((c) => (
        <li
          key={c.id}
          className="rounded-16 border border-bg-warm-gray bg-neutral-white p-20 tablet:p-24"
        >
          <div className="flex flex-wrap items-center gap-12">
            <span
              className={`typography-strong3 inline-flex items-center rounded-8 px-8 py-4 ${LEVEL_STYLE[c.level]}`}
            >
              等級 {c.level}
            </span>
            <a
              href={c.href}
              className="typography-strong1 rounded-8 text-teal-PRIMARY underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
            >
              {c.id} {c.name}
            </a>
          </div>
          <p className="typography-body2 m-0 mt-8 text-teal-700">{c.note}</p>
        </li>
      ))}
    </ul>
  )
}
```

- [ ] **Step 4: 實作 DemoPage 版型**

`components/demo/DemoPage.tsx`：

```tsx
import { Container } from "@/components/Container/Container"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { DemoSection } from "./DemoSection"
import { PageToc } from "./PageToc"

export type DemoSectionSpec = {
  /** 錨點 id，同時是目錄連結的目標 */
  id: string
  title: string
  content: React.ReactNode
}

// DemoPage — 所有元件頁共用的版型。
//
// 區塊以資料傳入而非 children，這樣目錄和內容出自同一份清單，不會有目錄列了
// 一個不存在的區塊、或新增區塊忘了更新目錄的情況。
export function DemoPage({
  title,
  description,
  sections,
}: {
  title: string
  description: string
  sections: DemoSectionSpec[]
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Container className="py-48 desktop:py-60">
        <div className="flex gap-48">
          <div className="flex min-w-0 flex-1 flex-col gap-48">
            {sections.map((section) => (
              <DemoSection key={section.id} id={section.id} title={section.title}>
                {section.content}
              </DemoSection>
            ))}
          </div>
          <PageToc sections={sections.map(({ id, title }) => ({ id, title }))} />
        </div>
      </Container>
    </>
  )
}
```

- [ ] **Step 5: 建立元件頁的 route group layout**

`app/(component)/layout.tsx`：

```tsx
// (component) route group — 元件頁共用的外層。
//
// 目前只是透傳：版型由 DemoPage 提供，這一層存在的意義是讓所有元件頁在路由上
// 成為一組，日後若要加共用的 breadcrumb 或側邊元件清單，改這裡即可。
export default function ComponentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
```

- [ ] **Step 6: 執行測試確認通過**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run components/demo/DemoPage.test.tsx && npm run typecheck`
Expected: PASS，4 個測試通過。

- [ ] **Step 7: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: demo 頁版型與區塊元件

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 10: Dialog 元件頁

**Files:**
- Create: `app/(component)/dialog/DialogDemo.tsx`
- Create: `app/(component)/dialog/page.tsx`
- Test: `app/(component)/dialog/DialogDemo.test.tsx`

**Interfaces:**
- Consumes: Task 5 的 `Dialog`、`Button`；Task 8 的 `A11yTree`；Task 9 的 `DemoPage`、`DemoStage`、`KeyboardTable`、`AriaTable`、`ScreenReaderNotes`、`WcagList`、`CodeBlock`
- Produces: `/dialog` 路由；`DialogDemo` 作為後續元件頁互動區的參考實作

- [ ] **Step 1: 寫失敗的測試**

`app/(component)/dialog/DialogDemo.test.tsx`：

```tsx
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { beforeAll, describe, expect, it } from "vitest"
import { DialogDemo } from "./DialogDemo"

// jsdom 尚未實作 <dialog> 的 showModal / close，補上足以驗證開關狀態的替身。
beforeAll(() => {
  if (!HTMLDialogElement.prototype.showModal) {
    HTMLDialogElement.prototype.showModal = function showModal(this: HTMLDialogElement) {
      this.open = true
    }
  }
  if (!HTMLDialogElement.prototype.close) {
    HTMLDialogElement.prototype.close = function close(this: HTMLDialogElement) {
      this.open = false
      this.dispatchEvent(new Event("close"))
    }
  }
})

describe("DialogDemo", () => {
  it("初始狀態下對話框未開啟", () => {
    render(<DialogDemo />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("按下開啟鈕後對話框出現且有標題", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))

    const dialog = await screen.findByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "刪除這筆紀錄？" })).toBeInTheDocument()
  })

  it("按下取消後對話框關閉", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))
    await user.click(await screen.findByRole("button", { name: "取消" }))

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("A11yTree 在對話框開啟前後顯示不同內容", async () => {
    const user = userEvent.setup()
    render(<DialogDemo />)

    expect(await screen.findByTestId("a11y-tree-empty")).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "開啟對話框" }))

    expect(await screen.findByTestId("a11y-tree-role")).toHaveTextContent("dialog")
    expect(screen.getByTestId("a11y-tree-name")).toHaveTextContent("刪除這筆紀錄？")
  })
})
```

- [ ] **Step 2: 執行測試確認失敗**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run "app/(component)/dialog/DialogDemo.test.tsx"`
Expected: FAIL — `Failed to resolve import "./DialogDemo"`

- [ ] **Step 3: 實作互動區**

`app/(component)/dialog/DialogDemo.tsx`：

```tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/Button/Button"
import { Dialog } from "@/components/Dialog/Dialog"
import { A11yTree } from "@/components/demo/A11yTree"
import { DemoStage } from "@/components/demo/DemoStage"

// DialogDemo — Dialog 的互動範例與其 Accessibility Tree。
//
// 兩者放在同一個 client 元件裡，是因為 A11yTree 要觀察的目標只有在對話框開啟時
// 才存在於 DOM；擺在一起，讀者按下按鈕的同時就能看到三列數值從「不在無障礙樹中」
// 變成 dialog / 標題 / open, modal。
export function DialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-24">
      <DemoStage>
        <Button variant="small" theme="light" onClick={() => setOpen(true)}>
          開啟對話框
        </Button>
        <p className="typography-body2 m-0 text-teal-300">
          開啟後試試 Tab、Shift + Tab 與 Esc，右下的三列數值會跟著改變。
        </p>
      </DemoStage>

      <A11yTree
        selector="dialog[open]"
        hint="觀察對象：目前開啟中的 <dialog> 元素。"
      />

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="刪除這筆紀錄？"
        description="刪除後無法復原，確定要繼續嗎？"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="small" theme="danger" onClick={() => setOpen(false)}>
              刪除
            </Button>
          </>
        }
      />
    </div>
  )
}
```

- [ ] **Step 4: 執行測試確認通過**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npx vitest run "app/(component)/dialog/DialogDemo.test.tsx"`
Expected: PASS，4 個測試通過。

若第 4 個測試中 `a11y-tree-role` 沒出現，檢查 `Dialog` 的 `showModal()` 是否有加上 `open` 屬性 — jsdom 替身用的是 `this.open = true`，會反映到屬性上。

- [ ] **Step 5: 實作頁面**

`app/(component)/dialog/page.tsx`：

```tsx
import type { Metadata } from "next"
import { AriaTable } from "@/components/demo/AriaTable"
import { CodeBlock } from "@/components/demo/CodeBlock"
import { DemoPage } from "@/components/demo/DemoPage"
import { KeyboardTable } from "@/components/demo/KeyboardTable"
import { ScreenReaderNotes } from "@/components/demo/ScreenReaderNotes"
import { WcagList } from "@/components/demo/WcagList"
import { DialogDemo } from "./DialogDemo"

export const metadata: Metadata = {
  title: "Dialog — A11y Tutorial",
  description: "以原生 <dialog> 實作的強制回應對話框，含 accessibility tree、鍵盤操作與 WCAG 對應。",
}

const USAGE = `import { Dialog } from "@/components/Dialog/Dialog"
import { Button } from "@/components/Button/Button"

function DeleteConfirm() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="small" onClick={() => setOpen(true)}>
        刪除
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="刪除這筆紀錄？"
        description="刪除後無法復原，確定要繼續嗎？"
        actions={
          <>
            <Button variant="small" theme="greenStroke" onClick={() => setOpen(false)}>
              取消
            </Button>
            <Button variant="small" theme="danger" onClick={handleDelete}>
              刪除
            </Button>
          </>
        }
      />
    </>
  )
}`

export default function DialogPage() {
  return (
    <DemoPage
      title="Dialog"
      description="以原生 <dialog> 實作的強制回應對話框。焦點鎖定、Esc 關閉與背景 inert 由瀏覽器提供，不需要自行實作 focus trap。"
      sections={[
        {
          id: "demo",
          title: "Demo 與 Accessibility Tree",
          content: <DialogDemo />,
        },
        {
          id: "keyboard",
          title: "鍵盤操作",
          content: (
            <KeyboardTable
              rows={[
                { keys: "Enter / Space", action: "在觸發按鈕上開啟對話框。" },
                { keys: "Tab", action: "在對話框內的可聚焦元素之間循環，不會跑到背景內容。" },
                { keys: "Shift + Tab", action: "反向循環，同樣被限制在對話框內。" },
                { keys: "Esc", action: "關閉對話框，焦點回到原本的觸發元素。" },
              ]}
            />
          ),
        },
        {
          id: "aria",
          title: "ARIA 屬性",
          content: (
            <AriaTable
              rows={[
                {
                  attr: "role",
                  value: "dialog",
                  purpose: "由 <dialog> 元素隱含提供，不需另外書寫。",
                },
                {
                  attr: "aria-modal",
                  value: "true",
                  purpose: "由 showModal() 隱含提供，告訴輔助科技背景內容暫時不可用。",
                },
                {
                  attr: "aria-labelledby",
                  value: "標題元素的 id",
                  purpose: "讓對話框的 accessible name 取自可見標題，兩者不會不一致。",
                },
                {
                  attr: "aria-label",
                  value: "關閉",
                  purpose: "關閉鈕內只有圖示，需要文字名稱才有可用的按鈕標籤。",
                },
                {
                  attr: "aria-hidden",
                  value: "true",
                  purpose: "頂部橘色裝飾條與關閉鈕圖示都是純視覺，不應進入無障礙樹。",
                },
              ]}
            />
          ),
        },
        {
          id: "screen-reader",
          title: "螢幕閱讀器預期行為",
          content: (
            <ScreenReaderNotes
              nvda={[
                "刪除這筆紀錄？ 對話方塊",
                "刪除後無法復原，確定要繼續嗎？",
                "取消 按鈕",
              ]}
              voiceOver={[
                "刪除這筆紀錄？，網頁對話方塊",
                "刪除後無法復原，確定要繼續嗎？",
                "取消，按鈕",
              ]}
            />
          ),
        },
        {
          id: "wcag",
          title: "WCAG 對應",
          content: (
            <WcagList
              criteria={[
                {
                  id: "1.3.1",
                  name: "資訊與關聯性",
                  level: "A",
                  note: "標題以 aria-labelledby 與對話框關聯，而不是只在視覺上靠近。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships",
                },
                {
                  id: "2.1.1",
                  name: "鍵盤",
                  level: "A",
                  note: "開啟、操作、關閉全程可用鍵盤完成，不依賴滑鼠點擊遮罩。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/keyboard",
                },
                {
                  id: "2.1.2",
                  name: "沒有鍵盤陷阱",
                  level: "A",
                  note: "焦點雖然被限制在對話框內，但 Esc 一定能離開，不構成陷阱。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap",
                },
                {
                  id: "2.4.3",
                  name: "焦點順序",
                  level: "A",
                  note: "開啟時焦點進入對話框，關閉時回到觸發它的按鈕。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-order",
                },
                {
                  id: "2.4.7",
                  name: "焦點可見",
                  level: "AA",
                  note: "對話框內每個可聚焦元素都有橘色 focus ring。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible",
                },
                {
                  id: "4.1.2",
                  name: "名稱、角色、值",
                  level: "A",
                  note: "role=dialog、accessible name、aria-modal 皆由平台或明寫屬性提供。",
                  href: "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value",
                },
              ]}
            />
          ),
        },
        {
          id: "code",
          title: "程式碼",
          content: <CodeBlock code={USAGE} label="Dialog 使用範例程式碼" />,
        },
      ]}
    />
  )
}
```

- [ ] **Step 6: 全部驗證**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm test && npm run typecheck && npm run build`
Expected: 全部通過，build 輸出的路由清單包含 `/` 與 `/dialog`。

- [ ] **Step 7: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
feat: Dialog 元件頁

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 11: 瀏覽器驗證與 README

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: 前面所有 task
- Produces: `README.md`；一份確認過的手動驗證結果

- [ ] **Step 1: 啟動開發伺服器**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm run dev`
Expected: 伺服器在 `http://localhost:3000` 啟動。

- [ ] **Step 2: 手動驗證清單**

在瀏覽器逐項確認，任何一項不過就修好再繼續：

1. 開啟 `http://localhost:3000` — 深綠導覽帶、波浪紋 PageHeader、元件卡片格線、米色 footer 都正常顯示
2. 頁面載入後按 Tab — 第一個焦點是「跳到主要內容」，且它從隱藏變為可見
3. 按 Enter 觸發 skip link — 焦點移到主內容
4. 繼續 Tab — 每個可聚焦元素都有橘色 ring
5. 點擊 Dialog 卡片 — 進入 `/dialog`
6. `/dialog` 上 Accessibility Tree 面板顯示「元素目前不在無障礙樹中。」
7. 按「開啟對話框」— 三列變成 `dialog` / `open, modal` / `刪除這筆紀錄？`
8. 對話框開啟時反覆按 Tab — 焦點不會跑到背景內容
9. 按 Esc — 對話框關閉，面板回到「不在無障礙樹中」，焦點回到觸發按鈕
10. 視窗縮到 375px 寬 — 沒有橫向捲軸，右側目錄隱藏，內容正常堆疊
11. 瀏覽器縮放到 200% — 內容不重疊、不被裁切

- [ ] **Step 3: 撰寫 README**

`README.md`：

```markdown
# A11y Tutorial

無障礙元件展示站。每個元件有獨立頁面，包含可操作範例、即時的 accessibility
tree（Role / Name / Status）、鍵盤操作、ARIA 屬性、螢幕閱讀器預期行為與對應的
WCAG 條款。

## 開發

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # 單元測試
npm run typecheck  # 型別檢查
npm run build      # 正式建置
```

## 設計系統

視覺與元件庫移植自 `SSO/center`，tokens 定義在 `app/globals.css` 的 `@theme`
區塊。幾條規則：

- 字級用 `typography-*` 語意 class，不直接寫 `text-*`
- 間距與圓角只用 tokens（`p-16`、`rounded-24`…）
- focus 一律是 `focus-visible:ring-2 focus-visible:ring-orange-PRIMARY`
- `Card` 表面不加陰影

## 新增一個元件頁

1. 在 `lib/components-registry.ts` 加一筆 `ComponentEntry`
2. 建立 `app/(component)/<slug>/page.tsx`，用 `DemoPage` 並傳入六個區塊
3. 互動範例與 `A11yTree` 放在同目錄的 client 元件（參考 `dialog/DialogDemo.tsx`）

`DemoPage` 的 `sections` 同時驅動內容與右側目錄，不需要另外維護目錄。

## 目錄結構

- `app/` — 路由。`(component)` 是 route group，不出現在網址中
- `components/` — 自 SSO center 移植的 design system 元件
- `components/demo/` — demo 站專用的展示元件
- `lib/a11y/` — accessibility tree 的計算邏輯（純函式，有完整單元測試）
- `docs/superpowers/` — 設計文件與實作計畫
```

- [ ] **Step 4: 最終驗證**

Run: `cd /Users/vic/Documents/project/a11y-tutorial && npm test && npm run typecheck && npm run build`
Expected: 全部通過。

- [ ] **Step 5: Commit**

```bash
cd /Users/vic/Documents/project/a11y-tutorial
git add -A
git commit -m "$(cat <<'EOF'
docs: README 與專案使用說明

Co-Authored-By: Claude Opus 5 <noreply@anthropic.com>
EOF
)"
```
