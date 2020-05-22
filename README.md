# Luckysheet

## Introduction - 介绍
Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

## Features - 特性
1. luckeeysht支持表格设置包括冻结行列、合并单元格、筛选、排序、查询、条件格式、批注
2. 支持数据分析功能包括透视表、图表、分列、矩阵操作、内置385个计算函数
3. 支持一键截图、复制为json数据、共享编辑、excel与luckysheet之间数据的复制粘贴

![演示](https://minio.cnbabylon.com/babylon1/public/Luckysheet_demo.gif)


## Documentation - 文档
[在线demo](https://luckysheet.office2.cn/examples/) coming soon!

[在线文档](https://luckysheet.office2.cn/docs/) coming soon!

## Requirements - 环境
[Node.js](https://nodejs.org/en/) Version >= 6 

## Installation - 安装
```
npm install
npm install gulp -g
```

## Development - 开发
开发
```
npm run dev
```
打包
```
npm run build
```

## Usage - 用法

#### 第一步
npm run build后dist文件夹下的所有文件复制到项目目录

#### 第二步
引入依赖
```
<link rel="stylesheet" href="plugins/css/pluginsCss.min.css">
<link rel="stylesheet" href="plugins/plugins.min.css">
<link rel="stylesheet" href="css/main.min.css">
<script src="plugins/js/plugin.min.js"></script>
<script src="main.min.js"></script>
```
#### 第三步
指定一个表格容器
```
<div id="jfgrid" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
#### 第四步
创建一个表格
```
<script>
    $(function () {
        //配置项
        var options = {
            container: 'jfgrid' //jfgrid为容器id
        }
        jfgrid.create(options)
    })
</script>
```
## Basic Configuration - 基本配置项

### container
- 类型：String
- 默认值："jfgrid"
- 作用：容器的ID
  
------------
### title
- 类型：String
- 默认值："Luckysheet Demo"
- 作用：表格的名称

------------
### column
- 类型：Number
- 默认值：60
- 作用：空表格默认的列数量

------------
### row
- 类型：Number
- 默认值：84
- 作用：空表格默认的行数据量

------------
### data
- 类型：Array
- 默认值：[{ "name": "Sheet1", color: "", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, { "name": "Sheet2", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1  }, { "name": "Sheet3", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2  }]
- 作用：客户端sheet数据[shee1, sheet2, sheet3]

------------

### fullscreenmode
- 类型：Boolean
- 默认值：true
- 作用：是否全屏模式，非全屏模式下，标记框不会强制选中。

------------
### autoFormatw
- 类型：Boolean
- 默认值：false
- 作用：自动格式化超过4位数的数字为 亿万格式 例：true or "true" or "TRUE"

------------
### accuracy
- 类型：Number
- 默认值：undefined
- 作用：设置传输来的数值的精确位数，小数点后n位 传参数为数字或数字字符串，例： "0" 或 0

------------
### allowCopy
- 类型：Boolean
- 默认值：true
- 作用：是否允许拷贝

------------
### showtoolbar
- 类型：Boolean
- 默认值：true
- 作用：是否第二列显示工具栏

------------
### showinfobar
- 类型：Boolean
- 默认值：true
- 作用：是否显示顶部名称栏

------------
### showsheetbar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部表格名称区域

------------

### showstatisticBar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部计数栏

------------
### editMode
- 类型：Boolean
- 默认值：false
- 作用：是否为编辑模式

------------
### allowEdit
- 类型：Boolean
- 默认值：true
- 作用：是否允许前台编辑

------------
### enableAddRow
- 类型：Boolean
- 默认值：true
- 作用：允许增加行

------------
### enableAddCol
- 类型：Boolean
- 默认值：true
- 作用：允许增加列

------------
### pointEdit
- 类型：Boolean
- 默认值：false
- 作用：是否是编辑器插入表格模式

------------
### pointEditUpdate
- 类型：Function
- 默认值：null
- 作用：编辑器表格更新函数

------------
### pointEditZoom
- 类型：Number
- 默认值：1
- 作用：编辑器表格编辑时缩放比例

------------
### pointEditZoom
- 类型：Number
- 默认值：1
- 作用：编辑器表格编辑时缩放比例

------------
### userInfo
- 类型：String
- 默认值：`'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> rabbit'`
- 作用：右上角的用户信息展示样式

------------
### userMenuItem
- 类型：Array
- 默认值：`[{url:"www.baidu.com", "icon":'<i class="fa fa-folder" aria-hidden="true"></i>', "name":"我的表格"}, {url:"www.baidu.com", "icon":'<i class="fa fa-sign-out" aria-hidden="true"></i>', "name":"退出登陆"}]`
- 作用：点击右上角的用户信息弹出的菜单

------------
### myFolderUrl
- 类型：String
- 默认值："www.baidu.com"
- 作用：左上角<返回按钮的链接

------------
### config
- 类型：Object
- 默认值：{}
- 作用：表格行高、列宽、合并单元格、公式等设置

------------
### devicePixelRatio
- 类型：Number
- 默认值：window.devicePixelRatio
- 作用：设备比例，比例越大表格分标率越高

------------
### gridKey
- 类型：String
- 默认值：""
- 作用：表格唯一标识符

------------
### loadUrl
- 类型：String
- 默认值：""
- 作用：配置loadUrl的地址，luckysheet会通过ajax请求表格数据，默认载入status为1的sheet数据中的所有data，其余的sheet载入除data字段外的所有字段

------------
### loadSheetUrl
- 类型：String
- 默认值：""
- 作用：配置loadSheetUrl的地址，参数为gridKey（表格主键） 和 index（sheet主键合集，格式为[1,2,3]），返回的数据为sheet的data字段数据集合

------------
### updateUrl
- 类型：String
- 默认值：""
- 作用：表格数据的更新地址

------------
### updateImageUrl
- 类型：String
- 默认值：""
- 作用：缩略图的更新地址

------------
### allowUpdate
- 类型：Boolean
- 默认值：false
- 作用：是否允许编辑后的后台更新

------------
### functionButton
- 类型：String
- 默认值：""
- 作用：右上角功能按钮，例如`'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">下载</button>    <button id="" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">分享</button>    <button id="jfgrid-share-btn-title" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">秀数据</button>'`

------------
### showConfigWindowResize
- 类型：Boolean
- 默认值：true
- 作用：图表和数据透视表的配置会在右侧弹出，设置弹出后表格是否会自动缩进

------------
### enablePage
- 类型：Boolean
- 默认值：false
- 作用：允许加载下一页

------------
### chartConfigChange
- 类型：Function
- 默认值：null
- 作用：图表插件中图表更新触发的自定义方法

------------
### beforeCreateDom
- 类型：Function
- 默认值：null
- 作用：表格创建之前自定义方法

------------
### fireMousedown
- 类型：Function
- 默认值：null
- 作用：单元格数据下钻自定义方法

------------

## Contact - 联系
mengshu@office2.cn

## Authors and acknowledgment - 贡献者和感谢
- Bug Pan ([@wpxp123456](https://github.com/wpxp123456))
- Dushusir ([@Dushusir](https://github.com/Dushusir))

## License - 版权信息
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji