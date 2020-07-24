/**
 * 图表的样式结构: 为chartOptions.defaultOption下的所有属性,应该是所有图表类型的并集
 * DOM的结构与此对应: DOM操作后修改此处参数,直接存储后台, 渲染图表时候经过一层引擎转换才能使用各个图表插件渲染; 后台拿到此参数,可对应绑定到DOM上
 *
 * 设计细节:
 * 1. 各个图表类型之间的设置项不同,有交集和并集,此处设置统一存储并集参数
 * 2. 切换图表类型时,亦应保留所具有的设置参数,为切换回上一个图表类型保留设置
 */
import { deepCopy } from '../utils/chartUtil';
const baseComponent = {
    label: {
        fontSize: 12, //字体大小 //fontSize为'custom'时,取cusFontSize的值
        color: '#333', //颜色
        fontFamily: 'sans-serif', //字体
        fontGroup: [], //字体, 加粗:选中:'bold',无:'normal'; 斜体: 选中:'italic',无:'normal';方向:选中:'vertical',无:'horizen'
        cusFontSize: 12, //自定义文字大小
    },
    formatter: {
        prefix: '', //前缀
        suffix: '', //后缀
        ratio: 1, //数值比例
        digit: 'auto', //小数位数
    },
};
const chartComponent = {
    //标题设置
    title: {
        show: false, //是否显示
        text: '默认标题', //标题内容
        label: deepCopy(baseComponent.label),
        position: {
            value: 'left-top', //custom:自定义 //left-top  为custom的时候,取offsetX, offsetY
            offsetX: 40, //自定义的X位置,单位百分比
            offsetY: 50, //自定义的Y位置,单位百分比
        },
    },
    //副标题
    subtitle: {
        show: false, //是否显示
        text: '', //标题内容
        label: deepCopy(baseComponent.label),
        distance: {
            value: 'auto', //'auto': 默认, 'far': 远 // 'normal': 一般 'close':近 custom :取cusGap作为距离
            cusGap: 40, //自定义距离
        },
    },
    // 图表设置
    config: {
        color: 'transparent', //默认颜色//'#333'
        fontFamily: 'Sans-serif',
        grid: {
            value: 'normal', //''normal':正常 'wide':宽 // 'narrow':窄 // 'slender':瘦长 'flat':扁平
            top: 5,
            left: 10,
            right: 20,
            bottom: 10,
        },
    },
    //图例设置
    legend: {
        show: true,
        selectMode: 'multiple', //'single':单选 //'多选':multiple //'禁用':'disable'
        selected: [
            //图例显示选择 //动态数据渲染 //分:初始化图表+后台加载使用数据结构中数据 /编辑时根据系列实时变化
            {
                seriesName: '衣服', //
                isShow: true,
            },
            {
                seriesName: '食材', //
                isShow: true,
            },
            {
                seriesName: '图书', //
                isShow: true,
            },
        ],
        label: deepCopy(baseComponent.label), //图例文字样式
        position: {
            value: 'left-top', //custom:自定义 //left-top  为custom的时候,取offsetX, offsetY
            offsetX: 40, //自定义的X位置,单位百分比
            offsetY: 50, //自定义的Y位置,单位百分比
            direction: 'horizontal', //图例位置水平或者垂直 horizontal(水平)/vertical(垂直)
        },
        width: {
            //图例图标大小
            value: 'auto', //'auto':默认/ 'big':大/'medium':中/'small':小/'custom':自定义
            cusSize: 25, //图例自定义宽度 ,单位px
        },
        height: {
            //图例图标大小
            value: 'auto', //'auto':默认/ 'big':大/'medium':中/'small':小/'custom':自定义
            cusSize: 14, //图例自定义宽度 ,单位px
        },
        distance: {
            value: 'auto', //'auto':默认 /far':远 / 'general':一般 / 'near':近 /'custom':自定义
            cusGap: 10, //自定义距离
        },
        itemGap: 10,
    },
    //提示设置
    tooltip: {
        show: true, //鼠标提示显示
        label: deepCopy(baseComponent.label), //文字样式
        backgroundColor: 'rgba(50,50,50,0.7)', // 鼠标提示框背景色
        triggerOn: 'mousemove', // 'mousemove':鼠标滑过 click':单击 触发条件
        triggerType: 'item', //触发类型 //'axis':坐标轴触发 'item':数据项图形触发
        axisPointer: {
            // 指示器配置
            type: 'line', // 'line':默认直线指示器 //'cross': 十字指示器配置 //'shadow': 阴影指示器配置
            style: {
                // 指示器样式
                color: '#555',
                width: 'normal', //宽度:'normal':正常 'bold': 粗 'bolder':加粗
                type: 'solid', //'solid': 实线 'dash': 虚线 'dot':点线
            },
        },
        format: [
            //鼠标提示后缀
            {
                seriesName: '衣服',
                prefix: '', //前缀
                suffix: '', //后缀 (自定义单位)
                ratio: 1, //除以的数 // 1为默认, 0.1 /0.001 /...
                digit: 'auto', //小数位数 'auto' :不处理 // 数值:0 , 1 ,2 ...
            },
            {
                seriesName: '食材',
                prefix: '', //前缀
                suffix: '', //后缀
                ratio: 1,
                digit: 'auto',
            },
            {
                seriesName: '图书',
                prefix: '', //前缀
                suffix: '', //后缀
                ratio: 1,
                digit: 'auto',
            },
        ],
        position: 'auto', // 鼠标提示位置 //'inside':中心位置 //'left'/'top'/'right'/'top'
    },
    // XY轴
    axis: {
        axisType: 'xAxisDown', //要显示的坐标轴类型
        xAxisUp: {
            show: false, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示X轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                optimize: 0,
                distance: 0, //标签与轴线距离
                min: 'auto', //最小值
                max: 'auto', //最大值
                ratio: 1,
                digit: 'auto',
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
            axisLine: {
                //第二根X轴必需
                onZero: false,
            },
        },
        xAxisDown: {
            show: true, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示X轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                optimize: 0, //标签间隔个数
                distance: 0, //标签与轴线距离
                min: null, //最小值
                max: null, //最大值
                ratio: 1,
                digit: 'auto',
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
        },
        yAxisLeft: {
            show: true, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示Y轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                formatter: deepCopy(baseComponent.formatter),
                split: 5, //分割段数
                min: null, //最小值
                max: null, //最大值
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                ratio: 1,
                digit: 'auto',
                distance: 0, //标签与轴线距离
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
        },
        yAxisRight: {
            show: false, //显示X轴
            title: {
                showTitle: false, //显示X轴
                text: '', //标题内容
                nameGap: 15, //标题与轴线距离
                rotate: 0, //标题倾斜角度
                label: deepCopy(baseComponent.label),
                fzPosition: 'end', //标题对齐方式,end: 尾部, middle: 中间
            },
            name: '显示Y轴',
            inverse: false, //反向坐标轴 (echarts有)
            //刻度线
            tickLine: {
                show: true, //显示刻度线
                width: 1, //刻度线宽度
                color: 'auto', //刻度线颜色
            },
            //刻度
            tick: {
                show: true, //显示刻度
                position: 'outside', //刻度位置,默认: outside朝外 / inside: 朝内
                length: 5, //刻度长度
                width: 1, //刻度宽度
                color: 'auto', //刻度颜色
            },
            //标签
            tickLabel: {
                show: true, //显示刻度标签
                label: deepCopy(baseComponent.label),
                rotate: 0, //倾斜标签角度
                formatter: deepCopy(baseComponent.formatter),
                split: 5, //分割段数
                min: null, //最小值
                max: null, //最大值
                prefix: '', //标签前缀
                suffix: '', //标签后缀
                ratio: 1,
                digit: 'auto',
                distance: 0, //标签与轴线距离
            },
            //网格线
            netLine: {
                show: false, //显示网格线
                width: 1, //网格线宽度
                type: 'solid', //网格线类型
                color: 'auto', //网格线颜色
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
            },
            //网格区域
            netArea: {
                show: false, //显示网格区域
                interval: {
                    //网格分割间隔数
                    value: 'auto',
                    cusNumber: 0,
                },
                colorOne: 'auto', //网格第一颜色
                colorTwo: 'auto', //网格第二颜色
            },
        },
    },
};

//此类数据抽出来作为模板数据,每次使用deepCopy一份即可
//注: 若页面展示的是语义化的参数,则此处也只定义语义化的参数,具体数值在引擎里做转换
//若界面选择的直接是用户期望的数值,则直接采用数值即可
/**
 *  位置信息
 *
 */
const positionOption = [
    { value: 'left-top', label: '左上' },
    { value: 'left-middle', label: '左中' },
    { value: 'left-bottom', label: '左下' },
    { value: 'right-top', label: '右上' },
    { value: 'right-middle', label: '右中' },
    { value: 'right-bottom', label: '右下' },
    { value: 'center-top', label: '中上' },
    { value: 'center-middle', label: '居中' },
    { value: 'center-bottom', label: '中下' },
    { value: 'custom', label: '自定义' },
];

//距离
const distanceOption = [
    { value: 'auto', label: '默认' },
    { value: 'far', label: '远' },
    { value: 'normal', label: '一般' },
    { value: 'close', label: '近' },
    { value: 'custom', label: '自定义' },
];

// 字体大小集合
const fontSizeOption = [
    { value: 6, label: '6px' },
    { value: 8, label: '8px' },
    { value: 10, label: '10px' },
    { value: 12, label: '12px' },
    { value: 14, label: '14px' },
    { value: 16, label: '16px' },
    { value: 18, label: '18px' },
    { value: 20, label: '20px' },
    { value: 22, label: '22px' },
    { value: 24, label: '24px' },
    { value: 30, label: '30x' },
    { value: 36, label: '36px' },
    { value: 'custom', label: '自定义' },
];

// 线样式
const lineStyleOption = [
    { value: 'solid', label: '实线' },
    { value: 'dashed', label: '虚线' },
    { value: 'dotted', label: '点线' },
];

// 线宽度
const lineWeightOption = [
    { value: 'normal', label: '正常' },
    { value: 'bold', label: '粗' },
    { value: 'bolder', label: '加粗' },
];

// 普通位置集合
const posOption = [
    { value: 'auto', label: '默认' },
    { value: 'inside', label: '中心位置' },
    { value: 'top', label: '上侧' },
    { value: 'left', label: '左侧' },
    { value: 'right', label: '右侧' },
    { value: 'bottom', label: '底侧' },
];

// 数值比例集合
const ratioOption = [
    { value: 100, label: '乘以100' },
    { value: 10, label: '乘以10' },
    { value: 1, label: '默认' },
    { value: 0.1, label: '除以10' },
    { value: 0.01, label: '除以100' },
    { value: 0.001, label: '除以1000' },
    { value: 0.0001, label: '除以一万' },
    { value: 0.00001, label: '除以10万' },
    { value: 0.000001, label: '除以一百万' },
    { value: 0.0000001, label: '除以一千万' },
    { value: 0.00000001, label: '除以一亿' },
    { value: 0.000000001, label: '除以十亿' },
];

// 数值位数集合
const digitOption = [
    { value: 'auto', label: '自动显示' },
    { value: 0, label: '整数' },
    { value: 1, label: '1位小数' },
    { value: 2, label: '2位小数' },
    { value: 3, label: '3位小数' },
    { value: 4, label: '4位小数' },
    { value: 5, label: '5位小数' },
    { value: 6, label: '6位小数' },
    { value: 7, label: '7位小数' },
    { value: 8, label: '8位小数' },
];

// (图例)大小集合
const sizeOption = [
    { value: 'auto', label: '默认' },
    { value: 'big', label: '大' },
    { value: 'medium', label: '中' },
    { value: 'small', label: '小' },
    { value: 'custom', label: '自定义' },
];

// 间隔集合
const intervalOption = [
    { value: 'auto', label: '默认' },
    { value: 0, label: '每个刻度' },
    { value: 1, label: '间隔1个' },
    { value: 2, label: '间隔2个' },
    { value: 3, label: '间隔3个' },
    { value: 'custom', label: '自定义' },
];

//字体大小
const fontSizeList = [
    { label: '默认', value: 'auto' },
    { label: '6px', value: 6 },
    { label: '8px', value: 8 },
    { label: '10px', value: 10 },
    { label: '12px', value: 12 },
    { label: '14px', value: 14 },
    { label: '16px', value: 16 },
    { label: '18px', value: 18 },
    { label: '24px', value: 24 },
    { label: '28px', value: 28 },
    { label: '36px', value: 36 },
    { label: '自定义', value: 'custom' },
];

//label字体样式 1 // 'bold','italic','vertical'
const fontStyleIBV = {
    bold: {
        des: '加粗',
        text: 'B',
    },
    italic: {
        des: '斜体',
        text: 'I',
    },
    vertical: {
        des: '文字方向',
        text: '垂直',
    },
};
//label字体样式 2 // 'italic','bold'
const fontStyleIB = {
    bold: {
        des: '加粗',
        text: 'B',
    },
    italic: {
        des: '斜体',
        text: 'I',
    },
};

// model data
const chartModelData = [["地区", "衣服", "食材", "图书"], ["上海", 134, 345, 51], ["北京", 345, 421, 234], ["广州", 453, 224, 156], ["杭州", 321, 634, 213], ["南京", 654, 542, 231]];

// base chart option
const chartOptions = {
    //图表类型设置集合
    chartAllType: 'echarts|line|default',

    //图表配置
    defaultOption: deepCopy(chartComponent),

    //图表数据
    chartData: deepCopy(chartModelData),
} //图表设置项

export {
    chartComponent,
    positionOption,
    distanceOption,
    fontSizeOption,
    lineStyleOption,
    lineWeightOption,
    posOption,
    ratioOption,
    digitOption,
    sizeOption,
    fontSizeList,
    intervalOption,
    fontStyleIBV,
    fontStyleIB,
    chartOptions
};
