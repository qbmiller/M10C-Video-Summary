interface StructuredSummary {
  summary?: unknown
  key_points?: unknown
  main_topics?: unknown
}

export interface BlogEditorDraft {
  version: 1
  content: string
  expiresAt: number
}

const BLOG_EDITOR_DRAFT_TTL_MS = 30 * 60 * 1000

export function buildSummaryClipboardText(
  summary: string,
  sourceUrl?: string
): string {
  const trimmedSummary = summary.trimEnd()
  const trimmedSourceUrl = sourceUrl?.trim()

  if (!trimmedSourceUrl) return trimmedSummary

  return `${trimmedSummary}\n\n原文地址：${trimmedSourceUrl}`
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((item): item is string => typeof item === "string")
}

function formatSummaryBody(rawSummary: string): string {
  const trimmed = rawSummary.trim()
  if (!trimmed) return ""

  try {
    const parsed = JSON.parse(trimmed) as StructuredSummary
    const summary = typeof parsed.summary === "string" ? parsed.summary.trim() : ""
    const keyPoints = asStringArray(parsed.key_points)
    const mainTopics = asStringArray(parsed.main_topics)
    const sections: string[] = []

    if (summary) sections.push(`## 内容摘要\n\n${summary}`)
    if (keyPoints.length > 0) {
      sections.push(`## 关键要点\n\n${keyPoints.map((item) => `- ${item}`).join("\n")}`)
    }
    if (mainTopics.length > 0) {
      sections.push(`## 主要话题\n\n${mainTopics.map((item) => `- ${item}`).join("\n")}`)
    }

    if (sections.length > 0) return sections.join("\n\n")
  } catch {
    // Existing summaries may already be Markdown or plain text.
  }

  return trimmed
}

export function buildBlogMarkdown({
  title,
  sourceUrl,
  summary,
  summarizedAt
}: {
  title: string
  sourceUrl: string
  summary: string
  summarizedAt: string
}): string {
  const displayTitle = title.trim() || "文章总结"
  const summaryBody = formatSummaryBody(summary)

  return [
    `# ${displayTitle}`,
    `> 来源：[${sourceUrl}](${sourceUrl})`,
    `> 总结时间：${summarizedAt}`,
    "---",
    summaryBody
  ]
    .filter(Boolean)
    .join("\n\n")
}

export function buildBlogEditorDraft({
  title,
  sourceUrl,
  summary,
  summarizedAt,
  now = Date.now()
}: {
  title: string
  sourceUrl: string
  summary: string
  summarizedAt: string
  now?: number
}): BlogEditorDraft {
  return {
    version: 1,
    content: buildBlogMarkdown({ title, sourceUrl, summary, summarizedAt }),
    expiresAt: now + BLOG_EDITOR_DRAFT_TTL_MS
  }
}

export function normalizeBlogOpenUrl(value: string): string {
  const url = new URL(value.trim())
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    throw new Error("Open URL 必须使用 HTTP 或 HTTPS")
  }
  return url.toString()
}
