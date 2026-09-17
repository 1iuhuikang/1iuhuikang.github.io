---
title: Natas 1–10
description: OverTheWire Natas Web 安全基础靶场记录。
pubDate: 2023-03-08
type: oscp
platform: OverTheWire
 tags: []
---

## Natas

原博客将 Natas 作为 Web 安全基础靶场进行记录。

## Natas 0

第一关直接查看页面源码即可发现密码。

```html
<!-- password is exposed in the HTML source -->
```

## Natas 1

限制右键并不影响通过开发者工具查看页面源码。

## Natas 2

页面中存在文件目录线索，继续枚举可发现 `/files` 目录及其中的用户信息。

## Natas 3

查看 `robots.txt`：

```text
User-agent: *
Disallow: /s3cr3t/
```

## Natas 4

根据题目提示修改 HTTP Referer，使请求看起来来自允许的来源。

## 迁移说明

原文章包含 Natas 1–10 的连续解题记录。本次先保留已经确认的核心内容；后续如果恢复到更完整的原始 Markdown，将逐关补齐，而不凭记忆重写历史记录。
