import { getDocuments } from './docs/utils'

export const baseUrl = 'https://portfolio-blog-starter.vercel.app'

export default async function sitemap() {
  let docs = getDocuments().map((post) => ({
    url: `${baseUrl}/document/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ['', '/document'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...docs]
}
