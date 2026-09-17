---
title: Bandit 21–30
description: OverTheWire Bandit 21–30：定时任务、脚本审计、Git 与隐藏信息。
pubDate: 2023-03-02
type: oscp
platform: OverTheWire
tags: [bandit, linux, cron, git]
legacyPath: /2023/03/02/bandit-21-30/
migrated: true
---

## Bandit 21

检查 `/etc/cron.d/` 找到自动执行的任务：

```bash
cat /etc/cron.d/cronjob_bandit22
cat /usr/bin/cronjob_bandit22.sh
```

跟踪脚本写入的临时文件，读取其中的下一关密码。

## Bandit 22

继续分析 cron 脚本。脚本通常根据用户名计算临时文件名；直接阅读脚本并复现其命名逻辑，然后读取对应文件。

```bash
cat /usr/bin/cronjob_bandit23.sh
```

## Bandit 23

该关的 cron 脚本会执行 `/var/spool/$myname/foo` 中的内容。重点是利用脚本自身的执行权限，把下一关密码复制到当前用户可读取的位置。

```bash
cat /usr/bin/cronjob_bandit23.sh
```

在 `/tmp` 创建自己的脚本，等待 cron 执行后读取结果。

## Bandit 24

密码服务监听 30002，需要提交当前密码以及 4 位 PIN。可以用循环生成所有 10000 个 PIN：

```bash
for i in $(seq -w 0000 9999); do
  echo "<current-password> $i"
done | nc localhost 30002
```

## Bandit 25

目录中的 SSH 私钥用于登录 `bandit26`。但登录 shell 会强制退出。利用 `more`/终端窗口大小等方式获得交互 shell 后，启动一个可用的 shell：

```bash
ssh -i bandit26.sshkey bandit26@localhost -p 2220
```

进入受限环境后再执行 `/bin/bash`。

## Bandit 26

`bandit26` 的 shell 是一个脚本。读取脚本内容，重点关注其调用的 SUID 程序及参数。利用可控参数进入 shell，再读取：

```bash
cat /etc/bandit_pass/bandit27
```

## Bandit 27

Git 仓库可直接 clone：

```bash
git clone ssh://bandit27-git@localhost:2220/home/bandit27-git/repo
cd repo
cat README
```

## Bandit 28

同样 clone 仓库，但当前版本没有密码。检查提交历史：

```bash
git log --oneline --all
git show <commit>
```

历史提交中可以找到泄露的密码。

## Bandit 29

继续检查 Git 分支：

```bash
git branch -a
git log --all --oneline
```

切换到包含开发信息的分支：

```bash
git checkout dev
```

## Bandit 30

仓库中的 tag 可能包含隐藏信息：

```bash
git tag
 git show-ref --tags
 git show <tag>
```

找到 annotated tag 的内容即可获得下一关线索。
