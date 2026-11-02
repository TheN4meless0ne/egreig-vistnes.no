import type { MetadataRoute } from 'next'
import { getLocalDocuments } from './lib/content/localSource'
import { getSharePointItemsMetadataCached } from './lib/content/sharepointSource'
import { NAV_LINKS } from './lib/navigation'

// The canonical host. The other domains 308 here, so every URL in the sitemap
// and in metadata (layout.tsx imports this for metadataBase and Open Graph)
// must use it.
export const baseUrl = 'https://www.egreig-vistnes.no'

// Which listing each SharePoint library's detail pages live under.
const SHAREPOINT_LIBRARIES = [
  { key: 'Documents', basePath: '/docs' },
  { key: 'Projects', basePath: '/docs' },
  { key: 'Resources', basePath: '/resources' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = NAV_LINKS.map((link) => ({
    url: `${baseUrl}${link.destination === '/' ? '' : link.destination}`,
  }))

  const localDocs = getLocalDocuments().map((doc) => ({
    url: `${baseUrl}/docs/${doc.slug}`,
    lastModified: doc.date,
  }))

  // Cached metadata, so generating the sitemap doesn't wait on the backend.
  // If the backend is down these are empty and the sitemap still lists the
  // pages and local docs.
  const sharePoint = await Promise.all(
    SHAREPOINT_LIBRARIES.map(async ({ key, basePath }) =>
      (await getSharePointItemsMetadataCached(key)).map((item) => ({
        url: `${baseUrl}${basePath}/${item.slug}`,
        lastModified: item.date,
      }))
    )
  )

  return [...pages, ...localDocs, ...sharePoint.flat()]
}
