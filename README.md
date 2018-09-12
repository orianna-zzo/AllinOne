# AllinOne

Hugo theme - AllinOne.

[Demo](https://orianna-zzo.github.io/AllinOne-html/)

## Features

* Responsive full image carousel (Text layout on it should be improved)
* Suited for blogging and personal webpages
* TOC Scrollspy for content (h1~h4)
* Smooth scroll
* Syntax highlighting with highlightjs 
* Static profile image
* Google Analytics
* Font Awesome 3.1.0
* Built-in Tags, Series and Categories
* Previous and Next posts
* Show card list with summary

Most features are optional and can be individually enabled/disabled in your `config.toml`.

## Table of Contents

* [Quick Start](#quick-start)
* [Usage](#usage)
* [License](#license)
* [Thanks](#thanks)

## Quick Start

From the root of your Hugo site, clone the theme into `themes/AllinOne` by running:

```sh
# Clone theme into the themes/AllinOne directory
$ git clone https://github.com/orianna-zzo/AllinOne.git themes/AllinOne
```

## Usage

### Configuration

Please see the sample [`config.toml`](https://github.com/orianna-zzo/AllinOne/blob/master/exampleSite/config.toml). The theme is built on Hugo v0.46.

### Post Summary

There are three ways to add summary to each post.
* [Hugo-defined Summary Split](https://gohugo.io/content-management/summaries/)
  By default, Hugo automatically takes the first 70 words of your content as its summary and stores it into the `.Summary` page variable for use. It is much easier with no additional work, but it might not the one you want.

  If Chinese/Japanese/Korean (CJK) languages are in the content, set `hasCJKLanguage` as `true` in the `config.toml`, so that Hugo could auto detect CJK languages to make `.Summary` and `.WordCount` behave correctly. [See here](ttps://gohugo.io/getting-started/configuration)

  The length of text to show in a `.Summary` could be set as `summaryLength` in `config.toml`. [See here](https://gohugo.io/getting-started/configuration/)

* [User-defined Summary Split](https://gohugo.io/content-management/summaries/)
  Alternatively, you may add the \<!--more--\> summary divider where you want to split the article. Content that comes before the summary divider will be used as that content’s summary and stored in the `.Summary` page variable with all HTML formatting intact. The only extra work is add the \<!--more--\> summary divider.

* User-defined Summary 
  You may want a specific summary for the post other than the front sentences of the content. In this case, you could but summary in the yaml head of the post with the param name `summary`.

## License

Licensed under the MIT License. See the [LICENSE](https://github.com/nishanths/cocoa-hugo-theme/blob/master/LICENSE) file for more details.

## Thanks

Thanks to the following projects I learned from:

* Hugo theme [cocoa](https://github.com/nishanths/cocoa-hugo-theme)
* Material design for Bootstrap4 [mdb](https://mdbootstrap.com/)
