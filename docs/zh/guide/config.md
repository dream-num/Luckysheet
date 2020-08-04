# 基本配置

## container
- 类型：String
- 默认值："luckysheet"
- 作用：容器的ID
  
------------
## title
- 类型：String
- 默认值："Luckysheet Demo"
- 作用：表格的名称

------------
## lang
- 类型：String
- 默认值："en"
- 作用：国际化设置，允许设置表格的语言，暂时支持中文("zh")和英文("en")

------------
## column
- 类型：Number
- 默认值：60
- 作用：空表格默认的列数量

------------
## row
- 类型：Number
- 默认值：84
- 作用：空表格默认的行数据量

------------
## data
- 类型：Array
- 默认值：[{ "name": "Sheet1", color: "", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, { "name": "Sheet2", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1  }, { "name": "Sheet3", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2  }]
- 作用：客户端sheet数据`[shee1, sheet2, sheet3]`

------------
## plugins
- 类型：Array
- 默认值：[]
- 作用：配置插件，支持 图表："chart"

------------
## fullscreenmode
- 类型：Boolean
- 默认值：true
- 作用：是否全屏模式。非全屏模式下，标记框不会强制选中

------------
## autoFormatw
- 类型：Boolean
- 默认值：false
- 作用：自动格式化超过4位数的数字为‘亿万格式’，例：true or "true" or "TRUE"

------------
## accuracy
- 类型：Number
- 默认值：undefined
- 作用：设置精度，小数点后的位数。传参数为数字或数字字符串，例： "0" 或 0

------------
## allowCopy
- 类型：Boolean
- 默认值：true
- 作用：是否允许拷贝

------------
## showtoolbar
- 类型：Boolean
- 默认值：true
- 作用：是否第二列显示工具栏

------------
## showinfobar
- 类型：Boolean
- 默认值：true
- 作用：是否显示顶部名称栏

------------
## showsheetbar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部表格名称区域

------------

## showstatisticBar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部计数栏

------------
## allowEdit
- 类型：Boolean
- 默认值：true
- 作用：是否允许前台编辑

------------
## enableAddRow
- 类型：Boolean
- 默认值：true
- 作用：允许增加行

------------
## enableAddCol
- 类型：Boolean
- 默认值：true
- 作用：允许增加列

------------
## pointEdit
- 类型：Boolean
- 默认值：false
- 作用：是否是编辑器插入表格模式

------------
## pointEditUpdate
- 类型：Function
- 默认值：null
- 作用：编辑器表格更新函数

------------
## pointEditZoom
- 类型：Number
- 默认值：1
- 作用：编辑器表格编辑时缩放比例

------------
## userInfo
- 类型：String
- 默认值：`'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> rabbit'`
- 作用：右上角的用户信息展示样式

------------
## userMenuItem
- 类型：Array
- 默认值：`[{url:"www.baidu.com", "icon":'<i class="fa fa-folder" aria-hidden="true"></i>', "name":"我的表格"}, {url:"www.baidu.com", "icon":'<i class="fa fa-sign-out" aria-hidden="true"></i>', "name":"退出登陆"}]`
- 作用：点击右上角的用户信息弹出的菜单

------------
## myFolderUrl
- 类型：String
- 默认值："www.baidu.com"
- 作用：左上角<返回按钮的链接

------------
## devicePixelRatio
- 类型：Number
- 默认值：window.devicePixelRatio
- 作用：设备比例，比例越大表格分辨率越高

------------
## gridKey
- 类型：String
- 默认值：""
- 作用：表格唯一标识符

------------
## loadUrl
- 类型：String
- 默认值：""
- 作用：配置`loadUrl`的地址，Luckysheet会通过ajax请求表格数据，默认载入status为1的sheet数据中的所有`data`，其余的sheet载入除`data`字段外的所有字段

------------
## loadSheetUrl
- 类型：String
- 默认值：""
- 作用：配置`loadSheetUrl`的地址，参数为`gridKey`（表格主键） 和 `index`（sheet主键合集，格式为`[1,2,3]`），返回的数据为sheet的`data`字段数据集合

------------
## updateUrl
- 类型：String
- 默认值：""
- 作用：表格数据的更新地址

------------
## updateImageUrl
- 类型：String
- 默认值：""
- 作用：缩略图的更新地址

------------
## allowUpdate
- 类型：Boolean
- 默认值：false
- 作用：是否允许编辑后的后台更新

------------
## functionButton
- 类型：String
- 默认值：""
- 作用：右上角功能按钮，例如`'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">下载</button>    <button id="" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">分享</button>    <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">秀数据</button>'`

------------
## showConfigWindowResize
- 类型：Boolean
- 默认值：true
- 作用：图表或数据透视表的配置会在右侧弹出，设置弹出后表格是否会自动缩进

------------
## enablePage
- 类型：Boolean
- 默认值：false
- 作用：允许加载下一页

------------
## chartConfigChange
- 类型：Function
- 默认值：null
- 作用：图表插件中图表更新触发的自定义方法

------------
## beforeCreateDom
- 类型：Function
- 默认值：null
- 作用：表格创建之前自定义方法

------------
## fireMousedown
- 类型：Function
- 默认值：null
- 作用：单元格数据下钻自定义方法

------------