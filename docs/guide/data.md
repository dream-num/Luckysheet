# Table Data

## Get table data

- **Configuration**：

    Configure the address of `updateUrl`, Luckysheet will request the table data through ajax. By default, all `data` in the sheet data with status 1 is loaded, and the rest of the sheet loads all fields except the `data` field.

- **Format**：

    The luckysheetfile example is as follows:
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

## Get range data

- **Configuration**：

    Configure the address of `loadCellUrl`, the parameters are `gridKey` (table primary key), `index` (sheet primary key), start row, end row, start column, end column. The backend gets the specified celldata data according to the range and returns it.

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
