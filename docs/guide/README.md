# Get started

## Introduction
Luckysheet is an online spreadsheet like excel that is powerful, simple to configure, and completely open source.

## Demo
[Online demo](https://dream-num.github.io/LuckysheetDemo/)

![Demo](/LuckysheetDocs/img/LuckysheetDemo.gif)

## Online Case

- [Cooperative editing demo](http://luckysheet.lashuju.com/demo/)(Note: The official Java backend will also be open source after finishing,using OT algorithm. Please do not operate frequently to prevent the server from crashing)

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

## Development model

### Requirements
[Node.js](https://nodejs.org/en/) Version >= 6 

### Installation
```shell
npm install
npm install gulp -g
```

### Development
```shell
npm run dev
```

### Package
```shell
npm run build
```

## Steps for usage

### First step

There are two ways to introduce dependencies

#### CDN
```html
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>
```

Note that the path of `https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js` means that the latest luckysheet code will be pulled, but if Luckysheet has just been released, the jsdelivr website may not have time Synchronize from npm, so using this path will still pull to the previous version. We recommend that you directly specify the latest version.

To specify the Luckysheet version, please add the version number after all CDN dependent files, such as: `https://cdn.jsdelivr.net/npm/luckysheet@2.1.12/dist/luckysheet.umd.js`.

> How do I know which version is the latest version? View the latest [release record](https://github.com/mengshukeji/Luckysheet/releases) or [package.json](https://github.com/mengshukeji/Luckysheet/blob/master/package.json)` version` field.

If it is not convenient to access jsdelivr.net, you can also import it locally

#### Import locally
After `npm run build`, all files in the `dist` folder are copied to the project directory
```html
<link rel='stylesheet' href='./plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='./plugins/plugins.css' />
<link rel='stylesheet' href='./css/luckysheet.css' />
<link rel='stylesheet' href='./assets/iconfont/iconfont.css' />
<script src="./plugins/js/plugin.js"></script>
<script src="./luckysheet.umd.js"></script>
```
### Second step
Specify a table container
```html
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### Third step
Create a table
```javascript
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

## Structure

### Format

The data format of a complete Luckysheet table file is: luckysheetfile, a table file contains several sheet files, corresponding to excel sheet0, sheet1, etc.

An example of a Luckysheet file is as follows, the table contains 3 sheets:`
luckysheetfile = [{sheet1 settings}, {sheet2 settings}, {sheet3 settings}]`
Equivalent to 3 sheets of excel

![excel sheet](/LuckysheetDocs/img/excel.png)

An example of a sheet in the file is as follows:
```javascript
luckysheetfile[0] = 
{
	"name": "Cell", //Worksheet name
	"color": "", //Worksheet color
	"config": {}, //Table row height, column width, merged cells, borders, hidden rows and other settings
	"index": "0", //Worksheet index
	"chart": [], //Chart configuration
	"status": "1", //Activation status
	"order": "0", //The order of the worksheet
	"hide": 0,//whether to hide
	"column": 18, //Number of columns
	"row": 36, //number of rows
	"celldata": [], //Original cell data set
	"visibledatarow": [], //The position of all rows
	"visibledatacolumn": [], //The position of all columns
	"ch_width": 2322, //The width of the worksheet area
	"rh_height": 949, //The height of the worksheet area
	"scrollLeft": 0, //Left and right scroll bar position
	"scrollTop": 315, //Up and down scroll bar position
	"luckysheet_select_save": [], //selected area
	"luckysheet_conditionformat_save": {},//Conditional format
	"calcChain": [],//Formula chain
	"isPivotTable":false,//Whether to pivot table
	"pivotTable":{},//Pivot table settings
	"filter_select": null,//Filter range
	"filter": null,//Filter configuration
	"luckysheet_alternateformat_save": [], //Alternate colors
	"luckysheet_alternateformat_save_modelCustom": []//Customize alternate colors
}
```
### View method
View in chrome's console
`luckysheet.getluckysheetfile()`
You can see the complete settings
`[{shee1}, {sheet2}, {sheet3}]`

## Keyboard shortcuts

| Keyboard shortcuts | Features |
| ------------ | ------------ |
|  CTRL + C | Copy cell |
|  CTRL + V | Paste cell |
|  CTRL + X | Cut cell |
|  CTRL + Z | Undo |
|  CTRL + Y | Redo |
|  CTRL + A | Select all |
|  CTRL + B | Bold |
|  CTRL + F | Find |
|  CTRL + H | Replace |
|  CTRL + I | Italic |
|  CTRL + UP/DOWN/LEFT/RIGHT | Quickly adjust cell marquee |
|  SHIFT + UP/DOWN/LEFT/RIGHT | Adjust selection area |
|  CTRL + Left mouse click | Multiple selection cell |
|  SHIFT + Left mouse click | Adjust selection area |
|  UP/DOWN/LEFT/RIGHT | Move cell selection box |
|  ENTER | Edit cell |
|  TAB | Move cell selection box to the right |
|  DELETE | Clear cell data |

## Guide

If you encounter problems with Luckysheet, follow the steps below to find the answer

1. Use Doge or Google to search for common technical issues
2. For Luckysheet related issues, please view [Luckysheet Official Document](https://dream-num.github.io/LuckysheetDocs/)(Note that the function of marking TODO has not yet been implemented)
3. Search [FAQ List](https://dream-num.github.io/LuckysheetDocs/guide/FAQ.html)
4. Search [Official Forum](https://groups.google.com/g/luckysheet) to see if anyone has encountered it
5. Try to check or experiment by yourself to find the answer
6. Please try to read the source code to find the answer,

If none of the above methods solve your problem, you can consider:

- Go to [Official Forum](https://groups.google.com/g/luckysheet) to ask questions
- Go to [Gitter](https://gitter.im/mengshukeji/Luckysheet) to ask questions
- If there are obvious problems or the needs cannot be met, please submit [issues](https://github.com/mengshukeji/Luckysheet/issues)

> Recommended reading [How To Ask Questions The Smart Way](http://www.catb.org/~esr/faqs/smart-questions.html)

At the same time, we strongly recommend you to help us enrich the Luckysheet community

- If you find a problem with the documentation or code, you can contribute by submitting a PR. All reasonable changes, optimizations, amendments, or document amendments or updates related to submissions will be accepted
- When you have some experience in using or secondary developing Luckysheet, we encourage you to share it through blog posts