luckysheet.labelFilterOptionState = function($top, optionstate, rowhidden, caljs, notSave, str, edr, cindex, stc, edc){
    if (optionstate) {
        $top.addClass("luckysheet-filter-options-active").data("rowhidden", JSON.stringify(rowhidden)).data("caljs", JSON.stringify(caljs)).html('<i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i>');

        if (caljs != null) {
            $top.data("byconditionvalue", caljs["value"]).data("byconditiontype", caljs["type"]).data("byconditiontext", caljs["text"]);
            
            if (caljs["value1"] != null) {
                $top.data("byconditionvalue1", caljs["value1"]);
            }

            if (caljs["value2"] != null) {
                $top.data("byconditionvalue2", caljs["value2"]);
            }
        }
    }
    else {
        $top.removeClass("luckysheet-filter-options-active").data("rowhidden", "").data("caljs", "").html('<i class="fa fa-caret-down luckysheet-mousedown-cancel" aria-hidden="true"></i>');

        $top.data("byconditionvalue", "null").data("byconditiontype", "0").data("byconditiontext", "无").data("byconditionvalue1", "").data("byconditionvalue2", "");
    }

    if(!!notSave){
        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];

        if(file.filter == null){
            file.filter = {};
        }

        if (optionstate) {
            var param = {
                "caljs": caljs, 
                "rowhidden": rowhidden, 
                "optionstate": optionstate,
                "str": str,
                "edr": edr,
                "cindex": cindex,
                "stc": stc,
                "edc": edc
            };

            // luckysheet.server.saveParam("f", luckysheet.currentSheetIndex, param, { "op": "upOrAdd", "pos": cindex - stc });

            file.filter[cindex - stc] = param;
        }
        else {
            // luckysheet.server.saveParam("f", luckysheet.currentSheetIndex, null, { "op": "del", "pos": cindex - stc });

            delete file.filter[cindex - stc];
            // file.filter[cindex - stc] = null;
        }

        luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, file.filter, { "k": "filter" });
    }
}

$("#luckysheet-filter-selected").click(function () {
    var $t = $(this), toffset = $t.offset(), $menu = $("#luckysheet-filter-submenu");
    $menu.hide();

    var winH = $(window).height(), winW = $(window).width();
    var menuW = $menu.width(), menuH = $menu.height();
    var top = toffset.top, left = toffset.left, mheight = winH - toffset.top - 20;
    
    if (toffset.left + menuW > winW) {
        left = toffset.left - menuW;
    }

    if (toffset.top > winH / 2) {
        top = winH - toffset.top;
        
        if (top < 0) {
            top = 0;
        }

        mheight = toffset.top - 20;
    }

    $menu.css({ "top": top, "left": left, "height": mheight }).show();
    clearTimeout(hidefilersubmenu);
});

var orderbydatafiler = function (str, stc, edr, edc, index, asc) {
    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

    str = str + 1;

    var hasMc = false; //排序选区是否有合并单元格
    var data = [];

    for(var r = str; r <= edr; r++){
        var data_row = [];

        for(var c = stc; c <= edc; c++){
            if(d[r][c] != null && d[r][c].mc != null){
                hasMc = true;
                break;
            }

            data_row.push(d[r][c]);
        }

        data.push(data_row);
    }

    if(hasMc){
        if(luckysheet.isEditMode()){
            alert("筛选选区有合并单元格，无法执行此操作！");
        }
        else{
            luckysheet.tooltip.info("筛选选区有合并单元格，无法执行此操作！", "");
        }

        return;
    }

    data = luckysheet.orderbydata(data, index - stc, asc);

    for(var r = str; r <= edr; r++){
        for(var c = stc; c <= edc; c++){
            d[r][c] = data[r - str][c - stc];
        }
    }

    if(config["rowlen"] != null){
        var cfg = $.extend(true, {}, config);
        cfg = luckysheet.rowlenByRange(d, str, edr, cfg);

        luckysheet.jfrefreshgrid(d, [{ "row": [str, edr], "column": [stc, edc] }], cfg, null, true);
    }
    else{
        luckysheet.jfrefreshgrid(d, [{ "row": [str, edr], "column": [stc, edc] }]);
    }
}

//创建筛选按钮
luckysheet.createFilter = function () {
    if(luckysheet_select_save.length > 1){
        $("#luckysheet-rightclick-menu").hide();
        $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
        $("#" + container).attr("tabindex", 0).focus();

        if(luckysheet.isEditMode()){
            alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
        }
        else{
            luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
        }

        return;
    }

    if(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].isPivotTable){
        return;
    }

    $('#luckysheet-filter-selected-sheet' + luckysheet.currentSheetIndex + ', #luckysheet-filter-options-sheet' + luckysheet.currentSheetIndex).remove();

    var last = luckysheet_select_save[0];
    if (last["row"][0] == last["row"][1] && last["column"][0] == last["column"][1]) {
        var st_c, ed_c, curR = last["row"][1];

        for (var c = 0; c < luckysheet.flowdata[curR].length; c++) {
            var cell = luckysheet.flowdata[curR][c];

            if (cell != null && !luckysheet.func_methods.isRealNull(cell.v)) {
                if (st_c == null) {
                    st_c = c;
                }
            }
            else if (st_c != null) {
                ed_c = c - 1;
                break;
            }
        }

        if (ed_c == null) {
            ed_c = luckysheet.flowdata[curR].length - 1;
        }

        luckysheet_select_save = [{ "row": [curR, curR], "column": [st_c, ed_c] }];
        luckysheet.selectHightlightShow();

        luckysheet.luckysheet_shiftpositon = $.extend(true, {}, last);
        luckysheetMoveEndCell("down", "range");
    }
    else if (last["row"][1] - last["row"][0] < 2) {
        luckysheet.luckysheet_shiftpositon = $.extend(true, {}, last);
        luckysheetMoveEndCell("down", "range");
    }

    luckysheet_filter_save = $.extend(true, {}, luckysheet_select_save[0]);

    luckysheet.createFilterOptions(luckysheet_filter_save);

    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, luckysheet_filter_save, { "k": "filter_select" });

    if (filterchage) {
        luckysheet.jfredo.push({ 
            "type": "filtershow", 
            "data": [], 
            "curdata": [], 
            "sheetIndex": luckysheet.currentSheetIndex, 
            "filter_save": luckysheet_filter_save 
        });
    }
}

luckysheet.createFilterOptions = function(luckysheet_filter_save, filterObj){
    $("#luckysheet-filter-selected-sheet" + luckysheet.currentSheetIndex).remove();
    $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex).remove();
    
    if(luckysheet_filter_save == null || JSON.stringify(luckysheet_filter_save) == "{}"){
        return;
    }

    var r1 = luckysheet_filter_save.row[0], r2 = luckysheet_filter_save.row[1];
    var c1 = luckysheet_filter_save.column[0], c2 = luckysheet_filter_save.column[1];

    var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
    var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];
    
    var newSelectedHTML = '<div id="luckysheet-filter-selected-sheet'+ luckysheet.currentSheetIndex +'" class="luckysheet-cell-selected luckysheet-filter-selected"  style="left:'+ col_pre +'px;width:'+ (col - col_pre - 1) +'px;top:'+ row_pre +'px;height:'+ (row - row_pre - 1) +'px;display:block;border-color:#897BFF;z-index:20;background:none;"></div>';
    $("#luckysheet-cell-main").append(newSelectedHTML);
    
    var optionHTML = "";

    for (var c = c1; c <= c2; c++) {
        if(filterObj == null || filterObj[c - c1] == null){
            optionHTML += '<div data-rowhidden="" data-str="'+ r1 +'" data-edr="'+ r2 +'" data-cindex="'+ c +'" data-stc="'+ c1 +'" data-edc="'+ c2 +'" class="luckysheet-filter-options" style="left:'+ (visibledatacolumn[c] - 20) +'px;top:'+ row_pre +'px;display:block;"><i class="fa fa-caret-down" aria-hidden="true"></i></div>';
        }
        else{
            if(filterObj[c - c1].caljs != null){
                if (filterObj[c - c1].caljs["value1"] != null) {
                    var caljs_value1_data = 'data-byconditionvalue1="'+ filterObj[c - c1].caljs["value1"] +'" ';
                }
                else{
                    var caljs_value1_data = '';
                }

                if (filterObj[c - c1].caljs["value2"] != null) {
                    var caljs_value2_data = 'data-byconditionvalue2="'+ filterObj[c - c1].caljs["value2"] +'" ';
                }
                else{
                    var caljs_value2_data = '';
                }

                var caljs_data = 'data-caljs="'+ JSON.stringify(filterObj[c - c1].caljs) +'" ' +
                                 'data-byconditionvalue="'+ filterObj[c - c1].caljs["value"] +'" ' + 
                                 'data-byconditiontype="'+ filterObj[c - c1].caljs["type"] +'" ' +
                                 'data-byconditiontext="'+ filterObj[c - c1].caljs["text"] +'" ' +
                                 caljs_value1_data + caljs_value2_data;
            }
            else{
                var caljs_data = '';
            }

            optionHTML += '<div data-rowhidden="'+ JSON.stringify(filterObj[c - c1].rowhidden).replace(/\"/g, "'") +'" '+ caljs_data +' data-str="'+ r1 +'" data-edr="'+ r2 +'" data-cindex="'+ c +'" data-stc="'+ c1 +'" data-edc="'+ c2 +'" class="luckysheet-filter-options luckysheet-filter-options-active" style="left:'+ (visibledatacolumn[c] - 20) +'px;top:'+ row_pre +'px;display:block;"><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i></div>';
        }
    }

    $("#luckysheet-cell-main").append('<div id="luckysheet-filter-options-sheet'+ luckysheet.currentSheetIndex +'" class="luckysheet-filter-options-c">' + optionHTML + '</div>');
    $("#luckysheet-rightclick-menu").hide();
    $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

    if ($("#luckysheet-cell-main").scrollTop() > luckysheet_filter_save["top_move"]) {
        $("#luckysheet-scrollbar-y").scrollTop(luckysheet_filter_save["top_move"]);
    }

    var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];

    file.filter_select = luckysheet_filter_save;
}

$("#luckysheetfilter").click(luckysheet.createFilter);

//按颜色筛选
var submenuhide = null;
$("#luckysheet-filter-orderby-color").hover(
    function(){
        //遍历筛选列颜色
        var $menu = $("#luckysheet-filter-menu");
        var st_r = $menu.data("str"), 
            ed_r = $menu.data("edr"), 
            cindex = $menu.data("cindex"), 
            st_c = $menu.data("stc"), 
            ed_c = $menu.data("edc");
        var bgMap = {}; //单元格颜色
        var fcMap = {}; //字体颜色

        var af_compute = luckysheet.alternateformat.getComputeMap();
        var cf_compute = luckysheet.conditionformat.getComputeMap();

        for (var r = st_r + 1; r <= ed_r; r++) {
            var cell = luckysheet.flowdata[r][cindex];

            //单元格颜色
            var bg = luckysheet.menuButton.checkstatus(luckysheet.flowdata, r, cindex , "bg");

            var checksAF = luckysheet.alternateformat.checksAF(r, cindex, af_compute);
            if(checksAF != null){//若单元格有交替颜色
                bg = checksAF[1];
            }

            var checksCF = luckysheet.conditionformat.checksCF(r, cindex, cf_compute);
            if(checksCF != null && checksCF["cellColor"] != null){//若单元格有条件格式
                bg = checksCF["cellColor"];
            }

            if(bg.indexOf("rgb") > -1){
                bg = luckysheet.rgbTohex(bg);
            }

            if(bg.length == 4){
                bg = bg.substr(0, 1) + bg.substr(1, 1).repeat(2) + bg.substr(2, 1).repeat(2) + bg.substr(3, 1).repeat(2);
            }

            //字体颜色
            var fc = luckysheet.menuButton.checkstatus(luckysheet.flowdata, r, cindex , "fc");
            
            if(checksAF != null){//若单元格有交替颜色
                fc = checksAF[0];
            }

            if(checksCF != null && checksCF["textColor"] != null){//若单元格有条件格式
                fc = checksCF["textColor"];
            }

            if(fc.indexOf("rgb") > -1){
                fc = luckysheet.rgbTohex(fc);
            }

            if(fc.length == 4){
                fc = fc.substr(0, 1) + fc.substr(1, 1).repeat(2) + fc.substr(2, 1).repeat(2) + fc.substr(3, 1).repeat(2);
            }

            if(config != null && config["rowhidden"] != null && r in config["rowhidden"]){
                bgMap[bg] = 1;

                if(cell != null && !luckysheet.func_methods.isRealNull(cell.v)){
                    fcMap[fc] = 1;
                }
            }
            else{
                bgMap[bg] = 0;

                if(cell != null && !luckysheet.func_methods.isRealNull(cell.v)){
                    fcMap[fc] = 0;
                }
            }
        }
        //
        var filterBgColorHtml = '';
        if(JSON.stringify(bgMap).length > 2 && Object.keys(bgMap).length > 1){
            var bgColorItemHtml = '';
            for(b in bgMap){
                if(bgMap[b] == 0){
                    bgColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + b + '" title="' + b + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/></div>';
                }
                else{
                    bgColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + b + '" title="' + b + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox"/></div>';
                }
            }
            filterBgColorHtml = '<div id="filterBgColor" class="box luckysheet-mousedown-cancel"><div class="title luckysheet-mousedown-cancel">按单元格颜色筛选</div><div style="max-height:128px;overflow:auto;" class="luckysheet-mousedown-cancel">' + bgColorItemHtml + '</div></div>';
        }

        var filterFcColorHtml = '';
        if(JSON.stringify(fcMap).length > 2 && Object.keys(fcMap).length > 1){
            var fcColorItemHtml = '';
            for(f in fcMap){
                if(fcMap[f] == 0){
                    fcColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + f + '" title="' + f + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/></div>';
                }
                else{
                    fcColorItemHtml += '<div class="item luckysheet-mousedown-cancel"><label class="luckysheet-mousedown-cancel" style="background-color: ' + f + '" title="' + f + '"></label><input class="luckysheet-mousedown-cancel" type="checkbox"/></div>';
                }
            }
            filterFcColorHtml = '<div id="filterFcColor" class="box luckysheet-mousedown-cancel"><div class="title luckysheet-mousedown-cancel">按字体颜色筛选</div><div style="max-height:128px;overflow:auto;" class="luckysheet-mousedown-cancel">' + fcColorItemHtml + '</div></div>';
        }
        //
        if(filterBgColorHtml == '' && filterFcColorHtml == ''){
            var content = '<div class="luckysheet-mousedown-cancel" style="padding: 10px 30px;text-align: center;">本列仅包含一种颜色</div>';
        }
        else{
            var content = filterBgColorHtml + filterFcColorHtml + '<div class="luckysheet-mousedown-cancel"><button id="luckysheet-filter-orderby-color-confirm" class="btn btn-primary luckysheet-mousedown-cancel" style="margin: 5px 20px;width: 70px;">确认</button></div>';
        }
        //颜色筛选子菜单
        $("#luckysheet-filter-orderby-color-submenu").remove();
        $("body").append('<div id="luckysheet-filter-orderby-color-submenu" class="luckysheet-cols-menu luckysheet-mousedown-cancel">'+content+'</div>');
        var $t = $("#luckysheet-filter-orderby-color-submenu").end(), myh = $t.outerHeight(), myw = $t.outerWidth();
        var $con = $(this).parent();
        var winW = $(window).width(), winH = $(window).height();
        var menuW = $con.width(), myh = $t.height() + 25, myw = $t.width() + 5;
        var offset = $(this).offset();
        var top = offset.top, left = offset.left + menuW;

        if (left + myw > winW) {
            left = offset.left - myw;
        }

        if (top + myh > winH) {
            top = winH - myh;
        }

        $("#luckysheet-filter-orderby-color-submenu").css({ "top": top, "left": left }).show();
    },
    function(){
        submenuhide = setTimeout(function () { $("#luckysheet-filter-orderby-color-submenu").hide(); }, 200);
    }
);
$(document).on("mouseover mouseleave", "#luckysheet-filter-orderby-color-submenu", function(e){
    if (e.type === "mouseover") {
        clearTimeout(submenuhide);
    } 
    else {
        $(this).hide();
    }
});
$(document).on("click", "#luckysheet-filter-orderby-color-submenu .item label", function(){
    $(this).siblings("input[type='checkbox']").click();
});
$(document).off("click.orderbyColorConfirm").on("click.orderbyColorConfirm", "#luckysheet-filter-orderby-color-submenu #luckysheet-filter-orderby-color-confirm", function(){
    var bg_colorMap = {};
    var fc_colorMap = {};
    
    $("#luckysheet-filter-orderby-color-submenu .item").each(function(i, e){
        if($(e).find("input[type='checkbox']").is(":checked")){
            var color = $(this).find("label").attr("title");
            var $id = $(this).closest(".box").attr("id");

            if($id == "filterBgColor"){
                bg_colorMap[color] = 0;
            }
            else if($id == "filterFcColor"){
                fc_colorMap[color] = 0;
            }
        }
    });

    if($("#luckysheet-filter-orderby-color-submenu #filterBgColor").length > 0){
        var bg_filter = true;
    }
    else{
        var bg_filter = false;
    }

    if($("#luckysheet-filter-orderby-color-submenu #filterFcColor").length > 0){
        var fc_filter = true;
    }
    else{
        var fc_filter = false;
    }

    var $menu = $("#luckysheet-filter-menu");
    var st_r = $menu.data("str"), 
        ed_r = $menu.data("edr"), 
        cindex = $menu.data("cindex"), 
        st_c = $menu.data("stc"), 
        ed_c = $menu.data("edc");

    var rowhiddenother = {}; //其它筛选列的隐藏行
    $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").not($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c).get(0)).each(function () {
        var $t = $(this), rh = $t.data("rowhidden");

        if (rh == "") {
            return true;
        }

        rh = JSON.parse(rh);
        
        for (var r in rh) {
            rowhiddenother[r] = 0;
        }
    });

    var filterdata = {};
    var rowhidden = {};
    var caljs = {};

    var af_compute = luckysheet.alternateformat.getComputeMap();
    var cf_compute = luckysheet.conditionformat.getComputeMap();

    for (var r = st_r + 1; r <= ed_r; r++) {
        if(r in rowhiddenother){
            continue;
        }

        if(luckysheet.flowdata[r] == null){
            continue;
        }

        var cell = luckysheet.flowdata[r][cindex];

        //单元格颜色
        var bg = luckysheet.menuButton.checkstatus(luckysheet.flowdata, r, cindex , "bg");

        var checksAF = luckysheet.alternateformat.checksAF(r, cindex, af_compute);
        if(checksAF != null){//若单元格有交替颜色
            bg = checksAF[1];
        }

        var checksCF = luckysheet.conditionformat.checksCF(r, cindex, cf_compute);
        if(checksCF != null && checksCF["cellColor"] != null){//若单元格有条件格式
            bg = checksCF["cellColor"];
        }

        if(bg.indexOf("rgb") > -1){
            bg = luckysheet.rgbTohex(bg);
        }

        if(bg.length == 4){
            bg = bg.substr(0, 1) + bg.substr(1, 1).repeat(2) + bg.substr(2, 1).repeat(2) + bg.substr(3, 1).repeat(2);
        }

        //文本颜色
        var fc = luckysheet.menuButton.checkstatus(luckysheet.flowdata, r, cindex , "fc");

        if(checksAF != null){//若单元格有交替颜色
            fc = checksAF[0];
        }

        if(checksCF != null && checksCF["textColor"] != null){//若单元格有条件格式
            fc = checksCF["textColor"];
        }

        if(fc.indexOf("rgb") > -1){
            fc = luckysheet.rgbTohex(fc);
        }

        if(fc.length == 4){
            fc = fc.substr(0, 1) + fc.substr(1, 1).repeat(2) + fc.substr(2, 1).repeat(2) + fc.substr(3, 1).repeat(2);
        }

        if(bg_filter && fc_filter){
            if(!(bg in bg_colorMap) && (!(fc in fc_colorMap) || cell == null || luckysheet.func_methods.isRealNull(cell.v))){
                rowhidden[r] = 0;
            }
        }
        else if(bg_filter){
            if(!(bg in bg_colorMap)){
                rowhidden[r] = 0;
            }
        }
        else if(fc_filter){
            if(!(fc in fc_colorMap) || cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                rowhidden[r] = 0;
            }
        }
    }

    var $top = $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").eq(cindex - st_c);

    var optionstate = Object.keys(rowhidden).length > 0;

    var rowhiddenall = $.extend(true, rowhiddenother, rowhidden), 
        rowhidenPre = luckysheet.json.parseJsonParm($top.data("rowhidden"));

    luckysheet.labelFilterOptionState($top, optionstate, rowhidden, caljs, true, st_r, ed_r, cindex, st_c, ed_c);

    var cfg = $.extend(true, {}, config);
    cfg["rowhidden"] = rowhiddenall;

    //保存撤销
    if(clearjfundo){
        var redo = {};
        redo["type"] = "datachangeAll_filter";
        redo["sheetIndex"] = luckysheet.currentSheetIndex;

        redo["config"] = $.extend(true, {}, config);
        redo["curconfig"] = cfg;

        redo["optionstate"] = optionstate;
        redo["optionsindex"] = cindex - st_c;

        redo["rowhidden"] = $.extend(true, {}, rowhidden);
        redo["rowhidenPre"] = $.extend(true, {}, rowhidenPre);

        if (caljs != null) {
            redo["caljs"] = caljs;
        }

        luckysheet.jfundo = [];
        luckysheet.jfredo.push(redo);
    }

    //config
    config = cfg;
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

    luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["rowhidden"], { "k": "rowhidden" });

    //行高、列宽 刷新  
    luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);

    // luckysheet.filterseletedbyindex(st_r, ed_r, st_c, ed_c);
    $("#luckysheet-filter-menu, #luckysheet-filter-submenu, #luckysheet-filter-orderby-color-submenu").hide();
    luckysheet.cleargridelement();
});

//筛选按钮点击事件
$("#luckysheet-cell-main").on("click", ".luckysheet-filter-options", function (e) {
    var $t = $(e.currentTarget), 
        toffset = $t.offset(), 
        $menu = $("#luckysheet-filter-menu"), 
        winH = $(window).height(), 
        winW = $(window).width();

    var st_r = $t.data("str"), 
        ed_r = $t.data("edr"), 
        cindex = $t.data("cindex"), 
        st_c = $t.data("stc"), 
        ed_c = $t.data("edc"), 
        rowhidden = $t.data("rowhidden") == "" ? {} : JSON.parse($t.data("rowhidden").replace(/\'/g, '"'));

    $("body .luckysheet-cols-menu").hide();
    $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();
    $("#luckysheet-filter-byvalue-input").val("");
    $("#luckysheet-filter-bycondition").next().hide();
    $("#luckysheet-filter-byvalue").next().show();
    
    $menu.data("str", st_r);
    $menu.data("edr", ed_r);
    $menu.data("cindex", cindex);
    $menu.data("stc", st_c);
    $menu.data("edc", ed_c);

    $("#luckysheet-filter-menu .luckysheet-filter-selected-input").hide().find("input").val();
    $("#luckysheet-filter-selected span").data("type", "0").data("type", null).text("无");

    var byconditiontype = $t.data("byconditiontype");
    $("#luckysheet-filter-selected span").data("value", $t.data("byconditionvalue")).data("type", byconditiontype).text($t.data("byconditiontext"));

    if (byconditiontype == "2") {
        var $input = $("#luckysheet-filter-menu .luckysheet-filter-selected-input2").show().find("input");
        $input.eq(0).val($t.data("byconditionvalue1"));
        $input.eq(1).val($t.data("byconditionvalue2"));
    }
    else if (byconditiontype == "1") {
        $("#luckysheet-filter-menu .luckysheet-filter-selected-input").eq(0).show().find("input").val($t.data("byconditionvalue1"));
    }

    $("#luckysheet-filter-orderby-asc").off("click").on("click", function () {
        orderbydatafiler(st_r, st_c, ed_r, ed_c, cindex, true);
    });

    $("#luckysheet-filter-orderby-desc").off("click").on("click", function () {
        orderbydatafiler(st_r, st_c, ed_r, ed_c, cindex, false);
    });

    $("#luckysheet-filter-byvalue-select").empty().html('<div style="width:100%;text-align:center;position:relative;top:45%;font-size:14px;"><div class="luckysheetLoaderGif"></div><span>数据量大！请稍后</span></div>');

    var rowhiddenother = {}; //其它筛选列的隐藏行
    $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").not(this).each(function () {
        var $t = $(this), rh = $t.data("rowhidden");
        
        if (rh == "") {
            return true;
        }

        rh = JSON.parse(rh.replace(/\'/g, '"'));
        
        for (var r in rh) {
            rowhiddenother[r] = 0;
        }
    });

    var data = luckysheet.flowdata;

    setTimeout(function () {
        //日期值
        var dvmap = {};  
        var dvmap_uncheck = {};

        //除日期以外的值
        var vmap = {}; 
        var vmap_uncheck = {};  

        for (var r = st_r + 1; r <= ed_r; r++) {
            if(r in rowhiddenother){
                continue;
            }

            if(luckysheet.flowdata[r] == null){
                continue;
            }

            var cell = luckysheet.flowdata[r][cindex];

            if(cell != null && !luckysheet.func_methods.isRealNull(cell.v) && cell.ct != null && cell.ct.t == "d" ){ //单元格是日期
                var v = luckysheet.mask.update("YYYY-MM-DD", cell.v);

                var y = v.split("-")[0];
                var m = v.split("-")[1];
                var d = v.split("-")[2];

                if(!(y in dvmap)){
                    dvmap[y] = {};
                }

                if(!(m in dvmap[y])){
                    dvmap[y][m] = {};
                }

                if(!(d in dvmap[y][m])){
                    dvmap[y][m][d] = 0;
                }
                
                dvmap[y][m][d]++;

                if(r in rowhidden){
                    dvmap_uncheck[y] = 0;
                    dvmap_uncheck[m] = 0;
                    dvmap_uncheck[d] = 0;
                }
            }
            else{
                if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                    var v = null;
                    var m = null;
                }
                else{
                    var v = cell.v;
                    var m = cell.m;
                }

                if(!(v in vmap)){
                    vmap[v] = {};
                }

                if(!(m in vmap[v])){
                    vmap[v][m] = 0;                            
                }

                vmap[v][m]++;

                if(r in rowhidden){
                    vmap_uncheck[v + "#$$$#" + m] = 0;
                }
            }
        }

        //遍历数据加到页面
        var item = [];

        if(JSON.stringify(dvmap).length > 2){
            for(y in dvmap){
                var ysum = 0;
                var monthHtml = '';

                for(m in dvmap[y]){
                    var msum = 0;
                    var dayHtml = '';

                    for(d in dvmap[y][m]){
                        var dayL = dvmap[y][m][d];
                        msum += dayL;

                        //月 小于 10
                        if(Number(m) < 10){
                            var mT = "0" + Number(m);
                        }
                        else{
                            var mT = m;    
                        }

                        //日 小于 10
                        if(Number(d) < 10){
                            var dT = "0" + Number(d);
                        }
                        else{
                            var dT = d;    
                        }

                        //日是否选中状态
                        if((y in dvmap_uncheck) && (m in dvmap_uncheck) && (d in dvmap_uncheck)){
                            dayHtml +=  '<div class="day luckysheet-mousedown-cancel cf" data-check="false" title="'+ y +'-'+ mT +'-'+ dT +'">' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + d + '</label>' +
                                            '<span class="count luckysheet-mousedown-cancel">( ' + dayL + ' )</span>' +
                                        '</div>';
                        }
                        else{
                            dayHtml +=  '<div class="day luckysheet-mousedown-cancel cf" data-check="true" title="'+ y +'-'+ mT +'-'+ dT +'">' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + d + '</label>' +
                                            '<span class="count luckysheet-mousedown-cancel">( ' + dayL + ' )</span>' +
                                        '</div>';
                        }
                    }

                    ysum += msum;
                    
                    //月 小于 10
                    if(Number(m) < 10){
                        var mT2 = "0" + Number(m);
                    }
                    else{
                        var mT2 = m;    
                    }

                    //月是否选中状态
                    if((y in dvmap_uncheck) && (m in dvmap_uncheck)){
                        monthHtml += '<div class="monthBox luckysheet-mousedown-cancel">' +
                                        '<div class="month luckysheet-mousedown-cancel cf" data-check="false" title="'+ y +'-'+ mT2 +'">' +
                                            '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + m + '月</label>' +
                                            '<span class="count luckysheet-mousedown-cancel">( ' + msum + ' )</span>' +
                                        '</div>' +
                                        '<div class="dayList luckysheet-mousedown-cancel">' + dayHtml + '</div>' +
                                     '</div>';
                    }
                    else{
                        monthHtml += '<div class="monthBox luckysheet-mousedown-cancel">' +
                                        '<div class="month luckysheet-mousedown-cancel cf" data-check="true" title="'+ y +'-'+ mT2 +'">' +
                                            '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + m + '月</label>' +
                                            '<span class="count luckysheet-mousedown-cancel">( ' + msum + ' )</span>' +
                                        '</div>' +
                                        '<div class="dayList luckysheet-mousedown-cancel">' + dayHtml + '</div>' +
                                     '</div>';
                    }
                }

                //年是否选中状态
                if(y in dvmap_uncheck){
                    var yearHtml =  '<div class="yearBox luckysheet-mousedown-cancel">' +
                                        '<div class="year luckysheet-mousedown-cancel cf" data-check="false" title="'+ y +'">' +
                                            '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + y + '年</label>' +
                                            '<span class="count luckysheet-mousedown-cancel">( ' + ysum + ' )</span>' +
                                        '</div>' +
                                        '<div class="monthList luckysheet-mousedown-cancel">' + monthHtml + '</div>' +
                                    '</div>';
                }
                else{
                    var yearHtml =  '<div class="yearBox luckysheet-mousedown-cancel">' +
                                        '<div class="year luckysheet-mousedown-cancel cf" data-check="true" title="'+ y +'">' +
                                            '<i class="fa fa-caret-right luckysheet-mousedown-cancel" aria-hidden="true"></i>' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + y + '年</label>' +
                                            '<span class="count luckysheet-mousedown-cancel">( ' + ysum + ' )</span>' +
                                        '</div>' +
                                        '<div class="monthList luckysheet-mousedown-cancel">' + monthHtml + '</div>' +
                                    '</div>';
                }

                item.unshift(yearHtml);
            }
        }

        if(JSON.stringify(vmap).length > 2){
            var vmapKeys = Object.keys(vmap);
            vmapKeys = luckysheet.orderbydata1D(vmapKeys, true);

            for(var i = 0; i < vmapKeys.length; i++){
                var v = vmapKeys[i];

                for(x in vmap[v]){
                    if((v + "#$$$#" + x) == "null#$$$#null"){
                        var text = "(空白)";
                    }
                    else{
                        var text = x;
                    }

                    //是否选中状态
                    if((v + "#$$$#" + x) in vmap_uncheck){
                        var dataHtml =  '<div class="textBox luckysheet-mousedown-cancel cf" data-check="false" data-filter="'+ (v + "#$$$#" + x) +'" title="'+ text +'">' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + text + '</label>' +
                                            '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' +
                                        '</div>';
                    }
                    else{
                        var dataHtml =  '<div class="textBox luckysheet-mousedown-cancel cf" data-check="true" data-filter="'+ (v + "#$$$#" + x) +'" title="'+ text +'">' +
                                            '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                            '<label class="luckysheet-mousedown-cancel">' + text + '</label>' +
                                            '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' +
                                        '</div>';
                    }

                    item.push(dataHtml);
                }
            }
        }

        $("#luckysheet-filter-byvalue-select").html("<div class='ListBox luckysheet-mousedown-cancel' style='min-height: 100px; max-height: " + (winH - toffset.top - 350) + "px; overflow-y: auto; overflow-x: hidden;'><table cellspacing='0' style='width:100%;' class='luckysheet-mousedown-cancel'>" + item.join("") + "</table></div>");
    }, 1);

    showrightclickmenu($menu, toffset.left, toffset.top + 20);

    e.stopPropagation();
    return false;
});

//点击复选框
$(document).off("click.filterCheckbox1").on("click.filterCheckbox1", "#luckysheet-filter-byvalue-select .textBox",function(){
    if($(this).attr("data-check") == "true"){
        $(this).attr("data-check", "false");
        $(this).find("input[type='checkbox']").removeAttr("checked");
    }
    else{
        $(this).attr("data-check", "true");
        $(this).find("input[type='checkbox']").prop("checked", true);
    }
})
$(document).off("click.filterCheckbox2").on("click.filterCheckbox2", "#luckysheet-filter-byvalue-select .year",function(){
    if($(this).attr("data-check") == "true"){
        $(this).attr("data-check", "false");
        $(this).parents(".yearBox").find(".month").attr("data-check", "false");
        $(this).parents(".yearBox").find(".day").attr("data-check", "false");
        $(this).parents(".yearBox").find("input[type='checkbox']").removeAttr("checked");
    }
    else{
        $(this).attr("data-check", "true");
        $(this).parents(".yearBox").find(".month").attr("data-check", "true");
        $(this).parents(".yearBox").find(".day").attr("data-check", "true");
        $(this).parents(".yearBox").find("input[type='checkbox']").prop("checked", true);
    }
})
$(document).off("click.filterCheckbox3").on("click.filterCheckbox3", "#luckysheet-filter-byvalue-select .month",function(){
    //月份 对应的 天
    if($(this).attr("data-check") == "true"){
        $(this).attr("data-check", "false");
        $(this).parents(".monthBox").find(".day").attr("data-check", "false");
        $(this).parents(".monthBox").find("input[type='checkbox']").removeAttr("checked");
    }
    else{
        $(this).attr("data-check", "true");
        $(this).parents(".monthBox").find(".day").attr("data-check", "true");
        $(this).parents(".monthBox").find("input[type='checkbox']").prop("checked", true);
    }
    //月份 对应的 年份
    var yearDayAllCheck = true;
    var $yearDay = $(this).parents(".yearBox").find(".day");
    $yearDay.each(function(i,e){
        if($(e).attr("data-check") == "true"){
            
        }
        else{
            yearDayAllCheck = false;
        }
    });
    if(yearDayAllCheck){
        $(this).parents(".yearBox").find(".year").attr("data-check", "true");
        $(this).parents(".yearBox").find(".year input[type='checkbox']").prop("checked", true);
    }
    else{
        $(this).parents(".yearBox").find(".year").attr("data-check", "false");
        $(this).parents(".yearBox").find(".year input[type='checkbox']").removeAttr("checked");
    }
})
$(document).off("click.filterCheckbox4").on("click.filterCheckbox4", "#luckysheet-filter-byvalue-select .day",function(){
    if($(this).attr("data-check") == "true"){
        $(this).attr("data-check", "false");
        $(this).find("input[type='checkbox']").removeAttr("checked");
    }
    else{
        $(this).attr("data-check", "true");
        $(this).find("input[type='checkbox']").prop("checked", true);
    }
    //天 对应的 月份
    var monthDayAllCheck = true;
    var $monthDay = $(this).parents(".monthBox").find(".day");
    $monthDay.each(function(i,e){
        if($(e).attr("data-check") == "true"){
            
        }
        else{
            monthDayAllCheck = false;
        }
    });
    if(monthDayAllCheck){
        $(this).parents(".monthBox").find(".month").attr("data-check", "true");
        $(this).parents(".monthBox").find(".month input[type='checkbox']").prop("checked", true);
    }
    else{
        $(this).parents(".monthBox").find(".month").attr("data-check", "false");
        $(this).parents(".monthBox").find(".month input[type='checkbox']").removeAttr("checked");
    }
    //天 对应的 年份
    var yearDayAllCheck = true;
    var $yearDay = $(this).parents(".yearBox").find(".day");
    $yearDay.each(function(i,e){
        if($(e).attr("data-check") == "true"){
            
        }
        else{
            yearDayAllCheck = false;
        }
    });
    if(yearDayAllCheck){
        $(this).parents(".yearBox").find(".year").attr("data-check", "true");
        $(this).parents(".yearBox").find(".year input[type='checkbox']").prop("checked", true);
    }
    else{
        $(this).parents(".yearBox").find(".year").attr("data-check", "false");
        $(this).parents(".yearBox").find(".year input[type='checkbox']").removeAttr("checked");
    }
})

//日期 三级下拉显示
$(document).off("click.filterYearDropdown").on("click.filterYearDropdown", "#luckysheet-filter-byvalue-select .yearBox .fa-caret-right",function(event){
    var $p = $(this).parents(".luckysheet-mousedown-cancel");
    if($p.hasClass("year")){
        $(this).parents(".yearBox").find(".monthList").slideToggle();
    }
    if($p.hasClass("month")){
        $(this).parents(".monthBox").find(".dayList").slideToggle();
    }

    event.stopPropagation();
});

//全选
$("#luckysheet-filter-byvalue-btn-all").click(function () {
    $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").prop("checked", true);
    $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").parents(".luckysheet-mousedown-cancel").attr("data-check", "true");
});

//清除
$("#luckysheet-filter-byvalue-btn-clear").click(function () {
    $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").removeAttr("checked");
    $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").parents(".luckysheet-mousedown-cancel").attr("data-check", "false");
});

//反选
$("#luckysheet-filter-byvalue-btn-contra").click(function () {
    var $input = $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']");
    $input.each(function(i, e){
        if($(e).is(":checked")){
            $(e).removeAttr("checked");
            $(e).parents(".luckysheet-mousedown-cancel").attr("data-check", "false");
        }
        else{
            $(e).prop("checked", true);
            $(e).parents(".luckysheet-mousedown-cancel").attr("data-check", "true");
        }
    });
    //天 对应的 月份
    var $month = $("#luckysheet-filter-byvalue-select .ListBox .monthBox");
    $month.each(function(index, event){
        var monthDayAllCheck = true;
        var $monthDay = $(event).find(".day input[type='checkbox']");
        $monthDay.each(function(i,e){
            if($(e).is(":checked")){
                
            }
            else{
                monthDayAllCheck = false;
            }
        });
        if(monthDayAllCheck){
            $(event).find(".month input[type='checkbox']").prop("checked", true);
            $(event).attr("data-check", "true");
        }
        else{
            $(event).find(".month input[type='checkbox']").removeAttr("checked");
            $(event).attr("data-check", "false");
        }
    });
    //天 对应的 年份
    var $year = $("#luckysheet-filter-byvalue-select .ListBox .yearBox");
    $year.each(function(index, event){
        var yearDayAllCheck = true;
        var $yearDay = $(event).find(".day input[type='checkbox']");
        $yearDay.each(function(i,e){
            if($(e).is(":checked")){
                
            }
            else{
                yearDayAllCheck = false;
            }
        });
        if(yearDayAllCheck){
            $(event).find(".year input[type='checkbox']").prop("checked", true);
            $(event).attr("data-check", "true");
        }
        else{
            $(event).find(".year input[type='checkbox']").removeAttr("checked");
            $(event).attr("data-check", "false");
        }
    });
});

//清除筛选
$("#luckysheet-filter-initial").click(function () {
    $("#luckysheet-filter-menu .luckysheet-filter-selected-input").hide().find("input").val();
    $("#luckysheet-filter-selected span").data("type", "0").data("type", null).text("无");

    $('#luckysheet-filter-selected-sheet' + luckysheet.currentSheetIndex + ', #luckysheet-filter-options-sheet' + luckysheet.currentSheetIndex).remove();
    $("#luckysheet-filter-menu, #luckysheet-filter-submenu").hide();

    var redo = {};
    redo["type"] = "datachangeAll_filter_clear";
    redo["sheetIndex"] = luckysheet.currentSheetIndex;

    redo["config"] = $.extend(true, {}, config);
    config["rowhidden"] = {};
    redo["curconfig"] = $.extend(true, {}, config);

    redo["filter_save"] = $.extend(true, {}, luckysheet_filter_save);

    var optiongroups = [];
    $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").each(function () {
        var $t = $(this);

        var optionstate = $t.hasClass("luckysheet-filter-options-active");
        var rowhidden = luckysheet.json.parseJsonParm($t.data("rowhidden"));
        var caljs = luckysheet.json.parseJsonParm($t.data("caljs"));

        optiongroups.push({
            "optionstate":optionstate,
            "rowhidden": rowhidden, 
            "caljs":caljs, 
            "str": $t.data("str"),
            "edr": $t.data("edr"),
            "cindex": $t.data("cindex"),
            "stc": $t.data("stc"),
            "edc": $t.data("edc")
        });
    });
    redo["optiongroups"] = optiongroups;

    luckysheet.jfundo = [];
    luckysheet.jfredo.push(redo);

    //清除筛选发送给后台
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].filter = null;
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].filter_select = null;

    luckysheet.server.saveParam("fsc", luckysheet.currentSheetIndex, null);

    //config
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

    luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, {}, { "k": "rowhidden" });

    //行高、列宽 刷新  
    luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);
});

//按照值进行筛选
$("#luckysheet-filter-byvalue-input").on('input propertychange', function () {
    var v = $(this).val().toString();
    $("#luckysheet-filter-byvalue-select .ListBox .luckysheet-mousedown-cancel").show();
    
    if(v != ""){
        $("#luckysheet-filter-byvalue-select .ListBox input[type='checkbox']").each(function(i, e){
            if($(e).closest(".day").length > 0){
                var day = $(e).siblings("label").text().toString();
                var month = $(e).closest(".monthBox").find(".month label").text().toString();
                var year = $(e).closest(".yearBox").find(".year label").text().toString();
                var itemV = year + "-" + month + "-" + day;

                if(itemV.indexOf(v) == -1){
                    $(e).closest(".day").hide();
                    
                    //天 对应的 月份
                    var $monthDay = $(e).closest(".dayList").find(".day:visible");
                    if($monthDay.length == 0){
                        $(e).closest(".monthBox").find(".month").hide();
                    }

                    //天 对应的 年份
                    var $yearDay = $(e).closest(".monthList").find(".day:visible");
                    if($yearDay.length == 0){
                        $(e).closest(".yearBox").find(".year").hide();
                    }
                }
            }

            if($(e).closest(".textBox").length > 0){
                var itemV = $(e).siblings("label").text().toString();
                
                if(itemV.indexOf(v) == -1){
                    $(e).parents(".textBox").hide();
                }
            }
        });
    }
});