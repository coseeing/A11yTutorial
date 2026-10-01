/**
 * 站內路徑的前綴。
 *
 * 本機開發與自架在網域根層時是空字串；部署到 GitHub Pages 的專案頁時是
 * `/<repo>`。由 NEXT_PUBLIC_BASE_PATH 決定，與 next.config.mjs 的 basePath
 * 讀同一個來源，兩邊才不會各說各話。
 *
 * Next 的 basePath 只會自動處理 <Link> 與 router 的路徑。這個站用的是原生
 * <a> 與 <img>，它們不會被處理 —— 所以站內連結與資源路徑都要經過 appPath()。
 */
export const appBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

export function appPath(path: string) {
  return `${appBasePath}${path}`
}
