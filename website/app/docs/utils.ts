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
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/
  let match = frontmatterRegex.exec(fileContent)
  if (!match) {
    throw new Error('Invalid frontmatter: missing --- block')
  }
  let frontMatterBlock = match[1]
  let content = fileContent.replace(frontmatterRegex, '').trim()
  let frontMatterLines = frontMatterBlock.trim().split('\n')
  let metadata: Partial<Metadata> = {}

  frontMatterLines.forEach((line) => {
    let colonIndex = line.indexOf(':')
    let key = line.slice(0, colonIndex).trim()
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

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx')
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, 'utf-8')
  return parseFrontmatter(rawContent)
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir)
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file))
    let slug = path.basename(file, path.extname(file))

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

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let diffDays = Math.floor((currentDate.getTime() - targetDate.getTime()) / 86400000)

  let formattedDate = ''

  if (diffDays < 1) {
    formattedDate = 'Today'
  } else if (diffDays < 30) {
    formattedDate = `${diffDays}d ago`
  } else if (diffDays < 365) {
    formattedDate = `${Math.floor(diffDays / 30)}mo ago`
  } else {
    formattedDate = `${Math.floor(diffDays / 365)}y ago`
  }

  let fullDate = targetDate.toLocaleString('en-us', {
    month: 'short', // possible values: 'long', 'short'
    day: 'numeric',
    year: 'numeric',
  })

  if (!includeRelative) {
    return fullDate
  }

  return `${fullDate} (${formattedDate})`
}
    
