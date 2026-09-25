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
}

export const COMPONENTS: ComponentEntry[] = [
  {
    slug: "accordion",
    name: "Accordion",
    summary: "一組可展開收合的標題與面板，可限制同時只開啟一個。",
    status: "planned",
  },
  {
    slug: "alert",
    name: "Alert",
    summary: "不移動焦點、由輔助科技即時播報的狀態訊息。",
    status: "planned",
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
    status: "planned",
  },
  {
    slug: "button",
    name: "Button",
    summary: "可作為 <button> 或連結呈現的動作元件，含載入中與停用狀態。",
    status: "planned",
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
    status: "planned",
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
  },
  {
    slug: "disclosure",
    name: "Disclosure",
    summary: "單一按鈕控制一段內容的顯示與隱藏，狀態以 aria-expanded 表達。",
    status: "planned",
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
    status: "planned",
  },
  {
    slug: "switch",
    name: "Switch",
    summary: "立即生效的開關，狀態是開或關，而非待送出的勾選。",
    status: "planned",
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
    status: "planned",
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
