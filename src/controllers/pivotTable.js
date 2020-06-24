export const pivotTable = {
    pivotDatas: null,
    pivotSheetIndex: 0,
    pivotDataSheetIndex: 0,
    // getpivotdata:function(getid){
    //     for (var i = 0; i < this.pivotDatas;i++){
    //         if (this.pivotDatas[i].id == getid) {
    //             return this.pivotDatas[i];
    //         }
    //     }
    //     return null;
    // },
    // setpivotdata:function(data){
    //     pivotDatas.push(data);
    // },
    celldata: null,
    origindata: null,
    getCellData: function (cursheetindex, datasheetindex, data_select_save) {
        var sheetIndex;
        if (cursheetindex != null) {
            sheetIndex = cursheetindex;
        }
        else {
            sheetIndex = luckysheet.currentSheetIndex;
        }

        var realIndex = luckysheet.sheetmanage.getSheetIndex(sheetIndex);

        if (luckysheet.getObjType(luckysheetfile[realIndex].pivotTable) != "object"){
            luckysheetfile[realIndex].pivotTable = eval('('+ luckysheetfile[realIndex].pivotTable +')');
        }

        if (luckysheetfile[realIndex].pivotTable != null) {
            this.column = luckysheetfile[realIndex].pivotTable.column;
            this.row = luckysheetfile[realIndex].pivotTable.row;
            this.values = luckysheetfile[realIndex].pivotTable.values;
            this.filter = luckysheetfile[realIndex].pivotTable.filter;
            this.showType = luckysheetfile[realIndex].pivotTable.showType;

            this.filterparm = luckysheetfile[realIndex].pivotTable.filterparm;

            if (luckysheetfile[realIndex].pivotTable.drawPivotTable != null) {
                this.drawPivotTable = luckysheetfile[realIndex].pivotTable.drawPivotTable;
            }
            else {
                this.drawPivotTable = true;
            }

            if (luckysheetfile[realIndex].pivotTable.pivotTableBoundary != null) {
                this.pivotTableBoundary = luckysheetfile[realIndex].pivotTable.pivotTableBoundary;
            }
            else {
                this.pivotTableBoundary = [12, 6];
            }

            if (data_select_save != null) {
                this.pivot_select_save = data_select_save;
            }
            else {
                this.pivot_select_save = luckysheetfile[realIndex].pivotTable.pivot_select_save;
            }

            if (datasheetindex != null) {
                this.pivotDataSheetIndex = datasheetindex;
            }
            else {
                this.pivotDataSheetIndex = luckysheetfile[realIndex].pivotTable.pivotDataSheetIndex;
            }
        }
        else {
            this.column = null;
            this.row = null;
            this.values = null;
            this.filter = null;
            this.showType = null;

            this.filterparm = null;

            this.drawPivotTable = true;
            this.pivotTableBoundary = [12, 6];

            if (data_select_save != null) {
                this.pivot_select_save = data_select_save;
            }
            else {
                this.pivot_select_save = luckysheet_select_save;
            }

            if (datasheetindex != null) {
                this.pivotDataSheetIndex = datasheetindex;
            }
            else {
                this.pivotDataSheetIndex = sheetIndex;
            }
        }

        var pivotrealIndex = luckysheet.sheetmanage.getSheetIndex(this.pivotDataSheetIndex);

        var otherfile = luckysheetfile[pivotrealIndex];
        if(otherfile["data"] == null){
            otherfile["data"] = luckysheet.sheetmanage.buildGridData(otherfile);
        }
        this.origindata = luckysheet.getdatabyselectionD(otherfile.data, this.pivot_select_save);

        var rowhidden = {};
        if (this.filterparm != null) {
            for (var f in this.filterparm) {
                for (h in this.filterparm[f]) {
                    if (h.rowhidden != null) {
                        rowhidden = $.extend(true, rowhidden, h.rowhidden);
                    }
                }
            }
        }
        this.rowhidden = rowhidden;
        //this.pivot_select_save = $.extend(true, {}, this.pivot_select_save);

        this.pivotSheetIndex = sheetIndex;

        var newdata = [];
        for (var i = 0; i < this.origindata.length; i++) {
            if (this.rowhidden != null && this.rowhidden[i] != null) {
                continue;
            }
            newdata.push([].concat(this.origindata[i]));
        }
        this.celldata = newdata;

        this.pivot_data_type = {};
        for (var c = 0; c < this.celldata[1].length; c++) {
            var type = luckysheet.isdatatype(this.celldata[1][c]);
            this.pivot_data_type[c.toString()] = type;
        }
    },
    pivot_data_type: {},
    pivot_select_save: null,
    column: null,
    row: null,
    values: null,
    filter: null,
    showType: null,
    rowhidden: null,
    selected: null,
    caljs: null,
    initial: true,
    filterparm: null,
    luckysheet_pivotTable_select_state: false,
    jgridCurrentPivotInput: null,
    movestate: false,
    moveitemposition: [],
    movesave: {},
    showvaluecolrow: function () {
        if ($("#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item").length >= 2) {
            $("#luckysheetpivottablevaluecolrowshow").show();

            if (this.showType == "column") {
                $("#luckysheetpivottablevaluecolrow").prop("checked", true);
                $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").addClass("ui-state-active");

                $("#luckysheetpivottablevaluecolrow1").prop("checked", false);
                $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").removeClass("ui-state-active");
            }
            else {
                $("#luckysheetpivottablevaluecolrow1").prop("checked", true);
                $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").addClass("ui-state-active");

                $("#luckysheetpivottablevaluecolrow").prop("checked", false);
                $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").removeClass("ui-state-active");
            }
        }
        else {
            $("#luckysheetpivottablevaluecolrowshow").hide();
        }
    },
    resetOrderby: function (obj) {
        var orderby = $("#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item").index(obj);
        $("#luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
            if ($(this).data("orderby") == orderby) {
                $(this).data("orderby", "self");
            }
        });
    },
    luckysheetsliderlistclearfilter: function ($filter) {
        var $t = $filter.parent();
        var cindex = $t.data("index");

        var rowhidden = {}, selected = {}, d = luckysheet.pivotTable.origindata, filterdata = {};

        $t.data("rowhidden", "").find(".luckysheet-slider-list-item-filtered").hide();
        luckysheet.pivotTable.setDatatojsfile("selected", {}, cindex);
        luckysheet.pivotTable.setDatatojsfile("rowhidden", null, cindex);

        var newdata = [];
        for (var i = 0; i < d.length; i++) {
            if (rowhidden[i] != null) {
                continue;
            }
            newdata.push([].concat(d[i]));
        }

        luckysheet.pivotTable.celldata = newdata;

        luckysheet.pivotTable.refreshPivotTable();
        $("#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu").hide();
    },
    luckysheetsliderlistitemfilter: function ($filter) {
        var $t = $filter.parent(), 
            toffset = $t.offset(), 
            $menu = $("#luckysheet-pivotTableFilter-menu"), 
            winH = $(window).height(), 
            winW = $(window).width();

        var cindex = $t.data("index");

        var rowhidden = $t.data("rowhidden");
        if(rowhidden == null || rowhidden == ""){
            rowhidden = {};
        }
        else if(luckysheet.getObjType(rowhidden) == "string"){
            rowhidden = JSON.parse(rowhidden);
        }

        $("body .luckysheet-cols-menu").hide();
        $("#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu").hide();
        $("#luckysheet-pivotTableFilter-byvalue-input").val("");
        $("#luckysheet-pivotTableFilter-bycondition").next().hide();
        $("#luckysheet-pivotTableFilter-byvalue").next().show();

        $menu.data("index", cindex);

        $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input").hide().find("input").val();
        $("#luckysheet-pivotTableFilter-selected span").data("type", "0").data("type", null).text("无");

        var byconditiontype = $t.data("byconditiontype");
        $("#luckysheet-pivotTableFilter-selected span").data("value", $t.data("byconditionvalue")).data("type", byconditiontype).text($t.data("byconditiontext"));

        if (byconditiontype == "2") {
            var $input = $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input2").show().find("input");
            $input.eq(0).val($t.data("byconditionvalue1"));
            $input.eq(1).val($t.data("byconditionvalue2"));
        }
        else if (byconditiontype == "1") {
            $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input").eq(0).show().find("input").val($t.data("byconditionvalue1"));
        }

        $("#luckysheet-pivotTableFilter-byvalue-select").empty().html('<div style="width:100%;text-align:center;position:relative;top:45%;font-size: 14px;"> <div class="luckysheetLoaderGif"> </div> <span>数据量大！请稍后</span></div>');
        
        var rowhiddenother = {}; //其它筛选列的隐藏行
        $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").not($t.get(0)).each(function () {
            var $t = $(this), rh = $t.data("rowhidden");

            if (rh == null || rh == "") {
                return true;
            }

            if(luckysheet.getObjType(rh) == "string"){
                rh = JSON.parse(rh);
            }
            
            for (var r in rh) {
                rowhiddenother[r] = 0;
            }
        });

        var data = luckysheet.pivotTable.origindata;

        setTimeout(function () {
            //日期值
            var dvmap = {};  
            var dvmap_uncheck = {};

            //除日期以外的值
            var vmap = {}; 
            var vmap_uncheck = {};  

            for (var r = 1; r < data.length; r++) {
                if(r in rowhiddenother){
                    continue;
                }

                if(data[r] == null){
                    continue;
                }

                var cell = data[r][cindex];

                if(cell != null && cell.ct != null && cell.ct.t == "d"){ //单元格是日期
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
                            var dataHtml =  '<div class="textBox luckysheet-mousedown-cancel cf" data-check="false" data-filter="'+ (v + "#$$$#" + x) +'" title="'+ x +'">' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + text + '</label>' +
                                                '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' +
                                            '</div>';
                        }
                        else{
                            var dataHtml =  '<div class="textBox luckysheet-mousedown-cancel cf" data-check="true" data-filter="'+ (v + "#$$$#" + x) +'" title="'+ x +'">' +
                                                '<input class="luckysheet-mousedown-cancel" type="checkbox" checked="checked"/>' +
                                                '<label class="luckysheet-mousedown-cancel">' + text + '</label>' +
                                                '<span class="luckysheet-mousedown-cancel count">( ' + vmap[v][x] + ' )</span>' +
                                            '</div>';
                        }

                        item.push(dataHtml);
                    }
                }
            }

            $("#luckysheet-pivotTableFilter-byvalue-select").html("<div class='ListBox luckysheet-mousedown-cancel' style='max-height:" + (winH - toffset.top - 350) + "px;overflow-y:auto;overflow-x:hidden;'>" + item.join("") + "</div>");
        }, 1);

        showrightclickmenu($menu, toffset.left - 250, toffset.top);
    },
    getSumTypeName: function (type) {
        var name = "";
        if (type == "SUM") {
            name = "求和";
        }
        else if (type == "COUNT") {
            name = "数值计数";
        }
        else if (type == "COUNTA") {
            name = "计数";
        }
        else if (type == "COUNTUNIQUE") {
            name = "去重计数";
        }
        else if (type == "AVERAGE") {
            name = "平均值";
        }
        else if (type == "MAX") {
            name = "最大值";
        }
        else if (type == "MIN") {
            name = "最小值";
        }
        else if (type == "MEDIAN") {
            name = "中位数";
        }
        else if (type == "PRODUCT") {
            name = "乘积";
        }
        else if (type == "STDEV") {
            name = "标准差";
        }
        else if (type == "STDEVP") {
            name = "整体标准差";
        }
        else if (type == "VAR") {
            name = "方差";
        }
        else if (type == "VARP") {
            name = "整体方差";
        }
        return name;
    },
    setDatatojsfile: function (attr, value, cindex) {
        var index = luckysheet.sheetmanage.getSheetIndex(this.pivotSheetIndex);
        if (luckysheetfile[index]["pivotTable"] == null) {
            luckysheetfile[index]["pivotTable"] = {};
        }

        if (cindex == null) {
            luckysheetfile[index]["pivotTable"][attr] = value;
            this[attr] = value;
        }
        else {
            if (luckysheetfile[index]["pivotTable"]["filterparm"] == null) {
                luckysheetfile[index]["pivotTable"]["filterparm"] = {};
            }

            if (luckysheetfile[index]["pivotTable"]["filterparm"][cindex.toString()] == null) {
                luckysheetfile[index]["pivotTable"]["filterparm"][cindex.toString()] = {};
            }
            luckysheetfile[index]["pivotTable"]["filterparm"][cindex.toString()][attr] = value;

            if (this["filterparm"] == null) {
                this["filterparm"] = {};
            }

            if (this["filterparm"][cindex.toString()] == null) {
                this["filterparm"][cindex.toString()] = {};
            }

            this["filterparm"][cindex.toString()][attr] = value;
        }
    },
    createPivotTable: function (e) {
        var datasheetindex = luckysheet.currentSheetIndex;

        if(luckysheet.isEditMode()){
            alert("非编辑模式下禁止该操作！");
            return;
        }

        if(luckysheet_select_save.length > 1){
            luckysheet.tooltip.info("提示", "不能对多重选择区域执行此操作，请选择单个区域，然后再试");
            return
        }

        if (luckysheet_select_save.length == 0 || luckysheet_select_save[0].row[0] == luckysheet_select_save[0].row[1] || luckysheet_select_save[0].column[0] == luckysheet_select_save[0].column[1]) {
            luckysheet.tooltip.info("提示", "请选择新建透视表的区域");
            return;
        }
        var select_save = $.extend(true, {}, luckysheet_select_save[0]);
        luckysheet.sheetmanage.addNewSheet(e, true);

        this.getCellData(luckysheet.currentSheetIndex, datasheetindex, select_save);

        this.setDatatojsfile("pivot_select_save", select_save);
        this.setDatatojsfile("pivotDataSheetIndex", datasheetindex);

        this.initialPivotManage();
        //this.drawPivotTable();
    },
    changePivotTable: function (index) {
        var pivotDataSheetIndex = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)].pivotTable.pivotDataSheetIndex;
        var real_pivotDataSheetIndex = luckysheet.sheetmanage.getSheetIndex(pivotDataSheetIndex);

        if(real_pivotDataSheetIndex == null){
            luckysheet.tooltip.info("此数据透视表的源数据已损坏！", "");
            return;
        }

        this.getCellData(index);
        this.initialPivotManage(true);
    },
    refreshPivotTable: function () {
        var redo = {};
        var pivotTable = this.getPivotTableData();
        redo["pivotTable"] = pivotTable; 
        redo["data"] = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);//取数据

        this.storePivotTableParam();
        var ret = this.dataHandler(this.column, this.row, this.values, this.showType, this.celldata);
        this.setDatatojsfile("pivotDatas", ret);

        var d = $.extend(true, [], luckysheet.sheetmanage.nulldata);
        var data = d;
        if (ret.length == 0) {
            //this.drawPivotTable =true;
            //this.pivotTableBoundary = [12, 6];
            this.setDatatojsfile("drawPivotTable", true);
            this.setDatatojsfile("pivotTableBoundary", [12, 6]);
        }
        else {
            //this.drawPivotTable = false;
            //this.pivotTableBoundary = [ret.length, ret[0].length];
            this.setDatatojsfile("drawPivotTable", false);
            this.setDatatojsfile("pivotTableBoundary", [ret.length, ret[0].length]);

            var rlen = ret.length, clen = ret[0].length;

            var addr = rlen - d.length, addc = clen - d[0].length;

            data = luckysheet.datagridgrowth(d, addr + 20, addc + 10, true);

            for (var r = 0; r < rlen; r++) {
                var x = [].concat(data[r]);
                for (var c = 0; c < clen; c++) {
                    var value = "";
                    if (ret[r] != null && ret[r][c] != null) {
                        value = luckysheet.getcellvalue(r, c, ret);
                    }
                    x[c] = value;
                }
                data[r] = x;
            }
        }

        redo["type"] = "pivotTable_change";
        redo["curdata"] = $.extend(true, [], data);
        redo["sheetIndex"] = luckysheet.currentSheetIndex;

        var pivotTable = this.getPivotTableData();
        redo["pivotTablecur"] = pivotTable; 

        if(clearjfundo){
            luckysheet.jfundo = [];
            luckysheet.jfredo.push(redo);
        }
        
        //luckysheet.flowdata = flowdata_new = data;
        luckysheet.cleargridelement();
        clearjfundo = false;
        
        if (addr > 0 || addc > 0) {
            luckysheet.jfrefreshgridall(data[0].length, data.length, data, null, luckysheet_select_save, "datachangeAll");
        }
        else {
            luckysheet.jfrefreshgrid(data, luckysheet_select_save);
            luckysheet.selectHightlightShow();
        }

        clearjfundo = true;
    },
    drawPivotTable: true,
    pivotTableBoundary: [12, 6],
    pivotclick: function (row_index, col_index, index) {
        if(index == null){
            index = luckysheet.currentSheetIndex;
        }

        var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(index)];

        if(!file.isPivotTable){
            return;
        }

        var pivotDataSheetIndex = file.pivotTable.pivotDataSheetIndex;
        var real_pivotDataSheetIndex = luckysheet.sheetmanage.getSheetIndex(pivotDataSheetIndex);

        if(real_pivotDataSheetIndex == null){
            return;
        }

        if (this.isPivotRange(row_index, col_index)) {
            $("#luckysheet-modal-dialog-slider-pivot").show();
            luckysheet.luckysheetsizeauto();
            $("#luckysheet-sta-content").css("padding-right", 260);
        }
        else {
            $("#luckysheet-modal-dialog-slider-pivot").hide();
            luckysheet.luckysheetsizeauto();
            $("#luckysheet-sta-content").css("padding-right", 10);
        }
    },
    isPivotRange: function (row_index, col_index) {
        if (!!luckysheetcurrentisPivotTable) {
            if (row_index < this.pivotTableBoundary[0] && col_index < this.pivotTableBoundary[1]) {
                return true;
            }
            else {
                return false;
            }
        }
    },
    storePivotTableParam: function () {
        var columnarr = [], rowarr = [], filterarr = [], valuesarr = [];
        $("#luckysheet-modal-dialog-config-filter .luckysheet-modal-dialog-slider-config-item").each(function () {
            var item = {};
            item["index"] = $(this).data("index");
            item["name"] = $(this).data("name");
            item["fullname"] = $(this).find(".luckysheet-modal-dialog-slider-config-item-txt").text();
            // item["order"] = $(this).data("order");
            // item["orderby"] = $(this).data("orderby");
            // item["stastic"] = $(this).data("stastic");
            filterarr.push(item);
        });

        $("#luckysheet-modal-dialog-config-row .luckysheet-modal-dialog-slider-config-item").each(function () {
            var item = {};
            item["index"] = $(this).data("index");
            item["name"] = $(this).data("name");
            item["fullname"] = $(this).find(".luckysheet-modal-dialog-slider-config-item-txt").text();
            item["order"] = $(this).data("order");
            item["orderby"] = $(this).data("orderby");
            item["stastic"] = $(this).data("stastic");
            rowarr.push(item);
        });

        $("#luckysheet-modal-dialog-config-column .luckysheet-modal-dialog-slider-config-item").each(function () {
            var item = {};
            item["index"] = $(this).data("index");
            item["name"] = $(this).data("name");
            item["fullname"] = $(this).find(".luckysheet-modal-dialog-slider-config-item-txt").text();
            item["order"] = $(this).data("order");
            item["orderby"] = $(this).data("orderby");
            item["stastic"] = $(this).data("stastic");
            columnarr.push(item);
        });

        $("#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item").each(function () {
            var item = {};
            item["index"] = $(this).data("index");
            item["name"] = $(this).data("name");
            item["fullname"] = $(this).find(".luckysheet-modal-dialog-slider-config-item-txt").text();
            item["sumtype"] = $(this).data("sumtype");
            item["nameindex"] = $(this).data("nameindex");
            valuesarr.push(item);
        });

        this.setDatatojsfile("column", columnarr);
        this.setDatatojsfile("row", rowarr);
        this.setDatatojsfile("filter", filterarr);
        this.setDatatojsfile("values", valuesarr);
        var showtype = $("#luckysheetpivottablevaluecolrow:checked, #luckysheetpivottablevaluecolrow1:checked").val();
        this.setDatatojsfile("showType", showtype == "0" ? "row" : "column");

        var pivotTable = this.getPivotTableData();
        delete pivotTable.pivotDatas;
        luckysheet.server.saveParam("all", this.pivotSheetIndex, pivotTable, { "k": "pivotTable" });
    },
    getPivotTableData:function(dataindex){
        if(dataindex == null){
            dataindex = this.pivotSheetIndex;
        }

        var index = luckysheet.sheetmanage.getSheetIndex(dataindex);
        var pivotTable = luckysheetfile[index]["pivotTable"];

        if(luckysheet.getObjType(pivotTable) == "object"){
            pivotTable = $.extend(true, {}, luckysheetfile[index]["pivotTable"]);
        }
        else{
            pivotTable = eval('('+ pivotTable +')');
        }
        //var pivotTable = $.extend(true, {}, luckysheetfile[index]["pivotTable"]);
        return pivotTable
    },
    addValuesToTitle: function (titles, values) {
        var rowLen = titles.length * values.length, colLen = titles[0].length + 1;
        var retdata = [];
        if (titles.length == 0 && values.length > 0) {
            for (var v = 0; v < values.length; v++) {
                retdata.push(values[v].fullname);
            }
            return retdata;
        }

        if (values.length == 0 && titles.length > 0) {
            return titles;
        }

        for (var r = 0; r < rowLen; r++) {
            retdata[r] = new Array(colLen);
            for (var c = 0; c < colLen - 1; c++) {
                retdata[r][c] = titles[Math.floor(r / values.length)][c];
            }

            retdata[r][colLen - 1] = values[r % values.length].fullname;
        }

        return retdata;
    },
    initialPivotManage: function (restore) {
        //this.getCellData();
        if (this.initial) {
            this.initial = false;
            $("body").append(luckysheetPivotTableHTML);
            $("#luckysheet-modal-dialog-slider-close").click(function () {
                $("#luckysheet-modal-dialog-slider-pivot").hide();
                luckysheet.luckysheetsizeauto();
            });

            $("body").append(luckysheet.replaceHtml(modelHTML, { "id": "luckysheet-data-pivotTable-selection", "addclass": "luckysheet-data-pivotTable-selection", "title": "选取数据范围", "content": '<input id="luckysheet-pivotTable-range-selection-input" class="luckysheet-datavisual-range-container" style="font-size: 14px;padding:5px;max-width:none;" spellcheck="false" aria-label="数据范围" placeholder="数据范围">', "botton": '<button id="luckysheet-pivotTable-selection-confirm" class="btn btn-primary">确认选取</button><button class="btn btn-default luckysheet-model-close-btn">取消</button>' }));

            $("body").append(luckysheet.replaceHtml(filtermenuHTML, { "menuid": "pivotTableFilter" }));
            $("body").append(luckysheet.replaceHtml(filtersubmenuHTML, { "menuid": "pivotTableFilter" }));
            $("body").append(pivottableconfigHTML);
            $("body").append(pivottablesumHTML);

            $("#luckysheet-pivotTableFilter-orderby-asc").remove();
            $("#luckysheet-pivotTableFilter-orderby-desc").next().remove();
            $("#luckysheet-pivotTableFilter-orderby-desc").remove();
            $("#luckysheet-pivotTableFilter-orderby-color").next().remove();
            $("#luckysheet-pivotTableFilter-orderby-color").remove();

            $("#luckysheetpivottablevaluecolrow, #luckysheetpivottablevaluecolrow1").checkboxradio({
                icon: false
            }).change(function () {
                luckysheet.pivotTable.refreshPivotTable();
            });

            var hidefilersubmenu = null;
            $("#luckysheet-pivotTableFilter-menu").mouseover(function () {
                clearTimeout(hidefilersubmenu);
                hidefilersubmenu = setTimeout(function () {
                    $("#luckysheet-pivotTableFilter-submenu").hide();
                }, 500);
            });

            //点击复选框
            $(document).off("click.ptFilterCheckbox1").on("click.ptFilterCheckbox1", "#luckysheet-pivotTableFilter-byvalue-select .textBox",function(){
                if($(this).attr("data-check") == "true"){
                    $(this).attr("data-check", "false");
                    $(this).find("input[type='checkbox']").removeAttr("checked");
                }
                else{
                    $(this).attr("data-check", "true");
                    $(this).find("input[type='checkbox']").prop("checked", true);
                }
            })
            $(document).off("click.ptFilterCheckbox2").on("click.ptFilterCheckbox2", "#luckysheet-pivotTableFilter-byvalue-select .year",function(){
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
            $(document).off("click.ptFilterCheckbox3").on("click.ptFilterCheckbox3", "#luckysheet-pivotTableFilter-byvalue-select .month",function(){
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
            $(document).off("click.ptFilterCheckbox4").on("click.ptFilterCheckbox4", "#luckysheet-pivotTableFilter-byvalue-select .day",function(){
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
            $(document).off("click.ptFilterYearDropdown").on("click.ptFilterYearDropdown", "#luckysheet-pivotTableFilter-byvalue-select .yearBox .fa-caret-right",function(){
                var $p = $(this).parents(".luckysheet-mousedown-cancel");
                if($p.hasClass("year")){
                    $(this).parents(".yearBox").find(".monthList").slideToggle();
                }
                if($p.hasClass("month")){
                    $(this).parents(".monthBox").find(".dayList").slideToggle();
                }
            });

            //全选
            $("#luckysheet-pivotTableFilter-byvalue-btn-all").click(function () {
                $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").prop("checked", true);
                $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").parents(".luckysheet-mousedown-cancel").attr("data-check", "true");
            });

            //反选
            $("#luckysheet-pivotTableFilter-byvalue-btn-contra").click(function () {
                var $input = $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']");
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
                var $month = $("#luckysheet-pivotTableFilter-byvalue-select .ListBox .monthBox");
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
                var $year = $("#luckysheet-pivotTableFilter-byvalue-select .ListBox .yearBox");
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

            //清除
            $("#luckysheet-pivotTableFilter-byvalue-btn-clear").click(function () {
                $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").removeAttr("checked");
                $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").parents(".luckysheet-mousedown-cancel").attr("data-check", "false");
            });

            //按照值进行筛选
            $("#luckysheet-pivotTableFilter-byvalue-input").on('input propertychange', function () {
                var v = $(this).val().toString();
                $("#luckysheet-pivotTableFilter-byvalue-select .ListBox .luckysheet-mousedown-cancel").show();
                if(v != ""){
                    var $check = $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']");
                    $check.each(function(i, e){
                        var $p = $(e).parents(".luckysheet-mousedown-cancel");
                        if($p.hasClass("day")){ //日期
                            var day = $(e).siblings("label").text().toString();
                            var month = $(e).parents(".monthBox").find(".month label").text().toString();
                            var year = $(e).parents(".yearBox").find(".year label").text().toString();
                            var itemV = year + "-" + month + "-" + day;
                            
                            if(itemV.indexOf(v) == -1){
                                $(e).parents(".day").hide();
                                //天 对应的 月份
                                var $monthDay = $(e).parents(".dayList").find(".day:visible");
                                if($monthDay.length == 0){
                                    $(e).parents(".monthBox").find(".month").hide();
                                }
                                //天 对应的 年份
                                var $yearDay = $(e).parents(".monthList").find(".day:visible");
                                if($yearDay.length == 0){
                                    $(e).parents(".yearBox").find(".year").hide();
                                }
                            }
                        }
                        if($p.hasClass("textBox")){ //其它
                            var itemV = $(e).siblings("label").text().toString();
                            
                            if(itemV.indexOf(v) == -1){
                                $(e).parents(".textBox").hide();
                            }
                        }
                    });
                }
            });

            $("#luckysheet-pivotTableFilter-bycondition, #luckysheet-pivotTableFilter-byvalue").click(function () {
                var $t = $(this);
                $t.next().slideToggle(200);
                setTimeout(function () {
                    if ($t.attr("id") == "luckysheet-pivotTableFilter-bycondition" && $("#luckysheet-pivotTableFilter-bycondition").next().is(":visible")) {
                        if ($("#luckysheet-pivotTableFilter-selected span").text() != "无") {
                            $("#luckysheet-pivotTableFilter-byvalue").next().slideUp(200);
                        }
                    }

                    if ($t.is($("#luckysheet-pivotTableFilter-bycondition"))) {
                        if ($("#luckysheet-pivotTableFilter-bycondition").next().is(":hidden") && $("#luckysheet-pivotTableFilter-byvalue").next().is(":hidden")) {
                            $("#luckysheet-pivotTableFilter-byvalue").next().slideDown(200);
                        }
                    }
                }, 300);

            });

            //取消按钮
            $("#luckysheet-pivotTableFilter-cancel").click(function () {
                $("#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu").hide();
            });

            $("#luckysheet-pivotTableFilter-selected").click(function () {
                var $t = $(this), toffset = $t.offset(), $menu = $("#luckysheet-pivotTableFilter-submenu");
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

            //按条件过滤
            $("#luckysheet-pivotTableFilter-submenu").mouseover(function () {
                clearTimeout(hidefilersubmenu);
            }).find(".luckysheet-cols-menuitem").click(function (e) {
                $("#luckysheet-pivotTableFilter-selected span").html($(this).find(".luckysheet-cols-menuitem-content").text()).data("value", $(this).data("value"));
                $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input").hide();
                if ($(this).data("type") == "2") {
                    $("#luckysheet-pivotTableFilter-selected span").data("type", "2");
                    $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input2").show();
                }
                else if ($(this).data("type") == "0") {
                    $("#luckysheet-pivotTableFilter-selected span").data("type", "0");
                }
                else {
                    $("#luckysheet-pivotTableFilter-selected span").data("type", "1");
                    $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input").eq(0).show();
                    //若是日期 改变input type类型为date
                    if($(this).attr("data-value") == "dateequal" || $(this).attr("data-value") == "datelessthan" || $(this).attr("data-value") == "datemorethan"){
                        $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input input").prop("type", "date");
                    }
                    else{
                        $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input input").prop("type", "text");
                    }
                }
                $("#luckysheet-pivotTableFilter-byvalue").next().slideUp();
                $("#luckysheet-pivotTableFilter-submenu").hide();
            });

            $("#luckysheet-modal-dialog-pivotTable-list").on("click", " .luckysheet-slider-list-item-filter", function (e) {
                //var $t = $(this).parent(),$filter = $(this), toffset = $t.offset(), $menu = $("#luckysheet-pivotTableFilter-menu"), winH = $(window).height(), winW = $(window).width();
                luckysheet.pivotTable.luckysheetsliderlistitemfilter($(this));
                e.stopPropagation();
                return false;
            });
            //.on("mousedown dblclick mouseup", function (e) { e.stopPropagation(); return false; });

            $("#luckysheet-modal-dialog-pivotTable-list").on("click", " .luckysheet-slider-list-item-filtered", function (e) {
                luckysheet.pivotTable.luckysheetsliderlistclearfilter($(this).next());
                e.stopPropagation();
                return false;
            });


            $("#luckysheet-dialog-pivotTable-range-seleted").click(function () {
                $("#luckysheet-modal-dialog-slider-pivot").hide();
                luckysheet.luckysheetsizeauto();
                var $t = $("#luckysheet-data-pivotTable-selection"), myh = $t.outerHeight(), myw = $t.outerWidth();
                var winw = $(window).width(), winh = $(window).height();
                var scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();

                $("#luckysheet-data-pivotTable-selection").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 4 }).show();

                luckysheet.pivotTable.jgridCurrentPivotInput = $("#luckysheet-dialog-pivotTable-range").html();
                $("#luckysheet-pivotTable-range-selection-input").val(luckysheet.pivotTable.jgridCurrentPivotInput);
                luckysheet.pivotTable.luckysheet_pivotTable_select_state = true;
                //luckysheet.pivotTable.pivotSheetIndex = luckysheet.currentSheetIndex;
            });

            //清除筛选按钮
            $("#luckysheet-pivotTableFilter-initial").click(function () {
                $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-slider-list-item-filtered").hide();
                $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").data("rowhidden", "");
                $("#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu").hide();
                $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input").hide().find("input").val();
                $("#luckysheet-pivotTableFilter-selected span").data("type", "0").data("type", null).text("无");

                luckysheet.pivotTable.setDatatojsfile("filterparm", null);
                luckysheet.pivotTable.celldata = luckysheet.pivotTable.origindata;

                luckysheet.pivotTable.refreshPivotTable();
            });

            $("#luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column").on("click", ".luckysheet-modal-dialog-slider-config-item-icon", function (e) {
                var $t = $(e.target), $item = $t.closest(".luckysheet-modal-dialog-slider-config-item"), cindex = $item.data("index"), toffset = $item.offset();
                var order = $item.data("order"), orderby = $item.data("orderby"), stastic = $item.data("stastic");
                if (order == null) {
                    order = "default";
                }

                var option = '<option value="self">' + $item.find(".luckysheet-modal-dialog-slider-config-item-txt").data("name") + '</option>';

                $("#luckysheet-modal-dialog-config-value .luckysheet-modal-dialog-slider-config-item").each(function (i) {
                    option += '<option value="' + i + '">' + $(this).find(".luckysheet-modal-dialog-slider-config-item-txt").text() + '</option>';
                });
                $("#luckysheet-pivotTable-config-option-orderby").empty().html(option);
                if (orderby == null) {
                    orderby = "self";
                }

                if (stastic == null) {
                    stastic = "1";
                }

                $("#luckysheet-pivotTable-config-option-order").val(order).data("index", cindex);
                $("#luckysheet-pivotTable-config-option-orderby").val(orderby).data("index", cindex);
                $("#luckysheet-pivotTable-config-option-stastic").val(stastic).data("index", cindex);

                mouseclickposition($("#luckysheet-pivotTable-config-option"), toffset.left + $item.outerWidth(), toffset.top - 13, "rightbottom");
                e.stopPropagation();
                return false;
            });

            $("#luckysheet-pivotTable-config-option-order,#luckysheet-pivotTable-config-option-orderby,#luckysheet-pivotTable-config-option-stastic").change(function () {
                var $t = $(this), cindex = $t.data("index");
                $("#luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                    if ($(this).data("index") == cindex) {
                        $(this).data($t.attr("id").replace("luckysheet-pivotTable-config-option-", ""), $t.val());
                    }
                });
                luckysheet.pivotTable.refreshPivotTable();
            });

            $("#luckysheet-modal-dialog-config-value").on("click", ".luckysheet-modal-dialog-slider-config-item-icon", function (e) {
                var $t = $(e.target), $item = $t.closest(".luckysheet-modal-dialog-slider-config-item"), cindex = $item.data("index"), toffset = $item.offset(), sumtype = $item.data("sumtype");
                var type = luckysheet.pivotTable.pivot_data_type[cindex.toString()];
                if (sumtype == null) {
                    if (type == "num") {
                        sumtype = "SUM";
                    }
                    else {
                        sumtype = "COUNTA";
                    }
                }

                var $menu = $("#luckysheet-pivotTable-config-option-sumtype");
                $menu.find(".luckysheet-submenu-arrow").hide();
                $menu.find(".luckysheet-cols-menuitem[sumtype='" + sumtype + "'] .luckysheet-submenu-arrow").css("display", "inline");
                $menu.data("item", $item);

                mouseclickposition($menu, toffset.left + $item.outerWidth(), toffset.top - 13, "rightbottom");
                e.stopPropagation();
                return false;
            });

            $("#luckysheet-pivotTable-config-option-sumtype .luckysheet-cols-menuitem").click(function () {
                var $item = $("#luckysheet-pivotTable-config-option-sumtype").data("item");
                var sumtype = $(this).attr("sumtype");
                $item.data("sumtype", $(this).attr("sumtype"));
                var name = luckysheet.pivotTable.getSumTypeName(sumtype) + ":" + $item.data("name");
                $item.attr("title", name).find(".luckysheet-modal-dialog-slider-config-item-txt").html(name);
                $("#luckysheet-pivotTable-config-option-sumtype").hide();
                luckysheet.pivotTable.refreshPivotTable();
            });

            $("#luckysheet-modal-dialog-config-filter").on("click", ".luckysheet-modal-dialog-slider-config-item-icon", function (e) {
                var $t = $(e.target), cindex = $t.closest(".luckysheet-modal-dialog-slider-config-item").data("index");
                //console.log($("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(cindex).find(".luckysheet-slider-list-item-filter"));
                luckysheet.pivotTable.luckysheetsliderlistitemfilter($("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(cindex).find(".luckysheet-slider-list-item-filter"));
                e.stopPropagation();
                return false;
            });

            //确认按钮
            $("#luckysheet-pivotTableFilter-confirm").click(function () {
                var $menu = $("#luckysheet-pivotTableFilter-menu");
                var cindex = $menu.data("index");

                var rowhiddenother = {}; //其它筛选列的隐藏行
                $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").each(function () {
                    var $t = $(this), rh = $t.data("rowhidden");

                    if($t.data("index") != cindex){
                        if (rh == null || rh == "") {
                            return true;
                        }

                        if(luckysheet.getObjType(rh) == "string"){
                            rh = JSON.parse(rh);
                        }
                        
                        for (var r in rh) {
                            rowhiddenother[r] = 0;
                        }
                    }
                });

                var d = luckysheet.pivotTable.origindata;

                var filterdata = {};
                var rowhidden = {};
                var caljs = {};

                if ($("#luckysheet-pivotTableFilter-bycondition").next().is(":visible") && $("#luckysheet-pivotTableFilter-byvalue").next().is(":hidden") && $("#luckysheet-pivotTableFilter-selected span").data("value") != "null") {
                    var $t = $("#luckysheet-pivotTableFilter-selected span");
                    var type = $t.data("type"), value = $t.data("value");

                    caljs["value"] = value;
                    caljs["text"] = $t.text();

                    if (type == "0") {
                        caljs["type"] = "0";
                    }
                    else if (type == "2") {
                        var $input = $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input2 input");
                        caljs["type"] = "2";
                        caljs["value1"] = $input.eq(0).val();
                        caljs["value2"] = $input.eq(1).val();
                    }
                    else {
                        caljs["type"] = "1";
                        caljs["value1"] = $("#luckysheet-pivotTableFilter-menu .luckysheet-pivotTableFilter-selected-input").eq(0).find("input").val();
                    }

                    for (var r = 1; r < d.length; r++) {
                        if(r in rowhiddenother){
                            continue;
                        }

                        if(d[r] == null){
                            continue;
                        }

                        var cell = d[r][cindex];
                        
                        if (value == "cellnull") { //单元格为空
                            if(cell != null && !luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "cellnonull") { //单元格有数据
                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "textinclude") { //文本包含 
                            var value1 = caljs["value1"];

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else{
                                if(cell.m.indexOf(value1) == -1){
                                    rowhidden[r] = 0;
                                }
                            }
                        }
                        else if (value == "textnotinclude") { //文本不包含
                            var value1 = caljs["value1"];

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){

                            }
                            else{
                                if(cell.m.indexOf(value1) > -1){
                                    rowhidden[r] = 0;
                                }
                            }
                        }
                        else if (value == "textstart") { //文本开头为
                            var value1 = caljs["value1"], valuelen = value1.length;

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else{
                                if(cell.m.substr(0, valuelen) != value1){
                                    rowhidden[r] = 0;
                                }
                            }
                        }
                        else if (value == "textend") { //文本结尾为
                            var value1 = caljs["value1"], valuelen = value1.length;

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else{
                                if(valuelen > cell.m.length || cell.m.substr(cell.m.length - valuelen, valuelen) != value1){
                                    rowhidden[r] = 0;
                                }
                            }
                        }
                        else if (value == "textequal") { //文本等于
                            var value1 = caljs["value1"];

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else{
                                if(cell.m != value1){
                                    rowhidden[r] = 0;
                                }
                            }
                        }
                        else if (value == "dateequal") { //日期等于
                            var value1 = luckysheet.mask.genarate(caljs["value1"])[2];

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "d"){
                                if(parseInt(cell.v) != value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "datelessthan") { //日期早于
                            var value1 = luckysheet.mask.genarate(caljs["value1"])[2];

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "d"){
                                if(parseInt(cell.v) >= value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "datemorethan") { //日期晚于
                            var value1 = luckysheet.mask.genarate(caljs["value1"])[2];

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "d"){
                                if(parseInt(cell.v) <= value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "morethan") { //大于
                            var value1 = parseFloat(caljs["value1"]);

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v <= value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "moreequalthan") { //大于等于
                            var value1 = parseFloat(caljs["value1"]);

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v < value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "lessthan") { //小于
                            var value1 = parseFloat(caljs["value1"]);

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v >= value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "lessequalthan") { //小于等于
                            var value1 = parseFloat(caljs["value1"]);

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v > value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "equal") { //等于
                            var value1 = parseFloat(caljs["value1"]);

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v != value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "noequal") { //不等于
                            var value1 = parseFloat(caljs["value1"]);

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v == value1){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "include") { //介于
                            var value1 = parseFloat(caljs["value1"]), value2 = parseFloat(caljs["value2"]);

                            if(value1 < value2){
                                var min = value1;
                                var max = value2;
                            }
                            else{
                                var max = value1;
                                var min = value2;   
                            }

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v < min || cell.v > max){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                        else if (value == "noinclude") { //不在其中
                            var value1 = parseFloat(caljs["value1"]), value2 = parseFloat(caljs["value2"]);

                            if(value1 < value2){
                                var min = value1;
                                var max = value2;
                            }
                            else{
                                var max = value1;
                                var min = value2;   
                            }

                            if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                                rowhidden[r] = 0;
                            }
                            else if(cell.ct != null && cell.ct.t == "n"){
                                if(cell.v >= min && cell.v <= max){
                                    rowhidden[r] = 0;
                                }
                            }
                            else{
                                rowhidden[r] = 0;
                            }
                        }
                    }
                }
                else {
                    $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']").each(function(i, e){
                        if($(e).is(":visible") && $(e).is(":checked")){
                            return true;
                        }

                        if($(e).closest(".day").length > 0){
                            var day = $(e).siblings("label").text();
                            if(Number(day) < 10){
                                day = "0" + day;
                            }

                            var month = $(e).closest(".monthBox").find(".month label").text().replace("月", "");
                            if(Number(month) < 10){
                                month = "0" + month;
                            }

                            var year = $(e).closest(".yearBox").find(".year label").text().replace("年", "");

                            var itemV = "日期格式#$$$#" + year + "-" + month + "-" + day;

                            filterdata[itemV] = "1";
                        }

                        if($(e).closest(".textBox").length > 0){
                            var itemV = $(e).closest(".textBox").data("filter");

                            filterdata[itemV] = "1";
                        }
                    })

                    for (var r = 1; r < d.length; r++) {
                        if(r in rowhiddenother){
                            continue;
                        }

                        if(d[r] == null){
                            continue;
                        }

                        var cell = d[r][cindex];

                        if(cell == null || luckysheet.func_methods.isRealNull(cell.v)){
                            var value = "null#$$$#null";
                        }
                        else if(cell.ct != null && cell.ct.t == "d"){
                            var fmt = luckysheet.mask.update("YYYY-MM-DD", cell.v);
                            var value = "日期格式#$$$#" + fmt;
                        }
                        else{
                            var value = cell.v + "#$$$#" + cell.m;
                        }

                        if(value in filterdata){
                            rowhidden[r] = 0;
                        }
                    }
                }

                var $top = $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(cindex);
                if ($("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']:visible:checked").length < $("#luckysheet-pivotTableFilter-byvalue-select .ListBox input[type='checkbox']:visible").length || $("#luckysheet-pivotTableFilter-byvalue-input").val().length > 0 || ($("#luckysheet-pivotTableFilter-bycondition").next().is(":visible") && $("#luckysheet-pivotTableFilter-byvalue").next().is(":hidden") && $("#luckysheet-pivotTableFilter-selected span").data("value") != "null")) {
                    $top.data("rowhidden", JSON.stringify(rowhidden)).find(".luckysheet-slider-list-item-filtered").show();
                    luckysheet.pivotTable.setDatatojsfile("rowhidden", rowhidden, cindex);

                    if (caljs != null) {
                        $top.data("byconditionvalue", caljs["value"]).data("byconditiontype", caljs["type"]).data("byconditiontext", caljs["text"]);
                        
                        if (caljs["value1"] != null) {
                            $top.data("byconditionvalue1", caljs["value1"]);
                        }

                        if (caljs["value2"] != null) {
                            $top.data("byconditionvalue2", caljs["value2"]);
                        }

                        luckysheet.pivotTable.setDatatojsfile("caljs", caljs, cindex);
                    }
                }
                else {
                    $top.data("rowhidden", "").find(".luckysheet-slider-list-item-filtered").hide();
                    luckysheet.pivotTable.setDatatojsfile("rowhidden", null, cindex);
                }

                var newdata = [];
                for (var i = 0; i < d.length; i++) {
                    if(i in rowhidden || i in rowhiddenother){
                        continue;
                    }

                    newdata.push([].concat(d[i]));
                }

                luckysheet.pivotTable.celldata = newdata;
                luckysheet.pivotTable.refreshPivotTable();
                $("#luckysheet-pivotTableFilter-menu, #luckysheet-pivotTableFilter-submenu").hide();

                luckysheet.cleargridelement();
            });

            $("#luckysheet-data-pivotTable-selection .luckysheet-model-close-btn, #luckysheet-data-pivotTable-selection .luckysheet-modal-dialog-title-close").click(function () {
                $("#luckysheet-modal-dialog-slider-pivot").show();
                luckysheet.luckysheetsizeauto();
                $("#luckysheet-cell-main .luckysheet-pivotTable-selection-set div").show();

                $("#luckysheet-data-pivotTable-selection").hide();

                luckysheet.sheetmanage.changeSheetExec(luckysheet.pivotTable.pivotSheetIndex);

                luckysheet.pivotTable.luckysheet_pivotTable_select_state = false;

                luckysheet.cleargridelement();
            });

            $("#luckysheet-pivotTable-selection-confirm").click(function () {
                var $input = $("#luckysheet-pivotTable-range-selection-input"), val = $input.val();

                if ($.trim(val).length == 0 || $.trim(val).toUpperCase() == luckysheet.pivotTable.jgridCurrentPivotInput.toUpperCase()) {
                    $input.val(luckysheet.pivotTable.jgridCurrentPivotInput);
                    $("#luckysheet-data-pivotTable-selection .luckysheet-model-close-btn").click();
                    return;
                }
                else {
                    var val1 = val.split("!");
                    var sheettxt = "", rangetxt = "", sheetIndex = -1;

                    if (val1.length > 1) {
                        sheettxt = val1[0];
                        rangetxt = val1[1];
                        for (var i in luckysheetfile) {
                            if (sheettxt == luckysheetfile[i].name) {
                                sheetIndex = luckysheetfile[i].index;
                                break;
                            }
                        }

                        if (sheetIndex == -1) {
                            sheetIndex = 0;
                        }
                    }
                    else {
                        var index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
                        sheettxt = luckysheetfile[index].name;
                        sheetIndex = luckysheetfile[index].index;
                        rangetxt = val1[0];
                    }

                    if(luckysheetfile[luckysheet.sheetmanage.getSheetIndex(sheetIndex)].isPivotTable){
                        if(luckysheet.isEditMode()){
                            alert("不可选择数据透视表为源数据！");
                        }
                        else{
                            luckysheet.tooltip.info("选择失败", "不可选择数据透视表为源数据！");    
                        }
                        $input.val(luckysheet.pivotTable.jgridCurrentPivotInput);
                        return;
                    }

                    if (rangetxt.indexOf(":") == -1) {
                        if(luckysheet.isEditMode()){
                            alert("选择失败, 输入范围错误！");
                        }
                        else{
                            luckysheet.tooltip.info("选择失败", "输入范围错误！");    
                        }
                        $input.val(luckysheet.pivotTable.jgridCurrentPivotInput);
                        return;
                    }

                    rangetxt = rangetxt.split(":");
                    var row = [], col = [];
                    
                    row[0] = parseInt(rangetxt[0].replace(/[^0-9]/g, "")) - 1;
                    row[1] = parseInt(rangetxt[1].replace(/[^0-9]/g, "")) - 1;

                    if (row[0] > row[1]) {
                        if(luckysheet.isEditMode()){
                            alert("选择失败, 输入范围错误！");
                        }
                        else{
                            luckysheet.tooltip.info("选择失败", "输入范围错误！");    
                        }
                        $input.val(luckysheet.pivotTable.jgridCurrentPivotInput);
                        return;
                    }

                    col[0] = luckysheet.luckysheetABCatNum(rangetxt[0].replace(/[^A-Za-z]/g, ""));
                    col[1] = luckysheet.luckysheetABCatNum(rangetxt[1].replace(/[^A-Za-z]/g, ""));

                    if (col[0] > col[1]) {
                        if(luckysheet.isEditMode()){
                            alert("选择失败, 输入范围错误！");
                        }
                        else{
                            luckysheet.tooltip.info("选择失败", "输入范围错误！");    
                        }
                        $input.val(luckysheet.pivotTable.jgridCurrentPivotInput);
                        return;
                    }
                    luckysheet.sheetmanage.changeSheetExec(luckysheet.pivotTable.pivotSheetIndex);

                    luckysheet.pivotTable.setDatatojsfile("pivot_select_save", { "row": row, "column": col });
                    luckysheet.pivotTable.setDatatojsfile("pivotDataSheetIndex", sheetIndex);

                    luckysheet.pivotTable.getCellData(luckysheet.pivotTable.pivotSheetIndex, sheetIndex, { "row": row, "column": col });

                    luckysheet.pivotTable.initialPivotManage();

                    $("#luckysheet-dialog-pivotTable-range").html(val);

                    $("#luckysheet-modal-dialog-slider-pivot").show();

                    $("#luckysheet-data-pivotTable-selection").hide();

                    luckysheet.pivotTable.luckysheet_pivotTable_select_state = false;

                    luckysheet.pivotTable.refreshPivotTable();

                    luckysheet.luckysheetsizeauto();

                    luckysheet.cleargridelement();
                }
            });

            $("#luckysheet-modal-dialog-slider-pivot").on("mousedown", ".luckysheet-slider-list-item-name, .luckysheet-modal-dialog-slider-config-item-txt", function (e) {
                //console.log("1111111111111111111111111111");
                var $cur = $(e.target);
                luckysheet.pivotTable.movestate = true;
                luckysheet.pivotTable.movesave.obj = $cur.parent();
                luckysheet.pivotTable.movesave.name = $cur.data("name");
                luckysheet.pivotTable.movesave.containerid = $cur.parent().parent().attr("id");
                luckysheet.pivotTable.movesave.index = $cur.data("index");
                if ($("#luckysheet-modal-dialog-slider-pivot-move").length == 0) {
                    $("body").append('<div id="luckysheet-modal-dialog-slider-pivot-move">' + luckysheet.pivotTable.movesave.name + '</div>');
                }
                luckysheet.pivotTable.movesave.width = $("#luckysheet-modal-dialog-slider-pivot-move").outerWidth();
                luckysheet.pivotTable.movesave.height = $("#luckysheet-modal-dialog-slider-pivot-move").outerHeight();

                $("#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").css("cursor", "default");
            });


            $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").mousemove(function (e) {
                if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
                    if (luckysheet.pivotTable.moveitemposition.length == 0) {
                        luckysheet.pivotTable.moveitemposition = [0];
                        $(this).find(".luckysheet-modal-dialog-slider-config-item").each(function (i) {
                            var $t = $(this), h = $t.outerHeight();
                            luckysheet.pivotTable.moveitemposition.push(luckysheet.pivotTable.moveitemposition[i] + h + 2);
                        });
                        //luckysheet.pivotTable.moveitemposition.push($(this).outerHeight());
                        $(this).append('<div id="luckysheet-modal-dialog-config-order-help" style="position:absolute;height:3px;width:100%;background:#007ACC;z-index:1;pointer-events: none;user-select:none;"></div>');
                        //console.log(luckysheet.pivotTable.moveitemposition);
                    }

                    $("#luckysheet-modal-dialog-slider-pivot-move").css({ "background": "#FD8585", "color": "#fff", "border": "1px solid #FD7070" });
                    var x = event.pageX, y = event.pageY, $container = $(this);
                    var curtop = y - $container.offset().top + $container.scrollTop();
                    var position = luckysheet.pivotTable.moveitemposition;
                    var row_index = luckysheet_searcharray(position, curtop);

                    if (row_index == -1) {
                        $("#luckysheet-modal-dialog-config-order-help").css({ "top": position[position.length - 1] });
                    }
                    else if ((curtop - position[row_index - 1]) > (position[row_index] - position[row_index - 1]) / 2) {
                        $("#luckysheet-modal-dialog-config-order-help").css({ "top": position[row_index] });
                    }
                    else {
                        $("#luckysheet-modal-dialog-config-order-help").css({ "top": position[row_index - 1] });
                    }
                }
            }).mouseleave(function () {
                if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
                    $("#luckysheet-modal-dialog-slider-pivot-move").css({ "background": "#fff", "color": "#000", "border": "1px dotted #000" });
                    luckysheet.pivotTable.moveitemposition = [];
                    console.log("leave");
                    $("#luckysheet-modal-dialog-config-order-help").remove();
                }
            }).mouseup(function (e) {
                if (!!luckysheet.pivotTable && luckysheet.pivotTable.movestate) {
                    var $t = $(this);
                    var itemHTML;
                    if (luckysheet.pivotTable.movesave.containerid == $t.attr("id")) {
                        itemHTML = luckysheet.pivotTable.movesave.obj.clone();
                    }
                    else {
                        var name = luckysheet.pivotTable.movesave.name, sumtype = "", nameindex = "";
                        if ($t.attr("id") == "luckysheet-modal-dialog-config-value") {
                            var type = luckysheet.pivotTable.pivot_data_type[luckysheet.pivotTable.movesave.index.toString()];
                            if (type == "num") {
                                name = "求和:" + name;
                                sumtype = "data-sumtype='SUM'";
                                nameindex = "data-nameindex='0'";
                            }
                            else {
                                name = "计数:" + name;
                                sumtype = "data-sumtype='COUNTA'";
                                nameindex = "data-nameindex='0'";
                            }

                            $("#luckysheet-modal-dialog-config-value").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                                if ($(this).find(".luckysheet-modal-dialog-slider-config-item-txt").text() == name) {
                                    var ni = parseFloat($(this).data("nameindex")) + 1;
                                    console.log($(this).data("nameindex"));
                                    name = name + ni.toString();
                                    $(this).data("nameindex", ni);
                                    return false;
                                }
                            });
                        }
                        itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + nameindex + ' ' + sumtype + ' data-index="' + luckysheet.pivotTable.movesave.index + '" data-name="' + luckysheet.pivotTable.movesave.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + nameindex + ' ' + sumtype + ' data-index="' + luckysheet.pivotTable.movesave.index + '" data-name="' + luckysheet.pivotTable.movesave.name + '">' + name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                    }
                    var x = event.pageX, y = event.pageY, $container = $(this);
                    var curtop = y - $container.offset().top + $container.scrollTop();
                    var position = luckysheet.pivotTable.moveitemposition;
                    var row_index = luckysheet_searcharray(position, curtop);
                    //console.log(position, curtop, row_index);

                    if ((luckysheet.pivotTable.movesave.containerid == "luckysheet-modal-dialog-pivotTable-list") || (luckysheet.pivotTable.movesave.containerid == "luckysheet-modal-dialog-config-value" && luckysheet.pivotTable.movesave.containerid != $t.attr("id"))) {
                        $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                            if ($(this).data("index") == luckysheet.pivotTable.movesave.index) {
                                $(this).remove();
                            }
                        });
                    }

                    if (row_index == -1) {
                        //$("#luckysheet-modal-dialog-config-order-help").css({ "top": position[position.length - 1] });
                        if ($t.find(".luckysheet-modal-dialog-slider-config-item").length == 0) {
                            $t.append(itemHTML);
                        }
                        else {
                            $t.find(".luckysheet-modal-dialog-slider-config-item").last().after(itemHTML);
                        }

                    }
                    else if ((curtop - position[row_index - 1]) > (position[row_index] - position[row_index - 1]) / 2) {
                        //$("#luckysheet-modal-dialog-config-order-help").css({ "top": position[row_index] });
                        $t.find(".luckysheet-modal-dialog-slider-config-item").eq(row_index - 1).after(itemHTML);
                    }
                    else {
                        //$("#luckysheet-modal-dialog-config-order-help").css({ "top": position[row_index - 1] });
                        $t.find(".luckysheet-modal-dialog-slider-config-item").eq(row_index - 1).before(itemHTML);
                    }


                    if (luckysheet.pivotTable.movesave.containerid == "luckysheet-modal-dialog-pivotTable-list") {

                    }
                    else if (luckysheet.pivotTable.movesave.containerid == "luckysheet-modal-dialog-config-value" && luckysheet.pivotTable.movesave.containerid != $t.attr("id")) {

                    }
                    else {
                        luckysheet.pivotTable.movesave.obj.remove();
                    }


                    $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                        var $seleted = $(this).find(".luckysheet-slider-list-item-selected");
                        if ($(this).data("index") == luckysheet.pivotTable.movesave.index && $seleted.find("i").length == 0) {
                            $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                        }
                    });

                    luckysheet.pivotTable.refreshPivotTable();

                    $("#luckysheet-modal-dialog-slider-pivot-move").remove();
                    luckysheet.pivotTable.movestate = false;
                    $("#luckysheet-modal-dialog-pivotTable-list, #luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").css("cursor", "default");
                    luckysheet.pivotTable.moveitemposition = [];
                    $("#luckysheet-modal-dialog-config-order-help").remove();
                    luckysheet.pivotTable.showvaluecolrow();
                    e.stopPropagation();
                }
            });


            $("#luckysheet-modal-dialog-pivotTable-list").on("click", ".luckysheet-slider-list-item-selected", function () {
                var $t = $(this), $item = $t.parent(), index = $item.data("index"), name = $item.data("name");
                if ($t.find("i").length == 0) {
                    $t.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');

                    var type = luckysheet.pivotTable.pivot_data_type[index.toString()], itemHTML;
                    if (type == "num") {
                        itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" data-nameindex="0" data-sumtype="SUM" data-index="' + index + '" data-name="' + name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" data-nameindex="0" data-sumtype="SUM" data-index="' + index + '" data-name="' + name + '">求和:' + name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        $("#luckysheet-modal-dialog-config-value").append(itemHTML);
                    }
                    else {
                        itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" data-index="' + index + '" data-name="' + name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" data-index="' + index + '" data-name="' + name + '">' + name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
                        var $column = $("#luckysheet-modal-dialog-config-column"), $row = $("#luckysheet-modal-dialog-config-row");
                        var columnitem = $column.find(".luckysheet-modal-dialog-slider-config-item"), rowitem = $row.find(".luckysheet-modal-dialog-slider-config-item");
                        if (columnitem.length < 2) {
                            $column.append(itemHTML);
                        }
                        else if (rowitem.length < 2) {
                            $row.append(itemHTML);
                        }
                        else {
                            $column.append(itemHTML);
                        }
                    }
                }
                else {
                    $t.find("i").remove();
                    $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                        if ($(this).data("index") == index) {
                            if ($(this).parent().attr("id") == "luckysheet-modal-dialog-config-value") {
                                luckysheet.pivotTable.resetOrderby($(this));
                            }
                            $(this).remove();
                        }
                    });
                }

                luckysheet.pivotTable.refreshPivotTable();
                luckysheet.pivotTable.showvaluecolrow();
            });

            $("#luckysheet-dialog-pivotTable-clearitem").click(function () {
                $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").find(".luckysheet-modal-dialog-slider-config-item").each(function () {
                    $(this).remove();
                });

                $("#luckysheet-modal-dialog-pivotTable-list").find(".luckysheet-modal-dialog-slider-list-item").each(function () {
                    $(this).find(".luckysheet-slider-list-item-selected").find("i").remove();
                });
                luckysheet.pivotTable.refreshPivotTable();
                luckysheet.pivotTable.showvaluecolrow();
            });

        }

        if (restore == null) {
            restore = false;
        }

        if (this.celldata.length <= 1 && this.celldata[0].length <= 1) {
            if(luckysheet.isEditMode()){
                alert("请扩大选择的数据范围!");
            }
            else{
                luckysheet.tooltip.info("提示", "请扩大选择的数据范围!");
            }
        }

        var selecteditem = "", selecteditemIndex = 1, selecteditemtest = {}, selecteditemNullIndex = 1;
        for (var i = 0; i < this.celldata[0].length; i++) {
            if(!!this.celldata[0][i] && !!this.celldata[0][i]["m"]){
                // var name = this.celldata[0][i]["m"].toString();
                var name = this.celldata[0][i]["m"];
            }
            else{
                // var name = luckysheet.getcellvalue(0, i, this.celldata).toString();    
                var name = luckysheet.getcellvalue(0, i, this.celldata);    
            }

            if(name != null){
                name = name.toString();
            }

            if (name == null || $.trim(name.toString()).length == 0) {
                name = "列 " + selecteditemNullIndex;
            }
            selecteditemNullIndex++

            if (name in selecteditemtest) {
                name = name + selecteditemIndex++;
                if (name in selecteditemtest) {
                    name = name + selecteditemIndex++;
                    if (name in selecteditemtest) {
                        name = name + selecteditemIndex++;
                    }
                }
            }
            selecteditemtest[name] = 1;

            var dataother = "", style = "";
            //console.log(restore);
            if (restore && this.filterparm != null) {
                if (this.filterparm[i.toString()] != null) {
                    var itemset = this.filterparm[i.toString()];
                    if (itemset.rowhidden != null) {
                        dataother += "data-rowhidden='" + JSON.stringify(itemset.rowhidden) + "'";
                    }

                    if (itemset.selected != null) {
                        dataother += "data-selected='" + JSON.stringify(itemset.selected) + "'";
                    }

                    if (itemset.caljs != null) {
                        var caljsset = itemset.caljs;
                        if (caljsset.value != null) {
                            dataother += "data-byconditionvalue='" + caljsset.value + "'";
                        }

                        if (caljsset.type != null) {
                            dataother += "data-byconditiontype='" + caljsset.type + "'";
                        }

                        if (caljsset.text != null) {
                            dataother += "data-byconditiontext='" + caljsset.text + "'";
                        }

                        if (caljsset.value1 != null) {
                            dataother += "data-byconditionvalue1='" + caljsset.value1 + "'";
                        }

                        if (caljsset.value2 != null) {
                            dataother += "data-byconditionvalue2='" + caljsset.value2 + "'";
                        }

                    }
                }
            }

            if (dataother.length > 0) {
                style = "display:block;";
            }

            selecteditem += '<div class="luckysheet-modal-dialog-slider-list-item" ' + dataother + ' data-index="' + i + '" data-name="' + name + '"><div title="添加列到数据透视表" class="luckysheet-slider-list-item-selected"><div></div></div><div title="移动该列到下方白框" class="luckysheet-slider-list-item-name" ' + dataother + ' data-index="' + i + '" data-name="' + name + '">' + name + '</div><div title="清除该列的筛选条件" class="luckysheet-slider-list-item-filtered" style="' + style + '"><i class="fa fa-filter luckysheet-mousedown-cancel" aria-hidden="true"></i><i class="fa fa-times" aria-hidden="true"></i></div><div title="筛选该列" class="luckysheet-slider-list-item-filter"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';
        }
        $("#luckysheet-modal-dialog-pivotTable-list").html(selecteditem);

        $("#luckysheetpivottablevaluecolrowshow").hide();
        $("#luckysheetpivottablevaluecolrow").prop("checked", true);
        $("#luckysheetpivottablevaluecolrow1").prop("checked", false);

        $("#luckysheet-modal-dialog-config-filter, #luckysheet-modal-dialog-config-row, #luckysheet-modal-dialog-config-column, #luckysheet-modal-dialog-config-value").empty();
        if (restore) {
            if (this.filter != null && this.filter.length > 0) {
                for (var i = 0; i < this.filter.length; i++) {
                    var item = this.filter[i];

                    var itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" data-index="' + item.index + '" data-name="' + item.name + '">' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';

                    $("#luckysheet-modal-dialog-config-filter").append(itemHTML);

                    var $seleted = $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(item.index).find(".luckysheet-slider-list-item-selected");
                    if ($seleted.find("i").length == 0) {
                        $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                    }
                }
            }

            if (this.row != null && this.row.length > 0) {
                for (var i = 0; i < this.row.length; i++) {
                    var item = this.row[i];
                    var otherset = "";

                    if (item.order != null) {
                        otherset += "data-order = '" + item.order + "'";
                    }

                    if (item.orderby != null) {
                        otherset += "data-orderby = '" + item.orderby + "'";
                    }

                    if (item.order != null) {
                        otherset += "data-stastic = '" + item.stastic + "'";
                    }

                    var itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '">' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';

                    $("#luckysheet-modal-dialog-config-row").append(itemHTML);

                    var $seleted = $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(item.index).find(".luckysheet-slider-list-item-selected");
                    if ($seleted.find("i").length == 0) {
                        $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                    }
                }
            }

            if (this.column != null && this.column.length > 0) {
                for (var i = 0; i < this.column.length; i++) {
                    var item = this.column[i];
                    var otherset = "";

                    if (item.order != null) {
                        otherset += "data-order = '" + item.order + "'";
                    }

                    if (item.orderby != null) {
                        otherset += "data-orderby = '" + item.orderby + "'";
                    }

                    if (item.order != null) {
                        otherset += "data-stastic = '" + item.stastic + "'";
                    }

                    var itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '">' + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';

                    $("#luckysheet-modal-dialog-config-column").append(itemHTML);

                    var $seleted = $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(item.index).find(".luckysheet-slider-list-item-selected");
                    if ($seleted.find("i").length == 0) {
                        $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                    }
                }
            }

            if (this.values != null && this.values.length > 0) {
                for (var i = 0; i < this.values.length; i++) {
                    var item = this.values[i];
                    var otherset = "";

                    if (item.sumtype != null) {
                        otherset += "data-sumtype = '" + item.sumtype + "'";
                    }

                    if (item.nameindex != null) {
                        otherset += "data-nameindex = '" + item.nameindex + "'";
                    }

                    var itemHTML = '<div title="' + name + '" class="luckysheet-modal-dialog-slider-config-item" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '"><div class="luckysheet-modal-dialog-slider-config-item-txt" ' + otherset + ' data-index="' + item.index + '" data-name="' + item.name + '">' + luckysheet.pivotTable.getSumTypeName(item.sumtype) + ":" + item.name + '</div><div class="luckysheet-modal-dialog-slider-config-item-icon"><i class="fa fa-sort-desc" aria-hidden="true"></i></div></div>';

                    $("#luckysheet-modal-dialog-config-value").append(itemHTML);

                    var $seleted = $("#luckysheet-modal-dialog-pivotTable-list .luckysheet-modal-dialog-slider-list-item").eq(item.index).find(".luckysheet-slider-list-item-selected");
                    if ($seleted.find("i").length == 0) {
                        $seleted.append('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
                    }
                }

                if (this.values.length >= 2) {
                    $("#luckysheetpivottablevaluecolrowshow").show();
                    if (this.showType == "column") {
                        $("#luckysheetpivottablevaluecolrow").prop("checked", true);
                        $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").addClass("ui-state-active");

                        $("#luckysheetpivottablevaluecolrow1").prop("checked", false);
                        $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").removeClass("ui-state-active");
                    }
                    else {
                        $("#luckysheetpivottablevaluecolrow1").prop("checked", true);
                        $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow1']").addClass("ui-state-active");

                        $("#luckysheetpivottablevaluecolrow").prop("checked", false);
                        $("#luckysheetpivottablevaluecolrowshow label[for='luckysheetpivottablevaluecolrow']").removeClass("ui-state-active");
                    }
                }
            }
        }

        $("#luckysheet-dialog-pivotTable-range").html(luckysheet.sheetmanage.getRangetxt(this.pivotDataSheetIndex, this.pivot_select_save));
        $("#luckysheet-modal-dialog-slider-pivot").show();
        luckysheet.luckysheetsizeauto();
    },
    //generatePivotTable:function(column1, row1, values1, filter1, showType1){

    //  this.column = column1;
    //    this.row = row1;
    //    this.values = values1;
    //    this.filter = filter1;
    //    this.showType = showType1;
    //  this.dataHandler(column1, row1, values1, filter1, showType1, this.celldata);
    //},
    getComposeArray: function (data) {
        if (data.length == 0) {
            return [];
        }
        
        var ret = [];
        for (var i = 0; i < data.length; i++) {
            //var c_value = data[i];
            var name = "";
            for (var x = 0; x <= i; x++) {
                if(!!data[x] && !!data[x]["m"]){
                    name += data[x]["m"];
                }
                else{
                    name += luckysheet.getcellvalue(x, null, data);
                }
            }
            
            ret.push(name);
        }
        return ret;
    },
    getnameArray: function (data, field) {
        if (data.length == 0) {
            return [];
        }

        if (field.length == 0) {
            return [];
        }

        var ret = [];
        for (var i = 0; i < field.length; i++) {
            if(!!data[field[i].index] && !!data[field[i].index]["m"]){
                var c_value = data[field[i].index]["m"];
            }
            else{
                var c_value = luckysheet.getcellvalue(field[i].index, null, data);
            }
            
            ret.push(c_value);
        }
        return ret;
    },
    getTitleFromGroup: function (group, config, dataposition) {
        var children = group.children;

        var orderbygroup = this.orderbygroup(group, config, dataposition);

        //console.log(orderbygroup);
        return this.generategrouparraymain(orderbygroup, config);
    },
    orderbygroup: function (group, config, dataposition) {
        var stackset = [];
        if (group.length == 0) {
            return [];
        }
        stackset = group;
        var d = null, alllength = stackset.length, alllengthInital = stackset.length, a = 0;
        while (alllength != 0) {
            //console.log(alllength, a);
            d = stackset[a++];

            alllength--;
            if (d.children != null && d.children.length > 0) {
                //console.log(JSON.stringify(d.children));
                d.children = this.orderbygroupchildren(d.children, config[d.index].orderby, config[d.index].order, dataposition);
                //console.log(JSON.stringify(d.children));
                for (var i = 0; i < d.children.length; i++) {
                    stackset.push(d.children[i]);
                    alllength++;
                }
            }
            //console.log(stackset, stackset.length, stackset.length == 0);
        }

        return group.splice(0, alllengthInital);
    },
    orderbygroupchildren: function (childrens, orderby, order, dataposition) {
        if (childrens.length == 0) {
            return [];
        }

        var isAsc = false;
        if (order == null || order == "asc") {
            isAsc = true;
        }

        var a = function (x, y) {
            var f = null, s = null;
            if (orderby == "self" || orderby == null) {
                if(x.name==null){
                    f = "(空白)";
                }
                else{
                    f = x.name.toString();
                }

                if(y.name==null){
                    s = "(空白)";
                }
                else{
                    s = y.name.toString();
                }
                
                if (luckysheet.datecontroll.isdatetime(f) && luckysheet.datecontroll.isdatetime(s)) {
                    return luckysheet.datecontroll.diff(f, s);
                }
                //return f.localeCompare(s);
            }
            else {
                f = parseFloat(dataposition[x.orderby].result);
                s = parseFloat(dataposition[y.orderby].result);
            }

            if (!isNaN(f) && !isNaN(s)) {
                return numeral(f).value() - numeral(s).value();
            }
            else if(isNaN(f) && isNaN(s)){
                return f.localeCompare(s);
            }
            else if (isNaN(f)) {
                return 1;
            }
            else if (isNaN(s)) {
                return -1;
            }
        }

        var d = function (x, y) {
            var f = null, s = null;
            if (orderby == "self" || orderby == null) {
                if(x.name==null){
                    f = "(空白)";
                }
                else{
                    f = x.name.toString();
                }

                if(y.name==null){
                    s = "(空白)";
                }
                else{
                    s = y.name.toString();
                }

                if (luckysheet.datecontroll.isdatetime(f) && luckysheet.datecontroll.isdatetime(s)) {
                    return luckysheet.datecontroll.diff(f, s);
                }
                //return s.localeCompare(f);
            }
            else {
                f = parseFloat(dataposition[x.orderby].result);
                s = parseFloat(dataposition[y.orderby].result);
            }

            if (!isNaN(f) && !isNaN(s)) {
                return numeral(s).value() - numeral(f).value();
            }
            else if(isNaN(f) && isNaN(s)){
                return s.localeCompare(f);
            }
            else if (isNaN(f)) {
                return -1;
            }
            else if (isNaN(s)) {
                return 1;
            }
        }

        if (isAsc) {
            return childrens.sort(a);
        }
        else {
            return childrens.sort(d);
        }
    },
    generategroupaddstatic: function (arr, name) {
        var stasticarr = [];
        for (var a = 0; a < arr[0].length; a++) {
            if (a == 0) {
                if (name == "总计") {
                    stasticarr.push(name);
                }
                else {
                    stasticarr.push({ "name": name, "issum": true });
                }

            }
            else {
                stasticarr.push("");
            }
        }
        return stasticarr;
    },
    generategrouparraymain: function (group, config) {
        //生成数组
        var ret = [];
        for (var i = 0; i < group.length; i++) {
            var name = group[i].name;
            var arr = this.generategrouparray(group[i].children, config, 1);
            if (config[0].stastic == "1" || config[0].stastic == null) {
                arr.push(this.generategroupaddstatic(arr, name));
            }

            ret = ret.concat(arr);
        }
        return ret;
    },
    generategrouparray: function (group, config, level) {
        var ret = [];
        for (var i = 0; i < group.length; i++) {
            var name = group[i].name;
            var arr;
            if (group[i].children == 0 || group[i].children.length == 0) {
                arr = [name];

                ret.push(arr);
            }
            else {
                arr = this.generategrouparray(group[i].children, config, level + 1);
                for (var a = 0; a < arr.length; a++) {
                    arr[a].unshift(name);
                }
                if (config[level].stastic == "1" || config[level].stastic == null) {
                    arr.push(this.generategroupaddstatic(arr, name));
                }
                ret = ret.concat(arr);
            }

        }
        //console.log(JSON.stringify(ret));
        return ret;
    },
    addStatisticsData: function (dataposition, valueobj, indicator, d_value) {
        if (dataposition[indicator] == null) {
            dataposition[indicator] = { "data": [], "count": 0, "max": -Infinity, "min": Infinity, "counta": 0, "countunique": 0, "countuniquedata": {}, "sum": 0, digitaldata: [], "sumtype": valueobj.sumtype, "index": valueobj.index, "name": valueobj.fullname, "acc": 0 };
        }

        if (luckysheet.isdatatypemulti(d_value)["num"] === true) {
            var num = luckysheet.numFormat(d_value);
            dataposition[indicator]["digitaldata"].push(num);
            dataposition[indicator]["count"] += 1;
            dataposition[indicator]["sum"] += num;

            if (num > dataposition[indicator]["max"]) {
                dataposition[indicator]["max"] = num;
            }

            if (num < dataposition[indicator]["min"]) {
                dataposition[indicator]["min"] = num;
            }

            var newAcc = luckysheet.numfloatlen(num);

            if(newAcc > dataposition[indicator]["acc"]){
                dataposition[indicator]["acc"] = newAcc;
            }
        }

        if (d_value != "") {
            dataposition[indicator]["data"].push(d_value);
            dataposition[indicator]["counta"] += 1;
            if (!(d_value in dataposition[indicator]["countuniquedata"])) {
                dataposition[indicator]["countuniquedata"][d_value] = 1;
                dataposition[indicator]["countunique"] += 1;
            }
        }
    },
    dataHandler: function (column, row, values, showType, celldata) {
        //column:[{"index":1, name:"列1", "order":"asc", "orderby":"self/0/1/2", "stastic":"0/1"}]
        //row:[{"index":1, name:"列3", "order":"asc", "orderby":"self/0/1/2", "stastic":"0/1"}]
        //values:[{"index":1, "sumtype":"SUM/COUNT/COUNTA/COUNTUNIQUE/AVERAGE/MAX/MIN/MEDIAN/PRODUCT/STDEV/STDEVP/VAR/VARP", "name":"求和:fyc"}]

        if (showType == null) {
            showType = "column";
        }

        if ((column.length == 0 && row.length == 0 && values.length == 0) || celldata.length == 0) {
            this.pivotDatas = [];
            return [];
        }

        //生成透视表值及定位
        var dataposition = {}, 
            data = celldata, 
            datarowtitle = [], 
            datarowtitlegroup = [], 
            datarowposition = {}, 
            datarowposition_i = 0, 
            datacoltitle = [], 
            datacoltitlegroup = [], 
            datacolposition = {}, 
            datacolposition_i = 0;

        for (var i = 1; i < data.length; i++) {
            var d = data[i];
            var groupbyrowtxt = "", 
                groupbycoltxt = "", 
                rowtxt = "", 
                rowtitle = [], 
                rowtitlename = [], 
                coltxt = "", 
                coltitle = [], 
                coltitlename = [];

            //for (var r = 0; r < row.length; r++) {
            //       var c_value = d[row[r].index];
            //       groupbyrowtxt += "|row" + c_value.toString();
            //       rowtxt += c_value.toString();
            //       rowtitle.push(c_value);
            //   }


            //   if (rowtxt!="" && datarowposition[rowtxt] == null) {
            //       datarowposition[rowtxt] = datarowposition_i++;
            //       datarowtitle.push(rowtitle);
            //   }

            //   for (var c = 0; c < column.length; c++) {
            //       var c_value = d[column[c].index];
            //       groupbycoltxt += "|col" + c_value.toString();
            //       coltxt += c_value.toString();
            //       coltitle.push(c_value);
            //   }

            //   if (coltxt != "" && datacolposition[coltxt] == null) {
            //       datacolposition[coltxt] = datacolposition_i++;
            //       datacoltitle.push(coltitle);
            //   }

            //["四川", "成都", "邛崃"] 转换为 ["四川", "四川成都", "四川成都邛崃"]
            rowtitlename = this.getnameArray(d, row);
            coltitlename = this.getnameArray(d, column);

            rowtitle = this.getComposeArray(rowtitlename);
            coltitle = this.getComposeArray(coltitlename);

            if (rowtitle.length > 0) {
                rowtitle.unshift("总计");
            }

            if (coltitle.length > 0) {
                coltitle.unshift("总计");
            }

            var curentLevelobj = datarowposition, curentLevelarr = datarowtitlegroup;
            for (var r = 0; r < rowtitle.length; r++) {
                var item = rowtitle[r], name = r == 0 ? "总计" : rowtitlename[r - 1];//修改
                if (curentLevelobj[r.toString()] != null && curentLevelobj[r.toString()][item] != null) {//修改
                    curentLevelarr = curentLevelarr[curentLevelobj[r.toString()][item]].children;
                }
                else {
                    var orderby = r == 0 ? "self" : ((row[r - 1].orderby == "self" || row[r - 1].orderby == null) ? item : (showType == "column" ? item + values[parseInt(row[r - 1].orderby)].fullname : item + "合计"));
                    if(name == null){
                        name = "(空白)";
                    }
                    curentLevelarr.push({ "name": name, "fullname": item, "index": r, "orderby": orderby, "children": [] });

                    if (curentLevelobj[r.toString()] == null) {
                        curentLevelobj[r.toString()] = {};
                    }

                    if (curentLevelobj[r.toString()][item] == null) {
                        curentLevelobj[r.toString()][item] = curentLevelarr.length - 1;
                    }
                    curentLevelarr = curentLevelarr[curentLevelarr.length - 1].children;
                }
            }

            var curentLevelobj = datacolposition, curentLevelarr = datacoltitlegroup;
            for (var r = 0; r < coltitle.length; r++) {
                var item = coltitle[r], name = r == 0 ? "总计" : coltitlename[r - 1];
                if (curentLevelobj[r.toString()] != null && curentLevelobj[r.toString()][item] != null) {
                    curentLevelarr = curentLevelarr[curentLevelobj[r.toString()][item]].children;
                }
                else {
                    var orderby = r == 0 ? "self" : ((column[r - 1].orderby == "self" || column[r - 1].orderby == null) ? item : (showType == "column" ? "合计" + item : values[parseInt(column[r - 1].orderby)].fullname + item));
                    if(name==null){
                        name = "(空白)";
                    }
                    curentLevelarr.push({ "name": name, "fullname": item, "index": r, "orderby": orderby, "children": [] });

                    if (curentLevelobj[r.toString()] == null) {
                        curentLevelobj[r.toString()] = {};
                    }

                    if (curentLevelobj[r.toString()][item] == null) {
                        curentLevelobj[r.toString()][item] = curentLevelarr.length - 1;
                    }
                    curentLevelarr = curentLevelarr[curentLevelarr.length - 1].children;
                }
            }

            var v_str = "";
            for (var v = 0; v < values.length; v++) {
                var d_value = luckysheet.getcellvalue(values[v].index, null, d);
                //      var indicator = "";
                //      if (showType=="column"){
                //          indicator = groupbyrowtxt + groupbycoltxt;
                //          if (indicator != "") {
                //              indicator = indicator.substr(1) + "|col" + values[v].fullname;
                //          }
                //          else {
                //              indicator = "col" + values[v].fullname;
                //          }
                //}
                //else{
                //          if (groupbyrowtxt != "") {
                //              indicator = groupbyrowtxt.substr(1) + "|row" + values[v].fullname + groupbycoltxt;
                //          }
                //          else {
                //              indicator = "row" + values[v].fullname + groupbycoltxt;
                //          }
                //}

                var coltitle_c = [].concat(coltitle), rowtitle_c = [].concat(rowtitle);
                if (showType == "column") {
                    if (coltitle_c.length > 0) {
                        coltitle_c.push("")
                        coltitle_c = coltitle_c.join(values[v].fullname + "|||").split("|||").slice(0, coltitle_c.length - 1);
                    }
                    else {
                        coltitle_c.push(values[v].fullname);
                    }

                }
                else {
                    if (rowtitle_c.length > 0) {
                        //rowtitle_c.push(rowtitle_c[rowtitle_c.length-1] + values[v].fullname);
                        //rowtitle_c = (values[v].fullname + rowtitle_c.join("|||" + values[v].fullname)).split("|||");
                        rowtitle_c.push("")
                        rowtitle_c = rowtitle_c.join(values[v].fullname + "|||").split("|||").slice(0, rowtitle_c.length - 1);
                    }
                    else {
                        rowtitle_c.push(values[v].fullname);
                    }
                }

                if (coltitle_c.length == 0) {
                    coltitle_c.push("");
                }

                if (rowtitle_c.length == 0) {
                    rowtitle_c.push("");
                }

                for (var r = 0; r < rowtitle_c.length; r++) {
                    for (var c = 0; c < coltitle_c.length; c++) {
                        indicator = rowtitle_c[r] + coltitle_c[c];
                        this.addStatisticsData(dataposition, values[v], indicator, d_value);
                    }
                }


                //if (dataposition[indicator] == null) {
                //    dataposition[indicator] = { "data": [], "count": 0, "max": -Infinity, "min": Infinity, "counta": 0, "countunique": 0, "countuniquedata": {}, "sum": 0, digitaldata:[], "sumtype": values[v].sumtype, "index": values[v].index, "name": values[v].fullname };
                //}



                //if (luckysheet.isdatatypemulti(d_value)["num"] === true ) {
                //    var num = luckysheet.numFormat(d_value);
                //    dataposition[indicator]["digitaldata"].push(num);
                //    dataposition[indicator]["count"] += 1;
                //    dataposition[indicator]["sum"] += num;

                //    if (num > dataposition[indicator]["max"]) {
                //        dataposition[indicator]["max"] = num;
                //    }

                //    if (num < dataposition[indicator]["min"]) {
                //        dataposition[indicator]["min"] = num;
                //    }
                //}

                //if (d_value != "") {
                //    dataposition[indicator]["data"].push(d_value);
                //    dataposition[indicator]["counta"] += 1;
                //    if (!(d_value in dataposition[indicator]["countuniquedata"])){
                //        dataposition[indicator]["countuniquedata"]["d_value"] = 1;
                //        dataposition[indicator]["countunique"] += 1;
                //    }
                //}

            }
        }

        //计算值列
        //SUM/COUNT/COUNTA/COUNTUNIQUE/AVERAGE/MAX/MIN/MEDIAN/PRODUCT/STDEV/STDEVP/VAR/VARP
        for (indicator in dataposition) {
            var json = dataposition[indicator];
            if (json.sumtype == "SUM") {
                json.result = json.sum;
            }
            else if (json.sumtype == "COUNT") {
                json.result = json.count;
            }
            else if (json.sumtype == "COUNTA") {
                json.result = json.counta;
            }
            else if (json.sumtype == "COUNTUNIQUE") {
                json.result = json.countunique;
            }
            else if (json.sumtype == "AVERAGE") {
                json.result = luckysheet.numFormat(json.sum / json.count);
            }
            else if (json.sumtype == "MAX") {
                json.result = json.max;
            }
            else if (json.sumtype == "MIN") {
                json.result = json.min;
            }
            else if (json.sumtype == "MEDIAN") {
                var numArr = json.digitaldata.sort(function(a, b){ return a - b });
                var numLen = numArr.length;
                var numindex = parseInt(numLen / 2);

                if(numLen % 2 == 0){
                    json.result = (numArr[numindex - 1] + numArr[numindex]) / 2;
                }
                else{
                    json.result = numArr[numindex];
                }
            }
            else if (json.sumtype == "PRODUCT") {
                json.result = eval(json.digitaldata.join("*"));
            }
            else if (json.sumtype == "STDEV") {
                var mean = json.sum / json.count;
                json.result = luckysheet.analysis.STDEV(mean, json.digitaldata);
            }
            else if (json.sumtype == "STDEVP") {
                var mean = json.sum / json.count;
                json.result = luckysheet.analysis.STDEVP(mean, json.digitaldata);
            }
            else if (json.sumtype == "VAR") {
                var mean = json.sum / json.count;
                json.result = luckysheet.analysis.VAR(mean, json.digitaldata);
            }
            else if (json.sumtype == "VARP") {
                var mean = json.sum / json.count;
                json.result = luckysheet.analysis.VARP(mean, json.digitaldata);
            }

            var newAcc = luckysheet.numfloatlen(json.result);
            if(newAcc > json.acc){
                json.acc = newAcc;
            }

            json.result = luckysheet.numFormat(json.result, json.acc);
        }

        datarowtitle = this.getTitleFromGroup(datarowtitlegroup, row, dataposition);
        datacoltitle = this.getTitleFromGroup(datacoltitlegroup, column, dataposition);

        //加入值到列/行形成新的表头
        if (showType == "column") {
            if (datacoltitle.length > 0 && datacoltitle[0].length > 0) {
                datacoltitle = this.addValuesToTitle(datacoltitle, values);
            }
            else {
                for (var v = 0; v < values.length; v++) {
                    datacoltitle.push([values[v].fullname]);
                }
            }
        }
        else {
            if (datarowtitle.length > 0 && datarowtitle[0].length > 0) {
                datarowtitle = this.addValuesToTitle(datarowtitle, values);
            }
            else {
                for (var v = 0; v < values.length; v++) {
                    datarowtitle.push([values[v].fullname]);
                }
            }
        }

        var datacoltitle_index = datacoltitle;
        datacoltitle = luckysheet.array.transpose(datacoltitle);

        var valuenslen = values.length == 0 ? 0 : 1;
        var rowLen = (datacoltitle.length == 0 ? valuenslen : datacoltitle.length) + (datarowtitle.length == 0 ? valuenslen : datarowtitle.length), colLen = (datacoltitle.length == 0 ? valuenslen : datacoltitle[0].length) + (datarowtitle.length == 0 ? valuenslen : datarowtitle[0].length);

        var rowOver = datacoltitle.length, colOver = datarowtitle.length == 0 ? 0 : datarowtitle[0].length;

        var retdata = [];
        for (var r = 0; r < rowLen; r++) {
            retdata[r] = new Array(colLen);
            for (var c = 0; c < colLen; c++) {
                var drt = datarowtitle[r - rowOver];
                if (r < rowOver && c < colOver) {
                    //空白列头
                    retdata[r][c] = "";
                }
                else if (r < rowOver && c >= colOver) {
                    //列标题
                    if (datacoltitle[r] != null) {
                        if (luckysheet.getObjType(datacoltitle[r][c - colOver]) == "object") {
                            retdata[r][c] = datacoltitle[r][c - colOver].name + "总计";
                        }
                        else {
                            retdata[r][c] = datacoltitle[r][c - colOver];
                        }

                    }
                    else {
                        retdata[r][c] = "";
                    }
                }
                else if (r >= rowOver && c < colOver) {
                    //行标题
                    if (drt != null) {
                        //retdata[r][c] = datarowtitle[r - rowOver][c];
                        if (luckysheet.getObjType(drt[c]) == "object") {
                            retdata[r][c] = drt[c].name + "总计";
                        }
                        else {
                            retdata[r][c] = drt[c];
                        }
                    }
                    else {
                        retdata[r][c] = "";
                    }
                }
                else {
                    //单元格内容
                    var prefix = "";
                    if (drt != null) {
                        if (!(drt instanceof Array) || drt.length == 1) {
                            if (drt instanceof Array) {
                                prefix = drt[0];
                            }
                            else {
                                prefix = drt;
                            }
                        }
                        else {
                            for (var x = 0; x < drt.length; x++) {
                                if (luckysheet.getObjType(drt[x]) == "object") {
                                    prefix += drt[x].name;
                                }
                                else {
                                    prefix += drt[x];
                                }
                            }
                        }
                    }

                    var suffix = "";
                    var dct = datacoltitle_index[c - colOver];
                    if (dct != null) {
                        if (!(dct instanceof Array) || dct.length == 1) {
                            if (dct instanceof Array) {
                                suffix = dct[0];
                            }
                            else {
                                suffix = dct;
                            }
                        }
                        else {
                            for (var x = 0; x < dct.length; x++) {
                                if (luckysheet.getObjType(dct[x]) == "object") {
                                    suffix += dct[x].name;
                                }
                                else {
                                    suffix += dct[x];
                                }
                            }
                            //suffix = dct.join("");
                        }
                    }

                    var indicator = prefix;

                    if (prefix != "" && suffix != "") {
                        indicator = prefix + suffix;
                    }
                    else if (prefix == "") {
                        indicator = suffix;
                    }

                    if (dataposition[indicator] == null) {
                        retdata[r][c] = "";
                    }
                    else {
                        retdata[r][c] = dataposition[indicator].result;
                    }
                }
            }
        }

        if (values.length == 1 && column.length > 0) {
            retdata[0][0] = values[0].fullname;
            retdata.splice(column.length, 1);
        }
        this.pivotDatas = retdata;
        return retdata;
    },
    drillDown: function(row_index, col_index){
        var cell = this.pivotDatas[row_index][col_index];

        var d = $.extend(true, [], luckysheet.sheetmanage.nulldata);

        var selecteditemNullIndex = 1;
        for(var i = 0; i < this.celldata[0].length; i++){
            if(!!this.celldata[0][i] && !!this.celldata[0][i]["m"]){
                var name = this.celldata[0][i]["m"];
            }
            else{
                var name = luckysheet.getcellvalue(0, i, this.celldata);    
            }

            if(name != null){
                name = name.toString();
            }

            if (name == null || $.trim(name.toString()).length == 0) {
                name = "列 " + selecteditemNullIndex;
            }
            selecteditemNullIndex++

            d[0][i] = name;
        }

        // if(cell == null || cell == ""){
        //     luckysheet_select_save = [{ "row": [0, 1], "column": [0, this.celldata[0].length - 1] }];
        // }
        // else{
            var obj = {};

            //行
            if(this.row != null && this.row.length > 0){
                for(var a = 0; a < this.row.length; a++){
                    obj[this.row[a]["index"]] = this.pivotDatas[row_index][a];
                }
            }

            //列
            if(this.column != null && this.column.length > 0){
                for(var b = 0; b < this.column.length; b++){
                    obj[this.column[b]["index"]] = this.pivotDatas[b][col_index];
                }
            }

            var rowArr = [];
            for(var j = 1; j < this.celldata.length; j++){
                var isEqual = true

                for(x in obj){
                    if(!!this.celldata[j][x] && !!this.celldata[j][x]["m"]){
                        var value = this.celldata[j][x]["m"];
                    }
                    else{
                        var value = luckysheet.getcellvalue(j, x, this.celldata);    
                    }

                    if(value != null){
                        value = value.toString();
                    }
                    else{
                        value = "(空白)";
                    }

                    if(value != obj[x]){
                        isEqual = false;
                        break;
                    }
                }

                if(isEqual){
                    rowArr.push(j);
                }
            }

            for(var r = 0; r < rowArr.length; r++){
                for(var c = 0; c < this.celldata[0].length; c++){
                    if(!!this.celldata[rowArr[r]][c] && !!this.celldata[rowArr[r]][c]["m"]){
                        var value = this.celldata[rowArr[r]][c]["m"];
                    }
                    else{
                        var value = luckysheet.getcellvalue(rowArr[r], c, this.celldata);    
                    }

                    if(value != null){
                        value = value.toString();
                    }
                    else{
                        value = "";
                    }

                    d[r + 1][c] = value;
                }
            }

            luckysheet_select_save = [{ "row": [0, rowArr.length], "column": [0, this.celldata[0].length - 1] }];
        // }

        clearjfundo = false;
        luckysheet.jfrefreshgrid(d, luckysheet_select_save);
        luckysheet.selectHightlightShow();
        clearjfundo = true;
    }
}