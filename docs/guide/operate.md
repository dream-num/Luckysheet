# Table Operation
`luckysheet` stores all operations in the history to `undo` and `redo`. If `allowupdate` is set to true and `updateURL` is available in initial, operations will be updated on the backend in real-time via webSocket. And every one can edit same sheet on the same time.

>Source code [`src/controllers/server.js`] (https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/server.js) The module shows us the function of background saving.

In general, shared editing(or collaborative editing) is controled by the account system created by developers to control permissions.

The following are all types of operations that support transferring to the background. In this case, I use mongodb as a storage example to explain how front-end and back-end interacts with eachother.

Pay attention, `i` in the object is the `index` of the sheet rather than `order`.
## Cell refresh
### single cell refresh
- **Format**：

    ```json
    {
        "t": "v",
        "i": "Sheet_0554kKiKl4M7_1597974810804",
        "v": {
            "v": 233,
            "ct": { "fa": "General", "t": "n" },
            "m": "233"
        },
        "r": 0,
        "c": 1
    }
    ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |v|Cell value, refer to [单元格属性表](/zh/guide/cell.html#基本单元格)|
    |r|Row number of cell|
    |c|The column number of the cell|

- **Backend update**：

    The cell update is mainly to update the `luckysheetfile[i].celldata` parameter, which is an array:
    ```json
    [
        {r:0, c:1, v: "value1"},
        {r:10, c:11, v:"value2"},
        {r:10, c:11, v:{f:"=sum", v:"100"}}
    ]
    ```
    Store the values in all the cells in the sheet, Luckysheet will create a new table data according to the number of rows and columns in `luckysheetfile[i].row` and `luckysheetfile[i].column` when it is created, and then use `data[ r][c]=v` to fill the table data, empty data cells are represented by null.

    When saving the data posted by the frontend, the backend needs to convert the parameters to the format of `{r:0, c:1:v:100}` first, and then update the field of `luckysheetfile[i].celldata`, if the cell exists the cell is updated, if not, it is added, and if the cell exists but `v` is null, the cell is deleted.

- **Frontend view**：

    You can modify the value of any cell, and then go to the chrome console to view the operation of `"t"=="v"`.
  
## Config operation

- **Format**：

  ```json
  {
    "t": "cg",
    "i": 3,
    "v": {
        "7": 192
    },
    "k": "rowlen"
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |v|The internal key-value that needs to be updated|
    |k|Operation key name|

- **Backend update**：

    Update `luckysheetfile[i].config.[k][v.key] = v.value`, if `k` does not exist in `config`, then create a new `k` attribute and set it to empty, If there is no `v.key` in `k`, create a new `v.key` and update `v.value`.

    1. Examples of modifying row height:
       - Enter: `{"t":"cg","i":3,"v":{"3":10, "5":70, "10":100},"k":" rowlen"}`
       - Update: `luckysheetfile[3].config.["rowlen"]["3"] = 10`

    2. Examples of modifying column width:
       - Enter: `{"t":"cg","i":1,"v":{"20":74, "15":170, "6":40},"k":" columnlen"}`
       - Update: `luckysheetfile[1].config.["columnlen"]["20"] = 74`
        
    3. Examples of merged cells:
       - Enter: `{"t":"cg","i":1,"v":{"5_10":{row:[1,3], column:[3,5]},"k":" merge "}`
       - Update: `luckysheetfile[1].config.["merge"]["5_10"] = {row:[1,3], column:[3,5]}`
 
## General save

- **Format**：

  ```json
  {
    "t": "all",
    "i": 3,
    "v": {
        "v": 1,
        "m":1,
    },
    "k": "freezen",
    "s": false
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |v|The internal key-value that needs to be updated|
    |k|The `value` in the key-value that needs to be saved|
    |s|If it is `true` then `v` is saved as a string, otherwise it is saved according to the object|

- **Backend update**：

    `luckysheetfile[3].[k]= v`
    If `s` is `true`, it is `luckysheetfile[3].[k]= JSON.stringify(v)`

    1. Pivot table:
       - Enter: `{"t":"all","i":1,"v":{………},"k":"pivotTable", "s": false}`
       - Update: `luckysheetfile[1].["pivotTable"] = {………}`

    2. Freeze rows and columns:
       - Enter: `{"t":"all","i":3,"v":{………},"k":"freezen", "s": false}`
       - Update: `luckysheetfile[3].["freezen"] = {………}`

    3. Filter range:
       - Enter: `{"t":"all","i":3,"v":{………},"k":"filter_select", "s": true }`
       - Update: `luckysheetfile[3].["filter_select"] = JSON.stringify ({………})`
        
    4. Sheet name:
       - Enter: `{"t":"all","i":1,"v":"doc","k":"name", "s": false}`
       - Update: `luckysheetfile[1].["name"] = "doc"`

    5. Sheet color:
       - Enter:  `{"t":"all","i":2,"v":"#FFF000","k":"color", "s": false}`
       - Update: `luckysheetfile[2].["color"] = "#FFF000"`

## Function chain operation

- **Format**：

  ```json
  {
    "t": "fc",
    "i": 0,
    "v": {
        "r": 3,
        "c": 7,
        "index": 0,
        "func": [
            true,
            187282,
            "=SUM(E4:G4)"
        ]
    },
    "op": "add",
    "pos": 0
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |v|Object value, the internal fields of the object do not need to be updated separately, so save as text|
    |op|Operation type, `add` is add, `update` is update, and `del` is delete|
    |pos|Updated or deleted function location|

- **Backend update**：

    calcChain is an array
    - If the value of `op` is `add` then add to the end `luckysheetfile[i].calcChain.push (v)`， 
    - If the value of `op` is `update` then update  `luckysheetfile[i].calcChain[pos]= v`，
    - If the value of `op` is `del` then delete `luckysheetfile[i].calcChain.splice(pos, 1)`。

- **Frontend view**：

    You can modify the value of any cell, and then go to the chrome console to view the operation of `"t"=="v"`.

## Row and column operations

### Delete rows or columns

- **Format**：

  ```json
  {
    "t": "drc",
    "i": 3,
    "v": {
        "index": 6,
        "len": 2
    },
    "rc": "r"
  }
  ```

- **Explanation**：

    <table>
        <tr>
            <td colspan="2">Parameter</td> 
            <td>Explanation</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>Operation type symbol</td> 
        </tr>
        <tr>
            <td colspan="2">i</td> 
            <td>The index value of the current sheet</td> 
        </tr>
        <tr>
            <td colspan="2">rc</td> 
            <td>Row operation or column operation, the value `r` stands for row, and `c` stands for column</td> 
        </tr>
        <tr>
            <td rowspan="2">v</td> 
            <td>index</td> 
            <td>Delete from which row or column</td> 
        </tr>
        <tr>
            <td>len</td> 
            <td>Number of rows or columns deleted</td> 
        </tr>
        
    </table>

- **Backend update**：
  
    If the value of `rc` is `'r'` then delete the row, if the value of `rc` is `'c'` then delete the column, eg `rc='r'`, `index=4`, `len= 5`, means to delete the next 5 lines (4, 5, 6, 7, 8) from the 4th line.

     Mainly operate on the cells in `luckysheetfile[i].celldata`, delete the qualified cells described in the parameters and update the row and column values of other cells. Taking the above as an example, first find the `r` in the cell Delete all the cells with values from 4 to 8, and then subtract the value of 5 from the original cell number 9 and later, and finally subtract 5 from `luckysheetfile[i].row`.
     If the `v` value is `"#__qkdelete#"` (without quotes), then this is the cell to be deleted.

- **Front view**：

    You can delete rows or columns, and then go to the chrome console to view the operation of `"t"=="drc"`.

### Add rows or columns

- **Format**：

  ```json
  {
    "t": "arc",
    "i": 0,
    "v": {
        "index": 5,
        "len": 10,
        "data": []
    },
    "rc": "c"
  }
  ```

- **Explanation**：

    <table>
        <tr>
            <td colspan="2">Parameter</td> 
            <td>Explanation</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>Operation type symbol</td> 
        </tr>
        <tr>
            <td colspan="2">i</td> 
            <td>The index value of the current sheet</td> 
        </tr>
        <tr>
            <td colspan="2">rc</td> 
            <td>Row operation or column operation, the value `r` stands for row, and `c` stands for column</td> 
        </tr>
        <tr>
            <td rowspan="3">v</td> 
            <td>index</td> 
            <td>Start from which row or column</td> 
        </tr>
        <tr>
            <td>len</td> 
            <td>How many rows or columns to add</td> 
        </tr>
        <tr>
            <td>data</td> 
            <td>New row or column content</td> 
        </tr>
        
    </table>

- **Backend update**：
    
    If the value of `rc` is `r`, add a new row. If the value of `rc` is `c`, add a new column. For example, `rc=r, index=4, len=5` then it means increase 5 lines from line 4. If `data` is empty, add an empty line. If `data` is not empty, use the array in `data` to add a new line.

    Mainly operate on the cells in `luckysheetfile[i].celldata`. Taking the above as an example, first add 5 to `luckysheetfile[i].row`, and then add `r` greater than 4 to the entire cell`r `Value +5, if `data` is empty, add an empty line to end, if `data` is not empty, convert the two-dimensional array `data` to `{r:0,c:0,v:100}` Format and added to `celldata`, the pseudo code for conversion is as follows:

    ```javascript
    var ret = [];
    for(var r=0;r<data.length;r++){
        for(var c=0;c<data[0].length;c++){
            if(d[r][c]==null){
                continue;
            }
            ret.push({r:r+5, c:c, v: data[r][c]});
        }
    }
    return ret;
    ```

- **Front view**：
    You can add rows or columns, and then go to the chrome console to view the operation of `"t"=="arc"`. If you want to view the operation with the value of `data`, you can delete some rows or columns, and then undelete (Ctrl+Z), you can see.

## Filter operating

### Select filter condition

- **Format**：

  ```json
  {
    "t": "f",
    "i": 0,
    "v": "{\"caljs\":{},\"selected\":{\"Qingdao\":\"1\",\"Guangxi\":\"1\",\"Chongqing\":\"1\"},\"rowhidden\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0,\"13\":0,\"14\":0,\"15\":0,\"16\":0,\"17\":0,\"18\":0,\"19\":0,\"21\":0,\"22\":0,\"24\":0,\"25\":0,\"26\":0,\"27\":0,\"28\":0,\"29\":0,\"30\":0,\"31\":0,\"32\":0,\"33\":0,\"34\":0,\"35\":0}}",
    "op": "upOrAdd",
    "pos": 1
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |v|Object value, the internal fields of the object do not need to be updated separately, so save as text|
    |op|The operation type `upOrAdd` is update, if it does not exist, it is added, and `del` is delete|
    |pos|Updated or deleted `option` location|

- **Backend update**：
  
   Update `luckysheetfile[i].filter = {pos: v }`, the value of `v` is a string in JSON format. `filter` is a key-value pair, `key` is the index value (in characters) of the option position, and `v` is a json string parameter. `filter` represents a set of filter conditions.

### Clear filter

- **Format**：

  ```json
  {
    "t": "fsc",
    "i": 0,
    "v": null
  }
  ```

- **Backend update**：
  
    Clear `luckysheetfile[i]. filter = null` ， `luckysheetfile[i]. filter_select = null`。

### Restore filter

- **Format**：

  ```json
  {
    "t": "fsr",
    "i": 0,
    "v": {
        "filter": [],
        "filter_select": {}
    }
  }
  ```

- **Backend update**：
  
    Clear `luckysheetfile[i]. filter = v.filter`， `luckysheetfile[i]. filter_select = v. filter_select`。

## Sheet operation

### New sheet

- **Format**：

  ```json
  {
    "t": "sha",
    "i": null,
    "v": {
        "name": "Sheet4",
        "color": "",
        "status": "0",
        "order": 3,
        "index": 3,
        "data": [],
        "config": {},
        "pivotTable": null,
        "isPivotTable": false
    }
  }
  ```

- **Explanation**：

    <table>
        <tr>
            <td colspan="2">Parameter</td> 
            <td>Explanation</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>Operation type symbol</td> 
        </tr>
        <tr>
            <td colspan="2">i</td> 
            <td>The index value of the current sheet</td> 
        </tr>
        <tr>
            <td rowspan="9">v</td> 
            <td>name</td> 
            <td>The index value of the sheet jumped after hiding</td> 
        </tr>
        <tr>
            <td>color</td> 
            <td>Sheet color</td> 
        </tr>
        <tr>
            <td>status</td> 
            <td>Active state</td> 
        </tr>
        <tr>
            <td>order</td> 
            <td>Sheet order</td> 
        </tr>
        <tr>
            <td>index</td> 
            <td>Sheet Index</td> 
        </tr>
        <tr>
            <td>celldata</td> 
            <td>Cell dataset</td> 
        </tr>
        <tr>
            <td>config</td> 
            <td>Setting</td> 
        </tr>
        <tr>
            <td>pivotTable</td> 
            <td>Pivot table settings</td> 
        </tr>
        <tr>
            <td>isPivotTable</td> 
            <td>Whether the pivot table</td> 
        </tr>
        
    </table>

- **Backend update**：
  
    Add a line (a document) to the database.

### Copy sheet

- **Format**：

  ```json
  {
    "t": "shc",
    "i": "New sheet location",
    "v": {
        "copyindex": "copyindex"
    }
  }
  ```

- **Backend update**：
  
    Copy the sheet index value in the table, set it to `copyindex` and add it to the database, set the `index` of the new document to the value corresponding to `i`.

### Delete sheet

- **Format**：

  ```json
  {
    "t": "shd",
    "i": null,
    "v": {
        "deleIndex": 0
    }
  }
  ```

- **Explanation**：

    <table>
        <tr>
            <td colspan="2">Parameter</td> 
            <td>Explanation</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>Operation type symbol</td> 
        </tr>
        <tr>
            <td rowspan="2">v</td> 
            <td>deleIndex</td> 
            <td>The sheet index to be deleted</td> 
        </tr>
                
    </table>

- **Backend update**：
  
    Delete the sheet whose index is the value corresponding to `deleIndex`.

### restore from a deleted sheet

- **format**：

  ```json
  {
    "t": "shre",
    "i": null,
    "v": {
        "reIndex": "0"
    }
  }
  ```

- **Explanation**：

    <table>
        <tr>
            <td colspan="2">Parameter</td> 
            <td>Explanation</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>Operation type symbol</td> 
        </tr>
        <tr>
            <td rowspan="2">v</td> 
            <td>deleIndex</td> 
            <td>需要恢复的sheet索引</td> 
        </tr>
                
    </table>

- **Backend update**：
  
    restore the sheet whose index is the number of `reIndex`.

### Position

- **Format**：

  ```json
  {
    "t": "shr",
    "i": null,
    "v": {
        "0": 1,
        "1": 0,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 5,
        "6": 6,
        "7": 7,
        "Sheet_6az6nei65t1i_1596209937084": 8
    }
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |v|Set the sorting of Sheet as a key-value pair, `key` represents the index of the sheet, and `value` represents the order value. The format is: `{"1": 3, "2":1, "0": 2, "3":0}`|

- **Backend update**：
  
    For the page where the `index` of the sheet is equal to the `key`, set its `order` attribute to the `value`. Examples:

    `luckysheetfile[key1].order = value1`
    `luckysheetfile[key2].order = value2`
    `luckysheetfile[key3].order = value3`

### switch to the specified sheet

- **format**：

  ```json
  {
    "t": "shs",
    "i": null,
    "v": 1
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |v|index of the specified sheet|

- **Backend update**：
  
    setting the `status` = `1`, when the `index` of a sheet is eaqul to `v`：

    `luckysheetfile[v].status = 1`

## Sheet attributes (hide or show)

- **Format**：

  ```json
  {
    "t": "sh",
    "i": 0,
    "v": 1,
    "op": " hide",
    "cur": 2
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |op|Operation options include hide and show|
    |v|Hide if `hide` is `1`, show if `0` or empty|
    |cur|After hiding, set sheet which index corresponding to the `cur` to the active state|

- **Backend update**：
  
    The `hide` field of the root path of the sheet corresponding to `i` is updated to `v`. When hidden, the `status` value is `0`. When displayed, it is `1`. If hidden, the sheet which `cur` corresponds to  `index`, its `status` is updated to `1`.

## Table information change

### Table name

- **Format**：

  ```json
  {
    "t": "na",
    "i": null,
    "v": "Data"
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |v|The name of the table|

- **Backend update**：
  
    Update the table name in the database according to gridkey.

### Thumbnail

- **Format**：

  ```json
  {
    "t": "thumb",
    "img": "base64",
    "curindex": "curindx"
  }
  ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |img|Thumbnail of current table, base64 string|
    |curindex|The current sheet opened by default|

- **Backend update**：
  
    According to gridkey, update the thumbnail field of the table in mysql to the img value, and update the status field of the sheet whose index is the curindex value to 1, and set the status value of other sheets to 0.
    
## Chart(TODO)

There are four types of chart operations: add new chart -"add", move chart position-"xy", zoom chart-"wh", and update chart configuration-"update".

### new chart

- **format**：

    ```json
    {
        "t": "c",
        "i": 0,
        "op":"add",
        "v": {
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
                        "show": true,
                        "text": "default title"
                    }
                }
            },
            "isShow": true
        }
    }
    ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |op|Operation options include hide and show|
    |v|configuration information of charts|

- **Backend update**：
  
    update the chart settings in the current sheet,if`luckysheetfile[i].chart` is null，the array should be `[]` on initial.

    ```json
    luckysheetfile[0].chart.push(v)
    ```

### move chart position

- **format**：

    ```json
    {
        "t": "c",
        "i": 0,
        "op":"xy",
        "v": {
            "chart_id": "chart_p145W6i73otw_1596209943446",
            "left": 20,
            "top": 120
        }
    }
    ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |op|Operation options include hide and show|
    |v|configuration information of charts|

- **Backend update**：
  
    update the chart settings in the current sheet

    ```js
    luckysheetfile[0].chart[v.chart_id].left = v.left;
    luckysheetfile[0].chart[v.chart_id].top = v.top;
    ```

### zoom chart

- **format**：

    ```json
    {
        "t": "c",
        "i": 0,
        "op":"wh",
        "v": {
            "chart_id": "chart_p145W6i73otw_1596209943446",
            "width": 400,
            "height": 250,
            "left": 20,
            "top": 120
        }
    }
    ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |op|Operation options include hide and show|
    |v|configuration information of charts|

- **Backend update**：
  
    update the chart settings in the current sheet

    ```js
    luckysheetfile[0].chart[v.chart_id].left = v.left;
    luckysheetfile[0].chart[v.chart_id].top = v.top;
    luckysheetfile[0].chart[v.chart_id].width = v.width;
    luckysheetfile[0].chart[v.chart_id].height = v.height;
    ```

### change the configuration of charts

- **format**：

    ```json
    {
        "t": "c",
        "i": 0,
        "op":"update",
        "v": {
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
                        "show": true,
                        "text": "default title"
                    }
                }
            },
            "isShow": true
        }
    }
    ```

- **Explanation**：

    |Parameter|Explanation|
    | ------------ | ------------ |
    |t|Operation type symbol|
    |i|The index value of the current sheet|
    |op|Operation options include hide and show|
    |v|configuration information of charts|

- **Backend update**：
  
    update the chart settings in the current sheet

    ```js
    luckysheetfile[0].chart[v.chart_id] = v;
    ```

## Backend return format

Data format returned by websocket backend
```js
{
     createTime: command sending time
     data:{} modified command
     id: "7a" websocket id
     returnMessage: "success"
     status: "0" 0 tells the front end to modify according to the data command 1 meaningless
     type: 0: connection is successful, 1: send to the currently connected user, 2: send information to other users, 3: send selection location information, 999: user disconnected
     username: username
}
```