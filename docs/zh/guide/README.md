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
<link rel="stylesheet" href="plugins/css/pluginsCss.min.css">
<link rel="stylesheet" href="plugins/plugins.min.css">
<link rel="stylesheet" href="css/main.min.css">
<script src="plugins/js/plugin.min.js"></script>
<script src="main.min.js"></script>
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
	"name": "超市销售额",
	"color": "",
	"chart": [],
	"status": 0,
	"order": 0,
	"celldata": [],
	"row":90,
	"column":100,
	"index": 0,
	"visibledatarow": [],
	"visibledatacolumn": [],
	"rowsplit": [],
	"ch_width": 4629,
	"rh_height": 1681,
	"luckysheet_select_save": {},
	"luckysheet_selection_range": {},
	"scrollLeft": 0,
	"scrollTop": 0,
	"load": "1",
	"config": {
		"columlen": {},
		"rowhidden": {}
	}
	,
	"pivotTable": {},
	"isPivotTable": true,
    "calcChain": [],
    "filter":{key1:value1, key2:value2},
    "filter_select": {}
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
