

## Luckysheet项目介绍

- 一款纯前端类似Excel的在线表格，功能强大，配置简单，完全开源
- Luckysheet支持协同编辑Excel
- 对luckysheet的协同做一下总结吧：
  - 对pako压缩数据进行解析，这是第一个难点；
  - 数据存储按照分布式存储会更快；这里是结合着 loadUrl的哈，后端返回保存后的数据进行渲染；
  - luckyexcel 进行文件导入；
  - exceljs file-saver 实现文件导出；
  - 对源码进行二次开发，实现手动关闭 websocket 连接；
  - 还有很多细节哈，大家根据需要可以自行定义，有问题欢迎留言讨论。
