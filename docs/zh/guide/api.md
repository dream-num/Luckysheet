# API

Luckysheet针对常用的数据操作需求，开放了主要功能的API，开发者可以根据需要进行任意对接开发。

使用注意：
1. script全局引入时，所有API均挂载到window.luckysheet对象下面，可以在浏览器控制台打印看到；npm引入时，API也全部挂载在luckysheet对象下
2. `success`回调函数第一个参数为API方法的返回值
3. 需要新的API请到github [Issues](https://github.com/mengshukeji/Luckysheet/issues/new/choose)中提交，根据点赞数决定是否开放新API
4. API方法中所需的`order`参数为工作表对象中的`order`的值，而不是`index`

## 单元格操作

### getCellValue(row, column [,setting])<div id='getCellValue'></div>
 

- **参数**：

	- {Number} [row]: 单元格所在行数；从0开始的整数，0表示第一行
	- {Number} [column]: 单元格所在列数；从0开始的整数，0表示第一列
	- {PlainObject} [setting]: 可选参数
		+ {String} [type]: 单元格的值类型，可以设置为原始值`v`或者显示值`m`；默认值为`v`,表示获取单元格的实际值
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：
	
	获取单元格的值。

	特殊情况，单元格格式为`yyyy-MM-dd`，`type`为`'v'`时会强制取`'m'`显示值

- **示例**:

	- 返回当前工作表第1行第1列单元格的数据的v值
		
		`luckysheet.getCellValue(0, 0)`

	- 返回指定data数据的第2行第2列单元格的显示值。
		
		`luckysheet.getCellValue(1, 1, {type:"m"})`

------------

### setCellValue(row, column, value [,setting])
 

- **参数**：

	- {Number} [row]: 单元格所在行数；从0开始的整数，0表示第一行
	- {Number} [column]: 单元格所在列数；从0开始的整数，0表示第一列
	- {Object | String | Number} [value]: 要设置的值；可以为字符串或数字，或为符合Luckysheet单元格格式的对象，参考 [单元格属性表](/zh/guide/cell.html)
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Boolean} [isRefresh]: 是否刷新界面；默认为`true`；用于多个单元格赋值时候控制节流，前面单元格赋值的时候应设置为	`false`，最后一个单元格赋值时设置为`true`。
		+ {Function} [success]: 操作结束的回调函数

- **说明**：

	设置某个单元格的值，也可以设置整个单元格对象，用于同时设置多个单元格属性。
	
	如果需要更新公式，也可以在这里赋值，Luckysheet在内部会主动把这个公式做计算并加入到公式链中，最后重刷界面。

- **示例**:

	- 设置当前工作表"A1"单元格的值为"1"
    	`luckysheet.setCellValue(0, 0, 1);`
	
	- 设置当前工作表"B1"单元格的值为公式"=sum(A1)"
    	`luckysheet.setCellValue(0, 1, "=sum(A1)");`
	
	- 设置当前工作表"C1"单元格的值为公式"=sum(A1:B1"，并带有红色背景，单元格对象可以不带`v`和`m`值，Luckysheet会根据公式信息自动计算结果，如果带了未更新或者是非公式结果的`v`和`m`值，Luckysheet也仍然会根据公式实际关联的数据计算出准备的结果。
    	`luckysheet.setCellValue(0, 2, {f: "=sum(A1:B1)", bg:"#FF0000"})`

		再次设置"C1"单元格新的公式仍然可以生效
		
		`luckysheet.setCellValue(0, 2, {f: "=sum(A1)", bg:"#00FF00"})`

------------

### clearCell(row, column [,setting])
 

- **参数**：

	- {Number} [row]: 单元格所在行数；从0开始的整数，0表示第一行
	- {Number} [column]: 单元格所在列数；从0开始的整数，0表示第一列
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	清除指定工作表指定单元格的内容，返回清除掉的数据，不同于删除单元格的功能，不需要设定单元格移动情况

- **示例**:

    - 清空单元格`B2`内容
      `luckysheet.clearCell(1,1)`
    
------------

### deleteCell(move, row, column [,setting])
 

- **参数**：
	- {String} [move]: 删除后，右侧还是下方的单元格移动
	
		`move`可能的值有：
		
		+ `"left"`: 右侧单元格左移
		+ `"up"`: 下方单元格上移
	
	- {Number} [row]: 单元格所在行数；从0开始的整数，0表示第一行
	- {Number} [column]: 单元格所在列数；从0开始的整数，0表示第一列
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	删除指定工作表指定单元格，返回删除掉的数据，同时，指定是右侧单元格左移还是下方单元格上移

- **示例**:

    - 删除当前单元格并且在删除后，右侧单元格左移
      `luckysheet.deleteCell('left')`
    
------------

### setCellFormat(row, column, attr, value [,setting])
 

- **参数**：
	
	- {Number} [row]: 单元格所在行数；从0开始的整数，0表示第一行
	- {Number} [column]: 单元格所在列数；从0开始的整数，0表示第一列
    - {String} [attr]: 属性类型，参考 [单元格属性表](/zh/guide/cell.html)的属性值
	- {String | Number | Object} [value]: 具体的设置值，一个属性会对应多个值，参考 [单元格属性表](/zh/guide/cell.html)的值示例，如果属性类型`attr`是单元格格式`ct`，则设置值`value`应提供ct对象，如：`{fa:"General", t:"g"}`，比如设置A1单元格的格式为百分比格式：
	  
  	  `luckysheet.setCellFormat(0, 0, "ct", {fa:"0.00%", t:"n"})`

	- {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置某个单元格的属性，如果要设置单元格的值或者同时设置多个单元格属性，推荐使用`setCellValue`
	
	特殊的设置
    
  	边框设置时，attr为`"bd"`，value为一个key/value对象，需要同时设置边框类型:`borderType`/边框粗细:`style`/边框颜色:`color`，比如设置A1单元格的边框为所有/红色/细：
	  
	`luckysheet.setCellFormat(0, 0, "bd", {borderType: "border-right",style: "1", color: "#ff0000"})`
	
	完整可选的设置参数如下：

	+ 边框类型 `borderType："border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border-horizontal" | "border-vertical" | "border-none"`，
	+ 边框粗细 `style:  1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
	+ 边框颜色 `color: 16进制颜色值`

- **示例**:

   - 设置当前工作表A1单元格文本加粗
   		`luckysheet.setCellFormat(0, 0, "bl", 1)`
   - 设置第二个工作表的B2单元格背景为红色
   		`luckysheet.setCellFormat(1, 1, "bg", "#ff0000", {order:1})`
   - 设置当前工作表"A1"单元格的值为"abc"
   		`luckysheet.setCellFormat(0, 0, 'v', 'abc');`

------------

### find(content [,setting])
 

- **参数**：
	
	- {String} [content]: 要查找的内容
	- {PlainObject} [setting]: 可选参数
		+ {Boolean} [isRegularExpression]: 是否正则表达式匹配；默认为 `false`
		+ {Boolean} [isWholeWord]: 是否整词匹配；默认为 `false`
		+ {Boolean} [isCaseSensitive]: 是否区分大小写匹配；默认为 `false`
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
    	+ {String} [type]: 单元格属性；默认值为`"m"`

- **说明**：
	
	查找一个工作表中的指定内容，返回查找到的内容组成的单元格一位数组，数据格式同`celldata`。

- **示例**:

   - 当前工作表查找`"value"`字符串
   		`luckysheet.find("value")`
   - 当前工作表查找公式包含`"SUM"`的单元格
   		`luckysheet.find("SUM",{type:"f"})`

------------

### replace(content, replaceContent [,setting])
 

- **参数**：
	
	- {String} [content]: 要查找的内容
	- {String} [replaceContent]: 要替换的内容
	- {PlainObject} [setting]: 可选参数
		+ {Boolean} [isRegularExpression]: 是否正则表达式匹配；默认为 `false`
		+ {Boolean} [isWholeWord]: 是否整词匹配；默认为 `false`
		+ {Boolean} [isCaseSensitive]: 是否区分大小写匹配；默认为 `false`
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	查找一个工作表中的指定内容并替换成新的内容，返回替换后的内容组成的单元格一位数组，数据格式同`celldata`。

- **示例**:

   - 当前工作表查找`"value"`字符串并替换为`"out"`
   		`luckysheet.replace("value", "out")`

------------

### exitEditMode([,setting])

- **参数**：
	
	- {PlainObject} [setting]: 可选参数
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	退出编辑模式。鼠标双击单元格后，会进入单元格编辑模式，编辑完成后，当鼠标再次点击别的地方输入框失焦的时候，则会退出编辑模式，随即单元格的值会进行保存。此Api就是自动退出编辑模式的操作，主要是为了触发自动保存单元格。

- **示例**:

   - 手动触发退出编辑模式
   		`luckysheet.exitEditMode()`

------------

## 行和列操作

### setHorizontalFrozen(isRange [,setting])
 

- **参数**：
	
	- {Boolean} [isRange]: 是否冻结行到选区
		`isRange`可能的值有：
		
		+ `"false"`: 冻结首行
		+ `"true"`: 冻结行到选区
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: `isRange`为`true`的时候设置，开启冻结的单元格位置，格式为`{ row_focus:0, column_focus:0 }`，意为当前激活的单元格的行数和列数；默认从当前选区最后的一个选区中取得
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	冻结行操作

	特别注意，只有在`isRange`设置为`true`的时候，才需要设置`setting`中的`range`，且与一般的range格式不同。

- **示例**:

   - 冻结首行

		`luckysheet.setHorizontalFrozen(false)`

   - 冻结到`B5`选区

		`luckysheet.setHorizontalFrozen(true, { range: 'B5' })`

------------

### setVerticalFrozen(isRange [,setting])
 

- **参数**：
	
	- {Boolean} [isRange]: 是否冻结列到选区
		`isRange`可能的值有：
		
		+ `"false"`: 冻结首列
		+ `"true"`: 冻结列到选区
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: `isRange`为`true`的时候设置，开启冻结的单元格位置，格式为`{ row_focus:0, column_focus:0 }`，意为当前激活的单元格的行数和列数；默认从当前选区最后的一个选区中取得
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	冻结列操作

	特别注意，只有在`isRange`设置为`true`的时候，才需要设置`setting`中的`range`，且与一般的range格式不同。

- **示例**:

   - 冻结首列

		`luckysheet.setVerticalFrozen(false)`

------------

### setBothFrozen(isRange [,setting])
 

- **参数**：
	
	- {Boolean} [isRange]: 是否冻结行列到选区
		`isRange`可能的值有：
		
		+ `"false"`: 冻结行列
		+ `"true"`: 冻结行列到选区
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: `isRange`为`true`的时候设置，开启冻结的单元格位置，格式为`{ row_focus:0, column_focus:0 }`，意为当前激活的单元格的行数和列数；默认从当前选区最后的一个选区中取得
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	冻结行列操作

	特别注意，只有在`isRange`设置为`true`的时候，才需要设置`setting`中的`range`，且与一般的range格式不同。
	
	如果想在工作簿初始化后使用此API设置冻结，可以在工作簿创建后的钩子函数中执行，比如：
	```js
	luckysheet.create({
    	hook:{
				workbookCreateAfter:function(){
					luckysheet.setBothFrozen(false);
				}
			}
	});

	```

- **示例**:

   - 冻结行列

		`luckysheet.setBothFrozen(false)`

------------

### cancelFrozen([setting])
 

- **参数**：

	- {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	取消冻结操作

- **示例**:

   - 取消冻结

		`luckysheet.cancelFrozen()`

------------

### insertRow(row [,setting])
 

- **参数**：

	- {Number} [row]: 在第几行插入空白行，从0开始

	- {PlainObject} [setting]: 可选参数
		+ {Number} [number]: 插入的空白行数；默认为 1
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	在第`row`行的位置，插入`number`行空白行

- **示例**:

   - 在第2行的位置插入1行空白行

		`luckysheet.insertRow(1)`

------------

### insertColumn( column [,setting])
 

- **参数**：

	- {Number} [column]: 在第几列插入空白列

	- {PlainObject} [setting]: 可选参数
		+ {Number} [number]: 插入的空白列数；默认为 1
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	在第`column`列的位置，插入`number`列空白列

- **示例**:

   - 在第1列的位置插入3行空白行

		`luckysheet.insertColumn(0, { number: 3 })`

------------

### deleteRow(rowStart, rowEnd [,setting])
 

- **参数**：
	
	- {Number} [rowStart]: 要删除的起始行
	- {Number} [rowEnd]: 要删除的结束行
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	删除指定的行

	特别提醒，删除行之后，行的序号并不会变化，下面的行会补充到上面，注意观察数据是否被正确删除即可。

- **示例**:

   - 删除2-4行

		`luckysheet.deleteRow(1, 3)`

------------

### deleteColumn(columnStart, columnEnd [,setting])
 
- **参数**：
	
	- {Number} [columnStart]: 要删除的起始列
	- {Number} [columnEnd]: 要删除的结束列
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	删除指定的列

	特别提醒，删除列之后，列的序号并不会变化，右边的列会补充到左边，注意观察数据是否被正确删除即可。

- **示例**:

   - 删除2-4列

		`luckysheet.deleteColumn(1, 3)`

------------

### hideRow(rowStart, rowEnd [,setting])
 
- **参数**：
	
	- {Number} [rowStart]: 要隐藏的起始行
	- {Number} [rowEnd]: 要隐藏的结束行
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	隐藏指定的行

	特别提醒，隐藏行之后，行的序号会变化。

- **示例**:

   - 隐藏2-4行

		`luckysheet.hideRow(1, 3)`

------------

### hideColumn(columnStart, columnEnd [,setting])(TODO)
 
- **参数**：
	
	- {Number} [columnStart]: 要隐藏的起始列
	- {Number} [columnEnd]: 要隐藏的结束列
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	隐藏指定的列

	特别提醒，隐藏列之后，列的序号会变化。

- **示例**:

   - 隐藏2-4列

		`luckysheet.hideColumn(1, 3)`

------------

### showRow(rowStart, rowEnd [,setting])
 
- **参数**：
	
	- {Number} [rowStart]: 要显示的起始行
	- {Number} [rowEnd]: 要显示的结束行
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	显示指定的行

- **示例**:

   - 显示2-4行

		`luckysheet.showRow(1, 3)`

------------

### showColumn(columnStart, columnEnd [,setting])(TODO)
 
- **参数**：
	
	- {Number} [columnStart]: 要显示的起始列
	- {Number} [columnEnd]: 要显示的结束列
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	显示指定的列

- **示例**:

   - 显示2-4列

		`luckysheet.showColumn(1, 3)`

------------

### setRowHeight(rowInfo [,setting])

- **参数**：
	
	- {Object} [rowInfo]: 行数和高度对应关系
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置指定行的高度

- **示例**:

   - 设置第一行高度为50px，第二行高度为60px

		`luckysheet.setRowHeight({0：50，1：60})`

------------

### setColumnWidth(columnInfo [,setting])

- **参数**：
	
	- {Object} [columnInfo]: 列数和宽度对应关系
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置指定列的宽度

- **示例**:

   - 设置第一列宽度为50px，第二列宽度为60px

		`luckysheet.setColumnWidth({0：50，1：60})`

------------

### getRowHeight(rowInfo [,setting])

- **参数**：
	
	- {Array} [rowInfo]: 行号下标组成的数组；行号下标从0开始；
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	获取指定工作表指定行的高度，得到行号和高度对应关系的对象（第一行行号为0）

- **示例**:

   - 第一行高度为50px，第二行高度为60px，获取这些值

		`luckysheet.getRowHeight([0,1])`
		返回得到
		`{0：50，1：60}`

------------

### getColumnWidth(columnInfo [,setting])

- **参数**：
	
	- {Array} [columnInfo]: 列号下标组成的数组；列号下标从0开始；
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	获取指定工作表指定列的宽度，得到列号和宽度对应关系的对象（第一列列号为0）

- **示例**:

   - 第一列宽度为50px，第二列宽度为60px，获取这些值

		`luckysheet.getColumnWidth([0,1])`
		返回得到
		`{0：50，1：60}`

------------

### getDefaultRowHeight([,setting])

- **参数**：
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	获取工作表的默认行高

- **示例**:

   - 返回工作表的默认行高

		`luckysheet.getDefaultRowHeight()`
		返回得到
		`19`

------------

### getDefaultColWidth([,setting])

- **参数**：
		
	- {PlainObject} [setting]: 可选参数
        + {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	获取工作表的默认列宽

- **示例**:

   - 返回工作表的默认列宽

		`luckysheet.getDefaultColWidth()`
		返回得到
		`73`

------------

## 选区操作

### getRange()
 
- **说明**：

	返回当前选区对象的数组，可能存在多个选区。每个选区的格式为row/column信息组成的对象`{row:[0,1],column:[0,1]}`

- **示例**:

	- 当前选区为"A1:B2"和"B4:C5"，执行
		
		`luckysheet.getRange()`
		
		则返回结果为：
		```json
		[
			{ "row": [0,1], "column": [0,1] },
			{ "row": [3,4], "column": [1,2] }
		]
		```

------------

### getRangeWithFlatten()
 
- **说明**：

	返回表示指定区域内所有单元格位置的数组，区别getRange方法，该方法以cell单元格(而非某块连续的区域)为单位来组织选区的数据。

- **示例**:

	- 在表格中选择指定的区域，然后执行
		
		`luckysheet.getRange()`
		
		则返回结果为：
		```json
		[
			{"row":[0,0],"column":[0,2]},
			{"row":[1,1],"column":[0,0]},
			{"row":[3,3],"column":[0,0]}
		]
		```
		其中，{"row":[0,0],"column":[0,2]} 表示的是一整块连续的区域。

	- 在表格中选择上面的区域，然后执行
		
		`luckysheet.getRangeWithFlatten()`
		
		则返回结果为：
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
 
- **说明**：

	返回表示指定区域内所有单元格内容的对象数组

- **示例**:

	- 在表格中选择指定的区域，然后执行
		
		`luckysheet.getRange()`
		
		则返回结果为：
		```json
		[
			{"row":[0,0],"column":[0,2]},
			{"row":[1,1],"column":[0,0]},
			{"row":[3,3],"column":[0,0]}
		]
		```
		其中，{"row":[0,0],"column":[0,2]} 表示的是一整块连续的区域。

	- 在表格中选择上面的区域，然后执行
		
		`luckysheet.getRangeValuesWithFlatte()`
		
		则返回结果为：
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
 
- **说明**：

	返回对应当前选区的坐标字符串数组，可能存在多个选区。每个选区可能是单个单元格(如 A1)或多个单元格组成的矩形区域(如 D9:E12)

- **示例**:

	- 当前选区为"E10:E14"、"A7:B13"、"C4"、 "A3"和"C6:D9"，执行
		
		`luckysheet.getRangeAxis()`
		
		则返回结果为：
		```json
		["E10:E14", "A7:B13", "C4", "A3", "C6:D9"]
		```

------------

### getRangeValue([setting])

- **参数**：

	- {PlainObject} [setting]: 可选参数
		+ {Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：
	
	返回指定工作表指定范围的单元格二维数组数据，每个单元格为一个对象。

	[单元格对象格式参考](/zh/guide/cell.html)

- **示例**:

	- 当前选区为"A1:B2"，执行
		
		`luckysheet.getRangeValue()`
		
		则返回结果为：
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


- **参数**：

	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：
	
	复制指定工作表指定单元格区域的数据，返回包含`<table>`html格式的数据，可用于粘贴到excel中保持单元格样式。
	
	特别注意，如果复制多个选区，这几个选区必须有相同的行或者相同的列才能复制，复制出的结果也会自动合并成衔接的数组，比如，多选`"C18:C20"` / `"E18:E20"` / `"G18:H20"`是允许的，但是多选`"C18:C20"` / `"E18:E21"`是不允许的

- **示例**:

	- 当前选区为"A1:B2"，执行
		
		`luckysheet.getRangeHtml()`
		
		则返回结果为：
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
 

- **参数**：

    - {Boolean} [title]: 是否首行为标题

		`title`可能的值有：
		
		+ `"true"`: 首行为标题
		+ `"false"`: 首行不为标题
	- {PlainObject} [setting]: 可选参数
		+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：

	复制指定工作表指定单元格区域的数据，返回`json`格式的数据

- **示例**:

	- 当前选区为"A1:B2"，首行为标题取得json
		
		`luckysheet.getRangeJson(true)`
		
		则返回结果为：
		```json
		[
			{ "value1": "value2", "value3": "value4" }
		]
		```

	- 当前选区为"A1:B2"，首行不为标题取得json
		
		`luckysheet.getRangeJson(false)`
		
		则返回结果为：
		```json
		[
			{ "A": "value1", "B": "value3" },
			{ "A": "value2", "B": "value4" }
		]
		```

------------

### getRangeArray(dimensional [,setting])


- **参数**：

    - {String} [dimensional]: 数组维度
		
		`dimensional`可能的值有：
		
		+ `"oneDimensional"`: 一维数组
		+ `"twoDimensional"`: 二维数组
	- {PlainObject} [setting]: 可选参数
		+ {Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：
	
	复制指定工作表指定单元格区域的数据，返回一维、二维或者自定义行列数的二维数组的数据。

	特别注意，只有在`dimensional`设置为`custom`的时候，才需要设置`setting`中的`row`和`column`

- **示例**:

	- 当前选区为"A1:B2"，一维数组
		
		`luckysheet.getRangeArray('oneDimensional')`
		
		则返回结果为：
		```json
		["value1","value3","value2","value4"]
		```

	- 当前选区为"A1:B2"，二维数组
		
		`luckysheet.getRangeArray('twoDimensional')`
		
		则返回结果为：
		```json
		[
			[ "value1", "value3" ],
			[ "value2", "value4" ]
		]
		```

	- 当前选区为"A1:C5"，由 'value1'到'value15'的值组成，得到3	行2列的二维数组数据
		
		`luckysheet.getRangeArray('custom', { row: 3, column: 2 })`
		
		则返回结果为：
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
 

- **参数**：

	- {String} [type]: 对角线还是对角线偏移
	
		`type`可能的值有：
		
		+ `"normal"`: 对角线
		+ `"anti"`: 反对角线
		+ `"offset"`: 对角线偏移
	- {PlainObject} [setting]: 可选参数
		- {Number} [column]: `type`为`offset`的时候设置，对角偏移的列数
		+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：
	
	复制指定工作表指定单元格区域的数据，返回对角线或者对角线偏移`column`列后的数据。

	特别注意，只有在`type`设置为`offset`的时候，才需要设置`setting`中的`column`。

- **示例**:

	- 当前选区为"A1:B2"，对角线
		
		`luckysheet.getRangeDiagonal('normal')`
		
		则返回结果为：
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

	- 当前选区为"A1:B2"，反对角线
		
		`luckysheet.getRangeDiagonal('anti')`
		
		则返回结果为：
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
	- 当前选区为"A1:B2"，对角线偏移1列
		
		`luckysheet.getRangeDiagonal('offset', { column: 1 })`
		
		则返回结果为：
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
 

- **参数**：

	- {PlainObject} [setting]: 可选参数
		+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：
	
	复制指定工作表指定单元格区域的数据，返回布尔值的数据

- **示例**:

	- 当前选区为"A1:B2"
		
		`luckysheet.getRangeBoolean()`
		
		则返回结果为：
		```json
		[
			[ false, false ],
			[ false, false ]
		]
		```

------------

### setRangeShow(range [,setting])<div id='setRangeShow'></div>


- **参数**：

	- {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
	- {PlainObject} [setting]: 可选参数
    	+ {Boolean} [show]: 是否显示高亮选中效果；默认值为 `true`
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表选中一个或多个选区为选中状态并选择是否高亮，支持多种格式设置。

	特别提醒，Luckysheet中涉及到的选区范围设置都可以参考这个设置

- **示例**:

     + 设定当前工作表选区范围`A1:B2`: 
      
		`luckysheet.setRangeShow("A1:B2")`
     + 设定选区范围`A1:B2`: 
  		
		`luckysheet.setRangeShow(["A1:B2"])`
     + 设定选区范围`A1:B2`: 
  
  		`luckysheet.setRangeShow({row:[0,1],column:[0,1]})`
     + 设定选区范围`A1:B2`: 
  
  		`luckysheet.setRangeShow([{row:[0,1],column:[0,1]}])`
     + 设定选区范围`A1:B2`和`C3:D4`:  
  
		`luckysheet.setRangeShow(["A1:B2","C3:D4"])`
     + 设定选区范围`A1:B2`和`D3`: 
  
  		`luckysheet.setRangeShow([{row:[0,1],column:[0,1]},{row:[2,2],column:[3,3]}])`

------------

### setRangeValue(data [,setting])
 
- **参数**：

	- {Array} [data]: 要赋值的单元格二维数组数据，每个单元格的值，可以为字符串或数字，或为符合Luckysheet格式的对象，参考 [单元格属性表](/zh/guide/cell.html)
	- {PlainObject} [setting]: 可选参数
		+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Boolean} [isRefresh]: 是否刷新界面；默认为`true`；用于多个单元格赋值时候控制节流，前面单元格赋值的时候应设置为	`false`，最后一个单元格赋值时设置为`true`。
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	将一个单元格数组数据赋值到指定的区域，数据格式同`getRangeValue`方法取到的数据。

	注意一点，通常`getRangeValue`方法只是取得选区数据，但是不包含边框和合并单元格信息，当执行`setRangeValue`的时候，会动态判断上一步是否执行过`getRangeValue`，如果执行过，会将边框和合并单元格信息一并从Luckysheet配置中取得。

- **示例**:

     + 赋值到当前选区
      
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
 

- **参数**：

    - {String} [attr]: 属性类型，
  	参考 [单元格属性表](/zh/guide/cell.html)的属性值
	- {String | Number | Object} [value]: 具体的设置值，一个属性会对应多个值，参考 [单元格属性表](/zh/guide/cell.html)的值示例，特殊情况：如果属性类型`attr`是单元格格式`ct`，则设置值`value`应提供`ct.fa`，比如设置`"A1:B2"`单元格的格式为百分比格式：
	  
  	  `luckysheet.setRangeFormat("ct", "0.00%", {range:"A1:B2"})`

    - {PlainObject} [setting]: 可选参数
    	+ {Object | String} [range]: 设置参数的目标选区范围，支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	  
	设置指定范围的单元格格式，一般用作处理格式，赋值操作推荐使用`setRangeValue`方法
    
  	边框设置时，attr为`"bd"`，value为一个key/value对象，需要同时设置边框类型:`borderType`/边框粗细:`style`/边框颜色:`color`/，比如设置`"A1:B2"`单元格的边框为所有/红色/细：
	  
	`luckysheet.setRangeFormat("bd", {borderType: "border-right",style: "1", color: "#ff0000"}, {range:["A1:B2"]})`
	
	完整可选的设置参数如下：

	+ 边框类型 `borderType："border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border-horizontal" | "border-vertical" | "border-none"`，
	+ 边框粗细 `style:  1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
	+ 边框颜色 `color: 16进制颜色值`

- **示例**:

   - 设置当前工作表`"A1:B2"`范围的单元格文本加粗
		
		`luckysheet.setRangeFormat("bl", 1, {range:"A1:B2"})`
   - 设置第二个工作表的`"B2"`和`"C4:D5"`范围的单元格背景为红色
		
		`luckysheet.setRangeFormat("bg", "#ff0000", {range:["B2","C4:D5"], order:1})`

------------

### setRangeFilter(type [,setting])


- **参数**：
	
	- {String} [type]: 打开还是关闭筛选功能
	
		`type`可能的值有：
		
		+ `"open"`: 打开筛选功能，返回当前筛选的范围对象
		+ `"close"`: 关闭筛选功能，返回关闭前筛选的范围对象
	- {PlainObject} [setting]: 可选参数
    	+ {Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围开启或关闭筛选功能

- **示例**:

	- 打开第二个工作表"A1:B2"范围的筛选功能
	`luckysheet.setRangeFilter("open",{range:"A1:B2",order:1})`

------------

### setRangeMerge(type [,setting])
 

- **参数**：
	
	- {String} [type]: 合并单元格类型
	
		`type`可能的值有：
		
		+ `"all"`: 全部合并，区域内所有单元格合并成一个大的单元格
		+ `"horizontal"`: 水平合并，区域内在同一行的单元格合并成一个单元格
		+ `"vertical"`: 垂直合并，区域内在同一列的单元格合并成一个单元格
	
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围设定合并单元格

- **示例**:

	- 当前选区 'A1:B2' 设置为合并单元格，类型为全部合并
		
		`luckysheet.setRangeMerge("all")`
		得到 'A1:B1' 的数据为：
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
 

- **参数**：
	
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围取消合并单元格

- **示例**:

	- 当前选区 'A1:B2' 已为合并单元格，现在要取消合并
		
		`luckysheet.cancelRangeMerge()`
		
------------

### setRangeSort(type [,setting])
 

- **参数**：

	- {String} [type]: 排序类型
	
		`type`可能的值有：
		
		+ `"asc"`: 升序
		+ `"des"`: 降序
		
	- {PlainObject} [setting]: 可选参数
		
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围开启排序功能，返回选定范围排序后的数据。

- **示例**:

   - 设置当前工作表当前选区为升序
   `luckysheet.setRangeSort("asc")`

------------

### setRangeSortMulti(title, sort [,setting])
 

- **参数**：

	- {Boolean} [title]: 数据是否具有标题行
	- {Array} [sort]: 列设置，设置需要排序的列索引和排序方式，格式如：`[{ i:0,sort:'asc' },{ i:1,sort:'des' }]`
	- {PlainObject} [setting]: 可选参数
		
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围开启多列自定义排序功能，返回选定范围排序后的数据。

- **示例**:

   - 设置当前工作表当前选区为自定义排序，数据具有标题行，且按第一列升序第二列降序的规则进行排序
   `luckysheet.setRangeSortMulti(true,[{ i:0,sort:'asc' },{ i:1,sort:'des' }])`

------------

### setRangeConditionalFormatDefault(conditionName, conditionValue [,setting])

- **参数**：

	- {String} [conditionName]: 条件格式规则类型
	
		`conditionName`可能的值有：
		
		+ `"greaterThan"`: 大于（conditionValue值为 数值或单元格范围）
		+ `"lessThan"`: 小于（conditionValue值为 数值或单元格范围）
		+ `"betweenness"`: 介于（conditionValue值为 数值或单元格范围）
		+ `"equal"`: 等于（conditionValue值为 数值或单元格范围）
		+ `"textContains"`: 文本包含（conditionValue值为 文本或单元格范围）
		+ `"occurrenceDate"`: 发生日期（conditionValue值为 日期）
		+ `"duplicateValue"`: 重复值(conditionValue值为 '0':重复值, '1':唯一值)
		+ `"top10"`: 前 N 项（conditionValue值为 1~1000）
		+ `"top10%"`: 前 N%（conditionValue值为 1~1000）
		+ `"last10"`: 后 N 项（conditionValue值为 1~1000）
		+ `"last10%"`: 后 N%（conditionValue值为 1~1000）
		+ `"AboveAverage"`: 高于平均值（conditionValue可为空数组）
		+ `"SubAverage"`: 低于平均值（conditionValue可为空数组）
		 
	- {Array} [conditionValue]: 可以设置条件单元格或者条件值
		取值规则 （条件值数组最少一个值，最多两个值）
		```js
		[2]
		```
		或者 （若值为单元格范围，则取左上角单元格值）
		```js
		['A1']
		```
	
	- {PlainObject} [setting]: 可选参数
		
      	+ {Object} [format]: 颜色设置
      	  
    		* 设置文本颜色和单元格颜色；默认值为` {
				"textColor": "#000000",
				"cellColor": "#ff0000"
			}`
    	+ {Array | Object | String} [cellrange]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
    	
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围开启条件格式，根据设置的条件格式规则突出显示部分单元格，返回开启条件格式后的数据。

- **示例**:

    - 突出显示内容大于数字2的单元格
      `luckysheet.setRangeConditionalFormatDefault("greaterThan",{ type: 'value', content: [2] })`
    
	- 突出显示内容小于单元格A1内容的单元格
	  `luckysheet.setRangeConditionalFormatDefault("lessThan",{ type: 'range', content: ['A1'] })`

	- 突出显示内容介于2和10之间的单元格
	  `luckysheet.setRangeConditionalFormatDefault("betweenness",{ type: 'value', content: [2,10] })`
	
	- 突出显示内容等于单元格A1内容的单元格
	  `luckysheet.setRangeConditionalFormatDefault("equal",{ type: 'range', content: ['A1'] })`
	
	- 突出显示内容包含单元格A1内容的单元格
	  `luckysheet.setRangeConditionalFormatDefault("textContains",{ type: 'range', content: ['A1'] })`
	
	- 突出显示日期在 `2020/09/24 - 2020/10/15` 之间的单元格
      `luckysheet.setRangeConditionalFormatDefault("occurrenceDate",{ type: 'value', content: ['2020/09/24 - 2020/10/15'] })`

	- 突出显示重复值的单元格，content为0
      `luckysheet.setRangeConditionalFormatDefault("duplicateValue",{ type: 'value', content: [0] })`

	- 突出显示唯一值的单元格，content为1
      `luckysheet.setRangeConditionalFormatDefault("duplicateValue",{ type: 'value', content: [1] })`
	
	- 突出显示排名前20名的单元格
      `luckysheet.setRangeConditionalFormatDefault("top",{ type: 'value', content: [20] })`
	
	- 突出显示排名前30%的单元格
      `luckysheet.setRangeConditionalFormatDefault("topPercent",{ type: 'value', content: [30] })`
	
	- 突出显示排名后15名的单元格
      `luckysheet.setRangeConditionalFormatDefault("last",{ type: 'value', content: [15] })`
	
	- 突出显示排名后15%的单元格
      `luckysheet.setRangeConditionalFormatDefault("lastPercent",{ type: 'value', content: [15] })`
	
	- 突出显示高于平均值的单元格
      `luckysheet.setRangeConditionalFormatDefault("AboveAverage",{ type: 'value', content: ['AboveAverage'] })`
	
	- 突出显示低于平均值的单元格
	  `luckysheet.setRangeConditionalFormatDefault("SubAverage",{ type: 'value', content: ['SubAverage'] })`

------------

### setRangeConditionalFormat(type [,setting])

- **参数**：

	- {String} [type]: 条件格式规则类型
	
		`type`可能的值有：
		
		+ `"dataBar"`: 数据条
		+ `"icons"`: 图标集
		+ `"colorGradation"`: 色阶
		 
	- {PlainObject} [setting]: 可选参数
		
      	+ {Array | String} [format]: 颜色设置
    	 
		 	* `type`为`dataBar`时，应设置渐变色；默认值为蓝-白渐变` ["#638ec6", "#ffffff"]`

				推荐的快捷取值：
				```js
				["#638ec6", "#ffffff"],  //蓝-白渐变 数据条
				["#63c384", "#ffffff"],  //绿-白渐变 数据条
				["#ff555a", "#ffffff"],  //红-白渐变 数据条
				["#ffb628", "#ffffff"],  //橙-白渐变 数据条
				["#008aef", "#ffffff"],  //浅蓝-白渐变 数据条
				["#d6007b", "#ffffff"],  //紫-白渐变 数据条
				["#638ec6"],  //蓝色 数据条
				["#63c384"],  //绿色 数据条
				["#ff555a"],  //红色 数据条
				["#ffb628"],  //橙色 数据条
				["#008aef"],  //浅蓝色 数据条
				["#d6007b"]   //紫色 数据条
				```
			
			* `type`为`icons`时，应设置图标类型；默认值为"threeWayArrowMultiColor"：三向箭头彩色，

				可取值为：
				
				`threeWayArrowMultiColor`：三向箭头（彩色），
				
				`threeTriangles`：3个三角形，

				`fourWayArrowMultiColor`：四向箭头（彩色），

				`fiveWayArrowMultiColor`：五向箭头（彩色），

				`threeWayArrowGrayColor`：三向箭头（灰色），

				`fourWayArrowGrayColor`：四向箭头（灰色），

				`fiveWayArrowGrayColor`：五向箭头（灰色），

				`threeColorTrafficLightRimless`：三色交通灯（无边框），

				`threeSigns`：三标志，

				`greenRedBlackGradient`：绿-红-黑渐变，

				`threeColorTrafficLightBordered`：三色交通灯（有边框），

				`fourColorTrafficLight`：四色交通灯，

				`threeSymbolsCircled`：三个符号（有圆圈），

				`tricolorFlag`：三色旗，

				`threeSymbolsnoCircle`：三个符号（无圆圈），

				`threeStars`：3个星形，

				`fiveQuadrantDiagram`：五象限图，

				`fiveBoxes`：5个框，

				`grade4`：四等级，

				`grade5`：五等级，

			* `type`为`colorGradation`时，应设置色阶颜色值；默认值为绿-黄-红色阶` ["rgb(99, 190, 123)", "rgb(255, 235, 132)", "rgb(248, 105, 107)"]`

				推荐的快捷取值：
				```js
				["rgb(99, 190, 123)", "rgb(255, 235, 132)", "rgb(248, 105, 107)"],  //绿-黄-红色阶
				["rgb(248, 105, 107)", "rgb(255, 235, 132)", "rgb(99, 190, 123)"],  //红-黄-绿色阶

				["rgb(99, 190, 123)", "rgb(252, 252, 255)", "rgb(248, 105, 107)"],  //绿-白-红色阶
				["rgb(248, 105, 107)", "rgb(252, 252, 255)", "rgb(99, 190, 123)"],  //红-白-绿色阶
				
				["rgb(90, 138, 198)", "rgb(252, 252, 255)", "rgb(248, 105, 107)"],  //蓝-白-红色阶
				["rgb(248, 105, 107)", "rgb(252, 252, 255)", "rgb(90, 138, 198)"],  //红-白-蓝色阶
				
				["rgb(252, 252, 255)", "rgb(248, 105, 107)"],  //白-红色阶
				["rgb(248, 105, 107)", "rgb(252, 252, 255)"],  //红-白色阶

				["rgb(99, 190, 123)", "rgb(252, 252, 255)"],  //绿-白色阶
				["rgb(252, 252, 255)", "rgb(99, 190, 123)"],  //白-绿色阶

				["rgb(99, 190, 123)", "rgb(255, 235, 132)"],  //绿-黄色阶
				["rgb(255, 235, 132)", "rgb(99, 190, 123)"]   //黄-绿色阶
				```
			
		+ {Array | Object | String} [cellrange]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
    	
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，选定的范围开启条件格式，返回开启条件格式后的数据。

- **示例**:

    - 当前选区范围开启条件格式，显示渐变色
      `luckysheet.setRangeConditionalFormat("dataBar", { format: ["#63c384", "#ffffff"] })`

------------

### deleteRangeConditionalFormat(itemIndex [,setting])

- **参数**：

	- {Number} [itemIndex]: 条件格式规则索引
		 
	- {PlainObject} [setting]: 可选参数
		  	
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	为指定下标的工作表，删除条件格式规则，返回被删除的条件格式规则。

- **示例**:

    - 删除第三个条件格式规则
      `luckysheet.deleteRangeConditionalFormat(2)`
    
------------

### clearRange([setting])

- **参数**：

	- {PlainObject} [setting]: 可选参数
		+ {Array | Object | String} [range]: 要清除的选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	清除指定工作表指定单元格区域的内容，不同于删除选区的功能，不需要设定单元格移动情况

- **示例**:

    - 清空当前选区内容
      `luckysheet.clearRange()`
    
------------

### deleteRange(move [,setting])

- **参数**：
	
	- {String} [move]: 删除后，右侧还是下方的单元格移动
	
		`move`可能的值有：
		
		+ `"left"`: 右侧单元格左移
		+ `"up"`: 下方单元格上移
		
	- {PlainObject} [setting]: 可选参数
		+ {Object | String} [range]: 要删除的选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	删除指定工作表指定单元格区域，同时，指定是右侧单元格左移还是下方单元格上移

- **示例**:

    - 删除当前选区并且在删除后，右侧单元格左移
      `luckysheet.deleteRange('left')`
    
------------

### insertRange(move [,setting])

[todo]


- **参数**：
	
	- {String} [move]: 活动单元格右移或者下移
	
		`move`可能的值有：
		
		+ `"right"`: 活动单元格右移
		+ `"bottom"`: 活动单元格下移
		
	- {PlainObject} [setting]: 可选参数
		+ {Array} [data]: 赋值到range区域的单元格二维数组数据，[单元格对象格式参考](/zh/guide/cell.html)；默认值为空数组，即插入空白的区域
		+ {Array | Object | String} [range]: 要插入的位置，选区范围，支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，默认为当前选区
    	
			当未设置data数据时，允许多个选区组成的数组，插入的空白区域即为这些选区的区域，
			
			当设置了data数据，只能为单个选区，并且会把data数据插入到当前选区的第一个单元格位置
			
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	在指定工作表指定单元格区域，赋值单元格数据，或者新建一块空白区域，返回data数据，同时，指定活动单元格右移或者下移

- **示例**:

    - 当前选区位置插入空白单元格，并且插入后当前选区单元格右移
      `luckysheet.insertRange('right')`
    
------------

### matrixOperation(type [,setting])

- **参数**：
	
	- {String} [type]: 矩阵操作的类型
	
		`type`可能的值有：
		
		+ `"flipUpDown"`: 上下翻转
		+ `"flipLeftRight"`: 左右翻转
		+ `"flipClockwise"`: 顺时针旋转
		+ `"flipCounterClockwise"`: 逆时针旋转api
		+ `"transpose"`: 转置
		+ `"deleteZeroByRow"`: 按行删除两端0值
		+ `"deleteZeroByColumn"`: 按列删除两端0值
		+ `"removeDuplicateByRow"`: 按行删除重复值
		+ `"removeDuplicateByColumn"`: 按列删除重复值
		+ `"newMatrix"`: 生产新矩阵
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表指定单元格区域的数据进行矩阵操作，返回操作成功后的结果数据

- **示例**:

    - 当前选区上下翻转
    		
		`luckysheet.matrixOperation('flipUpDown')`

		原来的选区复制为二维数组：
		
		`[["value1","value3"],["value2","value4"]]`
		
		上下翻转后选区复制为二维数组：
		
		`[["value2","value4"],["value1","value3"]]`
    
------------

### matrixCalculation(type, number [,setting])

- **参数**：
	- {String} [type]: 计算方式
	
		`type`可能的值有：
		
		+ `"plus"`: 加
		+ `"minus"`: 减
		+ `"multiply"`: 乘
		+ `"divided"`: 除
		+ `"power"`: 次方
		+ `"root"`: 次方根
		+ `"log"`: log
	- {Number} [number]: 计算数值，如: 2
	- {PlainObject} [setting]: 可选参数
    	+ {Array | Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表指定单元格区域的数据进行矩阵计算，返回计算成功后的结果数据

- **示例**:

    - 当前选区所有单元格值加2
    		
		`luckysheet.matrixCalculation('plus', 2)`

		原来的选区复制为二维数组：
		
		`[[1,2],[3,4]]`
		
		加2后选区复制为二维数组：
		
		`[[3,4],[5,6]]`
    
------------

## 工作表操作

### getAllSheets()

- **说明**：

	返回所有工作表配置，格式同工作表配置，得到的结果可用于表格初始化时作为options.data使用。

	所以此API适用于，手动操作配置完一个表格后，将所有工作表信息取出来自行保存，再用于其他地方的表格创建。如果想得到包括工作簿配置在内的所有工作簿数据，推荐使用 [toJson](#toJson())，并且可以直接用于初始化Luckysheet。

- **示例**:

	- 取得第一个工作表的所有基本信息
	`luckysheet.getAllSheets()[0]`
	
------------

### getLuckysheetfile()

- **说明**：

	返回所有表格数据结构的一维数组`luckysheetfile`，不同于`getAllSheets`方法，此方法得到的工作表参数会包含很多内部使用变量，最明显的区别是表格数据操作会维护`luckysheetfile[i].data`，而初始化数据采用的是`options.data[i].celldata`，所以`luckysheetfile`可用于调试使用，但是不适用初始化表格。

	除此之外，加载过的工作表参数中会增加一个`load = 1`，这个参数在初始化数据的时候需要置为0才行。所以，将`getLuckysheetfile()`得到的数据拿来初始化工作簿，需要做两个工作：
	
	- celldata转为data，参考:[transToData](/zh/guide/api.html#transtodata-celldata-setting)
	- load重置为0或者删除此字段

	现在已有`getAllSheets`来完成这个工作，无需再手动转化数据。

- **示例**:

	- 取得第一个工作表的所有调试信息
	`luckysheet.getLuckysheetfile()[0]`
	
------------

### getSheet([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [index]: 工作表索引；默认值为当前工作表索引
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
    	+ {Number} [name]: 工作表名称；默认值为当前工作表名称

- **说明**：

	根据index/order/name，快捷返回指定工作表的配置，同 `luckysheetfile[i]`。如果设置多个参数，优先级为：index > order > name。
	
------------

### getSheetData([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：

	快捷返回指定工作表的数据，同 `luckysheetfile[i].data`
	
------------

### getConfig([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标

- **说明**：

	快捷返回指定工作表的config配置，同 `luckysheetfile[i].config`

------------

### setConfig(cfg, [setting])

- **参数**：
	- {Object} [cfg]: config配置
    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数
	
- **说明**：

	快捷设置指定工作表config配置

------------
### updataSheet([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Array} [data]: 需要更新的工作表配置，参考create这个API的option.data
    	+ {Function} [success]: 操作结束的回调函数
	
- **说明**：

	根据所传的工作表配置，更新相应的工作表

	
------------
### setSheetAdd([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Object} [sheetObject]: 新增的工作表的数据；默认值为空对象，工作表数据格式参考[options.data](/zh/guide/sheet.html#初始化配置)
    	+ {Number} [order]: 新增的工作表下标；默认值为最后一个下标位置
    	+ {Function} [success]: 操作结束的回调函数
	
- **说明**：

	新增一个sheet，返回新增的工作表对象，`setting`中可选设置数据为 `sheetObject`，不传`sheetObject`则会新增一个空白的工作表。

- **示例**:

	- 在最后一个工作表下标位置新增一个空白的工作表
	`luckysheet.setSheetAdd()`
	
------------

### setSheetDelete([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数
	
- **说明**：

	删除指定下标的工作表，返回已删除的工作表对象

- **示例**:

	- 删除当前工作表
	`luckysheet.setSheetDelete()`
			
------------

### setSheetCopy([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
		+ {Number} [targetOrder]: 新复制的工作表目标下标位置；默认值为当前工作表下标的下一个下标位置（递增）
    	+ {Number} [order]: 被复制的工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数
	
- **说明**：

	复制指定下标的工作表到指定下标位置，在`setting`中可选设置指定下标位置`targetOrder`，返回新复制的工作表对象

- **示例**:

	- 复制当前工作表到下一个下标位置
	`luckysheet.setSheetCopy()`

------------

### setSheetHide([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 被隐藏的工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	隐藏指定下标的工作表，返回被隐藏的工作表对象

- **示例**:

	- 隐藏当前工作表
	`luckysheet.setSheetHide()`
	- 隐藏第三个工作表
	`luckysheet.setSheetHide({order:2})`

------------

### setSheetShow([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 被取消隐藏的工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	取消隐藏指定下标的工作表，返回被取消隐藏的工作表对象

- **示例**:

	- 取消隐藏第三个工作表
	`luckysheet.setSheetShow({order:2})`

------------

### setSheetActive(order [,setting])

- **参数**：

	- {Number} [order]: 要激活的工作表下标
	- {PlainObject} [setting]: 可选参数
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置指定下标的工作表为当前工作表（激活态），即切换到指定的工作表，返回被激活的工作表对象

- **示例**:

	- 切换到第二个工作表
	`luckysheet.setSheetActive(1)`

------------

### setSheetName(name [,setting])

- **参数**：

    - {String} [name]: 新的工作表名称
	- {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数
	
- **说明**：
	
	修改工作表名称

- **示例**:

	- 修改当前工作表名称为"CellSheet"
	`luckysheet.setSheetName("CellSheet")`

------------

### setSheetColor(color [,setting])

- **参数**：
	
	- {String} [color]: 工作表颜色
	- {PlainObject} [setting]: 可选参数
        + {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置工作表名称处的颜色

- **示例**:

	- 修改当前工作表名称处的颜色为红色
	`luckysheet.setSheetColor("#ff0000")`

------------

### setSheetMove(type [,setting])

- **参数**：

    - {String | Number} [type]: 工作表移动方向或者移动的目标下标，
		
		`type`可能的值有：
		
		+ `"left"`: 向左
		+ `"right"`: 向右
		+ `1`/`2`/`3`/...: 指定下标
	- {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表向左边或右边移动一个位置，或者指定下标，返回指定的工作表对象

- **示例**:

	- 当前工作表向左移动一个位置
	`luckysheet.setSheetMove("left")`
	- 第二个工作表移动到第四个工作表的下标位置
	`luckysheet.setSheetMove(3,{order:1})`

------------

### setSheetOrder(orderList [,setting])

- **参数**：

    - {Array} [orderList]: 工作表顺序，设置工作表的index和order来指定位置，如：
	
	```json
	[
		{index:'sheet_01',order: 2},
		{index:'sheet_02',order: 1},
		{index:'sheet_03',order: 0},
	]
	```
	数组中顺序并不重要，关键是指定sheet index和order的对应关系。

	- {PlainObject} [setting]: 可选参数
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	重新排序所有工作表的位置，指定工作表顺序的数组。


- **示例**:

	- 重排工作表，此工作簿含有3个工作表
	```js
	luckysheet.setSheetOrder([
		{index:'sheet_01',order: 2},
		{index:'sheet_02',order: 1},
		{index:'sheet_03',order: 0},
	])
	```

------------

### setSheetZoom(zoom [,setting])

- **参数**：

    - {Number} [zoom]: 工作表缩放比例，值范围为0.1 ~ 4；

	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置工作表缩放比例


- **示例**:

	- 设置当前工作表缩放比例为0.5
	```js
	luckysheet.setSheetZoom(0.5)
	```

------------

### showGridLines([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 需要显示网格线的工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	显示指定下标工作表的网格线，返回操作的工作表对象

- **示例**:

	- 显示当前工作表的网格线
	`luckysheet.showGridLines()`
	- 显示第三个工作表的网格线
	`luckysheet.showGridLines({order:2})`

------------

### hideGridLines([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Number} [order]: 需要隐藏网格线的工作表下标；默认值为当前工作表下标
    	+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	隐藏指定下标工作表的网格线，返回操作的工作表对象

- **示例**:

	- 隐藏当前工作表的网格线
	`luckysheet.hideGridLines()`
	- 隐藏第三个工作表的网格线
	`luckysheet.hideGridLines({order:2})`

------------

## 工作簿操作

### create(options)

- **参数**：
	
	- {Object} [options]:表格的所有配置信息

- **说明**：
	
	初始化一个Luckysheet，可包含多个工作表，参考 [配置列表](/zh/guide/config.html)

------------

### refresh([setting])

- **参数**：
	
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 表格刷新成功后的回调函数

- **说明**：
	
	刷新canvas

------------

### scroll([setting])

- **参数**：
	
	- {PlainObject} [setting]: 可选参数
		+ {Number} [scrollLeft]：横向滚动值。默认为当前横向滚动位置。
		+ {Number} [scrollTop]：纵向滚动值。默认为当前纵向滚动位置。
		+ {Number} [targetRow]：纵向滚动到指定的行号。默认为当前纵向滚动位置。
		+ {Number} [targetColumn]：横向滚动到指定的列号。默认为当前横向滚动位置。
		+ {Function} [success]: 表格刷新成功后的回调函数

- **说明**：
	
	滚动当前工作表位置

------------

### resize([setting])

- **参数**：
		
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	根据窗口大小自动resize画布

------------

### destroy([setting])

- **参数**：
	
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 表格释放成功后的回调函数

- **说明**：
	
	删除并释放表格

------------

### getScreenshot([setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
		+ {Object | String} [range]: 选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区

- **说明**：
	
	返回当前表格指定选区截图后生成的base64格式的图片

------------

### setWorkbookName(name [,setting])

- **参数**：

    - {String} [name]: 工作簿名称
    - {PlainObject} [setting]: 可选参数
    	+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	设置工作簿名称

------------

### getWorkbookName([,setting])

- **参数**：

    - {PlainObject} [setting]: 可选参数
    	+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	获取工作簿名称

------------

### undo([setting])

- **参数**：

	- {PlainObject} [setting]: 可选参数
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	撤销当前操作，返回刚刚撤销的操作对象

------------

### redo([setting])

- **参数**：

	- {PlainObject} [setting]: 可选参数
        + {Function} [success]: 操作结束的回调函数

- **说明**：
	
	重做当前操作，返回刚刚重做的操作对象

------------

### refreshFormula([success])

- **参数**：

	- {Function} [success]: 操作结束的回调函数

- **说明**：
	
	强制刷新公式。当你直接修改了多个单元格的值，且没有触发刷新，且这些单元格跟公式相关联，则可以使用这个api最后强制触发一次公式刷新。

------------

### pagerInit([setting])

- **参数**：

	- {PlainObject} [setting]: 参数配置
		+ {Number} 		[pageIndex]:  当前的页码（必填）。
		+ {Number} 		[pageSize]:   每页显示多少条数据（必填）。
		+ {Number} 		[total]:  总条数（必填）。
		+ {Boolean} 	[showTotal]:  是否显示总数，默认关闭：false。
		+ {Boolean} 	[showSkip]:  是否显示跳页，默认关闭：false。
		+ {Boolean} 	[showPN]:  是否显示上下翻页，默认开启：true。
		+ {Array} 		[selectOption]:  选择分页的条数。
		+ {String} 		[prevPage]:  上翻页文字描述，默认"上一页"。
		+ {String} 		[nextPage]:  下翻页文字描述，默认"下一页"。
		+ {String} 		[totalTxt]:  数据总条数文字描述，默认"总共：{total}"。



- **说明**：
	
	初始化分页器。ps：create阶段，可以直接配置options.pager参数，渲染阶段会将options.pager作为参数来初始化分页器，可通过钩子函数onTogglePager来监听页码的切换

### refreshMenuButtonFocus([data],[r],[c],[success])

- **参数**：

	- {Array}  [data]: 操作数据
	- {Number} [r]: 指定的行
	- {Number} [c]: 指定的列
	- {Function} [success]: 操作结束的回调函数

- **说明**：
	
	刷新指定单元格的顶部状态栏状态。

------------

### checkTheStatusOfTheSelectedCells(type,status)

- **参数**：

	- {String} type: 类型
	- {String} status: 目标状态值

- **说明**：
	
	检查选区内所有cell指定类型的状态是否满足条件（主要是粗体、斜体、删除线和下划线等等）。

------------

## 图表

### insertChart([setting])

[todo]


- **参数**：

    - {PlainObject} [setting]: 可选参数
		+ {Array | Object | String} [range]: 图表数据的选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表指定选区范围生成一个图表，返回图表参数对象，包含图表唯一标识符chart id

------------

### setChart(chartId, attr, value [,setting])

[todo]


- **参数**：
	
	- {String} [chartId]: 指定要修改的图表id
	- {String} [attr]: 属性类型
		
		`attr`可能的值有：
		
		+ `"left"`: 左边到工作表边缘的距离
		+ `"top"`: 上边到工作表边缘的距离
		+ `"width"`: 图表外框的宽度
		+ `"height"`: 图表外框的高度
		+ `"chartOptions"`: 图表的详细设置项
    
	- {Number | Object}} [value]: 属性值，当`attr`为`chartOptions`时，直接设置整个chart的配置对象
	
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	修改指定id图表的参数，返回修改后的整个图表参数

------------

### getChart(chartId)

[todo]


- **参数**：
	
	- {String} [chartId]: 指定要获取的图表id

- **说明**：
	
	获取指定id图表的参数

------------

### deleteChart(chartId [,setting])

[todo]


- **参数**：
	
	- {String} [chartId]: 要删除的图表id
	
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	删除指定id图表，返回被删除的图表的参数

------------

## 数据验证

### setDataVerification(optionItem, [setting])

- **参数**：
	
	- {Object} [optionItem]: 数据验证的配置信息，具体详细的配置信息参考[dataVerification](/zh/guide/sheet.html#dataVerification)
		
    - {PlainObject} [setting]: 可选参数
        + {Object | String} [range]: 数据验证的选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表范围设置数据验证功能，并设置参数

------------

### deleteDataVerification([setting])

- **参数**：
	
    - {PlainObject} [setting]: 可选参数
		+ {Object | String} [range]: 数据验证的选区范围,支持选区的格式为`"A1:B2"`、`"sheetName!A1:B2"`或者`{row:[0,1],column:[0,1]}`，只能为单个选区；默认为当前选区
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表范围删除数据验证功能

------------

## 图片

### insertImage(src, [setting])

- **参数**：

	- {String} [src]: 图片src
	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Number} [rowIndex]: 要插入图片的单元格行下标；默认为当前选区聚焦单元格行下标 || 0
		+ {Number} [colIndex]: 要插入图片的单元格列下标；默认为当前选区聚焦单元格列下标 || 0
		+ {Function} [success]: 操作结束的回调函数

- **说明**：

	在指定的工作表中指定单元格位置插入图片

### deleteImage([setting])

- **参数**：

	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {String | Array} [idList]: 要删除图片的id集合，也可为字符串`"all"`，all为所有的字符串；默认为`"all"`
		+ {Function} [success]: 操作结束的回调函数

- **说明**：

	删除指定工作表中的图片

### getImageOption([setting])

- **参数**：

	- {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：

	获取指定工作表的图片配置

## 工作表保护


### setProtection(option, [setting])

[todo]

- **参数**：
	
	- {Object} [option]: 工作表保护的配置信息
    - {PlainObject} [setting]: 可选参数
		+ {Number} [order]: 工作表下标；默认值为当前工作表下标
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	指定工作表设置工作表保护功能

------------

## 工具方法

### transToCellData(data [,setting])<div id='transToCellData'></div>

- **参数**：
	
	- {Array} [data]: data数据
	
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	data => celldata ，data二维数组数据转化成 {r, c, v}格式一维数组

------------

### transToData(celldata [,setting])<div id='transToData'></div>

- **参数**：
	
	- {Array} [celldata]: data数据
	
	- {PlainObject} [setting]: 可选参数
		+ {Function} [success]: 操作结束的回调函数

- **说明**：
	
	celldata => data ，celldata一维数组数据转化成表格所需二维数组

------------

### toJson()


- **说明**：
	
	导出的json字符串可以直接当作`luckysheet.create(options)`初始化工作簿时的参数`options`使用，使用场景在用户自己操作表格后想要手动保存全部的参数，再去别处初始化这个表格使用，类似一个luckysheet专有格式的导入导出。

------------

### changLang([lang])

- **参数**：

	+ {String} [lang]: 语言类型；暂支持`"zh"`、`"en"`、`"es"`；默认为`"zh"`；

- **说明**：

	传入目标语言，切换到对应的语言界面

### closeWebsocket()

- **说明**：

	关闭websocket连接

### openSearchDialog()

- **说明**：

  打开搜索/替换弹窗

### getRangeByTxt([txt])

- **说明**：
	
	将字符串格式的工作表范围转换为数组形式

- **参数**：

  	+ {String} [txt]: 选区范围,支持选区的格式为`"A1:B2"`或者指定工作表名称的写法`"sheetName!A1:B2"`，只支持单个选区；默认为当前最后一个选区

- **示例**:

	- 当前选区为`A1:B2`，`luckysheet.getRangeByTxt()`返回：`{column: (2) [0, 1],row: (2) [0, 1]}`
	- `luckysheet.getRangeByTxt("A1:B2")`返回：`{column: (2) [0, 1],row: (2) [0, 1]}`
    - `luckysheet.getRangeByTxt("Cell!A1:B2")`返回：`{column: (2) [0, 1],row: (2) [0, 1]}`

------------

### getTxtByRange([range])

- **说明**：
	
	将数组格式的工作表范围转换为字符串格式的形式

- **参数**：

  	+ {Array | Object} [range]: 选区范围,支持选区的格式为`{row:[0,1],column:[0,1]}`，允许多个选区组成的数组；默认为当前选区

- **示例**:

	- 当前选区为`A1:B3`，`luckysheet.getTxtByRange()`返回：当前选区`"A1:B3"`
	- `luckysheet.getTxtByRange({column:[0,1],row:[0,2]})`返回：`"A1:B3"`
	- `luckysheet.getTxtByRange([{column:[0,1],row:[0,2]}])`返回：`"A1:B3"`
	- `luckysheet.getTxtByRange([{column:[0,1],row:[0,2]},{column:[1,1],row:[1,2]}])`返回：`"A1:B3,B2:B3"`

------------


## 旧版API

::: warning
为保持兼容性，仍然支持旧版API，但是已不推荐使用。
:::

### getcellvalue([r] [,c] [,data] [,type])

- **参数**：
	
	- {Number} [r]:单元格所在行数；可选值；从0开始的整数，0表示第一行
	- {Number} [c]:单元格所在列数；可选值；从0开始的整数，0表示第一列
	- {Array} [data]:表数据，二维数组；可选值；默认值为当前表格数据
	- {String} [type]:单元格属性值；可选值；默认值为'v',表示获取单元格的实际值

- **说明**：

	此方法为获取单元格的值。

	- luckysheet.getcellvalue()：返回当前工作表的所有数据；
	- luckysheet.getcellvalue(0)：返回当前工作表第1行数据；
	- luckysheet.getcellvalue(null,0)：返回当前工作表第1列数据；
	- luckysheet.getcellvalue(0,0)：返回当前工作表第1行第1列单元格的数据的v值；
	- luckysheet.getcellvalue(1,1,null,'m'): 返回指定data数据的第2行第2列单元格的原始值。
	
	特殊情况：单元格格式为yyyy-MM-dd，type为'v'时会强制取'm'显示值

	> 推荐使用新API： <a href='#getCellValue'>getCellValue</a>

------------

### getluckysheetfile()

- **说明**：

	返回所有表格数据结构的一维数组`luckysheetfile`

	> 推荐使用新API： [getLuckysheetfile](#getLuckysheetfile())

------------

### getconfig()

- **说明**：

	快捷返回当前表格config配置，每个工作表的config信息仍然包含在luckysheetfile。
	
	> 推荐使用新API： [getConfig](#getConfig([setting]))

------------

### getluckysheet_select_save()

- **说明**：

	返回当前选区对象的数组，可能存在多个选区。

	> 推荐使用新API： [getRange](#getRange())

------------

### getdatabyselection([range] [,sheetOrder])

- **参数**：
	
	- {Object} [range]：选区对象，`object: { row: [r1, r2], column: [c1, c2] }`；默认为当前第一个选区。
	- {Number} [sheetOrder]：表格下标，从0开始的整数，0表示第一个表格；默认为当前表格下标。

- **说明**：

	返回某个表格第一个选区的数据。
	- `luckysheet.getdatabyselection()`: 返回当前工作表当前选区的数据
	- `luckysheet.getdatabyselection(null,1)`: 返回第2个工作表的当前选区的数据

	> 推荐使用新API： [getRangeValue](#getRangeValue([setting]))

------------

### luckysheetrefreshgrid(scrollWidth, scrollHeight)

- **参数**：
	
	- {Number} [scrollWidth]：横向滚动值。默认为当前横向滚动位置。
	- {Number} [scrollHeight]：纵向滚动值。默认为当前纵向滚动位置。

- **说明**：

	按照scrollWidth, scrollHeight刷新canvas展示数据。

	> 推荐使用新API： [scroll](/zh/guide/api.html#scroll-setting)
------------

### setcellvalue(r, c, d, v)

- **参数**：
	
	- {Number} [r]：单元格所在行数；从0开始的整数，0表示第一行。
	- {Number} [c]：单元格所在列数；从0开始的整数，0表示第一列。
	- {Array} [d]：表数据；可选值；二维数组。
	- {Object | String | Number} [v]：要设置的值；可为对象，对象是是要符合单元格对象格式。

- **说明**：

	设置某个单元格的值。可配合`luckysheet.jfrefreshgrid()`刷新查看单元格值改变。

	```js
	luckysheet.setcellvalue(0, 0, luckysheet.flowdata(), 'abc');
	luckysheet.jfrefreshgrid();
	```

------------

### jfrefreshgrid()

- **说明**：

	刷新canvas

	> 推荐使用新API： [refresh](#refresh([setting]))
	
------------

### setluckysheet_select_save(v)

- **参数**：
	
	- {Array} [v]：要设置的选区值(数组)。符合选区格式规则，如`[{ row: [r1, r2], column: [c1, c2] }]`。

- **说明**：
	
	设置当前表格选区的值。配合`luckysheet.selectHightlightShow()`可在界面查看选区改变。
	```js
	luckysheet.setluckysheet_select_save([{ row: [0, 1], column: [0, 1] }]);
	luckysheet.selectHightlightShow();
	```

	> 推荐使用新API：<a href='#setRangeShow'>setRangeShow</a>
	
------------

### selectHightlightShow()

- **说明**：

	高亮当前选区

	> 推荐使用新API：<a href='#setRangeShow'>setRangeShow</a>

------------

### flowdata()

- **说明**：
	
	快捷获取当前表格的数据

	> 推荐使用新API：[getSheetData](#getSheetData())

------------

### buildGridData(file)

- **参数**：
	
	- {Object} [file]：[luckysheetfile](/zh/guide/sheet.html)

- **说明**：
	
	生成表格可以识别的二维数组

	> 推荐使用新API：<a href='#transToData'>transToData</a>

------------

### getGridData(data)

- **参数**：
	
	- {Array} [data]：工作表的二维数组数据

- **说明**：
	
	二维数组数据转化成 `{r, c, v}` 格式 一维数组

	> 推荐使用新API：<a href='#transToCellData'>transToCellData</a>
