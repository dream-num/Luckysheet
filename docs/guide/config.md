# Overall configuration

## Basic Structure

When initializing the workbook, you can set an object configuration string ʻoptions` to customize the configuration of Luckysheet.

The following is a simple configuration example:

```js
// Configuration item
const options = {
     container:'luckysheet', // set the id of the DOM container
     title:'Luckysheet Demo', // set the name of the table
     lang:'zh' // set language

     // More other settings...
}

// Initialize the table
luckysheet.create(options)
```

The `options` configuration item here will affect the entire workbook. In particular, the configuration of a single worksheet needs to be set in the `options.data` array to set corresponding more detailed parameters. Refer to [Worksheet Configuration](/zh/guide/sheet.html)

For personalized needs, in addition to allowing configuration information bar ([showinfobar](#showinfobar)), toolbar ([showtoolbar](#showtoolbar)), bottom sheet bar ([showsheetbar](#showsheetbar)), bottom count bar ([ShowstatisticBar](#showstatisticBar)),
Luckysheet has opened more detailed custom configuration options, which are as follows:

- Customize the toolbar ([showtoolbarConfig](#showtoolbarConfig))
- Customize the bottom sheet bar ([showsheetbarConfig](#showsheetbarConfig))
- Customize the counting bar ([showstatisticBarConfig](#showstatisticBarConfig))
- Custom add row and back to the top ([sheetBottomConfig](#sheetBottomConfig))
- Custom cell right-click menu ([cellRightClickConfig](#cellRightClickConfig))
- Customize the right-click menu of the bottom sheet bar ([sheetRightClickConfig](#sheetRightClickConfig))

## Configuration item

The following are all supported setting parameters

- Container ID [container](#container)
- Workbook name [title](#title)
- Language [lang](#lang)
- Unique key [gridKey](#gridKey)
- Load the entire workbook [loadUrl](#loadUrl)
- Load other worksheet celldata [loadSheetUrl](#loadSheetUrl)
- Allow updates [allowUpdate](#allowUpdate)
- Update address [updateUrl](#updateUrl)
- Thumbnail update address [updateImageUrl](#updateImageUrl)
- Worksheet configuration [data](#data)
- Plugins [plugins](#plugins)
- Number of columns [column](#column)
- Number of rows [row](#row)
- Billion format [autoFormatw](#autoFormatw)
- Accuracy [accuracy](#accuracy)
- Allow copying [allowCopy](#allowCopy)
- Grid Lines [showGridLines](#showGridLines)
- Toolbar [showtoolbar](#showtoolbar)
- Customize Toolbar [showtoolbarConfig](#showtoolbarConfig)
- Information bar [showinfobar](#showinfobar)
- Bottom sheet bar [showsheetbar](#showsheetbar)
- Customize the bottom sheet bar [showsheetbarConfig](#showsheetbarConfig)
- The bottom count bar [showstatisticBar](#showstatisticBar)
- Custom Count Bar [showstatisticBarConfig](#showstatisticBarConfig)
- Custom add row and back to top [sheetBottomConfig](#sheetBottomConfig)
- Allow editing [allowEdit](#allowEdit)
- Allow adding rows [enableAddRow](#enableAddRow)
- Allow adding columns [enableAddCol](#enableAddCol)
- User Info [userInfo](#userInfo)
- User Information Menu [userMenuItem](#userMenuItem)
- Back button link [myFolderUrl](#myFolderUrl)
- Ratio [devicePixelRatio](#devicePixelRatio)
- Function Button [functionButton](#functionButton)
- Auto-indent interface [showConfigWindowResize](#showConfigWindowResize)
- Load the next page [enablePage](#enablePage)
- Refresh formula [forceCalculation](#forceCalculation)
- Custom cell right-click menu [cellRightClickConfig](#cellRightClickConfig)
- Customize the right-click menu of the bottom sheet bar [sheetRightClickConfig](#sheetRightClickConfig)

### container
- Type: String
- Default: "luckysheet"
- Usage: Container ID
  
------------
### title
- Type: String
- Default: "Luckysheet Demo"
- Usage：Workbook name

------------
### lang
- Type: String
- Default: "en"
- Usage: Internationalization settings, allowing to set the language of the workbook, supporting Chinese ("zh") and English ("en")

------------
### gridKey
- Type: String
- Default: ""
- Usage: Workbook unique identifier

------------
### loadUrl
- Type: String
- Default: ""
- Usage: Configure the address of `loadUrl` and use it in conjunction with `loadSheetUrl`, which is generally used when the amount of data is large. You can also not use the interface parameters provided by Luckysheet, and use the [data](#data) parameter to prepare all table data for initialization in advance.

    Luckysheet will request the entire workbook data through ajax, and load all `celldata` in the worksheet data with status 1 by default, and load all the fields except the `celldata` field in the rest of the worksheets. However, considering that some formulas, charts and pivot tables will reference data from other worksheets, the front end will add a judgment. If the current worksheet references data from other worksheets, it will request data through the interface address configured by `loadSheetUrl` , And load the data of the related worksheets. Because `loadUrl` is only responsible for the current worksheet data, it is also necessary to configure `loadSheetUrl` as an interface for asynchronously loading data.

------------
### loadSheetUrl
- Type: String
- Default: ""
- Usage: Configure the address of `loadSheetUrl`, the parameters are `gridKey` (workbook primary key) and `index` (worksheet primary key collection, the format is `["sheet_01","sheet_02","sheet_03"]`), the returned data is the `celldata` field data collection of the worksheet. In order to load performance considerations, except for the first load of the celldata data of the current worksheet, the data of the other worksheets will be requested only when the worksheet is switched to that worksheet.

------------
### allowUpdate
- Type: Boolean
- Default: false
- Usage: Whether to allow back-end update after operating the table, used in conjunction with `updateUrl`

------------
### updateUrl
- Type: String
- Default: ""
- Usage: The back-end update address after operating the workbook will be valid only when `allowUpdate` is `true`. This interface is also the interface address for shared editing.

Note that you also need to configure `loadUrl` and `loadSheetUrl` to take effect.

------------
### updateImageUrl
- Type: String
- Default: ""
- Usage: Update address of thumbnail

------------
### data
- Type: Array
- Default: [{ "name": "Sheet1", color: "", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, { "name": "Sheet2", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1  }, { "name": "Sheet3", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2  }]
- Usage: When `loadUrl` and `loadSheetUrl` are not configured, you need to manually configure all the sheet data passed to the entire client `[shee1, sheet2, sheet3]`. For detailed parameter settings, please refer to [worksheet configuration](/zh/guide/sheet.html)

------------
### plugins
- Type: Array
- Default: []
- Usage: Configure plug-in, support chart: "chart"

------------
### column
- Type: Number
- Default: 60
- Usage: The default number of columns in an empty workbook

------------
### row
- Type: Number
- Default: 84
- Usage: The default number of rows in an empty workbook

------------
### autoFormatw
- Type: Boolean
- Default: false
- Usage: Automatically format numbers with more than 4 digits into "billion format", for example: true or "true" or "TRUE"

------------
### accuracy
- Type: Number
- Default: undefined
- Usage: Set the precision, the number of digits after the decimal point. The parameter is a number or a string of numbers, for example: "0" or 0

------------
### allowCopy
- Type: Boolean
- Default: true
- Usage: Whether to allow copy

------------
### showGridLines
- Type: Number
- Default: 1
- Usage: Whether to display grid lines, `1` means display, `0` means hidden

------------
### showtoolbar
- Type: Boolean
- Default: true
- Usage: Whether to show the toolbar

------------
### showtoolbarConfig

[todo]

- Type: Object
- Default: {}
- Usage: Custom configuration toolbar
- Format:
    ```json
    {
        undoRedo: false, //Undo redo
        paintFormat: false, //Format brush
        currencyFormat: false, //currency format
        percentageFormat: false, //Percentage format
        numberDecrease: false, //'Decrease the number of decimal places'
        numberIncrease: false, //'Increase the number of decimal places
        moreFormats: false, //'More Formats'
        font: false, //'font'
        fontSize: false, //'Font size'
        bold: false, //'Bold (Ctrl+B)'
        italic: false, //'Italic (Ctrl+I)'
        strikethrough: false, //'Strikethrough (Alt+Shift+5)'
        textColor: false, //'Text color'
        fillColor: false, //'Cell color'
        border: false, //'border'
        mergeCell: false, //'Merge cells'
        horizontalAlignMode: false, //'Horizontal alignment'
        verticalAlignMode: false, //'Vertical alignment'
        textWrapMode: false, //'Wrap mode'
        textRotateMode: false, //'Text Rotation Mode'
        frozenMode: false, //'freeze mode'
        sort: false, //'sort'
        filter: false, //'filter'
        findAndReplace: false, //'Find and Replace'
        function: false, //'formula'
        conditionalFormat: false, //'Conditional Format'
        postil: false, //'comment'
        pivotTable: false, //'PivotTable'
        chart: false, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
        screenshot: false, //'screenshot'
        splitColumn: false, //'Split column'     
    }
    ```

------------
### showinfobar
- Type: Boolean
- Default: true
- Usage: Whether to show the top information bar

------------
### showsheetbar
- Type: Boolean
- Default: true
- Usage: Whether to show the bottom sheet button

------------
### showsheetbarConfig

[todo]

- Type: Object
- Default: {}
- Usage: Custom configuration bottom sheet button
- 格式：
    ```json
    {
        add: false, //Add worksheet
        menu: false, //Worksheet management menu
        sheet: false //Worksheet display
    }
    ```

------------
### showstatisticBar
- Type: Boolean
- Default: true
- Usage: Whether to show the bottom count bar

------------
### showstatisticBarConfig

[todo]

- Type: Object
- Default: {}
- Usage: Customize the bottom count bar
- 格式：
    ```json
    {
        count: false, // Count bar
        zoom: false // Zoom
    }

------------
### sheetBottomConfig

[todo]

- Type: Object
- Default: {}
- Usage: Add row button and back to top button configuration below the worksheet
- 格式：
    ```json
    {
        addRow: false, // Add row button
        backTop: false // Back to the top
    }

------------
### allowEdit
- Type: Boolean
- Default: true
- Usage: Whether to allow front-end editing

------------
### enableAddRow
- Type: Boolean
- Default: true
- Usage: Allow additional rows

------------
### enableAddCol
- Type: Boolean
- Default: true
- Usage: Allow adding columns

------------
### userInfo
- Type: String
- Default: `'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> rabbit'`
- Usage: User information display style in the upper right corner

------------
### userMenuItem
- Type: Array
- Default: `[{url:"www.baidu.com", "icon":'<i class="fa fa-folder" aria-hidden="true"></i>', "name":"我的表格"}, {url:"www.baidu.com", "icon":'<i class="fa fa-sign-out" aria-hidden="true"></i>', "name":"退出登陆"}]`
- Usage: Click the pop-up menu of user information in the upper right corner

------------
### myFolderUrl
- Type: String
- Default: "www.baidu.com"
- Usage: The link of the `<` back button in the upper left corner

------------
### devicePixelRatio
- Type: Number
- Default: window.devicePixelRatio
- Usage: Device ratio, the larger the ratio, the higher the resolution of the workbook

------------
### functionButton
- Type: String
- Default: ""
- Usage: Function buttons in the upper right corner, for example:`'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">download</button>    <button id="" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">share</button>    <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">show data</button>'`

------------
### showConfigWindowResize
- Type: Boolean
- Default: true
- Usage: The configuration of the chart or pivot table will pop up on the right, set whether the workbook will be automatically indented after popping up

------------
### enablePage
- Type: Boolean
- Default: false
- Usage: Allow to load next page

------------
### forceCalculation
- Type: Boolean
- Default: false
- Usage: Force refresh formula.

     By default, in order to improve loading performance, when the table is initialized, cells containing formulas will directly obtain `v` and `m` as data results by default without real-time calculation.
    
     If the data of the cell associated with the formula has changed, or the result of the cell data where the formula is located has changed, it will cause the calculated result of the associated cell to be inconsistent with the actual displayed result. This requires the formula refresh to be turned on to ensure the data The accuracy of real-time calculations.
    
     ⚠️Reminder, there will be performance problems when there are more formulas, use it with caution!

------------
### cellRightClickConfig

[todo]

- Type: Object
- Default: {}
- Usage: Custom configuration cell right-click menu
- 格式：
    ```json
    {
        copy: false, //Copy
        copyAs: false, //Copy as
        paste: false, //Paste
        insert: false, //Insert
        delete: false, //Delete
        hide: false, //Hide
        deleteCell: false, //Delete cell
        clear: false, //Clear content
        matrix: false, //Matrix operation selection
        sort: false, //Sort selection
        filter: false, //Filter selection
        chart: false //Chart generation
    }

------------
### sheetRightClickConfig

[todo]

- Type: Object
- Default: {}
- Usage: Customize the right-click menu of the bottom sheet bar
- 格式：
    ```json
    {   
        delete: false, //Delete
        copy: false, //Copy
        rename: false, //Rename
        color: false, //Change color
        hide: false, //Hide
        show: false, //Unhide
        left: false, //Move to the left
        right: false //Move to the right
    }

------------

## Hook Function (TODO)

When the hook function is used in secondary development, hooks will be implanted in each common mouse or keyboard operation, and the function passed in by the developer will be called to expand the function of Luckysheet.

The hook functions are uniformly configured under ʻoptions.hook`, and configuration hooks can be created separately for cells, sheet pages, and tables.

## Cell

### cellRenderAfter
- Type: Function
- Default: null
- Usage: Triggered after the cell rendering ends
- Parameter: 
	- {Number} [r]: Row number of cell
	- {Number} [c]: Column number of cell
	- {Object} [v]: Cell object

------------
### cellHover
- Type: Function
- Default: null
- Usage: Triggered when the mouse moves over the cell (hover)
- Parameter: 
	- {Number} [r]: Row number of cell
	- {Number} [c]: Column number of cell
	- {Object} [v]: Cell object

------------
### cellEditBefore
- Type: Function
- Default: null
- Usage: Triggered after double-clicking the cell, that is, when double-clicking the cell to edit the content, this method is triggered first
- Parameter: 
	- {Number} [r]: Row number of cell
	- {Number} [c]: Column number of cell
	- {Object} [v]: Cell object

------------
### cellEditAfter
- Type: Function
- Default: null
- Usage: Triggered after double-clicking the cell, that is, when double-clicking the cell to edit the content, this method is finally triggered
- Parameter: 
	- {Number} [r]: Row number of cell
	- {Number} [c]: Column number of cell
	- {Object} [oldV]: Cell object before Modified
	- {Object} [newV]: Cell object after Modified

------------
### fireMousedown
- Type: Function
- Default: null
- Usage: Customized method of drilling down cell data

------------

## Selected area

### rangeSelectBefore
- Type: Function
- Default: null
- Usage: Frame selection or trigger before setting selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas

------------
### rangeSelectAfter
- Type: Function
- Default: null
- Usage: Frame selection or trigger after setting selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas

------------
### rangeMoveBefore
- Type: Function
- Default: null
- Usage: Before moving the selection, include a single cell
- Parameter: 
	- {Array} [range]: The current selection area, can only be a single selection area

------------
### rangeMoveAfter
- Type: Function
- Default: null
- Usage: After moving the selection, include a single cell
- Parameter: 
	- {Array} [oldRange]: The current selection range before moving, can only be a single selection
	- {Array} [newRange]: The current selection range after moving, can only be a single selection

------------
### rangeEditBefore
- Type: Function
- Default: null
- Usage: Before the selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: Data corresponding to the selection area

------------
### rangeEditAfter
- Type: Function
- Default: null
- Usage: After the selection is modified
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
    - {Object} [oldData]: Before modification, the data corresponding to the selection area
    - {Object} [newData]: After modification, the data corresponding to the selection area

------------
### rangeCopyBefore
- Type: Function
- Default: null
- Usage: Before copying selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: Data corresponding to the selection area

------------
### rangeCopyAfter
- Type: Function
- Default: null
- Usage: After copying selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: Data corresponding to the selection area

------------
### rangePasteBefore
- Type: Function
- Default: null
- Usage: Before pasting the selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: The data corresponding to the selection area to be pasted

------------
### rangePasteAfter
- Type: Function
- Default: null
- Usage: After pasting the selection
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [originData]: The data corresponding to the selection area to be pasted
	- {Object} [pasteData]: Data to paste

------------
### rangeCutBefore
- Type: Function
- Default: null
- Usage: Before selection cut
- Parameter: 
	- {Array} [range]: Selection range, can only be a single range
	- {Object} [data]: The data corresponding to the selection area to be cut

------------
### rangeCutAfter
- Type: Function
- Default: null
- Usage: After selection cut
- Parameter: 
	- {Array} [range]: Selection range, can only be a single range
	- {Object} [data]: The data corresponding to the selection area to be cut

------------
### rangeDeleteBefore
- Type: Function
- Default: null
- Usage: Before the selection is deleted
- Parameter: 
	- {Array} [range]: Selection range, can only be a single range
	- {Object} [data]: The data corresponding to the selection area to be deleted

------------
### rangeDeleteAfter
- Type: Function
- Default: null
- Usage: After the selection is deleted
- Parameter: 
	- {Array} [range]: Selection range, can only be a single range
	- {Object} [data]: The data corresponding to the selection area to be deleted

------------
### rangeClearBefore
- Type: Function
- Default: null
- Usage: Before the selection is cleared
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: The data corresponding to the selection area to be cleared

------------
### rangeClearAfter
- Type: Function
- Default: null
- Usage: After the selection is cleared
- Parameter: 
	- {Object || Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: The data corresponding to the selection area to be cleared

------------
### rangePullBefore
- Type: Function
- Default: null
- Usage: Before selection drop down
- Parameter: 
	- {Array} [range]: The current selection range, can only be a single range

------------
### rangePullAfter
- Type: Function
- Default: null
- Usage: After selection drop down
- Parameter: 
	- {Array} [range]: The selection range after the drop-down can only be a single range

------------

## Worksheet

### sheetCreatekBefore
- Type: Function
- Default: null
- Usage: Triggered before the worksheet is created, the new worksheet also includes the new pivot table

------------
### sheetCreateAfter
- Type: Function
- Default: null
- Usage: Triggered after the worksheet is created, the new worksheet also includes the new pivot table
- Parameter: 
	- {Object} [sheet]: The configuration of the newly created worksheet

------------
### sheetMoveBefore
- Type: Function
- Default: null
- Usage: Before the worksheet is moved
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {Number} [order]: `Order` of current worksheet

------------
### sheetMoveAfter
- Type: Function
- Default: null
- Usage: After the worksheet is moved
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {Number} [oldOrder]: Before modification, the `order` of the current worksheet
	- {Number} [newOrder]: After modification, the `order` of the current worksheet

------------
### sheetDeleteBefore
- Type: Function
- Default: null
- Usage: Before the worksheet is deleted
- Parameter: 
	- {Object} [sheet]: Configuration of the worksheet to be deleted

------------
### sheetDeleteAfter
- Type: Function
- Default: null
- Usage: After the worksheet is deleted
- Parameter: 
	- {Object} [sheet]: Configuration of deleted worksheet

------------
### sheetEditNameBefore
- Type: Function
- Default: null
- Usage: Before changing the name of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [name]: Current worksheet name

------------
### sheetEditNameAfter
- Type: Function
- Default: null
- Usage: After changing the name of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [oldName]: Before modification, the current worksheet name
	- {String} [newName]: After modification, the current worksheet name

------------
### sheetEditColorBefore
- Type: Function
- Default: null
- Usage: Before changing the color of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [color]: Current worksheet color

------------
### sheetEditColorAfter
- Type: Function
- Default: null
- Usage: After changing the color of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [oldColor]: Before modification, the current worksheet color
	- {String} [newColor]: After modification, the current worksheet color

------------

## Workbook

### workbookCreateBefore
- Type: Function
- Default: null
- Usage: Triggered before the worksheet is created. The old hook function is called `beforeCreateDom`
- Parameter: 
	- {Object} [book]:Configuration of the entire workbook (options)
    
------------
### workbookCreateAfter
- Type: Function
- Default: null
- Usage: Triggered after the workbook is created
- Parameter: 
	- {Object} [book]:Configuration of the entire workbook (options)
     
------------
### workbookDestroyBefore
- Type: Function
- Default: null
- Usage: Triggered before the workbook is destroyed
- Parameter: 
	- {Object} [book]:Configuration of the entire workbook (options)
    
------------
### workbookDestroyAfter
- Type: Function
- Default: null
- Usage: Triggered after the workbook is destroyed
- Parameter: 
	- {Object} [book]:Configuration of the entire workbook (options)
    
------------
### updated
- Type: Function
- Default: null
- Usage: The method executed after each operation is updated is executed after the canvas rendering, that is, every time the client performs a workbook operation, Luckysheet saves the operation in the history and triggers it. When undoing and redoing, it is also an operation, of course, the hook function will be triggered.
- Parameter: 
	- {Object} [operate]: The history information of this operation will have different history records according to different operations. Refer to the source code [History](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/controlHistory.js )
    
------------
### resized
- Type: Function
- Default: null
- Usage: After resize is executed
- Parameter: 
	- {Object} [size]: The width and height of the entire workbook area
    
------------

## Image

### imageInsertBefore
- Type: Function
- Default: null
- Usage: Before the picture is inserted
- Parameter: 
	- {Object} [url]: Picture address
    
------------
### imageInsertAfter
- Type: Function
- Default: null
- Usage: After the picture is inserted
- Parameter: 
	- {Object} [item]]: Picture address, width and height, location and other information
    
------------
### imageUpdateBefore
- Type: Function
- Default: null
- Usage: Before the picture is modified, the modified content includes operations such as width and height, position, and cropping
- Parameter: 
	- {Object} [item]]: Picture address, width and height, location and other information
    
------------
### imageUpdateAfter
- Type: Function
- Default: null
- Usage: After the picture is modified, the modified content includes operations such as width and height, position, and cropping
- Parameter: 
	- {Object} [oldItem]]: Before modification, the picture address, width and height, location and other information
	- {Object} [newItem]]: After modification, the picture address, width and height, location and other information
    
------------
### imageDeleteBefore
- Type: Function
- Default: null
- Usage: Before the picture is deleted
- Parameter: 
	- {Object} [item]]: Picture address, width and height, location and other information
    
------------
### imageDeleteAfter
- Type: Function
- Default: null
- Usage: After the picture is deleted
- Parameter: 
	- {Object} [item]]: Picture address, width and height, location and other information
    
------------

## Comment

### commentInsertBefore
- Type: Function
- Default: null
- Usage: Before inserting comments
- Parameter: 
	- {Object} [cell]: The cell information of the comment to be inserted, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentInsertAfter
- Type: Function
- Default: null
- Usage: After inserting comments
- Parameter: 
	- {Object} [cell]: The cell information where the comment is inserted, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`, contains comment information
    
------------
### commentDeleteBefore
- Type: Function
- Default: null
- Usage: Before deleting comments
- Parameter: 
	- {Object} [cell]: The cell information of the comment to be deleted, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentDeleteAfter
- Type: Function
- Default: null
- Usage: After deleting the comment
- Parameter: 
	- {Object} [cell]: The cell information of the deleted comment, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`
    
------------
### commentUpdateBefore
- Type: Function
- Default: null
- Usage: Before modifying comments
- Parameter: 
	- {Object} [cell]: The cell information of the comment, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`

------------
### commentUpdateAfter
- Type: Function
- Default: null
- Usage: After modifying the comment
- Parameter: 
	- {Object} [oldCell]: Before modification, the cell information where the comment is located, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`
	- {Object} [newCell]: After modification, the cell information where the comment is located, such as:`{ r:0,c:2,v:{m:'233',v:'233'}}`
    
------------

## Pivot table

### pivotTableEditBefore
- Type: Function
- Default: null
- Usage: Before modifying the PivotTable, operations such as dragging fields, etc.
- Parameter: 
	- {Object} [sheet]: Worksheet configuration where the pivot table is located

------------
### pivotTableEditAfter
- Type: Function
- Default: null
- Usage: After modifying the PivotTable, operations such as dragging fields, etc.
- Parameter: 
	- {Object} [oldSheet]: Before modification, the worksheet configuration where the pivot table is located
	- {Object} [newSheet]: After modification, the worksheet configuration where the pivot table is located
    
------------

## Freeze

### frozenCreateBefore
- Type: Function
- Default: null
- Usage: Before setting freeze
- Parameter: 
	- {Object} [frozen]: Freeze type information

------------
### frozenCreateAfter
- Type: Function
- Default: null
- Usage: After setting freeze
- Parameter: 
	- {Object} [frozen]: Freeze type information
    
------------
### frozenCancelBefore
- Type: Function
- Default: null
- Usage: Before unfreezing
- Parameter: 
	- {Object} [frozen]: Freeze type information

------------
### frozenCancelAfter
- Type: Function
- Default: null
- Usage: After unfreezing
- Parameter: 
	- {Object} [frozen]: Freeze type information
    
------------