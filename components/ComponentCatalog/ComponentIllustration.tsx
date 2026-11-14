import { appPath } from "@/lib/app-path"
import { componentIllustrations } from "@/lib/component-illustrations.generated"

export function ComponentIllustration({ slug }: { slug: string }) {
  const illustration = componentIllustrations[slug]
  if (!illustration) return null
  return <img src={appPath(illustration.src)} alt={illustration.alt} width={112} height={88} loading="lazy" decoding="async" className="h-48 w-64 shrink-0 rounded-8 object-contain tablet:h-64 tablet:w-80" />
}
