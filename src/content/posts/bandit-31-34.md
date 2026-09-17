---
title: Bandit 31–34
description: OverTheWire Bandit 31–34：Git 提交、隐藏分支与最终关卡。
pubDate: 2023-03-03
type: oscp
platform: OverTheWire
tags: [bandit, linux, git]
legacyPath: /2023/03/03/bandit-31-34/
migrated: true
---

## Bandit 31

clone 仓库并阅读 README。题目要求创建指定文件、提交并 push：

```bash
git clone ssh://bandit31-git@localhost:2220/home/bandit31-git/repo
cd repo
touch key.txt
git add key.txt
git commit -m 'add key'
git push origin master
```

按照 README 中的要求写入文件内容后再提交。

## Bandit 32

登录后进入特殊 shell。常见命令会被转换处理，可以利用环境变量或 shell 内置变量恢复普通 shell：

```bash
$0
```

进入普通 shell 后读取下一关凭据。

## Bandit 33

这是 Bandit 最后一关。登录后查看 home 目录和提示文件：

```bash
ls -la
cat README.txt
```

这一关主要是回顾前面使用过的 Linux、SSH、权限和文件操作技巧。

## Bandit 34

历史版本中的最终关卡为无额外题目的收尾关。进入后检查目录即可确认没有继续的 challenge。

---

Bandit 系列的核心能力集中在 Linux 文件处理、权限、网络服务、SSH、cron 和 Git。后续 OSCP 练习可以把这些命令进一步抽象成自己的枚举与利用清单。
