// Generated from the existing component teaching pages. Run npm run generate:catalog.
import type { CatalogEntry } from "./component-catalog"

export const componentCatalog: CatalogEntry[] = [
  {
    "slug": "accordion",
    "name": "Accordion",
    "summary": "一組可展開收合的標題與面板，可限制同時只開啟一個。",
    "source": "apg",
    "sourcePath": "app/(component)/accordion/page.tsx",
    "roles": [
      "button",
      "heading",
      "region"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "button",
        "purpose": "標題列必須是按鈕。用原生 <button> 即隱含此角色，不需另外書寫。"
      },
      {
        "attr": "aria-expanded",
        "value": "true / false",
        "purpose": "反映對應面板此刻是否可見，是這個元件最核心的狀態。"
      },
      {
        "attr": "aria-controls",
        "value": "面板元素的 id",
        "purpose": "把按鈕與它控制的面板關聯起來。"
      },
      {
        "attr": "aria-disabled",
        "value": "true",
        "purpose": "已展開且不允許收合時標上。與原生 disabled 不同：元素仍可聚焦，行為要自己擋。"
      },
      {
        "attr": "role",
        "value": "region",
        "purpose": "面板作為地標，讓使用者能直接跳過去。面板超過約六個時應停用，否則地標清單會被灌爆。"
      },
      {
        "attr": "aria-labelledby",
        "value": "標題按鈕的 id",
        "purpose": "面板用 role=region 時，以它的標題按鈕作為無障礙名稱。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "箭頭圖示是純視覺，狀態已由 aria-expanded 表達，不應重複進入無障礙樹。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "標題按鈕包在 heading 內且層級符合頁面資訊架構；heading 內只能有那顆按鈕，其他持續顯示的元素要放到外面。面板以 aria-labelledby 與自己的標題關聯。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "Enter 與空白鍵即可展開收合，不需要滑鼠。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "所有標題按鈕都納入頁面的 Tab 順序，順序與視覺順序一致。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "每個標題按鈕都有橘色 focus ring。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "標題列具備 button 角色，aria-expanded 隨面板可見狀態更新，aria-controls 指向被控制的面板。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-ACC-001",
        "name": "Accordion 標題列可用 Enter 鍵或 Space 鍵切換展開與收合",
        "expectation": "當鍵盤焦點位於 Accordion 的標題列時，按下 Enter 或空白鍵可展開已收合的面板；若支援收合功能，再按一次可收合已展開的面板。若頁面只允許同時展開一個面板，展開新面板時會自動收合原本展開的面板。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-ACC-002",
        "name": "Accordion 的可聚焦元素依循頁面的 Tab 鍵順序",
        "expectation": "Tab 鍵與 Shift+Tab 鍵可分別移至下一個與上一個可聚焦元素； Accordion 中所有可聚焦元素皆須納入頁面的 Tab 鍵順序。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-ACC-003",
        "name": "Accordion 標題列具有 button 角色語意",
        "expectation": "每個 Accordion 的標題控制元件須具備 role=button 。",
        "topic": "元件語意"
      },
      {
        "id": "APG-ACC-004",
        "name": "Accordion 的標題標籤內只能包含其標題按鈕",
        "expectation": "Accordion 的標題按鈕是其 heading 標籤內唯一的元素；其他視覺上持續顯示的元素須置於 heading 標籤外部。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-ACC-005",
        "name": "Accordion 標題列使用適當的標題層級",
        "expectation": "每個 Accordion 的標題按鈕須包含在 heading 標籤內，且標題層級須符合頁面的資訊架構。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-ACC-006",
        "name": "Accordion 的 aria-expanded 須正確反映內容區塊的展開狀態",
        "expectation": "每個 Accordion 的標題按鈕在對應內容區塊可見時，aria-expanded 須為 true；內容區塊不可見時則須為 false。",
        "topic": "元件語意"
      },
      {
        "id": "APG-ACC-008",
        "name": "已展開且不可收合的 Accordion 標題列須標記 aria-disabled",
        "expectation": "若已展開的內容區塊不允許收合，其標題按鈕須設定 aria-disabled=true。",
        "topic": "元件語意"
      },
      {
        "id": "APG-ACC-009",
        "name": "Accordion 的內容區域 （region）須以對應的標題按鈕作為無障礙名稱",
        "expectation": "若 Accordion 的內容區域使用 role=region，須透過 aria-labelledby 對應至該內容區域的按鈕。",
        "topic": "元件語意"
      },
      {
        "id": "APG-ACC-010",
        "name": "Accordion 應避免產生過多的區域地標（region landmarks）",
        "expectation": "若 Accordion 的內容區域使用 role=region，應避免產生過多的地標，例如當頁面中可同時展開的內容區域超過約六個時，就須謹慎使用。",
        "topic": "頁面結構"
      }
    ],
    "attributes": [
      "aria-controls",
      "aria-disabled",
      "aria-expanded",
      "aria-hidden",
      "aria-labelledby"
    ]
  },
  {
    "slug": "alert",
    "name": "Alert",
    "summary": "不移動焦點、由輔助科技即時播報的狀態訊息。",
    "source": "apg",
    "sourcePath": "app/(component)/alert/page.tsx",
    "roles": [
      "alert"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "alert",
        "purpose": "承載訊息的容器。它隱含 aria-live=assertive 與 aria-atomic=true，會打斷使用者當下的播報 —— 留給真正需要立刻知道的事。"
      },
      {
        "attr": "（時機）",
        "value": "動態更新",
        "purpose": "role=alert 播報的是內容的變化。頁面載入時就帶著文字的 alert 不會被唸出來；整個容器被換掉時，部分螢幕閱讀器也會當成新節點而不播報。容器要先在 DOM 裡，訊息在同一個節點內更新。"
      },
      {
        "attr": "（對照）",
        "value": "role=status",
        "purpose": "不急的訊息用 status（隱含 aria-live=polite），它會等使用者當下的播報結束才開口。成功、已儲存這類訊息屬於這一類。"
      },
      {
        "attr": "（名稱）",
        "value": "無",
        "purpose": "role=alert 的 nameFrom 只有 author —— 名稱不會從內容取得，所以 Accessibility Tree 上的 Name 永遠是空的。這不是缺漏：被播報的是內容的變化本身，不需要先報一個名稱。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "紅點是純視覺，訊息的嚴重性已由文字本身表達。"
      }
    ],
    "wcag": [
      {
        "id": "4.1.3",
        "name": "狀態訊息",
        "level": "AA",
        "note": "狀態訊息要能在不取得焦點的前提下被輔助科技知曉。role=alert 正是為此存在。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/status-messages"
      },
      {
        "id": "3.2.1",
        "name": "取得焦點",
        "level": "A",
        "note": "警示出現時不得移動焦點，使用者手上的操作不能被搶走。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/on-focus"
      },
      {
        "id": "2.2.3",
        "name": "沒有時間限制",
        "level": "AAA",
        "note": "警示不應自動消失；若採限時關閉，必須保留足夠時間讓人察覺並讀完。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/no-timing"
      },
      {
        "id": "2.2.4",
        "name": "中斷",
        "level": "AAA",
        "note": "警示不能過於頻繁 —— 重複播報對視覺或認知障礙使用者是實質的妨礙。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/interruptions"
      }
    ],
    "apg": [
      {
        "id": "APG-ALERT-001",
        "name": "警示元件須具有 alert 角色語意",
        "expectation": "包含警示訊息的容器具有 role=alert。",
        "topic": "狀態訊息"
      },
      {
        "id": "APG-ALERT-002",
        "name": "警示元件動態出現時，螢幕閱讀器需進行報讀",
        "expectation": "警示訊息需於頁面載入後動態顯示或更新，確保螢幕閱讀器能在訊息出現時進行報讀",
        "topic": "狀態訊息"
      },
      {
        "id": "APG-ALERT-003",
        "name": "警示元件不會改變鍵盤的聚焦位置",
        "expectation": "顯示警示元件時，不得移動鍵盤焦點或中斷使用者操作",
        "topic": "狀態訊息"
      },
      {
        "id": "APG-ALERT-004",
        "name": "警示元件不會在使用者讀取前自動消失",
        "expectation": "警示元件應設計成不會自動消失；若採限時關閉，訊息必須保留足夠時間，讓使用者能察覺並完整閱讀。",
        "topic": "時間限制"
      },
      {
        "id": "APG-ALERT-005",
        "name": "警示元件不會過度頻繁打斷使用者",
        "expectation": "警示元件不會過於頻繁產生，以免重複報讀妨礙視覺或認知障礙使用者操作。",
        "topic": "時間限制"
      }
    ],
    "attributes": [
      "aria-hidden"
    ]
  },
  {
    "slug": "alertdialog",
    "name": "Alert Dialog",
    "summary": "承載警告或錯誤、需要使用者立即回應的對話框。",
    "source": "apg",
    "sourcePath": "app/(component)/alertdialog/page.tsx",
    "roles": [
      "alertdialog"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "alertdialog",
        "purpose": "與 dialog 的差別：輔助科技把它當成警示來處理，開啟時會連同 aria-describedby 的內容一起播報，而不是只唸出標題。用在內容本身就是警告或錯誤、且需要立即回應的時候。"
      },
      {
        "attr": "aria-modal",
        "value": "true",
        "purpose": "明寫而非依賴 showModal() 的隱含值。APG 對警示對話框要求明確設定 —— 隱含值在 DOM 上看不到，用檢查工具的人會以為漏了。"
      },
      {
        "attr": "aria-labelledby",
        "value": "標題元素的 id",
        "purpose": "名稱取自可見標題，看到的和聽到的是同一份文字。"
      },
      {
        "attr": "aria-describedby",
        "value": "警示訊息的 id",
        "purpose": "這裡是必填，不像一般 Dialog 可有可無 —— 警示訊息就是這個元件存在的理由，不關聯起來「警示」兩個字就沒有內容。"
      },
      {
        "attr": "（焦點）",
        "value": "影響最小的控制元件",
        "purpose": "開啟時焦點落在「取消」而非「永久刪除」。破壞性動作旁邊若預選了破壞性按鈕，一個 Enter 就回不來了。"
      },
      {
        "attr": "（舊式）",
        "value": "aria-hidden=true",
        "purpose": "在不支援 <dialog> 的環境改用舊式做法時，要在每個背景層元素上各自設定，而且警示對話框絕不能落在任何 aria-hidden=true 元素的子階層裡。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "頂部紅色裝飾條是純視覺，不應進入無障礙樹。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "標題與訊息分別以 aria-labelledby 與 aria-describedby 關聯，不是只靠視覺上的前後排列。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.2",
        "name": "沒有鍵盤陷阱",
        "level": "A",
        "note": "焦點被限制在對話框內，但 Esc 一定能離開。要求回應不等於可以把人困住。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "開啟時焦點進入對話框並落在影響最小的控制元件上，關閉時回到觸發它的按鈕。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "3.3.4",
        "name": "錯誤預防",
        "level": "AA",
        "note": "不可逆的動作要可以復原、可以檢查、或可以確認。警示對話框正是「確認」這一條路 —— 而預設焦點放在取消鈕上，是讓確認真的成為一個決定而不是慣性。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "role=alertdialog、名稱、說明、aria-modal 四者齊備。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-ALD-001",
        "name": "警示對話框具有 alertdialog 角色語意",
        "expectation": "包含警示訊息與所有按鈕的容器，須指定 role=alertdialog 。",
        "topic": "元件語意"
      },
      {
        "id": "APG-ALD-002",
        "name": "警示對話框開啟時具有 modal 語意",
        "expectation": "警示對話框的容器須設定 aria-modal=true。",
        "topic": "元件語意"
      },
      {
        "id": "APG-ALD-003",
        "name": "警示對話框開啟時無法操作背景區域",
        "expectation": "警示對話框開啟時，程式會阻止所有使用者操作對話框外的內容。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-ALD-004",
        "name": "警示對話框開啟時會遮擋背景內容",
        "expectation": "警示對話框開啟時，對話框外的背景內容在視覺上被遮蔽或淡化。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-ALD-005",
        "name": "警示對話框具有無障礙名稱",
        "expectation": "警示對話框須以 aria-labelledby 關聯可見標題；若無可見標題，則須設定 aria-label",
        "topic": "元件語意"
      },
      {
        "id": "APG-ALD-006",
        "name": "警示對話框具有警示訊息提供的無障礙補充說明",
        "expectation": "警示對話框須以 aria-describedby 關聯警示訊息內容，以提供無障礙說明",
        "topic": "元件語意"
      },
      {
        "id": "APG-ALD-007",
        "name": "警示對話框開啟時，焦點移入其中",
        "expectation": "開啟警示對話框時，焦點需移至內部合適的元素；例如執行不可逆操作時，應優先聚焦於影響最小的控制元件或最常使用的控制元件。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-ALD-008",
        "name": "警示對話框開啟時，Tab 焦點限制在對話框中",
        "expectation": "Tab 鍵與 Shift+Tab 鍵僅能在對話框內的可聚焦元件間切換，且會在首尾元件間循環",
        "topic": "焦點管理"
      },
      {
        "id": "APG-ALD-009",
        "name": "按下 Esc 鍵可關閉警示對話框",
        "expectation": "按下 Esc 鍵關閉警示對話框",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-ALD-010",
        "name": "關閉警示對話框後需恢復到原先的焦點位置",
        "expectation": "關閉警示對話框後，焦點回到原觸發元素；若該元素已不存在，或有更符合操作流程的位置，則移至該新元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-ALD-011",
        "name": "警示對話框的互動元件可正常操作",
        "expectation": "警示對話框提供可操作的控制元件，讓使用者回應重要訊息或確認要求。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-ALD-012",
        "name": "使用舊式 aria-hidden 時，應隱藏背景內容並保留警示對話框",
        "expectation": "若使用舊式 aria-hidden 對輔助科技隱藏停用的背景，需將背景區塊皆設定 aria-hidden=true，且警示對話框絕不可位於任何 aria-hidden=true 元素的子階層中。",
        "topic": "元件語意"
      }
    ],
    "attributes": [
      "aria-describedby",
      "aria-hidden",
      "aria-labelledby",
      "aria-modal"
    ]
  },
  {
    "slug": "breadcrumb",
    "name": "Breadcrumb",
    "summary": "標示目前頁面在網站層級中的位置，並提供回上層的路徑。",
    "source": "apg",
    "sourcePath": "app/(component)/breadcrumb/page.tsx",
    "roles": [
      "link",
      "list",
      "listitem",
      "navigation"
    ],
    "aria": [
      {
        "attr": "（結構）",
        "value": "<nav>",
        "purpose": "Breadcrumb 必須放在導覽地標內，使用者才能從地標清單直接跳進來。用 <nav> 即隱含 navigation 角色。"
      },
      {
        "attr": "aria-label",
        "value": "麵包屑",
        "purpose": "導覽地標必須有名稱。一個頁面通常有主導覽、頁尾導覽、麵包屑數個 nav，沒有名稱在地標清單裡就是好幾個「導覽」，分不出誰是誰。"
      },
      {
        "attr": "aria-current",
        "value": "page",
        "purpose": "標示代表目前頁面的那個連結。若目前頁面不做成連結，可以省略 —— 不能點本身已經說明它就是當下所在。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "層級之間的斜線是純視覺，唸出來只會干擾。"
      },
      {
        "attr": "（結構）",
        "value": "<ol>",
        "purpose": "層級是有先後的，用有序清單而非 <ul>，順序資訊才進得了無障礙樹。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "以 nav 地標與有序清單表達「這是一組有先後的路徑」，而不是只靠視覺上的斜線。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.4.6",
        "name": "標題與標籤",
        "level": "AA",
        "note": "導覽地標的名稱要能說明它是什麼，讓地標清單裡的每一項都可辨識。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels"
      },
      {
        "id": "2.4.8",
        "name": "所在位置",
        "level": "AAA",
        "note": "Breadcrumb 本身就是在回答「我在網站的哪裡」，aria-current 讓這個答案也進到無障礙樹。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/location"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "導覽地標具備名稱，目前頁面以 aria-current=page 表達狀態。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-BRD-001",
        "name": "Breadcrumb 導覽須位於導覽地標內",
        "expectation": "Breadcrumb 置於導覽地標內",
        "topic": "頁面結構"
      },
      {
        "id": "APG-BRD-002",
        "name": "Breadcrumb 導覽地標須具備無障礙名稱",
        "expectation": "Breadcrumb 導覽地標須透過 aria-label 或 aria-labelledby 提供無障礙名稱",
        "topic": "頁面結構"
      },
      {
        "id": "APG-BRD-003",
        "name": "Breadcrumb 的目前頁面鏈結須正確設定成 aria-current",
        "expectation": "代表目前頁面的連結應設定 aria-current=\"page\"；若代表目前頁面的元素不是連結，則 aria-current 可省略。",
        "topic": "導覽機制"
      }
    ],
    "attributes": [
      "aria-current",
      "aria-hidden",
      "aria-label"
    ]
  },
  {
    "slug": "button",
    "name": "Button",
    "summary": "可作為 <button> 或連結呈現的動作元件，含載入中與停用狀態。",
    "source": "apg",
    "sourcePath": "app/(component)/button/page.tsx",
    "roles": [
      "button",
      "link"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "button",
        "purpose": "觸發動作的元素要有按鈕語意，而且外觀要像按鈕。做成看起來像連結的按鈕，使用者會預期它會導航；反之亦然。會換頁的用 <a>，會做事的用 <button>。"
      },
      {
        "attr": "aria-label",
        "value": "關閉",
        "purpose": "只有圖示、沒有文字內容時的名稱來源。有文字內容就不要用它覆蓋 —— 看到的和聽到的不一致會違反 WCAG 2.5.3。"
      },
      {
        "attr": "aria-describedby",
        "value": "說明元素的 id",
        "purpose": "補充說明，在名稱之後播報。「刪除帳號」是名稱，「這個動作無法復原」是說明 —— 兩者不該擠在同一句話裡。"
      },
      {
        "attr": "aria-pressed",
        "value": "true / false",
        "purpose": "Toggle 按鈕的開關狀態。用它的前提是名稱不隨狀態改變：標籤會在「播放」與「暫停」之間切換的按鈕，狀態已經寫在名稱裡，再加 aria-pressed 就是兩套互相打架的說法。"
      },
      {
        "attr": "aria-disabled",
        "value": "true",
        "purpose": "停用但保留在 Tab 順序中。原生 disabled 會讓按鈕從鍵盤與螢幕閱讀器的瀏覽路徑中整個消失 —— 使用者不但不能按，連「這裡有一顆按鈕、目前不能用」都不知道。停用原因寫在畫面別處時，用這個。"
      },
      {
        "attr": "aria-busy",
        "value": "true",
        "purpose": "非同步動作進行中。告訴輔助科技這裡的狀態還在變，先不要當成最終結果。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "圖示是純視覺，名稱已由 aria-label 提供，圖示再進無障礙樹只會重複。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "補充說明以 aria-describedby 與按鈕關聯，而不是只在視覺上擺在旁邊。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "Enter 與空白鍵都能啟動，不需要滑鼠。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.6",
        "name": "標題與標籤",
        "level": "AA",
        "note": "按鈕名稱要說明按下去會發生什麼，不能只是「確定」「點這裡」。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "每顆按鈕都有橘色 focus ring，包含以 aria-disabled 停用的那顆。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "2.5.3",
        "name": "名稱中的標籤",
        "level": "A",
        "note": "無障礙名稱要包含可見文字。用 aria-label 蓋掉看得見的標籤，語音控制使用者說出畫面上的字就點不到它。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/label-in-name"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "按鈕具備 button 角色與無障礙名稱；toggle 的按下狀態以 aria-pressed、停用狀態以 disabled 或 aria-disabled 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-BTN-001",
        "name": "按鈕可用 Enter 鍵或空白鍵啟動",
        "expectation": "當焦點位於按鈕時，按 Enter 或空白鍵會啟動按鈕。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-BTN-002",
        "name": "按鈕角色語意與實際功能須一致",
        "expectation": "觸發操作的元素須具備原生按鈕語意或 role=button，且其外觀與角色須符合該操作，而非顯示為超連結",
        "topic": "元件語意"
      },
      {
        "id": "APG-BTN-003",
        "name": "按鈕須具有無障礙名稱",
        "expectation": "按鈕的無障礙名稱來自其文字內容、aria-labelledby 或 aria-label。",
        "topic": "元件語意"
      },
      {
        "id": "APG-BTN-004",
        "name": "啟動按鈕後焦點移到合理位置",
        "expectation": "按鈕觸發後，焦點移動需視執行動作而定：跳入開啟的對話框、關閉後回到合理的元素、情境未變時維持在按鈕上，或移至新情境的起點。若以快捷鍵觸發按鈕，焦點通常維持在原本使用快捷鍵的情境中。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-BTN-005",
        "name": "按鈕須具有無障礙補充說明",
        "expectation": "若按鈕包含其功能的補充說明，須透過 aria-describedby 指向包含該說明的元素",
        "topic": "元件語意"
      },
      {
        "id": "APG-BTN-006",
        "name": "不可用的按鈕須正確傳達停用狀態",
        "expectation": "當按鈕對應的操作無法使用時，按鈕須傳達停用狀態；若採用 ARIA 的 role=button 語意，須設定 aria-disabled=true。",
        "topic": "元件語意"
      },
      {
        "id": "APG-BTN-007",
        "name": "Toggle 按鈕須正確設定 aria-pressed 並維持相同名稱",
        "expectation": "Toggle 按鈕須設定 aria-pressed，切換為開啟時為 true，關閉時為 false。使用 aria-pressed 時，按鈕名稱不得隨狀態改變；若名稱會改為描述下一個動作，則不得使用 aria-pressed。",
        "topic": "元件語意"
      }
    ],
    "attributes": [
      "aria-busy",
      "aria-describedby",
      "aria-disabled",
      "aria-hidden",
      "aria-label",
      "aria-pressed"
    ]
  },
  {
    "slug": "carousel",
    "name": "Carousel",
    "summary": "輪播一組幻燈片，自動輪播必須可暫停，切換需支援鍵盤。",
    "source": "apg",
    "sourcePath": "app/(component)/carousel/page.tsx",
    "roles": [
      "button",
      "group",
      "tab",
      "tablist",
      "tabpanel"
    ],
    "aria": [
      {
        "attr": "role（容器）",
        "value": "group",
        "purpose": "輪播容器。只有在這個輪播適合成為地標、值得讓使用者從地標清單直接跳進來時才用 region；否則用 group。這個範例的頁面還有別的內容更該被跳到，所以是 group。"
      },
      {
        "attr": "aria-roledescription",
        "value": "carousel",
        "purpose": "螢幕閱讀器會唸這個字取代角色名 ——「carousel」而不是「群組」。它不改變角色，輔助科技操作這個元素的方式仍然照 group 走。面板的 Role 列把兩個都列出來。"
      },
      {
        "attr": "aria-labelledby（容器）",
        "value": "可見標題的 id",
        "purpose": "輪播的名稱。名稱裡不要再出現「輪播」—— 角色描述已經說過一次，重複會唸成「carousel，近期活動輪播」。"
      },
      {
        "attr": "aria-roledescription（投影片）",
        "value": "slide",
        "purpose": "群組式的投影片用 role=group 加上這個角色描述。Tab 型的投影片是 tabpanel，不得加角色描述 —— 名稱已由對應的 tab 提供，再加一次會變成兩層重複的播報。"
      },
      {
        "attr": "aria-label（投影片）",
        "value": "第 1 張，共 3 張：秋季特展",
        "purpose": "每張投影片要有能辨識內容的名稱。給不出獨特名稱時才退回位置式的「第 3 張，共 10 張」。名稱裡不要再出現「投影片」。"
      },
      {
        "attr": "aria-live",
        "value": "off / polite",
        "purpose": "放在投影片的外層容器上。自動輪播中是 off，停下來才是 polite —— 使用者自己按下一張的結果需要被報讀，但每四秒自動插話一次會讓螢幕閱讀器無法用。"
      },
      {
        "attr": "aria-atomic",
        "value": "false",
        "purpose": "有 aria-live 就要一起設。false 表示只報讀換掉的那一部分；少了它，部分輔助科技會把整個容器從頭重讀一次。"
      },
      {
        "attr": "aria-label（播放控制）",
        "value": "播放輪播 / 停止輪播",
        "purpose": "名稱要說出按下去會發生什麼，隨狀態改變。不要用 aria-pressed —— 那是 Toggle Button 的做法，而這顆按鈕已經靠名稱表達狀態，兩者併用會唸出互相矛盾的資訊。"
      },
      {
        "attr": "aria-disabled（選取按鈕）",
        "value": "true",
        "purpose": "群組式選取器中，對應目前這張的按鈕要標上它 —— 按下去不會有任何變化。但必須留在 Tab 順序裡，所以不能用原生 disabled。"
      },
      {
        "attr": "role（Tab 型選取器）",
        "value": "tablist / tab",
        "purpose": "Tab 型的選取按鈕是 tablist 裡的 tab，整組只佔一個停留點。tablist 的 aria-label 要說明這組 tab 的用途，每個 tab 的名稱要指出它顯示哪一張。"
      },
      {
        "attr": "aria-controls",
        "value": "目前投影片的 id",
        "purpose": "指出這個控制元件操作的是哪個元素。支援程度不一，但它不會有害，而且在 Tab 型裡是 tab 與 tabpanel 關聯的必要環節。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "投影片與選取控制、控制與它操作的投影片，關聯都以 role 與 aria-controls 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "切換、選取與播放控制都能只用鍵盤完成。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.2.2",
        "name": "暫停、停止、隱藏",
        "level": "A",
        "note": "自動輪播預設關閉，啟動後可隨時停止。超過五秒的自動動態內容必須提供停止的方法 —— 預設不動是比「動了可以停」更省事的做法。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "所有控制元件聚焦時都有橘色 focus ring，包含那幾顆圓點。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "容器、投影片與每個控制元件都有正確的角色與名稱；播放狀態以名稱表達，選取狀態以 aria-selected 或 aria-disabled 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      },
      {
        "id": "4.1.3",
        "name": "狀態訊息",
        "level": "AA",
        "note": "手動切換投影片時以 aria-live=polite 報讀新內容；自動輪播期間改為 off，避免持續打斷。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/status-messages"
      }
    ],
    "apg": [
      {
        "id": "APG-CAR-001",
        "name": "輪播容器的角色設定須符合頁面的資訊架構",
        "expectation": "包含控制元件與投影片的輪播容器，只有在該輪播適合成為地標（landmark）時才使用 role=region，否則須使用 role=group。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-CAR-002",
        "name": "輪播容器須標記 carousel 的角色描述",
        "expectation": "輪播容器須設定 aria-roledescription=carousel。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-003",
        "name": "輪播容器須具有無障礙名稱",
        "expectation": "輪播有可見標題時，輪播容器須以 aria-labelledby 提供無障礙名稱，否則須使用 aria-label；名稱中不得重複出現「輪播」一詞。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-004",
        "name": "上一張與下一張的控制元件須具備 button 角色語意",
        "expectation": "上一張與下一張投影片的控制元件，須使用原生 button 元素，或完整實作 Button Pattern。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-005",
        "name": "播放控制元件為輪播中第一個 Tab 鍵停駐點",
        "expectation": "若輪播提供播放控制元件，該元件須是輪播內 Tab 鍵順序中的第一個元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CAR-006",
        "name": "播放控制元件的標籤須說明點擊後的下一步動作",
        "expectation": "播放控制元件的名稱須隨下一個動作改變，例如「停止輪播」或「開始輪播」，且不得使用 aria-pressed。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-007",
        "name": "鍵盤聚焦時自動播放應暫停",
        "expectation": "若輪播會自動播放，輪播內任一元素取得鍵盤焦點時，須停止播放，且在使用者主動要求前不得自行恢復。",
        "topic": "動態內容"
      },
      {
        "id": "APG-CAR-008",
        "name": "滑鼠懸停時自動播放應暫停",
        "expectation": "若輪播會自動播放，只要滑鼠停留在輪播範圍內，就須停止播放。",
        "topic": "動態內容"
      },
      {
        "id": "APG-CAR-009",
        "name": "輪播中的互動元素須依循頁面的 Tab 鍵順序",
        "expectation": "Tab 鍵與 Shift+Tab 鍵須依頁面既有的 Tab 鍵順序在輪播的互動元素間移動，不得另外撰寫程式改寫 Tab 鍵行為。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CAR-010",
        "name": "操作輪播控制元件時不應改變鍵盤的聚焦位置",
        "expectation": "觸發播放、上一張或下一張控制元件後，鍵盤焦點須留在原控制元件上，不得移動。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CAR-011",
        "name": "基本輪播與群組式輪播的每張投影片須具備 group 角色與 slide 角色描述",
        "expectation": "基本輪播與群組式輪播中，每個投影片容器須設定 role=group 與 aria-roledescription=slide；Tab 型輪播則改用 tabpanel 結構，另行檢測。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-012",
        "name": "基本輪播與群組式輪播的每張投影片須具備有意義的無障礙名稱",
        "expectation": "基本輪播與群組式輪播中，每張投影片須以 aria-labelledby 或 aria-label 提供能辨識其內容的無障礙名稱；若無法給出各自獨特的名稱，可改用位置與總數，例如「第 3 張，共 10 張」。名稱中不得重複出現「投影片」一詞。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-013",
        "name": "輪播的 aria-live 設定須與播放狀態相符",
        "expectation": "若投影片外層容器使用 aria-live，須同時設定 aria-atomic=false；自動播放進行中時 aria-live 須為 off，未自動播放時則為 polite。",
        "topic": "狀態訊息"
      },
      {
        "id": "APG-CAR-014",
        "name": "Tab 型輪播投影片使用 tabpanel 角色語意",
        "expectation": "若採用 Tab 型投影片選取器，每個投影片容器須設定 role=tabpanel 而非 role=group，且不得設定 aria-roledescription。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-015",
        "name": "Tab 型輪播選擇器的 Tab 須對應標示各投影片",
        "expectation": "若採用 Tab 型投影片選取器，每個 Tab 的無障礙名稱須以名稱或編號指出其所顯示的投影片。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-016",
        "name": "Tab 型輪播選擇器的 tablist 須具備說明其用途的標籤",
        "expectation": "若採用 Tab 型投影片選取器，其 tablist 須以 aria-label 說明這組 Tab 的用途。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-017",
        "name": "Tab 型輪播選擇器完整實作 Tabs Pattern",
        "expectation": "若採用 Tab 型投影片選取器，其 tablist、tab 與 tabpanel 的角色、關聯、狀態與鍵盤操作，須完全依循 Tabs Pattern 的定義。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CAR-018",
        "name": "群組式輪播選取器的容器須具備無障礙名稱",
        "expectation": "若採用群組式按鈕作為投影片選取器，這些按鈕須置於 role=group 的容器內，且該容器的無障礙名稱須說明這組控制元件的用途。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-019",
        "name": "群組式輪播選取器的控制元件須以 Button 實作",
        "expectation": "若採用群組式按鈕作為投影片選取器，每個選取控制元件須使用原生 button 元素，或完整實作 Button Pattern。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-020",
        "name": "群組式輪播選取器的按鈕須具備與對應投影片相符的無障礙名稱",
        "expectation": "若採用群組式按鈕作為投影片選取器，每個選取按鈕的無障礙名稱須與其所顯示的投影片相符。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-021",
        "name": "群組式輪播目前顯示投影片的選取器的按鈕須標記 aria-disabled",
        "expectation": "群組式輪播中，對應目前顯示投影片的選取按鈕須設定 aria-disabled=true，且仍須保留在頁面的 Tab 鍵順序中。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CAR-022",
        "name": "自動輪播須提供播放控制元件",
        "expectation": "若輪播具備自動播放功能，須提供可停止與重新開始自動播放的按鈕。",
        "topic": "動態內容"
      },
      {
        "id": "APG-CAR-023",
        "name": "隱藏中的輪播投影片不應被輔助科技讀取",
        "expectation": "未在畫面上顯示的投影片，須確實對輔助科技隱藏，不得只是移到畫面外。",
        "topic": "閱讀順序"
      },
      {
        "id": "APG-CAR-024",
        "name": "隱藏中的輪播投影片不能被鍵盤聚焦",
        "expectation": "未在畫面上顯示的投影片，其內部的可聚焦元素須排除於頁面的鍵盤焦點順序之外。",
        "topic": "焦點管理"
      }
    ],
    "attributes": [
      "aria-atomic",
      "aria-controls",
      "aria-disabled",
      "aria-label",
      "aria-labelledby",
      "aria-live",
      "aria-roledescription"
    ]
  },
  {
    "slug": "checkbox",
    "name": "Checkbox",
    "summary": "可獨立勾選的選項，支援勾選、未勾選與不確定三種狀態。",
    "source": "apg",
    "sourcePath": "app/(component)/checkbox/page.tsx",
    "roles": [
      "checkbox",
      "group"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "checkbox",
        "purpose": "用原生 <input type=checkbox> 即隱含此角色，同時免費取得 Space 鍵、勾選狀態與 label 關聯。"
      },
      {
        "attr": "（名稱）",
        "value": "<label>",
        "purpose": "名稱來自關聯的 label。用 label 包住或 htmlFor 指向，點文字也能切換 —— 那同時把點擊範圍從 16px 的小方塊擴大到整行，是動作控制受限者的實質差別。"
      },
      {
        "attr": "aria-checked",
        "value": "mixed",
        "purpose": "第三態。部分勾選只存在於 DOM 的 indeterminate property，寫不進 HTML 屬性裡，所以要另外補這個值才進得了無障礙樹。"
      },
      {
        "attr": "（結構）",
        "value": "fieldset + legend",
        "purpose": "多個核取方塊構成一組時，群組要有名稱。「通知方式」這個標題若只是旁邊的一行字，螢幕閱讀器使用者聽到的就只是三個孤立的選項。"
      },
      {
        "attr": "aria-describedby",
        "value": "說明元素的 id",
        "purpose": "補充說明可掛在單一核取方塊或整個群組上。"
      },
      {
        "attr": "aria-invalid",
        "value": "true",
        "purpose": "驗證失敗時標示。錯誤訊息本身用 aria-describedby 關聯。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "label 與控制項關聯、群組以 fieldset/legend 表達、說明以 aria-describedby 關聯 —— 三種關係都不能只靠視覺位置。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "空白鍵即可切換。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.5.8",
        "name": "目標尺寸（最小）",
        "level": "AA",
        "note": "方塊本身只有 16px，但 label 與它同屬一個點擊區域，實際可點範圍是整行。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum"
      },
      {
        "id": "3.3.2",
        "name": "標籤或說明",
        "level": "A",
        "note": "每個選項都有可見標籤，群組有可見的群組名稱。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "角色為 checkbox，名稱來自 label，勾選與部分勾選狀態都進得了無障礙樹。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-CHK-001",
        "name": "核取方塊可用 Space 切換狀態",
        "expectation": "當焦點位於核取方塊時，按 Space，勾選狀態會切換。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CHK-002",
        "name": "核取方塊具有 checkbox 角色語意",
        "expectation": "核取控制項具有 role=checkbox 或等效的原生核取方塊語意。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CHK-003",
        "name": "核取方塊具有無障礙名稱",
        "expectation": "核取方塊的無障礙名稱來自其文字內容、aria-labelledby 或 aria-label。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CHK-004",
        "name": "核取方塊正確呈現勾選與部分勾選狀態",
        "expectation": "核取方塊勾選時 aria-checked=true、未勾選時為 false；三態核取方塊部分勾選時為 mixed。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CHK-005",
        "name": "用來控制整組核取方塊的三態核取方塊會同步更新子項目。",
        "expectation": "若三態核取方塊用來控制一組選項，將其勾選會勾選全部子核取方塊，取消勾選會取消全部；若支援第三次切換，則會還原先前記住的部分勾選狀態。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CHK-006",
        "name": "核取方塊群組具有無障礙名稱",
        "expectation": "若多個核取方塊構成同一群組，role=group 的 aria-labelledby 指向可見群組標籤。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CHK-007",
        "name": "核取方塊或核取方塊群組具有無障礙補充說明",
        "expectation": "若核取方塊或核取方塊群組有補充說明，對應元素的 aria-describedby 指向包含該補充說明的元素。",
        "topic": "頁面結構"
      }
    ],
    "attributes": [
      "aria-checked",
      "aria-describedby",
      "aria-invalid"
    ]
  },
  {
    "slug": "combobox",
    "name": "Combobox",
    "summary": "文字輸入搭配彈出清單的複合控制項，焦點留在輸入框內。",
    "source": "apg",
    "sourcePath": "app/(component)/combobox/page.tsx",
    "roles": [
      "combobox",
      "dialog",
      "listbox",
      "option"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "combobox",
        "purpose": "放在接收輸入並顯示目前值的那個元素上，也就是 <input> 本身，不是外層的 wrapper。放錯地方的話，螢幕閱讀器報讀的名稱與值會對不上。"
      },
      {
        "attr": "aria-expanded",
        "value": "true / false",
        "purpose": "彈出內容的顯示狀態。這是整組屬性裡唯一會隨操作改變的，所以它是面板 Status 列上看得到的那一個。"
      },
      {
        "attr": "aria-controls",
        "value": "彈出內容的 id",
        "purpose": "指向被這個 combobox 展開與收起的那塊內容。"
      },
      {
        "attr": "aria-haspopup",
        "value": "（省略）/ dialog",
        "purpose": "彈出內容是 listbox 時省略 —— role=combobox 的隱含值就是 listbox。grid、tree、dialog 三種必須明寫，使用者得先知道按下去會開什麼。它是 property 不是 state，不隨操作改變，所以不出現在 Status 列。"
      },
      {
        "attr": "aria-autocomplete",
        "value": "list",
        "purpose": "必須如實反映實際行為。none 是建議值不隨輸入改變；list 是清單會依輸入篩選；both 是除了清單還會在游標後方顯示行內完成字串。標成 both 卻沒有那個字串，等於告訴使用者一個不存在的功能。"
      },
      {
        "attr": "aria-activedescendant",
        "value": "作用中建議值的 id",
        "purpose": "焦點留在輸入框，由這個屬性指出清單裡目前作用中的是哪一個。Combobox 不能用 roving tabindex —— 焦點一移到選項上，使用者就不能繼續打字了。"
      },
      {
        "attr": "label（可見標籤）",
        "value": "縣市 / 出發日期",
        "purpose": "input 類元件優先用原生 <label> 提供名稱，而不是 aria-labelledby。名稱必須與目前值分得開 —— 使用者要同時聽到「縣市」和「臺北市」，否則不知道這個值屬於哪個欄位。"
      },
      {
        "attr": "aria-label（彈出清單）",
        "value": "縣市建議",
        "purpose": "彈出的 listbox 自己也要有名稱。它不共用 combobox 的名稱，螢幕閱讀器把它當成另一個容器報讀。"
      },
      {
        "attr": "aria-selected（建議值）",
        "value": "true / false",
        "purpose": "哪一個建議值是選取狀態。grid 型的彈出內容也用它，但選取範圍跟著焦點走：每格代表一個建議值時選取那一格，整列描述同一個建議值時選取那一列。"
      },
      {
        "attr": "aria-readonly（對話框型）",
        "value": "readonly",
        "purpose": "值只能從對話框選，所以輸入框是唯讀。用 readOnly 而非 disabled —— disabled 的元素不可聚焦，鍵盤使用者就打不開對話框了。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "輸入框與彈出內容以 aria-controls 關聯，建議值與清單的隸屬關係以 role 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "輸入、篩選、展開、選取與取消都能只用鍵盤完成。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "焦點全程留在輸入框；對話框型在開啟時把焦點移入對話框，關閉後移回輸入框。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "3.2.2",
        "name": "輸入時",
        "level": "A",
        "note": "自動選取的建議值只在離開欄位時成為值，不會在輸入過程中改變焦點或送出表單。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/on-input"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "輸入元件具備 combobox 角色與來自 label 的名稱，展開狀態以 aria-expanded 表達，作用中的建議值以 aria-activedescendant 指出。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-CBX-001",
        "name": "Combobox 是彈出內容在頁面 Tab 順序中的唯一進入點",
        "expectation": "以 Tab 導覽頁面時，可進入 Combobox，但彈出內容不會另外成為頁面 Tab 停駐點。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CBX-002",
        "name": "Combobox 可用向下鍵移至彈出內容的第一個或下一個項目",
        "expectation": "若有彈出內容，聚焦 Combobox 後按向下鍵，焦點會移至適當的第一個可聚焦建議；若已有自動選取的建議，則移至該建議後的下一個項目。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-003",
        "name": "Combobox 可用向上鍵移至彈出內容的前一個項目",
        "expectation": "有彈出內容時，聚焦 Combobox 後按向上鍵，焦點會移至彈出內容最後一個可聚焦項目。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-004",
        "name": "Combobox 支援 Alt+方向鍵開關彈出內容",
        "expectation": "Alt+向下鍵會開啟彈出內容且不移動焦點；需要時，Alt+向上鍵會關閉彈出內容並將焦點移回 Combobox。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-005",
        "name": "Listbox、Grid 或 Tree 型彈出內容按 Enter 接受已選取的建議",
        "expectation": "在 Listbox 或 Grid 型彈出內容中，按 Enter 會接受目前焦點所在或已選取的建議、關閉彈出內容，並將接受的值放入 Combobox。在 Tree 型彈出內容中，按 Enter 會接受可選取的建議。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-006",
        "name": "可編輯的 Combobox 保留平台標準的文字編輯操作",
        "expectation": "在可編輯的 Combobox 中，可列印字元與平台標準的單行文字編輯按鍵（輸入、游標移動、選取、文字修改）皆可正常編輯其值。JavaScript 不得攔截這些按鍵事件而干擾瀏覽器原生的文字編輯行為。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-007",
        "name": "可編輯 Combobox 的彈出內容開開啟時可同時接收輸入字元",
        "expectation": "可編輯的 Combobox 在焦點位於 Listbox、Grid 或 Tree 型彈出內容時，輸入任一可列印字元，焦點會移回 Combobox 輸入框，彈出內容維持開啟不關閉，且該字元會輸入至輸入框中。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-008",
        "name": "不可編輯 Combobox 的 Listbox 或 Tree 彈出內容支援首字元快速定位",
        "expectation": "不可編輯的 Combobox 在焦點位於 Listbox 或 Tree 型彈出內容時，輸入可列印字元，焦點會移至名稱以該字元開頭的下一個建議值。Grid 型彈出內容不適用此行為。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-009",
        "name": "Combobox 可用 Escape 鍵關閉彈出內容",
        "expectation": "彈出內容可見時，按下 Escape 鍵會關閉彈出內容，且不會意外改變 Combobox 的值。彈出內容已隱藏時再按 Escape 鍵，須依該元件設計文件的定義，一律保留或一律清除 Combobox 的值。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-010",
        "name": "Escape 鍵關閉 Listbox、Grid 或 Tree 型彈出內容並將焦點移回 Combobox",
        "expectation": "焦點位於 Listbox、Grid 或 Tree 型彈出內容時，按下 Escape 鍵會關閉彈出內容，並將焦點移回 Combobox。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CBX-011",
        "name": "Listbox 型彈出內容以上下鍵移動焦點並同步選取",
        "expectation": "焦點位於 Listbox 型彈出內容時，按向下鍵會將焦點移至下一個選項並同時選取該選項，按向上鍵會將焦點移至上一個選項並同時選取。焦點已位於最後一個（或第一個）選項時再按該方向鍵，須為「將焦點移回 Combobox」或「不做任何動作」兩者之一，且行為前後一致。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-012",
        "name": "Listbox 型彈出內容的左右鍵將焦點移回 Combobox 並移動文字游標",
        "expectation": "可編輯的 Combobox 在焦點位於 Listbox 型彈出內容時，按向左鍵或向右鍵，焦點會移回 Combobox 且彈出內容不關閉，同時文字游標往左或往右移動一個字元；游標已位於最左端或最右端時則不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-013",
        "name": "Listbox 型彈出內容的 Home 與 End 鍵移至首末選項或移動文字游標",
        "expectation": "焦點位於 Listbox 型彈出內容時，按 Home 鍵會將焦點移至並選取第一個選項，按 End 鍵會將焦點移至最後一個選項；若 Combobox 可編輯，亦可改為將焦點移回 Combobox，並把文字游標置於第一個字元前或最後一個字元後。實作須擇一並保持一致。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-014",
        "name": "Listbox 型彈出內容的 Backspace 與 Delete 鍵可編輯 Combobox",
        "expectation": "可編輯的 Combobox 在焦點位於 Listbox 型彈出內容時，按 Backspace 鍵會將焦點移回 Combobox 並刪除游標前一個字元；按 Delete 鍵會將焦點移回 Combobox，若已有建議值被選取則移除其選取狀態，並移除行內自動完成字串（若存在）。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-015",
        "name": "Grid 型彈出內容以方向鍵逐格移動焦點",
        "expectation": "焦點位於 Grid 型彈出內容時，向左鍵與向右鍵逐格水平移動，向上鍵與向下鍵逐格垂直移動；可選擇性支援在列首或列尾換至上一列或下一列。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-016",
        "name": "Grid 型彈出內容依建議值的呈現方式決定選取範圍",
        "expectation": "在 Grid 型彈出內容中，選取狀態跟隨焦點移動。若每個儲存格各代表一個不同的建議值，焦點所在的儲存格即為選取狀態；若同一列的所有儲存格描述的是同一個建議值，則該列、或該列中代表建議值的儲存格為選取狀態。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-017",
        "name": "Grid 型彈出內容的 Page、Home、End 與 Control 組合鍵運作正確",
        "expectation": "焦點位於 Grid 型彈出內容時：Page Up 與 Page Down 鍵依作者設定的列數上下移動焦點，焦點已在首列或末列時不再移動；Home 與 End 鍵將焦點移至焦點所在列的第一個或最後一個儲存格；Control+Home 與 Control+End 鍵分別將焦點移至第一列與最後一列。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-018",
        "name": "Grid 型彈出內容的 Backspace 與 Delete 鍵可編輯 Combobox",
        "expectation": "可編輯的 Combobox 在焦點位於 Grid 型彈出內容時，按 Backspace 鍵會將焦點移回 Combobox 並刪除游標前一個字元；按 Delete 鍵會將焦點移回 Combobox，若已有建議值被選取則移除其選取狀態，並移除行內自動完成字串（若存在）。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-019",
        "name": "垂直排列的 Tree 型彈出內容以方向鍵導覽並展開收合節點",
        "expectation": "焦點位於垂直排列的 Tree 型彈出內容時：向右鍵在已收合節點上會展開該節點，且焦點與選取皆不移動，在已展開節點上會移至第一個子節點，在末端節點上不做任何動作；向左鍵在已展開節點上會收合該節點，在末端或已收合的子節點上會移至其父節點，在末端或已收合的根節點上不做任何動作；向下鍵與向上鍵會在不改變任何節點展開狀態的前提下，移至下一個或上一個可聚焦節點。上述焦點移動時，若目的節點為可選取的建議值，該節點同時被選取。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-020",
        "name": "Tree 型彈出內容以 Home 與 End 鍵移至首末節點",
        "expectation": "焦點位於 Tree 型彈出內容時，按 Home 鍵會將焦點移至第一個可聚焦節點，按 End 鍵會移至最後一個可聚焦節點，且皆不改變任何節點的展開或收合狀態；若目的節點為可選取的建議值，該節點同時被選取。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-021",
        "name": "Tree 型彈出內容在不可選取的分類節點上區分焦點與選取",
        "expectation": "焦點移至不可作為建議值選取的父節點或分類節點時，須為「維持原本已選取的節點不變」或「沒有任何值被選取」兩者之一。且畫面上焦點樣式與選取樣式必須有明顯可辨識的差異，讓使用者能清楚判斷目前是否已選取某個值。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CBX-023",
        "name": "水平排列的 Tree 型彈出內容互換方向鍵行為",
        "expectation": "Tree 型彈出內容設定 aria-orientation=\"horizontal\" 時，向下鍵與向右鍵的行為互換，向上鍵與向左鍵的行為互換。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-CBX-024",
        "name": "Combobox 的對話框型彈出內容實作 Modal Dialog Pattern",
        "expectation": "若 Combobox 使用對話框型彈出內容，對話框的焦點移入、焦點循環、關閉方式及其他鍵盤操作符合 Modal Dialog Pattern。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CBX-025",
        "name": "Combobox 對話框完成或取消後將焦點移回並正確處理值",
        "expectation": "在對話框型彈出內容中執行可指定 Combobox 值的動作（例如按下確定按鈕）後，對話框關閉、焦點移回 Combobox，且該值帶入 Combobox。取消對話框（按 Escape 鍵或啟用取消按鈕）時，焦點同樣移回 Combobox，且須為「保留原值不變」或「清除 Combobox 的值」兩者之一。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CBX-026",
        "name": "Combobox 輸入元件具有 combobox 角色語意",
        "expectation": "接收使用者輸入並顯示目前值的元素，須具有 role=\"combobox\" 或等效的 HTML 原生語意。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-030",
        "name": "Combobox 的 aria-haspopup 與彈出內容類型一致",
        "expectation": "彈出內容為 role=\"grid\"、role=\"tree\" 或 role=\"dialog\" 時，Combobox 須將 aria-haspopup 設為相對應的值（grid、tree 或 dialog）。彈出內容為 role=\"listbox\" 時可省略，因為 role=\"combobox\" 的 aria-haspopup 隱含值即為 listbox。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-031",
        "name": "Combobox 的 aria-expanded 反映彈出內容的顯示狀態",
        "expectation": "彈出內容隱藏時，Combobox 須設定 aria-expanded=\"false\"；彈出內容可見時須設定為 true。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-032",
        "name": "Combobox 以 aria-activedescendant 管理彈出內容中的焦點",
        "expectation": "Combobox 取得焦點時，DOM 焦點置於 Combobox 元素上。當焦點位於 Listbox、Grid 或 Tree 型彈出內容的子元素時，DOM 焦點仍維持在 Combobox，並由 Combobox 的 aria-activedescendant 指向彈出內容中目前作用中的子元素。對話框型彈出內容不適用，其 DOM 焦點會實際移入對話框。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-CBX-034",
        "name": "Combobox 具有與目前值可區分的無障礙名稱",
        "expectation": "Combobox 若有可見標籤，且其元素為可用 HTML label 元素標示的元素（例如 input），須使用 label 元素提供無障礙名稱；否則以 aria-labelledby 指向該可見標籤；若無可見標籤，則以 aria-label 提供名稱。Combobox 的無障礙名稱須與其目前值有所區別，讓輔助科技使用者在元件預設狀態下能同時得知名稱與值。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-035",
        "name": "Combobox 的 aria-autocomplete 與其自動完成行為一致",
        "expectation": "可編輯的 Combobox 須依其自動完成行為設定 aria-autocomplete：彈出內容中的建議值不隨輸入字元改變時設為 none；彈出內容會提供對應輸入字元的建議值清單時設為 list；除建議值清單外，還會在輸入游標後方顯示行內完成字串時設為 both。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-036",
        "name": "自動選取的建議值在 Combobox 失去焦點時成為其值",
        "expectation": "可編輯的 Combobox 採用「list 自動完成並自動選取」行為時，彈出內容出現後第一個建議值會自動標示為選取狀態；Combobox 失去焦點時，該自動選取的建議值即成為 Combobox 的值，除非使用者另行選擇了其他建議值、或修改了已輸入的文字。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-037",
        "name": "行內自動完成字串以視覺反白與選取狀態呈現",
        "expectation": "Combobox 設定 aria-autocomplete=\"both\" 時，所選建議值中使用者尚未輸入的部分（完成字串）會接在輸入游標後方以行內方式顯示，且須以視覺反白呈現並具有選取狀態。",
        "topic": "元件語意"
      },
      {
        "id": "APG-CBX-038",
        "name": "相鄰的開啟按鈕可顯示 Combobox 的彈出內容",
        "expectation": "Combobox 旁若設有圖像化的開啟按鈕（Open button），啟用該按鈕時，在有可用建議值的情況下會顯示彈出內容。",
        "topic": "鍵盤操作"
      }
    ],
    "attributes": [
      "aria-activedescendant",
      "aria-autocomplete",
      "aria-controls",
      "aria-expanded",
      "aria-haspopup",
      "aria-label",
      "aria-readonly",
      "aria-selected"
    ]
  },
  {
    "slug": "dialog",
    "name": "Dialog",
    "summary": "以原生 <dialog> 實作的強制回應對話框，焦點鎖定與 ESC 關閉由平台提供。",
    "source": "apg",
    "sourcePath": "app/(component)/dialog/page.tsx",
    "roles": [
      "dialog"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "dialog",
        "purpose": "由 <dialog> 元素隱含提供，不需另外書寫。"
      },
      {
        "attr": "aria-modal",
        "value": "true",
        "purpose": "由 showModal() 隱含提供，告訴輔助科技背景內容暫時不可用。"
      },
      {
        "attr": "aria-labelledby",
        "value": "標題元素的 id",
        "purpose": "讓對話框的 accessible name 取自可見標題，兩者不會不一致。"
      },
      {
        "attr": "aria-describedby",
        "value": "說明元素的 id",
        "purpose": "讓簡短的用途說明跟著名稱一起播報，例如修改名稱後按儲存套用。若內容是需要逐項導覽的清單、表格或多段文字，應讓使用者逐項閱讀，避免一次關聯整段內容。"
      },
      {
        "attr": "aria-label",
        "value": "關閉",
        "purpose": "關閉鈕內只有圖示，需要文字名稱才有可用的按鈕標籤。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "頂部橘色裝飾條與關閉鈕圖示都是純視覺，不應進入無障礙樹。"
      },
      {
        "attr": "（結構）",
        "value": "元素位置",
        "purpose": "操作對話框所需的所有元素都必須是 role=dialog 的子階層。放在對話框外的按鈕，輔助科技使用者到不了。"
      },
      {
        "attr": "（結構）",
        "value": "背景遮蔽",
        "purpose": "開啟時背景內容必須在視覺上被遮蔽或淡化，並且無法操作。這裡由 ::backdrop 的半透明深綠與模糊達成，不可操作則由 showModal() 保證。"
      },
      {
        "attr": "（舊式）",
        "value": "aria-hidden=true",
        "purpose": "在不支援 <dialog> 的環境改用舊式做法時，要在每個背景層元素上各自設定 aria-hidden=true，而且對話框本身絕不能落在任何 aria-hidden=true 元素的子階層裡 —— 否則整個對話框從無障礙樹上消失。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "標題以 aria-labelledby 與對話框關聯，而不是只在視覺上靠近。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "開啟、操作、關閉全程可用鍵盤完成，不依賴滑鼠點擊遮罩。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.1.2",
        "name": "沒有鍵盤陷阱",
        "level": "A",
        "note": "焦點雖然被限制在對話框內，但 Esc 一定能離開，不構成陷阱。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "開啟時焦點進入對話框，關閉時回到觸發它的按鈕。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "對話框內每個可聚焦元素都有橘色 focus ring。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "role=dialog、accessible name、aria-modal 皆由平台或明寫屬性提供。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-DLG-001",
        "name": "開啟對話框時焦點須移至內部適當位置",
        "expectation": "對話框開啟時，焦點須移至框內符合內容與任務的位置：內容較長或結構複雜時，移至內容起始的靜態元素；任務不可逆時，移至影響最小的操作；單純提供資訊或繼續流程時，移至最可能使用的控制元件。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-002",
        "name": "Tab 焦點只會在對話框中循環",
        "expectation": "按下 Tab 鍵時，焦點僅能在對話框內移至下一個可透過 Tab 鍵到達的元素；若焦點位於最後一個元素時，則須移回第一個元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-003",
        "name": "Shift+Tab 焦點只會在對話框中循環",
        "expectation": "按下 Shift+Tab 鍵時，焦點僅能在對話框內移至上一個可透過 Tab 鍵到達的元素；若焦點位於第一個元素時，則須移至最後一個元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-004",
        "name": "對話框不得使用正數 tabindex",
        "expectation": "對話框不得以大於 0 的 tabindex 值控制其 Tab 順序。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-005",
        "name": "Esc 鍵可關閉對話框",
        "expectation": "按下 Esc 鍵須關閉對話框。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-DLG-006",
        "name": "關閉對話框後焦點須回到合理位置",
        "expectation": "關閉對話框後，焦點須回到原觸發元素；若該元素已不存在，或流程另有更合理的位置，則移至能提供合理流程的其他元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-007",
        "name": "對話框須提供可見且可透過 Tab 到達的關閉按鈕",
        "expectation": "對話框的 Tab 鍵順序中，須包含可見的關閉按鈕，例如關閉或取消。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-DLG-008",
        "name": "對話框容器具有 dialog 角色",
        "expectation": "對話框的容器須設定 role=dialog。",
        "topic": "元件語意"
      },
      {
        "id": "APG-DLG-009",
        "name": "操作對話框所需的元素須位於 role=dialog 之內",
        "expectation": "操作對話框所需的所有元素，都須是 role=dialog 元素的子階層元素。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-DLG-010",
        "name": "對話框須設定 aria-modal=true",
        "expectation": "對話框的容器須設定 aria-modal=true。",
        "topic": "元件語意"
      },
      {
        "id": "APG-DLG-011",
        "name": "對話框開啟時須阻止操作背景內容",
        "expectation": "對話框開啟時，應用程式須防止使用者操作對話框外的內容。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-012",
        "name": "對話框開啟時須在視覺上遮蔽背景內容",
        "expectation": "對話框開啟時，對話框外的背景內容在視覺上須被遮蔽或淡化。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-DLG-013",
        "name": "對話框須具有無障礙名稱",
        "expectation": "對話框須以 aria-labelledby 關聯可見標題，或提供 aria-label 作為無障礙名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-DLG-014",
        "name": "僅在說明簡短時才使用 aria-describedby",
        "expectation": "對話框若設定 aria-describedby，該屬性須指向說明用途或訊息的內容；若該內容是需要逐項導覽的清單、表格或多段文字，則不得使用 aria-describedby 一次關聯。",
        "topic": "元件語意"
      },
      {
        "id": "APG-DLG-015",
        "name": "舊式 aria-hidden 須隱藏停用的背景但不得隱藏對話框",
        "expectation": "若使用舊式 aria-hidden 對輔助科技隱藏停用的背景內容，須在每個包含該背景層的元素上設定 aria-hidden=true，且對話框元素不得位於任何 aria-hidden=true 元素的子階層中。",
        "topic": "元件語意"
      }
    ],
    "attributes": [
      "aria-describedby",
      "aria-hidden",
      "aria-label",
      "aria-labelledby",
      "aria-modal"
    ]
  },
  {
    "slug": "disclosure",
    "name": "Disclosure",
    "summary": "單一按鈕控制一段內容的顯示與隱藏，狀態以 aria-expanded 表達。",
    "source": "apg",
    "sourcePath": "app/(component)/disclosure/page.tsx",
    "roles": [
      "button"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "button",
        "purpose": "控制元件必須是按鈕。用原生 <button> 即隱含此角色；用 <div> 加 onClick 則要自己補 role、tabindex 與鍵盤處理，沒有理由這麼做。"
      },
      {
        "attr": "aria-expanded",
        "value": "true / false",
        "purpose": "內容可見時為 true，隱藏時為 false。少了它，螢幕閱讀器使用者按下按鈕後不知道發生了什麼事。"
      },
      {
        "attr": "aria-controls",
        "value": "內容元素的 id",
        "purpose": "指向這顆按鈕所顯示或隱藏的全部內容。內容用 hidden 而非條件渲染，這個 id 才永遠指得到東西。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "箭頭圖示是純視覺，狀態已由 aria-expanded 表達。"
      }
    ],
    "wcag": [
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "Enter 與空白鍵即可切換，不需要滑鼠。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "控制按鈕有橘色 focus ring。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "控制元件具備 button 角色，aria-expanded 隨內容可見狀態更新，aria-controls 指向被控制的內容。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-DISC-001",
        "name": "Disclosure 控制元件可用 Enter 鍵或空白鍵切換內容",
        "expectation": "當焦點位於 Disclosure 控制元件時，按下 Enter 鍵或空白鍵可觸發該元件，並切換其所控制內容的顯示與隱藏。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-DISC-002",
        "name": "Disclosure 控制元件須具備 button 角色語意",
        "expectation": "用來顯示與隱藏 Disclosure 內容的元素須具備 button 角色語意。",
        "topic": "元件語意"
      },
      {
        "id": "APG-DISC-003",
        "name": "Disclosure 的 aria-expanded 須反映內容的顯示狀態",
        "expectation": "Disclosure 按鈕所控制的內容可見時，aria-expanded=true；內容隱藏時，aria-expanded=false。",
        "topic": "元件語意"
      }
    ],
    "attributes": [
      "aria-controls",
      "aria-expanded",
      "aria-hidden"
    ]
  },
  {
    "slug": "feed",
    "name": "Feed",
    "summary": "可無限捲動的文章串流，讓螢幕閱讀器能逐篇瀏覽而不迷失位置。",
    "source": "apg",
    "sourcePath": "app/(component)/feed/page.tsx",
    "roles": [
      "article",
      "feed"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "feed",
        "purpose": "持有所有文章的容器。feed 與 list 的差別在於內容會持續長出來；這個角色讓輔助科技知道可以用文章為單位瀏覽，而不是把它當成固定長度的清單。"
      },
      {
        "attr": "aria-labelledby",
        "value": "可見標題的 id",
        "purpose": "串流的名稱。頁面上可能有好幾個 feed（最新、熱門、已追蹤），名稱是使用者唯一分得出來的依據。"
      },
      {
        "attr": "aria-busy",
        "value": "true / false",
        "purpose": "多步驟新增或移除文章的期間設為 true，完成後改回 false。輔助科技在這段期間先按住不報讀，避免使用者聽到半成品。整段包起來，不是每篇切換一次。上方面板的 Status 列只在載入那一秒出現 aria-busy=true —— 值為 false 時螢幕閱讀器什麼都不唸，所以那一列會回到「（無狀態）」。"
      },
      {
        "attr": "role（文章）",
        "value": "article",
        "purpose": "每個內容單元。feed 裡不該有游離在 article 之外的內容 —— 那些內容在以文章為單位瀏覽時會整個被跳過。"
      },
      {
        "attr": "aria-labelledby（文章）",
        "value": "文章標題的 id",
        "purpose": "每篇文章要有彼此分得出來的名稱。使用者在文章之間跳時聽到的就是這個名稱；全部都叫「文章」的話，跳與不跳沒有差別。"
      },
      {
        "attr": "aria-describedby（文章）",
        "value": "文章內文的 id",
        "purpose": "指向文章的主要內容。名稱回答「這是哪一篇」，描述讓使用者不必進入文章就能判斷要不要讀。"
      },
      {
        "attr": "aria-posinset / aria-setsize",
        "value": "1 / 2",
        "purpose": "這是第幾篇、總共有幾篇。無限捲動時 DOM 裡只有一部分文章，少了這兩個屬性，使用者沒有任何位置感。總數未知時 aria-setsize 設為 -1。"
      },
      {
        "attr": "tabindex（文章）",
        "value": "0",
        "purpose": "讓文章可聚焦，Page Down / Page Up 才有落腳點。沒有它，這個 pattern 的鍵盤操作全部失效。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "每篇文章是一個 article，標題與內文分別以 aria-labelledby、aria-describedby 關聯，文章的邊界程式判斷得出來。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "Page Down、Page Up 與 Ctrl + End 即可在文章之間與串流之外移動。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "新文章接在既有文章之後，焦點留在原處不被搬走，Tab 順序與視覺順序一致。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "4.1.3",
        "name": "狀態訊息",
        "level": "AA",
        "note": "載入期間以 aria-busy 標示，使用者不必把焦點移過去就知道串流正在更新。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/status-messages"
      }
    ],
    "apg": [
      {
        "id": "APG-FED-001",
        "name": "Feed 依包含焦點的文章進行捲動與更新",
        "expectation": "在 Feed 文章間移動 DOM 焦點並觸發動態更新，頁面依焦點所在文章進行適當捲動、載入或移除內容，且更新過程不會造成焦點遺失。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-FED-002",
        "name": "Feed 可用 Page Down 移到下一篇文章",
        "expectation": "Page Down 會將焦點移到下一篇文章。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-FED-003",
        "name": "Feed 可用 Page Up 移到上一篇文章",
        "expectation": "Page Up 會將焦點移到上一篇文章。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-FED-004",
        "name": "Feed 可用 Control+End 移到 Feed 之後",
        "expectation": "Control+End 會將焦點移到 Feed 之後的第一個可聚焦元素。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-FED-005",
        "name": "Feed 可用 Control+Home 移到 Feed 之前",
        "expectation": "Control+Home 會將焦點移到 Feed 之前的第一個可聚焦元素。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-FED-006",
        "name": "Feed 鍵盤操作說明清楚且容易找到",
        "expectation": "若 Feed 提供 Page Up、Page Down 等自訂操作，頁面上有容易找到且清楚的鍵盤操作說明。",
        "topic": "元件語意"
      },
      {
        "id": "APG-FED-007",
        "name": "巢狀 Feed 提供可行的鍵盤進入與離開方式",
        "expectation": "Feed 含有巢狀 Feed 時，鍵盤使用者可用 Tab 或實作的快捷鍵進入，並能返回外層 Feed，例如以 Control+End 移到外層下一篇文章。若內含元件使用 Feed 導覽鍵，該按鍵先操作元件，使用者可將焦點移出後繼續導覽 Feed。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-FED-009",
        "name": "Feed 具有無障礙名稱",
        "expectation": "Feed 以 aria-labelledby 關聯可見標題；沒有可見標題時，以 aria-label 提供名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-FED-010",
        "name": "Feed 內所有內容均位於 role=article 的元素中",
        "expectation": "Feed 中每個內容單元具有 role=article，且 Feed 內沒有游離在 role=article 的元素外的內容。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-FED-011",
        "name": "每篇 Feed 文章具有可區分的無障礙名稱",
        "expectation": "每個 role=article 元素的 aria-labelledby 指向文章內能提供可區辨標籤的內容。",
        "topic": "元件語意"
      },
      {
        "id": "APG-FED-012",
        "name": "Feed 文章具有無障礙補充說明，且由主要內容提供",
        "expectation": "每篇 Feed 文章使用 aria-describedby，指向包含其主要內容並提供無障礙補充說明的一個或多個元素。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-FED-015",
        "name": "Feed 的 aria-busy 正確反映動態更新狀態",
        "expectation": "多步驟新增或移除文章期間，Feed 設為 aria-busy=true；更新完成後恢復為 aria-busy=false。",
        "topic": "狀態訊息"
      }
    ],
    "attributes": [
      "aria-busy",
      "aria-describedby",
      "aria-labelledby",
      "aria-posinset",
      "aria-setsize"
    ]
  },
  {
    "slug": "grid",
    "name": "Grid",
    "summary": "以方向鍵在儲存格之間移動的互動式表格，整體只佔一個 Tab 停留點。",
    "source": "apg",
    "sourcePath": "app/(component)/grid/page.tsx",
    "roles": [
      "columnheader",
      "grid",
      "gridcell",
      "row"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "grid",
        "purpose": "原生 <table> 的隱含角色是 table，必須明寫 grid 才換成互動語意。換過去之後螢幕閱讀器會把方向鍵交還給頁面，它自己的表格瀏覽模式就不再接管 —— 所以方向鍵一定要自己實作，不能只改角色。"
      },
      {
        "attr": "aria-labelledby",
        "value": "可見標題的 id",
        "purpose": "Grid 的名稱，指向可見標題「共用檔案」。"
      },
      {
        "attr": "aria-describedby",
        "value": "操作說明的 id",
        "purpose": "名稱之後補充播報的說明。Grid 的操作方式與一般表格不同，這句話讓使用者知道該按方向鍵而不是 Tab。"
      },
      {
        "attr": "role（列與儲存格）",
        "value": "row / columnheader / gridcell",
        "purpose": "Grid 內的結構角色。用原生 <tr>、<th>、<td> 時瀏覽器會映射成這些角色，這裡明寫是為了讓結構一眼看得出來。"
      },
      {
        "attr": "aria-selected",
        "value": "true / false",
        "purpose": "選取狀態。這個 Grid 的選取單位是一整列，所以放在 <tr> 上。若選取單位是儲存格就放在儲存格上；選取整欄時，該欄的每一格都要標。"
      },
      {
        "attr": "aria-readonly",
        "value": "（不使用）",
        "purpose": "這個 Grid 沒有編輯功能，所以不標。標上去反而是錯的訊息 —— 它的意思是「這裡本來可以編輯，但現在不行」，而不是「這張表是唯讀資料」。可編輯的 Grid 才用它，而且只標在禁止編輯的那些儲存格上。"
      },
      {
        "attr": "tabindex",
        "value": "0 / -1",
        "purpose": "roving tabindex：只有一格是 0，其餘都是 -1。移動焦點時換掉那個 0，Tab 才會只停一次。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "用原生表格元素搭配 scope，每個儲存格與它的欄標頭產生程式可判斷的關聯。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "移動與選取都能只用鍵盤完成。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "整個 Grid 只佔一個 Tab 停留點，內部移動交給方向鍵。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "聚焦的儲存格有橘色內嵌外框，與選取列的淺綠底色分得出來。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "Grid 有名稱與補充說明，列與儲存格各有正確角色，選取狀態以 aria-selected 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-GRID-001",
        "name": "Grid 在頁面 Tab 順序中只有一個進入點",
        "expectation": "使用 Tab 導覽頁面時，整個 Grid 同一時間只有一個內部元素位於頁面 Tab 順序。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-GRID-002",
        "name": "Grid 儲存格內容可由鍵盤到達",
        "expectation": "每個資料儲存格本身可聚焦，或包含可聚焦元素；非互動式的列標題與欄標題不必設為可聚焦。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-003",
        "name": "Data Grid 支援向左鍵與向右鍵逐格移動",
        "expectation": "在 Data Grid 內按向左鍵與向右鍵時，焦點逐格水平移動；到達每列最左格或最右格時不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-004",
        "name": "Data Grid 支援向上鍵與向下鍵逐格移動",
        "expectation": "在 Data Grid 內按向上鍵與向下鍵時，焦點逐格垂直移動；到達每欄最上格或最下格時不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-005",
        "name": "Data Grid 支援 Page Up 與 Page Down 導覽",
        "expectation": "在 Data Grid 內按 Page Up 與 Page Down 時，焦點依設計跨多列移動；到達第一列或最後一列時不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-006",
        "name": "Data Grid 的 Home 與 End 移到目前列首尾",
        "expectation": "在 Data Grid 任一儲存格按 Home 與 End 時，焦點分別移至目前列的第一格與最後一格。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-007",
        "name": "Data Grid 的 Control+Home 與 Control+End 移到整體首尾",
        "expectation": "在 Data Grid 任一儲存格按 Control+Home 與 Control+End 時，焦點分別移至第一列第一格與目前已載入範圍的最後一格。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-008",
        "name": "Layout Grid 支援向左鍵與向右鍵逐格移動",
        "expectation": "在 Layout Grid 內按向左鍵與向右鍵時，焦點依對應方向逐格水平移動；若支援換列，移動順序須符合可預期的閱讀順序，否則到達 Grid 邊界時不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-009",
        "name": "Layout Grid 支援向上鍵與向下鍵逐格移動",
        "expectation": "在 Layout Grid 內按向上鍵與向下鍵時，焦點依對應方向逐格垂直移動；若支援換欄，移動順序須符合可預期的閱讀順序，否則到達 Grid 邊界時不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-010",
        "name": "Layout Grid 支援 Page Up 與 Page Down 導覽",
        "expectation": "在 Layout Grid 內按 Page Up 與 Page Down 時，焦點依設計跨多列移動；到達第一列或最後一列時不再移動。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-011",
        "name": "Layout Grid 的 Home 與 End 移到合理的列首尾",
        "expectation": "在 Layout Grid 內按 Home 與 End 將焦點移至目前列的第一格與最後一格；在支援的單欄或短列版面中，也可移至 Grid 的第一格與最後一格。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-012",
        "name": "Layout Grid 支援 Control+Home 與 Control+End",
        "expectation": "在 Layout Grid 內按 Control+Home 與 Control+End 時，焦點分別移至第一格與最後一格。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-013",
        "name": "Grid 選取快捷鍵會依預期更新選取範圍",
        "expectation": "若 Grid 提供選取快捷鍵，Control+Space 選取焦點所在欄、Shift+Space 選取焦點所在列、Control+A 選取全部儲存格，Shift 加方向鍵則向該方向延伸一格選取範圍，過程中不會意外失去焦點。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-014",
        "name": "Grid 可用 Enter 或 F2 進入儲存格互動模式",
        "expectation": "儲存格含有可編輯內容或需要 Grid 導覽鍵的元件時，Enter 或 F2 將焦點移入編輯欄位或第一個元件並停用 Grid 導覽；再按 F2 會恢復 Grid 導覽。單行編輯欄位再按 Enter 時，會恢復 Grid 導覽或移到相鄰儲存格的輸入欄位。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-015",
        "name": "Grid 可由輸入字元開始編輯儲存格",
        "expectation": "在可編輯儲存格中輸入英數字元時，焦點移至其輸入欄位並輸入該字元。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-016",
        "name": "Grid 可用 Escape 回復逐格導覽",
        "expectation": "Grid 導覽因儲存格互動而停用時，按下 Escape 會恢復 Grid 導覽。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-017",
        "name": "Grid 儲存格內的元件可由鍵盤操作",
        "expectation": "在儲存格互動模式中，若儲存格含多個元件，向右鍵或向下鍵移到下一個元件，向左鍵或向上鍵移到上一個元件，並可選擇循環；否則方向鍵交由目前元件處理。Tab 與 Shift+Tab 移到下一個及上一個元件，並可選擇在儲存格或 Grid 內循環。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-GRID-018",
        "name": "Grid 容器具有 grid 角色語意",
        "expectation": "互動式 Grid 容器具有 role=grid；若以 HTML table 實作 Grid，仍須在 table 元素設定 role=grid。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-GRID-021",
        "name": "Grid 具有無障礙名稱",
        "expectation": "Grid 以 aria-labelledby 關聯可見標題；沒有可見標題時，以 aria-label 提供名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-GRID-022",
        "name": "Grid 具有無障礙補充說明，且由標題或補充說明提供",
        "expectation": "若 Grid 有標題或補充說明，aria-describedby 指向包含該內容的元素。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-GRID-024",
        "name": "Grid 正確呈現選取狀態",
        "expectation": "選取儲存格、列或欄時，已選取的儲存格或列具有 aria-selected=true；選取整欄時，該欄的每個儲存格都具有 aria-selected=true。",
        "topic": "元件語意"
      },
      {
        "id": "APG-GRID-025",
        "name": "Grid 正確省略或呈現唯讀狀態",
        "expectation": "沒有編輯功能的 Grid 不使用 aria-readonly；可編輯 Grid 若使用此屬性，只在禁止編輯的儲存格設為 true，全部唯讀時才可設在整個 Grid。",
        "topic": "元件語意"
      },
      {
        "id": "APG-GRID-030",
        "name": "Grid 導覽直接聚焦不使用方向鍵的單一元件",
        "expectation": "Grid 儲存格只有一個不以方向鍵操作的可聚焦元件（如連結或按鈕）時，使用方向鍵進入該格會直接聚焦該元件。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-GRID-031",
        "name": "Grid 導覽聚焦僅含文字或單一圖像的儲存格",
        "expectation": "Grid 儲存格僅含文字或單一圖像時，gridcell 本身可取得焦點。",
        "topic": "焦點管理"
      }
    ],
    "attributes": [
      "aria-describedby",
      "aria-labelledby",
      "aria-readonly",
      "aria-selected"
    ]
  },
  {
    "slug": "landmark-regions",
    "name": "Landmark Regions",
    "summary": "以地標角色劃分頁面區塊，讓使用者能直接跳到主要內容或導覽。",
    "source": "apg",
    "sourcePath": "app/(component)/landmark-regions/page.tsx",
    "roles": [
      "banner",
      "complementary",
      "contentinfo",
      "form",
      "main",
      "navigation",
      "region",
      "search"
    ],
    "aria": [
      {
        "attr": "<header>",
        "value": "banner",
        "purpose": "必須直接位於 body 情境下才是 banner；包進 main、section、article 之後就只是普通容器。一個頁面最多一個最高層級的 banner。面板上第一個與第四個觀察對象都是 <header>，角色卻不同 —— 差別只在它被誰包著。"
      },
      {
        "attr": "<main>",
        "value": "main",
        "purpose": "主要內容。每個頁面一個最高層級的 main。若同一份文件真的有多個（例如巢狀的應用程式情境），每個都要有可區分的無障礙名稱。"
      },
      {
        "attr": "<footer>",
        "value": "contentinfo",
        "purpose": "與 header 同一條規則：只有在 body 情境下才是 contentinfo，且最多一個最高層級的。"
      },
      {
        "attr": "<nav>",
        "value": "navigation",
        "purpose": "nav 不受巢狀影響，永遠是 navigation。這一頁有兩個：「主要導覽」與頁尾的「參考規範」。多個導覽地標各要有自己的名稱；但若兩個導覽包含的是同一組連結，就該用相同的名稱 —— 名稱不同會讓使用者以為是兩份不同的東西。"
      },
      {
        "attr": "<search>",
        "value": "search",
        "purpose": "提供搜尋功能的一組控制元件用這個，不要用 form。form 地標的意思是「這裡有一份表單要填」，而使用者找搜尋框時要找的是搜尋。"
      },
      {
        "attr": "<form> + 名稱",
        "value": "form",
        "purpose": "form 只有具備無障礙名稱時才是地標，沒有名稱就只是普通容器。名稱代表整份表單的用途，不是個別欄位的標籤。"
      },
      {
        "attr": "<section> + 名稱",
        "value": "region",
        "purpose": "同樣只有具名時才是地標。region 用來標示其他具名地標沒涵蓋、但重要到值得跳過去的內容。面板上最後兩個 section 是對照組：一個有名字所以是 region，一個沒有所以是 generic。"
      },
      {
        "attr": "<aside>",
        "value": "complementary",
        "purpose": "與主要內容相關、但拿掉也能獨立理解的輔助區塊。這一頁沒有放 —— 內容與主要內容無關時就不該用它，該換成更通用的角色。"
      },
      {
        "attr": "aria-labelledby / aria-label",
        "value": "可見標題的 id / 文字",
        "purpose": "地標的名稱。有可見標題就指向它，沒有才用 aria-label。名稱裡不要重複角色名 —— 寫成 aria-label=\"導覽\" 會被唸成「導覽，導覽」。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "頁面的區塊劃分用原生地標元素表達，而不只靠視覺上的分隔線與留白。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.4.1",
        "name": "區塊跳過",
        "level": "A",
        "note": "地標讓輔助科技使用者直接跳到主要內容；略過連結提供同樣的出路給只用鍵盤的人。兩者缺一不可 —— 地標對不用螢幕閱讀器的鍵盤使用者沒有幫助。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks"
      },
      {
        "id": "2.4.6",
        "name": "標題及標籤",
        "level": "AA",
        "note": "重複出現的地標各有可區分的名稱，地標清單裡每一項都看得出是什麼。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels"
      },
      {
        "id": "3.2.3",
        "name": "一致的導覽",
        "level": "AA",
        "note": "同一組連結在每一頁用相同的地標與相同的名稱，使用者學會一次就能到處用。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/consistent-navigation"
      }
    ],
    "apg": [
      {
        "id": "APG-LMK-001",
        "name": "頁面主要區塊使用地標",
        "expectation": "頁面中主要可感知的區塊，須使用適當的 HTML 區段元素或 ARIA 地標角色加以標示。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-002",
        "name": "所有可感知內容都包含在地標中",
        "expectation": "頁面上所有可感知的內容都須包含在適當的地標區域內，以確保重要資訊不被輔助科技遺漏。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-003",
        "name": "地標角色符合區塊用途",
        "expectation": "每個地標的角色語意須與其所包含內容的用途相符。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-004",
        "name": "頁面避免過多地標",
        "expectation": "地標的數量應以實用為原則，不宜過多。一般建議一個頁面有七個以下的地標，除非有充分理由增加更多。",
        "topic": "導覽機制"
      },
      {
        "id": "APG-LMK-005",
        "name": "重複出現的地標角色須有可區別的名稱",
        "expectation": "當同一地標角色出現超過一次時，除非各實例的內容與用途完全相同，否則每個實例須有唯一的無障礙標籤。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-006",
        "name": "地標的無障礙名稱有意義且不重複角色名稱",
        "expectation": "地標的標籤應透過 aria-labelledby 參照可見標題，或在必要時使用 aria-label 提供，且標籤內容不應重複地標的角色名稱。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-007",
        "name": "主要地標位於最高層級且數量適當",
        "expectation": "每個頁面應有一個最高層級的主要地標用於主要內容；每個巢狀的文件或應用程式情境可以擁有自己的主要地標。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-008",
        "name": "多個主要地標須有可區分的無障礙名稱",
        "expectation": "若同一文件或應用程式情境中有多個主要地標，每個須有唯一的無障礙名稱。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-009",
        "name": "橫幅地標位於最高層級且數量適當",
        "expectation": "一個頁面最多只能有一個最高層級的橫幅地標；每個巢狀的文件或應用程式情境可以擁有自己的橫幅地標。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-010",
        "name": "多個橫幅地標須有可區分的無障礙名稱",
        "expectation": "若同一文件或應用程式情境中有多個橫幅地標，每個須有唯一的無障礙名稱。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-011",
        "name": "資訊地標位於最高層級且數量適當",
        "expectation": "一個頁面最多只能有一個最高層級的資訊地標；每個巢狀的文件或應用程式情境可以擁有自己的資訊地標。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-012",
        "name": "多個資訊地標須有可區分的無障礙名稱",
        "expectation": "若同一文件或應用程式情境中有多個資訊地標，每個須有唯一的無障礙名稱。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-013",
        "name": "補充地標包含相關輔助內容",
        "expectation": "補充地標是與主要內容相關的頂層輔助區塊，即使與主要內容分開也能獨立理解；不相關的內容應改用更通用的角色。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-014",
        "name": "表單地標具有識別用途的無障礙名稱",
        "expectation": "表單地標須有無障礙名稱來說明其用途，優先使用可見標題提供。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-015",
        "name": "表單地標用於正確的範圍與用途",
        "expectation": "表單地標代表整個表單而非個別欄位；若表單的用途是搜尋，應改用搜尋地標。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-016",
        "name": "導覽地標標籤保持一致",
        "expectation": "多個導覽地標各須有唯一標籤，但包含相同連結集合的導覽地標則使用相同名稱。",
        "topic": "一致的識別、導覽與行為"
      },
      {
        "id": "APG-LMK-017",
        "name": "區域地標具有無障礙名稱",
        "expectation": "區域地標用於標示其他具名地標未涵蓋但足夠重要的內容，且必須提供無障礙名稱。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-018",
        "name": "搜尋功能使用搜尋地標",
        "expectation": "提供搜尋功能的一組控制元件，應使用搜尋地標標示，而非表單地標。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-019",
        "name": "頁面層級的 Header 與 Footer 揭露頁面地標",
        "expectation": "用於頁面層級內容的 header 或 footer 元素須位於 body 情境中，並正確揭露預期的橫幅或資訊地標。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-020",
        "name": "用於建立區域地標的 Section 具有無障礙名稱",
        "expectation": "若 section 用於建立區域地標，它須提供有意義的無障礙名稱，並在 accessibility tree 中以 region 角色呈現。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LMK-021",
        "name": "對話框內容不重複包在地標中",
        "expectation": "對話框的內容不須重複包在地標區域中，因為對話框本身在開啟時已提供具名的容器與邊界。",
        "topic": "頁面結構"
      }
    ],
    "attributes": [
      "aria-label",
      "aria-labelledby"
    ]
  },
  {
    "slug": "link",
    "name": "Link",
    "summary": "導向其他資源的連結，名稱本身就要說明目的地。",
    "source": "apg",
    "sourcePath": "app/(component)/link/page.tsx",
    "roles": [
      "link"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "link",
        "purpose": "<a href> 的隱含角色就是 link，不需要明寫。沒有 href 的 <a> 隱含角色是 generic —— 那種情況下角色、焦點、鍵盤三件事都得自己補，不如改用 <button>。"
      },
      {
        "attr": "href",
        "value": "目標網址",
        "purpose": "它不只是導覽，還一次決定了角色與可聚焦性。少了它，連結在無障礙樹裡不再是連結。"
      },
      {
        "attr": "aria-label",
        "value": "在 LinkedIn 上追蹤我們",
        "purpose": "只有圖像的連結沒有文字可當名稱。名稱要說出目的地，不是描述圖案 —— 「LinkedIn 圖示」說不出按下去會去哪裡。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "圖示是純視覺，名稱已由 aria-label 提供。少了它，有些螢幕閱讀器會把圖示的檔名或路徑一起唸出來。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "連結用原生 <a href> 實作，連結的語意與關聯不靠視覺樣式傳達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "Enter 即可啟動，不需要滑鼠。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.4",
        "name": "連結目的（在上下文中）",
        "level": "A",
        "note": "連結文字本身就說得出目的地；圖像連結以 aria-label 補上名稱。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "連結聚焦時有橘色 focus ring。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "連結具備 link 角色與有意義的無障礙名稱。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-LINK-001",
        "name": "Link 具有連結角色語意",
        "expectation": "包含連結文字或圖像的元素須為原生連結，或設定 role=link。",
        "topic": "元件語意"
      },
      {
        "id": "APG-LINK-002",
        "name": "按 Enter 鍵啟動 Link 並跳至目標位置",
        "expectation": "當連結獲得焦點時，按 Enter 鍵可執行該連結，並將焦點或頁面導向連結目標。",
        "topic": "鍵盤操作"
      }
    ],
    "attributes": [
      "aria-hidden",
      "aria-label"
    ]
  },
  {
    "slug": "listbox",
    "name": "Listbox",
    "summary": "從清單中選取一個或多個選項，以方向鍵移動選取焦點。",
    "source": "apg",
    "sourcePath": "app/(component)/listbox/page.tsx",
    "roles": [
      "group",
      "listbox",
      "option"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "listbox",
        "purpose": "持有所有選項的容器。它和原生 <select> 解決同一個問題；只有在需要自訂選項外觀或分群呈現時才值得自己實作。"
      },
      {
        "attr": "aria-labelledby",
        "value": "可見標題的 id",
        "purpose": "獨立的 listbox 必須有自己的名稱。有可見標題時指向它，看得到的字和聽得到的字才是同一份。"
      },
      {
        "attr": "aria-activedescendant",
        "value": "作用中選項的 id",
        "purpose": "焦點留在容器上，由這個屬性指出容器內目前作用中的是哪個選項。這是 roving tabindex 之外的另一條路：選項不需要是可聚焦元素，移動時也不必呼叫 focus()。代價是作用中的樣式得自己畫。"
      },
      {
        "attr": "role（選項）",
        "value": "option",
        "purpose": "每個選項的角色，且必須直接位於 listbox 或其內的 group 之下。中間多包一層沒有角色的 div，選項與清單的關聯就斷了。"
      },
      {
        "attr": "aria-selected",
        "value": "true / false",
        "purpose": "選取狀態。同一個清單只能擇一使用 aria-selected 或 aria-checked，不要混用 —— 兩者在輔助科技裡會唸成不同的事情。未選取時明寫 false，使用者才聽得出「這一項沒有被選」。"
      },
      {
        "attr": "role（群組）",
        "value": "group",
        "purpose": "選項分群用的容器，每個群組至少要有一個選項。群組標題是靜態文字，不給 role=option，方向鍵才不會停在上面。"
      },
      {
        "attr": "aria-labelledby（群組）",
        "value": "群組標題的 id",
        "purpose": "群組必須有名稱。少了它，螢幕閱讀器只唸得出「群組」兩個字，使用者聽不出這幾個選項為什麼被歸在一起。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "選項與清單、選項與群組的隸屬關係以 role 表達，程式判斷得出來，不只靠縮排與間距。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "方向鍵、Home、End 即可完成選取，不需要滑鼠。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "整個清單只佔一個 Tab 停留點，選項之間的移動交給方向鍵，Tab 不會被四個選項一路攔下來。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "作用中的選項有橘色外框，與選取狀態的淺綠底色明顯不同 —— 使用者分得出「焦點在這裡」和「這一項被選了」。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "清單、群組、選項各有正確的角色與名稱，選取狀態以 aria-selected 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-LBX-001",
        "name": "單選 Listbox 獲得焦點時，應聚焦已選取的選項；若無選取則聚焦第一個",
        "expectation": "當單選 Listbox 獲得焦點時，焦點移至第一個已選取的選項，若無已選取項目則移至第一個選項。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-LBX-002",
        "name": "多選 Listbox 獲得焦點時不應自動改變現有的選取狀態",
        "expectation": "當多選 Listbox 獲得焦點時，焦點移至第一個已選取的選項，若無已選取項目則移至第一個選項，且不自動改變選取狀態。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-LBX-003",
        "name": "Listbox 支援向下鍵和向上鍵移動選項",
        "expectation": "按下方向鍵將焦點移至下一個選項，按上方向鍵移至上一個選項。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-004",
        "name": "Listbox 支援 Home 鍵和 End 鍵移至第一個或最後一個選項",
        "expectation": "Home 鍵將焦點移至第一個選項，End 鍵將焦點移至最後一個選項。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-005",
        "name": "單選 Listbox 採焦點即選取模式時，移動焦點即同步選取",
        "expectation": "若單選 Listbox 採用「選取跟隨焦點」模式，使用方向鍵、Home 或 End 移動焦點時，會自動取消前一個選取項目並選取焦點所在的新選項。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-006",
        "name": "Listbox 支援輸入字元快速跳至對應選項",
        "expectation": "快速輸入一個或多個字元時，焦點會跳至下一個名稱以輸入字串開頭的選項。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-007",
        "name": "多選 Listbox 可用 Space 鍵切換焦點項目的選取狀態",
        "expectation": "在 APG 無修飾鍵的多選模式中，按 Space 鍵可切換焦點選項的選取狀態，且不清除其他已選取的項目。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-008",
        "name": "Shift+方向鍵的行為須符合所採用的多選模式",
        "expectation": "無論有無搭配修飾鍵，在多選模式中，Shift + 上下方向鍵，則移動焦點並切換相鄰選項的選取狀態。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-009",
        "name": "多選 Listbox 支援以 Shift + Space 鍵等快捷鍵選取連續範圍",
        "expectation": "Shift + Space 鍵選取從錨點到目前焦點的連續範圍；Control + Shift + Home 或 Control + Shift + End 分別選取到第一個或最後一個選項的連續範圍。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-010",
        "name": "多選 Listbox 支援 Control+A 選取所有選項",
        "expectation": "按 Control + A 可全選所有選項。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-011",
        "name": "修飾鍵多選模式中，無修飾鍵的導覽操作只保留當前焦點項目的選取",
        "expectation": "若使用修飾鍵多選模式，在未按 Shift 或 Control 的情況下移動焦點，會取消所有其他選取項目，只保留焦點所在的選項為選取狀態。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-012",
        "name": "修飾鍵多選模式中，Control+方向鍵可移動焦點但不改變選取",
        "expectation": "若使用修飾鍵多選模式，Control + 下方向鍵與 Control + 上方向鍵只移動焦點，不改變選取狀態。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-013",
        "name": "修飾鍵多選模式中，Control+空白鍵可切換焦點項目的選取狀態",
        "expectation": "若使用修飾鍵多選模式，Control + Space 鍵只切換焦點選項的選取狀態，不影響其他選項。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-LBX-015",
        "name": "Listbox 的容器元素須具備 listbox 的角色語意",
        "expectation": "包含或擁有所有選項的元素須具備 role=listbox。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LBX-016",
        "name": "Listbox 的每個選項須具備 option 角色語意並正確隸屬於 Listbox",
        "expectation": "選項具有 role=option，並位於 role=listbox 或其內部 role=group。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LBX-017",
        "name": "Listbox 內的選項群組至少須包含一個選項",
        "expectation": "若 Listbox 使用 role=group，每個群組至少包含一個 role=option。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LBX-018",
        "name": "Listbox 內的選項群組須具備無障礙名稱",
        "expectation": "Listbox 中的每個 group 須透過 aria-label 或 aria-labelledby 提供無障礙名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-LBX-019",
        "name": "獨立的 Listbox 須具備無障礙名稱",
        "expectation": "不屬於其他元件的獨立 Listbox，須透過 aria-labelledby 或 aria-label 提供無障礙名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-LBX-021",
        "name": "Listbox 的選項須以一致的方式標示選取狀態",
        "expectation": "可選取的選項須一致使用 aria-selected 或 aria-checked 其中一種，選取時設為 true，未選取時設為 false。只有在兩者語意不同、介面清楚呈現各自意義，且各有獨立控制方法的極少數情況下，才同時使用兩種狀態。",
        "topic": "元件語意"
      },
      {
        "id": "APG-LBX-026",
        "name": "Listbox 的選項內不應包含需獨立操作的互動元件",
        "expectation": "選項內不應包含連結、按鈕或 Checkbox 等可獨立互動的元素。若項目需要包含可互動的子元素，應改用 Grid Pattern 而非 Listbox Pattern。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LBX-027",
        "name": "Listbox 的選項名稱應精簡且便於區分",
        "expectation": "選項名稱應避免過長或不必要的重複前綴，讓螢幕閱讀器與鍵盤使用者能有效率地區分與導覽各選項。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-LBX-028",
        "name": "水平排列的 Listbox 使用向左和向右鍵進行導覽",
        "expectation": "在水平 Listbox 中，右方向鍵的功能等同垂直 Listbox 的下方向鍵，左方向鍵的功能等同垂直 Listbox 的上方向鍵。",
        "topic": "鍵盤操作"
      }
    ],
    "attributes": [
      "aria-activedescendant",
      "aria-labelledby",
      "aria-selected"
    ]
  },
  {
    "slug": "radio",
    "name": "Radio Group",
    "summary": "一組互斥選項，整組只佔一個 Tab 停留點，以方向鍵在其中移動。",
    "source": "apg",
    "sourcePath": "app/(component)/radio/page.tsx",
    "roles": [
      "radio",
      "radiogroup"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "radiogroup",
        "purpose": "所有選項必須被它包住。fieldset 的隱含角色是 group 而不是 radiogroup，所以這裡明寫覆寫掉。"
      },
      {
        "attr": "aria-labelledby",
        "value": "legend 的 id",
        "purpose": "群組名稱。role 一旦被覆寫成 radiogroup，legend 的隱含命名對應就失效了，必須改用這個明確指向。"
      },
      {
        "attr": "role",
        "value": "radio",
        "purpose": "每個選項。用原生 input[type=radio] 即隱含此角色，同時免費取得方向鍵導覽與整組一個停留點。"
      },
      {
        "attr": "aria-checked",
        "value": "true / false",
        "purpose": "選取狀態。用原生 checked，瀏覽器會映射到無障礙樹 —— 有原生屬性就用原生的。"
      },
      {
        "attr": "aria-describedby",
        "value": "說明元素的 id",
        "purpose": "補充說明可以掛在整組上（「離島地區僅提供標準宅配」），也可以掛在單一選項上（「加收 120 元」）。兩種層級的說法不一樣，不要混為一談。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "選項與群組的從屬關係、每個選項與它的標籤、說明與被說明者 —— 三種關係都以標記表達，不是靠排版。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "方向鍵與 Space 即可完成選取。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "整組只佔一個停留點。十個選項若各佔一個停留點，鍵盤使用者要按十次才能離開這一區。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "3.3.2",
        "name": "標籤或說明",
        "level": "A",
        "note": "群組與每個選項都有可見標籤。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/labels-or-instructions"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "群組角色為 radiogroup 且具名，每個選項角色為 radio 且具名，選取狀態進得了無障礙樹。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-RAD-001",
        "name": "Radio Group 可用 Tab 移入移出並設定正確起始焦點",
        "expectation": "在工具列以外的情況，Tab 與 Shift + Tab 可將焦點移入或移出單選群組。進入時，焦點落在已勾選的單選按鈕上；若無已勾選項目，則落在第一個單選按鈕上。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-RAD-002",
        "name": "單選按鈕可用 Space 鍵選取焦點項目",
        "expectation": "在工具列以外的情況，若焦點所在的單選按鈕尚未勾選，按 Space 鍵可勾選它，同時取消同群組中原本已勾選的項目。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-RAD-003",
        "name": "單選群組以方向鍵移動並更新選取項目",
        "expectation": "在工具列以外的情況，右方向鍵或下方向鍵移至並勾選下一個單選按鈕，左方向鍵或上方向鍵移至並勾選前一個，且導覽到群組邊界時會循環至另一端。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-RAD-008",
        "name": "單選按鈕位於 role=radiogroup 內",
        "expectation": "所有單選按鈕須位於 role=radiogroup 內。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-RAD-009",
        "name": "每個單選按鈕具有 radio 角色語意",
        "expectation": "每個單選按鈕須具有 role=radio 或等效的原生 radio 角色語意。",
        "topic": "元件語意"
      },
      {
        "id": "APG-RAD-010",
        "name": "單選按鈕正確呈現選取狀態",
        "expectation": "已勾選的單選按鈕須為 aria-checked=true，每個未勾選的單選按鈕須為 aria-checked=false。",
        "topic": "元件語意"
      },
      {
        "id": "APG-RAD-011",
        "name": "每個單選按鈕具有無障礙名稱",
        "expectation": "每個單選按鈕能由文字內容、aria-labelledby 或 aria-label 提供無障礙名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-RAD-012",
        "name": "單選群組具有無障礙名稱",
        "expectation": "單選群組須透過 aria-labelledby 或 aria-label 提供無障礙名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-RAD-013",
        "name": "單選按鈕群組或個別單選按鈕具有無障礙補充說明",
        "expectation": "若單選群組或個別單選按鈕有補充說明，相關元素的 aria-describedby 須指向包含該說明的元素。",
        "topic": "頁面結構"
      }
    ],
    "attributes": [
      "aria-checked",
      "aria-describedby",
      "aria-labelledby"
    ]
  },
  {
    "slug": "toast",
    "name": "Toast",
    "summary": "不中斷操作的輕量通知，告知操作結果或狀態更新。",
    "source": "practice",
    "sourcePath": "app/(component)/toast/page.tsx",
    "roles": [
      "status"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "status",
        "purpose": "承載訊息的容器。隱含 aria-live=polite 與 aria-atomic=true，會等使用者當下的播報結束才開口 —— 這正是「不強制中斷」的技術實現。"
      },
      {
        "attr": "（時機）",
        "value": "動態更新",
        "purpose": "role=status 播報的是內容的變化。容器要先在 DOM 裡，訊息在同一個節點內更新；整個容器被換掉時，部分螢幕閱讀器會當成新節點而不播報。"
      },
      {
        "attr": "（名稱）",
        "value": "無",
        "purpose": "status 的 nameFrom 只有 author，名稱不從內容取得，所以 Accessibility Tree 上的 Name 永遠是空的。這不是缺漏。"
      },
      {
        "attr": "aria-label",
        "value": "關閉通知",
        "purpose": "關閉鈕只有圖示，需要文字名稱才有可用的按鈕標籤。"
      },
      {
        "attr": "（對照）",
        "value": "role=alert",
        "purpose": "需要立刻知道的事用 alert（隱含 assertive），它會插話但仍不搶焦點；非處理不可的事用 role=dialog，它把焦點拉過去鎖住。Toast 的定位是三者中最輕的一層：不插話、不搶焦點。"
      },
      {
        "attr": "（位置）",
        "value": "避開邊角",
        "purpose": "低視能或使用螢幕放大鏡的人視野受限在畫面中央，躲在右上角或右下角的通知他們根本看不到 —— 不是沒注意到，是不在視野裡。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "關閉鈕的圖示是純視覺，名稱已由 aria-label 提供。"
      }
    ],
    "wcag": [
      {
        "id": "4.1.3",
        "name": "狀態訊息",
        "level": "AA",
        "note": "讓使用者知道內容中的重要變化，而不必中斷手上的工作。訊息出現時網頁不跳轉、不刷新，鍵盤焦點留在原地 —— 這三件事同時成立才算數。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/status-messages"
      },
      {
        "id": "2.2.1",
        "name": "時間可調整",
        "level": "A",
        "note": "自動消失是時間限制。使用者必須能關閉、調整或延長它，才有足夠時間讀完。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable"
      },
      {
        "id": "2.2.4",
        "name": "中斷",
        "level": "AAA",
        "note": "通知不能過於頻繁 —— 連續跳出的 Toast 對視覺或認知障礙使用者是實質的妨礙。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/interruptions"
      },
      {
        "id": "3.2.1",
        "name": "取得焦點",
        "level": "A",
        "note": "Toast 出現時不得移動焦點，使用者手上的操作不能被搶走。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/on-focus"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "關閉鈕有橘色 focus ring。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      }
    ],
    "apg": [],
    "attributes": [
      "aria-hidden",
      "aria-label"
    ]
  },
  {
    "slug": "switch",
    "name": "Switch",
    "summary": "立即生效的開關，狀態是開或關，而非待送出的勾選。",
    "source": "apg",
    "sourcePath": "app/(component)/switch/page.tsx",
    "roles": [
      "group",
      "switch"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "switch",
        "purpose": "底層是 <input type=checkbox>，補上這個角色才會被唸成「開關，開啟」而不是「核取方塊，已勾選」。差別在於語意：開關改的是當下的狀態，核取方塊是待送出的選擇。"
      },
      {
        "attr": "checked",
        "value": "true / false",
        "purpose": "開關狀態。原生 checkbox 的勾選狀態存在 DOM property 上，瀏覽器直接把它映射進無障礙樹，不需要另外寫 aria-checked。若改用 <div role=switch> 實作，就得自己維護 aria-checked。"
      },
      {
        "attr": "aria-pressed",
        "value": "（不使用）",
        "purpose": "這是 Toggle Button 的屬性，不屬於 Switch。兩者都有開關的意思，但一個元素只能有一種角色 —— 同時標上會讓輔助科技唸出互相矛盾的狀態。"
      },
      {
        "attr": "role（群組）",
        "value": "group",
        "purpose": "多個開關構成一組時需要容器與名稱。這裡用 <fieldset> + <legend>，隱含角色就是 group，legend 直接成為它的無障礙名稱，不必自己接 aria-labelledby。"
      },
      {
        "attr": "aria-describedby",
        "value": "補充說明的 id",
        "purpose": "「變更後立即生效」是整組共通的規則，所以掛在群組上而不是每個開關上。掛在個別開關會讓同一句話被唸三次。"
      },
      {
        "attr": "aria-hidden",
        "value": "true",
        "purpose": "軌道與滑塊是純視覺，狀態已由 checked 表達。原生 input 以透明方式隱藏外觀，保留與可見開關相同的操作及焦點範圍，仍留在無障礙樹與 Tab 順序裡。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "三個開關包在 <fieldset> 內，「它們是一組」這件事程式判斷得出來，不只靠視覺上的靠近。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "空白鍵即可切換，不需要滑鼠。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "聚焦時軌道外圍出現橘色 focus ring。原生外觀被隱藏後，焦點樣式必須自己補回來。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "3.2.2",
        "name": "輸入時",
        "level": "A",
        "note": "切換開關會立即改變設定，這正是 Switch 的語意；使用者從角色與標籤就能預期這件事。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/on-input"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "每個開關具備 switch 角色、來自 label 的名稱，以及反映開關狀態的值；群組本身也有名稱。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-SWT-001",
        "name": "開關可用 Space 切換狀態",
        "expectation": "當焦點位於開關時，按 Space 會切換其狀態。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-SWT-002",
        "name": "開關可用 Enter 切換狀態",
        "expectation": "當焦點位於開關時，按 Enter 會切換其狀態。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-SWT-003",
        "name": "開關切換狀態時標籤保持不變",
        "expectation": "Switch 在開啟與關閉狀態之間切換時，其標籤不會改變。",
        "topic": "一致的識別、導覽與行為"
      },
      {
        "id": "APG-SWT-004",
        "name": "開關在 accessibility tree 中呈現 switch 角色",
        "expectation": "Switch 元素在 accessibility tree 中的計算角色為 switch；若以 HTML input[type=checkbox] 實作 Switch，也會呈現 role=switch。",
        "topic": "元件語意"
      },
      {
        "id": "APG-SWT-005",
        "name": "開關具有無障礙名稱",
        "expectation": "開關的無障礙名稱來自其文字內容、aria-labelledby 或 aria-label。",
        "topic": "元件語意"
      },
      {
        "id": "APG-SWT-006",
        "name": "開關正確呈現開啟與關閉狀態",
        "expectation": "開啟的 Switch 呈現 aria-checked=true，關閉的 Switch 呈現 aria-checked=false；若以 checkbox 輸入元件實作 Switch，則以其 checked 狀態表示。",
        "topic": "元件語意"
      },
      {
        "id": "APG-SWT-007",
        "name": "開關群組具有無障礙名稱",
        "expectation": "若多個開關構成同一群組，使用有名稱的 role=group，或使用 fieldset 與 legend 標示群組。",
        "topic": "元件語意"
      },
      {
        "id": "APG-SWT-008",
        "name": "開關或開關群組具有無障礙補充說明",
        "expectation": "若開關或開關群組有補充說明，對應元素的 aria-describedby 指向包含該補充說明的元素。",
        "topic": "頁面結構"
      }
    ],
    "attributes": [
      "aria-describedby",
      "aria-hidden",
      "aria-pressed"
    ]
  },
  {
    "slug": "table",
    "name": "Table",
    "summary": "呈現表格資料的靜態表格，儲存格需與正確的標頭產生關聯。",
    "source": "apg",
    "sourcePath": "app/(component)/table/page.tsx",
    "roles": [
      "cell",
      "columnheader",
      "row",
      "rowheader",
      "table"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "table",
        "purpose": "原生 <table> 的隱含角色就是 table，不需要明寫。只有在用 div 排版硬做表格時才需要補上 role=table、row、columnheader、cell —— 那等於重建整棵樹，沒有理由這麼做。"
      },
      {
        "attr": "scope",
        "value": "col / row",
        "purpose": "告訴瀏覽器這個 <th> 管的是一整欄還是一整列，計算出的角色分別是 columnheader 與 rowheader。少了它，簡單表格瀏覽器還猜得到，複雜表格就會對錯標頭。"
      },
      {
        "attr": "aria-labelledby",
        "value": "caption 內標題的 id",
        "purpose": "表格的無障礙名稱。<caption> 本身就是名稱來源，但這個 caption 裡還放了補充說明；不明寫的話整段都會被當成名稱唸出來。"
      },
      {
        "attr": "aria-describedby",
        "value": "補充說明的 id",
        "purpose": "名稱之後補充播報的說明。名稱回答「這是什麼表格」，描述回答「讀這張表前要知道什麼」—— 價格未稅這件事屬於後者。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊及關聯性",
        "level": "A",
        "note": "用原生 <table> 與 <th scope>，每個儲存格與它的欄標頭、列標頭產生程式可判斷的關聯，而不只是視覺上對齊。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.4.6",
        "name": "標題及標籤",
        "level": "AA",
        "note": "表格有可見標題「方案比較」，並以 aria-labelledby 成為它的無障礙名稱。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels"
      },
      {
        "id": "1.4.10",
        "name": "重新排列",
        "level": "AA",
        "note": "表格無法再窄時在自己的容器內水平捲動，頁面本身不會出現橫向捲軸。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/reflow"
      }
    ],
    "apg": [
      {
        "id": "APG-TBL-001",
        "name": "表格維持靜態表格結構",
        "expectation": "表格不實作為互動式複合元件；其儲存格不會只為了表格導覽而設為可聚焦或可選取。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-TBL-002",
        "name": "靜態表格內的互動元件維持個別 Tab 停駐點",
        "expectation": "靜態表格內的每個互動元件都是頁面 Tab 順序中的獨立停駐點；若因此造成過長且不實用的 Tab 順序，則改用互動式 Grid Pattern。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TBL-003",
        "name": "表格容器具有 table 角色語意",
        "expectation": "表格容器具有 role=table 或原生 HTML table 語意。",
        "topic": "頁面結構"
      },
      {
        "id": "APG-TBL-006",
        "name": "表格具有無障礙名稱",
        "expectation": "表格以 aria-labelledby 關聯可見標題；沒有可見標題時，以 aria-label 提供名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TBL-007",
        "name": "表格具有無障礙補充說明，且由標題或補充說明提供",
        "expectation": "若表格有標題或補充說明，aria-describedby 指向包含該內容的元素。",
        "topic": "頁面結構"
      }
    ],
    "attributes": [
      "aria-describedby",
      "aria-labelledby"
    ]
  },
  {
    "slug": "tabs",
    "name": "Tabs",
    "summary": "一組分頁標籤切換對應的面板，以方向鍵在標籤之間移動。",
    "source": "apg",
    "sourcePath": "app/(component)/tabs/page.tsx",
    "roles": [
      "tab",
      "tablist",
      "tabpanel"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "tablist",
        "purpose": "包住所有分頁的容器。"
      },
      {
        "attr": "aria-labelledby",
        "value": "可見標題的 id",
        "purpose": "分頁列的名稱。有可見標題就指向它；沒有才退而用 aria-label。這樣看到的字和聽到的字是同一份，不會各說各話。"
      },
      {
        "attr": "role",
        "value": "tab",
        "purpose": "每個分頁，必須直接位於 tablist 內。"
      },
      {
        "attr": "aria-selected",
        "value": "true / false",
        "purpose": "作用中的那一個為 true，其餘全部明寫 false —— 不是省略。省略的話輔助科技無法分辨「沒被選取」與「這個元件不支援選取」。"
      },
      {
        "attr": "aria-controls",
        "value": "面板的 id",
        "purpose": "把分頁與它控制的面板關聯起來。"
      },
      {
        "attr": "role",
        "value": "tabpanel",
        "purpose": "每個內容面板。同一時間只有作用中的那一個不帶 hidden。"
      },
      {
        "attr": "aria-labelledby",
        "value": "對應分頁的 id",
        "purpose": "面板的名稱來自它的分頁。使用者從面板列表跳過來時，聽到的是「總覽，分頁面板」而不是一個無名的區塊。"
      },
      {
        "attr": "tabindex",
        "value": "0 / 省略",
        "purpose": "只在面板內沒有可聚焦元素時給 0 —— 那種面板鍵盤使用者根本到不了。內容本身就可聚焦時再給，只會多一個沒有意義的停留點。這個元件會自己判斷。"
      },
      {
        "attr": "tabindex",
        "value": "-1",
        "purpose": "沒被選取的分頁。整組只留一個停留點，這就是 roving tabindex：Tab 進得來，內部改由方向鍵負責。"
      }
    ],
    "wcag": [
      {
        "id": "1.3.1",
        "name": "資訊與關聯性",
        "level": "A",
        "note": "分頁與面板的對應關係以 aria-controls 與 aria-labelledby 雙向表達，不是只靠視覺上的相鄰。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "方向鍵、Home、End 即可完成全部操作。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "2.4.3",
        "name": "焦點順序",
        "level": "A",
        "note": "分頁列整組一個停留點，接著是面板 —— 順序與視覺順序一致。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-order"
      },
      {
        "id": "2.4.7",
        "name": "焦點可見",
        "level": "AA",
        "note": "分頁與可聚焦的面板都有橘色 focus ring。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/focus-visible"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "tablist、tab、tabpanel 三個角色齊備，各自具名，選取狀態以 aria-selected 表達。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-TAB-001",
        "name": "Tab 容器須具備頁籤列的功能識別",
        "expectation": "包含所有 Tab 的容器須設定 role=tablist。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TAB-002",
        "name": "Tablist 須具備無障礙名稱",
        "expectation": "當有可見標籤時，Tablist 須透過 aria-labelledby 提供無障礙名稱；否則使用 aria-label 提供無障礙名稱。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TAB-003",
        "name": "每個 Tab 須位於 Tablist 內且具備 Tab 的角色語意",
        "expectation": "每個 Tab 元素須設定 role=tab，且須包含在 role=tablist 中。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TAB-004",
        "name": "每個 Tab 對應的內容區域須具備 tabpanle 的角色語意",
        "expectation": "與 Tab 關聯的每個內容面板須設定 role=tabpanel。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TAB-006",
        "name": "目前啟用的 Tab aria-selected 狀態須正確設定",
        "expectation": "作用中的 Tab 須設定 aria-selected=true，其餘所有 Tab 須設定 aria-selected=false。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TAB-007",
        "name": "切換 Tab 時須顯示對應面板並隱藏前一個面板",
        "expectation": "Tab 初始化時，只顯示作用中 Tab 的 Panel。當另一個 Tab 被啟動時，其關聯的 Tabpanel 變為可見，之前顯示的 Tabpanel 則被隱藏。",
        "topic": "動態內容"
      },
      {
        "id": "APG-TAB-008",
        "name": "Tabpanel 的無障礙名稱須由對應的 Tab 提供",
        "expectation": "每個 Tabpanel 須透過 aria-labelledby 參照其關聯的 Tab 。",
        "topic": "元件語意"
      },
      {
        "id": "APG-TAB-009",
        "name": "鍵盤焦點進入 Tablist 時應聚焦於目前啟用的 Tab",
        "expectation": "當焦點以 Tab 鍵移入 Tablist 時，焦點落在目前作用中的 Tab 上。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TAB-010",
        "name": "Tab 鍵離開 Tablist 時應移至對應的內容面板",
        "expectation": "當 Tablist 有焦點時，再按 Tab 鍵移至關聯的 Tabpanel；若 Tabpanel 的第一個有意義的內容可獲得焦點，則焦點移至該元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TAB-011",
        "name": "水平 Tab 列支援向左鍵與向右鍵循環切換焦點",
        "expectation": "在水平 Tablist 中，左方向鍵移至前一個 Tab，右方向鍵移至下一個 Tab，且導覽到兩端時會循環。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TAB-012",
        "name": "垂直 Tab 支援向上鍵與向下鍵循環切換焦點",
        "expectation": "在設有 aria-orientation=vertical 的 Tablist 中，下方向鍵的功能等同水平 Tablist 的右方向鍵，上方向鍵等同左方向鍵。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TAB-013",
        "name": "手動模式的 Tab 可用 Enter 鍵或 Space 鍵啟用",
        "expectation": "若 Tab 不在獲得焦點時自動啟動，則按 Enter 或 Space 可啟動焦點所在的 Tab 並顯示其 Panel。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TAB-014",
        "name": "Home 鍵與 End 鍵可分別移至第一個與最後一個頁籤",
        "expectation": "Home 鍵將焦點移至第一個 Tab，End 鍵將焦點移至最後一個 Tab。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TAB-015",
        "name": "內容無可聚焦元素的 Tabpanel 仍可納入頁面 Tab 鍵順序",
        "expectation": "若 Tabpanel 沒有可聚焦的元素，且其第一個有意義的內容也不可聚焦，則 Tabpanel 須設定 tabindex=0。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TAB-016",
        "name": "水平 Tablist 不攔截向上鍵與向下鍵，以保留捲動功能",
        "expectation": "焦點位於水平 Tablist 時，按向上鍵與向下鍵應維持瀏覽器原有的頁面捲動功能，不可被 Tab 元件攔截。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TAB-019",
        "name": "可刪除的 Tab 後焦點應移至合理的相鄰位置",
        "expectation": "按 Delete 鍵關閉目前 Tab 及其 Panel，並將焦點移至相鄰的 Tab；若刪除的是最後一個 Tab，則焦點移至工作流程中合理的元素。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TAB-020",
        "name": "若不支援 Delete 鍵刪除，可透過右鍵選單執行刪除 Tab",
        "expectation": "若支援刪除 Tab 但不使用 Delete 鍵，刪除功能須可透過 Tab 的快捷選單執行。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TAB-021",
        "name": "自動啟用模式的 Tab 切換不應有明顯延遲",
        "expectation": "若 Tab 在獲得焦點時自動啟動，其關聯 Panel 須立即顯示，無明顯延遲；否則應改用手動啟動模式。",
        "topic": "焦點管理"
      }
    ],
    "attributes": [
      "aria-controls",
      "aria-labelledby",
      "aria-selected"
    ]
  },
  {
    "slug": "tooltip",
    "name": "Tooltip",
    "summary": "附加在元素上的補充說明，透過 aria-describedby 與觸發元素關聯。",
    "source": "apg",
    "sourcePath": "app/(component)/tooltip/page.tsx",
    "roles": [
      "tooltip"
    ],
    "aria": [
      {
        "attr": "role",
        "value": "tooltip",
        "purpose": "提示內容的容器。"
      },
      {
        "attr": "aria-describedby",
        "value": "提示元素的 id",
        "purpose": "掛在觸發元素上，不是掛在提示上。提示在無障礙樹中不獨立存在 —— 它是附加在那個按鈕上的說明，所以面板觀察的是按鈕，Description 會變成提示的內容。"
      },
      {
        "attr": "（時機）",
        "value": "只在顯示時指向",
        "purpose": "提示隱藏時不輸出 aria-describedby。指向一個不存在的 id，無障礙名稱計算會拿到空字串，比沒有更糟。"
      },
      {
        "attr": "（焦點）",
        "value": "不接收",
        "purpose": "提示不給 tabindex。焦點始終留在觸發元素上 —— 這既是 APG 的要求，也決定了提示裡不能放連結或按鈕。"
      },
      {
        "attr": "（對照）",
        "value": "aria-label",
        "purpose": "名稱與說明不同。aria-label 蓋掉元素的名稱，Tooltip 是在名稱之後補一句。按鈕叫什麼用名稱，按下去會怎樣用說明。"
      }
    ],
    "wcag": [
      {
        "id": "1.4.13",
        "name": "暫留或聚焦時出現的內容",
        "level": "AA",
        "note": "這一條幾乎就是為 Tooltip 寫的，它要求三件事同時成立：可關閉（Esc 能關掉且不移動焦點）、可停留（指標能從觸發元素移到提示上而不讓它消失）、持續性（在焦點或指標離開前不會自己消失）。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus"
      },
      {
        "id": "2.1.1",
        "name": "鍵盤",
        "level": "A",
        "note": "聚焦即顯示，不是只有滑鼠懸停才看得到。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/keyboard"
      },
      {
        "id": "3.2.1",
        "name": "取得焦點",
        "level": "A",
        "note": "提示出現時不移動焦點，使用者的操作不會被打斷。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/on-focus"
      },
      {
        "id": "4.1.2",
        "name": "名稱、角色、值",
        "level": "A",
        "note": "提示以 role=tooltip 標記，並透過 aria-describedby 成為觸發元素的無障礙補充說明。",
        "href": "https://www.w3.org/WAI/WCAG22/Understanding/name-role-value"
      }
    ],
    "apg": [
      {
        "id": "APG-TIP-001",
        "name": "工具提示可由鍵盤焦點觸發",
        "expectation": "工具提示觸發元素取得鍵盤焦點後，提示內容通常會在短暫延遲後出現。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TIP-002",
        "name": "工具提示可由指標懸浮觸發",
        "expectation": "當指標懸停在觸發元素上時，工具提示會顯示，通常會有短暫延遲。",
        "topic": "指標與觸控操作"
      },
      {
        "id": "APG-TIP-003",
        "name": "按下 Escape 鍵可關閉工具提示",
        "expectation": "按 Escape 鍵可關閉工具提示。",
        "topic": "鍵盤操作"
      },
      {
        "id": "APG-TIP-004",
        "name": "工具提示不應接收鍵盤焦點",
        "expectation": "工具提示顯示時，鍵盤焦點應保持在觸發元素上；若內容需要接收焦點，應改用對話框。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TIP-005",
        "name": "由鍵盤焦點觸發的工具提示應在焦點離開時關閉",
        "expectation": "由觸發元素獲得焦點而開啟的工具提示，在該元素失去焦點時關閉。",
        "topic": "焦點管理"
      },
      {
        "id": "APG-TIP-006",
        "name": "由滑鼠懸停觸發的工具提示在指標停留期間應保持顯示",
        "expectation": "由指標懸停觸發的工具提示，在指標停留在觸發元素或工具提示本身上時須持續顯示。",
        "topic": "指標與觸控操作"
      },
      {
        "id": "APG-TIP-007",
        "name": "由滑鼠懸停觸發的工具提示應在指標離開後關閉",
        "expectation": "由指標懸停觸發的工具提示，在指標離開觸發元素與工具提示後須關閉。",
        "topic": "指標與觸控操作"
      },
      {
        "id": "APG-TIP-009",
        "name": "工具提示的觸發元素須以工具提示元素作為無障礙補充描述",
        "expectation": "工具提示的觸發元素須透過 aria-describedby 參照提供補充說明的工具提示元素。",
        "topic": "元件語意"
      }
    ],
    "attributes": [
      "aria-describedby"
    ]
  }
]
