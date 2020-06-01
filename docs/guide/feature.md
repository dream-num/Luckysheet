# 高级功能

## TODO...
### api
### 创建表格
### 删除表格
### 释放表格
### 复制单元格
### 插入单元格
### 删除单元格
### 编辑器单元格

------------
## jfgrid.getcellvalue(r, c, data, type)
- **参数**：
	- r：单元格所在行数；可选值；从0开始的整数，0表示第一行。
	- c：单元格所在列数；可选值；从0开始的整数，0表示第一列。
	- data：表数据；二维数组；默认值为当前表格数据。
	- type：单元格属性值；可选值；默认值为'v',表示获取单元格的值。
- **用法**：
	
	此方法为获取单元格的值。r, c都没有值时，返回data；r, c只有一个有值时，返回整行或整列数据；

------------
## jfgrid.getjfgridfile()
- **用法**：

	返回所有表格数据结构。

------------
## jfgrid.sheetmanage.getSheetByIndex(index)
- **参数**：
	- index：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	返回某个表格数据结构。

------------
## jfgrid.getconfig()
- **用法**：

	返回当前表格config配置。

------------
## jfgrid.getSheetConfig(sheetIndex)
- **参数**：
	- sheetIndex：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	返回某个表格config配置。

------------
## jfgrid.getvisibledatarow()
- **用法**：

	返回当前表格行高。

------------
## jfgrid.getvisibledatacolumn()
- **用法**：

	返回当前表格列宽。

------------
## jfgrid.getjfgird_select_save()
- **用法**：

	返回当前选区。

------------
## jfgrid.getdatabyselection(range, sheetIndex)
- **参数**：
	- range：选区对象；object: { row: [r1, r2], column: [c1, c2] }；默认为当前选区。
	- sheetIndex：表格下标；从0开始的整数，0表示第一个表格；默认为当前表格下标。
- **用法**：

	返回某个表格某个区域单元格数据。