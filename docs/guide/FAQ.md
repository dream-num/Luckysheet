# FAQ

The content of this chapter collects the common problems that everyone has feedback. If the official documents and this list can’t answer your questions, I recommend you to [Official Forum](https://github.com/mengshukeji/Luckysheet/discussions)

## What is the difference between data and celldata in luckysheetfile?

**<span style="font-size:20px;">A</span>**: Use one-dimensional array format [celldata](/guide/sheet.html#celldata), after the initialization is completed, the data converted into a two-dimensional array format is used for storage and update, and celldata is no longer used.

If you need to take out `data` as initial data, you need to execute [transToCellData(data)](/guide/api.html#transtocelldata-data-setting) to convert it to celldata data.
Among them, the celldata in `{ r, c, v }` format is converted to a two-dimensional array using [transToData(celldata)](/guide/api.html#transtodata-celldata-setting)

Summarized as follows:
```js
// data => celldata two-dimensional array data into {r, c, v} format one-dimensional array
luckysheet.transToCellData(data)

// celldata => data to generate the two-dimensional array required for the table
luckysheet.transToData(celldata)
```

------------

## What are the cell types?

**<span style="font-size:20px;">A</span>**: Refer to [Cell Format List](/guide/cell.html), with examples of available cell formats

------------

## How to use Luckysheet in Vue/React project?

**<span style="font-size:20px;">A</span>**: Check

- Vue case: [luckysheet-vue](https://github.com/mengshukeji/luckysheet-vue)
- React case: [luckysheet-react](https://github.com/mengshukeji/luckysheet-react)

------------

## Why will the formula in the table not be triggered after initialization?

**<span style="font-size:20px;">A</span>**: Refer to [Table data format](/guide/sheet.html#calcchain) ,just set the calcChain corresponding to the cell data.

------------

## Is the remote loading data loadUrl or updateUrl?

**<span style="font-size:20px;">A</span>**: [loadUrl](/guide/config.html#loadurl). Configure loadUrl, Luckysheet will request the entire table data through ajax, and updateUrl will be used as the interface address for collaborative editing in real-time saving.
Note: Initial data needs to be configured with loadUrl parameter, while for collaborative editing, the four parameters of loadUrl, updateUrl and allowUpdate can be configured to take effect.

------------

## What is the difference between `index` and `order` for each sheet page?

**<span style="font-size:20px;">A</span>**: Each sheet page has a unique id, which is `index`, which can be incremented by numbers or a random string. And `order` is the sorting situation of all sheets, starting from 0, can only be numbers `0,1,2...`.

------------

## Why can’t I run the project directly under the dist folder?

**<span style="font-size:20px;">A</span>**: Need to start the local server

- [Node build a local server](https://github.com/JacksonTian/anywhere)
- [Python build local server](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server)

------------

## How to import and export excel?

**<span style="font-size:20px;">A</span>**: The excel import and export library developed with Luckysheet-[Luckyexcel](https://github.com/mengshukeji/Luckyexcel) has realized the excel import function, and the export function is under development.You can refer to these 2 blog posts for excel export at this stage:

- [Development of Excel download function based on LuckySheet online form](https://www.cnblogs.com/recode-hyh/p/13168226.html)
- [Use exceljs to export luckysheet form](https://blog.csdn.net/csdn_lsy/article/details/107179708)

------------

## How to merge cells during initialization?

**<span style="font-size:20px;">A</span>**: Refer to the following case:
- [How Luckysheet initializes the data with merged cells](https://www.cnblogs.com/DuShuSir/p/13272397.html)

------------

## How does 'Luckysheet' save the data from the table to the database? Is there a soulution for storage and collaboration?

**<span style="font-size:20px;">A</span>**: There are two options:

- 1. after the table operation is completed, you can use `luckysheet.getAllSheets()` to get all sheet data that stroed in the back-end.
- 2. enable the collaborative editing function to transmit data to the back-end in real-time.
refer this article:
[How Luckysheet saves the data in the table to the database](https://www.cnblogs.com/DuShuSir/p/13857874.html)

------------

## How to monitor cell hover or click events? how to monitor `cellRenderAfter` in real-time?

**<span style="font-size:20px;">A</span>**: We have collected the secondary development requirements for cell events, and planned the cell-related hook functions, refer to [cell hook function](/guide/config.html#cellrenderafter) (the TODO displayed is not yet open)

------------

## How to customize the top toolbar?

**<span style="font-size:20px;">A</span>**: 
reference: [options.showtoolbarconfig](/guide/config.html#showtoolbarconfig)(TODO means waiting to developed)

------------

## Does the project use jQuery?

**<span style="font-size:20px;">A</span>**: yes. At the beginning, Luckysheet uses jQuery。The packaging tool will package the jQuery to this file `./plugins/js/plugin.js`

If your project (such as react / Vue) also references jQuery globally and causes conflicts, you can try to remove a jQuery.

if you want to remove jQuery in `Luckysheet`, you can find `jQuery` in source code folder `gulpfile.js`: [src/plugins/js/jquery.min.js](https://github.com/mengshukeji/Luckysheet/blob/master/gulpfile.js)，then delete information related to jQuery.

------------

## How to add a field to a cell object?

**<span style="font-size:20px;">A</span>**: reference [cell object format](/guide/cell.html)，then read this annotation[src/controllers/postil.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/postil.js)。the annotation is a configuration in a cell object.

------------

## The toolbar icon is on the loading stage all the time. 

**<span style="font-size:20px;">A</span>**: The luckysheet use iconfont icon in this project, if any icon cannot be loaded ,plz check your iconfont.css. we are so sorry that we did not describe it clearly in the old version documents.

Now the documents have been updated.[official documents](/guide/#steps-for-usage)

------------

## Can't run Luckyexcel after package. 

**<span style="font-size:20px;">A</span>**: Terminal does not show `end`, but if the `dist` folder has this file `luckyexcel.js`, it is normal.

Lucky excel is an excel import and export library. The project uses `gulp` as a packaging tool. There is a problem with the old version of the packaging tool, but it is fixed now. if this problem still troubles you, plz check the following steps:
1. pull the latest code.
2. `npm i`
3. `npm run build`

more information: [Luckyexcel](https://github.com/mengshukeji/Luckyexcel/)

------------

## How to disable editing of cells？How to open sheet protection?

**<span style="font-size:20px;">A</span>**: Sheet protection includes disable editing of cells that you need to make some configurations on each sheets. `config.authority`, the latest configurations[sheet protection](/guide/sheet.html#config-authority)。

In order to make it easier for you to understand the function of sheet protection, the following video shows how to make the whole sheet uneditable, but allow a column of cells to be edited:

<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=g3162sacwn6" allowFullScreen="true"></iframe>

In you local browser, you can open the control pannel, use `luckysheet.getLuckysheetfile()[0].config.authority` to get the configuration parameters.

------------

## How to configure data validation?

**<span style="font-size:20px;">A</span>**: there is the configuration of data validation，[data validation](/guide/sheet.html#dataVerification)。Also there is the API that you can use `data validation` in any time. [setDataVerification](/guide/api.html#setdataverification-optionitem-setting).

------------

## Is there a case for using Luckysheet with CDN?

**<span style="font-size:20px;">A</span>**: Luckysheet supports CDN. reference: [The case of using luckysheet by CDN](https://www.cnblogs.com/DuShuSir/p/13859103.html)

------------

## how to limit the adaptive height of a picture in a cell？

**<span style="font-size:20px;">A</span>**: First of all, you need to move the picture and adjust the cell size, and then there are the following situations:

- if the cell contains a picture and you expand the cell, the picure will not be expanded.
- if the cell contains a picture and you shorten the cell to the edge of the picture, the picture will shrink.
- When the picture exceeds the border of the cell, the size of this picture will change with the size of the cell.

if you want to get the position of the picture, you can overlap the picture with the border of the cell.(in the source code, it needs to overlap more than 2px.)The following demo video shows how to limit the image to the adaptive width and height of the cell.

<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=y3163ya0q6c" allowFullScreen="true"></iframe>

------------

## How to get the default row height and column width of the worksheet?

**<span style="font-size:20px;">A</span>**: There are two ways to get it

- 1. use `luckysheet.getLuckysheetfile()` to get all configuration data, so you can get the `defaultRowHeight` and `defaultColWidth` in the sheet configuration data。
- 2. use API to get the default row height [getDefaultRowHeight](/guide/api.html#getdefaultrowheight-setting) and column width.[getDefaultColWidth](/guide/api.html#getdefaultcolwidth-setting)

------------

## How to hide the add row button and the back to top button below the worksheet?

**<span style="font-size:20px;">A</span>**: Configuration is open
- Allow adding rows [enableAddRow](/guide/config.html#enableaddrow)
- Allow back to top [enableAddBackTop](/guide/config.html#enableAddBackTop)

------------

## How to hide the row and column headings of the worksheet?

**<span style="font-size:20px;">A</span>**: Configuration is open
- The width of the row header area [rowHeaderWidth](/guide/config.html#rowheaderwidth)
- The height of the column header area [columnHeaderHeight](/guide/config.html#columnHeaderHeight)

------------

## What method can be called to set `config.merge`?

**<span style="font-size:20px;">A</span>**: Three methods
- Interface operation
- Use API: [setRangeMerge](/guide/api.html#setrangemerge-type-setting)
- Manually assemble merge parameters

------------

## Why is the official new feature ineffective?

**<span style="font-size:20px;">A</span>**: The first step is to check whether you have used CDN to import,

The CDN link used in the Luckysheet tutorial is the service provided by [jsdelivr](https://www.jsdelivr.com/package/npm/luckysheet), and the code is from [npmjs.com](https://www.npmjs.com/) automatically sync the past, not from [Github](https://github.com/mengshukeji/Luckysheet/). Because our newly submitted code still needs to be tested for a period of time, it will not be released to npm immediately, causing the npm code to lag behind Github.

If you need to try the latest code, we strongly recommend that you pull the code from the [Luckysheet Github](https://github.com/mengshukeji/Luckysheet/) main repository. After our version is stable, we will consider releasing the npm package in real time.

The second step, if it is to import the packaged code of the github repository, test to determine whether there is a bug, you can find the problem and try to fix it, and then [submit a PR](https://github.com/mengshukeji/Luckysheet/pulls), if can't fix it, please [submit issues](https://github.com/mengshukeji/Luckysheet/issues).

------------

## `npm run dev` reported an error: ʻError: Cannot find module'rollup'`?

**<span style="font-size:20px;">A</span>**: It may be a problem with the npm package installation, try the following steps:
1. `npm cache clean --force`
2. `npm i rimraf -g`
3. `rimraf node_modules`
4. Delete the package-lock.json file
5. `npm i`
6. `npm run dev`

Tip: Most other npm installation problems can also be solved by trying above steps.

------------

## How to carry out secondary development of Luckysheet in Vue project?

**<span style="font-size:20px;">A</span>**: The [luckysheet-vue](https://github.com/mengshukeji/luckysheet-vue) case is to provide an application integration solution.

If directly developed locally:
1. Start both the Luckysheet project and your own Vue project. For example, the Luckysheet project is at http://localhost:3001
2. Import Luckysheet to use in the Vue project through `http://localhost:3001`

In this case, after Luckysheet is modified in real time, the changes can be seen in the Vue project

------------

## Error reporting `Store.createChart` when creating chart?

**<span style="font-size:20px;">A</span>**: You need to introduce a chart plugin to use it. You should configure the chart plugin to use when the workbook is initialized. Refer to

- Plugins configuration [plugins](/guide/config.html#plugins)
- 或 官方demo [src/index.html](https://github.com/mengshukeji/Luckysheet/blob/master/src/index.html)

------------

## Can cells add custom attributes?

**<span style="font-size:20px;">A</span>**: The custom attributes directly assigned to the cell object will be filtered. To make the custom attributes take effect, you need to edit the code to remove the filter attributes.

------------

## How to enter text starting with `'='`? For example, `=currentDate('YYYY-MM-DD')`, it will remove the function by default, how to prohibit the function?

**<span style="font-size:20px;">A</span>**: Just add a single quotation mark in front of it, and it will be forcibly recognized as a string, which is consistent with excel. For example: `'=currentDate('YYYY-MM-DD')`

------------

## Why does the create callback have no effect?

**<span style="font-size:20px;">A</span>**: The API method `luckysheet.create()` does not have a callback, but Luckysheet provides a hook function to execute the callback method at a specified location, such as:
- Triggered before the workbook is created [workbookCreateBefore](/guide/config.html#workbookcreatebefore)
- Triggered after the workbook is created [workbookCreateAfter](/guide/config.html#workbookcreateafter)

------------

## When create, the first cell is selected by default, how to remove it?

**<span style="font-size:20px;">A</span>**: When the cell is selected, it is highlighted by default, just remove the highlight, use API: [setRangeShow](/guide/api.html#setrangeshow-range-setting)

```js
luckysheet.setRangeShow("A2",{show:false})
```

------------

## Where is the right-click event bound?

**<span style="font-size:20px;">A</span>**: In the source code [src/controllers/hander.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/handler.js), search for `event.which == "3"` to find the code executed by the right-click event.

------------

## How to add a custom toolbar?

**<span style="font-size:20px;">A</span>**: No configuration is currently provided, you can refer to the implementation of the print button in the toolbar to modify the source code:
1. Search for `luckysheet-icon-print` globally to find the implementation of the print button, in [src/controllers/constant.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/constant.js) add a similar template string, you need to customize a unique id
2. Modify [src/controllers/resize.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/resize.js) and add a new record in the toobarConfig object
3. Modify [src/controllers/menuButton.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/menuButton.js) to add an event listener

------------

## How to add custom formulas?

**<span style="font-size:20px;">A</span>**: Two source codes need to be modified:
1. Add a formula to the `functionImplementation` object in the [src/function/functionImplementation.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/function/functionImplementation.js) file, format refer to formulas such as `SUM`/`AVERAGE`
2. Modify all the language packs in the [src/locale](https://github.com/mengshukeji/Luckysheet/blob/master/src/locale) file directory, and add the new formula description to the `functionlist` array in. Among them, `t` is the category of the function, `m` is the number of parameters, the minimum number of parameters and the maximum number of parameters.

------------

## Is there a similar loadData interface, I want to load 10 records first, and then dynamically load the data, these data are appended to the table?

**<span style="font-size:20px;">A</span>**: Yes. Our `loadSheetUrl` provides this function, which can be turned on by initializing `options.enablePage = true`.

Searching for `enablePage` in the source code, you can see that there is a `method.addDataAjax` method, which contains an ajax request to dynamically load data, which will be appended to the worksheet.

This function is now hidden in the document, because when we made this interface, the interface parameters were matched according to our actual business, which may not be universal. We are going to abstract and release it for everyone to use. If you want to use it yourself you can change it based on this.

It is recommended that you consider writing your own interface to load the data, and then use `setRangeValue` to append the data at the specified location, which has a higher degree of customization.

------------