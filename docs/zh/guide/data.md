# 表格数据

## 获取表格数据

- **配置**：

    配置 `updateUrl` 的地址，Luckysheet会通过ajax请求表格数据，默认载入status为1的sheet数据中的所有`data`，其余的sheet载入除`data`字段外的所有字段。

- **格式**：
    通过全局方法 `luckysheet.getluckysheetfile()`可以获取所有工作表的配置信息
    luckysheetfile示例如下：
    ```json
    [
        {
            "name": "Cell", //工作表名称
            "color": "", //工作表颜色
            "config": {}, //表格行高、列宽、合并单元格、边框、隐藏行等设置
            "index": "0", //工作表索引
            "chart": [], //图表配置
            "status": "1", //激活状态
            "order": "0", //工作表的顺序
            "hide": 0,//是否隐藏
            "load": "1", //是否已远程加载
            "column": 18, //列数
            "row": 36, //行数
            "celldata": [], //原始单元格数据集
            "visibledatarow": [], //所有行的位置
            "visibledatacolumn": [], //所有列的位置
            "ch_width": 2322, //工作表区域的宽度
            "rh_height": 949, //工作表区域的高度
            "scrollLeft": 0, //左右滚动条位置
            "scrollTop": 315, //上下滚动条位置
            "luckysheet_select_save": [], //选中的区域
            "luckysheet_conditionformat_save": {},//条件格式
            "calcChain": [],//公式链
            "isPivotTable":false,//是否数据透视表
            "pivotTable":{},//数据透视表设置
            "filter_select": null,//筛选范围
            "filter": null,//筛选配置
            "luckysheet_alternateformat_save": [], //交替颜色
            "luckysheet_alternateformat_save_modelCustom": []//自定义交替颜色	
        },
        {
            "name": "Sheet2",
            "color": "",
            "status": "0",
            "order": "1",
            "data": [],
            "config": {},
            "index": 1
        },
        {
            "name": "Sheet3",
            "color": "",
            "status": "0",
            "order": "2",
            "data": [],
            "config": {},
            "index": 2
        }
    ]
    ```
- **说明**：
           
    ------------
    ## name
    - 类型：String
    - 默认值："Sheet1"
    - 作用：工作表名称
    
    ------------
    ## color
    - 类型：String
    - 默认值："##f20e0e"
    - 作用：工作表颜色,工作表名称下方会有一条底部边框
    
    ------------
    ## index
    - 类型：Number
    - 默认值：0
    - 作用：工作表索引，从0开始
    
    ------------
    ## status
    - 类型：Number
    - 默认值：1
    - 作用： 激活状态，仅有一个激活状态的工作表，其他工作表为 `0`
    
    ------------
    ## order
    - 类型：Number
    - 默认值：0
    - 作用： 工作表的顺序，新增工作表时会递增，从0开始
    
    ------------
    ## hide
    - 类型：Number
    - 默认值：0
    - 作用： 是否隐藏，`0`为不隐藏，`1`为隐藏
    
    ------------
    ## load
    - 类型：Number
    - 默认值：0
    - 作用： 是否已远程加载，`0`为未远程加载，`1`为已远程加载到数据
    
    ------------
    ## column
    - 类型：Number
    - 默认值：18
    - 作用： 单元格列数
    
    ------------
    ## row
    - 类型：Number
    - 默认值：36
    - 作用： 单元格行数
    
    ------------
    ## visibledatarow
    - 类型：Number
    - 默认值：[]
    - 作用： 所有行的位置信息，递增的行位置数据
    
    ------------
    ## visibledatacolumn
    - 类型：Number
    - 默认值：[]
    - 作用： 所有列的位置信息，递增的列位置数据
    
    ------------
    ## ch_width
    - 类型：Number
    - 默认值：2322
    - 作用： 整个工作表区域的宽度(包含边界的灰色区域)
    
    ------------
    ## rh_height
    - 类型：Number
    - 默认值：2322
    - 作用： 整个工作表区域的高度(包含边界的灰色区域)
    
    ------------
    ## scrollLeft
    - 类型：Number
    - 默认值：0
    - 作用： 左右滚动条位置
    
    ------------
    ## scrollTop
    - 类型：Number
    - 默认值：0
    - 作用： 上下滚动条位置

    ------------
    ## config
    - 类型：Object
    - 默认值：{}
    - 作用：表格行高、列宽、合并单元格、边框、隐藏行等设置

    ### config.merge
    - 类型：Object
    - 默认值：{}
    - 作用：合并单元格设置,示例：
    ```js
    {
            "13_5": {
                "r": 13,
                "c": 5,
                "rs": 3,
                "cs": 1
            },
            "13_7": {
                "r": 13,
                "c": 7,
                "rs": 3,
                "cs": 2
            },
            "14_2": {
                "r": 14,
                "c": 2,
                "rs": 1,
                "cs": 2
            }
        }
    ```
    对象中的`key`为`r + '_' + c`的拼接值，`value`为左上角单元格信息: r:行数，c:列数，rs：合并的行数，cs:合并的列数

    ### config.rowlen
    - 类型：Object
    - 默认值：{}
    - 作用：每个单元格的行高,示例：
    ```js
    "rowlen": {
                "0": 20,
                "1": 20,
                "2": 20
            }
    ```

    ### config.columlen
    - 类型：Object
    - 默认值：{}
    - 作用：每个单元格的列宽,示例：
    ```js
    "columlen": {
                "0": 97,
                "1": 115,
                "2": 128
            }
    ```

    ### config.borderInfo
    - 类型：Object
    - 默认值：{}
    - 作用：单元格的边框信息,示例：
    ```js
    "borderInfo": [{
                        "rangeType": "cell",
                        "value": {
                            "row_index": 3,
                            "col_index": 3,
                            "l": {
                                "style": 10,
                                "color": "rgb(255, 0, 0)"
                            },
                            "r": {
                                "style": 10,
                                "color": "rgb(255, 0, 0)"
                            },
                            "t": {
                                "style": 10,
                                "color": "rgb(255, 0, 0)"
                            },
                            "b": {
                                "style": 10,
                                "color": "rgb(255, 0, 0)"
                            }
                        }
                    },
                    {
                        "rangeType": "range",
                        "borderType": "border-all",
                        "style": "3",
                        "color": "#0000ff",
                        "range": [{
                            "row": [7, 8],
                            "column": [2, 3]
                        }]
                    }, {
                        "rangeType": "range",
                        "borderType": "border-inside",
                        "style": "3",
                        "color": "#0000ff",
                        "range": [{
                            "row": [7, 8],
                            "column": [8, 9]
                        }]
                    }]
    ```
    范围类型分单个单元格和选区两种情况
    1. 选区 `rangeType: "range"`

        - 边框类型 `borderType："border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border-horizontal" | "border-vertical" | "border-none"`，
        - 边框粗细 `style:  1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
        - 边框颜色 `color: 16进制颜色值`
        - 选区范围 `range: 行列信息数组`
    
    2. 单个单元格 `rangeType："cell"` 
    - 行数和列数 `value.row_index: 数字，value.col_index: 数字`
    - 四个边框对象 `value.l:左边框，value.r:右边框，value.t:上边框，value.b:下边框`
    - 边框粗细 `value.l.style: 1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
    - 边框颜色 `value.l.color: 16进制颜色值`

    ### config.rowhidden
    - 类型：Object
    - 默认值：{}
    - 作用：隐藏行信息,示例：
    ```js
    "rowhidden": {
                "30": 0,
                "31": 0
            }
    ```
    - 行数：`rowhidden[行数]: 0`,`key`指定行数即可，`value`总是为`0`
    ------------
    
    ## celldata
    - 类型：Array
    - 默认值：[]
    - 作用： 原始单元格数据集，是一个包含`{r:0,c:0,v:{m:"value",v:"value",ct: {fa: "General", t: "g"}}}`格式单元格信息的一维数组，只在初始化的时候使用，使用celldata初始化完表格后，数据转换为luckysheetfile中的同级字段data，如`luckysheetfile[0].data`,后续操作表格的数据更新，会更新到这个data字段中，celldata不再使用。如果需要将data拿出来作为初始化数据，则需要执行 `luckysheet.getGridData(data)`转换为celldata数据。其中`rcv`一维数组转换为二维数组使用的是`luckysheet.buildGridData(luckysheetfile)`，传入参数为表格数据对象`luckysheetfile`，示例：
    ```js
    [{
		"r": 0,
		"c": 0,
		"v": {
			ct: {fa: "General", t: "g"},
			m:"value1",
			v:"value1"
		}
	}, {
		"r": 0,
		"c": 1,
		"v": {
			ct: {fa: "General", t: "g"},
			m:"value2",
			v:"value2"
		}
	}]
    ```
    
    ## luckysheet_select_save
    - 类型：Array
    - 默认值：[]
    - 作用： 选中的区域，支持多选，是一个包含多个选区对象的一维数组，示例：
    ```js
    
    ```

    ## chart
    - 类型：Array
    - 默认值：[]
    - 作用： 图表配置（开发中）
    
    ------------

    - `"luckysheet_select_save": []`, //选中的区域
    - `"luckysheet_conditionformat_save": {}`,//条件格式
    - `"calcChain": []`,//公式链
    - `"isPivotTable":false`,//是否数据透视表
    - `"pivotTable":{}`,//数据透视表设置
    - `"filter_select": null`,//筛选范围
    - `"filter": null`,//筛选配置
    - `"luckysheet_alternateformat_save": []`, //交替颜色
    - `"luckysheet_alternateformat_save_modelCustom": []`//自定义交替颜色	


## 获取sheet数据

- **配置**：

    配置`loadSheetUrl`的地址，参数为`gridKey`（表格主键） 和 `index`（sheet主键合集，格式为`[1,2,3]`），返回的数据为sheet的`data`字段数据集合

- **格式**：

    ```json
    {
        "1":  [{r:0, c:1, v:"值1"},{r:10, c:11, v:"值2"}],
        "2":  [data],
        "3":  [data],
    }
    ```
- **说明**：

    r代表行，c代表列，v代表该单元格的值，值可以是字符、数字或者json串。
    数据只会载入一次，一般来说都只有一个主键，但是考虑到一些公式、图表及数据透视表会引用其他sheet的数据，所以前台会加一个判断，如果该当前sheet引用了其他sheet的数据则把引用到的sheet的数据一并补全。

## 获取range范围数据

- **配置**：

    配置 `loadCellUrl` 的地址，参数为`gridKey`（表格主键） 、 `index`（sheet主键）、开始行、结束行、开始列、结束列。后台根据范围获取指定的`celldata`数据并返回。

## 更新数据

- **配置**：

    配置 `updateUrl` 的地址，发送到后台的参数为json的字符串。

- **格式**：

    ```json
    {
        compress: false, 
        gridKey:10004,
        data: [更新数据]
    }
    ```

- **说明**：

    | 参数 | 说明 | 举例 |
    | ------------ | ------------ | ------------ |
    |  compress | Luckysheet采用客户端pako进行zlib参数压缩，如果浏览器支持压缩则为true，否则为false。后台可以根据此参数决定是否解压data中的内容  | 服务端获取参数过程：1. 序列化json字符串 2. 判断compress字段如果为TRUE则解压data字段 3. 解码data字符串URLDecoder.decode(utf-8) |
    |  gridKey | Luckysheet文件的标识符 | 无 |
    |  data | 一个包含更新数据的数组，数组中的参数格式请看下面的介绍。实例中：`t`表示更新类型、`i`为sheet的索引、`c`为行号、`r`为列号，`v`为值  | `data: [{ t : 'cell', i:0, c : 0,  r : 0 , v: 2 }]` |
