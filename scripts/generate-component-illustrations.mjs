import fs from "node:fs"

// Original geometric component illustrations, using the existing brand palette.
// These are visual explanations, not interactive controls or APG source assets.
const line = (y, x1 = 38, x2 = 86) => `<path d="M${x1} ${y}H${x2}"/>`
const illustrations = {
  accordion: {
    alt: "三列摺疊區塊，第一列展開顯示內容，其餘兩列收合。",
    body: '<rect x="15" y="12" width="82" height="64" rx="4" fill="white"/><path d="M15 29H97M15 51H97M15 63H97"/><path d="M23 20H59M23 39H66M23 44H49M23 57H61M23 69H61"/><path d="m82 19 4 4 4-4M82 56h8m-4-4v8M82 68h8m-4-4v8" stroke="#b26600"/>',
  },
  alert: {
    alt: "一條橫向警示訊息，左側有驚嘆號，右側有關閉符號。",
    body: '<rect x="10" y="26" width="92" height="36" rx="5" fill="white"/><circle cx="26" cy="44" r="9" fill="#fea400" stroke="none"/><path d="M26 38v7m0 5v.1M43 38H75M43 48H65m22-11 7 7m0-7-7 7"/>',
  },
  alertdialog: {
    alt: "覆蓋背景的警示對話框，包含警告三角形、訊息及兩個回應按鈕。",
    body: '<rect x="8" y="8" width="96" height="72" rx="5" fill="#dad5c2" stroke="none"/><rect x="21" y="16" width="70" height="56" rx="4" fill="white"/><path d="m34 28-8 14h16z" fill="#fea400" stroke="none"/><path d="M34 32v4m0 3v.1M48 31H79M48 39H70"/><rect x="34" y="52" width="20" height="10" rx="3"/><rect x="61" y="52" width="20" height="10" rx="3" fill="#fea400"/>',
  },
  breadcrumb: {
    alt: "三個依序相連的導覽層級，以箭頭分隔，最後一項標示目前位置。",
    body: '<path d="m12 39 8-7 8 7v13H12z" fill="white"/><path d="M18 52v-8h5v8m12-12 5 5-5 5M73 40l5 5-5 5"/><rect x="47" y="38" width="18" height="14" rx="3" fill="white"/><rect x="85" y="38" width="18" height="14" rx="3" fill="#fea400"/><path d="M85 59h18"/>',
  },
  button: {
    alt: "一個圓角動作按鈕，右下方的指標指向按鈕表面。",
    body: '<rect x="17" y="25" width="78" height="34" rx="12" fill="#fea400"/><path d="M34 42H70"/><path d="m72 49 3 25 7-8 9 2z" fill="white"/><path d="m83 67 5 8"/>',
  },
  carousel: {
    alt: "中央顯示一張投影片，兩側有切換箭頭，下方三個圓點標示目前位置。",
    body: '<rect x="25" y="14" width="62" height="46" rx="4" fill="white"/><path d="m30 52 14-14 11 10 11-16 16 20"/><circle cx="43" cy="27" r="5" fill="#fea400" stroke="none"/><path d="m15 30-6 7 6 7m82-14 6 7-6 7"/><circle cx="43" cy="72" r="3" fill="#fea400" stroke="none"/><circle cx="56" cy="72" r="3"/><circle cx="69" cy="72" r="3"/>',
  },
  checkbox: {
    alt: "三個核取方塊，依序呈現勾選、部分勾選及未勾選狀態。",
    body: '<rect x="20" y="12" width="15" height="15" rx="3" fill="#fea400"/><path d="m24 20 3 3 5-7"/><rect x="20" y="36" width="15" height="15" rx="3" fill="white"/><path d="M24 43h7"/><rect x="20" y="60" width="15" height="15" rx="3" fill="white"/>' + line(20, 46, 91) + line(43, 46, 80) + line(67, 46, 87),
  },
  combobox: {
    alt: "輸入框下方展開建議選單，其中一個選項以橘色標示。",
    body: '<rect x="20" y="10" width="72" height="21" rx="4" fill="white"/><path d="M28 20H63m15-3 4 4 4-4"/><rect x="20" y="35" width="72" height="44" rx="4" fill="white"/><path d="M22 48h68v14H22z" fill="#fea400" stroke="none"/><path d="M29 42H68M29 55H75M29 69H65"/>',
  },
  dialog: {
    alt: "背景上的一個對話框，包含標題、內容、關閉符號及操作按鈕。",
    body: '<rect x="8" y="8" width="96" height="72" rx="5" fill="#dad5c2" stroke="none"/><rect x="20" y="17" width="72" height="56" rx="4" fill="white"/><path d="M21 29h70M28 23h27m24-3 6 6m0-6-6 6M30 39H77M30 47H65"/><rect x="57" y="56" width="25" height="10" rx="3" fill="#fea400"/>',
  },
  disclosure: {
    alt: "一個向下箭頭控制單一內容區塊，下方內容處於展開狀態。",
    body: '<rect x="16" y="16" width="80" height="56" rx="4" fill="white"/><path d="M16 34H96"/><path d="m25 23 4 4 4-4" stroke="#b26600"/><path d="M42 25H81M27 46H78M27 55H85M27 63H62"/>',
  },
  feed: {
    alt: "多張文章卡片垂直排列，底部下一張卡片表示內容會繼續載入。",
    body: '<rect x="19" y="8" width="67" height="29" rx="4" fill="white"/><rect x="19" y="43" width="67" height="29" rx="4" fill="white"/><circle cx="30" cy="19" r="4" fill="#fea400" stroke="none"/><circle cx="30" cy="54" r="4" fill="#fea400" stroke="none"/><path d="M41 19H74M27 28H65M41 54H74M27 63H65M19 79h67m9-64v50m-4-3 4 5 4-5"/>',
  },
  grid: {
    alt: "九個儲存格排列成三乘三網格，中央儲存格以橘色焦點框標示。",
    body: '<rect x="19" y="12" width="74" height="63" rx="4" fill="white"/><path d="M19 33H93M19 54H93M44 12V75M68 12V75"/><rect x="46" y="35" width="20" height="17" rx="2" fill="#fea400" stroke="none"/><path d="m53 43 3-3 3 3m-3-3v8"/>',
  },
  "landmark-regions": {
    alt: "頁面框架分成頁首、側邊導覽、主要內容與頁尾等區域。",
    body: '<rect x="15" y="10" width="82" height="68" rx="4" fill="white"/><path d="M16 12h80v13H16z" fill="#fea400" stroke="none"/><path d="M15 26H97M15 65H97M36 26V65M22 35H29M22 44H29M22 53H29M46 37H85M46 46H85M46 55H71M26 72H85"/>',
  },
  link: {
    alt: "兩個相互扣連的鏈環，下方的底線表示可前往另一個資源的連結。",
    body: '<g transform="rotate(-30 56 39)"><rect x="22" y="27" width="42" height="24" rx="12" fill="white"/><rect x="49" y="27" width="42" height="24" rx="12" fill="white"/><path d="M44 39H70" stroke="#b26600" stroke-width="4"/></g><path d="M28 71H84"/>',
  },
  listbox: {
    alt: "一個包含三個選項的清單，第二個選項被選取並以橘色標示。",
    body: '<rect x="20" y="11" width="72" height="66" rx="4" fill="white"/><path d="M22 33h68v22H22z" fill="#fea400" stroke="none"/><path d="M30 23H77M30 44H65M30 65H77m4-24 3 3 5-6"/>',
  },
  radio: {
    alt: "三個互斥的單選選項，只有中間的圓形選項被選取。",
    body: '<circle cx="28" cy="20" r="8" fill="white"/><circle cx="28" cy="44" r="8" fill="white"/><circle cx="28" cy="44" r="4" fill="#fea400" stroke="none"/><circle cx="28" cy="68" r="8" fill="white"/>' + line(20, 45, 90) + line(44, 45, 80) + line(68, 45, 88),
  },
  toast: {
    alt: "頁面前方的一則輕量通知，包含完成勾號、訊息與關閉符號。",
    body: '<rect x="12" y="12" width="88" height="62" rx="4" fill="white"/><path d="M22 25H73M22 35H60" stroke="#dad5c2"/><rect x="24" y="44" width="80" height="31" rx="5" fill="white"/><circle cx="37" cy="59" r="8" fill="#fea400" stroke="none"/><path d="m33 59 3 3 5-6M51 55H81M51 64H72m17-10 6 6m0-6-6 6"/>',
  },
  switch: {
    alt: "兩個開關呈現關閉與開啟狀態，圓形滑塊的位置及顏色隨狀態改變。",
    body: '<rect x="26" y="14" width="60" height="25" rx="12.5" fill="white"/><circle cx="39" cy="26.5" r="8" fill="#dad5c2" stroke="none"/><rect x="26" y="49" width="60" height="25" rx="12.5" fill="#1f4147"/><circle cx="73" cy="61.5" r="8" fill="#fea400" stroke="none"/>',
  },
  table: {
    alt: "一張具有標題列與三列資料的表格，欄標頭以橘色區分。",
    body: '<rect x="13" y="13" width="86" height="62" rx="4" fill="white"/><path d="M15 15h82v14H15z" fill="#fea400" stroke="none"/><path d="M13 30H99M13 45H99M13 60H99M44 13V75M73 13V75M22 22H34M52 22H65M81 22H91M22 38H34M52 38H65M81 38H91M22 53H34M52 53H65M81 53H91M22 68H34M52 68H65M81 68H91"/>',
  },
  tabs: {
    alt: "三個頁籤共用一個內容面板，第一個頁籤以橘色標示為目前選取。",
    body: '<rect x="15" y="28" width="82" height="48" rx="4" fill="white"/><path d="M15 29V13h26v16" fill="#fea400"/><path d="M45 28V15h23v13M73 28V15h23v13M25 43H81M25 54H85M25 65H62"/>',
  },
  tooltip: {
    alt: "一個觸發元素的上方顯示提示泡泡，泡泡內有補充說明文字。",
    body: '<path d="M21 13h70v31H62l-6 8-6-8H21z" fill="#1f4147"/><path d="M31 24H81M31 33H68" stroke="white"/><rect x="37" y="61" width="38" height="16" rx="5" fill="#fea400"/><path d="M47 69H65"/>',
  },
}

fs.mkdirSync("public/component-illustrations", { recursive: true })
const metadata = {}
for (const [slug, { alt, body }] of Object.entries(illustrations)) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="112" height="88" viewBox="0 0 112 88"><title>${alt}</title><rect width="112" height="88" rx="8" fill="#eee6d8"/><g fill="none" stroke="#1f4147" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${body}</g></svg>`
  fs.writeFileSync(`public/component-illustrations/${slug}.svg`, svg)
  metadata[slug] = { src: `/component-illustrations/${slug}.svg`, alt }
}
fs.writeFileSync("lib/component-illustrations.generated.ts", "// Generated by scripts/generate-component-illustrations.mjs.\nexport const componentIllustrations: Record<string, { src: string; alt: string }> = " + JSON.stringify(metadata, null, 2) + "\n")
console.log(`Generated ${Object.keys(illustrations).length} original component illustrations with alternative text.`)
