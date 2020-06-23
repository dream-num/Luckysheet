import Store from '../store'

let visibledatarow = Store.visibledatarow;

export default luckysheetFreezen = {
        freezenHorizontalHTML: '<div id="luckysheet-freezebar-horizontal" class="luckysheet-freezebar" tabindex="0"><div class="luckysheet-freezebar-handle luckysheet-freezebar-horizontal-handle" ><div class="luckysheet-freezebar-handle-bar luckysheet-freezebar-horizontal-handle-title" ></div><div class="luckysheet-freezebar-handle-bar luckysheet-freezebar-horizontal-handle-bar" ></div></div><div class="luckysheet-freezebar-drop luckysheet-freezebar-horizontal-drop" ><div class="luckysheet-freezebar-drop-bar luckysheet-freezebar-horizontal-drop-title" ></div><div class="luckysheet-freezebar-drop-bar luckysheet-freezebar-horizontal-drop-bar" >&nbsp;</div></div></div>',
        freezenVerticalHTML: '<div id="luckysheet-freezebar-vertical" class="luckysheet-freezebar" tabindex="0"><div class="luckysheet-freezebar-handle luckysheet-freezebar-vertical-handle" ><div class="luckysheet-freezebar-handle-bar luckysheet-freezebar-vertical-handle-title" ></div><div class="luckysheet-freezebar-handle-bar luckysheet-freezebar-vertical-handle-bar" ></div></div><div class="luckysheet-freezebar-drop luckysheet-freezebar-vertical-drop" ><div class="luckysheet-freezebar-drop-bar luckysheet-freezebar-vertical-drop-title" ></div><div class="luckysheet-freezebar-drop-bar luckysheet-freezebar-vertical-drop-bar" >&nbsp;</div></div></div>',
        initialHorizontal: true,
        initialVertical: true,
        horizontalmovestate: false,
        horizontalmoveposition: null,
        verticalmovestate: false,
        verticalmoveposition: null,
        windowHeight: null,
        windowWidth: null,
        freezenhorizontaldata: null,
        freezenverticaldata: null,
        cutVolumn: function (arr, cutindex) {
            if(cutindex <= 0){
                return arr;
            }

            var pre = arr.slice(0, cutindex);
            var premax = pre[pre.length - 1];
            var ret = arr.slice(cutindex);
            
            for (var i = 0; i < ret.length; i++) {
                ret[i] -= premax;
            }
            return ret;
        },
        cancelFreezenVertical: function (sheetIndex) {
            $("#luckysheet-freezen-btn-vertical").html('<i class="fa fa-indent"></i> 冻结首列');
            Freezen.freezenverticaldata = null;
            var isvertical = $("#luckysheet-freezebar-vertical").is(":visible");
            $("#luckysheet-freezebar-vertical").hide();

            if (sheetIndex == null) {
                sheetIndex = luckysheet.currentSheetIndex;
            }
            var currentSheet = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(sheetIndex)];
            if (currentSheet.freezen != null) {
                currentSheet.freezen.vertical = null;
            }

            if(currentSheet.freezen != null && isvertical){
                luckysheet.server.saveParam("all", sheetIndex, currentSheet.freezen, { "k": "freezen" });
            }
        },
        createFreezenVertical: function (freezenverticaldata, left) {
            if (this.initialVertical) {
                this.initialVertical = false;
                $("#luckysheet-grid-window-1").append(this.freezenVerticalHTML);

                $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-drop").hover(function () {
                    $(this).parent().addClass("luckysheet-freezebar-hover");
                }, function () {
                    $(this).parent().removeClass("luckysheet-freezebar-hover");
                });


                $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-drop").mousedown(function () {
                    Freezen.verticalmovestate = true;
                    Freezen.verticalmoveposition = $(this).position().left;

                    Freezen.windowWidth = $("#luckysheet-grid-window-1").width();

                    $(this).parent().addClass("luckysheet-freezebar-active");

                    $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css("cursor", "-webkit-grabbing");
                });

                var gridheight = $("#luckysheet-grid-window-1").height();
                $("#luckysheet-freezebar-vertical").find(".luckysheet-freezebar-vertical-handle").css({ "height": gridheight - 10, "width": "4px", "cursor": "-webkit-grab", "top": "0px" }).end().find(".luckysheet-freezebar-vertical-drop").css({ "height": gridheight - 10, "width": "4px", "top": "0px", "cursor": "-webkit-grab" });
            }

            if (freezenverticaldata == null) {
                var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                var dataset_col_st = luckysheet_searcharray(visibledatacolumn, scrollLeft);
                if (dataset_col_st == -1) {
                    dataset_col_st = 0;
                }

                left = visibledatacolumn[dataset_col_st] - 2 - scrollLeft + rowHeaderWidth;
                freezenverticaldata = [visibledatacolumn[dataset_col_st], dataset_col_st + 1, scrollLeft, Freezen.cutVolumn(visibledatacolumn, dataset_col_st + 1), left];
                Freezen.saveFreezen(null, null, freezenverticaldata, left);
            }

            Freezen.freezenverticaldata = freezenverticaldata;

            $("#luckysheet-freezen-btn-horizontal").html('<i class="fa fa-indent"></i> 取消冻结');

            $("#luckysheet-freezebar-vertical").show().find(".luckysheet-freezebar-vertical-handle").css({ "left": left }).end().find(".luckysheet-freezebar-vertical-drop").css({ "left": left });
        },
        saveFreezen: function (freezenhorizontaldata, top, freezenverticaldata, left) {
            var currentSheet = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];
            if (currentSheet.freezen == null) {
                currentSheet.freezen = {};
            }

            if (freezenhorizontaldata != null) {
                if (currentSheet.freezen.horizontal == null) {
                    currentSheet.freezen.horizontal = {};
                }

                currentSheet.freezen.horizontal.freezenhorizontaldata = freezenhorizontaldata;
                currentSheet.freezen.horizontal.top = top;
            }

            if (freezenverticaldata != null) {
                if (currentSheet.freezen.vertical == null) {
                    currentSheet.freezen.vertical = {};
                }

                currentSheet.freezen.vertical.freezenverticaldata = freezenverticaldata;
                currentSheet.freezen.vertical.left = left;
            }

            if(currentSheet.freezen != null){
                luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, currentSheet.freezen, { "k": "freezen" });
            }
        },
        initialFreezen: function (sheetIndex) {
            var currentSheet = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(sheetIndex)];
            if (currentSheet.freezen != null && currentSheet.freezen.horizontal != null && currentSheet.freezen.horizontal.freezenhorizontaldata != null) {
                this.createFreezenHorizontal(currentSheet.freezen.horizontal.freezenhorizontaldata, currentSheet.freezen.horizontal.top);
                
            }
            else {
                this.cancelFreezenHorizontal(sheetIndex);
            }

            if (currentSheet.freezen != null && currentSheet.freezen.vertical != null && currentSheet.freezen.vertical.freezenverticaldata != null) {
                this.createFreezenVertical(currentSheet.freezen.vertical.freezenverticaldata, currentSheet.freezen.vertical.left);
            }
            else {
                this.cancelFreezenVertical(sheetIndex);
            }


            this.createAssistCanvas();
        },
        changeFreezenIndex: function (originindex, type) {
            if (type == "v" && this.freezenverticaldata != null) {
                var freezen_colindex = this.freezenverticaldata[1];
                var offset = luckysheet_searcharray(visibledatacolumn, $("#luckysheet-cell-main").scrollLeft());

                if (originindex - offset < freezen_colindex) {
                    originindex = originindex - offset;
                }

            }
            else if (type == "h" && this.freezenhorizontaldata != null) {
                var freezen_rowindex = this.freezenhorizontaldata[1];
                var offset = luckysheet_searcharray(visibledatarow, $("#luckysheet-cell-main").scrollTop());
                if (originindex - offset < freezen_rowindex) {
                    originindex = originindex - offset;
                }

            }
            return originindex;
        },
        scrollFreezen: function () {
            var row_focus = luckysheet_select_save[0]["row_focus"];
            if(row_focus == luckysheet_select_save[0]["row"][0]){
                var row = luckysheet_select_save[0]["row"][1];
            }
            else if(row_focus == luckysheet_select_save[0]["row"][1]){
                var row = luckysheet_select_save[0]["row"][0];
            }

            var column_focus = luckysheet_select_save[0]["column_focus"];
            if(column_focus == luckysheet_select_save[0]["column"][0]){
                var column = luckysheet_select_save[0]["column"][1];
            }
            else if(column_focus == luckysheet_select_save[0]["column"][1]){
                var column = luckysheet_select_save[0]["column"][0];
            }

            if (this.freezenverticaldata != null) {
                var freezen_colindex = this.freezenverticaldata[1];
                var offset = luckysheet_searcharray(this.freezenverticaldata[3], $("#luckysheet-cell-main").scrollLeft());

                freezen_colindex += offset;
                
                if (column <= freezen_colindex) {
                    setTimeout(function () { $("#luckysheet-scrollbar-x").scrollLeft(0); }, 10);
                }
            }

            if (this.freezenhorizontaldata != null) {
                var freezen_rowindex = this.freezenhorizontaldata[1];
                var offset = luckysheet_searcharray(this.freezenhorizontaldata[3], $("#luckysheet-cell-main").scrollTop());

                freezen_rowindex += offset;

                if (row <= freezen_rowindex) {
                    setTimeout(function () { $("#luckysheet-scrollbar-y").scrollTop(0); }, 10);
                }
            }
        },
        cancelFreezenHorizontal: function (sheetIndex) {
            $("#luckysheet-freezen-btn-horizontal").html('<i class="fa fa-list-alt"></i> 冻结首行');
            Freezen.freezenhorizontaldata = null;
            var ishorizontal = $("#luckysheet-freezebar-horizontal").is(":visible");
            $("#luckysheet-freezebar-horizontal").hide();

            if (sheetIndex == null) {
                sheetIndex = luckysheet.currentSheetIndex;
            }

            var currentSheet = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(sheetIndex)];
            if (currentSheet.freezen != null) {
                currentSheet.freezen.horizontal = null;
            }

            if(currentSheet.freezen != null && ishorizontal){
                luckysheet.server.saveParam("all", sheetIndex, currentSheet.freezen, { "k": "freezen" });
            }
        },
        createFreezenHorizontal: function (freezenhorizontaldata, top) {
            if (this.initialHorizontal) {
                this.initialHorizontal = false;
                $("#luckysheet-grid-window-1").append(this.freezenHorizontalHTML);

                $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-drop").hover(function () {
                    $(this).parent().addClass("luckysheet-freezebar-hover");
                }, function () {
                    $(this).parent().removeClass("luckysheet-freezebar-hover");
                });


                $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-drop").mousedown(function () {
                    Freezen.horizontalmovestate = true;
                    Freezen.horizontalmoveposition = $(this).position().top;

                    Freezen.windowHeight = $("#luckysheet-grid-window-1").height();

                    $(this).parent().addClass("luckysheet-freezebar-active");

                    $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css("cursor", "-webkit-grabbing");
                });

                var gridwidth = $("#luckysheet-grid-window-1").width();
                $("#luckysheet-freezebar-horizontal").find(".luckysheet-freezebar-horizontal-handle").css({ "width": gridwidth - 10, "height": "4px", "cursor": "-webkit-grab", "left": "0px" }).end().find(".luckysheet-freezebar-horizontal-drop").css({ "width": gridwidth - 10, "height": "4px", "left": "0px", "cursor": "-webkit-grab" });
            }

            if (freezenhorizontaldata == null) {
                var scrollTop = $("#luckysheet-cell-main").scrollTop();
                var dataset_row_st = luckysheet_searcharray(visibledatarow, scrollTop);
                if (dataset_row_st == -1) {
                    dataset_row_st = 0;
                }

                top = visibledatarow[dataset_row_st] - 2 - scrollTop + columeHeaderHeight;
                freezenhorizontaldata = [visibledatarow[dataset_row_st], dataset_row_st + 1, scrollTop, Freezen.cutVolumn(visibledatarow, dataset_row_st + 1), top];
                Freezen.saveFreezen(freezenhorizontaldata, top, null, null);
            }

            Freezen.freezenhorizontaldata = freezenhorizontaldata;

            $("#luckysheet-freezen-btn-horizontal").html('<i class="fa fa-list-alt"></i> 取消冻结');

            $("#luckysheet-freezebar-horizontal").show().find(".luckysheet-freezebar-horizontal-handle").css({ "top": top }).end().find(".luckysheet-freezebar-horizontal-drop").css({ "top": top });
        },
        createAssistCanvas: function(){
            var _this = this;
            _this.removeAssistCanvas();
            if (_this.freezenverticaldata != null || _this.freezenhorizontaldata != null) {

                var freezen_horizon_px, freezen_horizon_ed, freezen_horizon_scrollTop;
                var freezen_vertical_px, freezen_vertical_ed, freezen_vertical_scrollTop;
                var drawWidth = luckysheetTableContentHW[0], drawHeight = luckysheetTableContentHW[1];
                //双向freezen开始
                if (_this.freezenverticaldata != null && _this.freezenhorizontaldata != null) {
                    freezen_horizon_px = _this.freezenhorizontaldata[0];
                    freezen_horizon_ed = _this.freezenhorizontaldata[1];
                    freezen_horizon_scrollTop = _this.freezenhorizontaldata[2];

                    freezen_vertical_px = _this.freezenverticaldata[0];
                    freezen_vertical_ed = _this.freezenverticaldata[1];
                    freezen_vertical_scrollTop = _this.freezenverticaldata[2];

                    //3
                    // _this.createCanvas("freezen_3",freezen_vertical_px - freezen_vertical_scrollTop, freezen_horizon_px-freezen_horizon_scrollTop+1, rowHeaderWidth, columeHeaderHeight);
                    _this.createCanvas("freezen_3", freezen_vertical_px - freezen_vertical_scrollTop, freezen_horizon_px - freezen_horizon_scrollTop + 1, rowHeaderWidth - 1, columeHeaderHeight - 1);
                    //4
                    // _this.createCanvas("freezen_4",drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, freezen_horizon_px-freezen_horizon_scrollTop+1, freezen_vertical_px - freezen_vertical_scrollTop + rowHeaderWidth,columeHeaderHeight);
                    _this.createCanvas("freezen_4", drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, freezen_horizon_px - freezen_horizon_scrollTop + 1, freezen_vertical_px - freezen_vertical_scrollTop + rowHeaderWidth - 1, columeHeaderHeight - 1);
                    //7
                    // _this.createCanvas("freezen_7",freezen_vertical_px - freezen_vertical_scrollTop, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop-columeHeaderHeight, rowHeaderWidth, freezen_horizon_px - freezen_horizon_scrollTop + columeHeaderHeight);
                    _this.createCanvas("freezen_7", freezen_vertical_px - freezen_vertical_scrollTop, drawHeight - freezen_horizon_px + freezen_horizon_scrollTop - columeHeaderHeight, rowHeaderWidth - 1, freezen_horizon_px - freezen_horizon_scrollTop + columeHeaderHeight - 1);
                }
                //水平freezen开始
                else if (_this.freezenhorizontaldata != null) {
                    freezen_horizon_px = _this.freezenhorizontaldata[0];
                    freezen_horizon_ed = _this.freezenhorizontaldata[1];
                    freezen_horizon_scrollTop = _this.freezenhorizontaldata[2];

                    // _this.createCanvas("freezen_h", drawWidth, freezen_horizon_px - freezen_horizon_scrollTop + 1, rowHeaderWidth, columeHeaderHeight);
                    _this.createCanvas("freezen_h", drawWidth, freezen_horizon_px - freezen_horizon_scrollTop + 1, rowHeaderWidth - 1, columeHeaderHeight - 1);
                    
                }
                //水平freezon结束

                //垂直freezen开始
                else if (_this.freezenverticaldata != null) {
                    freezen_vertical_px = _this.freezenverticaldata[0];
                    freezen_vertical_ed = _this.freezenverticaldata[1];
                    freezen_vertical_scrollTop = _this.freezenverticaldata[2];

                    // _this.createCanvas("freezen_v", freezen_vertical_px - freezen_vertical_scrollTop, drawHeight, rowHeaderWidth, columeHeaderHeight);
                    _this.createCanvas("freezen_v", freezen_vertical_px - freezen_vertical_scrollTop, drawHeight, rowHeaderWidth - 1, columeHeaderHeight - 1);
                }
                //垂直freezen结束

                // $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").css("z-index", 10001);

                // setTimeout(function(){
                //     luckysheet.luckysheetsizeauto();
                // },0);

                Freezen.scrollAdapt();
            }
        },
        createCanvas: function(id, width, height, left, top){
            var c = $("<canvas/>").appendTo("#luckysheet-grid-window-1").attr({"id":id, "width":Math.ceil(width*devicePixelRatio), "height":Math.ceil(height*devicePixelRatio)}).css({"user-select":"none","postion":"absolute","left":left, "top":top,"width":width, "height":height, "z-index":10, "pointer-events":"none"});
        },
        removeAssistCanvas: function(){
            $("#luckysheet-grid-window-1 > canvas").not($("#luckysheetTableContent")).remove();
            $("#luckysheet-cell-selected").css("z-index", 15);
        },
        scrollAdapt: function(){
            //有冻结时 选区框 滚动适应
            if(luckysheet_select_save != null && luckysheet_select_save.length > 0){
                Freezen.scrollAdaptOfselect();    
            }

            //有冻结时 图表框 滚动适应
            if($("#luckysheet-cell-main .luckysheet-data-visualization-chart").length > 0){
                Freezen.scrollAdaptOfchart();
            }

            //有冻结时 批注框 滚动适应
            if($("#luckysheet-postil-showBoxs .luckysheet-postil-show").length > 0){
                Freezen.scrollAdaptOfpostil();               
            }

            //有冻结时 下拉选区图标 滚动适应
            if($("#luckysheet-dropCell-icon").length > 0){
                Freezen.scrollAdaptOfdpicon();
            }

            //有冻结时 筛选下拉按钮 滚动适应
            if($("#luckysheet-filter-options-sheet"+ luckysheet.currentSheetIndex +" .luckysheet-filter-options").length > 0){
                Freezen.scrollAdaptOffilteroptions();
            }
        },
        scrollAdaptOfselect: function(){
            if($("#luckysheet-row-count-show").is(":visible")){
                $("#luckysheet-row-count-show").hide();
            }

            if($("#luckysheet-column-count-show").is(":visible")){
                $("#luckysheet-column-count-show").hide();
            }

            $("#luckysheet-rows-h-selected").empty();
            $("#luckysheet-cols-h-selected").empty();

            var scrollTop = $("#luckysheet-cell-main").scrollTop();
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();

            if (Freezen.freezenhorizontaldata != null && Freezen.freezenverticaldata != null) {
                var freezenTop = Freezen.freezenhorizontaldata[0];
                var freezen_rowindex = Freezen.freezenhorizontaldata[1];
                var offTop = scrollTop - Freezen.freezenhorizontaldata[2];

                var freezenLeft = Freezen.freezenverticaldata[0];
                var freezen_colindex = Freezen.freezenverticaldata[1];
                var offLeft = scrollLeft - Freezen.freezenverticaldata[2];

                for(var s = 0; s < luckysheet_select_save.length; s++){
                    var obj = $.extend(true, {}, luckysheet_select_save[s]);

                    var r1 = obj.row[0], 
                        r2 = obj.row[1];

                    var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];

                    var top_move = row_pre;
                    var height_move = row - row_pre - 1;

                    var rangeshow = true;

                    if(r1 >= freezen_rowindex){//原选区在冻结区外
                        if(top_move + height_move < freezenTop + offTop){
                            rangeshow = false;
                        }
                        else if(top_move < freezenTop + offTop){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": freezenTop + offTop,
                                "height": height_move - (freezenTop + offTop - top_move)
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": top_move,
                                "height": height_move
                            });
                        }
                    }
                    else if(r2 >= freezen_rowindex){//原选区有一部分在冻结区内
                        if(top_move + height_move < freezenTop + offTop){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": top_move + offTop,
                                "height": freezenTop - top_move
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": top_move + offTop,
                                "height": height_move - offTop
                            });
                        }
                    }
                    else{//原选区在冻结区内
                        $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css("top", top_move + offTop);
                    }

                    var c1 = obj.column[0], 
                        c2 = obj.column[1];

                    var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                    var left_move = col_pre;
                    var width_move = col - col_pre - 1;

                    if(c1 >= freezen_colindex){//原选区在冻结区外
                        if(left_move + width_move < freezenLeft + offLeft){
                            rangeshow = false;
                        }
                        else if(left_move < freezenLeft + offLeft){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": freezenLeft + offLeft,
                                "width": width_move - (freezenLeft + offLeft - left_move)
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": left_move,
                                "width": width_move
                            });
                        }
                    }
                    else if(c2 >= freezen_colindex){//原选区有一部分在冻结区内
                        if(left_move + width_move < freezenLeft + offLeft){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": left_move + offLeft,
                                "width": freezenLeft - left_move
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": left_move + offLeft,
                                "width": width_move - offLeft
                            });
                        }
                    }
                    else{//原选区在冻结区内
                        $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css("left", left_move + offLeft);
                    }

                    if(!rangeshow){
                        $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).hide();
                    }

                    if(s == luckysheet_select_save.length - 1){
                        var rf = obj.row_focus == null ? r1 : obj.row_focus;
                        var cf = obj.column_focus == null ? c1 : obj.column_focus;
                        
                        var row_f = visibledatarow[rf], row_pre_f = rf - 1 == -1 ? 0 : visibledatarow[rf - 1];
                        var col_f = visibledatacolumn[cf], col_pre_f = cf - 1 == -1 ? 0 : visibledatacolumn[cf - 1];

                        var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, rf, cf);
                        if(!!margeset){
                            row_f = margeset.row[1];
                            row_pre_f = margeset.row[0];

                            col_f = margeset.column[1];
                            col_pre_f = margeset.column[0];
                        }

                        var top = row_pre_f;
                        var height = row_f - row_pre_f - 1;

                        var left = col_pre_f;
                        var width = col_f - col_pre_f - 1;

                        var focuscell = true;

                        if(top >= freezenTop){
                            if(top + height < freezenTop + offTop){
                                focuscell = false;
                            }
                            else if(top < freezenTop + offTop){ 
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": freezenTop + offTop,
                                    "height": height - (freezenTop + offTop - top)
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": top,
                                    "height": height
                                });
                            }
                        }
                        else if(top + height >= freezenTop){
                            if(top + height < freezenTop + offTop){
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": top + offTop,
                                    "height": freezenTop - top
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": top + offTop,
                                    "height": height - offTop
                                })
                            }
                        }
                        else{
                            $("#luckysheet-cell-selected-focus").show().css("top", top + offTop);
                        }

                        if(left >= freezenLeft){
                            if(left + width < freezenLeft + offLeft){
                                focuscell = false;
                            }
                            else if(left < freezenLeft + offLeft){ 
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": freezenLeft + offLeft,
                                    "width": width - (freezenLeft + offLeft - left)
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": left,
                                    "width": width
                                });
                            }
                        }
                        else if(left + width >= freezenLeft){
                            if(left + width < freezenLeft + offLeft){
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": left + offLeft,
                                    "width": freezenLeft - left
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": left + offLeft,
                                    "width": width - offLeft
                                })
                            }
                        }
                        else{
                            $("#luckysheet-cell-selected-focus").show().css("left", left + offLeft);
                        }

                        if(!focuscell){
                            $("#luckysheet-cell-selected-focus").hide();
                        }
                    }
                }
            }
            else if (Freezen.freezenhorizontaldata != null) {
                var freezenTop = Freezen.freezenhorizontaldata[0];
                var freezen_rowindex = Freezen.freezenhorizontaldata[1];
                var offTop = scrollTop - Freezen.freezenhorizontaldata[2];

                for(var s = 0; s < luckysheet_select_save.length; s++){
                    var obj = $.extend(true, {}, luckysheet_select_save[s]);

                    var r1 = obj.row[0], 
                        r2 = obj.row[1];

                    var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];

                    var top_move = row_pre;
                    var height_move = row - row_pre - 1;

                    if(r1 >= freezen_rowindex){//原选区在冻结区外
                        if(top_move + height_move < freezenTop + offTop){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).hide();
                        }
                        else if(top_move < freezenTop + offTop){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": freezenTop + offTop,
                                "height": height_move - (freezenTop + offTop - top_move)
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": top_move,
                                "height": height_move
                            });
                        }
                    }
                    else if(r2 >= freezen_rowindex){//原选区有一部分在冻结区内
                        if(top_move + height_move < freezenTop + offTop){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": top_move + offTop,
                                "height": freezenTop - top_move
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "top": top_move + offTop,
                                "height": height_move - offTop
                            });
                        }
                    }
                    else{//原选区在冻结区内
                        $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css("top", top_move + offTop);
                    }

                    if(s == luckysheet_select_save.length - 1){
                        var rf = obj.row_focus == null ? r1 : obj.row_focus;
                        var cf = obj.column_focus == null ? obj.column[0] : obj.column_focus;
                        
                        var row_f = visibledatarow[rf], row_pre_f = rf - 1 == -1 ? 0 : visibledatarow[rf - 1];

                        var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, rf, cf);
                        if(!!margeset){
                            row_f = margeset.row[1];
                            row_pre_f = margeset.row[0];
                        }

                        var top = row_pre_f;
                        var height = row_f - row_pre_f - 1;

                        if(top >= freezenTop){
                            if(top + height < freezenTop + offTop){
                                $("#luckysheet-cell-selected-focus").hide();
                            }
                            else if(top < freezenTop + offTop){ 
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": freezenTop + offTop,
                                    "height": height - (freezenTop + offTop - top)
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": top,
                                    "height": height
                                });
                            }
                        }
                        else if(top + height >= freezenTop){
                            if(top + height < freezenTop + offTop){
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": top + offTop,
                                    "height": freezenTop - top
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "top": top + offTop,
                                    "height": height - offTop
                                })
                            }
                        }
                        else{
                            $("#luckysheet-cell-selected-focus").show().css("top", top + offTop);
                        }
                    }
                }
            }
            else if(Freezen.freezenverticaldata != null){
                var freezenLeft = Freezen.freezenverticaldata[0];
                var freezen_colindex = Freezen.freezenverticaldata[1];
                var offLeft = scrollLeft - Freezen.freezenverticaldata[2];

                for(var s = 0; s < luckysheet_select_save.length; s++){
                    var obj = $.extend(true, {}, luckysheet_select_save[s]);

                    var c1 = obj.column[0], 
                        c2 = obj.column[1];

                    var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

                    var left_move = col_pre;
                    var width_move = col - col_pre - 1;

                    if(c1 >= freezen_colindex){//原选区在冻结区外
                        if(left_move + width_move < freezenLeft + offLeft){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).hide();
                        }
                        else if(left_move < freezenLeft + offLeft){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": freezenLeft + offLeft,
                                "width": width_move - (freezenLeft + offLeft - left_move)
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": left_move,
                                "width": width_move
                            });
                        }
                    }
                    else if(c2 >= freezen_colindex){//原选区有一部分在冻结区内
                        if(left_move + width_move < freezenLeft + offLeft){
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": left_move + offLeft,
                                "width": freezenLeft - left_move
                            });
                        }
                        else{
                            $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css({
                                "left": left_move + offLeft,
                                "width": width_move - offLeft
                            });
                        }
                    }
                    else{//原选区在冻结区内
                        $("#luckysheet-cell-selected-boxs").find(".luckysheet-cell-selected").eq(s).show().css("left", left_move + offLeft);
                    }

                    if(s == luckysheet_select_save.length - 1){
                        var rf = obj.row_focus == null ? obj.row[0] : obj.row_focus;
                        var cf = obj.column_focus == null ? c1 : obj.column_focus;
                        
                        var col_f = visibledatacolumn[cf], col_pre_f = cf - 1 == -1 ? 0 : visibledatacolumn[cf - 1];

                        var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, rf, cf);
                        if(!!margeset){
                            col_f = margeset.column[1];
                            col_pre_f = margeset.column[0];
                        }

                        var left = col_pre_f;
                        var width = col_f - col_pre_f - 1;

                        if(left >= freezenLeft){
                            if(left + width < freezenLeft + offLeft){
                                $("#luckysheet-cell-selected-focus").hide();
                            }
                            else if(left < freezenLeft + offLeft){ 
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": freezenLeft + offLeft,
                                    "width": width - (freezenLeft + offLeft - left)
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": left,
                                    "width": width
                                });
                            }
                        }
                        else if(left + width >= freezenLeft){
                            if(left + width < freezenLeft + offLeft){
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": left + offLeft,
                                    "width": freezenLeft - left
                                })
                            }
                            else{
                                $("#luckysheet-cell-selected-focus").show().css({
                                    "left": left + offLeft,
                                    "width": width - offLeft
                                })
                            }
                        }
                        else{
                            $("#luckysheet-cell-selected-focus").show().css("left", left + offLeft);
                        }
                    }
                }
            }
            else{
                luckysheet.selectHightlightShow();
            }
        },
        scrollAdaptOfchart: function(){
            var scrollTop = $("#luckysheet-cell-main").scrollTop();
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();

            if(Freezen.freezenhorizontaldata != null && Freezen.freezenverticaldata != null){
                var freezenTop = Freezen.freezenhorizontaldata[0] - Freezen.freezenhorizontaldata[2];
                var freezenLeft = Freezen.freezenverticaldata[0] - Freezen.freezenverticaldata[2];

                $("#luckysheet-cell-main .luckysheet-data-visualization-chart").each(function(i, e){
                    var x = $(e).position();
                    var width = $(e).width();
                    var height = $(e).height();

                    var $canvas_width = $(e).find("canvas").width();
                    var $canvas_height = $(e).find("canvas").height();

                    var height_diff = $canvas_height - height;
                    var width_diff = $canvas_width - width;

                    if((x.top - height_diff) < freezenTop){
                        var size = freezenTop - (x.top - height_diff);

                        if(size > ($canvas_height + 40 + 2)){
                            $(e).css("visibility", "hidden");
                        }
                        else{
                            $(e).css({
                                "top": freezenTop + scrollTop,
                                "height": $canvas_height - size,
                                "visibility": "visible"
                            });   
                            $(e).find("canvas").css("top", - size);
                        }
                    }
                    else{
                        $(e).css({
                            "top": x.top - height_diff + scrollTop,
                            "height": $canvas_height,
                            "visibility": "visible"
                        }); 
                        $(e).find("canvas").css("top", 0);
                    }

                    if((x.left - width_diff) < freezenLeft){
                        var size = freezenLeft - (x.left - width_diff);

                        if(size > ($canvas_width + 20 + 2)){
                            $(e).css("visibility", "hidden");
                        }
                        else{
                            $(e).css({
                                "left": freezenLeft + scrollLeft,
                                "width": $canvas_width - size,
                                "visibility": "visible"
                            });   
                            $(e).find("canvas").css("left", - size);
                        }
                    }
                    else{
                        $(e).css({
                            "left": x.left - width_diff + scrollLeft,
                            "width": $canvas_width,
                            "visibility": "visible"
                        }); 
                        $(e).find("canvas").css("left", 0);
                    }
                })
            }
            else if(Freezen.freezenhorizontaldata != null){
                var freezenTop = Freezen.freezenhorizontaldata[0] - Freezen.freezenhorizontaldata[2];

                $("#luckysheet-cell-main .luckysheet-data-visualization-chart").each(function(i, e){
                    var x = $(e).position();
                    var height = $(e).height();
                    
                    var $canvas_height = $(e).find("canvas").height();

                    var height_diff = $canvas_height - height;

                    if((x.top - height_diff) < freezenTop){
                        var size = freezenTop - (x.top - height_diff);

                        if(size > ($canvas_height + 40 + 2)){
                            $(e).css("visibility", "hidden");
                        }
                        else{
                            $(e).css({
                                "top": freezenTop + scrollTop,
                                "height": $canvas_height - size,
                                "visibility": "visible"
                            });   
                            $(e).find("canvas").css("top", - size);
                        }
                    }
                    else{
                        $(e).css({
                            "top": x.top - height_diff + scrollTop,
                            "height": $canvas_height,
                            "visibility": "visible"
                        }); 
                        $(e).find("canvas").css("top", 0);
                    }
                })
            }
            else if(Freezen.freezenverticaldata != null){
                var freezenLeft = Freezen.freezenverticaldata[0] - Freezen.freezenverticaldata[2];

                $("#luckysheet-cell-main .luckysheet-data-visualization-chart").each(function(i, e){
                    var x = $(e).position();
                    var width = $(e).width();

                    var $canvas_width = $(e).find("canvas").width();

                    var width_diff = $canvas_width - width;

                    if((x.left - width_diff) < freezenLeft){
                        var size = freezenLeft - (x.left - width_diff);

                        if(size > ($canvas_width + 20 + 2)){
                            $(e).css("visibility", "hidden");
                        }
                        else{
                            $(e).css({
                                "left": freezenLeft + scrollLeft,
                                "width": $canvas_width - size,
                                "visibility": "visible"
                            });   
                            $(e).find("canvas").css("left", - size);
                        }
                    }
                    else{
                        $(e).css({
                            "left": x.left - width_diff + scrollLeft,
                            "width": $canvas_width,
                            "visibility": "visible"
                        }); 
                        $(e).find("canvas").css("left", 0);
                    }
                })
            }
            else{
                $("#luckysheet-cell-main .luckysheet-data-visualization-chart").each(function(i, e){
                    var x = $(e).position();
                    var width = $(e).width();
                    var height = $(e).height();

                    var $canvas_width = $(e).find("canvas").width();
                    var $canvas_height = $(e).find("canvas").height();

                    var height_diff = $canvas_height - height;
                    var width_diff = $canvas_width - width;

                    $(e).css({
                        "top": x.top - height_diff + scrollTop,
                        "height": $canvas_height,
                        "left": x.left - width_diff + scrollLeft,
                        "width": $canvas_width,
                        "visibility": "visible"
                    }); 

                    $(e).find("canvas").css({
                        "top": 0,
                        "left": 0
                    });
                })
            }
        },
        scrollAdaptOfpostil: function(){
            var scrollTop = $("#luckysheet-cell-main").scrollTop();
            var scrollLeft = $("#luckysheet-cell-main").scrollLeft();

            if(Freezen.freezenhorizontaldata != null && Freezen.freezenverticaldata != null){
                var freezenTop = Freezen.freezenhorizontaldata[0];
                var freezenLeft = Freezen.freezenverticaldata[0];

                var offTop = scrollTop - Freezen.freezenhorizontaldata[2];
                var offLeft = scrollLeft - Freezen.freezenverticaldata[2];

                $("#luckysheet-postil-showBoxs .luckysheet-postil-show").each(function(i, e){
                    var id = $(e).attr("id");

                    var r = id.split("luckysheet-postil-show_")[1].split("_")[0];
                    var c = id.split("luckysheet-postil-show_")[1].split("_")[1];

                    var postil = luckysheet.flowdata[r][c].ps;

                    var row = visibledatarow[r], row_pre = r - 1 == -1 ? 0 : visibledatarow[r - 1];
                    var col = visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : visibledatacolumn[c - 1];

                    var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, r, c);
                    if(!!margeset){
                        row = margeset.row[1];
                        row_pre = margeset.row[0];
                        
                        col = margeset.column[1];
                        col_pre = margeset.column[0];
                    }

                    var toX = col;
                    var toY = row_pre;

                    var postil_left = postil["left"] == null ? toX + 18 : postil["left"];
                    var postil_top = postil["top"] == null ? toY - 18 : postil["top"];
                    var postil_width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                    var postil_height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];

                    if(postil_top < 0){
                        postil_top = 2;
                    }

                    var size = luckysheet.postil.getArrowCanvasSize(postil_left, postil_top, toX, toY);
                    var show = true;
                    var show2 = true;

                    if(postil_top + postil_height < freezenTop){
                        $(e).show().find(".luckysheet-postil-show-main").css("top", postil_top + offTop);
                        $(e).show().find(".arrowCanvas").css("top", size[1] + offTop);
                    }
                    else{
                        if(postil_top < freezenTop + offTop){
                            if(postil_top + postil_height <= freezenTop + offTop){
                                show = false;
                            }
                            else{
                                $(e).show().find(".luckysheet-postil-show-main").css({ "top": freezenTop + offTop, "height": postil_height - (freezenTop + offTop - postil_top) });
                                $(e).show().find(".formulaInputFocus").css("margin-top", -(freezenTop + offTop - postil_top));
                                $(e).show().find(".arrowCanvas").hide(); 

                                show2 = false;
                            }
                        }
                        else{
                            $(e).show().find(".luckysheet-postil-show-main").css({
                                "top": postil_top,
                                "height": postil_height
                            });
                            $(e).show().find(".formulaInputFocus").css("margin-top", 0);
                            $(e).show().find(".arrowCanvas").css("top", size[1]);
                            // luckysheet.postil.buildPs(r, c, postil);
                        }
                    }

                    if(postil_left + postil_width < freezenLeft){
                        $(e).show().find(".luckysheet-postil-show-main").css("left", postil_left + offLeft);
                        $(e).show().find(".arrowCanvas").css("left", size[0] + offLeft);
                    }
                    else{
                        if(postil_left < freezenLeft + offLeft){
                            if(postil_left + postil_width <= freezenLeft + offLeft){
                                show = false;
                            }
                            else{
                                $(e).show().find(".luckysheet-postil-show-main").css({ "left": freezenLeft + offLeft, "width": postil_width - (freezenLeft + offLeft - postil_left) });
                                $(e).show().find(".formulaInputFocus").css("margin-left", -(freezenLeft + offLeft - postil_left));
                                $(e).show().find(".arrowCanvas").hide(); 

                                show2 = false;
                            }
                        }
                        else{
                            $(e).show().find(".luckysheet-postil-show-main").css({
                                "left": postil_left,
                                "width": postil_width   
                            });
                            $(e).show().find(".formulaInputFocus").css("margin-left", 0);
                            $(e).show().find(".arrowCanvas").css("left", size[0]);
                            // luckysheet.postil.buildPs(r, c, postil);
                        }
                    }

                    if(!show){
                        $(e).hide();
                    }

                    if(show && show2){
                        $(e).show().find(".arrowCanvas").show();
                    }
                })
            }
            else if(Freezen.freezenhorizontaldata != null){
                var freezenTop = Freezen.freezenhorizontaldata[0];
                var offTop = scrollTop - Freezen.freezenhorizontaldata[2];

                $("#luckysheet-postil-showBoxs .luckysheet-postil-show").each(function(i, e){
                    var id = $(e).attr("id");

                    var r = id.split("luckysheet-postil-show_")[1].split("_")[0];
                    var c = id.split("luckysheet-postil-show_")[1].split("_")[1];

                    var postil = luckysheet.flowdata[r][c].ps;

                    var row = visibledatarow[r], row_pre = r - 1 == -1 ? 0 : visibledatarow[r - 1];
                    var col = visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : visibledatacolumn[c - 1];

                    var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, r, c);
                    if(!!margeset){
                        row = margeset.row[1];
                        row_pre = margeset.row[0];
                        
                        col = margeset.column[1];
                        col_pre = margeset.column[0];
                    }

                    var toX = col;
                    var toY = row_pre;

                    var postil_left = postil["left"] == null ? toX + 18 : postil["left"];
                    var postil_top = postil["top"] == null ? toY - 18 : postil["top"];
                    var postil_width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                    var postil_height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];

                    if(postil_top < 0){
                        postil_top = 2;
                    }

                    var size = luckysheet.postil.getArrowCanvasSize(postil_left, postil_top, toX, toY);

                    if(postil_top + postil_height < freezenTop){
                        $(e).show().find(".luckysheet-postil-show-main").css("top", postil_top + offTop);
                        $(e).show().find(".arrowCanvas").css("top", size[1] + offTop);
                    }
                    else{
                        if(postil_top < freezenTop + offTop){
                            if(postil_top + postil_height <= freezenTop + offTop){
                                $(e).hide();
                            }
                            else{
                                $(e).show().find(".luckysheet-postil-show-main").css({ "top": freezenTop + offTop, "height": postil_height - (freezenTop + offTop - postil_top) });
                                $(e).show().find(".formulaInputFocus").css("margin-top", -(freezenTop + offTop - postil_top));
                                $(e).show().find(".arrowCanvas").hide(); 
                            }
                        }
                        else{
                            luckysheet.postil.buildPs(r, c, postil);
                        }
                    }
                })
            }
            else if(Freezen.freezenverticaldata != null){
                var freezenLeft = Freezen.freezenverticaldata[0];
                var offLeft = scrollLeft - Freezen.freezenverticaldata[2];

                $("#luckysheet-postil-showBoxs .luckysheet-postil-show").each(function(i, e){
                    var id = $(e).attr("id");

                    var r = id.split("luckysheet-postil-show_")[1].split("_")[0];
                    var c = id.split("luckysheet-postil-show_")[1].split("_")[1];

                    var postil = luckysheet.flowdata[r][c].ps;

                    var row = visibledatarow[r], row_pre = r - 1 == -1 ? 0 : visibledatarow[r - 1];
                    var col = visibledatacolumn[c], col_pre = c - 1 == -1 ? 0 : visibledatacolumn[c - 1];

                    var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, r, c);
                    if(!!margeset){
                        row = margeset.row[1];
                        row_pre = margeset.row[0];
                        
                        col = margeset.column[1];
                        col_pre = margeset.column[0];
                    }

                    var toX = col;
                    var toY = row_pre;

                    var postil_left = postil["left"] == null ? toX + 18 : postil["left"];
                    var postil_top = postil["top"] == null ? toY - 18 : postil["top"];
                    var postil_width = postil["width"] == null ? luckysheet.postil.defaultWidth : postil["width"];
                    var postil_height = postil["height"] == null ? luckysheet.postil.defaultHeight : postil["height"];

                    if(postil_top < 0){
                        postil_top = 2;
                    }

                    var size = luckysheet.postil.getArrowCanvasSize(postil_left, postil_top, toX, toY);

                    if(postil_left + postil_width < freezenLeft){
                        $(e).show().find(".luckysheet-postil-show-main").css("left", postil_left + offLeft);
                        $(e).show().find(".arrowCanvas").css("left", size[0] + offLeft);
                    }
                    else{
                        if(postil_left < freezenLeft + offLeft){
                            if(postil_left + postil_width <= freezenLeft + offLeft){
                                $(e).hide();
                            }
                            else{
                                $(e).show().find(".luckysheet-postil-show-main").css({ "left": freezenLeft + offLeft, "width": postil_width - (freezenLeft + offLeft - postil_left) });
                                $(e).show().find(".formulaInputFocus").css("margin-left", -(freezenLeft + offLeft - postil_left));
                                $(e).show().find(".arrowCanvas").hide(); 
                            }
                        }
                        else{
                            luckysheet.postil.buildPs(r, c, postil);
                        }
                    }
                })
            }
            else{
                $("#luckysheet-postil-showBoxs .luckysheet-postil-show").each(function(i, e){
                    var id = $(e).attr("id");

                    var r = id.split("luckysheet-postil-show_")[1].split("_")[0];
                    var c = id.split("luckysheet-postil-show_")[1].split("_")[1];

                    var postil = luckysheet.flowdata[r][c].ps;

                    luckysheet.postil.buildPs(r, c, postil);
                })
            }
        },
        scrollAdaptOfdpicon: function(){
            var copy_r = luckysheet.dropCell.copyRange["row"][1], 
                copy_c = luckysheet.dropCell.copyRange["column"][1];
            
            var apply_r = luckysheet.dropCell.applyRange["row"][1], 
                apply_c = luckysheet.dropCell.applyRange["column"][1];
            
            if(apply_r >= copy_r && apply_c >= copy_c){
                var row_index = apply_r;
                var col_index = apply_c;
            }
            else{
                var row_index = copy_r;
                var col_index = copy_c;   
            }

            if(Freezen.freezenhorizontaldata != null && Freezen.freezenverticaldata != null){
                var freezen_rowindex = Freezen.freezenhorizontaldata[1];
                var offsetRow = luckysheet_searcharray(Freezen.freezenhorizontaldata[3], $("#luckysheet-cell-main").scrollTop() - Freezen.freezenhorizontaldata[2]);
                var freezen_colindex = Freezen.freezenverticaldata[1];
                var offsetColumn = luckysheet_searcharray(Freezen.freezenverticaldata[3], $("#luckysheet-cell-main").scrollLeft() - Freezen.freezenverticaldata[2]);

                if(row_index >= freezen_rowindex && col_index >= freezen_colindex){
                    if(row_index < (freezen_rowindex + offsetRow - 1) || col_index < (freezen_colindex + offsetColumn - 1)){
                        $("#luckysheet-dropCell-icon").hide();
                    }
                    else{
                        $("#luckysheet-dropCell-icon").show();
                    }
                }
                else if(row_index >= freezen_rowindex){
                    if(row_index < (freezen_rowindex + offsetRow - 1)){
                        $("#luckysheet-dropCell-icon").hide();
                    }
                    else{
                        var col = luckysheet.colLocationByIndex(col_index + offsetColumn)[1];

                        $("#luckysheet-dropCell-icon").show().css("left", col);
                    }
                }
                else if(col_index >= freezen_colindex){
                    if(col_index < (freezen_colindex + offsetColumn - 1)){
                        $("#luckysheet-dropCell-icon").hide();
                    }
                    else{
                        var row = luckysheet.rowLocationByIndex(row_index + offsetRow)[1];

                        $("#luckysheet-dropCell-icon").show().css("top", row);
                    }
                }
                else{
                    var row = luckysheet.rowLocationByIndex(row_index + offsetRow)[1],
                        col = luckysheet.colLocationByIndex(col_index + offsetColumn)[1];

                    $("#luckysheet-dropCell-icon").show().css({ "left": col, "top": row });
                }
            }
            else if(Freezen.freezenhorizontaldata != null){
                var freezen_rowindex = Freezen.freezenhorizontaldata[1];
                var offsetRow = luckysheet_searcharray(Freezen.freezenhorizontaldata[3], $("#luckysheet-cell-main").scrollTop() - Freezen.freezenhorizontaldata[2]);

                if(row_index >= freezen_rowindex){
                    if(row_index < (freezen_rowindex + offsetRow - 1)){
                        $("#luckysheet-dropCell-icon").hide();
                    }
                    else{
                        $("#luckysheet-dropCell-icon").show();
                    }
                }
                else{
                    var row = luckysheet.rowLocationByIndex(row_index + offsetRow)[1];

                    $("#luckysheet-dropCell-icon").show().css("top", row);
                }
            }
            else if(Freezen.freezenverticaldata != null){
                var freezen_colindex = Freezen.freezenverticaldata[1];
                var offsetColumn = luckysheet_searcharray(Freezen.freezenverticaldata[3], $("#luckysheet-cell-main").scrollLeft() - Freezen.freezenverticaldata[2]);

                if(col_index >= freezen_colindex){
                    if(col_index < (freezen_colindex + offsetColumn - 1)){
                        $("#luckysheet-dropCell-icon").hide();
                    }
                    else{
                        $("#luckysheet-dropCell-icon").show();
                    }
                }
                else{
                    var col = luckysheet.colLocationByIndex(col_index + offsetColumn)[1];

                    $("#luckysheet-dropCell-icon").show().css("left", col);
                }
            }
            else{
                var row = luckysheet.rowLocationByIndex(row_index)[1],
                    col = luckysheet.colLocationByIndex(col_index)[1];

                $("#luckysheet-dropCell-icon").show().css({ "left": col, "top": row });
            }
        },
        scrollAdaptOffilteroptions: function(){
            if(Freezen.freezenhorizontaldata != null && Freezen.freezenverticaldata != null){
                var freezen_rowindex = Freezen.freezenhorizontaldata[1];
                var freezen_top = Freezen.freezenhorizontaldata[0] + $("#luckysheet-cell-main").scrollTop();

                var freezen_colindex = Freezen.freezenverticaldata[1];
                var offsetColumn = luckysheet_searcharray(Freezen.freezenverticaldata[3], $("#luckysheet-cell-main").scrollLeft() - Freezen.freezenverticaldata[2]);

                $("#luckysheet-filter-options-sheet"+ luckysheet.currentSheetIndex +" .luckysheet-filter-options").each(function(i, e){
                    var row_index = $(e).data("str");
                    var top = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];

                    var col_index = $(e).data("cindex");

                    if(row_index >= freezen_rowindex && col_index >= freezen_colindex){
                        if(top < freezen_top || col_index < (freezen_colindex + offsetColumn)){
                            $(e).hide();
                        }
                        else{
                            $(e).show();
                        }
                    }
                    else if(row_index >= freezen_rowindex){
                        if(top < freezen_top){
                            $(e).hide();
                        }
                        else{
                            var left = visibledatacolumn[col_index + offsetColumn] - 20;

                            $(e).show().css("left", left);
                        }
                    }
                    else if(col_index >= freezen_colindex){
                        if(col_index < (freezen_colindex + offsetColumn)){
                            $(e).hide();
                        }
                        else{
                            $(e).show().css("top", top + $("#luckysheet-cell-main").scrollTop());
                        }
                    }
                    else{
                        var left = visibledatacolumn[col_index + offsetColumn] - 20;

                        $(e).show().css({ "left": left, "top": top + $("#luckysheet-cell-main").scrollTop() });
                    }
                });
            }
            else if(Freezen.freezenhorizontaldata != null){
                var freezen_rowindex = Freezen.freezenhorizontaldata[1];
                var freezen_top = Freezen.freezenhorizontaldata[0] + $("#luckysheet-cell-main").scrollTop();

                $("#luckysheet-filter-options-sheet"+ luckysheet.currentSheetIndex +" .luckysheet-filter-options").each(function(i, e){
                    var row_index = $(e).data("str");
                    var top = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];

                    if(row_index >= freezen_rowindex){
                        if(top < freezen_top){
                            $(e).hide();
                        }
                        else{
                            $(e).show();
                        }
                    }
                    else{
                        $(e).show().css("top", top + $("#luckysheet-cell-main").scrollTop());
                    }
                });
            }
            else if(Freezen.freezenverticaldata != null){
                var freezen_colindex = Freezen.freezenverticaldata[1];
                var offsetColumn = luckysheet_searcharray(Freezen.freezenverticaldata[3], $("#luckysheet-cell-main").scrollLeft() - Freezen.freezenverticaldata[2]);

                $("#luckysheet-filter-options-sheet"+ luckysheet.currentSheetIndex +" .luckysheet-filter-options").each(function(i, e){
                    var col_index = $(e).data("cindex");

                    if(col_index >= freezen_colindex){
                        if(col_index < (freezen_colindex + offsetColumn)){
                            $(e).hide();
                        }
                        else{
                            $(e).show();
                        }
                    }
                    else{
                        var left = visibledatacolumn[col_index + offsetColumn] - 20;

                        $(e).show().css("left", left);
                    }
                });
            }
            else{
                $("#luckysheet-filter-options-sheet"+ luckysheet.currentSheetIndex).empty();
                luckysheet.createFilterOptions(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].filter_select);
            }
        }
    }

