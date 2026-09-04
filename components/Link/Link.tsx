"use client"

import { usePathname } from "next/navigation"
import { appBasePath } from "@/lib/app-path"

type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  id?: string
  href: string
}

export function Link({ id, href, children, ...props }: LinkProps) {
  const path = usePathname() ?? ""
  const normalizedPath = withAppBasePath(path).replace(/\/$/, "")
  const normalizedHref = href.replace(/\/$/, "")
  const isSelected = normalizedPath === normalizedHref

  return (
    <a
      {...(id ? { id } : {})}
      href={href}
      aria-current={isSelected ? "page" : undefined}
      {...props}
    >
      {children}
    </a>
  )
}

function withAppBasePath(path: string) {
  return path.startsWith(appBasePath) ? path : `${appBasePath}${path}`
}
