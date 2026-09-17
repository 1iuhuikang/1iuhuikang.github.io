---
title: Bandit 1–10
description: Linux 命令行与文件处理基础练习。
pubDate: 2023-02-28
type: oscp
platform: OverTheWire
tags:
  - bandit
  - linux
  - fundamentals
legacyPath: /2023/02/28/bandit-1-10/
migrated: true
---

原博客的 Bandit 系列笔记，记录 Linux 命令行与文件处理基础。

## Bandit 0

密码存放在当前路径的 `readme` 中。

```bash
cat readme
```

## Bandit 1

密码在名为 `-` 的文件中，可以显式指定路径：

```bash
cat ~/-
cat < -
```

## Bandit 2

处理包含空格的文件名，使用转义或 Tab 补全：

```bash
cat spaces\ in\ this\ filename
```

## Bandit 3

隐藏文件通常以 `.` 开头：

```bash
ls -a
cat .hidden
```

## 迁移说明

原文章包含 Bandit 1–10 的连续解题记录。本次先迁移已经确认的正文结构；剩余关卡在恢复原始 Markdown 后再完整补齐。
