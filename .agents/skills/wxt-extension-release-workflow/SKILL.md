---
name: WXT Extension Release Workflow
description: A complete step-by-step workflow for upgrading the extension version, documenting updates in CHANGELOG.md, packaging the extension for Chrome and Firefox, and submitting the release to both web stores in a single workflow.
---

# WXT Extension Release Workflow

This skill outlines the standard, unified workflow to release a new version of the extension to both the **Chrome Web Store** and the **Firefox Addon Store** simultaneously.

## 1. Version Bumping
Before releasing, determine the appropriate semantic version bump (Major, Minor, or Patch) based on the changes made, and update it:

1. Open [package.json](file:///Users/darksouls/projects/m10c/package.json).
2. Locate the `"version"` field:
   ```json
   "version": "3.1.0"
   ```
3. Increment the version accordingly and save the file.

## 2. Update the Changelog
Document all notable changes under the new version in [CHANGELOG.md](file:///Users/darksouls/projects/m10c/CHANGELOG.md).

1. Add a new section at the top of the file, right below `# Changelog` and the introduction:
   ```markdown
   ## [X.Y.Z] - YYYY-MM-DD

   ### Added
   - Description of new features...

   ### Fixed / Refactored
   - Description of bug fixes or enhancements...
   ```
2. Follow semantic labeling (`Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`) and ensure a clean separator `---` between releases.

## 3. Package and Zip the Extension
WXT packages the extension separately for Chromium (MV3) and Firefox (MV2). Mozilla also strictly requires uploading the source code for bundled extensions.

1. **Build for Chrome**:
   ```bash
   pnpm run zip
   ```
   This compiles the project and generates `.output/m10c-video-summary-extension-<version>-chrome.zip`.

2. **Build for Firefox**:
   ```bash
   pnpm run zip:firefox
   ```
   This compiles the Firefox version and generates:
   - The extension zip: `.output/m10c-video-summary-extension-<version>-firefox.zip`
   - The sources zip: `.output/m10c-video-summary-extension-<version>-sources.zip`

Verify that all three files are successfully generated in the `.output/` directory before proceeding.

## 4. Multi-Store Submission
Use the unified WXT submit tool to upload the zip packages to both the Chrome Web Store and the Firefox Addon Store in parallel.

1. Ensure the submission secrets are set in `.env.submit` (never commit this file to git).
2. Run the submission command:
   ```bash
   pnpm wxt submit \
     --chrome-zip .output/m10c-video-summary-extension-<version>-chrome.zip \
     --firefox-zip .output/m10c-video-summary-extension-<version>-firefox.zip \
     --firefox-sources-zip .output/m10c-video-summary-extension-<version>-sources.zip
   ```

WXT will automatically read `.env.submit` to acquire tokens, upload both files in parallel, wait for Firefox validation (verifying `0 errors`), and submit the updates for store review.
