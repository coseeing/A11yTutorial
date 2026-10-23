import { Container } from "@/components/Container/Container"
import { Button } from "@/components/Button/Button"
import { Card } from "@/components/Card/Card"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { appPath } from "@/lib/app-path"
import { publishedComponents } from "@/lib/components-registry"

export default function HomePage() {
  // 只列出已完成的元件。21 個目前全部完成，但這一層保留著：新增元件時若先進了
  // registry、頁面還沒建好，列出去就是一個 404 的入口。
  const components = publishedComponents()

  return (
    <>
      <PageHeader title="A11y Tutorial" />
      <Container as="section" className="pt-48 desktop:pt-60">
        <h2 className="typography-headline3 m-0 mb-24 text-teal-700">檢測練習</h2>
        <Card padded>
          <div className="flex flex-col gap-20 tablet:flex-row tablet:items-center tablet:justify-between">
            <div>
              <h3 className="typography-headline4 m-0 mb-8 text-teal-700">無障礙檢測練習</h3>
              <p className="typography-body1 m-0 text-teal-300">使用志工活動報名頁，練習觀察網頁上的無障礙資訊。</p>
            </div>
            <Button href={appPath("/test-demo/")} variant="small" theme="light" className="shrink-0 self-start tablet:self-center">
              開始檢測練習
            </Button>
          </div>
        </Card>
      </Container>
      <Container as="section" className="py-48 desktop:py-60">
        <h2 className="typography-headline3 m-0 mb-24 text-teal-700">元件清單</h2>
        <ul className="m-0 grid list-none gap-24 p-0 tablet:grid-cols-2 desktop:grid-cols-3">
          {components.map((component) => (
            <li key={component.slug}>
              <a
                href={appPath(`/${component.slug}`)}
                className="flex h-full items-center rounded-24 border border-bg-warm-gray bg-neutral-white p-24 no-underline transition-colors hover:bg-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
              >
                <h3 className="typography-headline4 m-0 text-teal-700">{component.name}</h3>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
