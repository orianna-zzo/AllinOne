---
date: "2018-08-13T00:14:19+08:00"
publishdate: "2018-08-13+08:00"
lastmod: "2018-08-13+08:00"
draft: false
title: "Blog养成记(11) 给网站加个小icon"
tags: ["前端", "css", "blog"]
series: ["Blog养成记"]
categories: ["杂技浅尝"]
img: "images/blog/2018-08/test5.jpg"
toc: true
summary: "我们经常看到百度等网页会有自己的网站图标，在浏览器打开时显示在左侧，那如何给自己的网站也添加这么一个icon呢？"
---

这部分其实很简单，只需要在`index.html`的`<head>`部分增加以下一句话就好：

```html
<link rel="shortcut icon" href="/img/aviconfile.ico" >
```

不过，既然是要做主题，肯定是要用模板变量的么。因此，在模板中的增加以下内容：

```html
<!-- Icon -->
<link rel="shortcut icon"
  {{ if .Site.Params.faviconfile }}
     href="/{{ .Site.Params.faviconfile }}"
  {{ else if.Site.Params.avatar}}
     href="/{{ .Site.Params.avatar }}"
  {{ end }}
>
```

其中`faviconfile`是在`config.toml`中定义的网站图标的路径，`avatar`是在其中定义的个人头像照片的路径。这句话就是如果定义了网站图标就使用网站图标，如果不存在网站图标就使用个人头像。

原本想尝试在网站图标上加个蒙版的，但是好像只能有已有的图片。方的一张图感觉太死板，于是我就将之前画画的签名截了一个姓下来抠了下图，感觉还不错。

## 版本控制

| Version | Action | Time       |
| ------- | ------ | ---------- |
| 1.0     | Init   | 2018-08-13 |

