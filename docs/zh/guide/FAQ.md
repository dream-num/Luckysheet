# FAQ

## luckysheetfile中的data和celldata有什么区别？

**<span style="font-size:20px;">A</span>** : 表格初始化时使用一维数组格式的 [celldata](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/data.html#celldata)，初始化完成后转化为二维数组格式的data作为存储更新使用，celldata不再使用。

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
## 单元格的类型有哪些？

**<span style="font-size:20px;">A</span>** : 参考[单元格格式列表](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/format.html#%E5%8D%95%E5%85%83%E6%A0%BC%E6%A0%BC%E5%BC%8F),例举了可用的单元格格式

------------