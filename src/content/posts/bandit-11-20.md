---
title: Bandit 11–20
description: OverTheWire Bandit 11–20：编码、SSH、网络服务与私钥。
pubDate: 2023-03-01
type: oscp
platform: OverTheWire
tags: [bandit, linux, ssh, networking]
legacyPath: /2023/03/01/bandit-11-20/
migrated: true
---

## Bandit 11

文件使用 ROT13：

```bash
cat data.txt | tr 'A-Za-z' 'N-ZA-Mn-za-m'
```

## Bandit 12

先把 hexdump 还原，再根据 `file` 的结果逐层解包：

```bash
xxd -r data.txt > data.bin
file data.bin
# 按识别结果使用 gzip / bzip2 / tar 逐层处理
```

## Bandit 13

使用目录中的 SSH 私钥登录下一用户：

```bash
chmod 600 sshkey.private
ssh -i sshkey.private bandit14@localhost -p 2220
```

## Bandit 14

把当前密码提交到本机 30000 端口：

```bash
cat /etc/bandit_pass/bandit14 | nc localhost 30000
```

## Bandit 15

使用 TLS 客户端连接 30001：

```bash
openssl s_client -connect localhost:30001
```

## Bandit 16

扫描 31000–32000，定位 SSL 服务：

```bash
nmap -sV localhost -p31000-32000
openssl s_client -connect localhost:31790
```

返回 SSH 私钥后保存并登录 `bandit17`：

```bash
chmod 600 key
ssh -i key bandit17@localhost -p 2220
```

## Bandit 17

比较两个密码文件：

```bash
diff passwords.old passwords.new
```

变化行即下一关密码。

## Bandit 18

登录 shell 会退出，直接执行远程命令：

```bash
ssh bandit18@bandit.labs.overthewire.org -p 2220 'cat readme'
```

## Bandit 19

利用带 SUID 权限的 `bandit20-do`：

```bash
./bandit20-do cat /etc/bandit_pass/bandit20
```

## Bandit 20

`suconnect` 会连接本地端口并验证收到的密码。启动监听后执行：

```bash
nc -l 30000
./suconnect 30000
```

把当前密码发送给监听端口即可完成验证。
