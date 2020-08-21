# 表格操作

每一次操作都会保存历史记录，用于撤销和重做，如果在表格初始化的时候设置了`allowUpdate`为`true`和`updateUrl`数据更新地址，则会通过websocket将操作实时更新到后台，并且支持共享编辑。

> 源码 [`src/controllers/server.js`](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/server.js) 模块实现了后台保存功能

通常，共享编辑（或者叫协同编辑）是需要和账户系统配合来控制权限的，开发者可以根据已有功能，配合自己的账户管理功能自行实现权限控制。

以下为所有的支持传输到后台的操作类型，并且以MongoDB做存储示例，讲解如何做前后端交互。

## 单元格刷新

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
    |i|当前sheet的索引值|
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
    |k|操作的key值，可选 边框：`'borderInfo'` / ：行隐藏：`'rowhidden'` / 列隐藏：`'columnhidden'` / 行高：`'rowlen'` / 列宽：`'columnlen'` |

- **后台更新**：

    更新 `luckysheetfile[i].config.[k] = v` ，如果`config`中不存在`k`，则新建一个`k`属性并设置为空。

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
       - 后台更新：`luckysheetfile["Sheet_0554kKiKl4M7_1597974810804"].config.["rowhidden"] = { "5": 0, "6": 0, "13": 0, "14": 0 }`
    
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
       - 后台更新：`luckysheetfile["Sheet_0554kKiKl4M7_1597974810804"].config.["rowlen"] = { "9": 20, "11": 71, "15": 58 }`
    
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
       - 后台更新：`luckysheetfile["Sheet_0554kKiKl4M7_1597974810804"].config.["columnlen"] = { "2": 135 }`
 
## 通用保存

- **格式**：

  ```json
    {
        "t": "all",
        "i": 0,
        "v": {
            "type": "rangeRow",
            "range": {
                "row_focus": 1,
                "column_focus": 1
            }
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

    `luckysheetfile[3].[k]= v`
    如果`s`为`true`，则为 `luckysheetfile[3].[k]= JSON.stringify(v)`

    1. 数据透视表：
       - 输入：`{"t":"all","i":1,"v":{………},"k":"pivotTable", "s": false}`
       - 更新：`luckysheetfile[1].["pivotTable"] = {………}`

    2. 冻结行列：
       - 输入：`{"t":"all","i":3,"v":{………},"k":"freezen", "s": false}`
       - 更新：`luckysheetfile[3].["freezen"] = {………}`

    3. 筛选范围：
       - 输入：`{"t":"all","i":3,"v":{………},"k":"filter_select", "s": true }`
       - 更新：`luckysheetfile[3].["filter_select"] = JSON.stringify ({………})`
        
    4. Sheet名称：
       - 输入：`{"t":"all","i":1,"v":"文档","k":"name", "s": false}`
       - 更新：`luckysheetfile[1].["name"] = "文档"`

    5. Sheet颜色：
       - 输入： `{"t":"all","i":2,"v":"#FFF000","k":"color", "s": false}`
       - 更新：`luckysheetfile[2].["color"] = "#FFF000"`

## 函数链操作

- **格式**：

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
    - 如果`op`的值为`add`则添加到末尾 `luckysheetfile[i].calcChain.push (v)`， 
    - 如果`op`的值为`update`则更新 `luckysheetfile[i].calcChain[pos]= v`，
    - 如果`op`的值为`del`则删除 `luckysheetfile[i].calcChain.splice(pos, 1)`。

- **前台查看**：

    可以修改任意单元格的数值，然后到chrome控制台中查看`"t"=="v"`的操作。

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

- **前台查看**：

    可以删除行或者列，然后到chrome控制台中查看`"t"=="drc"`的操作。

### 增加行或列

- **格式**：

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
            <td rowspan="3">v</td> 
            <td>index</td> 
            <td>从第几行或者列开始新增</td> 
        </tr>
        <tr>
            <td>len</td> 
            <td>增加多少行或者列</td> 
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

- **前台查看**：
    可以新增行或者列，然后到chrome控制台中查看`"t"=="arc"`的操作。如果想查看具有`data`值的操作，则先删除某几行或几列，然后再撤销删除（Ctrl+Z），就能看到。

## 筛选操作

### 选择筛选条件

- **格式**：

  ```json
  {
    "t": "f",
    "i": 0,
    "v": "{\"caljs\":{},\"selected\":{\"青岛\":\"1\",\"广西\":\"1\",\"重庆\":\"1\"},\"rowhidden\":{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0,\"13\":0,\"14\":0,\"15\":0,\"16\":0,\"17\":0,\"18\":0,\"19\":0,\"21\":0,\"22\":0,\"24\":0,\"25\":0,\"26\":0,\"27\":0,\"28\":0,\"29\":0,\"30\":0,\"31\":0,\"32\":0,\"33\":0,\"34\":0,\"35\":0}}",
    "op": "upOrAdd",
    "pos": 1
  }
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |i|当前sheet的index值|
    |v|对象值，这里对象的内部字段不需要单独更新，所以存为文本即可|
    |op|操作类型`upOrAdd`为更新，如果不存在则增加，`del`为删除|
    |pos|更新或者删除的`option`位置|

- **后台更新**：
  
    更新 `luckysheetfile[i].filter = { pos : v }`， v值为一个JSON格式的字符串。filter为一个键值对，key表示选项位置的索引值（以字符表示），v表示一个json字符串参数。filter代表一个筛选条件的集合。

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
  
    清除 `luckysheetfile[i]. filter = null` ， `luckysheetfile[i]. filter_select = null`。

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
            <td rowspan="9">v</td> 
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

### 复制sheet

- **格式**：

  ```json
  {
    "t": "shc",
    "i": "新建sheet的位置",
    "v": {
        "copyindex": "copyindex"
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

### 位置

- **格式**：

  ```json
  {
    "t": "shr",
    "v": {
        "index": "positon"
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

## sheet属性(隐藏或显示)

- **格式**：

  ```json
  {
    "t": "sh",
    "i": 0,
    "v": 1,
    "op": " hide",
    "cur": 2
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
  
    更新`i`对应sheet的根路径`hide`字段为`v`，当隐藏时`status`值为`0`，当显示时为`1`，如果为隐藏则更新`index`对应`cur`的sheet的`status`状态为`1`。

## 表格信息更改

### 表格名称

- **格式**：

  ```json
  {
    "t": "na",
    "i": null,
    "v": "数据"
  }
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |v|表格的名称|

- **后台更新**：
  
    根据gridkey更新数据库中的表格名称。

### 缩略图

- **格式**：

  ```json
  {
    "t": "thumb",
    "img": "base64",
    "curindex": "curindx"
  }
  ```

- **说明**：

    |参数|说明|
    | ------------ | ------------ |
    |t|操作类型表示符号|
    |img|当前表格的缩略图，为base64字符串|
    |curindex|当前表格默认打开的sheet|

- **后台更新**：
  
    根据gridkey更新mysql中表格的缩略图字段为img值，同时更新index为curindex值的sheet的status字段为1，设置其他sheet的status值为0。