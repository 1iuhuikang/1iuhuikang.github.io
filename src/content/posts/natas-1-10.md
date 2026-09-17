---
title: Natas 1–10
description: OverTheWire Natas Web 安全基础：源码、认证、文件包含与命令注入。
pubDate: 2023-03-08
type: oscp
platform: OverTheWire
tags: [natas, web-security, linux]
legacyPath: /2023/03/08/natas-1-10/
migrated: true
---

## Natas 0

直接查看 HTML 源码即可发现密码：

```html
<!-- password is exposed in the HTML source -->
```

核心点：**不要只看浏览器渲染结果，要检查原始响应。**

## Natas 1

页面通过 JavaScript 禁用了右键，但这不是安全边界。直接使用开发者工具查看 DOM / Source 即可找到密码。

## Natas 2

查看源码发现 `/files/` 路径。继续枚举目录：

```text
/files/
```

其中暴露了包含密码的文件。核心点是发现**静态资源目录可被直接枚举**。

## Natas 3

查看 `robots.txt`：

```text
User-agent: *
Disallow: /s3cr3t/
```

访问被禁止索引的目录并继续寻找敏感文件。

## Natas 4

题目根据 HTTP `Referer` 判断来源。通过修改请求头，让请求看起来来自允许的站点：

```http
Referer: http://natas5.natas.labs.overthewire.org/
```

核心点：**Referer 是客户端可控输入，不能作为可靠的授权条件。**

## Natas 5

页面根据 Cookie `loggedin` 判断是否登录。检查响应中的 Cookie：

```http
Cookie: loggedin=0
```

将其修改为：

```http
Cookie: loggedin=1
```

重新请求即可观察认证逻辑的缺陷。

## Natas 6

源码中存在 `includes/secret.inc`，并且页面把用户提交的 `secret` 与服务端文件中的值比较。先查看源码并定位 include 文件，再提交正确的 secret。

```php
include "includes/secret.inc";
if ($secret == $_REQUEST['secret']) { ... }
```

核心点：**源码泄露会暴露认证逻辑和敏感配置的位置。**

## Natas 7

页面存在 `page` 参数，并通过文件包含读取内容。源码提示目标文件位于：

```text
/etc/natas_webpass/natas8
```

利用参数读取该文件，例如：

```text
?page=/etc/natas_webpass/natas8
```

这是典型的本地文件包含（LFI）问题。

## Natas 8

源码显示服务端会对输入进行编码，再与硬编码字符串比较。重点是逆向编码过程：

1. Base64 decode
2. 反转字符串
3. Hex decode

因此可以从源码中的 `encodedSecret` 还原原始 secret，再提交到参数中。

## Natas 9

源码把用户输入拼接进 `grep` 命令：

```php
passthru("grep -i $key dictionary.txt");
```

输入未经过安全的参数化处理，因此存在命令注入。测试时可以利用 shell 元字符让额外命令被执行，例如：

```text
; cat /etc/natas_webpass/natas10
```

核心点：**不要把用户输入直接拼接进 shell 命令；优先使用参数化 API。**

## Natas 10

这一关仍然使用 `grep`，但过滤了部分 shell 元字符。源码类似：

```php
passthru("grep -i $key dictionary.txt");
```

可以利用 `grep` 的参数/文件匹配行为让目标文件参与搜索，例如构造额外的文件参数，从 `/etc/natas_webpass/natas10` 中获得匹配内容。

这一关的重点不是简单重复上一关，而是理解：**黑名单过滤 shell 字符并不能把字符串拼接变成安全的命令执行接口。**

---

## 小结

Natas 0–10 涵盖了 Web 渗透中非常典型的入口：

- HTML / JavaScript 信息泄露
- 静态目录枚举
- `robots.txt` 信息泄露
- 可伪造 HTTP Header
- 可篡改 Cookie 的认证逻辑
- 源码与配置文件泄露
- LFI
- 编码逆向
- 命令注入
- 不可靠的黑名单过滤

这些基础问题可以直接映射到后续 Web 渗透测试中的信息收集、参数测试和输入验证检查。
