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
- Toolbar [showtoolbar](#showtoolbar)
- Customize Toolbar [showtoolbarConfig](#showtoolbarConfig)
- Information bar [showinfobar](#showinfobar)
- Bottom sheet bar [showsheetbar](#showsheetbar)
- Customize the bottom sheet bar [showsheetbarConfig](#showsheetbarConfig)
- The bottom count bar [showstatisticBar](#showstatisticBar)
- Custom Count Bar [showstatisticBarConfig](#showstatisticBarConfig)
- Allow adding rows [enableAddRow](#enableAddRow)
- Allow back to top [enableAddBackTop](#enableAddBackTop)
- User Info [userInfo](#userInfo)
- User Information Menu [userMenuItem](#userMenuItem)
- Back button link [myFolderUrl](#myFolderUrl)
- Ratio [devicePixelRatio](#devicePixelRatio)
- Function Button [functionButton](#functionButton)
- Auto-indent interface [showConfigWindowResize](#showConfigWindowResize)
- Refresh formula [forceCalculation](#forceCalculation)
- Custom cell right-click menu [cellRightClickConfig](#cellRightClickConfig)
- Customize the right-click menu of the bottom sheet bar [sheetRightClickConfig](#sheetRightClickConfig)
- The width of the row header area [rowHeaderWidth](#rowHeaderWidth)
- The height of the column header area [columnHeaderHeight](#columnHeaderHeight)
- Whether to show the formula bar [sheetFormulaBar](#sheetFormulaBar)
- Initialize the default font size [defaultFontSize](#defaultFontSize)
- Pager [pager](#pager)

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
- Usage: Internationalization settings, allow to set the language of the table, support simplified Chinese ("zh"), English ("en") and traditional Chinese ("zh_tw") and Spanish ("es")

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
### showtoolbar
- Type: Boolean
- Default: true
- Usage: Whether to show the toolbar

------------
### showtoolbarConfig

- Type: Object
- Default: {}
- Usage: Custom configuration toolbar,can be used in conjunction with `showtoolbar`, `showtoolbarConfig` has a higher priority.
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
		underline: false, // 'Underline (Alt+Shift+6)'
		textColor: false, //'Text color'
        fillColor: false, //'Cell color'
        border: false, //'border'
        mergeCell: false, //'Merge cells'
        horizontalAlignMode: false, //'Horizontal alignment'
        verticalAlignMode: false, //'Vertical alignment'
        textWrapMode: false, //'Wrap mode'
        textRotateMode: false, //'Text Rotation Mode'
		image:false, // 'Insert picture'
		link:false, // 'Insert link'
		chart: false, //'chart' (the icon is hidden, but if the chart plugin is configured, you can still create a new chart by right click)
		postil: false, //'comment'
		pivotTable: false, //'PivotTable'
		function: false, //'formula'
		frozenMode: false, //'freeze mode'
		sortAndFilter: false, //'Sort and filter'
		conditionalFormat: false, //'Conditional Format'
		dataVerification: false, // 'Data Verification'
		splitColumn: false, //'Split column'
		screenshot: false, //'screenshot'
		findAndReplace: false, //'Find and Replace'
		protection:false, // 'Worksheet protection'
		print:false, // 'Print'
    }
    ```
- Example:
	- Show only the `undo/redo` and `font` buttons:
		
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
	- Hide only the `image` and `print` buttons:
		
		```js
			//options
			{
				showtoolbar: true, // The default is true, you can leave it unset
				showtoolbarConfig:{
					image: false,
					print: false,
				}
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

- Type: Object
- Default: {}
- Usage: Custom configuration bottom sheet button, can be used in conjunction with `showsheetbar`, `showsheetbarConfig` has a higher priority.
- Format: 
    ```json
    {
        add: false, //Add worksheet
        menu: false, //Worksheet management menu
        sheet: false //Worksheet display
    }
    ```
- Example:
	- Only display the `Add worksheet` button:
		
		```js
			//options
			{
				showsheetbar: false,
				showsheetbarConfig:{
					add: true,
				}
			}
		```
	- Only hide the `Add worksheet` and `Worksheet management menu` buttons:
		
		```js
			//options
			{
				showsheetbar: true, // The default is true, you can leave it unset
				showsheetbarConfig:{
					add: false,
					menu: false,
				}
			}
		```

------------
### showstatisticBar
- Type: Boolean
- Default: true
- Usage: Whether to show the bottom count bar

------------
### showstatisticBarConfig

- Type: Object
- Default: {}
- Usage: Customize the bottom count bar, can be used in conjunction with `showstatisticBar`, `showstatisticBarConfig` has a higher priority.
- Format: 
    ```json
    {
		count: false, // Count bar
		view: false, // Print view
        zoom: false // Zoom
    }
	```
- Example:
	- Only display the `Zoom` button:
		
		```js
			//options
			{
				showstatisticBar: false,
				showstatisticBarConfig:{
					zoom: true,
				}
			}
		```
	- Only hide the `print view` button:
		
		```js
			//options
			{
				showstatisticBar: true, // The default is true, you can leave it unset
				showstatisticBarConfig:{
					view: false,
				}
			}
		```	
------------
### enableAddRow
- Type: Boolean
- Default: true
- Usage: Allow additional rows

------------
### enableAddBackTop
- Type: Boolean
- Default: true
- Usage: Allow back to top

------------
### userInfo
- Type: String | Boolean | Object
- Default: false
- Usage: User information display style in the upper right corner,Support the following three formats
	1. HTML template string, such as:
	
	```js
	options:{
		// Other configuration
		userInfo:'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> Lucky',
	}
	```

	Or an ordinary string, such as:
	
	```js
	options:{
		// Other configuration
		userInfo:'Lucky',
	}
	```
 
	2. Boolean type, such as:
   	
	`false`: Do not show
	```js
	options:{
		// Other configuration
		userInfo:false, // Do not display user information
	}

	```
	`true`: Show the default string
	```js
	options:{
		// Other configuration
		userInfo:true, // Show HTML:'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> Lucky'
	}

	```
	3. Object format, set `userImage`: user avatar address and `userName`: user name, such as:
	```js
	options:{
		// Other configuration
		userImage:'https://cdn.jsdelivr.net/npm/luckyresources@1.0.3/assets/img/logo/logo.png', // Avatar url
		userName:'Lucky', // username
	}
	```
	4. Note that if set to `undefined` or not set, the same as setting `false`

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
### forceCalculation
- Type: Boolean
- Default: false
- Usage: Force refresh formula.

     By default, in order to improve loading performance, when the table is initialized, cells containing formulas will directly obtain `v` and `m` as data results by default without real-time calculation.
    
     If the data of the cell associated with the formula has changed, or the result of the cell data where the formula is located has changed, it will cause the calculated result of the associated cell to be inconsistent with the actual displayed result. This requires the formula refresh to be turned on to ensure the data The accuracy of real-time calculations.
    
     ⚠️Reminder, there will be performance problems when there are more formulas, use it with caution!

------------
### cellRightClickConfig

- Type: Object
- Default: {}
- Usage: Custom configuration cell right-click menu
- Format: 	
	```json
    {
		copy: false, // copy
		copyAs: false, // copy as
		paste: false, // paste
		insertRow: false, // insert row
		insertColumn: false, // insert column
		deleteRow: false, // delete the selected row
		deleteColumn: false, // delete the selected column
		deleteCell: false, // delete cell
		hideRow: false, // hide the selected row and display the selected row
		hideColumn: false, // hide the selected column and display the selected column
		rowHeight: false, // row height
		columnWidth: false, // column width
		clear: false, // clear content
		matrix: false, // matrix operation selection
		sort: false, // sort selection
		filter: false, // filter selection
		chart: false, // chart generation
		image: false, // insert picture
		link: false, // insert link
		data: false, // data verification
		cellFormat: false // Set cell format
	}
	```
	
	In addition to the cells, the configuration here also includes the row header right-click menu, the column header right-click menu, and the column header drop-down arrow menu. The specific configuration relationships are as follows:
	
	|Right-click menu configuration|Cell|Row header|Column header|Column arrow|
	| ------------ | ------------ | ------------ | ----------- | ------------ |
	|copy|copy|copy|copy|copy|
	|copyAs|copy as|copy as|copy as|copy as|
	|paste|paste|paste|paste|paste|
	|insertRow|Insert a row|Increase N rows upwards and N rows downwards|-|-|
	|insertColumn|Insert Column|-|Add N columns to the left and N columns to the right|Add N columns to the left and N columns to the right|
	|deleteRow|Delete selected row|Delete selected row|-|-|
	|deleteColumn|Delete selected column|-|Delete selected column|Delete selected column|
	|deleteCell|Delete cell|-|-|-|
	|hideRow|-|Hide the selected row and show the selected row|-|-|
	|hideColumn|-|-|Hide the selected column and show the selected column|Hide the selected column and show the selected column|
	|rowHeight|-|row height|-|-|
	|columnWidth|-|-|Column Width|Column Width|
	|clear|clear content|clear content|clear content|-|
	|matrix|Matrix Operation Selection|Matrix Operation Selection|Matrix Operation Selection|-|
	|sort|Sort selection|Sort selection|Sort selection|A-Z sort and Z-A sort|
	|filter|Filter selection|Filter selection|Filter selection|-|
	|chart|chart generation|chart generation|chart generation|-|
	|image|Insert Picture|Insert Picture|Insert Picture|-|
	|link|Insert link|Insert link|Insert link|-|
	|data|Data Verification|Data Verification|Data Verification|-|
	|cellFormat|Set cell format|Set cell format|Set cell format|-|

------------
### sheetRightClickConfig

- Type: Object
- Default: {}
- Usage: Customize the right-click menu of the bottom sheet bar
- Format: 
    ```json
    {   
        delete: false, //Delete
        copy: false, //Copy
        rename: false, //Rename
        color: false, //Change color
        hide: false, //Hide, unhide
        move: false, //Move to the left, move to the right
    }

------------
### rowHeaderWidth
- Type: Number
- Default: 46
- Usage: The width of the row header area, if set to 0, it means to hide the row header

------------
### columnHeaderHeight
- Type: Number
- Default: 20
- Usage: The height of the column header area, if set to 0, it means hide the column header

------------
### sheetFormulaBar
- Type: Boolean
- Default: true
- Usage: Whether to show the formula bar

------------
### defaultFontSize
- Type：Number
- Default：11
- Usage：Initialize the default font size

------------

### limitSheetNameLength
- Type: Boolean
- Default: true
- Usage：Is the length of the sheet name limited in scenarios such as sheet renaming

------------

### defaultSheetNameMaxLength
- Type：Number
- Default：31
- Usage：Default maximum allowed sheet name length

------------

### pager
- Type：Object
- Default：null
- Usage：Pager button settings, the first version of the solution is directly used jquery plug-in [sPage](https://github.com/jvbei/sPage)
	Clicking the paging button will trigger the hook function `onTogglePager`, which returns the current page number, which is the same as the `backFun` method of `sPage`. This pager setting is only responsible for the UI part. For the specific data request and data rendering after switching paging, please enter the `onTogglePager` custom processing in the number of hook lines.
	```js
	pager: {
		pageIndex: 1, //Current page number
		pageSize: 10, //How many rows of data are displayed on each page
		total: 50, //Total number of rows of data
		selectOption: [10, 20] //Options that allow setting the number of rows per page
	}
	```

------------

## Hook Function (TODO)

When the hook function is used in secondary development, hooks will be implanted in each common mouse or keyboard operation, and the function passed in by the developer will be called to expand the function of Luckysheet.

The hook functions are uniformly configured under ʻoptions.hook`, and configuration hooks can be created separately for cells, sheet pages, and tables.

## Cell

### cellEditBefore

- Type: Function
- Default: null
- Usage: Triggered before entering the cell editing mode. When a cell is selected and in the non-editing state, there are usually the following three conventional methods to trigger the edit mode
   - Double click the cell
   - Hit Enter
   - Use API: enterEditMode
- Parameter: 
	- {Array} [range]: Current selection range

------------
### cellUpdateBefore

- Type: Function
- Default: null
- Usage: Triggered before updating this cell value, `return false` will not perform subsequent updates. After modifying the cell in the editing state, this hook is triggered before exiting the editing mode and updating the data.
- Parameter: 
	- {Number} [r]: The row number of the cell
	- {Number} [c]: The column number of the cell
	- {Object | String | Number} [value]: The content of the cell to be modified
	- {Boolean} [isRefresh]: Whether to refresh the entire table

------------
### cellUpdated

- Type: Function
- Default: null
- Usage: Triggered after updating this cell
- Parameter: 
	- {Number} [r]: The row number of the cell
	- {Number} [c]: The column number of the cell
	- {Object} [oldValue]: Cell object before modification
	- {Object} [newValue]: Modified cell object
	- {Boolean} [isRefresh]: Whether to refresh the entire table

------------
### cellRenderBefore

- Type: Function
- Default: null
- Usage: Triggered before the cell is rendered, `return false` will not render the cell
- Parameter: 
	- {Object} [cell]:Cell object
	- {Object} [position]:
		+ {Number} [r]: The row number of the cell
		+ {Number} [c]: The column number of the cell
		+ {Number} [start_r]: The horizontal coordinate of the upper left corner of the cell
		+ {Number} [start_c]: The vertical coordinate of the upper left corner of the cell
		+ {Number} [end_r]: The horizontal coordinate of the lower right corner of the cell
		+ {Number} [end_c]: The vertical coordinate of the lower right corner of the cell
	- {Object} [sheet]: Current sheet object
	- {Object} [ctx]: The context of the current canvas

------------
### cellRenderAfter

- Type: Function
- Default: null
- Usage: Triggered after the cell rendering ends, `return false` will not render the cell
- Parameter: 
	- {Object} [cell]: Cell object
	- {Object} [position]:
		+ {Number} [r]: The row number of the cell
		+ {Number} [c]: The column number of the cell
		+ {Number} [start_r]: The horizontal coordinate of the upper left corner of the cell
		+ {Number} [start_c]: The vertical coordinate of the upper left corner of the cell
		+ {Number} [end_r]: The horizontal coordinate of the lower right corner of the cell
		+ {Number} [end_c]: The vertical coordinate of the lower right corner of the cell
	- {Object} [sheet]: Current worksheet object
	- {Object} [ctx]: The context of the current canvas

- Example:

	A case of drawing two pictures in the upper left corner and lower right corner of cell D1
	:::::: details
	```js
	luckysheet.create({
            hook: {
                cellRenderAfter: function (cell, position, sheetFile, ctx) {
                    var r = position.r;
                    var c = position.c;
                    if (r === 0 && c === 3) { // Specify to process cell D1
                        if (!window.storeUserImage) {
                            window.storeUserImage = {}
                        }
						
                        if (!window.storeUserImage[r + '_' + c]) {
                            window.storeUserImage[r + '_' + c] = {}
                        }

                        var img = null;
                        var imgRight = null;

                        if (window.storeUserImage[r + '_' + c].image && window.storeUserImage[r + '_' + c].imgRight) {
							
							// Fetch directly after loading
                            img = window.storeUserImage[r + '_' + c].image;
                            imgRight = window.storeUserImage[r + '_' + c].imgRight;

                        } else {

                            img = new Image();
                            imgRight = new Image();

                            img.src = 'https://www.dogedoge.com/favicon/developer.mozilla.org.ico';
                            imgRight.src = 'https://www.dogedoge.com/static/icons/twemoji/svg/1f637.svg';

							// The picture is cached in the memory, fetched directly next time, no need to reload
                            window.storeUserImage[r + '_' + c].image = img;
                            window.storeUserImage[r + '_' + c].imgRight = imgRight;

                        }

						
                        if (img.complete) { //Direct rendering that has been loaded
                            ctx.drawImage(img, position.start_c, position.start_r, 10, 10);
                        } else {
                            img.onload = function () {
                                ctx.drawImage(img, position.start_c, position.start_r, 10, 10);
                            }

                        }

                        if (imgRight.complete) {
                            ctx.drawImage(imgRight, position.end_c - 10, position.end_r - 10, 10, 10);
                        } else {

                            imgRight.onload = function () {
                                ctx.drawImage(imgRight, position.end_c - 10, position.end_r - 10, 10, 10);
                            }
                        }

                    }
                }
            }
        })
	```
	:::

------------
### cellAllRenderBefore

- Type: Function
- Default: null
- Usage:The method executed before all cells are rendered. Internally, this method is added before `luckysheetDrawMain` renders the table.
- Parameter: 
	- {Object} [data]: Two-dimensional array data of the current worksheet
	- {Object} [sheet]: Current worksheet object
	- {Object} [ctx]: The context of the current canvas

------------
### rowTitleCellRenderBefore

- Type: Function
- Default: null
- Usage: Triggered before the row header cell is rendered, `return false` will not render the row header
- Parameter: 
	- {String} [rowNum]: Row number
	- {Object} [position]:
		+ {Number} [r]: The row number of the cell
		+ {Number} [top]: The vertical coordinate of the upper left corner of the cell
		+ {Number} [width]: Cell width
		+ {Number} [height]: Cell height
	- {Object} [ctx]: The context of the current canvas

------------
### rowTitleCellRenderAfter

- Type: Function
- Default: null
- Usage: Triggered after the row header cell is rendered, `return false` will not render the row header
- Parameter: 
	- {String} [rowNum]: Row number
	- {Object} [position]:
		+ {Number} [r]: The row number of the cell
		+ {Number} [top]: The vertical coordinate of the upper left corner of the cell
		+ {Number} [width]: Cell width
		+ {Number} [height]: Cell height
	- {Object} [ctx]: The context of the current canvas

------------
### columnTitleCellRenderBefore

- Type: Function
- Default: null
- Usage: Triggered before the column header cell is rendered, `return false` will not render the column header
- Parameter: 
	- {Object} [columnAbc]: Column header characters
	- {Object} [position]:
		- {Number} [c]: The column number of the cell
		- {Number} [left]: The horizontal coordinate of the upper left corner of the cell
		- {Number} [width]: Cell width
		- {Number} [height]: Cell height
	- {Object} [ctx]: The context of the current canvas

------------
### columnTitleCellRenderAfter

- Type: Function
- Default: null
- Usage: Triggered after the column header cell is rendered, `return false` will not render the column header
- Parameter: 
	- {Object} [columnAbc]: Column header characters
	- {Object} [position]:
		- {Number} [c]: The column number of the cell
		- {Number} [left]: The horizontal coordinate of the upper left corner of the cell
		- {Number} [width]: Cell width
		- {Number} [height]: Cell height
	- {Object} [ctx]: The context of the current canvas

------------

## Selected area

### rangeSelect
- Type: Function
- Default: null
- Usage: Frame selection or trigger after setting selection
- Parameter: 
	- {Object} [sheet]: Current worksheet object
	- {Object | Array} [range]: Selection area, may be multiple selection areas

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
	- {Object | Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: Data corresponding to the selection area

------------
### rangeEditAfter
- Type: Function
- Default: null
- Usage: After the selection is modified
- Parameter: 
	- {Object | Array} [range]: Selection area, may be multiple selection areas
    - {Object} [oldData]: Before modification, the data corresponding to the selection area
    - {Object} [newData]: After modification, the data corresponding to the selection area

------------
### rangeCopyBefore
- Type: Function
- Default: null
- Usage: Before copying selection
- Parameter: 
	- {Object | Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: Data corresponding to the selection area

------------
### rangeCopyAfter
- Type: Function
- Default: null
- Usage: After copying selection
- Parameter: 
	- {Object | Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: Data corresponding to the selection area

------------
### rangePasteBefore
- Type: Function
- Default: null
- Usage: Before pasting the selection
- Parameter: 
	- {Object | Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: The data corresponding to the selection area to be pasted

------------
### rangePasteAfter
- Type: Function
- Default: null
- Usage: After pasting the selection
- Parameter: 
	- {Object | Array} [range]: Selection area, may be multiple selection areas
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
	- {Object | Array} [range]: Selection area, may be multiple selection areas
	- {Object} [data]: The data corresponding to the selection area to be cleared

------------
### rangeClearAfter
- Type: Function
- Default: null
- Usage: After the selection is cleared
- Parameter: 
	- {Object | Array} [range]: Selection area, may be multiple selection areas
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
(TODO)
- Type: Function
- Default: null
- Usage: Triggered before the worksheet is created, the new worksheet also includes the new pivot table

------------
### sheetCreateAfter
(TODO)
- Type: Function
- Default: null
- Usage: Triggered after the worksheet is created, the new worksheet also includes the new pivot table
- Parameter: 
	- {Object} [sheet]: The configuration of the newly created worksheet

------------
### sheetMoveBefore
(TODO)
- Type: Function
- Default: null
- Usage: Before the worksheet is moved
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {Number} [order]: `Order` of current worksheet

------------
### sheetMoveAfter
(TODO)
- Type: Function
- Default: null
- Usage: After the worksheet is moved
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {Number} [oldOrder]: Before modification, the `order` of the current worksheet
	- {Number} [newOrder]: After modification, the `order` of the current worksheet

------------
### sheetDeleteBefore
(TODO)
- Type: Function
- Default: null
- Usage: Before the worksheet is deleted
- Parameter: 
	- {Object} [sheet]: Configuration of the worksheet to be deleted

------------
### sheetDeleteAfter
(TODO)
- Type: Function
- Default: null
- Usage: After the worksheet is deleted
- Parameter: 
	- {Object} [sheet]: Configuration of deleted worksheet

------------
### sheetEditNameBefore
(TODO)
- Type: Function
- Default: null
- Usage: Before changing the name of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [name]: Current worksheet name

------------
### sheetEditNameAfter
(TODO)
- Type: Function
- Default: null
- Usage: After changing the name of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [oldName]: Before modification, the current worksheet name
	- {String} [newName]: After modification, the current worksheet name

------------
### sheetEditColorBefore
(TODO)
- Type: Function
- Default: null
- Usage: Before changing the color of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [color]: Current worksheet color

------------
### sheetEditColorAfter
(TODO)
- Type: Function
- Default: null
- Usage: After changing the color of the worksheet
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [oldColor]: Before modification, the current worksheet color
	- {String} [newColor]: After modification, the current worksheet color

------------
### sheetZoomBefore
(TODO)
- Type: Function
- Default: null
- Usage: Before worksheet zoom
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [zoom]: Current worksheet zoom ratio

------------
### sheetZoomAfter
(TODO)
- Type: Function
- Default: null
- Usage: After worksheet zoom
- Parameter: 
	- {Number} [i]: `index` of current worksheet
	- {String} [oldZoom]: Before modification, the current worksheet zoom ratio
	- {String} [newZoom]: After modification, the current worksheet zoom ratio

------------
### sheetActivateBefore
(TODO)
- Type: Function
- Default: null
- Usage：Before worksheet activate
- Parameter：
	- {Number} [i]: `index` of current worksheet

------------
### sheetActivateAfter
(TODO)
- Type: Function
- Default: null
- Usage：After worksheet activate
- Parameter：
	- {Number} [i]: `index` of current worksheet

------------
### sheetDeactivateBefore
（TODO）
- Type: Function
- Default: null
- Usage：Before the worksheet changes from active to inactive
- Parameter：
	- {Number} [i]: `index` of current worksheet

------------
### sheetDeactivateAfter
（TODO）
- Type: Function
- Default: null
- Usage：After the worksheet is changed from active to inactive
- Parameter：
	- {Number} [i]: `index` of current worksheet

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
- Usage: The method executed after each operation is updated is executed after the canvas rendering, monitor changes in worksheet content, that is, every time the client performs a workbook operation, Luckysheet saves the operation in the history and triggers it. When undoing and redoing, it is also an operation, of course, the hook function will be triggered.
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

## Cooperative

### cooperativeMessage

- Type：Function
- Default：null
- Usage：Receive the cooperation message, secondary development. Expanding cooperative message instruction set
- Params:
	- {Object} : Receives the entire collaboration message body object sent by the server

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

#### Legacy Hook Function

### fireMousedown
- Type: Function
- Default: null
- Usage: Customized method of drilling down cell data, note that this hook function is mounted under options: `options.fireMousedown`

------------

## Pager

### onTogglePager

- Type: Function
- Default: null
- Usage: Click the page button to call back the function, return the current page number, refer to [sPage backFun](https://github.com/jvbei/sPage)
- Parameter:
	- {Object} [page]: Return the current page object

------------
