SHELL := /bin/sh

PACKAGE_NAME := $(shell node -p "require('./package.json').name")
VERSION := $(shell node -p "require('./package.json').version")
CHROME_DIR := $(CURDIR)/.output/chrome-mv3
CHROME_ZIP := $(CURDIR)/.output/$(PACKAGE_NAME)-$(VERSION)-chrome.zip

.PHONY: build

build:
	pnpm run zip
	@test -f "$(CHROME_DIR)/manifest.json" || { echo "缺少 Chrome 扩展目录：$(CHROME_DIR)"; exit 1; }
	@test -f "$(CHROME_ZIP)" || { echo "缺少 Chrome 安装包：$(CHROME_ZIP)"; exit 1; }
	@echo "Chrome 扩展目录：$(CHROME_DIR)"
	@echo "Chrome ZIP 安装包：$(CHROME_ZIP)"
	@du -h "$(CHROME_ZIP)" | awk '{ print "ZIP 大小：" $$1 }'
