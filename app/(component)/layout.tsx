// (component) route group — 元件頁共用的外層。
//
// 目前只是透傳：版型由 DemoPage 提供，這一層存在的意義是讓所有元件頁在路由上
// 成為一組，日後若要加共用的 breadcrumb 或側邊元件清單，改這裡即可。
export default function ComponentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>
}
