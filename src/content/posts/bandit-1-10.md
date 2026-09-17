---
title: Bandit 1–10
description: OverTheWire Bandit 1–10：Linux 命令行、文件枚举与编码基础。
pubDate: 2023-02-28
type: oscp
platform: OverTheWire
tags: [bandit, linux, fundamentals]
legacyPath: /2023/02/28/bandit-1-10/
migrated: true
---

## Bandit 0

密码在当前目录的 `readme`：

```bash
cat readme
```

## Bandit 1

文件名是 `-`。不要让 `cat` 把它当标准输入，可以显式指定路径：

```bash
cat ./-
```

## Bandit 2

文件名包含空格，使用转义或 Tab 补全：

```bash
cat ./spaces\ in\ this\ filename
```

## Bandit 3

密码在隐藏目录 `inhere` 中的隐藏文件：

```bash
find inhere -type f -name '.*' -exec cat {} \;
```

## Bandit 4

`inhere` 中有多个文件，其中一个是可读文本。批量检查类型：

```bash
file ./inhere/*
```

找到 ASCII 文本后直接读取。

## Bandit 5

寻找满足多个条件的文件：1033 bytes、非可执行文件：

```bash
find inhere -type f -size 1033c ! -executable -exec cat {} \;
```

## Bandit 6

在整个系统中查找属于 `bandit7:bandit6`、大小为 33 bytes 的文件，并忽略无权限错误：

```bash
find / -user bandit7 -group bandit6 -size 33c 2>/dev/null
```

## Bandit 7

密码与 `millionth` 在同一行：

```bash
grep millionth data.txt
```

## Bandit 8

密码是文件中唯一出现一次的行：

```bash
sort data.txt | uniq -u
```

## Bandit 9

文件包含二进制数据，使用 `strings` 提取可打印字符串，再过滤包含 `=` 的内容：

```bash
strings data.txt | grep '='
```

## Bandit 10

文件内容使用 Base64 编码：

```bash
base64 -d data.txt
```

---

这一组关卡主要训练 `cat`、`find`、`file`、`grep`、`sort`、`uniq`、`strings` 和 `base64` 等基础工具。后续 OSCP 枚举时，这些命令会反复出现。
