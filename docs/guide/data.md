# Table Data

## Get table data

- **Configuration**：

    Configure the address of `updateUrl`, Luckysheet will request the table data through ajax. By default, all `data` in the sheet data with status 1 is loaded, and the rest of the sheet loads all fields except the `data` field.

- **Format**：
    Through the global method `luckysheet.getluckysheetfile()`, the configuration information of all worksheets can be obtained.

    The luckysheetfile example is as follows:
    ```json
    [
        {
            "name": "Cell", //Worksheet name
            "color": "", //Worksheet color
            "index": "0", //Worksheet index
            "status": "1", //Activation status
            "order": "0", //The order of the worksheet
            "hide": 0,//whether to hide
            "row": 36, //number of rows
            "column": 18, //Number of columns
            "config": {
                "merge":{}, //merged cells
                "rowlen":{}, //Table row height
                "columnlen":{}, //Table column width
                "rowhidden":{}, //hidden rows
                "colhidden":{}, //hidden columns
                "borderInfo":{}, //borders
            },
            "celldata": [], //initialize the cell data
            "data": [], //Update and store the cell data 
            "scrollLeft": 0, //Left and right scroll bar position
            "scrollTop": 315, //Up and down scroll bar position
            "luckysheet_select_save": [], //selected area
            "luckysheet_conditionformat_save": {},//Conditional format
            "calcChain": [],//Formula chain
            "isPivotTable":false,//Whether to pivot table
            "pivotTable":{},//Pivot table configuration
            "filter_select": null,//Filter range
            "filter": null,//Filter configuration
            "luckysheet_alternateformat_save": [], //Alternate colors
            "luckysheet_alternateformat_save_modelCustom": [], //Customize alternate colors
            "chart": [], //Chart configuration
            "visibledatarow": [], //The position of all rows
            "visibledatacolumn": [], //The position of all columns
            "ch_width": 2322, //The width of the worksheet area
            "rh_height": 949, //The height of the worksheet area
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
- **Explanation**：
           
    ## name
    - Type：String
    - Default："Sheet1"
    - Usage：Worksheet name
    
    ------------
    ## color
    - Type：String
    - Default："##f20e0e"
    - Usage：Worksheet color, there will be a bottom border under the worksheet name
    
    ------------
    ## index
    - Type：Number
    - Default：0
    - Usage：Worksheet index, starting from 0
    
    ------------
    ## status
    - Type：Number
    - Default：1
    - Usage：Active state, there is only one active worksheet which number will be 1 and the other worksheets are 0
    
    ------------
    ## order
    - Type：Number
    - Default：0
    - Usage： The index of the worksheets is starting from 0. it will increase when a worksheet is added.
    
    ------------
    ## hide
    - Type：Number
    - Default：0
    - Usage： Whether to hide, `0` means not to hide, `1` means to hide

    ------------
    ## row
    - Type：Number
    - Default：36
    - Usage： The number of cell rows
    
    ------------
    ## column
    - Type：Number
    - Default：18
    - Usage： The number of cell columns
    
    ------------
    ## scrollLeft
    - Type：Number
    - Default：0
    - Usage： Left and right scroll bar position
    
    ------------
    ## scrollTop
    - Type：Number
    - Default：0
    - Usage： Up and down scroll bar position

    ------------
    ## config
    - Type: Object
    - Default: {}
    - Usage: Table row height, column width, merged cells, borders, hidden rows and other settings

    ### config.merge
    - Type：Object
    - Default：{}
    - Usage：Merge cell settings
    - example:
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

    ### config.rowlen
    - Type：Object
    - Default：{}
    - Usage：The row height of each cell 
    - example:
        ```js
        "rowlen": {
                    "0": 20,
                    "1": 20,
                    "2": 20
                }
        ```

    ### config.columnlen
    - Type：Object
    - Default：{}
    - Usage：The column width of each cell
    -  example:
        ```js
        "columnlen": {
                    "0": 97,
                    "1": 115,
                    "2": 128
                }
        ```
    
    ### config.rowhidden
    - Type：Object
    - Default：{}
    - Usage：Hidden row information, Rows：`rowhidden[Rows]: 0`,
        
        you should specify the number of rows by `key`,`value` is always `0`
    - example:
        ```js
        "rowhidden": {
                    "30": 0,
                    "31": 0
                }
        ```
        
    ### config.colhidden
    - Type：Object
    - Default：{}
    - Usage：Hidden column information, Columns：`colhidden[Columns]: 0`,
        
        `key` specify the number of columns,`value` is always `0`
    - example:
        ```js
        "colhidden": {
                    "30": 0,
                    "31": 0
                }
        ```

    ### config.borderInfo
    - Type：Array
    - Default：{}
    - Usage：The border information of the cell
    - example:
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

    - 示例
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

    ------------
    ## celldata
    - Type：Array
    - Default：[]
    - Usage： The original cell data set is a set containing `{r:0,c:0,v:{m:"value",v:"value",ct: {fa: "General", t: "g"}} }`The one-dimensional array of format cell information is only used during initialization. After the table is initialized with celldata, the data is converted to the same level field data in the luckysheetfile, such as `luckysheetfile[0].data`, the subsequent operation of the table Data update will be updated to this data field, and celldata is no longer used. Example:
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

    ------------
    ## luckysheet_select_save
    - Type：Array
    - Default：[]
    - Usage： The selected area supports multiple selections and is a one-dimensional array containing multiple selection objects. Example:
    ```js
    [
        {
            "left": 0,
            "width": 97,
            "top": 0,
            "height": 20,
            "left_move": 0,
            "width_move": 97,
            "top_move": 0,
            "height_move": 41,
            "row": [ 0, 1 ],
            "column": [ 0, 0 ],
            "row_focus": 0,
            "column_focus": 0
        },
        {
            "left": 98,
            "width": 73,
            "top": 63,
            "height": 20,
            "left_move": 98,
            "width_move": 189,
            "top_move": 63,
            "height_move": 41,
            "row": [ 3, 4 ],
            "column": [ 1, 2 ],
            "row_focus": 3,
            "column_focus": 1
        },
        {
            "left": 288,
            "width": 128,
            "top": 21,
            "height": 20,
            "left_move": 288,
            "width_move": 128,
            "top_move": 21,
            "height_move": 62,
            "row": [ 1, 3 ],
            "column": [ 3, 3 ],
            "row_focus": 1,
            "column_focus": 3
        }
    ]
    ```

    ------------
    ## luckysheet_conditionformat_save
    - Type：Array
    - Default：[]
    - Usage： Conditional format configuration information, a one-dimensional array containing multiple conditional format configuration objects,
    
    type: "default": Highlight cell rules and project selection rules,

    "dataBar": Data bar,
    
    "icons": Icon set,
    
    "colorGradation": Color scale

    Example:
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
    ## calcChain
    - Type：Array
    - Default：[]
    - Usage：Formula chain, used when the cell linked by the formula is changed, all formulas referencing this cell will be refreshed, example:
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
    ## isPivotTable
    - Type：Boolean
    - Default：false
    - Usage： Whether PivotTable
    
    ------------
    ## pivotTable
    - Type：Object
    - Default：{}
    - Usage： Pivot table settings, example:
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
    ## filter_select
    - Type：Object
    - Default：{}
    - Usage：Filter range, a selection area, a sheet has only one filter range, similar to the `luckysheet_select_save` example:
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
    ## filter
    - Type：Object
    - Default：{}
    - Usage： Specific settings for filtering, examples:
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
    ## luckysheet_alternateformat_save
    - Type：Array
    - Default：[]
    - Usage： Alternating color configuration, example:
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
    ## luckysheet_alternateformat_save_modelCustom
    - Type：Array
    - Default：[]
    - Usage：Custom alternate colors, including multiple custom alternate colors configuration, example:
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
    ## chart
    - Type：Array
    - Default：[]
    - Usage： Chart configuration (under development)
    
    ------------
    ## visibledatarow
    - Type：Number
    - Default：[]
    - Usage： Position information of all rows, incremental row position data, No need to set up for initialization
    
    ------------
    ## visibledatacolumn
    - Type：Number
    - Default：[]
    - Usage： Position information of all columns, incremental column position data, No need to set up for initialization
    
    ------------
    ## ch_width
    - Type：Number
    - Default：2322
    - Usage：The width of the entire worksheet area (the gray area including the border), No need to set up for initialization
    
    ------------
    ## rh_height
    - Type：Number
    - Default：2322
    - Usage：The height of the entire worksheet area (the gray area containing the border), No need to set up for initialization
    
    ------------

## Get sheet data

- **Configuration**：

    Configure the address of `loadSheetUrl`, the parameters are `gridKey` (table primary key) and `index` (sheet primary key collection, format is `[1,2,3]`), the returned data is the `data` field set of sheet

- **Format**：

    ```json
    {
        "1":  [{r:0, c:1, v:"value 1"},{r:10, c:11, v:"value 2"}],
        "2":  [data],
        "3":  [data],
    }
    ```
- **Explanation**：

    `r` stands for row, `c` stands for column, and `v` stands for the value of the cell. The value can be a character, number, or json string.
    
    The data will only be loaded once, generally speaking, there is only one primary key, but considering that some formulas, charts and pivot tables will refer to the data of other sheets, the front desk will add a judgment, if the current sheet refers to the data of other sheets, then complete the data of the referenced sheet together.

## Update data

- **Configuration**：

    Configure the address of `updateUrl`, and the parameter sent to the backend is a json string.

- **Format**：

    ```json
    {
        compress: false, 
        gridKey:10004,
        data: [update data]
    }
    ```

- **Explanation**：

    | Parameter | Explanation | Example |
    | ------------ | ------------ | ------------ |
    |  compress | Luckysheet uses client pako for zlib parameter compression, which is true if the browser supports compression, otherwise false. The backend can decide whether to decompress the data content based on this parameter  | The process of obtaining parameters on the server side: 1. Serialize json string 2. Decode the data field if the compress field is TRUE 3. Decode the data string URLDecoder.decode(utf-8) |
    |  gridKey | Luckysheet file identifier | none |
    |  data | An array containing updated data. For the parameter format in the array, please see the introduction below. In the example: `t` indicates the update type, `i` is the index of the sheet, `c` is the row number, `r` is the column number, and `v` is the value  | `data: [{ t : 'cell', i:0, c : 0,  r : 0 , v: 2 }]` |
