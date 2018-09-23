---
date: "2018-01-30T20:21:13+08:00"
draft: false 
title: "Mac小白探索记(2) Finder设置"
tags: ["mac"]
series: ["Mac小白探索记"]
categories: ["杂技浅尝"]
toc: true
---

Finder是mac的资源管理器，它的使用和配置与Windows区别还是挺多。习惯了Windows的使用使得Finder使用总觉得有些不便。配置好Finder能很大幅度提高我们的工作效率。

我会从遇到的问题着手，查找可以解决问题提高效率的解决方案。

## Finder显示设置

### 显示隐藏文件夹

Mac系统Finder中的 `/usr`、`/etc`等文件夹都是隐藏文件，如果不进行设置用户是无法见到的。估计是因为mac用户并不是所有人都对linux的操作十分熟悉，所以把这些对于系统十分重要的文件夹都进行隐藏了，免得用户误删等操作把系统玩坏。

在terminal中输入下面命令：


```shell
$ defaults write com.apple.finder AppleShowAllFiles -bool true
```

然后重启Finder，在terminal 中输入：

```shell
$ killall Finder
```

当当当当，隐藏的文件夹就显示出来了！

### 显示工具栏

选择 ⌈显示⌋ > ⌈显示标签页栏⌋、⌈显示路径栏⌋、⌈显示边栏⌋、⌈显示预览⌋。

{{% center %}}<img name="Finder-view" src="/images/series/Mac小白探索记/2/finder-view.jpg" width='250px'/>{{% /center %}}

对工具栏自定义：⌈显示⌋ > ⌈自定义工具栏⌋，增加⌈新建文件夹⌋，或者还可以添加其他想要添加工具栏。

{{% center %}}<img name="Finder-toolbox" src="/images/series/Mac小白探索记/2/finder-toolbox.jpg"  width='400px'/>{{% /center %}}

## 复制文件夹路径

直接快捷键 `⌘⌥C` 即可。

不过需要注意的是，如果有其他程序设置了相同的快捷键可能会导致无法复制。实践中我把Spectacle中把窗口放在中央的快捷键设置取消了，因为会冲突。

## 快速打开Terminal

其实这部分应该算是效率工具，但是更像是针对Finder路径这一问题的解决方案，因此放在这里了。

其实还可以打开Terminal打上`cd` 之后直接把文件夹拖进去，就会显示文件夹的路径，或者 `⌘⌥C` 复制路径到terminal，但是这样十分繁琐。

这里提供两个方案。方案一：设置快捷键，但是只能在上层文件夹中选择需要的路径的文件夹后才能打开Terminal。方案二：安装Go2Shell，可以在Finder的Toolbox中安装一个插件，非常方便。

### 方案一：设置快捷键

⌈系统偏好设置⌋ > ⌈键盘⌋ > ⌈快捷键⌋ > ⌈服务⌋ > ⌈新建位于文件夹位置的终端窗口⌋。

{{% center %}}<img name="open-terminal" src="/images/series/Mac小白探索记/2/open-terminal.jpg" width='400px'/>{{% /center %}}

这样在Finder中选中文件夹，双指右击，就可以在服务中看到打开终端的选项。

{{% img-no-border %}}{{% center %}}<img name="service-open-terminal" src="/images/series/Mac小白探索记/2/service-open-terminal.jpg"  width='400px'/>{{% /center %}}{{% /img-no-border %}}

还可以设置快捷键，我设置了 `⌘⌥⌃T`，选中文件夹后使用快捷键后即可快速打开终端。

### 方案二：安装Go2Shell

{{% img-no-border %}}<img name="Go2Shell" src="/images/series/Mac小白探索记/2/Go2Shell.jpg" width='100px'/>{{% /img-no-border %}}

相比方案一，这个还是要方便高效更多。注意不要通过App Store安装，无法使用，直接通过Homebrew安装：

```shell
$ brew cask install go2shell
```

安装后打开，点击⌈Install Go2Shell to Finder⌋

{{% center %}}<img name="go2shell-finder" src="/images/series/Mac小白探索记/2/go2shell-finder.jpg" width='250px'/>{{% /center %}}

然后就可以在Finder的工具栏发现Go2Shell的图标了。点击这个图标就会打开一个在当前文件夹的Terminal，很方便。

![go2shell-toolbox](/images/series/Mac小白探索记/2/go2shell-toolbox.jpg)

## 快速新建文件

打开terminal，并输入`touch xxx.txt`即可，不过有时还是会觉得打开terminal有些繁琐，不如windows右键新建文本文件快捷。

或者可以利用Automator来新建一个应用Applicstion。

{{% img-no-border %}}<img name="Automator" src="/images/series/Mac小白探索记/2/Automator.jpg" width='100px'/>{{% /img-no-border %}}

### 创建脚本

双击打开应用后选择⌈新建文档⌋。


{{% img-no-border %}}{{% center %}}<img name="new-application" src="/images/series/Mac小白探索记/2/new-application.jpg" width='400px'/>{{% /center %}}{{% /img-no-border %}}

选择新建⌈Application⌋。

{{% img-no-border %}}![application](/images/series/Mac小白探索记/2/application.jpg){{% /img-no-border %}}

选择⌈Run AppleScript⌋，双击后右侧会自动出现脚本模板。

{{% img-no-border %}}![run-script](/images/series/Mac小白探索记/2/run-script.jpg){{% /img-no-border %}}

新建文件代码如下：

```javascript
on run {input, parameters}

	tell application "Finder"
	set selection to make new file at (get insertion location)
	end tell

	return input
end run
```

按 `⌘S` 保存脚本，修改app名称和存放位置。 

{{% img-no-border %}}![save-script](/images/series/Mac小白探索记/2/save-script.jpg){{% /img-no-border %}}

### 修改图标

可以在[这里](https://www.iconfinder.com/icons/314924/add_document_icon#size=512)下载图标，双击打开图标图片，`⌘C` 复制图标。选中NewFile.app，按 `⌘I` 打开软件信息，点击左上角的图标，会有一圈蓝色光圈，然后按 `⌘V` 粘贴图标，图标修改完成。

{{% img-no-border %}}{{% center %}}<img name="change-icon" src="/images/series/Mac小白探索记/2/change-icon.jpg" width='300px'/>{{% /center %}}{{% /img-no-border %}}

### 添加至Finder工具栏

打开两个Finder窗口，平铺。打开⌈显示⌋ >⌈自定义工具栏⌋，将新建的NewFile.app图标拖到工具栏上。之后就可以直接在Finder窗口点击图标生成新的文件了，也可以使用spotlight使用NewFile新建文件。


{{% img-no-border %}}{{% center %}}<img name="add-app" src="/images/series/Mac小白探索记/2/add-app.jpg" width='400px'/>{{% /center %}}{{% /img-no-border %}}

## 版本控制

| Version | Action                   | Time       |
| ------- | ------------------------ | ---------- |
| 1.0     | Init                     | 2018-01-30 |
| 1.1     | Finder打开终端、复制路径 | 2018-02-14 |
| 1.2     | 新建文件                 | 2018-03-07 |