# 快速上手

## 基本介绍
Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

## Demo
[在线demo](https://mengshukeji.github.io/LuckysheetDemo/)

![演示](/LuckysheetDocs/img/LuckysheetDemo.gif)

## 特性

### 格式设置
+ **样式** (修改字体样式，字号，颜色或者其他通用的样式)
+ **条件格式** (突出显示所关注的单元格或单元格区域；强调异常值；使用数据栏、色阶和图标集（与数据中的特定变体对应）直观地显示数据)
+ **文本对齐及旋转** 
+ **支持文本的截断、溢出、自动换行** 
+ **数据类型** 
	+ **货币, 百分比, 数字, 日期** 
	+ **Custom** (和excel保持一致，例如： `##,###0.00` , `$1,234.56$##,###0.00_);[Red]($##,###0.00)`, `_($* ##,###0.00_);_(...($* "-"_);_(@_)`, `08-05 PM 01:30MM-dd AM/PM hh:mm` )

### 单元格
+ **拖拽选取来修改单元格** (对选区进行操作，可以拖动四边来移动选区，也可以在右下角对选区进行下拉填充操作)
+ **选取下拉填充** (对于一个1,2,3,4,5的序列，将会按照间隔为1进行下拉填充，而对2,4,6,8将会以2作为间隔。支持等差数列，等比数列，日期，周，天，月，年，中文数字填充)
+ **自动填充选项** (下拉填充后，会出现填充选项的菜单，支持选择复制，序列，仅格式，只填充格式，天，月，年的选择)
+ **多选区操作** (可以按住Ctrl键进行单元格多选操作，支持多选区的复制粘贴)
+ **查找和替换** (对内容进行查找替换，支持正则表达式，整词，大小写敏感)
+ **定位** (可以根据单元格的数据类型进行自动定位并选中，选中后可以批量进行格式等操作)
+ **合并单元格**

### 行和列操作
+ **隐藏，插入，删除行或列** 
+ **冻结行或列** (支持冻结首行和首列，冻结到选区，冻结调节杆可以进行拖动操作)
+ **文本分列** (可以把文本根据不同符号进行拆分，和excel的分列功能类似)

### 操作体验
+ **撤销/重做**
+ **复制/粘贴/剪切操作** (支持luckysheet到excel和excel到luckysheet带格式的互相拷贝)
+ **快捷键支持** (快捷键操作保持与excel一致，如果有不同或者缺失请反馈给我们)
+ **格式刷** (与google sheet类似)
+ **任意选区拖拽** (选择单元格，输入公式，插入图表，会与选区相关，可以通过任意拖动和放大缩小选区来改变与之关联的参数)

### 公式和函数
+ **内置公式**
	+ 数学 (SUMIFS, AVERAGEIFS, SUMIF, SUM, etc.)
	+ 文本 (CONCATENATE, REGEXMATCH, MID)
	+ 日期 (DATEVALUE, DATEDIF, NOW, WEEKDAY, etc.)
	+ 财务 (PV, FV, IRR, NPV, etc.)
	+ 逻辑 (IF, AND, OR, IFERROR, etc.)
	+ 查找和引用 (VLOOKUP, HLOOkUP, INDIRECT, OFFSET, etc.)
	+ 动态数组 (Excel2019新函数，SORT,FILTER,UNIQUE,RANDARRAY,SEQUENCE)
+ **公式支持数组** (={1,2,3,4,5,6}, Crtl+Shift+Enter)
+ **远程公式** (DM_TEXT_TFIDF, DM_TEXT_TEXTRANK,DATA_CN_STOCK_CLOSE etc. Need remote interface, can realize complex calculation)
+ **自定义公式**  (根据身份证识别年龄，性别，生日，省份，城市等. AGE_BY_IDCARD, SEX_BY_IDCARD, BIRTHDAY_BY_IDCARD, PROVINCE_BY_IDCARD, CITY_BY_IDCARD, etc. 可以任意加入自己的公式哦)

### 表格操作
+ **筛选** (支持颜色、数字、字符、日期的筛选)
+ **排序** (同时加入多个字段进行排序)

### 数据透视表
+ **字段拖拽** (操作方式与excel类似，拖动字段到行、列、数值、筛选等4个区域)
+ **聚合方式**  (支持汇总、计数、去重计数、平均、最大、最小、中位数、协方差、标准差、方差等计算)
+ **筛选数据** (可对字段进行筛选后再进行汇总)
+ **数据透视表下钻** (双击数据透视表中的数据，可以下钻查看到明细，操作方式与excel一致)
+ **根据数据透视表新建图表** (数据透视表产生的数据也可以进行图表的制作)

### 图表
+ **支持的图表类型** (目前折线图、柱状图、面积图、条形图、饼图可以使用，散点图、雷达图、仪表盘、漏斗图正在接入，其他图表正在陆续开发中，请大家给予建议) 
+ **关于图表插件**  (图表使用了一个中间插件[ChartMix](https://github.com/mengshukeji/chartMix)(MIT协议): 目前支持ECharts，正在逐步接入Highcharts、阿里G2、amCharts、googleChart、chart.js)
+ **Sparklines小图** (以公式的形式进行设置和展示，目前支持：折线图、面积图、柱状图、累积图、条形图、离散图、三态图、饼图、箱线图等)

### 分享及写作
+ **评论** (评论的删除、添加、修改、隐藏)
+ **共享编辑** (支持多用户共享编辑，内置API)

### LuckySheet专有
+ **矩阵计算** (通过右键菜单进行支持：对选区内的数据进行转置、旋转、数值计算)
+ **截图** (把选区的内容进行截图展示)
+ **复制到其他格式** (右键菜单的"复制为", 支持复制为json、array、对角线数据、去重等)

### 未来开发计划
+ **插入图表和svg形状** (支持JPG,PNG,SVG,Pen tool的插入、修改和删除，并且随表格的变动而产生变化)
+ **数据验证(表单功能)**  (支持Checkbox, drop-down list, datePicker)
+ **打印及设置** (像excel一样进行打印设置，并导出为图片或者PDF)
+ **单元格内多样式** (Alt+Enter单元格内换行、上标、下标、单元格内科定义每个文字的不同样式)
+ **树形菜单** (类似excel中的分级显示（分组）)
+ **表格新功能** (类似excel中表格的筛选器和切片器)
+ **EXCEL,CSV,TXT 导入及导出** (专为luckysheet打造的导入导出插件，支持密码、水印、公式等的本地导入导出)
+ **文档** (完善文档和API)
+ **敬请期待...** (可以提出好的建议给我们)

## 开发模式

### 环境
[Node.js](https://nodejs.org/en/) Version >= 6 

### 安装
```shell
npm install
npm install gulp -g
```

### 开发
```shell
npm run dev
```

### 打包
```shell
npm run build
```

## 使用步骤

### 第一步
引入依赖，有2种方式

#### CDN
```html
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js"></script>
```

注意，`https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js`这个路径会拉取到最新的luckysheet代码，想要指定luckysheet版本，请在luckysheet后面加上版本号，如：`https://cdn.jsdelivr.net/npm/luckysheet@2.0.0/dist/luckysheet.umd.js`

如果不方便访问 jsdelivr.net，还可以采用本地方式引入

#### 本地引入

`npm run build`后`dist`文件夹下的所有文件复制到项目目录，然后通过相对路径引入

```html
<link rel='stylesheet' href='./plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='./plugins/plugins.css' />
<link rel='stylesheet' href='./css/luckysheet.css' />
<script src="./plugins/js/plugin.js"></script>
<script src="./luckysheet.umd.js"></script>
```
### 第二步
指定一个表格容器
```html
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### 第三步
创建一个表格
```javascript
<script>
    $(function () {
        //配置项
        var options = {
            container: 'luckysheet' //luckysheet为容器id
        }
        luckysheet.create(options)
    })
</script>
```

## 整体结构

### 格式

一个完整的Luckysheet表格文件的数据格式为：luckysheetfile，一个表格文件包含若干个sheet文件，对应excel的sheet0、sheet1等。

一个Luckysheet文件的示例如下，该表格包含3个sheet：`
luckysheetfile = [ {sheet1设置},  {sheet2设置},  {sheet3设置} ]`
相当于excel的3个sheet

![excel sheet](/LuckysheetDocs/img/excel.png)

文件中的一个sheet的数据`luckysheetfile[0]`的结构如下：
```json
{
	"name": "Cell", //工作表名称
	"color": "", //工作表颜色
	"index": "0", //工作表索引
	"status": "1", //激活状态
	"order": "0", //工作表的顺序
	"hide": 0,//是否隐藏
	"row": 36, //行数
	"column": 18, //列数
	"config": {
		"merge":{}, //合并单元格
		"rowlen":{}, //表格行高
		"columnlen":{}, //表格列宽
		"rowhidden":{}, //隐藏行
		"colhidden":{}, //隐藏列
		"borderInfo":{}, //边框
	},
	"celldata": [], //初始化使用的单元格数据
	"data": [], //更新和存储使用的单元格数据
	"scrollLeft": 0, //左右滚动条位置
	"scrollTop": 315, //上下滚动条位置
	"luckysheet_select_save": [], //选中的区域
	"luckysheet_conditionformat_save": {},//条件格式
	"calcChain": [],//公式链
	"isPivotTable":false,//是否数据透视表
	"pivotTable":{},//数据透视表设置
	"filter_select": {},//筛选范围
	"filter": null,//筛选配置
	"luckysheet_alternateformat_save": [], //交替颜色
	"luckysheet_alternateformat_save_modelCustom": [], //自定义交替颜色	
	"freezen": {}, //冻结行列
	"chart": [], //图表配置
	"visibledatarow": [], //所有行的位置
	"visibledatacolumn": [], //所有列的位置
	"ch_width": 2322, //工作表区域的宽度
	"rh_height": 949, //工作表区域的高度
	"load": "1", //已加载过此sheet的标识
}
```
### 查看方式
在chrome的console中查看
`luckysheet.getluckysheetfile()`
可以看到完整设置
`[{shee1}, {sheet2}, {sheet3}]`

## 快捷键

| 快捷键 | 功能 |
| ------------ | ------------ |
|  CTRL + C | 复制单元格 |
|  CTRL + V | 粘贴单元格 |
|  CTRL + X | 剪切单元格 |
|  CTRL + Z | 撤销 |
|  CTRL + Y | 重做 |
|  CTRL + A | 全选 |
|  CTRL + B | 加粗 |
|  CTRL + F | 查找 |
|  CTRL + H | 替换 |
|  CTRL + I | 斜体 |
|  CTRL + UP/DOWN/LEFT/RIGHT | 快捷调整单元格选框 |
|  SHIFT + UP/DOWN/LEFT/RIGHT | 调整选区 |
|  CTRL + 鼠标左击 | 多选单元格 |
|  SHIFT + 鼠标左击 | 调整选区 |
|  UP/DOWN/LEFT/RIGHT | 移动单元格选框 |
|  ENTER | 编辑单元格 |
|  TAB | 向右移动单元格选框 |
|  DELETE | 清除单元格数据 |