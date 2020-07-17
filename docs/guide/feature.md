# Advanced Features

## luckysheet.getcellvalue(r, c, data, type)
- **Parameter**：
	- r: the number of rows in which the cell is located; optional values; integers starting at 0, 0 representing the first row.
	- c: the number of columns in which the cell is located; optional values; integers starting at 0, 0 indicating the first column.
	- data: table data; two-dimensional array; the default value is the current table data.
	- type: cell attribute value; optional value; the default value is'v', which means to get the cell value.
- **Usage**：
	
	This method is to get the cell value. When `r` and `c` have no value, return `data`; when `r`, `c` has only one value, return the entire row or column of data;

------------
## luckysheet.getluckysheetfile()
- **Usage**：

	Return all table data structures.

------------
## luckysheet.sheetmanage.getSheetByIndex(index)
- **Parameter**：
	- index: table subscript; integer starting from 0, 0 means the first table; default is the current table subscript.
- **Usage**：

	Returns a table data structure.

------------
## luckysheet.getconfig()
- **Usage**：

	Returns the current table configuration.

------------
## luckysheet.getSheetConfig(sheetIndex)
- **Parameter**：
	- sheetIndex: table index; an integer starting from 0, 0 means the first table; the default is the current table index.
- **Usage**：

	Return to a table configuration.

------------
## luckysheet.getvisibledatarow()
- **Usage**：

	Returns the current table row height.

------------
## luckysheet.getvisibledatacolumn()
- **Usage**：

	Returns the current table column width.

------------
## luckysheet.getluckysheet_select_save()
- **Usage**：

	Returns the current selection.

------------
## luckysheet.getdatabyselection(range, sheetIndex)
- **Parameter**：
	- range: selection object; `object: {row: [r1, r2], column: [c1, c2] }`; the default is the current selection.
	- sheetIndex: table index; an integer starting from 0, 0 means the first table; the default is the current table index.
- **Usage**：

	Returns the cell data of a range in a table.

------------
## luckysheet.luckysheetrefreshgrid(scrollWidth, scrollHeight)
- **Parameter**：
	- scrollWidth: horizontal scroll value. The default is the current horizontal scroll position.
	- scrollHeight: vertical scroll value. The default is the current vertical scroll position.
- **Usage**：

	Refresh canvas display data according to scrollWidth, scrollHeight.

------------
## luckysheet.setcellvalue(r, c, d, v)
- **Parameter**：

	- r: the number of rows in which the cell is located; an integer starting from 0, 0 means the first row.
	- c: the number of columns in which the cell is located; an integer starting from 0, 0 means the first column.
	- d: table data; two-dimensional array.
	- v: The value to be set; it can be an object, and the object should conform to the cell object format.
- **Usage**：

	Set the value of a cell. Cooperate with `luckysheet.luckysheetrefreshgrid()` to refresh to see the cell value changes.
	```js
	luckysheet.setcellvalue(0, 0, luckysheet.flowdata, 'abc');
	luckysheet.luckysheetrefreshgrid();
	```

------------
## luckysheet.setluckysheet_select_save(v)
- **Parameter**：
	- v: The selection value (array) to be set. It conforms to the selection format rules, such as `[{ row: [r1, r2], column: [c1, c2] }]`.
- **Usage**：
	
	Set the value of the current table selection. With `luckysheet.selectHightlightShow()`, you can view the selection changes on the interface.
	```js
	luckysheet.setluckysheet_select_save([{ row: [0, 1], column: [0, 1] }]);
	luckysheet.selectHightlightShow();
	```

------------
## luckysheet.sheetmanage.setSheetHide(index)
- **Parameter**：
	- index: table subscript; integer starting from 0, 0 means the first table; default is the current table subscript.
- **Usage**：

	Hide a table.

------------
## luckysheet.sheetmanage.setSheetShow(index)
- **Parameter**：
	- index: table subscript; integer starting from 0, 0 means the first table; default is the current table subscript.
- **Usage**：

	Display a table.

------------
## luckysheet.method.destroy()
- **Usage**：
	
	Release table
