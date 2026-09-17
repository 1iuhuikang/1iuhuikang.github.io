---
title: Frida安装
description: Frida host 与 Android server 安装和基础验证记录。
pubDate: 2023-09-14
type: research
tags:
  - frida
  - android
  - mobile-security
legacyPath: /2023/09/14/Frida安装/
migrated: true
---

## Frida

实用工具，分为测试手机上的 server 端和电脑端。

### 电脑端安装

首先安装 Frida 模块：

```bash
pip install frida
pip install frida-tools
```

查看安装版本号：

```bash
frida --version
```

### Android Server

来到 Frida 官方 releases 页面下载对应版本的手机端。安卓手机大部分选择 arm64，可使用 `getprop` 确认架构。

下载并解压后推送到手机：

```bash
adb push xxx /data/local/tmp
adb shell
su
cd /data/local/tmp
chmod 777 xxx
ls -la
./xxx

# 切回电脑，查看手机端 App 及 PID
frida-ps -U
```

> 迁移说明：以上内容来自当前重构分支中已经确认的旧文章记录，后续再补充原文截图和更完整的环境信息。
