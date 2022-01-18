# 表格操作

每一次操作都会保存历史记录，用于撤销和重做，如果在表格初始化的时候开启了[共享编辑](/zh/guide/config.html#updateurl)功能，则会通过websocket将操作实时更新到后台。

> 源码 [`src/controllers/server.js`](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/server.js) 模块实现了后台保存功能

通常，共享编辑（或者叫协同编辑）是需要和账户系统配合来控制权限的，开发者可以根据已有功能，配合自己的账户管理功能自行实现权限控制。

以下为所有的支持传输到后台的操作类型，并且以MongoDB做存储示例，讲解如何做前后端交互。

注意一点，对象中的i为当前sheet的index值，而不是order。

## 单元格刷新

### 单个单元格刷新

- **格式**：

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

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |v|单元格的值，数字、字符串或着对象格式，对象参考 [单元格属性表](/zh/guide/cell.html#基本单元格)|
    |r|单元格的行号|
    |c|单元格的列号|

- **后台更新**：

    前端维护luckysheetfile[i].data，而单元格更新到后台，继续维护`luckysheetfile[i].celldata` 参数，celldata是一个一维数组：
    ```json
    [
        {r:0, c:1, v: "值1"},
        {r:10, c:11, v:"值2"},
        {r:10, c:11, v:{f:"=sum", v:"100"}}
    ]
    ```
    后台在保存前台推送的数据时，会更新 `luckysheetfile[i].celldata` 字段，如果存在该单元格则更新，如果没有则添加，如果存在该单元格但是`v`为null则删除该单元格。
  

### 范围单元格刷新

- **格式**：

    ```json
    {
        "t": "rv",
        "i": "Sheet_ahKdzaNC65iL_1598343160744",
        "v": [
            [
                { "v": 3, "ct": { "fa": "General", "t": "n" }, "m": "3" }
            ],
            [
                { "v": 4, "ct": { "fa": "General", "t": "n" }, "m": "4" }
            ]
        ],
        "range": {
            "row": [ 1, 2 ],
            "column": [ 1, 1 ]
        }
    }
    ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的索引值|
    |v|范围二维数组，单元格对象参考 [单元格属性表](/zh/guide/cell.html#基本单元格)|
    |range|范围行列数|

- **后台更新**：

    前端维护luckysheetfile[i].data，而单元格更新到后台，继续维护`luckysheetfile[i].celldata` 参数，需要将指定位置`range`的所有单元格数据替换为新的数据
  
## config操作

- **格式**：

  ```json
    {
        "t": "cg",
        "i": "Sheet_0554kKiKl4M7_1597974810804",
        "v": [ {
                "rangeType": "range",
                "borderType": "border-all",
                "color": "#000",
                "style": "1",
                "range": [ {"row": [ 0, 1 ], "column": [ 1, 1 ] } ]
            } ],
        "k": "borderInfo"
    }
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |v|需要更新value值|
    |k|操作的key值，可选 边框：`'borderInfo'` / ：行隐藏：`'rowhidden'` / 列隐藏：`'colhidden'` / 行高：`'rowlen'` / 列宽：`'columnlen'` |

- **后台更新**：

    更新 `luckysheetfile[i].config[k] = v` ，如果`config`中不存在`k`，则新建一个`k`属性并设置为空。

    注意一点，修改config中的某个配置时，会把这个配置全部传输到后台，比如修改borderInfo，本来已经有一个含边框的单元格了，再新设置一个单元格边框，这时候会把这两个单元格边框信息都传输到后台，而不做更细颗粒的操作。

    1. 行隐藏：
       - 发送到后台：
            ```json
            {
                "t": "cg",
                "i": "Sheet_0554kKiKl4M7_1597974810804",
                "v": { "5": 0, "6": 0, "13": 0, "14": 0 }, // 包含所有隐藏行信息
                "k": "rowhidden"
            }
            ```
       - 后台更新：`luckysheetfile["Sheet_0554kKiKl4M7_1597974810804"].config["rowhidden"] = { "5": 0, "6": 0, "13": 0, "14": 0 }`
    
    2. 修改行高：
       - 发送到后台：
            ```json
           {
                "t": "cg",
                "i": "Sheet_0554kKiKl4M7_1597974810804",
                "v": { "9": 20, "11": 71, "15": 58 }, // 包含所有修改过高度的单元格信息
                "k": "rowlen"
            }
            ```
       - 后台更新：`luckysheetfile["Sheet_0554kKiKl4M7_1597974810804"].config["rowlen"] = { "9": 20, "11": 71, "15": 58 }`
    
    3. 修改列宽：
       - 发送到后台：
            ```json
           {
                "t": "cg",
                "i": "Sheet_0554kKiKl4M7_1597974810804",
                "v": { "2": 135 },
                "k": "columnlen"
            }
            ```
       - 后台更新：`luckysheetfile["Sheet_0554kKiKl4M7_1597974810804"].config["columnlen"] = { "2": 135 }`
 
## 通用保存

- **格式**：

  ```json
    {
        "t": "all",
        "i": 0,
        "v": {
            "type": "rangeRow",
            "range": { "row_focus": 1, "column_focus": 1 }
        },
        "k": "frozen"
    }
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |v|需要更新value值|
    |k|操作的key值|

- **后台更新**：

    更新 `luckysheetfile[i][k] = v` ，如果`luckysheetfile[i]`中不存在`k`，则新建一个`k`属性并设置为空。

    1. 冻结行列：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": 0,
                "v": {
                    "type": "rangeRow",
                    "range": { "row_focus": 1, "column_focus": 1 }
                },
                "k": "frozen"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile[0]["frozen"] = {
                    "type": "rangeRow",
                    "range": { "row_focus": 1, "column_focus": 1 }
                }
            ```

    2. 修改工作表名称：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": 0,
                "v": "Cell22",
                "k": "name"
            }
            ```
       - 后台更新：`luckysheetfile[0]["name"] = "Cell22"`
    
    3. 修改工作表颜色：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": 0,
                "v": "#f02323",
                "k": "color"
            }
            ```
       - 后台更新：`luckysheetfile[0]["color"] = "#f02323"`
    
    4. 合并单元格：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": "Sheet_aheLt0Waf1lk_1598248231626",
                "v": {
                    "merge": {
                        "0_0": { "r": 0,  "c": 0, "rs": 2, "cs": 1 }
                    },
                    "rowlen": {}
                },
                "k": "config"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile["Sheet_aheLt0Waf1lk_1598248231626"]["config"] =  {
                "merge": {
                    "0_0": { "r": 0,  "c": 0, "rs": 2, "cs": 1 }
                },
                "rowlen": {}
            }
            ```
                
            注意，合并单元格的更新比较特殊，要求把整个config传输到后台，因为合并单元格可能会影响到其他参数。
    
    5. 筛选范围：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": 0,
                "v": {
                    "row": [ 16, 21 ],
                    "column": [ 2, 3 ]
                },
                "k": "filter_select"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile[0]["filter_select"] =  {
                    "row": [ 16, 21 ],
                    "column": [ 2, 3 ]
                }
            ```
    
    6. 筛选的具体设置：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": "0",
                "v": {
                    "0": {
                        "caljs": {
                            "value": "textinclude",
                            "text": "Text contains",
                            "type": "1",
                            "value1": "Lucky"
                        },
                        "rowhidden": {
                            "18": 0
                        },
                        "optionstate": true,
                        "str": 17,
                        "edr": 19,
                        "cindex": 2,
                        "stc": 2,
                        "edc": 3
                    }
                },
                "k": "filter"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile[0]["filter"] = {
                    "0": {
                        "caljs": {
                            "value": "textinclude",
                            "text": "Text contains",
                            "type": "1",
                            "value1": "Lucky"
                        },
                        "rowhidden": {
                            "18": 0
                        },
                        "optionstate": true,
                        "str": 17,
                        "edr": 19,
                        "cindex": 2,
                        "stc": 2,
                        "edc": 3
                    }
                }
            ```
    
    7. 交替颜色：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": "Sheet_4N45tpMd0ni4_1598250591760",
                "v": [
                    {
                        "cellrange": {
                            "row": [ 2, 6 ],
                            "column": [ 1, 4 ]
                        },
                        "format": {
                            "head": {
                                "fc": "#000",
                                "bc": "#f6cb4b"
                            },
                            "one": {
                                "fc": "#000",
                                "bc": "#ffffff"
                            },
                            "two": {
                                "fc": "#000",
                                "bc": "#fff9e7"
                            },
                            "foot": {
                                "fc": "#000",
                                "bc": "#ffebac"
                            }
                        },
                        "hasRowHeader": true,
                        "hasRowFooter": true
                    }
                ],
                "k": "luckysheet_alternateformat_save"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile["Sheet_4N45tpMd0ni4_1598250591760"]["luckysheet_alternateformat_save"] =   [
                    {
                        "cellrange": {
                            "row": [ 2, 6 ],
                            "column": [ 1, 4 ]
                        },
                        "format": {
                            "head": {
                                "fc": "#000",
                                "bc": "#f6cb4b"
                            },
                            "one": {
                                "fc": "#000",
                                "bc": "#ffffff"
                            },
                            "two": {
                                "fc": "#000",
                                "bc": "#fff9e7"
                            },
                            "foot": {
                                "fc": "#000",
                                "bc": "#ffebac"
                            }
                        },
                        "hasRowHeader": true,
                        "hasRowFooter": true
                    }
                ]
            ```
    
    8. 条件格式：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": "Sheet_545W7w03kLkC_1598251927583",
                "v": [
                    {
                        "type": "default",
                        "cellrange": [
                            {
                                "row": [ 2, 6 ],
                                "column": [ 1, 3 ]
                            }
                        ],
                        "format": {
                            "textColor": "#9c0006",
                            "cellColor": "#ffc7ce"
                        },
                        "conditionName": "greaterThan",
                        "conditionRange": [],
                        "conditionValue": [ "3" ]
                    }
                ],
                "k": "luckysheet_conditionformat_save"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile["Sheet_545W7w03kLkC_1598251927583"]["luckysheet_conditionformat_save"] =   [
                    {
                        "type": "default",
                        "cellrange": [
                            {
                                "row": [ 2, 6 ],
                                "column": [ 1, 3 ]
                            }
                        ],
                        "format": {
                            "textColor": "#9c0006",
                            "cellColor": "#ffc7ce"
                        },
                        "conditionName": "greaterThan",
                        "conditionRange": [],
                        "conditionValue": [ "3" ]
                    }
                ]
            ```
    
    9. 数据透视表：
       - 发送到后台：
            ```json
            {
                "t": "all",
                "i": "Sheet_r3Cz5bbxipL3_1598252547290",
                "v": {
                    "pivot_select_save": {
                        "row": [ 0, 2 ],
                        "column": [ 0, 2 ]
                    },
                    "pivotDataSheetIndex": "Sheet_31ikLMip330K_1598252536645",
                    "column": [],
                    "row": [],
                    "filter": [],
                    "values": [],
                    "showType": "column"
                },
                "k": "pivotTable"
            }
            ```
       - 后台更新：
            ```js
            luckysheetfile["Sheet_r3Cz5bbxipL3_1598252547290"]["pivotTable"] =  {
                    "pivot_select_save": {
                        "row": [ 0, 2 ],
                        "column": [ 0, 2 ]
                    },
                    "pivotDataSheetIndex": "Sheet_31ikLMip330K_1598252536645",
                    "column": [],
                    "row": [],
                    "filter": [],
                    "values": [],
                    "showType": "column"
                }
            ```

            注意，虽然数据透视表的格式是这个，但是当你选择一个范围之后，点击生产数据透视表时，Luckysheet会先执行新建sheet页和切换到该sheet页的操作，才能在新建的sheet页加上数据透视表。
    
    10. 动态数组：
        - 发送到后台：
            ```json
            {
                "t": "all",
                "i": "Sheet_r3Cz5bbxipL3_1598252547290",
                "v": [
                    {
                        "r": 4,
                        "c": 5,
                        "f": "=UNIQUE(B2:E9)",
                        "data": [
                            [ 1, 2, 3, 4 ],
                            [ 2, 3, 4, 5 ],
                            [ 3, 4, 5, 6 ],
                            [ 4, 5, 6, 7 ],
                            [ 5, 6, 7, 8 ],
                            [ 6, 7, 8, 9 ],
                            [ 7, 8, 9, 10 ],
                            [ 8, 9, 10, 11 ]
                        ]
                    }
                ],
                "k": "dynamicArray"
            }
            ```
        - 后台更新：
            ```js
            luckysheetfile["Sheet_r3Cz5bbxipL3_1598252547290"]["dynamicArray"] =   [
                    {
                        "r": 4,
                        "c": 5,
                        "f": "=UNIQUE(B2:E9)",
                        "data": [
                            [ 1, 2, 3, 4 ],
                            [ 2, 3, 4, 5 ],
                            [ 3, 4, 5, 6 ],
                            [ 4, 5, 6, 7 ],
                            [ 5, 6, 7, 8 ],
                            [ 6, 7, 8, 9 ],
                            [ 7, 8, 9, 10 ],
                            [ 8, 9, 10, 11 ]
                        ]
                    }
                ]
            ```

## 函数链操作

- **格式**：

  ```json

  {
    "t": "fc",
    "i": "0",
    "v": "{\"r\":1,\"c\":1,\"index\":\"0\",\"func\":[true,3,\"=sum(A1:B1)\"]}",
    "op": "add",
    "pos": 1
  }

  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |v|对象值，这里对象的内部字段不需要单独更新，所以存为文本即可|
    |op|操作类型,`add`为新增，`update`为更新，`del`为删除|
    |pos|更新或者删除的函数位置|

- **后台更新**：

    calcChain为一个数组
    - 如果`op`的值为`add`则添加到末尾 `luckysheetfile[0].calcChain.push(v)`， 
    - 如果`op`的值为`update`，格式为：
        ```json
        {
            "t": "fc",
            "i": "0",
            "v": "{\"r\":0,\"c\":3,\"index\":\"0\",\"func\":[true,1,\"=Formula!A1+Formula!B1+1\"],\"color\":\"w\",\"parent\":null,\"chidren\":{},\"times\":0}",
            "op": "update",
            "pos": 0
        }
        ```
        更新 `luckysheetfile[0].calcChain[pos] = v`，
    - 如果`op`的值为`del`则删除，格式为：
        ```json
        {
            "t": "fc",
            "i": 0,
            "v": null,
            "op": "del",
            "pos": 0
        }
        ```
        `luckysheetfile[0].calcChain.splice(pos, 1)`。

## 行列操作

### 删除行或列

- **格式**：

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

- **说明**：

    <table>
        <tr>
            <td colspan="2">参数</td> 
            <td>说明</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>操作类型表示符号</td> 
        </tr>
        <tr>
            <td colspan="2">i</td> 
            <td>当前sheet的index值</td> 
        </tr>
        <tr>
            <td colspan="2">rc</td> 
            <td>行操作还是列操作，值`r`代表行，`c`代表列</td> 
        </tr>
        <tr>
            <td rowspan="2">v</td> 
            <td>index</td> 
            <td>从第几行或者列开始删除</td> 
        </tr>
        <tr>
            <td>len</td> 
            <td>删除多少行或者列</td> 
        </tr>
        
    </table>

- **后台更新**：
  
    如果`rc`的值是`'r'`删除行， 如果`rc`的值为`'c'`则删除列， 例如`rc='r'`，`index=4`，`len=5`，则代表从第4行开始删除之后的5行（4、5、6、7、8）。

    主要是对 `luckysheetfile[i].celldata` 中的单元格进行操作，删除参数中所描述符合条件的单元格并且更新其他单元格的行列值，以上述为例，首先查找单元格中`r`值在4到8的所有单元格并删除，然后把本来行号9以后的单元格的`r`值减去5，最后把 `luckysheetfile[i].row` 减去5。
    如果`v`值为 `"#__qkdelete#"`（不含引号），则此处为需要删除的单元格。

### 增加行或列

- **格式**：

  ```json
  {
    "t": "arc",
    "i": "0",
    "v": {
        "index": 1,
        "len": 1,
        "direction": "lefttop",
        "data": []
    },
    "rc": "r"
  }
  ```

- **说明**：

    <table>
        <tr>
            <td colspan="2">参数</td> 
            <td>说明</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>操作类型表示符号</td> 
        </tr>
        <tr>
            <td colspan="2">i</td> 
            <td>当前sheet的index值</td> 
        </tr>
        <tr>
            <td colspan="2">rc</td> 
            <td>行操作还是列操作，值`r`代表行，`c`代表列</td> 
        </tr>
        <tr>
            <td rowspan="4">v</td> 
            <td>index</td> 
            <td>从第几行或者列开始新增</td> 
        </tr>
        <tr>
            <td>len</td> 
            <td>增加多少行或者列</td> 
        </tr>
        <tr>
            <td>direction</td> 
            <td>方向</td> 
        </tr>
        <tr>
            <td>data</td> 
            <td>新增行或者列的内容</td> 
        </tr>
        
    </table>

- **后台更新**：
  
    如果`rc`的值是`r`新增行， 如果`rc`的值为`c`则新增列， 例如`rc=r，index=4，len=5`，则代表从第4行开始增加5行，如果`data`为空则增加空行，如果`data`不为空则用`data`中的数组添加新增的行中。

    主要是对 `luckysheetfile[i].celldata` 中的单元格进行操作，以上述为例，首先 `luckysheetfile[i].row` 加5，然后把`r`大于4的单元格的整体的`r`值+5，如果`data`为空则增加空行则结束，如果`data`不为空则把二维数组`data`转换为 `{r:0,c:0,v:100}` 的格式并添加到`celldata`中，转换的伪代码如下：

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

## 筛选操作

### 清除筛选

- **格式**：

  ```json
  {
    "t": "fsc",
    "i": 0,
    "v": null
  }
  ```

- **后台更新**：
  
    清除 `luckysheetfile[0].filter = null` ， `luckysheetfile[i].filter_select = null`。

### 恢复筛选

- **格式**：

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

- **后台更新**：
  
    清除 `luckysheetfile[i]. filter = v.filter`， `luckysheetfile[i]. filter_select = v. filter_select`。

## sheet操作

### 新建sheet

- **格式**：

  ```json
  {
    "t": "sha",
    "i": null,
    "v": {
        "name": "Sheet11",
        "color": "",
        "status": "0",
        "order": 10,
        "index": "Sheet_oWlM5pKnwL1s_1598331858653",
        "celldata": [],
        "row": 84,
        "column": 60,
        "config": {},
        "pivotTable": null,
        "isPivotTable": false
    }
  }
  ```

- **说明**：

    <table>
        <tr>
            <td colspan="2">参数</td> 
            <td>说明</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>操作类型表示符号</td> 
        </tr>
        <tr>
            <td colspan="2">i</td> 
            <td>当前sheet的index值</td> 
        </tr>
        <tr>
            <td rowspan="11">v</td> 
            <td>name</td> 
            <td>隐藏后跳转的sheet的index值</td> 
        </tr>
        <tr>
            <td>color</td> 
            <td>Sheet颜色</td> 
        </tr>
        <tr>
            <td>status</td> 
            <td>激活状态</td> 
        </tr>
        <tr>
            <td>order</td> 
            <td>Sheet摆放顺序</td> 
        </tr>
        <tr>
            <td>index</td> 
            <td>Index索引</td> 
        </tr>
        <tr>
            <td>celldata</td> 
            <td>单元格数据集</td> 
        </tr>
        <tr>
            <td>row</td> 
            <td>行数</td> 
        </tr>
        <tr>
            <td>column</td> 
            <td>列数</td> 
        </tr>
        <tr>
            <td>config</td> 
            <td>设置</td> 
        </tr>
        <tr>
            <td>pivotTable</td> 
            <td>数据透视表设置</td> 
        </tr>
        <tr>
            <td>isPivotTable</td> 
            <td>是否数据透视表</td> 
        </tr>
        
    </table>

- **后台更新**：
  
    添加一行（一个文档）到数据库中。
    `luckysheetfile.push(json)`


### 复制sheet

- **格式**：

  ```json
  {
    "t": "shc",
    "i": "Sheet_e5pKTeloilhe_1598332166630",
    "v": {
        "copyindex": 0,
        "name": "Cell(Copy)"
    }
  }
  ```

- **后台更新**：
  
    复制表格中的sheet索引值为`copyindex`并添加到数据库中，添加的设置该新文档的`index`为`i`对应的值。

### 删除sheet

- **格式**：

  ```json
  {
    "t": "shd",
    "i": null,
    "v": {
        "deleIndex": 0
    }
  }
  ```

- **说明**：

    <table>
        <tr>
            <td colspan="2">参数</td> 
            <td>说明</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>操作类型表示符号</td> 
        </tr>
        <tr>
            <td rowspan="2">v</td> 
            <td>deleIndex</td> 
            <td>需要删除的sheet索引</td> 
        </tr>
                
    </table>

- **后台更新**：
  
    删除索引为`deleIndex`对应值的sheet。

### 删除sheet后恢复操作

- **格式**：

  ```json
  {
    "t": "shre",
    "i": null,
    "v": {
        "reIndex": "0"
    }
  }
  ```

- **说明**：

    <table>
        <tr>
            <td colspan="2">参数</td> 
            <td>说明</td> 
        </tr>
        <tr>
            <td colspan="2">t</td> 
            <td>操作类型表示符号</td> 
        </tr>
        <tr>
            <td rowspan="2">v</td> 
            <td>deleIndex</td> 
            <td>需要恢复的sheet索引</td> 
        </tr>
                
    </table>

- **后台更新**：
  
    恢复索引为`reIndex`对应值的sheet。

### 调整sheet位置

- **格式**：

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

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |v|设置Sheet的排序，为一个键值对，`key`代表sheet的`index`，`value`代表`order`值。格式为：`{"1": 3, "2":1, "0": 2, "3":0}`|

- **后台更新**：
  
    对sheet的`index`等于`key`的页，设置其`order`属性为`value`值。示例：

    `luckysheetfile[key1].order = value1`
    `luckysheetfile[key2].order = value2`
    `luckysheetfile[key3].order = value3`

### 切换到指定sheet

- **格式**：

  ```json
  {
    "t": "shs",
    "i": null,
    "v": 1
  }
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |v|要切换到的sheet页索引|

- **后台更新**：
  
    对sheet的`index`等于`v`的页，设置其`status`属性为`1`值。示例：

    `luckysheetfile[v].status = 1`

## sheet属性(隐藏或显示)

- **格式**：

  ```json
  {
    "t": "sh",
    "i": 0,
    "v": 1,
    "op": "hide",
    "cur": 1
  }
  
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |op|操作选项，有hide、show|
    |v|如果`hide`为`1`则隐藏，为`0`或者空则为显示|
    |cur|隐藏后设置索引对应`cur`的sheet为激活状态|

- **后台更新**：
  
    更新`i`对应sheet的根路径`hide`字段为`v`
    
    当隐藏时`status`值为`0`，更新`index`对应`cur`的sheet的`status`状态为`1`
    
    `luckysheetfile[0].hide = 1`
    `luckysheetfile[0].status = 0`
    `luckysheetfile[1].status = 1`

    显示某个sheet页时，json为
    ```json
    {
        "t": "sh",
        "i": 6,
        "v": 0,
        "op": "show"
    }
    ```
    `status`值为`1`，上一个激活sheet的`status`状态为`0`
    
    `luckysheetfile[6].hide = 0`
    `luckysheetfile[6].status = 1`
    `luckysheetfile[old_cur].status = 0`

## 表格信息更改

### 修改工作簿名称

- **格式**：

    ```json
    {
        "t": "na",
        "i": null,
        "v": "Luckysheet Demo1"
    }
    ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |v|工作簿名称|

- **后台更新**：
  
    Luckysheet配置，修改title为`"Luckysheet Demo1"`

## 图表(TODO)

图表操作类型有4种，分别为新增图表"add"、移动图表位置"xy"、缩放图表"wh"、修改图表配置"update"

### 新增图表

- **格式**：

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
                        "text": "默认标题"
                    }
                }
            },
            "isShow": true
        }
    }
    ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |op|操作选项|
    |v|图表的配置信息|

- **后台更新**：
  
    更新对应sheet页中的图表设置，如果`luckysheetfile[i].chart`为null，则初始化为空数组 `[]`

    ```json
    luckysheetfile[0].chart.push(v)
    ```

### 移动图表位置

- **格式**：

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

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |op|操作选项|
    |v|图表的配置信息|

- **后台更新**：
  
    更新对应sheet页中的图表设置

    ```js
    luckysheetfile[0].chart[v.chart_id].left = v.left;
    luckysheetfile[0].chart[v.chart_id].top = v.top;
    ```

### 缩放图表

- **格式**：

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

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |op|操作选项|
    |v|图表的配置信息|

- **后台更新**：
  
    更新对应sheet页中的图表设置

    ```js
    luckysheetfile[0].chart[v.chart_id].left = v.left;
    luckysheetfile[0].chart[v.chart_id].top = v.top;
    luckysheetfile[0].chart[v.chart_id].width = v.width;
    luckysheetfile[0].chart[v.chart_id].height = v.height;
    ```

### 修改图表配置

- **格式**：

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
                        "text": "默认标题"
                    }
                }
            },
            "isShow": true
        }
    }
    ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |op|操作选项|
    |v|图表的配置信息|

- **后台更新**：
  
    更新对应sheet页中的图表设置

    ```js
    luckysheetfile[0].chart[v.chart_id] = v;
    ```

## 后端返回格式

websocket 后端返回的数据格式
```js
{
    createTime: 命令发送时间
    data:{} 修改的命令
    id: "7a"   websocket的id
    returnMessage: "success"
    status: "0"  0告诉前端需要根据data的命令修改  1无意义
    type: 0：连接成功，1：发送给当前连接的用户，2：发送信息给其他用户，3：发送选区位置信息，999：用户连接断开
    username: 用户名
}
```