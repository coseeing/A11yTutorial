// 元件清單 — 首頁卡片與各處導覽的單一資料來源。
//
// 這 20 個元件出自 W3C ARIA APG 的 pattern 清單。範圍不是隨意挑的：規則表中
// 「知識難度 2」的規則共 119 條，散落在全部 20 個元件上，每一個都得有自己的
// 頁面來涵蓋它那幾條。
//
// slug 沿用 APG 的 pattern 網址片段（w3.org/WAI/ARIA/apg/patterns/<slug>/），
// 一個例外是 Dialog：APG 那邊叫 dialog-modal，這裡用較短的 dialog。
//
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
  /**
   * 這一頁已經涵蓋的 APG 規則編號。status 為 "done" 時，必須列滿該元件全部的
   * 難度 2 規則 —— 由 components-registry.test.ts 逐條比對 lib/apg-rules.ts。
   *
   * 這是一份宣告：測試保證「你列的等於該列的」，但「列出來的那條真的寫在頁面上」
   * 仍需要人確認。少了它，漏規則不會有任何東西發出聲音。
   */
  coveredRules?: string[]
}

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "accordion",
    name: "Accordion",
    summary: "一組可展開收合的標題與面板，可限制同時只開啟一個。",
    status: "done",
    coveredRules: [
      "APG-ACC-003", // 標題列具有 button 角色語意 — ARIA 屬性表
      "APG-ACC-004", // heading 內只能包含標題按鈕 — WCAG 1.3.1
      "APG-ACC-005", // 標題層級須符合頁面資訊架構 — WCAG 1.3.1、headingLevel prop
      "APG-ACC-006", // aria-expanded 反映展開狀態 — ARIA 屬性表、Accessibility Tree
      "APG-ACC-008", // 不可收合時標 aria-disabled — ARIA 屬性表
      "APG-ACC-009", // region 以標題按鈕為無障礙名稱 — ARIA 屬性表
      "APG-ACC-010", // 避免產生過多 region 地標 — ARIA 屬性表、程式碼註解
    ],
  },
  {
    slug: "alert",
    name: "Alert",
    summary: "不移動焦點、由輔助科技即時播報的狀態訊息。",
    status: "done",
    coveredRules: [
      "APG-ALERT-001", // 容器具有 alert 角色 — ARIA 屬性表、Accessibility Tree
      "APG-ALERT-002", // 動態出現時螢幕閱讀器需能報讀 — ARIA 屬性表「（時機）」列
    ],
  },
  {
    slug: "alertdialog",
    name: "Alert Dialog",
    summary: "承載警告或錯誤、需要使用者立即回應的對話框。",
    status: "planned",
  },
  {
    slug: "breadcrumb",
    name: "Breadcrumb",
    summary: "標示目前頁面在網站層級中的位置，並提供回上層的路徑。",
    status: "done",
    coveredRules: [
      "APG-BRD-001", // 須位於導覽地標內 — ARIA 屬性表、WCAG 1.3.1
      "APG-BRD-002", // 導覽地標須具備無障礙名稱 — ARIA 屬性表、WCAG 2.4.6
      "APG-BRD-003", // 目前頁面須設定 aria-current=page — ARIA 屬性表、Accessibility Tree
    ],
  },
  {
    slug: "button",
    name: "Button",
    summary: "可作為 <button> 或連結呈現的動作元件，含載入中與停用狀態。",
    status: "done",
    coveredRules: [
      "APG-BTN-001", // Enter / 空白鍵啟動 — 鍵盤操作表
      "APG-BTN-002", // 角色語意與實際功能一致 — ARIA 屬性表 role 列
      "APG-BTN-003", // 須具有無障礙名稱 — ARIA 屬性表 aria-label、Accessibility Tree
      "APG-BTN-005", // 補充說明以 aria-describedby 關聯 — ARIA 屬性表、Accessibility Tree
      "APG-BTN-006", // 停用狀態 — ARIA 屬性表 aria-disabled、Demo 的兩種做法對照
      "APG-BTN-007", // Toggle 的 aria-pressed 且名稱不變 — ARIA 屬性表、Demo
    ],
  },
  {
    slug: "carousel",
    name: "Carousel",
    summary: "輪播一組幻燈片，自動輪播必須可暫停，切換需支援鍵盤。",
    status: "planned",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    summary: "可獨立勾選的選項，支援勾選、未勾選與不確定三種狀態。",
    status: "done",
    coveredRules: [
      "APG-CHK-002", // checkbox 角色語意 — ARIA 屬性表、Accessibility Tree
      "APG-CHK-003", // 無障礙名稱來自 label — ARIA 屬性表、Demo 點標籤可切換
      "APG-CHK-004", // 勾選與部分勾選狀態 — ARIA 屬性表 mixed、Demo 全選
      "APG-CHK-006", // 群組具有無障礙名稱 — ARIA 屬性表 fieldset/legend、Accessibility Tree
      "APG-CHK-007", // 群組或控制項的補充說明 — ARIA 屬性表 aria-describedby
    ],
  },
  {
    slug: "combobox",
    name: "Combobox",
    summary: "文字輸入搭配彈出清單的複合控制項，焦點留在輸入框內。",
    status: "planned",
  },
  {
    slug: "dialog",
    name: "Dialog",
    summary: "以原生 <dialog> 實作的強制回應對話框，焦點鎖定與 ESC 關閉由平台提供。",
    status: "done",
    coveredRules: [
      "APG-DLG-008", // 對話框容器具有 dialog 角色 — ARIA 屬性表
      "APG-DLG-009", // 操作對話框所需的元素須位於 role=dialog 之內 — ARIA 屬性表
      "APG-DLG-010", // aria-modal=true — ARIA 屬性表
      "APG-DLG-011", // 開啟時阻止操作背景內容 — 鍵盤操作表、WCAG 2.1.2
      "APG-DLG-012", // 開啟時在視覺上遮蔽背景內容 — ARIA 屬性表
      "APG-DLG-013", // 須具有無障礙名稱 — ARIA 屬性表、Accessibility Tree
      "APG-DLG-014", // 僅在說明簡短時才使用 aria-describedby — ARIA 屬性表
      "APG-DLG-015", // 舊式 aria-hidden 的正確用法 — ARIA 屬性表
    ],
  },
  {
    slug: "disclosure",
    name: "Disclosure",
    summary: "單一按鈕控制一段內容的顯示與隱藏，狀態以 aria-expanded 表達。",
    status: "done",
    coveredRules: [
      "APG-DISC-002", // 控制元件須具備 button 角色語意 — ARIA 屬性表
      "APG-DISC-003", // aria-expanded 反映內容顯示狀態 — ARIA 屬性表、Accessibility Tree
    ],
  },
  {
    slug: "feed",
    name: "Feed",
    summary: "可無限捲動的文章串流，讓螢幕閱讀器能逐篇瀏覽而不迷失位置。",
    status: "planned",
  },
  {
    slug: "grid",
    name: "Grid",
    summary: "以方向鍵在儲存格之間移動的互動式表格，整體只佔一個 Tab 停留點。",
    status: "planned",
  },
  {
    slug: "landmark-regions",
    name: "Landmark Regions",
    summary: "以地標角色劃分頁面區塊，讓使用者能直接跳到主要內容或導覽。",
    status: "planned",
  },
  {
    slug: "link",
    name: "Link",
    summary: "導向其他資源的連結，名稱本身就要說明目的地。",
    status: "planned",
  },
  {
    slug: "listbox",
    name: "Listbox",
    summary: "從清單中選取一個或多個選項，以方向鍵移動選取焦點。",
    status: "planned",
  },
  {
    slug: "radio",
    name: "Radio Group",
    summary: "一組互斥選項，整組只佔一個 Tab 停留點，以方向鍵在其中移動。",
    status: "done",
    coveredRules: [
      "APG-RAD-008", // 選項須位於 role=radiogroup 內 — ARIA 屬性表、Accessibility Tree
      "APG-RAD-009", // 每個選項具 radio 角色 — ARIA 屬性表、Accessibility Tree
      "APG-RAD-010", // 選取狀態 — ARIA 屬性表、Accessibility Tree
      "APG-RAD-011", // 每個選項具無障礙名稱 — ARIA 屬性表、Accessibility Tree
      "APG-RAD-012", // 群組具無障礙名稱 — ARIA 屬性表 aria-labelledby
      "APG-RAD-013", // 群組或選項的補充說明 — ARIA 屬性表、Demo 兩種層級
    ],
  },
  {
    slug: "switch",
    name: "Switch",
    summary: "立即生效的開關，狀態是開或關，而非待送出的勾選。",
    status: "done",
    coveredRules: [
      "APG-SWT-004", // switch 角色 — ARIA 屬性表、Accessibility Tree
      "APG-SWT-005", // 無障礙名稱 — ARIA 屬性表、Accessibility Tree
      "APG-SWT-006", // 開啟與關閉狀態 — ARIA 屬性表 checked、Accessibility Tree
      "APG-SWT-007", // 群組具有無障礙名稱 — ARIA 屬性表 fieldset/legend、Accessibility Tree
      "APG-SWT-008", // 補充說明 — ARIA 屬性表 aria-describedby、Demo
    ],
  },
  {
    slug: "table",
    name: "Table",
    summary: "呈現表格資料的靜態表格，儲存格需與正確的標頭產生關聯。",
    status: "planned",
  },
  {
    slug: "tabs",
    name: "Tabs",
    summary: "一組分頁標籤切換對應的面板，以方向鍵在標籤之間移動。",
    status: "done",
    coveredRules: [
      "APG-TAB-001", // tablist 容器 — ARIA 屬性表
      "APG-TAB-002", // tablist 無障礙名稱 — ARIA 屬性表 aria-labelledby、Demo 可見標題
      "APG-TAB-003", // tab 角色且位於 tablist 內 — ARIA 屬性表、Accessibility Tree
      "APG-TAB-004", // tabpanel 角色 — ARIA 屬性表、Accessibility Tree
      "APG-TAB-006", // aria-selected 狀態 — ARIA 屬性表、Accessibility Tree
      "APG-TAB-008", // tabpanel 由對應 tab 命名 — ARIA 屬性表、Accessibility Tree
    ],
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    summary: "附加在元素上的補充說明，透過 aria-describedby 與觸發元素關聯。",
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
