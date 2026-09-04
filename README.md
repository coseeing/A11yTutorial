# A11y 元件 Demo

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

## Accessibility Tree 面板

面板拆成三層，各自只做一件事：

- `lib/a11y/use-a11y-node.ts` — 觀察。持續算出目標元素的 `{ role, name, status }`
- `components/demo/A11yTreeView.tsx` — 呈現。純函式，吃一個 `A11yNode | null`
- `components/demo/A11yTree.tsx` — 組合上面兩者

拆開的好處是餵給 view 的值可以來自即時觀察、保留下來的舊值，或手寫的宣告值
（用於尚未實作的元件頁，或與實際值並排對照）。

值本身這樣算出來：

- Role 由 `lib/a11y/implicit-roles.ts` 推導（明寫的 `role` 屬性優先）
- Name 由 `dom-accessibility-api` 依 accname 規範計算
- Status 收集 `aria-expanded`、`aria-checked` 等狀態屬性，順序固定
- 以 `MutationObserver` 加事件監聽重算，互動時即時更新

用 selector 而非 ref，是因為目標元素可能在關閉時整個離開 DOM。

### latch 模式

`<A11yTree latch />` 會在目標離開無障礙樹後保留最後一次的值，並以橘色提示條
標明那是舊值。用於 Dialog、Toast 這類會整個離開 DOM 的元件：開啟時遮罩壓暗
面板反而讀不到數值，關閉後留著值才看得清、也才截得下來。

長駐頁面的元件（Button、Checkbox）不要開 latch，維持即時才誠實。

## 目錄結構

- `app/` — 路由。`(component)` 是 route group，不出現在網址中
- `components/` — 自 SSO center 移植的 design system 元件
- `components/demo/` — demo 站專用的展示元件
- `lib/a11y/` — accessibility tree 的計算邏輯（純函式，有完整單元測試）
- `docs/superpowers/` — 設計文件與實作計畫
