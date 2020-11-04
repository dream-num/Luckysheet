## A requirement

If you create a table by Luckysheet and make some operations in the table,  how does Luckysheet transfer data to the back-end?

## Ways
There are two ways：
- 1- after all operations, the system transfers all data that come from luckysheet.getAllSheets() to the back-end.
- 2- enable the collaborative editing function to transmit data to the back-end in real-time.
We recommend you to use the collaborative editing way because it has better performance than the first way. Considering the design should include the collaboration with front-end and back-end.

- First of all, you should build the database schema based on the luckysheet table data.
- then front-end gets configurations and data via WebSocket that is created by the back-end, and this WebSocket is the most important point in this design.
- The front-end initializes the table and stores data in real-time with a WebSocket. The back-end store operations data. if someone changes data, the back-end will push the latest data to other clients, so collaborative clients can get the latest data.（if you are using a cluster, pushing data to the Redis queue and send data to the WebSocket is our recommendation.）

## Details

### The first step: designs of database

The data in luckysheet includes workbook configuration, sheet configuration, and sheet data. So the lucksheet data structure shows the design of database schema and field type.
- [workbook configuration](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/config.html)：according`luckysheet.create(options)`to build a new workbook
- [worksheet configuration](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/sheet.html)：：according`options.data`to create a worksheet
- [worksheet data](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/sheet.html#celldata)：according`options.data[0].celldata`to create the database schema. you can design the field name.

### The second step: APIs

The back_end provides 3 APIs to combine data. you can click the links to get the latest information.
- [loadUrl](https://mengshukeji.gitee.io/luckysheetdocs/zh/guide/config.html#loadUrl)：load all sheets configuration including the cell data on the current page.
- [loadSheetUrl](https://mengshukeji.gitee.io/LuckysheetDocs/zh/guide/config.html#loadSheetUrl)：load cell data in the remaining pages.
- [updateUrl](https://mengshukeji.gitee.io/LuckysheetDocs/zh/guide/config.html#updateUrl)：WebSocket address used to store data in real time.

### The third step: the front-end initialization

The front-end initializes the 3 API URLs and enable update indicator to allow collaborative editing.
+ `allowUpdate` is `true`
+ already set `loadUrl`
+ already set`loadSheetUrl`
+ already set`updateUrl`

detail:[updateUrl](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/config.html#updateurl)

### The last step: the back-end logic

The API`updateUrl`allows Luckysheet stores and  synchronizes each user's data in real-time. Luckysheet sends every operation parameter to the back-end. the type of operations and parameters refer to this[table operations](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/operate.html)

The back-end classifies and stores these data to maintains each luckysheet file and distributes the data from the front-end, if the front-end receives data, the luckysheet will automatically merge and update the latest data.

## Reference
- [community case](https://gitee.com/ichiva/luckysheet-saved-in-recovery)
- [Luckysheet official documents](https://mengshukeji.github.io/LuckysheetDocs/zh/)