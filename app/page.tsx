import { Container } from "@/components/Container/Container"
import { PageHeader } from "@/components/PageHeader/PageHeader"
import { Tag } from "@/components/Tag/Tag"
import { COMPONENTS, STATUS_LABEL } from "@/lib/components-registry"

export default function HomePage() {
  return (
    <>
      <PageHeader
        title="A11y Tutorial"
      />
      <Container as="section" className="py-48 desktop:py-60">
        <h2 className="typography-headline3 m-0 mb-24 text-teal-700">元件清單</h2>
        <ul className="m-0 grid list-none gap-24 p-0 tablet:grid-cols-2 desktop:grid-cols-3">
          {COMPONENTS.map((component) => (
            <li key={component.slug}>
              <a
                href={`/${component.slug}`}
                className="flex h-full flex-col gap-12 rounded-24 border border-bg-warm-gray bg-neutral-white p-24 no-underline transition-colors hover:bg-bg-light-off-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-PRIMARY"
              >
                <div className="flex items-center justify-between gap-12">
                  <h3 className="typography-headline4 m-0 text-teal-700">{component.name}</h3>
                  <Tag>{STATUS_LABEL[component.status]}</Tag>
                </div>
                <p className="typography-body2 m-0 text-teal-300">{component.summary}</p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </>
  )
}
