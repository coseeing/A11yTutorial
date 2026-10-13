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

/**
 * 這個元件的規則來源。
 *
 * "apg" —— 在 W3C ARIA APG 的 pattern 表中，交付範圍由 lib/apg-rules.ts 的
 * 難度 2 規則決定，必須在 coveredRules 逐條列出。
 *
 * "practice" —— APG 沒有這個 pattern。Toast 就是這一類：它是介面慣例而非
 * ARIA pattern，依據是 WCAG 成功準則（4.1.3、2.2.1）與 live region 的既有
 * 實務。沒有規則編號可列，所以不受 coveredRules 約束。
 */
export type ComponentSource = "apg" | "practice"

export type ComponentEntry = {
  /** 路由片段，同時是網址：/<slug> */
  slug: string
  /** 元件名稱，維持英文原名以對應程式碼 */
  name: string
  /** 一句話說明它解決什麼問題 */
  summary: string
  status: ComponentStatus
  /** 省略視為 "apg"。 */
  source?: ComponentSource
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
    status: "done",
    coveredRules: [
      "APG-ALD-001", // alertdialog 角色 — ARIA 屬性表、Accessibility Tree
      "APG-ALD-002", // aria-modal=true 須明寫 — ARIA 屬性表、Accessibility Tree
      "APG-ALD-004", // 開啟時遮擋背景內容 — ARIA 屬性表 aria-modal、::backdrop
      "APG-ALD-005", // 無障礙名稱來自可見標題 — ARIA 屬性表、Accessibility Tree
      "APG-ALD-006", // 警示訊息成為補充說明 — ARIA 屬性表、Accessibility Tree
      "APG-ALD-012", // 舊式 aria-hidden 的正確用法 — ARIA 屬性表「（舊式）」列
    ],
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
    status: "done",
    coveredRules: [
      "APG-CAR-001", // 容器用 group 而非 region — ARIA 屬性表、Accessibility Tree
      "APG-CAR-002", // aria-roledescription=carousel — ARIA 屬性表、Accessibility Tree 的 Role 列
      "APG-CAR-003", // 容器具無障礙名稱且不含「輪播」 — ARIA 屬性表、Accessibility Tree
      "APG-CAR-004", // 上下張控制為原生 button — ARIA 屬性表、鍵盤操作表
      "APG-CAR-006", // 播放控制名稱隨動作改變且不用 aria-pressed — ARIA 屬性表
      "APG-CAR-011", // 投影片為 group 加 aria-roledescription=slide — Accessibility Tree 第二個面板
      "APG-CAR-012", // 投影片具辨識性名稱 — Accessibility Tree 第二個面板
      "APG-CAR-013", // aria-live 隨播放狀態切換且 aria-atomic=false — ARIA 屬性表
      "APG-CAR-014", // Tab 型投影片用 tabpanel 且不加角色描述 — 第二個 demo、Accessibility Tree
      "APG-CAR-015", // 每個 tab 指出它顯示哪一張 — 第二個 demo、Accessibility Tree
      "APG-CAR-016", // tablist 的 aria-label 說明用途 — ARIA 屬性表、第二個 demo
      "APG-CAR-018", // 群組式選取器置於具名 group 內 — ARIA 屬性表
      "APG-CAR-019", // 群組式選取控制為原生 button — ARIA 屬性表
      "APG-CAR-020", // 選取按鈕名稱與對應投影片相符 — Accessibility Tree 第三個面板
      "APG-CAR-021", // 目前那張的選取按鈕標 aria-disabled 且留在 Tab 順序 — Accessibility Tree 第三個面板
    ],
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
    status: "done",
    coveredRules: [
      "APG-CBX-016", // Grid 型彈出內容的選取範圍 — ARIA 屬性表 aria-selected
      "APG-CBX-021", // Tree 型彈出內容區分焦點與選取 — ARIA 屬性表 aria-selected
      "APG-CBX-024", // 對話框型彈出內容符合 Modal Dialog Pattern — 第二個 demo、鍵盤操作表
      "APG-CBX-025", // 確定與取消後焦點移回並正確處理值 — 第二個 demo、鍵盤操作表 Esc
      "APG-CBX-026", // 輸入元件具 combobox 角色 — ARIA 屬性表、Accessibility Tree
      "APG-CBX-030", // aria-haspopup 與彈出內容類型一致 — ARIA 屬性表、兩個 demo 對照
      "APG-CBX-031", // aria-expanded 反映彈出狀態 — ARIA 屬性表、Accessibility Tree
      "APG-CBX-034", // 名稱來自 label 且與目前值可區分 — ARIA 屬性表、Accessibility Tree
      "APG-CBX-035", // aria-autocomplete 與實際行為一致 — ARIA 屬性表
      "APG-CBX-036", // 自動選取的建議值在失焦時成為值 — 鍵盤操作表 Tab、Accessibility Tree 第三個面板
      "APG-CBX-037", // 行內完成字串以反白與選取呈現 — ARIA 屬性表 aria-autocomplete=both
    ],
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
    status: "done",
    coveredRules: [
      "APG-FED-009", // feed 具無障礙名稱 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-FED-010", // 所有內容位於 role=article 內 — ARIA 屬性表、Accessibility Tree 第二個面板
      "APG-FED-011", // 每篇文章具可區分的名稱 — ARIA 屬性表、Accessibility Tree 第二個面板
      "APG-FED-012", // 文章以 aria-describedby 指向主要內容 — ARIA 屬性表、Accessibility Tree
      "APG-FED-015", // aria-busy 反映動態更新 — Demo 的載入更多、Accessibility Tree 第一個面板
    ],
  },
  {
    slug: "grid",
    name: "Grid",
    summary: "以方向鍵在儲存格之間移動的互動式表格，整體只佔一個 Tab 停留點。",
    status: "done",
    coveredRules: [
      "APG-GRID-018", // 容器具 grid 角色 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-GRID-021", // grid 具無障礙名稱 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-GRID-022", // grid 具補充說明 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-GRID-024", // 選取狀態以 aria-selected 呈現 — Accessibility Tree 第三個面板
      "APG-GRID-025", // 無編輯功能時不使用 aria-readonly — ARIA 屬性表
    ],
  },
  {
    slug: "landmark-regions",
    name: "Landmark Regions",
    summary: "以地標角色劃分頁面區塊，讓使用者能直接跳到主要內容或導覽。",
    status: "done",
    coveredRules: [
      "APG-LMK-006", // 名稱有意義且不重複角色名 — ARIA 屬性表、Accessibility Tree 各面板
      "APG-LMK-007", // main 位於最高層級且數量適當 — ARIA 屬性表、Accessibility Tree 第三個面板
      "APG-LMK-008", // 多個 main 須有可區分名稱 — ARIA 屬性表
      "APG-LMK-009", // banner 位於最高層級且數量適當 — ARIA 屬性表、第一與第四個面板對照
      "APG-LMK-010", // 多個 banner 須有可區分名稱 — ARIA 屬性表
      "APG-LMK-011", // contentinfo 位於最高層級且數量適當 — ARIA 屬性表、第九個面板
      "APG-LMK-012", // 多個 contentinfo 須有可區分名稱 — ARIA 屬性表
      "APG-LMK-013", // complementary 用於相關的輔助內容 — ARIA 屬性表 <aside>
      "APG-LMK-014", // form 地標具識別用途的名稱 — Demo 的訂閱表單、第六個面板
      "APG-LMK-015", // form 地標用於整份表單而非欄位 — ARIA 屬性表、Demo 的訂閱表單
      "APG-LMK-016", // 導覽地標標籤保持一致 — ARIA 屬性表 <nav>、第二個面板
      "APG-LMK-017", // region 具無障礙名稱 — Demo 的具名與未具名 section 對照
      "APG-LMK-018", // 搜尋功能使用搜尋地標 — Demo 的 <search>、第五個面板
      "APG-LMK-019", // 頁面層級 header/footer 揭露地標 — 第一與第四個面板對照
      "APG-LMK-020", // 用於 region 的 section 具名稱 — 第七與第八個面板對照
    ],
  },
  {
    slug: "link",
    name: "Link",
    summary: "導向其他資源的連結，名稱本身就要說明目的地。",
    status: "done",
    coveredRules: [
      "APG-LINK-001", // 具連結角色語意 — ARIA 屬性表、Accessibility Tree 三個面板對照
      "APG-LINK-002", // Enter 啟動並跳至目標 — 鍵盤操作表
    ],
  },
  {
    slug: "listbox",
    name: "Listbox",
    summary: "從清單中選取一個或多個選項，以方向鍵移動選取焦點。",
    status: "done",
    coveredRules: [
      "APG-LBX-015", // 容器具 listbox 角色 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-LBX-016", // 選項具 option 角色並正確隸屬 — ARIA 屬性表、Accessibility Tree 第三個面板
      "APG-LBX-017", // 每個群組至少一個選項 — ARIA 屬性表、Demo 的兩個群組
      "APG-LBX-018", // 群組具無障礙名稱 — ARIA 屬性表、Accessibility Tree 第二個面板
      "APG-LBX-019", // 獨立 listbox 具無障礙名稱 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-LBX-021", // 選取狀態一致使用 aria-selected — ARIA 屬性表、Accessibility Tree 第三個面板
    ],
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
    slug: "toast",
    name: "Toast",
    summary: "不中斷操作的輕量通知，告知操作結果或狀態更新。",
    status: "done",
    source: "practice",
  },
  {
    slug: "switch",
    name: "Switch",
    summary: "立即生效的開關，狀態是開或關，而非待送出的勾選。",
    status: "done",
    coveredRules: [
      "APG-SWT-004", // 計算角色為 switch — ARIA 屬性表、Accessibility Tree 第二個面板
      "APG-SWT-005", // 開關具無障礙名稱 — ARIA 屬性表、Accessibility Tree 第二個面板
      "APG-SWT-006", // 正確呈現開啟與關閉狀態 — ARIA 屬性表、Accessibility Tree 的 Status 列
      "APG-SWT-007", // 開關群組具無障礙名稱 — ARIA 屬性表 fieldset/legend、第一個面板
      "APG-SWT-008", // 開關或群組具補充說明 — ARIA 屬性表、第一個面板的 Description 列
    ],
  },
  {
    slug: "table",
    name: "Table",
    summary: "呈現表格資料的靜態表格，儲存格需與正確的標頭產生關聯。",
    status: "done",
    coveredRules: [
      "APG-TBL-003", // 容器具 table 角色 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-TBL-006", // 表格具無障礙名稱 — ARIA 屬性表、Accessibility Tree 第一個面板
      "APG-TBL-007", // 表格具補充說明 — ARIA 屬性表、第一個面板的 Description 列
    ],
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
    status: "done",
    coveredRules: [
      "APG-TIP-009", // 觸發元素以 aria-describedby 參照提示 — ARIA 屬性表、Accessibility Tree
    ],
  },
]

/**
 * 對外顯示的元件 —— 只有已完成的。
 *
 * 目前 21 筆全部完成，所以這個函式等於回傳整份清單。它仍然存在，是因為首頁不該
 * 列出路由還不存在的元件 —— 點進去是 404 的入口比沒有入口更糟。日後新增元件時
 * 先進 registry、頁面還沒建好的那段期間，這一層就是防線。
 */
export function publishedComponents(): ComponentEntry[] {
  return COMPONENTS.filter((c) => c.status === "done")
}

export function findComponent(slug: string): ComponentEntry | undefined {
  return COMPONENTS.find((c) => c.slug === slug)
}
