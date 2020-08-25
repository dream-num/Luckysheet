# 工作表配置

## 初始化配置
表格初始化配置`options`时，需要配置一个由每个工作表参数组成的一维数组，赋给`options.data`。

> 表格初始化完成之后，通过方法[`luckysheet.getAllSheets()`](/zh/guide/api.html#getAllSheets([setting]))可以获取所有工作表的配置信息。

options.data示例如下：
```json
[
    {
        "name": "Cell", //工作表名称
        "color": "", //工作表颜色
        "index": 0, //工作表索引
        "status": 1, //激活状态
        "order": 0, //工作表的顺序
        "hide": 0,//是否隐藏
        "row": 36, //行数
        "column": 18, //列数
        "celldata": [], //初始化使用的单元格数据
        "config": {
            "merge":{}, //合并单元格
            "rowlen":{}, //表格行高
            "columnlen":{}, //表格列宽
            "rowhidden":{}, //隐藏行
            "columnhidden":{}, //隐藏列
            "borderInfo":{}, //边框
        },
        "scrollLeft": 0, //左右滚动条位置
        "scrollTop": 315, //上下滚动条位置
        "luckysheet_select_save": [], //选中的区域
        "calcChain": [],//公式链
        "isPivotTable":false,//是否数据透视表
        "pivotTable":{},//数据透视表设置
        "filter_select": {},//筛选范围
        "filter": null,//筛选配置
        "luckysheet_alternateformat_save": [], //交替颜色
        "luckysheet_alternateformat_save_modelCustom": [], //自定义交替颜色	
        "luckysheet_conditionformat_save": {},//条件格式
        "frozen": {}, //冻结行列
        "chart": [], //图表配置
    },
    {
        "name": "Sheet2",
        "color": "",
        "index": 1,
        "status": 0,
        "order": 1,
        "celldata": [],
        "config": {}
    },
    {
        "name": "Sheet3",
        "color": "",
        "index": 2,
        "status": 0,
        "order": 2,
        "celldata": [],
        "config": {},
    }
]
```
        
### name
- 类型：String
- 默认值："Sheet1"
- 作用：工作表名称

------------
### color
- 类型：String
- 默认值："##f20e0e"
- 作用：工作表颜色,工作表名称下方会有一条底部边框

------------
### index
- 类型：Number
- 默认值：0
- 作用：工作表索引，从0开始

------------
### status
- 类型：Number
- 默认值：1
- 作用： 激活状态，仅有一个激活状态的工作表，其他工作表为 0

------------
### order
- 类型：Number
- 默认值：0
- 作用： 工作表的索引，新增工作表时会递增，从0开始

------------
### hide
- 类型：Number
- 默认值：0
- 作用： 是否隐藏，`0`为不隐藏，`1`为隐藏

------------
### row
- 类型：Number
- 默认值：36
- 作用： 单元格行数

------------
### column
- 类型：Number
- 默认值：18
- 作用： 单元格列数

------------
### celldata
- 类型：Array
- 默认值：[]
- 作用： 原始单元格数据集，存储sheet中所有单元格中的值，是一个包含`{r:0,c:0,v:{m:"value",v:"value",ct: {fa: "General", t: "g"}}}`格式单元格信息的一维数组，只在初始化的时候使用。

    r代表行，c代表列，v代表该单元格的值，值可以是字符、数字或者对象。

    Luckysheet在建立的时候会根据 `options.data[i].row` 和 `options.data[i].column` 的行列数量大小新建一个表格data，然后再使用 `data[r][c]=v` 的方式填充表格数据，空数据单元格以null表示。

    使用celldata初始化完表格后，数据转换为luckysheetfile中的字段[data](#data)，如`luckysheetfile[i].data`,后续操作表格的数据更新，会更新到这个data字段中，celldata不再使用。 

- 示例：
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
> 详细了解 [单元格格式](/zh/guide/cell.html)

------------
### config
- 类型：Object
- 默认值：{}
- 作用：表格行高、列宽、合并单元格、边框、隐藏行等设置

#### config.merge
- 类型：Object
- 默认值：{}
- 作用：合并单元格设置
- 示例：
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

#### config.rowlen
- 类型：Object
- 默认值：{}
- 作用：每个单元格的行高
- 示例：
    ```js
    "rowlen": {
                "0": 20,
                "1": 20,
                "2": 20
            }
    ```

#### config.columnlen
- 类型：Object
- 默认值：{}
- 作用：每个单元格的列宽
- 示例：
    ```js
    "columnlen": {
                "0": 97,
                "1": 115,
                "2": 128
            }
    ```

#### config.rowhidden
- 类型：Object
- 默认值：{}
- 作用：隐藏行信息，格式为：`rowhidden[行数]: 0`,

    `key`指定行数即可，`value`总是为`0`
- 示例：
    ```js
    "rowhidden": {
                "30": 0,
                "31": 0
            }
    ```

#### config.columnhidden
- 类型：Object
- 默认值：{}
- 作用：隐藏列
    格式为：`columnhidden[列数]: 0`,

        `key`指定列数即可，`value`总是为`0`
- 示例：
    ```js
    "columnhidden": {
                "30": 0,
                "31": 0
            }
    ```

#### config.borderInfo
- 类型：Object
- 默认值：{}
- 作用：单元格的边框信息
- 示例：
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

        + 边框类型 `borderType："border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border-horizontal" | "border-vertical" | "border-none"`，
        + 边框粗细 `style:  1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
        + 边框颜色 `color: 16进制颜色值`
        + 选区范围 `range: 行列信息数组`

    2. 单个单元格 `rangeType："cell"` 
        + 单元格的行数和列数索引 `value.row_index: 数字，value.col_index: 数字`
        + 四个边框对象 `value.l:左边框，value.r:右边框，value.t:上边框，value.b:下边框`
        + 边框粗细 `value.l.style: 1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
        + 边框颜色 `value.l.color: 16进制颜色值`

    更多模板：

        + ```js
        {
            "rangeType": "range",
            "borderType": "border-all",
            "style": "3",
            "color": "#0000ff",
            "range": [{
                "row": [7, 8],
                "column": [2, 3]
            }]
        }
        ```
        表示设置范围为`{"row": [7, 8],"column": [2, 3]}`的选区，类型为所有边框，边框粗细为`Dotted`，颜色为`"#0000ff"`

        + ```js
            {
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
            }
            ```
            表示设置单元格`"D4"`，上边框/下边框/左边框/右边框都是边框粗细为`"MediumDashDot"`,颜色为`"rgb(255, 0, 0)"`

------------
### scrollLeft
- 类型：Number
- 默认值：0
- 作用： 左右滚动条位置

------------
### scrollTop
- 类型：Number
- 默认值：0
- 作用： 上下滚动条位置

------------
### luckysheet_select_save
- 类型：Array
- 默认值：[]
- 作用： 选中的区域，支持多选，是一个包含多个选区对象的一维数组
- 示例：
    ```js
    [
        {
            "row": [ 0, 1 ],
            "column": [ 0, 0 ]
        },
        {
            "row": [ 3, 4 ],
            "column": [ 1, 2 ]
        },
        {
            "row": [ 1, 3 ],
            "column": [ 3, 3 ]
        }
    ]
    ```

------------
### calcChain
- 类型：Array
- 默认值：[]
- 作用： 公式链，用于公式所链接的单元格改变后，所有引用此单元格的公式都会联动刷新
- 示例：
    ```js
    [{
        "r": 6,
        "c": 3,
        "index": 1,
        "func": [true, 23.75, "=AVERAGE(D3:D6)"],
        "color": "w",
        "parent": null,
        "chidren": {},
        "times": 0
    }, {
        "r": 7,
        "c": 3,
        "index": 1,
        "func": [true, 30, "=MAX(D3:D6)"],
        "color": "w",
        "parent": null,
        "chidren": {},
        "times": 0
    }]
    ```

------------
### isPivotTable
- 类型：Boolean
- 默认值：false
- 作用： 是否数据透视表

------------
### pivotTable
- 类型：Object
- 默认值：{}
- 作用： 数据透视表设置
- 示例：
    ```js
    {
        "pivot_select_save": {
            "left": 0,
            "width": 73,
            "top": 0,
            "height": 19,
            "left_move": 0,
            "width_move": 369,
            "top_move": 0,
            "height_move": 259,
            "row": [0, 12],
            "column": [0, 4],
            "row_focus": 0,
            "column_focus": 0
        },
        "pivotDataSheetIndex": 6, //The sheet index where the source data is located
        "column": [{
            "index": 3,
            "name": "subject",
            "fullname": "subject"
        }],
        "row": [{
            "index": 1,
            "name": "student",
            "fullname": "student"
        }],
        "filter": [],
        "values": [{
            "index": 4,
            "name": "score",
            "fullname": "count:score",
            "sumtype": "COUNTA",
            "nameindex": 0
        }],
        "showType": "column",
        "pivotDatas": [
            ["count:score", "science", "mathematics", "foreign language", "English", "total"],
            ["Alex", 1, 1, 1, 1, 4],
            ["Joy", 1, 1, 1, 1, 4],
            ["Tim", 1, 1, 1, 1, 4],
            ["total", 3, 3, 3, 3, 12]
        ],
        "drawPivotTable": false,
        "pivotTableBoundary": [5, 6]
    }
    ```

------------
### filter_select
- 类型：Object
- 默认值：{}
- 作用： 筛选范围，一个选区，一个sheet只有一个筛选范围，类似`luckysheet_select_save`
- 示例：
    ```js
    {
        "left": 74,
        "width": 73,
        "top": 40,
        "height": 19,
        "left_move": 74,
        "width_move": 221,
        "top_move": 40,
        "height_move": 99,
        "row": [
            2,
            6
        ],
        "column": [
            1,
            3
        ],
        "row_focus": 2,
        "column_focus": 1
    }
    ```

------------
### filter
- 类型：Object
- 默认值：{}
- 作用： 筛选的具体设置
- 示例：
    ```js
    {
        "0": {
            "caljs": {},
            "rowhidden": {
                "3": 0,
                "4": 0
            },
            "optionstate": true,
            "str": 2,
            "edr": 6,
            "cindex": 1,
            "stc": 1,
            "edc": 3
        },
        "1": {
            "caljs": {},
            "rowhidden": {
                "6": 0
            },
            "optionstate": true,
            "str": 2,
            "edr": 6,
            "cindex": 2,
            "stc": 1,
            "edc": 3
        }
    }
    ```

------------
### luckysheet_alternateformat_save
- 类型：Array
- 默认值：[]
- 作用： 交替颜色配置
- 示例：
    ```js
    [{
        "cellrange": {
            "row": [1, 6],
            "column": [1, 5]
        },
        "format": {
            "head": {
                "fc": "#000",
                "bc": "#5ed593"
            },
            "one": {
                "fc": "#000",
                "bc": "#ffffff"
            },
            "two": {
                "fc": "#000",
                "bc": "#e5fbee"
            },
            "foot": {
                "fc": "#000",
                "bc": "#a5efcc"
            }
        },
        "hasRowHeader": false,
        "hasRowFooter": false
    }, {
        "cellrange": {
            "row": [1, 6],
            "column": [8, 12]
        },
        "format": {
            "head": {
                "fc": "#000",
                "bc": "#5599fc"
            },
            "one": {
                "fc": "#000",
                "bc": "#ffffff"
            },
            "two": {
                "fc": "#000",
                "bc": "#ecf2fe"
            },
            "foot": {
                "fc": "#000",
                "bc": "#afcbfa"
            }
        },
        "hasRowHeader": false,
        "hasRowFooter": false
    }]
    ```

------------
### luckysheet_alternateformat_save_modelCustom
- 类型：Array
- 默认值：[]
- 作用：自定义交替颜色，包含多个自定义交替颜色的配置
- 示例：
    ```js
    [{
        "head": {
            "fc": "#6aa84f",
            "bc": "#ffffff"
        },
        "one": {
            "fc": "#000",
            "bc": "#ffffff"
        },
        "two": {
            "fc": "#000",
            "bc": "#e5fbee"
        },
        "foot": {
            "fc": "#000",
            "bc": "#a5efcc"
        }
    }]
    ```

------------
### luckysheet_conditionformat_save
- 类型：Array
- 默认值：[]
- 作用： 条件格式配置信息，包含多个条件格式配置对象的一维数组，

type: "default": 突出显示单元格规则和项目选区规则，

"dataBar":数据条，

"icons":图标集，

"colorGradation": 色阶

- 示例：
    ```js
    [
        {
            "type": "default",
            "cellrange": [
                {
                    "row": [ 2, 7 ],
                    "column": [ 2, 2 ]
                }
            ],
            "format": {
                "textColor": "#000000",
                "cellColor": "#ff0000"
            },
            "conditionName": "betweenness",
            "conditionRange": [
                {
                    "row": [ 4, 4 ],
                    "column": [ 2, 2 ]
                },
                {
                    "row": [ 6, 6 ],
                    "column": [ 2, 2 ]
                }
            ],
            "conditionValue": [ 2, 4
            ]
        },
        {
            "type": "dataBar",
            "cellrange": [
                {
                    "row": [ 10, 15 ],
                    "column": [ 10, 11 ]
                }
            ],
            "format": [
                "#6aa84f",
                "#ffffff"
            ]
        },
        {
            "type": "icons",
            "cellrange": [
                {
                    "row": [ 19, 23 ],
                    "column": [ 2, 2 ]
                }
            ],
            "format": {
                "len": "3",
                "leftMin": "0",
                "top": "0"
            }
        },
        {
            "type": "colorGradation",
            "cellrange": [
                {
                    "left": 422,
                    "width": 100,
                    "top": 210,
                    "height": 20,
                    "left_move": 422,
                    "width_move": 100,
                    "top_move": 210,
                    "height_move": 125,
                    "row": [ 10, 15 ],
                    "column": [ 6, 6 ],
                    "row_focus": 10,
                    "column_focus": 6
                }
            ],
            "format": [
                "rgb(99, 190, 123)",
                "rgb(255, 235, 132)",
                "rgb(248, 105, 107)"
            ]
        }
    ]
    ```

------------
### frozen
- 类型：Array
- 默认值：[]
- 作用： 冻结行列设置，分为6种类型
    1. "row": 冻结首行
    2. "column": 冻结首列
    3. "both": 冻结行列
    4. "rangeRow": 冻结行到选区
    5. "rangeColumn": 冻结列到选区
    6. "rangeBoth": 冻结行列到选区
    7. "cancel": 取消冻结

    当设置冻结到选区的时候，需要设置开启冻结的单元格位置，格式为`{ row_focus:0, column_focus:0 }`，意为当前激活的单元格的行数和列数。

    sheet新的配置属性，存储更语义化的配置，用于初始化和传给后端。
    
    注意一点，luckysheetfile中还有一个配置freezen，其中的freezenhorizontaldata仍然用作本地数据，但是不发给后台存储，只做本地调试。

- 示例：
    - 冻结首行
    ```json
    {
        type: 'row'
    }
    ```
    - 冻结行到`'A1'`选区
     ```json
    {
        type: 'rangeRow',
        range: {row_focus: 0, column_focus: 0}
    }
    ```
    - 冻结行列到`'B2'`选区
     ```json
    {
        type: 'rangeBoth',
        range: {row_focus: 1, column_focus: 1}
    }
    ```

------------
### chart
- 类型：Array
- 默认值：[]
- 作用： 图表配置

------------

## 调试信息

初始化所需要的参数，会从简洁的角度出发来考虑设计，但是本地存储的参数则不同。

Luckysheet在初始化完成之后进行的一系列操作，会将更多本地参数存储在luckysheetfile中，作为本地使用的参数，实现一些类似Store数据中心的作用。比如，freezen的参数格式也会变化。

此时的luckysheetfile包含很多非初始化使用的本地参数，可用于调试代码、本地状态分析。如下展示了更丰富luckysheetfile信息，可通过方法 `luckysheet.getluckysheetfile()`获得：

::: details
```json
[
    {
        "name": "Cell", //工作表名称
        "color": "", //工作表颜色
        "index": 0, //工作表索引
        "status": 1, //激活状态
        "order": 0, //工作表的顺序
        "hide": 0,//是否隐藏
        "row": 36, //行数
        "column": 18, //列数
        "celldata": [], //初始化使用的单元格数据
        "config": {
            "merge":{}, //合并单元格
            "rowlen":{}, //表格行高
            "columnlen":{}, //表格列宽
            "rowhidden":{}, //隐藏行
            "columnhidden":{}, //隐藏列
            "borderInfo":{}, //边框
        },
        "scrollLeft": 0, //左右滚动条位置
        "scrollTop": 315, //上下滚动条位置
        "luckysheet_select_save": [], //选中的区域
        "calcChain": [],//公式链
        "isPivotTable":false,//是否数据透视表
        "pivotTable":{},//数据透视表设置
        "filter_select": {},//筛选范围
        "filter": null,//筛选配置
        "luckysheet_alternateformat_save": [], //交替颜色
        "luckysheet_alternateformat_save_modelCustom": [], //自定义交替颜色	
        "luckysheet_conditionformat_save": {},//条件格式
        "freezen": {}, //冻结行列
        "chart": [], //图表配置

        "visibledatarow": [], //所有行的位置
        "visibledatacolumn": [], //所有列的位置
        "ch_width": 2322, //工作表区域的宽度
        "rh_height": 949, //工作表区域的高度
        "load": "1", //已加载过此sheet的标识
        "data": [], //更新和存储使用的单元格数据
    },
    {
        "name": "Sheet2",
        "color": "",
        "index": 1,
        "status": 0,
        "order": 1,
        "celldata": [],
        "config": {}
    },
    {
        "name": "Sheet3",
        "color": "",
        "index": 2,
        "status": 0,
        "order": 2,
        "celldata": [],
        "config": {},
    }
]
```
:::

### visibledatarow
- 类型：Number
- 默认值：[]
- 作用： 所有行的位置信息，递增的行位置数据，初始化无需设置

------------
### visibledatacolumn
- 类型：Number
- 默认值：[]
- 作用： 所有列的位置信息，递增的列位置数据，初始化无需设置

------------
### ch_width
- 类型：Number
- 默认值：2322
- 作用： 整个工作表区域的宽度(包含边界的灰色区域)，初始化无需设置

------------
### rh_height
- 类型：Number
- 默认值：2322
- 作用： 整个工作表区域的高度(包含边界的灰色区域)，初始化无需设置

------------
### load
- 类型：Number
- 默认值：0
- 作用： 当前sheet是否加载过，内部标识，初始化无需设置

------------
### data
- 类型：Array
- 默认值：[]
- 作用： 初始化时从celldata转换而来，后续操作表格的数据更新，会更新到这个data字段中，初始化无需设置
- 示例：
    以下是一个二行二列的数据
    ```json
    [
        [{
            ct: {fa: "General", t: "g"},
            m:"value1",
            v:"value1"
        }, {
            ct: {fa: "General", t: "g"},
            m:"value2",
            v:"value2"
        }],
        [{
            ct: {fa: "General", t: "g"},
            m:"value3",
            v:"value3"
        }, {
            ct: {fa: "General", t: "g"},
            m:"value4",
            v:"value4"
        }]
    ]

    ```

------------
