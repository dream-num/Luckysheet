# 快速上手

## 基本介绍
Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

### 特性
1. Luckysheet支持表格设置包括冻结行列、合并单元格、筛选、排序、查询、条件格式、批注
2. 支持数据分析功能包括透视表、分列、矩阵操作、内置385个计算函数
3. 支持一键截图、复制为json数据、共享编辑、excel与Luckysheet之间数据的复制粘贴
4. 支持移动端查看
5. 支持sparkLine
6. 下拉复制
7. 快捷键

![演示](https://minio.cnbabylon.com/public/luckysheet/LuckysheetDemo.gif)


### Demo
[在线demo](https://mengshukeji.github.io/LuckysheetDemo/)

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
`npm run build`后`dist`文件夹下的所有文件复制到项目目录

### 第二步
引入依赖
```html
<link rel='stylesheet' href='./plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='./plugins/plugins.css' />
<link rel='stylesheet' href='./css/luckysheet.css' />
<script src="./plugins/js/plugin.js"></script>
<script src="./luckysheet.umd.js"></script>
```
### 第三步
指定一个表格容器
```html
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### 第四步
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

![excel sheet](https://minio.cnbabylon.com/public/luckysheet/excel.png)

文件中的一个sheet的示例如下：
```javascript
luckysheetfile[0] = 
{
	"name": "Cell", //工作表名称
	"color": "", //工作表颜色
	"config": {}, //表格行高、列宽、合并单元格、边框、隐藏行等设置
	"index": "0", //工作表索引
	"chart": [], //图表配置
	"status": "1", //激活状态
	"order": "0", //工作表的顺序
	"hide": 0,//是否隐藏
	"column": 18, //列数
	"row": 36, //行数
	"celldata": [], //原始单元格数据集
	"visibledatarow": [], //所有行的位置
	"visibledatacolumn": [], //所有列的位置
	"ch_width": 2322, //工作表区域的宽度
	"rh_height": 949, //工作表区域的高度
	"scrollLeft": 0, //左右滚动条位置
	"scrollTop": 315, //上下滚动条位置
	"luckysheet_select_save": [], //选中的区域
	"luckysheet_conditionformat_save": {},//条件格式
	"calcChain": [],//公式链
	"isPivotTable":false,//是否数据透视表
	"pivotTable":{},//数据透视表设置
	"filter_select": null,//筛选范围
	"filter": null,//筛选配置
	"luckysheet_alternateformat_save": [], //交替颜色
	"luckysheet_alternateformat_save_modelCustom": []//自定义交替颜色	
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
|  UP/DOWN/LEFT/RIGHT | 单个移动调整单元格选框 |
|  ENTER | 编辑单元格 |
|  DELETE | 清除单元格数据 |
