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
        "defaultRowHeight": 19, //Customized default row height
        "defaultColWidth": 73, //Customized default column width
        "celldata": [], //Initial the cell data
        "config": {
            "merge":{}, //merged cells
            "rowlen":{}, //Table row height
            "columnlen":{}, //Table column width
            "rowhidden":{}, //hidden rows
            "colhidden":{}, //hidden columns
            "borderInfo":{}, //borders
            "authority":{}, //Worksheet protection
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
        "zoomRatio":1, // zoom ratio
        "image":[], //image
        "showGridLines": 1, //Whether to show grid lines
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
- type：String
- default：""
- usage：The worksheet index is used as a unique key value, and a random string is automatically assigned when a worksheet is added. Note that `index` is not the order of worksheets, and is distinguished from `order`.

------------
### status
- type：Number
- default：1
- usage：Active state, there is only one active worksheet which number will be 1 and the other worksheets are 0

------------
### order
- type：Number
- default：0
- usage：The subscript of the worksheet represents the order in which the worksheet is displayed in the sheet bar at the bottom. It will increase when a worksheet is added, starting from 0

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
- usage： Number of cell columns

------------
### defaultRowHeight
- type：Number
- default：19
- usage： Customized default row height, unit is px

------------
### defaultColWidth
- type：Number
- default：73
- usage： Customized default column width, unit is px

------------
### celldata
- type：Array
- default：[]
- usage： The original cell data set is a set containing `{r:0,c:0,v:{m:"value",v:"value",ct: {fa: "General", t: "g"}} }`The one-dimensional array of format cell information is only used during initialization.

    `r` represents the row, `c` represents the column, and `v` represents the value of the cell. value could be string, number, or object

    The luckysheet creates a sheet data based on the number of `options.data[i].row` and  `options.data[i].column`, then uses `data[r][c]=v` to fullfill tables. Empty data cells are represented as null.

    After initializing the table with celldata,the data is converted to the field [data](#data)in the luckyshetfile such as `luckysheetfile[i].data`. `data` stores the following update data and celldata will no longer be used.

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
> more detail [cell format](/zh/guide/cell.html)

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
    format：`colhidden[Cols]: 0`,

        `key` specify the number of columns,`value` is always `0`
- example：
    ```js
    "colhidden": {
                "30": 0,
                "31": 0
            }
    ```

#### config.borderInfo
- type：Array
- default：{}
- usage：The border information of the cell
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
       + Border thickness `style:  1 Thin | 2 Hair | 3 Dotted | 4 Dashed | 5 DashDot | 6 DashDotDot | 7 Double | 8 Medium | 9 MediumDashed | 10 MediumDashDot | 11 MediumDashDotDot | 12 SlantedDashDot | 13 Thick`, If it corresponds to the value of getLineStyle() of aspose.cells, you need to make a conversion yourself, refer to [aspose.cells](https://apireference.aspose.com/cells/net/aspose.cells/cellbordertype)
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
        Represents a selection with a setting range of `{"row": [7, 8], "column": [2, 3]}`, the type is all borders, the border thickness is `Dotted`, and the color is `"#0000ff"`

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
         Means to set the cell `"D4"`, the upper border/lower border/left border/right border are all border thicknesses `"MediumDashDot"`, color is `"rgb(255, 0, 0)"`

#### config.authority
- type：Object
- default：{}
- usage：Worksheet protection, you can set that the entire worksheet is not allowed to be edited or some areas are not editable. If you want to apply for editing permission, you need to enter a password, and customize the types of operations that users can operate.
- example：
    ```js        
    "authority":{//Permission configuration of the current worksheet
        selectLockedCells:1, //Select locked cells
        selectunLockedCells:1, //Select unlocked cells
        formatCells:1, //Format cells
        formatColumns:1, //Format columns
        formatRows:1, //Format rows
        insertColumns:1, //Insert columns
        insertRows:1, //Insert rows
        insertHyperlinks:1, //Insert hyperlinks
        deleteColumns:1, //Delete columns
        deleteRows:1, //Delete rows
        sort:1, //Sort
        filter:1, //Filter
        usePivotTablereports:1, //Use Pivot Table reports
        editObjects:1, //Edit objects
        editScenarios:1, //Edit scenarios   
        sheet:1, //If it is 1 or true, the worksheet is protected; if it is 0 or false, the worksheet is not protected.
        hintText:"", //The text of the pop-up prompt
        algorithmName:"None",//Encryption scheme: MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
        saltValue:null, //The salt parameter for password decryption is a random value set by yourself
        
        allowRangeList:[{ //Range protection
            name:"area", //Name
            password:"1", //Password
            hintText:"", //Prompt text
            algorithmName:"None",//Encryption scheme: MD2,MD4,MD5,RIPEMD-128,RIPEMD-160,SHA-1,SHA-256,SHA-384,SHA-512,WHIRLPOOL
            saltValue:null, //The salt parameter for password decryption is a random value set by yourself
            sqref:"$C$1:$D$5" //Protected range
        }],
    },
    ```

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
- usage： Formula chain, used when the cell linked by the formula is changed, all formulas referencing this cell will be refreshed.
- example：
    ```js
    [{
        "r": 6, //the number of rows
        "c": 3, //the number of columns
        "index": 1, //sheet id
        "func": [true, 23.75, "=AVERAGE(D3:D6)"], //Formula information, including formula calculation results and formula string
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
        "pivotDatas": [ //Source data for PivotTable
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
- usage：Filter range. A selection and a sheet have only one filter range, similar to `luckysheet_select_save`. If you just create a selection to turn on the filter function, you can configure this range. If you need to set further detailed filter conditions, you need to configure the [filter](#filter) property of the same level.
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
- usage：The specific settings of the filter match with the filter range of `filter_select`. When you create a filter area on the first sheet, you can also see the filter configuration information of the first sheet through `luckysheet.getLuckysheetfile()[0].filter`.

    The following is a complete filter configuration example
    ```js
    {   
        //"0" means the first column
        "0": {
            "caljs": { // Filter by condition
                "value": "cellnull", // Filter type
                "text": "Is empty", // Type description
                "type": "0" // Filter categories
            },
            "rowhidden": { "3": 0, "4": 0 }, // Hidden row information
            "optionstate": true, // Whether to enable configuration
            "cindex": 1, // The current range column order, here is the first column
            "str": 2, // Range, start row
            "edr": 6, // Range, end row
            "stc": 1, // Range, start column
            "edc": 3 // Range, end column
        },
        //"1" means the second column
        "1": {
            "caljs": {},
            "rowhidden": { "1": 0},
            "optionstate": true,
            "cindex": 2, // The current range column order, here is the second column
            "str": 2,
            "edr": 6,
            "stc": 1,
            "edc": 3
        }
    }
    ```
    1. The `key` value of `filter[key]` means the column index, starting from 0, the `cindex` in the specific setting item starts from 1, which has the same meaning as the `key` here.
    2. `caljs` is used to set the filter type and the corresponding value. After the setting takes effect, the hidden row information will be calculated and stored in `rowhidden`. The following are all the types that can be set, among which `value1` and `value2` are the text information filled in by the user:
       + `caljs:{value: null, text: "None", type: "0"}`
       + `caljs:{value: "cellnull", text: "Is empty", type: "0"}`
       + `caljs:{value: "cellnonull", text: "Is not empty", type: "0"}`
       + `caljs:{value: "textinclude", text: "Text contains", type: "1", value1: "Lucky"}`
       + `caljs:{value: "textnotinclude", text: "Text does not contain", type: "1", value1: "Lucky"}`
       + `caljs:{value: "textstart", text: "Text starts with", type: "1", value1: "Lucky"}`
       + `caljs:{value: "textend", text: "Text ends with", type: "1", value1: "Lucky"}`
       + `caljs:{value: "textequal", text: "Text is exactly", type: "1", value1: "Lucky"}`
       + `caljs:{value: "dateequal", text: "Date is", type: "1", value1: "2020-10-16"}`
       + `caljs:{value: "datelessthan", text: "Date is before", type: "1", value1: "2020-10-16"}`
       + `caljs:{value: "datemorethan", text: "Date is after", type: "1", value1: "2020-10-16"}`
       + `caljs:{value: "morethan", text: "Greater than", type: "1", value1: "10"}`
       + `caljs:{value: "moreequalthan", text: "Greater than or equal to", type: "1", value1: "10"}`
       + `caljs:{value: "lessthan", text: "Less than", type: "1", value1: "10"}`
       + `caljs:{value: "lessequalthan", text: "Less than or equal to", type: "1", value1: "10"}`
       + `caljs:{value: "equal", text: "Is equal to", type: "1", value1: "10"}`
       + `caljs:{value: "noequal", text: "Is not equal to", type: "1", value1: "10"}`
       + `caljs:{value: "include", text: "Is between", type: "2", value1: "15", value2: "25"}`
       + `caljs:{value: "noinclude", text: "Is not between", type: "2", value1: "15", value2: "25"}`
    3. `rowhidden` is stored hidden row information, but if `caljs` is not set to filter by conditions, it means that color filtering (if there is a color distinction between the rows) and filtering by value are set. So it can be seen that the priority of `caljs` is greater than that of `rowhidden`.
    4. `optionstate` indicates whether to enable the configuration, this is an internal flag, just set `true` directly.
    5. `cindex` represents the column order currently set, counting from 1 and corresponding to the `key` value of `filter[key]`, and the result is `key`+1.
    6. `str` is the start row, `edr` is the end row, `stc` is the start column, and `edc` is the end column. The four numbers represent the entire filter range, which should be consistent with the content of `filter_select`.

------------
### luckysheet_alternateformat_save
- type：Array
- default：[]
- usage： Alternating color configuration
- example：
    ```js
    [{
        "cellrange": { //cell range
            "row": [1, 6],
            "column": [1, 5]
        },
        "format": {
            "head": { //Header color
                "fc": "#000",
                "bc": "#5ed593"
            },
            "one": { //The first color
                "fc": "#000",
                "bc": "#ffffff"
            },
            "two": { //The second color
                "fc": "#000",
                "bc": "#e5fbee"
            },
            "foot": { //Footers color
                "fc": "#000",
                "bc": "#a5efcc"
            }
        },
        "hasRowHeader": false, //is included header
        "hasRowFooter": false //is included footer
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
        "head": { //Header color
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
            "cellrange": [ //cell range
                {
                    "row": [ 2, 7 ],
                    "column": [ 2, 2 ]
                }
            ],
            "format": { //when type is default, you should set the text color and cell color 
                "textColor": "#000000",
                "cellColor": "#ff0000"
            },
            "conditionName": "betweenness", //type
            "conditionRange": [ //condition value in the cell 
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
            ] //Customize the condition value
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
- usage： the settings of freeze row and column which is divided into 6 types
    1. "row": the first freeze row
    2. "column": the first freeze column
    3. "both": the freeze rows and columns
    4. "rangeRow": Freeze row to range
    5. "rangeColumn": Freeze column to range
    6. "rangeBoth": Freeze column and row to range
    7. "cancel": cancel freeze

    When setting the freezing to the selected area, you need to set the cell position to turn on the freezing. The format should like this`{ row_focus:0, column_focus:0 }`，which mean the rows and cols of an active cell.

    The new configuration property of sheet, which stores more semantic configuration, is used to initialize and pass to the server.
    
    Be careful, you can find `freezenhorizontaldata` in the luckysheetfile that used for freezen, however `freezenhorizontaldata` is only for local debugging。

- example：
    - Freeze first line
    ```json
    {
        type: 'row'
    }
    ```
    - Freeze row and column to `'A1'`
     ```json
    {
        type: 'rangeRow',
        range: {row_focus: 0, column_focus: 0}
    }
    ```
    - Freeze row and column to `'B2'`
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
### zoomRatio
- type：Number
- default：1
- usage： the zoom ratio of a sheet, which is a two decimal digit between 0~1, like `0.1`、`0.56`.

------------
### image
- type：Array
- default：[]
- usage： Insert the picture information in the table, including picture address, width and height, position, cropping and other information
- example：
    The following is an example of `imageItem`, usually there may be multiple images in a worksheet, so the format of `image` is array `[imageItem,imageItem,...]`
    ```json
    {
        type: '3', //1 Move and resize the cell 2 Move and do not resize the cell 3 Don't move and resize the cell
        src:'', //image url
        originWidth: 1484, //The original width of the picture
        originHeight: 834, //The original height of the picture
        default: {
            width: 293, //image width
            height: 196, //image height
            left: 409, //The position of the picture from the left of the table
            top: 248, //The position of the picture from the top of the table
        },
        crop: {
            width: 293, //The width of the picture after cropping
            height: 196, //The height of the picture after cropping
            offsetLeft: 0, //Displacement from the left of the picture after cropping
            offsetTop: 0, //Displacement from the left of the picture after cropping
        },
        isFixedPos: false, //Fixed position
        fixedLeft: 507, //Fixed position left displacement
        fixedTop: 141, //fixed position right displacement
        border: {
            width: 0, //border width
            radius: 0, //Border radius
            style:'solid', //border type
            color:'#000', //Border color
        }
    }
    ```
------------
### showGridLines
- Type: Number
- Default: 1
- Usage: Whether to show grid lines, `1` means show, `0` means hidden

------------

## debug information
The parameters required for initialization will be designed as simple as possible, but the parameters stored locally are different.

After initialization, Luckysheet stores more and more local data in luckysheetfile as local parameter. It means that we can realize the usage of Store data center. For example, the format of Freezen's parameters will also change.

At this point, the lucky sheet file contains many local parameters that are not initialized and can be used to debug、analysis local status. you can use  `luckysheet.getluckysheetfile()` to get more information：

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
        "row": 36, //The number of rows in a sheet
        "column": 18, //The number of columns in a sheet
        "celldata": [], //Initial the cell data
        "config": {
            "merge":{}, //Merged cells
            "rowlen":{}, //Table row height
            "columnlen":{}, //Table column width
            "rowhidden":{}, //Hidden rows
            "colhidden":{}, //Hidden columns
            "borderInfo":{}, //Borders
            "authority":{}, //Worksheet protection
        },
        "scrollLeft": 0, //Left and right scroll bar position
        "scrollTop": 315, //Up and down scroll bar position
        "luckysheet_select_save": [], //Selected area
        "calcChain": [],//Formula chain
        "isPivotTable":false,//Whether is pivot table
        "pivotTable":{},//Pivot table settings
        "filter_select": {},//Filter range
        "filter": null,//Filter configuration
        "luckysheet_alternateformat_save": [], //Alternate colors
        "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors	
        "luckysheet_conditionformat_save": {},//Condition format
        "frozen": {}, //Freeze row and column configuration
        "freezen": {}, //Storage freeze row and column rendering data
        "chart": [], //Chart configuration
        "zoomRatio":1, // Zoom ratio
        "image":[], //image
        "showGridLines": 1, //Whether to show grid lines
        

        "visibledatarow": [], //Positions of all rows
        "visibledatacolumn": [], //Positions of all columns
        "ch_width": 2322, //The width of a sheet
        "rh_height": 949, //The heighSt of a sheet
        "load": "1", //Check whether this sheed has been loaded
        "data": [], // Store and update the cell data
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
- usage： Position information of all rows, incremental row position data, No need to set up for initialization

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
