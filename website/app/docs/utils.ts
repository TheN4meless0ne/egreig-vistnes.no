import fs from 'fs'
import path from 'path'

type Metadata = {
  title: string
  publishedAt: string
  summary: string
  image?: string
}

const REQUIRED_FIELDS: (keyof Metadata)[] = ['title', 'publishedAt', 'summary']

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  const match = frontmatterRegex.exec(fileContent)
  if (!match) {
    throw new Error('Invalid frontmatter: missing --- block')
  }
  const frontMatterBlock = match[1]
  const content = fileContent.replace(frontmatterRegex, '').trim()
  const frontMatterLines = frontMatterBlock.trim().split('\n')
  const metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    const colonIndex = line.indexOf(':')
    const key = line.slice(0, colonIndex).trim()
    let value = line.slice(colonIndex + 1).trim()
    value = value.replace(/^['"](.*)['"]$/, '$1') // Remove quotes
    metadata[key as keyof Metadata] = value
  })

  for (const field of REQUIRED_FIELDS) {
    if (!metadata[field]) {
      throw new Error(`Missing required frontmatter field "${field}"`)
    }
  }

  return { metadata: metadata as Metadata, content }
}

const SUPPORTED_EXTENSIONS = ['.mdx', '.md']

function getMDXFiles(dir) {
  if (!fs.existsSync(dir)) {
    return []
  }
  return fs
    .readdirSync(dir)
    .filter((file) => SUPPORTED_EXTENSIONS.includes(path.extname(file)))
}

function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  const mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file))
    const slug = path.basename(file, path.extname(file))

    return {
      metadata,
      slug,
      content,
    }
  })
}

export function getDocuments() {
  return getMDXData(path.join(process.cwd(), 'app', 'docs', 'files'))
}

// The actual implementation now lives in lib/content/format.ts, shared with
// SharePoint-sourced items. Re-exported here so any existing `from './utils'`
// imports keep working.
export { formatDate } from '../lib/content/format'
