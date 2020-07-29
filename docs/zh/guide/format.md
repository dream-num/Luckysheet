# 格式属性

## 单元格属性表

<table>
    <tr>
        <td>属性值</td>
        <td>全称</td>
        <td><div style="width:100px">说明</div></td>
        <td>值示例</td>
        <td>Aspose方法或者属性</td>
    </tr>
    <tr>
        <td>ct</td>
        <td>celltype</td>
        <td>单元格值格式：文本、时间等</td>
        <td><a href="#cellStyle">单元格格式</a></td>
        <td></td>
    </tr>
    <tr>
        <td>bg</td>
        <td>background</td>
        <td>背景颜色</td>
        <td>#fff000</td>
        <td>setBackgroundColor</td>
    </tr>
    <tr>
        <td>ff</td>
        <td>fontfamily</td>
        <td>字体</td>
        <td>0 微软雅黑、1 宋体（Song）、2 黑体（ST Heiti）、3 楷体（ST Kaiti）、 4仿宋（ST FangSong）、 5 新宋体（ST Song）、 6 华文新魏、 7华文行楷、 8 华文隶书、 9 Arial、 10 Times New Roman 、11 Tahoma 、12 Verdana</td>
        <td>Style.Font object's Name property.</td>
    </tr>
    <tr>
        <td>fc</td>
        <td>fontcolor</td>
        <td>字体颜色</td>
        <td>#fff000</td>
        <td>Style.Font object's Color property</td>
    </tr>
    <tr>
        <td>bl</td>
        <td>bold</td>
        <td>粗体</td>
        <td>0 常规 、 1加粗</td>
        <td>Style.Font object's IsBold property to true.</td>
    </tr>
    <tr>
        <td>it</td>
        <td>italic</td>
        <td>斜体</td>
        <td>0 常规 、 1 斜体</td>
        <td></td>
    </tr>
    <tr>
        <td>fs</td>
        <td>fontsize</td>
        <td>字体大小</td>
        <td>14</td>
        <td>Style.Font object's Size property.</td>
    </tr>
    <tr>
        <td>cl</td>
        <td>cancelline</td>
        <td>删除线</td>
        <td>0 常规 、 1 删除线</td>
        <td>Style.Font object's Underline property</td>
    </tr>
    <tr>
        <td>vt</td>
        <td>verticaltype</td>
        <td>垂直对齐</td>
        <td>0 中间、1 上、2下</td>
        <td>setVerticalAlignment</td>
    </tr>
    <tr>
        <td>ht</td>
        <td>horizontaltype</td>
        <td>水平对齐</td>
        <td>0 居中、1 左、2右</td>
        <td>setHorizontalAlignment</td>
    </tr>
    <tr>
        <td>mc</td>
        <td>mergecell</td>
        <td>合并单元格</td>
        <td>{ rs: 10, cs:5 } 表示从此cell开始到10行5列的cell进行合并。</td>
        <td>Merge</td>
    </tr>
    <tr>
        <td>tr</td>
        <td>textrotate</td>
        <td>文字旋转</td>
        <td>0： 0、1： 45 、2：-45、3 竖排文字、4： 90 、5：-90</td>
        <td>setRotationAngle</td>
    </tr>
    <tr>
        <td>tb</td>
        <td>textbeak</td>
        <td>文本换行</td>
        <td>0 截断、1溢出、2 自动换行</td>
        <td>2：setTextWrapped <br> 0和1：IsTextWrapped =&nbsp;true</td>
    </tr>
    <tr>
        <td>v</td>
        <td>value</td>
        <td>原始值</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>m</td>
        <td>monitor</td>
        <td>显示值</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>f</td>
        <td>function</td>
        <td>公式</td>
        <td></td>
        <td>setFormula <br> setArrayFormula <br> workbook.calculateFormula();</td>
    </tr>
</table>


以下为3个单元格存储：
```json
[
    {
        "r": 10,
        "c": 11,
        "v": {
            "f": "=MAX(A7:A9)",
            "ct": {
                "fa": "General",
                "t": "n"
            },
            "v": 100,
            "m": "100"
        }
    },
    {
        "r": 0,
        "c": 1,
        "v": {
            "v": 12,
            "f": "=SUM(A2)",
            "bg": "#fff000"
        }
    },
    {
        "r": 10,
        "c": 11,
        "v": "值2"
    }
]
```

## <div id='cellStyle'>单元格格式</div>

参考[Aspose.Cells](https://docs.aspose.com/display/cellsnet/List+of+Supported+Number+Formats#ListofSupportedNumberFormats-Aspose.Cells)

格式设置为：

```json
{
    "ct": {
        "fa": "General",
        "t": "g"
    },
    "m": "2424",
    "v": 2424
}
```

|参数|说明|值|
| ------------ | ------------ | ------------ |
|fa|Format格式的定义串| 如"General"|
|t|Type类型|如"g"|

可选择的设置如下：
| 格式 | ct.fa值  | ct.t值 | m值示例 |备注 |
|----------|----------|-------------------------|------------------------- |------------------------- |
| 自动        | General    | g                  | Luckysheet ||
| 纯文本      | @    | s                         | Luckysheet ||
| <br><br><br>**数字格式** | | | | |
| 整数      | 0 | n                     | 1235 | 0位小数 ||
| 数字一位小数        | 0.0 | n  | 1234.6 | 0.0中,点后面0的个数就代表小数位数,原始数字位数大,设置位数小时会做四舍五入 |
| 数字两位小数      | 0.00   | n  | 1234.56 ||
| 更多数字格式      | #,##0   | n  | 1,235 ||
| 更多数字格式     | #,##0.00   | n  | 1,234.56 ||
| 更多数字格式    | #,##0_);(#,##0)   | n  | 1,235 ||
| 更多数字格式    | #,##0_);[Red](#,##0)   | n  | 1,235 ||
| 更多数字格式    | #,##0.00_);(#,##0.00)   | n  | 1,234.56 ||
| 更多数字格式    | #,##0.00_);[Red](#,##0.00)   | n  | 1,234.56 ||
| 更多数字格式    | $#,##0_);($#,##0)   | n  | $1,235 ||
| 更多数字格式    | $#,##0_);[Red]($#,##0)   | n  | $1,235 ||
| 更多数字格式    | $#,##0.00_);($#,##0.00)   | n  | $1,234.56 ||
| 更多数字格式    | $#,##0.00_);[Red]($#,##0.00)   | n  | $1,234.56 ||
| 更多数字格式    | _($* #,##0_);_(...($* "-"_);_(@_)   | n  | $ 1,235 ||
| 更多数字格式    | _(* #,##0_);_(*..._(* "-"_);_(@_)   | n  | 1,235 ||
| 更多数字格式    | _($* #,##0.00_);_(...($* "-"_);_(@_)   | n  | $ 1,234.56 ||
| 更多数字格式    | _(* #,##0.00_);...* "-"??_);_(@_)   | n  | 1,234.56 ||
| 百分比整数      | 0%    | n          | 123456% |也支持 #0% 的用法|
| 百分比      | 0.00%     | n          | 123456.00% |也支持 #0.00% 的用法,点后面0的个数就代表小数位数|
| 科学计数    | 0.00E+00    | n        | 1.23E+03 ||
| 科学计数    | ##0.0E+0    | n        | 1.2E+3 ||
| 分数    | # ?/?    | n        | 1234 5/9 ||
| 分数    | # ??/??    | n        | 1234 14/25 ||
| 万元        | w   | n                         |12万3456||
| 万元2位小数  | w0.00   | n                    |12万3456.00|| 
| 会计        | ¥(0.00)   | n                   ||

| 货币        | ¥0.00 或者 ¥ #.00 | n           ||
| 日期         | yyyy-MM-dd | d                 ||
| 时间        | hh:mm AM/PM | d                 ||
| 时间24H     | hh:mm | d                       ||
| 日期时间    | yyyy-MM-dd hh:mm AM/PM   | d    ||
| 日期时间24H | yyyy-MM-dd hh:mm   | d           ||
| 日期时间24H | yyyy-MM-dd hh:mm   | d           ||

导入/导出只用考虑用户看到的数据样式，例如excel中处理日期格式的方式为把日期统一转换为数字：42736 代表 2017-1-1