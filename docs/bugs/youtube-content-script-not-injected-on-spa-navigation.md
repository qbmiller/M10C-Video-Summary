# Bug: YouTube Content Script Not Injected on SPA Navigation

**Status:** Fixed  
**Date:** 2026-05-31  
**Affected File:** `entrypoints/youtube-subtitle.content.tsx`

---

## Description

When navigating to a YouTube watch page from a non-watch page (homepage, search results, channel page, etc.) by clicking a video link, the content script is **not injected** and the subtitle panel never appears. The user has to either:

1. Refresh the page manually after navigating to the watch page, or
2. Directly open `youtube.com/watch?v=...` in the address bar

The Bilibili content script does **not** have this issue because Bilibili's video page navigation typically triggers a full page reload.

---

## Root Cause

YouTube is a Single-Page Application (SPA). Clicking a video from the homepage or search results triggers a client-side navigation using the History API (`pushState`) — the browser does **not** reload the page.

The content script `matches` was set to:

```ts
matches: ["https://www.youtube.com/watch*"]
```

Chrome only injects a content script when a tab's URL matches at the time of navigation (i.e., page load). Since the user first lands on `youtube.com` (or `youtube.com/results?...`), which does **not** match `watch*`, the script is never injected. The subsequent SPA navigation to `youtube.com/watch?v=xxx` does not re-trigger injection.

In contrast, Bilibili's `bilibili.com/video/BV...` pages are loaded as full navigations, so the content script matching `https://www.bilibili.com/video/*` is correctly injected every time.

---

## Fix

Changed `matches` in `defineContentScript` from `watch*` to `*` to cover all YouTube pages:

```ts
// Before
matches: ["https://www.youtube.com/watch*"]

// After
matches: ["https://www.youtube.com/*"]
```

With the script now injected on all YouTube pages, the existing URL polling interval (`setInterval(checkUrlChange, 1000)`) detects when the URL transitions to a watch page and triggers `loadVideoSubtitles` accordingly.

---

## Why Bilibili Works Without This Fix

Bilibili's navigation model differs:

- `bilibili.com/video/BV...` pages are **full page reloads**, so the content script is re-injected correctly on every visit.
- YouTube uses the History API for all in-site navigation, meaning the page is never actually "loaded" from the browser's perspective after the first visit.

---

## Related Files

- [`entrypoints/youtube-subtitle.content.tsx`](../entrypoints/youtube-subtitle.content.tsx)
- [`entrypoints/bilibili-subtitle.content.tsx`](../entrypoints/bilibili-subtitle.content.tsx)
- [`wxt.config.ts`](../wxt.config.ts)
