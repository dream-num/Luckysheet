# Basic Configuration

## container
- Type: String
- Default: "luckysheet"
- Usage: Container ID
  
------------
## title
- Type: String
- Default: "Luckysheet Demo"
- Usage: Table's name

------------
## lang
- Type: String
- Default: "en"
- Usage: Internationalization settings, allowing to set the language of the table, temporarily supporting Chinese ("zh") and English ("en")

------------
## gridKey
- Type: String
- Default: ""
- Usage: Form unique identifier

------------
## column
- Type: Number
- Default: 60
- Usage: The default number of columns in an empty table

------------
## row
- Type: Number
- Default: 84
- Usage: The default number of rows in an empty table

------------
## data
- Type: Array
- Default: [{ "name": "Sheet1", color: "", "status": "1", "order": "0", "data": [], "config": {}, "index":0 }, { "name": "Sheet2", color: "", "status": "0", "order": "1", "data": [], "config": {}, "index":1  }, { "name": "Sheet3", color: "", "status": "0", "order": "2", "data": [], "config": {}, "index":2  }]
- Usage: Client sheet data `[shee1, sheet2, sheet3]`

------------
## plugins
- Type: Array
- Default: []
- Usage: Plug-in configuration, support chart: "chart"

------------
## fullscreenmode
- Type: Boolean
- Default: true
- Usage: Whether full-screen mode. In non-full-screen mode, the marker box is not forced to be selected

------------
## autoFormatw
- Type: Boolean
- Default: false
- Usage: Automatically format numbers with more than 4 digits as 'billion format', for example: true or "true" or "TRUE"

------------
## accuracy
- Type: Number
- Default: undefined
- Usage: Set the accuracy,the number of digits after the decimal point. Pass the parameter as a number or numeric string, for example: "0" or 0

------------
## allowCopy
- Type: Boolean
- Default: true
- Usage: Whether to allow copying

------------
## showtoolbar
- Type: Boolean
- Default: true
- Usage: Whether to display the toolbar in the second row

------------
## showinfobar
- Type: Boolean
- Default: true
- Usage: Whether to display the top name bar

------------
## showsheetbar
- Type: Boolean
- Default: true
- Usage: Whether to display the bottom table name area

------------
## showstatisticBar
- Type: Boolean
- Default: true
- Usage: Whether to display the bottom count bar

------------
## allowEdit
- Type: Boolean
- Default: true
- Usage: Whether to allow frontend editing

------------
## enableAddRow
- Type: Boolean
- Default: true
- Usage: Allow add line

------------
## enableAddCol
- Type: Boolean
- Default: true
- Usage: Allow add column

------------
## userInfo
- Type: String
- Default: `'<i style="font-size:16px;color:#ff6a00;" class="fa fa-taxi" aria-hidden="true"></i> rabbit'`
- Usage: User information display style in the upper right corner

------------
## userMenuItem
- Type: Array
- Default: `[{url:"www.baidu.com", "icon":'<i class="fa fa-folder" aria-hidden="true"></i>', "name":"My Table"}, {url:"www.baidu.com", "icon":'<i class="fa fa-sign-out" aria-hidden="true"></i>', "name":"Sign Out"}]`
- Usage: The menu, which popped up by clicking the user information in the upper right corner

------------
## myFolderUrl
- Type: String
- Default: "www.baidu.com"
- Usage: Back button link in the upper left corner

------------
## devicePixelRatio
- Type: Number
- Default: window.devicePixelRatio
- Usage: Device Pixel Ratio, the larger the ratio, the higher the table resolution

------------
## allowUpdate
- Type: Boolean
- Default: false
- Usage: Whether to allow back-end update after operating the table, used in conjunction with `updateUrl`

------------
## loadUrl
- Type: String
- Default: ""
- Usage: Configure the address of `loadUrl`, Luckysheet will request the table data through ajax. By default, all `data` in the sheet data with status 1 is loaded, and the rest of the sheet loads all fields except the `data` field.

------------
## loadSheetUrl
- Type: String
- Default: ""
- Usage: Configure the address of `loadSheetUrl`, the parameters are `gridKey` (table primary key) and `index` (sheet primary key collection, format is `[1,2,3]`), the returned data is the `data` field set of sheet

------------
## updateUrl
- Type: String
- Default: ""
- Usage: The back-end update address after operating the table will only be effective when `allowUpdate` is `true`

------------
## updateImageUrl
- Type: String
- Default: ""
- Usage: Update URL of thumbnail

------------
## functionButton
- Type: String
- Default: ""
- Usage: Function buttons in the upper right corner, for example`'<button id="" class="btn btn-primary" style="padding:3px 6px;font-size: 12px;margin-right: 10px;">Download</button>    <button id="" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">Share</button>    <button id="luckysheet-share-btn-title" class="btn btn-primary btn-danger" style="    padding:3px 6px;    font-size: 12px;    margin-right: 10px;">Show Data</button>'`

------------
## showConfigWindowResize
- Type: Boolean
- Default: true
- Usage: The configuration of the chart or pivot table will pop up on the right. Set whether the table will be automatically indented after popping up

------------
## enablePage
- Type: Boolean
- Default: false
- Usage: Allow next page to load

------------
## beforeCreateDom
- Type: Function
- Default: null
- Usage: Custom method before table creation

------------
## fireMousedown
- Type: Function
- Default: null
- Usage: Custom method for drilling down cell data

------------