# 快速上手

## 基本介绍
Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

### 特性
1. luckeeysht支持表格设置包括冻结行列、合并单元格、筛选、排序、查询、条件格式、批注
2. 支持数据分析功能包括透视表、图表、分列、矩阵操作、内置385个计算函数
3. 支持一键截图、复制为json数据、共享编辑、excel与luckysheet之间数据的复制粘贴

![演示](https://minio.cnbabylon.com/babylon1/public/Luckysheet_demo.gif)


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
npm run build后dist文件夹下的所有文件复制到项目目录

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
<div id="jfgrid" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### 第四步
创建一个表格
```javascript
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


