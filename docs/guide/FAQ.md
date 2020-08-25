# FAQ

## **<span style="font-size:20px;">Q</span>** What is the difference between data and celldata in luckysheetfile?

**<span style="font-size:20px;">A</span>**: Use one-dimensional array format [celldata](/zh/guide/sheet.html#celldata), after the initialization is completed, the data converted into a two-dimensional array format is used for storage and update, and celldata is no longer used.

If you need to take out data as initial data, you need to execute `luckysheet.getGridData(data)` to convert it to celldata data.
Among them, the celldata in `{ r, c, v }` format is converted to a two-dimensional array using `luckysheet.buildGridData(luckysheetfile)`, and the input parameter is the table data object `luckysheetfile`

Summarized as follows:
```js
// data => celldata two-dimensional array data is converted into {r, c, v} format one-dimensional array, the input parameter is two-dimensional data
luckysheet.getGridData(data)

// celldata => data The two-dimensional array required to generate the table, the input parameter is the table data object file
luckysheet.buildGridData(luckysheetfile)
```

------------

## **<span style="font-size:20px;">Q</span>** What are the cell types?

**<span style="font-size:20px;">A</span>**: Refer to [Cell Format List](/zh/guide/cell.html), with examples of available cell formats

------------

## **<span style="font-size:20px;">Q</span>** How to use Luckysheet in vue project?

**<span style="font-size:20px;">A</span>** : Reference [Luckysheet-vue-demo](https://github.com/Dushusir/vue-demo)

------------

## **<span style="font-size:20px;">Q</span>** Why will the formula in the table not be triggered after initialization?

**<span style="font-size:20px;">A</span>** : Refer to [Table data format](/zh/guide/sheet.html#calcchain) ,just set the calcChain corresponding to the cell data.

------------

## **<span style="font-size:20px;">Q</span>** Is the remote loading data loadUrl or updateUrl?

**<span style="font-size:20px;">A</span>**: [loadUrl](/zh/guide/config.html#loadurl). Configure loadUrl, Luckysheet will request the entire table data through ajax, and updateUrl will be used as the interface address for collaborative editing in real-time saving.

------------

## **<span style="font-size:20px;">Q</span>** How to understand the `index` and `order` of each worksheet?

**<span style="font-size:20px;">A</span>**: Each worksheet has a unique id, which is `index`, which can be incremented by numbers or a random string. And `order` is the order of all worksheets, starting from 0.

------------
