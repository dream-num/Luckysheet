# 常见问题

本章内容搜集了大家反馈的常见问题，如果官方文档和此列表都不能解答您的疑问，推荐到[官方论坛](https://github.com/mengshukeji/Luckysheet/discussions)反馈

## luckysheetfile中的data和celldata有什么区别？

**<span style="font-size:20px;">A</span>**：表格初始化时使用一维数组格式的 [celldata](/zh/guide/sheet.html#celldata)，初始化完成后转化为二维数组格式的data作为存储更新使用，celldata不再使用。

如果需要将`data`拿出来作为初始化数据，则需要执行 [transToCellData(data)](/zh/guide/api.html#transtocelldata-data-setting)转换为celldata数据。
其中`{ r, c, v }`格式的celldata转换为二维数组使用的是[transToData(celldata)](/zh/guide/api.html#transtodata-celldata-setting)

总结如下：
```js
// data => celldata 二维数组数据 转化成 {r, c, v}格式 一维数组
luckysheet.transToCellData(data)

// celldata => data 生成表格所需二维数组
luckysheet.transToData(celldata)
```

------------

## 单元格的类型有哪些？

**<span style="font-size:20px;">A</span>**：参考[单元格格式列表](/zh/guide/cell.html),例举了可用的单元格格式

------------

## 如何在Vue/React项目中使用Luckysheet？

**<span style="font-size:20px;">A</span>**：参考
- Vue案例：[luckysheet-vue](https://github.com/mengshukeji/luckysheet-vue)
- React案例：[luckysheet-react](https://github.com/mengshukeji/luckysheet-react)

------------

## 为什么初始化后表格里面的公式不会被触发？

**<span style="font-size:20px;">A</span>**：参考 [表格数据格式](/zh/guide/sheet.html#calcchain) ,设置单元格数据对应的calcChain即可。

------------

## 远端加载数据是loadUrl还是updateUrl？

**<span style="font-size:20px;">A</span>**：[loadUrl](/zh/guide/config.html#loadurl)。配置了loadUrl，Luckysheet会通过ajax请求整个表格数据，而updateUrl会作为协同编辑实时保存的接口地址。
注意：初始化数据需要配置loadUrl参数，而协同编辑则在配置loadUrl、updateUrl和allowUpdate四个参数才能生效。

------------

## 每个sheet页的`index`和`order`有什么区别？

**<span style="font-size:20px;">A</span>**：每个sheet页都有一个唯一id，就是`index`，可以用数字递增，也可以使用随机字符串，而`order`是所有的sheet的排序情况，从0开始，只能为数字`0,1,2...`。

------------

## dist文件夹下为什么不能直接运行项目？

**<span style="font-size:20px;">A</span>**：需要启动本地服务器

- [Node搭建本地服务器](https://github.com/JacksonTian/anywhere)
- [Python搭建本地服务器](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/set_up_a_local_testing_server)

------------

## excel导入导出怎么做？

**<span style="font-size:20px;">A</span>**：配合Luckysheet开发的excel导入导出库-[Luckyexcel](https://github.com/mengshukeji/Luckyexcel)已经实现了excel导入功能，导出功能正在开发当中。现阶段excel导出可以参考这2篇博文： 

- [基于LuckySheet在线表格的Excel下载功能开发](https://www.cnblogs.com/recode-hyh/p/13168226.html)
- [使用exceljs导出luckysheet表格](https://blog.csdn.net/csdn_lsy/article/details/107179708)

------------

## 初始化时合并单元格怎么做？

**<span style="font-size:20px;">A</span>**：参考以下案例
- [Luckysheet如何初始化含合并单元格的数据](https://www.cnblogs.com/DuShuSir/p/13272397.html)

------------

## Luckysheet如何把表格里的数据保存到数据库？有没有服务端存储和协作的解决方案？

**<span style="font-size:20px;">A</span>**：有两个方案：

- 一是表格操作完成后，使用`luckysheet.getAllSheets()`方法获取到全部的工作表数据，全部发送到后台存储。
- 二是开启协同编辑功能，实时传输数据给后端。
具体的操作步骤参考这篇文章：[Luckysheet如何把表格里的数据保存到数据库](https://www.cnblogs.com/DuShuSir/p/13857874.html)

------------

## 如何监听单元格hover或者点击事件？`cellRenderAfter`如何实时监听变化？

**<span style="font-size:20px;">A</span>**：我们搜集到需要针对单元格事件的二次开发需求，规划了单元格相关的钩子函数，参考[单元格钩子函数](/zh/guide/config.html#cellrenderafter)（显示的TODO的暂未开放）

------------

## 顶部的工具栏不支持自定义配置？

**<span style="font-size:20px;">A</span>**：
顶部工具栏的自定义配置使用初始[options.showtoolbarconfig](/zh/guide/config.html#showtoolbarconfig)(如果标注TODO表示暂未开发)

------------

## 项目使用了jQuery吗？

**<span style="font-size:20px;">A</span>**：是的。Luckysheet内部启动时间比开源的时间早很多，所以用到了jQuery。打包工具会把jQuery集成到打包目录的`./plugins/js/plugin.js`文件中。

如果您的项目中（比如React/Vue）也自己全局引用了jQuery，且造成了冲突，可以尝试去掉一个jQuery。

要想在Luckysheet里去除jQuery，需要在源码根目录下的`gulpfile.js`文件中找到打包jQuery的地方：[src/plugins/js/jquery.min.js](https://github.com/mengshukeji/Luckysheet/blob/master/gulpfile.js)，删除jQuery相关的信息即可。

------------

## 如何为单元格对象新增字段？

**<span style="font-size:20px;">A</span>**：首先参考[单元格对象格式](/zh/guide/cell.html)，然后参照源码批注的部分[src/controllers/postil.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/postil.js)。批注是一个加在单元格对象上的一个配置。

------------

## 工具栏图标加载不出来？

**<span style="font-size:20px;">A</span>**：工具栏及其他部分图标采用了iconfont图标，加载不出来是因为缺少了iconfont.css的引入，之前旧版官方文档未写清楚这一点对大家造成误导，很抱歉。

详细的Luckysheet使用教程参考已经更新的[官方文档](/zh/guide/#使用步骤)

------------

## Luckyexcel打包后不动？

**<span style="font-size:20px;">A</span>**：打包的终端命令行不显示结束，但是如果`dist`文件夹内已经有了结果文件`luckyexcel.js`，则表明是正常的。

Luckyexcel是excel导入导出库，项目采用了gulp作为打包工具，旧版打包工具有点问题在命令行显示这块有些问题，问题已经修复。请还出现此问题的小伙伴做如下更新操作：
1. pull最新代码
2. `npm i`
3. `npm run build`

更多详细信息关注：[Luckyexcel](https://github.com/mengshukeji/Luckyexcel/)

------------

## 单元格不可编辑如何控制？表格保护怎么操作？

**<span style="font-size:20px;">A</span>**：单元格不可编辑属于工作表保护的功能范畴，需要配置在每个sheet页中`config.authority`，最新的设置参数请参考[工作表保护](/zh/guide/sheet.html#config-authority)。

为了大家便于理解工作表保护的功能使用，下方的视频演示了如何让当前整个工作表不可编辑，但是允许某一列单元格可编辑的功能：

<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=g3162sacwn6" allowFullScreen="true"></iframe>

跟着演示操作一下本地的工作表，然后打开浏览器控制台，使用`luckysheet.getLuckysheetfile()[0].config.authority`就可以获取到第一个工作表的工作表保护参数。

------------

## 数据验证怎么配置？

**<span style="font-size:20px;">A</span>**：最新文档已经提供了数据验证的配置信息，参考[数据验证配置](/zh/guide/sheet.html#dataVerification)。官方也提供了API方法 [setDataVerification](/zh/guide/api.html#setdataverification-optionitem-setting)，用于动态设置数据验证功能。

------------

## Luckysheet通过引入CDN有案例吗？

**<span style="font-size:20px;">A</span>**：Luckysheet支持CDN方式引入，参考：[本地HTML采用cdn加载方式引入Luckysheet的案例](https://www.cnblogs.com/DuShuSir/p/13859103.html)

------------

## 请问一下图片怎么限制在单元格里面自适应高度？

**<span style="font-size:20px;">A</span>**：首先需要对图片设置移动并调整单元格大小，然后有以下几种情况：

- 如果图片位置完全在单元格内部时，当拉长单元格的宽度或高度的时候，图片不会随着单元格的变大而伸缩变大
- 如果图片位置完全在单元格内部时，当拉短单元格的宽度或高度，贴到图片的边时，图片会随着单元格的变小而伸缩变小
- 当这个图片超过单元格的边框时，图片可以跟随单元格大小变化

根据图片的第二个特性，可以操作得到图片位置信息，原理就是将图片的位置设置成和单元格边框重叠（源码中，需要重叠超过2px），以下演示视频展示了怎么将图片限制在单元格里面自适应宽高。

<iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=y3163ya0q6c" allowFullScreen="true"></iframe>

------------

## 如何获取工作表默认的行高列宽？

**<span style="font-size:20px;">A</span>**：有两种方式可以获取

- 一是使用`luckysheet.getLuckysheetfile()`获取到所有工作表配置后，在各个工作表的配置中直接取得默认行高`defaultRowHeight`和默认列宽`defaultColWidth`。
- 二是开放了API可以获取到工作表默认的行高[getDefaultRowHeight](/zh/guide/api.html#getdefaultrowheight-setting)和列宽[getDefaultColWidth](/zh/guide/api.html#getdefaultcolwidth-setting)

------------

## 如何隐藏工作表下方的添加行按钮和回到顶部按钮？

**<span style="font-size:20px;">A</span>**：已开放配置
- 允许添加行 [enableAddRow](/zh/guide/config.html#enableaddrow)
- 允许回到顶部 [enableAddBackTop](/zh/guide/config.html#enableAddBackTop)

------------

## 如何隐藏工作表的行标题和列标题？

**<span style="font-size:20px;">A</span>**：已开放配置
- 行标题区域的宽度 [rowHeaderWidth](/zh/guide/config.html#rowheaderwidth)
- 列标题区域的高度 [columnHeaderHeight](/zh/guide/config.html#columnHeaderHeight)

------------

## 调用什么方法能设置`config.merge`？

**<span style="font-size:20px;">A</span>**：三个方法
- 界面操作
- 用API：[setRangeMerge](/zh/guide/api.html#setrangemerge-type-setting)
- 手动组装merge参数

------------

## 为什么官方公布的新功能没有效果？

**<span style="font-size:20px;">A</span>**：第一步，检查下您是否使用了CDN的方式引入，

Luckysheet教程里采用的CDN链接是 [jsdelivr](https://www.jsdelivr.com/package/npm/luckysheet) 提供的服务，代码是从 [npmjs.com](https://www.npmjs.com/) 自动同步过去的，不是从 [Github](https://github.com/mengshukeji/Luckysheet/) 同步过去的。因为我们新提交的代码，还需要经过一段时间的测试，所以不会立即发布到npm使用，导致了npm的代码稍滞后于Github。

如果需要尝试最新代码，我们强烈建议您从 [Luckysheet Github](https://github.com/mengshukeji/Luckysheet/) 主仓库拉取代码。后续我们版本稳定了，会考虑实时发布npm包。

第二步，如果是引用github仓库打包后的代码，测试判断是否有bug，您可以查找问题并尝试修复，再[提交PR](https://github.com/mengshukeji/Luckysheet/pulls)，如果修复不了，请[提交issues](https://github.com/mengshukeji/Luckysheet/issues)。

------------

## `npm run dev`报错：`Error: Cannot find module 'rollup'`？

**<span style="font-size:20px;">A</span>**：可能是npm包安装问题，尝试以下步骤：
1. `npm cache clean --force`
2. `npm i rimraf -g`
3. `rimraf node_modules`
4. 删除package-lock.json文件
5. `npm i`
6. `npm run dev`

提示：大多数的其他npm安装问题，也可以尝试此步骤来解决。

------------

## 怎样在vue工程里对Luckysheet进行二次开发？

**<span style="font-size:20px;">A</span>**：[luckysheet-vue](https://github.com/mengshukeji/luckysheet-vue) 案例是提供一个应用集成的方案。

如果本地直接开发的话：
1. 把Luckysheet的工程和自己的Vue工程都启动起来，比如Luckysheet的工程在 `http://localhost:3001`
2. 在Vue工程里面通过 `http://localhost:3001` 引入Luckysheet使用

这样的话，Luckysheet实时修改后，Vue工程里是可以看到更改的

------------

## 创建图表时候报错`Store.createChart`？

**<span style="font-size:20px;">A</span>**：需要引入图表插件才能使用，工作簿初始化的时候应该配置图表插件使用，参考

- 插件配置 [plugins](/zh/guide/config.html#配置项)
- 或 官方demo [src/index.html](https://github.com/mengshukeji/Luckysheet/blob/master/src/index.html)

通常，参考demo配置完后就可以和demo一样正常使用了，但是还是会偶现`chartmix is not defined`，这时需要在谷歌浏览器控制台的network里检查下图表的依赖是否都加载了，有5项依赖需要关注：`vue / vuex / element-ui / echarts / chartmix.umd.js`。

------------

## 单元格能增加自定义属性吗？

**<span style="font-size:20px;">A</span>**：直接赋值到单元格对象上的自定义属性会被过滤，要想使得自定义属性生效，需要二开去除过滤属性的代码。

------------

## 如何输入以`'='`开头的文本？例如`=currentDate('YYYY-MM-DD')`，它默认会去掉函数，函数怎么禁止？

**<span style="font-size:20px;">A</span>**：前面加一个单引号就行，会强制识别为字符串，和excel表现一致的。比如：`'=currentDate('YYYY-MM-DD')`

------------

## create回调为什么没有效果？

**<span style="font-size:20px;">A</span>**：API 方法`luckysheet.create()`这个方法没有回调，但是Luckysheet提供了钩子函数用于在指定位置执行回调方法，比如：
- 表格创建之前触发 [workbookCreateBefore](/zh/guide/config.html#workbookcreatebefore)
- 表格创建之后触发 [workbookCreateAfter](/zh/guide/config.html#workbookcreateafter)

------------

## create的时候默认选中第一个单元格，怎么去除？

**<span style="font-size:20px;">A</span>**：选中单元格时默认是高亮，把高亮去除即可，使用API: [setRangeShow](/zh/guide/api.html#setrangeshow-range-setting)

```js
luckysheet.setRangeShow("A2",{show:false})
```

------------

## 右键事件绑定在哪？

**<span style="font-size:20px;">A</span>**：在源码的 [src/controllers/hander.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/handler.js) 搜索`event.which == "3"`即可找到右键事件触发执行的代码。

------------

## 如何添加自定义工具栏？

**<span style="font-size:20px;">A</span>**：暂未提供配置，可以参照工具栏打印按钮的实现来修改源码：
1. 全局搜索 `luckysheet-icon-print`即可找到打印按钮的实现，在 [src/controllers/constant.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/constant.js) 中增加一个类似的模板字符串，需要自定义一个唯一id
2. 修改 [src/controllers/resize.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/resize.js) ，在toobarConfig对象中新增一条记录
3. 修改 [src/controllers/menuButton.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/controllers/menuButton.js) ，新增一个事件监听

------------

## 如何添加自定义公式？

**<span style="font-size:20px;">A</span>**：需要修改两处源码：
1. 在 [src/function/functionImplementation.js](https://github.com/mengshukeji/Luckysheet/blob/master/src/function/functionImplementation.js) 文件中的`functionImplementation`对象中增加一个公式，格式参考`SUM`/`AVERAGE`等公式
2. 修改 [src/locale](https://github.com/mengshukeji/Luckysheet/blob/master/src/locale) 文件目录下所有的语言包，将自己新增的公式说明加到`functionlist`数组中。其中，`t`是函数的类别，`m`是参数的个数，最小参数个数和最大参数个数。

------------

## 有没有类似loadData接口，我想实现先加载10条记录，然后再动态加载数据，这些数据都追加到表格中？

**<span style="font-size:20px;">A</span>**：有的。我们`loadSheetUrl`提供了这个功能，初始化`options.enablePage = true`可以开启。

源码里搜索`enablePage`可以看到，有个`method.addDataAjax`方法，里面就有一个ajax请求，用来动态加载数据，这些数据会追加到表格中。

这个功能现在在文档上是隐藏的，是因为这个接口我们做的时候，接口参数是根据我们实际业务匹配的，可能不太通用，我们准备抽象后再放出来给大家用，如果您想自己用可以依据这个改下。

推荐您考虑自己写接口来加载数据，然后使用`setRangeValue`来在指定位置追加数据，这样的自定义程度更高。

------------
