# 整体配置

## 基础结构

初始化表格时，可以设置一个对象配置串`options`来自定义配置Luckysheet表格。

如下是一个简洁的配置案例：

```js
// 配置项
const options = {
    container: 'luckysheet', // 设定DOM容器的id
    title: 'Luckysheet Demo', // 设定表格名称
    lang: 'zh' // 设定表格语言

    // 更多其他设置...
}

// 初始化表格
luckysheet.create(options)
```

这里的`options`配置项会作用于整个表格，特别的，单个sheet的配置则需要在`options.data`数组中，分别设置对应更详细的参数，参考[工作表配置](/zh/guide/sheet.html)

针对个性化的需求，除了允许配置信息栏（[showinfobar](#showinfobar)）、工具栏（[showtoolbar](#showtoolbar)）、底部sheet页（[showsheetbar](#showsheetbar)）、底部计数栏（[showstatisticBar](#showstatisticBar)）之外，
Luckysheet开放了更细致的自定义配置选项，分别有

- 自定义工具栏（[showtoolbarConfig](#showtoolbarConfig)）
- 自定义底部sheet页（[showsheetbarConfig](#showsheetbarConfig)）
- 自定义计数栏（[showstatisticBarConfig](#showstatisticBarConfig)）
- 自定义单元格右键菜单（[cellRightClickConfig](#cellRightClickConfig)）
- 自定义底部sheet页右击菜单（[sheetRightClickConfig](#sheetRightClickConfig)）


## 配置项

以下为所有支持的设置参数

- 容器ID [container](#container)
- 工作簿名称 [title](#title)
- 语言 [lang](#lang)
- 唯一key [gridKey](#gridKey)
- 加载整个工作簿 [loadUrl](#loadUrl)
- 加载其它页celldata [loadSheetUrl](#loadSheetUrl)
- 允许更新 [allowUpdate](#allowUpdate)
- 更新地址 [updateUrl](#updateUrl)
- 缩略图更新地址 [updateImageUrl](#updateImageUrl)
- 工作表配置 [data](#data)
- 插件 [plugins](#plugins)
- 列数 [column](#column)
- 行数 [row](#row)
- 亿万格式 [autoFormatw](#autoFormatw)
- 精度 [accuracy](#accuracy)
- 允许复制 [allowCopy](#allowCopy)
- 工具栏 [showtoolbar](#showtoolbar)
- 自定义工具栏[showtoolbarConfig](#showtoolbarConfig)
- 信息栏 [showinfobar](#showinfobar)
- 底部sheet页 [showsheetbar](#showsheetbar)
- 自定义底部sheet页 [showsheetbarConfig](#showsheetbarConfig)
- 底部计数栏 [showstatisticBar](#showstatisticBar)
- 自定义计数栏 [showstatisticBarConfig](#showstatisticBarConfig)
- 允许编辑 [allowEdit](#allowEdit)
- 允许添加行 [enableAddRow](#enableAddRow)
- 允许回到顶部 [enableAddBackTop](#enableAddBackTop)
- 用户信息 [userInfo](#userInfo)
- 用户信息菜单 [userMenuItem](#userMenuItem)
- 返回按钮链接 [myFolderUrl](#myFolderUrl)
- 比例 [devicePixelRatio](#devicePixelRatio)
- 功能按钮 [functionButton](#functionButton)
- 自动缩进界面 [showConfigWindowResize](#showConfigWindowResize)
- 刷新公式 [forceCalculation](#forceCalculation)
- 自定义单元格右键菜单 [cellRightClickConfig](#cellRightClickConfig)
- 自定义sheet页右击菜单 [sheetRightClickConfig](#sheetRightClickConfig)
- 行标题区域的宽度 [rowHeaderWidth](#rowHeaderWidth)
- 列标题区域的高度 [columnHeaderHeight](#columnHeaderHeight)
- 是否显示公式栏 [sheetFormulaBar](#sheetFormulaBar)
- 初始化默认字体大小 [defaultFontSize](#defaultFontSize)

### container
- 类型：String
- 默认值："luckysheet"
- 作用：容器的ID
  
------------
### title
- 类型：String
- 默认值："Luckysheet Demo"
- 作用：工作簿名称

------------
### lang
- 类型：String
- 默认值："en"
- 作用：国际化设置，允许设置表格的语言，支持中文("zh")和英文("en")

------------
### gridKey
- 类型：String
- 默认值：""
- 作用：表格唯一标识符

------------
### loadUrl
- 类型：String
- 默认值：""
- 作用：配置`loadUrl`接口地址，加载所有工作表的配置，并包含当前页单元格数据，与`loadSheetUrl`配合使用。参数为`gridKey`（表格主键）。

	源码的请求写法是：
	```js
	$.post(loadurl, {"gridKey" : server.gridKey}, function (d) {})
	```
	> 参见源码 [`src/core.js`](https://github.com/mengshukeji/Luckysheet/blob/master/src/core.js)

	Luckysheet会通过ajax请求（POST）整个表格的数据，默认载入status为1的sheet数据中的`celldata`，其余的sheet载入除`celldata`字段外的所有配置字段。特别是在数据量大的时候，`loadUrl`只负责当前页单元格数据，配置`loadSheetUrl`作为其它工作表异步加载单元格数据的接口，可以提高性能。
	
	一个合格的接口返回的json字符串数据为：

	```js
	"[	
		//status为1的sheet页，重点是需要提供初始化的数据celldata
		{
			"name": "Cell",
			"index": "sheet_001",
			"order":  0,
			"status": 1,
			"celldata": [{"r":0,"c":0,"v":{"v":1,"m":"1","ct":{"fa":"General","t":"n"}}}]
		},
		//其他status为0的sheet页，无需提供celldata，只需要配置项即可
		{
			"name": "Data",
			"index": "sheet_002",
			"order":  1,
			"status": 0
		},
		{
			"name": "Picture",
			"index": "sheet_003",
			"order":  2,
			"status": 0
		}
	]"
	```
	有几个注意点
	+ 这是一个字符串，类似于JSON.stringify()处理后的json数据，压缩后的数据便于传输
	+ loadUrl是一个post请求，也是为了支持大数据量
	+ 考虑到一些公式、图表及数据透视表会引用其他sheet的数据，所以前台会加一个判断，如果该当前sheet引用了其他sheet的数据则会通过`loadSheetUrl`配置的接口地址请求数据，把引用到的sheet的数据一并补全，而不用等切换到其它页的时候再请求
	+ 当数据量小的时候，也可以不用Luckysheet提供的此接口，直接使用[data](#data)参数可以提前准备好所有表格数据用于初始化

------------
### loadSheetUrl
- 类型：String
- 默认值：""
- 作用：配置`loadSheetUrl`接口地址，用于异步加载其它单元格数据。参数为`gridKey`（表格主键） 和 `index`（sheet主键合集，格式为`["sheet_01","sheet_02","sheet_0"]`）。

	源码的请求写法是：
	```js
	$.post(loadSheetUrl, {"gridKey" : server.gridKey, "index": sheetindex.join(",")}, function (d) {})
	```
	> 参见源码 [`src/controllers/sheetmanage.js`](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/sheetmanage.js)

	返回的数据为sheet的`celldata`字段数据集合。

	一个合格的接口返回的json字符串数据为：

	```js
	"{
		"sheet_01": [
			{
				"r": 0,
				"c": 0,
				"v": { "v": 1, "m": "1", "ct": { "fa": "General", "t": "n" } }
			}
		],
		"sheet_02": [
			{
				"r": 0,
				"c": 0,
				"v": { "v": 1, "m": "1", "ct": { "fa": "General", "t": "n" } }
			}
		],
		"sheet_0": [
			{
				"r": 0,
				"c": 0,
				"v": { "v": 1, "m": "1", "ct": { "fa": "General", "t": "n" } }
			}
		]
	}"
	```
	同`loadUrl`类似，`loadSheetUrl`也要注意这几点：
	+ 这是一个字符串格式数据
	+ 这是一个post请求
	+ 这个接口会在两种情况下自动调用，一是在`loadUrl`加载的当前页数据时发现当前工作表引用了其他工作表，二是切换到一个未曾加载过数据的工作表时

------------
### allowUpdate
- 类型：Boolean
- 默认值：false
- 作用：是否允许操作表格后的后台更新，与`updateUrl`配合使用。如果要开启共享编辑，此参数必须设置为`true`。

------------
### updateUrl
- 类型：String
- 默认值：""
- 作用：操作表格后，实时保存数据的websocket地址，此接口也是共享编辑的接口地址。
	
	有个注意点，要想开启共享编辑，必须满足以下四个条件：
	+ `allowUpdate`为`true`
	+ 配置了`loadUrl`
	+ 配置了`loadSheetUrl`
	+ 配置了`updateUrl`

	注意，发送给后端的数据默认是经过pako压缩过后的。后台拿到数据需要先解压。

	通过共享编辑功能，可以实现Luckysheet实时保存数据和多人同步数据，每一次操作都会发送不同的参数到后台，具体的操作类型和参数参见[表格操作](/zh/guide/operate.html)

------------
### updateImageUrl
- 类型：String
- 默认值：""
- 作用：缩略图的更新地址

------------
### data
- 类型：Array
- 默认值：[{ "name": "Sheet1", color: "", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, { "name": "Sheet2", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1  }, { "name": "Sheet3", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2  }]
- 作用：当未配置`loadUrl`和`loadSheetUrl`的时候，需要手动配置传入整个客户端所有sheet数据`[shee1, sheet2, sheet3]`，详细参数设置参见[工作表配置](/zh/guide/sheet.html)

------------
### plugins
- 类型：Array
- 默认值：[]
- 作用：配置插件，支持图表："chart"

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
### autoFormatw
- 类型：Boolean
- 默认值：false
- 作用：自动格式化超过4位数的数字为‘亿万格式’，例：true or "true" or "TRUE"

------------
### accuracy
- 类型：Number
- 默认值：undefined
- 作用：设置精度，小数点后的位数。传参数为数字或数字字符串，例： "0" 或 0

------------
### allowCopy
- 类型：Boolean
- 默认值：true
- 作用：是否允许拷贝

------------
### showtoolbar
- 类型：Boolean
- 默认值：true
- 作用：是否显示工具栏

------------
### showtoolbarConfig

- 类型：Object
- 默认值：{}
- 作用：自定义配置工具栏，可以与showtoolbar配合使用，`showtoolbarConfig`拥有更高的优先级。
- 格式：
    ```json
    {
        undoRedo: false, //撤销重做，注意撤消重做是两个按钮，由这一个配置决定显示还是隐藏
        paintFormat: false, //格式刷
        currencyFormat: false, //货币格式
        percentageFormat: false, //百分比格式
        numberDecrease: false, // '减少小数位数'
        numberIncrease: false, // '增加小数位数
        moreFormats: false, // '更多格式'
        font: false, // '字体'
        fontSize: false, // '字号大小'
        bold: false, // '粗体 (Ctrl+B)'
        italic: false, // '斜体 (Ctrl+I)'
        strikethrough: false, // '删除线 (Alt+Shift+5)'
        textColor: false, // '文本颜色'
        fillColor: false, // '单元格颜色'
        border: false, // '边框'
        mergeCell: false, // '合并单元格'
        horizontalAlignMode: false, // '水平对齐方式'
        verticalAlignMode: false, // '垂直对齐方式'
        textWrapMode: false, // '换行方式'
        textRotateMode: false, // '文本旋转方式'
		image:false, // '插入图片'
		link:false, // '插入链接'
        chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
        postil:  false, //'批注'
        pivotTable: false,  //'数据透视表'
        function: false, // '公式'
        frozenMode: false, // '冻结方式'
        sortAndFilter: false, // '排序和筛选'
        conditionalFormat: false, // '条件格式'
		dataVerification: false, // '数据验证'
        splitColumn: false, // '分列'
        screenshot: false, // '截图'
        findAndReplace: false, // '查找替换'
		protection:false, // '工作表保护'
		print:false, // '打印'
    }
    ```
- 示例：
	- 仅显示撤消重做和字体按钮：
		
		```js
			//options
			{
				showtoolbar: false,
				showtoolbarConfig:{
					undoRedo: true,
					font: true,
				}
			}
		```
	- 仅隐藏图片和打印按钮：
		
		```js
			//options
			{
				showtoolbar: true, // 默认就是true，可以不设置
				showtoolbarConfig:{
					image: false,
					print: false,
				}
			}
		```

------------
### showinfobar
- 类型：Boolean
- 默认值：true
- 作用：是否显示顶部信息栏

------------
### showsheetbar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部sheet页按钮

------------
### showsheetbarConfig

- 类型：Object
- 默认值：{}
- 作用：自定义配置底部sheet页按钮，可以与showsheetbar配合使用，`showsheetbarConfig`拥有更高的优先级。
- 格式：
    ```json
    {
        add: false, //新增sheet  
        menu: false, //sheet管理菜单
        sheet: false //sheet页显示
    }
    ```
- 示例：
	- 仅显示新增sheet按钮：
		
		```js
			//options
			{
				showsheetbar: false,
				showsheetbarConfig:{
					add: true,
				}
			}
		```
	- 仅隐藏新增sheet和管理按钮：
		
		```js
			//options
			{
				showsheetbar: true, // 默认就是true，可以不设置
				showsheetbarConfig:{
					add: false,
					menu: false,
				}
			}
		```

------------
### showstatisticBar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部计数栏

------------
### showstatisticBarConfig

- 类型：Object
- 默认值：{}
- 作用：自定义配置底部计数栏，可以与showstatisticBar配合使用，`showstatisticBarConfig`拥有更高的优先级。
- 格式：
    ```json
    {
        count: false, // 计数栏
		view: false, // 打印视图
        zoom: false, // 缩放
    }
	```
- 示例：
	- 仅显示缩放按钮：
		
		```js
			//options
			{
				showstatisticBar: false,
				showstatisticBarConfig:{
					zoom: true,
				}
			}
		```
	- 仅隐藏打印视图按钮：
		
		```js
			//options
			{
				showstatisticBar: true, // 默认就是true，可以不设置
				showstatisticBarConfig:{
					view: false,
				}
			}
		```

------------
### allowEdit
- 类型：Boolean
- 默认值：true
- 作用：是否允许前台编辑

------------
### enableAddRow
- 类型：Boolean
- 默认值：true
- 作用：允许添加行

------------
### enableAddBackTop
- 类型：Boolean
- 默认值：true
- 作用：允许回到顶部

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
### devicePixelRatio
- 类型：Number
- 默认值：window.devicePixelRatio
- 作用：设备比例，比例越大表格分辨率越高

------------
### functionButton
- 类型：String
- 默认值：""
- 作用：右上角功能按钮，例如`'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">下载</button>    <button id="" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">分享</button>    <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">秀数据</button>'`

------------
### showConfigWindowResize
- 类型：Boolean
- 默认值：true
- 作用：图表或数据透视表的配置会在右侧弹出，设置弹出后表格是否会自动缩进

------------
### forceCalculation
- 类型：Boolean
- 默认值：false
- 作用：强制刷新公式。

    默认情况下，为提高加载性能，表格初始化的时候，含有公式的单元格会默认直接取得`v`和`m`作为数据结果，而不做实时计算。
    
    如果公式关联到的单元格数据已经变化，或者公式所在的单元格数据结果改变了，则会导致关联单元格应该计算得出的结果和实际显示结果不一致，这是就需要开启公式刷新，保证数据实时计算的准确性。
    
    ⚠️提醒，公式较多时会有性能问题，慎用！

------------
### cellRightClickConfig

- 类型：Object
- 默认值：{}
- 作用：自定义配置单元格右击菜单
- 格式：
    ```json
    {
        copy: false, // 复制
        copyAs: false, // 复制为
        paste: false, // 粘贴
        insertRow: false, // 插入行
        insertColumn: false, // 插入列
        deleteRow: false, // 删除选中行
        deleteColumn: false, // 删除选中列
        deleteCell: false, // 删除单元格
        hideRow: false, // 隐藏选中行和显示选中行
        hideColumn: false, // 隐藏选中列和显示选中列
        rowHeight: false, // 行高
        columnWidth: false, // 列宽
        clear: false, // 清除内容
        matrix: false, // 矩阵操作选区
        sort: false, // 排序选区
        filter: false, // 筛选选区
        chart: false, // 图表生成
        image: false, // 插入图片
        link: false, // 插入链接
        data: false, // 数据验证
		cellFormat: false // 设置单元格格式
    }
	```
	除了单元格，这里的配置还包括行标题右击菜单、列标题右击菜单和列标题下拉箭头的菜单，具体配置关系如下表格：
	
	|右击菜单配置|单元格|行标题|列标题|列箭头|
    | ------------ | ------------ | ------------ | ------------ | ------------ |
    |copy|复制|复制|复制|复制|
    |copyAs|复制为|复制为|复制为|复制为|
    |paste|粘贴|粘贴|粘贴|粘贴|
    |insertRow|插入行|向上增加N行，向下增加N行|-|-|
    |insertColumn|插入列|-|向左增加N列，向右增加N列|向左增加N列，向右增加N列|
    |deleteRow|删除选中行|删除选中行|-|-|
    |deleteColumn|删除选中列|-|删除选中列|删除选中列|
    |deleteCell|删除单元格|-|-|-|
    |hideRow|-|隐藏选中行和显示选中行|-|-|
    |hideColumn|-|-|隐藏选中列和显示选中列|隐藏选中列和显示选中列|
    |rowHeight|-|行高|-|-|
    |columnWidth|-|-|列宽|列宽|
    |clear|清除内容|清除内容|清除内容|-|
    |matrix|矩阵操作选区|矩阵操作选区|矩阵操作选区|-|
    |sort|排序选区|排序选区|排序选区|A-Z排序和Z-A排序|
    |filter|筛选选区|筛选选区|筛选选区|-|
    |chart|图表生成|图表生成|图表生成|-|
    |image|插入图片|插入图片|插入图片|-|
    |link|插入链接|插入链接|插入链接|-|
    |data|数据验证|数据验证|数据验证|-|
    |cellFormat|设置单元格格式|设置单元格格式|设置单元格格式|-|


------------
### sheetRightClickConfig

- 类型：Object
- 默认值：{}
- 作用：自定义配置sheet页右击菜单
- 格式：
    ```json
    {   
        delete: false, // 删除
        copy: false, // 复制
        rename: false, //重命名
        color: false, //更改颜色
        hide: false, //隐藏，取消隐藏
        move: false, //向左移，向右移
    }

------------
### rowHeaderWidth

- 类型：Number
- 默认值：46
- 作用：行标题区域的宽度，如果设置为0，则表示隐藏行标题

------------
### columnHeaderHeight

- 类型：Number
- 默认值：20
- 作用：列标题区域的高度，如果设置为0，则表示隐藏列标题

------------
### sheetFormulaBar

- 类型：Boolean
- 默认值：true
- 作用：是否显示公式栏

------------
### defaultFontSize
- 类型：Number
- 默认值：11
- 作用：初始化默认字体大小

------------

## 钩子函数

钩子函数应用于二次开发时，会在各个常用鼠标或者键盘操作时植入钩子，调用开发者传入的函数，起到扩展Luckysheet功能的作用。

钩子函数统一配置在`options.hook`下，可以分别针对单元格、sheet页、表格创建配置hook。

## 单元格

### cellRenderBefore

- 类型：Function
- 默认值：null
- 作用：单元格渲染前触发，`return false` 则不渲染该单元格
- 参数：
	- {Object} [cell]:单元格对象
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [c]:单元格所在列号
		+ {Number} [start_r]:单元格左上角的水平坐标
		+ {Number} [start_c]:单元格左上角的垂直坐标
		+ {Number} [end_r]:单元格右下角的水平坐标
		+ {Number} [end_c]:单元格右下角的垂直坐标
	- {Object} [sheet]:当前sheet对象
	- {Object} [ctx]: 当前画布的context

------------
### cellRenderAfter

- 类型：Function
- 默认值：null
- 作用：单元格渲染结束后触发，`return false` 则不渲染该单元格
- 参数：
	- {Object} [cell]:单元格对象
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [c]:单元格所在列号
		+ {Number} [start_r]:单元格左上角的水平坐标
		+ {Number} [start_c]:单元格左上角的垂直坐标
		+ {Number} [end_r]:单元格右下角的水平坐标
		+ {Number} [end_c]:单元格右下角的垂直坐标
	- {Object} [sheet]:当前sheet对象
	- {Object} [ctx]: 当前画布的context

------------
### cellEditBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：双击单元格后触发，即在双击单元格编辑内容的时候，最先触发这个方法
- 参数：
	- {Number} [r]: 单元格所在行数
	- {Number} [c]: 单元格所在列数
	- {Object} [v]: 单元格对象

------------
### cellEditAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：双击单元格后触发，即在双击单元格编辑内容的时候，最后触发这个方法
- 参数：
	- {Number} [r]: 单元格所在行数
	- {Number} [c]: 单元格所在列数
	- {Object} [oldV]: 修改前单元格对象
	- {Object} [newV]: 修改后单元格对象

------------
### rowTitleCellRenderBefore

- 类型：Function
- 默认值：null
- 作用：行标题单元格渲染前触发，`return false` 则不渲染行标题
- 参数：
	- {String} [rowNum]:行号
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [top]:单元格左上角的垂直坐标
		+ {Number} [width]:单元格宽度
		+ {Number} [height]:单元格高度
	- {Object} [ctx]: 当前画布的context

------------
### rowTitleCellRenderAfter

- 类型：Function
- 默认值：null
- 作用：行标题单元格渲染后触发，`return false` 则不渲染行标题
- 参数：
	- {String} [rowNum]:行号
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [top]:单元格左上角的垂直坐标
		+ {Number} [width]:单元格宽度
		+ {Number} [height]:单元格高度
	- {Object} [ctx]: 当前画布的context

------------
### columnTitleCellRenderBefore

- 类型：Function
- 默认值：null
- 作用：列标题单元格渲染前触发，`return false` 则不渲染列标题
- 参数：
	- {Object} [columnAbc]:列标题字符
	- {Object} [postion]:
		- {Number} [c]:单元格所在列号
		- {Number} [left]:单元格左上角的水平坐标
		- {Number} [width]:单元格宽度
		- {Number} [height]:单元格高度
	- {Object} [ctx]: 当前画布的context

------------
### columnTitleCellRenderAfter

- 类型：Function
- 默认值：null
- 作用：列标题单元格渲染后触发，`return false` 则不渲染列标题
- 参数：
	- {Object} [columnAbc]:列标题字符
	- {Object} [postion]:
		- {Number} [c]:单元格所在列号
		- {Number} [left]:单元格左上角的水平坐标
		- {Number} [width]:单元格宽度
		- {Number} [height]:单元格高度
	- {Object} [ctx]: 当前画布的context

------------

## 鼠标钩子

### cellMousedownBefore

- 类型：Function
- 默认值：null
- 作用：单元格点击前的事件，`return false`则终止之后的点击操作
- 参数：
	- {Object} [cell]:单元格对象
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [c]:单元格所在列号
		+ {Number} [start_r]:单元格左上角的水平坐标
		+ {Number} [start_c]:单元格左上角的垂直坐标
		+ {Number} [end_r]:单元格右下角的水平坐标
		+ {Number} [end_c]:单元格右下角的垂直坐标
	- {Object} [sheet]:当前sheet对象
	- {Object} [ctx]: 当前画布的context

------------
### cellMousedown

- 类型：Function
- 默认值：null
- 作用：单元格点击后的事件，`return false`则终止之后的点击操作
- 参数：
	- {Object} [cell]:单元格对象
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [c]:单元格所在列号
		+ {Number} [start_r]:单元格左上角的水平坐标
		+ {Number} [start_c]:单元格左上角的垂直坐标
		+ {Number} [end_r]:单元格右下角的水平坐标
		+ {Number} [end_c]:单元格右下角的垂直坐标
	- {Object} [sheet]:当前sheet对象
	- {Object} [ctx]: 当前画布的context

------------
### sheetMousemove

- 类型：Function
- 默认值：null
- 作用：鼠标移动事件，可通过cell判断鼠标停留在哪个单元格
- 参数：
	- {Object} [cell]:单元格对象
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [c]:单元格所在列号
		+ {Number} [start_r]:单元格左上角的水平坐标
		+ {Number} [start_c]:单元格左上角的垂直坐标
		+ {Number} [end_r]:单元格右下角的水平坐标
		+ {Number} [end_c]:单元格右下角的垂直坐标
	- {Object} [sheet]:当前sheet对象
	- {Object} [moveState]:鼠标移动状态，可判断现在鼠标操作的对象，false和true
		+ {Boolean} [functionResizeStatus]:工具栏拖动
		+ {Boolean} [horizontalmoveState]:水平冻结分割烂拖动
		+ {Boolean} [verticalmoveState]:垂直冻结分割烂拖动
		+ {Boolean} [pivotTableMoveState]:数据透视表字段拖动
		+ {Boolean} [sheetMoveStatus]:sheet改变你位置拖动
		+ {Boolean} [scrollStatus]:鼠标触发了滚动条移动
		+ {Boolean} [selectStatus]:鼠标移动框选数据
		+ {Boolean} [rowsSelectedStatus]:通过行标题来选择整行操作
		+ {Boolean} [colsSelectedStatus]:通过列标题来选择整列操作
		+ {Boolean} [cellSelectedMove]:选框的移动
		+ {Boolean} [cellSelectedExtend]:选框下拉填充
		+ {Boolean} [colsChangeSize]:拖拽改变列宽
		+ {Boolean} [rowsChangeSize]:拖拽改变行高
		+ {Boolean} [chartMove]:图表移动
		+ {Boolean} [chartResize]:图表改变大小
		+ {Boolean} [rangeResize]:公式参数高亮选区的大小拖拽
		+ {Boolean} [rangeMove]:公式参数高亮选区的位置拖拽
	- {Object} [ctx]: 当前画布的context

------------
### sheetMouseup

- 类型：Function
- 默认值：null
- 作用：鼠标按钮释放事件，可通过cell判断鼠标停留在哪个单元格
- 参数：
	- {Object} [cell]:单元格对象
	- {Object} [postion]:
		+ {Number} [r]:单元格所在行号
		+ {Number} [c]:单元格所在列号
		+ {Number} [start_r]:单元格左上角的水平坐标
		+ {Number} [start_c]:单元格左上角的垂直坐标
		+ {Number} [end_r]:单元格右下角的水平坐标
		+ {Number} [end_c]:单元格右下角的垂直坐标
	- {Object} [sheet]:当前sheet对象
	- {Object} [moveState]:鼠标移动状态，可判断现在鼠标操作的对象，false和true
		+ {Boolean} [functionResizeStatus]:工具栏拖动
		+ {Boolean} [horizontalmoveState]:水平冻结分割烂拖动
		+ {Boolean} [verticalmoveState]:垂直冻结分割烂拖动
		+ {Boolean} [pivotTableMoveState]:数据透视表字段拖动
		+ {Boolean} [sheetMoveStatus]:sheet改变你位置拖动
		+ {Boolean} [scrollStatus]:鼠标触发了滚动条移动
		+ {Boolean} [selectStatus]:鼠标移动框选数据
		+ {Boolean} [rowsSelectedStatus]:通过行标题来选择整行操作
		+ {Boolean} [colsSelectedStatus]:通过列标题来选择整列操作
		+ {Boolean} [cellSelectedMove]:选框的移动
		+ {Boolean} [cellSelectedExtend]:选框下拉填充
		+ {Boolean} [colsChangeSize]:拖拽改变列宽
		+ {Boolean} [rowsChangeSize]:拖拽改变行高
		+ {Boolean} [chartMove]:图表移动
		+ {Boolean} [chartResize]:图表改变大小
		+ {Boolean} [rangeResize]:公式参数高亮选区的大小拖拽
		+ {Boolean} [rangeMove]:公式参数高亮选区的位置拖拽
	- {Object} [ctx]: 当前画布的context

------------

## 选区

### rangeSelectBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：框选或者设置选区前触发
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区

------------
### rangeSelectAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：框选或者设置选区后触发
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区

------------
### rangeMoveBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：移动选区前，包括单个单元格
- 参数：
	- {Array} [range]: 当前选区范围，只能为单个选区

------------
### rangeMoveAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：移动选区后，包括单个单元格
- 参数：
	- {Array} [oldRange]: 移动前当前选区范围，只能为单个选区
	- {Array} [newRange]: 移动后当前选区范围，只能为单个选区

------------
### rangeEditBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区修改前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 选区范围所对应的数据

------------
### rangeEditAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区修改后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
    - {Object} [oldData]: 修改前选区范围所对应的数据
    - {Object} [newData]: 修改后选区范围所对应的数据

------------
### rangeCopyBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区复制前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 选区范围所对应的数据

------------
### rangeCopyAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区复制后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 选区范围所对应的数据

------------
### rangePasteBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区粘贴前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 要被粘贴的选区范围所对应的数据

------------
### rangePasteAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区粘贴后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [originData]: 要被粘贴的选区范围所对应的数据
	- {Object} [pasteData]: 要粘贴的数据

------------
### rangeCutBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区剪切前
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 要被剪切的选区范围所对应的数据

------------
### rangeCutAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区剪切后
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 被剪切的选区范围所对应的数据

------------
### rangeDeleteBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区删除前
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 要被删除的选区范围所对应的数据

------------
### rangeDeleteAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区删除后
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 被删除的选区范围所对应的数据

------------
### rangeClearBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区清除前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 要被清除的选区范围所对应的数据

------------
### rangeClearAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区清除后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 被清除的选区范围所对应的数据

------------
### rangePullBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区下拉前
- 参数：
	- {Array} [range]: 当前选区范围，只能为单个范围

------------
### rangePullAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：选区下拉后
- 参数：
	- {Array} [range]: 下拉后的选区范围，只能为单个范围

------------

## 工作表

### sheetCreatekBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：创建sheet页前触发，sheet页新建也包含数据透视表新建

------------
### sheetCreateAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：创建sheet页后触发，sheet页新建也包含数据透视表新建
- 参数：
	- {Object} [sheet]: 当前新创建的sheet页的配置

------------
### sheetMoveBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet移动前
- 参数：
	- {Number} [i]: 当前sheet页的`index`
	- {Number} [order]: 当前sheet页`order`

------------
### sheetMoveAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet移动后
- 参数：
	- {Number} [i]: 当前sheet页的`index`
	- {Number} [oldOrder]: 修改前当前sheet页`order`
	- {Number} [newOrder]: 修改后当前sheet页`order`

------------
### sheetDeleteBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet删除前
- 参数：
	- {Object} [sheet]: 要被删除sheet页的配置

------------
### sheetDeleteAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet删除后
- 参数：
	- {Object} [sheet]: 已被删除sheet页的配置

------------
### sheetEditNameBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet修改名称前
- 参数：
	- {Number} [i]: sheet页的`index`
	- {String} [name]: 当前sheet页名称

------------
### sheetEditNameAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet修改名称后
- 参数：
	- {Number} [i]: sheet页的index
	- {String} [oldName]: 修改前当前sheet页名称
	- {String} [newName]: 修改后当前sheet页名称

------------
### sheetEditColorBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet修改颜色前
- 参数：
	- {Number} [i]: sheet页的`index`
	- {String} [color]: 当前sheet页颜色

------------
### sheetEditColorAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet修改颜色后
- 参数：
	- {Number} [i]: sheet页的`index`
	- {String} [oldColor]: 修改前当前sheet页颜色
	- {String} [newColor]: 修改后当前sheet页颜色

------------
### sheetZoomBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet缩放前
- 参数：
	- {Number} [i]: sheet页的`index`
	- {String} [zoom]: 当前sheet页缩放比例

------------
### sheetZoomAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：sheet缩放后
- 参数：
	- {Number} [i]: sheet页的`index`
	- {String} [oldZoom]: 修改前当前sheet页缩放比例
	- {String} [newZoom]: 修改后当前sheet页缩放比例

------------

## 工作簿

### workbookCreateBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：表格创建之前触发。旧的钩子函数叫做`beforeCreateDom`
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
    
------------
### workbookCreateAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：表格创建之后触发
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
     
------------
### workbookDestroyBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：表格销毁之前触发
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
    
------------
### workbookDestroyAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：表格销毁之后触发
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
    
------------
### updated
（TODO）
- 类型：Function
- 默认值：null
- 作用：每次操作更新后执行的方法,在画布渲染之后执行，即客户端每执行一次表格操作，Luckysheet将这次操作存到历史记录中后触发，撤销重做时因为也算一次操作，当然也会触发此钩子函数。
- 参数：
	- {Object} [operate]: 本次操作的历史记录信息，根据不同的操作，会有不同的历史记录，参考源码 [历史记录](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/controlHistory.js)
    
------------
### resized
（TODO）
- 类型：Function
- 默认值：null
- 作用：resize执行之后
- 参数：
	- {Object} [size]: 整个工作簿区域的宽高
    
------------

## 图片

### imageInsertBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：图片插入之前
- 参数：
	- {Object} [url]: 图片地址
    
------------
### imageInsertAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：图片插入之后
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------
### imageUpdateBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：图片修改之前，修改的内容包括宽高、位置、裁剪等操作
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------
### imageUpdateAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：图片修改之后，修改的内容包括宽高、位置、裁剪等操作
- 参数：
	- {Object} [oldItem]]: 修改前图片地址、宽高、位置等信息
	- {Object} [newItem]]: 修改后图片地址、宽高、位置等信息
    
------------
### imageDeleteBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：图片删除之前
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------
### imageDeleteAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：图片删除之后
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------

## 批注

### commentInsertBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：插入批注之前
- 参数：
	- {Object} [cell]: 要插入的批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentInsertAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：插入批注之后
- 参数：
	- {Object} [cell]: 被插入批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`，包含批注信息
    
------------
### commentDeleteBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：删除批注之前
- 参数：
	- {Object} [cell]: 要删除的批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentDeleteAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：删除批注之后
- 参数：
	- {Object} [cell]: 被删除批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`
    
------------
### commentUpdateBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：修改批注之前
- 参数：
	- {Object} [cell]: 批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentUpdateAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：修改批注之后
- 参数：
	- {Object} [oldCell]: 修改前批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`
	- {Object} [newCell]: 修改后批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`
    
------------

## 数据透视表

### pivotTableEditBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：修改数据透视表之前，操作如：拖动字段等
- 参数：
	- {Object} [sheet]: 数据透视表所在sheet页配置

------------
### pivotTableEditAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：修改数据透视表之后，操作如：拖动字段等
- 参数：
	- {Object} [oldSheet]: 修改前数据透视表所在sheet页配置
	- {Object} [newSheet]: 修改后数据透视表所在sheet页配置
    
------------

## 冻结

### frozenCreateBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：设置冻结前
- 参数：
	- {Object} [frozen]: 冻结类型信息

------------
### frozenCreateAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：设置冻结后
- 参数：
	- {Object} [frozen]: 冻结类型信息
    
------------
### frozenCancelBefore
（TODO）
- 类型：Function
- 默认值：null
- 作用：取消冻结前
- 参数：
	- {Object} [frozen]: 冻结类型信息

------------
### frozenCancelAfter
（TODO）
- 类型：Function
- 默认值：null
- 作用：取消冻结后
- 参数：
	- {Object} [frozen]: 冻结类型信息
    
------------

## 旧版钩子函数

### fireMousedown

- 类型：Function
- 默认值：null
- 作用：单元格数据下钻自定义方法，注意此钩子函数是挂载在options下：`options.fireMousedown`

------------