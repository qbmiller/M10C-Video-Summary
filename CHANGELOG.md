# Changelog

All notable changes to this project will be documented in this file.

## [3.1.2] - 2026-06-04

### Added
- **Panel Draggability**: Added dragging support for `SubtitlePanel` and `ArticlePanel` using a custom `useDraggable` hook. Includes viewport boundary constraints, persistent local storage of panel positions, and localized drag handle tooltips.
- **Localized Drag Tooltips**: Added translations for the drag button tooltip (`drag`) across multiple languages: English, Spanish, Japanese, Korean, Simplified Chinese, and Traditional Chinese.

---

## [3.1.1] - 2026-05-31

### Added
- **Login Status Polling**: Implemented periodic polling to detect and update the extension's login state after the user completes login on the website.
- **Badge Caching**: Cached the obtained m10c badge state locally in the extension to prevent repeated backend requests.

### Fixed
- **YouTube Title Sync**: Fixed the video title in the subtitle panel not updating when navigating between videos on YouTube.
- **YouTube Content Script Injection**: Fixed the content script failing to auto-inject on initial YouTube page load by updating the match pattern to support SPA navigation.

---

## [3.1.0] - 2026-05-29


### Added
- **Traditional Chinese & Korean Localization**: Full localization support (`zh_TW`, `ko`) added for all UI strings, subtitles, AI summaries, option menus, and error messages.

### Refactored
- **Root Node AI Prompt Optimization**: Refactored the core background prompt generation rules to guarantee that the generated mindmap's root node is always the actual topic of the video/article, strictly forbidding generic placeholders like "Root".

---

## [3.0.0] - 2026-05-09

### Added
- **Mind Elixir Built-in AI Provider**: Added Mind Elixir as a built-in AI provider with zero-configuration support. Users can now generate video summaries and mindmaps instantly without setting up personal third-party API keys (OpenAI, Gemini, Claude, etc.), falling back to a pre-configured OpenAI-compatible hosted model.
- **User Authentication**: Integrated Mind Elixir account login directly into the extension options page.
- **Star Balance Display**: Real-time display of user profile details and Star balance. Added features to manually refresh balance, log out, and easily navigate to recharge Stars on `app.mind-elixir.com`.

---

## [2.1.0] - 2026-05-04

### Added
- **SPA Navigation Support**: Implemented single-page application (SPA) navigation support for Bilibili and YouTube. Using interval-based URL polling and history tracking, the extension now reliably reloads content scripts when navigating between videos without a full page refresh.
- **Mindmap Generation Prompts**: Integrated the video title into AI prompts, ensuring the generated mindmap's root node and content are more contextually accurate.
- **Auto-scroll for Summary**: The SummaryDisplay component now automatically scrolls to the bottom as new content streams in.
- **Performance Optimization**: Introduced controlled tab states and force-mounted content for the MindmapDisplay to improve rendering speed and prevent state loss.

### Fixed
- **Reliable Title Retrieval**: Added a `waitForElement` utility to ensure the YouTube video title is correctly captured even if the page loads slowly.
- **Interaction Blocking**: Fixed an issue where the Download dropdown in the MindmapDisplay would block user interaction by setting `modal={false}` on the Radix UI component.
- **UI Polishing**: Removed an unwanted bottom margin from the quick action container in the popup interface.

---

## [2.0.0] - 2026-04-20

### Changed
- **Framework Migration**: Major architectural shift from Plasmo to the **WXT** framework for better build performance and cross-browser support.
- **UI Refactoring**: Complete overhaul of the component structure, unifying the design of the Mindmap and Summary displays.
- **Storage Implementation**: Updated the storage layer to use WXT's storage API for better reliability.
