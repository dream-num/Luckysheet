// 防止chart部分报错,从luckysheet-chartMix.js中迁移出luckysheet部分作为核心主体,关于设置界面的部分放到chartMix vue工程
// chart用到的各个变量
luckysheet.chartparam = {
    luckysheet_chart_point_config: null,
    luckysheetCurrentChartMove: false,
    luckysheetCurrentChartMoveTimeout: null,
    luckysheetCurrentChartResize: null,
    luckysheet_chart_rangefocus_timeout: null,
    luckysheet_chart_rangefocus: false,
    luckysheet_chart_data_select_state: false,
    luckysheetCurrentChartMoveObj: null,
    luckysheetCurrentChartMoveXy: [],
    luckysheetCurrentChartMoveWinH: null,
    luckysheetCurrentChartMoveWinW: null,
    luckysheetInsertChartTosheetChange: true,
    jgridCurrentChartSelection: null,
    luckysheetCurrentChartResizeObj: null,
    luckysheetCurrentChartResizeXy: null,
    luckysheetCurrentChartResizeWinH: null,
    luckysheetCurrentChartResizeWinW: null,
    luckysheet_chartIns_index: -1,
    luckysheetCurrentChartActive: false,

    jgridCurrentChartData: null,
    luckysheetcurrentChart: null,

    luckysheet_chart_redo_click: false,
    jgridCurrentChartType: null,
    luckysheetCurrentChartStyle: null,
    luckysheetCurrentChartCurrentType: null,

    luckysheetPreviousChart: '' //最近最新的图表json
}

// 初始化图表
luckysheet.chartInitial = function () {
    $('#luckysheetdatavisual').click(function () {
        
        // 未加入chartMix插件时返回
        if(!window.generateChart){
            luckysheet.tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示', "图表插件暂未加入"); 
            return;
        }
        //防止watch生效
        // generator.isFirstEditor = true;
        generator.ini(chartMixConfig)

        setTimeout(function () {
            generator.showChartSettingComponent('notRefresh') //此处不刷新，插入完图表再刷新
        }, 0)
        if (store.state.chartSetting.isqk) {
            setTimeout(function () {
                luckysheet.luckysheetsizeauto()
            }, 0)
        }

        // var chartAllType = 'highcharts|line|default'
        var chartAllType = 'echarts|line|default'

        //如果只选中一个单元格，则自动填充选取
        var luckysheet_select_save = luckysheet.getluckysheet_select_save()
        if (
            luckysheet_select_save.length == 1 &&
            luckysheet_select_save[0].row[0] == luckysheet_select_save[0].row[1] &&
            luckysheet_select_save[0].column[0] == luckysheet_select_save[0].column[1]
        ) {
            luckysheet.luckysheetMoveHighlightRange2('right', 'rangeOfSelect')

            luckysheet.luckysheetMoveHighlightRange2('down', 'rangeOfSelect')

            luckysheet_select_save = luckysheet.getluckysheet_select_save()
        }
        //处理右边的空白单元格，自动略过并修改选区 ---------------start
        var shiftpositon_row = -1

        var row_ed =
            luckysheet_select_save[0]['row'][1] - luckysheet_select_save[0]['row'][0]
        for (
            var r = luckysheet_select_save[0]['row'][0];
            r <= luckysheet_select_save[0]['row'][1];
            r++
        ) {
            for (
                var c = luckysheet_select_save[0]['column'][0];
                c <= luckysheet_select_save[0]['column'][1];
                c++
            ) {
                var value = luckysheet.getcellvalue(r, c, luckysheet.flowdata)
                //console.log("value,r,c",value,r,c);
                if (value != null && value.toString().length > 0) {
                    shiftpositon_row = r
                    break
                }
            }

            if (shiftpositon_row !== -1) {
                break
            }
        }

        if (shiftpositon_row == -1) {
            shiftpositon_row = 0
        }

        luckysheet_select_save[0]['row'] = [shiftpositon_row, shiftpositon_row]
        luckysheet.setluckysheet_select_save(luckysheet_select_save)

        luckysheet.luckysheet_shiftpositon = $.extend(true, {}, luckysheet_select_save[0])
        luckysheet.luckysheetMoveEndCell('down', 'range', false, row_ed)
        luckysheet_select_save = luckysheet.getluckysheet_select_save()

        var shiftpositon_col = -1
        var column_ed =
            luckysheet_select_save[0]['column'][1] - luckysheet_select_save[0]['column'][0]
        for (
            var c = luckysheet_select_save[0]['column'][0];
            c <= luckysheet_select_save[0]['column'][1];
            c++
        ) {
            for (
                var r = luckysheet_select_save[0]['row'][0];
                r <= luckysheet_select_save[0]['row'][1];
                r++
            ) {
                var value = luckysheet.getcellvalue(r, c, luckysheet.flowdata)
                if (value != null && value.toString().length > 0) {
                    shiftpositon_col = c
                    break
                }
            }

            if (shiftpositon_col !== -1) {
                break
            }
        }

        if (shiftpositon_col == -1) {
            shiftpositon_col = 0
        }

        luckysheet_select_save[0]['column'] = [shiftpositon_col, shiftpositon_col]
        luckysheet.setluckysheet_select_save(luckysheet_select_save)

        luckysheet.luckysheet_shiftpositon = $.extend(true, {}, luckysheet_select_save[0])
        luckysheet.luckysheetMoveEndCell('right', 'range', false, column_ed)
        luckysheet_select_save = luckysheet.getluckysheet_select_save()

        var dataSheetIndex = luckysheet.currentSheetIndex //当前sheet的原始索引
        var rangeArray = $.extend(true, [], luckysheet_select_save)

        //处理右边的空白单元格，自动略过并修改选区 ---------------end

        //根据选区来获取数据，########需要支持多选区取得的数据##################
        var chartData = luckysheet.getdatabyselection(
            luckysheet_select_save[0],
            dataSheetIndex
        )
        // 获取原始数据
        generator.chartData = chartData
        var rangeTxt = luckysheet.sheetmanage.getRangetxt(
            dataSheetIndex,
            rangeArray[0],
            dataSheetIndex
        )

        var chartTheme = 'default'

        var winw = $(window).width(),
            winh = $(window).height()
        var $cellmain = $('#luckysheet-cell-main')
        var scrollLeft = $cellmain.scrollLeft(),
            scrollTop = $cellmain.scrollTop()
        var myw = winw * 0.3,
            myh = winw * 0.3 * 0.618
        var myLeft = (winw - myw) / 3 + scrollLeft + Math.round(Math.random() * 10),
            myTop = (winh - myh) / 4 + scrollTop + Math.round(Math.random() * 10) //先计算好位置

        console.dir(JSON.stringify(chartData))
        console.dir(JSON.stringify(rangeArray))
        //luckysheet.insertChartTosheet放到insertNewChart中
        generator.insertNewChart(
            chartAllType,
            chartData,
            dataSheetIndex,
            rangeArray,
            rangeTxt,
            chartTheme,
            luckysheet.currentSheetIndex,
            myh,
            myw,
            myLeft,
            myTop
        )
        // setTimeout(function(){//暂时使用setTimeout解决watch第一次触发监听的问题
        // 	generator.isFirstEditor = false;
        // },1000);
    })
}

// 图表数据区域拖动修改
luckysheet.chart_selection = {
    create: function (chart_id) {
        var chart_json = store.state.chartSetting.chartList[chart_id]

        if (chart_json.rangeArray.length > 1) {
            return
        }

        $('#luckysheet-chart-rangeShow').empty()
        $('#luckysheet-cell-selected-boxs').hide()
        $('#luckysheet-cell-selected-focus').hide()
        $('#luckysheet-rows-h-selected').hide()
        $('#luckysheet-cols-h-selected').hide()
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
            var visibledatarow = luckysheet.getvisibledatarow()
            var visibledatacolumn = luckysheet.getvisibledatacolumn()

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
                '<div style="border: 2px solid #FC6666;background: ' +
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
        var chart_json = $.extend(
            true,
            {},
            store.state.chartSetting.chartList[store.state.chartSetting.chartCurrent]
        )
        var st_r = chart_json.rangeArray[0].row[0]
        var st_c = chart_json.rangeArray[0].column[0]
        var rangeRowCheck = chart_json.rangeRowCheck
        var rangeColCheck = chart_json.rangeColCheck
        var rangeSplitArray = chart_json.rangeSplitArray

        var mouse = luckysheet.mouseposition(event.pageX, event.pageY)
        var scrollLeft = $('#luckysheet-cell-main').scrollLeft()
        var scrollTop = $('#luckysheet-cell-main').scrollTop()

        var x = mouse[0] + scrollLeft
        var y = mouse[1] + scrollTop

        var winH =
            $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight,
            winW = $(window).width() + scrollLeft

        var rowLocation = luckysheet.rowLocation(y),
            row_index = rowLocation[2]
        var colLocation = luckysheet.colLocation(x),
            col_index = colLocation[2]

        var visibledatarow = luckysheet.getvisibledatarow()
        var visibledatacolumn = luckysheet.getvisibledatacolumn()

        var $id = luckysheet.chart_selection.rangeMoveObj.attr('id')

        if ($id == 'luckysheet-chart-rangeShow-content') {
            //行
            var row_s =
                luckysheet.chart_selection.rangeMoveIndex[0] -
                luckysheet.chart_selection.rangeMovexy[0] +
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
                luckysheet.chart_selection.rangeMoveIndex[1] -
                luckysheet.chart_selection.rangeMovexy[1] +
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
                luckysheet.chart_selection.rangeMoveIndex[1] -
                luckysheet.chart_selection.rangeMovexy[1] +
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
                luckysheet.chart_selection.rangeMoveIndex[0] -
                luckysheet.chart_selection.rangeMovexy[0] +
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

        //部分更新
        store.commit({
            type: 'updateChartItem',
            key: 'rangeArray',
            value: chart_json.rangeArray,
            chartId: chart_json.chart_id
        })
        store.commit({
            type: 'updateChartItem',
            key: 'rangeSplitArray',
            value: chart_json.rangeSplitArray,
            chartId: chart_json.chart_id
        })
        luckysheet.chart_selection.create(store.state.chartSetting.chartCurrent)
    },
    rangeMoveDragged: function () {
        luckysheet.chart_selection.rangeMove = false

        var chart_json = $.extend(
            true,
            {},
            store.state.chartSetting.chartList[store.state.chartSetting.chartCurrent]
        )

        var updateJson = {}
        updateJson.chart_id = store.state.chartSetting.chartCurrent
        updateJson.rangeTxt = luckysheet.sheetmanage.getRangetxt(
            luckysheet.currentSheetIndex,
            chart_json.rangeArray[0],
            luckysheet.currentSheetIndex
        )
        updateJson.chartData = luckysheet.getdatabyselection(
            chart_json.rangeArray[0],
            luckysheet.currentSheetIndex
        )

        var $id = luckysheet.chart_selection.rangeMoveObj.attr('id')
        if (
            $id == 'luckysheet-chart-rangeShow-content' &&
            !chart_json.rangeRowCheck.exits &&
            !chart_json.rangeColCheck.exits
        ) {
            //rangeMoveDraging中未更新chartData，在此使用新的chartData更新到updateJson
            updateJson.rangeSplitArray = generator.getRangeSplitArray(
                updateJson.chartData,
                chart_json.rangeArray,
                chart_json.rangeColCheck,
                chart_json.rangeRowCheck
            )
        } else {
            updateJson.rangeSplitArray = chart_json.rangeSplitArray
        }

        var chartAllTypeArray = chart_json.chartAllType.split('|')
        var chartPro = chartAllTypeArray[0],
            chartType = chartAllTypeArray[1],
            chartStyle = chartAllTypeArray[2]

        updateJson.chartDataCache = generator.getChartDataCache(
            updateJson.chartData,
            updateJson.rangeSplitArray,
            chartPro,
            chartType,
            chartStyle
        )
        updateJson.chartDataSeriesOrder = generator.getChartDataSeriesOrder(
            updateJson.chartDataCache.series[0].length
        )
        // 是否是移动改变图形
        generator.drag = true
        // 不增加点/线/区域
        generator.addPoint = false
        generator.addLine = false
        generator.addArea = false
        if (chartType == 'funnel' || chartType == 'gauge') {
            updateJson.defaultOption = generator.addDataToOption1(
                chart_json.defaultOption,
                updateJson.chartDataCache,
                updateJson.chartDataSeriesOrder,
                chartPro,
                chartType,
                chartStyle
            )
        } else {
            updateJson.defaultOption = generator.addDataToOption(
                chart_json.defaultOption,
                updateJson.chartDataCache,
                updateJson.chartDataSeriesOrder,
                chartPro,
                chartType,
                chartStyle
            )
        }

        // console.dir(JSON.stringify(updateJson.defaultOption))
        generator.patchVueSet(updateJson)
        generator.generateChart(
            updateJson.defaultOption,
            chart_json.chartTheme,
            chart_json.chartAllType,
            $('#' + updateJson.chart_id).get(0)
        )
    },
    rangeResize: false,
    rangeResizexy: null,
    rangeResizeIndex: null,
    rangeResizeObj: null,
    rangeResizeDraging: function (event, sheetBarHeight, statisticBarHeight) {
        var chart_json = $.extend(
            true,
            {},
            store.state.chartSetting.chartList[store.state.chartSetting.chartCurrent]
        )
        var st_r = chart_json.rangeArray[0].row[0]
        var st_c = chart_json.rangeArray[0].column[0]
        var rangeRowCheck = chart_json.rangeRowCheck
        var rangeColCheck = chart_json.rangeColCheck
        var rangeSplitArray = chart_json.rangeSplitArray

        var mouse = luckysheet.mouseposition(event.pageX, event.pageY)
        var scrollLeft = $('#luckysheet-cell-main').scrollLeft()
        var scrollTop = $('#luckysheet-cell-main').scrollTop()

        var x = mouse[0] + scrollLeft
        var y = mouse[1] + scrollTop

        var winH =
            $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight,
            winW = $(window).width() + scrollLeft

        var rowLocation = luckysheet.rowLocation(y),
            row_index = rowLocation[2]
        var colLocation = luckysheet.colLocation(x),
            col_index = colLocation[2]

        var visibledatarow = luckysheet.getvisibledatarow()
        var visibledatacolumn = luckysheet.getvisibledatacolumn()

        var $id = luckysheet.chart_selection.rangeResizeObj.attr('id')

        if ($id == 'luckysheet-chart-rangeShow-content') {
            var r1, r2, c1, c2

            if (luckysheet.chart_selection.rangeResize == 'lt') {
                r1 = luckysheet.chart_selection.rangeResizeIndex.row[0]
                c1 = luckysheet.chart_selection.rangeResizeIndex.column[0]

                r2 = luckysheet.chart_selection.rangeResizeIndex.row[1]
                c2 = luckysheet.chart_selection.rangeResizeIndex.column[1]
            } else if (luckysheet.chart_selection.rangeResize == 'lb') {
                r1 = luckysheet.chart_selection.rangeResizeIndex.row[1]
                c1 = luckysheet.chart_selection.rangeResizeIndex.column[0]

                r2 = luckysheet.chart_selection.rangeResizeIndex.row[0]
                c2 = luckysheet.chart_selection.rangeResizeIndex.column[1]
            } else if (luckysheet.chart_selection.rangeResize == 'rt') {
                r1 = luckysheet.chart_selection.rangeResizeIndex.row[0]
                c1 = luckysheet.chart_selection.rangeResizeIndex.column[1]

                r2 = luckysheet.chart_selection.rangeResizeIndex.row[1]
                c2 = luckysheet.chart_selection.rangeResizeIndex.column[0]
            } else if (luckysheet.chart_selection.rangeResize == 'rb') {
                r1 = luckysheet.chart_selection.rangeResizeIndex.row[1]
                c1 = luckysheet.chart_selection.rangeResizeIndex.column[1]

                r2 = luckysheet.chart_selection.rangeResizeIndex.row[0]
                c2 = luckysheet.chart_selection.rangeResizeIndex.column[0]
            }

            //行
            if (rangeRowCheck.exits) {
                var row_s = r1 - luckysheet.chart_selection.rangeResizexy[0] + row_index

                if (row_s < st_r + rangeRowCheck.range[1] + 1 || y < 0) {
                    row_s = st_r + rangeRowCheck.range[1] + 1
                } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                    row_s = visibledatarow.length - 1
                }
            } else {
                var row_s = st_r - luckysheet.chart_selection.rangeResizexy[0] + row_index

                if (row_s < 0 || y < 0) {
                    row_s = 0
                } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                    row_s = visibledatarow.length - 1
                }
            }

            //列
            if (rangeColCheck.exits) {
                var col_s = c1 - luckysheet.chart_selection.rangeResizexy[1] + col_index

                if (col_s < st_c + rangeColCheck.range[1] + 1 || x < 0) {
                    col_s = st_c + rangeColCheck.range[1] + 1
                } else if (col_s >= visibledatacolumn.length - 1 || x > winW) {
                    col_s = visibledatacolumn.length - 1
                }
            } else {
                var col_s = st_c - luckysheet.chart_selection.rangeResizexy[1] + col_index

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
                luckysheet.chart_selection.rangeResize == 'lt' ||
                luckysheet.chart_selection.rangeResize == 'lb'
            ) {
                c1 = luckysheet.chart_selection.rangeResizeIndex.column[0]
                c2 = luckysheet.chart_selection.rangeResizeIndex.column[1]
            } else if (
                luckysheet.chart_selection.rangeResize == 'rt' ||
                luckysheet.chart_selection.rangeResize == 'rb'
            ) {
                c1 = luckysheet.chart_selection.rangeResizeIndex.column[1]
                c2 = luckysheet.chart_selection.rangeResizeIndex.column[0]
            }

            //列
            if (rangeColCheck.exits) {
                var col_s = c1 - luckysheet.chart_selection.rangeResizexy[1] + col_index

                if (col_s < st_c + rangeColCheck.range[1] + 1 || x < 0) {
                    col_s = st_c + rangeColCheck.range[1] + 1
                } else if (col_s >= visibledatacolumn.length - 1 || x > winW) {
                    col_s = visibledatacolumn.length - 1
                }
            } else {
                var col_s = st_c - luckysheet.chart_selection.rangeResizexy[1] + col_index

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
                luckysheet.chart_selection.rangeResize == 'lt' ||
                luckysheet.chart_selection.rangeResize == 'rt'
            ) {
                r1 = luckysheet.chart_selection.rangeResizeIndex.row[0]
                r2 = luckysheet.chart_selection.rangeResizeIndex.row[1]
            } else if (
                luckysheet.chart_selection.rangeResize == 'lb' ||
                luckysheet.chart_selection.rangeResize == 'rb'
            ) {
                r1 = luckysheet.chart_selection.rangeResizeIndex.row[1]
                r2 = luckysheet.chart_selection.rangeResizeIndex.row[0]
            }

            //行
            if (rangeRowCheck.exits) {
                var row_s = r1 - luckysheet.chart_selection.rangeResizexy[0] + row_index

                if (row_s < st_r + rangeRowCheck.range[1] + 1 || y < 0) {
                    row_s = st_r + rangeRowCheck.range[1] + 1
                } else if (row_s >= visibledatarow.length - 1 || y > winH) {
                    row_s = visibledatarow.length - 1
                }
            } else {
                var row_s = st_r - luckysheet.chart_selection.rangeResizexy[0] + row_index

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

        //部分更新
        store.commit({
            type: 'updateChartItem',
            key: 'rangeArray',
            value: chart_json.rangeArray,
            chartId: chart_json.chart_id
        })
        store.commit({
            type: 'updateChartItem',
            key: 'rangeSplitArray',
            value: chart_json.rangeSplitArray,
            chartId: chart_json.chart_id
        })
        luckysheet.chart_selection.create(store.state.chartSetting.chartCurrent)
    },
    rangeResizeDragged: function () {
        luckysheet.chart_selection.rangeResize = null

        var chart_json = $.extend(
            true,
            {},
            store.state.chartSetting.chartList[store.state.chartSetting.chartCurrent]
        )

        var updateJson = {}

        updateJson.chart_id = store.state.chartSetting.chartCurrent
        updateJson.rangeTxt = luckysheet.sheetmanage.getRangetxt(
            luckysheet.currentSheetIndex,
            chart_json.rangeArray[0],
            luckysheet.currentSheetIndex
        )
        updateJson.chartData = luckysheet.getdatabyselection(
            chart_json.rangeArray[0],
            luckysheet.currentSheetIndex
        )

        var $id = luckysheet.chart_selection.rangeResizeObj.attr('id')
        if (
            $id == 'luckysheet-chart-rangeShow-content' &&
            !chart_json.rangeRowCheck.exits &&
            !chart_json.rangeColCheck.exits
        ) {
            //采用updateJson.chartData
            updateJson.rangeSplitArray = generator.getRangeSplitArray(
                updateJson.chartData,
                chart_json.rangeArray,
                chart_json.rangeColCheck,
                chart_json.rangeRowCheck
            )
        } else {
            updateJson.rangeSplitArray = chart_json.rangeSplitArray
        }

        var chartAllTypeArray = chart_json.chartAllType.split('|')
        var chartPro = chartAllTypeArray[0],
            chartType = chartAllTypeArray[1],
            chartStyle = chartAllTypeArray[2]

        updateJson.chartDataCache = generator.getChartDataCache(
            updateJson.chartData,
            updateJson.rangeSplitArray,
            chartPro,
            chartType,
            chartStyle
        )
        updateJson.chartDataSeriesOrder = generator.getChartDataSeriesOrder(
            updateJson.chartDataCache.series[0].length
        )
        if (chartType == 'funnel' || chartType == 'gauge') {
            updateJson.defaultOption = generator.addDataToOption1(
                chart_json.defaultOption,
                updateJson.chartDataCache,
                updateJson.chartDataSeriesOrder,
                chartPro,
                chartType,
                chartStyle
            )
        } else {
            updateJson.defaultOption = generator.addDataToOption(
                chart_json.defaultOption,
                updateJson.chartDataCache,
                updateJson.chartDataSeriesOrder,
                chartPro,
                chartType,
                chartStyle
            )
        }

        generator.patchVueSet(updateJson)

        generator.generateChart(
            updateJson.defaultOption,
            chart_json.chartTheme,
            chart_json.chartAllType,
            $('#' + updateJson.chart_id).get(0)
        )
    }
}