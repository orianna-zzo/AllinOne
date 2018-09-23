---
date: "2018-01-30T15:04:48+08:00"
draft: false
title: "Mac小白探索记(1) 基本设置与常用软件"
tags: ["mac", "软件安装"]
series: ["Mac小白探索记"]
categories: ["杂技浅尝"]
toc: true
---



## 序

原本打算将所有相关内容只写在一篇博文里，但后面发现越加越多，内容越来越零散，最后决定进行拆分，也变为一个系列。我是2017年底才刚开始深入使用mac，算是mac小白一枚，在探索的过程中想将一些我觉得高效实用的信息记录下来，希望其他和我一样刚开始学习mac的小伙伴们能看了后有所帮助。

第一篇主要介绍新入手mac后的基本设置与常用软件安装。终于转到有terminal的电脑上了，既然换了Mac OS，需要重新开始找软件。Windows上的软件安装习惯是网上找软件exe，下载安装，基本一个版本能用很久，没有习惯更是懒得经常更新。Linux上倒是有包管理器，但用的不多，只在编程时用过，不过编程包依赖特别重要，一般不会修改，因此基本没有鼓捣过。这次准备换电脑，看着同事非常优雅自如地更新软件，有些羡慕呀，这样才能最大化开源/更新频繁的软件优势。App Store倒是可以随时更新，不过不是所有软件都发布在App Store上，所以这里记录下我需要的配置、计划安装的软件，以及安装方法，以供参照。PS，不定期更新。

首先说明下按键符号，如果第一次使用mac可能会有些混，因此这里说明一下：

⌘ - command

⌥ - option

⌃ - control

⇧ - shift

␣ - space

Windows平台上control在快捷键中使用频繁，而转到mac平台后很多通用快捷键设置需要替代为⌘command，比如⌘C复制、⌘V粘贴，快捷键会在其他文中详述。

## Mac系统基本配置

### 触摸板设置

触摸板是mac最常用的工具，更好地设置触摸板使用起来可以方便省力很多。

⌈系统偏好设置⌋ > ⌈触控板⌋ ，建议将所有手势都选上，使用起来很方便，也可以节省快捷键。我常用的手势有：轻点代替点按、双指点按代表右击、三指点按选词查询词典、四指合拢打开Lauchpad、四指分开显示桌面 、三指向上划mission control。

### Touchbar设置

⌈系统偏好设置⌋ > ⌈键盘⌋ > ⌈键盘⌋ > 点击⌈自定义控制条⌋ 即可进行设置。

{{% center %}}<img name="touchbar-config" src="/images/series/Mac小白探索记/1/touchbar-config.jpg" width='400px'/>{{% /center %}}

可以将一些找起来比较麻烦但常用的设置放在touchbar，移除默认设置touchbar中一些不常用的功能。我放了night shift、免打扰和屏幕保护程序。应用程序中的touchbar的功能和该应用程序本身功能有关，有些可以在程序中设置touchbar的功能。

此外有很多人推荐的BetterTouchTool也可以，不过这款软件收费。   

### 第三方软件安装

有些软件并没有在apple认可的开发者列表内，如果要安装，首先需要mac允许软件来自任何人，而这个估计因为安全问题，属于隐藏设置，需要先打开terminal，输入：

```shell
$ sudo spctl --master-disable
```

然后在⌈系统偏好设置⌋ > ⌈安全与隐私⌋ 中选择 ⌈任何来源⌋。安装完毕后，为了安全考虑，最好能够再选择回来自可信任的开发者。

{{% center %}}<img name="Config-privacy-source" src="/images/series/Mac小白探索记/1/config-privacy-source.jpg" width='400px'/>{{% /center %}}

## 包管理器

### Homebrew

Mac OS用户大多使用Homebrew作为包管理工具，据说相当于Ubuntu下的apt-get。官网上的一句话介绍是 ⌈The missing package manager for macOS⌋，也就是针对Mac OS所开发的包管理器。

[Homebrew官网](https://brew.sh/)给出了安装brew的方法，只要复制下面脚本在terminal中粘贴执行就安装成功。

```shell
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

而有了Homebrew后，包的管理和更新就方便了很多。

#### Homebrew常用指令

| 指令内容               | 指令                               |
| ------------------ | -------------------------------- |
| 帮助文档               | ``` brew help```                 |
| 安装某包，比如git         | ``` brew install git```          |
| 卸载某包，比如git         | ``` brew uninstall git```        |
| 强制卸载某包所有版本，比如git   | ```brew uninstall git --force``` |
| Homebrew本身更新       | ```brew update```                |
| 查看那些包过期了           | ```brew outdated```              |
| 将所有包都更新            | ```brew upgrade```               |
| 指定某包更新，比如git       | ```brew upgrade git```           |
| 锁定某包不让更新，比如git     | ```brew pin git```               |
| 解锁某包可以继续更新，比如git   | ```brew unpin git```             |
| 卸载所有过时的包           | ```brew cleanup```               |
| 卸载所有过时的包，并显示即将卸载的包 | ```brew cleanup -n```            |
| 卸载过时的包，比如git       | ```brew cleanup git```           |
| 列出所有brew装的包        | ```brew list```                  |
| 显示软件信息             | ```brew info```                  |
| 显示已安装的包依赖          | ```brew deps --installed```      |
| 查看brew包下载缓存        | ```brew --cache```               |

具体可查看帮助文档。

如需卸载Homebrew，复制下面指令到Terminal执行：

```shell
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/uninstall)"
```

**遇到的问题**：

* brew update

  更新Homebrew本身时可能需要科学上网。

* 更新git报错

```
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun

Error: Failure while executing: git config --local --replace-all homebrew.private true
```

​	如果报错，使用terminal执行：

```shell
$ brew upgrade git
```

### Homebrew Cask

[Cask](http://caskroom.github.io/)扩展了Homebrew，Homebrew针对包，而cask针对应用。在实际使用中，可以不使用 `brew cask xxx` 的样式，而是先用 `brew search xxx` 进行搜索，可以发现软件会在caskroom/cask的路径下，猜想 `brew cask install xxx` 应该与 `brew install caskroom/cask/xxx` 一样。

如果想将使用Cask安装的包(软件)都进行更新，使用：

```shell
$ brew cask upgrade
```

## 常用效率工具

### 输入法

#### 搜狗输入法

还是最习惯使用搜狗输入法。使用Homebrew安装。打开terminal，输入：

```shell
$ brew cask install sogouinput
```

就安装完毕。切换输入法使用快捷键 `⌘␣` 或者在menu bar切换输入法都可以。

### 科学上网

#### Windscribe

{{% img-no-border %}}<img name="Windscribe" src="/images/series/Mac小白探索记/1/Windscribe.jpg" width='100px'/>{{% /img-no-border %}}

这个比较麻烦，[Windscribe官网](https://windscribe.com)和安装包都需要科学上网，如果要使用需要先在官网注册，但是也要先科学上网。Homebrew下载也无法直接连接。还好之前找人下了安装包。好在安装完后可以直接登陆。免费用户每个月有10G流量，基本不看视频都够用，而且这个软件也有手机和ipad版。

### 分屏工具

#### Spectacle

{{% img-no-border %}}<img name="Spectacle" src="/images/series/Mac小白探索记/1/Spectacle.jpg" width='100px'/>{{% /img-no-border %}}

可用Homebrew进行安装。

```shell
$ brew cask install spectacle
```

Spectacle完全开源免费，不支持拖拽，需要使用快捷键。此外，Spectacle的布局较为简单，左右双屏仅支持对半开，但基本都够用，若对布局要求较高可试试Sizeup。

Spectacle默认设置 `⌘⌥C` 是将窗口放在屏幕中央 (center)，这个快捷键与Finder中复制路径快捷键重合了，而将窗口放在屏幕中央对我来说有些鸡肋，我就在Perference 中删除了这个的快捷键，也懒得设定新的快捷键了。

### 防休眠工具

#### Amphetamine 防休眠工具

{{% img-no-border %}}<img name="Amphetamine" src="/images/series/Mac小白探索记/1/Amphetamine.jpg" width='100px'/>{{% /img-no-border %}}

苹果App Store上直接下载就好，选择不在Dock栏显示。默认对图标左击打开设置，右击(双击)进行状态激活，可进行相反设置，为防止误击，我保留了原始设置。

Amphetamine可设定每次状态激活时防休眠时长，可指定每天的某一时间段内发挥作用，还可设置触发条件Trigger，用户可以选择在插入电源适配器之后启用防休眠，或是在连接到某一Wifi之后停止休眠。Amphetamine还支持快捷键设置，还有多套图标可选，挺喜欢猫头鹰，但可惜区别只在于眼睛，太不明显，所以我选择了日月。

总结：Amphetamine适合设置自动激活场景，在这些场景下可以在不合屏情况下防止休眠。但是如果需要合屏，就不适用了。

#### NoSleep 合盖休眠也无效

{{% img-no-border %}}<img name="NoSleep" src="/images/series/Mac小白探索记/1/NoSleep.jpg" width='100px'/>{{% /img-no-border %}}

经常我们希望mac合屏后也能继续工作，比如晚上下载时避免光污染。对我来说在确认安全不会离开座位的情况下，合盖并不希望休眠，继续工作时并不想再次输入密码。NoSleep 就是专为合盖放休眠设计的。

NoSleep可在Homebrew下载安装卸载：

```shell
$ brew cask install nosleep
```

NoSleep的设置比较简单，除去指定在电源适配器或者电池下启用外，其余选项都只是关于图标和自启动的附加选项。

### Cheatsheet 查看快捷键

{{% img-no-border %}}<img name="Cheatsheet" src="/images/series/Mac小白探索记/1/Cheatsheet.jpg" width='100px'/>{{% /img-no-border %}}

```shell
$ brew cask install cheatsheet
```

长按 `⌘` 会显示快捷键表。

### 压缩软件

#### The Unarchive

{{% img-no-border %}}<img name="unarchiver" src="/images/series/Mac小白探索记/1/unarchiver.jpg" width='100px'/>{{% /img-no-border %}}

The Unarchiver 支持解压 **RAR**、**7-zip**、**Tar**等常用压缩格式的文件，同时也可以打开**ISO**、**EXE**等类型的文件，功能齐全并且免费。

```shell
$ brew cask install the-unarchiver
```

### 下载器

#### Azureus

{{% img-no-border %}}<img name="vuze" src="/images/series/Mac小白探索记/1/vuze.jpg" width='100px'/>{{% /img-no-border %}}

这个是PT需要的软件，linux环境下一般推荐这个。

```shell
$ brew cask install vuze
```

### 播放器

#### Splayerx 射手播放器

{{% img-no-border %}}<img name="SPlayerX" src="/images/series/Mac小白探索记/1/SPlayerX.jpg" width='100px'/>{{% /img-no-border %}}

尽管射手播放器并不是在播放器中口碑最好的，而且射手播放器已经停止更新维护好几年了，但由于射手播放器自动搜索字幕并下载实在太好用太方便，不忍舍弃。

```shell
$ brew cask install splayerx
```

#### VLC

{{% img-no-border %}}<img name="vlc" src="/images/series/Mac小白探索记/1/vlc.jpg" width='100px'/>{{% /img-no-border %}}

vlc应该是linux上最著名的开源播放器，口碑非常好。不过鉴于射手太好用，估计只有在射手实在hold不住时才会打开吧。PS，iphone/ipad上用这个看影片很不错，特别是rmvb格式的影片。

```shell
$ brew cask install vlc
```

### Tuxera NTFS for Mac 2015

收费软件。已下安装包，离线安装。

### Little Snitch 防止软件自动连接网络

{{% img-no-border %}}<img name="Little-Snitch" src="/images/series/Mac小白探索记/1/Little-Snitch.jpg" width='100px'/>{{% /img-no-border %}}

这个不错，可以防止软件自动连接网络，不过这个软件收费也不便宜。已下载安装包。

## 程序员必备

### 虚拟化

#### Docker

{{% img-no-border %}}<img name="Docker" src="/images/series/Mac小白探索记/1/Docker.jpg" width='100px'/>{{% /img-no-border %}}

Terminal安装稳定版：

```shell
$ brew cask install docker
```

使用方面，可以参考我的[docker系列](https://orianna-zzo.github.io/series/%E6%85%A2%E5%AD%A6docker/)。

### 文本编辑器

#### Sublime Text

{{% img-no-border %}}<img name="Sublime" src="/images/series/Mac小白探索记/1/Sublime-Text.jpg" width='100px'/>{{% /img-no-border %}}

可以在官网下载安装，但是为了便于更新，还是使用Homebrew安装

```shell
$ brew cask install sublime-text
```

sublime3安装插件需要先安装Package Control:

按 `` ⌘` `` 打开console，然后把下面这段代码复制执行：

```
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

**遇到的问题**：

有时由于网络，中间文件下载可能会有些问题（也许科学上网会好些？），会提示某个位置找不到文件，该文件不是一个zip文件，可以选择离线安装。

离线下载Package Control包，在[这里](https://github.com/wbond/package_control/releases)选择发布版本下载，解压缩后重命名为Package Control放置到个人用户中的 `~/Library/Application Support/Sublime Text 3Sublime Text 3/Packages` 文件夹中去，同时需要将 installed packages文件夹中关于Package control的删去。 

重启sublime。按 `⌘⇧P` 打开command palette，输入 `Install Package`，选择⌈Package Control: Install Package⌋ 。但是弹出一个说明：⌈There are no packages available for installation⌋。网上说是路由器不支持ipv6的关系，需要修改hosts。

打开 `/etc/hosts` 增加下面内容：

```
# sublime
50.116.34.243 sublime.wbond.net
```

##### 安装的插件

安装插件，按 `⌘⇧P` 打开command palette，输入 `Install Package`，选择⌈Package Control: Install Package⌋，然后在新的输入框内键入插件名进行安装。

* GBK support 支持中文gbk编码

##### 其他配置

`⌘, ` 打开配置页面，在右侧用户自定义的页面中进行配置。

* 修改默认打开形式：

  ```yaml
  "open_files_in_new_window": false,
  ```

  设置为false，默认tab形式打开；设置为true，默认新开一个窗口

* 显示编码格式

  ```yaml
  "show_encoding": true,
  ```

  会在窗口底部显示现在使用的编码格式。

* 显示空格占位符

  ```yaml
  "draw_white_space": "all",
  "indent_guide_options": ["draw_active"],
  ```

* 显示行末占位符格式

  ```yaml
  "show_line_endings": true,
  ```

  Windows行末占位符为 `\r\n`，而Unix行末占位符为 `\n`，在文字处理中需要注意。

  配置好后会在窗口底部显示行末占位符是Windows还是Unix。

#### Visual Studio Code

{{% img-no-border %}}<img name="Code" src="/images/series/Mac小白探索记/1/Code.jpg" width='100px'/>{{% /img-no-border %}}

这是微软出品免费的文本编辑器，主要针对前端开发，真心很好用。同样Homebrew安装：

```shell
$ brew cask install visual-studio-code
```

有时在使用到某一类型文件时，会自动提醒你有这个插件，询问是否需要安装。使用Git时有conflict，也会用颜色提示，询问保留的部分。可能缺点就是开启速度没有Sublime快，但真心很强大。

### IDE

#### Pycharm

{{% img-no-border %}}<img name="Pycharm" src="/images/series/Mac小白探索记/1/PyCharm.jpg" width='100px'/>{{% /img-no-border %}}

下载Professional版，需要输入key：

```shell
$ brew cask install pycharm
```


## Resource资源链接汇总

[Homebrew官网](https://brew.sh/)、[Cask官网](http://caskroom.github.io/)


## 版本控制

| Version | Action                   | Time       |
| ------- | ------------------------ | ---------- |
| 1.0     | Init                     | 2018-01-30 |
| 1.1     | Finder打开终端、复制路径 | 2018-02-14 |
| 1.2     | 拆分为系列               | 2018-02-14 |