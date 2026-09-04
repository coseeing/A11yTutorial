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
