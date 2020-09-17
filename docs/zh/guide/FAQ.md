# FAQ

## **<span style="font-size:20px;">Q</span>** luckysheetfile中的data和celldata有什么区别？

**<span style="font-size:20px;">A</span>** : 表格初始化时使用一维数组格式的 [celldata](/zh/guide/sheet.html#celldata)，初始化完成后转化为二维数组格式的data作为存储更新使用，celldata不再使用。

如果需要将data拿出来作为初始化数据，则需要执行 `luckysheet.getGridData(data)`转换为celldata数据。
其中`{ r, c, v }`格式的celldata转换为二维数组使用的是`luckysheet.buildGridData(luckysheetfile)`，传入参数为表格数据对象`luckysheetfile`

总结如下：
```js
// data => celldata 二维数组数据 转化成 {r, c, v}格式 一维数组，传入参数为二维数据data
luckysheet.getGridData(data)

// celldata => data 生成表格所需二维数组，传入参数为表格数据对象file
luckysheet.buildGridData(luckysheetfile)
```

------------

## **<span style="font-size:20px;">Q</span>** 单元格的类型有哪些？

**<span style="font-size:20px;">A</span>** : 参考[单元格格式列表](/zh/guide/cell.html),例举了可用的单元格格式

------------

## **<span style="font-size:20px;">Q</span>** 如何在Vue/React项目中使用Luckysheet？

**<span style="font-size:20px;">A</span>** : 

- Vue案例：[luckysheet-vue](https://github.com/mengshukeji/luckysheet-vue)
- React案例：[luckysheet-react](https://github.com/mengshukeji/luckysheet-react)

------------

## **<span style="font-size:20px;">Q</span>** 为什么初始化后表格里面的公式不会被触发？

**<span style="font-size:20px;">A</span>** : 参考 [表格数据格式](/zh/guide/sheet.html#calcchain) ,设置单元格数据对应的calcChain即可。

------------

## **<span style="font-size:20px;">Q</span>** 远端加载数据是loadUrl还是updateUrl？

**<span style="font-size:20px;">A</span>** : [loadUrl](/zh/guide/config.html#loadurl)。配置了loadUrl，Luckysheet会通过ajax请求整个表格数据，而updateUrl会作为协同编辑实时保存的接口地址。

------------

## **<span style="font-size:20px;">Q</span>** 每个sheet页的`index`和`order`有什么区别？

**<span style="font-size:20px;">A</span>** : 每个sheet页都有一个唯一id，就是`index`，可以用数字递增，也可以使用随机字符串，而`order`是所有的sheet的排序情况，从0开始，只能为数字`0,1,2...`。

------------

## **<span style="font-size:20px;">Q</span>** dist文件夹下为什么不能直接运行项目？

**<span style="font-size:20px;">A</span>** :需要启动本地服务器

- [Node搭建本地服务器](https://github.com/JacksonTian/anywhere)
- [Python搭建本地服务器](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/set_up_a_local_testing_server)

------------

## **<span style="font-size:20px;">Q</span>** excel导入导出怎么做？

**<span style="font-size:20px;">A</span>** :现阶段可以参考以下案例
- Luckysheet导入: https://www.cnblogs.com/DuShuSir/p/13179483.html
- Luckysheet导出 : https://www.cnblogs.com/recode-hyh/p/13168226.html

后期会另外开源一个导入导出库做适配，敬请期待！

------------

## **<span style="font-size:20px;">Q</span>** 初始化时合并单元格怎么做？

**<span style="font-size:20px;">A</span>** :参考以下案例
- Luckysheet初始化含合并单元格的数据: https://www.cnblogs.com/DuShuSir/p/13272397.html
