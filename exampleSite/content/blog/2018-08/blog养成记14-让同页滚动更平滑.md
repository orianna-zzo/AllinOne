---
date: "2018-08-18T20:14:59+08:00"
publishdate: "2018-08-19+08:00"
lastmod: "2018-08-18+08:00"
draft: false
title: "Blog养成记(14) 让同页滚动更平滑"
tags: ["前端", "js", "blog"]
series: ["Blog养成记"]
categories: ["杂技浅尝"]
img: "images/blog/2018-08/test1.jpg"
toc: true
---

上一期说到增加toc侧边栏，但是直接跳转非常突兀，因此特地找了让同页跳转滚动更平滑的插件。
\<code\>


## 配置smooth-scroll插件

首先[下载smooth-scroll插件](https://github.com/kswedberg/jquery-smooth-scroll/releases)，将其中`jquery.smooth-scroll.js`放入`js`文件夹中。<!--more--> 

再在\<script>中引入该js：

```html
<script type="text/javascript" src="/js/vendors/jquery.smooth-scroll.js"></script>
```

## 基础使用

可以在自己的js文件中加入下面的代码

```js
// Bind the hashchange event listener
$(window).bind('hashchange', function (event) {
    $.smoothScroll({
        // Replace '#/' with '#' to go to the correct target
        scrollTarget: {{% bgstyle purple %}}decodeURI{{% /bgstyle %}}(location.hash.replace(/^\#\/?/, '#'))
    });
});

$('a[href*="#"]')
    .bind('click', function (event) {
        // Remove '#' from the hash.
        var hash = this.hash.replace(/^#/, '')
        if (this.pathname === location.pathname && hash) {
            event.preventDefault();
            // Change '#' (removed above) to '#/' so it doesn't jump without the smooth scrolling
            location.hash = '#/' + hash;
        }
    });

// Trigger hashchange event on page load if there is a hash in the URL.
if (location.hash) {
    $(window).trigger('hashchange');
}
```

上面的代码基本就可以直接使用了。它将`.smoothScroll`与`hashchange`进行绑定，将\<a\>的`href`的`hash`传入。

此外，`decodeURI`是为了解决中文url出现乱码导致的js问题。

smoothScroll可以设置网页偏移量，但是有一个问题不够灵活，如果我网站的网页偏移量不一致怎么办？

## 进一步传入offset

主要是将第一个与`hashchange`绑定的函数中增加一行：

```javascript

// Bind the hashchange event listener
$(window).bind('hashchange', function (event) {
    $.smoothScroll({
         {{% bgstyle purple %}}offset: $('body').attr('data-offset')? -$('body').attr('data-offset'):0 ,{{% /bgstyle %}}
        // Replace '#/' with '#' to go to the correct target
        scrollTarget: location.hash.replace(/^\#\/?/, '#')
    });
});

$('a[href*="#"]')
    .bind('click', function (event) {
        // Remove '#' from the hash.
        var hash = this.hash.replace(/^#/, '')
        if (this.pathname === location.pathname && hash) {
            event.preventDefault();
            // Change '#' (removed above) to '#/' so it doesn't jump without the smooth scrolling
            location.hash = '#/' + hash;
        }
    });

// Trigger hashchange event on page load if there is a hash in the URL.
if (location.hash) {
    $(window).trigger('hashchange');
}

```

这句话通过`body`标签找`data-offset`属性，将该属性中的值赋给smoothScroll，从而获得该网页的偏移量。

测试一下加一张图片

![test1](/images/blog/2018-08/test1.jpg)

## 版本控制

| Version | Action       | Time       |
| ------- | ------------ | ---------- |
| 1.0     | Init         | 2018-08-18 |
| 1.1     | 解决中文乱码 | 2018-08-25 |
