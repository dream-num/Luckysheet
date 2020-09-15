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
            "colhidden":{}, //隐藏列
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
        "frozen": {}, //冻结行列配置
        "chart": [], //图表配置
        "allowEdit": true, //是否允许编辑
        "zoomRatio":1, // 缩放比例
        "image":[], //图片
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

    注意，config如果为空,必须为空对象`{}`,不能为字符串或者null

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

#### config.colhidden
- 类型：Object
- 默认值：{}
- 作用：隐藏列
    格式为：`colhidden[列数]: 0`,

        `key`指定列数即可，`value`总是为`0`
- 示例：
    ```js
    "colhidden": {
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
- 作用： 公式链是一个由用户指定顺序排列的公式信息数组，Luckysheet会根据此顺序来决定公式执行的顺序。

    注意，在初始化工作簿的时候，如果有单元格包含公式，请务必添加对应单元格位置的公式链，否则Luckysheet无法识别公式。
    
- 示例：
    ```js
    [{
        "r": 6, //行数
        "c": 3, //列数
        "index": 1, //工作表id
        "func": [true, 23.75, "=AVERAGE(D3:D6)"], //公式信息，包含公式计算结果和公式字符串
        "color": "w", //"w"：采用深度优先算法 "b":普通计算
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
            "row": [0, 12],
            "column": [0, 4]
        },
        "pivotDataSheetIndex": 6, //源数据所在的sheet页
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
        "pivotDatas": [ //数据透视表的源数据
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
        
        "row": [ 2, 6 ],
        "column": [ 1, 3 ]
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
            "caljs": { // 条件筛选类型
                "value": "cellnull",
                "text": "Is empty",
                "type": "0"
            },
            "rowhidden": { "3": 0, "4": 0 }, // 隐藏行
            "optionstate": true, //是否开启配置
            "str": 2, // 范围，起始行
            "edr": 6, // 范围，结束行
            "cindex": 1, // 当前范围列索引
            "stc": 1, // 范围，起始列
            "edc": 3 // 范围，结束列
        },
        "1": {
            "caljs": {},
            "rowhidden": { "6": 0 },
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
        "cellrange": { //单元格范围
            "row": [1, 6],
            "column": [1, 5]
        },
        "format": {
            "head": { //页眉颜色
                "fc": "#000",
                "bc": "#5ed593"
            },
            "one": { //第一种颜色
                "fc": "#000",
                "bc": "#ffffff"
            },
            "two": { //第二种颜色
                "fc": "#000",
                "bc": "#e5fbee"
            },
            "foot": { //页脚颜色
                "fc": "#000",
                "bc": "#a5efcc"
            }
        },
        "hasRowHeader": false, //含有页眉
        "hasRowFooter": false //含有页脚
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
        "head": { //页眉颜色
            "fc": "#6aa84f",
            "bc": "#ffffff"
        },
        "one": { //第一种颜色
            "fc": "#000",
            "bc": "#ffffff"
        },
        "two": { //第二种颜色
            "fc": "#000",
            "bc": "#e5fbee"
        },
        "foot": { //页脚颜色
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

    API中对此设置也有介绍[API setRangeConditionalFormat](/zh/guide/api.html)
- 示例：
    ```js
    [
        {
            "type": "default",
            "cellrange": [ //应用的范围
                {
                    "row": [ 2, 7 ],
                    "column": [ 2, 2 ]
                }
            ],
            "format": { //type 为 default 时 应设置文本颜色和单元格颜色
                "textColor": "#000000",
                "cellColor": "#ff0000"
            },
            "conditionName": "betweenness", //类型
            "conditionRange": [ //条件值所在单元格
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
            ] //自定义传入的条件值
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
                    "row": [ 10, 15 ],
                    "column": [ 6, 6 ]
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
- 作用： 图表配置，参照chartMix的配置格式，允许只设置想要的图表属性，一个完整的配置案例如下。
- 示例：
    :::::: details
    ```json
    {
        "chart_id": "chart_p145W6i73otw_1596209943446",
        "width": 400,
        "height": 250,
        "left": 20,
        "top": 120,
        "sheetIndex": "Sheet_6az6nei65t1i_1596209937084",
        "needRangeShow": true,
        "chartOptions": {
            "chart_id": "chart_p145W6i73otw_1596209943446",
            "chartAllType": "echarts|line|default",
            "rangeArray": [ { "row": [ 0, 4 ], "column": [ 0, 7 ] } ],
            "rangeColCheck": { "exits": true, "range": [ 0, 0 ] },
            "rangeRowCheck": { "exits": true, "range": [ 0, 0 ] },
            "rangeConfigCheck": false,
            "defaultOption": {
                "title": {
                    "show": false,
                    "text": "默认标题",
                    "label": {
                        "fontSize": 12,
                        "color": "#333",
                        "fontFamily": "sans-serif",
                        "fontGroup": [],
                        "cusFontSize": 12
                    },
                    "position": {
                        "value": "left-top",
                        "offsetX": 40,
                        "offsetY": 50
                    }
                },
                "subtitle": {
                    "show": false,
                    "text": "",
                    "label": {
                        "fontSize": 12,
                        "color": "#333",
                        "fontFamily": "sans-serif",
                        "fontGroup": [],
                        "cusFontSize": 12
                    },
                    "distance": {
                        "value": "auto",
                        "cusGap": 40
                    }
                },
                "config": {
                    "color": "transparent",
                    "fontFamily": "Sans-serif",
                    "grid": {
                        "value": "normal",
                        "top": 5,
                        "left": 10,
                        "right": 20,
                        "bottom": 10
                    }
                },
                "legend": {
                    "show": true,
                    "selectMode": "multiple",
                    "selected": [
                        {
                            "seriesName": "衣服",
                            "isShow": true
                        },
                        {
                            "seriesName": "食材",
                            "isShow": true
                        },
                        {
                            "seriesName": "图书",
                            "isShow": true
                        }
                    ],
                    "label": {
                        "fontSize": 12,
                        "color": "#333",
                        "fontFamily": "sans-serif",
                        "fontGroup": [],
                        "cusFontSize": 12
                    },
                    "position": {
                        "value": "left-top",
                        "offsetX": 40,
                        "offsetY": 50,
                        "direction": "horizontal"
                    },
                    "width": {
                        "value": "auto",
                        "cusSize": 25
                    },
                    "height": {
                        "value": "auto",
                        "cusSize": 14
                    },
                    "distance": {
                        "value": "auto",
                        "cusGap": 10
                    },
                    "itemGap": 10,
                    "data": [
                        "Mon",
                        "Tues",
                        "Wed",
                        "Thur",
                        "Fri",
                        "Sat",
                        "Sun"
                    ]
                },
                "tooltip": {
                    "show": true,
                    "label": {
                        "fontSize": 12,
                        "color": "#333",
                        "fontFamily": "sans-serif",
                        "fontGroup": [],
                        "cusFontSize": 12
                    },
                    "backgroundColor": "rgba(50,50,50,0.7)",
                    "triggerOn": "mousemove",
                    "triggerType": "item",
                    "axisPointer": {
                        "type": "line",
                        "style": {
                            "color": "#555",
                            "width": "normal",
                            "type": "solid"
                        }
                    },
                    "format": [
                        {
                            "seriesName": "衣服",
                            "prefix": "",
                            "suffix": "",
                            "ratio": 1,
                            "digit": "auto"
                        },
                        {
                            "seriesName": "食材",
                            "prefix": "",
                            "suffix": "",
                            "ratio": 1,
                            "digit": "auto"
                        },
                        {
                            "seriesName": "图书",
                            "prefix": "",
                            "suffix": "",
                            "ratio": 1,
                            "digit": "auto"
                        }
                    ],
                    "position": "auto"
                },
                "axis": {
                    "axisType": "xAxisDown",
                    "xAxisUp": {
                        "show": false,
                        "title": {
                            "showTitle": false,
                            "text": "",
                            "nameGap": 15,
                            "rotate": 0,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "fzPosition": "end"
                        },
                        "name": "显示X轴",
                        "inverse": false,
                        "tickLine": {
                            "show": true,
                            "width": 1,
                            "color": "auto"
                        },
                        "tick": {
                            "show": true,
                            "position": "outside",
                            "length": 5,
                            "width": 1,
                            "color": "auto"
                        },
                        "tickLabel": {
                            "show": true,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "rotate": 0,
                            "prefix": "",
                            "suffix": "",
                            "optimize": 0,
                            "distance": 0,
                            "min": "auto",
                            "max": "auto",
                            "ratio": 1,
                            "digit": "auto"
                        },
                        "netLine": {
                            "show": false,
                            "width": 1,
                            "type": "solid",
                            "color": "auto",
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            }
                        },
                        "netArea": {
                            "show": false,
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            },
                            "colorOne": "auto",
                            "colorTwo": "auto"
                        },
                        "axisLine": {
                            "onZero": false
                        }
                    },
                    "xAxisDown": {
                        "show": true,
                        "title": {
                            "showTitle": false,
                            "text": "",
                            "nameGap": 15,
                            "rotate": 0,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "fzPosition": "end"
                        },
                        "name": "显示X轴",
                        "inverse": false,
                        "tickLine": {
                            "show": true,
                            "width": 1,
                            "color": "auto"
                        },
                        "tick": {
                            "show": true,
                            "position": "outside",
                            "length": 5,
                            "width": 1,
                            "color": "auto"
                        },
                        "tickLabel": {
                            "show": true,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "rotate": 0,
                            "prefix": "",
                            "suffix": "",
                            "optimize": 0,
                            "distance": 0,
                            "min": null,
                            "max": null,
                            "ratio": 1,
                            "digit": "auto"
                        },
                        "netLine": {
                            "show": false,
                            "width": 1,
                            "type": "solid",
                            "color": "auto",
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            }
                        },
                        "netArea": {
                            "show": false,
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            },
                            "colorOne": "auto",
                            "colorTwo": "auto"
                        },
                        "data": [
                            "BUS",
                            "UBER",
                            "TAXI",
                            "SUBWAY"
                        ],
                        "type": "category"
                    },
                    "yAxisLeft": {
                        "show": true,
                        "title": {
                            "showTitle": false,
                            "text": "",
                            "nameGap": 15,
                            "rotate": 0,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "fzPosition": "end"
                        },
                        "name": "显示Y轴",
                        "inverse": false,
                        "tickLine": {
                            "show": true,
                            "width": 1,
                            "color": "auto"
                        },
                        "tick": {
                            "show": true,
                            "position": "outside",
                            "length": 5,
                            "width": 1,
                            "color": "auto"
                        },
                        "tickLabel": {
                            "show": true,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "rotate": 0,
                            "formatter": {
                                "prefix": "",
                                "suffix": "",
                                "ratio": 1,
                                "digit": "auto"
                            },
                            "split": 5,
                            "min": null,
                            "max": null,
                            "prefix": "",
                            "suffix": "",
                            "ratio": 1,
                            "digit": "auto",
                            "distance": 0
                        },
                        "netLine": {
                            "show": false,
                            "width": 1,
                            "type": "solid",
                            "color": "auto",
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            }
                        },
                        "netArea": {
                            "show": false,
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            },
                            "colorOne": "auto",
                            "colorTwo": "auto"
                        },
                        "type": "value"
                    },
                    "yAxisRight": {
                        "show": false,
                        "title": {
                            "showTitle": false,
                            "text": "",
                            "nameGap": 15,
                            "rotate": 0,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "fzPosition": "end"
                        },
                        "name": "显示Y轴",
                        "inverse": false,
                        "tickLine": {
                            "show": true,
                            "width": 1,
                            "color": "auto"
                        },
                        "tick": {
                            "show": true,
                            "position": "outside",
                            "length": 5,
                            "width": 1,
                            "color": "auto"
                        },
                        "tickLabel": {
                            "show": true,
                            "label": {
                                "fontSize": 12,
                                "color": "#333",
                                "fontFamily": "sans-serif",
                                "fontGroup": [],
                                "cusFontSize": 12
                            },
                            "rotate": 0,
                            "formatter": {
                                "prefix": "",
                                "suffix": "",
                                "ratio": 1,
                                "digit": "auto"
                            },
                            "split": 5,
                            "min": null,
                            "max": null,
                            "prefix": "",
                            "suffix": "",
                            "ratio": 1,
                            "digit": "auto",
                            "distance": 0
                        },
                        "netLine": {
                            "show": false,
                            "width": 1,
                            "type": "solid",
                            "color": "auto",
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            }
                        },
                        "netArea": {
                            "show": false,
                            "interval": {
                                "value": "auto",
                                "cusNumber": 0
                            },
                            "colorOne": "auto",
                            "colorTwo": "auto"
                        }
                    }
                }
            }
        },
        "isShow": true
    }
    ```
    :::

------------
### allowEdit
- 类型：Boolean
- 默认值：true
- 作用： 此sheet页是否允许编辑

------------
### zoomRatio
- 类型：Number
- 默认值：1
- 作用： 此sheet页的缩放比例，为0~1之间的二位小数数字。比如`0.1`、`0.56`

------------
### image
- 类型：Array
- 默认值：[]
- 作用： 插入表格中图片信息，包含图片地址、宽高、位置、裁剪等信息
- 示例：
    以下为一个`imageItem`案例，通常一个工作表中可能存在多个图片，所以`image`的格式为数组`[imageItem,imageItem,...]`
    ```json
    {
        type: '3',  //1移动并调整单元格大小 2移动并且不调整单元格的大小 3不要移动单元格并调整其大小
        src: '',  //图片url
        originWidth: 1484,  //图片原始宽度
        originHeight: 834,  //图片原始高度
        default: {
            width: 293,  //图片 宽度
            height: 196,  //图片 高度
            left: 409,  //图片离表格左边的 位置
            top: 248,  //图片离表格顶部的 位置
        },
        crop: {
            width: 293,  //图片裁剪后 宽度
            height: 196,  //图片裁剪后 高度
            offsetLeft: 0,  //图片裁剪后离未裁剪时 左边的位移
            offsetTop: 0,  //图片裁剪后离未裁剪时 顶部的位移
        },
        isFixedPos: false,  //固定位置
        fixedLeft: 507,  //固定位置 左位移
        fixedTop: 141,  //固定位置 右位移
        border: {
            width: 0,  //边框宽度
            radius: 0,  //边框半径
            style: 'solid',  //边框类型
            color: '#000',  //边框颜色
        }
    }
    ```
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
            "colhidden":{}, //隐藏列
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
        "frozen": {}, //冻结行列配置
        "freezen": {}, //冻结行列的渲染数据存储
        "chart": [], //图表配置
        "allowEdit": true, //是否允许编辑
        "zoomRatio":1, // 缩放比例
        

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
