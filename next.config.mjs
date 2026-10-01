// GitHub Pages 只提供靜態檔案，所以用 Next 的靜態匯出。
//
// basePath 由環境變數決定而不是寫死：本機開發掛在網域根層（空字串），
// GitHub Pages 的專案頁則掛在 /<repo> 底下。寫死的話本機就跑不起來。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 產生純靜態檔案到 out/，沒有 Node 伺服器。
  output: "export",
  basePath,
  // 每個路由輸出成 <route>/index.html。靜態主機對目錄的處理比對
  // <route>.html 一致，也避免結尾斜線的重導向歧義。
  trailingSlash: true,
  poweredByHeader: false,
}

export default nextConfig
