export function mousemove_global(event){
    
// }

// $(document).mousemove(function (event) {
    luckysheet.postil.overshow(event); //有批注显示

    clearInterval(jfautoscrollTimeout);
    if(luckysheet.formula.functionResizeStatus){
        var y = event.pageY;
        var movepx = y - luckysheet.formula.functionResizeData.y;
        var mpx = luckysheet.formula.functionResizeData.calculatebarHeight + movepx;
        var winh = Math.round($(window).height()/2);
        if(mpx <= 28){
            if(mpx <= 20){
                return;
            }
            mpx = 28;
        }
        else if(mpx >= winh){
            if(mpx >= winh + 8){
                return;
            }
            mpx = winh;
        }
        calculatebarHeight = mpx;
        $("#luckysheet-wa-calculate").css("height", calculatebarHeight - 2);
        $("#luckysheet-wa-calculate-size").css({"background":"#5e5e5e", "cursor":"ns-resize"});
        clearTimeout(luckysheet.formula.functionResizeTimeout);
        luckysheet.formula.functionResizeTimeout = setTimeout(function(){
            luckysheet.luckysheetsizeauto();
        }, 15);
    }
    else if (!!luckysheetFreezen.horizontalmovestate) {
        var mouse = mouseposition(event.pageX, event.pageY);
        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        var scrollTop = $("#luckysheet-cell-main").scrollTop();
        var x = mouse[0] + scrollLeft;
        var y = mouse[1] + scrollTop;

        var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
        var top = mouse[1] + columeHeaderHeight;

        if (top < columeHeaderHeight) {
            top = columeHeaderHeight;
        }

        if (top > luckysheetFreezen.windowHeight - 4) {
            top = luckysheetFreezen.windowHeight - 4;
        }

        $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css({ "top": top });

        if (top + scrollTop - columeHeaderHeight >= row_pre + (row - row_pre) / 2) {
            top = row - 2 - scrollTop + columeHeaderHeight;
            luckysheetFreezen.freezenhorizontaldata = [row, row_index + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_index + 1), top];
        }
        else {
            top = row_pre - 2 - scrollTop + columeHeaderHeight;
            luckysheetFreezen.freezenhorizontaldata = [row_pre, row_index, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_index), top];
        }

        $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-drop").css({ "top": top });
        luckysheetFreezen.saveFreezen(luckysheetFreezen.freezenhorizontaldata, top, null, null);
    }
    else if (!!luckysheetFreezen.verticalmovestate) {
        var mouse = mouseposition(event.pageX, event.pageY);
        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        var scrollTop = $("#luckysheet-cell-main").scrollTop();
        var x = mouse[0] + scrollLeft;
        var y = mouse[1] + scrollTop;

        var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

        var left = mouse[0] + rowHeaderWidth;

        if (left < rowHeaderWidth) {
            left = rowHeaderWidth;
        }

        if (left > luckysheetFreezen.windowWidth - 4) {
            left = luckysheetFreezen.windowWidth - 4;
        }

        $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css({ "left": left });

        if (left + scrollLeft - rowHeaderWidth >= col_pre + (col - col_pre) / 2) {
            left = col - 2 - scrollLeft + rowHeaderWidth;
            luckysheetFreezen.freezenverticaldata = [col, col_index + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_index + 1), left];
        }
        else {
            left = col_pre - 2 - scrollLeft + rowHeaderWidth;
            luckysheetFreezen.freezenverticaldata = [col_pre, col_index, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_index), left];
        }

        $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-drop").css({ "left": left });
        luckysheetFreezen.saveFreezen(null, null, luckysheetFreezen.freezenverticaldata, left);
        luckysheet.luckysheetsizeauto();//调节选区时下部单元格溢出
    }
    else if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
        var x = event.pageX, y = event.pageY;
        $("#luckysheet-modal-dialog-slider-pivot-move").css({ "left": x - luckysheet.pivotTable.movesave.width / 2, "top": y - luckysheet.pivotTable.movesave.height });
    }
    else if (!!luckysheet.chartparam.luckysheet_chart_point_config && luckysheet.chartparam.luckysheet_chart_point_config.movestart) {
        var x = event.pageX, y = event.pageY, $container = luckysheet.chartparam.luckysheet_chart_point_config.container;
        var curleft = x - $container.offset().left + $container.scrollLeft();
        var curtop = y - $container.offset().top + $container.scrollTop();
        //var $cur = $(event.target), $item = $(event.target).closest(".luckysheet-chart-point-searchitem");
        //$item.addClass("luckysheet-chart-point-searchitem-active");
        var top = 0, height = 0;
        if (luckysheet.chartparam.luckysheet_chart_point_config.top > curtop) {
            top = curtop;
            height = luckysheet.chartparam.luckysheet_chart_point_config.top - curtop;
        }
        else if (luckysheet.chartparam.luckysheet_chart_point_config.top == curtop) {
            top = curtop;
            height = luckysheet.chartparam.luckysheet_chart_point_config.top - curtop;
        }
        else {
            top = luckysheet.chartparam.luckysheet_chart_point_config.top;
            height = curtop - luckysheet.chartparam.luckysheet_chart_point_config.top - 1;
        }

        var left = 0, width = 0;
        if (luckysheet.chartparam.luckysheet_chart_point_config.left > curleft) {
            left = curleft;
            width = luckysheet.chartparam.luckysheet_chart_point_config.left - curleft;
        }
        else if (luckysheet.chartparam.luckysheet_chart_point_config.left == curleft) {
            left = curleft;
            width = luckysheet.chartparam.luckysheet_chart_point_config.left - curleft;
        }
        else {
            left = luckysheet.chartparam.luckysheet_chart_point_config.left;
            width = curleft - luckysheet.chartparam.luckysheet_chart_point_config.left - 1;
        }

        for (var i = 0; i < luckysheet.chartparam.luckysheet_chart_point_config.objectIndicator.length; i++) {
            var obj = luckysheet.chartparam.luckysheet_chart_point_config.objectIndicator[i];
            if (!(((obj.left + obj.width + $container.scrollLeft()) <= left || (obj.top + obj.height + $container.scrollTop()) <= top) || ((obj.left + $container.scrollLeft()) >= (left + width) || (obj.top + $container.scrollTop()) >= (top + height)))) {
                if (obj.isselected) {
                    obj.item.removeClass("luckysheet-chart-point-searchitem-active");
                }
                else {
                    obj.item.addClass("luckysheet-chart-point-searchitem-active");
                }
            }
            else {
                if (!obj.isselected) {
                    obj.item.removeClass("luckysheet-chart-point-searchitem-active");
                }
            }
        }

        $("#luckysheet-chart-point-selectedhelp").css({ "left": left, "width": width, "top": top, "height": height });
    }
    else if (luckysheet_sheet_move_status) {
        var scrollLeft = $("#luckysheet-sheet-container-c").scrollLeft();
        var x = event.pageX + scrollLeft;

        if (Math.abs(event.pageX - luckysheet_sheet_move_data.pageX) < 3) {
            return;
        }

        var winW = $("#luckysheet-sheet-container").width();
        var left = x - luckysheet_sheet_move_data.curleft - $("#luckysheet-sheet-container").offset().left;
        luckysheet_sheet_move_data.activeobject.css({ "left": left });
        var row_index = luckysheet_searcharray(luckysheet_sheet_move_data.widthlist, left + luckysheet_sheet_move_data.curleft);
        luckysheet_sheet_move_data.cursorobject.css({ "cursor": "move" });

        if (left - scrollLeft <= 6) {
            $("#luckysheet-sheets-leftscroll").click();
        }

        if (left - scrollLeft >= winW - 40) {
            $("#luckysheet-sheets-rightscroll").click();
        }

        if (row_index != luckysheet_sheet_move_data.curindex) {
            if (row_index == -1 && left > 0) {
                row_index = luckysheet_sheet_move_data.widthlist.length - 1;
                $("#luckysheet-sheets-item-clone").insertAfter($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index));
            }
            else if (row_index == -1 && left <= 0) {
                $("#luckysheet-sheets-item-clone").insertBefore($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(0));
            }
            else {
                $("#luckysheet-sheets-item-clone").insertAfter($("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").eq(row_index));
            }

            luckysheet_sheet_move_data.widthlist = [];
            //luckysheet_sheet_move_data.curleft = x;
            $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").each(function (i) {
                if (i == 0) {
                    luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()));
                }
                else {
                    luckysheet_sheet_move_data.widthlist.push(parseInt($(this).outerWidth()) + luckysheet_sheet_move_data.widthlist[i - 1]);
                }
            });

            luckysheet_sheet_move_data.curindex = $("#luckysheet-sheet-area div.luckysheet-sheets-item:visible").index($("#luckysheet-sheets-item-clone"));
        }
    }
    else if (luckysheet_model_move_state) {
        var scrollTop = $(document).scrollTop(), scrollLeft = $(document).scrollLeft();
        var y = event.pageY + scrollTop, x = event.pageX + scrollLeft;
        var winH = $(window).height(), winW = $(window).width();
        var myh = luckysheet_model_move_obj.height(), myw = luckysheet_model_move_obj.width();
        var top = y - luckysheet_model_xy[1], left = x - luckysheet_model_xy[0];

        if (top < 0) {
            top = 0;
        }

        if (top + myh + 62 > winH) {
            top = winH - myh - 62;
        }

        if (left < 0) {
            left = 0;
        }

        if (left + myw + 86 > winW) {
            left = winW - myw - 86;
        }

        luckysheet_model_move_obj.css({ "top": top, "left": left });
        event.preventDefault();
    }
    else if (!!luckysheet_scroll_status || !!luckysheet_select_status || !!luckysheet_rows_selected_status || !!luckysheet_cols_selected_status || !!luckysheet_cell_selected_move || !!luckysheet_cell_selected_move || !!luckysheet_cell_selected_extend || !!luckysheet_cols_change_size || !!luckysheet_rows_change_size || !!luckysheet.chartparam.luckysheetCurrentChartMove || !!luckysheet.chartparam.luckysheetCurrentChartResize || !!luckysheet.formula.rangeResize || !!luckysheet.formula.rangeMove) {
        if (luckysheet_select_status) {
            clearTimeout(jfcountfuncTimeout);
            jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
        }
        
        jfautoscrollTimeout = setInterval(function () {
            if (luckysheet_scroll_status  && !luckysheet_cols_change_size && !luckysheet_rows_change_size) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var left = $("#luckysheet-scrollbar-x").scrollLeft(), top = $("#luckysheet-scrollbar-y").scrollTop();
                var x = mouse[0];
                var y = mouse[1];
                var winH = $("#luckysheet-cell-main").height() - 20, winW = $("#luckysheet-cell-main").width() - 60;

                if (y < 0 || y > winH) {
                    var stop;
                    if (y < 0) {
                        stop = top + y/2;
                    }
                    else {
                        stop = top + (y - winH)/2;
                    }
                    $("#luckysheet-scrollbar-y").scrollTop(stop);
                }

                if (x < 0 || x > winW) {
                    var sleft;
                    if (x < 0) {
                        sleft = left + x/2;
                    }
                    else {
                        sleft = left + (x - winW)/2;
                    }
                    $("#luckysheet-scrollbar-x").scrollLeft(sleft);
                }
            }
            if (luckysheet_select_status) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);

                var top = 0, height = 0, rowseleted = [];
                if (last.top > row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;

                    if(last.row[1] > last.row_focus){
                        last.row[1] = last.row_focus;
                    }

                    rowseleted = [row_index, last.row[1]];
                }
                else if (last.top == row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;
                    rowseleted = [row_index, last.row[0]];
                }
                else {
                    top = last.top;
                    height = row - last.top - 1;

                    if(last.row[0] < last.row_focus){
                        last.row[0] = last.row_focus;
                    }

                    rowseleted = [last.row[0], row_index];
                }

                var left = 0, width = 0, columnseleted = [];
                if (last.left > col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;

                    if(last.column[1] > last.column_focus){
                        last.column[1] = last.column_focus;
                    }

                    columnseleted = [col_index, last.column[1]];
                }
                else if (last.left == col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;
                    columnseleted = [col_index, last.column[0]];
                }
                else {
                    left = last.left;
                    width = col - last.left - 1;

                    if(last.column[0] < last.column_focus){
                        last.column[0] = last.column_focus;
                    }

                    columnseleted = [last.column[0], col_index];
                }

                var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                if(changeparam != null){
                    columnseleted = changeparam[0];
                    rowseleted= changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];
                }

                last["row"] = rowseleted;
                last["column"] = columnseleted;

                last["left_move"] = left;
                last["width_move"] = width;
                last["top_move"] = top;
                last["height_move"] = height;

                luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                luckysheet.selectHightlightShow();
                
                luckysheetFreezen.scrollFreezen();

                $("#luckysheet-helpbox-cell").text(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));

                //交替颜色选择范围
                if($("#luckysheet-alternateformat-rangeDialog").is(":visible")){
                    $("#luckysheet-alternateformat-rangeDialog input").val(luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, luckysheet_select_save[luckysheet_select_save.length - 1]));
                }

                if (luckysheet.chartparam.luckysheet_chart_data_select_state) {
                    $("#luckysheet-datavisual-range-selection-input").val(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].name + "!" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][0]) + (luckysheet_select_save[0]["row"][0] + 1) + ":" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][1]) + (luckysheet_select_save[0]["row"][1] + 1));
                }

                if (luckysheet.pivotTable.luckysheet_pivotTable_select_state) {
                    $("#luckysheet-pivotTable-range-selection-input").val(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].name + "!" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][0]) + (luckysheet_select_save[0]["row"][0] + 1) + ":" + luckysheet.luckysheetchatatABC(luckysheet_select_save[0]["column"][1]) + (luckysheet_select_save[0]["row"][1] + 1));
                }
            }
            else if(luckysheet.conditionformat.selectStatus){
                var mouse = mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                var last = luckysheet.conditionformat.selectRange[luckysheet.conditionformat.selectRange.length - 1];

                var top = 0, height = 0, rowseleted = [];
                if (last.top > row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;

                    if(last.row[1] > last.row_focus){
                        last.row[1] = last.row_focus;
                    }

                    rowseleted = [row_index, last.row[1]];
                }
                else if (last.top == row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;
                    rowseleted = [row_index, last.row[0]];
                }
                else {
                    top = last.top;
                    height = row - last.top - 1;

                    if(last.row[0] < last.row_focus){
                        last.row[0] = last.row_focus;
                    }

                    rowseleted = [last.row[0], row_index];
                }

                var left = 0, width = 0, columnseleted = [];
                if (last.left > col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;

                    if(last.column[1] > last.column_focus){
                        last.column[1] = last.column_focus;
                    }

                    columnseleted = [col_index, last.column[1]];
                }
                else if (last.left == col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;
                    columnseleted = [col_index, last.column[0]];
                }
                else {
                    left = last.left;
                    width = col - last.left - 1;

                    if(last.column[0] < last.column_focus){
                        last.column[0] = last.column_focus;
                    }

                    columnseleted = [last.column[0], col_index];
                }

                var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
                if(changeparam != null){
                    columnseleted = changeparam[0];
                    rowseleted= changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];
                }

                last["row"] = rowseleted;
                last["column"] = columnseleted;

                last["left_move"] = left;
                last["width_move"] = width;
                last["top_move"] = top;
                last["height_move"] = height;

                luckysheet.conditionformat.selectRange[luckysheet.conditionformat.selectRange.length - 1] = last;

                luckysheet.selectionCopyShow(luckysheet.conditionformat.selectRange);

                var range = luckysheet.conditionformat.getTxtByRange(luckysheet.conditionformat.selectRange);
                $("#luckysheet-multiRange-dialog input").val(range);
            }
            else if (luckysheet.formula.rangestart) {
                luckysheet.formula.rangedrag(event);
            }
            else if (luckysheet.formula.rangedrag_row_start) {
                luckysheet.formula.rangedrag_row(event);
            }
            else if (luckysheet.formula.rangedrag_column_start) {
                luckysheet.formula.rangedrag_column(event);
            }
            else if (luckysheet_rows_selected_status) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var y = mouse[1] + $("#luckysheet-rows-h").scrollTop();
                if (y < 0) {
                    return false;
                }

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                var col_index = visibledatacolumn.length - 1, col = visibledatacolumn[col_index], col_pre = 0;

                var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);

                var top = 0, height = 0, rowseleted = [];
                if (last.top > row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;

                    if(last.row[1] > last.row_focus){
                        last.row[1] = last.row_focus;
                    }

                    rowseleted = [row_index, last.row[1]];
                }
                else if (last.top == row_pre) {
                    top = row_pre;
                    height = last.top + last.height - row_pre;
                    rowseleted = [row_index, last.row[0]];
                }
                else {
                    top = last.top;
                    height = row - last.top - 1;

                    if(last.row[0] < last.row_focus){
                        last.row[0] = last.row_focus;
                    }

                    rowseleted = [last.row[0], row_index];
                }

                // var changeparam = luckysheet.menuButton.mergeMoveMain([0, col_index], rowseleted, last, top, height, col_pre, col);
                // if(changeparam != null){
                //     //columnseleted = changeparam[0];
                //     rowseleted= changeparam[1];
                //     top = changeparam[2];
                //     height = changeparam[3];
                //     //left = changeparam[4];
                //     //width = changeparam[5];
                // }

                last["row"] = rowseleted;

                last["top_move"] = top;
                last["height_move"] = height;

                luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                luckysheet.selectHightlightShow();
                
                clearTimeout(jfcountfuncTimeout);
                jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
                //event.preventDefault();
            }
            else if (luckysheet_cols_selected_status) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + $("#luckysheet-cols-h-c").scrollLeft();
                if (x < 0) {
                    return false;
                }

                var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                var last = $.extend(true, {}, luckysheet_select_save[luckysheet_select_save.length - 1]);

                var left = 0, width = 0, columnseleted = [];
                if (last.left > col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;

                    if(last.column[1] > last.column_focus){
                        last.column[1] = last.column_focus;
                    }

                    columnseleted = [col_index, last.column[1]];
                }
                else if (last.left == col_pre) {
                    left = col_pre;
                    width = last.left + last.width - col_pre;
                    columnseleted = [col_index, last.column[0]];
                }
                else {
                    left = last.left;
                    width = col - last.left - 1;

                    if(last.column[0] < last.column_focus){
                        last.column[0] = last.column_focus;
                    }

                    columnseleted = [last.column[0], col_index];
                }

                // var changeparam = luckysheet.menuButton.mergeMoveMain(columnseleted, [0, row_index], last, row_pre, row, left, width);
                // if(changeparam != null){
                //     columnseleted = changeparam[0];
                //     //rowseleted= changeparam[1];
                //     //top = changeparam[2];
                //     //height = changeparam[3];
                //     left = changeparam[4];
                //     width = changeparam[5];
                // }

                last["column"] = columnseleted;

                last["left_move"] = left;
                last["width_move"] = width;

                luckysheet_select_save[luckysheet_select_save.length - 1] = last;

                luckysheet.selectHightlightShow();
                
                clearTimeout(jfcountfuncTimeout);
                jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
                //event.preventDefault();
            }
            else if (luckysheet_cell_selected_move) {
                var mouse = mouseposition(event.pageX, event.pageY);

                var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                var scrollTop = $("#luckysheet-cell-main").scrollTop();

                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;

                var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                var row_index_original = luckysheet_cell_selected_move_index[0], col_index_original = luckysheet_cell_selected_move_index[1];

                var row_s = luckysheet_select_save[0]["row"][0] - row_index_original + row_index, row_e = luckysheet_select_save[0]["row"][1] - row_index_original + row_index;

                var col_s = luckysheet_select_save[0]["column"][0] - col_index_original + col_index, col_e = luckysheet_select_save[0]["column"][1] - col_index_original + col_index;

                if (row_s < 0 || y < 0) {
                    row_s = 0;
                    row_e = luckysheet_select_save[0]["row"][1] - luckysheet_select_save[0]["row"][0];
                }

                if (col_s < 0 || x < 0) {
                    col_s = 0;
                    col_e = luckysheet_select_save[0]["column"][1] - luckysheet_select_save[0]["column"][0];
                }

                if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                    row_s = visibledatarow.length - 1 - luckysheet_select_save[0]["row"][1] + luckysheet_select_save[0]["row"][0];
                    row_e = visibledatarow.length - 1;
                }

                if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                    col_s = visibledatacolumn.length - 1 - luckysheet_select_save[0]["column"][1] + luckysheet_select_save[0]["column"][0];
                    col_e = visibledatacolumn.length - 1;
                }

                var col_pre = col_s - 1 == -1 ? 0 : visibledatacolumn[col_s - 1], col = visibledatacolumn[col_e];
                var row_pre = row_s - 1 == -1 ? 0 : visibledatarow[row_s - 1], row = visibledatarow[row_e];

                $("#luckysheet-cell-selected-move").css({ "left": col_pre, "width": col - col_pre - 2, "top": row_pre, "height": row - row_pre - 2, "display": "block" });
                //clearTimeout(jfcountfuncTimeout);
                //jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
                //event.preventDefault();
            }
            else if (luckysheet_cell_selected_extend) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var scrollLeft = $("#luckysheet-cell-main").scrollLeft() - 5;
                var scrollTop = $("#luckysheet-cell-main").scrollTop() - 5;

                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;

                var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

                /*                        if (x < 0 || y < 0) {
                                            return;
                                        }*/

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                var row_index_original = luckysheet_cell_selected_extend_index[0], col_index_original = luckysheet_cell_selected_extend_index[1];

                var row_s = luckysheet_select_save[0]["row"][0], row_e = luckysheet_select_save[0]["row"][1];
                var col_s = luckysheet_select_save[0]["column"][0], col_e = luckysheet_select_save[0]["column"][1];

                if (row_s < 0 || y < 0) {
                    row_s = 0;
                    row_e = luckysheet_select_save[0]["row"][1] - luckysheet_select_save[0]["row"][0];
                }

                if (col_s < 0 || x < 0) {
                    col_s = 0;
                    col_e = luckysheet_select_save[0]["column"][1] - luckysheet_select_save[0]["column"][0];
                }

                if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                    row_s = visibledatarow.length - 1 - luckysheet_select_save[0]["row"][1] + luckysheet_select_save[0]["row"][0];
                    row_e = visibledatarow.length - 1;
                }

                if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                    col_s = visibledatacolumn.length - 1 - luckysheet_select_save[0]["column"][1] + luckysheet_select_save[0]["column"][0];
                    col_e = visibledatacolumn.length - 1;
                }

                var top = luckysheet_select_save[0].top_move, height = luckysheet_select_save[0].height_move;
                var left = luckysheet_select_save[0].left_move, width = luckysheet_select_save[0].width_move;

                if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                    if (!(row_index >= row_s && row_index <= row_e)) {
                        if (luckysheet_select_save[0].top_move >= row_pre) {
                            top = row_pre;
                            height = luckysheet_select_save[0].top_move + luckysheet_select_save[0].height_move - row_pre;
                        }
                        else {
                            top = luckysheet_select_save[0].top_move;
                            height = row - luckysheet_select_save[0].top_move - 1;
                        }
                    }
                }
                else {
                    if (!(col_index >= col_s && col_index <= col_e)) {
                        if (luckysheet_select_save[0].left_move >= col_pre) {
                            left = col_pre;
                            width = luckysheet_select_save[0].left_move + luckysheet_select_save[0].width_move - col_pre;
                        }
                        else {
                            left = luckysheet_select_save[0].left_move;
                            width = col - luckysheet_select_save[0].left_move - 1;
                        }
                    }
                }

                $("#luckysheet-cell-selected-extend").css({ "left": left, "width": width, "top": top, "height": height, "display": "block" });
                //event.preventDefault();
            }
            else if (luckysheet_cols_change_size) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
                var x = mouse[0] + scrollLeft;
                var winW = $(window).width();

                var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                    if ((x + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_cols_change_size_start[0] > 30 && x / luckysheetConfigsetting.pointEditZoom < winW + scrollLeft - 100) {
                        $("#luckysheet-change-size-line").css({ "left": x / luckysheetConfigsetting.pointEditZoom });
                        $("#luckysheet-cols-change-size").css({ "left": (x - 2) / luckysheetConfigsetting.pointEditZoom });
                    }
                }
                else{
                    if ((x + 3) - luckysheet_cols_change_size_start[0] > 30 && x < winW + scrollLeft - 100) {
                        $("#luckysheet-change-size-line").css({ "left": x });
                        $("#luckysheet-cols-change-size").css({ "left": x - 2 });
                    }
                }
                //event.preventDefault();
            }
            else if (luckysheet_rows_change_size) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var scrollTop = $("#luckysheet-rows-h").scrollTop();
                var y = mouse[1] + scrollTop;
                var winH = $(window).height();

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                    if ((y + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_rows_change_size_start[0] > 19 && y / luckysheetConfigsetting.pointEditZoom < winH + scrollTop - 200) {
                        $("#luckysheet-change-size-line").css({ "top": y / luckysheetConfigsetting.pointEditZoom });
                        $("#luckysheet-rows-change-size").css({ "top": y / luckysheetConfigsetting.pointEditZoom });
                    }
                }
                else{
                    if ((y + 3) - luckysheet_rows_change_size_start[0] > 19 && y < winH + scrollTop - 200) {
                        $("#luckysheet-change-size-line").css({ "top": y });
                        $("#luckysheet-rows-change-size").css({ "top": y });
                    }
                }
                //event.preventDefault();
            }
            else if (luckysheet.chartparam.luckysheetCurrentChartMove) {
                var mouse = mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();
                // var scrollTop = $("#luckysheet-cell-main").scrollTop(), scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                // var y = event.pageY + scrollTop, x = event.pageX + scrollLeft;

                var myh = luckysheet.chartparam.luckysheetCurrentChartMoveObj.height(), myw = luckysheet.chartparam.luckysheetCurrentChartMoveObj.width();
                var top = y - luckysheet.chartparam.luckysheetCurrentChartMoveXy[1], left = x - luckysheet.chartparam.luckysheetCurrentChartMoveXy[0];

                if (top < 0) {
                    top = 0;
                }

                if (top + myh + 42 + 6 > luckysheet.chartparam.luckysheetCurrentChartMoveWinH) {
                    top = luckysheet.chartparam.luckysheetCurrentChartMoveWinH - myh - 42 - 6;
                }

                if (left < 0) {
                    left = 0;
                }

                if (left + myw + 22 + 36 > luckysheet.chartparam.luckysheetCurrentChartMoveWinW) {
                    left = luckysheet.chartparam.luckysheetCurrentChartMoveWinW - myw - 22 - 36;
                }

                luckysheet.chartparam.luckysheetCurrentChartMoveObj.css({ "top": top, "left": left });

                if(luckysheetFreezen.freezenhorizontaldata != null || luckysheetFreezen.freezenverticaldata != null){
                    luckysheetFreezen.scrollAdapt();

                    var toffset = luckysheet.chartparam.luckysheetCurrentChartMoveObj.offset();
                    var tpsition = luckysheet.chartparam.luckysheetCurrentChartMoveObj.position();
                    luckysheet.chartparam.luckysheetCurrentChartMoveXy = [event.pageX - toffset.left, event.pageY - toffset.top, tpsition.left, tpsition.top, $("#luckysheet-scrollbar-x").scrollLeft(), $("#luckysheet-scrollbar-y").scrollTop()];
                }
                //event.preventDefault();
            }
            else if (!!luckysheet.chartparam.luckysheetCurrentChartResize) {
                var scrollTop = $("#luckysheet-cell-main").scrollTop(), scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                var mouse = mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;

                if (x < 0 || y < 0) {
                    return false;
                }

                var myh = luckysheet.chartparam.luckysheetCurrentChartResizeObj.height(), myw = luckysheet.chartparam.luckysheetCurrentChartResizeObj.width();
                var topchange = y - luckysheet.chartparam.luckysheetCurrentChartResizeXy[1], leftchange = x - luckysheet.chartparam.luckysheetCurrentChartResizeXy[0];

                var top = luckysheet.chartparam.luckysheetCurrentChartResizeXy[5], height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3], left = luckysheet.chartparam.luckysheetCurrentChartResizeXy[4], width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2];

                if (luckysheet.chartparam.luckysheetCurrentChartResize == "lm" || luckysheet.chartparam.luckysheetCurrentChartResize == "lt" || luckysheet.chartparam.luckysheetCurrentChartResize == "lb") {
                    left = x;
                    width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] - leftchange;
                    if (left > luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 60) {
                        left = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 60;
                        width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] - (luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 60 - luckysheet.chartparam.luckysheetCurrentChartResizeXy[0]);
                    }
                    else if (left <= 0) {
                        left = 0;
                        width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[0];
                    }
                }

                if (luckysheet.chartparam.luckysheetCurrentChartResize == "rm" || luckysheet.chartparam.luckysheetCurrentChartResize == "rt" || luckysheet.chartparam.luckysheetCurrentChartResize == "rb") {
                    width = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2] + leftchange;
                    if (width < 60) {
                        width = 60;
                    }
                    else if (width >= luckysheet.chartparam.luckysheetCurrentChartResizeWinW - luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 22 - 36) {
                        width = luckysheet.chartparam.luckysheetCurrentChartResizeWinW - luckysheet.chartparam.luckysheetCurrentChartResizeXy[4] - 22 - 36;
                    }
                }

                if (luckysheet.chartparam.luckysheetCurrentChartResize == "mt" || luckysheet.chartparam.luckysheetCurrentChartResize == "lt" || luckysheet.chartparam.luckysheetCurrentChartResize == "rt") {
                    top = y;
                    height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] - topchange;
                    if (top > luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 60) {
                        top = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 60;
                        height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] - (luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 60 - luckysheet.chartparam.luckysheetCurrentChartResizeXy[1]);
                    }
                    else if (top <= 0) {
                        top = 0;
                        height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + luckysheet.chartparam.luckysheetCurrentChartResizeXy[1];
                    }
                }

                if (luckysheet.chartparam.luckysheetCurrentChartResize == "mb" || luckysheet.chartparam.luckysheetCurrentChartResize == "lb" || luckysheet.chartparam.luckysheetCurrentChartResize == "rb") {
                    height = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3] + topchange;
                    if (height < 60) {
                        height = 60;
                    }
                    else if (height >= luckysheet.chartparam.luckysheetCurrentChartResizeWinH - luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 42 - 6) {
                        height = luckysheet.chartparam.luckysheetCurrentChartResizeWinH - luckysheet.chartparam.luckysheetCurrentChartResizeXy[5] - 42 - 6;
                    }
                }

                //if (top < 0) {
                //    top = 0;
                //}

                //if (top + myh > luckysheet.chartparam.luckysheetCurrentChartResizeWinH) {
                //    top = luckysheet.chartparam.luckysheetCurrentChartResizeWinH - myh;
                //}

                //if (left < 0) {
                //    left = 0;
                //}

                //if (left + myw > luckysheet.chartparam.luckysheetCurrentChartResizeWinW) {
                //    left = luckysheet.chartparam.luckysheetCurrentChartResizeWinW - myw;
                //}

                var resizedata = { "top": top, "left": left, "height": height, "width": width };
                luckysheet.chartparam.luckysheetCurrentChartResizeObj.css(resizedata);
                //echarts.getInstanceById(luckysheet.chartparam.luckysheetCurrentChartResizeObj.find(".luckysheet-modal-dialog-content").attr("_echarts_instance_")).resize();
                !!window.generator && generator.resize(luckysheet.chartparam.luckysheetcurrentChart);
                //event.preventDefault();
            }
            else if (luckysheet.postil.move){
                var mouse = mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                var myh = luckysheet.postil.currentObj.outerHeight(), 
                    myw = luckysheet.postil.currentObj.outerWidth();
                
                var top = y - luckysheet.postil.moveXY[1], left = x - luckysheet.postil.moveXY[0];

                if (top < 0) {
                    top = 0;
                }

                if (top + myh + 42 + 6 > luckysheet.postil.currentWinH) {
                    top = luckysheet.postil.currentWinH - myh - 42 - 6;
                }

                if (left < 0) {
                    left = 0;
                }

                if (left + myw + 22 + 36 > luckysheet.postil.currentWinW) {
                    left = luckysheet.postil.currentWinW - myw - 22 - 36;
                }

                luckysheet.postil.currentObj.css({ "left": left, "top": top });
            }
            else if (!!luckysheet.postil.resize){
                var mouse = luckysheet.mouseposition(event.pageX, event.pageY);
                var x = mouse[0] + $("#luckysheet-cell-main").scrollLeft();
                var y = mouse[1] + $("#luckysheet-cell-main").scrollTop();

                if (x < 0 || y < 0) {
                    return false;
                }

                var topchange = y - luckysheet.postil.resizeXY[1], 
                    leftchange = x - luckysheet.postil.resizeXY[0];
                
                var top = luckysheet.postil.resizeXY[5],
                    height = luckysheet.postil.resizeXY[3],
                    left = luckysheet.postil.resizeXY[4],
                    width = luckysheet.postil.resizeXY[2];

                if(luckysheet.postil.resize == "lm" || luckysheet.postil.resize == "lt" || luckysheet.postil.resize == "lb"){
                    left = x;
                    width = luckysheet.postil.resizeXY[2] - leftchange;

                    if(left > luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[4] - 60){
                        left = luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[4] - 60;
                        width = luckysheet.postil.resizeXY[2] - (luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[4] - 60 - luckysheet.postil.resizeXY[0]);
                    }
                    else if(left <= 0){
                        left = 0;
                        width = luckysheet.postil.resizeXY[2] + luckysheet.postil.resizeXY[0];
                    }
                }

                if(luckysheet.postil.resize == "rm" || luckysheet.postil.resize == "rt" || luckysheet.postil.resize == "rb"){
                    width = luckysheet.postil.resizeXY[2] + leftchange;

                    if(width < 60){
                        width = 60;
                    }
                    else if(width >= luckysheet.postil.currentWinW - luckysheet.postil.resizeXY[4] - 22 - 36){
                        width = luckysheet.postil.currentWinW - luckysheet.postil.resizeXY[4] - 22 - 36;
                    }
                }

                if(luckysheet.postil.resize == "mt" || luckysheet.postil.resize == "lt" || luckysheet.postil.resize == "rt"){
                    top = y;
                    height = luckysheet.postil.resizeXY[3] - topchange;

                    if(top > luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[5] - 60){
                        top = luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[5] - 60;
                        height = luckysheet.postil.resizeXY[3] - (luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[5] - 60 - luckysheet.postil.resizeXY[1]);
                    }
                    else if(top <= 0){
                        top = 0;
                        height = luckysheet.postil.resizeXY[3] + luckysheet.postil.resizeXY[1];
                    }
                }

                if(luckysheet.postil.resize == "mb" || luckysheet.postil.resize == "lb" || luckysheet.postil.resize == "rb"){
                    height = luckysheet.postil.resizeXY[3] + topchange;

                    if(height < 60){
                        height = 60;
                    }
                    else if(height >= luckysheet.postil.currentWinH - luckysheet.postil.resizeXY[5] - 42 - 6){
                        height = luckysheet.postil.currentWinH - luckysheet.postil.resizeXY[5] - 42 - 6;
                    }
                }

                luckysheet.postil.currentObj.css({ "width": width, "height": height, "left": left, "top": top });
            }
            else if (!!luckysheet.formula.rangeResize) {
                luckysheet.formula.rangeResizeDraging(event, luckysheet.formula.rangeResizeObj, luckysheet.formula.rangeResizexy, luckysheet.formula.rangeResize, luckysheet.formula.rangeResizeWinW, luckysheet.formula.rangeResizeWinH, ch_width, rh_height);
            }
            else if (!!luckysheet.formula.rangeMove) {
                luckysheet.formula.rangeMoveDraging(event, luckysheet.formula.rangeMovexy, luckysheet.formula.rangeMoveObj.data("range"), luckysheet.formula.rangeMoveObj, sheetBarHeight, statisticBarHeight);
            }
            else if (!!luckysheet.chart_selection.rangeResize) {
                luckysheet.chart_selection.rangeResizeDraging(event, sheetBarHeight, statisticBarHeight);
            }
            else if (!!luckysheet.chart_selection.rangeMove) {
                luckysheet.chart_selection.rangeMoveDraging(event, sheetBarHeight, statisticBarHeight);
            }
        }, 1);
    }
});

        $(document).mouseup(function (event) {
            //数据窗格主体

            if (luckysheet_select_status) {
                clearTimeout(jfcountfuncTimeout);
                jfcountfuncTimeout = setTimeout(function(){
                    jfcountfunc();
                }, 0);

                //格式刷
                if(luckysheet.menuButton.luckysheetPaintModelOn){
                    luckysheet.selection.pasteHandlerOfPaintModel(luckysheet_copy_save);

                    if(luckysheet.menuButton.luckysheetPaintSingle){
                        //单次 格式刷
                        luckysheet.menuButton.cancelPaintModel();
                    }
                }
            }

            //$("#text-select").remove();

            luckysheet_select_status = false;
            clearTimeout(jfautoscrollTimeout);
            luckysheet_scroll_status = false;

            $("#luckysheet-cell-selected").find(".luckysheet-cs-fillhandle").css("cursor","crosshair").end().find(".luckysheet-cs-draghandle").css("cursor","move");
            $("#luckysheet-cell-main, #luckysheetTableContent, #luckysheet-sheettable_0").css("cursor","default");

            //行标题窗格主体
            luckysheet_rows_selected_status = false;

            //列标题窗格主体
            luckysheet_cols_selected_status = false;

            luckysheet_model_move_state = false;

            // if (luckysheetautoadjustmousedown == 1) {
            //     //luckysheet.luckysheetscrollevent(true);
            //     luckysheetautoadjustmousedown = 2;
            // }

            if(luckysheet.formula.functionResizeStatus){
                luckysheet.formula.functionResizeStatus = false;
                $("#luckysheet-wa-calculate-size").removeAttr("style");
            }


            if (!!luckysheetFreezen.horizontalmovestate) {
                luckysheetFreezen.horizontalmovestate = false;
                $("#luckysheet-freezebar-horizontal").removeClass("luckysheet-freezebar-active");
                $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css("cursor", "-webkit-grab");
                if (luckysheetFreezen.freezenhorizontaldata[4] <= columeHeaderHeight) {
                    luckysheetFreezen.cancelFreezenHorizontal();
                }
                luckysheetFreezen.createAssistCanvas();
                luckysheet.luckysheetrefreshgrid();
            }

            if (!!luckysheetFreezen.verticalmovestate) {
                luckysheetFreezen.verticalmovestate = false;
                $("#luckysheet-freezebar-vertical").removeClass("luckysheet-freezebar-active");
                $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css("cursor", "-webkit-grab");
                if (luckysheetFreezen.freezenverticaldata[4] <= rowHeaderWidth) {
                    luckysheetFreezen.cancelFreezenVertical();
                }
                luckysheetFreezen.createAssistCanvas();
                luckysheet.luckysheetrefreshgrid();
            }

            if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
                $("#luckysheet-modal-dialog-slider-pivot-move").remove();
                luckysheet.pivotTable.movestate = false;
                $("#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").css("cursor", "default");
                if (luckysheet.pivotTable.movesave.containerid != "luckysheet-modal-dialog-pivotTable-list") {
                    var $cur = $(event.target).closest(".luckysheet-modal-dialog-slider-config-list");
                    if ($cur.length == 0) {
                        if (luckysheet.pivotTable.movesave.containerid == "luckysheet-modal-dialog-config-value") {
                            luckysheet.pivotTable.resetOrderby(luckysheet.pivotTable.movesave.obj);
                        }
                        luckysheet.pivotTable.movesave.obj.remove();
                        luckysheet.pivotTable.showvaluecolrow();
                        $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                            $(this).find(".luckysheet-slider-list-item-selected").find("i").remove();
                        });

                        $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                            var index = $(this).data("index");

                            $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                                var $seleted = $(this).find(".luckysheet-slider-list-item-selected");
                                if ($(this).data("index") == index && $seleted.find("i").length == 0) {
                                    $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                                }
                            });

                        });
                        luckysheet.pivotTable.refreshPivotTable();
                    }
                }
            }

            if (!!luckysheet.chartparam.luckysheet_chart_point_config && luckysheet.chartparam.luckysheet_chart_point_config.movestart) {
                clearTimeout(luckysheet.chartparam.luckysheet_chart_point_config.lagTimeoutclick);
                luckysheet.chartparam.luckysheet_chart_point_config.mouseupdone = true;
                luckysheet.chartparam.luckysheet_chart_point_config.movestart = false;

                $("#luckysheet-chart-point-selectedhelp").hide();

                luckysheet.chartparam.luckysheet_chart_point_config.objectIndicator = [];
                luckysheet.chartparam.luckysheet_chart_point_config.changeindex = [];

                var dataOpt = null, initialpointset = true;
                var currentOpt = luckysheet.chartparam.luckysheet_chart_point_config.pointchart.getOption();
                $("#luckysheet-chart-point-config .luckysheet-chart-point-searchitem-c").find(".luckysheet-chart-point-searchitem-active").each(function () {
                    luckysheet.chartparam.luckysheet_chart_point_config.changeindex.push($(this).data("index"));

                    var dataOpt1 = currentOpt.series[0].data[$(this).data("index")];
                    if (initialpointset && !(dataOpt1 instanceof Array)) {
                        initialpointset = false;
                        dataOpt = dataOpt1;
                    }
                });

                luckysheet.luckysheetactivepointconfig(currentOpt, dataOpt);
                //var data = luckysheet.chartparam.luckysheet_chart_point_config.pointchart.series[0].data[luckysheet.chartparam.luckysheet_chart_point_config.changeindex[0]]
            }

            if (luckysheet_sheet_move_status) {
                luckysheet_sheet_move_status = false;
                luckysheet_sheet_move_data.activeobject.insertBefore($("#luckysheet-sheets-item-clone"));
                luckysheet_sheet_move_data.activeobject.removeAttr("style");
                //luckysheet_sheet_move_data.activeobject.css({ "position": "relative", "opacity": 1, "cursor": "pointer", "transition": "all 0.1s", "z-index": "initial" });
                $("#luckysheet-sheets-item-clone").remove();
                luckysheet_sheet_move_data.cursorobject.css({ "cursor": "pointer" });
                luckysheet_sheet_move_data = {};
                luckysheet.sheetmanage.reOrderAllSheet();
            }

            clearTimeout(luckysheet.chartparam.luckysheetCurrentChartMoveTimeout);
            
            //图表拖动 chartMix
            if (luckysheet.chartparam.luckysheetCurrentChartMove) {
                luckysheet.chartparam.luckysheetCurrentChartMove = false;
                if (luckysheet.chartparam.luckysheetInsertChartTosheetChange) {

                    //myTop, myLeft: 本次的chart框位置，scrollLeft,scrollTop: 上一次的滚动条位置
                    var myTop = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("top"), myLeft = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("left"), scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();

                    //点击时候存储的信息，即上一次操作结束的图表信息，x,y: chart框位置，scrollLeft1,scrollTop1: 滚动条位置
                    var x = luckysheet.chartparam.luckysheetCurrentChartMoveXy[2];
                    var y = luckysheet.chartparam.luckysheetCurrentChartMoveXy[3];

                    var scrollLeft1 = luckysheet.chartparam.luckysheetCurrentChartMoveXy[4];
                    var scrollTop1 = luckysheet.chartparam.luckysheetCurrentChartMoveXy[5];

                    var chart_id = luckysheet.chartparam.luckysheetCurrentChartMoveObj.find(".luckysheet-modal-dialog-content").attr("id");

                    var sheetIndex = !!window.store && store.state.chartSetting.chartList[chart_id].sheetIndex;

                    //去除chartobj,改用chart_id代替即可定位到此图表
                    luckysheet.jfredo.push({ "type": "moveChart", "chart_id": chart_id, "sheetIndex": sheetIndex, "myTop": myTop, "myLeft": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft, "x": x, "y": y, "scrollTop1": scrollTop1, "scrollLeft1": scrollLeft1  });
                    
                    //在store中更新数据
                    !!window.store && store.commit({
                        type:"updateChartItem",
                        key:"left",
                        value:myLeft,
                        chartId:chart_id
                    });

                    !!window.store && store.commit({
                        type:"updateChartItem",
                        key:"top",
                        value:myTop,
                        chartId:chart_id
                    });

                    // luckysheet.sheetmanage.saveChart({ "chart_id": chart_id, "sheetIndex": sheetIndex, "top": myTop, "left": myLeft });
                    //存储滚动条位置
                    luckysheet.server.saveParam("c", sheetIndex, { "left":myLeft, "top":myTop,"scrollTop": scrollTop, "scrollLeft": scrollLeft }, { "op":"xy", "cid": chart_id});
                    //协同编辑时可能影响用户操作，可以考虑不存储滚动条位置（google sheet没有存储滚动条位置）
                    // luckysheet.server.saveParam("c", sheetIndex, { "left":myLeft, "top":myTop }, { "op":"xy", "cid": chart_id});
                }
            }

            if (!!luckysheet.formula.rangeResize) {
                luckysheet.formula.rangeResizeDragged(event, luckysheet.formula.rangeResizeObj, luckysheet.formula.rangeResize, luckysheet.formula.rangeResizexy, luckysheet.formula.rangeResizeWinW, luckysheet.formula.rangeResizeWinH);
            }


             //图表改变大小 chartMix
            if (!!luckysheet.chartparam.luckysheetCurrentChartResize) {
                luckysheet.chartparam.luckysheetCurrentChartResize = null;
                if (luckysheet.chartparam.luckysheetInsertChartTosheetChange) {
                    var myHeight = luckysheet.chartparam.luckysheetCurrentChartResizeObj.height(), myWidth = luckysheet.chartparam.luckysheetCurrentChartResizeObj.width(), scrollLeft = $("#luckysheet-cell-main").scrollLeft(), scrollTop = $("#luckysheet-cell-main").scrollTop();

                    var myTop = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("top"),
                        myLeft = luckysheet.chartparam.luckysheetCurrentChartMoveObj.css("left")

                   
                    var chart_id = luckysheet.chartparam.luckysheetCurrentChartResizeObj.find(".luckysheet-modal-dialog-content").attr("id");
                    var sheetIndex = !!window.store && store.state.chartSetting.chartList[chart_id].sheetIndex;

                    var myWidth1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[2];
                    var myHeight1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[3];
                    var x = luckysheet.chartparam.luckysheetCurrentChartResizeXy[4];//增加上一次的位置x，y
                    var y = luckysheet.chartparam.luckysheetCurrentChartResizeXy[5];
                    var scrollLeft1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[6];
                    var scrollTop1 = luckysheet.chartparam.luckysheetCurrentChartResizeXy[7];

                    luckysheet.jfredo.push({ "type": "resizeChart", "chart_id": chart_id, "sheetIndex": sheetIndex,"myTop": myTop, "myLeft": myLeft, "myHeight": myHeight, "myWidth": myWidth, "scrollTop": scrollTop, "scrollLeft": scrollLeft, "x": x, "y": y, "myWidth1": myWidth1, "myHeight1": myHeight1, "scrollTop1": scrollTop1, "scrollLeft1": scrollLeft1 });

                    !!window.store && store.commit({
                        type:"updateChartItem",
                        key:"height",
                        value:myHeight,
                        chartId:chart_id
                    });

                    !!window.store && store.commit({
                        type:"updateChartItem",
                        key:"width",
                        value:myWidth,
                        chartId:chart_id
                    });

                    !!window.store && store.commit({
                        type:"updateChartItem",
                        key:"left",
                        value:myLeft,
                        chartId:chart_id
                    });

                    !!window.store && store.commit({
                        type:"updateChartItem",
                        key:"top",
                        value:myTop,
                        chartId:chart_id
                    });

                    //加上滚动条的位置
                    // luckysheet.sheetmanage.saveChart({ "chart_id": chart_id, "sheetIndex": sheetIndex, "height": myHeight, "width": myWidth, "top": myTop, "left": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft });

                    luckysheet.server.saveParam("c", sheetIndex, { "width":myWidth, "height":myHeight, "top": myTop, "left": myLeft, "scrollTop": scrollTop, "scrollLeft": scrollLeft}, { "op":"wh", "cid": chart_id});
                    // luckysheet.server.saveParam("c", sheetIndex, { "width":myWidth, "height":myHeight, "top": myTop, "left": myLeft }, { "op":"wh", "cid": chart_id});
                }
            }

            //批注框 移动
            if (luckysheet.postil.move) {
                luckysheet.postil.move = false;

                var ps_id = luckysheet.postil.currentObj.closest(".luckysheet-postil-show").attr("id");

                var ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
                var ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

                var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                var rc = [];

                d[ps_r][ps_c].ps.left = luckysheet.postil.currentObj.position().left;
                d[ps_r][ps_c].ps.top = luckysheet.postil.currentObj.position().top;
                d[ps_r][ps_c].ps.value = luckysheet.postil.currentObj.find(".formulaInputFocus").text();

                rc.push(ps_r + "_" + ps_c);

                luckysheet.postil.ref(d, rc);

                $("#" + ps_id).remove();

                if(d[ps_r][ps_c].ps.isshow){
                    luckysheet.postil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                    $("#" + ps_id).addClass("luckysheet-postil-show-active");
                    $("#" + ps_id).find(".luckysheet-postil-dialog-resize").show();
                }
                else{
                    luckysheet.postil.editPs(ps_r, ps_c);
                }
            }

            //批注框 改变大小
            if (!!luckysheet.postil.resize) {
                luckysheet.postil.resize = null;

                var ps_id = luckysheet.postil.currentObj.closest(".luckysheet-postil-show").attr("id");

                var ps_r = ps_id.split("luckysheet-postil-show_")[1].split("_")[0];
                var ps_c = ps_id.split("luckysheet-postil-show_")[1].split("_")[1];

                var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                var rc = [];

                d[ps_r][ps_c].ps.left = luckysheet.postil.currentObj.position().left;
                d[ps_r][ps_c].ps.top = luckysheet.postil.currentObj.position().top;
                d[ps_r][ps_c].ps.width = luckysheet.postil.currentObj.outerWidth();
                d[ps_r][ps_c].ps.height = luckysheet.postil.currentObj.outerHeight();
                d[ps_r][ps_c].ps.value = luckysheet.postil.currentObj.find(".formulaInputFocus").text();

                rc.push(ps_r + "_" + ps_c);

                luckysheet.postil.ref(d, rc);

                $("#" + ps_id).remove();

                if(d[ps_r][ps_c].ps.isshow){
                    luckysheet.postil.buildPs(ps_r, ps_c, d[ps_r][ps_c].ps);
                    $("#" + ps_id).addClass("luckysheet-postil-show-active");
                    $("#" + ps_id).find(".luckysheet-postil-dialog-resize").show();
                }
                else{
                    luckysheet.postil.editPs(ps_r, ps_c);
                }
            }

            //改变行高
            if (luckysheet_rows_change_size) {
                luckysheet_rows_change_size = false;

                $("#luckysheet-change-size-line").hide();
                $("#luckysheet-rows-change-size").css("opacity", 0);
                $("#luckysheet-sheettable, #luckysheet-rows-h, #luckysheet-rows-h canvas").css("cursor", "default");

                var mouse = mouseposition(event.pageX, event.pageY);
                var scrollTop = $("#luckysheet-rows-h").scrollTop();
                var y = mouse[1] + scrollTop;
                var winH = $(window).height();

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];

                if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                    var size = (y + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_rows_change_size_start[0];

                    if ((y + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_rows_change_size_start[0] < 19) {
                        size = 19;
                    }

                    if (y / luckysheetConfigsetting.pointEditZoom >= winH - 200 + scrollTop) {
                        size = winW - 200 - luckysheet_rows_change_size_start[0] + scrollTop;
                    }
                }
                else{
                    var size = (y + 3) - luckysheet_rows_change_size_start[0];

                    if ((y + 3) - luckysheet_rows_change_size_start[0] < 19) {
                        size = 19;
                    }

                    if (y >= winH - 200 + scrollTop) {
                        size = winW - 200 - luckysheet_rows_change_size_start[0] + scrollTop;
                    }
                }

                var cfg = $.extend(true, {}, config);
                if (cfg["rowlen"] == null) {
                    cfg["rowlen"] = {};
                }

                cfg["rowlen"][luckysheet_rows_change_size_start[1]] = Math.ceil(size);

                if (clearjfundo) {
                    luckysheet.jfundo = [];

                    luckysheet.jfredo.push({
                        "type": "resize",
                        "ctrlType": "resizeR",
                        "config": $.extend(true, {}, config),
                        "curconfig": $.extend(true, {}, cfg),
                        "sheetIndex": luckysheet.currentSheetIndex
                    });
                }

                //config
                config = cfg;
                luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

                luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["rowlen"], { "k": "rowlen" });

                luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, null);

                // if ($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).length > 0) {
                //     var $t = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).find(".luckysheet-filter-options").eq(0);
                //     var st_r = $t.data("str"), ed_r = $t.data("edr"), cindex = $t.data("cindex"), st_c = $t.data("stc"), ed_c = $t.data("edc");
                //     luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
                // }

                //luckysheet.cleargridelement(event);
            }

            //改变列宽
            if (luckysheet_cols_change_size) {
                luckysheet_cols_change_size = false;
                
                $("#luckysheet-change-size-line").hide();
                $("#luckysheet-cols-change-size").css("opacity", 0);
                $("#luckysheet-sheettable, #luckysheet-cols-h-c, .luckysheet-cols-h-cells, .luckysheet-cols-h-cells canvas").css("cursor", "default");

                var mouse = mouseposition(event.pageX, event.pageY);
                var scrollLeft = $("#luckysheet-cols-h-c").scrollLeft();
                var x = mouse[0] + scrollLeft;
                var winW = $(window).width();

                var row_index = visibledatarow.length - 1, row = visibledatarow[row_index], row_pre = 0;
                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                    var size = (x + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_cols_change_size_start[0];
                }
                else{
                    var size = (x + 3) - luckysheet_cols_change_size_start[0];
                }

                var firstcolumlen = defaultcollen;
                if (config["columlen"] != null && config["columlen"][luckysheet_cols_change_size_start[1]] != null) {
                    firstcolumlen = config["columlen"][luckysheet_cols_change_size_start[1]];
                }

                if (Math.abs(size - firstcolumlen) < 3) {
                    return;
                }

                if(luckysheetConfigsetting.pointEdit){//编辑器qksheet表格编辑状态
                    if ((x + 3) / luckysheetConfigsetting.pointEditZoom - luckysheet_cols_change_size_start[0] < 30) {
                        size = 30;
                    }

                    if (x / luckysheetConfigsetting.pointEditZoom >= winW - 100 + scrollLeft) {
                        size = winW - 100 - luckysheet_cols_change_size_start[0] + scrollLeft;
                    }
                }
                else{
                    if ((x + 3) - luckysheet_cols_change_size_start[0] < 30) {
                        size = 30;
                    }

                    if (x >= winW - 100 + scrollLeft) {
                        size = winW - 100 - luckysheet_cols_change_size_start[0] + scrollLeft;
                    }
                }

                var cfg = $.extend(true, {}, config);
                if (cfg["columlen"] == null) {
                    cfg["columlen"] = {};
                }

                cfg["columlen"][luckysheet_cols_change_size_start[1]] = Math.ceil(size);

                if (clearjfundo) {
                    luckysheet.jfundo = [];

                    luckysheet.jfredo.push({
                        "type": "resize",
                        "ctrlType": "resizeC",
                        "config": $.extend(true, {}, config),
                        "curconfig": $.extend(true, {}, cfg),
                        "sheetIndex": luckysheet.currentSheetIndex
                    });
                }

                //config
                config = cfg;
                luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

                luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["columlen"], { "k": "columlen" });

                luckysheet.jfrefreshgrid_rhcw(null, luckysheet.flowdata[0].length);

                // if ($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).length > 0) {
                //     var $t = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).find(".luckysheet-filter-options").eq(0);
                //     var st_r = $t.data("str"), ed_r = $t.data("edr"), cindex = $t.data("cindex"), st_c = $t.data("stc"), ed_c = $t.data("edc");
                //     luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
                // }

                setTimeout(function () {
                    luckysheet.luckysheetrefreshgrid();
                }, 1);
                //luckysheet.cleargridelement(event);
            }

            if (luckysheet.formula.rangeMove) {
                luckysheet.formula.rangeMoveDragged(luckysheet.formula.rangeMoveObj);
            }

            //改变选择框的位置并替换目标单元格
            if (luckysheet_cell_selected_move) {
                $("#luckysheet-cell-selected-move").hide();

                luckysheet_cell_selected_move = false;
                var mouse = mouseposition(event.pageX, event.pageY);

                var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                var scrollTop = $("#luckysheet-cell-main").scrollTop();

                var x = mouse[0] + scrollLeft;
                var y = mouse[1] + scrollTop;

                var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

                var rowLocation = luckysheet.rowLocation(y), row_index = rowLocation[2];
                var colLocation = luckysheet.colLocation(x), col_index = colLocation[2];

                var row_index_original = luckysheet_cell_selected_move_index[0], col_index_original = luckysheet_cell_selected_move_index[1];

                if(row_index == row_index_original && col_index == col_index_original){
                    return;
                }

                var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                var last = luckysheet_select_save[luckysheet_select_save.length - 1];
               
                var data = luckysheet.getdatabyselection(last);

                var cfg = $.extend(true, {}, config);
                if(cfg["merge"] == null){
                    cfg["merge"] = {};
                }
                if(cfg["rowlen"] == null){
                    cfg["rowlen"] = {};
                }

                //选区包含部分单元格
                if(luckysheet.hasPartMC(cfg, last["row"][0], last["row"][1], last["column"][0], last["column"][1])){
                    if(luckysheet.isEditMode()){
                        alert("无法对合并单元格执行此操作");
                    }
                    else{
                        luckysheet.tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示',"无法对合并单元格执行此操作");
                    }
                    return;
                }

                var row_s = last["row"][0] - row_index_original + row_index, row_e = last["row"][1] - row_index_original + row_index;
                var col_s = last["column"][0] - col_index_original + col_index, col_e = last["column"][1] - col_index_original + col_index;
                
                if (row_s < 0 || y < 0) {
                    row_s = 0;
                    row_e = last["row"][1] - last["row"][0];
                }

                if (col_s < 0 || x < 0) {
                    col_s = 0;
                    col_e = last["column"][1] - last["column"][0];
                }

                if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                    row_s = visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                    row_e = visibledatarow.length - 1;
                }

                if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                    col_s = visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                    col_e = visibledatacolumn.length - 1;
                }

                //替换的位置包含部分单元格
                if(luckysheet.hasPartMC(cfg, row_s, row_e, col_s, col_e)){
                    if(luckysheet.isEditMode()){
                        alert("无法对合并单元格执行此操作");
                    }
                    else{
                        luckysheet.tooltip.info('<i class="fa fa-exclamation-triangle"></i>提示',"无法对合并单元格执行此操作");
                    }
                    return;
                }

                var borderInfoCompute = luckysheet.getBorderInfoCompute(luckysheet.currentSheetIndex);


                //删除原本位置的数据
                var RowlChange = null;
                for (var r = last["row"][0]; r <= last["row"][1]; r++) {
                    if(r in cfg["rowlen"]){
                        RowlChange = true;
                    }

                    for (var c = last["column"][0]; c <= last["column"][1]; c++) {
                        var cell = d[r][c];

                        if(luckysheet.getObjType(cell) == "object" && ("mc" in cell)){
                            if((cell["mc"].r + "_" + cell["mc"].c) in cfg["merge"]){
                                delete cfg["merge"][cell["mc"].r + "_" + cell["mc"].c];
                            }
                        }

                        d[r][c] = null;
                    }
                }

                //边框
                if(cfg["borderInfo"] && cfg["borderInfo"].length > 0){
                    var borderInfo = [];

                    for(var i = 0; i < cfg["borderInfo"].length; i++){
                        var bd_rangeType = cfg["borderInfo"][i].rangeType;

                        if(bd_rangeType == "range"){
                            var bd_range = cfg["borderInfo"][i].range;
                            var bd_emptyRange = [];

                            for(var j = 0; j < bd_range.length; j++){
                                bd_emptyRange = bd_emptyRange.concat(luckysheet.conditionformat.CFSplitRange(bd_range[j], {"row": last["row"], "column": last["column"]}, {"row": [row_s, row_e], "column": [col_s, col_e]}, "restPart"));
                            }

                            cfg["borderInfo"][i].range = bd_emptyRange;

                            borderInfo.push(cfg["borderInfo"][i]);
                        }
                        else if(bd_rangeType == "cell"){
                            var bd_r = cfg["borderInfo"][i].value.row_index;
                            var bd_c = cfg["borderInfo"][i].value.col_index;

                            if(!(bd_r >= last["row"][0] && bd_r <= last["row"][1] && bd_c >= last["column"][0] && bd_c <= last["column"][1])){
                                borderInfo.push(cfg["borderInfo"][i]);
                            }
                        }
                    }

                    cfg["borderInfo"] = borderInfo;
                }
                
                //替换位置数据更新
                var offsetMC = {};
                for (var r = 0; r < data.length; r++) {
                    for (var c = 0; c < data[0].length; c++) {
                        if(borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])]){
                            var bd_obj = {
                                "rangeType": "cell",
                                "value": {
                                    "row_index": r + row_s,
                                    "col_index": c + col_s,
                                    "l": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].l,
                                    "r": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].r,
                                    "t": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].t,
                                    "b": borderInfoCompute[(r + last["row"][0]) + "_" + (c + last["column"][0])].b
                                }
                            }

                            if(cfg["borderInfo"] == null){
                                cfg["borderInfo"] = [];
                            }

                            cfg["borderInfo"].push(bd_obj);
                        }

                        var value = "";
                        if (data[r] != null && data[r][c] != null) {
                            value = data[r][c];
                        }

                        if(luckysheet.getObjType(value) == "object" && ("mc" in value)){
                            var mc = $.extend(true, {}, value["mc"]);
                            if("rs" in value["mc"]){
                                offsetMC[mc.r + "_" + mc.c] = [r + row_s, c + col_s];

                                value["mc"].r = r + row_s;
                                value["mc"].c = c + col_s;

                                cfg["merge"][(r + row_s) + "_" + (c + col_s)] = value["mc"];
                            }
                            else{
                                value["mc"].r = offsetMC[mc.r + "_" + mc.c][0];
                                value["mc"].c = offsetMC[mc.r + "_" + mc.c][1];   
                            }
                        }
                        d[r + row_s][c + col_s] = value;
                    }
                }

                if(RowlChange){
                    cfg = luckysheet.rowlenByRange(d, last["row"][0], last["row"][1], cfg);
                    cfg = luckysheet.rowlenByRange(d, row_s, row_e, cfg);
                }

                //条件格式
                var cdformat = $.extend(true, [], luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"]);
                if(cdformat != null && cdformat.length > 0){
                    for(var i = 0; i < cdformat.length; i++){
                        var cdformat_cellrange = cdformat[i].cellrange;
                        var emptyRange = [];
                        for(var j = 0; j < cdformat_cellrange.length; j++){
                            var range = luckysheet.conditionformat.CFSplitRange(cdformat_cellrange[j], {"row": last["row"], "column": last["column"]}, {"row": [row_s, row_e], "column": [col_s, col_e]}, "allPart");
                            emptyRange = emptyRange.concat(range);
                        }
                        cdformat[i].cellrange = emptyRange;
                    }
                }

                if(luckysheet_select_save[0].row_focus == luckysheet_select_save[0].row[0]){
                    var rf = row_s;
                }
                else{
                    var rf = row_e;
                }

                if(luckysheet_select_save[0].column_focus == luckysheet_select_save[0].column[0]){
                    var cf = col_s;
                }
                else{
                    var cf = col_e;
                }

                var range = [];
                range.push({ "row": last["row"], "column": last["column"] });
                range.push({ "row": [row_s, row_e], "column": [col_s, col_e] });

                last["row"] = [row_s, row_e];
                last["column"] = [col_s, col_e];
                last["row_focus"] = rf;
                last["column_focus"] = cf;

                luckysheet.jfrefreshgrid(d, range, cfg, cdformat, RowlChange);

                luckysheet.selectHightlightShow();

                $("#luckysheet-sheettable").css("cursor", "default");
                clearTimeout(jfcountfuncTimeout);
                jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
            }

            //图表选区拖拽移动
            if (luckysheet.chart_selection.rangeMove) {
                luckysheet.chart_selection.rangeMoveDragged();
            }

            //图表选区拖拽拉伸
            if (!!luckysheet.chart_selection.rangeResize) {
                luckysheet.chart_selection.rangeResizeDragged();
            }

            //选区下拉
            if (luckysheet_cell_selected_extend) {
                luckysheet_cell_selected_extend = false;
                $("#luckysheet-cell-selected-extend").hide();

                var mouse = mouseposition(event.pageX, event.pageY);
                var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                var scrollTop = $("#luckysheet-cell-main").scrollTop();

                var x = mouse[0] + scrollLeft - 5;
                var y = mouse[1] + scrollTop - 5;

                var winH = $(window).height() + scrollTop - sheetBarHeight - statisticBarHeight, winW = $(window).width() + scrollLeft;

                var rowLocation = luckysheet.rowLocation(y), row = rowLocation[1], row_pre = rowLocation[0], row_index = rowLocation[2];
                var colLocation = luckysheet.colLocation(x), col = colLocation[1], col_pre = colLocation[0], col_index = colLocation[2];

                var row_index_original = luckysheet_cell_selected_extend_index[0], col_index_original = luckysheet_cell_selected_extend_index[1];

                var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                var row_s = last["row"][0], row_e = last["row"][1];
                var col_s = last["column"][0], col_e = last["column"][1];

                if (row_s < 0 || y < 0) {
                    row_s = 0;
                    row_e = last["row"][1] - last["row"][0];
                }

                if (col_s < 0 || x < 0) {
                    col_s = 0;
                    col_e = last["column"][1] - last["column"][0];
                }

                if (row_e >= visibledatarow[visibledatarow.length - 1] || y > winH) {
                    row_s = visibledatarow.length - 1 - last["row"][1] + last["row"][0];
                    row_e = visibledatarow.length - 1;
                }

                if (col_e >= visibledatacolumn[visibledatacolumn.length - 1] || x > winW) {
                    col_s = visibledatacolumn.length - 1 - last["column"][1] + last["column"][0];
                    col_e = visibledatacolumn.length - 1;
                }

                //复制范围
                luckysheet.dropCell.copyRange = {"row": $.extend(true, [], last["row"]), "column": $.extend(true, [], last["column"])};
                //applyType
                var typeItemHide = luckysheet.dropCell.typeItemHide();
                
                if(!typeItemHide[0] && !typeItemHide[1] && !typeItemHide[2] && !typeItemHide[3] && !typeItemHide[4] && !typeItemHide[5] && !typeItemHide[6]){
                    luckysheet.dropCell.applyType = "0";
                }
                else{
                    luckysheet.dropCell.applyType = "1";
                }

                if (Math.abs(row_index_original - row_index) > Math.abs(col_index_original - col_index)) {
                    if (!(row_index >= row_s && row_index <= row_e)) {
                        if (luckysheet_select_save[0].top_move >= row_pre) {//当往上拖拽时
                            luckysheet.dropCell.applyRange = {"row": [row_index, last["row"][0] - 1], "column": last["column"]};
                            luckysheet.dropCell.direction = "up";

                            row_s -= last["row"][0] - row_index;

                            //是否有数据透视表范围
                            if(luckysheet.pivotTable.isPivotRange(row_s, col_e)){
                                luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                                return;
                            }
                        }
                        else {//当往下拖拽时
                            luckysheet.dropCell.applyRange = {"row": [last["row"][1] + 1, row_index], "column": last["column"]};
                            luckysheet.dropCell.direction = "down";

                            row_e += row_index - last["row"][1];

                            //是否有数据透视表范围
                            if(luckysheet.pivotTable.isPivotRange(row_e, col_e)){
                                luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                                return;
                            }
                        }
                    }
                    else{
                        return;
                    }
                }
                else {
                    if (!(col_index >= col_s && col_index <= col_e)) {
                        if (luckysheet_select_save[0].left_move >= col_pre) {//当往左拖拽时
                            luckysheet.dropCell.applyRange = {"row": last["row"], "column": [col_index, last["column"][0] - 1]};
                            luckysheet.dropCell.direction = "left";

                            col_s -= last["column"][0] - col_index;

                            //是否有数据透视表范围
                            if(luckysheet.pivotTable.isPivotRange(row_e, col_s)){
                                luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                                return;
                            }
                        }
                        else {//当往右拖拽时
                            luckysheet.dropCell.applyRange = {"row": last["row"], "column": [last["column"][1] + 1, col_index]};
                            luckysheet.dropCell.direction = "right";

                            col_e += col_index - last["column"][1];

                            //是否有数据透视表范围
                            if(luckysheet.pivotTable.isPivotRange(row_e, col_e)){
                                luckysheet.tooltip.info("无法对所选单元格进行此更改，因为它会影响数据透视表！","");
                                return;
                            }
                        }
                    }
                    else{
                        return;
                    }
                }

                if(config["merge"] != null){
                    var hasMc = false;

                    for(var r = last["row"][0]; r <= last["row"][1]; r++){
                        for(var c = last["column"][0]; c <= last["column"][1]; c++){
                            var cell = luckysheet.flowdata[r][c];

                            if(cell != null && cell.mc != null){
                                hasMc = true;
                                break;
                            }
                        }
                    }

                    if(hasMc){
                        if(luckysheet.isEditMode()){
                            alert("无法对合并单元格执行此操作");
                        }
                        else{
                            luckysheet.tooltip.info("无法对合并单元格执行此操作", ""); 
                        }

                        return;
                    }

                    for(var r = row_s; r <= row_e; r++){
                        for(var c = col_s; c <= col_e; c++){
                            var cell = luckysheet.flowdata[r][c];

                            if(cell != null && cell.mc != null){
                                hasMc = true;
                                break;
                            }
                        }
                    }

                    if(hasMc){
                        if(luckysheet.isEditMode()){
                            alert("无法对合并单元格执行此操作");
                        }
                        else{
                            luckysheet.tooltip.info("无法对合并单元格执行此操作", ""); 
                        }

                        return;
                    }
                }

                last["row"] = [row_s, row_e];
                last["column"] = [col_s, col_e];

                luckysheet.dropCell.update();
                luckysheet.dropCell.createIcon();

                $("#luckysheet-cell-selected-move").hide();

                $("#luckysheet-sheettable").css("cursor", "default");
                clearTimeout(jfcountfuncTimeout);
                jfcountfuncTimeout = setTimeout(function () { jfcountfunc() }, 500);
            }
        });