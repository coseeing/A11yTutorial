import { Container } from "@/components/Container/Container"
import { Button } from "@/components/Button/Button"
import { Card } from "@/components/Card/Card"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { ComponentCatalog } from "@/components/ComponentCatalog/ComponentCatalog"
import { componentCatalog } from "@/lib/component-catalog.generated"
import { appPath } from "@/lib/app-path"

export default function HomePage() {
  return (
    <>
      <PageHeader title="無障礙元件指南" className="desktop:py-60" />
      <Container as="section" className="pt-48 desktop:pt-60">
        <h2 className="typography-headline3 m-0 mb-24 text-teal-700">檢測練習</h2>
        <Card padded>
          <div className="flex flex-col gap-20 tablet:flex-row tablet:items-center tablet:justify-between">
            <div>
              <h3 className="typography-headline4 m-0 mb-8 text-teal-700">無障礙檢測練習</h3>
              <p className="typography-body1 m-0 text-teal-300">使用志工活動報名頁，練習觀察網頁上的無障礙資訊。</p>
            </div>
            <Button href={appPath("/test-demo/")} variant="small" theme="greenStroke" className="shrink-0 self-start tablet:self-center">開始檢測練習</Button>
          </div>
        </Card>
      </Container>
      <Container as="section" className="py-48 desktop:py-60">
        <ComponentCatalog entries={componentCatalog} />
      </Container>
    </>
  )
}
