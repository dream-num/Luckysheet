<div align="center">

![logo](/docs/.vuepress/public/img/logo_text.png)


</div>

简体中文 | [English](./README.md)

## 介绍
🚀Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

> Luckysheet最近参加了“2020年度OSC中国开源项目评选”，为了支持Luckysheet更好的得到关注和发展，请大家帮忙投票: [https://www.oschina.net/p/luckysheet](https://www.oschina.net/p/luckysheet)。

## 相关链接
 | 源码   | 文档 | Demo | 插件Demo | 论坛 | 资源 |
 | ------ | -------- | ------ | ------ | ------ | ------ |
 | [Github](https://github.com/mengshukeji/Luckysheet)| [在线文档](https://mengshukeji.github.io/LuckysheetDocs/zh/) | [在线Demo](https://mengshukeji.github.io/LuckysheetDemo) | [导入Excel Demo](https://mengshukeji.github.io/LuckyexcelDemo/) | [中文论坛](https://support.qq.com/product/288322) | [LuckyResources](https://github.com/mengshukeji/LuckyResources) |
 | [Gitee镜像](https://gitee.com/mengshukeji/Luckysheet)| [Gitee在线文档](https://mengshukeji.gitee.io/LuckysheetDocs/zh/) | [Gitee在线Demo](https://mengshukeji.gitee.io/luckysheetdemo/) | [Gitee导入Excel Demo](https://mengshukeji.gitee.io/luckyexceldemo/) | [Google Group](https://groups.google.com/g/luckysheet) |

![演示](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## 在线案例

- [协同编辑Demo](http://luckysheet.lashuju.com/demo/)（注意：官方Java后台待整理后也会开源，采用OT算法。请大家别操作频繁，防止搞崩服务器）

## 插件
- excel导入导出库: [Luckyexcel](https://github.com/mengshukeji/Luckyexcel)
- 图表插件: [chartMix](https://github.com/mengshukeji/chartMix)

## 特性

### 🛠️格式设置
+ **样式** (修改字体样式，字号，颜色或者其他通用的样式)
+ **条件格式** (突出显示所关注的单元格或单元格区域；强调异常值；使用数据栏、色阶和图标集（与数据中的特定变体对应）直观地显示数据)
+ **文本对齐及旋转** 
+ **支持文本的截断、溢出、自动换行** 
+ **数据类型** 
	+ **货币, 百分比, 数字, 日期** 
	+ **Custom** (和excel保持一致，例如： `##,###0.00` , `$1,234.56$##,###0.00_);[Red]($##,###0.00)`, `_($* ##,###0.00_);_(...($* "-"_);_(@_)`, `08-05 PM 01:30MM-dd AM/PM hh:mm` )
+ **单元格内多样式** (Alt+Enter单元格内换行、上标、下标、单元格内可定义每个文字的不同样式)

### 🧬单元格
+ **拖拽选取来修改单元格** (对选区进行操作，可以拖动四边来移动选区，也可以在右下角对选区进行下拉填充操作)
+ **选取下拉填充** (对于一个1,2,3,4,5的序列，将会按照间隔为1进行下拉填充，而对2,4,6,8将会以2作为间隔。支持等差数列，等比数列，日期，周，天，月，年，中文数字填充)
+ **自动填充选项** (下拉填充后，会出现填充选项的菜单，支持选择复制，序列，仅格式，只填充格式，天，月，年的选择)
+ **多选区操作** (可以按住Ctrl键进行单元格多选操作，支持多选区的复制粘贴)
+ **查找和替换** (对内容进行查找替换，支持正则表达式，整词，大小写敏感)
+ **定位** (可以根据单元格的数据类型进行自动定位并选中，选中后可以批量进行格式等操作)
+ **合并单元格**
+ **数据验证(表单功能)**  (支持Checkbox, drop-down list, datePicker)

### 🖱️行和列操作
+ **隐藏，插入，删除行或列** 
+ **冻结行或列** (支持冻结首行和首列，冻结到选区，冻结调节杆可以进行拖动操作)
+ **文本分列** (可以把文本根据不同符号进行拆分，和excel的分列功能类似)

### 🔨操作体验
+ **撤销/重做**
+ **复制/粘贴/剪切操作** (支持Luckysheet到excel和excel到Luckysheet带格式的互相拷贝)
+ **快捷键支持** (快捷键操作保持与excel一致，如果有不同或者缺失请反馈给我们)
+ **格式刷** (与google sheet类似)
+ **任意选区拖拽** (选择单元格，输入公式，插入图表，会与选区相关，可以通过任意拖动和放大缩小选区来改变与之关联的参数)

### ⚙️公式和函数
+ **内置公式**
	+ 数学 (SUMIFS, AVERAGEIFS, SUMIF, SUM, etc.)
	+ 文本 (CONCATENATE, REGEXMATCH, MID)
	+ 日期 (DATEVALUE, DATEDIF, NOW, WEEKDAY, etc.)
	+ 财务 (PV, FV, IRR, NPV, etc.)
	+ 逻辑 (IF, AND, OR, IFERROR, etc.)
	+ 查找和引用 (VLOOKUP, HLOOkUP, INDIRECT, OFFSET, etc.)
	+ 动态数组 (Excel2019新函数，SORT,FILTER,UNIQUE,RANDARRAY,SEQUENCE)
+ **公式支持数组** (={1,2,3,4,5,6}, Crtl+Shift+Enter)
+ **远程公式** (DM_TEXT_TFIDF, DM_TEXT_TEXTRANK,DATA_CN_STOCK_CLOSE etc. Need remote interface, can realize complex calculation)
+ **自定义公式**  (根据身份证识别年龄，性别，生日，省份，城市等. AGE_BY_IDCARD, SEX_BY_IDCARD, BIRTHDAY_BY_IDCARD, PROVINCE_BY_IDCARD, CITY_BY_IDCARD, etc. 可以任意加入自己的公式哦)

### 📐表格操作
+ **筛选** (支持颜色、数字、字符、日期的筛选)
+ **排序** (同时加入多个字段进行排序)

### 📈数据透视表
+ **字段拖拽** (操作方式与excel类似，拖动字段到行、列、数值、筛选等4个区域)
+ **聚合方式**  (支持汇总、计数、去重计数、平均、最大、最小、中位数、协方差、标准差、方差等计算)
+ **筛选数据** (可对字段进行筛选后再进行汇总)
+ **数据透视表下钻** (双击数据透视表中的数据，可以下钻查看到明细，操作方式与excel一致)
+ **根据数据透视表新建图表** (数据透视表产生的数据也可以进行图表的制作)

### 📊图表
+ **支持的图表类型** (目前折线图、柱状图、面积图、条形图、饼图可以使用，散点图、雷达图、仪表盘、漏斗图正在接入，其他图表正在陆续开发中，请大家给予建议) 
+ **关于图表插件**  (图表使用了一个中间插件[ChartMix](https://github.com/mengshukeji/chartMix)(MIT协议): 目前支持ECharts，正在逐步接入Highcharts、阿里G2、amCharts、googleChart、chart.js)
+ **Sparklines小图** (以公式的形式进行设置和展示，目前支持：折线图、面积图、柱状图、累积图、条形图、离散图、三态图、饼图、箱线图等)

### ✍️分享及写作
+ **评论** (评论的删除、添加、修改、隐藏)
+ **共享编辑** (支持多用户共享编辑，内置API)

### 📚插入对象
+ **插入图片** (支持JPG,PNG,SVG的插入、修改和删除，并且随表格的变动而产生变化)

### ⚡Luckysheet专有
+ **矩阵计算** (通过右键菜单进行支持：对选区内的数据进行转置、旋转、数值计算)
+ **截图** (把选区的内容进行截图展示)
+ **复制到其他格式** (右键菜单的"复制为", 支持复制为json、array、对角线数据、去重等)
+ **EXCEL导入及导出** (专为Luckysheet打造的导入导出插件，支持密码、水印、公式等的本地导入导出，导出正在开发)

### ⏱️未来开发计划
+ **打印及设置** (像excel一样进行打印设置，并导出为图片或者PDF)
+ **树形菜单** (类似excel中的分级显示（分组）)
+ **表格新功能** (类似excel中表格的筛选器和切片器)
+ **CSV,TXT导入及导出** (专为Luckysheet打造的导入导出插件，支持密码、水印、公式等的本地导入导出)
+ **插入svg形状** (支持[Pen tool](https://github.com/mengshukeji/Pentool)的插入、修改和删除，并且随表格的变动而产生变化)
+ **文档** (完善文档和API)
+ **敬请期待...** (可以提出好的建议给我们)

## 环境
[Node.js](https://nodejs.org/en/) Version >= 6 

## 安装
```
npm install
npm install gulp -g
```

## 开发
开发
```
npm run dev
```
打包
```
npm run build
```

## 用法

#### 第一步
通过CDN引入依赖

```
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet/dist/luckysheet.umd.js"></script>
```
#### 第二步
指定一个表格容器
```
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
#### 第三步
创建一个表格
```
<script>
    $(function () {
        //配置项
        var options = {
            container: 'luckysheet' //luckysheet为容器id
        }
        luckysheet.create(options)
    })
</script>
```

## 合作项目

- [鲁班h5](https://github.com/ly525/luban-h5)
- [excelize](https://github.com/360EntSecGroup-Skylar/excelize)
- [h5-Dooring](https://github.com/MrXujiang/h5-Dooring)

## 贡献

1. 任何疑问或者建议，欢迎提交[Issues](https://github.com/mengshukeji/Luckysheet/issues/new/choose)
2. 详细了解：[如何参与贡献](https://github.com/mengshukeji/Luckysheet/issues/128)


## 交流

- 添加小编微信,拉你进Luckysheet开发者交流微信群,备注:加群

  <img src="/docs/.vuepress/public/img/%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg" width = "200" alt="微信群" align="center" />

或者

- 加入Luckysheet开发者交流QQ群
  
  <img src="/docs/.vuepress/public/img/QQ%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg" width = "200" alt="微信群" align="center" />

[英文社群](./README.md)

## 赞助

如果你感觉这个项目对你有用或者有所启发，可以请作者喝杯果汁：

注意事项：
1. 付款留言请备注：昵称，您的网站地址
2. 默认会将您加入到下方的赞助者列表。如果您想匿名赞助，付款留言请备注：匿名
3. 如果您忘记留言昵称或者网站地址，请联系小编email: alexads@foxmail.com或者微信：dushusir2。

|  微信  | 支付宝 |
|---|---|
| <img src="https://minio.cnbabylon.com/public/luckysheet/wechat.jpg" width="140" />| <img src="https://minio.cnbabylon.com/public/luckysheet/alipay.jpg" width="130" /> |

### [Paypal Me](https://www.paypal.me/wbfsa)

## 赞助者列表
（按时间顺序排列）
- *勇 ¥ 30
- 虚我 ¥ 200
- 甜党 ¥ 50
- Alphabet(Google)-gcf ¥ 1
- **平 ¥ 100
- **东 ¥ 10
- debugger ¥ 20
- 烦了烦 ¥ 10

## 贡献者和感谢

### 团队成员
- [@wbfsa](https://github.com/wbfsa)
- [@wpxp123456](https://github.com/wpxp123456)
- [@tonytonychopper123](https://github.com/tonytonychopper123)
- [@Dushusir](https://github.com/Dushusir)
- [@c19c19i](https://weibo.com/u/3884623955)

### 活跃成员
- [@danielcai1987](https://github.com/danielcai1987)
- [@qq6690876](https://github.com/qq6690876)
- [@javahuang](https://github.com/javahuang)
- [@TimerGang](https://github.com/TimerGang)
- [@gsw945](https://github.com/gsw945)
- [@swen-xiong](https://github.com/swen-xiong)

## 版权信息
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji
