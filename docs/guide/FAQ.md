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
Note: Initial data needs to be configured with loadUrl and loadSheetUrl parameters, while for collaborative editing, the four parameters of loadUrl, loadSheetUrl, updateUrl and allowUpdate can be configured to take effect.

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

**<span style="font-size:20px;">A</span>**: The excel import and export library developed with Luckysheet-[Luckyexcel](https://github.com/mengshukeji/Luckyexcel) has realized the excel import function, and the export function is under development. You can refer to this blog post for excel export at this stage: https://www.cnblogs.com/recode-hyh/p/13168226.html.

------------

## **<span style="font-size:20px;">Q</span>** How to merge cells during initialization?

**<span style="font-size:20px;">A</span>**: Refer to the following case
- Luckysheet initializes data with merged cells: https://www.cnblogs.com/DuShuSir/p/13272397.html

------------

## **<span style="font-size:20px;">Q</span>** How does 'Luckysheet' save the data from the table to the database? Is there a soulution for storage and collaboration?

**<span style="font-size:20px;">A</span>** :There are two options：

- 1. after the table operation is completed, you can use `luckysheet.getAllSheets()` to get all sheet data that stroed in the back-end.
- 2. enable the collaborative editing function to transmit data to the back-end in real-time.
refer this article：https://www.cnblogs.com/DuShuSir/p/13857874.html

------------

## **<span style="font-size:20px;">Q</span>** How to monitor cell hover or click events? how to monitor `cellRenderAfter` in real-time?

**<span style="font-size:20px;">A</span>** ：我们搜集到需要针对单元格事件的二次开发需求，规划了单元格相关的钩子函数，参考[单元格钩子函数](/zh/guide/config.html#cellrenderafter)（显示的TODO的暂未开放）

------------

## **<span style="font-size:20px;">Q</span>** How to customize the top toolbar?

**<span style="font-size:20px;">A</span>** ：
reference: [options.showtoolbarconfig](/zh/guide/config.html#showtoolbarconfig)(TODO means waiting to developed)

------------

## **<span style="font-size:20px;">Q</span>** Does the project use jQuery?

**<span style="font-size:20px;">A</span>** ：yes. At the beginning, Luckysheet uses jQuery。The packaging tool will package the jQuery to this file `./plugins/js/plugin.js`

If your project (such as react / Vue) also references jQuery globally and causes conflicts, you can try to remove a jQuery.

if you want to remove jQuery in `Luckysheet`, you can find `jQuery` in source code folder `gulpfile.js`：[src/plugins/js/jquery.min.js](https://github.com/mengshukeji/Luckysheet/blob/master/gulpfile.js)，then delete information related to jQuery.

------------

## **<span style="font-size:20px;">Q</span>** How to add a field to a cell object?

**<span style="font-size:20px;">A</span>** reference [cell object format](/zh/guide/cell.html)，then read this annotation[src/controllers/postil.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/postil.js)。the annotation is a configuration in a cell object.

------------

## **<span style="font-size:20px;">Q</span>** The toolbar icon is on the loading stage all the time. 

**<span style="font-size:20px;">A</span>** The luckysheet use iconfont icon in this project, if any icon cannot be loaded ,plz check your iconfont.css. we are so sorry that we did not describe it clearly in the old version documents.

Now the documents have been updated.[official documents](/zh/guide/#使用步骤)

------------

## **<span style="font-size:20px;">Q</span>** Can't run Luckyexcel after package. 

**<span style="font-size:20px;">A</span>** Terminal does not show `end`, but if the `dist` folder has this file `luckyexcel.js`, it is normal.

Lucky excel is an excel import and export library. The project uses `gulp` as a packaging tool. There is a problem with the old version of the packaging tool, but it is fixed now. if this problem still troubles you, plz check the following steps：
1. pull the latest code.
2. `npm i`
3. `npm run build`

more information：[Luckyexcel](https://github.com/mengshukeji/Luckyexcel/)

------------

## **<span style="font-size:20px;">Q</span>** How to disable editing of cells？How to open sheet protection?

**<span style="font-size:20px;">A</span>** Sheet protection includes disable editing of cells that you need to make some configurations on each sheets. `config.authority`, the latest configurations[sheet protection](/zh/guide/sheet.html#config-authority)。

In order to make it easier for you to understand the function of sheet protection, the following video shows how to make the whole sheet uneditable, but allow a column of cells to be edited:

<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=g3162sacwn6" allowFullScreen="true"></iframe>

In you local browser, you can open the control pannel, use `luckysheet.getLuckysheetfile()[0].config.authority` to get the configuration parameters.

------------

## **<span style="font-size:20px;">Q</span>** How to configure data validation?

**<span style="font-size:20px;">A</span>**  there is the configuration of data validation，[data validation](/zh/guide/sheet.html#dataVerification)。Also there is the API that you can use `data validation` in any time. [setDataVerification](/zh/guide/api.html#setdataverification-optionitem-setting).

------------

## **<span style="font-size:20px;">Q</span>** Is there a case for using Luckysheet with CDN?

**<span style="font-size:20px;">A</span>** Luckysheet supports CDN. reference：[The case of using luckysheet by CDN](https://www.cnblogs.com/DuShuSir/p/13859103.html)

------------

## **<span style="font-size:20px;">Q</span>** how to limit the adaptive height of a picture in a cell？

**<span style="font-size:20px;">A</span>** First of all, you need to move the picture and adjust the cell size, and then there are the following situations:

- if the cell contains a picture and you expand the cell, the picure will not be expanded.
- if the cell contains a picture and you shorten the cell to the edge of the picture, the picture will shrink.
- When the picture exceeds the border of the cell, the size of this picture will change with the size of the cell.

if you want to get the position of the picture, you can overlap the picture with the border of the cell.(in the source code, it needs to overlap more than 2px.)The following demo video shows how to limit the image to the adaptive width and height of the cell.

<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=y3163ya0q6c" allowFullScreen="true"></iframe>

------------

## **<span style="font-size:20px;">Q</span>** How to get the default row height and column width of the worksheet?

**<span style="font-size:20px;">A</span>** There are two ways to get it

- 1. use `luckysheet.getLuckysheetfile()` to get all configuration data, so you can get the `defaultRowHeight` and `defaultColWidth` in the sheet configuration data。
- 2. use API to get the default row height [getDefaultRowHeight](/zh/guide/api.html#getdefaultrowheight-setting) and column width.[getDefaultColWidth](/zh/guide/api.html#getdefaultcolwidth-setting)

------------