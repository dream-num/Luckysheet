# 高级功能

## luckysheet.getcellvalue(r, c, data, type)
- **参数**：
	- r：单元格所在行数；可选值；从0开始的整数，0表示第一行。
	- c：单元格所在列数；可选值；从0开始的整数，0表示第一列。
	- data：表数据；二维数组；默认值为当前表格数据。
	- type：单元格属性值；可选值；默认值为'v',表示获取单元格的值。
- **用法**：
	
	此方法为获取单元格的值。`r`, `c`都没有值时，返回`data`；`r`, `c`只有一个有值时，返回整行或整列数据；

------------
## luckysheet.getluckysheetfile()
- **用法**：

	返回所有表格数据结构。

------------
## luckysheet.sheetmanage.getSheetByIndex(index)
- **参数**：
	- index：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	返回某个表格数据结构。

------------
## luckysheet.getconfig()
- **用法**：

	返回当前表格config配置。

------------
## luckysheet.getSheetConfig(sheetIndex)
- **参数**：
	- sheetIndex：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	返回某个表格config配置。

------------
## luckysheet.getvisibledatarow()
- **用法**：

	返回当前表格行高。

------------
## luckysheet.getvisibledatacolumn()
- **用法**：

	返回当前表格列宽。

------------
## luckysheet.getluckysheet_select_save()
- **用法**：

	返回当前选区。

------------
## luckysheet.getdatabyselection(range, sheetIndex)
- **参数**：
	- range：选区对象；`object: { row: [r1, r2], column: [c1, c2] }`；默认为当前选区。
	- sheetIndex：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	返回某个表格某个区域单元格数据。

------------
## luckysheet.luckysheetrefreshgrid(scrollWidth, scrollHeight)
- **参数**：
	- scrollWidth：横向滚动值。默认为当前横向滚动位置。
	- scrollHeight：纵向滚动值。默认为当前纵向滚动位置。
- **用法**：

	按照scrollWidth, scrollHeight刷新canvas展示数据。

------------
## luckysheet.setcellvalue(r, c, d, v)
- **参数**：
	- r：单元格所在行数；从0开始的整数，0表示第一行。
	- c：单元格所在列数；从0开始的整数，0表示第一列。
	- d：表数据；二维数组。
	- v：要设置的值；可为对象，对象是是要符合单元格对象格式。
- **用法**：

	设置某个单元格的值。可配合`luckysheet.luckysheetrefreshgrid()`刷新查看单元格值改变。
	```js
	luckysheet.setcellvalue(0, 0, luckysheet.flowdata, 'abc');
	luckysheet.luckysheetrefreshgrid();
	```

------------
## luckysheet.setluckysheet_select_save(v)
- **参数**：
	- v：要设置的选区值(数组)。符合选区格式规则，如`[{ row: [r1, r2], column: [c1, c2] }]`。
- **用法**：
	
	设置当前表格选区的值。配合`luckysheet.selectHightlightShow()`可在界面查看选区改变。
	```js
	luckysheet.setluckysheet_select_save([{ row: [0, 1], column: [0, 1] }]);
	luckysheet.selectHightlightShow();
	```

------------
## luckysheet.sheetmanage.setSheetHide(index)
- **参数**：
	- index：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	隐藏某个表格。

------------
## luckysheet.sheetmanage.setSheetShow(index)
- **参数**：
	- index：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	显示某个表格。

------------
## luckysheet.method.destroy()
- **用法**：
	
	释放表格
