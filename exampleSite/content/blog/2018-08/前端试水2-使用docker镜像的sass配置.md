---
date: "2018-08-02T15:49:22+08:00"
publishdate: "2018-08-02"
lastmod: "2018-08-05"
draft: false
title: "前端试水(2) 使用docker镜像的Sass配置"
tags: ["前端", "sass", "docker", "环境配置", "css"]
series: ["前端试水"]
categories: ["杂技浅尝"]
toc: true
---

## 前言

半年前，由于终于将博客主题初版设计出来准备开始实施，在less和sass中纠结良久选择了sass。为了保持环境纯净性，想用docker装sass，用node-sass，试了几次中间都失败，无奈放弃。几乎半年后的今天，莫名又开始有搭建网页的欲望，于是又开始折腾。不过这次运气不错，终于折腾成功。

## Sass是什么

Sass 是一个 css的预编译器。它在css语法的基础上，引入了更多的变量、规则等功能，可以帮助css的组织结构变得更合理和优雅，或者说更像一门编程语言，从而提高开发和维护效率。通俗说，就是在css上再套层更结构化的语法，帮助对样式进行组织和管理，再通过编译得到最终的css样式。

与sass对标的是less，具体哪个更好对于初学者来说难以分辨和选择，但Bootstrap4抛弃了less转而选择sass和sass更大的社群都提供了选择了sass的理由。

### Sass选择

#### Sass vs Scss

Sass实际上有两种语法，针对不同的后缀名称`.sass`和`.scss`。

`.sass`是最早的语法，使用缩进而不是`{}`来表示嵌套，用换行而不是`;`来分隔属性，如下：

```sass
$font-stack:    Helvetica, sans-serif
$primary-color: #333

body
  font: 100% $font-stack
  color: $primary-color
```

另一种`.scss`的格式仅在css3的语法基础上进行扩展，如下：

```sass
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

对于码农来说，`.scss`相对更符合习惯一些，所以之后会选择后者。

#### Ruby Sass vs Libsass vs Dart Sass 

在官网最下方可以看到三个不同的Sass实现。

Ruby Sass是最早的Sass，网上很多资料都是基于ruby的，不过这个实现版本作者之后不会再更新维护了。

Libsass是使用C进行实现的版本，所以这个版本速度最快，Sassc就是在Libsass外套了一层wrapper。不过该版本的更新相对没有那么频繁和活跃，毕竟不是主要更新的实现版本。

Dart Sass是替代Ruby Sass的实现版本，也是现在最主要的开发版本，新的功能也会主要在该实现版本中先进行集成。

## 编译环境配置

估计很少有人像我这样折腾又莫名对一些点特别执着（或者说钻牛角尖）。当初一心想用docker把所有和开发环境配置相关的整理起来，折腾node-sass的dockerfile好久以失败告终。这次终于找到一个可以用的sass环境镜像，并根据此建立了自己的docker镜像，具体配置及使用方法在[Libsass Docker]({{< relref "#libsass-docker" >}})。但由于该镜像基于libsass，一些功能并没有集成（比如`--watch`），所以又基于dart sass生成一版镜像，具体方法在[Dart Sass Docker]({{< relref "#dart-sass-docker" >}})。

两种镜像的比较如下：

|                           | Libsass Docker | Dart Sass Docker |
| ------------------------- | -------------- | ---------------- |
| **Size**                  | 8.76MB         | 680MB            |
| **Writen in**             | C              | JS               |
| **Compiling Speed**       | Fast           | Normal           |
| **Integrated with JS**    | No             | Yes              |
| **Function**              | Limited        | Full             |
| **Update Feq & Priority** | Normal         | First Priority   |

### Libsass Docker

我建立了我自己的[sass镜像](https://hub.docker.com/r/orianna/libsass/)，对应的Dockerfile[在此](https://github.com/orianna-zzo/dockerfile-repo/tree/master/front-end-docker/sass-docker/libsass-docker)（参考了的[jbergknoff/sass](https://hub.docker.com/r/jbergknoff/sass/)），就内容上来说基本一致，都是使用的alpine为base image，都是使用sassc和libsass。有一些细节上的区别，但可能最大的区别就是我的镜像是新建的，sassc和libsass版本较新吧。该镜像一共才8.76MB。

在设立Dockerfile的时候纠结过是使用`ENTRYPOINT`还是`CMD`，但由于该镜像只用作Sass的编译，因此使用了前者。

#### Libsass Docker配置

首先需要获取镜像，打开终端输入：

```bash
$ docker pull orianna/libsass
```

然后就可以调用docker镜像来编译sass/scss了。为了简化操作，可以使用alias设置别名并保存。

配置需要写到配置文件，有两个选择：

- 对全部用户生效：修改 `/etc/profile`文件
- 对当前用户生效：修改 `~/.profile`文件 （仅针对Mac，linux大多数情况下修改 `~/.bashrc`）

我将用户自定义部分还是放入了`~/.profile`文件：

```bash
$ vi ~/.profile
```

增加以下内容，给起个别称 `libsass`，这样之后就可以将docker镜像当做本地命令使用了，非常方便：

```bash
# config alias
alias libsass="docker run -it --rm -v \$(pwd):/sass -v \$(pwd):/output orianna/libsass:latest"
```

记得source一下，使配置文件立即生效：

```bash
$ source ~/.profile
```

现在开始就可以直接使用 `libsass` 来启动sass的docker镜像了。

#### Libsass Docker使用方法

由于已经设置了alias，所以直接按以下方式即可编译sass/scss文件为css文件：

```bash
$ libsass ORIGIN.sass DEST.css
```

需要注意的是，工作目录为当前目录，所以基本就可以当做本地的命令执行了，很方便。

如果需要执行该容器中其他命令，则需要在docker命令中使用`--entrypoint`进行覆盖，方法如下：

```shell
$ docker run --name my-sass -it --rm --entrypoint sh orianna/libsass
```

### Dart Sass Docker

由于Sassc缺少一些功能，而最新最全的功能都会在Dart Sass上，因此又研究一下建一个dart-sass的镜像使用。[Dart Sass的github](https://github.com/sass/dart-sass)给了不少安装方法，本想在alpine上用standalone版的，但总是报错说找不到dart，于是直接用了node作为base image。想用node:alpine减少镜像的大小，但结果没有建成，所以现在镜像有680MB。

#### Dart Sass Docker配置

首先需要获取镜像，打开终端输入：

```bash
$ docker pull orianna/dart-sass
```

然后就可以调用docker镜像来编译sass/scss了。为了简化操作，可以使用alias设置别名并保存。

配置需要写到配置文件，有两个选择：

- 对全部用户生效：修改 `/etc/profile`文件
- 对当前用户生效：修改 `~/.profile`文件 （仅针对Mac，linux大多数情况下修改 `~/.bashrc`）

我将用户自定义部分还是放入了`~/.profile`文件：

```bash
$ vi ~/.profile
```

增加以下内容，给起个别称 `sass`，这样之后就可以将docker镜像当做本地命令使用了，非常方便：

```bash
# config alias
alias sass="docker run -it --rm -v \$(pwd):/sass -v \$(pwd):/output orianna/dart-sass:latest"
```

记得source一下，使配置文件立即生效：

```bash
$ source ~/.profile
```

现在开始就可以直接使用 `sass` 来启动sass的docker镜像了。

#### Dart Sass Docker使用方法

由于已经设置了alias，所以直接按以下方式即可编译sass/scss文件为css文件：

```bash
$ sass ORIGIN.sass DEST.css
```

需要注意的是，工作目录为当前目录，所以基本就可以当做本地的命令执行了，很方便。另外，尽管dart-sass已经集成了watch的功能，但我现在的镜像不知道为什么一用就卡在那里……

如果需要执行该容器中其他命令，则需要在docker命令中使用`--entrypoint`进行覆盖，方法如下：

```shell
$ docker run --name my-sass -it --rm --entrypoint sh orianna/dart-sass
```

## Resource资源链接汇总

我建立的docker for Sass开发镜像:  [Libsass docker镜像](https://hub.docker.com/r/orianna/libsass/)、[Dart Sass docker镜像](https://hub.docker.com/r/orianna/dart-sass/)、[Docker for Sass的Dockerfile](https://github.com/orianna-zzo/dockerfile-repo/tree/master/front-end-docker/sass-docker)。  

[Sass官网](http://sass-lang.com)、[Libsass的github](https://github.com/sass/libsass)、[Dart Sass的github](https://github.com/sass/dart-sass)

## 版本控制

| Version | Action | Time       |
| ------- | ------ | ---------- |
| 1.0     | Init   | 2018-08-02 |

