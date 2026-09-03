# A11y 元件 Demo 站 — 設計文件

日期：2026-09-04

## 目的

建立一個對外展示用的無障礙元件 demo 網站。每個元件有獨立頁面，除了可操作的
範例之外，同時揭露該元件的 accessibility tree（Role / Name / Status）、鍵盤
操作、ARIA 屬性、螢幕閱讀器預期行為，以及對應的 WCAG 條款。

頁面同時是簡報素材來源 — 版型需要能直接截圖貼進投影片（參考現有的
「Message Dialog - Accessibility Tree」投影片，其中 Role / Status / Name 三列
即為本站 Accessibility Tree 區塊的視覺原型）。

## 非目標

- 不做 Storybook（demo 頁本身即展示介面）
- 不做多語系切換（介面固定繁體中文）
- 不搬移 SSO 專屬的認證流程元件

## 技術棧

比照 `SSO/center`：

- Next.js 16（App Router）
- React 19
- Tailwind CSS v4（`@theme` inline tokens，無 tailwind.config）
- TypeScript（strict）
- `clsx` + `tailwind-merge`（`lib/cn.ts`）
- `dom-accessibility-api` — 計算 accessible name / description

不安裝：`@ory/*`、Storybook 及其 addon。

## 專案結構

```
a11y-demo/
├─ app/
│  ├─ globals.css              tokens + typography-* + base layer
│  ├─ layout.tsx               html lang="zh-Hant"、skip link、SiteNav、Footer
│  ├─ page.tsx                 首頁：元件入口清單
│  └─ (component)/
│     ├─ layout.tsx            元件頁共用外框
│     └─ dialog/page.tsx       → /dialog（版型樣板）
├─ components/                 從 SSO center/components 複製（見「元件移植」）
│  └─ demo/                    demo 站專用元件
│     ├─ DemoPage.tsx          元件頁版型骨架
│     ├─ DemoSection.tsx       單一區塊（標題 + Card）
│     ├─ DemoStage.tsx         互動範例展示區
│     ├─ A11yTree.tsx          Role / Name / Status 即時面板
│     ├─ KeyboardTable.tsx     鍵盤操作表
│     ├─ AriaTable.tsx         ARIA 屬性表
│     ├─ ScreenReaderNotes.tsx NVDA / VoiceOver 預期行為
│     ├─ WcagList.tsx          WCAG 條款清單
│     ├─ CodeBlock.tsx         程式碼片段
│     └─ PageToc.tsx           右側 sticky 目錄
├─ lib/
│  ├─ cn.ts
│  ├─ components-registry.ts   元件清單（首頁與導覽的單一資料來源）
│  └─ a11y/
│     ├─ implicit-roles.ts     tagName → implicit ARIA role 對照
│     └─ compute-node.ts       從 DOM 元素算出 { role, name, status }
├─ public/brand/               logo 等資產（自 center 複製）
├─ next.config.mjs
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json
```

路由規則：元件頁掛在網域根層 — `/button`、`/dialog`、`/checkbox`，以此類推。
`(component)` 是 route group，只提供共用 layout，不出現在網址中。

## 元件移植

從 `SSO/center/components/` **整包複製**，但排除依賴 `@ory/*` 或 SSO 業務邏輯的
項目：

排除：`AuthPage`、`FlowForm`、`Form`、`EmailVerification`、`SettingsTabs`、
`CoseeingIdentityCard`、`Nav`（保留 `SiteNav`）。

保留：`Accordion`、`Badge`、`Button`、`Card`、`CarouselControls`、`Checkbox`、
`Container`、`Dialog`、`EventCard`、`Field`、`FilterPills`、`Footer`、
`MainSiteFooter`、`Icons`、`Input`、`Link`、`MemberCard`、`PageHeader`、
`ProjectCard`、`ReportCard`、`Select`、`SiteNav`、`Table`、`Tabs`、`Tag`、
`ThumbnailCard`、`Toast`、`UpcomingEventItem`。

`.stories.tsx` 檔案一併移除（不做 Storybook）。

複製後的元件需要調整：移除 `appPath()` 依賴（SSO 的 basePath 機制）、移除
`SiteNav` 的 session/logout 邏輯，改為本站導覽。

## 視覺設計規範

整站沿用 center 的 design system，不另創風格。

### 版面框架

- 頂部 `bg-teal-PRIMARY` 導覽帶，logo 靠左
- 中段 `<main>` 內容區
- 底部 `bg-bg-light-beige` footer
- 三段共用水平留白：`px-20 tablet:px-40 desktop:px-80`
- 內容欄用 `Container`（`mx-auto px-20 desktop:max-w-[112rem]`）

### 基礎

- `html { font-size: 62.5% }` — rem 值即為 px 的十分之一（1.6rem = 16px）
- body：底色 `--color-bg-light-off-white` (#f6f7f1)、文字 `teal-700`
- 中文內文字型 Noto Sans TC；標題字型 Inter（由 `typography-*` 指定）

### 色彩分工

- **teal** — 主色：導覽帶、標題、主要按鈕、連結
- **orange** — 強調與 focus：`focus-visible:ring-orange-PRIMARY` 為全站唯一的
  focus 樣式，不得以其他顏色取代
- **beige / warm-gray** — 底色與髮絲邊框
- **red / green / blue** — 僅用於狀態語意（錯誤、成功、資訊）

### 表面

內容一律落在 `Card` 上：白底、`rounded-24`、`border border-bg-warm-gray`、
**無陰影**。demo 頁多區塊並列，陰影會成為視覺雜訊。

### 字級與間距

- 字級不直接寫 `text-*`，一律用語意 class：`typography-display1`、
  `typography-headline1`–`4`、`typography-feature1`–`3`、`typography-strong1`–`3`、
  `typography-emphasised1`–`3`、`typography-body1`–`3`
- 間距只用 `--spacing-*` tokens（4 的倍數，rem 單位）
- 圓角只用 `--radius-8/16/18/24/32`

### 響應斷點

`mobile: 375px`、`tablet: 768px`、`desktop: 1280px`。

## 首頁

`app/page.tsx` — 元件入口清單。

- `PageHeader` 標題區：站名 + 一段說明
- 卡片格線（mobile 單欄 / tablet 兩欄 / desktop 三欄），每張卡：
  - 元件名稱（`typography-headline4`）
  - 一句話說明（`typography-body2`、`teal-300`）
  - 狀態 `Tag`：「已完成」/「規劃中」
  - 整張卡為連結，指向 `/{slug}`
- 資料來源為 `lib/components-registry.ts`，新增元件只需在此加一筆

第一版 registry 內含 `dialog`（已完成）與 `button`（規劃中）兩筆，用以驗證
首頁卡片的兩種狀態呈現。完整清單待補後批次擴充。

## 元件頁版型

`components/demo/DemoPage.tsx` 定義固定結構，所有元件頁共用：

```
PageHeader   元件名稱 + 一句話定位 + 適用情境
─────────────────────────────────────────────
主欄（flex-1）                    │ 右側 PageToc
                                  │ (sticky, desktop 才顯示)
1. Demo 與 Accessibility Tree      │ · Demo 與 Accessibility Tree
   互動範例 + Role/Name/Status    │ · 鍵盤操作
   即時值，兩者上下相鄰           │ · ARIA 屬性
2. 鍵盤操作                       │ · 螢幕閱讀器
   按鍵 → 行為 表格               │ · WCAG 對應
3. ARIA 屬性                      │ · 程式碼
   屬性 → 值 → 用途 表格          │
4. 螢幕閱讀器預期行為             │
   NVDA / VoiceOver 分列          │
5. WCAG 對應                      │
   條款 + 等級 + 說明 + 連結      │
6. 程式碼                         │
   usage 片段                     │
```

Demo 與 Accessibility Tree 合為同一區塊：面板的值必須與互動範例同時在視野內，
讀者才看得到按下按鈕的瞬間三列數值如何改變；拆成兩區會讓因果關係斷掉。

各區塊以 `DemoSection` 包裝（`<section>` + `<h2>` + `Card`），標題階層為
h1（頁面）→ h2（區塊）→ h3（區塊內細分）。

區塊 2、3 用既有的 `Table` 元件呈現，維持與 design system 一致。

## Accessibility Tree 區塊

`components/demo/A11yTree.tsx` — 本站的核心元件。

### 行為

- 接受一個 `targetRef`（指向 demo 中要觀察的元素）或 CSS selector
- 即時計算並顯示三個值：
  - **Role** — 先讀 `role` 屬性；沒有則以 `lib/a11y/implicit-roles.ts` 從
    tagName（含 `type`、`scope` 等修飾屬性）推導 implicit role
  - **Name** — `computeAccessibleName()`（`dom-accessibility-api`）
  - **Status** — 收集狀態屬性組成清單：`aria-expanded`、`aria-checked`、
    `aria-selected`、`aria-pressed`、`aria-disabled` / `disabled`、
    `aria-invalid`、`aria-current`、`aria-modal`、`aria-busy`、`open`
- 以 `MutationObserver`（監看 attributes + childList + subtree）重新計算，
  互動時數值即時更新
- 目標元素不存在時（例如 Dialog 未開啟）顯示「元素未出現在無障礙樹中」

### 視覺

比照投影片原型 — 左側色塊標籤、右側同色外框值欄：

| 列 | 標籤色塊 | 值欄外框 |
|---|---|---|
| Role | `bg-orange-PRIMARY`，`text-neutral-black` | `border-orange-PRIMARY` |
| Status | `bg-red-PRIMARY`，`text-neutral-white` | `border-red-PRIMARY` |
| Name | `bg-teal-100/20`，`text-teal-700` | `border-teal-100/40` |

標籤寬度固定對齊，值欄用等寬字呈現實際字串。整體放在 `Card` 內，留白足夠讓
截圖可直接使用。

### 客戶端邊界

`A11yTree` 與各元件頁的互動 demo 需要 `"use client"`。頁面本身（`page.tsx`）
維持 server component，僅把互動區塊拆成獨立的 client 元件。

## 本站自身的無障礙要求

demo 站必須以身作則：

- `<html lang="zh-Hant">`
- 「跳到主要內容」skip link（沿用 center 的實作）
- landmark 齊備：`banner`（nav）、`main`、`contentinfo`（footer）、右側目錄為
  `navigation` 並帶 `aria-label`
- 標題階層不跳級
- 所有互動元素有可見 focus（橘色 ring）
- 尊重 `prefers-reduced-motion`
- 色彩對比達 WCAG AA 以上

## 交付範圍（第一階段）

1. 專案初始化與相依套件
2. `globals.css` tokens 移植
3. 元件移植與去 SSO 化
4. layout（SiteNav / Footer / skip link）
5. 首頁與 registry
6. `DemoPage` 版型與所有 `components/demo/*` 區塊元件
7. `A11yTree` 與 `lib/a11y/*`
8. `/dialog` 一頁完整實作，作為版型樣板

本階段以框架為主。`/dialog` 之所以納入，是因為版型與 `A11yTree` 若沒有實際
元件套用就無法驗證 — 它同時是投影片原型的來源元件。其餘元件頁待使用者提供
完整清單後，依 registry + `DemoPage` 版型批次擴充。
