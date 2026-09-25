// 由 data/apg-pattern-rules.csv 自動產生 —— 請勿手動編輯。
// 重新產生：npm run generate:apg-rules
//
// 共 289 條規則，20 個元件，其中知識難度 2 有 119 條。
//   accordion           10 條，難度 2 有 7 條
//   alert                5 條，難度 2 有 2 條
//   alertdialog         12 條，難度 2 有 6 條
//   breadcrumb           3 條，難度 2 有 3 條
//   button               8 條，難度 2 有 6 條
//   carousel            24 條，難度 2 有 15 條
//   checkbox             7 條，難度 2 有 5 條
//   combobox            38 條，難度 2 有 11 條
//   dialog              15 條，難度 2 有 8 條
//   disclosure           4 條，難度 2 有 2 條
//   feed                15 條，難度 2 有 5 條
//   grid                31 條，難度 2 有 5 條
//   landmark-regions    21 條，難度 2 有 15 條
//   link                 4 條，難度 2 有 2 條
//   listbox             28 條，難度 2 有 6 條
//   radio               13 條，難度 2 有 6 條
//   switch               8 條，難度 2 有 5 條
//   table               12 條，難度 2 有 3 條
//   tabs                22 條，難度 2 有 6 條
//   tooltip              9 條，難度 2 有 1 條

/** 知識難度。2 代表該規則必須實作到 demo 上。 */
export type ApgDifficulty = 1 | 2 | 3

export type ApgRule = {
  /** 規則編號，例如 "APG-ACC-003" */
  id: string
  /** 對應的元件 slug，與 components-registry 一致 */
  component: string
  /** 規則名稱（中文） */
  name: string
  /** 預期行為（中文） */
  expectation: string
  /** 對應規範，例如 ["APG Accordion Pattern", "SC 4.1.2 Name, Role, Value"] */
  criteria: string[]
  /** 無障礙主題，例如「元件語意」「焦點管理」 */
  topic: string
  /** 必做為 true，選做為 false */
  required: boolean
  difficulty: ApgDifficulty
  /** APG pattern 頁面網址 */
  source: string
}

export const APG_RULES: ApgRule[] = [
  {
    "id": "APG-ACC-001",
    "component": "accordion",
    "name": "Accordion 標題列可用 Enter 鍵或 Space 鍵切換展開與收合",
    "expectation": "當鍵盤焦點位於 Accordion 的標題列時，按下 Enter 或空白鍵可展開已收合的面板；若支援收合功能，再按一次可收合已展開的面板。若頁面只允許同時展開一個面板，展開新面板時會自動收合原本展開的面板。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-002",
    "component": "accordion",
    "name": "Accordion 的可聚焦元素依循頁面的 Tab 鍵順序",
    "expectation": "Tab 鍵與 Shift+Tab 鍵可分別移至下一個與上一個可聚焦元素； Accordion 中所有可聚焦元素皆須納入頁面的 Tab 鍵順序。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-003",
    "component": "accordion",
    "name": "Accordion 標題列具有 button 角色語意",
    "expectation": "每個 Accordion 的標題控制元件須具備 role=button 。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA button"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-004",
    "component": "accordion",
    "name": "Accordion 的標題標籤內只能包含其標題按鈕",
    "expectation": "Accordion 的標題按鈕是其 heading 標籤內唯一的元素；其他視覺上持續顯示的元素須置於 heading 標籤外部。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA heading",
      "ARIA button"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-005",
    "component": "accordion",
    "name": "Accordion 標題列使用適當的標題層級",
    "expectation": "每個 Accordion 的標題按鈕須包含在 heading 標籤內，且標題層級須符合頁面的資訊架構。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA heading",
      "ARIA aria-level"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-006",
    "component": "accordion",
    "name": "Accordion 的 aria-expanded 須正確反映內容區塊的展開狀態",
    "expectation": "每個 Accordion 的標題按鈕在對應內容區塊可見時，aria-expanded 須為 true；內容區塊不可見時則須為 false。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-expanded"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-007",
    "component": "accordion",
    "name": "Accordion 的 aria-controls 須指向對應的內容區塊",
    "expectation": "每個 Accordion 的標題按鈕須將 aria-controls 設定為包含對應內容區塊的元素 ID。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-controls"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-008",
    "component": "accordion",
    "name": "已展開且不可收合的 Accordion 標題列須標記 aria-disabled",
    "expectation": "若已展開的內容區塊不允許收合，其標題按鈕須設定 aria-disabled=true。",
    "criteria": [
      "APG Accordion Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-disabled"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-009",
    "component": "accordion",
    "name": "Accordion 的內容區域 （region）須以對應的標題按鈕作為無障礙名稱",
    "expectation": "若 Accordion 的內容區域使用 role=region，須透過 aria-labelledby 對應至該內容區域的按鈕。",
    "criteria": [
      "APG Accordion Pattern",
      "ARIA region",
      "ARIA aria-labelledby"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ACC-010",
    "component": "accordion",
    "name": "Accordion 應避免產生過多的區域地標（region landmarks）",
    "expectation": "若 Accordion 的內容區域使用 role=region，應避免產生過多的地標，例如當頁面中可同時展開的內容區域超過約六個時，就須謹慎使用。",
    "criteria": [
      "APG Accordion Pattern",
      "ARIA region"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
  },
  {
    "id": "APG-ALD-001",
    "component": "alertdialog",
    "name": "警示對話框具有 alertdialog 角色語意",
    "expectation": "包含警示訊息與所有按鈕的容器，須指定 role=alertdialog 。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA alertdialog"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-002",
    "component": "alertdialog",
    "name": "警示對話框開啟時具有 modal 語意",
    "expectation": "警示對話框的容器須設定 aria-modal=true。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-modal"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-003",
    "component": "alertdialog",
    "name": "警示對話框開啟時無法操作背景區域",
    "expectation": "警示對話框開啟時，程式會阻止所有使用者操作對話框外的內容。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-004",
    "component": "alertdialog",
    "name": "警示對話框開啟時會遮擋背景內容",
    "expectation": "警示對話框開啟時，對話框外的背景內容在視覺上被遮蔽或淡化。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "ARIA aria-modal"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-005",
    "component": "alertdialog",
    "name": "警示對話框具有無障礙名稱",
    "expectation": "警示對話框須以 aria-labelledby 關聯可見標題；若無可見標題，則須設定 aria-label",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-006",
    "component": "alertdialog",
    "name": "警示對話框具有警示訊息提供的無障礙補充說明",
    "expectation": "警示對話框須以 aria-describedby 關聯警示訊息內容，以提供無障礙說明",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-describedby"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-007",
    "component": "alertdialog",
    "name": "警示對話框開啟時，焦點移入其中",
    "expectation": "開啟警示對話框時，焦點需移至內部合適的元素；例如執行不可逆操作時，應優先聚焦於影響最小的控制元件或最常使用的控制元件。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "APG Dialog (Modal) Pattern",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-008",
    "component": "alertdialog",
    "name": "警示對話框開啟時，Tab 焦點限制在對話框中",
    "expectation": "Tab 鍵與 Shift+Tab 鍵僅能在對話框內的可聚焦元件間切換，且會在首尾元件間循環",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-009",
    "component": "alertdialog",
    "name": "按下 Esc 鍵可關閉警示對話框",
    "expectation": "按下 Esc 鍵關閉警示對話框",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-010",
    "component": "alertdialog",
    "name": "關閉警示對話框後需恢復到原先的焦點位置",
    "expectation": "關閉警示對話框後，焦點回到原觸發元素；若該元素已不存在，或有更符合操作流程的位置，則移至該新元素。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "APG Dialog (Modal) Pattern",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-011",
    "component": "alertdialog",
    "name": "警示對話框的互動元件可正常操作",
    "expectation": "警示對話框提供可操作的控制元件，讓使用者回應重要訊息或確認要求。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALD-012",
    "component": "alertdialog",
    "name": "使用舊式 aria-hidden 時，應隱藏背景內容並保留警示對話框",
    "expectation": "若使用舊式 aria-hidden 對輔助科技隱藏停用的背景，需將背景區塊皆設定 aria-hidden=true，且警示對話框絕不可位於任何 aria-hidden=true 元素的子階層中。",
    "criteria": [
      "APG Alert and Message Dialogs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-hidden"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/"
  },
  {
    "id": "APG-ALERT-001",
    "component": "alert",
    "name": "警示元件須具有 alert 角色語意",
    "expectation": "包含警示訊息的容器具有 role=alert。",
    "criteria": [
      "APG Alert Pattern",
      "SC 4.1.3 Status Messages",
      "ARIA alert"
    ],
    "topic": "狀態訊息",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  },
  {
    "id": "APG-ALERT-002",
    "component": "alert",
    "name": "警示元件動態出現時，螢幕閱讀器需進行報讀",
    "expectation": "警示訊息需於頁面載入後動態顯示或更新，確保螢幕閱讀器能在訊息出現時進行報讀",
    "criteria": [
      "APG Alert Pattern",
      "SC 4.1.3 Status Messages",
      "ARIA alert"
    ],
    "topic": "狀態訊息",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  },
  {
    "id": "APG-ALERT-003",
    "component": "alert",
    "name": "警示元件不會改變鍵盤的聚焦位置",
    "expectation": "顯示警示元件時，不得移動鍵盤焦點或中斷使用者操作",
    "criteria": [
      "APG Alert Pattern",
      "SC 3.2.1 On Focus",
      "SC 4.1.3 Status Messages"
    ],
    "topic": "狀態訊息",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  },
  {
    "id": "APG-ALERT-004",
    "component": "alert",
    "name": "警示元件不會在使用者讀取前自動消失",
    "expectation": "警示元件應設計成不會自動消失；若採限時關閉，訊息必須保留足夠時間，讓使用者能察覺並完整閱讀。",
    "criteria": [
      "APG Alert Pattern",
      "SC 2.2.3 No Timing",
      "SC 2.2.4 Interruptions"
    ],
    "topic": "時間限制",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  },
  {
    "id": "APG-ALERT-005",
    "component": "alert",
    "name": "警示元件不會過度頻繁打斷使用者",
    "expectation": "警示元件不會過於頻繁產生，以免重複報讀妨礙視覺或認知障礙使用者操作。",
    "criteria": [
      "APG Alert Pattern",
      "SC 2.2.4 Interruptions"
    ],
    "topic": "時間限制",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  },
  {
    "id": "APG-BRD-001",
    "component": "breadcrumb",
    "name": "Breadcrumb 導覽須位於導覽地標內",
    "expectation": "Breadcrumb 置於導覽地標內",
    "criteria": [
      "APG Breadcrumb Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA navigation"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/"
  },
  {
    "id": "APG-BRD-002",
    "component": "breadcrumb",
    "name": "Breadcrumb 導覽地標須具備無障礙名稱",
    "expectation": "Breadcrumb 導覽地標須透過 aria-label 或 aria-labelledby 提供無障礙名稱",
    "criteria": [
      "APG Breadcrumb Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/"
  },
  {
    "id": "APG-BRD-003",
    "component": "breadcrumb",
    "name": "Breadcrumb 的目前頁面鏈結須正確設定成 aria-current",
    "expectation": "代表目前頁面的連結應設定 aria-current=\"page\"；若代表目前頁面的元素不是連結，則 aria-current 可省略。",
    "criteria": [
      "APG Breadcrumb Pattern",
      "SC 2.4.8 Location",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-current"
    ],
    "topic": "導覽機制",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/"
  },
  {
    "id": "APG-BTN-001",
    "component": "button",
    "name": "按鈕可用 Enter 鍵或空白鍵啟動",
    "expectation": "當焦點位於按鈕時，按 Enter 或空白鍵會啟動按鈕。",
    "criteria": [
      "APG Button Pattern",
      "SC 2.1.1 Keyboard",
      "ARIA button"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-002",
    "component": "button",
    "name": "按鈕角色語意與實際功能須一致",
    "expectation": "觸發操作的元素須具備原生按鈕語意或 role=button，且其外觀與角色須符合該操作，而非顯示為超連結",
    "criteria": [
      "APG Button Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA button"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-003",
    "component": "button",
    "name": "按鈕須具有無障礙名稱",
    "expectation": "按鈕的無障礙名稱來自其文字內容、aria-labelledby 或 aria-label。",
    "criteria": [
      "APG Button Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-004",
    "component": "button",
    "name": "啟動按鈕後焦點移到合理位置",
    "expectation": "按鈕觸發後，焦點移動需視執行動作而定：跳入開啟的對話框、關閉後回到合理的元素、情境未變時維持在按鈕上，或移至新情境的起點。若以快捷鍵觸發按鈕，焦點通常維持在原本使用快捷鍵的情境中。",
    "criteria": [
      "APG Button Pattern",
      "SC 2.4.3 Focus Order",
      "SC 3.2.1 On Focus"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-005",
    "component": "button",
    "name": "按鈕須具有無障礙補充說明",
    "expectation": "若按鈕包含其功能的補充說明，須透過 aria-describedby 指向包含該說明的元素",
    "criteria": [
      "APG Button Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-describedby"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-006",
    "component": "button",
    "name": "不可用的按鈕須正確傳達停用狀態",
    "expectation": "當按鈕對應的操作無法使用時，按鈕須傳達停用狀態；若採用 ARIA 的 role=button 語意，須設定 aria-disabled=true。",
    "criteria": [
      "APG Button Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-disabled"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-007",
    "component": "button",
    "name": "Toggle 按鈕須正確設定 aria-pressed 並維持相同名稱",
    "expectation": "Toggle 按鈕須設定 aria-pressed，切換為開啟時為 true，關閉時為 false。使用 aria-pressed 時，按鈕名稱不得隨狀態改變；若名稱會改為描述下一個動作，則不得使用 aria-pressed。",
    "criteria": [
      "APG Button Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-pressed"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-BTN-008",
    "component": "button",
    "name": "選單按鈕須正確設定 aria-haspopup",
    "expectation": "若按鈕用於開啟選單，須將 aria-haspopup 設定為 menu 或 true，並依循 Menu Button Pattern。",
    "criteria": [
      "APG Button Pattern",
      "APG Menu Button Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-haspopup"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/button/"
  },
  {
    "id": "APG-CAR-001",
    "component": "carousel",
    "name": "輪播容器的角色設定須符合頁面的資訊架構",
    "expectation": "包含控制元件與投影片的輪播容器，只有在該輪播適合成為地標（landmark）時才使用 role=region，否則須使用 role=group。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA region",
      "ARIA group"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-002",
    "component": "carousel",
    "name": "輪播容器須標記 carousel 的角色描述",
    "expectation": "輪播容器須設定 aria-roledescription=carousel。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-roledescription"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-003",
    "component": "carousel",
    "name": "輪播容器須具有無障礙名稱",
    "expectation": "輪播有可見標題時，輪播容器須以 aria-labelledby 提供無障礙名稱，否則須使用 aria-label；名稱中不得重複出現「輪播」一詞。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-004",
    "component": "carousel",
    "name": "上一張與下一張的控制元件須具備 button 角色語意",
    "expectation": "上一張與下一張投影片的控制元件，須使用原生 button 元素，或完整實作 Button Pattern。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value",
      "ARIA button"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-005",
    "component": "carousel",
    "name": "播放控制元件為輪播中第一個 Tab 鍵停駐點",
    "expectation": "若輪播提供播放控制元件，該元件須是輪播內 Tab 鍵順序中的第一個元素。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-006",
    "component": "carousel",
    "name": "播放控制元件的標籤須說明點擊後的下一步動作",
    "expectation": "播放控制元件的名稱須隨下一個動作改變，例如「停止輪播」或「開始輪播」，且不得使用 aria-pressed。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-007",
    "component": "carousel",
    "name": "鍵盤聚焦時自動播放應暫停",
    "expectation": "若輪播會自動播放，輪播內任一元素取得鍵盤焦點時，須停止播放，且在使用者主動要求前不得自行恢復。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.2.2 Pause, Stop, Hide",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "動態內容",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-008",
    "component": "carousel",
    "name": "滑鼠懸停時自動播放應暫停",
    "expectation": "若輪播會自動播放，只要滑鼠停留在輪播範圍內，就須停止播放。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.2.2 Pause, Stop, Hide"
    ],
    "topic": "動態內容",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-009",
    "component": "carousel",
    "name": "輪播中的互動元素須依循頁面的 Tab 鍵順序",
    "expectation": "Tab 鍵與 Shift+Tab 鍵須依頁面既有的 Tab 鍵順序在輪播的互動元素間移動，不得另外撰寫程式改寫 Tab 鍵行為。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-010",
    "component": "carousel",
    "name": "操作輪播控制元件時不應改變鍵盤的聚焦位置",
    "expectation": "觸發播放、上一張或下一張控制元件後，鍵盤焦點須留在原控制元件上，不得移動。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 3.2.1 On Focus",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-011",
    "component": "carousel",
    "name": "基本輪播與群組式輪播的每張投影片須具備 group 角色與 slide 角色描述",
    "expectation": "基本輪播與群組式輪播中，每個投影片容器須設定 role=group 與 aria-roledescription=slide；Tab 型輪播則改用 tabpanel 結構，另行檢測。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA group",
      "ARIA aria-roledescription"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-012",
    "component": "carousel",
    "name": "基本輪播與群組式輪播的每張投影片須具備有意義的無障礙名稱",
    "expectation": "基本輪播與群組式輪播中，每張投影片須以 aria-labelledby 或 aria-label 提供能辨識其內容的無障礙名稱；若無法給出各自獨特的名稱，可改用位置與總數，例如「第 3 張，共 10 張」。名稱中不得重複出現「投影片」一詞。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-013",
    "component": "carousel",
    "name": "輪播的 aria-live 設定須與播放狀態相符",
    "expectation": "若投影片外層容器使用 aria-live，須同時設定 aria-atomic=false；自動播放進行中時 aria-live 須為 off，未自動播放時則為 polite。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.3 Status Messages",
      "ARIA aria-live",
      "ARIA aria-atomic"
    ],
    "topic": "狀態訊息",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-014",
    "component": "carousel",
    "name": "Tab 型輪播投影片使用 tabpanel 角色語意",
    "expectation": "若採用 Tab 型投影片選取器，每個投影片容器須設定 role=tabpanel 而非 role=group，且不得設定 aria-roledescription。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tabpanel",
      "ARIA aria-roledescription"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-015",
    "component": "carousel",
    "name": "Tab 型輪播選擇器的 Tab 須對應標示各投影片",
    "expectation": "若採用 Tab 型投影片選取器，每個 Tab 的無障礙名稱須以名稱或編號指出其所顯示的投影片。",
    "criteria": [
      "APG Carousel Pattern",
      "APG Tabs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tab"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-016",
    "component": "carousel",
    "name": "Tab 型輪播選擇器的 tablist 須具備說明其用途的標籤",
    "expectation": "若採用 Tab 型投影片選取器，其 tablist 須以 aria-label 說明這組 Tab 的用途。",
    "criteria": [
      "APG Carousel Pattern",
      "APG Tabs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tablist",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-017",
    "component": "carousel",
    "name": "Tab 型輪播選擇器完整實作 Tabs Pattern",
    "expectation": "若採用 Tab 型投影片選取器，其 tablist、tab 與 tabpanel 的角色、關聯、狀態與鍵盤操作，須完全依循 Tabs Pattern 的定義。",
    "criteria": [
      "APG Carousel Pattern",
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-018",
    "component": "carousel",
    "name": "群組式輪播選取器的容器須具備無障礙名稱",
    "expectation": "若採用群組式按鈕作為投影片選取器，這些按鈕須置於 role=group 的容器內，且該容器的無障礙名稱須說明這組控制元件的用途。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA group",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-019",
    "component": "carousel",
    "name": "群組式輪播選取器的控制元件須以 Button 實作",
    "expectation": "若採用群組式按鈕作為投影片選取器，每個選取控制元件須使用原生 button 元素，或完整實作 Button Pattern。",
    "criteria": [
      "APG Carousel Pattern",
      "APG Button Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value",
      "ARIA button"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-020",
    "component": "carousel",
    "name": "群組式輪播選取器的按鈕須具備與對應投影片相符的無障礙名稱",
    "expectation": "若採用群組式按鈕作為投影片選取器，每個選取按鈕的無障礙名稱須與其所顯示的投影片相符。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-021",
    "component": "carousel",
    "name": "群組式輪播目前顯示投影片的選取器的按鈕須標記 aria-disabled",
    "expectation": "群組式輪播中，對應目前顯示投影片的選取按鈕須設定 aria-disabled=true，且仍須保留在頁面的 Tab 鍵順序中。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-disabled"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-022",
    "component": "carousel",
    "name": "自動輪播須提供播放控制元件",
    "expectation": "若輪播具備自動播放功能，須提供可停止與重新開始自動播放的按鈕。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.2.2 Pause, Stop, Hide",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "動態內容",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-023",
    "component": "carousel",
    "name": "隱藏中的輪播投影片不應被輔助科技讀取",
    "expectation": "未在畫面上顯示的投影片，須確實對輔助科技隱藏，不得只是移到畫面外。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 1.3.2 Meaningful Sequence",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "閱讀順序",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CAR-024",
    "component": "carousel",
    "name": "隱藏中的輪播投影片不能被鍵盤聚焦",
    "expectation": "未在畫面上顯示的投影片，其內部的可聚焦元素須排除於頁面的鍵盤焦點順序之外。",
    "criteria": [
      "APG Carousel Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  },
  {
    "id": "APG-CBX-001",
    "component": "combobox",
    "name": "Combobox 是彈出內容在頁面 Tab 順序中的唯一進入點",
    "expectation": "以 Tab 導覽頁面時，可進入 Combobox，但彈出內容不會另外成為頁面 Tab 停駐點。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-002",
    "component": "combobox",
    "name": "Combobox 可用向下鍵移至彈出內容的第一個或下一個項目",
    "expectation": "若有彈出內容，聚焦 Combobox 後按向下鍵，焦點會移至適當的第一個可聚焦建議；若已有自動選取的建議，則移至該建議後的下一個項目。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-003",
    "component": "combobox",
    "name": "Combobox 可用向上鍵移至彈出內容的前一個項目",
    "expectation": "有彈出內容時，聚焦 Combobox 後按向上鍵，焦點會移至彈出內容最後一個可聚焦項目。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-004",
    "component": "combobox",
    "name": "Combobox 支援 Alt+方向鍵開關彈出內容",
    "expectation": "Alt+向下鍵會開啟彈出內容且不移動焦點；需要時，Alt+向上鍵會關閉彈出內容並將焦點移回 Combobox。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-005",
    "component": "combobox",
    "name": "Listbox、Grid 或 Tree 型彈出內容按 Enter 接受已選取的建議",
    "expectation": "在 Listbox 或 Grid 型彈出內容中，按 Enter 會接受目前焦點所在或已選取的建議、關閉彈出內容，並將接受的值放入 Combobox。在 Tree 型彈出內容中，按 Enter 會接受可選取的建議。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-006",
    "component": "combobox",
    "name": "可編輯的 Combobox 保留平台標準的文字編輯操作",
    "expectation": "在可編輯的 Combobox 中，可列印字元與平台標準的單行文字編輯按鍵（輸入、游標移動、選取、文字修改）皆可正常編輯其值。JavaScript 不得攔截這些按鍵事件而干擾瀏覽器原生的文字編輯行為。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 3.2.2 On Input"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-007",
    "component": "combobox",
    "name": "可編輯 Combobox 的彈出內容開開啟時可同時接收輸入字元",
    "expectation": "可編輯的 Combobox 在焦點位於 Listbox、Grid 或 Tree 型彈出內容時，輸入任一可列印字元，焦點會移回 Combobox 輸入框，彈出內容維持開啟不關閉，且該字元會輸入至輸入框中。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-008",
    "component": "combobox",
    "name": "不可編輯 Combobox 的 Listbox 或 Tree 彈出內容支援首字元快速定位",
    "expectation": "不可編輯的 Combobox 在焦點位於 Listbox 或 Tree 型彈出內容時，輸入可列印字元，焦點會移至名稱以該字元開頭的下一個建議值。Grid 型彈出內容不適用此行為。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-009",
    "component": "combobox",
    "name": "Combobox 可用 Escape 鍵關閉彈出內容",
    "expectation": "彈出內容可見時，按下 Escape 鍵會關閉彈出內容，且不會意外改變 Combobox 的值。彈出內容已隱藏時再按 Escape 鍵，須依該元件設計文件的定義，一律保留或一律清除 Combobox 的值。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 3.2.2 On Input"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-010",
    "component": "combobox",
    "name": "Escape 鍵關閉 Listbox、Grid 或 Tree 型彈出內容並將焦點移回 Combobox",
    "expectation": "焦點位於 Listbox、Grid 或 Tree 型彈出內容時，按下 Escape 鍵會關閉彈出內容，並將焦點移回 Combobox。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-011",
    "component": "combobox",
    "name": "Listbox 型彈出內容以上下鍵移動焦點並同步選取",
    "expectation": "焦點位於 Listbox 型彈出內容時，按向下鍵會將焦點移至下一個選項並同時選取該選項，按向上鍵會將焦點移至上一個選項並同時選取。焦點已位於最後一個（或第一個）選項時再按該方向鍵，須為「將焦點移回 Combobox」或「不做任何動作」兩者之一，且行為前後一致。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-012",
    "component": "combobox",
    "name": "Listbox 型彈出內容的左右鍵將焦點移回 Combobox 並移動文字游標",
    "expectation": "可編輯的 Combobox 在焦點位於 Listbox 型彈出內容時，按向左鍵或向右鍵，焦點會移回 Combobox 且彈出內容不關閉，同時文字游標往左或往右移動一個字元；游標已位於最左端或最右端時則不再移動。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-013",
    "component": "combobox",
    "name": "Listbox 型彈出內容的 Home 與 End 鍵移至首末選項或移動文字游標",
    "expectation": "焦點位於 Listbox 型彈出內容時，按 Home 鍵會將焦點移至並選取第一個選項，按 End 鍵會將焦點移至最後一個選項；若 Combobox 可編輯，亦可改為將焦點移回 Combobox，並把文字游標置於第一個字元前或最後一個字元後。實作須擇一並保持一致。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-014",
    "component": "combobox",
    "name": "Listbox 型彈出內容的 Backspace 與 Delete 鍵可編輯 Combobox",
    "expectation": "可編輯的 Combobox 在焦點位於 Listbox 型彈出內容時，按 Backspace 鍵會將焦點移回 Combobox 並刪除游標前一個字元；按 Delete 鍵會將焦點移回 Combobox，若已有建議值被選取則移除其選取狀態，並移除行內自動完成字串（若存在）。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-015",
    "component": "combobox",
    "name": "Grid 型彈出內容以方向鍵逐格移動焦點",
    "expectation": "焦點位於 Grid 型彈出內容時，向左鍵與向右鍵逐格水平移動，向上鍵與向下鍵逐格垂直移動；可選擇性支援在列首或列尾換至上一列或下一列。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-016",
    "component": "combobox",
    "name": "Grid 型彈出內容依建議值的呈現方式決定選取範圍",
    "expectation": "在 Grid 型彈出內容中，選取狀態跟隨焦點移動。若每個儲存格各代表一個不同的建議值，焦點所在的儲存格即為選取狀態；若同一列的所有儲存格描述的是同一個建議值，則該列、或該列中代表建議值的儲存格為選取狀態。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-selected"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-017",
    "component": "combobox",
    "name": "Grid 型彈出內容的 Page、Home、End 與 Control 組合鍵運作正確",
    "expectation": "焦點位於 Grid 型彈出內容時：Page Up 與 Page Down 鍵依作者設定的列數上下移動焦點，焦點已在首列或末列時不再移動；Home 與 End 鍵將焦點移至焦點所在列的第一個或最後一個儲存格；Control+Home 與 Control+End 鍵分別將焦點移至第一列與最後一列。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-018",
    "component": "combobox",
    "name": "Grid 型彈出內容的 Backspace 與 Delete 鍵可編輯 Combobox",
    "expectation": "可編輯的 Combobox 在焦點位於 Grid 型彈出內容時，按 Backspace 鍵會將焦點移回 Combobox 並刪除游標前一個字元；按 Delete 鍵會將焦點移回 Combobox，若已有建議值被選取則移除其選取狀態，並移除行內自動完成字串（若存在）。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-019",
    "component": "combobox",
    "name": "垂直排列的 Tree 型彈出內容以方向鍵導覽並展開收合節點",
    "expectation": "焦點位於垂直排列的 Tree 型彈出內容時：向右鍵在已收合節點上會展開該節點，且焦點與選取皆不移動，在已展開節點上會移至第一個子節點，在末端節點上不做任何動作；向左鍵在已展開節點上會收合該節點，在末端或已收合的子節點上會移至其父節點，在末端或已收合的根節點上不做任何動作；向下鍵與向上鍵會在不改變任何節點展開狀態的前提下，移至下一個或上一個可聚焦節點。上述焦點移動時，若目的節點為可選取的建議值，該節點同時被選取。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-020",
    "component": "combobox",
    "name": "Tree 型彈出內容以 Home 與 End 鍵移至首末節點",
    "expectation": "焦點位於 Tree 型彈出內容時，按 Home 鍵會將焦點移至第一個可聚焦節點，按 End 鍵會移至最後一個可聚焦節點，且皆不改變任何節點的展開或收合狀態；若目的節點為可選取的建議值，該節點同時被選取。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-021",
    "component": "combobox",
    "name": "Tree 型彈出內容在不可選取的分類節點上區分焦點與選取",
    "expectation": "焦點移至不可作為建議值選取的父節點或分類節點時，須為「維持原本已選取的節點不變」或「沒有任何值被選取」兩者之一。且畫面上焦點樣式與選取樣式必須有明顯可辨識的差異，讓使用者能清楚判斷目前是否已選取某個值。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-selected"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-022",
    "component": "combobox",
    "name": "水平排列的 Tree 型彈出內容標示水平方向語意",
    "expectation": "Tree 型彈出內容的節點若為水平排列，該 Tree 元素須設定 aria-orientation=\"horizontal\"。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-orientation"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-023",
    "component": "combobox",
    "name": "水平排列的 Tree 型彈出內容互換方向鍵行為",
    "expectation": "Tree 型彈出內容設定 aria-orientation=\"horizontal\" 時，向下鍵與向右鍵的行為互換，向上鍵與向左鍵的行為互換。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-024",
    "component": "combobox",
    "name": "Combobox 的對話框型彈出內容實作 Modal Dialog Pattern",
    "expectation": "若 Combobox 使用對話框型彈出內容，對話框的焦點移入、焦點循環、關閉方式及其他鍵盤操作符合 Modal Dialog Pattern。",
    "criteria": [
      "APG Combobox Pattern",
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "ARIA dialog"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-025",
    "component": "combobox",
    "name": "Combobox 對話框完成或取消後將焦點移回並正確處理值",
    "expectation": "在對話框型彈出內容中執行可指定 Combobox 值的動作（例如按下確定按鈕）後，對話框關閉、焦點移回 Combobox，且該值帶入 Combobox。取消對話框（按 Escape 鍵或啟用取消按鈕）時，焦點同樣移回 Combobox，且須為「保留原值不變」或「清除 Combobox 的值」兩者之一。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.4.3 Focus Order",
      "ARIA dialog"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-026",
    "component": "combobox",
    "name": "Combobox 輸入元件具有 combobox 角色語意",
    "expectation": "接收使用者輸入並顯示目前值的元素，須具有 role=\"combobox\" 或等效的 HTML 原生語意。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA combobox"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-027",
    "component": "combobox",
    "name": "Combobox 以 aria-controls 指向其彈出內容",
    "expectation": "彈出內容顯示時，Combobox 的 aria-controls 須指向作為彈出內容的元素。aria-controls 僅在彈出內容可見時為必要；若彈出內容隱藏後仍保留此屬性，其值仍須指向同一個彈出元素。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-controls"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-028",
    "component": "combobox",
    "name": "Combobox 的彈出內容具有支援的角色語意",
    "expectation": "Combobox 的彈出內容須依其互動模式，具有 role=\"listbox\"、role=\"tree\"、role=\"grid\" 或 role=\"dialog\" 其中之一。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA listbox",
      "ARIA tree",
      "ARIA grid",
      "ARIA dialog"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-029",
    "component": "combobox",
    "name": "Combobox 的彈出內容符合其對應的 APG Pattern",
    "expectation": "具有 role=\"listbox\"、role=\"grid\"、role=\"tree\" 或 role=\"dialog\" 的 Combobox 彈出內容，須符合各自對應 APG Pattern 所定義的角色、狀態、屬性與關聯。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA listbox",
      "ARIA grid",
      "ARIA tree",
      "ARIA dialog"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-030",
    "component": "combobox",
    "name": "Combobox 的 aria-haspopup 與彈出內容類型一致",
    "expectation": "彈出內容為 role=\"grid\"、role=\"tree\" 或 role=\"dialog\" 時，Combobox 須將 aria-haspopup 設為相對應的值（grid、tree 或 dialog）。彈出內容為 role=\"listbox\" 時可省略，因為 role=\"combobox\" 的 aria-haspopup 隱含值即為 listbox。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-haspopup"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-031",
    "component": "combobox",
    "name": "Combobox 的 aria-expanded 反映彈出內容的顯示狀態",
    "expectation": "彈出內容隱藏時，Combobox 須設定 aria-expanded=\"false\"；彈出內容可見時須設定為 true。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-expanded"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-032",
    "component": "combobox",
    "name": "Combobox 以 aria-activedescendant 管理彈出內容中的焦點",
    "expectation": "Combobox 取得焦點時，DOM 焦點置於 Combobox 元素上。當焦點位於 Listbox、Grid 或 Tree 型彈出內容的子元素時，DOM 焦點仍維持在 Combobox，並由 Combobox 的 aria-activedescendant 指向彈出內容中目前作用中的子元素。對話框型彈出內容不適用，其 DOM 焦點會實際移入對話框。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-activedescendant"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-033",
    "component": "combobox",
    "name": "Combobox 的彈出內容標示目前選取的建議值",
    "expectation": "使用 Listbox、Grid 或 Tree 型彈出內容時，若某個建議值在畫面上被標示為目前選取的值，代表該值的 option、gridcell、row 或 treeitem 元素須設定 aria-selected=\"true\"。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-selected"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-034",
    "component": "combobox",
    "name": "Combobox 具有與目前值可區分的無障礙名稱",
    "expectation": "Combobox 若有可見標籤，且其元素為可用 HTML label 元素標示的元素（例如 input），須使用 label 元素提供無障礙名稱；否則以 aria-labelledby 指向該可見標籤；若無可見標籤，則以 aria-label 提供名稱。Combobox 的無障礙名稱須與其目前值有所區別，讓輔助科技使用者在元件預設狀態下能同時得知名稱與值。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-035",
    "component": "combobox",
    "name": "Combobox 的 aria-autocomplete 與其自動完成行為一致",
    "expectation": "可編輯的 Combobox 須依其自動完成行為設定 aria-autocomplete：彈出內容中的建議值不隨輸入字元改變時設為 none；彈出內容會提供對應輸入字元的建議值清單時設為 list；除建議值清單外，還會在輸入游標後方顯示行內完成字串時設為 both。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-autocomplete"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-036",
    "component": "combobox",
    "name": "自動選取的建議值在 Combobox 失去焦點時成為其值",
    "expectation": "可編輯的 Combobox 採用「list 自動完成並自動選取」行為時，彈出內容出現後第一個建議值會自動標示為選取狀態；Combobox 失去焦點時，該自動選取的建議值即成為 Combobox 的值，除非使用者另行選擇了其他建議值、或修改了已輸入的文字。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 3.2.2 On Input",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-autocomplete"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-037",
    "component": "combobox",
    "name": "行內自動完成字串以視覺反白與選取狀態呈現",
    "expectation": "Combobox 設定 aria-autocomplete=\"both\" 時，所選建議值中使用者尚未輸入的部分（完成字串）會接在輸入游標後方以行內方式顯示，且須以視覺反白呈現並具有選取狀態。",
    "criteria": [
      "APG Combobox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-autocomplete"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CBX-038",
    "component": "combobox",
    "name": "相鄰的開啟按鈕可顯示 Combobox 的彈出內容",
    "expectation": "Combobox 旁若設有圖像化的開啟按鈕（Open button），啟用該按鈕時，在有可用建議值的情況下會顯示彈出內容。",
    "criteria": [
      "APG Combobox Pattern",
      "APG Button Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/combobox/"
  },
  {
    "id": "APG-CHK-001",
    "component": "checkbox",
    "name": "核取方塊可用 Space 切換狀態",
    "expectation": "當焦點位於核取方塊時，按 Space，勾選狀態會切換。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-CHK-002",
    "component": "checkbox",
    "name": "核取方塊具有 checkbox 角色語意",
    "expectation": "核取控制項具有 role=checkbox 或等效的原生核取方塊語意。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA checkbox"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-CHK-003",
    "component": "checkbox",
    "name": "核取方塊具有無障礙名稱",
    "expectation": "核取方塊的無障礙名稱來自其文字內容、aria-labelledby 或 aria-label。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-CHK-004",
    "component": "checkbox",
    "name": "核取方塊正確呈現勾選與部分勾選狀態",
    "expectation": "核取方塊勾選時 aria-checked=true、未勾選時為 false；三態核取方塊部分勾選時為 mixed。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-checked"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-CHK-005",
    "component": "checkbox",
    "name": "用來控制整組核取方塊的三態核取方塊會同步更新子項目。",
    "expectation": "若三態核取方塊用來控制一組選項，將其勾選會勾選全部子核取方塊，取消勾選會取消全部；若支援第三次切換，則會還原先前記住的部分勾選狀態。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 3.2.2 On Input",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-CHK-006",
    "component": "checkbox",
    "name": "核取方塊群組具有無障礙名稱",
    "expectation": "若多個核取方塊構成同一群組，role=group 的 aria-labelledby 指向可見群組標籤。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA group",
      "ARIA aria-labelledby"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-CHK-007",
    "component": "checkbox",
    "name": "核取方塊或核取方塊群組具有無障礙補充說明",
    "expectation": "若核取方塊或核取方塊群組有補充說明，對應元素的 aria-describedby 指向包含該補充說明的元素。",
    "criteria": [
      "APG Checkbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-describedby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/"
  },
  {
    "id": "APG-DISC-001",
    "component": "disclosure",
    "name": "Disclosure 控制元件可用 Enter 鍵或空白鍵切換內容",
    "expectation": "當焦點位於 Disclosure 控制元件時，按下 Enter 鍵或空白鍵可觸發該元件，並切換其所控制內容的顯示與隱藏。",
    "criteria": [
      "APG Disclosure (Show/Hide) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"
  },
  {
    "id": "APG-DISC-002",
    "component": "disclosure",
    "name": "Disclosure 控制元件須具備 button 角色語意",
    "expectation": "用來顯示與隱藏 Disclosure 內容的元素須具備 button 角色語意。",
    "criteria": [
      "APG Disclosure (Show/Hide) Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA button"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"
  },
  {
    "id": "APG-DISC-003",
    "component": "disclosure",
    "name": "Disclosure 的 aria-expanded 須反映內容的顯示狀態",
    "expectation": "Disclosure 按鈕所控制的內容可見時，aria-expanded=true；內容隱藏時，aria-expanded=false。",
    "criteria": [
      "APG Disclosure (Show/Hide) Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-expanded"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"
  },
  {
    "id": "APG-DISC-004",
    "component": "disclosure",
    "name": "Disclosure 的 aria-controls 須指向受控制的內容",
    "expectation": "若 Disclosure 按鈕提供 aria-controls，其值須指向包含該按鈕所顯示或隱藏全部內容的元素。",
    "criteria": [
      "APG Disclosure (Show/Hide) Pattern",
      "ARIA aria-controls"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/"
  },
  {
    "id": "APG-DLG-001",
    "component": "dialog",
    "name": "開啟對話框時焦點須移至內部適當位置",
    "expectation": "對話框開啟時，焦點須移至框內符合內容與任務的位置：內容較長或結構複雜時，移至內容起始的靜態元素；任務不可逆時，移至影響最小的操作；單純提供資訊或繼續流程時，移至最可能使用的控制元件。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.4.3 Focus Order",
      "SC 3.2.1 On Focus"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-002",
    "component": "dialog",
    "name": "Tab 焦點只會在對話框中循環",
    "expectation": "按下 Tab 鍵時，焦點僅能在對話框內移至下一個可透過 Tab 鍵到達的元素；若焦點位於最後一個元素時，則須移回第一個元素。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-003",
    "component": "dialog",
    "name": "Shift+Tab 焦點只會在對話框中循環",
    "expectation": "按下 Shift+Tab 鍵時，焦點僅能在對話框內移至上一個可透過 Tab 鍵到達的元素；若焦點位於第一個元素時，則須移至最後一個元素。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-004",
    "component": "dialog",
    "name": "對話框不得使用正數 tabindex",
    "expectation": "對話框不得以大於 0 的 tabindex 值控制其 Tab 順序。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-005",
    "component": "dialog",
    "name": "Esc 鍵可關閉對話框",
    "expectation": "按下 Esc 鍵須關閉對話框。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-006",
    "component": "dialog",
    "name": "關閉對話框後焦點須回到合理位置",
    "expectation": "關閉對話框後，焦點須回到原觸發元素；若該元素已不存在，或流程另有更合理的位置，則移至能提供合理流程的其他元素。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.4.3 Focus Order",
      "SC 3.2.1 On Focus"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-007",
    "component": "dialog",
    "name": "對話框須提供可見且可透過 Tab 到達的關閉按鈕",
    "expectation": "對話框的 Tab 鍵順序中，須包含可見的關閉按鈕，例如關閉或取消。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.7 Focus Visible"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-008",
    "component": "dialog",
    "name": "對話框容器具有 dialog 角色",
    "expectation": "對話框的容器須設定 role=dialog。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA dialog"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-009",
    "component": "dialog",
    "name": "操作對話框所需的元素須位於 role=dialog 之內",
    "expectation": "操作對話框所需的所有元素，都須是 role=dialog 元素的子階層元素。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA dialog"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-010",
    "component": "dialog",
    "name": "對話框須設定 aria-modal=true",
    "expectation": "對話框的容器須設定 aria-modal=true。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-modal"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-011",
    "component": "dialog",
    "name": "對話框開啟時須阻止操作背景內容",
    "expectation": "對話框開啟時，應用程式須防止使用者操作對話框外的內容。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "ARIA aria-modal"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-012",
    "component": "dialog",
    "name": "對話框開啟時須在視覺上遮蔽背景內容",
    "expectation": "對話框開啟時，對話框外的背景內容在視覺上須被遮蔽或淡化。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "ARIA aria-modal"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-013",
    "component": "dialog",
    "name": "對話框須具有無障礙名稱",
    "expectation": "對話框須以 aria-labelledby 關聯可見標題，或提供 aria-label 作為無障礙名稱。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-014",
    "component": "dialog",
    "name": "僅在說明簡短時才使用 aria-describedby",
    "expectation": "對話框若設定 aria-describedby，該屬性須指向說明用途或訊息的內容；若該內容是需要逐項導覽的清單、表格或多段文字，則不得使用 aria-describedby 一次關聯。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-describedby"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-DLG-015",
    "component": "dialog",
    "name": "舊式 aria-hidden 須隱藏停用的背景但不得隱藏對話框",
    "expectation": "若使用舊式 aria-hidden 對輔助科技隱藏停用的背景內容，須在每個包含該背景層的元素上設定 aria-hidden=true，且對話框元素不得位於任何 aria-hidden=true 元素的子階層中。",
    "criteria": [
      "APG Dialog (Modal) Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-hidden"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/"
  },
  {
    "id": "APG-FED-001",
    "component": "feed",
    "name": "Feed 依包含焦點的文章進行捲動與更新",
    "expectation": "在 Feed 文章間移動 DOM 焦點並觸發動態更新，頁面依焦點所在文章進行適當捲動、載入或移除內容，且更新過程不會造成焦點遺失。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.4.3 Focus Order",
      "SC 3.2.1 On Focus"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-002",
    "component": "feed",
    "name": "Feed 可用 Page Down 移到下一篇文章",
    "expectation": "Page Down 會將焦點移到下一篇文章。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-003",
    "component": "feed",
    "name": "Feed 可用 Page Up 移到上一篇文章",
    "expectation": "Page Up 會將焦點移到上一篇文章。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-004",
    "component": "feed",
    "name": "Feed 可用 Control+End 移到 Feed 之後",
    "expectation": "Control+End 會將焦點移到 Feed 之後的第一個可聚焦元素。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "SC 2.4.1 Bypass Blocks"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-005",
    "component": "feed",
    "name": "Feed 可用 Control+Home 移到 Feed 之前",
    "expectation": "Control+Home 會將焦點移到 Feed 之前的第一個可聚焦元素。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "SC 2.4.1 Bypass Blocks"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-006",
    "component": "feed",
    "name": "Feed 鍵盤操作說明清楚且容易找到",
    "expectation": "若 Feed 提供 Page Up、Page Down 等自訂操作，頁面上有容易找到且清楚的鍵盤操作說明。",
    "criteria": [
      "APG Feed Pattern",
      "SC 3.3.2 Labels or Instructions"
    ],
    "topic": "元件語意",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-007",
    "component": "feed",
    "name": "巢狀 Feed 提供可行的鍵盤進入與離開方式",
    "expectation": "Feed 含有巢狀 Feed 時，鍵盤使用者可用 Tab 或實作的快捷鍵進入，並能返回外層 Feed，例如以 Control+End 移到外層下一篇文章。若內含元件使用 Feed 導覽鍵，該按鍵先操作元件，使用者可將焦點移出後繼續導覽 Feed。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.1.2 No Keyboard Trap",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-008",
    "component": "feed",
    "name": "Feed 容器具有 feed 角色語意",
    "expectation": "包含所有資訊文章的容器具有 role=feed。",
    "criteria": [
      "APG Feed Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA feed"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-009",
    "component": "feed",
    "name": "Feed 具有無障礙名稱",
    "expectation": "Feed 以 aria-labelledby 關聯可見標題；沒有可見標題時，以 aria-label 提供名稱。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-010",
    "component": "feed",
    "name": "Feed 內所有內容均位於 role=article 的元素中",
    "expectation": "Feed 中每個內容單元具有 role=article，且 Feed 內沒有游離在 role=article 的元素外的內容。",
    "criteria": [
      "APG Feed Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA article"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-011",
    "component": "feed",
    "name": "每篇 Feed 文章具有可區分的無障礙名稱",
    "expectation": "每個 role=article 元素的 aria-labelledby 指向文章內能提供可區辨標籤的內容。",
    "criteria": [
      "APG Feed Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-012",
    "component": "feed",
    "name": "Feed 文章具有無障礙補充說明，且由主要內容提供",
    "expectation": "每篇 Feed 文章使用 aria-describedby，指向包含其主要內容並提供無障礙補充說明的一個或多個元素。",
    "criteria": [
      "APG Feed Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-describedby"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-013",
    "component": "feed",
    "name": "Feed 文章以 aria-posinset 提供所在位置",
    "expectation": "每個 role=article 元素的 aria-posinset 正確表示其在 Feed 總數量中的位置。",
    "criteria": [
      "APG Feed Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-posinset"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-014",
    "component": "feed",
    "name": "Feed 文章以 aria-setsize 提供文章總數",
    "expectation": "每個 role=article 元素的 aria-setsize 表示已載入的文章數或完整文章總數；總數未知時，aria-setsize 設為 -1。",
    "criteria": [
      "APG Feed Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-setsize"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-FED-015",
    "component": "feed",
    "name": "Feed 的 aria-busy 正確反映動態更新狀態",
    "expectation": "多步驟新增或移除文章期間，Feed 設為 aria-busy=true；更新完成後恢復為 aria-busy=false。",
    "criteria": [
      "APG Feed Pattern",
      "SC 4.1.3 Status Messages",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-busy"
    ],
    "topic": "狀態訊息",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/feed/"
  },
  {
    "id": "APG-GRID-001",
    "component": "grid",
    "name": "Grid 在頁面 Tab 順序中只有一個進入點",
    "expectation": "使用 Tab 導覽頁面時，整個 Grid 同一時間只有一個內部元素位於頁面 Tab 順序。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-002",
    "component": "grid",
    "name": "Grid 儲存格內容可由鍵盤到達",
    "expectation": "每個資料儲存格本身可聚焦，或包含可聚焦元素；非互動式的列標題與欄標題不必設為可聚焦。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-003",
    "component": "grid",
    "name": "Data Grid 支援向左鍵與向右鍵逐格移動",
    "expectation": "在 Data Grid 內按向左鍵與向右鍵時，焦點逐格水平移動；到達每列最左格或最右格時不再移動。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-004",
    "component": "grid",
    "name": "Data Grid 支援向上鍵與向下鍵逐格移動",
    "expectation": "在 Data Grid 內按向上鍵與向下鍵時，焦點逐格垂直移動；到達每欄最上格或最下格時不再移動。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-005",
    "component": "grid",
    "name": "Data Grid 支援 Page Up 與 Page Down 導覽",
    "expectation": "在 Data Grid 內按 Page Up 與 Page Down 時，焦點依設計跨多列移動；到達第一列或最後一列時不再移動。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-006",
    "component": "grid",
    "name": "Data Grid 的 Home 與 End 移到目前列首尾",
    "expectation": "在 Data Grid 任一儲存格按 Home 與 End 時，焦點分別移至目前列的第一格與最後一格。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-007",
    "component": "grid",
    "name": "Data Grid 的 Control+Home 與 Control+End 移到整體首尾",
    "expectation": "在 Data Grid 任一儲存格按 Control+Home 與 Control+End 時，焦點分別移至第一列第一格與目前已載入範圍的最後一格。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-008",
    "component": "grid",
    "name": "Layout Grid 支援向左鍵與向右鍵逐格移動",
    "expectation": "在 Layout Grid 內按向左鍵與向右鍵時，焦點依對應方向逐格水平移動；若支援換列，移動順序須符合可預期的閱讀順序，否則到達 Grid 邊界時不再移動。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-009",
    "component": "grid",
    "name": "Layout Grid 支援向上鍵與向下鍵逐格移動",
    "expectation": "在 Layout Grid 內按向上鍵與向下鍵時，焦點依對應方向逐格垂直移動；若支援換欄，移動順序須符合可預期的閱讀順序，否則到達 Grid 邊界時不再移動。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-010",
    "component": "grid",
    "name": "Layout Grid 支援 Page Up 與 Page Down 導覽",
    "expectation": "在 Layout Grid 內按 Page Up 與 Page Down 時，焦點依設計跨多列移動；到達第一列或最後一列時不再移動。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-011",
    "component": "grid",
    "name": "Layout Grid 的 Home 與 End 移到合理的列首尾",
    "expectation": "在 Layout Grid 內按 Home 與 End 將焦點移至目前列的第一格與最後一格；在支援的單欄或短列版面中，也可移至 Grid 的第一格與最後一格。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-012",
    "component": "grid",
    "name": "Layout Grid 支援 Control+Home 與 Control+End",
    "expectation": "在 Layout Grid 內按 Control+Home 與 Control+End 時，焦點分別移至第一格與最後一格。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-013",
    "component": "grid",
    "name": "Grid 選取快捷鍵會依預期更新選取範圍",
    "expectation": "若 Grid 提供選取快捷鍵，Control+Space 選取焦點所在欄、Shift+Space 選取焦點所在列、Control+A 選取全部儲存格，Shift 加方向鍵則向該方向延伸一格選取範圍，過程中不會意外失去焦點。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-014",
    "component": "grid",
    "name": "Grid 可用 Enter 或 F2 進入儲存格互動模式",
    "expectation": "儲存格含有可編輯內容或需要 Grid 導覽鍵的元件時，Enter 或 F2 將焦點移入編輯欄位或第一個元件並停用 Grid 導覽；再按 F2 會恢復 Grid 導覽。單行編輯欄位再按 Enter 時，會恢復 Grid 導覽或移到相鄰儲存格的輸入欄位。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-015",
    "component": "grid",
    "name": "Grid 可由輸入字元開始編輯儲存格",
    "expectation": "在可編輯儲存格中輸入英數字元時，焦點移至其輸入欄位並輸入該字元。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-016",
    "component": "grid",
    "name": "Grid 可用 Escape 回復逐格導覽",
    "expectation": "Grid 導覽因儲存格互動而停用時，按下 Escape 會恢復 Grid 導覽。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-017",
    "component": "grid",
    "name": "Grid 儲存格內的元件可由鍵盤操作",
    "expectation": "在儲存格互動模式中，若儲存格含多個元件，向右鍵或向下鍵移到下一個元件，向左鍵或向上鍵移到上一個元件，並可選擇循環；否則方向鍵交由目前元件處理。Tab 與 Shift+Tab 移到下一個及上一個元件，並可選擇在儲存格或 Grid 內循環。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-018",
    "component": "grid",
    "name": "Grid 容器具有 grid 角色語意",
    "expectation": "互動式 Grid 容器具有 role=grid；若以 HTML table 實作 Grid，仍須在 table 元素設定 role=grid。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA grid"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-019",
    "component": "grid",
    "name": "Grid 列具有正確角色與所屬關係",
    "expectation": "每一列具有 role=row，並位於 role=grid 或 role=rowgroup 的元素之內，或由其擁有。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA row",
      "ARIA rowgroup"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-020",
    "component": "grid",
    "name": "Grid 儲存格角色符合內容用途",
    "expectation": "Grid 儲存格屬於 role=row 的元素，並依用途正確使用 columnheader、rowheader 或 gridcell 角色語意。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA columnheader",
      "ARIA rowheader",
      "ARIA gridcell"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-021",
    "component": "grid",
    "name": "Grid 具有無障礙名稱",
    "expectation": "Grid 以 aria-labelledby 關聯可見標題；沒有可見標題時，以 aria-label 提供名稱。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-022",
    "component": "grid",
    "name": "Grid 具有無障礙補充說明，且由標題或補充說明提供",
    "expectation": "若 Grid 有標題或補充說明，aria-describedby 指向包含該內容的元素。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-describedby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-023",
    "component": "grid",
    "name": "可排序 Grid 正確呈現目前排序狀態",
    "expectation": "Grid 提供排序時，已排序標題上的 aria-sort 會表示目前的排序方向。",
    "criteria": [
      "APG Grid Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-sort"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-024",
    "component": "grid",
    "name": "Grid 正確呈現選取狀態",
    "expectation": "選取儲存格、列或欄時，已選取的儲存格或列具有 aria-selected=true；選取整欄時，該欄的每個儲存格都具有 aria-selected=true。",
    "criteria": [
      "APG Grid Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-selected"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-025",
    "component": "grid",
    "name": "Grid 正確省略或呈現唯讀狀態",
    "expectation": "沒有編輯功能的 Grid 不使用 aria-readonly；可編輯 Grid 若使用此屬性，只在禁止編輯的儲存格設為 true，全部唯讀時才可設在整個 Grid。",
    "criteria": [
      "APG Grid Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-readonly"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-026",
    "component": "grid",
    "name": "Grid 正確呈現虛擬化資料的完整維度與位置",
    "expectation": "Grid 只呈現部分列時，aria-rowcount 與 aria-rowindex 表示完整列數及位置；只呈現部分欄時，以 aria-colcount 與 aria-colindex 表示完整欄數及位置。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-rowcount",
      "ARIA aria-rowindex",
      "ARIA aria-colcount",
      "ARIA aria-colindex"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-027",
    "component": "grid",
    "name": "Grid 以正確的原生或 ARIA 語意呈現跨格儲存格",
    "expectation": "非 HTML table 型 Grid 使用 aria-rowspan 與 aria-colspan 表示跨格；具有 role=grid 的 HTML table 使用原生 rowspan 與 colspan，且不使用對應的 ARIA 跨格屬性。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-rowspan",
      "ARIA aria-colspan"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-028",
    "component": "grid",
    "name": "Grid 以 aria-owns 納入的列與儲存格維持閱讀順序",
    "expectation": "如果使用 aria-owns 把 row 或 cell 加進 Grid，要注意輔助科技的閱讀順序必須跟畫面上的順序一致。因為透過 aria-owns 加進來的元素，會排在 Grid 原本 DOM 子元素 的後面；如果這會造成順序錯誤，就需要把那些原本的 DOM 子元素也一起列入 aria-owns，用 aria-owns 的 ID 順序明確指定順序。",
    "criteria": [
      "APG Grid Pattern",
      "SC 1.3.2 Meaningful Sequence",
      "ARIA aria-owns"
    ],
    "topic": "閱讀順序",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-029",
    "component": "grid",
    "name": "Grid 以 aria-owns 納入的列與儲存格維持焦點順序",
    "expectation": "若 Grid 以 aria-owns 納入外部 row 或 cell 的元素，使用鍵盤導覽並程式控制的焦點順序與畫面順序一致。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.4.3 Focus Order",
      "ARIA aria-owns"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-030",
    "component": "grid",
    "name": "Grid 導覽直接聚焦不使用方向鍵的單一元件",
    "expectation": "Grid 儲存格只有一個不以方向鍵操作的可聚焦元件（如連結或按鈕）時，使用方向鍵進入該格會直接聚焦該元件。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-GRID-031",
    "component": "grid",
    "name": "Grid 導覽聚焦僅含文字或單一圖像的儲存格",
    "expectation": "Grid 儲存格僅含文字或單一圖像時，gridcell 本身可取得焦點。",
    "criteria": [
      "APG Grid Pattern",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  },
  {
    "id": "APG-LBX-001",
    "component": "listbox",
    "name": "單選 Listbox 獲得焦點時，應聚焦已選取的選項；若無選取則聚焦第一個",
    "expectation": "當單選 Listbox 獲得焦點時，焦點移至第一個已選取的選項，若無已選取項目則移至第一個選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-002",
    "component": "listbox",
    "name": "多選 Listbox 獲得焦點時不應自動改變現有的選取狀態",
    "expectation": "當多選 Listbox 獲得焦點時，焦點移至第一個已選取的選項，若無已選取項目則移至第一個選項，且不自動改變選取狀態。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-003",
    "component": "listbox",
    "name": "Listbox 支援向下鍵和向上鍵移動選項",
    "expectation": "按下方向鍵將焦點移至下一個選項，按上方向鍵移至上一個選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-004",
    "component": "listbox",
    "name": "Listbox 支援 Home 鍵和 End 鍵移至第一個或最後一個選項",
    "expectation": "Home 鍵將焦點移至第一個選項，End 鍵將焦點移至最後一個選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-005",
    "component": "listbox",
    "name": "單選 Listbox 採焦點即選取模式時，移動焦點即同步選取",
    "expectation": "若單選 Listbox 採用「選取跟隨焦點」模式，使用方向鍵、Home 或 End 移動焦點時，會自動取消前一個選取項目並選取焦點所在的新選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-006",
    "component": "listbox",
    "name": "Listbox 支援輸入字元快速跳至對應選項",
    "expectation": "快速輸入一個或多個字元時，焦點會跳至下一個名稱以輸入字串開頭的選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-007",
    "component": "listbox",
    "name": "多選 Listbox 可用 Space 鍵切換焦點項目的選取狀態",
    "expectation": "在 APG 無修飾鍵的多選模式中，按 Space 鍵可切換焦點選項的選取狀態，且不清除其他已選取的項目。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-008",
    "component": "listbox",
    "name": "Shift+方向鍵的行為須符合所採用的多選模式",
    "expectation": "無論有無搭配修飾鍵，在多選模式中，Shift + 上下方向鍵，則移動焦點並切換相鄰選項的選取狀態。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-009",
    "component": "listbox",
    "name": "多選 Listbox 支援以 Shift + Space 鍵等快捷鍵選取連續範圍",
    "expectation": "Shift + Space 鍵選取從錨點到目前焦點的連續範圍；Control + Shift + Home 或 Control + Shift + End 分別選取到第一個或最後一個選項的連續範圍。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-010",
    "component": "listbox",
    "name": "多選 Listbox 支援 Control+A 選取所有選項",
    "expectation": "按 Control + A 可全選所有選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-011",
    "component": "listbox",
    "name": "修飾鍵多選模式中，無修飾鍵的導覽操作只保留當前焦點項目的選取",
    "expectation": "若使用修飾鍵多選模式，在未按 Shift 或 Control 的情況下移動焦點，會取消所有其他選取項目，只保留焦點所在的選項為選取狀態。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-012",
    "component": "listbox",
    "name": "修飾鍵多選模式中，Control+方向鍵可移動焦點但不改變選取",
    "expectation": "若使用修飾鍵多選模式，Control + 下方向鍵與 Control + 上方向鍵只移動焦點，不改變選取狀態。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-013",
    "component": "listbox",
    "name": "修飾鍵多選模式中，Control+空白鍵可切換焦點項目的選取狀態",
    "expectation": "若使用修飾鍵多選模式，Control + Space 鍵只切換焦點選項的選取狀態，不影響其他選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-014",
    "component": "listbox",
    "name": "Listbox 以 aria-activedescendant 標示目前作用中的選項",
    "expectation": "若鍵盤焦點焦點停留在 Listbox ，aria-activedescendant 須指向視覺上作用中的選項，並在作用選項改變時即時更新。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-activedescendant"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-015",
    "component": "listbox",
    "name": "Listbox 的容器元素須具備 listbox 的角色語意",
    "expectation": "包含或擁有所有選項的元素須具備 role=listbox。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA listbox"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-016",
    "component": "listbox",
    "name": "Listbox 的每個選項須具備 option 角色語意並正確隸屬於 Listbox",
    "expectation": "選項具有 role=option，並位於 role=listbox 或其內部 role=group。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA option",
      "ARIA group"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-017",
    "component": "listbox",
    "name": "Listbox 內的選項群組至少須包含一個選項",
    "expectation": "若 Listbox 使用 role=group，每個群組至少包含一個 role=option。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA group",
      "ARIA option"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-018",
    "component": "listbox",
    "name": "Listbox 內的選項群組須具備無障礙名稱",
    "expectation": "Listbox 中的每個 group 須透過 aria-label 或 aria-labelledby 提供無障礙名稱。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA group",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-019",
    "component": "listbox",
    "name": "獨立的 Listbox 須具備無障礙名稱",
    "expectation": "不屬於其他元件的獨立 Listbox，須透過 aria-labelledby 或 aria-label 提供無障礙名稱。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-020",
    "component": "listbox",
    "name": "多選 Listbox 須設定 aria-multiselectable=true",
    "expectation": "支援多選的 Listbox 須設定 aria-multiselectable=true；單選 Listbox 則設為 false 或省略此屬性。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-multiselectable"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-021",
    "component": "listbox",
    "name": "Listbox 的選項須以一致的方式標示選取狀態",
    "expectation": "可選取的選項須一致使用 aria-selected 或 aria-checked 其中一種，選取時設為 true，未選取時設為 false。只有在兩者語意不同、介面清楚呈現各自意義，且各有獨立控制方法的極少數情況下，才同時使用兩種狀態。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-selected",
      "ARIA aria-checked"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-022",
    "component": "listbox",
    "name": "虛擬化 Listbox 正確提供選項位置與總數",
    "expectation": "當 Listbox 並非將所有選項都渲染至 DOM 時，已渲染的選項須提供正確的 aria-posinset 與 aria-setsize 值。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-posinset",
      "ARIA aria-setsize"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-023",
    "component": "listbox",
    "name": "水平排列的 Listbox 須標記水平方向語意",
    "expectation": "水平排列的 Listbox 須設定 aria-orientation=horizontal。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-orientation"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-024",
    "component": "listbox",
    "name": "Listbox 外部選項須維持正確的輔助技術閱讀順序",
    "expectation": "當 aria-owns 包含 DOM 子樹以外的選項時，輔助科技的閱讀順序須與視覺顯示順序一致。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.2 Meaningful Sequence",
      "ARIA aria-owns"
    ],
    "topic": "閱讀順序",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-025",
    "component": "listbox",
    "name": "Listbox 的外部選項須維持正確的鍵盤焦點順序",
    "expectation": "當 aria-owns 包含 DOM 子樹以外的選項時，透過程式控制的鍵盤焦點順序須與視覺顯示順序一致。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.4.3 Focus Order",
      "ARIA aria-owns"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-026",
    "component": "listbox",
    "name": "Listbox 的選項內不應包含需獨立操作的互動元件",
    "expectation": "選項內不應包含連結、按鈕或 Checkbox 等可獨立互動的元素。若項目需要包含可互動的子元素，應改用 Grid Pattern 而非 Listbox Pattern。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-027",
    "component": "listbox",
    "name": "Listbox 的選項名稱應精簡且便於區分",
    "expectation": "選項名稱應避免過長或不必要的重複前綴，讓螢幕閱讀器與鍵盤使用者能有效率地區分與導覽各選項。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.4.6 Headings and Labels"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LBX-028",
    "component": "listbox",
    "name": "水平排列的 Listbox 使用向左和向右鍵進行導覽",
    "expectation": "在水平 Listbox 中，右方向鍵的功能等同垂直 Listbox 的下方向鍵，左方向鍵的功能等同垂直 Listbox 的上方向鍵。",
    "criteria": [
      "APG Listbox Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/listbox/"
  },
  {
    "id": "APG-LINK-001",
    "component": "link",
    "name": "Link 具有連結角色語意",
    "expectation": "包含連結文字或圖像的元素須為原生連結，或設定 role=link。",
    "criteria": [
      "APG Link Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA link"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/link/"
  },
  {
    "id": "APG-LINK-002",
    "component": "link",
    "name": "按 Enter 鍵啟動 Link 並跳至目標位置",
    "expectation": "當連結獲得焦點時，按 Enter 鍵可執行該連結，並將焦點或頁面導向連結目標。",
    "criteria": [
      "APG Link Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.4 Link Purpose",
      "ARIA link"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/link/"
  },
  {
    "id": "APG-LINK-003",
    "component": "link",
    "name": "自訂 Link 須重現原生連結行為",
    "expectation": "優先使用原生 HTML 連結；若在其他元素上使用 role=link，開發者須提供標準連結行為，例如用鍵盤導向目標及支援適用的右鍵選單操作。",
    "criteria": [
      "APG Link Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value",
      "ARIA link"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/link/"
  },
  {
    "id": "APG-LINK-004",
    "component": "link",
    "name": "Link 的快捷選單支援 Shift + F10",
    "expectation": "若連結提供快捷選單，按 Shift + F10 應能開啟該選單。",
    "criteria": [
      "APG Link Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/link/"
  },
  {
    "id": "APG-LMK-001",
    "component": "landmark-regions",
    "name": "頁面主要區塊使用地標",
    "expectation": "頁面中主要可感知的區塊，須使用適當的 HTML 區段元素或 ARIA 地標角色加以標示。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-002",
    "component": "landmark-regions",
    "name": "所有可感知內容都包含在地標中",
    "expectation": "頁面上所有可感知的內容都須包含在適當的地標區域內，以確保重要資訊不被輔助科技遺漏。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "SC 2.4.1 Bypass Blocks"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-003",
    "component": "landmark-regions",
    "name": "地標角色符合區塊用途",
    "expectation": "每個地標的角色語意須與其所包含內容的用途相符。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-004",
    "component": "landmark-regions",
    "name": "頁面避免過多地標",
    "expectation": "地標的數量應以實用為原則，不宜過多。一般建議一個頁面有七個以下的地標，除非有充分理由增加更多。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 2.4.1 Bypass Blocks"
    ],
    "topic": "導覽機制",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-005",
    "component": "landmark-regions",
    "name": "重複出現的地標角色須有可區別的名稱",
    "expectation": "當同一地標角色出現超過一次時，除非各實例的內容與用途完全相同，否則每個實例須有唯一的無障礙標籤。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "SC 2.4.6 Headings and Labels"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-006",
    "component": "landmark-regions",
    "name": "地標的無障礙名稱有意義且不重複角色名稱",
    "expectation": "地標的標籤應透過 aria-labelledby 參照可見標題，或在必要時使用 aria-label 提供，且標籤內容不應重複地標的角色名稱。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 2.4.6 Headings and Labels",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-007",
    "component": "landmark-regions",
    "name": "主要地標位於最高層級且數量適當",
    "expectation": "每個頁面應有一個最高層級的主要地標用於主要內容；每個巢狀的文件或應用程式情境可以擁有自己的主要地標。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA main"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-008",
    "component": "landmark-regions",
    "name": "多個主要地標須有可區分的無障礙名稱",
    "expectation": "若同一文件或應用程式情境中有多個主要地標，每個須有唯一的無障礙名稱。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA main",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-009",
    "component": "landmark-regions",
    "name": "橫幅地標位於最高層級且數量適當",
    "expectation": "一個頁面最多只能有一個最高層級的橫幅地標；每個巢狀的文件或應用程式情境可以擁有自己的橫幅地標。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA banner"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-010",
    "component": "landmark-regions",
    "name": "多個橫幅地標須有可區分的無障礙名稱",
    "expectation": "若同一文件或應用程式情境中有多個橫幅地標，每個須有唯一的無障礙名稱。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA banner",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-011",
    "component": "landmark-regions",
    "name": "資訊地標位於最高層級且數量適當",
    "expectation": "一個頁面最多只能有一個最高層級的資訊地標；每個巢狀的文件或應用程式情境可以擁有自己的資訊地標。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA contentinfo"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-012",
    "component": "landmark-regions",
    "name": "多個資訊地標須有可區分的無障礙名稱",
    "expectation": "若同一文件或應用程式情境中有多個資訊地標，每個須有唯一的無障礙名稱。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA contentinfo",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-013",
    "component": "landmark-regions",
    "name": "補充地標包含相關輔助內容",
    "expectation": "補充地標是與主要內容相關的頂層輔助區塊，即使與主要內容分開也能獨立理解；不相關的內容應改用更通用的角色。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA complementary"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-014",
    "component": "landmark-regions",
    "name": "表單地標具有識別用途的無障礙名稱",
    "expectation": "表單地標須有無障礙名稱來說明其用途，優先使用可見標題提供。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 2.4.6 Headings and Labels",
      "ARIA form",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-015",
    "component": "landmark-regions",
    "name": "表單地標用於正確的範圍與用途",
    "expectation": "表單地標代表整個表單而非個別欄位；若表單的用途是搜尋，應改用搜尋地標。",
    "criteria": [
      "APG Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA form",
      "ARIA search"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-016",
    "component": "landmark-regions",
    "name": "導覽地標標籤保持一致",
    "expectation": "多個導覽地標各須有唯一標籤，但包含相同連結集合的導覽地標則使用相同名稱。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA navigation"
    ],
    "topic": "一致的識別、導覽與行為",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-017",
    "component": "landmark-regions",
    "name": "區域地標具有無障礙名稱",
    "expectation": "區域地標用於標示其他具名地標未涵蓋但足夠重要的內容，且必須提供無障礙名稱。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "SC 2.4.6 Headings and Labels",
      "ARIA region"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-018",
    "component": "landmark-regions",
    "name": "搜尋功能使用搜尋地標",
    "expectation": "提供搜尋功能的一組控制元件，應使用搜尋地標標示，而非表單地標。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA search"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-019",
    "component": "landmark-regions",
    "name": "頁面層級的 Header 與 Footer 揭露頁面地標",
    "expectation": "用於頁面層級內容的 header 或 footer 元素須位於 body 情境中，並正確揭露預期的橫幅或資訊地標。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "ARIA banner",
      "ARIA contentinfo"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-020",
    "component": "landmark-regions",
    "name": "用於建立區域地標的 Section 具有無障礙名稱",
    "expectation": "若 section 用於建立區域地標，它須提供有意義的無障礙名稱，並在 accessibility tree 中以 region 角色呈現。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships",
      "SC 2.4.6 Headings and Labels",
      "ARIA region",
      "ARIA aria-label",
      "ARIA aria-labelledby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-LMK-021",
    "component": "landmark-regions",
    "name": "對話框內容不重複包在地標中",
    "expectation": "對話框的內容不須重複包在地標區域中，因為對話框本身在開啟時已提供具名的容器與邊界。",
    "criteria": [
      "APG Landmark Regions Practice",
      "Landmark Regions Practice",
      "SC 1.3.1 Info and Relationships"
    ],
    "topic": "頁面結構",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/practices/landmark-regions/"
  },
  {
    "id": "APG-RAD-001",
    "component": "radio",
    "name": "Radio Group 可用 Tab 移入移出並設定正確起始焦點",
    "expectation": "在工具列以外的情況，Tab 與 Shift + Tab 可將焦點移入或移出單選群組。進入時，焦點落在已勾選的單選按鈕上；若無已勾選項目，則落在第一個單選按鈕上。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-002",
    "component": "radio",
    "name": "單選按鈕可用 Space 鍵選取焦點項目",
    "expectation": "在工具列以外的情況，若焦點所在的單選按鈕尚未勾選，按 Space 鍵可勾選它，同時取消同群組中原本已勾選的項目。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-003",
    "component": "radio",
    "name": "單選群組以方向鍵移動並更新選取項目",
    "expectation": "在工具列以外的情況，右方向鍵或下方向鍵移至並勾選下一個單選按鈕，左方向鍵或上方向鍵移至並勾選前一個，且導覽到群組邊界時會循環至另一端。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-004",
    "component": "radio",
    "name": "工具列內的單選按鈕以方向鍵移動時不改變選取",
    "expectation": "在工具列中的情況，水平方向鍵導覽可在單選按鈕與其他工具列項目間移動，但不改變已勾選的單選按鈕。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-005",
    "component": "radio",
    "name": "工具列內的單選按鈕可用 Space 鍵選取",
    "expectation": "在工具列中的情況，按 Space 鍵可勾選目前焦點所在的單選按鈕，並取消之前已選取的項目。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-006",
    "component": "radio",
    "name": "工具列內的單選按鈕可用 Enter 鍵選取",
    "expectation": "在工具列中的情況，按 Enter 鍵可選取目前焦點所在的單選按鈕，並取消之前已選取的項目。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-007",
    "component": "radio",
    "name": "工具列內的單選按鈕支援向上鍵與向下鍵導覽",
    "expectation": "在工具列中的情況，下方向鍵移至下一個單選按鈕，上方向鍵移至前一個；焦點在群組內循環，且不改變選取狀態。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-008",
    "component": "radio",
    "name": "單選按鈕位於 role=radiogroup 內",
    "expectation": "所有單選按鈕須位於 role=radiogroup 內。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA radiogroup"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-009",
    "component": "radio",
    "name": "每個單選按鈕具有 radio 角色語意",
    "expectation": "每個單選按鈕須具有 role=radio 或等效的原生 radio 角色語意。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA radio"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-010",
    "component": "radio",
    "name": "單選按鈕正確呈現選取狀態",
    "expectation": "已勾選的單選按鈕須為 aria-checked=true，每個未勾選的單選按鈕須為 aria-checked=false。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-checked"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-011",
    "component": "radio",
    "name": "每個單選按鈕具有無障礙名稱",
    "expectation": "每個單選按鈕能由文字內容、aria-labelledby 或 aria-label 提供無障礙名稱。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-012",
    "component": "radio",
    "name": "單選群組具有無障礙名稱",
    "expectation": "單選群組須透過 aria-labelledby 或 aria-label 提供無障礙名稱。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-RAD-013",
    "component": "radio",
    "name": "單選按鈕群組或個別單選按鈕具有無障礙補充說明",
    "expectation": "若單選群組或個別單選按鈕有補充說明，相關元素的 aria-describedby 須指向包含該說明的元素。",
    "criteria": [
      "APG Radio Group Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-describedby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/radio/"
  },
  {
    "id": "APG-SWT-001",
    "component": "switch",
    "name": "開關可用 Space 切換狀態",
    "expectation": "當焦點位於開關時，按 Space 會切換其狀態。",
    "criteria": [
      "APG Switch Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-002",
    "component": "switch",
    "name": "開關可用 Enter 切換狀態",
    "expectation": "當焦點位於開關時，按 Enter 會切換其狀態。",
    "criteria": [
      "APG Switch Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-003",
    "component": "switch",
    "name": "開關切換狀態時標籤保持不變",
    "expectation": "Switch 在開啟與關閉狀態之間切換時，其標籤不會改變。",
    "criteria": [
      "APG Switch Pattern",
      "SC 3.2.4 Consistent Identification",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "一致的識別、導覽與行為",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-004",
    "component": "switch",
    "name": "開關在 accessibility tree 中呈現 switch 角色",
    "expectation": "Switch 元素在 accessibility tree 中的計算角色為 switch；若以 HTML input[type=checkbox] 實作 Switch，也會呈現 role=switch。",
    "criteria": [
      "APG Switch Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA switch"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-005",
    "component": "switch",
    "name": "開關具有無障礙名稱",
    "expectation": "開關的無障礙名稱來自其文字內容、aria-labelledby 或 aria-label。",
    "criteria": [
      "APG Switch Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-006",
    "component": "switch",
    "name": "開關正確呈現開啟與關閉狀態",
    "expectation": "開啟的 Switch 呈現 aria-checked=true，關閉的 Switch 呈現 aria-checked=false；若以 checkbox 輸入元件實作 Switch，則以其 checked 狀態表示。",
    "criteria": [
      "APG Switch Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-checked"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-007",
    "component": "switch",
    "name": "開關群組具有無障礙名稱",
    "expectation": "若多個開關構成同一群組，使用有名稱的 role=group，或使用 fieldset 與 legend 標示群組。",
    "criteria": [
      "APG Switch Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA group",
      "ARIA aria-labelledby"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-SWT-008",
    "component": "switch",
    "name": "開關或開關群組具有無障礙補充說明",
    "expectation": "若開關或開關群組有補充說明，對應元素的 aria-describedby 指向包含該補充說明的元素。",
    "criteria": [
      "APG Switch Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-describedby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/switch/"
  },
  {
    "id": "APG-TAB-001",
    "component": "tabs",
    "name": "Tab 容器須具備頁籤列的功能識別",
    "expectation": "包含所有 Tab 的容器須設定 role=tablist。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tablist"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-002",
    "component": "tabs",
    "name": "Tablist 須具備無障礙名稱",
    "expectation": "當有可見標籤時，Tablist 須透過 aria-labelledby 提供無障礙名稱；否則使用 aria-label 提供無障礙名稱。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-003",
    "component": "tabs",
    "name": "每個 Tab 須位於 Tablist 內且具備 Tab 的角色語意",
    "expectation": "每個 Tab 元素須設定 role=tab，且須包含在 role=tablist 中。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tab",
      "ARIA tablist"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-004",
    "component": "tabs",
    "name": "每個 Tab 對應的內容區域須具備 tabpanle 的角色語意",
    "expectation": "與 Tab 關聯的每個內容面板須設定 role=tabpanel。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tabpanel"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-005",
    "component": "tabs",
    "name": "Tab 的 aria-controls 須指向其對應的內容面板",
    "expectation": "每個 Tab 須透過 aria-controls 參照其關聯的 tabpanel。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-controls"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-006",
    "component": "tabs",
    "name": "目前啟用的 Tab aria-selected 狀態須正確設定",
    "expectation": "作用中的 Tab 須設定 aria-selected=true，其餘所有 Tab 須設定 aria-selected=false。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-selected"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-007",
    "component": "tabs",
    "name": "切換 Tab 時須顯示對應面板並隱藏前一個面板",
    "expectation": "Tab 初始化時，只顯示作用中 Tab 的 Panel。當另一個 Tab 被啟動時，其關聯的 Tabpanel 變為可見，之前顯示的 Tabpanel 則被隱藏。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "動態內容",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-008",
    "component": "tabs",
    "name": "Tabpanel 的無障礙名稱須由對應的 Tab 提供",
    "expectation": "每個 Tabpanel 須透過 aria-labelledby 參照其關聯的 Tab 。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-009",
    "component": "tabs",
    "name": "鍵盤焦點進入 Tablist 時應聚焦於目前啟用的 Tab",
    "expectation": "當焦點以 Tab 鍵移入 Tablist 時，焦點落在目前作用中的 Tab 上。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-010",
    "component": "tabs",
    "name": "Tab 鍵離開 Tablist 時應移至對應的內容面板",
    "expectation": "當 Tablist 有焦點時，再按 Tab 鍵移至關聯的 Tabpanel；若 Tabpanel 的第一個有意義的內容可獲得焦點，則焦點移至該元素。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-011",
    "component": "tabs",
    "name": "水平 Tab 列支援向左鍵與向右鍵循環切換焦點",
    "expectation": "在水平 Tablist 中，左方向鍵移至前一個 Tab，右方向鍵移至下一個 Tab，且導覽到兩端時會循環。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-012",
    "component": "tabs",
    "name": "垂直 Tab 支援向上鍵與向下鍵循環切換焦點",
    "expectation": "在設有 aria-orientation=vertical 的 Tablist 中，下方向鍵的功能等同水平 Tablist 的右方向鍵，上方向鍵等同左方向鍵。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "ARIA aria-orientation"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-013",
    "component": "tabs",
    "name": "手動模式的 Tab 可用 Enter 鍵或 Space 鍵啟用",
    "expectation": "若 Tab 不在獲得焦點時自動啟動，則按 Enter 或 Space 可啟動焦點所在的 Tab 並顯示其 Panel。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 4.1.2 Name, Role, Value"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-014",
    "component": "tabs",
    "name": "Home 鍵與 End 鍵可分別移至第一個與最後一個頁籤",
    "expectation": "Home 鍵將焦點移至第一個 Tab，End 鍵將焦點移至最後一個 Tab。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-015",
    "component": "tabs",
    "name": "內容無可聚焦元素的 Tabpanel 仍可納入頁面 Tab 鍵順序",
    "expectation": "若 Tabpanel 沒有可聚焦的元素，且其第一個有意義的內容也不可聚焦，則 Tabpanel 須設定 tabindex=0。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order",
      "ARIA tabindex"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-016",
    "component": "tabs",
    "name": "水平 Tablist 不攔截向上鍵與向下鍵，以保留捲動功能",
    "expectation": "焦點位於水平 Tablist 時，按向上鍵與向下鍵應維持瀏覽器原有的頁面捲動功能，不可被 Tab 元件攔截。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.1.2 No Keyboard Trap"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-017",
    "component": "tabs",
    "name": "Shift+F10 可開啟 Tab 的關聯快顯選單",
    "expectation": "若 Tab 有關聯的彈出選單，按 Shift + F10 應能開啟該選單。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-018",
    "component": "tabs",
    "name": "具有快顯選單的 Tab 須標記 aria-haspopup",
    "expectation": "若 Tab 有關聯的彈出選單，須將 aria-haspopup 設定為 menu 或 true。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-haspopup"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-019",
    "component": "tabs",
    "name": "可刪除的 Tab 後焦點應移至合理的相鄰位置",
    "expectation": "按 Delete 鍵關閉目前 Tab 及其 Panel，並將焦點移至相鄰的 Tab；若刪除的是最後一個 Tab，則焦點移至工作流程中合理的元素。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-020",
    "component": "tabs",
    "name": "若不支援 Delete 鍵刪除，可透過右鍵選單執行刪除 Tab",
    "expectation": "若支援刪除 Tab 但不使用 Delete 鍵，刪除功能須可透過 Tab 的快捷選單執行。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-021",
    "component": "tabs",
    "name": "自動啟用模式的 Tab 切換不應有明顯延遲",
    "expectation": "若 Tab 在獲得焦點時自動啟動，其關聯 Panel 須立即顯示，無明顯延遲；否則應改用手動啟動模式。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": false,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TAB-022",
    "component": "tabs",
    "name": "垂直 Tablist 須標記垂直方向屬性",
    "expectation": "視覺上垂直排列的 Tablist 須設定 aria-orientation=vertical；水平 Tablist 預設為水平方向，除非另行明確設定。",
    "criteria": [
      "APG Tabs Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-orientation"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tabs/"
  },
  {
    "id": "APG-TBL-001",
    "component": "table",
    "name": "表格維持靜態表格結構",
    "expectation": "表格不實作為互動式複合元件；其儲存格不會只為了表格導覽而設為可聚焦或可選取。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-002",
    "component": "table",
    "name": "靜態表格內的互動元件維持個別 Tab 停駐點",
    "expectation": "靜態表格內的每個互動元件都是頁面 Tab 順序中的獨立停駐點；若因此造成過長且不實用的 Tab 順序，則改用互動式 Grid Pattern。",
    "criteria": [
      "APG Table Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-003",
    "component": "table",
    "name": "表格容器具有 table 角色語意",
    "expectation": "表格容器具有 role=table 或原生 HTML table 語意。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA table"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-004",
    "component": "table",
    "name": "表格列具有正確角色與所屬關係",
    "expectation": "每一列具有 role=row，並位於 role=table 或 role=rowgroup 的元素之內，或由其擁有。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA row",
      "ARIA rowgroup"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-005",
    "component": "table",
    "name": "表格儲存格角色符合內容用途",
    "expectation": "儲存格屬於 role=row 的元素，並依用途正確使用 columnheader、rowheader 或 cell 角色語意。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA columnheader",
      "ARIA rowheader",
      "ARIA cell"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-006",
    "component": "table",
    "name": "表格具有無障礙名稱",
    "expectation": "表格以 aria-labelledby 關聯可見標題；沒有可見標題時，以 aria-label 提供名稱。",
    "criteria": [
      "APG Table Pattern",
      "SC 2.4.6 Headings and Labels",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-labelledby",
      "ARIA aria-label"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-007",
    "component": "table",
    "name": "表格具有無障礙補充說明，且由標題或補充說明提供",
    "expectation": "若表格有標題或補充說明，aria-describedby 指向包含該內容的元素。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-describedby"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-008",
    "component": "table",
    "name": "可排序表格正確呈現目前排序狀態",
    "expectation": "列或欄可排序時，已排序標題儲存格上的 aria-sort 會表示目前的排序方向。",
    "criteria": [
      "APG Table Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA aria-sort"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-009",
    "component": "table",
    "name": "表格依未完整呈現的維度提供總數",
    "expectation": "若部分列未出現在 DOM，使用 aria-rowcount 表示完整列數；若部分欄未出現，使用 aria-colcount 表示完整欄數，只需設定實際受影響的維度。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-rowcount",
      "ARIA aria-colcount"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-010",
    "component": "table",
    "name": "表格依未完整呈現的維度提供位置",
    "expectation": "若部分列未出現在 DOM，aria-rowindex 表示每個已呈現列在完整表格中的位置；若部分欄未出現，aria-colindex 表示每個已呈現欄的位置。只需設定受影響的維度。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-rowindex",
      "ARIA aria-colindex"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-011",
    "component": "table",
    "name": "表格正確呈現跨列與跨欄儲存格",
    "expectation": "當無法使用原生跨格語意時，跨越多列或多欄的儲存格會提供正確的 aria-rowspan 與 aria-colspan 值。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.1 Info and Relationships",
      "ARIA aria-rowspan",
      "ARIA aria-colspan"
    ],
    "topic": "頁面結構",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TBL-012",
    "component": "table",
    "name": "表格以 aria-owns 納入的列與儲存格維持正確閱讀順序",
    "expectation": "若以 aria-owns 納入列或儲存格，其輔助科技閱讀順序應符合預期的畫面順序；並應考量被擁有的元素會排在 DOM 子元素之後，除非這些子元素也包含在 aria-owns 中。",
    "criteria": [
      "APG Table Pattern",
      "SC 1.3.2 Meaningful Sequence",
      "ARIA aria-owns"
    ],
    "topic": "閱讀順序",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  },
  {
    "id": "APG-TIP-001",
    "component": "tooltip",
    "name": "工具提示可由鍵盤焦點觸發",
    "expectation": "工具提示觸發元素取得鍵盤焦點後，提示內容通常會在短暫延遲後出現。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 1.4.13 Content on Hover or Focus",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-002",
    "component": "tooltip",
    "name": "工具提示可由指標懸浮觸發",
    "expectation": "當指標懸停在觸發元素上時，工具提示會顯示，通常會有短暫延遲。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 1.4.13 Content on Hover or Focus"
    ],
    "topic": "指標與觸控操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-003",
    "component": "tooltip",
    "name": "按下 Escape 鍵可關閉工具提示",
    "expectation": "按 Escape 鍵可關閉工具提示。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 1.4.13 Content on Hover or Focus",
      "SC 2.1.1 Keyboard"
    ],
    "topic": "鍵盤操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-004",
    "component": "tooltip",
    "name": "工具提示不應接收鍵盤焦點",
    "expectation": "工具提示顯示時，鍵盤焦點應保持在觸發元素上；若內容需要接收焦點，應改用對話框。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 2.1.1 Keyboard",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-005",
    "component": "tooltip",
    "name": "由鍵盤焦點觸發的工具提示應在焦點離開時關閉",
    "expectation": "由觸發元素獲得焦點而開啟的工具提示，在該元素失去焦點時關閉。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 1.4.13 Content on Hover or Focus",
      "SC 2.4.3 Focus Order"
    ],
    "topic": "焦點管理",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-006",
    "component": "tooltip",
    "name": "由滑鼠懸停觸發的工具提示在指標停留期間應保持顯示",
    "expectation": "由指標懸停觸發的工具提示，在指標停留在觸發元素或工具提示本身上時須持續顯示。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 1.4.13 Content on Hover or Focus"
    ],
    "topic": "指標與觸控操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-007",
    "component": "tooltip",
    "name": "由滑鼠懸停觸發的工具提示應在指標離開後關閉",
    "expectation": "由指標懸停觸發的工具提示，在指標離開觸發元素與工具提示後須關閉。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 1.4.13 Content on Hover or Focus"
    ],
    "topic": "指標與觸控操作",
    "required": true,
    "difficulty": 1,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-008",
    "component": "tooltip",
    "name": "工具提示容器須具有 tooltip 角色語意",
    "expectation": "工具提示的容器元素須設定 role=tooltip。",
    "criteria": [
      "APG Tooltip Pattern",
      "SC 4.1.2 Name, Role, Value",
      "ARIA tooltip"
    ],
    "topic": "元件語意",
    "required": true,
    "difficulty": 3,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  },
  {
    "id": "APG-TIP-009",
    "component": "tooltip",
    "name": "工具提示的觸發元素須以工具提示元素作為無障礙補充描述",
    "expectation": "工具提示的觸發元素須透過 aria-describedby 參照提供補充說明的工具提示元素。",
    "criteria": [],
    "topic": "元件語意",
    "required": true,
    "difficulty": 2,
    "source": "https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
  }
]

/** 某個元件的全部規則。 */
export function rulesFor(component: string): ApgRule[] {
  return APG_RULES.filter((r) => r.component === component)
}

/**
 * 某個元件中「必須實作到 demo 上」的規則 —— 知識難度為 2 的那些。
 * 這是決定元件頁交付範圍的依據。
 */
export function mustDemo(component: string): ApgRule[] {
  return rulesFor(component).filter((r) => r.difficulty === 2)
}
