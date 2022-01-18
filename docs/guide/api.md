# API

Luckysheet has opened up the main function API for common data operation requirements, and developers can do any docking development according to their needs.

Use note:
1. When script is introduced globally, all APIs are mounted under the window.luckysheet object, which can be printed and seen in the browser console; when npm is introduced, all APIs are also mounted under the luckysheet object
2. The first parameter of the `success` callback function is the return value of the API method
3. If you need a new API, please submit it to github [Issues](https://github.com/mengshukeji/Luckysheet/issues/new/choose), and decide whether to open the new API according to the number of likes
4. The required `order` parameter in the API method is the value of `order` in the worksheet object, not `index`

## Cell operation

### getCellValue(row, column [,setting])<div id='getCellValue'></div>
 

- **Parameter**：

	- {Number} [row]: The row number of the cell; an integer starting from 0, 0 means the first row
	- {Number} [column]: The number of the column where the cell is located; an integer starting from 0, 0 means the first column
	- {PlainObject} [setting]: optional parameters
    	+ {String} [type]: The value type of the cell, which can be set to the original value `v` or the display value `m`; the default value is `v`, which means to get the actual value of the cell
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Get the value of the cell.

	In special cases, the cell format is `yyyy-MM-dd`, when `type` is `'v'`, the display value of `'m'` will be forced

- **Usage**:

	- Returns the v value of the data in the first row and first column of the current worksheet
		
		`luckysheet.getCellValue(0, 0)`

	- Returns the original value of the cell in the second row and second column of the specified data.
		
		`luckysheet.getCellValue(1, 1, {type:"m"})`

------------

### setCellValue(row, column, value [,setting])
 
- **Parameter**:

	- {Number} [row]: The row number of the cell; an integer starting from 0, 0 means the first row
	- {Number} [column]: The number of the column where the cell is located; an integer starting from 0, 0 means the first column
	- {Object| String| Number} [value]: The value to be set; it can be a string or a number, or an object conforming to the Luckysheet cell format, refer to [cell attribute table](/zh/guide/cell.html )
	- {PlainObject} [setting]: Optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Boolean} [isRefresh]: Whether to refresh the interface; the default is `true`; used to control throttling when multiple cells are assigned, the previous cell should be set to `false`, and the last cell is set Is `true`.
    	+ {Function} [success]: The callback function for the end of the operation

- **Explanation**:

	Set the value of a cell, you can also set the entire cell object, which is used to set multiple cell properties at the same time.

	If you need to update the formula, you can also assign a value here. Luckysheet will actively calculate this formula internally and add it to the formula chain, and finally refresh the interface.

- **Usage**:

  - Set the value of cell "A1" in the current worksheet to "1"
  `luckysheet.setCellValue(0, 0, 1);`

  - Set the current worksheet "B1" cell value to the formula "=sum(A1)"
  `luckysheet.setCellValue(0, 1, "=sum(A1)");`

  - Set the cell "C1" of the current worksheet to the formula "=sum(A1:B1" with a red background. The cell object can have no `v` and `m` values. Luckysheet will automatically calculate the result according to the formula information. With `v` and `m` values ​​that have not been updated or are non-formula results, Luckysheet will still calculate the prepared results based on the data actually associated with the formula.
  	`luckysheet.setCellValue(0, 2, {f: "=sum(A1:B1)", bg:"#FF0000"})`

	Set the "C1" cell again and the new formula can still take effect
		`luckysheet.setCellValue(0, 2, {f: "=sum(A1)", bg:"#00FF00"})`

------------
### clearCell(row, column [,setting])
 

- **Parameter**：

	- {Number} [row]: The row number of the cell; an integer starting from 0, 0 means the first row
	- {Number} [column]: The number of the column where the cell is located; an integer starting from 0, 0 means the first column
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Clear the contents of the specified cell of the specified worksheet, return the cleared data, which is different from the function of deleting the cell, no need to set the cell movement

- **Usage**:

    - Clear the contents of cell `B2`
      `luckysheet.clearCell(1,1)`
    
------------

### deleteCell(move, row, column [,setting])
 

- **Parameter**:
  - {String} [move]: After deleting, whether the cells on the right or below move
    
  Possible values of `move` are:
   
      + `"left"`: Move the right cell to the left
      + `"up"`: Move the lower cell up
   
  - {Number} [row]: The row number of the cell; an integer starting from 0, 0 means the first row
  - {Number} [column]: The number of the column where the cell is located; an integer starting from 0, 0 means the first column
  - {PlainObject} [setting]: optional parameters
      + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
      + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Delete the specified cell of the specified worksheet, return the deleted data, and at the same time, specify whether to move the right cell to the left or the bottom cell to move up

- **Usage**:

    - Delete the current cell and after deleting, the right cell moves to the left
      `luckysheet.deleteCell('left')`
    
------------

### setCellFormat(row, column, attr, value [,setting])
 

- **Parameter**：
	
	- {Number} [row]: The row number of the cell; an integer starting from 0, 0 means the first row
    - {Number} [column]: The number of the column where the cell is located; an integer starting from 0, 0 means the first column
    - {String} [attr]: attribute type, refer to attribute value of [cell attribute table](/zh/guide/cell.html)
    - {String | Number | Object} [value]: Specific setting value, one attribute will correspond to multiple values, refer to the value example of [cell attribute table](/zh/guide/cell.html), if the attribute type is ` Attr` is the cell format `ct`, then the setting value `value` should provide a ct object, such as: `{fa:"General", t:"g"}`, for example, set the format of cell A1 to percentage format:
	  
  	  `luckysheet.setCellFormat(0, 0, "ct", {fa:"0.00%", t:"n"})`

	- {PlainObject} [setting]: optional parameters
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set the properties of a cell. If you want to set the value of a cell or set multiple cell properties at the same time, it is recommended to use `setCellValue`

	Special settings
    
	When setting the border, attr is `"bd"`, value is a key/value object, and the border type: `borderType`/border thickness:`style`/border color:`color` need to be set at the same time, such as setting A1 unit The border of the grid is all/red/thin:

	`luckysheet.setCellFormat(0, 0, "bd", {borderType: "border-right",style: "1", color: "#ff0000"})`

	The complete optional setting parameters are as follows:

    + Border Type `borderType: "border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border -horizontal" | "border-vertical" | "border-none"`,
    + Border thickness `style: 1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
    + Border color `color: hexadecimal color value`

- **Usage**:

    - Set the current worksheet A1 cell text bold
    `luckysheet.setCellFormat(0, 0, "bl", 1)`
    - Set the B2 cell background of the second worksheet to red
    `luckysheet.setCellFormat(1, 1, "bg", "#ff0000", {order:1})`
    - Set the value of cell "A1" of the current worksheet to "abc"
    `luckysheet.setCellFormat(0, 0,'v','abc');`

------------

### find(content [,setting])
 

- **Parameter**：
	
	- {String} [content]: the content to find
    - {PlainObject} [setting]: optional parameters
        + {Boolean} [isRegularExpression]: Whether to match the regular expression; the default is `false`
        + {Boolean} [isWholeWord]: Whether to match the whole word; the default is `false`
        + {Boolean} [isCaseSensitive]: Whether to match case sensitively; the default is `false`
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {String} [type]: cell attribute; the default value is `"m"`

- **Explanation**：
	
	Find the specified content in a worksheet and return a one-bit array of cells composed of the found content, the data format is the same as `celldata`.

- **Usage**:

    - Find the string `"value"` in the current worksheet
    `luckysheet.find("value")`
	- Find cells in the current worksheet whose formula contains `"SUM"`
    `luckysheet.find("SUM",{type:"f"})`

------------

### replace(content, replaceContent [,setting])
 

- **Parameter**：
	
	- {String} [content]: the content to find
	- {String} [replaceContent]: The content to be replaced
	- {PlainObject} [setting]: optional parameters
    	+ {Boolean} [isRegularExpression]: Whether to match the regular expression; the default is `false`
    	+ {Boolean} [isWholeWord]: Whether to match the whole word; the default is `false`
    	+ {Boolean} [isCaseSensitive]: Whether to match case sensitively; the default is `false`
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Find the specified content in a worksheet and replace it with new content, and return a one-bit array of cells composed of the replaced content. The data format is the same as `celldata`.

- **Usage**:

     - Find the string `"value"` in the current worksheet and replace it with `"out"`
    	`luckysheet.replace("value", "out")`

------------

### exitEditMode([,setting])
 

- **Parameter**：
	
	- {PlainObject} [setting]: optional parameters
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Exit edit mode. After double-clicking the cell with the mouse, it will enter the cell editing mode. After the editing is completed, when the mouse clicks on the input box elsewhere to lose focus, the editing mode will be exited, and the value of the cell will be saved. This Api is the operation of automatically exiting the editing mode, mainly to trigger the automatic saving of cells.

- **Usage**:

   - Manually trigger to exit edit mode
   		`luckysheet.exitEditMode()`

------------

## Row and column operations

### setHorizontalFrozen(isRange [,setting])
 

- **Parameter**：
	
	- {Boolean} [isRange]: Whether to freeze rows to selection
		Possible values of `isRange` are:
 
        + `"false"`: Freeze the first line
        + `"true"`: freeze line to selection
    - {PlainObject} [setting]: optional parameters
        + {Array | Object | String} [range]: Set when `isRange` is `true`, open the frozen cell position, the format is `{ row_focus:0, column_focus:0 }`, which means the currently activated cell The number of rows and columns of the grid; the default is obtained from the last selection of the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Freeze row operation

	Pay special attention to the setting of `range` in `setting` only when `isRange` is set to `true`, which is different from the general range format.

- **Usage**:

   - Freeze the first row

		`luckysheet.setHorizontalFrozen(false)`

   - Frozen to `B5` selection

		`luckysheet.setHorizontalFrozen(true, { range: 'B5' })`

------------

### setVerticalFrozen(isRange [,setting])
 

- **Parameter**：
	
	- {Boolean} [isRange]: Whether to freeze the selection
		Possible values of `isRange` are:
		
		+ `"false"`: Freeze the first column
		+ `"true"`: Freeze column to selection
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: Set when `isRange` is `true`, open the frozen cell position, the format is `{ row_focus:0, column_focus:0 }`, which means the currently activated cell The number of rows and columns of the grid; the default is obtained from the last selection of the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Freeze column operation

	Pay special attention to the setting of `range` in `setting` only when `isRange` is set to `true`, which is different from the general range format.

- **Usage**:

   - Freeze the first column

		`luckysheet.setVerticalFrozen(false)`

------------

### setBothFrozen(isRange [,setting])
 

- **Parameter**：
	
	- {Boolean} [isRange]: Whether to freeze the ranks to the selection
		Possible values of `isRange` are:
		
		+ `"false"`: Freeze ranks
		+ `"true"`: Freeze ranks to selection
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: Set when `isRange` is `true`, open the frozen cell position, the format is `{ row_focus:0, column_focus:0 }`, which means the currently activated cell The number of rows and columns of the grid; the default is obtained from the last selection of the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Freeze rank operation

	Pay special attention to the setting of `range` in `setting` only when `isRange` is set to `true`, which is different from the general range format.

	If you want to use this API to set the freeze after the workbook is initialized, you can execute it in the hook function after the workbook is created, such as:
	```js
	luckysheet.create({
		hook:{
			workbookCreateAfter:function(){
				luckysheet.setBothFrozen(false);
			}
		}
	});

- **Usage**:

   - Frozen ranks

		`luckysheet.setBothFrozen(false)`

------------

### cancelFrozen([setting])
 

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Cancel freeze operation

- **Usage**:

   - Cancel freeze

		`luckysheet.cancelFrozen()`

------------

### insertRow(row [,setting])
 

- **Parameter**：

	- {Number} [row]: Insert a blank row in the first few rows, starting from 0

	- {PlainObject} [setting]: optional parameters
    	+ {Number} [number]: The number of blank rows inserted; the default is 1
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Insert a blank line in the `number` line at the position of the `row` line

- **Usage**:

   - Insert a blank line at the position of line 2

		`luckysheet.insertRow(1)`

------------

### insertColumn( column [,setting])
 

- **Parameter**：

	- {Number} [column]: Insert a blank column in the first column

	- {PlainObject} [setting]: optional parameters
    	+ {Number} [number]: The number of blank columns to insert; the default is 1
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Insert a blank column in column `number` at the position of column `column`

- **Usage**:

   - Insert 3 blank rows in column 1

		`luckysheet.insertRow(0, { number: 3 })`

------------

### deleteRow(rowStart, rowEnd [,setting])
 

- **Parameter**：
	
	- {Number} [rowStart]: the starting row to delete
	- {Number} [rowEnd]: the end row to be deleted

	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Delete the specified row

	Special reminder, after deleting the row, the serial number of the row will not change, the following row will be added to the above, pay attention to observe whether the data is deleted correctly.

- **Usage**:

   - Delete 2-4 lines

		`luckysheet.deleteRow(1, 3)`

------------

### deleteColumn(columnStart, columnEnd [,setting])
 
- **Parameter**：
	
	- {Number} [columnStart]: the starting column to be deleted
	- {Number} [columnEnd]: the end column to be deleted
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Delete the specified column

	Special reminder, after deleting the column, the serial number of the column will not change, the right column will be added to the left, pay attention to whether the data is deleted correctly.

- **Usage**:

   - Delete 2-4 columns

		`luckysheet.deleteColumn(1, 3)`

------------

### hideRow(rowStart, rowEnd [,setting])

- **Parameter**：
	
	- {Number} [rowStart]: The starting row to be hidden
	- {Number} [rowEnd]: the end row to be hidden
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Hide the specified row

	Special reminder, after the row is hidden, the row number will change.

- **Usage**:

   - Hide 2-4 rows

		`luckysheet.hideRow(1, 3)`

------------

### hideColumn(columnStart, columnEnd [,setting])(TODO)
 
- **Parameter**：
	
	- {Number} [columnStart]: the starting column to be hidden
	- {Number} [columnEnd]: the end column to be hidden
	
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Hide the specified column

	Special reminder, after hiding the column, the sequence number of the column will change.

- **Usage**:

   - Hide 2-4 columns

		`luckysheet.hideColumn(1, 3)`

------------

### showRow(rowStart, rowEnd [,setting])
 
- **Parameter**：
	
	- {Number} [rowStart]: the starting row to be displayed
	- {Number} [rowEnd]: the end row to be displayed
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Show the specified row

- **Usage**:

   - Display 2-4 lines

		`luckysheet.showRow(1, 3)`

------------

### showColumn(columnStart, columnEnd [,setting])(TODO)
 

- **Parameter**：
	
	- {Number} [columnStart]: the starting column to be displayed
	- {Number} [columnEnd]: the end column to be displayed
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Show the specified column

- **Usage**:

   - Display 2-4 columns

		`luckysheet.showColumn(1, 3)`

------------

### setRowHeight(rowInfo [,setting])

(TODO)
 
- **Parameter**：
	
	- {Object} [rowInfo]: Correspondence between number of rows and height
	
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set the height of the specified ~~row~~

- **Usage**:

   - Set the height of the first row to 50px and the height of the second row to 60px

		`luckysheet.setRowHeight({0：50，1：60})`

------------

### setColumnWidth(columnInfo [,setting])

(TODO)
 
- **Parameter**：
	
	- {Object} [columnInfo]: Correspondence between the number of columns and the width
	
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set the width of the specified column

- **Usage**:

   - Set the width of the first column to 50px and the width of the second column to 60px

		`luckysheet.setColumnWidth({0：50，1：60})`

------------

### getRowHeight(rowInfo [,setting])

(TODO)
 
- **Parameter**：
	
	- {Array} [rowInfo]: The number of rows
	
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Get the height of the specified row, get the object corresponding to the number of rows and height

- **Usage**:

   - The height of the first row is 50px, the height of the second row is 60px, get these values

		`luckysheet.getRowHeight([0,1])`
		Return to get
		`{0：50，1：60}`

------------

### getColumnWidth(columnInfo [,setting])

(TODO)
 
- **Parameter**：
	
	- {Array} [columnInfo]: The number of columns
	
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Get the width of the specified column, get the object of the corresponding relationship between the number of columns and the width

- **Usage**:

   - The width of the first column is 50px, the width of the second column is 60px, get these values

		`luckysheet.getColumnWidth([0,1])`
		Return to get
		`{0：50，1：60}`

------------

### getDefaultRowHeight([,setting])

(TODO)
 
- **Parameter**：
	
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Get the default row height of the specified worksheet

- **Usage**:

   - Returns the default row height of the current worksheet

		`luckysheet.getDefaultRowHeight()`
		Return to get
		`19`

------------

### getDefaultColWidth([,setting])

(TODO)
 
- **Parameter**：
		
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Get the default column width of the specified worksheet

- **Usage**:

   - Returns the default column width of the current worksheet

		`luckysheet.getDefaultColWidth()`
		Return to get
		`73`

------------

## Selection operation

### getRange()
 

- **Explanation**：

	Returns an array of current selection objects, there may be multiple selections. The format of each selection area is an object composed of row/column information `{row:[0,1],column:[0,1]}`

- **Usage**:

	- The current selection is "A1:B2" and "B4:C5", execute
		
		`luckysheet.getRange()`
		
		The returned result is:
		```json
		[
			{ "row": [0,1], "column": [0,1] },
			{ "row": [3,4], "column": [1,2] }
		]
		```

------------


### getRangeWithFlatten()
 
- **Explanation**：

	Returns an array representing the positions of all cells in the specified area, which is different from the getrange method, which organizes the data of the selection by cell (rather than a continuous area).

- **Usage**:

	- Select the specified area in the table, and then execute
		
		`luckysheet.getRange()`
		
		The returned result is:
		```json
		[
			{"row":[0,0],"column":[0,2]},
			{"row":[1,1],"column":[0,0]},
			{"row":[3,3],"column":[0,0]}
		]
		```
		Where，{"row":[0,0],"column":[0,2]} denote a whole continuous region.

	- Select the area above in the table and execute
		
		`luckysheet.getRangeWithFlatten()`
		
		The returned result is:
		```json
		[
			{"r":0,"c":0},
			{"r":0,"c":1},
			{"r":0,"c":2},
			{"r":1,"c":0},
			{"r":3,"c":0}
		]
		```

------------


### getRangeValuesWithFlatte()
 
- **Explanation**：

	Returns an array of objects representing the contents of all cells in a specified range

- **Usage**:

	- Select the specified area in the table, and then execute
		
		`luckysheet.getRange()`
		
		The returned result is:
		```json
		[
			{"row":[0,0],"column":[0,2]},
			{"row":[1,1],"column":[0,0]},
			{"row":[3,3],"column":[0,0]}
		]
		```
		Where，{"row":[0,0],"column":[0,2]} denote a whole continuous region.

	- Select the area above in the table and execute
		
		`luckysheet.getRangeValuesWithFlatte()`
		
		The returned result is:
		```json
		[
			{
				"bg": null,
				"bl": 0,
				"it": 0,
				"ff": 0,
				"fs": 11,
				"fc": "rgb(51, 51, 51)",
				"ht": 1,
				"vt": 1,
				"v": 1,
				"ct": {
					"fa": "General",
					"t": "n"
				},
				"m": "1"
			},
			{
				"bg": null,
				"bl": 0,
				"it": 0,
				"ff": 0,
				"fs": 11,
				"fc": "rgb(51, 51, 51)",
				"ht": 1,
				"vt": 1,
				"v": 2,
				"ct": {
					"fa": "General",
					"t": "n"
				},
				"m": "2"
			},
			{
				"bg": null,
				"bl": 0,
				"it": 0,
				"ff": 0,
				"fs": 11,
				"fc": "rgb(51, 51, 51)",
				"ht": 1,
				"vt": 1,
				"v": 3,
				"ct": {
					"fa": "General",
					"t": "n"
				},
				"m": "3"
			},
			{
				"v": "Background",
				"ct": {
					"fa": "General",
					"t": "g"
				},
				"m": "Background",
				"bg": null,
				"bl": 1,
				"it": 0,
				"ff": 0,
				"fs": 11,
				"fc": "rgb(51, 51, 51)",
				"ht": 1,
				"vt": 1
			},
			{
				"v": "Border",
				"ct": {
					"fa": "General",
					"t": "g"
				},
				"m": "Border",
				"bg": null,
				"bl": 1,
				"it": 0,
				"ff": 0,
				"fs": 11,
				"fc": "rgb(51, 51, 51)",
				"ht": 1,
				"vt": 1
			}
		]
		```
------------

### getRangeAxis()
 
- **Explanation**：

	Returns an array of coordinate strings corresponding to the current selection. Multiple selections may exist. Each selection may be a single cell (such as A1) or a rectangular region of multiple cells (such as D9: E12)

- **Usage**:

	- The current selection is"E10:E14"、"A7:B13"、"C4"、 "A3" and "C6:D9", execute
		
		`luckysheet.getRangeAxis()`
		
		The returned result is:
		```json
		["E10:E14", "A7:B13", "C4", "A3", "C6:D9"]
		```

------------

### getRangeValue([setting])
 
- **Parameter**：

	- {PlainObject} [setting]: optional parameters
        + {Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column:[0 ,1]}`, can only be a single selection; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Returns the data of a two-dimensional array of cells in the specified range of the specified worksheet, each cell is an object.

	[Cell Object Format Reference](/zh/guide/cell.html)

- **Usage**:

	- The current selection is "A1:B2", execute
		
		`luckysheet.getRangeValue()`
		
		The returned result is:
		```json
		[
			[
				{
					"v": "vaule1",
					"ct": { "fa": "General", "t": "g" },
					"m": "vaule1",
					"bg": "rgba(255,255,255)",
					"bl": 0,
					"it": 0,
					"ff": 1,
					"fs": 11,
					"fc": "rgb(51, 51, 51)",
					"ht": 1,
					"vt": 0
				},
				{
					"v": "value3",
					"ct": { "fa": "General", "t": "g" },
					"m": "value3",
					"bg": "rgba(255,255,255)",
					"bl": 0,
					"it": 0,
					"ff": 1,
					"fs": 11,
					"fc": "rgb(51, 51, 51)",
					"ht": 1,
					"vt": 0
				}
			],
			[
				{
					"v": "vaule2",
					"ct": { "fa": "General", "t": "g" },
					"m": "vaule2",
					"bg": "rgba(255,255,255)",
					"bl": 0,
					"it": 0,
					"ff": 1,
					"fs": 11,
					"fc": "rgb(51, 51, 51)",
					"ht": 1,
					"vt": 0
				},
				{
					"v": "value4",
					"ct": { "fa": "General", "t": "g" },
					"m": "value4",
					"bg": "rgba(255,255,255)",
					"bl": 0,
					"it": 0,
					"ff": 1,
					"fs": 11,
					"fc": "rgb(51, 51, 51)",
					"ht": 1,
					"vt": 0
				}
			]
		]
		```

------------

### getRangeHtml([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
        + {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, allows an array of multiple selections; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Copy the data in the specified cell area of the specified worksheet and return the data containing the `<table>`html format, which can be used to paste into excel to maintain the cell style.
 
	Note that if you copy multiple selections, these selections must have the same row or the same column to copy, and the copied results will also be automatically merged into a concatenated array, for example, multiple selections `"C18:C20"` / `"E18:E20"` / `"G18:H20"` is allowed, but multiple selections of `"C18:C20"` / `"E18:E21"` are not allowed

- **Usage**:

	- The current selection is "A1:B2", execute
		
		`luckysheet.getRangeHtml()`
		
		The returned result is:
		```html
		<table data-type="luckysheet_copy_action_table">
			<colgroup width="72px">
			</colgroup>
			<colgroup width="72px">
			</colgroup>
			<tr>
				<td style="height:19px;">
					value1
				</td>
				<td style="">
					value3
				</td>
			</tr>
			<tr>
				<td style="height:19px;">
					value2
				</td>
				<td style="">
					value4
				</td>
			</tr>
		</table>
		```

------------

### getRangeJson(title [,setting])

- **Parameter**：

    - {Boolean} [title]: Whether the first line is the title

    	Possible values of `title` are:
    	
    	+ `"true"`: first row is title
    	+ `"false"`: The first row is not title
    - {PlainObject} [setting]: optional parameters
        + {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：

	Copy the data in the specified cell area of the specified worksheet and return the data in `json` format

- **Usage**:

	- The current selection is "A1:B2", the first row is the title to get json
		
		`luckysheet.getRangeJson(true)`
		
		The returned result is:
		```json
		[
			{ "value1": "value2", "value3": "value4" }
		]
		```

	- The current selection is "A1:B2", the first row is not title to get json
		
		`luckysheet.getRangeJson(false)`
		
		The returned result is:
		```json
		[
			{ "A": "value1", "B": "value3" },
			{ "A": "value2", "B": "value4" }
		]
		```

------------

### getRangeArray(dimensional [,setting])

[todo]

- **Parameter**：

    - {String} [dimensional]: array dimension
 
		Possible values of `dimensional` are:
		
		+ `"oneDimensional"`: one-dimensional array
		+ `"twoDimensional"`: two-dimensional array
		+ `"custom"`: a two-dimensional array of custom rows and columns
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [row]: Set when `dimensional` is `custom`, the number of rows in the multidimensional array
    	+ {Number} [column]: Set when `dimensional` is `custom`, the number of columns in the multidimensional array
    	+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Copy the data in the specified cell area of the specified worksheet, and return the data in a one-dimensional, two-dimensional, or two-dimensional array of custom rows and columns.

	Pay special attention to the setting of `row` and `column` in `setting` only when `dimensional` is set to `custom`

- **Usage**:

	- The current selection is "A1:B2", a one-dimensional array
		
		`luckysheet.getRangeArray('oneDimensional')`
		
		The returned result is:
		```json
		["value1","value3","value2","value4"]
		```

	- The current selection is "A1:B2", a two-dimensional array
		
		`luckysheet.getRangeArray('twoDimensional')`
		
		The returned result is:
		```json
		[
			[ "value1", "value3" ],
			[ "value2", "value4" ]
		]
		```

	- The current selection area is "A1:C5", which is composed of values from'value1' to'value15', and obtains a two-dimensional array data with 3 rows and 2 columns
		
		`luckysheet.getRangeArray('custom', { row: 3, column: 2 })`
		
		The returned result is:
		```json
		[
			[
				{
					"m": "value1",
					"ct": { "fa": "General", "t": "g" },
					"v": "value1"
				},
				{
					"ct": { "fa": "General", "t": "g" },
					"v": "value6",
					"m": "value6"
				}
			],
			[
				{
					"ct": { "fa": "General", "t": "g" },
					"v": "value11",
					"m": "value11"
				},
				{
					"m": "value2",
					"ct": { "fa": "General", "t": "g" },
					"v": "value2"
				}
			],
			[
				{
					"ct": { "fa": "General", "t": "g" },
					"v": "value7",
					"m": "value7"
				},
				{
					"ct": { "fa": "General", "t": "g" },
					"v": "value12",
					"m": "value12"
				}
			]
		]
		```

------------

### getRangeDiagonal(type [,setting])
 

- **Parameter**：

	- {String} [type]: diagonal or diagonal offset
 
		Possible values of `type` are:
		
		+ `"normal"`: diagonal
		+ `"anti"`: anti-diagonal
		+ `"offset"`: diagonal offset
    - {PlainObject} [setting]: optional parameters
    - {Number} [column]: Set when `type` is `offset`, the number of columns for diagonal offset
        + {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Copy the data in the specified cell area of the specified worksheet, and return the diagonal or diagonal offset data from the `column` column.

	Pay special attention to the setting of `column` in `setting` only when `type` is set to `offset`.

- **Usage**:

	- The current selection is "A1:B2", diagonal
		
		`luckysheet.getRangeDiagonal('normal')`
		
		The returned result is:
		```json
		[
			{
				"m": "value1",
				"ct": { "fa": "General", "t": "g" },
				"v": "value1"
			},
			{
				"m": "value4",
				"ct": { "fa": "General", "t": "g" },
				"v": "value4"
			}
		]
		```

	- The current selection is "A1:B2", against the diagonal
		
		`luckysheet.getRangeDiagonal('anti')`
		
		The returned result is:
		```json
		[
			{
				"m": "value3",
				"ct": { "fa": "General", "t": "g" },
				"v": "value3"
			},
			{
				"m": "value2",
				"ct": { "fa": "General", "t": "g" },
				"v": "value2"
			}
		]
		```
	- The current selection is "A1:B2", and the diagonal is offset by 1 column
		
		`luckysheet.getRangeDiagonal('offset', { column: 1 })`
		
		The returned result is:
		```json
		[
			{
				"m": "value3",
				"ct": { "fa": "General", "t": "g" },
				"v": "value3"
			}
		]
		```
------------

### getRangeBoolean([setting])
 

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
        + {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Copy the data in the specified cell area of the specified worksheet, and return the data of Boolean value

- **Usage**:

	- The current selection is "A1:B2"
		
		`luckysheet.getRangeBoolean()`
		
		The returned result is:
		```json
		[
			[ false, false ],
			[ false, false ]
		]
		```

------------

### setRangeShow(range [,setting])<div id='setRangeShow'></div>

- **Parameter**：

	- {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, allows an array of multiple selections; the default is the current selection
	- {PlainObject} [setting]: optional parameters
		+ {Boolean} [show]: Whether to show the highlight selection effect; the default value is `true`
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify one or more selection areas in the worksheet to be selected and choose whether to highlight or not. Multiple format settings are supported.

	Special reminder, the selection range setting involved in Luckysheet can refer to this setting

- **Usage**:

     + Set the current worksheet selection area `A1:B2`: 
      
		`luckysheet.setRangeShow("A1:B2")`
     + Set selection range `A1:B2`:
  		
		`luckysheet.setRangeShow(["A1:B2"])`
     + Set selection range `A1:B2`: 
  
  		`luckysheet.setRangeShow({row:[0,1],column:[0,1]})`
     + Set selection range `A1:B2`:
  
  		`luckysheet.setRangeShow([{row:[0,1],column:[0,1]}])`
     + Set the selection range `A1:B2` and `C3:D4`:
  
		`luckysheet.setRangeShow(["A1:B2","C3:D4"])`
     + Set the selection range `A1:B2` and `D3`:
  
  		`luckysheet.setRangeShow([{row:[0,1],column:[0,1]},{row:[2,2],column:[3,3]}])`

------------

### setRangeValue(data [,setting])

- **Parameter**：

	- {Array} [data]: The data of a two-dimensional array of cells to be assigned. The value of each cell can be a string or a number, or an object conforming to the Luckysheet format. Refer to [cell attribute table](/zh /guide/cell.html)
	- {PlainObject} [setting]: optional parameters
    	+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Boolean} [isRefresh]: Whether to refresh the interface; the default is `true`; used to control throttling when multiple cells are assigned, the previous cell should be set to `false`, and the last cell is set Is `true`.
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Assign a cell array data to the specified area, the data format is the same as the data obtained by the `getRangeValue` method.

	Note that usually the `getRangeValue` method only obtains the selection data, but does not include the border and merged cell information. When the `setRangeValue` is executed, it will dynamically determine whether the previous step has executed the `getRangeValue`, if executed, the border will be Obtained from Luckysheet configuration together with the merged cell information.

- **Usage**:

     + Assign value to current selection
      
		```js
		const data = [
				[
					{
						"m": "value1",
						"ct": {
							"fa": "General",
							"t": "g"
						},
						"v": "value1"
					},
					{
						"m": "value3",
						"ct": {
							"fa": "General",
							"t": "g"
						},
						"v": "value3"
					}
				],
				[
					{
						"m": "value2",
						"ct": {
							"fa": "General",
							"t": "g"
						},
						"v": "value2"
					},
					{
						"m": "value4",
						"ct": {
							"fa": "General",
							"t": "g"
						},
						"v": "value4"
					}
				]
			]
		luckysheet.setRangeValue(data,{range:"A1:B2"})
		```

------------

### setRangeFormat(attr, value [,setting])
 

- **Parameter**：

    - {String} [attr]: attribute type,
   	Refer to the attribute value of [cell attribute table](/zh/guide/cell.html)
	- {String | Number | Object} [value]: Specific setting value, one attribute will correspond to multiple values, refer to the value example of [cell attribute table](/zh/guide/cell.html), special case: if The attribute type `attr` is the cell format `ct`, then the setting value `value` should provide `ct.fa`, for example, set the cell format of `"A1:B2"` to percentage format:
	To
	`luckysheet.setRangeFormat("ct", "0.00%", {range:"A1:B2"})`

    - {PlainObject} [setting]: optional parameters
        + {Object | String} [range]: Set the target selection range of the parameter. The supported selection format is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1], column:[0,1]}`, allows an array of multiple selections; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	  
	Set the cell format of the specified range, generally used as a processing format, the assignment operation recommends using the `setRangeValue` method
    
  	When setting the border, attr is `"bd"`, value is a key/value object, and the border type: `borderType`/border thickness:`style`/border color:`color` need to be set at the same time, such as setting `" A1:B2"`The border of the cell is all/red/thin:
	
	`luckysheet.setRangeFormat("bd", {borderType: "border-right",style: "1", color: "#ff0000"}, {range:["A1:B2"]})`
	
	The complete optional setting parameters are as follows:

    + Border Type `borderType: "border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border -horizontal" | "border-vertical" | "border-none"`,
    + Border thickness `style: 1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
    + Border color `color: hexadecimal color value`

- **Usage**:

   - Set the cell text in the current worksheet `"A1:B2"` range to be bold
		
		`luckysheet.setRangeFormat("bl", 1, {range:"A1:B2"})`
   - Set the background of the cells in the range of `"B2"` and `"C4:D5"` of the second worksheet to red
		
		`luckysheet.setRangeFormat("bg", "#ff0000", {range:["B2","C4:D5"], order:1})`

------------

### setRangeFilter(type [,setting])

[todo]


- **Parameter**：
	
	- {String} [type]: Turn on or off the filtering function
	 
		Possible values of `type` are:
		
		+ `"open"`: Open the filter function and return the current filtered range object
		+ `"close"`: Close the filter function and return to the scope of the filter before closing
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	For the worksheet of the specified subscript, the filter function is turned on or off for the selected range

- **Usage**:

	- Open the filter function of the second worksheet "A1:B2"
	`luckysheet.setRangeFilter("open",{range:"A1:B2",order:1})`

------------

### setRangeMerge(type [,setting])
 

- **Parameter**：
	
	- {String} [type]: merge cell type
 
		Possible values of `type` are:
		
		+ `"all"`: Merge all, all cells in the area are merged into one large cell
		+ `"horizontal"`: merge horizontally, cells in the same row in the area are merged into one cell
		+ `"vertical"`: merge vertically, the cells in the same column in the area are merged into one cell
 
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, allows an array of multiple selections; the default is the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set the merged cells for the worksheet with the specified subscript and the selected range

- **Usage**:

	- The current selection'A1:B2' is set to merge cells, the type is merge all
		
		`luckysheet.setRangeMerge("all")`
		The data of'A1:B1' is:
		```json
		[
			[
				{
					"m": "value1",
					"ct": { "fa": "General", "t": "g" },
					"v": "value1",
					"mc": { "r": 0, "c": 0, "rs": 2, "cs": 2 }
				},
				{
					"mc": { "r": 0, "c": 0 }
				}
			],
			[
				{
					"mc": { "r": 0, "c": 0 }
				},
				{
					"mc": { "r": 0, "c": 0 }
				}
			]
		]
		```

------------

### cancelRangeMerge( [setting])
 

- **Parameter**：
	
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, allows an array of multiple selections; the default is the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Unmerge cells in the selected range for the worksheet with the specified subscript

- **Usage**:

	- The current selection'A1:B2' is already a merged cell, now you want to cancel the merge
		
		`luckysheet.cancelRangeMerge()`
		
------------

### setRangeSort(type [,setting])
 

- **Parameter**：

	- {String} [type]: sort type
	
		Possible values of `type` are:
		
		+ `"asc"`: ascending order
		+ `"des"`: descending order
	
	- {PlainObject} [setting]: optional parameters
	
        + {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	For the worksheet of the specified subscript, the sort function is turned on for the selected range, and the sorted data of the selected range is returned.

- **Usage**:

   - Set the current selection of the current worksheet to ascending order
   `luckysheet.setRangeSort("asc")`

------------

### setRangeSortMulti(title, sort [,setting])
 

- **Parameter**：

	- {Boolean} [title]: Does the data have a title row
	- {Array} [sort]: Column setting, set the column index and sort method to be sorted, the format is like: `[{ i:0,sort:'asc' },{ i:1,sort:'des' }] `
	- {PlainObject} [setting]: optional parameters
	 
		+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	For the worksheet of the specified subscript, the selected range enables the multi-column custom sorting function to return the sorted data of the selected range.

- **Usage**:

   - Set the current selection of the current worksheet to a custom sort, the data has a header row, and it is sorted according to the rules of the first column ascending order and the second column descending order
   `luckysheet.setRangeSortMulti(true,[{ i:0,sort:'asc' },{ i:1,sort:'des' }])`

------------

### setRangeConditionalFormatDefault(conditionName, conditionValue [,setting])

- **Parameter**：

	- {String} [conditionName]: Conditional format rule type
	
		Possible values ​​of `conditionName` are:
		
		+ `"greaterThan"`: greater than (conditionValue value is numeric or cell range)
		+ `"lessThan"`: Less than (conditionValue value is numeric value or cell range)
		+ `"betweenness"`: between (conditionValue value is numeric value or cell range)
		+ `"equal"`: equal to (conditionValue value is numeric value or cell range)
		+ `"textContains"`: text contains (conditionValue value is text or cell range)
		+ `"occurrenceDate"`: date of occurrence (conditionValue value is date)
		+ `"duplicateValue"`: Duplicate value (conditionValue value is '0': duplicate value, '1': unique value)
		+ `"top10"`: the first N items (conditionValue value is 1~1000)
		+ `"top10%"`: Top N% (conditionValue value is 1~1000)
		+ `"last10"`: the last N items (conditionValue is 1~1000)
		+ `"last10%"`: Last N% (conditionValue value is 1~1000)
		+ `"AboveAverage"`: above average (conditionValue can be an empty array)
		+ `"SubAverage"`: below average (conditionValue can be an empty array)
	
	- {Array} [conditionValue]: You can set condition cells or condition values
		Value rules (at least one value in the condition value array and at most two values)
		```js
		[2]
		```
		Or (if the value is the cell range, take the cell value in the upper left corner)
		```js
		['A1']
		```
	
	- {PlainObject} [setting]: optional parameters
	
		+ {Object} [format]: color setting
		
    		* Set the text color and cell color; the default value is `{
				"textColor": "#000000",
				"cellColor": "#ff0000"
			}`
		+ {Array | Object | String} [cellrange]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, allows an array of multiple selections; the default is the current selection
		
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	For the worksheet of the specified subscript, the conditional formatting is enabled for the selected range, and some cells are highlighted according to the set conditional formatting rules, and the data after the conditional formatting is enabled is returned.

- **Usage**:

    - Highlight cells with content greater than the number 2
      `luckysheet.setRangeConditionalFormatDefault("greaterThan",{ type: 'value', content: [2] })`
    
	- Highlight the cells whose content is less than the content of cell A1
	  `luckysheet.setRangeConditionalFormatDefault("lessThan",{ type: 'range', content: ['A1'] })`

	- Highlight cells with content between 2 and 10
	  `luckysheet.setRangeConditionalFormatDefault("betweenness",{ type: 'value', content: [2,10] })`
	
	- Highlight the cell whose content is equal to the content of cell A1
	  `luckysheet.setRangeConditionalFormatDefault("equal",{ type: 'range', content: ['A1'] })`
	
	- Highlight the cell that contains the content of cell A1
	  `luckysheet.setRangeConditionalFormatDefault("textContains",{ type: 'range', content: ['A1'] })`
	
	- Highlight cells with dates between `2020/09/24-2020/10/15`
      `luckysheet.setRangeConditionalFormatDefault("occurrenceDate",{ type: 'value', content: ['2020/09/24 - 2020/10/15'] })`

	- Highlight cells with repeated values, content is 0
      `luckysheet.setRangeConditionalFormatDefault("duplicateValue",{ type: 'value', content: [0] })`

	- Highlight the cell with unique value, content is 1
      `luckysheet.setRangeConditionalFormatDefault("duplicateValue",{ type: 'value', content: [1] })`
	
	- Highlight the top 20 cells
      `luckysheet.setRangeConditionalFormatDefault("top",{ type: 'value', content: [20] })`
	
	- Highlight the top 30% of cells
      `luckysheet.setRangeConditionalFormatDefault("topPercent",{ type: 'value', content: [30] })`
	
	- Highlight the bottom 15 cells
      `luckysheet.setRangeConditionalFormatDefault("last",{ type: 'value', content: [15] })`
	
	- Highlight the bottom 15% of cells
      `luckysheet.setRangeConditionalFormatDefault("lastPercent",{ type: 'value', content: [15] })`
	
	- Highlight cells that are above average
      `luckysheet.setRangeConditionalFormatDefault("AboveAverage",{ type: 'value', content: ['AboveAverage'] })`
	
	- Highlight cells below average
	  `luckysheet.setRangeConditionalFormatDefault("SubAverage",{ type: 'value', content: ['SubAverage'] })`

------------

### setRangeConditionalFormat(type [,setting])

- **Parameter**：

	- {String} [type]: Conditional formatting rule type
 
		Possible values ​​of `type` are:
		
		+ `"dataBar"`: data bar
		+ `"icons"`: icon set
		+ `"colorGradation"`: Color Gradation
		
	- {PlainObject} [setting]: optional parameters
	
		+ {Array | String} [format]: Color setting
		
        	* When `type` is `dataBar`, the gradient color should be set; the default value is blue-white gradient` ["#638ec6", "#ffffff"]`

				Recommended shortcut value:
				```js
				["#638ec6", "#ffffff"], //Blue-white gradient data bar
				["#63c384", "#ffffff"], //Green-white gradient data bar
				["#ff555a", "#ffffff"], //Red-white gradient data bar
				["#ffb628", "#ffffff"], //Orange-white gradient data bar
				["#008aef", "#ffffff"], //Light blue-white gradient data bar
				["#d6007b", "#ffffff"], //Purple-white gradient data bar
				["#638ec6"], //Blue data bar
				["#63c384"], //green data bar
				["#ff555a"], //Red data bar
				["#ffb628"], //Orange data bar
				["#008aef"], //Light blue data bar
				["#d6007b"] //Purple data bar
				```
        	
        	* When `type` is `icons`, the icon type should be set; the default value is "threeWayArrowMultiColor": the three-way arrow color,

				Possible values ​​are:
				
				`threeWayArrowMultiColor`: three-way arrow (color),
				
				`threeTriangles`: 3 triangles,

				`fourWayArrowMultiColor`: four-way arrow (color),

				`fiveWayArrowMultiColor`: five-way arrow (color),

				`threeWayArrowGrayColor`: three-way arrow (gray),

				`fourWayArrowGrayColor`: four-way arrow (gray),

				`fiveWayArrowGrayColor`: five-way arrow (gray),

				`threeColorTrafficLightRimless`: three-color traffic light (no border),

				`threeSigns`: three signs,

				`greenRedBlackGradient`: green-red-black gradient,

				`threeColorTrafficLightBordered`: three-color traffic light (with border),

				`fourColorTrafficLight`: Four-color traffic light,

				`threeSymbolsCircled`: three symbols (with a circle),

				`tricolorFlag`: tricolor flag,

				`threeSymbolsnoCircle`: three symbols (no circle),

				`threeStars`: 3 stars,

				`fiveQuadrantDiagram`: five-quadrant diagram,

				`fiveBoxes`: 5 boxes,

				`grade4`: Four grades,

				`grade5`: Five grades,

        	* When `type` is `colorGradation`, the color value of the color scale should be set; the default value is green-yellow-red scale` ["rgb(99, 190, 123)", "rgb(255, 235, 132)", "rgb(248, 105, 107)"]`

				Recommended shortcut value:
				```js
				["rgb(99, 190, 123)", "rgb(255, 235, 132)", "rgb(248, 105, 107)"], //green-yellow-red level
				["rgb(248, 105, 107)", "rgb(255, 235, 132)", "rgb(99, 190, 123)"], //red-yellow-green level

				["rgb(99, 190, 123)", "rgb(252, 252, 255)", "rgb(248, 105, 107)"], //green-white-red level
				["rgb(248, 105, 107)", "rgb(252, 252, 255)", "rgb(99, 190, 123)"], //red-white-green level
				
				["rgb(90, 138, 198)", "rgb(252, 252, 255)", "rgb(248, 105, 107)"], //blue-white-red level
				["rgb(248, 105, 107)", "rgb(252, 252, 255)", "rgb(90, 138, 198)"], //red-white-blue level
				
				["rgb(252, 252, 255)", "rgb(248, 105, 107)"], //white-red level
				["rgb(248, 105, 107)", "rgb(252, 252, 255)"], //red-white level

				["rgb(99, 190, 123)", "rgb(252, 252, 255)"], //green-white level
				["rgb(252, 252, 255)", "rgb(99, 190, 123)"], //white-green level

				["rgb(99, 190, 123)", "rgb(255, 235, 132)"], //green-yellow level
				["rgb(255, 235, 132)", "rgb(99, 190, 123)"] //Yellow-green level
				```
	
    	+ {Array | Object | String} [cellrange]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, allows an array of multiple selections; the default is the current selection
    		
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	For the worksheet of the specified subscript, the conditional format is turned on for the selected range, and the data after the conditional format is turned on is returned.

- **Usage**:

    - Conditional formatting is enabled for the current selection area, showing gradient
      `luckysheet.setRangeConditionalFormat("dataBar", { format: ["#63c384", "#ffffff"] })`

------------

### deleteRangeConditionalFormat(itemIndex [,setting])

[todo]


- **Parameter**：

	- {Number} [itemIndex]: Conditional format rule index
 
	- {PlainObject} [setting]: optional parameters
	
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	For the worksheet of the specified subscript, delete the conditional format rule, and return the deleted conditional format rule.

- **Usage**:

    - Delete the third conditional formatting rule
      `luckysheet.deleteRangeConditionalFormat(2)`
    
------------

### clearRange([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
        + {Array | Object | String} [range]: The range of the selection to be cleared. The format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1] ,column:[0,1]}`, allows an array of multiple selections; the default is the current selection
        + {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
        + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Clear the contents of the specified cell area of the specified worksheet, return the cleared data, which is different from the function of deleting the selection area, no need to set the cell movement

- **Usage**:

    - Clear the content of the current selection
      `luckysheet.clearRange()`
    
------------

### deleteRange(move [,setting])

[todo]


- **Parameter**：
	
	- {String} [move]: After deleting, whether the cells on the right or below move

		Possible values of `move` are:

		+ `"left"`: Move the right cell to the left
		+ `"up"`: Move the lower cell up

	- {PlainObject} [setting]: optional parameters
    	+ {Array | Object | String} [range]: The range of the selection to be deleted, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1] ,column:[0,1]}`, allows an array composed of multiple selections; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Delete the specified cell range of the specified worksheet, return the deleted data, and at the same time, specify whether to move the right cell to the left or the bottom cell to move up

- **Usage**:

    - Delete the current selection and after deleting, the right cell moves to the left
      `luckysheet.deleteRange('left')`
    
------------

### insertRange(move [,setting])

[todo]


- **Parameter**：
	
	- {String} [move]: Move the active cell right or down
 
		Possible values of `move` are:
		
		+ `"right"`: Move the active cell to the right
		+ `"bottom"`: move the active cell down
	
	- {PlainObject} [setting]: optional parameters
    	+ {Array} [data]: The data of a two-dimensional array of cells assigned to the range area, [Cell Object Format Reference](/zh/guide/cell.html); the default value is an empty array, that is, a blank area is inserted
    	+ {Array | Object | String} [range]: The position to be inserted, the range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0, 1],column:[0,1]}`, the default is the current selection
    		
    	When data data is not set, an array composed of multiple selections is allowed, and the blank area inserted is the area of these selections.
    	
    	When the data data is set, it can only be a single selection, and the data data will be inserted into the first cell position of the current selection
    	
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	In the specified cell area of the specified worksheet, assign cell data, or create a new blank area, return data data, and at the same time, specify the active cell to move right or down

- **Usage**:

    - Insert a blank cell at the current selection position, and move the current selection cell to the right after inserting
      `luckysheet.insertRange('right')`
    
------------

### matrixOperation(type [,setting])

[todo]


- **Parameter**：
	
	- {String} [type]: the type of matrix operation
 
		Possible values of `type` are:
		
		+ `"flipUpDown"`: flip up and down
		+ `"flipLeftRight"`: flip left and right
		+ `"flipClockwise"`: rotate clockwise
		+ `"flipCounterClockwise"`: rotate counterclockwise
		+ `"transpose"`: Transpose
		+ `"deleteZeroByRow"`: delete 0 values at both ends by row
		+ `"deleteZeroByColumn"`: delete zero values at both ends by column
		+ `"removeDuplicateByRow"`: delete duplicate values by row
		+ `"removeDuplicateByColumn"`: remove duplicate values by column
		+ `"newMatrix"`: Produce a new matrix
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify the data in the specified cell area of the worksheet to perform matrix operations, and return the result data after the operation is successful

- **Usage**:

    - Flip current selection upside down
    		
		`luckysheet.matrixOperation('flipUpDown')`

		Copy the original selection as a two-dimensional array:
		
		`[["value1","value3"],["value2","value4"]]`
		
		After flipping up and down, the selection is copied as a two-dimensional array:
		
		`[["value2","value4"],["value1","value3"]]`
    
------------

### matrixCalculation(type, number [,setting])

[todo]


- **Parameter**：
	- {String} [type]: calculation method
	
		Possible values of `type` are:
		
		+ `"plus"`: add
		+ `"minus"`: subtract
		+ `"multiply"`: multiply
		+ `"divided"`: Divide
		+ `"power"`: power
		+ `"root"`: power root
		+ `"log"`: log
	- {Number} [number]: Calculate the number, such as: 2
	- {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify the data in the specified cell area of the worksheet for matrix calculation, and return the result data after the calculation is successful

- **Usage**:

    - Add 2 to the value of all cells in the current selection
    		
		`luckysheet.matrixCalculation('plus', 2)`

		Copy the original selection as a two-dimensional array:
		
		`[[1,2],[3,4]]`
		
		After adding 2, the selection is copied as a two-dimensional array:
		
		`[[3,4],[5,6]]`
    
------------

## Worksheet operations

### getAllSheets()


- **Explanation**：

	Return all worksheet configurations, the format is the same as the worksheet configuration, and the results obtained can be used as options.data when the form is initialized.

	Therefore, this API is suitable for manually operating and configuring a table, and then taking out all the worksheet information to save it, and then use it for table creation in other places. If you want to get all the workbook data including the workbook configuration, it is recommended to use [toJson](#toJson()), and it can be directly used to initialize Luckysheet.

- **Usage**:

	- Get all the basic information of the first worksheet
	`luckysheet.getAllSheets()[0]`
	
------------

### getLuckysheetfile()

- **Explanation**：

	Returns a one-dimensional array `luckysheetfile` of all table data structures. Unlike the `getAllSheets` method, the worksheet parameters obtained by this method will contain many internal variables. The most obvious difference is that the table data operation will maintain `luckysheetfile[i]. data`, and the initialization data uses `options.data[i].celldata`, so `luckysheetfile` can be used for debugging, but the initialization table is not applicable.

	In addition, a `load = 1` will be added to the loaded worksheet parameters, this parameter needs to be set to 0 when initializing the data. Therefore, to initialize the workbook with the data obtained by `getLuckysheetfile()`, two tasks need to be done:

    - Convert celldata to data, refer to: [transToData](/zh/guide/api.html#transtodata-celldata-setting)
    - Load reset to 0 or delete this field

	Now there is `getAllSheets` to complete this work, no need to manually convert the data.

- **Usage**:

	- Get all the debugging information of the first worksheet
	`luckysheet.getLuckysheetfile()[0]`
	
------------

### getSheet([setting])

[todo]

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [index]: worksheet index; the default value is the current worksheet index
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Number} [name]: Worksheet name; the default value is the current worksheet name

- **Explanation**：

	According to index/order/name, quickly return the configuration of the specified worksheet, same as `luckysheetfile[i]`. If multiple parameters are set, the priority is: index> order> name.
	
------------

### getSheetData([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：

	Quickly return the data of the specified worksheet, same as `luckysheetfile[i].data`
	
------------

### getConfig([setting])

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：

	Quickly return to the config configuration of the specified worksheet, same as `luckysheetfile[i].config`

------------

### setConfig([setting])

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation
	
- **Explanation**：

	Quickly set the current worksheet config configuration

------------
### updataSheet([setting])

- **参数**：

    - {PlainObject} [setting]: optional parameters
    	+ {Array} [data]: Worksheet Configuration
    	+ {Function} [success]: callback function for the end of the operation
	
- **说明**：

	Update the corresponding sheet according to the set sheet configuration

------------

### setSheetAdd([setting])

- **Parameter**：

    - {PlainObject} [setting]: optional parameters
        + {Object} [sheetObject]: The data of the newly added worksheet; the default value is an empty object.Worksheet data format reference [options.data](/guide/sheet.html#initial)
        + {Number} [order]: New worksheet subscript; the default value is the last subscript
        + {Function} [success]: callback function for the end of the operation
	
- **Explanation**：

	Add a sheet and return the newly added worksheet object. The optional setting data in `setting` is `sheetObject`, and a blank worksheet will be added if `sheetObject` is not passed.

- **Usage**:

	- Add a blank worksheet at the subscript position of the last worksheet
	`luckysheet.setSheetAdd()`
	
------------

### setSheetDelete([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation
	
- **Explanation**：

	Delete the worksheet of the specified subscript and return the deleted worksheet object

- **Usage**:

	- Delete current worksheet
	`luckysheet.setSheetDelete()`
			
------------

### setSheetCopy([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
	+ {Number} [targetOrder]: The target index position of the newly copied worksheet; the default value is the next index position of the current worksheet index (incremental)
		+ {Number} [order]: The subscript of the copied worksheet; the default value is the subscript of the current worksheet
		+ {Function} [success]: callback function for the end of the operation
	
- **Explanation**：

	Copy the worksheet with the specified subscript to the specified subscript position, optionally set the specified subscript position `targetOrder` in `setting`, and return the newly copied worksheet object

- **Usage**:

	- Copy the current worksheet to the next subscript position
	`luckysheet.setSheetCopy()`

------------

### setSheetHide([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: The hidden worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Hide the worksheet of the specified subscript and return the hidden worksheet object

- **Usage**:

	- Hide current worksheet
	`luckysheet.setSheetHide(true)`
	- Hide the third worksheet
	`luckysheet.setSheetHide({order:2})`

------------

### setSheetShow([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: The subscript of the unhidden worksheet; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Unhide the worksheet of the specified subscript, and return the unhidden worksheet object

- **Usage**:

	- Unhide the third worksheet
	`luckysheet.setSheetShow({order:2})`

------------

### setSheetActive(order [,setting])

[todo]

- **Parameter**：

	- {Number} [order]: The subscript of the worksheet to be activated
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set the worksheet of the specified subscript as the current worksheet (active state), that is, switch to the specified worksheet and return the activated worksheet object

- **Usage**:

	- Switch to the second worksheet
	`luckysheet.setSheetActive(1)`

------------

### setSheetName(name [,setting])

[todo]


- **Parameter**：

	- {String} [name]: new worksheet name
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation
	
- **Explanation**：
	
	Modify worksheet name

- **Usage**:

	- Modify the name of the current worksheet to "CellSheet"
	`luckysheet.setSheetName("CellSheet")`

------------

### setSheetColor(color [,setting])

[todo]

- **Parameter**：
	
	- {String} [color]: Worksheet color
	- {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set the color at the worksheet name

- **Usage**:

	- Modify the color of the current worksheet name to red
	`luckysheet.setSheetColor("#ff0000")`

------------

### setSheetMove(type [,setting])

- **Parameter**：

	- {String | Number} [type]: The moving direction of the worksheet or the subscript of the moving target,
	 
		Possible values of `type` are:
		
		+ `"left"`: to the left
		+ `"right"`: to the right
		+ `1`/`2`/`3`/...: Specify subscript
	- {PlainObject} [setting]: optional parameters
		+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify the worksheet to move one position to the left or right, or specify subscript, and return the specified worksheet object

- **Usage**:

	- Move the current worksheet one position to the left
	`luckysheet.setSheetMove("left")`
	- Move the second worksheet to the subscript position of the fourth worksheet
	`luckysheet.setSheetMove(3,{order:1})`

------------

### setSheetOrder(orderList [,setting])

[todo]


- **Parameter**：

	- {Array} [orderList]: Worksheet order, set the index and order of the worksheet to specify the position, such as:
	 
	```json
	[
		{index:'sheet_01',order: 2},
		{index:'sheet_02',order: 1},
		{index:'sheet_03',order: 0},
	]
	```
	The order in the array is not important, the key is to specify the correspondence between sheet index and order.

	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Reorder the positions of all worksheets and specify an array of worksheet order.


- **Usage**:

	- Rearrange the worksheets, this workbook contains 3 worksheets
	```js
	luckysheet.setSheetOrder([
		{index:'sheet_01',order: 2},
		{index:'sheet_02',order: 1},
		{index:'sheet_03',order: 0},
	])
	```

------------

### setSheetZoom(zoom [,setting])

[todo]


- **Parameter**：

    - {Number} [zoom]: Worksheet zoom ratio

	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set worksheet zoom ratio


- **Usage**:

	- Set the current worksheet zoom ratio to 0.5
	```js
	luckysheet.setSheetZoom(0.5)
	```

------------

### showGridLines([setting])

- **Parameter**：

    - {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: The subscript of the worksheet that needs to show the grid lines; the default value is the subscript of the current worksheet
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Show the grid lines of the specified subscript worksheet, and return the worksheet object of the operation

- **Usage**:

	- Show the grid lines of the current worksheet
	`luckysheet.showGridLines()`
	- Show the grid lines of the third worksheet
	`luckysheet.showGridLines({order:2})`

------------

### hideGridLines([setting])

- **Parameter**：

    - {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: The subscript of the worksheet that needs to hdie the grid lines; the default value is the subscript of the current worksheet
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Hide the grid lines of the specified subscript worksheet, and return the worksheet object of the operation

- **Usage**:

	- Hide grid lines of current worksheet
	`luckysheet.hideGridLines()`
	- Hide the grid lines of the third worksheet
	`luckysheet.hideGridLines({order:2})`

------------

## Workbook operations

### create(options [,setting])

- **Parameter**：
	
	- {Object} [options]: All configuration information of the table
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function after the table is created successfully

- **Explanation**：
	
	Initialize a Luckysheet, which can contain multiple worksheets, refer to [Configuration List](/zh/guide/config.html)

------------

### refresh([setting])

[todo]


- **Parameter**：
	
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: The callback function after the table is refreshed successfully

- **Explanation**：
	
	Refresh canvas

------------

### scroll([setting])

- **参数**：
	
	- {PlainObject} [setting]: optional parameters
		+ {Number} [scrollWidth]: horizontal scroll value. The default is the current horizontal scroll position.
		+ {Number} [scrollHeight]: Vertical scroll value. The default is the current vertical scroll position.
		+ {Number} [targetRow]: Scroll vertically to the specified row number. The default is the current vertical scroll position.
		+ {Number} [targetColumn]: scroll horizontally to the specified column number. The default is the current horizontal scroll position.
		+ {Function} [success]: The callback function after the table is refreshed successfully

- **说明**：
	
	Scroll current worksheet position

------------

### resize([setting])

- **Parameter**：
		
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Automatically resize the canvas according to the window size

------------

### destroy([setting])

- **Parameter**：
	
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function after the table is released successfully

- **Explanation**：
	
	Delete and release table

------------

### getScreenshot([setting])

[todo]

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
    	+ {Array | Object | String} [range]: The range of the selection, the format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1],column: [0,1]}`, can only be a single selection; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript

- **Explanation**：
	
	Returns the base64 format image generated after the screenshot of the specified selection

------------

### setWorkbookName(name [,setting])

- **Parameter**：

	- {Number} [name]: Workbook name
	- {PlainObject} [setting]: optional parameters
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Set workbook name

------------

### getWorkbookName(name [,setting])

- **Parameter**：

	- {PlainObject} [setting]: optional parameters
		+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	get workbook name

------------

### undo([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
         + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Undo the current operation and return the operation object that was just undone

------------

### redo([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
         + {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Redo the current operation and return the operation object that was just redone

------------

### refreshFormula([setting])

- **Parameter**：

	-  {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Force refresh formula. When you directly modify the values of multiple cells without triggering a refresh, and these cells are associated with formulas, you can use this API to force a formula refresh to be triggered at the end.

------------

### refreshMenuButtonFocus([data],[r],[c],[success])

- **Parameter**：

	- {Array}  [data]: Operational data
	- {Number} [r]: Specified row
	- {Number} [c]: Specified column
	- {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Refreshes the top status bar status of the specified cell.

------------

### checkTheStatusOfTheSelectedCells(type,status)

- **Parameter**：

	- {String} type: type
	- {String} status: Target state value

- **Explanation**：
	
	Check whether the status of all specified types of cells in the selection meets the conditions (mainly bold, italics, strikeouts, underscores, etc.).

------------

## Chart

### insertChart([setting])

[todo]


- **Parameter**：

	- {PlainObject} [setting]: optional parameters
    	+ {Array | Object | String} [range]: The selection range of the chart data. The format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1] ,column:[0,1]}`, can only be a single selection; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Generate a chart in the specified selection area of the specified worksheet, and return the chart parameter object, including the chart id

------------

### setChart(chartId, attr, value [,setting])

[todo]


- **Parameter**：
	
	- {String} [chartId]: Specify the id of the chart to be modified
	- {String} [attr]: attribute type
	
		Possible values of `attr` are:
		
		+ `"left"`: the distance from the left to the edge of the worksheet
		+ `"top"`: the distance from the top edge to the edge of the worksheet
		+ `"width"`: the width of the chart frame
		+ `"height"`: the height of the chart outline
		+ `"chartOptions"`: detailed settings for the chart
		
	- {Number | Object}} [value]: attribute value, when `attr` is `chartOptions`, directly set the configuration object of the entire chart
	 
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Modify the parameters of the specified id chart and return the modified parameters of the entire chart

------------

### getChart(chartId)

[todo]


- **Parameter**：
	
	- {String} [chartId]: Specify the chart id to be obtained

- **Explanation**：
	
	Get the parameters of the specified id chart

------------

### deleteChart(chartId [,setting])

[todo]


- **Parameter**：
	
	- {String} [chartId]: the id of the chart to be deleted
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Delete the chart with the specified id and return the parameters of the deleted chart

------------

## Data Verification

### setDataVerification(option, [setting])

[todo]

- **Parameter**：
	
	- {Object} [option]: Configuration information for data verification
    - {PlainObject} [setting]: optional parameters
        + {Array | Object | String} [range]: The selection area for data verification, The format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1] ,column:[0,1]}`, can only be a single selection; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify the worksheet range to set the data verification function and set the parameters

------------

### deleteDataVerification([setting])

[todo, to be confirmed whether it is reasonable]

- **Parameter**：
	
    - {PlainObject} [setting]: optional parameters
		+ {Array | Object | String} [range]: The selection area for data verification, The format of the supported selection is `"A1:B2"`, `"sheetName!A1:B2"` or `{row:[0,1] ,column:[0,1]}`, can only be a single selection; the default is the current selection
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify the worksheet range to delete the data verification function

------------

## Worksheet Protection


### setProtection(option, [setting])

[todo]

- **Parameter**：
	
	- {Object} [option]: Configuration information for worksheet protection
    - {PlainObject} [setting]: optional parameters
    	+ {Number} [order]: Worksheet subscript; the default value is the current worksheet subscript
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	Specify the worksheet to set the worksheet protection

------------

## Public method

### transToCellData(data [,setting])<div id='transToCellData'></div>

- **Parameter**：
	
	- {Array} [data]: data
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	data => celldata, data two-dimensional array data is converted into a one-dimensional array in {r, c, v} format

------------

### transToData(celldata [,setting])<div id='transToData'></div>

[todo]

- **Parameter**：
	
	- {Array} [celldata]: data
	To
	- {PlainObject} [setting]: optional parameters
    	+ {Function} [success]: callback function for the end of the operation

- **Explanation**：
	
	celldata => data, the celldata one-dimensional array data is converted into the two-dimensional array required by the table

------------

### toJson()

- **Explanation**：
	
	The exported json string can be directly used as the parameter `options` when the workbook is initialized by `luckysheet.create(options)`. The usage scenario is to manually save all the parameters after the user manipulates the table, and then initialize the table elsewhere. Use, similar to the import and export of a luckysheet proprietary format.

------------

## Legacy API

::: warning
To maintain compatibility, the old version of the API is still supported, but its use is deprecated.
:::

### getcellvalue([r] [,c] [,data] [,type])

- **Parameter**：

	- {Number} [r]: The row number of the cell; optional value; an integer starting from 0, 0 means the first row
	- {Number} [c]: The number of the column where the cell is located; optional value; an integer starting from 0, 0 means the first column
	- {Array} [data]: table data, two-dimensional array; optional value; default value is the current table data
	- {String} [type]: cell attribute value; optional value; the default value is'v', which means to get the actual value of the cell

- **Explanation**：

	This method is to get the value of the cell.

	- luckysheet.getcellvalue(): returns all data of the current worksheet;
	- luckysheet.getcellvalue(0): returns the data of the first row of the current worksheet;
	- luckysheet.getcellvalue(null,0): returns the data in the first column of the current worksheet;
	- luckysheet.getcellvalue(0,0): returns the v value of the cell data in the first row and the first column of the current worksheet;
	- luckysheet.getcellvalue(1,1,null,'m'): Returns the original value of the cell in the second row and second column of the specified data.
	 
	Special case: the cell format is yyyy-MM-dd, when the type is'v', the display value of'm' will be mandatory

	> Recommend to use the new API: <a href='#getCellValue'>getCellValue</a>

------------

### getluckysheetfile()

- **Explanation**：

	Returns a one-dimensional array `luckysheetfile` of all table data structures

	> Recommend to use new API: [getLuckysheetfile](#getLuckysheetfile())

------------

### getconfig()

- **Explanation**：

	Quickly return to the current sheet config configuration, the config information of each worksheet is still contained in the luckysheetfile.
	 
	> Recommend to use new API: [getConfig](#getConfig([setting]))

------------

### getluckysheet_select_save()

- **Explanation**：

	Returns an array of current selection objects, there may be multiple selections.

	> Recommend to use new API: [getRange](#getRange())

------------

### getdatabyselection([range] [,sheetOrder])

- **Parameter**：
	
	- {Object} [range]: Selection object, `object: {row: [r1, r2], column: [c1, c2] }`; the default is the current first selection.
	- {Number} [sheetOrder]: Table subscript, an integer starting from 0, 0 means the first table; the default is the current table subscript.

- **Explanation**：

	Returns the data of the first selection in a table.
	- `luckysheet.getdatabyselection()`: Returns the data of the current selection of the current worksheet
	- `luckysheet.getdatabyselection(null,1)`: Returns the data of the current selection of the second worksheet

	> Recommend to use the new API: [getRangeValue](#getRangeValue([setting]))

------------

### luckysheetrefreshgrid(scrollWidth, scrollHeight)

- **Parameter**：
	
	- {Number} [scrollWidth]: horizontal scroll value. The default is the current horizontal scroll position.
	- {Number} [scrollHeight]: Vertical scroll value. The default is the current vertical scroll position.

- **Explanation**：

	Refresh the canvas display data according to scrollWidth and scrollHeight.

------------

### setcellvalue(r, c, d, v)

- **Parameter**：
	
	- {Number} [r]: The row number of the cell; an integer starting from 0, 0 means the first row.
	- {Number} [c]: The number of the column where the cell is located; an integer starting from 0, 0 means the first column.
	- {Array} [d]: table data; optional value; two-dimensional array.
	- {Object | String | Number} [v]: The value to be set; it can be an object, and the object must conform to the cell object format.

- **Explanation**：

	Set the value of a cell. Can be used with `luckysheet.jfrefreshgrid()` to refresh and view cell value changes.

	```js
	luckysheet.setcellvalue(0, 0, luckysheet.flowdata(), 'abc');
	luckysheet.jfrefreshgrid();
	```

------------

### jfrefreshgrid()

- **Explanation**：

	Refresh canvas

	> Recommended new API: [refresh](#refresh([setting]))
		
------------

### setluckysheet_select_save(v)

- **Parameter**：
	
	- {Array} [v]：The selection value (array) to be set. Comply with the selection format rules, such as `[{ row: [r1, r2], column: [c1, c2] }]`.

- **Explanation**：
	
	Set the value of the current table selection area. With `luckysheet.selectHightlightShow()`, you can view the selection changes in the interface.
	```js
	luckysheet.setluckysheet_select_save([{ row: [0, 1], column: [0, 1] }]);
	luckysheet.selectHightlightShow();
	```

	> Recommend to use new API:<a href='#setRangeShow'>setRangeShow</a>
	
------------

### selectHightlightShow()

- **Explanation**：

	Highlight the current selection

	> Recommend to use new API:<a href='#setRangeShow'>setRangeShow</a>

------------

### flowdata()

- **Explanation**：
	
	Quickly get the data of the current table

	> Recommend to use new API:[getSheetData](#getSheetData())

------------

### buildGridData(file)

- **Parameter**：
	
	- {Object} [file]：[luckysheetfile](/zh/guide/sheet.html)

- **Explanation**：
	
	Generate a two-dimensional array that the table can recognize

	> Recommend to use new API:<a href='#transToData'>transToData</a>

------------

### getGridData(data)

- **Parameter**：
	
	- {Array} [data]: Two-dimensional array data of the worksheet

- **Explanation**：
	
	Convert two-dimensional array data into `{r, c, v}` format one-dimensional array

	> Recommend to use new API:<a href='#transToCellData'>transToCellData</a>