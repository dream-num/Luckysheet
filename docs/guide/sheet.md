# Sheet Configuration

## Initial
if you want to initial the `options`, you need to arrange every sheet data to `options.data`

> when the initialization is done, you can use [`luckysheet.getAllSheets()`](/zh/guide/api.html#getAllSheets([setting])) to get all working sheet configurations.

eg: options.data：
```json
[
    {
        "name": "Cell", //Worksheet name
        "color": "", //Worksheet color
        "index": 0, //Worksheet index
        "status": 1, //Worksheet active status
        "order": 0, //The order of the worksheet
        "hide": 0,//Whether worksheet hide 
        "row": 36, //the number of rows in a sheet
        "column": 18, //the number of columns in a sheet
        "celldata": [], //Initial the cell data
        "config": {
            "merge":{}, //merged cells
            "rowlen":{}, //Table row height
            "columnlen":{}, //Table column width
            "rowhidden":{}, //hidden rows
            "colhidden":{}, //hidden columns
            "borderInfo":{}, //borders
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable":false,//Whether is pivot table
        "pivotTable":{},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "chart": [], //Chart configuration
        "allowEdit": true, //is editable
        "zoomRatio":1, // zoom ratio
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
- type：String
- default："Sheet1"
- usage：the name of a sheet

------------
### color
- type：String
- default："##f20e0e"
- usage：Sheet color, with a bottom border below the sheet name

------------
### index
- type：Number
- default：0
- usage：Worksheet index, starting from 0

------------
### status
- type：Number
- default：1
- usage：Active state, there is only one active worksheet which number will be 1 and the other worksheets are 0

------------
### order
- type：Number
- default：0
- usage： The index of the worksheets is starting from 0. it will increase when a worksheet is added.

------------
### hide
- type：Number
- default：0
- usage： is the sheet is hidden. `0` means not to hide, `1` means hide

------------
### row
- type：Number
- default：36
- usage： Number of cell rows

------------
### column
- type：Number
- default：18
- usage： The number of cell columns

------------
### celldata
- type：Array
- default：[]
- usage： 原始单元格数据集，存储sheet中所有单元格中的值，是一个包含`{r:0,c:0,v:{m:"value",v:"value",ct: {fa: "General", t: "g"}}}`格式单元格信息的一维数组，只在初始化的时候使用。

    r代表行，c代表列，v代表该单元格的值，值可以是字符、数字或者对象。

    Luckysheet在建立的时候会根据 `options.data[i].row` 和 `options.data[i].column` 的行列数量大小新建一个表格data，然后再使用 `data[r][c]=v` 的方式填充表格数据，空数据单元格以null表示。

    使用celldata初始化完表格后，数据转换为luckysheetfile中的字段[data](#data)，如`luckysheetfile[i].data`,后续操作表格的数据更新，会更新到这个data字段中，celldata不再使用。 

- example：
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
- type：Object
- default：{}
- usage：Table row height, column width, merged cells, borders, hidden rows and other settings
        please be careful, config must be empty object `{}`, rather than empty string `""` or `null`
    

#### config.merge
- type：Object
- default：{}
- usage：Merge cell settings
- example：
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
    The `key` in the object is the spliced value of `r +'_' + c`, and the `value` is the cell information in the upper left corner: r: number of rows, c: number of columns, rs: number of merged rows, cs: merge Number of columns

#### config.rowlen
- type：Object
- default：{}
- usage：The row height of each cell
- example：
    ```js
    "rowlen": {
                "0": 20,
                "1": 20,
                "2": 20
            }
    ```

#### config.columnlen
- type：Object
- default：{}
- usage：The column width of each cell
- example：
    ```js
    "columnlen": {
                "0": 97,
                "1": 115,
                "2": 128
            }
    ```

#### config.rowhidden
- type：Object
- default：{}
- usage：Hidden row information, Rows：`rowhidden[Rows]: 0`,

    you should specify the number of rows by `key`,`value` is always `0`
- example：
    ```js
    "rowhidden": {
                "30": 0,
                "31": 0
            }
    ```

#### config.colhidden
- type：Object
- default：{}
- usage：Hidden row information, Rows：`rowhidden[Rows]: 0`,
    格式为：`colhidden[列数]: 0`,

        `key`指定列数即可，`value`总是为`0`
- example：
    ```js
    "colhidden": {
                "30": 0,
                "31": 0
            }
    ```

#### config.borderInfo
- type：Object
- default：{}
- usage：单元格的边框信息
- example：
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
    The range type can be divided into single cell and selected area
    1. selection `rangeType: "range"`

       + Border type `borderType："border-left" | "border-right" | "border-top" | "border-bottom" | "border-all" | "border-outside" | "border-inside" | "border-horizontal" | "border-vertical" | "border-none"`,
       + Border thickness `style:  1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
       + Border color `color: Hexadecimal color value`
       + Selection area `range: Row and column information array`

    2. Single cell `rangeType："cell"` 
       + Number of rows and columns `value.row_index: number,value.col_index: number`
       + Four border objects `value.l:Left border,value.r:Right border,value.t:Top border,value.b:Bottom border`
       + Border thickness `value.l.style: 1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`
       + Border color `value.l.color: Hexadecimal color value`

    templates：

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
        表示设置范围为`{"row": [7, 8],"column": [2, 3]}`的选区，type为所有边框，边框粗细为`Dotted`，颜色为`"#0000ff"`

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
- type：Number
- default：0
- usage： Left and right scroll bar position

------------
### scrollTop
- type：Number
- default：0
- usage： Up and down scroll bar position

------------
### luckysheet_select_save
- type：Array
- default：[]
- usage： The selected area supports multiple selections and is a one-dimensional array containing multiple selection objects. 
- example：
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
- type：Array
- default：[]
- usage： 公式链，用于公式所链接的单元格改变后，所有引用此单元格的公式都会联动刷新
- example：
    ```js
    [{
        "r": 6, //the number of rows
        "c": 3, //the number of columns
        "index": 1, //sheet id
        "func": [true, 23.75, "=AVERAGE(D3:D6)"], //公式信息，包含公式计算结果和公式字符串
        "color": "w", //"w"：use Depth-First-Search "b":Normal search
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
- type：Boolean
- default：false
- usage： is PivotTable

------------
### pivotTable
- type：Object
- default：{}
- usage： Pivot table settings
- example：
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
- type：Object
- default：{}
- usage： Filter range, a selection area, a sheet has only one filter range, similar to the `luckysheet_select_save`
- example：
    ```js
    {
        
        "row": [ 2, 6 ],
        "column": [ 1, 3 ]
    }
    ```

------------
### filter
- type：Object
- default：{}
- usage： filter settings
- example：
    ```js
    {
        "0": {
            "caljs": { // filter type
                "value": "cellnull",
                "text": "Is empty",
                "type": "0"
            },
            "rowhidden": { "3": 0, "4": 0 }, // the hidden rows
            "optionstate": true, //is config active
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
- type：Array
- default：[]
- usage： Alternating color configuration
- example：
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
- type：Array
- default：[]
- usage：Custom alternate colors, including multiple custom alternate colors configuration
- example：
    ```js
    [{
        "head": { //页眉颜色
            "fc": "#6aa84f",
            "bc": "#ffffff"
        },
        "one": { //The first color
            "fc": "#000",
            "bc": "#ffffff"
        },
        "two": { //The second color
            "fc": "#000",
            "bc": "#e5fbee"
        },
        "foot": { //The footer color
            "fc": "#000",
            "bc": "#a5efcc"
        }
    }]
    ```

------------
### luckysheet_conditionformat_save
- type：Array
- default：[]
- usage： Conditional format configuration information, a one-dimensional array containing multiple conditional format configuration objects,

    type: "default": Highlight cell rules and project selection rules,

    "dataBar":Data bar,

    "icons":Icon set,

    "colorGradation": Color scale

    You can get more detail in this API page[API setRangeConditionalFormat](/zh/guide/api.html)
- example：
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
            "conditionName": "betweenness", //type
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
- type：Array
- default：[]
- usage： the settings of freeze row and column which is divided into 6 types冻结行列设置，分为6种type
    1. "row": the first freeze row
    2. "column": the first freeze column
    3. "both": the freeze rows and columns
    4. "rangeRow": 冻结行到选区
    5. "rangeColumn": 冻结列到选区
    6. "rangeBoth": 冻结行列到选区
    7. "cancel": cancel freeze

    当设置冻结到选区的时候，需要设置开启冻结的单元格位置，格式为`{ row_focus:0, column_focus:0 }`，意为当前激活的单元格的行数和列数。

    sheet新的配置属性，存储更语义化的配置，用于初始化和传给后端。
    
    注意一点，luckysheetfile中还有一个配置freezen，其中的freezenhorizontaldata仍然用作本地数据，但是不发给后台存储，只做本地调试。

- example：
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
- type：Array
- default：[]
- usage： Chart configuration, plz refer to chartMix configuration. Allows you to set only the desired chart properties.
- example：
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
                    "text": "default title",
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
- type：Boolean
- default：true
- usage： is this sheet editable

------------
### zoomRatio
- type：Number
- default：1
- usage： the zoom ratio of a sheet, which is a two decimal digit between 0~1, like `0.1`、`0.56`.

------------

## debug information

初始化所需要的参数，会从简洁的角度出发来考虑设计，但是本地存储的参数则不同。

Luckysheet在初始化完成之后进行的一系列操作，会将更多本地参数存储在luckysheetfile中，作为本地使用的参数，实现一些类似Store数据中心的usage。比如，freezen的参数格式也会变化。

此时的luckysheetfile包含很多非初始化使用的本地参数，可用于调试代码、本地状态分析。如下展示了更丰富luckysheetfile信息，可通过方法 `luckysheet.getluckysheetfile()`获得：

::: details
```json
[
    {
        "name": "Cell", //Worksheet name
        "color": "", //Worksheet color
        "index": 0, //Worksheet index
        "status": 1, //Worksheet active status
        "order": 0, //The order of the worksheet
        "hide": 0,//Whether worksheet hide 
        "row": 36, //the number of rows in a sheet
        "column": 18, //the number of columns in a sheet
        "celldata": [], //Initial the cell data
        "config": {
            "merge":{}, //merged cells
            "rowlen":{}, //Table row height
            "columnlen":{}, //Table column width
            "rowhidden":{}, //hidden rows
            "colhidden":{}, //hidden columns
            "borderInfo":{}, //borders
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //selected area
        "calcChain": [],//Formula chain
        "isPivotTable":false,//Whether is pivot table
        "pivotTable":{},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//condition format
        "frozen": {}, //freeze row and column configuration
        "freezen": {}, //冻结行列的渲染数据存储
        "chart": [], //Chart configuration
        "allowEdit": true, //is editable
        "zoomRatio":1, // zoom ratio
        

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
- type：Number
- default：[]
- usage： Position information of all rows, incremental row position data, No need to set up for initialization置

------------
### visibledatacolumn
- type：Number
- default：[]
- usage： Position information of all columns, incremental column position data, No need to set up for initialization

------------
### ch_width
- type：Number
- default：2322
- usage： The width of the entire worksheet area (the gray area including the border), No need to set up for initialization

------------
### rh_height
- type：Number
- default：2322
- usage： The height of the entire worksheet area (the gray area containing the border), No need to set up for initialization

------------
### load
- type：Number
- default：0
- usage： Check whether the current sheet has been loaded, internal indicator, initialization does not need to be set

------------
### data
- type：Array
- default：[]
- usage： conveted from celldata in initialization stage. `data` will have the update operation data.Initialization does not need to be set
- example：
    Here is a two row, two column data
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
