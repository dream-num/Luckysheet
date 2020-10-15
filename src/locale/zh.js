export default {
    functionlist:[{
        'n': 'SUMIF',
        't': 0,
        'd': '对范围中符合指定条件的值求和。',
        'a': '对范围中符合指定条件的值求和。',
        'm': [2, 3],
        'p': [{
            'name': '范围',
            'detail': '要根据条件进行检测的范围。',
            'example': 'A1:A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '条件',
            'detail': '要应用于范围的模式或测试条件。\n\n如果范围包含的是要检测的文本，则条件必须为字符串。条件可以包含通配符，包括用于匹配单个字符的?或用于匹配零个或连续多个字符的*。要匹配问号星号本身，请在该字符前面加上波浪号(~)前缀（即~?和~*）。字符串条件必须用引号括起来。函数会检查范围中的每个单元格与条件是否相等或匹配（如果使用了通配符）。\n\n如果范围包含的是要检测的数字，则条件可以是字符串也可以是数字。如果给定的条件是一个数字，则检查范围中的每个单元格是否等于条件。另外，条件也可能是包含数字的字符串（也将对其进行相等检测），或者带有以下前缀的数字：=（检查是否相等）、>（检查范围单元格的值是否大于条件值）或<（检查范围单元格的值是否小于条件值）',
            'example': '">20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '求和范围',
            'detail': '要求和的范围（如果与范围不同）。',
            'example': 'B1:B10',
            'require': 'o',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'TAN',
        't': 0,
        'd': '返回已知角度的正切值。',
        'a': '返回已知角度的正切值。',
        'm': [1, 1],
        'p': [{
            'name': '角度',
            'detail': '要求其正切值的角度，以弧度表示。',
            'example': '45*PI()/180',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TANH',
        't': 0,
        'd': '返回给定实数的双曲正切值。',
        'a': '返回给定实数的双曲正切值。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其双曲正切值的实数。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CEILING',
        't': 0,
        'd': '将数值向上取整为最接近的指定因数的倍数。',
        'a': '将数值向上取整为最接近的指定因数的倍数。',
        'm': [2, 2],
        'p': [{
            'name': '值',
            'detail': '要向上舍入的数值。',
            'example': '23.25',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '因数',
            'detail': '要将值舍入到此数的整数倍。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ATAN',
        't': 0,
        'd': '返回数值的反正切值，以弧度表示。',
        'a': '返回数值的反正切值',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其反正切值的数值。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ASINH',
        't': 0,
        'd': '返回数值的反双曲正弦值。',
        'a': '返回数值的反双曲正弦值。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其反双曲正弦值的数值。',
            'example': '0.9',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ABS',
        't': 0,
        'd': '返回数值的绝对值。',
        'a': '返回数值的绝对值。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要返回其绝对值的数。',
            'example': '-2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ACOS',
        't': 0,
        'd': '返回数值的反余弦值，以弧度表示。',
        'a': '返回数值的反余弦值',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其反余弦值的数值。必须介于-1和1之间，包括两端值。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ACOSH',
        't': 0,
        'd': '返回数值的反双曲余弦值。',
        'a': '返回数值的反双曲余弦值。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其反双曲余弦值的数值。必须大于等于1。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MULTINOMIAL',
        't': 0,
        'd': '返回参数和的阶乘除以各参数阶乘的乘积后得到的值。',
        'a': '返回参数和的阶乘除以各参数阶乘的乘积后得到的值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '用于计算的第一项数值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2',
            'detail': '用于计算的其他数值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ATANH',
        't': 0,
        'd': '返回数值的反双曲正切值。',
        'a': '返回数值的反双曲正切值。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其反双曲正切值的数值。必须介于-1和1之间（不包括-1和1）。',
            'example': '0.9',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ATAN2',
        't': 0,
        'd': '以弧度为单位返回 x 轴与从原点 (0,0) 到指定坐标点 (`x`,`y`) 之间连线的夹角。',
        'a': '以弧度为单位返回 x 轴与从原点 (0,0) 到指定坐标点 (`x`,`y`) 之间连线的夹角。',
        'm': [2, 2],
        'p': [{
            'name': 'x',
            'detail': '要计算其与x轴夹角大小的线段的终点x坐标。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'y',
            'detail': '要计算其与x轴夹角大小的线段的终点y坐标。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUNTBLANK',
        't': 1,
        'd': '返回给定范围内的空单元格数。',
        'a': '返回给定范围内的空单元格数。',
        'm': [1, 1],
        'p': [{
            'name': '范围',
            'detail': '要统计空白单元格数量的范围。',
            'example': 'A2:C100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'COSH',
        't': 0,
        'd': '返回给定实数的双曲余弦值。',
        'a': '返回给定实数的双曲余弦值。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其双曲余弦值的实数值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'INT',
        't': 0,
        'd': '将数值向下取整为小于或等于该数的最接近的整数。',
        'a': '将数值向下取整为小于或等于该数的最接近的整数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要向下取整为最接近的整数的数值。',
            'example': '99.44',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ISEVEN',
        't': 0,
        'd': '检查所提供的数值是否为偶数。',
        'a': '检查所提供的数值是否为偶数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要验证其是否为偶数的数值。\n\n如果值为偶数或指向包含偶数的单元格的引用，ISEVEN将返回TRUE，否则返回FALSE。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ISODD',
        't': 0,
        'd': '检查所提供的数值是否为奇数。',
        'a': '检查所提供的数值是否为奇数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要验证其是否为奇数的数值。\n\n如果值为奇数或指向包含奇数的单元格，ISODD将返回TRUE，否则返回FALSE。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LCM',
        't': 0,
        'd': '返回一个或多个整数的最小公倍数。',
        'a': '返回一个或多个整数的最小公倍数。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '要在求最小公倍数数的计算中检查其因数的第一项数值或范围。',
            'example': 'A2:A5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2',
            'detail': '[可选] - 在求最小公倍数时要考虑其因数的其他数值或范围。',
            'example': '3',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LN',
        't': 0,
        'd': '返回数值以 e（欧拉数）为底的对数。',
        'a': '返回数值以 e（欧拉数）为底的对数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要以 e 为底数计算其对数的值。\n\n值必须为正数。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LOG',
        't': 0,
        'd': '根据指定底数返回数字的对数。',
        'a': '根据指定底数返回数字的对数。',
        'm': [1, 2],
        'p': [{
            'name': '值',
            'detail': '想要计算其对数的正实数。',
            'example': '128',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '底数',
            'detail': '[可选] - 对数的底数。',
            'example': '2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LOG10',
        't': 0,
        'd': '返回数值以10为底的对数。',
        'a': '返回数值以10为底的对数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其以10为底的对数的数值。\n\n值必须为正值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MOD',
        't': 0,
        'd': '返回两数相除的余数, 结果的符号与除数相同。',
        'a': '返回两数相除的余数。',
        'm': [2, 2],
        'p': [{
            'name': '被除数',
            'detail': '要将其相除以得到余数的数值。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '除数',
            'detail': '用于除其他数的数值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MROUND',
        't': 0,
        'd': '将数值取整为另一整数最接近的整数倍。',
        'a': '将数值取整为另一整数最接近的整数倍。',
        'm': [2, 2],
        'p': [{
            'name': '值',
            'detail': '要取整为另一整数最接近的整数倍的数值。',
            'example': '21',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '因数',
            'detail': '值将取此因数的整数倍。',
            'example': '14',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ODD',
        't': 0,
        'd': '将数值向上取整为最接近的奇整数。',
        'a': '将数值向上取整为最接近的奇整数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要向上取整的数值，取整值为大于此值的最接近的奇数。\n\n如果值为负数，则将其取整为绝对值大于该值的相邻负奇数。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUMSQ',
        't': 0,
        'd': '返回一组数值和/或单元格的平方总和。',
        'a': '返回一组数值和/或单元格的平方总和。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '要将其平方相加的第一个数值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 要将其平方与值1的平方相加的其他数值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'COMBIN',
        't': 0,
        'd': '给定集合中的对象总数和要选择的对象数量，返回共有多少种不同选择方式。',
        'a': '给定集合中的对象总数和要选择的对象数量',
        'm': [2, 2],
        'p': [{
            'name': 'n',
            'detail': '要从中进行选择的对象集合的大小。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'k',
            'detail': '要选择的对象数量。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUM',
        't': 0,
        'd': '返回一组数值和/或单元格的总和。',
        'a': '返回一组数值和/或单元格的总和。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '要相加的第一个数值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2',
            'detail': '[可选] - 要相加的其他数值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'SUBTOTAL',
        't': 0,
        'd': '使用指定的汇总函数，返回一系列纵向单元格的分类汇总。',
        'a': '使用指定的汇总函数',
        'm': [2, 256],
        'p': [{
            'name': '函数代码',
            'detail': '用于计算分类汇总的函数。\n\n1代表AVERAGE\n\n2代表COUNT\n\n3代表COUNTA\n\n4代表MAX\n\n5代表MIN\n\n6代表PRODUCT\n\n7代表STDEV\n\n8代表STDEVP\n\n9代表SUM\n\n10代表VAR\n\n11代表VARP\n\n通过在这些2位代码前附加10（对于1位代码）或1（对于2位代码），可以将隐藏值忽略。例如，102代表忽略隐藏单元格的COUNT，而110则代表忽略隐藏值的VAR。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '范围1',
            'detail': '要计算分类汇总的第一个范围。',
            'example': 'A2:A5',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '范围2',
            'detail': '[可选] - 要计算分类汇总的其他范围。',
            'example': 'B2:B8',
            'require': 'o',
            'repeat': 'y',
            'type': 'range'
        }]
    }, {
        'n': 'ASIN',
        't': 0,
        'd': '返回数值的反正弦值，以弧度表示。',
        'a': '返回数值的反正弦值',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其反正弦值的数值。必须介于-1和1之间，包括两端值。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUNTIF',
        't': 1,
        'd': '返回范围内满足某个条件的单元格的数量。',
        'a': '返回范围内满足某个条件的单元格的数量。',
        'm': [2, 2],
        'p': [{
            'name': '范围',
            'detail': '要根据条件进行检测的范围。',
            'example': 'A1:A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '条件',
            'detail': '要应用于范围的模式或测试条件。\n\n如果范围包含的是要检测的文本，则条件必须为字符串。条件可以包含通配符，包括用于匹配单个字符的?或用于匹配零个或连续多个字符的*。要匹配问号星号本身，请在该字符前面加上波浪号(~)前缀（即~?和~*）。字符串条件必须用引号括起来。函数会检查范围中的每个单元格与条件是否相等或匹配（如果使用了通配符）。\n\n如果范围包含的是要检测的数字，则条件可以是字符串也可以是数字。如果给定的条件是一个数字，则检查范围中的每个单元格是否等于条件。另外，条件也可能是包含数字的字符串（也将对其进行相等检测），或者带有以下前缀的数字：=、>、>=、<或<=，这些条件将分别用于检查范围中的单元格是否等于、大于、大于等于、小于、小于等于条件值。',
            'example': '">20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'RADIANS',
        't': 0,
        'd': '将以度表示的角度值转换为弧度。',
        'a': '将以度表示的角度值转换为弧度。',
        'm': [1, 1],
        'p': [{
            'name': '角度',
            'detail': '要从度转换为弧度的角度。',
            'example': '180',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'RAND',
        't': 0,
        'd': '返回一个介于0和1之间（包括0但不包括1）的随机数。',
        'a': '返回一个介于0和1之间（包括0但不包括1）的随机数。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'COUNTUNIQUE',
        't': 0,
        'd': '计算一列指定值和范围中不重复数值的个数。',
        'a': '计算一列指定值和范围中不重复数值的个数。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '要检查其是否唯一的第一个值或范围。',
            'example': 'A1:C100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2',
            'detail': '[可选] - 要检查是否唯一的其他值或范围。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'DEGREES',
        't': 0,
        'd': '将以弧度表示的角度值转换为度。',
        'a': '将以弧度表示的角度值转换为度。',
        'm': [1, 1],
        'p': [{
            'name': '角度',
            'detail': '要从弧度转换为度的角度。',
            'example': 'PI()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ERFC',
        't': 9,
        'd': '返回数值的互补高斯误差函数。',
        'a': '返回数值的互补高斯误差函数。',
        'm': [1, 1],
        'p': [{
            'name': 'z',
            'detail': '要为其计算互补高斯误差函数的数值。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'EVEN',
        't': 0,
        'd': '将数值向上取整为最接近的偶整数。',
        'a': '将数值向上取整为最接近的偶整数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要向上取整的数值，取整值为大于此值的最接近的偶数。\n\n如果值为负数，则将其取整为绝对值大于该值的相邻负偶数。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'EXP',
        't': 0,
        'd': '返回欧拉数 e (~2.718) 的指定次幂。',
        'a': '返回欧拉数 e (~2.718) 的指定次幂。',
        'm': [1, 1],
        'p': [{
            'name': '指数',
            'detail': '指定e的自乘幂次值。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FACT',
        't': 0,
        'd': '返回数值的阶乘。',
        'a': '返回数值的阶乘。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算并返回其阶乘的数字或对数字（所在单元格）的引用。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FACTDOUBLE',
        't': 0,
        'd': '返回数值的“双阶乘”。',
        'a': '返回数值的“双阶乘”。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算并返回其双阶乘的数字或对数字（所在单元格）的引用。',
            'example': '6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PI',
        't': 0,
        'd': '返回带有14位小数的 PI 值。',
        'a': '返回带有14位小数的 PI 值。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'FLOOR',
        't': 0,
        'd': '将数值向下取整为指定因数的最接近的整数倍。',
        'a': '将数值向下取整为指定因数的最接近的整数倍。',
        'm': [2, 2],
        'p': [{
            'name': '值',
            'detail': '要向下舍入为因数的最接近整数倍的数值。',
            'example': '23.25',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '因数',
            'detail': '要将值舍入到此数的整数倍。\n\n因数不得为0。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'GCD',
        't': 0,
        'd': '返回一个或多个整数的最大公约数。',
        'a': '返回一个或多个整数的最大公约数。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '要在查找最大公约数的计算中检查其因数的第一项数值或范围。',
            'example': 'A2:A5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2',
            'detail': '[可选] - 在求最大公约数时要考虑其因数的其他数值或范围。',
            'example': '96',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'RANDBETWEEN',
        't': 0,
        'd': '返回介于两个整数之间（包括这两个整数）的随机数。',
        'a': '返回介于两个整数之间（包括这两个整数）的随机数。',
        'm': [2, 2],
        'p': [{
            'name': '下界',
            'detail': '随机值范围的下界。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '上界',
            'detail': '随机值范围的上界。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ROUND',
        't': 0,
        'd': '将数字四舍五入到指定的位数。',
        'a': '将数字四舍五入到指定的位数。',
        'm': [2, 2],
        'p': [{
            'name': '值',
            'detail': '要四舍五入的数字。',
            'example': '99.44',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '位数',
            'detail': '要进行四舍五入运算的位数。\n\n位数可以取负值，在这种情况下会将值的小数点左侧部分舍入到指定的位数。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ROUNDDOWN',
        't': 0,
        'd': '朝着零的方向将数字进行向下舍入。',
        'a': '朝着零的方向将数字进行向下舍入。',
        'm': [2, 2],
        'p': [{
            'name': '值',
            'detail': '需要向下舍入的任意实数。',
            'example': '99.44',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '位数',
            'detail': '要通过舍入达到的小数位数。\n\n位数可以取负值，在这种情况下会将值的小数点左侧部分舍入到指定的位数。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ROUNDUP',
        't': 0,
        'd': '朝着远离 0（零）的方向将数字进行向上舍入。',
        'a': '朝着远离 0（零）的方向将数字进行向上舍入。',
        'm': [2, 2],
        'p': [{
            'name': '值',
            'detail': '要将其舍入为位数位数字的值，始终向上舍入。',
            'example': '99.44',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '位数',
            'detail': '要通过舍入达到的小数位数。\n\n位数可以取负值，在这种情况下会将值的小数点左侧部分舍入到指定的位数。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SERIESSUM',
        't': 0,
        'd': '给定参数 x、n、m 和 a，返回幂级数的和 a1xn + a2x(n+m) + ... + aix(n+(i-1)m)，其中 i 为范围 a 中的项数。',
        'a': '给定参数 x、n、m 和 a',
        'm': [4, 4],
        'p': [{
            'name': 'x',
            'detail': '幂级数的输入值。随相应的近似类型而变，有可能为角度、指数或其他一些值。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'n',
            'detail': '在幂级数中x的初始自乘幂次。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'm',
            'detail': 'x的幂次中的附加增量。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'a',
            'detail': '包含幂级数系数的数组或范围。',
            'example': '{FACT(0)',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SIGN',
        't': 0,
        'd': '给定输入数值，如果为负返回-1；如果为正返回1；如果为零则返回0。',
        'a': '给定输入数值',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要返回其符号的数值。',
            'example': '-42',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SIN',
        't': 0,
        'd': '给定角度（以弧度表示），返回其正弦值。',
        'a': '给定角度（以弧度表示）',
        'm': [1, 1],
        'p': [{
            'name': '角度',
            'detail': '要返回其正弦值的角度，以弧度表示。',
            'example': 'PI()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SINH',
        't': 0,
        'd': '返回给定实数的双曲正弦值。',
        'a': '返回给定实数的双曲正弦值。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其双曲正弦值的实数值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SQRT',
        't': 0,
        'd': '返回一个正数的正平方根。',
        'a': '返回一个正数的正平方根。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要计算其正平方根的数值。\n\n值必须为正数；如果为负，SQRT 将返回 #NUM! 错误。',
            'example': '9',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SQRTPI',
        't': 0,
        'd': '返回 PI 与给定正数乘积的正平方根。',
        'a': '返回 PI 与给定正数乘积的正平方根。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '要将其与 PI 相乘并返回该乘积的平方根的数值\n\n值必须为正数；如果为负数，SQRTPI 将返回 #NUM! 错误。',
            'example': '9',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'GAMMALN',
        't': 1,
        'd': '返回指定伽玛函数的以 e（欧拉数）为底的对数。',
        'a': '返回指定伽玛函数的以 e（欧拉数）为底的对数。',
        'm': [1, 1],
        'p': [{
            'name': '值',
            'detail': '伽玛函数的输入值。返回的将是伽玛 (值) 的自然对数。\n\n值必须为正数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COS',
        't': 0,
        'd': '返回给定角度的余弦值（角度以弧度表示）。',
        'a': '返回给定角度的余弦值（角度以弧度表示）。',
        'm': [1, 1],
        'p': [{
            'name': '角度',
            'detail': '要取其余弦值的角度，以弧度表示。',
            'example': 'PI()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TRUNC',
        't': 0,
        'd': '截除指定有效位之外的部分，取数据的指定有效位。',
        'a': '截除指定有效位之外的部分',
        'm': [1, 2],
        'p': [{
            'name': '值',
            'detail': '要截取的数据。',
            'example': '3.141592654',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '位数',
            'detail': '[可选 - 默认值为0] - 小数点右侧要保留的有效位数。\n\n如果位数大于值中的有效位数，则将“值”原样返回。\n\n位数可以取负值，在这种情况下会将小数点左侧指定位数的值更改为零。小数点右侧的所有位数都会被舍弃。如果值的所有位都被更改为零，则TRUNC会返回0。',
            'example': '2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'QUOTIENT',
        't': 0,
        'd': '返回以一个数除以另一个数所得的结果，不包含余数。',
        'a': '返回以一个数除以另一个数所得的结果',
        'm': [2, 2],
        'p': [{
            'name': '被除数',
            'detail': '要被除的数值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '除数',
            'detail': '用于除其他数的数值。\n\n除数不得为0。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'POWER',
        't': 0,
        'd': '返回数值的指定次幂。',
        'a': '返回数值的指定次幂。',
        'm': [2, 2],
        'p': [{
            'name': '底数',
            'detail': '要计算其指数次幂的数值。\n\n如果底数为负，则指数必须为整数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '指数',
            'detail': '指定底数的自乘幂次值。',
            'example': '0.5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUMIFS',
        't': 0,
        'd': '根据多项条件返回范围之和。',
        'a': '根据多项条件返回范围之和。',
        'm': [3, 257],
        'p': [{
            'name': '求和范围',
            'detail': '要对其求和的范围。',
            'example': 'A1:A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '条件范围1',
            'detail': '要在哪个范围内检查条件1。',
            'example': ' B1:B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '条件1',
            'detail': '要应用于条件范围1的模式或测试条件。',
            'example': ' ">20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '条件范围2, 条件2...',
            'detail': '[ 可选 ] - 要检查的其他范围和条件。',
            'example': ' C1:C10',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'COUNTIFS',
        't': 1,
        'd': '根据多项条件返回范围中的单元格数量。',
        'a': '根据多项条件返回范围中的单元格数量。',
        'm': [2, 256],
        'p': [{
            'name': '条件范围1',
            'detail': '要在哪个范围内检查条件1。',
            'example': 'A1:A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '条件1',
            'detail': '要应用于条件范围1的模式或测试条件。',
            'example': ' ">20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '条件范围2, 条件2...',
            'detail': '[ 可选 ] - 要检查的其他范围和条件，可重复。',
            'example': ' B1:B10',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'PRODUCT',
        't': 0,
        'd': '返回将一组数相乘所得的结果。',
        'a': '返回将一组数相乘所得的结果。',
        'm': [1, 255],
        'p': [{
            'name': '乘数1',
            'detail': '用于计算乘积的第一个数值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '乘数2 ... 乘数30',
            'detail': '[可选] - 要相乘的其他数值。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'HARMEAN',
        't': 1,
        'd': '计算数据集的调和平均值。',
        'a': '计算数据集的调和平均值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他数值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'HYPGEOMDIST',
        't': 1,
        'd': '返回超几何分布。 如果已知样本量、总体成功次数和总体大小，则 HYPGEOM.DIST 返回样本取得已知成功次数的概率。',
        'a': '返回超几何分布。',
        'm': [5, 5],
        'p': [{
            'name': 'Sample_s',
            'detail': '样本中成功的次数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'Number_sample',
            'detail': '样本量。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'Population_s',
            'detail': '总体中成功的次数。',
            'example': '20',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'Number_pop',
            'detail': '总体大小。',
            'example': '40',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '决定函数形式的逻辑值。\n\n如果 cumulative 为 TRUE()，则 HYPGEOM.DIST 返回累积分布函数；\n\n如果为 FALSE()，则返回概率密度函数。',
            'example': 'TRUE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'INTERCEPT',
        't': 1,
        'd': '计算数据集的线性回归方程直线与 Y 轴的相交点 (x=0) 的 y 值。',
        'a': '计算数据集的线性回归方程直线与 Y 轴的相交点 (x=0) 的 y 值。',
        'm': [2, 2],
        'p': [{
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'KURT',
        't': 1,
        'd': '计算数据集的峭度，该指标指示数据集（分布）的形态，尤其是该形态的陡峭程度。',
        'a': '计算数据集的峭度',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '数据集中的第一个值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LARGE',
        't': 1,
        'd': '返回数据集中第 n 个最大元素，n 由用户指定。',
        'a': '返回数据集中第 n 个最大元素',
        'm': [2, 2],
        'p': [{
            'name': '数据',
            'detail': '包含相关数据集的数组或范围。',
            'example': 'A2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'n',
            'detail': '要返回的元素的排行位置（从大到小顺序）。\n\n例如，将n设为4将使LARGE返回数据中排名第4的最大元素。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'STDEVA',
        't': 1,
        'd': '基于样本计算标准偏差，将文本取值为0。',
        'a': '基于样本计算标准偏差',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2,…',
            'detail': '[可选] - 样本中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'STDEVP',
        't': 1,
        'd': '基于样本总体计算标准偏差。',
        'a': '基于样本总体计算标准偏差。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '数据集中的第一个值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'GEOMEAN',
        't': 1,
        'd': '计算数据集的几何平均值。',
        'a': '计算数据集的几何平均值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他数值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'RANK_EQ',
        't': 1,
        'd': '返回指定值在数据集中的排名。如果相同的值在数据集中存在多项，则返回其中的最高排名。',
        'a': '返回指定值在数据集中的排名。如果相同的值在数据集中存在多项，则返回其中的最高排名。',
        'm': [2, 3],
        'p': [{
            'name': 'number',
            'detail': '要确定其排名的值。',
            'example': 'A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'ref',
            'detail': '包含相关数据集的数组或范围。',
            'example': 'A1:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'order',
            'detail': '[可选 - 默认为按降序 (FALSE()) ] - 要按升序还是按降序考虑“data”中的值。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'RANK_AVG',
        't': 1,
        'd': '返回指定值在数据集中的排名。如果相同的值在数据集中存在多项，则返回这些项排名的平均值。',
        'a': '返回指定值在数据集中的排名。如果相同的值在数据集中存在多项，则返回这些项排名的平均值。',
        'm': [2, 3],
        'p': [{
            'name': 'number',
            'detail': '要确定其排名的值。',
            'example': 'A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'ref',
            'detail': '包含相关数据集的数组或范围。',
            'example': 'A1:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'order',
            'detail': '[可选 - 默认为按降序 (FALSE()) ] - 要按升序还是按降序考虑“data”中的值。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'PERCENTRANK_EXC',
        't': 1,
        'd': '以百分数形式返回指定值在给定数据集中的百分比排名（介于0和1之间，不包括两端值）。',
        'a': '以百分数形式返回指定值在给定数据集中的百分比排名（介于0和1之间，不包括两端值）。',
        'm': [2, 3],
        'p': [{
            'name': 'data',
            'detail': '包含相关数据集的数组或范围。',
            'example': 'A1:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'x',
            'detail': '要确定其百分比排位的值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'significance',
            'detail': '[可选 - 默认值为 3] - 要在计算中使用的有效位数。',
            'example': '4',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PERCENTRANK_INC',
        't': 1,
        'd': '以百分比形式返回指定值在给定数据集中的百分比排名（介于0和1之间，包括两端值）。',
        'a': '以百分比形式返回指定值在给定数据集中的百分比排名（介于0和1之间，包括两端值）。',
        'm': [2, 3],
        'p': [{
            'name': 'data',
            'detail': '包含相关数据集的数组或范围。',
            'example': 'A1:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'x',
            'detail': '要确定其百分比排位的值。',
            'example': ' A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'significance',
            'detail': '[可选 - 默认值为 3] - 要在计算中使用的有效位数。',
            'example': '4',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FORECAST',
        't': 1,
        'd': '基于数据集的线性回归，计算指定 x 的预期 y 值。',
        'a': '基于数据集的线性回归',
        'm': [3, 3],
        'p': [{
            'name': 'x',
            'detail': 'x轴上用于预测的值。',
            'example': 'A1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FISHERINV',
        't': 1,
        'd': '返回指定数值的 Fisher 逆变换。',
        'a': '返回指定数值的 Fisher 逆变换。',
        'm': [1, 1],
        'p': [{
            'name': 'y',
            'detail': '要计算其Fisher逆变换的数值。',
            'example': '0.962',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FISHER',
        't': 1,
        'd': '返回指定数值的 Fisher 变换。',
        'a': '返回指定数值的 Fisher 变换。',
        'm': [1, 1],
        'p': [{
            'name': 'x',
            'detail': '要计算其Fisher变换的数值。',
            'example': '0.962',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MODE_SNGL',
        't': 1,
        'd': '返回数据集中出现次数最多的值。',
        'a': '返回数据集中出现次数最多的值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算模式时要检查的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 在计算模式时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'WEIBULL_DIST',
        't': 1,
        'd': '给定形状和尺度，返回韦伯分布函数（或韦伯累积分布函数）的值。',
        'a': '给定形状和尺度',
        'm': [4, 4],
        'p': [{
            'name': 'x',
            'detail': 'WEIBULL 分布函数的输入值。',
            'example': '2.4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'alpha',
            'detail': 'Weibull 分布函数的形状参数。\n\nalpha 值必须大于 0。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'beta',
            'detail': 'Weibull 分布函数的尺度参数。\n\nbeta 值必须大于 0。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': 'TRUE() 表示使用累积分布函数，FALSE() 则表示使用概率密度函数。',
            'example': 'TRUE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'COUNT',
        't': 1,
        'd': '返回数据集中数值的个数。',
        'a': '返回数据集中数值的个数。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计数时要检查的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 在计数时要检查的其他值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'COUNTA',
        't': 1,
        'd': '返回数据集中值的数量。',
        'a': '返回数据集中值的数量。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计数时要检查的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 在计数时要检查的其他值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'AVEDEV',
        't': 1,
        'd': '计算数据与数据集均值之间的偏差大小的平均值。',
        'a': '计算数据与数据集均值之间的偏差大小的平均值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 样本中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'AVERAGE',
        't': 1,
        'd': '返回数据集的算术平均值，对文本忽略不计。',
        'a': '返回数据集的算术平均值',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算平均值时用到的第一个数值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 在计算平均值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'AVERAGEA',
        't': 1,
        'd': '返回数据集的算术平均值。',
        'a': '返回数据集的算术平均值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算平均值时用到的第一个数值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 在计算平均值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'BINOM_DIST',
        't': 1,
        'd': '返回一元二项式分布的概率。',
        'a': '返回一元二项式分布的概率。',
        'm': [4, 4],
        'p': [{
            'name': 'number_s',
            'detail': '试验的成功次数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'trials',
            'detail': '独立检验的次数。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'probability_s',
            'detail': '任一给定检验的成功概率。',
            'example': '0.005',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '是否使用二项式累积分布。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'BINOM_INV',
        't': 1,
        'd': '计算累积二项式分布大于或等于指定条件的最小值。',
        'a': '计算累积二项式分布大于或等于指定条件的最小值。',
        'm': [3, 3],
        'p': [{
            'name': 'trials',
            'detail': '贝努利试验次数。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'probability_s',
            'detail': '任一次给定检验的成功概率。',
            'example': '0.005',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'alpha',
            'detail': '期望的临界概率。',
            'example': '0.8',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CONFIDENCE_NORM',
        't': 1,
        'd': '计算正态分布的置信区间的一半宽度。',
        'a': '计算正态分布的置信区间的一半宽度。',
        'm': [3, 3],
        'p': [{
            'name': 'alpha',
            'detail': '用来计算置信水平的显著性水平。\n\n置信水平等于 100*(1 - alpha)%，亦即，如果 alpha 为 0.05，则置信水平为 95%。',
            'example': '0.05',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'standard_dev',
            'detail': '数据区域的总体标准偏差。',
            'example': '1.6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'size',
            'detail': '样本总量的大小。',
            'example': '250',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CORREL',
        't': 1,
        'd': '计算给定数据集的皮尔逊积矩相关系数 r。',
        'a': '计算给定数据集的皮尔逊积矩相关系数 r。',
        'm': [2, 2],
        'p': [{
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COVARIANCE_P',
        't': 1,
        'd': '计算数据集的总体协方差。',
        'a': '计算数据集的总体协方差。',
        'm': [2, 2],
        'p': [{
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COVARIANCE_S',
        't': 1,
        'd': '计算数据集的样本协方差。',
        'a': '计算数据集的样本协方差。',
        'm': [2, 2],
        'p': [{
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DEVSQ',
        't': 1,
        'd': '基于样本计算其偏差的平方和。',
        'a': '基于样本计算其偏差的平方和。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 样本中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'EXPON_DIST',
        't': 1,
        'd': '返回带有指定 Lambda 和指定值的指数分布函数的值。',
        'a': '返回带有指定 Lambda 和指定值的指数分布函数的值。',
        'm': [3, 3],
        'p': [{
            'name': 'x',
            'detail': '指数分布函数的输入值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'lambda',
            'detail': '用于指定指数分布函数的 lambda 值。',
            'example': '0.5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '是否使用指数累积分布。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'AVERAGEIF',
        't': 1,
        'd': '根据条件返回范围的平均值。',
        'a': '根据条件返回范围的平均值。',
        'm': [2, 3],
        'p': [{
            'name': 'criteria_range',
            'detail': '要对其检查 criterion 的范围。',
            'example': 'A1:A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criterion',
            'detail': '要应用于 criteria_range 的模式或测试条件。\n\n等于："文本" 或 1 或 "=文本" 或 "=1"\n\n大于：">1"\n\n大于等于：">=1"\n\n小于："<1"\n\n小于等于："<=1"\n\n不等于："<>1"或"<>文本"',
            'example': '">20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'average_range',
            'detail': '[可选] - 要计算平均值的范围。如果未提供此参数，则改用 criteria_range 来计算平均值。',
            'example': 'B1:B10',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'AVERAGEIFS',
        't': 1,
        'd': '根据多项条件返回范围的平均值。',
        'a': '根据多项条件返回范围的平均值。',
        'm': [2, 255],
        'p': [{
            'name': 'average_range',
            'detail': '要计算平均值的范围。',
            'example': 'A1:A10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria_range1',
            'detail': '要对其检查 criterion1 的范围。',
            'example': ' B1:B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criterion1',
            'detail': '要应用于 criteria_range1 的模式或测试条件。',
            'example': ' ">20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria_range2, criterion2, ...',
            'detail': '[可选] - 要检查的其他范围和条件。',
            'example': ' C1:C10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'PERMUT',
        't': 1,
        'd': '返回可从数字对象中选择的给定数目对象的排列数。',
        'a': '返回可从数字对象中选择的给定数目对象的排列数。',
        'm': [2, 2],
        'p': [{
            'name': 'number',
            'detail': '表示对象个数的整数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'number_chosen',
            'detail': '表示每个排列中对象个数的整数。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TRIMMEAN',
        't': 1,
        'd': '在排除数据集高低两端的部分数据之后计算所得的均值。',
        'a': '在排除数据集高低两端的部分数据之后计算所得的均值。',
        'm': [2, 2],
        'p': [{
            'name': '数据',
            'detail': '包含相关数据集的数组或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': '排除比例',
            'detail': '要从数据集的极值部分排除的数据占数据集的比例。\n\n排除比例必须大于等于0且小于1。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PERCENTILE_EXC',
        't': 1,
        'd': '返回数组的 K 百分点值，K 介于 0 到 1 之间，不含 0 与 1。',
        'a': '返回数组的 K 百分点值，K 介于 0 到 1 之间，不含 0 与 1。',
        'm': [2, 2],
        'p': [{
            'name': 'array',
            'detail': '定义相对位置的数组或数据区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'k',
            'detail': '0 到 1 之间的百分点值，不包含 0 和 1。',
            'example': '0.25',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PERCENTILE_INC',
        't': 1,
        'd': '返回数组的 K 百分点值，K 介于 0 到 1 之间，包含 0 与 1。',
        'a': '返回数组的 K 百分点值，K 介于 0 到 1 之间，包含 0 与 1。',
        'm': [2, 2],
        'p': [{
            'name': 'array',
            'detail': '定义相对位置的数组或数据区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'k',
            'detail': '0 到 1 之间的百分点值，包含 0 和 1。',
            'example': '0.25',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PEARSON',
        't': 1,
        'd': '返回皮尔生(Pearson)乘积矩相关系数 r。',
        'a': '返回皮尔生(Pearson)乘积矩相关系数 r。',
        'm': [2, 2],
        'p': [{
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'NORM_S_INV',
        't': 1,
        'd': '返回标准正态累积分布函数的反函数值。 该分布的平均值为 0，标准偏差为 1。',
        'a': '返回标准正态累积分布函数的反函数值。 该分布的平均值为 0，标准偏差为 1。',
        'm': [1, 1],
        'p': [{
            'name': 'probability',
            'detail': '对应于正态分布的概率。',
            'example': '0.75',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'NORM_S_DIST',
        't': 1,
        'd': '返回标准正态分布函数（该分布的平均值为 0，标准偏差为 1）。',
        'a': '返回标准正态分布函数（该分布的平均值为 0，标准偏差为 1）。',
        'm': [2, 2],
        'p': [{
            'name': 'z',
            'detail': '需要计算其分布的数值。',
            'example': '2.4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '决定函数形式的逻辑值。\n\n如果为 TRUE()，则返回累积分布函数；\n\n如果为 FALSE()，则返回概率密度函数。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'NORM_INV',
        't': 1,
        'd': '返回指定平均值和标准偏差的正态累积分布函数的反函数值。',
        'a': '返回指定平均值和标准偏差的正态累积分布函数的反函数值。',
        'm': [3, 3],
        'p': [{
            'name': 'probability',
            'detail': '对应于正态分布的概率。',
            'example': '0.75',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'mean',
            'detail': '分布的算术平均值。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'standard_dev',
            'detail': '分布的标准偏差。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'NORM_DIST',
        't': 1,
        'd': '返回指定平均值和标准偏差的正态分布函数。',
        'a': '返回指定平均值和标准偏差的正态分布函数。',
        'm': [4, 4],
        'p': [{
            'name': 'x',
            'detail': '需要计算其分布的数值。',
            'example': '2.4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'mean',
            'detail': '分布的算术平均值。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'standard_dev',
            'detail': '分布的标准偏差。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '决定函数形式的逻辑值。\n\n如果为 TRUE()，则返回累积分布函数；\n\n如果为 FALSE()，则返回概率密度函数。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'NEGBINOM_DIST',
        't': 1,
        'd': '返回负二项式分布。',
        'a': '返回负二项式分布。',
        'm': [4, 4],
        'p': [{
            'name': 'number_f',
            'detail': '要模拟的失败次数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'number_s',
            'detail': '要模拟的成功次数。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'probability_s',
            'detail': '任一次给定检验的成功概率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '决定函数形式的逻辑值。\n\n如果为 TRUE()，则返回累积分布函数；\n\n如果为 FALSE()，则返回概率密度函数。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'MINA',
        't': 1,
        'd': '返回数据集中的最小数值。',
        'a': '返回数据集中的最小数值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算最小值时所用的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2',
            'detail': '[可选] - 在计算最小值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MIN',
        't': 1,
        'd': '返回数值数据集中的最小值。',
        'a': '返回数值数据集中的最小值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算最小值时所用的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2',
            'detail': '[可选] - 在计算最小值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MEDIAN',
        't': 1,
        'd': '返回数值数据集中的中值。',
        'a': '返回数值数据集中的中值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算中值时所用的第一个数值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2',
            'detail': '[可选] - 在计算中值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MAXA',
        't': 1,
        'd': '返回数据集中的最大数值。',
        'a': '返回数据集中的最大数值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算最大值时所用的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 在计算最大值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MAX',
        't': 1,
        'd': '返回数值数据集中的最大值。',
        'a': '返回数值数据集中的最大值。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '计算最大值时所用的第一个值或范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2',
            'detail': '[可选] - 在计算最大值时要考虑的其他数值或范围。',
            'example': 'B2:B100',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LOGNORM_INV',
        't': 1,
        'd': '返回 x 的对数累积分布函数的反函数值。',
        'a': '返回 x 的对数累积分布函数的反函数值。',
        'm': [3, 3],
        'p': [{
            'name': 'probability',
            'detail': '与对数分布相关的概率，介于 0 与 1 之间（不含 0 与 1）。',
            'example': '0.4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'mean',
            'detail': 'ln(x) 的平均值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'standard_dev',
            'detail': 'ln(x) 的标准偏差，正数。',
            'example': '6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LOGNORM_DIST',
        't': 1,
        'd': '返回 x 的对数分布函数。',
        'a': '返回 x 的对数分布函数。',
        'm': [4, 4],
        'p': [{
            'name': 'x',
            'detail': '用来计算函数的值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'mean',
            'detail': 'ln(x) 的平均值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'standard_dev',
            'detail': 'ln(x) 的标准偏差，正数。',
            'example': '6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '决定函数形式的逻辑值。\n\n如果为 TRUE()，则返回累积分布函数；\n\n如果为 FALSE()，则返回概率密度函数。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'Z_TEST',
        't': 1,
        'd': '返回 z 检验的单尾 P 值。',
        'a': '返回 z 检验的单尾 P 值。',
        'm': [2, 3],
        'p': [{
            'name': 'array',
            'detail': '用来检验 x 的数组或数据区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'x',
            'detail': '要测试的值。',
            'example': 'B2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'sigma',
            'detail': '[可选] - 总体（已知）标准偏差。 如果省略，则使用样本标准偏差。',
            'example': '3',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PROB',
        't': 1,
        'd': '返回区域中的数值落在指定区间内的概率。',
        'a': '返回区域中的数值落在指定区间内的概率。',
        'm': [3, 4],
        'p': [{
            'name': 'x_range',
            'detail': '具有各自相应概率值的 x 数值区域。',
            'example': 'A3:A6',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'prob_range',
            'detail': '与 x_range 中的值相关联的一组概率值。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'lower_limit',
            'detail': '要计算其概率的数值下界。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'upper_limit',
            'detail': '[可选 - 默认值为下界] - 要计算其概率的可选数值上界。\n\n如果省略上界，PROB则计算随机选取相应值的次数恰好等于下界的概率。',
            'example': '4',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'QUARTILE_EXC',
        't': 1,
        'd': '基于 0 到 1 之间（不包括 0 和 1）的百分点值返回数据集的四分位数。',
        'a': '基于 0 到 1 之间（不包括 0 和 1）的百分点值返回数据集的四分位数。',
        'm': [2, 2],
        'p': [{
            'name': 'array',
            'detail': '要求得四分位数值的数组或数字型单元格区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'quart',
            'detail': '要返回第几个四分位值。\n\n1返回数据中最靠近第一个四分位值的值（25%标记）。\n\n2返回数据中最接近中值的值（50%标记）。\n\n3返回数据中最接近第三个四分位值的值（75%标记）。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'QUARTILE_INC',
        't': 1,
        'd': '根据 0 到 1 之间的百分点值（包含 0 和 1）返回数据集的四分位数。',
        'a': '根据 0 到 1 之间的百分点值（包含 0 和 1）返回数据集的四分位数。',
        'm': [2, 2],
        'p': [{
            'name': 'array',
            'detail': '要求得四分位数值的数组或数字型单元格区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'quart',
            'detail': '要返回第几个四分位值。\n\n0返回数据中的最小值（0%标记）。\n\n1返回数据中最靠近第一个四分位值的值（25%标记）。\n\n2返回数据中最接近中值的值（50%标记）。\n\n3返回数据中最接近第三个四分位值的值（75%标记）。\n\n4返回数据中的最大值（100%标记）。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'POISSON_DIST',
        't': 1,
        'd': '返回泊松分布。',
        'a': '返回泊松分布。',
        'm': [3, 3],
        'p': [{
            'name': 'x',
            'detail': '事件数。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'mean',
            'detail': '期望值。非负数',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '一逻辑值，确定所返回的概率分布的形式。\n\n如果为 TRUE()，则返回发生的随机事件数在零（含零）和 x（含 x）之间的累积泊松概率；\n\n如果为 FALSE()，则返回发生的事件数正好是 x 的泊松概率密度函数。',
            'example': 'FALSE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'RSQ',
        't': 1,
        'd': '返回皮尔生(Pearson)乘积矩相关系数 r 的平方。',
        'a': '返回皮尔生(Pearson)乘积矩相关系数 r 的平方。',
        'm': [2, 2],
        'p': [{
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'T_DIST',
        't': 1,
        'd': '返回学生的左尾 t 分布。',
        'a': '返回学生的左尾 t 分布。',
        'm': [3, 3],
        'p': [{
            'name': 'x',
            'detail': 'T-分布函数的输入。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom',
            'detail': '自由度数值。',
            'example': '30',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'tails',
            'detail': '决定函数形式的逻辑值。\n\n如果 cumulative 为 TRUE()，则 HYPGEOM.DIST 返回累积分布函数；\n\n如果为 FALSE()，则返回概率密度函数。',
            'example': 'TRUE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'T_DIST_2T',
        't': 1,
        'd': '返回学生的双尾 t 分布。',
        'a': '返回学生的双尾 t 分布。',
        'm': [2, 2],
        'p': [{
            'name': 'x',
            'detail': 'T-分布函数的输入。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom',
            'detail': '自由度数值。',
            'example': '30',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'T_DIST_RT',
        't': 1,
        'd': '返回学生的右尾 t 分布。',
        'a': '返回学生的右尾 t 分布。',
        'm': [2, 2],
        'p': [{
            'name': 'x',
            'detail': 'T-分布函数的输入。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom',
            'detail': '自由度数值。',
            'example': '30',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'T_INV',
        't': 1,
        'd': '返回学生的 t 分布的左尾反函数。',
        'a': '返回学生的 t 分布的左尾反函数。',
        'm': [2, 2],
        'p': [{
            'name': 'probability',
            'detail': '与学生的 t 分布相关的概率。\n\n必须大于 0 且小于 1。',
            'example': '0.35',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'deg_freedom',
            'detail': '自由度数值。\n\n如果所提供的参数不是整数，将截取其整数部分。\n\n必须大于等于 1。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'T_INV_2T',
        't': 1,
        'd': '返回学生 t 分布的双尾反函数。',
        'a': '返回学生 t 分布的双尾反函数。',
        'm': [2, 2],
        'p': [{
            'name': 'probability',
            'detail': '与学生的 t 分布相关的概率。\n\n必须大于 0 且小于1。',
            'example': '0.35',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'deg_freedom',
            'detail': '自由度数值。\n\n如果所提供的参数不是整数，将截取其整数部分。\n\n必须大于等于 1。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'T_TEST',
        't': 1,
        'd': '返回与t-检验相关的概率。用于判断两个样本是否可能是出自平均值相同的两个样本总体。',
        'a': '返回与t-检验相关的概率。用于判断两个样本是否可能是出自平均值相同的两个样本总体。',
        'm': [4, 4],
        'p': [{
            'name': 'array1',
            'detail': '将用于 t 检验的第一个数据样本或第一组单元格。',
            'example': 'A1:A4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'array2',
            'detail': '将用于 t 检验的第二个数据样本或第二组单元格。',
            'example': 'B1:B4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'tails',
            'detail': '指定分布的尾数。\n\n如果为 1：使用单尾分布。\n\n如果为 2：使用双尾分布。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '指定 t 检验的类型。\n\n如果为 1：执行配对检验。\n\n如果为 2：执行双样本等方差（同方差）检验。\n\n如果为3：执行双样本不等方差（异方差）检验。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'F_DIST',
        't': 1,
        'd': '给定输入值 x，计算两个数据集的左尾 F 概率分布（差异程度）。此分布也称为 Fisher-Snedecor 分布或 Snedecor F 分布。',
        'a': '给定输入值 x',
        'm': [4, 4],
        'p': [{
            'name': 'x',
            'detail': '用来计算函数的值。',
            'example': '15.35',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom1',
            'detail': '分子自由度。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom2',
            'detail': '分母自由度。',
            'example': '6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cumulative',
            'detail': '用于确定函数形式的逻辑值。默认值为 FALSE。\n\n如果为 TRUE()：F.DIST 将返回累积分布函数值。\n\n如果为 FALSE()：F.DIST 将返回概率密度函数值。',
            'example': 'TRUE()',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'F_DIST_RT',
        't': 1,
        'd': '给定输入x，计算两个数据集的右尾F概率分布（差异程度）。 此分布也称为Fisher-Snedecor分布或Snedecor F分布。',
        'a': '给定输入x',
        'm': [3, 3],
        'p': [{
            'name': 'x',
            'detail': '用来计算函数的值。',
            'example': '15.35',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom1',
            'detail': '分子自由度。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'degrees_freedom2',
            'detail': '分母自由度。',
            'example': '6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'VAR_P',
        't': 1,
        'd': '基于样本总体计算方差。',
        'a': '基于样本总体计算方差。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '数据集中的第一个值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, …',
            'detail': '[可选] - 数据集中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'VAR_S',
        't': 1,
        'd': '基于样本计算方差。',
        'a': '基于样本计算方差。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, …',
            'detail': '[可选] - 样本中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'VARA',
        't': 1,
        'd': '基于样本计算方差，将文本取值为0。',
        'a': '基于样本计算方差',
        'm': [1, 255],
        'p': [{
            'name': 'value1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value2, ...',
            'detail': '[可选] - 样本中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'VARPA',
        't': 1,
        'd': '基于样本总体计算方差，将文本取值为0。',
        'a': '基于样本总体计算方差',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '样本中的第一项值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他数值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'STEYX',
        't': 1,
        'd': '返回通过线性回归法预测每个 x 的 y 值时所产生的标准误差。',
        'a': '返回通过线性回归法预测每个 x 的 y 值时所产生的标准误差。',
        'm': [2, 2],
        'p': [{
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'STANDARDIZE',
        't': 1,
        'd': '给定分布的均值和标准偏差，计算一个随机变量正态化的相应值。',
        'a': '给定分布的均值和标准偏差，计算一个随机变量正态化的相应值。',
        'm': [3, 3],
        'p': [{
            'name': 'x',
            'detail': '要正态化的随机变量值。',
            'example': '96',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'mean',
            'detail': '分布的均值。',
            'example': '80',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'standard_dev',
            'detail': '分布的标准偏差。',
            'example': '6.7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SMALL',
        't': 1,
        'd': '返回数据集中的第 k 个最小值。',
        'a': '返回数据集中的第 k 个最小值。',
        'm': [2, 2],
        'p': [{
            'name': 'array',
            'detail': '需要找到第 k 个最小值的数组或数值数据区域。',
            'example': 'A2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'k',
            'detail': '要返回的数据在数组或数据区域里的位置（从小到大）。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SLOPE',
        't': 1,
        'd': '计算通过数据集的线性回归得到的直线的斜率。',
        'a': '计算通过数据集的线性回归得到的直线的斜率。',
        'm': [2, 2],
        'p': [{
            'name': '数据_y',
            'detail': '代表因变量数据数组或矩阵的范围。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '数据_x',
            'detail': '代表自变量数据数组或矩阵的范围。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SKEW',
        't': 1,
        'd': '返回分布的偏斜度。 偏斜度表明分布相对于平均值的不对称程度。 正偏斜度表明分布的不对称尾部趋向于更多正值。 负偏斜度表明分布的不对称尾部趋向于更多负值。',
        'a': '返回分布的偏斜度。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '数据集中的第一个值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'SKEW_P',
        't': 1,
        'd': '返回基于样本总体的分布不对称度：表明分布相对于平均值的不对称程度。',
        'a': '返回基于样本总体的分布不对称度：表明分布相对于平均值的不对称程度。',
        'm': [1, 255],
        'p': [{
            'name': '值1',
            'detail': '数据集中的第一个值或范围。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '值2, ...',
            'detail': '[可选] - 数据集中包含的其他值或范围。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'VLOOKUP',
        't': 2,
        'd': '纵向查找。在范围的第一列中自上而下搜索某个键值，并返回所找到的行中指定单元格的值。',
        'a': '纵向查找。在范围的第一列中自上而下搜索某个键值',
        'm': [3, 4],
        'p': [{
            'name': '搜索键值',
            'detail': '要搜索的值，如 42、"Cats" 或 I24。',
            'example': '10003',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '范围',
            'detail': '要进行搜索的范围。VLOOKUP 将在该范围的第一列中搜索搜索键值中指定的键值。',
            'example': 'A2:B26',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '索引',
            'detail': '要返回的值的列索引，范围中的第一列编号为 1。\n\n如果索引不是介于 1 和范围中的列数之间，将返回 #VALUE! 。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '已排序',
            'detail': '[默认值为 TRUE() ] - 指示要搜索的列（指定范围的第一列）是否已排序。大多数情况下，建议设为 FALSE()。\n\n建议将已排序设为 FALSE。如果设为 FALSE，将返回完全匹配项。如果存在多个匹配值，将返回找到的第一个值对应的单元格的内容，如果找不到匹配值，则返回 #N/A。\n\n如果将已排序设为 TRUE 或省略，将返回（小于或等于搜索键值的）最接近的匹配项。如果搜索的列中所有的值均大于搜索键值，则返回 #N/A。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'HLOOKUP',
        't': 2,
        'd': '横向查找。在范围的第一行中搜索某个键值，并返回所找到的列中指定单元格的值。',
        'a': '横向查找。在范围的第一行中搜索某个键值',
        'm': [3, 4],
        'p': [{
            'name': '搜索键值',
            'detail': '要搜索的值。例如，42、"Cats"或I24。',
            'example': '10003',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '范围',
            'detail': '要进行搜索的范围。将在该范围的第一行中搜索在搜索键值中指定的键值。',
            'example': 'A2:Z6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '索引',
            'detail': '要返回的值的行索引，范围中的第一行编号为1。\n\n如果索引不是介于1和范围中的行数之间，将返回#VALUE!。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '已排序',
            'detail': '[可选 - 默认值为TRUE()] - 指示要搜索的行（指定范围的第一行）是否已排序。\n\n如果将已排序设为TRUE或省略，将返回最接近的匹配值（小于或等于搜索键值）。如果在搜索的行中所有的值均大于搜索键值，则返回#N/A。\n\n如果将已排序设为TRUE或将其省略，而范围的首行并非处于已排序状态，则返回值可能会是错误的。\n\n如果将已排序设为FALSE，则仅返回完全匹配。如果存在多个匹配值，将返回与找到的第一个值对应的单元格的内容，如果找不到匹配值则返回#N/A。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LOOKUP',
        't': 2,
        'd': '在行或列中查找相应键，并将相应单元格的值返回到与搜索行或列所在位置相同的结果范围中。',
        'a': '在行或列中查找相应键',
        'm': [2, 3],
        'p': [{
            'name': '搜索键值',
            'detail': '要在行或列中搜索的值。例如，42、"Cats" 或 I24。',
            'example': '10003',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '搜索范围 | 搜索结果数组',
            'detail': '使用 LOOKUP 的一种方法是给定单行或单列形式的搜索范围进行搜索查找，这种方式要用到另一个参数结果范围。另一种方式是将这两个参数合并为一个搜索结果数组，其中第一行或第一列用于搜索，并将返回值放在该数组的最后一行或最后一列中。',
            'example': 'A1:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '结果范围',
            'detail': '[ 可选 ] - 用于存放返回结果的范围。返回值对应于在搜索范围中找到搜索键值的位置。此范围必须仅为单行或单列，而如果您使用的是搜索结果数组方式，则不应提供此参数。',
            'example': 'B1:B100',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ADDRESS',
        't': 2,
        'd': '返回字符串形式的单元格引用。',
        'a': '返回字符串形式的单元格引用。',
        'm': [2, 5],
        'p': [{
            'name': 'row_num',
            'detail': '一个数值，指定要在单元格引用中使用的行号。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'column_num',
            'detail': '一个数值，指定要在单元格引用中使用的列号（而非名称）。A列的编号为1。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'abs_num',
            'detail': '[可选 - 默认值为1] - 一个数值，指定要返回的引用类型。\n\n1 表示行列均采用绝对值（例如$A$1）；\n\n2 表示采用绝对行号，相对列标（例如A$1）；\n\n3 表示采用相对行号，绝对列标（例如$A1）；\n\n4 表示行列均采用相对值（例如A1）。',
            'example': '4',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'A1',
            'detail': '[可选 - 默认值为TRUE()] - 一个布尔值，指示采用A1标记形式(TRUE)还是R1C1标记形式(FALSE)。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'sheet_text',
            'detail': '[可选 - 默认缺省] - 用于指定地址所指向的工作表名称。',
            'example': '"Sheet2"',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'INDIRECT',
        't': 2,
        'd': '返回以字符串指定的单元格引用。',
        'a': '返回以字符串指定的单元格引用。',
        'm': [1, 2],
        'p': [{
            'name': 'ref_text',
            'detail': '以带引号的字符串形式提供的单元格引用。',
            'example': '"Sheet2!"&B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'A1',
            'detail': '[可选 - 默认值为TRUE()] - 一个布尔值，指示采用A1标记形式(TRUE)还是R1C1标记形式(FALSE)。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ROW',
        't': 2,
        'd': '返回指定单元格的行号',
        'a': '返回指定单元格的行号',
        'm': [0, 1],
        'p': [{
            'name': 'reference',
            'detail': '[可选 - 默认为此公式所在的单元格] - 要返回其行号的单元格。\n\n如果单元格引用指向的范围其宽度大于一个单元格，而此公式不是用作数组公式的，这时会仅返回单元格引用中首行的编号值。',
            'example': 'A9',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ROWS',
        't': 2,
        'd': '返回指定数组或范围中的行数。',
        'a': '返回指定数组或范围中的行数。',
        'm': [1, 1],
        'p': [{
            'name': 'array',
            'detail': '要返回其行数的范围。',
            'example': 'A9:A62',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COLUMN',
        't': 2,
        'd': '按照 `A=1` 的规则返回指定单元格的列号。',
        'a': '按照 `A=1` 的规则返回指定单元格的列号。',
        'm': [0, 1],
        'p': [{
            'name': 'reference',
            'detail': '[可选 - 默认为包含此公式的单元格] - 要返回其列号的单元格。A列对应的编号为1。\n\n如果单元格引用是宽度超过一个单元格的范围，而此公式不是作为数组公式来使用的，因此将返回单元格引用中的第一列的位置。',
            'example': 'A9',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'COLUMNS',
        't': 2,
        'd': '返回指定数组或范围中的列数。',
        'a': '返回指定数组或范围中的列数。',
        'm': [1, 1],
        'p': [{
            'name': 'array',
            'detail': '要返回其列数的范围。',
            'example': 'A9:W62',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'OFFSET',
        't': 2,
        'd': '给定某范围的起始单元格引用以及该范围涵盖的行列数量，返回该范围的引用。',
        'a': '给定某范围的起始单元格引用以及该范围涵盖的行列数量，返回该范围的引用。',
        'm': [3, 5],
        'p': [{
            'name': 'reference',
            'detail': '用于计算行列偏移量的起点。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'rows',
            'detail': '要偏移的行数。\n\n行偏移量必须是整数，但也可以是负数。如果提供的参数带有小数，小数部分将被截去。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cols',
            'detail': '要偏移的列数。\n\n列偏移量必须是整数，但也可以是负数。如果提供的参数带有小数，小数部分将被截去。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'height',
            'detail': '[可选] - 要从偏移目标开始返回的范围的高度。',
            'example': '2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'width',
            'detail': '[可选] - 要从偏移目标开始返回的范围的宽度。',
            'example': '2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MATCH',
        't': 2,
        'd': '在单元格中搜索指定项，然后返回该项在单元格区域中的相对位置。',
        'a': '在单元格中搜索指定项，然后返回该项在单元格区域中的相对位置。',
        'm': [2, 3],
        'p': [{
            'name': 'lookup_value',
            'detail': '要在 lookup_array 中匹配的值。',
            'example': '"Sunday"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'lookup_array',
            'detail': '要搜索的单元格区域。\n\n如果所用的范围的高度和宽度均大于1，MATCH将返回#N/A!。',
            'example': 'A2:A9',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'match_type',
            'detail': '[可选 - 默认值为1] - 要采用的搜索方式。\n\n1为默认类型，此时MATCH会假设范围已按升序排序，并返回小于等于搜索键值的最大值。\n\n0表示完全匹配，在范围未排序的情况下需要使用此方式。\n\n-1让MATCH假设范围是按降序排序的，并返回大于等于搜索键值的最小值。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'INDEX',
        't': 2,
        'd': '返回表格或中的元素值，此元素由行号和列号的索引值给定。',
        'a': '返回表格或中的元素值，此元素由行号和列号的索引值给定。',
        'm': [3, 3],
        'p': [{
            'name': 'array',
            'detail': '单元格区域或数组常量。',
            'example': 'A1:C20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'row_num',
            'detail': '选择数组中的某行，函数从该行返回数值。',
            'example': '5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'column_num',
            'detail': '选择数组中的某列，函数从该列返回数值。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'GETPIVOTDATA',
        't': 2,
        'd': '从与指定行和列标题对应的数据透视表中提取汇总值。',
        'a': '从与指定行和列标题对应的数据透视表中提取汇总值。',
        'm': [2, 254],
        'p': [{
            'name': 'data_field',
            'detail': '您想从数据透视表中获取其数据的值名称。\n值名称必须括在引号中或是指向包含相关文本的任何单元格的引用。\n如果有多个值字段，则必须使用数据透视表中显示的确切名称（如“销售总额”）。',
            'example': '"SUM of number of units"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'pivot_table',
            'detail': '目标数据透视表中的任何单元格的引用（推荐位于顶角的单元格）。',
            'example': "'Pivot table'!A1",
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'field1',
            'detail': '[可选] - 源数据集（不是数据透视表）中列的名称。',
            'example': '"division"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }, {
            'name': 'item1',
            'detail': '[可选] - 数据透视表中显示的与您要检索的字段名称 1 相对应的行或列的名称。',
            'example': '"east"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'CHOOSE',
        't': 2,
        'd': '基于索引返回选项列表中的元素。',
        'a': '基于索引返回选项列表中的元素。',
        'm': [2, 255],
        'p': [{
            'name': 'index_num',
            'detail': '指定要返回哪一项。\n\n如果索引为零、负值或大于提供的选择数量，将返回#VALUE!错误。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value1',
            'detail': '一项可能的返回值。必须提供。可以是单元格引用或单独的值。',
            'example': '"A"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '[可选] - 其他可以选择的值。选择',
            'example': '"B"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'HYPERLINK',
        't': 2,
        'd': '在单元格内创建一个超链接。',
        'a': '在单元格内创建一个超链接。',
        'p': [{
            'name': '网址',
            'detail': '以引号括住的链接位置的完整网址，或对包含这种网址的单元格的引用。\n\n仅允许某些链接类型。其中包括：http://、https://、mailto:、aim:、ftp://、gopher://、telnet://和news://，明确禁用使用其他协议。如果指定的是其他协议，将会在单元格中显示链接标签，但该标签不会以链接形式呈现。\n\n如果未指定协议，则假设使用http://，并将其作为网址的前缀。',
            'example': '"http://www.google.com/"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '链接标签',
            'detail': '[可选 - 默认为网址] - 要在单元格中作为链接显示的文本（用引号括起来的），或者指向包含这种标签的单元格的引用。\n\n如果链接标签是指向某个空单元格的引用，如果网址有效，就将其作为链接显示，否则作为纯文本显示。\n\n如果链接标签为空字符串常量("")，所在单元格显示的内容将为空白，但通过点击该单元格或转入该单元格仍然可以访问链接。',
            'example': '"Google"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TIME',
        't': 6,
        'd': '将给定的小时、分钟和秒转换为时间。',
        'a': '将给定的小时、分钟和秒转换为时间。',
        'm': [3, 3],
        'p': [{
            'name': '小时',
            'detail': '0（零）到 32767 之间的数字，代表小时。\n\n任何大于 23 的值都会除以 24，余数将作为小时值。',
            'example': '11',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '分钟',
            'detail': '0（零）到 32767 之间的数字，代表分钟。\n\n任何大于 59 的值将转换为小时和分钟。',
            'example': '40',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': '秒',
            'detail': '0（零）到 32767 之间的数字，代表秒。\n\n任何大于 59 的值将转换为小时、分钟和秒。',
            'example': '59',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TIMEVALUE',
        't': 6,
        'd': '按一天24小时返回该时间的分数表示。',
        'a': '按一天24小时返回该时间的分数表示。',
        'm': [1, 1],
        'p': [{
            'name': 'time_text',
            'detail': '用于表示时间的字符串。',
            'example': '"2:15 PM"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'EOMONTH',
        't': 6,
        'd': '返回某个月份最后一天的序列号，该月份在另一个日期之前或之后的数个月（月数由参数指定）。',
        'a': '返回某个月份最后一天的序列号',
        'm': [2, 2],
        'p': [{
            'name': 'start_date',
            'detail': '用于计算结果的参照日期。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'months',
            'detail': '用于计算的起始日期之前（负）或之后（正）的月数。返回的是计算所得月份的最后那天。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'EDATE',
        't': 6,
        'd': '返回表示某个日期的序列号，该日期在另一个日期的数月之前/之后。',
        'a': '返回表示某个日期的序列号',
        'm': [2, 2],
        'p': [{
            'name': 'start_date',
            'detail': '用于计算结果的参照日期。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'months',
            'detail': '用于计算的起始日期之前（负）或之后（正）的月数。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SECOND',
        't': 6,
        'd': '返回时间值的秒数。 秒数是 0（零）到 59 范围内的整数。',
        'a': '返回时间值的秒数。 秒数是 0（零）到 59 范围内的整数。',
        'm': [1, 1],
        'p': [{
            'name': '时间',
            'detail': '用于计算秒钟部分的时间。必须为以下值之一：指向包含日期/时间值的单元格的引用、返回日期/时间的函数或者数字。',
            'example': 'TIME(11',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'MINUTE',
        't': 6,
        'd': '以数字格式返回特定时间的分钟部分。',
        'a': '以数字格式返回特定时间的分钟部分。',
        'm': [1, 1],
        'p': [{
            'name': '时间',
            'detail': '用于计算分钟部分的时间。必须为以下值之一：指向包含日期/时间值的单元格的引用、返回日期/时间的函数或者数字。',
            'example': 'TIME(11',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'HOUR',
        't': 6,
        'd': '以数字格式返回特定时间的小时部分。',
        'a': '以数字格式返回特定时间的小时部分。',
        'm': [1, 1],
        'p': [{
            'name': '时间',
            'detail': '用于计算小时部分的时间。必须为以下值之一：指向包含日期/时间值的单元格的引用、返回日期/时间的函数或者数字。',
            'example': 'TIME(11',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'NOW',
        't': 6,
        'd': '以日期值格式返回当前日期和时间。',
        'a': '以日期值格式返回当前日期和时间。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'NETWORKDAYS',
        't': 6,
        'd': '返回所提供的两个日期之间的净工作日天数。',
        'a': '返回所提供的两个日期之间的净工作日天数。',
        'm': [2, 3],
        'p': [{
            'name': 'start_date',
            'detail': '用于计算净工作日天数的时间段开始日期。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'end_date',
            'detail': '用于计算净工作日天数的时间段结束日期。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'holidays',
            'detail': '[可选] - 一个范围或数组常量，其中包含作为节假日的日期序号。\n\n在节假日数组中提供的值必须是日期序号值（例如由N所返回的值）或日期值（例如由DATE、DATEVALUE或TO_DATE返回的值）。由范围指定的值应该是标准的日期值或日期序数值。',
            'example': '16)',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'NETWORKDAYS_INTL',
        't': 6,
        'd': '返回给定的两个日期之间的净工作日天数（排除指定的周末和节假日）。',
        'a': '返回给定的两个日期之间的净工作日天数（排除指定的周末和节假日）。',
        'm': [2, 4],
        'p': [{
            'name': 'start_date',
            'detail': '用于计算净工作日天数的时间段开始日期。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'end_date',
            'detail': '用于计算净工作日天数的时间段结束日期。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'weekend',
            'detail': '[可选 - 默认值为1] - 用于表示哪些天为周末的数字或字符串。\n字符串方式：可以使用由0和1组成的字符串来指定周末，串中的第一个数字字符代表周一，最后一个则代表周日。零表示这一天是工作日，1表示这一天为周末。例如，“0000011”表示将周六和周日作为周末。\n数字方式：这种方式不使用上述字符串形式，而是使用一个数字。1 =周六/周日为周末，2 =周日/周一为周末，依此类推则7 =周五/周六。11 =周日为唯一周末，12 =周一为唯一周末，依此类推则17 =周六为唯一周末。',
            'example': '16)',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'holidays',
            'detail': '[ 可选 ] - 这是一个范围或数组常量，其中包含作为节假日的日期。\n在节假日数组内提供的值必须为日期序数值（例如N的返回值）或日期值（例如DATE、DATEVALUE或TO_DATE的返回值）。由范围指定的值应该是标准的日期值或日期序数值。',
            'example': 'DATE(1969',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISOWEEKNUM',
        't': 6,
        'd': '返回给定日期在全年中的 ISO 周数。',
        'a': '返回给定日期在全年中的 ISO 周数。',
        'm': [1, 1],
        'p': [{
            'name': 'date',
            'detail': '用于日期和时间计算的日期-时间代码。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'WEEKNUM',
        't': 6,
        'd': '返回特定日期的周数。',
        'a': '返回特定日期的周数。',
        'm': [1, 2],
        'p': [{
            'name': 'serial_number',
            'detail': '要确定其位于第几周的日期，必须是对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'return_type',
            'detail': '[可选 - 默认值为 1 ] - 代表一周起始日的数字，系统也使用该数字来确定一年的第一周（1=周日，2=周一）。',
            'example': '7',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'WEEKDAY',
        't': 6,
        'd': '返回一个数字，对应于给定日期所在的星期几。',
        'a': '返回一个数字，对应于给定日期所在的星期几。',
        'm': [1, 2],
        'p': [{
            'name': 'serial_number',
            'detail': '要为其确定星期几的日期。必须是对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'return_type',
            'detail': '[可选 - 默认值为 1] - 以数字指示使用哪种编号顺序来表示星期几。默认情况下，按星期日 (= 1) 开始计算。\n\n如果类型为 1，则星期值将从星期日开始算起，并且星期日的值为 1，因此星期六的值就是 7。\n\n如果类型为 2，则星期值将从星期一开始算起，并且星期一的值为 1，因此星期日的值就是 7。\n\n如果类型为 3，则星期值将从星期一算起，并且星期一的值为 0，因此星期日的值就是 6。',
            'example': '7',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DAY',
        't': 6,
        'd': '以数字格式返回特定日期所在的当月几号。',
        'a': '以数字格式返回特定日期所在的当月几号。',
        'm': [1, 1],
        'p': [{
            'name': 'serial_number',
            'detail': '要从中提取具体几号的日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'DAYS',
        't': 6,
        'd': '返回两个日期之间的天数。',
        'a': '返回两个日期之间的天数。',
        'm': [2, 2],
        'p': [{
            'name': 'end_date',
            'detail': '计算中要使用的结束日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': '2011-3-15',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'start_date',
            'detail': '计算中要使用的开始日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': '2011-2-1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'DAYS360',
        't': 6,
        'd': '按照每年360天，返回两个日期之间的差（用于计算利息）。',
        'a': '按照每年360天，返回两个日期之间的差（用于计算利息）。',
        'm': [2, 3],
        'p': [{
            'name': 'start_date',
            'detail': '计算中要使用的开始日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'end_date',
            'detail': '计算中要使用的结束日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'method',
            'detail': '[可选 - 默认为FALSE()] - 指示要使用哪种天数计算方法。\n\nFALSE - 采用美国 (NASD) 方法时，如果起始日期为某月的最后一天，为便于计算，会将起始日期的当月几号更改为30。此外，如果结束日期是所在月份的最后一天，而且起始日期在其所在月的30号之前，则将结束日期更改为结束日期之后那个月的第一天，否则将结束日期更改为该月的30号。\n\nTRUE - 采用欧洲方法时，会将所有日期在31号的起始日期或结束日期更改为当月的30号。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'DATE',
        't': 6,
        'd': '将提供的年、月、日转换为日期。',
        'a': '将提供的年、月、日转换为日期。',
        'm': [3, 3],
        'p': [{
            'name': 'year',
            'detail': '日期的年份部分，包含一到四位数字。\n\n介于 0（零）到 1899 之间，会将该值与 1900 相加来计算年份；\n\n介于 1900 到 9999 之间，将使用该数值作为年份；\n\n小于 0 或大于等于 10000，返回 错误值 #NUM!。',
            'example': '1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'month',
            'detail': '日期的月份部分，一个正整数或负整数。\n\n如果 month 大于 12，则 month 会将该月份数与指定年中的第一个月相加。\n\n如果 month 小于 1，month 则从指定年份的一月份开始递减该月份数，然后再加上 1 个月。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'day',
            'detail': '日期的日部分，一个正整数或负整数。\n\n如果 day 大于月中指定的天数，则 day 会将天数与该月中的第一天相加。\n\n如果 day 小于 1，则 day 从指定月份的第一天开始递减该天数，然后再加上 1 天。',
            'example': '20',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DATEVALUE',
        't': 6,
        'd': '将提供的日期字符串转换为日期的序列号。',
        'a': '将提供的日期字符串转换为日期的序列号。',
        'm': [1, 1],
        'p': [{
            'name': 'date_text',
            'detail': '表示日期的字符串。',
            'example': '"1969-7-20"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'DATEDIF',
        't': 6,
        'd': '计算两个日期之间的天数、月数或年数。',
        'a': '计算两个日期之间的天数、月数或年数。',
        'm': [3, 3],
        'p': [{
            'name': '起始日期',
            'detail': '计算中要使用的开始日期。必须是对包含DATE值的单元格的引用、返回DATE类型的函数或数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '结束日期',
            'detail': '计算中要使用的结束日期。必须是对包含DATE值的单元格的引用、返回DATE类型的函数或数字。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '单位',
            'detail': '时间单位的缩写文字。例如 "M" 代表月。有效值包括："Y"、"M"、"D"、"MD"、"YM" 和 "YD"。\n\n"Y"：返回起始日期和结束日期之间的整年数。\n\n"M"：返回起始日期和结束日期之间的整月数。\n\n"D"：返回起始日期和结束日期之间的天数。\n\n"MD"：返回起始日期和结束日期之间的天数（不计整月数）。\n\n"YM"：返回起始日期和结束日期之间的整月数（不计整年数）。\n\n"YD"：返回起始日期和结束日期之间的天数（假设起始日期和结束日期的间隔不超过一年）。',
            'example': '16)',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'WORKDAY',
        't': 6,
        'd': '指定工作日天数，计算结束日期。',
        'a': '指定工作日天数，计算结束日期。',
        'm': [2, 3],
        'p': [{
            'name': 'start_date',
            'detail': '计算的开始日期。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'days',
            'detail': 'start_date 之前或之后不含周末及节假日的天数。\n\n为正值将生成未来日期；\n\n为负值生成过去日期。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'holidays',
            'detail': '[可选] - 一个范围或数组常量，其中包含作为节假日的日期序号。\n\n在节假日数组中提供的值必须是日期序号值（例如由N所返回的值）或日期值（例如由DATE、DATEVALUE或TO_DATE返回的值）。由范围指定的值应该是标准的日期值或日期序数值。',
            'example': '16)',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'WORKDAY_INTL',
        't': 6,
        'd': '返回指定的若干个工作日之前或之后的日期的序列号（使用自定义周末参数）。 ',
        'a': '返回指定的若干个工作日之前或之后的日期的序列号（使用自定义周末参数）。 ',
        'm': [2, 4],
        'p': [{
            'name': 'start_date',
            'detail': '开始日期（将被截尾取整）。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'days',
            'detail': 'start_date 之前或之后的工作日的天数。\n\n正值表示未来日期；\n\n负值表示过去日期；\n\n零值表示开始日期。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'weekend',
            'detail': '[可选 - 默认值为1] - 用于表示哪些天为周末的数字或字符串。\n字符串方式：可以使用由0和1组成的字符串来指定周末，串中的第一个数字字符代表周一，最后一个则代表周日。零表示这一天是工作日，1表示这一天为周末。例如，“0000011”表示将周六和周日作为周末。\n数字方式：这种方式不使用上述字符串形式，而是使用一个数字。1 =周六/周日为周末，2 =周日/周一为周末，依此类推则7 =周五/周六。11 =周日为唯一周末，12 =周一为唯一周末，依此类推则17 =周六为唯一周末。',
            'example': '16)',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'holidays',
            'detail': '[ 可选 ] - 这是一个范围或数组常量，其中包含作为节假日的日期。\n在节假日数组内提供的值必须为日期序数值（例如N的返回值）或日期值（例如DATE、DATEVALUE或TO_DATE的返回值）。由范围指定的值应该是标准的日期值或日期序数值。',
            'example': 'DATE(1969',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'YEAR',
        't': 6,
        'd': '返回对应于某个日期的年份。 Year 作为 1900 - 9999 之间的整数返回。',
        'a': '返回对应于某个日期的年份。 Year 作为 1900 - 9999 之间的整数返回。',
        'm': [1, 1],
        'p': [{
            'name': 'serial_number',
            'detail': '用于计算年份的日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'YEARFRAC',
        't': 6,
        'd': '返回 start_date 和 end_date 之间的天数占全年天数的百分比。',
        'a': '返回 start_date 和 end_date 之间的天数占全年天数的百分比。',
        'm': [2, 3],
        'p': [{
            'name': 'start_date',
            'detail': '计算中要使用的开始日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'end_date',
            'detail': '计算中要使用的结束日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': '7',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 要使用的日计数基准类型。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '16)',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TODAY',
        't': 6,
        'd': '以日期值格式返回当前日期。',
        'a': '以日期值格式返回当前日期。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'MONTH',
        't': 6,
        'd': '返回日期（以序列数表示）中的月份。 月份是介于 1（一月）到 12（十二月）之间的整数。',
        'a': '返回日期（以序列数表示）中的月份。 月份是介于 1（一月）到 12（十二月）之间的整数。',
        'm': [1, 1],
        'p': [{
            'name': 'serial_number',
            'detail': '要从中提取月份的日期。必须是以下一种：对包含日期的单元格的引用、返回日期类型的函数或者数字。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'EFFECT',
        't': 8,
        'd': '根据名义利率及每年的复利计息期数来计算实际年利率。',
        'a': '根据名义利率及每年的复利计息期数来计算实际年利率。',
        'm': [2, 2],
        'p': [{
            'name': 'nominal_rate',
            'detail': '每年的名义利率。',
            'example': '0.99',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'npery',
            'detail': '每年的复利计算期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DOLLAR',
        't': 12,
        'd': '将数字格式设置为与语言区域相对应的货币格式。',
        'a': '将数字格式设置为与语言区域相对应的货币格式。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要设置格式的值。',
            'example': '1.2351',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'decimals',
            'detail': '[可选 - 默认值为 2] - 要显示的小数位数。\n\n如果这是负数，则将数字四舍五入到小数点左侧。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DOLLARDE',
        't': 8,
        'd': '将以整数部分和分数部分转换为以小数部分表示的金额数字',
        'a': '将以整数部分和分数部分转换为以小数部分表示的金额数字',
        'm': [2, 2],
        'p': [{
            'name': 'fractional_dollar',
            'detail': '以整数部份和分数部分表示的数字，用小数点隔开。',
            'example': '100.10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fraction',
            'detail': '用作分数中的分母的整数。',
            'example': '32',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DOLLARFR',
        't': 8,
        'd': '将小数转换为分数表示的金额数字。',
        'a': '将小数转换为分数表示的金额数字。',
        'm': [2, 2],
        'p': [{
            'name': 'decimal_dollar',
            'detail': '小数。',
            'example': '100.125',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fraction',
            'detail': '用作分数中的分母的整数。',
            'example': '32',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DB',
        't': 8,
        'd': '使用固定余额递减法，返回指定期间内某项固定资产的折旧值。',
        'a': '使用固定余额递减法，返回指定期间内某项固定资产的折旧值。',
        'm': [4, 5],
        'p': [{
            'name': 'cost',
            'detail': '资产原值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'salvage',
            'detail': '折旧末尾时的值（有时也称为资产残值）。',
            'example': '50',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'life',
            'detail': '资产的折旧期数（有时也称作资产的使用寿命）。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'period',
            'detail': '在使用期限内要计算折旧的折旧期。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'month',
            'detail': '[可选 - 默认值为12] - 折旧第一年中的月数。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DDB',
        't': 8,
        'd': '用双倍余额递减法，返回指定期间内某项固定资产的折旧值。',
        'a': '用双倍余额递减法，返回指定期间内某项固定资产的折旧值。',
        'm': [4, 5],
        'p': [{
            'name': 'cost',
            'detail': '资产原值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'salvage',
            'detail': '折旧末尾时的值（有时也称为资产残值）。',
            'example': '50',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'life',
            'detail': '资产的折旧期数（有时也称作资产的使用寿命）。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'period',
            'detail': '在使用期限内要计算折旧的折旧期。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'factor',
            'detail': '[可选 - 默认值为2] - 折旧的递减系数。',
            'example': '2.25',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'RATE',
        't': 8,
        'd': '返回年金每期的利率。',
        'a': '返回年金每期的利率。',
        'm': [3, 6],
        'p': [{
            'name': 'nper',
            'detail': '年金的付款总期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pmt',
            'detail': '每期的付款金额，在年金周期内不能更改。',
            'example': '-100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '现值即一系列未来付款当前值的总和。',
            'example': '400',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fv',
            'detail': '[可选 - 默认值为0] - 未来值，或在最后一次付款后希望得到的现金余额。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为0] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'guess',
            'detail': '[可选 - 默认值为0.1] - 预期利率。',
            'example': '0.1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CUMPRINC',
        't': 8,
        'd': '基于等额分期付款和固定利率，计算投资在多个付款期内的累计本金偿还额。',
        'a': '基于等额分期付款和固定利率，计算投资在多个付款期内的累计本金偿还额。',
        'm': [6, 6],
        'p': [{
            'name': 'rate',
            'detail': '利率。',
            'example': '0.12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '总付款期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '年金的现值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'start_period',
            'detail': '开始累计计算的付款期序号。\n\n首期必须大于等于1。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'end_period',
            'detail': '结束累计计算的付款期序号。\n\n末期必须大于首期。',
            'example': '5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUPNUM',
        't': 8,
        'd': '返回在结算日和到期日之间的付息次数，向上舍入到最近的整数。',
        'a': '返回在结算日和到期日之间的付息次数，向上舍入到最近的整数。',
        'm': [3, 4],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。到期日是有价证券有效期截止时的日期。',
            'example': '02',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SYD',
        't': 8,
        'd': '返回在指定期间内资产按年限总和折旧法计算的折旧。',
        'a': '返回在指定期间内资产按年限总和折旧法计算的折旧。',
        'm': [4, 4],
        'p': [{
            'name': 'cost',
            'detail': '资产原值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'salvage',
            'detail': '折旧末尾时的值（有时也称为资产残值）。',
            'example': '50',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'life',
            'detail': '资产的折旧期数（有时也称作资产的使用寿命）。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'period',
            'detail': '在使用期限内要计算折旧的折旧期。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TBILLEQ',
        't': 8,
        'd': '基于贴现率计算美国政府短期债券的等效年化收益率。',
        'a': '基于贴现率计算美国政府短期债券的等效年化收益率。',
        'm': [3, 3],
        'p': [{
            'name': 'settlement',
            'detail': '债券的结算日期，此日期为债券发行后交付给买家的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '债券的到期或结束日期，届时可将其以面值或票面价值赎回。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'discount',
            'detail': '债券购买时的贴现率。',
            'example': '2)',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TBILLYIELD',
        't': 8,
        'd': '基于价格计算美国政府短期债券的收益率。',
        'a': '基于价格计算美国政府短期债券的收益率。',
        'm': [3, 3],
        'p': [{
            'name': 'settlement',
            'detail': '债券的结算日期，此日期为债券发行后交付给买家的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '债券的到期或结束日期，届时可将其以面值或票面价值赎回。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'pr',
            'detail': '债券的购买价格。',
            'example': '95',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TBILLPRICE',
        't': 8,
        'd': '基于贴现率计算美国政府短期债券的价格。',
        'a': '基于贴现率计算美国政府短期债券的价格。',
        'm': [3, 3],
        'p': [{
            'name': 'settlement',
            'detail': '债券的结算日期，此日期为债券发行后交付给买家的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '债券的到期或结束日期，届时可将其以面值或票面价值赎回。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'discount',
            'detail': '债券购买时的贴现率。',
            'example': '0.09',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PV',
        't': 8,
        'd': '基于等额分期付款和固定利率，计算年金投资的现值。',
        'a': '基于等额分期付款和固定利率，计算年金投资的现值。',
        'm': [3, 5],
        'p': [{
            'name': 'rate',
            'detail': '各期利率。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '年金的付款总期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pmt',
            'detail': '每期的付款金额，在年金周期内不能更改。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fv',
            'detail': '[可选] - 未来值，或在最后一次付款后希望得到的现金余额。',
            'example': 'D2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为0] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ACCRINT',
        't': 8,
        'd': '返回定期付息证券的应计利息。',
        'a': '返回定期付息证券的应计利息。',
        'm': [6, 8],
        'p': [{
            'name': 'issue',
            'detail': '有价证券的发行日。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'first_interest',
            'detail': '有价证券的首次计息日。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'rate',
            'detail': '有价证券的年息票利率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'par',
            'detail': '证券的票面值。',
            'example': '10000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示““欧洲30/360”方法” - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'calc_method',
            'detail': '[可选 - 默认为TRUE()] - 一个逻辑值，指定当结算日期晚于首次计息日期时用于计算总应计利息的方法。\n\n如果值为 TRUE，则返回从发行日到结算日的总应计利息。\n\n如果值为 FALSE，则返回从首次计息日到结算日的应计利息。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ACCRINTM',
        't': 8,
        'd': '返回在到期日支付利息的有价证券的应计利息。',
        'a': '返回在到期日支付利息的有价证券的应计利息。',
        'm': [4, 5],
        'p': [{
            'name': 'issue',
            'detail': '有价证券的发行日。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'settlement',
            'detail': '有价证券的到期日。',
            'example': 'DATE(1969',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'rate',
            'detail': '有价证券的年息票利率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'par',
            'detail': '证券的票面值。',
            'example': '1000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUPDAYBS',
        't': 8,
        'd': '返回从付息期开始到结算日的天数。',
        'a': '返回从付息期开始到结算日的天数。',
        'm': [3, 4],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUPDAYS',
        't': 8,
        'd': '返回结算日所在的付息期的天数。',
        'a': '返回结算日所在的付息期的天数。',
        'm': [3, 4],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUPDAYSNC',
        't': 8,
        'd': '返回从结算日到下一票息支付日之间的天数。',
        'a': '返回从结算日到下一票息支付日之间的天数。',
        'm': [3, 4],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUPNCD',
        't': 8,
        'd': '计算结算日之后的下一票息或利息派发日期。',
        'a': '计算结算日之后的下一票息或利息派发日期。',
        'm': [3, 4],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '01)',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': 'DATE(2019',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COUPPCD',
        't': 8,
        'd': '计算结算日之前的最后一个票息或利息支付日。',
        'a': '计算结算日之前的最后一个票息或利息支付日。',
        'm': [3, 4],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '01)',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': 'DATE(2019',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FV',
        't': 8,
        'd': '基于等额分期付款和固定利率，计算年金投资的未来价值。',
        'a': '基于等额分期付款和固定利率，计算年金投资的未来价值。',
        'm': [3, 5],
        'p': [{
            'name': 'rate',
            'detail': '各期利率。',
            'example': '0.12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '年金的付款总期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pmt',
            'detail': '各期所应支付的金额，在整个年金期间保持不变。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '[可选 - 默认值为 0 ] - 现值，或一系列未来付款的当前值的累积和。',
            'example': '400',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为 0 ] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FVSCHEDULE',
        't': 8,
        'd': '返回应用一系列复利率计算的初始本金的未来值。',
        'a': '返回应用一系列复利率计算的初始本金的未来值。',
        'm': [2, 2],
        'p': [{
            'name': 'principal',
            'detail': '现值。',
            'example': '10000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'schedule',
            'detail': '用于计算本金复利的一组利率。\n\n利率表必须是范围或数组，其中包含要用于计算复利的一组利率。这些利率值应该以十进制小数形式表示，或者使用UNARY_PERCENT以百分比形式表示，即表示为0.09或UNARY_PERCENT(9)，而不要表示为9。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'YIELD',
        't': 8,
        'd': '返回定期支付利息的债券的收益率。',
        'a': '返回定期支付利息的债券的收益率。',
        'm': [6, 7],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'rate',
            'detail': '有价证券的年息票利率。',
            'example': '0.057',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pr',
            'detail': '有价证券的价格。',
            'example': '95',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'redemption',
            'detail': '有价证券的清偿价值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'YIELDDISC',
        't': 8,
        'd': '基于价格计算折价发行的（不带息）债券的年收益率。',
        'a': '基于价格计算折价发行的（不带息）债券的年收益率。',
        'm': [4, 5],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'pr',
            'detail': '有价证券的价格。',
            'example': '95',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'redemption',
            'detail': '有价证券的清偿价值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'NOMINAL',
        't': 8,
        'd': '基于给定的实际利率和年复利期数，返回名义年利率。',
        'a': '基于给定的实际利率和年复利期数，返回名义年利率。',
        'm': [2, 2],
        'p': [{
            'name': 'effect_rate',
            'detail': '每年的实际利率。',
            'example': '0.85',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'npery',
            'detail': '每年的复利期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'XIRR',
        't': 8,
        'd': '返回一组不一定定期发生的现金流的内部收益率。',
        'a': '返回一组不一定定期发生的现金流的内部收益率。',
        'm': [2, 3],
        'p': [{
            'name': 'values',
            'detail': '其中含有投资相关收益或支出的数组或范围。\n\n现金流数额中必须至少包含一项负的和一项正的现金流金额才能计算回报率。',
            'example': 'B2:B25',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'dates',
            'detail': '与现金流数额参数中的现金流对应的日期数组或范围。',
            'example': 'C2:C25',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'guess',
            'detail': '[可选 - 默认值为0.1] - 对内部回报率的估算值。',
            'example': '250',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MIRR',
        't': 8,
        'd': '返回一系列定期现金流的修改后内部收益率。',
        'a': '返回一系列定期现金流的修改后内部收益率。',
        'm': [3, 3],
        'p': [{
            'name': 'values',
            'detail': '其中含有投资相关收益或支出的数组或范围。\n\n现金流数额中必须至少包含一项负的和一项正的现金流金额才能计算回报率。',
            'example': 'A2:A25',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'finance_rate',
            'detail': '现金流中使用的资金支付的利率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'reinvest_rate',
            'detail': '将现金流再投资的收益率。',
            'example': '0.12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'IRR',
        't': 8,
        'd': '返回由值中的数字表示的一系列现金流的内部收益率。 ',
        'a': '返回由值中的数字表示的一系列现金流的内部收益率。 ',
        'm': [1, 2],
        'p': [{
            'name': 'values',
            'detail': '其中含有投资相关收益或支出的数组或范围。\n\n现金流数额中必须至少包含一项负的和一项正的现金流金额才能计算回报率。',
            'example': 'A2:A25',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'guess',
            'detail': '[可选 - 默认为 0.1] - 内部收益率的估值。',
            'example': '200',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'NPV',
        't': 8,
        'd': '使用贴现率和一系列未来支出（负值）和收益（正值）来计算一项投资的净现值。',
        'a': '使用贴现率和一系列未来支出（负值）和收益（正值）来计算一项投资的净现值。',
        'm': [2, 255],
        'p': [{
            'name': 'rate',
            'detail': '某一期间的贴现率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value1',
            'detail': '第一笔支出（负值）和收益（正值）。',
            'example': '200',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2, ...',
            'detail': '[可选] - 其他支出（负值）和收益（正值）。',
            'example': '250',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'XNPV',
        't': 8,
        'd': '返回一组现金流的净现值，这些现金流不一定定期发生。',
        'a': '返回一组现金流的净现值，这些现金流不一定定期发生。',
        'm': [3, 3],
        'p': [{
            'name': 'rate',
            'detail': '应用于现金流的贴现率。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'values',
            'detail': '与 dates 中的支付时间相对应的一系列现金流。',
            'example': 'B2:B25',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'dates',
            'detail': '与现金流支付相对应的支付日期表。',
            'example': 'C2:C25',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'CUMIPMT',
        't': 8,
        'd': '基于等额分期付款和固定利率，计算投资在一系列付款期内的累计利息。',
        'a': '基于等额分期付款和固定利率，计算投资在一系列付款期内的累计利息。',
        'm': [6, 6],
        'p': [{
            'name': 'rate',
            'detail': '利息率。',
            'example': '0.12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '总付款期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '现值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'start_period',
            'detail': '开始累计计算的付款期序号。\n\n首期必须大于等于1。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'end_period',
            'detail': '结束累计计算的付款期序号。\n\n末期必须大于首期。',
            'example': '5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '0',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PMT',
        't': 8,
        'd': '用于根据固定付款额和固定利率计算贷款的付款额。',
        'a': '用于根据固定付款额和固定利率计算贷款的付款额。',
        'm': [3, 5],
        'p': [{
            'name': 'rate',
            'detail': '贷款利率。',
            'example': '0.08',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '该项贷款的付款总数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '现值，或一系列未来付款额现在所值的总额，也叫本金。',
            'example': ' 100000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fv',
            'detail': '[可选 - 默认值为 0] - 未来值，或在最后一次付款后希望得到的现金余额。',
            'example': 'D2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为 0] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'IPMT',
        't': 8,
        'd': '基于固定利率及等额分期付款方式，返回给定期数内对投资的利息偿还额。',
        'a': '基于固定利率及等额分期付款方式，返回给定期数内对投资的利息偿还额。',
        'm': [4, 6],
        'p': [{
            'name': 'rate',
            'detail': '各期利率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'per',
            'detail': '用于计算其利息数额的期数，必须在 1 到 nper 之间。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '年金的付款总期数。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '现值，或一系列未来付款的当前值的累积和。',
            'example': '80000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fv',
            'detail': '[可选 - 默认值为 0] - 未来值，或在最后一次付款后希望得到的现金余额。',
            'example': 'E2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为 0] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PPMT',
        't': 8,
        'd': '返回根据定期固定付款和固定利率而定的投资在已知期间内的本金偿付额。',
        'a': '返回根据定期固定付款和固定利率而定的投资在已知期间内的本金偿付额。',
        'm': [4, 6],
        'p': [{
            'name': 'rate',
            'detail': '各期利率。',
            'example': '0.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'per',
            'detail': '指定期数，该值必须在 1 到 nper 范围内。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'nper',
            'detail': '年金的付款总期数。',
            'example': '3*12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '现值即一系列未来付款当前值的总和。',
            'example': '100000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fv',
            'detail': '[可选 - 默认值为 0] - 未来值，或在最后一次付款后希望得到的现金余额。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为 0] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'INTRATE',
        't': 8,
        'd': '返回完全投资型证券的利率。',
        'a': '返回完全投资型证券的利率。',
        'm': [4, 5],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'investment',
            'detail': '有价证券的投资额。',
            'example': '100000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'redemption',
            'detail': '有价证券到期时的兑换值。',
            'example': '101200',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PRICE',
        't': 8,
        'd': '返回定期付息的面值 ￥100 的有价证券的价格。',
        'a': '返回定期付息的面值 ￥100 的有价证券的价格。',
        'm': [6, 7],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'rate',
            'detail': '有价证券的年息票利率。',
            'example': '0.057',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'yld',
            'detail': '有价证券的年收益率。',
            'example': '0.065',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'redemption',
            'detail': '面值 ￥100 的有价证券的清偿价值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PRICEDISC',
        't': 8,
        'd': '返回折价发行的面值 ￥100 的有价证券的价格。',
        'a': '返回折价发行的面值 ￥100 的有价证券的价格。',
        'm': [4, 5],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'discount',
            'detail': '有价证券的贴现率。',
            'example': '0.0525',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'redemption',
            'detail': '面值 ￥100 的有价证券的清偿价值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'PRICEMAT',
        't': 8,
        'd': '返回到期付息的面值 ￥100 的有价证券的价格。',
        'a': '返回到期付息的面值 ￥100 的有价证券的价格。',
        'm': [5, 6],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'issue',
            'detail': '有价证券的发行日。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'rate',
            'detail': '有价证券在发行日的利率。',
            'example': '0.061',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'yld',
            'detail': '有价证券的年收益率。',
            'example': '0.061',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'RECEIVED',
        't': 8,
        'd': '返回一次性付息的有价证券到期收回的金额。',
        'a': '返回一次性付息的有价证券到期收回的金额。',
        'm': [4, 5],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'investment',
            'detail': '有价证券的投资额。',
            'example': '10000000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'discount',
            'detail': '有价证券的贴现率。',
            'example': '0.0575',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '12',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DISC',
        't': 8,
        'd': '返回有价证券的贴现率。',
        'a': '返回有价证券的贴现率。',
        'm': [4, 5],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'pr',
            'detail': '有价证券的价格（按面值为 ￥100 计算）。',
            'example': '97.975',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'redemption',
            'detail': '面值 ￥100 的有价证券的清偿价值。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '12',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'NPER',
        't': 8,
        'd': '基于固定利率及等额分期付款方式，返回某项投资的总期数。',
        'a': '基于固定利率及等额分期付款方式，返回某项投资的总期数。',
        'm': [3, 5],
        'p': [{
            'name': 'rate',
            'detail': '各期利率。',
            'example': '0.12',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pmt',
            'detail': '各期所应支付的金额，在整个年金期间保持不变。',
            'example': '500',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'pv',
            'detail': '现值，或一系列未来付款的当前值的累积和。',
            'example': '40000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'fv',
            'detail': '[可选 - 默认值为0] - 未来值，或在最后一次付款后希望得到的现金余额。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'type',
            'detail': '[可选 - 默认值为0] - 指定各期的付款时间是在期初还是期末。\n\n0 表示期末；\n\n1 表示期初。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SLN',
        't': 8,
        'd': '返回一个期间内的资产的直线折旧。',
        'a': '返回一个期间内的资产的直线折旧。',
        'm': [3, 3],
        'p': [{
            'name': 'cost',
            'detail': '资产原值。',
            'example': '300000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'salvage',
            'detail': '折旧末尾时的值（有时也称为资产残值）。',
            'example': '75000',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'life',
            'detail': '资产的折旧期数（有时也称作资产的使用寿命）。',
            'example': '10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DURATION',
        't': 8,
        'd': '返回假设面值 ￥100 的定期付息有价证券的修正期限。',
        'a': '返回假设面值 ￥100 的定期付息有价证券的修正期限。',
        'm': [5, 6],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'coupon',
            'detail': '有价证券的年息票利率。',
            'example': '0.08',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'yld',
            'detail': '有价证券的年收益率。',
            'example': '0.09',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MDURATION',
        't': 8,
        'd': '返回假设面值 ￥100 的有价证券的 Macauley 修正期限。',
        'a': '返回假设面值 ￥100 的有价证券的 Macauley 修正期限。',
        'm': [5, 6],
        'p': [{
            'name': 'settlement',
            'detail': '有价证券的结算日。 有价证券结算日是在发行日之后，有价证券卖给购买者的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'maturity',
            'detail': '有价证券的到期日。 到期日是有价证券有效期截止时的日期。',
            'example': 'DATE(2010',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'coupon',
            'detail': '有价证券的年息票利率。',
            'example': '0.08',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'yld',
            'detail': '有价证券的年收益率。',
            'example': '0.09',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'frequency',
            'detail': '年付息次数。\n\n如果按年支付，frequency = 1；\n\n按半年期支付，frequency = 2；\n\n按季支付，frequency = 4。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'basis',
            'detail': '[可选 - 默认为0] - 指示要使用哪种天数计算方法。\n\n0表示“美国(NASD) 30/360”方法 - 此方法按照美国全国证券交易商协会标准，假设每月30天、每年360天，并对所输入的月末日期进行具体调整。\n\n1表示“实际/实际”方法 - 此方法计算基于指定日期之间的实际天数和所涉及的年份中的实际天数进行计算。此方法用于美国长期债券，也是在非财经用途方面使用最多的方法。\n\n2表示“实际/360”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为360天。\n\n3表示“实际/365”方法 - 此方法基于指定日期之间的实际天数进行计算，但假定每年为365天。\n\n4表示“欧洲30/360”方法 - 类似于0，此方法基于每月30天、每年360天进行计算，但按照欧洲金融惯例对月末日期进行调整。',
            'example': '0',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'BIN2DEC',
        't': 9,
        'd': '将二进制数转换为十进制数。',
        'a': '将二进制数转换为十进制数。',
        'm': [1, 1],
        'p': [{
            'name': 'number',
            'detail': '要转换为十进制数的带符号的10位二进制数值（以字符串形式提供）。\n\n带符号的二进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n对于此函数，最大的正数输入值为0111111111，最小的负数输入值为1000000000。\n\n如果所提供的带符号的二进制数是有效的二进制数，会自动将其转换为相应的字符串输入。例如，BIN2DEC(100)和BIN2DEC("100")得出的结果相同，均为4。',
            'example': '101',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'BIN2HEX',
        't': 9,
        'd': '将二进制数转换为十六进制数。',
        'a': '将二进制数转换为十六进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的十六进制数的带符号的10位二进制数值（以字符串形式提供）。\n\n带符号的二进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n对于此函数，最大的正数输入值为0111111111，最小的负数输入值为1000000000。\n\n如果所提供的带符号的二进制数是有效的二进制数，会自动将其转换为相应的字符串输入。例如，BIN2HEX(11111)和BIN2HEX("11111")得出 的结果相同，均为1F。',
            'example': '101',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。例如，BIN2HEX("11111",8)所得的结果值为0000001F。\n\n如果带符号的二进制数的最高位为1，则忽略此值；即当提供的带符号的二进制数大于等于1000000000时忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'BIN2OCT',
        't': 9,
        'd': '将二进制数转换为八进制数。',
        'a': '将二进制数转换为八进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的八进制数的带符号的10位二进制数值（以字符串形式提供）。\n\n带符号的二进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n对于此函数，最大的正数输入值为0111111111，最小的负数输入值为1000000000。\n\n如果所提供的带符号的二进制数是有效的二进制数，会自动将其转换为相应的字符串输入。例如，BIN2OCT(11111)和BIN2OCT("11111")得出的结果相同，均为37。',
            'example': '101',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。例如，BIN2OCT("11111")得到的结果值为00000037。\n\n如果带符号的二进制数的最高位为1，则忽略此值；即当提供的带符号的二进制数大于等于1000000000时忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DEC2BIN',
        't': 9,
        'd': '将十进制数转换为二进制数。',
        'a': '将十进制数转换为二进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的二进制数的十进制数值（以字符串形式提供）。\n\n对于此函数，最大的正数输入值为511，最小的负数输入值为-512。\n\n如果所提供的十进制数是有效的十进制数，会自动将其转换为相应的字符串输入。例如，DEC2BIN(199)和DEC2BIN("199")得出的结果相同，均为11000111。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果十进制数为负数，则忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DEC2HEX',
        't': 9,
        'd': '将十进制数转换为十六进制数。',
        'a': '将十进制数转换为十六进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的十六进制数的十进制数值（以字符串形式提供）。\n\n此函数可接受的最大正数值为549755813887，最小负数值为-549755814888。\n\n如果所提供的十进制数是有效的十进制数，会自动将其转换为相应的字符串输入。例如，DEC2HEX(100)和DEC2HEX("100")得出的结果相同，均为64。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果十进制数为负数，则忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DEC2OCT',
        't': 9,
        'd': '将十进制数转换为八进制数。',
        'a': '将十进制数转换为八进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的八进制数的十进制数值（以字符串形式提供）。\n\n此函数可接受的最大正数值为536870911，最小负数值为-53687092。\n\n如果所提供的十进制数是有效的十进制数，会自动将其转换为相应的字符串输入。例如，DEC2OCT(199)和DEC2OCT("199")得出的结果相同，均为307。',
            'example': '100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果十进制数为负数，则忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'HEX2BIN',
        't': 9,
        'd': '将十六进制数转换为二进制数。',
        'a': '将十六进制数转换为二进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的二进制数的带符号的40位十六进制数值（以字符串形式提供）。\n\n带符号的十六进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n此函数可接受的最大正数值为1FF，最小负数值为FFFFFFFE00。\n\n如果所提供的带符号的十六进制数是有效的十六进制数，函数会自动将其转换为相应的字符串输入。例如，HEX2BIN(199)和HEX2BIN("199")得出的结果相同，均为110011001。',
            'example': '"f3"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果带符号的十六进制数的最高位为1，则忽略此值；即当提供的带符号的十六进制数大于等于8000000000时忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'HEX2DEC',
        't': 9,
        'd': '将十六进制数转换为十进制数。',
        'a': '将十六进制数转换为十进制数。',
        'm': [1, 1],
        'p': [{
            'name': 'number',
            'detail': '要转换为十进制数的带符号的40位十六进制数值（以字符串形式提供）。\n\n带符号的十六进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n此函数可接受的最大正数值为7fffffffff，最小负数值为8000000000。\n\n如果所提供的带符号的十六进制数是有效的十六进制数，函数会自动将其转换为相应的字符串输入。例如，HEX2DEC(199)和HEX2DEC("199")得出的结果相同，均为409。',
            'example': '"f3"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'HEX2OCT',
        't': 9,
        'd': '将十六进制数转换为八进制数。',
        'a': '将十六进制数转换为八进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的八进制数的带符号的40位十六进制数值（以字符串形式提供）。\n\n带符号的十六进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n此函数可接受的最大正数值为1FFFFFFF，最小负数值为FFE0000000。\n\n如果所提供的带符号的十六进制数是有效的十六进制数，函数会自动将其转换为相应的字符串输入。例如，HEX2OCT(199)和HEX2OCT("199")得出的结果相同，均为631。',
            'example': '"f3"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果带符号的十六进制数的最高位为1，则忽略此值；即当给定的带符号的十六进制数大于等于8000000000时忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'OCT2BIN',
        't': 9,
        'd': '将八进制数转换为二进制数。',
        'a': '将八进制数转换为二进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的二进制数的带符号的30位八进制数值（以字符串形式提供）。\n\n带符号的八进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n此函数可接受的最大正数值为777，最小负数值为7777777000。\n\n如果所提供的带符号的八进制数是有效的八进制数，函数会自动将其转换为相应的字符串输入。例如，OCT2BIN(177)和OCT2BIN("177")得出的结果相同，均为1111111。',
            'example': '37',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果带符号的八进制数的最高位为1，则忽略此值；即当给定的带符号的八进制数大于等于4000000000时忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'OCT2DEC',
        't': 9,
        'd': '将八进制数转换为十进制数。',
        'a': '将八进制数转换为十进制数。',
        'm': [1, 1],
        'p': [{
            'name': 'number',
            'detail': '要转换为十进制数的带符号的30位八进制数值（以字符串形式提供）。\n\n带符号的ba进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n此函数可接受的最大正数值为3777777777，最小负数值为4000000000。\n\n如果所提供的带符号的八进制数是有效的八进制数，函数会自动将其转换为相应的字符串输入。例如，OCT2DEC(177)和OCT2DEC("177")得出的结果相同，均为127。',
            'example': '37',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'OCT2HEX',
        't': 9,
        'd': '将八进制数转换为十六进制数。',
        'a': '将八进制数转换为十六进制数。',
        'm': [1, 2],
        'p': [{
            'name': 'number',
            'detail': '要转换为带符号的十六进制数的带符号的30位八进制数值（以字符串形式提供）。\n\n带符号的ba进制数的最高位是符号位；也就是说，负数是以二的补码形式表示的。\n\n此函数可接受的最大正数值为3777777777，最小负数值为4000000000。\n\n如果所提供的带符号的八进制数是有效的八进制数，函数会自动将其转换为相应的字符串输入。例如，OCT2HEX(177)和OCT2HEX("177")得出的结果相同，均为7F。',
            'example': '37',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'places',
            'detail': '[ 可选 ] - 结果中要确保的有效位数。\n\n如果设置的有效位数大于结果中的有效位数，则在结果的左侧填充0，使总有效位数达到有效位数。\n\n如果带符号的八进制数的最高位为1，则忽略此值；即当给定的带符号的八进制数大于等于4000000000时忽略此值。',
            'example': '8',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'COMPLEX',
        't': 9,
        'd': '将实系数及虚系数转换为 x+yi 或 x+yj 形式的复数。',
        'a': '将实系数及虚系数转换为 x+yi 或 x+yj 形式的复数。',
        'm': [2, 3],
        'p': [{
            'name': 'real_num',
            'detail': '复数的实系数。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'i_num',
            'detail': '复数的虚系数。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'suffix',
            'detail': '[可选 - 默认为 "i"] - 复数中虚系数的后缀。',
            'example': '"j"',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangestring'
        }]
    }, {
        'n': 'IMREAL',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的复数的实系数。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的复数的实系数。',
        'm': [1, 1],
        'p': [{
            'name': 'inumber',
            'detail': '需要计算其实系数的复数。',
            'example': '"4+5i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IMAGINARY',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的复数的虚系数。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的复数的虚系数。',
        'm': [1, 1],
        'p': [{
            'name': 'inumber',
            'detail': '需要计算其虚系数的复数。',
            'example': '"4+5i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IMCONJUGATE',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的复数的共轭复数。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的复数的共轭复数。',
        'm': [1, 1],
        'p': [{
            'name': 'inumber',
            'detail': '需要计算其共轭数的复数。',
            'example': '"3+4i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IMABS',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的复数的绝对值（模）。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的复数的绝对值（模）。',
        'm': [1, 1],
        'p': [{
            'name': 'inumber',
            'detail': '要计算其绝对值的复数。',
            'example': '"3+4i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'DELTA',
        't': 9,
        'd': '检验两个值是否相等。 如果 number1=number2，则返回 1；否则返回 0。',
        'a': '检验两个值是否相等。 如果 number1=number2，则返回 1；否则返回 0。',
        'm': [1, 2],
        'p': [{
            'name': 'number1',
            'detail': '第一个数字。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'number2',
            'detail': '[可选 - 默认为 0] - 第二个数字。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'IMSUM',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 个复数的和。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 个复数的和。',
        'm': [1, 255],
        'p': [{
            'name': 'inumber1',
            'detail': '要相加的第一个复数',
            'example': '"3+4i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'inumber2, …',
            'detail': '[可选] - 要与值1 相加的其他复数',
            'example': '"5-3i"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IMSUB',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的两个复数的差。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的两个复数的差。',
        'm': [2, 2],
        'p': [{
            'name': 'inumber1',
            'detail': '从（复）数中减去 inumber2。',
            'example': '"6+5i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'inumber2',
            'detail': '从 inumber1 中减（复）数。',
            'example': '"2+3i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IMPRODUCT',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 个复数的乘积。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的 1 至 255 个复数的乘积。',
        'm': [1, 255],
        'p': [{
            'name': 'inumber1',
            'detail': '用于计算乘积的第一个复数',
            'example': '"3+4i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'inumber2, …',
            'detail': '[可选] - 要相乘的其他复数。',
            'example': '"5-3i"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IMDIV',
        't': 9,
        'd': '返回以 x+yi 或 x+yj 文本格式表示的两个复数的商。',
        'a': '返回以 x+yi 或 x+yj 文本格式表示的两个复数的商。',
        'm': [2, 2],
        'p': [{
            'name': 'inumber1',
            'detail': '复数分子或被除数。',
            'example': '"11+16i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'inumber2',
            'detail': '复数分母或除数。',
            'example': '"3+2i"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'NOT',
        't': 10,
        'd': '返回某个逻辑值的相反值 - “NOT(TRUE())”将返回 FALSE；“NOT(FALSE())”将返回 TRUE。',
        'a': '返回某个逻辑值的相反值 - “NOT(TRUE())”将返回 FALSE；“NOT(FALSE())”将返回 TRUE。',
        'm': [1, 1],
        'p': [{
            'name': 'logical',
            'detail': '计算结果为 TRUE 或 FALSE 的任何值或表达式。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TRUE',
        't': 10,
        'd': '返回逻辑值 TRUE。',
        'a': '返回逻辑值 TRUE。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'FALSE',
        't': 10,
        'd': '返回逻辑值 FALSE。',
        'a': '返回逻辑值 FALSE。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'AND',
        't': 10,
        'd': '所有参数的计算结果为 TRUE 时，返回 TRUE；只要有一个参数的计算结果为 FALSE，即返回 FALSE。',
        'a': '所有参数的计算结果为 TRUE 时，返回 TRUE；只要有一个参数的计算结果为 FALSE，即返回 FALSE。',
        'm': [1, 255],
        'p': [{
            'name': 'logical1',
            'detail': '要测试的第一个条件，其计算结果可以为 TRUE 或 FALSE。',
            'example': 'A2 = "foo"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'logical2,...',
            'detail': '[可选] - 要测试的其他条件，其计算结果可以为 TRUE 或 FALSE，最多可包含 255 个条件。',
            'example': 'A3 = "bar"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IFERROR',
        't': 10,
        'd': '如果第一个参数不是错误值，就返回第一个参数；否则，返回第二个参数。',
        'a': '如果第一个参数不是错误值',
        'm': [2, 2],
        'p': [{
            'name': 'value',
            'detail': '检查是否存在错误的参数。',
            'example': 'A1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value_if_error',
            'detail': '公式的计算结果错误时返回的值。 计算以下错误类型：#N/A、#VALUE!、#REF!、#DIV/0!、#NUM!、#NAME? 或 #NULL!。',
            'example': '"Error in cell A1"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'IF',
        't': 10,
        'd': '当逻辑表达式的值为 TRUE 时返回一个值，而当其为 FALSE 时返回另一个值。',
        'a': '当逻辑表达式的值为 TRUE 时返回一个值，而当其为 FALSE 时返回另一个值。',
        'm': [2, 3],
        'p': [{
            'name': 'logical_test',
            'detail': '一个表达式或对包含表达式的单元格的引用，该表达式代表某种逻辑值（即TRUE或FALSE）。',
            'example': 'A2 = "foo"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value_if_true',
            'detail': '当逻辑表达式为TRUE时的返回值。',
            'example': '"A2 is foo"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value_if_false',
            'detail': '[可选 - 默认为空白] - 当逻辑表达式等于FALSE时的函数返回值。',
            'example': '"A2 was false"',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'OR',
        't': 10,
        'd': '只要有一个参数的计算结果为 TRUE 时，返回 TRUE；所有参数的计算结果为 FALSE，即返回 FALSE。',
        'a': '只要有一个参数的计算结果为 TRUE 时，返回 TRUE；所有参数的计算结果为 FALSE，即返回 FALSE。',
        'm': [1, 255],
        'p': [{
            'name': 'logical1',
            'detail': '要测试的第一个条件，其计算结果可以为 TRUE 或 FALSE。',
            'example': 'A2 = "foo"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': '逻辑表达式2',
            'detail': '[可选] - 其他表达式或对包含表达式的单元格的引用，这些表达式代表某种逻辑值（即TRUE或FALSE）或者可以强制转换为逻辑值。',
            'example': ' A3 = "bar"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'NE',
        't': 11,
        'd': '如果指定的值不相等，则返回“TRUE”；否则返回“FALSE”。相当于“<>”运算符。',
        'a': '如果指定的值不相等，则返回“TRUE”；否则返回“FALSE”。相当于“<>”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '第一个值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '要检查是否与 value1 不相等的值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'EQ',
        't': 11,
        'd': '如果指定的值相等，则返回“TRUE”；否则返回“FALSE”。相当于“=”运算符。',
        'a': '如果指定的值相等，则返回“TRUE”；否则返回“FALSE”。相当于“=”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '第一个值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '要检查是否与 value1 相等的值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'GT',
        't': 11,
        'd': '如果第一个参数严格大于第二个，则返回 TRUE；否则返回 FALSE。相当于“>”运算符。',
        'a': '如果第一个参数严格大于第二个，则返回 TRUE；否则返回 FALSE。相当于“>”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '要测试其是否大于 value2 的值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '第二个值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'GTE',
        't': 11,
        'd': '如果第一个参数大于或等于第二个，则返回 TRUE；否则返回 FALSE。相当于“>=”运算符。',
        'a': '如果第一个参数大于或等于第二个，则返回 TRUE；否则返回 FALSE。相当于“>=”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '要测试其是否大于等于 value2 的值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '第二个值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LT',
        't': 11,
        'd': '如果第一个参数严格小于第二个，则返回 TRUE；否则返回 FALSE。相当于“<”运算符。',
        'a': '如果第一个参数严格小于第二个，则返回 TRUE；否则返回 FALSE。相当于“<”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '要测试其是否小于 value2 的值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '第二个值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LTE',
        't': 11,
        'd': '如果第一个参数小于或等于第二个，则返回 TRUE；否则返回 FALSE。相当于“<=”运算符。',
        'a': '如果第一个参数小于或等于第二个，则返回 TRUE；否则返回 FALSE。相当于“<=”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '要测试其是否小于等于 value2 的值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '第二个值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ADD',
        't': 11,
        'd': '返回两个数值之和。相当于 `+` 运算符。',
        'a': '返回两个数值之和。相当于 `+` 运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '第一个加数。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value2',
            'detail': '第二个加数。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MINUS',
        't': 11,
        'd': '返回两个数值之差。相当于“-”运算符。',
        'a': '返回两个数值之差。相当于“-”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '被减数，即要对其计减的数值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value2',
            'detail': '减数，即要从 value1 中减除的数值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MULTIPLY',
        't': 11,
        'd': '返回两个数的乘积。相当于“*”运算符。',
        'a': '返回两个数的乘积。相当于“*”运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '第一个乘数。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value2',
            'detail': '第二个乘数。',
            'example': 'B2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DIVIDE',
        't': 11,
        'd': '返回两个参数相除所得的结果。相当于 `/` 运算符。',
        'a': '返回两个参数相除所得的结果。相当于 `/` 运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': '要被除的数值。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'value2',
            'detail': '用于除其他数的数值。\n\n除数不得为0。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CONCAT',
        't': 11,
        'd': '返回两个值的串联。相当于 `&` 运算符。',
        'a': '返回两个值的串联。相当于 `&` 运算符。',
        'm': [2, 2],
        'p': [{
            'name': 'value1',
            'detail': 'value2 将附于其后的值。',
            'example': '"de"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'value2',
            'detail': '要附于 value1 之后的值。',
            'example': '"mystify"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'UNARY_PERCENT',
        't': 11,
        'd': '返回按百分比解释的数值。例如，“UNARY_PERCENT(100)”等于1。',
        'a': '返回按百分比解释的数值。例如，“UNARY_PERCENT(100)”等于1。',
        'm': [1, 1],
        'p': [{
            'name': 'number',
            'detail': '要作为百分比解释的数值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CONCATENATE',
        't': 12,
        'd': '将两个或多个文本字符串联接为一个字符串。',
        'a': '将两个或多个文本字符串联接为一个字符串。',
        'm': [1, 255],
        'p': [{
            'name': 'text1',
            'detail': '初始字符串。',
            'example': '"Super"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'text2 ...',
            'detail': '[可选] - 要按顺序连接在一起的其他字符串。',
            'example': '"calla"',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'CODE',
        't': 12,
        'd': '返回所提供的字符串中首字符的 Unicode 映射值。',
        'a': '返回所提供的字符串中首字符的 Unicode 映射值。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要返回其首字符的Unicode映射值的字符串。',
            'example': '"a"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'CHAR',
        't': 12,
        'd': '按照当前 Unicode 编码表，将数字转换为对应的字符。',
        'a': '按照当前 Unicode 编码表，将数字转换为对应的字符。',
        'm': [1, 1],
        'p': [{
            'name': 'number',
            'detail': '介于 1 到 255 之间的数字。',
            'example': '97',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ARABIC',
        't': 12,
        'd': '将罗马数字转换为阿拉伯数字。',
        'a': '将罗马数字转换为阿拉伯数字。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要转换格式的罗马数字',
            'example': '"XIV"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ROMAN',
        't': 12,
        'd': '将数字格式设置为罗马数字形式。',
        'a': '将数字格式设置为罗马数字形式。',
        'm': [1, 1],
        'p': [{
            'name': 'number',
            'detail': '要设置格式的数字，介于1到3999之间（包括这两个数字）。',
            'example': '499',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'REGEXEXTRACT',
        't': 12,
        'd': '按照正则表达式提取匹配的子串。',
        'a': '按照正则表达式提取匹配的子串。',
        'm': [2, 2],
        'p': [{
            'name': 'text',
            'detail': '输入文本。',
            'example': '"Needle in a haystack"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'regular_expression',
            'detail': '此函数将返回文本中符合此表达式的第一个子串。',
            'example': '".e{2}dle"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'REGEXMATCH',
        't': 12,
        'd': '判断一段文本是否与正则表达式相匹配。',
        'a': '判断一段文本是否与正则表达式相匹配。',
        'm': [2, 2],
        'p': [{
            'name': 'text',
            'detail': '要用正则表达式测试的文本。',
            'example': '"Spreadsheets"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'regular_expression',
            'detail': '用来测试文本的正则表达式。',
            'example': '"S.r"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'REGEXREPLACE',
        't': 12,
        'd': '使用正则表达式将文本字符串中的一部分替换为其他文本字符串。',
        'a': '使用正则表达式将文本字符串中的一部分替换为其他文本字符串。',
        'm': [3, 3],
        'p': [{
            'name': 'text',
            'detail': '要对其局部进行替换操作的文本。',
            'example': '"Spreadsheets"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'regular_expression',
            'detail': '正则表达式。 text 中所有匹配的实例都将被替换。',
            'example': '"S.*d"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'replacement',
            'detail': '要插入到原有文本中的文本。',
            'example': '"Bed"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'T',
        't': 12,
        'd': '返回文本格式的字符串参数。',
        'a': '返回文本格式的字符串参数。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为文本的参数。\n\n如果值为文本，T将返回值本身。\n\n如果值为指向包含文本的单元格的引用，T将返回值中的内容。\n\n如果值为错误值或包含错误值的单元格，T将返回该错误值。\n\n对于所有其他情况，T将返回空串。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'FIXED',
        't': 12,
        'd': '以固定的小数位数设置数字的格式。',
        'a': '以固定的小数位数设置数字的格式。',
        'm': [1, 3],
        'p': [{
            'name': 'number',
            'detail': '要进行舍入并转换为文本的数字。',
            'example': '3.141592653',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'decimals',
            'detail': '[可选 - 默认值为2] - 结果中要显示的小数位数。\n\n如果数值的有效位数小于小数位数，将以零填充。如果数值的有效位数大于小数位数，则将其舍入到所需的小数位数而不是将其截断。',
            'example': '2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'no_commas',
            'detail': '[可选 - 默认值为FALSE()] - 一个逻辑值，如果为 TRUE()，则会禁止 FIXED 在返回的文本中包含逗号。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'FIND',
        't': 12,
        'd': '返回字符串在文本中首次出现的位置（区分大小写）。',
        'a': '返回字符串在文本中首次出现的位置（区分大小写）。',
        'm': [2, 3],
        'p': [{
            'name': 'find_text',
            'detail': '要在要搜索的文本中查找的字符串。',
            'example': '"n"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'within_text',
            'detail': '要在其中搜索搜索字符串的首次出现位置的文本。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'start_num',
            'detail': '[可选 - 默认值为1] - 要在要搜索的文本中开始搜索的字符位置。',
            'example': '14',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'FINDB',
        't': 12,
        'd': '返回某个字符串在文本中首次出现的位置（每个双字节字符占两个位置）。',
        'a': '返回某个字符串在文本中首次出现的位置（每个双字节字符占两个位置）。',
        'm': [2, 3],
        'p': [{
            'name': 'find_text',
            'detail': '要在要搜索的文本中查找的字符串。',
            'example': '"新"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'within_text',
            'detail': '要在其中搜索搜索字符串的首次出现位置的文本。',
            'example': '"农历新年"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'start_num',
            'detail': '[可选 - 默认值为 1] - 要在要搜索的文本中开始搜索的字符位置。',
            'example': '2',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'JOIN',
        't': 12,
        'd': '将一个或多个使用指定定界符的一维数组的元素连接到一起。',
        'a': '将一个或多个使用指定定界符的一维数组的元素连接到一起。',
        'm': [2, 255],
        'p': [{
            'name': 'separator',
            'detail': '置于相互连接的值之间的字符或字符串。\n\n定界符可以为空，例如JOIN(,{1,2,3})。',
            'example': '" and-a "',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'array1',
            'detail': '要使用定界符连接的一个或多个值。',
            'example': '{1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'array2, ...',
            'detail': '[可选] - 要使用定界符连接的其他值或数组。',
            'example': '2',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LEFT',
        't': 12,
        'd': '从文本字符串的第一个字符开始返回指定个数的字符。',
        'a': '从文本字符串的第一个字符开始返回指定个数的字符。',
        'm': [1, 2],
        'p': [{
            'name': 'text',
            'detail': '包含要提取的字符的文本字符串。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'num_chars',
            'detail': '[可选 - 默认值为1] - 指定要由 LEFT 提取的字符的数量。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'RIGHT',
        't': 12,
        'd': '根据所指定的字符数返回文本字符串中最后一个或多个字符。',
        'a': '根据所指定的字符数返回文本字符串中最后一个或多个字符。',
        'm': [1, 2],
        'p': [{
            'name': 'text',
            'detail': '包含要提取的字符的文本字符串。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'num_chars',
            'detail': '[可选 - 默认值为1] - 指定要由 RIGHT 提取的字符的数量。',
            'example': '2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MID',
        't': 12,
        'd': '返回文本字符串中从指定位置开始的特定数目的字符。',
        'a': '返回文本字符串中从指定位置开始的特定数目的字符。',
        'm': [3, 3],
        'p': [{
            'name': 'text',
            'detail': '包含要提取的字符的文本字符串。',
            'example': '"get this"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'start_num',
            'detail': '要从字符串中开始提取的位置。字符串中第一个字符的索引为1。',
            'example': '5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'num_chars',
            'detail': '指定要由 MID 提取的字符的数量。\n\n如果提取的字符数尚不足提取长度个字符时就到达了字符串尾部，则MID返回从开始位置到字符串尾部的字符。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'LEN',
        't': 12,
        'd': '返回给定字符串的长度。',
        'a': '返回给定字符串的长度。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要返回其长度的字符串。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LENB',
        't': 12,
        'd': '返回文本中所包含的字符数。与双字节字符集(DBCS)一起使用。',
        'a': '返回文本中所包含的字符数。与双字节字符集(DBCS)一起使用。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要返回其字节数的字符串。（一个汉字为两个字节数）',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LOWER',
        't': 12,
        'd': '将指定字符串中的字母转换为小写。',
        'a': '将指定字符串中的字母转换为小写。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要转换为小写的字符串。',
            'example': '"LOREM IPSUM"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'UPPER',
        't': 12,
        'd': '将指定字符串中的字母转换为大写。',
        'a': '将指定字符串中的字母转换为大写。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要转换为大写的字符串。',
            'example': '"lorem ipsum"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'EXACT',
        't': 12,
        'd': '比较两个字符串是否相同。',
        'a': '比较两个字符串是否相同。',
        'm': [2, 2],
        'p': [{
            'name': 'text1',
            'detail': '要比较的第一个字符串。',
            'example': 'A1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'text2',
            'detail': '要比较的第二个字符串。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'REPLACE',
        't': 12,
        'd': '将文本字符串的一部分替换为其他文本字符串。',
        'a': '将文本字符串的一部分替换为其他文本字符串。',
        'm': [4, 4],
        'p': [{
            'name': 'old_text',
            'detail': '要对其局部进行替换操作的文本。',
            'example': '"Spreadsheets"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'start_num',
            'detail': '开始进行替换操作的位置（文本开头位置为 1）。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'num_chars',
            'detail': '要在文本中替换的字符个数。',
            'example': '6',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'new_text',
            'detail': '要插入到原有文本中的文本。',
            'example': '"Bed"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'REPT',
        't': 12,
        'd': '返回指定文本的多次重复。',
        'a': '返回指定文本的多次重复。',
        'm': [2, 2],
        'p': [{
            'name': 'text',
            'detail': '要重复的字符或字符串。',
            'example': '"ha"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'number_times',
            'detail': '要重复的文本要在返回值中出现的次数。\n\n最大重复次数为100。即使重复次数大于100，REPT也仅将相应文本重复100次。',
            'example': '4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SEARCH',
        't': 12,
        'd': '返回字符串在文本中首次出现的位置（不区分大小写）。',
        'a': '返回字符串在文本中首次出现的位置（不区分大小写）。',
        'm': [2, 3],
        'p': [{
            'name': 'find_text',
            'detail': '要在要搜索的文本中查找的字符串。',
            'example': '"n"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'within_text',
            'detail': '要在其中搜索搜索字符串的首次出现位置的文本。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'start_num',
            'detail': '[ 可选 - 默认值为1 ] - 要在要搜索的文本中开始搜索的字符位置。',
            'example': '14',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUBSTITUTE',
        't': 12,
        'd': '在文本字符串中用 new_text 替换 old_text。',
        'a': '在文本字符串中用 new_text 替换 old_text。',
        'm': [3, 4],
        'p': [{
            'name': 'text',
            'detail': '需要替换其中字符的文本，或对含有文本（需要替换其中字符）的单元格的引用。',
            'example': '"search for it"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'old_text',
            'detail': '需要替换的文本。',
            'example': '"search for"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'new_text',
            'detail': '用于替换 old_text 的文本。',
            'example': '"Google"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'instance_num',
            'detail': '[ 可选 ] - 指定要用 new_text 替换 old_text 的事件。 如果指定了 instance_num，则只有满足要求的 old_text 被替换。 否则，文本中出现的所有 old_text 都会更改为 new_text。',
            'example': '3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'CLEAN',
        't': 12,
        'd': '移除文本中的不可打印 ASCII 字符后将其返回。',
        'a': '移除文本中的不可打印 ASCII 字符后将其返回。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要移除其中不可打印字符的文本。',
            'example': '"AF"&CHAR(31)',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TEXT',
        't': 12,
        'd': '按照指定格式将数字转换为文本。',
        'a': '按照指定格式将数字转换为文本。',
        'm': [2, 2],
        'p': [{
            'name': 'value',
            'detail': '要设置格式的数字、日期或时间。',
            'example': '1.23',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'format_text',
            'detail': '以括号括起来的模式串，将按该模式设置数字的格式。\n\n0表示在数值位数少于格式指定的位数时必定以零填充。例如，TEXT(12.3,"000.00")将返回012.30。当数值的小数位数超过模式指定的小数位数时，四舍五入为指定的小数位数。例如，TEXT(12.305,"00.00")将返回12.31。\n\n#类似于0，但并不是在小数点的两侧都以零填充。例如，TEXT(12.3,"###.##")将返回12.3。',
            'example': '"$0.00"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TRIM',
        't': 12,
        'd': '删除指定字符串前后的空格。',
        'a': '删除指定字符串前后的空格。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要修剪的字符串或指向包含该字符串的单元格的引用。',
            'example': '" lorem ipsum"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'VALUE',
        't': 12,
        'd': '将可识别的任何日期、时间或数字格式的字符串转换为数字。',
        'a': '将可识别的任何日期、时间或数字格式的字符串转换为数字。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '包含要转换的值的字符串。',
            'example': '"123"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'PROPER',
        't': 12,
        'd': '将指定字符串中每个单词的首字母转为大写。',
        'a': '将指定字符串中每个单词的首字母转为大写。',
        'm': [1, 1],
        'p': [{
            'name': 'text',
            'detail': '要转换的文本，其中每个单词的首字母都将转为大写，所有其他字母则转为小写。',
            'example': '"united states"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'CONVERT',
        't': 13,
        'd': '将数字从一种度量系统转换为另一种度量系统。',
        'a': '将数字从一种度量系统转换为另一种度量系统。',
        'm': [3, 3],
        'p': [{
            'name': 'number',
            'detail': '是以 from_unit 为单位的需要进行转换的数值。',
            'example': '5.1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'from_unit',
            'detail': '是数值的单位。',
            'example': '"g"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'to_unit',
            'detail': '是结果的单位。',
            'example': '"kg"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'SUMX2MY2',
        't': 14,
        'd': '返回两数组中对应数值的平方差之和。',
        'a': '返回两数组中对应数值的平方差之和。',
        'm': [2, 2],
        'p': [{
            'name': 'array_x',
            'detail': '第一个数组或数值区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'array_y',
            'detail': '第二个数组或数值区域。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUMX2PY2',
        't': 14,
        'd': '返回两数组中对应数值的平方和之和。',
        'a': '返回两数组中对应数值的平方和之和。',
        'm': [2, 2],
        'p': [{
            'name': 'array_x',
            'detail': '第一个数组或数值区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'array_y',
            'detail': '第二个数组或数值区域。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUMXMY2',
        't': 14,
        'd': '返回两数组中对应数值之差的平方和。',
        'a': '返回两数组中对应数值之差的平方和。',
        'm': [2, 2],
        'p': [{
            'name': 'array_x',
            'detail': '第一个数组或数值区域。',
            'example': 'A2:A100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'array_y',
            'detail': '第二个数组或数值区域。',
            'example': 'B2:B100',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TRANSPOSE',
        't': 14,
        'd': '将数组或单元格范围的行列转置。',
        'a': '将数组或单元格范围的行列转置。',
        'm': [1, 1],
        'p': [{
            'name': 'array',
            'detail': '要将其行列互换的数组或范围。',
            'example': '{1,2}',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'TREND',
        't': 14,
        'd': '返回线性趋势值。',
        'a': '返回线性趋势值。',
        'm': [1, 4],
        'p': [{
            'name': 'known_y',
            'detail': '关系表达式 y = mx + b 中已知的 y 值集合。\n\n如果 known_y 为二维数组或范围，则 known_x 的维数必须与之相同，或者省略此参数。\n\n如果 known_y 为一维数组或范围，known_x 则可代表二维数组或范围中的多个自变量。也就是说，如果 known_y 为单行，则将 known_x 中的每行解释为各自独立的值，类似情况也适用于 known_y 为单列的情况。',
            'example': 'B2:B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'known_x',
            'detail': '[可选 - 默认该数组为{1,2,3,...},其大小与 known_y 相同] - 关系表达式 y = mx + b 中已知的可选 x 值集合。\n\n如果 known_y 为一维数组或范围，known_x 则可代表二维数组或范围中的多个自变量。也就是说，如果 known_y 为单行，则将 known_x 中的每行解释为各自独立的值，类似情况也适用于 known_y 为单列的情况。',
            'example': 'A2:A10',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'new_x',
            'detail': '[可选 - 默认与 known_x 相同] -  需要函数 TREND 返回对应 y 值的新 x 值。',
            'example': 'A11:A13',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'const',
            'detail': '[可选 - 默认值为TRUE()] - 一个逻辑值，用于指定是否将常量 b 强制设为 0。\n\nTRUE() 表示 b 将按正常计算；\n\nFALSE() 表示 b 将被设为 0（零），m 将被调整以使 y = mx。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'FREQUENCY',
        't': 14,
        'd': '计算数值在某个区域内的出现频率，然后返回一个垂直数组。',
        'a': '计算数值在某个区域内的出现频率，然后返回一个垂直数组。',
        'm': [2, 2],
        'p': [{
            'name': 'data_array',
            'detail': '要对其频率进行计数的一组数值或对这组数值的引用。',
            'example': 'A2:A40',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'bins_array',
            'detail': '要将 data_array 中的值插入到的间隔数组或对间隔的引用。\n\n为清晰起见，应将类别排序，但如果未排序，FREQUENCY会在内部对这些指定的值进行排序并返回正确结果。',
            'example': 'B2:B5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'GROWTH',
        't': 14,
        'd': '使用现有数据计算预测的指数等比。',
        'a': '使用现有数据计算预测的指数等比。',
        'm': [1, 4],
        'p': [{
            'name': 'known_y',
            'detail': '关系表达式 y = b*m^x 中已知的 y 值集合。\n\n如果已知数据_y为二维数组或范围，则已知数据_x的维数必须与之相同，或者省略此参数。\n\n如果已知数据_y为一维数组或范围，已知数据_x则可代表二维数组或范围中的多个自变量。也就是说，如果已知数据_y为单行，则将已知数据_x中的每行解释为各自独立的值，类似情况也适用于已知数据_y为单列的情况。',
            'example': 'B2:B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'known_x',
            'detail': '[可选 - 默认该数组为{1,2,3,...},其大小与 known_y 相同] - 关系表达式 y = b*m^x 中已知的可选 x 值集合。\n\n如果已知数据_y为一维数组或范围，已知数据_x则可代表二维数组或范围中的多个自变量。也就是说，如果已知数据_y为单行，则将已知数据_x中的每行解释为各自独立的值，类似情况也适用于已知数据_y为单列的情况。',
            'example': 'A2:A10',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'new_x',
            'detail': '[可选 - 默认与 known_x 相同] - 需要函数 GROWTH 返回对应 y 值的新 x 值。',
            'example': 'A11:A13',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'const',
            'detail': '[可选 - 默认值为TRUE()] -一个逻辑值，用于指定是否将常量 b 强制设为 1。\n\nTRUE() 表示 b 将按正常计算；\n\nFALSE() 表示 b 将被设为 1，m 将被调整以使 y = m^x。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LINEST',
        't': 14,
        'd': '可通过使用最小二乘法计算与现有数据最佳拟合的直线，来计算某直线的统计值，然后返回描述此直线的数组。',
        'a': '可通过使用最小二乘法计算与现有数据最佳拟合的直线，来计算某直线的统计值，然后返回描述此直线的数组。',
        'm': [1, 4],
        'p': [{
            'name': 'known_y',
            'detail': '关系表达式 y = mx + b 中已知的 y 值集合。\n\n如果 known_y 为二维数组或范围，则 known_x 的维数必须与之相同，或者省略此参数。\n\n如果 known_y 为一维数组或范围，known_x 则可代表二维数组或范围中的多个自变量。也就是说，如果 known_y 为单行，则将 known_x 中的每行解释为各自独立的值，类似情况也适用于 known_y 为单列的情况。',
            'example': 'B2:B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'known_x',
            'detail': '[可选 - 默认该数组为{1,2,3,...},其大小与 known_y 相同] - 关系表达式 y = mx + b 中已知的可选 x 值集合。\n\n如果 known_y 为一维数组或范围，known_x 则可代表二维数组或范围中的多个自变量。也就是说，如果 known_y 为单行，则将 known_x 中的每行解释为各自独立的值，类似情况也适用于 known_y 为单列的情况。',
            'example': 'A2:A10',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'const',
            'detail': '[可选 - 默认值为TRUE()] - 一个逻辑值，用于指定是否将常量 b 强制设为 0。\n\nTRUE() 表示 b 将按正常计算；\n\nFALSE() 表示 b 将被设为 0（零），m 将被调整以使 y = mx。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'stats',
            'detail': '[可选 - 默认值为FALSE()] - 一个逻辑值，用于指定是否返回附加回归统计值。\n\n如果详细为TRUE，除了对应于每个自变量的一组线性系数和y截距之外，LINEST还返回以下信息：\n\n每项系数和截距的标准误差、\n\n限定系数（介于0和1之间，1表示完全相关）、\n\n因变量值的标准误差、\n\nF统计或F观测值，指示所观测到的因变量和自变量变量之间的关系是随机的还是线性的、\n\n自由度，用于在参照表中查找F统计值以估算可信度、\n\n回归平方和，以及\n\n残差平方和。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'LOGEST',
        't': 14,
        'd': '在回归分析中，计算最符合数据的指数回归拟合曲线，并返回描述该曲线的数值数组。',
        'a': '在回归分析中，计算最符合数据的指数回归拟合曲线，并返回描述该曲线的数值数组。',
        'm': [1, 4],
        'p': [{
            'name': 'known_y',
            'detail': '关系表达式 y = mx + b 中已知的 y 值集合。\n\n如果 known_y 为二维数组或范围，则 known_x 的维数必须与之相同，或者省略此参数。\n\n如果 known_y 为一维数组或范围，known_x 则可代表二维数组或范围中的多个自变量。也就是说，如果 known_y 为单行，则将 known_x 中的每行解释为各自独立的值，类似情况也适用于 known_y 为单列的情况。',
            'example': 'B2:B10',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'known_x',
            'detail': '[可选 - 默认该数组为{1,2,3,...},其大小与 known_y 相同] - 关系表达式 y = mx + b 中已知的可选 x 值集合。\n\n如果 known_y 为一维数组或范围，known_x 则可代表二维数组或范围中的多个自变量。也就是说，如果 known_y 为单行，则将 known_x 中的每行解释为各自独立的值，类似情况也适用于 known_y 为单列的情况。',
            'example': 'A2:A10',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'const',
            'detail': '[可选 - 默认值为TRUE()] - 一个逻辑值，用于指定是否将常量 b 强制设为 0。\n\nTRUE() 表示 b 将按正常计算；\n\nFALSE() 表示 b 将被设为 0（零），m 将被调整以使 y = mx。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'stats',
            'detail': '[可选 - 默认值为FALSE()] - 一个逻辑值，用于指定是否返回附加回归统计值。\n\n如果详细为TRUE，则除了为每个自变量和系数 b 返回一组指数值之外，LOGEST 还将返回以下数据：\n\n每项指数和系数的标准误差、\n\n限定系数（介于 0 和 1 之间，1 表示完全相关）、\n\n因变量值的标准误差、\n\nF 统计或 F 观测值，指示所观测到的因变量和自变量之间的关系是随机的还是指数的、\n\n自由度 - 用于在参照表中查找 F 统计值以估算可信度、\n\n回归平方和，以及\n\n残差平方和。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'MDETERM',
        't': 14,
        'd': '返回一个数组的矩阵行列式的值。',
        'a': '返回一个数组的矩阵行列式的值。',
        'm': [1, 1],
        'p': [{
            'name': 'array',
            'detail': '行数和列数相等的数值数组。',
            'example': 'A1:D4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MINVERSE',
        't': 14,
        'd': '返回数组中存储的矩阵的逆矩阵。',
        'a': '返回数组中存储的矩阵的逆矩阵。',
        'm': [1, 1],
        'p': [{
            'name': 'array',
            'detail': '行数和列数相等的数值数组。',
            'example': 'A1:D4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'MMULT',
        't': 14,
        'd': '返回两个数组的矩阵乘积。结果矩阵的行数与 array1 的行数相同，矩阵的列数与 array2 的列数相同。',
        'a': '返回两个数组的矩阵乘积。结果矩阵的行数与 array1 的行数相同，矩阵的列数与 array2 的列数相同。',
        'm': [2, 2],
        'p': [{
            'name': 'array1',
            'detail': '要进行矩阵乘法运算的第一个矩阵数组。\n\narray1 列数必须与 array2 的行数相同',
            'example': 'A1:B3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'array2',
            'detail': '要进行矩阵乘法运算的第二个矩阵数组。\n\narray2 的行数必须与 array1 列数相同',
            'example': 'C1:F2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SUMPRODUCT',
        't': 14,
        'd': '在给定的几组数组中，将数组间对应的元素相乘，并返回乘积之和。',
        'a': '在给定的几组数组中，将数组间对应的元素相乘，并返回乘积之和。',
        'm': [1, 255],
        'p': [{
            'name': 'array1',
            'detail': '其相应元素需要进行相乘并求和的第一个数组参数。',
            'example': 'A2:C5',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'array2',
            'detail': '[可选] - 其相应元素需要进行相乘并求和的其它数组参数。',
            'example': 'D2:F5',
            'require': 'o',
            'repeat': 'y',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'ISFORMULA',
        't': 15,
        'd': '检查公式是否位于引用的单元格中。',
        'a': '检查公式是否位于引用的单元格中。',
        'm': [1, 1],
        'p': [{
            'name': 'cell',
            'detail': '要检查是否存在公式的单元格。\n\n如果 cell 为包含公式的单元格，则 ISFORMULA 将返回 TRUE。如果 cell 为相应单元格范围，则当该范围内的首个单元格包含公式时，系统会返回 TRUE。如果是任何其他值，系统都将返回 FALSE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'CELL',
        't': 15,
        'd': '返回有关单元格的格式、位置或内容的信息。',
        'a': '返回有关单元格的格式、位置或内容的信息。',
        'm': [2, 2],
        'p': [{
            'name': 'info_type',
            'detail': '一个文本值，指定要返回的单元格信息的类型。',
            'example': '"type"',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'reference',
            'detail': '需要其相关信息的单元格。',
            'example': 'C2',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'NA',
        't': 15,
        'd': '返回错误值 #N/A。',
        'a': '返回错误值 #N/A。',
        'm': [0, 0],
        'p': []
    }, {
        'n': 'ERROR_TYPE',
        't': 15,
        'd': '返回与其他单元格中的错误值相对应的数字。',
        'a': '返回与其他单元格中的错误值相对应的数字。',
        'm': [1, 1],
        'p': [{
            'name': 'error_val',
            'detail': '用于查找错误号的单元格，虽然您也可以直接提供错误值。',
            'example': 'A3',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISBLANK',
        't': 15,
        'd': '检查所引用的单元格是否为空。',
        'a': '检查所引用的单元格是否为空。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '对要检查其是否为空的单元格的引用。\n\n如果是空单元格，则 TRUE；否则返回 FALSE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'ISERR',
        't': 15,
        'd': '检查某个值是否为 #N/A 以外的错误值。',
        'a': '检查某个值是否为 #N/A 以外的错误值。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要验证其是否为#N/A以外的错误类型的值。\n\n如果值是除#N/A之外的任何错误（包括#DIV/0!、#NAME?、#NULL!、#NUM!、#VALUE!和#REF!），ISERR将返回TRUE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISERROR',
        't': 15,
        'd': '检查某个值是否为错误值。',
        'a': '检查某个值是否为错误值。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要验证其是否为错误类型的值。\n\n只要值是某种错误值（包括#DIV/0!、#N/A、#NAME?、#NULL!、#NUM!、#VALUE!和#REF!），ISERROR就会返回TRUE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISLOGICAL',
        't': 15,
        'd': '检查某个值是 TRUE 还是 FALSE。',
        'a': '检查某个值是 TRUE 还是 FALSE。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要验证其为逻辑TRUE还是逻辑FALSE的值。\n\n*如果值为TRUE或FALSE，或为指向值为TRUE或FALSE的单元格的引用，ISLOGICAL将返回TRUE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISNA',
        't': 15,
        'd': '检查某个值是否为错误值 #N/A。',
        'a': '检查某个值是否为错误值 #N/A。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要与错误值#N/A进行比较的值。\n\n*如果值为#N/A或指向包含#N/A的单元格的引用，则ISNA将返回TRUE，否则返回FALSE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISNONTEXT',
        't': 15,
        'd': '检查某个值是否为非文本。',
        'a': '检查某个值是否为非文本。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要检查的文本。\n\n*如果参数为文本值或指向包含文本的单元格的引用，ISNONTEXT将返回FALSE，否则返回TRUE。\n\n当值为指向空单元格的引用时，ISNONTEXT会返回TRUE。\n\n当值为空字符串时，ISNONTEXT将返回FALSE，因为空串被视作文本。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISNUMBER',
        't': 15,
        'd': '检查某个值是否为数字。',
        'a': '检查某个值是否为数字。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要验证其是否为数字的值。\n\n*如果参数为数字或指向内容为数字值的单元格的引用，ISNUMBER将返回TRUE，否则返回FALSE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'ISREF',
        't': 15,
        'd': '检查某个值是否为有效的单元格引用。',
        'a': '检查某个值是否为有效的单元格引用。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要验证其是否为单元格引用的值。\n\n*如果参数是有效的单元格引用，ISREF将返回TRUE，否则返回FALSE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'ISTEXT',
        't': 15,
        'd': '检查某个值是否为文本。',
        'a': '检查某个值是否为文本。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要验证其是否为文本的值。\n\n如果参数为文本值或指向包含文本值的单元格的引用，ISTEXT将返回TRUE，否则返回FALSE。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TYPE',
        't': 15,
        'd': '返回数值的类型。',
        'a': '返回数值的类型。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要确定其类型的数据。\n\n数字 返回 1;\n\n文本 返回 2;\n\n逻辑值 返回 4;\n\n错误值 返回 16;\n\n数组 返回 64;',
            'example': 'C4',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'N',
        't': 15,
        'd': '返回转化为数值后的值。',
        'a': '返回转化为数值后的值。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为数字的参数。\n\n如果值为数字，则返回该数字。\n\n如果值为日期，则返回该日期的序列号。\n\n如果值为TRUE，则返回1。\n\n如果值为FALSE，则返回0。\n\n如果值为错误值，则返回错误值。\n\n如果值为其他值，则返回0。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TO_DATE',
        't': 16,
        'd': '将指定的数字转换为日期。',
        'a': '将指定的数字转换为日期。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为日期的参数或其单元格引用。\n\n如果值为数字或指向内容为数值的单元格的引用，TO_DATE会将值转换为相应的日期并返回，值代表从十二月30日到对应的日期之间的天数，\n\n负值表示对应的日期在十二月30日之前，而小数值则代表一天中从午夜算起的时间。\n如果值不是数字或指向内容为数值的单元格的引用，则TO_DATE将在不做任何修改的情况下返回值。',
            'example': '25405',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TO_PURE_NUMBER',
        't': 16,
        'd': '将给定的日期/时间、百分比、货币金额或其他格式的数值转换为不带格式的纯数字。',
        'a': '将给定的日期/时间、百分比、货币金额或其他格式的数值转换为不带格式的纯数字。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为纯数字的参数或其单元格引用。\n\n如果值为数字或指向包含数值的单元格的引用，TO_PURE_NUMBER将以不带任何格式与解释的形式返回值。\n\n如果值不是数字或指向内容为数值的单元格的引用，则TO_PERCENT将在不做任何修改的情况下返回值。',
            'example': '50%',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TO_TEXT',
        't': 16,
        'd': '将给定的数字值转换为文本格式。',
        'a': '将给定的数字值转换为文本格式。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为文本的参数或其单元格引用。\n\n如果值为数字或指向包含数值的单元格的引用，TO_TEXT将返回字符串形式的值，并保持现有格式。即原为货币的仍为货币，原为十进制数的仍为十进制数，原为百分比的仍为百分比，原为日期的仍为日期。\n\n如果值不是数字或指向内容为数值的单元格的引用，则TO_TEXT将在不做任何修改的情况下返回值。',
            'example': '24',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'TO_DOLLARS',
        't': 16,
        'd': '将指定的数字转换为美元金额。',
        'a': '将指定的数字转换为美元金额。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为美元金额的参数或其单元格引用。\n\n如果值不是数字或指向内容为数值的单元格的引用，则 TO_DOLLARS 将在不做任何修改的情况下返回值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'TO_PERCENT',
        't': 16,
        'd': '将指定的数字转换为百分比。',
        'a': '将指定的数字转换为百分比。',
        'm': [1, 1],
        'p': [{
            'name': 'value',
            'detail': '要转换为百分比的参数或其单元格引用。\n\n如果值为数字或指向包含数值的单元格的引用，TO_PERCENT会以1 = 100%为标准，将值转换为百分比。\n\n如果值不是数字或指向内容为数值的单元格的引用，则TO_PERCENT将在不做任何修改的情况下返回值。',
            'example': 'A2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'DGET',
        't': 17,
        'd': '使用 SQL 式查询，从列表或数据库的列中提取符合指定条件的单个值。',
        'a': '使用 SQL 式查询，从列表或数据库的列中提取符合指定条件的单个值。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DMAX',
        't': 17,
        'd': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的最大数字。',
        'a': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的最大数字。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DMIN',
        't': 17,
        'd': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的最小数字。',
        'a': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的最小数字。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DAVERAGE',
        't': 17,
        'd': '使用 SQL 式查询，对列表或数据库中满足指定条件的记录字段（列）中的数值求平均值。',
        'a': '使用 SQL 式查询，对列表或数据库中满足指定条件的记录字段（列）中的数值求平均值。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DCOUNT',
        't': 17,
        'd': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中包含数字的单元格的个数。',
        'a': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中包含数字的单元格的个数。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DCOUNTA',
        't': 17,
        'd': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的非空单元格的个数。',
        'a': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的非空单元格的个数。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DPRODUCT',
        't': 17,
        'd': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的数值的乘积。',
        'a': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的数值的乘积。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DSTDEV',
        't': 17,
        'd': '使用 SQL 式查询，返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体标准偏差。',
        'a': '使用 SQL 式查询，返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体标准偏差。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DSTDEVP',
        't': 17,
        'd': '使用 SQL 式查询，返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为样本总体计算出的总体标准偏差。',
        'a': '使用 SQL 式查询，返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为样本总体计算出的总体标准偏差。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DSUM',
        't': 17,
        'd': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的数字之和。',
        'a': '使用 SQL 式查询，返回列表或数据库中满足指定条件的记录字段（列）中的数字之和。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DVAR',
        't': 17,
        'd': '使用 SQL 式查询，返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体方差。',
        'a': '使用 SQL 式查询，返回利用列表或数据库中满足指定条件的记录字段（列）中的数字作为一个样本估算出的总体方差。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        'n': 'DVARP',
        't': 17,
        'd': '使用 SQL 式查询，通过使用列表或数据库中满足指定条件的记录字段（列）中的数字计算样本总体的样本总体方差。',
        'a': '使用 SQL 式查询，通过使用列表或数据库中满足指定条件的记录字段（列）中的数字计算样本总体的样本总体方差。',
        'm': [3, 3],
        'p': [{
            'name': 'database',
            'detail': '构成列表或数据库的单元格区域，列表的第一行包含每一列的标签。',
            'example': 'A2:F20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'field',
            'detail': '指定 database 中的哪一列包含要提取和用于计算的值。\n\nfield 可以是与 database 第一行中某个列标题对应的文本标签，也可以是指定相关列的数字索引，第一列的索引值为 1。',
            'example': 'G2',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'criteria',
            'detail': '包含所指定条件的单元格区域。计算之前将使用这些条件来过滤 database 中的值。',
            'example': 'A22:D23',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }]
    }, {
        "n": "AGE_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出年龄。支持15为或18位身份证",
        "a": "根据身份证号得到年龄。",
        "m": [1, 2],
        "p": [{
            "name": "身份证号",
            "example": "A1",
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "截止日期",
            "example": '"2017-10-01"',
            "detail": "年龄计算的截止日期或范围，默认为当日。",
            "require": "o",
            "repeat": "n",
            "type": "rangedatetime"
        }]
    },
    // SEX_BY_IDCARD
    {
        "n": "SEX_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出性别。支持15为或18位身份证",
        "a": "根据身份证号得到性别。",
        "m": [1, 1],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // BIRTHDAY_BY_IDCARD
    {
        "n": "BIRTHDAY_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出生日。支持15为或18位身份证",
        "a": "根据身份证号得到生日。",
        "m": [1, 2],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "生日格式",
            "example": '0',
            "detail": "日期类型,默认0:[1900/01/01], 1:[1900-01-01], 2:[1900年1月1日]",
            "require": "o",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // PROVINCE_BY_IDCARD
    {
        "n": "PROVINCE_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出籍贯的省份。支持15为或18位身份证",
        "a": "根据身份证号得到籍贯的省份。",
        "m": [1, 1],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // CITY_BY_IDCARD
    {
        "n": "CITY_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出籍贯的城市。支持15为或18位身份证",
        "a": "根据身份证号得到籍贯的城市。",
        "m": [1, 1],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // STAR_BY_IDCARD
    {
        "n": "STAR_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出星座。支持15为或18位身份证",
        "a": "根据身份证号得到星座。",
        "m": [1, 1],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // ANIMAL_BY_IDCARD
    {
        "n": "ANIMAL_BY_IDCARD",
        "t": "3",
        "d": "根据中国身份证号计算出生肖（鼠、牛、虎、兔...）。支持15为或18位身份证",
        "a": "根据身份证号得到生肖。",
        "m": [1, 1],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // ISIDCARD
    {
        "n": "ISIDCARD",
        "t": "3",
        "d": "验证身份证的格式是否正确。支持15为或18位身份证",
        "a": "验证身份证格式正确性。",
        "m": [1, 1],
        "p": [{
            "name": "身份证号",
            "example": '"31033519900101XXXX"',
            "detail": "15位或者18位的身份证号或范围。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    // DM_TEXT_CUTWORD
    {
        "n": "DM_TEXT_CUTWORD",
        "t": "4",
        "d": "文本分词。把一连串文字拆分为一系列单独词语",
        "a": "中文文本分词。",
        "m": [1, 2],
        "p": [{
            "name": "文本",
            "example": '"我来到北京清华大学"',
            "detail": "任意需要分词的文本。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "分词模式",
            "example": '0',
            "detail": "默认为0[精确模式], 1[全模式], 2[搜索引擎模式]。",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DM_TEXT_TFIDF
    {
        "n": "DM_TEXT_TFIDF",
        "t": "4",
        "d": "采用tf-idf算法进行关键词提取。从一连串文字中识别关键词",
        "a": "tf-idf关键词识别。",
        "m": [1, 3],
        "p": [{
            "name": "文本",
            "example": '"我来到北京清华大学"',
            "detail": "任意需要分词的文本。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "关键词个数",
            "example": '20',
            "detail": "算法返回的关键词个数，默认20",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }, {
            "name": "语料库",
            "example": '1',
            "detail": "选择特定领域的语料库，默认0[通用], 1[金融], 2[医疗]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DM_TEXT_TEXTRANK
    {
        "n": "DM_TEXT_TEXTRANK",
        "t": "4",
        "d": "采用TextRank算法进行关键词提取。从一连串文字中识别关键词",
        "a": "TextRank关键词识别。",
        "m": [1, 3],
        "p": [{
            "name": "文本",
            "example": '"我来到北京清华大学"',
            "detail": "任意需要分词的文本。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "关键词个数",
            "example": '20',
            "detail": "算法返回的关键词个数，默认20",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }, {
            "name": "语料库",
            "example": '1',
            "detail": "选择特定领域的语料库，默认0[通用], 1[金融], 2[医疗]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DATA_CN_STOCK_CLOSE
    {
        "n": "DATA_CN_STOCK_CLOSE",
        "t": "5",
        "d": "根据股票代码和日期，返回A股对应股票收盘价。",
        "a": "返回A股对应股票收盘价。",
        "m": [1, 3],
        "p": [{
            "name": "股票代码",
            "example": '"000001"',
            "detail": "6位股票代码，必填项。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "日期",
            "example": '2015-01-08',
            "detail": "股票的交易日，默认为最新交易日",
            "require": "o",
            "repeat": "n",
            "type": "rangedate"
        }, {
            "name": "复权除权",
            "example": '0',
            "detail": "选择股票的除权复权类型，默认0[前复权], 1[原始价格], 2[后复权]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DATA_CN_STOCK_OPEN
    {
        "n": "DATA_CN_STOCK_OPEN",
        "t": "5",
        "d": "根据股票代码和日期，返回A股对应股票开盘价。",
        "a": "返回A股对应股票开盘价。",
        "m": [1, 3],
        "p": [{
            "name": "股票代码",
            "example": '"000001"',
            "detail": "6位股票代码，必填项。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "日期",
            "example": '2015-01-08',
            "detail": "股票的交易日，默认为最新交易日",
            "require": "o",
            "repeat": "n",
            "type": "rangedate"
        }, {
            "name": "复权除权",
            "example": '0',
            "detail": "选择股票的除权复权类型，默认0[前复权], 1[原始价格], 2[后复权]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DATA_CN_STOCK_MAX
    {
        "n": "DATA_CN_STOCK_MAX",
        "t": "5",
        "d": "根据股票代码和日期，返回A股对应股票最高价。",
        "a": "返回A股对应股票最高价。",
        "m": [1, 3],
        "p": [{
            "name": "股票代码",
            "example": '"000001"',
            "detail": "6位股票代码，必填项。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "日期",
            "example": '2015-01-08',
            "detail": "股票的交易日，默认为最新交易日",
            "require": "o",
            "repeat": "n",
            "type": "rangedate"
        }, {
            "name": "复权除权",
            "example": '0',
            "detail": "选择股票的除权复权类型，默认0[前复权], 1[原始价格], 2[后复权]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DATA_CN_STOCK_MIN
    {
        "n": "DATA_CN_STOCK_MIN",
        "t": "5",
        "d": "根据股票代码和日期，返回A股对应股票最低价。",
        "a": "返回A股对应股票最低价。",
        "m": [1, 3],
        "p": [{
            "name": "股票代码",
            "example": '"000001"',
            "detail": "6位股票代码，必填项。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "日期",
            "example": '2015-01-08',
            "detail": "股票的交易日，默认为最新交易日",
            "require": "o",
            "repeat": "n",
            "type": "rangedate"
        }, {
            "name": "复权除权",
            "example": '0',
            "detail": "选择股票的除权复权类型，默认0[前复权], 1[原始价格], 2[后复权]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DATA_CN_STOCK_VOLUMN
    {
        "n": "DATA_CN_STOCK_VOLUMN",
        "t": "5",
        "d": "根据股票代码和日期，返回A股对应股票成交量。",
        "a": "返回A股对应股票成交量。",
        "m": [1, 3],
        "p": [{
            "name": "股票代码",
            "example": '"000001"',
            "detail": "6位股票代码，必填项。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "日期",
            "example": '2015-01-08',
            "detail": "股票的交易日，默认为最新交易日",
            "require": "o",
            "repeat": "n",
            "type": "rangedate"
        }, {
            "name": "复权除权",
            "example": '0',
            "detail": "选择股票的除权复权类型，默认0[前复权], 1[原始价格], 2[后复权]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // DATA_CN_STOCK_AMOUNT
    {
        "n": "DATA_CN_STOCK_AMOUNT",
        "t": "5",
        "d": "根据股票代码和日期，返回A股对应股票成交额。",
        "a": "返回A股对应股票成交额。",
        "m": [1, 3],
        "p": [{
            "name": "股票代码",
            "example": '"000001"',
            "detail": "6位股票代码，必填项。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }, {
            "name": "日期",
            "example": '2015-01-08',
            "detail": "股票的交易日，默认为最新交易日",
            "require": "o",
            "repeat": "n",
            "type": "rangedate"
        }, {
            "name": "复权除权",
            "example": '0',
            "detail": "选择股票的除权复权类型，默认0[前复权], 1[原始价格], 2[后复权]",
            "require": "o",
            "repeat": "n",
            "type": "rangenumber"
        }]
    },
    // ISDATE
    {
        "n": "ISDATE",
        "t": "6",
        "d": "验证日期的格式是否正确。支持多种日期格式",
        "a": "验证日期格式正确性。",
        "m": [1, 1],
        "p": [{
            "name": "日期",
            "example": '"1990-01-01"',
            "detail": "日期值，例如1990/01/01, 1990年1月1日等。",
            "require": "m",
            "repeat": "n",
            "type": "rangeall"
        }]
    },
    //sparklines函数，线图
    {
        "n": "LINESPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的折线图sparklines，用于描述数据的连续走势",
        "a": "生成单元格折线图",
        "m": [1, 8],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //lineColor
            {
                "name": "线条颜色",
                "example": '#2ec7c9',
                "detail": "线图的线条颜色，可以是否个范围A1、色表索引数值或者具体颜色值，设置为0或false则不显示，支持regx、rgb、rgba等。默认#2ec7c9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            // {
            //     "name": "填充颜色",
            //     "example": '#CCF3F4',
            //     "detail": "形成面积图，同线条颜色配置，默认0不显示",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // },
            //lineWidth
            {
                "name": "线条粗细",
                "example": '1',
                "detail": "折线图线段粗细，默认为1px",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //normalRangeMin和normalRangeMax设为相同的值，min、max、avg、median需要计算
            {
                "name": "辅助线",
                "example": 'avg',
                "detail": "一条横线，可以是min、max、avg、median、范围或自定义数值，默认0无",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //normalRangeColor
            {
                "name": "辅助线颜色",
                "example": '#000',
                "detail": "辅助线的颜色设置，同线条颜色配置，默认#000",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //maxSpotColor
            {
                "name": "最大值标识",
                "example": '#fc5c5c',
                "detail": "标识线图最大值，同线条颜色配置，默认0不显示",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //minSpotColor
            {
                "name": "最小值标识",
                "example": '#fc5c5c',
                "detail": "标识线图最小值，同线条颜色配置，默认0不显示",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //spotRadius
            {
                "name": "标识大小",
                "example": '1.5',
                "detail": "最大值和最小值的标识大小设置，默认为1.5",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    //sparklines面积图
    {
        "n": "AREASPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的面积图sparklines，一般用于描述数据的连续累积值走势",
        "a": "生成单元格面积图",
        "m": [1, 5],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //lineColor
            {
                "name": "线条颜色",
                "example": '#2ec7c9',
                "detail": "线图的线条颜色，可以是否个范围A1、色表索引数值或者具体颜色值，设置为0或false则不显示，支持regx、rgb、rgba等。默认#2ec7c9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //fillColor
            {
                "name": "填充颜色",
                "example": '#CCF3F4',
                "detail": "形成面积图，同线条颜色配置，默认0不显示",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //lineWidth
            {
                "name": "线条粗细",
                "example": '1',
                "detail": "折线图线段粗细，默认为1px",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //normalRangeMin和normalRangeMax设为相同的值，min、max、avg、median需要计算
            {
                "name": "辅助线",
                "example": 'avg',
                "detail": "一条横线，可以是min、max、avg、median、范围或自定义数值，默认0无",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //normalRangeColor
            {
                "name": "辅助线颜色",
                "example": '#000',
                "detail": "辅助线的颜色设置，同线条颜色配置，默认#000",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
            // //maxSpotColor
            // {
            //     "name": "最大值标识",
            //     "example": '#fc5c5c',
            //     "detail": "标识线图最大值，同线条颜色配置，默认0不显示",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // },
            // //minSpotColor
            // {
            //     "name": "最小值标识",
            //     "example": '#fc5c5c',
            //     "detail": "标识线图最大值，同线条颜色配置，默认0不显示",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // },
            // //spotRadius
            // {
            //     "name": "标识大小",
            //     "example": '1.5',
            //     "detail": "最大值和最小值的标识大小设置，默认为1.5",
            //     "require": "o",
            //     "repeat": "n",
            //     "type": "rangeall"
            // }
        ]
    },
    //sparklines柱状图
    {
        "n": "COLUMNSPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的垂直柱状图sparklines，一般用于描述离散数据之间的大小情况",
        "a": "生成单元格垂直柱状图",
        "m": [1, 6],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //barSpacing
            {
                "name": "柱条间隔",
                "example": '1',
                "detail": "柱条之间的间隔距离，默认为1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //barColor
            {
                "name": "柱条颜色",
                "example": '#fc5c5c',
                "detail": "线图的线条颜色，可以是否个范围A1、色表索引数值或者具体颜色值，设置为0或false则不显示，支持regx、rgb、rgba等。默认#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //negBarColor
            {
                "name": "负向柱条颜色",
                "example": '#97b552',
                "detail": "负向柱条颜色设置，代表负值的颜色，同柱条颜色配置，默认#97b552",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //chartRangeMax
            {
                "name": "最大值",
                "example": '100',
                "detail": "柱图最大值，用于规范柱图长度，默认为自动计算false、auto、null",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //colorMap
            {
                "name": "色板",
                "example": '#97b552',
                "detail": "调色板可以单独设置每个柱条的颜色，可设置多个，支持两种格式：1颜色例如#000，代表第一个柱的颜色是黑色；2数值范围:颜色，例如-2:#000表示数值为-2的柱为黑色，0:5:#000表示数值0-5的柱为黑色，默认为空",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines累积柱状图
    {
        "n": "STACKCOLUMNSPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的累积垂直柱状图sparklines，一般用于描述离散数据多个维度的数值大小",
        "a": "生成单元格累积垂直柱状图",
        "m": [1, 5],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //stackconfig
            {
                "name": "按列堆积",
                "example": '1',
                "detail": "如果需要按行堆积则本项设为false或0，默认为是1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //barSpacing
            {
                "name": "柱条间隔",
                "example": '1',
                "detail": "柱条之间的间隔距离，默认为1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //chartRangeMax
            {
                "name": "最大值",
                "example": '100',
                "detail": "累积柱图最大值，用于规范柱图长度，默认为自动计算false、auto、null",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //stackedBarColor
            {
                "name": "累积色板",
                "example": '#97b552',
                "detail": "调色板可以单独设置每个维度的柱条颜色，可设置为A1:A10等范围，默认为#2ec7c9, #fc5c5c, #5ab1ef, #ffb980...",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines条形图
    {
        "n": "BARSPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的横向条形图sparklines，一般用于描述离散数据之间的大小情况",
        "a": "生成单元格横向条形图",
        "m": [1, 6],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //barSpacing
            {
                "name": "柱条间隔",
                "example": '1',
                "detail": "柱条之间的间隔距离，默认为1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //barColor
            {
                "name": "柱条颜色",
                "example": '#fc5c5c',
                "detail": "线图的线条颜色，可以是否个范围A1、色表索引数值或者具体颜色值，设置为0或false则不显示，支持regx、rgb、rgba等。默认#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //negBarColor
            {
                "name": "负向柱条颜色",
                "example": '#97b552',
                "detail": "负向柱条颜色设置，代表负值的颜色，同柱条颜色配置，默认#97b552",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //chartRangeMax
            {
                "name": "最大值",
                "example": '100',
                "detail": "柱图最大值，用于规范柱图长度，默认为自动计算false、auto、null",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //colorMap
            {
                "name": "色板",
                "example": '#97b552',
                "detail": "调色板可以单独设置每个柱条的颜色，可设置多个，支持两种格式：1颜色例如#000，代表第一个柱的颜色是黑色；2数值范围:颜色，例如-2:#000表示数值为-2的柱为黑色，0:5:#000表示数值0-5的柱为黑色，默认为空",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines累积条形图
    {
        "n": "STACKBARSPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的累积横向条形图sparklines，一般用于描述离散数据多个维度的数值大小",
        "a": "生成单元格累积横向条形图",
        "m": [1, 5],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //stackconfig
            {
                "name": "按列堆积",
                "example": '1',
                "detail": "如果需要按行堆积则本项设为false或0，默认为是1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //barSpacing
            {
                "name": "柱条间隔",
                "example": '1',
                "detail": "柱条之间的间隔距离，默认为1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //chartRangeMax
            {
                "name": "最大值",
                "example": '100',
                "detail": "累积柱图最大值，用于规范柱图长度，默认为自动计算false、auto、null",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //stackedBarColor
            {
                "name": "累积色板",
                "example": '#97b552',
                "detail": "调色板可以单独设置每个维度的柱条颜色，可设置为A1:A10等范围，默认为#2ec7c9, #fc5c5c, #5ab1ef, #ffb980...",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines离散图
    {
        "n": "DISCRETESPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的离散图sparklines，一般用于描述离散数据走势",
        "a": "生成单元格离散图",
        "m": [1, 4],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //thresholdValue
            {
                "name": "分割阈值",
                "example": '1',
                "detail": "离散图柱形颜色的区分，例如：该值为0，则大于0为蓝色，小于0为红色，默认为0",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //lineColor
            {
                "name": "阈值以上颜色",
                "example": '#2ec7c9',
                "detail": "线图的线条颜色，可以是否个范围A1、色表索引数值或者具体颜色值，设置为0或false则不显示，支持regx、rgb、rgba等。默认#2ec7c9",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //thresholdColor
            {
                "name": "阈值以下颜色",
                "example": '#fc5c5c',
                "detail": "阈值以下柱条颜色设置，同阈值以上颜色，默认#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    //sparklines三态图
    {
        "n": "TRISTATESPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的三态图sparklines，一般用于描述三种态势的走势例如胜负平",
        "a": "生成单元格三态图",
        "m": [1, 6],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //barSpacing
            {
                "name": "柱条间隔",
                "example": '1',
                "detail": "柱条之间的间隔距离，默认为1",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //posBarColor
            {
                "name": "柱条颜色",
                "example": '#fc5c5c',
                "detail": "线图的线条颜色，可以是否个范围A1、色表索引数值或者具体颜色值，设置为0或false则不显示，支持regx、rgb、rgba等。默认#fc5c5c",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //negBarColor
            {
                "name": "负向柱条颜色",
                "example": '#97b552',
                "detail": "负向柱条颜色设置，代表负值的颜色，同柱条颜色配置，默认#97b552",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //zeroBarColor
            {
                "name": "零值柱条颜色",
                "example": '#999',
                "detail": "零值柱条颜色设置，代表0值颜色，同柱条颜色配置，默认#999",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //colorMap
            {
                "name": "色板",
                "example": '#97b552',
                "detail": "调色板可以单独设置每个柱条的颜色，可设置多个，支持两种格式：1颜色例如#000，代表第一个柱的颜色是黑色；2数值范围:颜色，例如-2:#000表示数值为-2的柱为黑色，0-5:#000表示数值0-5的柱为黑色，默认为空",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines饼图
    {
        "n": "PIESPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的饼图sparklines，一般用于描述数据占比",
        "a": "生成单元格饼图",
        "m": [1, 5],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //offset
            {
                "name": "旋转角度",
                "example": '0',
                "detail": "饼图的旋转角度，默认为0",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //borderWidth
            {
                "name": "饼图边框",
                "example": '0',
                "detail": "饼图边框大小，默认为无0",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //borderColor
            {
                "name": "边框颜色",
                "example": '#000',
                "detail": "饼图边框颜色，默认为#000",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //sliceColors
            {
                "name": "饼图色板",
                "example": '#97b552',
                "detail": "调色板可以设置切片的颜色，可设置为A1:A10等范围，默认为#2ec7c9, #fc5c5c, #5ab1ef, #ffb980...",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines箱线图
    {
        "n": "BOXSPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的箱线图sparklines，一般用于描述数据集的统计分布",
        "a": "生成单元格箱线图",
        "m": [1, 4],
        "p": [
            //data
            {
                "name": "数据范围",
                "example": 'A1:A20',
                "detail": "数据范围，数值才能被有效计算，例如A1:A20， {1,2,3,4,5}等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //outlierIQR，如果为0或false则showOutliers设为false，否则为true
            {
                "name": "离群点比例",
                "example": '1.5',
                "detail": "离群点的阈值范围，如果为0或false则不显示，默认为1.5倍",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //target
            {
                "name": "目标点值",
                "example": '10',
                "detail": "箱线图上的目标值设置，默认为false不显示",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            },
            //spotRadius
            {
                "name": "数据点大小",
                "example": '1.5',
                "detail": "目标点和离群点的半径大小设置，默认为1.5",
                "require": "o",
                "repeat": "n",
                "type": "rangeall"
            }
        ]
    },
    //sparklines子弹图
    {
        "n": "BULLETSPLINES",
        "t": "3",
        "d": "生成嵌入在单元格内的子弹图sparklines，一般用于描述任务达成率",
        "a": "生成单元格子弹图",
        "m": [2, 3],
        "p": [
            //目标data1
            {
                "name": "目标",
                "example": '10',
                "detail": "达成的目标值，数值才能被有效计算，例如A1， 100等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //目前达成data2
            {
                "name": "实际完成",
                "example": '8',
                "detail": "目前完成值，数值才能被有效计算，例如A1， 100等。",
                "require": "m",
                "repeat": "n",
                "type": "rangeall"
            },
            //对比值datax
            {
                "name": "对比值",
                "example": '12',
                "detail": "对比值，例如超额、最低、获奖底线等，数值才能被有效计算，例如A1， 100等。可以设置最多9个对比值",
                "require": "o",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //sparklines组合图，支持多个类型的图画在同一个单元格
    {
        "n": "COMPOSESPLINES",
        "t": "3",
        "d": "支持多个类型的图画在同一个单元格,每个参数代表一个sparklines图",
        "a": "组合sparklines图到一个单元格",
        "m": [1, 1],
        "p": [
            //data
            {
                "name": "图设置",
                "example": 'PIESPLINES(A1:A20)',
                "detail": "sparklines图设置，例如A1:A20， 一个完成的饼图、线图设置等。",
                "require": "m",
                "repeat": "y",
                "type": "rangeall"
            }
        ]
    },
    //动态数组公式
    {
        'n': 'SORT',
        't': '14',
        'd': '返回数组中元素的排序数组。返回的数组与提供的数组参数形状相同。',
        'a': '返回数组中元素的排序数组。返回的数组与提供的数组参数形状相同。',
        'm': [1, 4],
        'p': [{
            'name': 'array',
            'detail': '要排序的范围或数组。',
            'example': 'A2:A17',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'sort_index',
            'detail': '[可选] - 表示要排序的行或列的数字。（默认row1/col1）',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'sort_order',
            'detail': '[可选] - 表示所需排序顺序的数字；1表示升序（默认），-1表示降序。',
            'example': '-1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'by_col',
            'detail': '[可选] - 表示所需排序方向的逻辑值；按行排序为FALSE()（默认），按列排序为TRUE()。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'FILTER',
        't': '14',
        'd': '基于一个布尔（真/假）数组过滤一个数组。',
        'a': '基于一个布尔（真/假）数组过滤一个数组。',
        'm': [2, 3],
        'p': [{
            'name': 'array',
            'detail': '要筛选的数组或范围。',
            'example': 'A5:D20',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'include',
            'detail': '布尔数组，其高度或宽度与数组相同',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'range'
        }, {
            'name': 'if_empty',
            'detail': '[可选] - 如果包含数组中的所有值都为空(filter不返回任何值)，则返回的值。',
            'example': '""',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'UNIQUE',
        't': '14',
        'd': '返回列表或区域中的唯一值的列表。',
        'a': '返回列表或区域中的唯一值的列表。',
        'm': [1, 3],
        'p': [{
            'name': 'array',
            'detail': '从其返回唯一值的数组或区域。',
            'example': 'A2:B26',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'by_col',
            'detail': '[可选] - 逻辑值，指示如何比较；按行 = FALSE() 或省略；按列 = TRUE()。',
            'example': 'TRUE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }, {
            'name': 'occurs_once',
            'detail': '[可选] - 逻辑值，仅返回唯一值中出现一次 = TRUE()；包括所有唯一值 = FALSE() 或省略。',
            'example': 'FALSE()',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangeall'
        }]
    }, {
        'n': 'RANDARRAY',
        't': '14',
        'd': '返回 0 到 1 之间的随机数字数组。',
        'a': '返回 0 到 1 之间的随机数字数组。',
        'm': [0, 2],
        'p': [{
            'name': 'rows',
            'detail': '[可选] - 要返回的行数。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cols',
            'detail': '[可选] - 要返回的列数。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    }, {
        'n': 'SEQUENCE',
        't': '14',
        'd': '生成数字序列的列表。',
        'a': '生成数字序列的列表。',
        'm': [1, 4],
        'p': [{
            'name': 'rows',
            'detail': '要返回的行数。',
            'example': '1',
            'require': 'm',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'cols',
            'detail': '[可选] - 要返回的列数。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'start',
            'detail': '[可选] - 序列中的第一个数字。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }, {
            'name': 'step',
            'detail': '[可选] - 序列中每个序列值的增量。',
            'example': '1',
            'require': 'o',
            'repeat': 'n',
            'type': 'rangenumber'
        }]
    },
    ],
    toolbar: {
        undo: '撤销',
        redo: '重做',
        paintFormat: '格式刷',
        currencyFormat: '货币格式',
        percentageFormat: '百分比格式',
        numberDecrease: '减少小数位数',
        numberIncrease: '增加小数位数',
        moreFormats: '更多格式',
        font: '字体',
        fontSize: '字号大小',
        bold: '粗体 (Ctrl+B)',
        italic: '斜体 (Ctrl+I)',
        strikethrough: '删除线 (Alt+Shift+5)',
        textColor: '文本颜色',
        chooseColor: '颜色选择',
        resetColor: '重置颜色',
        customColor: '自定义',
        alternatingColors: '交替颜色',
        confirmColor: '确定颜色',
        cancelColor: '取消',
        collapse: '收起',
        fillColor: '单元格颜色',
        border: '边框',
        borderStyle: '边框类型',
        mergeCell: '合并单元格',
        chooseMergeType: '选择合并类型',
        horizontalAlign: '水平对齐',
        verticalAlign: '垂直对齐',
        alignment: '对齐方式',
        textWrap: '文本换行',
        textWrapMode: '换行方式',
        textRotate: '文本旋转',
        textRotateMode: '旋转方式',
        freezeTopRow: '冻结首行',
        sortAndFilter: '排序和筛选',
        findAndReplace: '查找替换',
        sum: '求和',
        autoSum: '自动求和',
        moreFunction: '更多函数',
        conditionalFormat: '条件格式',
        postil: '批注',
        pivotTable: '数据透视表', 
        chart: '图表',
        screenshot: '截图',
        splitColumn: '分列',
        insertImage: '插入图片',
        dataVerification: '数据验证',
        protection:"保护工作表内容",

        clearText:"清除颜色选择",
        noColorSelectedText:"没有颜色被选择",

        toolMore:"更多",
        toolLess:"少于",
        toolClose:"收起",
        toolMoreTip:"更多功能",
        moreOptions:"更多选项",

        cellFormat:"设置单元格格式",
        print:"打印",
    },
    alternatingColors:{
        applyRange: '应用范围',
        selectRange: '选择应用范围',
        header: '页眉',
        footer: '页脚',

        errorInfo:"不能对多重选择区域执行此操作，请选择单个区域，然后再试",
        textTitle:"格式样式",
        custom:"自定义",
        close:"关闭",
        selectionTextColor:"选择文本颜色",
        selectionCellColor:"选择单元格颜色",
        removeColor:"移除交替颜色",
        colorShow:"颜色",
        currentColor:"当前颜色",

        tipSelectRange:"请选择交替颜色应用范围",
        errorNoRange:"您选择的应用范围不是选区！",
        errorExistColors:"您选择的应用范围已存在交替颜色且不属于你要编辑的应用范围！",
    },
    button: {
        confirm: '确定',
        cancel: '取消',
        close:"关闭",
        update:"Update",
        delete:"Delete",
        insert:"新建",
    },
    paint: {
        start: '格式刷开启',
        end: 'ESC键退出',

        tipSelectRange:"请选择需要复制格式的区域",
        tipNotMulti:"无法对多重选择区域执行此操作",
    },
    format: {
        moreCurrency: '更多货币格式',
        moreDateTime: '更多日期与时间格式',
        moreNumber: '更多数字格式',

        titleCurrency: '货币格式',
        decimalPlaces: '小数位数',
        titleDateTime: '日期与时间格式',
        titleNumber: '数字格式'
    },
    info: {
        detailUpdate: '新打开',
        detailSave: '已恢复本地缓存',
        row: '行',
        column: '列',
        loading:"渲染中",

        copy:"副本",
        return:"返回",
        rename:"重命名",
        tips:"表格重命名",
        noName:"无标题的电子表格",
        wait:"待更新",

        add:"添加",
        addLast:"在底部添加",
        backTop:"回到顶部",
        pageInfo:'共${total}条，${totalPage}页，当前已显示${currentPage}页',
        nextPage:"下一页",

        tipInputNumber:"请输入数字",
        tipInputNumberLimit:"增加范围限制在1-100",

        tipRowHeightLimit:"行高必须在0 ~ 545之间",
        tipColumnWidthLimit:"列宽必须在0 ~ 2038之间",
        pageInfoFull:'共${total}条，${totalPage}页，已显示全部数据',

    },
    currencyDetail:{
        RMB:'人民币',
        USdollar:'美元',
        EUR:'欧元',
        GBP:'英镑',
        HK:'港元',
        JPY:'日元',
        AlbanianLek:'阿尔巴尼亚列克',
        AlgerianDinar:'阿尔及利亚第纳尔',
        Afghani:'阿富汗尼',
        ArgentinePeso:'阿根廷比索',
        UnitedArabEmiratesDirham:'阿拉伯联合酋长国迪拉姆',
        ArubanFlorin:'阿鲁巴弗罗林',
        OmaniRial:'阿曼里亚尔',
        Azerbaijanimanat:'阿塞拜疆马纳特',
        EgyptianPound:'埃及镑',
        EthiopianBirr:'埃塞俄比亚比尔',
        AngolaKwanza:'安哥拉宽扎',
        AustralianDollar:'澳大利亚元',
        Patacas:'澳门元',
        BarbadosDollar:'巴巴多斯元',
        PapuaNewGuineaKina:'巴布亚新几内亚基那',
        BahamianDollar:'巴哈马元',
        PakistanRupee:'巴基斯坦卢比',
        ParaguayanGuarani:'巴拉圭瓜拉尼',
        BahrainiDinar:'巴林第纳尔',
        PanamanianBalboa:'巴拿马巴波亚',
        Brazilianreal:'巴西里亚伊',
        Belarusianruble:'白俄罗斯卢布',
        BermudianDollar:'百慕大元',
        BulgarianLev:'保加利亚列弗',
        IcelandKrona:'冰岛克朗',
        BosniaHerzegovinaConvertibleMark:'波黑可兑换马克',
        PolishZloty:'波兰兹罗提',
        Boliviano:'玻利维亚诺',
        BelizeDollar:'伯利兹元',
        BotswanaPula:'博茨瓦纳普拉',
        NotDannuzhamu:'不丹努扎姆',
        BurundiFranc:'布隆迪法郎',
        NorthKoreanWon:'朝鲜圆',
        DanishKrone:'丹麦克朗',
        EastCaribbeanDollar:'东加勒比元',
        DominicaPeso:'多米尼加比索',
        RussianRuble:'俄国卢布',
        EritreanNakfa:'厄立特里亚纳克法',
        CFAfranc:'非洲金融共同体法郎',
        PhilippinePeso:'菲律宾比索',
        FijiDollar:'斐济元',
        CapeVerdeEscudo:'佛得角埃斯库多',
        FalklandIslandsPound:'福克兰群岛镑',
        GambianDalasi:'冈比亚达拉西',
        Congolesefranc:'刚果法郎',
        ColombianPeso:'哥伦比亚比索',
        CostaRicanColon:'哥斯达黎加科朗',
        CubanPeso:'古巴比索',
        Cubanconvertiblepeso:'古巴可兑换比索',
        GuyanaDollar:'圭亚那元',
        KazakhstanTenge:'哈萨克斯坦坚戈',
        Haitiangourde:'海地古德',
        won:'韩元',
        NetherlandsAntillesGuilder:'荷属安的列斯盾',
        Honduraslempiras:'洪都拉斯拉伦皮拉',
        DjiboutiFranc:'吉布提法郎',
        KyrgyzstanSom:'吉尔吉斯斯坦索姆',
        GuineaFranc:'几内亚法郎',
        CanadianDollar:'加拿大元',
        GhanaianCedi:'加纳塞地',
        Cambodianriel:'柬埔寨瑞尔',
        CzechKoruna:'捷克克朗',
        ZimbabweDollar:'津巴布韦元',
        QatariRiyal:'卡塔尔里亚尔',
        CaymanIslandsDollar:'开曼群岛元',
        Comorianfranc:'科摩罗法郎',
        KuwaitiDinar:'科威特第纳尔',
        CroatianKuna:'克罗地亚库纳',
        KenyanShilling:'肯尼亚先令',
        LesothoLoti:'莱索托洛蒂',
        LaoKip:'老挝基普',
        LebanesePound:'黎巴嫩镑',
        Lithuanianlitas:'立陶宛立特',
        LibyanDinar:'利比亚第纳尔',
        LiberianDollar:'利比亚元',
        RwandaFranc:'卢旺达法郎',
        RomanianLeu:'罗马尼亚列伊',
        MalagasyAriary:'马达加斯加阿里亚里',
        MaldivianRufiyaa:'马尔代夫拉菲亚',
        MalawiKwacha:'马拉维克瓦查',
        MalaysianRinggit:'马来西亚林吉特',
        MacedoniawearingDinar:'马其顿戴第纳尔',
        MauritiusRupee:'毛里求斯卢比',
        MauritanianOuguiya:'毛里塔尼亚乌吉亚',
        MongolianTugrik:'蒙古图格里克',
        BangladeshiTaka:'孟加拉塔卡',
        PeruvianNuevoSol:'秘鲁新索尔',
        MyanmarKyat:'缅甸开亚特',
        MoldovanLeu:'摩尔多瓦列伊',
        MoroccanDirham:'摩洛哥迪拉姆',
        MozambiqueMetical:'莫桑比克梅蒂卡尔',
        MexicanPeso:'墨西哥比索',
        NamibianDollar:'纳米比亚元',
        SouthAfricanRand:'南非兰特',
        SouthSudanesePound:'南苏丹镑',
        NicaraguaCordoba:'尼加拉瓜科多巴',
        NepaleseRupee:'尼泊尔卢比',
        NigerianNaira:'尼日利亚奈拉',
        NorwegianKrone:'挪威克朗',
        GeorgianLari:'乔治亚拉瑞',
        RMBOffshore:'人民币（离岸）',
        SwedishKrona:'瑞典克朗',
        SwissFranc:'瑞士法郎',
        SerbianDinar:'塞尔维亚第纳尔',
        SierraLeone:'塞拉利昂利昂',
        SeychellesRupee:'塞舌尔卢比',
        SaudiRiyal:'沙特里亚尔',
        SaoTomeDobra:'圣多美多布拉',
        SaintHelenapound:'圣赫勒拿群岛磅',
        SriLankaRupee:'斯里兰卡卢比',
        SwazilandLilangeni:'斯威士兰里兰吉尼',
        SudanesePound:'苏丹镑',
        Surinamesedollar:'苏里南元',
        SolomonIslandsDollar:'所罗门群岛元',
        SomaliShilling:'索马里先令',
        TajikistanSomoni:'塔吉克斯坦索莫尼',
        PacificFranc:'太平洋法郎',
        ThaiBaht:'泰国铢',
        TanzanianShilling:'坦桑尼亚先令',
        TonganPaanga:'汤加潘加',
        TrinidadandTobagoDollar:'特立尼达和多巴哥元',
        TunisianDinar:'突尼斯第纳尔',
        TurkishLira:'土耳其里拉',
        VanuatuVatu:'瓦努阿图瓦图',
        GuatemalanQuetzal:'危地马拉格查尔',
        CommissionBolivar:'委内瑞拉博利瓦',
        BruneiDollar:'文莱元',
        UgandanShilling:'乌干达先令',
        UkrainianHryvnia:'乌克兰格里夫尼亚',
        UruguayanPeso:'乌拉圭比索',
        Uzbekistansom:'乌兹别克斯坦苏姆',
        WesternSamoaTala:'西萨摩亚塔拉',
        SingaporeDollar:'新加坡元',
        NT:'新台币',
        NewZealandDollar:'新西兰元',
        HungarianForint:'匈牙利福林',
        SyrianPound:'叙利亚镑',
        JamaicanDollar:'牙买加元',
        ArmenianDram:'亚美尼亚德拉姆',
        YemeniRial:'也门里亚尔',
        IraqiDinar:'伊拉克第纳尔',
        IranianRial:'伊朗里亚尔',
        NewIsraeliShekel:'以色列新谢克尔',
        IndianRupee:'印度卢比',
        IndonesianRupiah:'印度尼西亚卢比',
        JordanianDinar:'约旦第纳尔',
        VND:'越南盾',
        ZambianKwacha:'赞比亚克瓦查',
        GibraltarPound:'直布罗陀镑',
        ChileanPeso:'智利比索',
        CFAFrancBEAC:'中非金融合作法郎',
    },
    defaultFmt:[
        { "text": '自动', "value": "General", "example": "" },
        { "text": '纯文本', "value": "@", "example": "" },
        { "text": "", "value": "split", "example": "" },
        { "text": '数字', "value": "##0.00", "example": "1000.12" },
        { "text": '百分比', "value": "#0.00%", "example": "12.21%" },
        { "text": '科学计数', "value": "0.00E+00", "example": "1.01E+5" },
        { "text": "", "value": "split", "example": "" },
        { "text": '会计', "value": "¥(0.00)", "example": "¥(1200.09)" },
        //{ "text": "财务", "value": "(#.####)", "example": "(1200.09)" },
        { "text": '万元', "value": "w", "example": "1亿2000万2500" },
        { "text": '货币', "value": "¥0.00", "example": "¥1200.09" },
        //{ "text": "货币整数", "value": "¥####", "example": "¥1200" },
        { "text": '万元2位小数', "value": "w0.00", "example": "2万2500.55" },
        { "text": "", "value": "split", "example": "" },
        { "text": '日期', "value": "yyyy-MM-dd", "example": "2017-11-29" },
        { "text": '时间', "value": "hh:mm AM/PM", "example": "3:00 PM" },
        { "text": '时间24H', "value": "hh:mm", "example": "15:00" },
        { "text": '日期时间', "value": "yyyy-MM-dd hh:mm AM/PM", "example": "2017-11-29 3:00 PM" },
        { "text": '日期时间24H', "value": "yyyy-MM-dd hh:mm", "example": "2017-11-29 15:00" },
        { "text": "", "value": "split", "example": "" },
        { "text": '自定义格式', "value": "fmtOtherSelf", "example": "more" }
    ],
    dateFmtList:[
        {
            "name": "1930-08-05",
            "value": "yyyy-MM-dd"
        },
        {
            "name": "1930/8/5",
            "value": "yyyy/MM/dd"
        },
        {
            "name": "1930年8月5日",
            "value": 'yyyy"年"M"月"d"日"'
        },
        {
            "name": "08-05",
            "value": "MM-dd"
        },
        {
            "name": "8-5",
            "value": "M-d"
        },
        {
            "name": "8月5日",
            "value": 'M"月"d"日"'
        },
        {
            "name": "13:30:30",
            "value": "h:mm:ss"
        },
        {
            "name": "13:30",
            "value": "h:mm"
        },
        {
            "name": "下午01:30",
            "value": 'AM/PM hh:mm'
        },
        {
            "name": "下午1:30",
            "value": 'AM/PM h:mm'
        },
        {
            "name": "下午1:30:30",
            "value": 'AM/PM h:mm:ss'
        },
        {
            "name": "08-05 下午01:30",
            "value": "MM-dd AM/PM hh:mm"
        },
        // {
        //     "name": "1930年8月5日星期二",
        //     "value": ''
        // },
        // {
        //     "name": "1930年8月5日星期二 下午1:30:30",
        //     "value": ''
        // },
    ],
    fontFamily:{
        MicrosoftYaHei:"Microsoft YaHei",
    },
    fontarray: ["Times New Roman","Arial","Tahoma","Verdana","微软雅黑","宋体","黑体","楷体","仿宋","新宋体","华文新魏","华文行楷","华文隶书"],
    fontjson: {"times new roman":0,"arial":1,"tahoma":2,"verdana":3,"微软雅黑":4,"microsoft yahei":4,"宋体":5,"simsun":5,"黑体":6,"simhei":6,"楷体":7,"kaiti":7,"仿宋":8,"fangsong":8,"新宋体":9,"nsimsun":9,"华文新魏":10,"stxinwei":10,"华文行楷":11,"stxingkai":11,"华文隶书":12,"stliti":12,},
    border:{
        borderTop:'上框线',
        borderBottom:'下框线',
        borderLeft:'左框线',
        borderRight:'右框线',
        borderNone:'无',
        borderAll:'所有',
        borderOutside:'外侧',
        borderInside:'内侧',
        borderHorizontal:'内侧横线',
        borderVertical:'内侧竖线',
        borderColor:'边框颜色',
        borderSize:'边框粗细'
    },
    merge:{
        mergeAll:"全部合并",
        mergeV:"垂直合并",
        mergeH:"水平合并",
        mergeCancel:"取消合并",
        overlappingError:"不能合并重叠区域",
        partiallyError:"无法对部分合并单元格执行此操作",
    },
    align:{
        left:"左对齐",
        center:"中间对齐",
        right:"右对齐",

        top:"顶部对齐",
        middle:"居中对齐",
        bottom:"底部对齐",
    },
    textWrap:{
        "overflow":"溢出",
        "wrap":"自动换行",
        "clip":"截断",
    },
    rotation:{
        "none":"无旋转",
        "angleup":"向上倾斜",
        "angledown":"向下倾斜",
        "vertical":"竖排文字",
        "rotationUp":"向上90°",
        "rotationDown":"向下90°"
    },
    freezen:{
        default:"冻结首行",
        freezenRow:"冻结首行",
        freezenColumn:"冻结首列",
        freezenRC:"冻结行列",
        freezenRowRange:"冻结行到选区",
        freezenColumnRange:"冻结列到选区",
        freezenRCRange:"冻结行列到选区",
        freezenCancel:"取消冻结",

        noSeletionError:"没有选区",
    },
    sort:{
        "asc":"升序",
        "desc":"降序",
        "custom":"自定义排序",

        "hasTitle":"数据具有标题行",
        "sortBy":"排序依据",
        "addOthers":"添加其他排序列",
        "close":"关闭",
        "confirm":"排序",

        "columnOperation":"列",
        "secondaryTitle":"次要排序",

        "sortTitle":"排序范围",

        "sortRangeTitle":"排序范围从",
        "sortRangeTitleTo":"到",


        "noRangeError":"不能对多重选择区域执行此操作，请选择单个区域，然后再试",
        "mergeError":"选区有合并单元格，无法执行此操作！",

    },
    filter:{
        "filter":"筛选", 
        "clearFilter":"清除筛选", 

        sortByAsc:"以A-Z升序排列",
        sortByDesc:"以Z-A降序排列",
        filterByColor:"按颜色筛选",
        filterByCondition:"按条件过滤",
        filterByValues:"按值过滤",

        filiterInputNone:"无",

        filiterInputTip:"输入筛选值",
        filiterRangeStartTip:"范围开始",
        filiterRangeEndTip:"范围结束",

        filterValueByAllBtn:"全选",
        filterValueByClearBtn:"清除",
        filterValueByInverseBtn:"反选",
        filterValueByTip:"按照值进行筛选",
        filterConform:"确 认",
        filterCancel:"取 消",
        clearFilter:"清除筛选",

        conditionNone:"无",
        conditionCellIsNull:"单元格为空",
        conditionCellNotNull:"单元格有数据",
        conditionCellTextContain:"文本包含",
        conditionCellTextNotContain:"文本不包含",
        conditionCellTextStart:"文本开头为",
        conditionCellTextEnd:"文本结尾为",
        conditionCellTextEqual:"文本等于",
        conditionCellDateEqual:"日期等于",
        conditionCellDateBefore:"日期早于",
        conditionCellDateAfter:"日期晚于",
        conditionCellGreater:"大于",
        conditionCellGreaterEqual:"大于等于",
        conditionCellLess:"小于",
        conditionCellLessEqual:"小于等于",
        conditionCellEqual:"等于",
        conditionCellNotEqual:"不等于",
        conditionCellBetween:"介于",
        conditionCellNotBetween:"不在其中",

        filiterMoreDataTip:"数据量大！请稍后",
        filiterMonthText:"月",
        filiterYearText:"年",
        filiterByColorTip:"按单元格颜色筛选",
        filiterByTextColorTip:"按单元格字体颜色筛选",
        filterContainerOneColorTip:"本列仅包含一种颜色",
        filterDateFormatTip:"日期格式",

        valueBlank:"(空白)",
        mergeError:"筛选选区有合并单元格，无法执行此操作！",
    },
    rightclick: {
        copy: '复制',
        copyAs: '复制为',
        paste: '粘贴',
        insert: '插入',
        delete: '删除',
        deleteCell: '删除单元格',
        deleteSelected: '删除选中',
        hide: '隐藏',
        hideSelected: '隐藏选中',
        showHide: '显示隐藏',
        to: '向',
        left: '左',
        right: '右',
        top: '上',
        bottom: '下',
        moveLeft: '左移',
        moveUp: '上移',
        add: '增加',
        row: '行',
        column: '列',
        width: '宽',
        height: '高',
        number: '数字',
        confirm: '确认',
        orderAZ: 'A-Z顺序排列',
        orderZA: 'Z-A降序排列',
        clearContent: '清除内容',
        matrix: '矩阵操作选区',
        sortSelection: '排序选区',
        filterSelection: '筛选选区',
        chartGeneration: '图表生成',
        firstLineTitle: '首行为标题',
        untitled: '无标题',
        array1: '一维数组',
        array2: '二维数组',
        array3: '多维数组',
        diagonal: '对角线',
        antiDiagonal: '反对角线',
        diagonalOffset: '对角偏移',
        offset: '偏移量',
        boolean: '布尔值',
        flip: '翻转',
        upAndDown: '上下',
        leftAndRight: '左右',
        clockwise: '顺时针',
        counterclockwise: '逆时针',
        transpose: '转置',
        matrixCalculation: '矩阵计算',
        plus: '加',
        minus: '减',
        multiply: '乘',
        divided: '除',
        power: '次方',
        root: '次方根',
        log: 'log',
        delete0: '删除两端0值',
        removeDuplicate: '删除重复值',
        byRow: '按行',
        byCol: '按列',
        generateNewMatrix: '生成新矩阵',
    },
    comment:{
        "insert":"新建批注",
        "edit":"编辑批注",
        "delete":"删除",
        "showOne":"显示/隐藏批注",
        "showAll":"显示/隐藏所有批注"
    },
    screenshot:{
        screenshotTipNoSelection:"请框选需要截图的范围",
        screenshotTipTitle:"提示！",
        screenshotTipHasMerge:"无法对合并单元格执行此操作",
        screenshotTipHasMulti:"无法对多重选择区域执行此操作",
        screenshotTipSuccess:"截取成功",
        screenshotImageName:"截图",

        downLoadClose:"关闭",
        downLoadCopy:"复制到剪切板",
        downLoadBtn:"下载",
        browserNotTip:"下载功能IE浏览器不支持！",
        rightclickTip:"请在图片上右键点击'复制'",
        successTip:"已成功复制（如果粘贴失败，请在图片上右键点击'复制图片'）",
    },
    splitText:{
        splitDelimiters:"分割符号",
        splitOther:"其它",
        splitContinueSymbol:"连续分隔符号视为单个处理",
        splitDataPreview:"数据预览",
        splitTextTitle:"文本分列",
        splitConfirmToExe:"此处已有数据，是否替换它？",

        tipNoMulti:"不能对多重选择区域执行此操作，请选择单个区域，然后再试",
        tipNoMultiColumn:"一次只能转换一列数据，选定区域可以有多行，但不能有多列，请在选定单列区域以后再试",
    },
    imageText:{
        imageSetting: '图片设置',
        close: '关闭',
        conventional: '常规',
        moveCell1: '移动并调整单元格大小',
        moveCell2: '移动并且不调整单元格的大小',
        moveCell3: '不要移动单元格并调整其大小',
        fixedPos: '固定位置',
        border: '边框',
        width: '宽度',
        radius: '半径',
        style: '样式',
        solid: '实线',
        dashed: '虚线',
        dotted: '点状',
        double: '双线',
        color: '颜色',
    },
    punctuation:{
        "tab":"Tab 键",
        "semicolon":"分号",
        "comma":"逗号",
        "space":"空格",
        
    },
    findAndReplace:{
        find:"查找",
        replace:"替换",
        goto:"转到",
        location:"定位条件",
        formula:"公式",
        date:"日期",
        number:"数字",
        string:"字符",
        error:"错误",
        condition:"条件格式",
        rowSpan:"间隔行",
        columnSpan:"间隔列",
        locationExample:"定位",
        lessTwoRowTip:"请选择最少两行",
        lessTwoColumnTip:"请选择最少两行",

        findTextbox:"查找内容",
        replaceTextbox:"替换内容",

        regexTextbox:"正则表达式匹配",
        wholeTextbox:"整词匹配",
        distinguishTextbox:"区分大小写匹配",

        allReplaceBtn:"全部替换",
        replaceBtn:"替换",
        allFindBtn:"查找全部",
        findBtn:"查找下一个",

        noFindTip:"没有查找到该内容",
        modeTip:"该模式下不可进行此操作",

        searchTargetSheet:"工作表",
        searchTargetCell:"单元格",
        searchTargetValue:"值",

        searchInputTip:"请输入查找内容",

        noReplceTip:"没有可替换的内容",
        noMatchTip:"找不到匹配项",

        successTip:"已经帮您搜索并进行了${xlength}处替换",

        locationConstant:"常量",
        locationFormula:"公式",
        locationDate:"日期",
        locationDigital:"数字",
        locationString:"字符",
        locationBool:"逻辑值",
        locationError:"错误",
        locationNull:"空值",
        locationCondition:"条件格式",
        locationRowSpan:"间隔行",
        locationColumnSpan:"间隔列",

        locationTiplessTwoRow:"请选择最少两行",
        locationTiplessTwoColumn:"请选择最少两列",
        locationTipNotFindCell:"未找到单元格"

    },
    sheetconfig: {
        delete: '删除',
        copy: '复制',
        rename: '重命名',
        changeColor: '更改颜色',
        hide: '隐藏',
        unhide: '取消隐藏',
        moveLeft: '向左移',
        moveRight: '向右移',
        resetColor: '重置颜色',
        cancelText: '取消',
        chooseText: '确定颜色',

        tipNameRepeat:"标签页的名称不能重复！请重新修改",
        noMoreSheet:"工作薄内至少含有一张可视工作表。若需删除选定的工作表，请先插入一张新工作表或显示一张隐藏的工作表。",
        confirmDelete:"是否删除",
        redoDelete:"可以通过Ctrl+Z撤销删除",
        noHide:"不能隐藏, 至少保留一个sheet标签",
        chartEditNoOpt:"图表编辑模式下不允许该操作！",

    },
    conditionformat: {
        conditionformat_greaterThan: '条件格式——大于',
        conditionformat_greaterThan_title: '为大于以下值的单元格设置格式',
        conditionformat_lessThan: '条件格式——小于',
        conditionformat_lessThan_title: '为小于以下值的单元格设置格式',
        conditionformat_betweenness: '条件格式——介于',
        conditionformat_betweenness_title: '为介于以下值的单元格设置格式',
        conditionformat_equal: '条件格式——等于',
        conditionformat_equal_title: '为等于以下值的单元格设置格式',
        conditionformat_textContains: '条件格式——文本包含',
        conditionformat_textContains_title: '为包含以下文本的单元格设置格式',
        conditionformat_occurrenceDate: '条件格式——发生日期',
        conditionformat_occurrenceDate_title: '为包含以下日期的单元格设置格式',
        conditionformat_duplicateValue: '条件格式——重复值',
        conditionformat_duplicateValue_title: '为包含以下类型值的单元格设置格式',
        conditionformat_top10: '条件格式——前 10 项',
        conditionformat_top10_percent: '条件格式——前 10%',
        conditionformat_top10_title: '为值最大的那些单元格设置格式',
        conditionformat_last10: '条件格式——最后 10 项',
        conditionformat_last10_percent: '条件格式——最后 10%',
        conditionformat_last10_title: '为值最小的那些单元格设置格式',
        conditionformat_AboveAverage: '条件格式——高于平均值',
        conditionformat_AboveAverage_title: '为高于平均值的单元格设置格式',
        conditionformat_SubAverage: '条件格式——低于平均值',
        conditionformat_SubAverage_title: '为低于平均值的单元格设置格式',
        rule: '规则',
        newRule: '新建规则',
        editRule: '编辑规则',
        deleteRule: '删除规则',
        deleteCellRule: '清除所选单元格的规则',
        deleteSheetRule: '清除整个工作表的规则',
        manageRules: '管理规则',
        showRules: '显示其格式规则',
        highlightCellRules: '突出显示单元格规则',
        itemSelectionRules: '项目选取规则',
        conditionformatManageRules: '条件格式规则管理器',
        format: '格式',
        setFormat: '设置格式',
        setAs: '设置为',
        setAsByArea: '针对选定区域，设置为',
        applyRange: '应用范围',
        selectRange: '点击选择应用范围',
        selectRange_percent: '所选范围的百分比',
        selectRange_average: '选定范围的平均值',
        selectRange_value: '选定范围中的数值',
        pleaseSelectRange: '请选择应用范围',
        selectDataRange: '点击选择数据范围',
        selectCell: '选择单元格',
        pleaseSelectCell: '请选择单元格',
        pleaseSelectADate: '请选择日期',
        pleaseEnterInteger: '请输入一个介于 1 和 1000 之间的整数',
        onlySingleCell: '只能对单个单元格进行引用',
        conditionValueCanOnly: '条件值只能是数字或者单个单元格',
        ruleTypeItem1: '基于各自值设置所有单元格的格式',
        ruleTypeItem2: '只为包含以下内容的单元格设置格式',
        ruleTypeItem2_title: '只为满足以下条件的单元格',
        ruleTypeItem3: '仅对排名靠前或靠后的数值设置格式',
        ruleTypeItem3_title: '为以下排名内的值',
        ruleTypeItem4: '仅对高于或低于平均值的数值设置格式',
        ruleTypeItem4_title: '为满足以下条件的值',
        ruleTypeItem5: '仅对唯一值或重复值设置格式',
        textColor: '文本颜色',
        cellColor: '单元格颜色',
        confirm: '确定',
        confirmColor: '确定颜色',
        cancel: '取消',
        close: '关闭',
        clearColorSelect: '清除颜色选择',
        sheet: '表',
        currentSheet: '当前工作表',
        dataBar: '数据条',
        dataBarColor: '数据条颜色',
        gradientDataBar_1: '蓝-白渐变数据条',
        gradientDataBar_2: '绿-白渐变数据条',
        gradientDataBar_3: '红-白渐变数据条',
        gradientDataBar_4: '橙-白渐变数据条',
        gradientDataBar_5: '浅蓝-白渐变数据条',
        gradientDataBar_6: '紫-白渐变数据条',
        solidColorDataBar_1: '蓝色数据条',
        solidColorDataBar_2: '绿色数据条',
        solidColorDataBar_3: '红色数据条',
        solidColorDataBar_4: '橙色数据条',
        solidColorDataBar_5: '浅蓝色数据条',
        solidColorDataBar_6: '紫色数据条',
        colorGradation: '色阶',
        colorGradation_1: '绿-黄-红色阶',
        colorGradation_2: '红-黄-绿色阶',
        colorGradation_3: '绿-白-红色阶',
        colorGradation_4: '红-白-绿色阶',
        colorGradation_5: '蓝-白-红色阶',
        colorGradation_6: '红-白-蓝色阶',
        colorGradation_7: '白-红色阶',
        colorGradation_8: '红-白色阶',
        colorGradation_9: '绿-白色阶',
        colorGradation_10: '白-绿色阶',
        colorGradation_11: '绿-黄色阶',
        colorGradation_12: '黄-绿色阶',
        icons: '图标集',
        pleaseSelectIcon: '请点击选择一组图标：',
        cellValue: '单元格值',
        specificText: '特定文本',
        occurrence: '发生日期',
        greaterThan: '大于',
        lessThan: '小于',
        between: '介于',
        equal: '等于',
        in: '和',
        to: '到',
        between2: '之间',
        contain: '包含',
        textContains: '文本包含',
        duplicateValue: '重复值',
        uniqueValue: '唯一值',
        top: '前',
        top10: '前 10 项',
        top10_percent: '前 10%',
        last: '后',
        last10: '后 10 项',
        last10_percent: '后 10%',
        oneself: '个',
        above: '高于',
        aboveAverage: '高于平均值',
        below: '低于',
        belowAverage: '低于平均值',
        all: '全部',
        yesterday: '昨天',
        today: '今天',
        tomorrow: '明天',
        lastWeek: '上周',
        thisWeek: '本周',
        lastMonth: '上月',
        thisMonth: '本月',
        lastYear: '去年',
        thisYear: '本年',
        last7days: '最近7天',
        last30days: '最近30天',
        next7days: '未来7天',
        next30days: '未来30天',
        next60days: '未来60天',
        chooseRuleType: '选择规则类型',
        editRuleDescription: '编辑规则说明',
        newFormatRule: '新建格式规则',
        editFormatRule: '编辑格式规则',
        formatStyle: '格式样式',
        fillType: '填充类型',
        color: '颜色',
        twocolor: '双色',
        tricolor: '三色',
        multicolor: '彩色',
        grayColor: '灰色',
        gradient: '渐变',
        solid: '实心',
        maxValue: '最大值',
        medianValue: '中间值',
        minValue: '最小值',
        direction: '方向',
        threeWayArrow: '三向箭头',
        fourWayArrow: '四向箭头',
        fiveWayArrow: '五向箭头',
        threeTriangles: '3个三角形',
        shape: '形状',
        threeColorTrafficLight: '三色交通灯',
        fourColorTrafficLight: '四色交通灯',
        threeSigns: '三标志',
        greenRedBlackGradient: '绿-红-黑渐变',
        rimless: '无边框',
        bordered: '有边框',
        mark: '标记',
        threeSymbols: '三个符号',
        tricolorFlag: '三色旗',
        circled: '有圆圈',
        noCircle: '无圆圈',
        grade: '等级',
        grade4: '四等级',
        grade5: '五等级',
        threeStars: '3个星形',
        fiveQuadrantDiagram: '五象限图',
        fiveBoxes: '5个框',
    },
    dataVerification: {
        cellRange: '单元格范围',
        selectCellRange: '点击选择单元格范围',
        selectCellRange2: '请选择单元格范围',
        verificationCondition: '验证条件',
        dropdown: '下拉列表',
        checkbox: '复选框',
        number: '数字',
        number_integer: '数字-整数',
        number_decimal: '数字-小数',
        text_content: '文本-内容',
        text_length: '文本-长度',
        date: '日期',
        validity: '有效性',
        placeholder1: '请输入选项，以英文逗号分隔，如1,2,3,4,5',
        placeholder2: '请输入内容',
        placeholder3: '数值，如10',
        placeholder4: '请输入指定的文本',
        placeholder5: '请输入选中单元格时显示的提示语',
        selected: '选择时',
        notSelected: '未选择',
        between: '介于',
        notBetween: '不介于',
        equal: '等于',
        notEqualTo: '不等于',
        moreThanThe: '大于',
        lessThan: '小于',
        greaterOrEqualTo: '大于等于',
        lessThanOrEqualTo: '小于等于',
        include: '包括',
        exclude: '不包括',
        earlierThan: '早于',
        noEarlierThan: '不早于',
        laterThan: '晚于',
        noLaterThan: '不晚于',
        identificationNumber: '身份证号码',
        phoneNumber: '手机号',
        remote: '自动远程获取选项',
        prohibitInput: '输入数据无效时禁止输入',
        hintShow: '选中单元格时显示提示语',
        deleteVerification: '删除验证',
        tooltipInfo1: '下拉列表选项不可为空',
        tooltipInfo2: '复选框内容不可为空',
        tooltipInfo3: '输入的值不是数值类型',
        tooltipInfo4: '数值2不能小于数值1',
        tooltipInfo5: '文本内容不能为空',
        tooltipInfo6: '输入的值不是日期类型',
        tooltipInfo7: '日期2不能小于日期1',
    },
    formula:{
        sum:"求和",
        average:"平均值",
        count:"计数",
        max:"最大值",
        min:"最小值",
        ifGenerate:"if公式生成器",
        find:"更多函数",

        tipNotBelongToIf:"该单元格函数不属于if公式！",
        tipSelectCell:"请选择单元格插入函数",

        ifGenCompareValueTitle:"比较值",
        ifGenSelectCellTitle:"点击选择单元格",
        ifGenRangeTitle:"范围",
        ifGenRangeTo:"至",
        ifGenRangeEvaluate:"范围评估",
        ifGenSelectRangeTitle:"点击选择范围",
        ifGenCutWay:"划分方式",
        ifGenCutSame:"划分值相同",
        ifGenCutNpiece:"划分为N份",
        ifGenCutCustom:"自定义输入",
        ifGenCutConfirm:"生成",

        ifGenTipSelectCell:"选择单元格",
        ifGenTipSelectCellPlace:"请选择单元格",

        ifGenTipSelectRange:"选择单范围",
        ifGenTipSelectRangePlace:"请选择范围",

        ifGenTipNotNullValue:"比较值不能为空！",
        ifGenTipLableTitile:"标签",
        ifGenTipRangeNotforNull:"范围不能为空！",
        ifGenTipCutValueNotforNull:"划分值不能为空！",
        ifGenTipNotGenCondition:"没有生成可用的条件！",
    },
    formulaMore:{
        valueTitle:"值",
        tipSelectDataRange:"选取数据范围",
        tipDataRangeTile:"数据范围",
        findFunctionTitle:"查找函数",
        tipInputFunctionName:"请输入您要查找的函数名称或函数功能的简要描述",

        "Array":"数组",
        "Database":"数据源",
        "Date":"日期",
        "Engineering":"工程计算",
        "Filter":"过滤器",
        "Financial":"财务",
        "luckysheet":"Luckysheet内置",
        "other":"其它",
        "Logical":"逻辑",
        "Lookup":"查找",
        "Math":"数学",
        "Operator":"运算符",
        "Parser":"转换工具",
        "Statistical":"统计",
        "Text":"文本",
        "dataMining":"数据挖掘",

        "selectFunctionTitle":"选择函数",
        "calculationResult":"计算结果",

        tipSuccessText:"成功",
        tipParamErrorText:"参数类型错误",

        "helpClose":"关闭",
        "helpCollapse":"收起",
        "helpExample":"示例",
        "helpAbstract":"摘要",

        "execfunctionError":'提示", "公式存在错误',
        "execfunctionSelfError":'公式不可引用其本身的单元格',
        "execfunctionSelfErrorResult":'公式不可引用其本身的单元格，会导致计算结果不准确',

        "allowRepeatText":"可重复",
        "allowOptionText":"可选",

        "selectCategory":"或选择类别",
    },
    drag:{
        noMerge:"无法对合并单元格执行此操作",
        affectPivot:"无法对所选单元格进行此更改，因为它会影响数据透视表！",
        noMulti:"无法对多重选择区域执行此操作,请选择单个区域",
        noPaste:"无法在此处粘贴此内容，请选择粘贴区域的一个单元格，然后再次尝试粘贴",
        noPartMerge:"无法对部分合并单元格执行此操作",

        inputCorrect:"请输入正确的数值",
        notLessOne:"行列数不能小于1",
        offsetColumnLessZero:"偏移列不能为负数！",

        pasteMustKeybordAlert:"Copy and paste in the Sheet: Ctrl + C to copy, Ctrl + V to paste, Ctrl + X to cut",
        pasteMustKeybordAlertHTMLTitle:"Copy and paste in the Sheet",
        pasteMustKeybordAlertHTML:"<span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + C</span>&nbsp;&nbsp;to copy<br/><span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + V</span>&nbsp;&nbsp;to paste<br/><span style='line-height: 1.0;font-size:36px;font-weight: bold;color:#666;'>Ctrl + X</span>&nbsp;&nbsp;to cut",
    },
    pivotTable:{
        title:"数据透视表",
        closePannel:"关闭",
        editRange:"编辑范围",
        tipPivotFieldSelected:"选择需要添加到数据透视表的字段",
        tipClearSelectedField:"清除所有已选字段",
        btnClearSelectedField:"清除",
        btnFilter:"筛选",
        titleRow:"行",
        titleColumn:"列",
        titleValue:"数值",
        tipShowColumn:"统计字段显示为列",
        tipShowRow:"统计字段显示为行",

        titleSelectionDataRange:"选取数据范围",
        titleDataRange:"数据范围",

        valueSum:"总计",

        valueStatisticsSUM:"求和",
        valueStatisticsCOUNT:"数值计数",
        valueStatisticsCOUNTA:"计数",
        valueStatisticsCOUNTUNIQUE:"去重计数",
        valueStatisticsAVERAGE:"平均值",
        valueStatisticsMAX:"最大值",
        valueStatisticsMIN:"最小值",
        valueStatisticsMEDIAN:"中位数",
        valueStatisticsPRODUCT:"乘积",
        valueStatisticsSTDEV:"标准差",

        valueStatisticsSTDEVP:"整体标准差",
        valueStatisticslet:"方差",
        valueStatisticsVARP:"整体方差",

        errorNotAllowEdit:"非编辑模式下禁止该操作！",
        errorNotAllowMulti:"不能对多重选择区域执行此操作，请选择单个区域，然后再试",
        errorSelectRange:"请选择新建透视表的区域",
        errorIsDamage:"此数据透视表的源数据已损坏！",
        errorNotAllowPivotData:"不可选择数据透视表为源数据！",
        errorSelectionRange:"选择失败, 输入范围错误！",
        errorIncreaseRange:"请扩大选择的数据范围!",

        titleAddColumn:"添加列到数据透视表",
        titleMoveColumn:"移动该列到下方白框",
        titleClearColumnFilter:"清除该列的筛选条件",
        titleFilterColumn:"筛选该列",

        titleSort:"排序",
        titleNoSort:"无排序",
        titleSortAsc:"升序",
        titleSortDesc:"降序",
        titleSortBy:"排序依据",
        titleShowSum:"显示总计",
        titleStasticTrue:"是",
        titleStasticFalse:"否",
    },
    dropCell:{
        copyCell:"复制单元格",
        sequence:"填充序列",
        onlyFormat:"仅填充格式",
        noFormat:"不带格式填充",
        day:"以天数填充",
        workDay:"以工作日填充",
        month:"以月填充",
        year:"以年填充",
        chineseNumber:"以中文小写数字填充"
    },
    imageCtrl:{
        borderTile:"图片边框颜色选择",
        borderCur:"当前颜色",
    },
    protection:{
        protectiontTitle:"保护工作表",
        enterPassword:"请输入密码（可留空）",
        enterHint:"您试图更改的单元格或图表位于受保护的工作表中。若要更改，请取消工作表保护。您可能需要输入密码",
        swichProtectionTip:"保护工作表及锁定的单元格内容",
        authorityTitle:"允许此工作表的用户进行:",
        selectLockedCells:"选定锁定单元格",
        selectunLockedCells:"选定解除锁定的单元格",
        formatCells:"设置单元格格式",
        formatColumns:"设置列格式",
        formatRows:"设置行格式",
        insertColumns:"插入列",
        insertRows:"插入行",
        insertHyperlinks:"插入超链接",
        deleteColumns:"删除列",
        deleteRows:"删除行",
        sort:"排序",
        filter:"使用自动筛选",
        usePivotTablereports:"使用数据透视表和报表",
        editObjects:"编辑对象",
        editScenarios:"编辑方案",

        allowRangeTitle:"允许用户编辑区域",
        allowRangeAdd:"新建...",

        allowRangeAddTitle:"标题",
        allowRangeAddSqrf:"引用单元格",
        selectCellRange: '点击选择单元格范围',
        selectCellRangeHolder:"请输入单元格范围",
        allowRangeAddTitlePassword:"密码",
        allowRangeAddTitleHint:"提示",
        allowRangeAddTitleHintTitle:"设置密码后，提示用户输入密码(可留空)",
        allowRangeAddtitleDefault:"请输入区域名称",

        rangeItemDblclick:"双击进行编辑",
        rangeItemHasPassword:"已设置密码",

        rangeItemErrorTitleNull:"标题不能为空",
        rangeItemErrorRangeNull:"单元格范围不能为空",
        rangeItemErrorRange:"单元格范围格式错误",

        validationTitle:"验证提示",
        validationTips:"需要输入密码来撤销工作表的保护",
        validationInputHint:"请输入密码",

        checkPasswordNullalert:"密码不能为空！",
        checkPasswordWrongalert:"密码错误，请重试！",

        checkPasswordSucceedalert:"解锁成功，可以编辑该区域!",
        defaultRangeHintText:"该单元格正在受密码保护。",
        defaultSheetHintText:"该单元格或图表位于受保护的工作表中，若要进行更改，请取消工作表保护，您可能需要输入密码。",
    },
    cellFormat:{
        cellFormatTitle:"设置单元格格式",
        protection:"保护",
        locked:"锁定单元格",
        hidden:"隐藏公式",
        protectionTips:"只有保护工作表功能(在菜单栏点击保护工作表按钮进行设置)开启后，锁定单元格或隐藏公式才能生效",
        tipsPart:"部分选中",
        tipsAll:"全部选中",
        selectionIsNullAlert:"请选择一个范围！",
        sheetDataIsNullAlert:"数据为空无法设置！",
    },
    print:{
        normalBtn:"常规视图",
        layoutBtn:"页面布局",
        pageBtn:"分页预览",

        menuItemPrint:"打印(Ctrl+P)",
        menuItemAreas:"打印区域",
        menuItemRows:"打印标题行",
        menuItemColumns:"打印标题列",
    }

};
