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

针对个性化的需求，除了允许配置名称栏（[showinfobar](#showinfobar)）、工具栏（[showtoolbar](#showtoolbar)）、底部sheet页（[showsheetbar](#showsheetbar)）、底部计数栏（[showstatisticBar](#showstatisticBar)）之外，
Luckysheet开放了更细致的自定义配置选项，分别有

- 自定义工具栏（[showtoolbarConfig](#showtoolbarConfig)）
- 自定义底部sheet页（[showsheetbarConfig](#showsheetbarConfig)）
- 自定义计数栏（[showstatisticBarConfig](#showstatisticBarConfig)）
- 自定义添加行和回到顶部（[sheetBottomConfig](#sheetBottomConfig)）
- 自定义单元格右键菜单（[cellRightClickConfig](#cellRightClickConfig)）
- 自定义sheet页右击菜单（[sheetRightClickConfig](#sheetRightClickConfig)）


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
- 名称栏 [showinfobar](#showinfobar)
- 底部sheet页 [showsheetbar](#showsheetbar)
- 自定义底部sheet页 [showsheetbarConfig](#showsheetbarConfig)
- 底部计数栏 [showstatisticBar](#showstatisticBar)
- 自定义计数栏 [showstatisticBarConfig](#showstatisticBarConfig)
- 自定义添加行和回到顶部 [sheetBottomConfig](#sheetBottomConfig)
- 允许编辑 [allowEdit](#allowEdit)
- 允许增加行 [enableAddRow](#enableAddRow)
- 允许增加列 [enableAddCol](#enableAddCol)
- 用户信息 [userInfo](#userInfo)
- 用户信息菜单 [userMenuItem](#userMenuItem)
- 返回按钮链接 [myFolderUrl](#myFolderUrl)
- 比例 [devicePixelRatio](#devicePixelRatio)
- 功能按钮 [functionButton](#functionButton)
- 自动缩进界面 [showConfigWindowResize](#showConfigWindowResize)
- 加载下一页 [enablePage](#enablePage)
- 全屏模式 [fullscreenmode](#fullscreenmode)
- 刷新公式 [forceCalculation](#forceCalculation)
- 自定义单元格右键菜单 [cellRightClickConfig](#cellRightClickConfig)
- 自定义sheet页右击菜单 [sheetRightClickConfig](#sheetRightClickConfig)

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
- 作用：配置`loadUrl`的地址，Luckysheet会通过ajax请求整个表格数据，默认载入status为1的sheet数据中的所有`celldata`，其余的sheet载入除`celldata`字段外的所有字段。但是考虑到一些公式、图表及数据透视表会引用其他sheet的数据，所以前台会加一个判断，如果该当前sheet引用了其他sheet的数据则把引用到的sheet的数据一并补全。

------------
### loadSheetUrl
- 类型：String
- 默认值：""
- 作用：配置`loadSheetUrl`的地址，参数为`gridKey`（表格主键） 和 `index`（sheet主键合集，格式为`[1,2,3]`），返回的数据为sheet的`celldata`字段数据集合

------------
### allowUpdate
- 类型：Boolean
- 默认值：false
- 作用：是否允许操作表格后的后台更新，与`updateUrl`配合使用

------------
### updateUrl
- 类型：String
- 默认值：""
- 作用：操作表格后的后台更新地址，在`allowUpdate`为`true`时才会有效

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
- 作用：是否第二列显示工具栏

------------
### showtoolbarConfig

[todo]

- 类型：Object
- 默认值：{}
- 作用：自定义配置工具栏
- 格式：
    ```json
    {
        undoRedo: false, //撤销重做
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
        frozenMode: false, // '冻结方式'
        sort: false, // '排序'
        filter: false, // '筛选'
        findAndReplace: false, // '查找替换'
        function: false, // '公式'
        conditionalFormat: false, // '条件格式'
        postil:  false, //'批注'
        pivotTable: false,  //'数据透视表'
        chart: false, // '图表'（图标隐藏，但是如果配置了chart插件，右击仍然可以新建图表）
        screenshot: false, // '截图'
        splitColumn: false, // '分列'        
    }
    ```

------------
### showinfobar
- 类型：Boolean
- 默认值：true
- 作用：是否显示顶部名称栏

------------
### showsheetbar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部sheet页按钮

------------
### showsheetbarConfig

[todo]

- 类型：Object
- 默认值：{}
- 作用：自定义配置底部sheet页按钮
- 格式：
    ```json
    {
        add: false, //新增sheet  
        menu: false, //sheet管理菜单
        sheet: false //sheet页显示
    }
    ```

------------
### showstatisticBar
- 类型：Boolean
- 默认值：true
- 作用：是否显示底部计数栏

------------
### showstatisticBarConfig

[todo]

- 类型：Object
- 默认值：{}
- 作用：自定义配置底部计数栏
- 格式：
    ```json
    {
        count: false, // 计数栏
        zoom: false // 缩放
    }

------------
### sheetBottomConfig

[todo]

- 类型：Object
- 默认值：{}
- 作用：sheet页下方的添加行按钮和回到顶部按钮配置
- 格式：
    ```json
    {
        addRow: false, // 添加行按钮
        backTop: false // 回到顶部
    }

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
### enablePage
- 类型：Boolean
- 默认值：false
- 作用：允许加载下一页

------------
### fullscreenmode
- 类型：Boolean
- 默认值：true
- 作用：是否全屏模式。非全屏模式下，标记框不会强制选中

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

[todo]

- 类型：Object
- 默认值：{}
- 作用：自定义配置单元格右击菜单
- 格式：
    ```json
    {
        copy: false, // '复制'
        copyAs: false, // '复制为'
        paste: false, // '粘贴'
        insert: false, // '插入'
        delete: false, // '删除'
        hide: false, // '隐藏'
        deleteCell: false, // '删除单元格'
        clear: false, // '清除内容'
        matrix: false, // '矩阵操作选区'
        sort: false, // '排序选区'
        filter: false, //'筛选选区'
        chart: false // '图表生成'
    }

------------
### sheetRightClickConfig

[todo]

- 类型：Object
- 默认值：{}
- 作用：自定义配置sheet页右击菜单
- 格式：
    ```json
    {   
        delete: false, // '删除'
        copy: false, // '复制'
        rename: false, //重命名
        color: false, //更改颜色
        hide: false, //隐藏
        show: false, //取消隐藏
        left: false, //向左移
        right: false //向右移
    }

------------

## 钩子函数（TODO）

钩子函数应用于二次开发时，会在各个常用鼠标或者键盘操作时植入钩子，调用开发者传入的函数，起到扩展Luckysheet功能的作用。

钩子函数统一配置在`options.hook`下，可以分别针对单元格、sheet页、表格创建配置hook。

## 单元格

### cellRenderAfter
- 类型：Function
- 默认值：null
- 作用：单元格渲染结束后触发
- 参数：
	- {Number} [r]: 单元格所在行数
	- {Number} [c]: 单元格所在列数
	- {Object} [v]: 单元格对象

------------
### cellHover
- 类型：Function
- 默认值：null
- 作用：鼠标移过单元格时(hover)触发
- 参数：
	- {Number} [r]: 单元格所在行数
	- {Number} [c]: 单元格所在列数
	- {Object} [v]: 单元格对象

------------
### cellEditBefore
- 类型：Function
- 默认值：null
- 作用：双击单元格后触发，即在双击单元格编辑内容的时候，最先触发这个方法
- 参数：
	- {Number} [r]: 单元格所在行数
	- {Number} [c]: 单元格所在列数
	- {Object} [v]: 单元格对象

------------
### cellEditAfter
- 类型：Function
- 默认值：null
- 作用：双击单元格后触发，即在双击单元格编辑内容的时候，最后触发这个方法
- 参数：
	- {Number} [r]: 单元格所在行数
	- {Number} [c]: 单元格所在列数
	- {Object} [oldV]: 修改前单元格对象
	- {Object} [newV]: 修改后单元格对象

------------
### fireMousedown
- 类型：Function
- 默认值：null
- 作用：单元格数据下钻自定义方法

------------

## 选区

### rangeSelectBefore
- 类型：Function
- 默认值：null
- 作用：框选或者设置选区前触发
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区

------------
### rangeSelectAfter
- 类型：Function
- 默认值：null
- 作用：框选或者设置选区后触发
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区

------------
### rangeMoveBefore
- 类型：Function
- 默认值：null
- 作用：移动选区前，包括单个单元格
- 参数：
	- {Array} [range]: 当前选区范围，只能为单个选区

------------
### rangeMoveAfter
- 类型：Function
- 默认值：null
- 作用：移动选区后，包括单个单元格
- 参数：
	- {Array} [oldRange]: 移动前当前选区范围，只能为单个选区
	- {Array} [newRange]: 移动后当前选区范围，只能为单个选区

------------
### rangeEditBefore
- 类型：Function
- 默认值：null
- 作用：选区修改前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 选区范围所对应的数据

------------
### rangeEditAfter
- 类型：Function
- 默认值：null
- 作用：选区修改后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
    - {Object} [oldData]: 修改前选区范围所对应的数据
    - {Object} [newData]: 修改后选区范围所对应的数据

------------
### rangeCopyBefore
- 类型：Function
- 默认值：null
- 作用：选区复制前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 选区范围所对应的数据

------------
### rangeCopyAfter
- 类型：Function
- 默认值：null
- 作用：选区复制后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 选区范围所对应的数据

------------
### rangePasteBefore
- 类型：Function
- 默认值：null
- 作用：选区粘贴前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 要被粘贴的选区范围所对应的数据

------------
### rangePasteAfter
- 类型：Function
- 默认值：null
- 作用：选区粘贴后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [originData]: 要被粘贴的选区范围所对应的数据
	- {Object} [pasteData]: 要粘贴的数据

------------
### rangeCutBefore
- 类型：Function
- 默认值：null
- 作用：选区剪切前
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 要被剪切的选区范围所对应的数据

------------
### rangeCutAfter
- 类型：Function
- 默认值：null
- 作用：选区剪切后
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 被剪切的选区范围所对应的数据

------------
### rangeDeleteBefore
- 类型：Function
- 默认值：null
- 作用：选区删除前
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 要被删除的选区范围所对应的数据

------------
### rangeDeleteAfter
- 类型：Function
- 默认值：null
- 作用：选区删除后
- 参数：
	- {Array} [range]: 选区范围，只能为单个范围
	- {Object} [data]: 被删除的选区范围所对应的数据

------------
### rangeClearBefore
- 类型：Function
- 默认值：null
- 作用：选区清除前
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 要被清除的选区范围所对应的数据

------------
### rangeClearAfter
- 类型：Function
- 默认值：null
- 作用：选区清除后
- 参数：
	- {Object || Array} [range]: 选区范围，可能为多个选区
	- {Object} [data]: 被清除的选区范围所对应的数据

------------
### rangePullBefore
- 类型：Function
- 默认值：null
- 作用：选区下拉前
- 参数：
	- {Array} [range]: 当前选区范围，只能为单个范围

------------
### rangePullAfter
- 类型：Function
- 默认值：null
- 作用：选区下拉后
- 参数：
	- {Array} [range]: 下拉后的选区范围，只能为单个范围

------------

## 工作表

### sheetCreatekBefore
- 类型：Function
- 默认值：null
- 作用：创建sheet页前触发，sheet页新建也包含数据透视表新建

------------
### sheetCreateAfter
- 类型：Function
- 默认值：null
- 作用：创建sheet页后触发，sheet页新建也包含数据透视表新建
- 参数：
	- {Object} [sheet]: 当前新创建的sheet页的配置

------------
### sheetMoveBefore
- 类型：Function
- 默认值：null
- 作用：sheet移动前
- 参数：
	- {Number} [i]: 当前sheet页的index
	- {Number} [order]: 当前sheet页order

------------
### sheetMoveAfter
- 类型：Function
- 默认值：null
- 作用：sheet移动后
- 参数：
	- {Number} [i]: 当前sheet页的index
	- {Number} [oldOrder]: 修改前当前sheet页order
	- {Number} [newOrder]: 修改后当前sheet页order

------------
### sheetDeleteBefore
- 类型：Function
- 默认值：null
- 作用：sheet删除前
- 参数：
	- {Object} [sheet]: 要被删除sheet页的配置

------------
### sheetDeleteAfter
- 类型：Function
- 默认值：null
- 作用：sheet删除后
- 参数：
	- {Object} [sheet]: 已被删除sheet页的配置

------------
### sheetEditNameBefore
- 类型：Function
- 默认值：null
- 作用：sheet修改名称前
- 参数：
	- {Number} [i]: sheet页的index
	- {String} [name]: 当前sheet页名称

------------
### sheetEditNameAfter
- 类型：Function
- 默认值：null
- 作用：sheet修改名称后
- 参数：
	- {Number} [i]: sheet页的index
	- {String} [oldName]: 修改前当前sheet页名称
	- {String} [newName]: 修改后当前sheet页名称

------------
### sheetEditColorBefore
- 类型：Function
- 默认值：null
- 作用：sheet修改颜色前
- 参数：
	- {Number} [i]: sheet页的index
	- {String} [color]: 当前sheet页颜色

------------
### sheetEditColorAfter
- 类型：Function
- 默认值：null
- 作用：sheet修改颜色后
- 参数：
	- {Number} [i]: sheet页的index
	- {String} [oldColor]: 修改前当前sheet页颜色
	- {String} [newColor]: 修改后当前sheet页颜色

------------

## 工作簿

### workbookCreateBefore
- 类型：Function
- 默认值：null
- 作用：表格创建之前触发。旧的钩子函数叫做`beforeCreateDom`
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
    
------------
### workbookCreateAfter
- 类型：Function
- 默认值：null
- 作用：表格创建之后触发
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
     
------------
### workbookDestroyBefore
- 类型：Function
- 默认值：null
- 作用：表格创建之后触发
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
    
------------
### workbookDestroyAfter
- 类型：Function
- 默认值：null
- 作用：表格创建之后触发
- 参数：
	- {Object} [book]: 整个工作簿的配置（options）
    
------------
### updated
- 类型：Function
- 默认值：null
- 作用：每次操作更新后执行的方法,在画布渲染之后执行，即客户端每执行一次表格操作，Luckysheet将这次操作存到历史记录中后触发，撤销重做时因为也算一次操作，当然也会触发此钩子函数。
- 参数：
	- {Object} [operate]: 本次操作的历史记录信息，根据不同的操作，会有不同的历史记录，参考源码 [历史记录](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/controlHistory.js)
    
------------
### resized
- 类型：Function
- 默认值：null
- 作用：resize执行之后
- 参数：
	- {Object} [size]: 整个工作簿区域的宽高
    
------------

## 图片

### imageInsertBefore
- 类型：Function
- 默认值：null
- 作用：图片插入之前
- 参数：
	- {Object} [url]: 图片地址
    
------------
### imageInsertAfter
- 类型：Function
- 默认值：null
- 作用：图片插入之后
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------
### imageUpdateBefore
- 类型：Function
- 默认值：null
- 作用：图片修改之前，修改的内容包括宽高、位置、裁剪等操作
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------
### imageUpdateAfter
- 类型：Function
- 默认值：null
- 作用：图片修改之后，修改的内容包括宽高、位置、裁剪等操作
- 参数：
	- {Object} [oldItem]]: 修改前图片地址、宽高、位置等信息
	- {Object} [newItem]]: 修改后图片地址、宽高、位置等信息
    
------------
### imageDeleteBefore
- 类型：Function
- 默认值：null
- 作用：图片删除之前
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------
### imageDeleteAfter
- 类型：Function
- 默认值：null
- 作用：图片删除之后
- 参数：
	- {Object} [item]]: 图片地址、宽高、位置等信息
    
------------

## 批注

### commentInsertBefore
- 类型：Function
- 默认值：null
- 作用：插入批注之前
- 参数：
	- {Object} [cell]: 要插入的批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentInsertAfter
- 类型：Function
- 默认值：null
- 作用：插入批注之后
- 参数：
	- {Object} [cell]: 被插入批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`，包含批注信息
    
------------
### commentDeleteBefore
- 类型：Function
- 默认值：null
- 作用：删除批注之前
- 参数：
	- {Object} [cell]: 要删除的批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentDeleteAfter
- 类型：Function
- 默认值：null
- 作用：删除批注之后
- 参数：
	- {Object} [cell]: 被删除批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`
    
------------
### commentUpdateBefore
- 类型：Function
- 默认值：null
- 作用：修改批注之前
- 参数：
	- {Object} [cell]: 批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentUpdateAfter
- 类型：Function
- 默认值：null
- 作用：修改批注之后
- 参数：
	- {Object} [oldCell]: 修改前批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`
	- {Object} [newCell]: 修改后批注所在的单元格信息，如：`{ r:0,c:2,v:{m:'233',v:'233'}}`
    
------------

## 数据透视表

### pivotTableEditBefore
- 类型：Function
- 默认值：null
- 作用：修改数据透视表之前，操作如：拖动字段等
- 参数：
	- {Object} [sheet]: 数据透视表所在sheet页配置

------------
### pivotTableEditAfter
- 类型：Function
- 默认值：null
- 作用：修改数据透视表之后，操作如：拖动字段等
- 参数：
	- {Object} [oldSheet]: 修改前数据透视表所在sheet页配置
	- {Object} [newSheet]: 修改后数据透视表所在sheet页配置
    
------------

## 冻结

### frozenCreateBefore
- 类型：Function
- 默认值：null
- 作用：设置冻结前
- 参数：
	- {Object} [frozen]: 冻结类型信息

------------
### frozenCreateAfter
- 类型：Function
- 默认值：null
- 作用：设置冻结后
- 参数：
	- {Object} [frozen]: 冻结类型信息
    
------------
### frozenCancelBefore
- 类型：Function
- 默认值：null
- 作用：取消冻结前
- 参数：
	- {Object} [frozen]: 冻结类型信息

------------
### frozenCancelAfter
- 类型：Function
- 默认值：null
- 作用：取消冻结后
- 参数：
	- {Object} [frozen]: 冻结类型信息
    
------------