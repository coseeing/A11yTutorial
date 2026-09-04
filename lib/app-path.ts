// 本站掛在網域根層，沒有 basePath。保留此模組是為了讓自 SSO/center 移植的
// 元件（PageHeader、Footer 等）沿用同一個呼叫慣例而不必逐一改寫。
export const appBasePath = ""

export function appPath(path: string) {
  return path
}
