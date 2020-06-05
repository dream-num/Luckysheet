# Luckysheet

## Introduction - 介绍
Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

## Features - 特性
1. Luckysheet支持表格设置包括冻结行列、合并单元格、筛选、排序、查询、条件格式、批注
2. 支持数据分析功能包括透视表、图表、分列、矩阵操作、内置385个计算函数
3. 支持一键截图、复制为json数据、共享编辑、excel与Luckysheet之间数据的复制粘贴
4. 支持移动端查看
![演示](https://minio.cnbabylon.com/public/luckysheet/LuckysheetDemo.gif)

## Documentation - 文档
[在线demo](https://mengshukeji.github.io/LuckysheetDemo/)

[在线文档](https://mengshukeji.github.io/LuckysheetDocs/)

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
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
#### 第四步
创建一个表格
```
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

## Contact - 联系
mengshu@office2.cn

## communication - 交流

- 添加小编微信,拉你进Luckysheet开发者交流微信群,备注:加群
  ![微信群](https://minio.cnbabylon.com/public/luckysheet/%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg)

或者

- 加入Luckysheet开发者交流QQ群
  ![QQ群](https://minio.cnbabylon.com/public/luckysheet/QQ%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg)

## Authors and acknowledgment - 贡献者和感谢
- Bug Pan ([@wpxp123456](https://github.com/wpxp123456))
- Dushusir ([@Dushusir](https://github.com/Dushusir))

## License - 版权信息
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji
