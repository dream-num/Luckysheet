# 表格数据

## 获取表格数据

- **配置**：

    配置 `updateUrl` 的地址，Luckysheet会通过ajax请求表格数据，默认载入status为1的sheet数据中的所有`data`，其余的sheet载入除`data`字段外的所有字段。

- **格式**：

    luckysheetfile示例如下：
    ```json
    [
        {
            "name": "Sheet1",
            "color": "",
            "status": "1",
            "order": "0",
            "celldata": [],
            "config": {},
            "index": 0
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
