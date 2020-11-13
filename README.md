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
 | Source Code   | Documentation | Demo | Plugins Demo | Forum | Resources |
 | ------ | -------- | ------ | ------ | ------ | ------ |
 | [Github](https://github.com/mengshukeji/Luckysheet)| [Online Documentation](https://mengshukeji.github.io/LuckysheetDocs/) | [Online Demo](https://mengshukeji.github.io/LuckysheetDemo) | [Import Excel Demo](https://mengshukeji.github.io/LuckyexcelDemo/) | [Chinese Forum](https://support.qq.com/product/288322)  | [LuckyResources](https://github.com/mengshukeji/LuckyResources) |
 | [Gitee Mirror](https://gitee.com/mengshukeji/Luckysheet)| [Gitee Online Documentation](https://mengshukeji.gitee.io/LuckysheetDocs/) | [Gitee Online Demo](https://mengshukeji.gitee.io/luckysheetdemo/) | [Gitee Import Excel Demo](https://mengshukeji.gitee.io/luckyexceldemo/) | [Google Group](https://groups.google.com/g/luckysheet) |

![Demo](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## Online Case

- [Cooperative editing demo](http://luckysheet.lashuju.com/demo/)(Note: The official Java backend will also be open source after finishing,using OT algorithm. Please do not operate frequently to prevent the server from crashing)

## Plugins
- Excel import and export library: [Luckyexcel](https://github.com/mengshukeji/Luckyexcel)
- Chart plugin: [chartMix](https://github.com/mengshukeji/chartMix)

## Features

### 🛠️Formatting
+ **Styling** (Change font style, size, color, or apply effects)
+ **Conditional formatting** (highlight interesting cells or ranges of cells, emphasize unusual values, and visualize data by using data bars, color scales, and icon sets that correspond to specific variations in the data)
+ **Align or rotate text** 
+ **Support text truncation, overflow, automatic line wrapping**
+ **Data types** 
	+ **currency, percentages, decimals, dates** 
	+ **Custom** (E.g `##,###0.00` , `$1,234.56$##,###0.00_);[Red]($##,###0.00)`, `_($* ##,###0.00_);_(...($* "-"_);_(@_)`, `08-05 PM 01:30MM-dd AM/PM hh:mm` )
+ **Cell segmentation style** (Alt+Enter line break, sub,super, in-cell style)

### 🧬Cells
+ **Move cells by drag and dropping** (Operate on selection)
+ **Fill handle** (For a series like 1, 2, 3, 4, 5..., type 1 and 2 in the first two cells. For the series 2, 4, 6, 8..., type 2 and 4. Support arithmetic sequence, geometric sequence,date, week,chinese numbers)
+ **Auto Fill Options** (Fill copy, sequence, only format, no format, day, month, year)
+ **Multiple selection** (Hold Ctrl Selecting multiple cells, copy and paste)
+ **Find and replace** (Such as a particular number or text string, Support regular expression, whole word, case sensitive)
+ **Location** (Cells can be selected according to the data type)
+ **Merge cells**
+ **Data validation**  (Checkbox, drop-down list, datePicker)

### 🖱️Row & columns
+ **Hide, Insert, Delete rows and columns** 
+ **Frozen rows and columns** (First row, first column, Frozen to selection, freeze adjustment lever can be dragged)
+ **Split text** (Split text into different columns with the Convert Text to Columns Wizard)

### 🔨Operation
+ **Undo/Redo**
+ **Copy/Paste/Cut** (Copy from excel to Luckysheet with format, vice versa)
+ **Hot key** (The operating experience is consistent with excel, if there are differences or missing, please feedback to us)
+ **Format Painter** (Similar to google sheet)
+ **Selection by drag and dropping** (Change the parameters of formula and chart through selection)

### ⚙️Formulas & functions
+ **Built-in formulas**
	+ Math (SUMIFS, AVERAGEIFS, SUMIF, SUM, etc.)
	+ Text (CONCATENATE, REGEXMATCH, MID)
	+ Date (DATEVALUE, DATEDIF, NOW, WEEKDAY, etc.)
	+ Financial (PV, FV, IRR, NPV, etc.)
	+ Logical (IF, AND, OR, IFERROR, etc.)
	+ Lookup (VLOOKUP, HLOOkUP, INDIRECT, OFFSET, etc.)
	+ Dynamic Array (Excel2019 new formulas, SORT,FILTER,UNIQUE,RANDARRAY,SEQUENCE)
+ **Array** (={1,2,3,4,5,6}, Crtl+Shift+Enter)
+ **Remote formulas** (DM_TEXT_TFIDF, DM_TEXT_TEXTRANK,DATA_CN_STOCK_CLOSE etc. Need remote interface, can realize complex calculation)
+ **Custom**  (Some formula suitable for use in China have been added. AGE_BY_IDCARD, SEX_BY_IDCARD, BIRTHDAY_BY_IDCARD, PROVINCE_BY_IDCARD, CITY_BY_IDCARD, etc. You can define any formula you want)

### 📐Tables
+ **Filters** (Support color , numerical, date, text filtering)
+ **Sort** (Sort multiple fields simultaneously)

### 📈Pivot table
+ **Arrange fields** (Add fileds to rows, columns, values, area, it is similar to excel)
+ **Aggregation**  (Surport Sum,Count,CountA,CountUnique,Average,Max,Min,Median,Product,Stdev,Stdevp,Var,VarP etc.)
+ **Filter data** (Add fileds to filters area and analyze the desired data )
+ **Drill down** (Double click pivot table cell to drill down for detail data )
+ **Create a PivotChart** (Pivot table can create a chart )

### 📊Chart
+ **Support types** (Line, Column, Area, Bar, Pie, comming soon Scatter, Radar, Gauge, Funnel etc.) 
+ **Chart Plugins**  (Link to another project [ChartMix](https://github.com/mengshukeji/chartMix)(MIT): ECharts is currently supported,Highcharts, Ali G2, amCharts, googleChart, chart.js are being developed gradually)
+ **Sparklines** (Support by formula : Line, Pie, Box, Pie etc.)

### ✍️Share
+ **Comments** (Add, delete, update)
+ **Collaborate** (Simultaneous editing by multiple users)

### 📚Insert object
+ **Insert picture** (JPG,PNG,SVG and so on)

### ⚡Luckysheet
+ **Matrix operation** (Operate selection through the right-click menu: transpose, rotate, numerical calculation)
+ **Screenshot** (Take a screenshot with selection)
+ **Copy to** (In the right-click menu, copy selection to json, array etc.)
+ **EXCEL import/export** (Specially adapted to Luckysheet, export is under development)

### ⏱️Coming soon
+ **Print** (Like excel print option, save to PDF)
+ **Tree menu** (Just like the outline (group)  function of excel)
+ **Table new Features** (filter, slicer)
+ **CSV,TXT import/export** (Specially adapted to Luckysheet)
+ **Insert Shapes** ([Pen tool](https://github.com/mengshukeji/Pentool) Shapes)
+ **Documentation** (Improve documentation and API)
+ **More...** (Please advise us)

## Requirements
[Node.js](https://nodejs.org/en/) Version >= 6 

## Installation
```
npm install
npm install gulp -g
```

## Development
Development
```
npm run dev
```
Package
```
npm run build
```

## Usage

#### First step
Introduce dependencies through CDN
```
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js"></script>
```
#### Second step
Specify a table container
```
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
#### Third step
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

## Partner project

- [luban-h5](https://github.com/ly525/luban-h5)
- [excelize](https://github.com/360EntSecGroup-Skylar/excelize)
- [h5-Dooring](https://github.com/MrXujiang/h5-Dooring)

## Contribution

1. Any questions or suggestions are welcome to submit [Issues](https://github.com/mengshukeji/Luckysheet/issues/new/choose)
2. Learn more:[How to contribute](https://github.com/mengshukeji/Luckysheet/issues/128)

## Communication

- [Gitter](https://gitter.im/mengshukeji/Luckysheet)

[Chinese community](./README-zh.md)

## Sponsor

If you find this project useful, you can buy author a glass of juice:

Note:
1. Please note the payment message: nickname, your website address
2. By default, you will be added to the sponsor list below. If you want to sponsor anonymously, please leave a note on payment: anonymous
3. If you forget your nickname or website address, please contact the editor email: alexads@foxmail.com or WeChat: dushusir2.

|  WeChat  | Alipay |
|---|---|
| <img src="https://minio.cnbabylon.com/public/luckysheet/wechat.jpg" width="140" />| <img src="https://minio.cnbabylon.com/public/luckysheet/alipay.jpg" width="130" /> |

### [Paypal Me](https://www.paypal.me/wbfsa)

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

## Authors and acknowledgment

### Team
- [@wbfsa](https://github.com/wbfsa)
- [@wpxp123456](https://github.com/wpxp123456)
- [@tonytonychopper123](https://github.com/tonytonychopper123)
- [@Dushusir](https://github.com/Dushusir)
- [@c19c19i](https://weibo.com/u/3884623955)

### Active participants
- [@danielcai1987](https://github.com/danielcai1987)
- [@qq6690876](https://github.com/qq6690876)
- [@javahuang](https://github.com/javahuang)
- [@TimerGang](https://github.com/TimerGang)
- [@gsw945](https://github.com/gsw945)
- [@swen-xiong](https://github.com/swen-xiong)

## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji
