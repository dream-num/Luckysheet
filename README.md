<div align="center">

![logo](/docs/.vuepress/public/img/logo_text.png)

[![Join the chat at https://gitter.im/mengshukeji/Luckysheet](https://badges.gitter.im/mengshukeji/Luckysheet.svg)](https://gitter.im/mengshukeji/Luckysheet?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<a href="https://twitter.com/intent/follow?screen_name=luckysheet">
        <img src="https://img.shields.io/twitter/follow/luckysheet?style=social&logo=twitter"
            alt="follow on Twitter"></a>

</div>


English| [简体中文](./README-zh.md)

## Introduction
🚀Luckysheet is an online spreadsheet like excel that is powerful, simple to configure, and completely open source.

## Links
 | Source Code   | Documentation | Demo | Plugins Demo | Forum |
 | ------ | -------- | ------ | ------ | ------ |
 | [Github](https://github.com/mengshukeji/Luckysheet)| [Online Documentation](https://mengshukeji.github.io/LuckysheetDocs/) | [Online Demo](https://mengshukeji.github.io/LuckysheetDemo) / [Cooperative editing demo](http://luckysheet.lashuju.com/demo/) | [Import Excel Demo](https://mengshukeji.github.io/LuckyexcelDemo/) | [Chinese Forum](https://support.qq.com/product/288322)  |
 | [Gitee Mirror](https://gitee.com/mengshukeji/Luckysheet)| [Gitee Online Documentation](https://mengshukeji.gitee.io/LuckysheetDocs/) | [Gitee Online Demo](https://mengshukeji.gitee.io/luckysheetdemo/) | [Gitee Import Excel Demo](https://mengshukeji.gitee.io/luckyexceldemo/) | [Google Group](https://groups.google.com/g/luckysheet) |

![Demo](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## Plugins
- [Luckyexcel](https://github.com/mengshukeji/Luckyexcel): Excel import and export library
- [chartMix](https://github.com/mengshukeji/chartMix): Chart plugin

## Ecosystem

| Project | Description |
|---------|-------------|
| [Luckysheet Vue]          | Luckysheet and Luckyexcel in a vue cli3 project |
| [Luckysheet React]          | Luckysheet in a React project |
| [Luckyexcel Node]          | Use Luckyexcel in koa2 |
| [Luckysheet Server]          | Java backend Luckysheet Server |
| [Luckysheet Server Starter]          | LuckysheetServer docker deployment startup template |

[Luckysheet Vue]: https://github.com/mengshukeji/luckysheet-vue
[Luckysheet React]: https://github.com/mengshukeji/luckysheet-react
[Luckyexcel Node]: https://github.com/mengshukeji/Luckyexcel-node
[Luckysheet Server]: https://github.com/mengshukeji/LuckysheetServer
[Luckysheet Server Starter]: https://github.com/mengshukeji/LuckysheetServerStarter


## Features

- **Formatting**: style, conditional formatting, text alignment and rotation, text truncation, overflow, automatic line wrapping, multiple data types, cell segmentation style
- **Cells**: drag and drop, fill handle, multiple selection, find and replace, location, merge cells, data verification
- **Row & column**: hide, insert, delete rows or columns, freeze, and split text
- **Operation**: undo, redo, copy, paste, cut, hot key, format painter, drag and drop selection
- **Formulas & Functions**: Built-in, remote and custom formulas
- **Tables**: filter, sort
- **Enhanced functions**: Pivot tables, charts, comments, cooperative editing, insert picture, matrix calculations, screenshots, copying to other formats, EXCEL import and export, etc.

For a more detailed feature list, please refer to: [Features](https://mengshukeji.github.io/LuckysheetDocs/guide/#features)

## 📖 Resources
- Priority reading for new users: [User Guide](https://github.com/mengshukeji/Luckysheet/wiki/User-Guide)
- For the tutorials, learning materials and supporting solutions provided by the community, please refer to: [Tutorials and Resources](https://mengshukeji.github.io/LuckysheetDocs/guide/resource.html)

## 📜 Changelog

Detailed changes for each release are documented in the [CHANGELOG.md](CHANGELOG.md).

## ❗️ Issues

Please make sure to read the [Issue Reporting Checklist](https://mengshukeji.github.io/LuckysheetDocs/guide/contribute.html#how-to-submit-issues) before opening an issue. Issues not conforming to the guidelines may be closed immediately.

## ✅ TODO

Managed with [GitHub Projects](https://github.com/mengshukeji/Luckysheet/projects/1)

## 💪Contribution

Please make sure to read the[ Contributing Guide](https://mengshukeji.github.io/LuckysheetDocs/guide/contribute.html) before making a pull request.

## Usage

### First step
Introduce dependencies through CDN
```
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js"></script>
```
### Second step
Specify a table container
```
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### Third step
Create a table
```
<script>
    $(function () {
        //Configuration item
        var options = {
            container: 'luckysheet' //luckysheet is the container id
        }
        luckysheet.create(options)
    })
</script>
```

## Development

### Requirements
[Node.js](https://nodejs.org/en/) Version >= 6 

### Installation
```
npm install
npm install gulp -g
```
### Development
```
npm run dev
```
### Package
```
npm run build
```

## Partner project

- [luban-h5](https://github.com/ly525/luban-h5)
- [excelize](https://github.com/360EntSecGroup-Skylar/excelize)
- [h5-Dooring](https://github.com/MrXujiang/h5-Dooring)

## Communication
- [Github Discussions](https://github.com/mengshukeji/Luckysheet/discussions)
- [Gitter](https://gitter.im/mengshukeji/Luckysheet)

[Chinese community](./README-zh.md)

## Sponsor

Luckysheet is an MIT-licensed open source project with its ongoing development made possible entirely by the support of these awesome [backers](https://mengshukeji.github.io/LuckysheetDocs/about/sponsor.html#sponsors-list). If you'd like to join them, please consider:

- [Become a backer or sponsor on Patreon](https://www.patreon.com/mengshukeji).
- [Become a backer or sponsor on Open Collective](https://opencollective.com/luckysheet).
- One-time donation via PayPal, WeChat or Alipay

| PayPal |  WeChat  | Alipay |
|---|---|---|
| [Paypal Me](https://www.paypal.me/wbfsa) | <img src="https://minio.cnbabylon.com/public/luckysheet/wechat.jpg" width="140" />| <img src="https://minio.cnbabylon.com/public/luckysheet/alipay.jpg" width="130" /> |

### What's the difference between Patreon and OpenCollective?

Funds donated via Patreon go directly to support mengshukeji's work on Luckysheet. Funds donated via OpenCollective are managed with transparent expenses and will be used for compensating work and expenses for core team members or sponsoring community events. Your name/logo will receive proper recognition and exposure by donating on either platform.

## Sponsors List

(Sort by time)
- *勇 ¥ 30
- 虚我 ¥ 200
- 甜党 ¥ 50
- Alphabet(Google)-gcf ¥ 1
- **平 ¥ 100
- **东 ¥ 10
- debugger ¥ 20
- 烦了烦 ¥ 10
- 文顶顶 ¥ 200
- yangxshn ¥ 10
- 爱乐 ¥ 100
- 小李飞刀刀 ¥ 66
- 张铭 ¥ 200
- 曹治军 ¥ 1
- *特 ¥ 10
- **权 ¥ 9.9
- **sdmq ¥ 20

## Authors and acknowledgment

### Active Core Team Members
- [@wbfsa](https://github.com/wbfsa)
- [@iamxuchen800117](https://github.com/iamxuchen800117)
- [@wpxp123456](https://github.com/wpxp123456)
- [@tonytonychopper123](https://github.com/tonytonychopper123)
- [@Dushusir](https://github.com/Dushusir)
- [@c19c19i](https://weibo.com/u/3884623955)
- [@zhangchen915](https://github.com/zhangchen915)
- [@jerry-f](https://github.com/jerry-f)
- [@flowerField](https://github.com/flowerField)

### Community Partners
- [@danielcai1987](https://github.com/danielcai1987)
- [@qq6690876](https://github.com/qq6690876)
- [@javahuang](https://github.com/javahuang)
- [@TimerGang](https://github.com/TimerGang)
- [@gsw945](https://github.com/gsw945)
- [@swen-xiong](https://github.com/swen-xiong)
- [@lzmch](https://github.com/lzmch)
- [@kdevilpf](https://github.com/kdevilpf)
- [@WJWM0316](https://github.com/WJWM0316)

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji
