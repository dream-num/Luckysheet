# API

::: danger
The new API is being sorted out, please use it with caution!
:::

## luckysheet.create(options)
- **Parameter**：
	- {Object} [options]:All configuration information of the table
- **Usage**：
	
	Initialize a luckysheet, which can contain multiple worksheets, refer to [Configuration List](/zh/guide/config.html)

------------
## luckysheet.getcellvalue([r] [,c] [,data] [,type])
- **Parameter**：
	- {Number} [r]:The row number of the cell; optional value; an integer starting from 0, 0 means the first row
	- {Number} [c]:The column number of the cell; optional value; an integer starting from 0, 0 means the first column
	- {Array} [data]:Table data, two-dimensional array; optional value; default value is the current table data
	- {String} [type]:Cell attribute value; optional value; the default value is'v', which means to get the actual value of the cell
- **Usage**：
	
	This method is to get the value of the cell.
	1. `luckysheet.getcellvalue()`：Return all data in the current worksheet;
	2. `luckysheet.getcellvalue(0)`：Return the first row data of the current worksheet;
	3. `luckysheet.getcellvalue(null,0)`：Return the data in the first column of the current worksheet;
	4. `luckysheet.getcellvalue(0,0)`：Return the v value of the data in the first row and first column of the current worksheet;
	5. `luckysheet.getcellvalue(1,1,null,'m')`: Returns the original value of the cell in the second row and second column of the specified data.
	
	Special case: the cell format is `yyyy-MM-dd`, when the type is'v', the display value of'm' will be mandatory

------------
## luckysheet.getluckysheetfile()
- **Usage**：

	Returns a one-dimensional array of all table data structures[luckysheetfile](/zh/guide/data.html), `luckysheet.getluckysheetfile()[0]` can get all the information of the first worksheet.

------------
## luckysheet.getconfig()
- **Usage**：

	Quickly return to the current sheet config configuration, the config information of each worksheet is still contained in the luckysheetfile.

------------
## luckysheet.getluckysheet_select_save()
- **Usage**：

	Returns an array of current selection objects, there may be multiple selections.

------------
## luckysheet.getdatabyselection([range] [,sheetIndex])
- **Parameter**：
	- {Object} [range]：Selection object, `object: {row: [r1, r2], column: [c1, c2] }`; optional value; the default is the current first selection.
	- {Number} [sheetIndex]：Table subscript, an integer starting from 0, 0 means the first table; optional value; the default is the current table subscript.
- **Usage**：

	Returns the data of the first selection in a table.
	- `luckysheet.getdatabyselection()`: Returns the data of the current selection of the current worksheet
	- `luckysheet.getdatabyselection(null,1)`: Returns the data of the current selection of the second worksheet

------------
## luckysheet.luckysheetrefreshgrid(scrollWidth, scrollHeight)
- **Parameter**：
	- {Number} [scrollWidth]：Horizontal scroll value. The default is the current horizontal scroll position.
	- {Number} [scrollHeight]：Vertical scroll value. The default is the current vertical scroll position.
- **Usage**：

	Refresh the canvas display data according to scrollWidth and scrollHeight.

------------
## luckysheet.setcellvalue(r, c, d, v)
- **Parameter**：
	- {Number} [r]：The row number of the cell; an integer starting from 0, 0 means the first row.
	- {Number} [c]：The column number of the cell; an integer starting from 0, 0 means the first column.
	- {Array} [d]：Table data; optional value; two-dimensional array.
	- {Object | String | Number} [v]：The value to be set; it can be an object, and the object is to conform to the cell object format.
- **Usage**：

	Set the value of a cell. Can be used with `luckysheet.jfrefreshgrid()` to refresh and view cell value changes.
	```js
	luckysheet.setcellvalue(0, 0, luckysheet.flowdata(), 'abc');
	luckysheet.jfrefreshgrid();
	```
	
------------
## luckysheet.jfrefreshgrid()
- **Usage**：

	Refresh canvas

------------
## luckysheet.setluckysheet_select_save(v)
- **Parameter**：
	- {Array} [v]：The selection value (array) to be set. Comply with selection format rules, such as `[{ row: [r1, r2], column: [c1, c2] }]`.
- **Usage**：
	
	Set the value of the current table selection area. With `luckysheet.selectHightlightShow()`, you can view the selection changes in the interface.
	```js
	luckysheet.setluckysheet_select_save([{ row: [0, 1], column: [0, 1] }]);
	luckysheet.selectHightlightShow();
	```

------------
## luckysheet.selectHightlightShow()
- **Usage**：

	Highlight the current selection

------------
## luckysheet.setSheetHide(index)
- **Parameter**：
	- {Number} [index]：Table index; an integer starting from 0, 0 means the first table; the default is the current table index.
- **Usage**：

	Hide a table.

------------
## luckysheet.setSheetShow(index)
- **Parameter**：
	- {Number} [index]：Table index; an integer starting from 0, 0 means the first table; the default is the current table index.
- **Usage**：

	Display a table.

------------
## luckysheet.flowdata()
- **Usage**：
	
	Quickly get the data of the current table

------------
## luckysheet.buildGridData(file)
- **Parameter**：
	- {Object} [file]：[luckysheetfile](/zh/guide/sheet.html)
- **Usage**：
	
	Generate a two-dimensional array that the table can recognize

------------
## luckysheet.getGridData(data)
- **Parameter**：
	- {Array} [data]：Two-dimensional array data of worksheet
- **Usage**：
	
	Convert two-dimensional array data into `{r, c, v}` format one-dimensional array

------------
## luckysheet.destroy()
- **Usage**：
	
	Delete and release table
