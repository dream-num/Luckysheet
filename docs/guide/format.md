# Format attributes

## Cell attributes table

<table>
    <tr>
        <td>Attribute value</td>
        <td>Full name</td>
        <td><div style="width:100px">Explanation</div></td>
        <td>Example value</td>
        <td>Aspose method or attribute</td>
    </tr>
    <tr>
        <td>ct</td>
        <td>celltype</td>
        <td>Cell value format: text, time, etc.</td>
        <td><a href="#cellStyle">Cell format</a></td>
        <td></td>
    </tr>
    <tr>
        <td>bg</td>
        <td>background</td>
        <td>background color</td>
        <td>#fff000</td>
        <td>setBackgroundColor</td>
    </tr>
    <tr>
        <td>ff</td>
        <td>fontfamily</td>
        <td>Font</td>
        <td>0 Microsoft Yahei, 1 Song, 2 ST Heiti, 3 ST Kaiti, 4 ST FangSong, 5 ST Song, 6 Chinese New Wei, 7 Chinese Xingkai, 8 Chinese Lishu, 9 Arial, 10 Times New Roman, 11 Tahoma, 12 Verdana</td>
        <td>Style.Font object's Name property.</td>
    </tr>
    <tr>
        <td>fc</td>
        <td>fontcolor</td>
        <td>font color</td>
        <td>#fff000</td>
        <td>Style.Font object's Color property</td>
    </tr>
    <tr>
        <td>bl</td>
        <td>bold</td>
        <td>Bold</td>
        <td>0 Regular, 1 Bold</td>
        <td>Style.Font object's IsBold property to true.</td>
    </tr>
    <tr>
        <td>it</td>
        <td>italic</td>
        <td>Italic</td>
        <td>0 Regular, 1 Italic</td>
        <td></td>
    </tr>
    <tr>
        <td>fs</td>
        <td>fontsize</td>
        <td>font size</td>
        <td>14</td>
        <td>Style.Font object's Size property.</td>
    </tr>
    <tr>
        <td>cl</td>
        <td>cancelline</td>
        <td>Cancelline</td>
        <td>0 Regular, 1 Cancelline</td>
        <td rowspan="2">Style.Font object's Underline property</td>
    </tr>
    <tr>
        <td>ul</td>
        <td>underline</td>
        <td>Underline</td>
        <td>0 Regular, 1 Underline</td>
    </tr>
    <tr>
        <td>vt</td>
        <td>verticaltype</td>
        <td>Vertical alignment</td>
        <td>0 middle, 1 up, 2 down</td>
        <td>setVerticalAlignment</td>
    </tr>
    <tr>
        <td>ht</td>
        <td>horizontaltype</td>
        <td>Horizontal alignment</td>
        <td>0 center, 1 left, 2 right</td>
        <td>setHorizontalAlignment</td>
    </tr>
    <tr>
        <td>mc</td>
        <td>mergecell</td>
        <td>Merge Cells</td>
        <td>{rs: 10, cs:5} indicates that the cells from this cell to 10 rows and 5 columns are merged.</td>
        <td>Merge</td>
    </tr>
    <tr>
        <td>tr</td>
        <td>textrotate</td>
        <td>Text rotation</td>
        <td>0:  0、1:  45 、2: -45、3 Vertical text、4:  90 、5: -90</td>
        <td>setRotationAngle</td>
    </tr>
    <tr>
        <td>fl</td>
        <td>floatlenght</td>
        <td>Decimal places</td>
        <td>3</td>
        <td></td>
    </tr>
    <tr>
        <td>tb</td>
        <td>textbeak</td>
        <td>Text wrap</td>
        <td>0 truncation, 1 overflow, 2 word wrap</td>
        <td>2: setTextWrapped <br> 0和1: IsTextWrapped =&nbsp;true</td>
    </tr>
    <tr>
        <td>ov</td>
        <td>originvalue</td>
        <td>Original value</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>v</td>
        <td>value</td>
        <td>Display value</td>
        <td></td>
        <td></td>
    </tr>
    <tr>
        <td>f</td>
        <td>function</td>
        <td>formula</td>
        <td></td>
        <td>setFormula <br> setArrayFormula <br> workbook.calculateFormula();</td>
    </tr>
</table>


The following is the storage of 3 cells:
```json
[
    {r:0, c:1, v: { v:"display", f:"=SUM(A2)", bg:"#fff000", bs:"1",bc:"#000"}},
    {r:10, c:11, v:"value2"},
    {r:10, c:11, v:{f:"=sum", v:"100"}}
]
```

## <div id='cellStyle'>Cell format</div>

Reference[Aspose.Cells](https://docs.aspose.com/display/cellsnet/List+of+Supported+Number+Formats#ListofSupportedNumberFormats-Aspose.Cells)

The format is set to:

```json
{
    "v": "",
    "f": "",
    "ct": {
        "v": 1,
        "f": "#,##0.00",
        "t": " Decimal"
    }
}
```

|Parameter|Explanation|Usage|
| ------------ | ------------ | ------------ |
|v|value, shortcut setting value in Aspose|`var currencyStyle = book.CreateStyle();`<br>`currencyStyle.Number = 8;`|
|f|Format: format definition string `$#,##0;$-#,##0`|`var currencyStyle = book.CreateStyle();`<br>`currencyStyle.Custom  = "#,##0 SEK";`|
|t|Type: <br>0: General<br>1: Decimal<br>2: Currency<br>3: Percentage<br>4: Scientific<br>5: Fraction<br>6: Date<br>7: Time<br>8: Accounting<br>9: Text<br>10: DateTime|The type is the format distinguished by the front end. When importing excel, the type is distinguished according to the keyword of the format character:<br>1. YYYY, MM, DD is 6|

Aspose is set as follows:
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

Import/export only considers the data style that the user sees. For example, the way to process the date format in excel is to convert the date into a number: 42736 represents 2017-1-1.