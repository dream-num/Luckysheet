import { seriesLoadScripts, loadLinks, $$ } from '../../utils/util'
import { generateRandomKey, replaceHtml } from '../../utils/chartUtil'
import { getdatabyselection , getcellvalue} from '../../global/getdata';
import chartInfo from '../../store'
import { getSheetIndex , getRangetxt } from '../../methods/get'
import { mouseposition } from '../../global/location'
import { 
    luckysheetMoveHighlightCell, 
    luckysheetMoveHighlightCell2, 
    luckysheetMoveHighlightRange, 
    luckysheetMoveHighlightRange2,
    luckysheetMoveEndCell 
} from '../../controllers/sheetMove';

// Dynamically load dependent scripts and styles
const dependScripts = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vuex@3.4.0',
    'https://unpkg.com/element-ui/lib/index.js',
    'https://lib.baomitu.com/echarts/4.7.0/echarts.min.js',
    'expendPlugins/chart/chartmix.umd.js'
    // 'http://192.168.9.222:8000/chartmix.umd.js'
]

const dependLinks = [
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',
    'expendPlugins/chart/chartmix.css',
    // 'http://192.168.9.222:8000/chartmix.css'
]

// Initialize the chart component
function chart() {
    loadLinks(dependLinks);

    seriesLoadScripts(dependScripts, null, function () {
        const store = new Vuex.Store()
        console.info('chartmix::', chartmix.default)

        Vue.use(chartmix.default, { store })
        let outDom = document.getElementById('luckysheet_info_detail')
        chartmix.default.initChart(outDom)
        $('.chartSetting').css({
            position: 'absolute',
            right: 0,
            width: '300px',
            display: 'none',
            background: '#fff',
            paddingLeft: '10px',
            border: '1px solid #ccc',
            height: 'auto',
            zIndex: 99999999
        })
        chartInfo.createChart = chartmix.default.createChart
        chartInfo.highlightChart = chartmix.default.highlightChart
        chartInfo.deleteChart = chartmix.default.deleteChart
    });
}

// create chart
function createLuckyChart(width, height, left, top) {
    //如果只选中一个单元格，则自动填充选取
    var jfgird_select_save = luckysheet.getluckysheet_select_save();
    if (
        jfgird_select_save.length == 1 &&
        jfgird_select_save[0].row[0] == jfgird_select_save[0].row[1] &&
        jfgird_select_save[0].column[0] == jfgird_select_save[0].column[1]
    ) {
        luckysheetMoveHighlightRange2("right", "rangeOfSelect");

        luckysheetMoveHighlightRange2("down", "rangeOfSelect");

        jfgird_select_save = luckysheet.getluckysheet_select_save();
    }
    //处理右边的空白单元格，自动略过并修改选区 ---------------start
    var shiftpositon_row = -1;

    var row_ed =
        jfgird_select_save[0]["row"][1] - jfgird_select_save[0]["row"][0];
    for (
        var r = jfgird_select_save[0]["row"][0];
        r <= jfgird_select_save[0]["row"][1];
        r++
    ) {
        for (
            var c = jfgird_select_save[0]["column"][0];
            c <= jfgird_select_save[0]["column"][1];
            c++
        ) {
            var value = getcellvalue(r, c, luckysheet.flowdata());
            //console.log("value,r,c",value,r,c);
            if (value != null && value.toString().length > 0) {
                shiftpositon_row = r;
                break;
            }
        }

        if (shiftpositon_row !== -1) {
            break;
        }
    }

    if (shiftpositon_row == -1) {
        shiftpositon_row = 0;
    }

    jfgird_select_save[0]["row"] = [shiftpositon_row, shiftpositon_row];
    luckysheet.setluckysheet_select_save(jfgird_select_save);

    chartInfo.luckysheet_shiftpositon = $.extend(true, {}, jfgird_select_save[0]);
    luckysheetMoveEndCell("down", "range", false, row_ed);
    jfgird_select_save = luckysheet.getluckysheet_select_save();

    var shiftpositon_col = -1;
    var column_ed =
        jfgird_select_save[0]["column"][1] - jfgird_select_save[0]["column"][0];
    for (
        var c = jfgird_select_save[0]["column"][0];
        c <= jfgird_select_save[0]["column"][1];
        c++
    ) {
        for (
            var r = jfgird_select_save[0]["row"][0];
            r <= jfgird_select_save[0]["row"][1];
            r++
        ) {
            var value = getcellvalue(r, c, luckysheet.flowdata());
            if (value != null && value.toString().length > 0) {
                shiftpositon_col = c;
                break;
            }
        }

        if (shiftpositon_col !== -1) {
            break;
        }
    }

    if (shiftpositon_col == -1) {
        shiftpositon_col = 0;
    }

    jfgird_select_save[0]["column"] = [shiftpositon_col, shiftpositon_col];
    luckysheet.setluckysheet_select_save(jfgird_select_save);

    chartInfo.luckysheet_shiftpositon = $.extend(true, {}, jfgird_select_save[0]);
    luckysheetMoveEndCell("right", "range", false, column_ed);
    jfgird_select_save = luckysheet.getluckysheet_select_save()

    var rangeArray = $.extend(true, [], jfgird_select_save);

    var rangeTxt = getRangetxt(chartInfo.currentSheetIndex , rangeArray[0] , chartInfo.currentSheetIndex)


    let chartData = getdatabyselection()
    console.dir(chartData)

    let chart_id = generateRandomKey('chart')

    let chart_id_c = chart_id + '_c'

    let modelChartShowHTML =
        '<div id="${id}"class="jfgrid-modal-dialog jfgrid-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="jfgrid-modal-dialog-resize"><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-lt"data-type="lt"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-mt"data-type="mt"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-lm"data-type="lm"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-rm"data-type="rm"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-rt"data-type="rt"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-lb"data-type="lb"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-mb"data-type="mb"></div><div class="jfgrid-modal-dialog-resize-item jfgrid-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="jfgrid-modal-dialog-controll"><span class="jfgrid-modal-controll-btn jfgrid-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="jfgrid-modal-controll-btn jfgrid-modal-controll-max"role="butjfgrid_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="jfgrid-modal-controll-btn jfgrid-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="jfgrid-modal-dialog-content">${content}</div></div>'

    let $t = $(
        replaceHtml(modelChartShowHTML, {
            id: chart_id_c,
            addclass: 'jfgrid-data-visualization-chart',
            title: '图表生成',
            content: ''
        })
    ).appendTo($('.luckysheet-cell-main'))

    let container = document.getElementById(chart_id_c)

    console.dir(rangeArray , rangeTxt)

    let { render, chart_json } = chartInfo.createChart($(`#${chart_id_c}`).children('.jfgrid-modal-dialog-content')[0], chartData, chart_id , rangeArray , rangeTxt)
    console.dir(JSON.stringify(chart_json))

    width = width ? width : 400
    height = height ? height : 250
    left = left ? left : 0
    top = top ? top : 0
    container.style.width = width + 'px'
    container.style.height = height + 'px'
    container.style.position = 'absolute'
    container.style.background = '#fff'
    container.style.left = left + 'px'
    container.style.top = top + 'px'
    render.style.width = '100%'
    render.style.height = '100%'
    container.style.zIndex = chartInfo.zIndex ? chartInfo.zIndex : 15
    chartInfo.zIndex++

    // insert chartinfo
    let sheetFile = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)]
    sheetFile.chart.push({
        chart_id,
        width,
        height,
        left,
        top,
        sheetIndex: sheetFile.index
    })

    // highline current chart
    $('.luckysheet-cell-main').click(function (e) {
        if (e.target.tagName == 'CANVAS' && e.target.offsetParent && e.target.offsetParent.offsetParent && e.target.offsetParent.offsetParent.id && e.target.offsetParent.offsetParent.id.slice(0, 6) == 'chart_') {
            chartInfo.highlightChart(e.target.offsetParent.offsetParent.id)
            chartInfo.chartparam.jfgridCurrentChartMoveObj = $(e.target.offsetParent.offsetParent.id + '_c')
            chartInfo.chartparam.jfgridCurrentChartResizeObj = $(e.target.offsetParent.offsetParent.id + '_c')
            chartInfo.chartparam.jfgridCurrentChartActive = true
            document.getElementById(e.target.offsetParent.offsetParent.id + '_c').style.zIndex = ++chartInfo.zIndex
            $('.chartSetting').css('display', 'block')
            return
        }
        $('.chartSetting').css('display', 'none')
        chartInfo.chartparam.jfgridCurrentChartActive = false
    })

    // delete current chart
    $(`#${chart_id}_c .jfgrid-modal-controll-del`).click(function (e) {
        delChart(chart_id)
    })

    chartInfo.chartparam.jfgridCurrentChartMoveObj = $(`#${chart_id}_c `)
    chartInfo.chartparam.jfgridCurrentChartResizeObj = $(`#${chart_id}_c `)
    chartInfo.chartparam.jfgridCurrentChartActive = true

    // move chart
    $t.mousedown(function (e) {
        //允许拖动渲染框
        if (
            !$(e.target).is(".jfgrid-modal-dialog-controll") &&
            !$(e.target).is(".jfgrid-modal-controll-btn") &&
            !$(e.target).is("i")
        ) {
            chartInfo.chartparam.currentChartMoveTimeout = setTimeout(
                function () {
                    chartInfo.chartparam.currentChartMove = true;
                },
                100
            );
        }

        var toffset = chartInfo.chartparam.jfgridCurrentChartMoveObj.offset();
        var tpsition = chartInfo.chartparam.jfgridCurrentChartMoveObj.position();
        //jfgridCurrentChartMoveXy: [鼠标点相对chart框的距离X方向，鼠标点相对chart框的距离Y方向，chart框相对cell-main的距离X方向，chart框相对cell-main的距离Y方向，水平滚动条的位置，垂直滚动条的位置]
        chartInfo.chartparam.jfgridCurrentChartMoveXy = [
            e.pageX - toffset.left,
            e.pageY - toffset.top,
            tpsition.left,
            tpsition.top,
            $("#jfgrid-scrollbar-x").scrollLeft(),
            $("#jfgrid-scrollbar-y").scrollTop()
        ];
        chartInfo.chartparam.jfgridCurrentChartMoveWinH = $(
            "#luckysheet-cell-main"
        )[0].scrollHeight;
        chartInfo.chartparam.jfgridCurrentChartMoveWinW = $(
            "#luckysheet-cell-main"
        )[0].scrollWidth;

        if (
            !$(e.target).hasClass("jfgrid-mousedown-cancel") &&
            $(e.target).filter("[class*='sp-palette']").length == 0 &&
            $(e.target).filter("[class*='sp-thumb']").length == 0 &&
            $(e.target).filter("[class*='sp-']").length == 0
        ) {
            $("#jfgrid-rightclick-menu").hide();
            $("#jfgrid-cols-h-hover").hide();
            $("#jfgrid-cols-menu-btn").hide();
            $("#jfgrid-rightclick-menu").hide();
            $(
                "#jfgrid-sheet-list, #jfgrid-rightclick-sheet-menu, #jfgrid-user-menu"
            ).hide();
            $(
                "body > .jfgrid-filter-menu, body > .jfgrid-filter-submenu, body > .jfgrid-cols-menu"
            ).hide();

        }

        e.stopPropagation();
    }).find(".jfgrid-modal-dialog-resize-item")
        .mousedown(function (e) {
            if (chartInfo.chartparam.jfgridCurrentChartActive) {
                chartInfo.chartparam.jfgridCurrentChartResize = $(this).data("type"); //开始状态resize

                var mouse = mouseposition(e.pageX, e.pageY),
                    scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
                    scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;
                var position = chartInfo.chartparam.jfgridCurrentChartResizeObj.position();
                //参数：x,y:鼠标位置，$t.width(), $t.height(): chart框宽高， position.left + scrollLeft, position.top + scrollTop ：chart框位置 ，scrollLeft, scrollTop：滚动条位置
                chartInfo.chartparam.jfgridCurrentChartResizeXy = [
                    x,
                    y,
                    $t.width(),
                    $t.height(),
                    position.left + scrollLeft,
                    position.top + scrollTop,
                    scrollLeft,
                    scrollTop
                ];
                chartInfo.chartparam.jfgridCurrentChartResizeWinH = $(
                    "#luckysheet-cell-main"
                )[0].scrollHeight;
                chartInfo.chartparam.jfgridCurrentChartResizeWinW = $(
                    "#luckysheet-cell-main"
                )[0].scrollWidth;

                chartInfo.chartparam.jfgridcurrentChart = chart_id;

                e.stopPropagation();
            }
        })
}

// delete chart
function delChart(chart_id) {
    // delete container
    $(`.luckysheet-cell-main #${chart_id}_c`).remove()
    // delete storage
    let sheetFile = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)]
    sheetFile.chart.findIndex(item => item.chart_id == chart_id)
    sheetFile.chart.splice(index, 1)
    // api call
    chartInfo.deleteChart(chart_id)
}


export { chart, createLuckyChart }