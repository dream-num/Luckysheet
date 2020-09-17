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

## **<span style="font-size:20px;">Q</span>** How to use Luckysheet in Vue/React project?

**<span style="font-size:20px;">A</span>**:

- Vue case: [luckysheet-vue](https://github.com/mengshukeji/luckysheet-vue)
- React case: [luckysheet-react](https://github.com/mengshukeji/luckysheet-react)

------------

## **<span style="font-size:20px;">Q</span>** Why will the formula in the table not be triggered after initialization?

**<span style="font-size:20px;">A</span>** : Refer to [Table data format](/zh/guide/sheet.html#calcchain) ,just set the calcChain corresponding to the cell data.

------------

## **<span style="font-size:20px;">Q</span>** Is the remote loading data loadUrl or updateUrl?

**<span style="font-size:20px;">A</span>**: [loadUrl](/zh/guide/config.html#loadurl). Configure loadUrl, Luckysheet will request the entire table data through ajax, and updateUrl will be used as the interface address for collaborative editing in real-time saving.

------------

## **<span style="font-size:20px;">Q</span>** What is the difference between `index` and `order` for each sheet page?

**<span style="font-size:20px;">A</span>**: Each sheet page has a unique id, which is `index`, which can be incremented by numbers or a random string. And `order` is the sorting situation of all sheets, starting from 0, can only be numbers `0,1,2...`.

------------

## **<span style="font-size:20px;">Q</span>** Why can’t I run the project directly under the dist folder?

**<span style="font-size:20px;">A</span>**: Need to start the local server

- [Node build a local server](https://github.com/JacksonTian/anywhere)
- [Python build local server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)

------------

## **<span style="font-size:20px;">Q</span>** How to import and export excel?

**<span style="font-size:20px;">A</span>**: You can refer to the following cases at this stage
- Luckysheet import: https://www.cnblogs.com/DuShuSir/p/13179483.html
- Luckysheet export: https://www.cnblogs.com/recode-hyh/p/13168226.html

Later, we will open another import and export library for adaptation, so stay tuned!

------------

## **<span style="font-size:20px;">Q</span>** How to merge cells during initialization?

**<span style="font-size:20px;">A</span>**: Refer to the following case
- Luckysheet initializes data with merged cells: https://www.cnblogs.com/DuShuSir/p/13272397.html