# Configuration Import Export Implementation Plan

> **For Codex:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Export and restore all extension settings, including credentials and Prompts, through one versioned JSON file.

**Architecture:** A shared backup utility creates and validates a versioned envelope around `AIConfig`. Options downloads the envelope as JSON and imports a selected JSON file, then immediately persists and displays the restored configuration.

**Tech Stack:** WXT, React, TypeScript, browser Blob/File APIs, `@wxt-dev/storage`.

---

### Task 1: Backup format

1. Define the versioned single-file backup envelope.
2. Validate format, version, active provider, provider map, and optional configuration sections.
3. Preserve API keys and Blog tokens for complete restoration.

### Task 2: Options actions

1. Add Export Configuration and Import Configuration buttons.
2. Download a timestamped JSON backup.
3. Import, validate, apply defaults for missing Prompt fields, and persist immediately.
4. Display Chinese success/error and sensitive-file warnings.

### Task 3: Verify and package Chrome

1. Test backup round-trip with a sample configuration.
2. Run `pnpm compile`, `pnpm build`, and `pnpm zip`.

