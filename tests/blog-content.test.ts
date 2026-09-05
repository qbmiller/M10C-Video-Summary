import assert from "node:assert/strict"
import test from "node:test"

import {
  buildBlogEditorDraft,
  buildSummaryClipboardText,
  normalizeBlogOpenUrl
} from "../utils/blog-content.ts"

test("复制摘要时在末尾追加原文地址", () => {
  assert.equal(
    buildSummaryClipboardText("## 摘要\n\n正文\n", " https://example.com/article "),
    "## 摘要\n\n正文\n\n原文地址：https://example.com/article"
  )
})

test("没有原文地址时保持摘要内容", () => {
  assert.equal(buildSummaryClipboardText("摘要正文\n", undefined), "摘要正文")
})

test("打开 Blog 编辑器时生成带有效期的 Markdown 草稿", () => {
  assert.deepEqual(
    buildBlogEditorDraft({
      title: " 测试文章 ",
      sourceUrl: "https://example.com/post",
      summary: "摘要正文",
      summarizedAt: "2026-09-05T10:00:00.000Z",
      now: 1_000
    }),
    {
      version: 1,
      content: [
        "# 测试文章",
        "> 来源：[https://example.com/post](https://example.com/post)",
        "> 总结时间：2026-09-05T10:00:00.000Z",
        "---",
        "摘要正文"
      ].join("\n\n"),
      expiresAt: 1_801_000
    }
  )
})

test("Open URL 只接受 HTTP 或 HTTPS 地址", () => {
  assert.equal(
    normalizeBlogOpenUrl(" https://www.xiaomi318.com/admin/write "),
    "https://www.xiaomi318.com/admin/write"
  )
  assert.throws(() => normalizeBlogOpenUrl("javascript:alert(1)"), /HTTP 或 HTTPS/)
})
