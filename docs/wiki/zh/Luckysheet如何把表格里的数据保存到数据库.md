## 需求

使用Luckysheet新建了一个表格，然后界面操作修改表格数据，如何与后台对接来保存这些更改后的数据呢？

## 思路
有两个方案：
- 一是表格操作完成后，使用`luckysheet.getAllSheets()`方法获取到全部的工作表数据，全部发送到后台存储。
- 二是开启协同编辑功能，实时传输数据给后端。

这里重点介绍第二种方案，因为使用协同编辑功能传输的数据量很小，性能更好。因为保存数据只是前后端交互的中间一步，我们从整体来考虑前后端交互的方案设计。

- 首先后端根据表格的数据结构建立数据库表
- 然后后端将配置和数据组装起来，供前端调用，重点是起一个websocket服务
- 前端请求数据初始化表格，并使用websocket实时保存数据，后端根据前端不同的操作类型接受参数做存储，数据库保存后，将修改的数据推送到此服务器其它连接上（如果是集群，推荐做法是要将修改的数据推送到redis的队列中，其他服务器接受后，也群发到各自连接的websocket上），协同编辑的其他客户端收到信息做更新

## 详细步骤

### 第一步 数据库设计

一个表格的数据，包含工作簿配置、工作表配置、工作表数据。所以根据Luckysheet的数据结构作为基础，可以抽象出数据库表和字段信息。详细的配置信息点击链接查看官方文档。
- [工作簿配置](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/config.html)：根据`luckysheet.create(options)`所需要使用的options可以建立一张workbook表
- [工作表配置](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/sheet.html)：根据`options.data`建立一张worksheet表
- [工作表数据](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/sheet.html#celldata)：根据`options.data[0].celldata`的单个工作表的数据，建立数据表，这个可以根据自己的实际情况，决定表头字段的分类

### 第二步 后端提供接口

后台需要提供三个接口来组装数据。详细的配置信息点击链接查看官方文档
- [loadUrl](https://mengshukeji.gitee.io/luckysheetdocs/zh/guide/config.html#loadUrl)：加载所有工作表的配置，并包含当前页单元格数据
- [loadSheetUrl](https://mengshukeji.gitee.io/LuckysheetDocs/zh/guide/config.html#loadSheetUrl)：加载其它页单元格数据
- [updateUrl](https://mengshukeji.gitee.io/LuckysheetDocs/zh/guide/config.html#updateUrl)：实时保存的websocket地址

### 第三步 前端初始化配置

前端在表格初始化的时候，需要配置后端提供的三个接口地址和允许更新标识来开启共享编辑功能。
+ `allowUpdate`为`true`
+ 配置了`loadUrl`
+ 配置了`loadSheetUrl`
+ 配置了`updateUrl`

详见：[updateUrl](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/config.html#updateurl)

### 第四步 后端存储分发

通过共享编辑接口`updateUrl`，可以实现Luckysheet实时保存数据和多人同步数据，每一次操作都会发送不同的参数到后台，具体的操作类型和参数参见[表格操作](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/operate.html)

重点在于，后台拿到这些发来的数据，分别做好归类存储，维护好每一个luckysheetfile，并且把前端传来的数据同样的分发出去，其它客户端接收到消息，Luckysheet会自动合并更新最新数据。

## 参考
- [社区案例](https://gitee.com/ichiva/luckysheet-saved-in-recovery)
- [Luckysheet官方文档](https://mengshukeji.github.io/LuckysheetDocs/zh/)