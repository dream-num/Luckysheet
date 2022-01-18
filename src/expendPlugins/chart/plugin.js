import { seriesLoadScripts, loadLinks, $$, arrayRemoveItem } from '../../utils/util'
import { generateRandomKey, replaceHtml } from '../../utils/chartUtil'
import { getdatabyselection, getcellvalue } from '../../global/getdata';
import chartInfo from '../../store'
import formula from '../../global/formula';
import { luckysheet_getcelldata } from '../../function/func';
import { getSheetIndex, getRangetxt, getvisibledatacolumn, getvisibledatarow } from '../../methods/get'
import { rowLocation, colLocation, mouseposition } from '../../global/location'
import { setluckysheet_scroll_status } from '../../methods/set'
import {
    luckysheetMoveHighlightCell,
    luckysheetMoveHighlightCell2, 
    luckysheetMoveHighlightRange,
    luckysheetMoveHighlightRange2,
    luckysheetMoveEndCell
} from '../../controllers/sheetMove';
import { isEditMode } from '../../global/validate';
import luckysheetsizeauto from '../../controllers/resize';
let _rowLocation = rowLocation
let _colLocation = colLocation

// Dynamically load dependent scripts and styles
const dependScripts = [
    'https://cdn.jsdelivr.net/npm/vue@2.6.11',
    'https://unpkg.com/vuex@3.4.0',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/index.js',
    'https://cdn.bootcdn.net/ajax/libs/echarts/4.8.0/echarts.min.js',
    'expendPlugins/chart/chartmix.umd.min.js',
    // 'http://26.26.26.1:8000/chartmix.umd.js'
]

const dependLinks = [
    'https://cdn.bootcdn.net/ajax/libs/element-ui/2.13.2/theme-chalk/index.css',
    'expendPlugins/chart/chartmix.css',
    // 'http://26.26.26.1:8000/chartmix.css'
]

// Initialize the chart component
function chart(data, isDemo) {
    loadLinks(dependLinks);

    seriesLoadScripts(dependScripts, null, function () {
        const store = new Vuex.Store()
        console.info('chartmix::', chartmix.default)

        Vue.use(chartmix.default, { store })
        let outDom = document.getElementsByTagName('body')[0]
        chartmix.default.initChart(outDom, chartInfo.lang)

        $('.chartSetting').css({
            top: '1px',
            bottom: '1px',
            position: 'absolute',
            right: '0px',
            width: '350px',
            background: '#fff',

            border: '1px solid #E5E5E5',
            'z-index': 1004,
            'box-shadow': '0px 2px 4px rgba(0,0,0,0.2)',
            '-webkit-box-shadow': '0px 2px 4px rgba(0,0,0,0.2)',
            '-moz-box-shadow': '0px 2px 4px rgba(0,0,0,0.2)',
            '-moz-user-select': 'none',
            '-khtml-user-select': 'none',
            '-webkit-user-select': 'none',
            '-ms-user-select': 'none',
            'user-select': 'none',
            'padding-left': '30px',
            display: 'none'
        })


        chartInfo.createChart = chartmix.default.createChart
        chartInfo.highlightChart = chartmix.default.highlightChart
        chartInfo.deleteChart = chartmix.default.deleteChart
        chartInfo.resizeChart = chartmix.default.resizeChart
        chartInfo.changeChartRange = chartmix.default.changeChartRange
        chartInfo.changeChartCellData = chartmix.default.changeChartCellData
        chartInfo.getChartJson = chartmix.default.getChartJson
        chartInfo.chart_selection = chart_selection()
        chartInfo.chartparam.jfrefreshchartall = jfrefreshchartall
        chartInfo.chartparam.changeChartCellData = chartmix.default.changeChartCellData
        chartInfo.chartparam.renderChart = chartmix.default.renderChart
        chartInfo.chartparam.getChartJson = chartmix.default.getChartJson
        chartInfo.chartparam.insertToStore = chartmix.default.insertToStore

        // Initialize the rendering chart
        for (let i = 0; i < data.length; i++) {
            // if (data[i].status == '1') {
                renderCharts(data[i].chart, isDemo)
            // }
        }

        for (let i = 0; i < data.length; i++) {
            if (data[i].status == '1') {
                renderChartShow(data[i].index)
            }
        }

        // After the chart is loaded, mark it
        arrayRemoveItem(chartInfo.asyncLoad,'chart');

    });
}

// rendercharts
function renderCharts(chartLists, isDemo) {

    // no chart
    if(chartLists == undefined){
        return;
    }

    for (let i = 0; i < chartLists.length; i++) {
        let chart = chartLists[i]

        if (isDemo) {
            chartInfo.chartparam.insertToStore({ chart_id: chart.chart_id, chartOptions: chart.chartOptions })
        }

        let chart_id = chart.chart_id
        let chart_id_c = chart_id + '_c'
        let modelChartShowHTML =
            '<div id="${id}"class="luckysheet-modal-dialog luckysheet-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="luckysheet-modal-dialog-resize"><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt"data-type="lt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt"data-type="mt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm"data-type="lm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm"data-type="rm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt"data-type="rt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb"data-type="lb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb"data-type="mb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="luckysheet-modal-dialog-controll"><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-max"role="butluckysheet_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="luckysheet-modal-dialog-content">${content}</div></div>'

        let $t = $(
            replaceHtml(modelChartShowHTML, {
                id: chart_id_c,
                addclass: 'luckysheet-data-visualization-chart',
                title: '图表生成',
                content: ''
            })
        ).appendTo($('.luckysheet-cell-main'))

        setChartMoveableEffect($t);

        $(`#${chart_id_c}`).children('.luckysheet-modal-dialog-content')[0].id = chart_id

        let container = document.getElementById(chart_id_c)


        let chart_json
        chart_json = chartInfo.chartparam.getChartJson(chart.chart_id)

        chartInfo.chartparam.renderChart({ chart_id: chart.chart_id, chartOptions: chart_json })
        chartInfo.currentChart = chart_json

        //处理区域高亮框参数，当前页中，只有当前的图表的needRangShow为true,其他为false
        showNeedRangeShow(chart_id);

        // delete current chart
        $(`#${chart_id}_c .luckysheet-modal-controll-del`).click(function (e) {
            delChart(chart_id)
        })

        // edit current chart
        $(`#${chart_id}_c .luckysheet-modal-controll-update`).click(function (e) {
            showChartSettingComponent()
        })

        $t.children('.luckysheet-modal-dialog-content').mousedown(function (e) {
            if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
                //当前图表显示区域高亮
                showNeedRangeShow(chart_id);
            }
            e.stopPropagation()
        })
        $t.mousedown(function (e) {  // move chart

                if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
                    //当前图表显示区域高亮
                    showNeedRangeShow(chart_id);
                    setluckysheet_scroll_status(true);

                    //允许拖动渲染框
                    if (
                        !$(e.target).is(".luckysheet-modal-dialog-controll") &&
                        !$(e.target).is(".luckysheet-modal-controll-btn") &&
                        !$(e.target).is("i")
                    ) {
                        // Debounce
                        chartInfo.chartparam.luckysheetCurrentChartMoveTimeout = setTimeout(
                            function () {
                                chartInfo.chartparam.luckysheetCurrentChartMove = true;
                            },
                            100
                        );
                    }

                    var toffset = chartInfo.chartparam.luckysheetCurrentChartMoveObj.offset();
                    var tpsition = chartInfo.chartparam.luckysheetCurrentChartMoveObj.position();
                    //luckysheetCurrentChartMoveXy: [鼠标点相对chart框的距离X方向，鼠标点相对chart框的距离Y方向，chart框相对cell-main的距离X方向，chart框相对cell-main的距离Y方向，水平滚动条的位置，垂直滚动条的位置]
                    chartInfo.chartparam.luckysheetCurrentChartMoveXy = [
                        e.pageX - toffset.left,
                        e.pageY - toffset.top,
                        tpsition.left,
                        tpsition.top,
                        $("#luckysheet-scrollbar-x").scrollLeft(),
                        $("#luckysheet-scrollbar-y").scrollTop()
                    ];
                    chartInfo.chartparam.luckysheetCurrentChartMoveWinH = $(
                        "#luckysheet-cell-main"
                    )[0].scrollHeight;
                    chartInfo.chartparam.luckysheetCurrentChartMoveWinW = $(
                        "#luckysheet-cell-main"
                    )[0].scrollWidth;

                    if (
                        !$(e.target).hasClass("luckysheet-mousedown-cancel") &&
                        $(e.target).filter("[class*='sp-palette']").length == 0 &&
                        $(e.target).filter("[class*='sp-thumb']").length == 0 &&
                        $(e.target).filter("[class*='sp-']").length == 0
                    ) {
                        $("#luckysheet-rightclick-menu").hide();
                        $("#luckysheet-cols-h-hover").hide();
                        $("#luckysheet-cols-menu-btn").hide();
                        $("#luckysheet-rightclick-menu").hide();
                        $(
                            "#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu"
                        ).hide();
                        $(
                            "body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu"
                        ).hide();

                    }

                    e.stopPropagation();

                }

            }).find(".luckysheet-modal-dialog-resize-item")
            .mousedown(function (e) {
                if (chartInfo.chartparam.luckysheetCurrentChartActive) {
                    chartInfo.chartparam.luckysheetCurrentChartResize = $(this).data("type"); //开始状态resize

                    var mouse = mouseposition(e.pageX, e.pageY),
                        scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
                        scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
                    var x = mouse[0] + scrollLeft;
                    var y = mouse[1] + scrollTop;
                    var position = chartInfo.chartparam.luckysheetCurrentChartResizeObj.position();
                    //参数：x,y:鼠标位置，$t.width(), $t.height(): chart框宽高， position.left + scrollLeft, position.top + scrollTop ：chart框位置 ，scrollLeft, scrollTop：滚动条位置
                    chartInfo.chartparam.luckysheetCurrentChartResizeXy = [
                        x,
                        y,
                        $t.width(),
                        $t.height(),
                        position.left + scrollLeft,
                        position.top + scrollTop,
                        scrollLeft,
                        scrollTop
                    ];
                    chartInfo.chartparam.luckysheetCurrentChartResizeWinH = $(
                        "#luckysheet-cell-main"
                    )[0].scrollHeight;
                    chartInfo.chartparam.luckysheetCurrentChartResizeWinW = $(
                        "#luckysheet-cell-main"
                    )[0].scrollWidth;

                    chartInfo.chartparam.luckysheetCurrentChart = chart_id;

                    e.stopPropagation();

                }
            })


        let width = chart.width
        let height = chart.height
        let left = chart.left
        let top = chart.top
        container.style.width = width + 'px'
        container.style.height = height + 'px'
        container.style.position = 'absolute'
        container.style.background = '#fff'
        container.style.left = left + 'px'
        container.style.top = top + 'px'
        container.style.zIndex = chartInfo.zIndex ? chartInfo.zIndex : 15
        chartInfo.zIndex++

    }
}

function jfrefreshchartall(flowdata1, r_st, r_ed, c_st, c_ed) {
    let chart = chartInfo.currentChart
    if (!chart) {
        return
    }
    if (chart.rangeArray.length == 1) {
        var row = chart.rangeArray[0].row;
        var column = chart.rangeArray[0].column;
        //不在范围内的不更新
        if (
            r_st > row[1] ||
            r_ed < row[0] ||
            c_st > column[1] ||
            c_ed < column[0]
        ) {
            return
        }
        //根据原有的范围取得数据
        var luckysheetgetcellrange = formula.getcellrange(
            chart.rangeTxt
        );
        var sheetIndex =
            luckysheetgetcellrange.sheetIndex == -1
                ? 0
                : luckysheetgetcellrange.sheetIndex; //sheetIndex为-1时，转化为0

        var selection = {
            row: luckysheetgetcellrange.row,
            column: luckysheetgetcellrange.column,
            dataSheetIndex: sheetIndex
        }; //数组
        var getcelldata = luckysheet_getcelldata(chart.rangeTxt);

        if (
            typeof getcelldata === "object" &&
            getcelldata.length != 0 &&
            getcelldata.data.length != null
        ) {
            //getcelldata有值，且不为空数组 && getcelldata.data为二维数组
            var chartData = getcelldata.data;
            chartInfo.chartparam.changeChartCellData(chart.chart_id, chartData);
        }
    }
}

function chart_selection() {
    return {
        create: function () {
            var chart_json = chartInfo.currentChart

            if (chart_json.rangeArray.length > 1) {
                return
            }

            $('#luckysheet-chart-rangeShow').empty()
            $('#luckysheet-cell-selected-boxs').hide()
            $('#luckysheet-cell-selected-focus').hide()
            $('#luckysheet-rows-h-selected').empty()
            $('#luckysheet-cols-h-selected').empty()
            $('#luckysheet-row-count-show').hide()
            $('#luckysheet-column-count-show').hide()

            var st_r = chart_json.rangeArray[0].row[0]
            var st_c = chart_json.rangeArray[0].column[0]

            var rangeSplitArray = chart_json.rangeSplitArray

            //首行是否标题
            var rangeRowCheck = chart_json.rangeRowCheck

            if (rangeRowCheck.exits) {
                var chart_rowtitle_html = getRangeShowHtml(
                    'rowtitle',
                    rangeSplitArray.rowtitle.row[0] + st_r,
                    rangeSplitArray.rowtitle.row[1] + st_r,
                    rangeSplitArray.rowtitle.column[0] + st_c,
                    rangeSplitArray.rowtitle.column[1] + st_c
                )
            } else {
                var chart_rowtitle_html = ''
            }

            //首列是否标题
            var rangeColCheck = chart_json.rangeColCheck

            if (rangeColCheck.exits) {
                var chart_coltitle_html = getRangeShowHtml(
                    'coltitle',
                    rangeSplitArray.coltitle.row[0] + st_r,
                    rangeSplitArray.coltitle.row[1] + st_r,
                    rangeSplitArray.coltitle.column[0] + st_c,
                    rangeSplitArray.coltitle.column[1] + st_c
                )
            } else {
                var chart_coltitle_html = ''
            }

            //内容块
            var chart_content_html = getRangeShowHtml(
                'content',
                rangeSplitArray.content.row[0] + st_r,
                rangeSplitArray.content.row[1] + st_r,
                rangeSplitArray.content.column[0] + st_c,
                rangeSplitArray.content.column[1] + st_c
            )

            $('#luckysheet-chart-rangeShow').append(
                chart_rowtitle_html + chart_coltitle_html + chart_content_html
            )

            function getRangeShowHtml(type, r1, r2, c1, c2) {
                var visibledatarow = getvisibledatarow()
                var visibledatacolumn = getvisibledatacolumn()

                var row = visibledatarow[r2],
                    row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1]
                var col = visibledatacolumn[c2],
                    col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1]

                if (type == 'rowtitle') {
                    var color = '#C65151'
                }

                if (type == 'coltitle') {
                    var color = '#9667C0'
                }

                if (type == 'content') {
                    var color = '#4970D1'
                }

                var html =
                    '<div id="luckysheet-chart-rangeShow-' +
                    type +
                    '" style="left: ' +
                    col_pre +
                    'px;width: ' +
                    (col - col_pre - 1) +
                    'px;top: ' +
                    row_pre +
                    'px;height: ' +
                    (row - row_pre - 1) +
                    'px;border: none;margin: 0;position: absolute;z-index: 14;">' +
                    '<div class="luckysheet-chart-rangeShow-move" data-type="top" style="height: 2px;border-top: 2px solid #fff;border-bottom: 2px solid #fff;background: ' +
                    color +
                    ';position: absolute;left: 0;right: 0;top: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-move" data-type="right" style="width: 2px;border-left: 2px solid #fff;border-right: 2px solid #fff;background: ' +
                    color +
                    ';position: absolute;top: 0;bottom: 0;right: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-move" data-type="bottom" style="height: 2px;border-top: 2px solid #fff;border-bottom: 2px solid #fff;background: ' +
                    color +
                    ';position: absolute;left: 0;right: 0;bottom: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-move" data-type="left" style="width: 2px;border-left: 2px solid #fff;border-right: 2px solid #fff;background: ' +
                    color +
                    ';position: absolute;top: 0;bottom: 0;left: -2px;z-index: 18;opacity: 0.9;cursor: move;"></div>' +
                    '<div style="border: 2px solid #85c0fc;background: ' +
                    color +
                    ';position: absolute;top: 0;right: 0;bottom: 0;left: 0;z-index: 15;opacity: 0.1;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-resize" data-type="lt" style="width: 6px;height: 6px;border: 1px solid #fff;background: ' +
                    color +
                    ';position: absolute;left: -3px;top: -3px;z-index: 19;cursor: se-resize;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-resize" data-type="rt" style="width: 6px;height: 6px;border: 1px solid #fff;background: ' +
                    color +
                    ';position: absolute;right: -3px;top: -3px;z-index: 19;cursor: ne-resize;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-resize" data-type="lb" style="width: 6px;height: 6px;border: 1px solid #fff;background: ' +
                    color +
                    ';position: absolute;left: -3px;bottom: -3px;z-index: 19;cursor: ne-resize;"></div>' +
                    '<div class="luckysheet-chart-rangeShow-resize" data-type="rb" style="width: 6px;height: 6px;border: 1px solid #fff;background: ' +
                    color +
                    ';position: absolute;right: -3px;bottom: -3px;z-index: 19;cursor: se-resize;"></div>' +
                    '</div>'

                return html
            }
        },
        rangeMove: false,
        rangeMovexy: null,
        rangeMoveIndex: null,
        rangeMoveObj: null,
        rangeMoveDraging: function (event, sheetBarHeight, statisticBarHeight) {
            var chart_json = chartInfo.currentChart
            var st_r = chart_json.rangeArray[0].row[0]
            var st_c = chart_json.rangeArray[0].column[0]
            var rangeRowCheck = chart_json.rangeRowCheck
            var rangeColCheck = chart_json.rangeColCheck
            var rangeSplitArray = chart_json.rangeSplitArray

            var mouse = mouseposition(event.pageX, event.pageY)
            var scrollLeft = $('#luckysheet-cell-main').scrollLeft()
            var scrollTop = $('#luckysheet-cell-main').scrollTop()

            var x = mouse[0] + scrollLeft
            var y = mouse[1] + scrollTop

            var winH =
                $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight,
                winW = $(window).width() + scrollLeft

            var rowLocation = _rowLocation(y),
                row_index = rowLocation[2]
            var colLocation = _colLocation(x),
                col_index = colLocation[2]

            var visibledatarow = getvisibledatarow()
            var visibledatacolumn = getvisibledatacolumn()

            var $id = chartInfo.chart_selection.rangeMoveObj.attr('id')

            if ($id == 'luckysheet-chart-rangeShow-content') {
                //行
                var row_s =
                    chartInfo.chart_selection.rangeMoveIndex[0] -
                    chartInfo.chart_selection.rangeMovexy[0] +
                    row_index

                if (rangeRowCheck.exits) {
                    if (row_s < st_r + rangeRowCheck.range[1] + 1 || y < 0) {
                        row_s = st_r + rangeRowCheck.range[1] + 1
                    }
                } else {
                    if (row_s < 0 || y < 0) {
                        row_s = 0
                    }
                }

                var row_e =
                    rangeSplitArray.content.row[1] - rangeSplitArray.content.row[0] + row_s

                if (row_e >= visibledatarow.length - 1 || y > winH) {
                    row_s =
                        visibledatarow.length -
                        1 -
                        rangeSplitArray.content.row[1] +
                        rangeSplitArray.content.row[0]
                    row_e = visibledatarow.length - 1
                }

                //列
                var col_s =
                    chartInfo.chart_selection.rangeMoveIndex[1] -
                    chartInfo.chart_selection.rangeMovexy[1] +
                    col_index
                if (rangeColCheck.exits) {
                    if (col_s < st_c + rangeColCheck.range[1] + 1 || x < 0) {
                        col_s = st_c + rangeColCheck.range[1] + 1
                    }
                } else {
                    if (col_s < 0 || x < 0) {
                        col_s = 0
                    }
                }

                var col_e =
                    rangeSplitArray.content.column[1] -
                    rangeSplitArray.content.column[0] +
                    col_s

                if (col_e >= visibledatacolumn.length - 1 || x > winW) {
                    col_s =
                        visibledatacolumn.length -
                        1 -
                        rangeSplitArray.content.column[1] +
                        rangeSplitArray.content.column[0]
                    col_e = visibledatacolumn.length - 1
                }

                //更新
                if (rangeRowCheck.exits && rangeColCheck.exits) {
                    chart_json.rangeArray = [{ row: [st_r, row_e], column: [st_c, col_e] }]
                    chart_json.rangeSplitArray.range = {
                        row: [st_r, row_e],
                        column: [st_c, col_e]
                    }

                    chart_json.rangeSplitArray.content = {
                        row: [row_s - st_r, row_e - st_r],
                        column: [col_s - st_c, col_e - st_c]
                    }

                    chart_json.rangeSplitArray.rowtitle = {
                        row: chart_json.rangeSplitArray.rowtitle.row,
                        column: [col_s - st_c, col_e - st_c]
                    }

                    chart_json.rangeSplitArray.coltitle = {
                        row: [row_s - st_r, row_e - st_r],
                        column: chart_json.rangeSplitArray.coltitle.column
                    }
                } else if (rangeRowCheck.exits) {
                    chart_json.rangeArray = [{ row: [st_r, row_e], column: [col_s, col_e] }]
                    chart_json.rangeSplitArray.range = {
                        row: [st_r, row_e],
                        column: [col_s, col_e]
                    }

                    chart_json.rangeSplitArray.content = {
                        row: [row_s - st_r, row_e - st_r],
                        column: chart_json.rangeSplitArray.content.column
                    }
                } else if (rangeColCheck.exits) {
                    chart_json.rangeArray = [{ row: [row_s, row_e], column: [st_c, col_e] }]
                    chart_json.rangeSplitArray.range = {
                        row: [row_s, row_e],
                        column: [st_c, col_e]
                    }

                    chart_json.rangeSplitArray.content = {
                        row: chart_json.rangeSplitArray.content.row,
                        column: [col_s - st_c, col_e - st_c]
                    }
                } else {
                    chart_json.rangeArray = [
                        { row: [row_s, row_e], column: [col_s, col_e] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [row_s, row_e],
                        column: [col_s, col_e]
                    }
                }
            } else if ($id == 'luckysheet-chart-rangeShow-rowtitle') {
                //列
                var col_s =
                    chartInfo.chart_selection.rangeMoveIndex[1] -
                    chartInfo.chart_selection.rangeMovexy[1] +
                    col_index

                if (rangeColCheck.exits) {
                    if (col_s < st_c + rangeColCheck.range[1] + 1 || x < 0) {
                        col_s = st_c + rangeColCheck.range[1] + 1
                    }
                } else {
                    if (col_s < 0 || x < 0) {
                        col_s = 0
                    }
                }

                var col_e =
                    rangeSplitArray.rowtitle.column[1] -
                    rangeSplitArray.rowtitle.column[0] +
                    col_s

                if (col_e >= visibledatacolumn.length - 1 || x > winW) {
                    col_s =
                        visibledatacolumn.length -
                        1 -
                        rangeSplitArray.rowtitle.column[1] +
                        rangeSplitArray.rowtitle.column[0]
                    col_e = visibledatacolumn.length - 1
                }

                //更新
                if (rangeColCheck.exits) {
                    chart_json.rangeArray = [
                        { row: chart_json.rangeArray[0].row, column: [st_c, col_e] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: chart_json.rangeArray[0].row,
                        column: [st_c, col_e]
                    }

                    chart_json.rangeSplitArray.rowtitle = {
                        row: chart_json.rangeSplitArray.rowtitle.row,
                        column: [col_s - st_c, col_e - st_c]
                    }
                    chart_json.rangeSplitArray.content = {
                        row: chart_json.rangeSplitArray.content.row,
                        column: [col_s - st_c, col_e - st_c]
                    }
                } else {
                    chart_json.rangeArray = [
                        { row: chart_json.rangeArray[0].row, column: [col_s, col_e] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: chart_json.rangeArray[0].row,
                        column: [col_s, col_e]
                    }
                }
            } else if ($id == 'luckysheet-chart-rangeShow-coltitle') {
                //行
                var row_s =
                    chartInfo.chart_selection.rangeMoveIndex[0] -
                    chartInfo.chart_selection.rangeMovexy[0] +
                    row_index
                if (rangeRowCheck.exits) {
                    if (row_s < st_r + rangeRowCheck.range[1] + 1 || y < 0) {
                        row_s = st_r + rangeRowCheck.range[1] + 1
                    }
                } else {
                    if (row_s < 0 || y < 0) {
                        row_s = 0
                    }
                }

                //更新
                var row_e =
                    rangeSplitArray.coltitle.row[1] -
                    rangeSplitArray.coltitle.row[0] +
                    row_s

                if (row_e >= visibledatarow.length - 1 || y > winH) {
                    row_s =
                        visibledatarow.length -
                        1 -
                        rangeSplitArray.coltitle.row[1] +
                        rangeSplitArray.coltitle.row[0]
                    row_e = visibledatarow.length - 1
                }

                if (rangeRowCheck.exits) {
                    chart_json.rangeArray = [
                        { row: [st_r, row_e], column: chart_json.rangeArray[0].column }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [st_r, row_e],
                        column: chart_json.rangeArray[0].column
                    }

                    chart_json.rangeSplitArray.coltitle = {
                        row: [row_s - st_r, row_e - st_r],
                        column: chart_json.rangeSplitArray.coltitle.column
                    }
                    chart_json.rangeSplitArray.content = {
                        row: [row_s - st_r, row_e - st_r],
                        column: chart_json.rangeSplitArray.content.column
                    }
                } else {
                    chart_json.rangeArray = [
                        { row: [row_s, row_e], column: chart_json.rangeArray[0].column }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [row_s, row_e],
                        column: chart_json.rangeArray[0].column
                    }
                }
            }

            chartInfo.chart_selection.create()
        },
        rangeMoveDragged: function () {
            chartInfo.chart_selection.rangeMove = false

            var updateJson = chartInfo.currentChart

            updateJson.rangeTxt = getRangetxt(
                chartInfo.currentSheetIndex,
                updateJson.rangeArray[0],
                chartInfo.currentSheetIndex
            )
            updateJson.chartData = getdatabyselection(
                updateJson.rangeArray[0],
                chartInfo.currentSheetIndex
            )
            // 渲染
            chartInfo.changeChartRange(updateJson.chart_id, updateJson.chartData, updateJson.rangeArray, updateJson.rangeTxt)
        },
        rangeResize: false,
        rangeResizexy: null,
        rangeResizeIndex: null,
        rangeResizeObj: null,
        rangeResizeDraging: function (event, sheetBarHeight, statisticBarHeight) {
            var chart_json = chartInfo.currentChart

            var st_r = chart_json.rangeArray[0].row[0]
            var st_c = chart_json.rangeArray[0].column[0]
            var rangeRowCheck = chart_json.rangeRowCheck
            var rangeColCheck = chart_json.rangeColCheck
            var rangeSplitArray = chart_json.rangeSplitArray

            var mouse = mouseposition(event.pageX, event.pageY)
            var scrollLeft = $('#luckysheet-cell-main').scrollLeft()
            var scrollTop = $('#luckysheet-cell-main').scrollTop()

            var x = mouse[0] + scrollLeft
            var y = mouse[1] + scrollTop

            var winH =
                $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight,
                winW = $(window).width() + scrollLeft

            var rowLocation = _rowLocation(y),
                row_index = rowLocation[2]
            var colLocation = _colLocation(x),
                col_index = colLocation[2]

            var visibledatarow = getvisibledatarow()
            var visibledatacolumn = getvisibledatacolumn()

            var $id = chartInfo.chart_selection.rangeResizeObj.attr('id')

            if ($id == 'luckysheet-chart-rangeShow-content') {
                var r1, r2, c1, c2

                if (chartInfo.chart_selection.rangeResize == 'lt') {
                    r1 = chartInfo.chart_selection.rangeResizeIndex.row[0]
                    c1 = chartInfo.chart_selection.rangeResizeIndex.column[0]

                    r2 = chartInfo.chart_selection.rangeResizeIndex.row[1]
                    c2 = chartInfo.chart_selection.rangeResizeIndex.column[1]
                } else if (chartInfo.chart_selection.rangeResize == 'lb') {
                    r1 = chartInfo.chart_selection.rangeResizeIndex.row[1]
                    c1 = chartInfo.chart_selection.rangeResizeIndex.column[0]

                    r2 = chartInfo.chart_selection.rangeResizeIndex.row[0]
                    c2 = chartInfo.chart_selection.rangeResizeIndex.column[1]
                } else if (chartInfo.chart_selection.rangeResize == 'rt') {
                    r1 = chartInfo.chart_selection.rangeResizeIndex.row[0]
                    c1 = chartInfo.chart_selection.rangeResizeIndex.column[1]

                    r2 = chartInfo.chart_selection.rangeResizeIndex.row[1]
                    c2 = chartInfo.chart_selection.rangeResizeIndex.column[0]
                } else if (chartInfo.chart_selection.rangeResize == 'rb') {
                    r1 = chartInfo.chart_selection.rangeResizeIndex.row[1]
                    c1 = chartInfo.chart_selection.rangeResizeIndex.column[1]

                    r2 = chartInfo.chart_selection.rangeResizeIndex.row[0]
                    c2 = chartInfo.chart_selection.rangeResizeIndex.column[0]
                }

                //行
                if (rangeRowCheck.exits) {
                    var row_s = r1 - chartInfo.chart_selection.rangeResizexy[0] + row_index

                    if (row_s < st_r + rangeRowCheck.range[1] + 1 || y < 0) {
                        row_s = st_r + rangeRowCheck.range[1] + 1
                    } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                        row_s = visibledatarow.length - 1
                    }
                } else {
                    var row_s = st_r - chartInfo.chart_selection.rangeResizexy[0] + row_index

                    if (row_s < 0 || y < 0) {
                        row_s = 0
                    } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                        row_s = visibledatarow.length - 1
                    }
                }

                //列
                if (rangeColCheck.exits) {
                    var col_s = c1 - chartInfo.chart_selection.rangeResizexy[1] + col_index

                    if (col_s < st_c + rangeColCheck.range[1] + 1 || x < 0) {
                        col_s = st_c + rangeColCheck.range[1] + 1
                    } else if (col_s >= visibledatacolumn.length - 1 || x > winW) {
                        col_s = visibledatacolumn.length - 1
                    }
                } else {
                    var col_s = st_c - chartInfo.chart_selection.rangeResizexy[1] + col_index

                    if (col_s < 0 || x < 0) {
                        col_s = 0
                    } else if (col_s >= visibledatacolumn.length - 1 || x > winW) {
                        col_s = visibledatacolumn.length - 1
                    }
                }

                var obj_r1, obj_r2, obj_c1, obj_c2

                if (row_s > r2) {
                    obj_r1 = r2
                    obj_r2 = row_s
                } else {
                    obj_r1 = row_s
                    obj_r2 = r2
                }

                if (col_s > c2) {
                    obj_c1 = c2
                    obj_c2 = col_s
                } else {
                    obj_c1 = col_s
                    obj_c2 = c2
                }

                if (!rangeRowCheck.exits && !rangeColCheck.exits) {
                    chart_json.rangeArray = [
                        { row: [obj_r1, obj_r2], column: [obj_c1, obj_c2] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [obj_r1, obj_r2],
                        column: [obj_c1, obj_c2]
                    }
                } else {
                    chart_json.rangeArray = [
                        { row: [st_r, obj_r2], column: [st_c, obj_c2] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [st_r, obj_r2],
                        column: [st_c, obj_c2]
                    }

                    chart_json.rangeSplitArray.content = {
                        row: [obj_r1 - st_r, obj_r2 - st_r],
                        column: [obj_c1 - st_c, obj_c2 - st_c]
                    }

                    if (rangeRowCheck.exits) {
                        chart_json.rangeSplitArray.rowtitle = {
                            row: chart_json.rangeSplitArray.rowtitle.row,
                            column: [obj_c1 - st_c, obj_c2 - st_c]
                        }
                    }

                    if (rangeColCheck.exits) {
                        chart_json.rangeSplitArray.coltitle = {
                            row: [obj_r1 - st_r, obj_r2 - st_r],
                            column: chart_json.rangeSplitArray.coltitle.column
                        }
                    }
                }
            } else if ($id == 'luckysheet-chart-rangeShow-rowtitle') {
                var c1, c2

                if (
                    chartInfo.chart_selection.rangeResize == 'lt' ||
                    chartInfo.chart_selection.rangeResize == 'lb'
                ) {
                    c1 = chartInfo.chart_selection.rangeResizeIndex.column[0]
                    c2 = chartInfo.chart_selection.rangeResizeIndex.column[1]
                } else if (
                    chartInfo.chart_selection.rangeResize == 'rt' ||
                    chartInfo.chart_selection.rangeResize == 'rb'
                ) {
                    c1 = chartInfo.chart_selection.rangeResizeIndex.column[1]
                    c2 = chartInfo.chart_selection.rangeResizeIndex.column[0]
                }

                //列
                if (rangeColCheck.exits) {
                    var col_s = c1 - chartInfo.chart_selection.rangeResizexy[1] + col_index

                    if (col_s < st_c + rangeColCheck.range[1] + 1 || x < 0) {
                        col_s = st_c + rangeColCheck.range[1] + 1
                    } else if (col_s >= visibledatacolumn.length - 1 || x > winW) {
                        col_s = visibledatacolumn.length - 1
                    }
                } else {
                    var col_s = st_c - chartInfo.chart_selection.rangeResizexy[1] + col_index

                    if (col_s < 0 || x < 0) {
                        col_s = 0
                    } else if (col_s >= visibledatacolumn.length - 1 || x > winW) {
                        col_s = visibledatacolumn.length - 1
                    }
                }

                var obj_c1, obj_c2

                if (col_s > c2) {
                    obj_c1 = c2
                    obj_c2 = col_s
                } else {
                    obj_c1 = col_s
                    obj_c2 = c2
                }

                //更新
                if (!rangeColCheck.exits) {
                    chart_json.rangeArray = [
                        { row: chart_json.rangeArray[0].row, column: [obj_c1, obj_c2] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: chart_json.rangeArray[0].row,
                        column: [obj_c1, obj_c2]
                    }
                } else {
                    chart_json.rangeArray = [
                        { row: chart_json.rangeArray[0].row, column: [st_c, obj_c2] }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: chart_json.rangeArray[0].row,
                        column: [st_c, obj_c2]
                    }

                    chart_json.rangeSplitArray.rowtitle = {
                        row: chart_json.rangeSplitArray.rowtitle.row,
                        column: [obj_c1 - st_c, obj_c2 - st_c]
                    }
                    chart_json.rangeSplitArray.content = {
                        row: chart_json.rangeSplitArray.content.row,
                        column: [obj_c1 - st_c, obj_c2 - st_c]
                    }
                }
            } else if ($id == 'luckysheet-chart-rangeShow-coltitle') {
                var r1, r2

                if (
                    chartInfo.chart_selection.rangeResize == 'lt' ||
                    chartInfo.chart_selection.rangeResize == 'rt'
                ) {
                    r1 = chartInfo.chart_selection.rangeResizeIndex.row[0]
                    r2 = chartInfo.chart_selection.rangeResizeIndex.row[1]
                } else if (
                    chartInfo.chart_selection.rangeResize == 'lb' ||
                    chartInfo.chart_selection.rangeResize == 'rb'
                ) {
                    r1 = chartInfo.chart_selection.rangeResizeIndex.row[1]
                    r2 = chartInfo.chart_selection.rangeResizeIndex.row[0]
                }

                //行
                if (rangeRowCheck.exits) {
                    var row_s = r1 - chartInfo.chart_selection.rangeResizexy[0] + row_index

                    if (row_s < st_r + rangeRowCheck.range[1] + 1 || y < 0) {
                        row_s = st_r + rangeRowCheck.range[1] + 1
                    } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                        row_s = visibledatarow.length - 1
                    }
                } else {
                    var row_s = st_r - chartInfo.chart_selection.rangeResizexy[0] + row_index

                    if (row_s < 0 || y < 0) {
                        row_s = 0
                    } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                        row_s = visibledatarow.length - 1
                    }
                }

                var obj_r1, obj_r2

                if (row_s > r2) {
                    obj_r1 = r2
                    obj_r2 = row_s
                } else {
                    obj_r1 = row_s
                    obj_r2 = r2
                }

                //更新
                if (!rangeRowCheck.exits) {
                    chart_json.rangeArray = [
                        { row: [obj_r1, obj_r2], column: chart_json.rangeArray[0].column }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [obj_r1, obj_r2],
                        column: chart_json.rangeArray[0].column
                    }
                } else {
                    chart_json.rangeArray = [
                        { row: [st_r, obj_r2], column: chart_json.rangeArray[0].column }
                    ]
                    chart_json.rangeSplitArray.range = {
                        row: [st_r, obj_r2],
                        column: chart_json.rangeArray[0].column
                    }

                    chart_json.rangeSplitArray.coltitle = {
                        row: [obj_r1 - st_r, obj_r2 - st_r],
                        column: chart_json.rangeSplitArray.coltitle.column
                    }
                    chart_json.rangeSplitArray.content = {
                        row: [obj_r1 - st_r, obj_r2 - st_r],
                        column: chart_json.rangeSplitArray.content.column
                    }
                }
            }

            chartInfo.chart_selection.create()
        },
        rangeResizeDragged: function () {
            chartInfo.chart_selection.rangeResize = null
            var updateJson = chartInfo.currentChart

            updateJson.rangeTxt = getRangetxt(
                chartInfo.currentSheetIndex,
                updateJson.rangeArray[0],
                chartInfo.currentSheetIndex
            )
            updateJson.chartData = getdatabyselection(
                updateJson.rangeArray[0],
                chartInfo.currentSheetIndex
            )
            // 渲染
            chartInfo.changeChartRange(updateJson.chart_id, updateJson.chartData, updateJson.rangeArray, updateJson.rangeTxt)

        }
    }
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
    jfgird_select_save[0].row_focus =shiftpositon_row;
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
    jfgird_select_save[0].column_focus = shiftpositon_col;
    luckysheet.setluckysheet_select_save(jfgird_select_save);

    chartInfo.luckysheet_shiftpositon = $.extend(true, {}, jfgird_select_save[0]);
    luckysheetMoveEndCell("right", "range", false, column_ed);
    jfgird_select_save = luckysheet.getluckysheet_select_save()

    var rangeArray = $.extend(true, [], jfgird_select_save);

    var rangeTxt = getRangetxt(chartInfo.currentSheetIndex, rangeArray[0], chartInfo.currentSheetIndex)


    let chartData = getdatabyselection()
    console.dir(chartData)

    let chart_id = generateRandomKey('chart')

    let chart_id_c = chart_id + '_c'

    let modelChartShowHTML =
        '<div id="${id}"class="luckysheet-modal-dialog luckysheet-modal-dialog-chart ${addclass}"tabindex="0"role="dialog"aria-labelledby=":41e"dir="ltr"><div class="luckysheet-modal-dialog-resize"><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lt"data-type="lt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mt"data-type="mt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lm"data-type="lm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rm"data-type="rm"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rt"data-type="rt"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-lb"data-type="lb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-mb"data-type="mb"></div><div class="luckysheet-modal-dialog-resize-item luckysheet-modal-dialog-resize-item-rb"data-type="rb"></div></div><div class="luckysheet-modal-dialog-controll"><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-update"role="button"tabindex="0"aria-label="修改图表"title="修改图表"><i class="fa fa-pencil"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-max"role="butluckysheet_chartIns_indexton"tabindex="0"aria-label="最大化"title="最大化"><i class="fa fa-window-maximize"aria-hidden="true"></i></span><span class="luckysheet-modal-controll-btn luckysheet-modal-controll-del"role="button"tabindex="0"aria-label="删除"title="删除"><i class="fa fa-trash"aria-hidden="true"></i></span></div><div class="luckysheet-modal-dialog-content">${content}</div></div>'

    let $t = $(
        replaceHtml(modelChartShowHTML, {
            id: chart_id_c,
            addclass: 'luckysheet-data-visualization-chart',
            title: '图表生成',
            content: ''
        })
    ).appendTo($('.luckysheet-cell-main'))

    let container = document.getElementById(chart_id_c)

    let { render, chart_json } = chartInfo.createChart($(`#${chart_id_c}`).children('.luckysheet-modal-dialog-content')[0], chartData, chart_id, rangeArray, rangeTxt)
    // chartInfo.currentChart = chart_json.chartOptions
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
    let sheetFile = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)];

    if (!sheetFile.chart) {
        sheetFile.chart = [];
    }
    sheetFile.chart.push({
        chart_id,
        width,
        height,
        left,
        top,
        sheetIndex: sheetFile.index
    })

    //处理区域高亮框参数，当前页中，只有当前的图表的needRangShow为true,其他为false
    showNeedRangeShow(chart_id);

    // delete current chart
    $(`#${chart_id}_c .luckysheet-modal-controll-del`).click(function (e) {
        delChart(chart_id)
    })

    setChartMoveableEffect($t);

    // edit current chart
    $(`#${chart_id}_c .luckysheet-modal-controll-update`).click(function (e) {
        showChartSettingComponent()
    })

    $t.children('.luckysheet-modal-dialog-content').mousedown(function (e) {
        if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
            //当前图表显示区域高亮
            showNeedRangeShow(chart_id);
        }
        e.stopPropagation()
    })
    $t.mousedown(function (e) {  //move chart

        if (!chartInfo.chartparam.luckysheetCurrentChartMaxState) {
            //当前图表显示区域高亮
            showNeedRangeShow(chart_id);
            setluckysheet_scroll_status(true);

            //允许拖动渲染框
            if (
                !$(e.target).is(".luckysheet-modal-dialog-controll") &&
                !$(e.target).is(".luckysheet-modal-controll-btn") &&
                !$(e.target).is("i")
            ) {
                // Debounce
                chartInfo.chartparam.luckysheetCurrentChartMoveTimeout = setTimeout(
                    function () {
                        chartInfo.chartparam.luckysheetCurrentChartMove = true;
                    },
                    100
                );
            }

            var toffset = chartInfo.chartparam.luckysheetCurrentChartMoveObj.offset();
            var tpsition = chartInfo.chartparam.luckysheetCurrentChartMoveObj.position();
            //luckysheetCurrentChartMoveXy: [鼠标点相对chart框的距离X方向，鼠标点相对chart框的距离Y方向，chart框相对cell-main的距离X方向，chart框相对cell-main的距离Y方向，水平滚动条的位置，垂直滚动条的位置]
            chartInfo.chartparam.luckysheetCurrentChartMoveXy = [
                e.pageX - toffset.left,
                e.pageY - toffset.top,
                tpsition.left,
                tpsition.top,
                $("#luckysheet-scrollbar-x").scrollLeft(),
                $("#luckysheet-scrollbar-y").scrollTop()
            ];
            chartInfo.chartparam.luckysheetCurrentChartMoveWinH = $(
                "#luckysheet-cell-main"
            )[0].scrollHeight;
            chartInfo.chartparam.luckysheetCurrentChartMoveWinW = $(
                "#luckysheet-cell-main"
            )[0].scrollWidth;

            if (
                !$(e.target).hasClass("luckysheet-mousedown-cancel") &&
                $(e.target).filter("[class*='sp-palette']").length == 0 &&
                $(e.target).filter("[class*='sp-thumb']").length == 0 &&
                $(e.target).filter("[class*='sp-']").length == 0
            ) {
                $("#luckysheet-rightclick-menu").hide();
                $("#luckysheet-cols-h-hover").hide();
                $("#luckysheet-cols-menu-btn").hide();
                $("#luckysheet-rightclick-menu").hide();
                $(
                    "#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu, #luckysheet-user-menu"
                ).hide();
                $(
                    "body > .luckysheet-filter-menu, body > .luckysheet-filter-submenu, body > .luckysheet-cols-menu"
                ).hide();

            }

            e.stopPropagation();

        }

    }).find(".luckysheet-modal-dialog-resize-item")
        .mousedown(function (e) {
            if (chartInfo.chartparam.luckysheetCurrentChartActive) {
                chartInfo.chartparam.luckysheetCurrentChartResize = $(this).data("type"); //开始状态resize

                var mouse = mouseposition(e.pageX, e.pageY),
                    scrollLeft = $("#luckysheet-scrollbar-x").scrollLeft(),
                    scrollTop = $("#luckysheet-scrollbar-y").scrollTop();
                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;
                var position = chartInfo.chartparam.luckysheetCurrentChartResizeObj.position();
                //参数：x,y:鼠标位置，$t.width(), $t.height(): chart框宽高， position.left + scrollLeft, position.top + scrollTop ：chart框位置 ，scrollLeft, scrollTop：滚动条位置
                chartInfo.chartparam.luckysheetCurrentChartResizeXy = [
                    x,
                    y,
                    $t.width(),
                    $t.height(),
                    position.left + scrollLeft,
                    position.top + scrollTop,
                    scrollLeft,
                    scrollTop
                ];
                chartInfo.chartparam.luckysheetCurrentChartResizeWinH = $(
                    "#luckysheet-cell-main"
                )[0].scrollHeight;
                chartInfo.chartparam.luckysheetCurrentChartResizeWinW = $(
                    "#luckysheet-cell-main"
                )[0].scrollWidth;

                chartInfo.chartparam.luckysheetCurrentChart = chart_id;

                e.stopPropagation();

            }
        })
}

/**
 * 设置图表可拖动区域高亮效果，鼠标经过可拖动区域时鼠标显示“十字”，不可拖动区域显示箭头
 * @param {JQuery} $container 图表的容器DIV
 */
function setChartMoveableEffect($container) {
  $container.find('.luckysheet-modal-dialog-content').hover(function () {
    $container.removeClass("chart-moveable");
  }, function () {
    $container.addClass("chart-moveable");
  });

  $container.hover(function () {
    $container.addClass("chart-moveable");
  }, function () {
    $container.removeClass("chart-moveable");
  });
}

// delete chart
function delChart(chart_id) {
    // delete container
    $(`.luckysheet-cell-main #${chart_id}_c`).remove()

    // Hide selected range
    hideAllNeedRangeShow()

    // delete storage
    let sheetFile = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)]
    let index = sheetFile.chart.findIndex(item => item.chart_id == chart_id)
    sheetFile.chart.splice(index, 1)
    // api call
    chartInfo.deleteChart(chart_id)
}

//设置某个图表的高亮区域状态为显示,处理当前页的所有图表，只取一个图表设置为显示，其他隐藏，其他页不管
function showNeedRangeShow(chart_id) {

    let chartLists = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)].chart;

    for (let chartId in chartLists) {
        // if (chartLists[chartId].sheetIndex == chartInfo.currentSheetIndex) {
        //当前sheet的图表先设置为false
        chartLists[chartId].needRangeShow = false
        if (chartLists[chartId].chart_id == chart_id) {
            chartLists[chartId].needRangeShow = true;

            chartInfo.currentChart = chartInfo.getChartJson(chart_id)
        }
        // }

    }

    //操作DOM当前图表选择区域高亮
    selectRangeBorderShow(chart_id)
}
//隐藏当前sheet所有的图表高亮区域
function hideAllNeedRangeShow() {
    let chartLists = chartInfo.luckysheetfile[getSheetIndex(chartInfo.currentSheetIndex)].chart;
    for (let chartId in chartLists) {
        // if (chartLists[chartId].sheetIndex == chartInfo.currentSheetIndex) {
        //当前sheet的图表设置为false
        chartLists[chartId].needRangeShow = false
        // }

    }

    //操作DOM 当前图表选择区域隐藏
    selectRangeBorderHide()
}

//选择区域高亮
function selectRangeBorderShow(chart_id) {

    let $t = $('#' + chart_id + '_c')

    // Highlight of data range
    chartInfo.chart_selection.create()

    chartInfo.chartparam.luckysheetCurrentChartActive = true
    chartInfo.chartparam.luckysheetCurrentChartMoveObj = $t
    chartInfo.chartparam.luckysheetCurrentChartResizeObj = $t
    chartInfo.chartparam.luckysheetCurrentChart = chart_id

    //luckysheet取cell-main，后续扩展到其他的用户自定义元素
    $('#luckysheet-cell-main')
        .find('.luckysheet-modal-dialog-chart .luckysheet-modal-dialog-resize')
        .hide()
    $('#luckysheet-cell-main')
        .find('.luckysheet-modal-dialog-chart .luckysheet-modal-dialog-controll')
        .hide()

    $t.css('z-index', chartInfo.chartparam.luckysheetCurrentChartZIndexRank++)
    $t.find('.luckysheet-modal-dialog-resize').show()
    $t.find('.luckysheet-modal-dialog-controll').show()

    if (
        ($('.chartSetting').is(':visible') || chartInfo.chartparam.luckysheet_chart_redo_click) &&
        chart_id != chartInfo.chartparam.luckysheetCurrentChart
    ) {
        // TODO: 第一次创建图表时候需要初始化数据选择框 qkSelection
        // generator.ini(chartMixConfig)
        $('body .luckysheet-cols-menu').hide()
    }

    // 切换到当前图表设置项
    chartInfo.currentChart = chartInfo.highlightChart(chart_id)
}

//选择区域高亮隐藏
function selectRangeBorderHide(settingShow) {

    $('#luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-resize, #luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-controll').hide()
    $('#luckysheet-cell-main').find('.luckysheet-datavisual-selection-set div').remove()
    chartInfo.chartparam.luckysheetCurrentChartActive = false

    $('#luckysheet-chart-rangeShow').empty()

    //标识：是否处理设置界面
    if (!settingShow && $('.chartSetting').is(':visible') && !isEditMode()) {
        hideChartSettingComponent()
    }
}

// 显示图表设置界面
function showChartSettingComponent(refresh, chart_id) {
    if (!$('.chartSetting').is(':visible')) {

        //隐藏设置界面
        $('.chartSetting').show();

        $('#luckysheet-cell-main').find('.luckysheet-datavisual-selection-set div').show()
        chartInfo.chartparam.luckysheetCurrentChartActive = true
        setTimeout(function () {
            luckysheetsizeauto()
        }, 0)
    }
}

// 隐藏图表设置界面
function hideChartSettingComponent(refresh) {
    if ($('.chartSetting').is(':visible')) {

        //隐藏设置界面
        $('.chartSetting').hide();
        //.luckysheet-modal-dialog-resize为图表显示框的缩放框，.luckysheet-modal-dialog-controll为显示框右边的控制按钮
        $('#luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-resize, #luckysheet-cell-main .luckysheet-modal-dialog-chart .luckysheet-modal-dialog-controll').hide()

        $('#luckysheet-cell-main').find('.luckysheet-datavisual-selection-set div').remove()

        chartInfo.chartparam.luckysheetCurrentChartActive = false
        if (!isEditMode() && !refresh) {

            setTimeout(function () {
                luckysheetsizeauto()
            }, 0)

        }

    }
}

// 隐藏其他sheet的图表，显示当前sheet的图表 chartMix 切换sheet页显示隐藏图表
function renderChartShow(index) {
    //传入index，图表显示隐藏
    selectRangeBorderHide('true') //隐藏数据高亮区域，随意传入一个字符串，表示不处理chartSetting界面

    const luckysheetfile = chartInfo.luckysheetfile;
    luckysheetfile.forEach((file) => {
        //切换当前页的所有图表都显示出来
        if (file.index == index) {

            const chartLists = file.chart || [];

            chartLists.forEach((chart) => {
                chart.isShow = true;
                $('#' + chart.chart_id + '_c').show();

                chartInfo.resizeChart(chart.chart_id)

                if (chart.needRangeShow == true) {
                    //一个sheet页只有一个图表高亮显示,//重要！因为在store了做了存储，所以能在此处找到对应图表设置显示隐藏
                    //操作DOM当前图表选择区域高亮
                    chartInfo.currentChart = chartInfo.getChartJson(chart.chart_id)
                    selectRangeBorderShow(chart.chart_id)
                }

            })

        }

        // 隐藏其他页的图表
        else {
            const chartLists = file.chart || [];

            chartLists.forEach((chart) => {
                chart.isShow = false;
                $('#' + chart.chart_id + '_c').hide();
            })
        }
    });

}

export { chart, createLuckyChart, hideAllNeedRangeShow, renderChartShow }
