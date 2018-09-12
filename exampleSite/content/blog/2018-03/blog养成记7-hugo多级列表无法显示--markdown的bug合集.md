---
date: "2018-03-20T16:46:17+08:00"
draft: false
title: "Blog养成记(7) Hugo多级列表无法显示? —— Markdown的bug合集"
tags: ["hugo", "markdown", "nested list", "bug", "blog", "typora"]
series: ["Blog养成记"]
categories: ["杂技浅尝"]
toc: true
---

## 前言

又一次开始折腾Markdown了，不过这一次是因为好好的md文件，在typora中显示的好好的，但在Hugo渲染后格式就不对了，引起我这次探究主要问题在多级列表。考虑到毕竟两个软件的markdown渲染引擎不同，我并没有用到很特别的语法。之前在引用上也碰到了问题，typora中能很好地识别我想要的引用段落，但是Hugo不行。所以这次探究下是哪里出了问题，以及对应的解决方案。

既然已经提到了markdown，在针对问题之前也记录下现在hugo的markdown解析引擎。Markdown解析器有很多，最广泛应用的是GitHub Flavored Markdown的解析器(GFM)，基于[CommonMark](http://commonmark.org/)进行了拓展。Hugo现在默认使用Blackfriday作为Markdown解析引擎，只要日志文件是以`.md`或者`.markdown`结尾即可，可以参考[这里](https://gohugo.io/getting-started/configuration/#blackfriday-options)在配置文件中配置相关参数。除了Blackfriday这个使用最广泛的引擎之外，hugo还支持[mmark](https://github.com/miekg/mmark)，mmark是一个基于Blackfriday之上增加了更多拓展语法的解析器。有两种方式可以声明使用mmark，一种是日志文件以`.mmark`结尾，另一种在日志文件的头部增加`markup: mmark`声明使用mmark进行解析。

<hr>

## 问题列表

以下是问题列表：

1. 无序列表的多级列表无法显示层级，即应表现为:

    > * have a try
    >     * first
    >     * second
    >         * another

    却表现为(空心应为实心)：

    > * have a try
    >     * first
    >     * second
    >     * another


2. 有序列表下的无序列表表现为有序列表，即应表现为:

    > 1. have a try
    >     * first
    >     * second

    却表现为：

    > 1. have a try
    >     1. first
    >     2. second


3. 引用中的代码段无法识别正确结束位置，即应表现为:

    >  > In the quote
    >  > ```shell
    >  $ This is code fence
    >  ```
    >  
    >  Out the quote
    >  ```shell
    >  $ Another code fence
    >  ```

    却表现为：

    >  > In the quote
    >  > ```shell
    >  > $ This is code fence
    >  > ```
    >  
    >  Out the quote
    >  ```shell
    >  $ Another code fence
    >  ```


## 问题定位&解决方案

1. 无序列表的多级列表无法显示层级

    使用BlackFriday。  
    这个问题可以拆分为两个问题，一是无法显示多级列表，二是无序列表的多级标签都为小黑点。
    对于前者，无法显示多级列表一般是因为段落前的空格不够，如果2个空格无法使markdown渲染器认为是新的层级，就改为4个空格。  
    对于第二个问题，受[这个解答](https://discourse.gohugo.io/t/markdown-nested-list-renders-flat-solved/6392)提示，发现是cocoa这个主题的css设置。在`static/css/override.css`中增加：
    ```css
    /* Nested Unordered List */

    section.main .content .markdown ul > li {
        list-style-type: disc;
    }

    section.main .content .markdown ul > li > ul > li {
        list-style-type: circle;
    }

    section.main .content .markdown ul > li > ul > li > ul > li {
        list-style-type: square;
    }
    ```


2. 有序列表下的无序列表表现为有序列表

    使用BlackFriday。  
    这个问题也可以通过css设置解决。在`static/css/override.css`中增加：
    ```css
    /* Mix List */

    section.main .content .markdown ul > li > ol > li {
        list-style-type: decimal;
    }
  
    section.main .content .markdown ol > li > ul > li {
        list-style-type: disc;
    }

    section.main .content .markdown ol > li > ul > li > ul > li {
        list-style-type: circle;
    }
    ```


3. 引用中的代码段无法识别正确结束位置

    这个主要是由于对于引用的格式不同造成的，如果引用中包含code fence，只需要在code fence的第一行加上引用标识符就可以，第二行开始不用增加。样例中正确显式的代码如下：

    ````
    In the quote   
    > ```shell   
    $ This is code fence    
    ```  
     
    Out the quote    
    ```shell        
     $ Another code fence
    ```     

    ````

# Heading level 1
## Heading level 2
### Heading level 3
#### Heading level 4
##### Heading level 5
###### Heading level 6   

I just love **bold text**.
I just love __bold text__.
Love**is**bold

Italicized text is the *cat's meow*.
Italicized text is the _cat's meow_.
A*cat*meow

This text is ***really important***.
This text is ___really important___.
This text is __*really important*__.
This text is **_really important_**.


> Dorothy followed her through many of the beautiful rooms in her castle.

> Dorothy followed her through many of the beautiful rooms in her castle.
>
> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

<hr>

> Dorothy followed her through many of the beautiful rooms in her castle.
>
>> The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

PPP

> #### The quarterly results look great!
>
> - Revenue was off the chart.
> - Profits were higher than ever.
>
>  *Everything* is going according to **plan**.



1. First item
2. Second item
3. Third item
4. Fourth item

PS Go

1. First item
1. Second item
1. Third item
1. Fourth item

FFF

1. First item
8. Second item
3. Third item
5. Fourth item

DDD

1. First item
2. Second item
3. Third item
    1. Indented item
    2. Indented item
4. Fourth item

GGG

- First item 
- Second item 
- Third item 
- Fourth item 

DDD


+ First item
* Second item
- Third item
+ Fourth item

FFF

- First item
- Second item
- Third item
    - Indented item
    - Indented item
        - Test 3
            - Test 4
- Fourth item

DDD

*   This is the first list item.
*   Here's the second list item.

    I need to add another paragraph below the second list item.

*   And here's the third list item.

DDD


*   This is the first list item.
*   Here's the second list item.

    > A blockquote would look great below the second list item.

*   And here's the third list item.


``Use `code` in your Markdown file.``



- [ ] a task list item
- [ ] list syntax required
- [ ] incomplete
- [x] completed



## Resource资源链接汇总

我建立的docker for Hugo开发镜像:  [Docker Hub上的repo](https://hub.docker.com/r/orianna/hugo-docker-dev/)、[Github上的repo](https://github.com/orianna-zzo/hugo-docker-dev)。  
我的个人主页Hugo代码:  [blog-hugo](https://github.com/orianna-zzo/blog-hugo)  

[CommonMark](http://commonmark.org/)、[GitHub Flavored Markdown Spec](https://github.github.com/gfm/)、[mmark github](https://github.com/miekg/mmark)、[Blackfriday配置](https://gohugo.io/getting-started/configuration/#blackfriday-options)



## 版本控制

| Version | Action | Time       |
| ------- | ------ | ---------- |
| 1.0     | Init  Q1~Q3 | 2018-03-20 |