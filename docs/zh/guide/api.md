# API

::: danger
新的API正在整理，请谨慎使用！
:::

## luckysheet.create(options)
- **参数**：
	- {Object} [options]:表格的所有配置信息
- **用法**：
	
	初始化一个luckysheet，可包含多个工作表，参考 [配置列表](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/config.html#container)

------------
## luckysheet.getcellvalue([r] [,c] [,data] [,type])
- **参数**：
	- {Number} [r]:单元格所在行数；可选值；从0开始的整数，0表示第一行
	- {Number} [c]:单元格所在列数；可选值；从0开始的整数，0表示第一列
	- {Array} [data]:表数据，二维数组；可选值；默认值为当前表格数据
	- {String} [type]:单元格属性值；可选值；默认值为'v',表示获取单元格的实际值
- **用法**：
	
	此方法为获取单元格的值。
	- `luckysheet.getcellvalue()`：返回当前工作表的所有数据；
	- `luckysheet.getcellvalue(0)`：返回当前工作表第1行数据；
	- `luckysheet.getcellvalue(null,0)`：返回当前工作表第1列数据；
	- `luckysheet.getcellvalue(0,0)`：返回当前工作表第1行第1列单元格的数据的v值；
	- `luckysheet.getcellvalue(1,1,null,'m')`: 返回指定data数据的第2行第2列单元格的原始值。

	特殊情况：单元格格式为`yyyy-MM-dd`，type为'v'时会强制取'm'显示值

------------
## luckysheet.getluckysheetfile()
- **用法**：

	返回所有表格数据结构的一维数组 [luckysheetfile](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/data.html#%E8%8E%B7%E5%8F%96%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE)，`luckysheet.getluckysheetfile()[0]`可取得第一个工作表的所有信息。

------------
## luckysheet.getconfig()
- **用法**：

	快捷返回当前表格config配置，每个工作表的config信息仍然包含在luckysheetfile。

------------
## luckysheet.getluckysheet_select_save()
- **用法**：

	返回当前选区对象的数组，可能存在多个选区。

------------
## luckysheet.getdatabyselection([range] [,sheetIndex])
- **参数**：
	- {Object} [range]：选区对象，`object: { row: [r1, r2], column: [c1, c2] }`；可选值；默认为当前第一个选区。
	- {Number} [sheetIndex]：表格下标，从0开始的整数，0表示第一个表格；可选值；默认为当前表格下标。
- **用法**：

	返回某个表格第一个选区的数据。
	- `luckysheet.getdatabyselection()`: 返回当前工作表当前选区的数据
	- `luckysheet.getdatabyselection(null,1)`: 返回第2个工作表的当前选区的数据

------------
## luckysheet.luckysheetrefreshgrid(scrollWidth, scrollHeight)
- **参数**：
	- {Number} [scrollWidth]：横向滚动值。默认为当前横向滚动位置。
	- {Number} [scrollHeight]：纵向滚动值。默认为当前纵向滚动位置。
- **用法**：

	按照scrollWidth, scrollHeight刷新canvas展示数据。

------------
## luckysheet.setcellvalue(r, c, d, v)
- **参数**：
	- {Number} [r]：单元格所在行数；从0开始的整数，0表示第一行。
	- {Number} [c]：单元格所在列数；从0开始的整数，0表示第一列。
	- {Array} [d]：表数据；可选值；二维数组。
	- {Object | String | Number} [v]：要设置的值；可为对象，对象是是要符合单元格对象格式。
- **用法**：

	设置某个单元格的值。可配合`luckysheet.luckysheetrefreshgrid()`刷新查看单元格值改变。
	```js
	luckysheet.setcellvalue(0, 0, luckysheet.flowdata(), 'abc');
	luckysheet.jfrefreshgrid();
	```

------------
## luckysheet.jfrefreshgrid()
- **用法**：

	刷新canvas

------------
## luckysheet.setluckysheet_select_save(v)
- **参数**：
	- {Array} [v]：要设置的选区值(数组)。符合选区格式规则，如`[{ row: [r1, r2], column: [c1, c2] }]`。
- **用法**：
	
	设置当前表格选区的值。配合`luckysheet.selectHightlightShow()`可在界面查看选区改变。
	```js
	luckysheet.setluckysheet_select_save([{ row: [0, 1], column: [0, 1] }]);
	luckysheet.selectHightlightShow();
	```

------------
## luckysheet.selectHightlightShow()
- **用法**：

	高亮当前选区

------------
## luckysheet.setSheetHide(index)
- **参数**：
	- {Number} [index]：表格索引；从0开始的整数，0表示第一个表格；默认为当前表格索引。
- **用法**：

	隐藏某个表格。

------------
## luckysheet.setSheetShow(index)
- **参数**：
	- {Number} [index]：表格索引；从0开始的整数，0表示第一个表格；默认为当前表格索引。
- **用法**：

	显示某个表格。

------------
## luckysheet.flowdata()
- **用法**：
	
	快捷获取当前表格的数据

------------
## luckysheet.buildGridData(file)
- **参数**：
	- {Object} [file]：[luckysheetfile](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/data.html#%E8%8E%B7%E5%8F%96%E8%A1%A8%E6%A0%BC%E6%95%B0%E6%8D%AE)
- **用法**：
	
	生成表格可以识别的二维数组

------------
## luckysheet.getGridData(data)
- **参数**：
	- {Array} [data]：工作表的二维数组数据
- **用法**：
	
	二维数组数据转化成 `{r, c, v}` 格式 一维数组

------------
## luckysheet.destroy()
- **用法**：
	
	删除并释放表格
