# 格式属性

## 单元格属性表

<table>
    <tr>
        <td>属性值</td>
        <td>全称</td>
        <td>说明</td>
        <td>值示例</td>
        <td>Aspose方法或者属性</td>
    </tr>
    <tr>
        <td>ct</td>
        <td>celltye</td>
        <td>单元格值格式：文本、时间等</td>
        <td><a href="#cellStyle" target="_blank">单元格格式</a></td>
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
        <td rowspan="2">Style.Font object's Underline property</td>
    </tr>
    <tr>
        <td>ul</td>
        <td>underline</td>
        <td>下划线</td>
        <td>0 常规 、 1 下划线</td>
    </tr>
    <tr>
        <td rowspan="14">bs</td>
        <td rowspan="14">borderstyle</td>
        <td rowspan="14">边框样式</td>
        <td>0 none</td>
        <td rowspan="14">LineStyle</td>
    </tr>
    <tr>
        <td>1 Thin</td>
    </tr>
    <tr>
        <td>2 Hair</td>
    </tr>
    <tr>
        <td>3 Dotted</td>
    </tr>
    <tr>
        <td>4 Dashed</td>
    </tr>
    <tr>
        <td>5 DashDot</td>
    </tr>
    <tr>
        <td>6 DashDotDot</td>
    </tr>
    <tr>
        <td>7 Double</td>
    </tr>
    <tr>
        <td>8 Medium</td>
    </tr>
    <tr>
        <td>9 MediumDashed</td>
    </tr>
    <tr>
        <td>10 MediumDashDot</td>
    </tr>
    <tr>
        <td>11 MediumDashDotDot</td>
    </tr>
    <tr>
        <td>12 SlantedDashDot</td>
    </tr>
    <tr>
        <td>13 Thick</td>
    </tr>
    <tr>
        <td>bc</td>
        <td>bordercolor</td>
        <td>边框颜色</td>
        <td>#fff000</td>
        <td>setBorderColor</td>
    </tr>
    <tr>
        <td>bs_t</td>
        <td>borderstyleTop</td>
        <td>上边框样式</td>
        <td rowspan="8">同上</td>
        <td></td>
    </tr>
    <tr>
        <td>bc_t</td>
        <td>bordercolorTop</td>
        <td>上边框颜色</td>
        <td></td>
    </tr>
    <tr>
        <td>bs_b</td>
        <td>borderstyleBottom</td>
        <td>下边框样式</td>
        <td></td>
    </tr>
    <tr>
        <td>bc_b</td>
        <td>bordercolorBottom</td>
        <td>下边框颜色</td>
        <td></td>
    </tr>
    <tr>
        <td>bs_l</td>
        <td>borderstyleLeft</td>
        <td>左边框样式</td>
        <td></td>
    </tr>
    <tr>
        <td>bc_l</td>
        <td>bordercolorLeft</td>
        <td>左边框颜色</td>
        <td></td>
    </tr>
    <tr>
        <td>bs_r</td>
        <td>borderstyleRight</td>
        <td>右边框样式</td>
        <td></td>
    </tr>
    <tr>
        <td>bc_r</td>
        <td>bordercolorRight</td>
        <td>右边框颜色</td>
        <td></td>
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
        <td>fl</td>
        <td>floatlenght</td>
        <td>小数位数</td>
        <td>3</td>
        <td></td>
    </tr>
    <tr>
        <td>tb</td>
        <td>textbeak</td>
        <td>文本换行</td>
        <td>0 截断、1溢出、2 自动换行</td>
        <td>2：setTextWrapped <br> 0和1：IsTextWrapped =&nbsp;true</td>
    </tr>
    <tr>
        <td>ov</td>
        <td>originvalue</td>
        <td>原始值</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>v</td>
        <td>value</td>
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
```
[
    {r:0, c:1, v: { v:"显示", f:"=SUM(A2)", bg:"#fff000", bs:"1",bc:"#000"}},
    {r:10, c:11, v:"值2"},
    {r:10, c:11, v:{f:"=sum", v:"100"}}
]
```

## <div id='cellStyle'>单元格格式</div>

参考https://docs.aspose.com/display/cellsnet/List+of+Supported+Number+Formats#ListofSupportedNumberFormats-Aspose.Cells

格式设置为：`{ v: "" , f: "" ,ct :{ v:1, f: "#,##0.00",  t:" Decimal" } }`

|参数|说明|使用|
| ------------ | ------------ | ------------ |
|v|value，Aspose中的快捷设置值|var currencyStyle = book.CreateStyle();<br>currencyStyle.Number = 8;|
|f|Format：格式的定义串 `$#,##0;$-#,##0`|var currencyStyle = book.CreateStyle();<br>currencyStyle.Custom  = "#,##0 SEK";|
|t|Type类型：<br>0：General<br>1：Decimal<br>2：Currency<br>3：Percentage<br>4：Scientific<br>5：Fraction<br>6：Date<br>7：Time<br>8：Accounting<br>9：Text<br>10：DateTime|类型是前端区分的格式，excel导入时根据导入format字符的关键字来区分是哪种类型：<br>1.含YYYY、MM、DD的是6|

Aspose设置如下：
| Value | Type       | Format String                               |
|-------|------------|---------------------------------------------|
| 0     | General    | General                                     |
| 1     | Decimal    | 0                                           |
| 2     | Decimal    | 0\.00                                       |
| 3     | Decimal    | \#,\#\#0                                    |
| 4     | Decimal    | \#,\#\#0\.00                                |
| 5     | Currency   | $\#,\#\#0;$\-\#,\#\#0                       |
| 6     | Currency   | $\#,\#\#0;$\-\#,\#\#0                       |
| 7     | Currency   | $\#,\#\#0\.00;$\-\#,\#\#0\.00               |
| 8     | Currency   | $\#,\#\#0\.00;$\-\#,\#\#0\.00               |
| 9     | Percentage | 0%                                          |
| 10    | Percentage | 0\.00%                                      |
| 11    | Scientific | 0\.00E\+00                                  |
| 12    | Fraction   | \# ?/?                                      |
| 13    | Fraction   | \# /                                        |
| 14    | Date       | m/d/yy                                      |
| 15    | Date       | d\-mmm\-yy                                  |
| 16    | Date       | d\-mmm                                      |
| 17    | Date       | mmm\-yy                                     |
| 18    | Time       | h:mm AM/PM                                  |
| 19    | Time       | h:mm:ss AM/PM                               |
| 20    | Time       | h:mm                                        |
| 21    | Time       | h:mm:ss                                     |
| 22    | Time       | m/d/yy h:mm                                 |
| 37    | Currency   | \#,\#\#0;\-\#,\#\#0                         |
| 38    | Currency   | \#,\#\#0;\-\#,\#\#0                         |
| 39    | Currency   | \#,\#\#0\.00;\-\#,\#\#0\.00                 |
| 40    | Currency   | \#,\#\#0\.00;\-\#,\#\#0\.00                 |
| 41    | Accounting | \_ \* \#,\#\#0\_ ;\_ \* "\_ ;\_ @\_         |
| 42    | Accounting | \_ $\* \#,\#\#0\_ ;\_ $\* "\_ ;\_ @\_       |
| 43    | Accounting | \_ \* \#,\#\#0\.00\_ ;\_ \* "??\_ ;\_ @\_   |
| 44    | Accounting | \_ $\* \#,\#\#0\.00\_ ;\_ $\* "??\_ ;\_ @\_ |
| 45    | Time       | mm:ss                                       |
| 46    | Time       | h :mm:ss                                    |
| 47    | Time       | mm:ss\.0                                    |
| 48    | Scientific | \#\#0\.0E\+00                               |
| 49    | Text       | @                                           |

导入/导出只用考虑用户看到的数据样式，例如excel中处理日期格式的方式为把日期统一转换为数字：42736 代表 2017-1-1，