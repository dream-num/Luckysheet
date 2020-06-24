export const sheetmanage = {
    generateRandomSheetIndex: function(prefix){
        if(prefix == null){
            prefix = "Sheet";
        }

        var userAgent = window.navigator.userAgent.replace(/[^a-zA-Z0-9]/g, "").split("");

        var mid = "";

        for(var i = 0; i < 12; i++){
            mid += userAgent[Math.round(Math.random() * (userAgent.length - 1))];
        }

        var time = new Date().getTime();

        return prefix + "_" + mid + "_" + time;
    },
    generateRandomSheetName: function(file, isPivotTable){
        var sheetname = "";

        var index = file.length;

        for(var i = 0; i < file.length; i++){
            if(file[i].name.indexOf("Sheet") > -1 || file[i].name.indexOf("数据透视表") > -1){
                var suffix = parseFloat(file[i].name.replace("Sheet", "").replace("数据透视表", ""));

                if(suffix != "NaN" && Math.ceil(suffix) > index){
                    index = Math.ceil(suffix);
                }
            }
        }

        if(isPivotTable){
            return "数据透视表" + (index + 1);
        }
        else{
            return "Sheet" + (index + 1);
        }
    },
    generateCopySheetName: function(file, name){
        var copySheetName = "";

        if(name.toString().indexOf("(副本") > -1){
            var copy_i = name.toString().indexOf("(副本");

            var name2 = name.toString().substring(0, copy_i) + "(副本";

            var index = null;

            for(var i = 0; i < file.length; i++){
                var fileName = file[i].name.toString();

                var st_i = fileName.indexOf(name2);

                if(st_i > -1){
                    var ed_i = fileName.indexOf(")", st_i + name2.length);

                    var num = fileName.substring(st_i + name2.length, ed_i);

                    if(luckysheet.func_methods.isRealNum(num)){
                        if(index == null || parseInt(num) > index){
                            index = parseInt(num);
                        }
                    }
                }
            }

            if(index == null){
                copySheetName = name2 + "2)";
            }
            else{
                index++;

                copySheetName = name2 + index + ")";
            }
        }
        else{
            var index = null;
            var hascopy = false;

            var name2 = name + "(副本";

            for(var i = 0; i < file.length; i++){
                var fileName = file[i].name.toString();

                var st_i = fileName.indexOf(name2);

                if(st_i > -1){
                    hascopy = true;

                    var ed_i = fileName.indexOf(")", st_i + name2.length);

                    var num = fileName.substring(st_i + name2.length, ed_i);

                    if(luckysheet.func_methods.isRealNum(num)){
                        if(index == null || parseInt(num) > index){
                            index = parseInt(num);
                        }
                    }
                }
            }

            if(hascopy){
                if(index == null){
                    copySheetName = name + "(副本2)";
                }
                else{
                    index++;

                    copySheetName = name + "(副本" + index + ")";
                }
            }
            else{
                copySheetName = name + "(副本)";
            }
        }

        return copySheetName;
    },
    getSheetByIndex:function(index){
        try {
            if(index == null){
                index = luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex);
            }
            var i = this.getSheetIndex(index);
            return luckysheetfile[i];
        }
        catch(err) {
            console.log(err);
        }
    },
    getCurSheetnoset: function () {
        var curindex = 0;
        for (var i = 0; i < luckysheetfile.length; i++) {
            if (luckysheetfile[i].status == 1) {
                curindex = luckysheetfile[i].index;
                break;
            }
        }
        return curindex;
    },
    getCurSheet: function () {
        luckysheet.currentSheetIndex = luckysheetfile[0].index;

        for (var i = 0; i < luckysheetfile.length; i++) {
            if (luckysheetfile[i].status == 1) {
                luckysheet.currentSheetIndex = luckysheetfile[i].index;
                break;
            }
        }
        
        return luckysheet.currentSheetIndex;
    },
    addNewSheet: function (e, isPivotTable) {
        if(luckysheet.isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        var order = luckysheetfile.length;
        var index = luckysheet.sheetmanage.generateRandomSheetIndex();

        var sheetname = luckysheet.sheetmanage.generateRandomSheetName(luckysheet.getluckysheetfile(), isPivotTable);
        
        $("#luckysheet-sheet-container-c").append(luckysheet.replaceHtml(sheetHTML, { "index": index, "active": "", "name": sheetname, "style": "","colorset":"" }));

        var sheetconfig = { 
            "name": sheetname, 
            "color": "", 
            "status": "0", 
            "order": order, 
            "index": index, 
            "celldata": [], 
            "row": defaultrowNum, 
            "column": defaultcolumnNum, 
            "config": {}, 
            "pivotTable": null, 
            "isPivotTable": !!isPivotTable 
        };
        luckysheetfile.push(sheetconfig);

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $("#luckysheet-sheets-item" + index).addClass("luckysheet-sheets-item-active");
        $("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + index + '" class="luckysheet-datavisual-selection-set"></div>');
        luckysheet.cleargridelement(e);

        luckysheet.server.saveParam("sha", null, $.extend(true,{},sheetconfig));

        if (clearjfundo) {
            var redo = {};
            redo["type"] = "addSheet";
            luckysheet.jfundo = [];
            redo["sheetconfig"] = $.extend(true, {}, sheetconfig);
            redo["index"] = index;
            redo["currentSheetIndex"] = luckysheet.currentSheetIndex;
            luckysheet.jfredo.push(redo);
        }

        this.changeSheetExec(index, isPivotTable, true);
    },
    setSheetHide: function (index) {
        luckysheetfile[this.getSheetIndex(index)].hide = 1;
        var luckysheetcurrentSheetitem = $("#luckysheet-sheets-item" + index);
        luckysheetcurrentSheetitem.hide();
        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        var indicator = luckysheetcurrentSheetitem.nextAll(":visible");
        if (luckysheetcurrentSheetitem.nextAll(":visible").length > 0) {
            indicator = indicator.eq(0).data("index");
        }
        else {
            indicator = luckysheetcurrentSheetitem.prevAll(":visible").eq(0).data("index");
        }
        $("#luckysheet-sheets-item" + indicator).addClass("luckysheet-sheets-item-active");
        this.changeSheetExec(indicator);

        //luckysheet.server.saveParam("sh", index, {"cur": indicator, "hide": 1});
        luckysheet.server.saveParam("sh", luckysheetcurrentSheetitem.data("index"), 1, { "op": "hide", "cur": indicator });
    },
    setSheetShow: function (index) {
        luckysheetfile[this.getSheetIndex(index)].hide = 0;
        this.changeSheetExec(index);

        luckysheet.server.saveParam("sh", index, 0, {"op": "show", "cur": null});
    },
    sheetMaxIndex: 0,
    ordersheet: function (property) {
        return function (a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    getCurrentOrder:function(){
        var orders = {};
        $("#luckysheet-sheet-area div.luckysheet-sheets-item").each(function (a) {
            var index = $(this).data("index");
            for (var i = 0; i < luckysheetfile.length; i++) {
                if (luckysheetfile[i].index == index) {
                    orders[index.toString()] = a;
                    break;
                }
            }
        });
        return orders;
    },
    reOrderAllSheet: function () {
        var orders = {};
        $("#luckysheet-sheet-area div.luckysheet-sheets-item").each(function (a) {
            var index = $(this).data("index");
            for (var i = 0; i < luckysheetfile.length; i++) {
                if (luckysheetfile[i].index == index) {
                    luckysheetfile[i].order = a;
                    orders[index.toString()] = a;
                    break;
                }
            }
        });

        luckysheet.server.saveParam("shr", null, orders);
    },
    createSheet: function () { //修复拖动sheet更新后台后，重新打开显示错误
        var btn = [];
        luckysheetfile.sort(this.ordersheet('order'));
        for (var i = 0; i < luckysheetfile.length; i++) {
            var display = "";
            var sheetIndex = luckysheetfile[i].index;

            var colorset = '';
            if(luckysheetfile[i].color != null){
                colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + luckysheetfile[i].color + ';"></div>';
            }

            if (luckysheet.currentSheetIndex == sheetIndex) { //使用luckysheetfile中的index比较，而不是order
                btn.push(luckysheet.replaceHtml(sheetHTML, { "index": sheetIndex, "active": "luckysheet-sheets-item-active", "name": luckysheetfile[i].name, "style": "","colorset":colorset }));
            }
            else {
                if (luckysheetfile[i].hide == 1) {
                    btn.push(luckysheet.replaceHtml(sheetHTML, { "index": sheetIndex, "active": "", "name": luckysheetfile[i].name, "style": "display:none;","colorset":colorset }));
                }
                else {
                    btn.push(luckysheet.replaceHtml(sheetHTML, { "index": sheetIndex, "active": "", "name": luckysheetfile[i].name, "style": "","colorset":colorset }));
                }
                display = "style='display:none;'";
            }
            //luckysheetfile[i].index = i; //index即为默认
            // if(sheetIndex > this.sheetMaxIndex){
            //     this.sheetMaxIndex = sheetIndex;
            // }

            $("#luckysheet-cell-main").append('<div ' + display + ' id="luckysheet-datavisual-selection-set-' + sheetIndex + '" class="luckysheet-datavisual-selection-set"></div>');
        }

        $("#luckysheet-sheet-container-c").append(btn.join(""));

        this.locationSheet();
    },
    locationSheet:function(){
        var $c = $("#luckysheet-sheet-container-c"), winW = $("#"+container).width();
        var $cursheet = $("#luckysheet-sheet-container-c > div.luckysheet-sheets-item-active").eq(0);

        var scrollLeftpx = 0;
        var c_width = 0;
        $("#luckysheet-sheet-container-c > div.luckysheet-sheets-item:visible").each(function(){
            if($(this).hasClass("luckysheet-sheets-item-active")){
                scrollLeftpx = c_width;
            }
            c_width += $(this).outerWidth();
        });
        
        setTimeout(function(){
            $c.scrollLeft(scrollLeftpx - 10);

            if (c_width >= winW * 0.7) {
                $("#luckysheet-sheet-area .luckysheet-sheets-scroll").css("display", "inline-block");
                $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
            }
        }, 1)
    },
    copySheet: function (copyindex, e) {
        if(luckysheet.isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        var order = luckysheetfile.length;
        var index = luckysheet.sheetmanage.generateRandomSheetIndex();
        
        var copyarrindex = this.getSheetIndex(copyindex);
        var copyjson = $.extend(true, {}, luckysheetfile[copyarrindex]);
        copyjson.order = order;
        copyjson.index = index;
        copyjson.name = this.generateCopySheetName(luckysheetfile, copyjson.name);
        
        var colorset = '';
        if(copyjson.color != null){
            colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + copyjson.color + ';"></div>';
        }

        var copyobject = $("#luckysheet-sheets-item" + copyindex);
        $("#luckysheet-sheet-container-c").append(luckysheet.replaceHtml(sheetHTML, { "index": copyjson.index, "active": "", "name": copyjson.name, "order": copyjson.order, "style": "", "colorset": colorset }));
        $("#luckysheet-sheets-item" + copyjson.index).insertAfter(copyobject);
        // luckysheetfile.push(copyjson);
        luckysheetfile.splice(copyindex + 1, 0, copyjson);

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $("#luckysheet-sheets-item" + index).addClass("luckysheet-sheets-item-active");
        $("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + index + '" class="luckysheet-datavisual-selection-set"></div>');
        luckysheet.cleargridelement(e);

        // luckysheet.server.saveParam("shc", index, {"copyindex":copyindex});
        luckysheet.server.saveParam("shc", index, { "copyindex": copyindex, "name": copyjson.name });

        this.changeSheetExec(index);
        this.reOrderAllSheet();

        
        if (clearjfundo) {
            luckysheet.jfredo.push({ "type": "copySheet", "copyindex": copyindex, "index": copyjson.index, "sheetIndex": copyjson.index });
        }
        else if (luckysheet.jfredo.length > 0) {
            var jfredostr = luckysheet.jfredo[luckysheet.jfredo.length - 1];
            if (jfredostr.type == "copySheet") {
                jfredostr.index = copyjson.index;
                jfredostr.sheetIndex = copyjson.index;
            }
        }
    },
    hasSheet: function (index) {
        if (index == null) {
            return false;
        }

        index = this.getSheetIndex(index);
        if (index == null) {
            return false;
        }
        else {
            return true;
        }
    },
    createSheetbydata: function (data, isrenew) {
        var colorset = '';
        if(data.color != null){
            colorset = '<div class="luckysheet-sheets-item-color" style=" position: absolute; width: 100%; height: 3px; bottom: 0px; left: 0px; background-color: ' + data.color + ';"></div>';
        }

        $("#luckysheet-sheet-container-c").append(luckysheet.replaceHtml(sheetHTML, { "index": data.index, "active": "", "name": data.name, "order": data.order, "style": "", "colorset": colorset }));

        var previndex = data.order;
        if(previndex >= luckysheetfile.length){
            previndex = luckysheetfile.length - 1;
            $("#luckysheet-sheets-item" + data.index).insertAfter($("#luckysheet-sheets-item" + luckysheetfile[previndex].index));
        }
        else{
            $("#luckysheet-sheets-item" + data.index).insertBefore($("#luckysheet-sheets-item" + luckysheetfile[previndex].index));
        }
        
        luckysheetfile.push(data);

        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $("#luckysheet-sheets-item" + data.index).addClass("luckysheet-sheets-item-active");
        $("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + data.index + '" class="luckysheet-datavisual-selection-set"></div>');
        luckysheet.cleargridelement();

        if(isrenew != null){
            luckysheet.server.saveParam("shre", null, { "reIndex": data.index });
            data.hide = 0;

            luckysheet.server.saveParam("sh", data.index, 0, {"op": "show", "cur": null});
        }
        else{
            luckysheet.server.saveParam("sha", null, data);
        }

        this.changeSheetExec(data.index, data.isPivotTable, true);
        this.reOrderAllSheet();
    },
    deleteSheet: function (index) {
        var arrIndex = this.getSheetIndex(index);
        this.setSheetHide(index);
        $("#luckysheet-sheets-item" + index).remove();
        $("#luckysheet-datavisual-selection-set-" + index).remove();
        var removedsheet = luckysheetfile.splice(arrIndex, 1);
        this.reOrderAllSheet();

        luckysheet.server.saveParam("shd", null, {"deleIndex": index });

        if (clearjfundo) {
            removedsheet[0].type = "deleteSheet";
            luckysheet.jfredo.push(removedsheet[0]);
        }
    },
    nulldata: null,
    getGridData:function(d){
        var ret = [];
        for(var r = 0; r < d.length; r++){
            for(var c = 0; c < d[0].length; c++){
                if(d[r][c] == null){
                    continue;
                }
                ret.push({r:r, c:c, v:d[r][c]});
            }
        }
        return ret;
    },
    buildGridData:function(file){
        var row = file.row == null ? defaultrowNum : file.row, 
            column = file.column == null ? defaultcolumnNum : file.column;
        var data = luckysheet.datagridgrowth([], row, column);

        var celldata = file.celldata;
        if(celldata != null){
            for(var i = 0; i < celldata.length; i++){
                var item = celldata[i];
                var r = item.r;
                var c = item.c;
                var v = item.v;

                if(r >= data.length){
                    data = luckysheet.datagridgrowth(data, r - data.length + 1, 0);
                }
                if(c >= data[0].length){
                    data = luckysheet.datagridgrowth(data, 0, c - data[0].length + 1);
                }
                
                luckysheet.setcellvalue(r, c, data, v);
            }
        }

        //亿万格式+精确度 恢复全局初始化
        luckysheetConfigsetting.autoFormatw = false;  
        luckysheetConfigsetting.accuracy = undefined;
        return data;
    },
    cutGridData:function(d){
        var rowindex = 0;
        for(var r = d.length - 1; r >= 0; r--){
            var isnull = true;
            for(var c = 0; c < d[0].length; c++){
                var value = luckysheet.getcellvalue(r, c);
                if(value != null && $.trim(value).length > 0){
                    isnull = false;
                    break;
                }
            }

            if(!isnull){
                break;
            }
            else{
                rowindex = r;
            }
        }

        return d.slice(0, rowindex);
    },
    addGridData:function(celldata, row, column){
        var data = luckysheet.datagridgrowth([], row, column);
        if(celldata != null){
            for(var i = 0; i < celldata.length; i++){
                var item = celldata[i];
                var r = item.r;
                var c = item.c;
                var v = item.v;

                if(r >= data.length){
                    data = luckysheet.datagridgrowth(data, r - data.length + 1, 0);
                }

                if(c >= data[0].length){
                    data = luckysheet.datagridgrowth(data, 0, c - data[0].length + 1);
                }
                luckysheet.setcellvalue(r, c, data, v)
            }
        }
        
        return data;
    },
    initialjfFile: function (menu, title) {
        var _this = this;
        this.getCurSheet();
        var file = luckysheetfile[_this.getSheetIndex(luckysheet.currentSheetIndex)];

        this.nulldata = luckysheet.datagridgrowth([], defaultrowNum, defaultcolumnNum);
        var data = _this.buildGridData(file);

        luckysheet_select_save = file["luckysheet_select_save"];
        if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
            if(data[0] != null && data[0][0] != null && data[0][0].mc != null){
                luckysheet_select_save = [{ "row": [0, data[0][0].mc.rs - 1], "column": [0, data[0][0].mc.cs - 1] }];
            }
            else{
                luckysheet_select_save = [{ "row": [0, 0], "column": [0, 0] }];
            }
        }

        luckysheet_selection_range = file["luckysheet_selection_range"] == null ? [] : file["luckysheet_selection_range"];
        config = file["config"] == null ? {} : file["config"];

        var r2 = luckysheet_select_save[0].row[1], c2 = luckysheet_select_save[0].column[1];
        if(luckysheet_select_save.length > 1){
            for(var i = 0; i < luckysheet_select_save.length; i++){
                if(luckysheet_select_save[i].row[1] > r2){
                    r2 = luckysheet_select_save[i].row[1];
                }

                if(luckysheet_select_save[i].column[1] > c2){
                    c2 = luckysheet_select_save[i].column[1];
                }
            }
        }

        file.data = data;

        var rowheight = data.length;
        if(r2 > rowheight - 1){
            rowheight = r2 + 1;
        }

        var colwidth = data[0].length;
        if(c2 > colwidth - 1){
            colwidth = c2 + 1;
        }

        luckysheet.luckysheetcreatedom(colwidth, rowheight, data, menu, title);

        setTimeout(function () {
            luckysheet.tooltip.createHoverTip("#luckysheet_info_detail" ,".luckysheet_info_detail_title, .luckysheet_info_detail_input, .luckysheet_info_detail_update");

            luckysheet.tooltip.createHoverTip("#luckysheet-wa-editor" ,".luckysheet-toolbar-menu-button, .luckysheet-toolbar-button, .luckysheet-toolbar-combo-button");

            luckysheetTableContentHW = [$("#luckysheet-cell-main").width() + rowHeaderWidth - cellMainSrollBarSize, $("#luckysheet-cell-main").height() + columeHeaderHeight - cellMainSrollBarSize];
            $("#luckysheetTableContent, #luckysheetTableContentF").attr({ width: Math.ceil(luckysheetTableContentHW[0]*devicePixelRatio), height: Math.ceil(luckysheetTableContentHW[1]*devicePixelRatio) }).css({ width: luckysheetTableContentHW[0], height: luckysheetTableContentHW[1] }).get(0).getContext("2d");

            var key = luckysheet.server.gridKey;
            var cahce_key = key + "__qkcache";

            var ini = function(){
                file["load"] = "1";

                _this.createSheet();

                var sheetindexset = _this.checkLoadSheetIndex(file);
                var sheetindex = [];
                for(var i=0;i<sheetindexset.length;i++){
                    var item = sheetindexset[i];
                    if(item==file["index"]){
                        continue;
                    }
                    sheetindex.push(item);
                }

                var execF = function(){
                    _this.storeSheetParam();
                    _this.restoreselect();
                    luckysheet.sheetmanage.CacheNotLoadControll = [];
                    luckysheet.sheetmanage.restoreCache();
                    luckysheet.formula.execFunctionGroup();
                    luckysheet.sheetmanage.restoreSheetAll(luckysheet.currentSheetIndex);
                    // $("#luckysheetTableContent").get(0).getContext("2d") ;
                    // $("#luckysheetTableContentF").get(0).getContext("2d") ;
                    luckysheet.luckysheetrefreshgrid(0, 0);
                    $("#luckysheet_info_detail_save").html("已恢复本地缓存");

                    if (!!file.isPivotTable) {
                        luckysheetcurrentisPivotTable = true;
                        luckysheet.pivotTable.changePivotTable(luckysheet.currentSheetIndex);
                    }
                    else {
                        luckysheetcurrentisPivotTable = false;
                        $("#luckysheet-modal-dialog-slider-pivot").hide();
                        luckysheet.luckysheetsizeauto();
                    }

                    if(typeof luckysheet.luckysheetConfigsetting.beforeCreateDom == "function" ){
                        luckysheet.luckysheetConfigsetting.beforeCreateDom(luckysheet);
                    }

                    if(luckysheetConfigsetting.pointEdit){
                        setTimeout(function(){
                            $("#luckysheetloadingdata").remove();
                        }, 0);
                    }
                    else{
                        setTimeout(function(){
                            $("#luckysheetloadingdata").fadeOut().remove();
                        }, 500);
                    }
                }

                var loadSheetUrl = luckysheet.server.loadSheetUrl;
                if(sheetindex.length==0 || loadSheetUrl==""){
                    execF();
                }
                else{
                    $.post(loadSheetUrl, {"gridKey" : luckysheet.server.gridKey, "index": sheetindex.join(",")}, function (d) {
                        var dataset = eval("(" + d + ")");
                        
                        for(var item in dataset){
                            if(item == file["index"]){
                                continue;
                            }

                            var otherfile = luckysheetfile[_this.getSheetIndex(item)];
                            
                            if(otherfile["load"] == null || otherfile["load"] == "0"){
                                otherfile.celldata = dataset[item.toString()];
                                otherfile["data"] = _this.buildGridData(otherfile);
                                otherfile["load"] = "1";
                            }
                        }

                        execF();
                    });
                }
            }

            //ini();
            try {
                localforage.getItem(cahce_key).then(function(readValue) {
                    if(readValue!=null){
                         luckysheet.sheetmanage.CacheNotLoadControll = readValue;
                    }
                    // console.log("2");
                    luckysheet.server.clearcachelocaldata(function(){
                        ini();
                    });
                });
            } catch(e) {
                // statements
                ini();
                console.log("缓存操作失败");
            }

            // setTimeout(function(){
            //     luckysheet.server.imageRequest();
            // }, 1000);
        }, 1);
    },
    storeSheetParam: function () {
        var index = this.getSheetIndex(luckysheet.currentSheetIndex);
        var file = luckysheetfile[index];
        file["visibledatarow"] = visibledatarow;
        file["visibledatacolumn"] = visibledatacolumn;
        file["rowsplit"] = rowsplit;
        file["ch_width"] = ch_width;
        file["rh_height"] = rh_height;
        file["luckysheet_select_save"] = $.extend(true, [], luckysheet_select_save);
        file["luckysheet_selection_range"] = $.extend(true, [], luckysheet_selection_range);

        file["scrollLeft"] = $("#luckysheet-cell-main").scrollLeft();//列标题
        file["scrollTop"] = $("#luckysheet-cell-main").scrollTop();//行标题
    },
    setSheetParam: function (isload) {
        var index = this.getSheetIndex(luckysheet.currentSheetIndex);
        var file = luckysheetfile[index];

        luckysheet.flowdata = file["data"];
        luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据

        luckysheet.postil.buildAllPs(luckysheet.flowdata);

        config = file["config"];

        luckysheet_select_save = file["luckysheet_select_save"] == null ? [] : file["luckysheet_select_save"];
        luckysheet_selection_range = file["luckysheet_selection_range"] == null ? [] : file["luckysheet_selection_range"];

        if(file["freezen"] == null){
            luckysheetFreezen.freezenhorizontaldata = null;
            luckysheetFreezen.freezenverticaldata = null;
        }
        else{
            luckysheetFreezen.freezenhorizontaldata = file["freezen"].horizontal == null ? null : file["freezen"].horizontal.freezenhorizontaldata;
            luckysheetFreezen.freezenverticaldata = file["freezen"].vertical == null ? null : file["freezen"].vertical.freezenverticaldata;
        }

        luckysheet.createFilterOptions(file["filter_select"], file["filter"]);

        luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);

        // if( !!isload && (file["visibledatarow"] == null || file["visibledatarow"].length == 0 || file["visibledatacolumn"] == null || file["visibledatacolumn"].length == 0 || file["rowsplit"] == null || file["ch_width"] == null || file["rh_height"] == null)){
        //     luckysheet.luckysheetcreatesheet(file["data"][0].length, file["data"].length, file["data"], file["config"], false);
        // }
        // else{
        //     visibledatarow = file["visibledatarow"];
        //     visibledatacolumn = file["visibledatacolumn"];
        //     rowsplit = file["rowsplit"];
        //     ch_width = file["ch_width"];
        //     rh_height = file["rh_height"];
        //     luckysheet.flowdata = file["data"];
        //     setTimeout(function(){
        //         luckysheet.editor.webWorkerFlowDataCache(file["data"]);//worker存数据
        //     },0);
        //     config = file["config"];
        // }

        // luckysheet_select_save = file["luckysheet_select_save"];
        // luckysheet_selection_range = file["luckysheet_selection_range"];
    },
    restoreselect: function () {
        var index = this.getSheetIndex(luckysheet.currentSheetIndex);
        var file = luckysheetfile[index];

        //选区
        luckysheet.selectHightlightShow();

        //复制选区虚线框
        luckysheet.selectionCopyShow();

        if (file["scrollLeft"] != null && file["scrollLeft"] > 0) {
            $("#luckysheet-scrollbar-x").scrollLeft(file["scrollLeft"]); //列标题
        }
        else {
            $("#luckysheet-scrollbar-x").scrollLeft(0);
        }

        if (file["scrollTop"] != null && file["scrollTop"] > 0) {
            $("#luckysheet-scrollbar-y").scrollTop(file["scrollTop"]); //列标题
        }
        else {
            $("#luckysheet-scrollbar-y").scrollTop(0);
        }
    },
    storeSheetParamALL: function () {
        this.storeSheetParam();
        var index = this.getSheetIndex(luckysheet.currentSheetIndex);
        luckysheetfile[index]["data"] = luckysheet.flowdata;
        luckysheetfile[index]["config"] = $.extend(true, {}, config);
    },
    changeSheet: function (index, isPivotInitial, isNewSheet) {
        if(luckysheet.isEditMode()){
            // alert("非编辑模式下不允许该操作！");
            return;
        }

        if(luckysheet.server.allowUpdate){
            $("#luckysheet-cell-main #luckysheet-multipleRange-show").empty();
            luckysheet.server.multipleIndex = 0;
        }
        
        $('#luckysheet-filter-selected-sheet' + luckysheet.currentSheetIndex + ', #luckysheet-filter-options-sheet' + luckysheet.currentSheetIndex).hide();
        $('#luckysheet-filter-selected-sheet' + index + ', #luckysheet-filter-options-sheet' + index).show();

        this.storeSheetParamALL();
        this.setCurSheet(index);
        var file = luckysheetfile[this.getSheetIndex(index)], data = file.data, cfg = file.config;

        if (!!file.isPivotTable) {
            luckysheetcurrentisPivotTable = true;
            if (!isPivotInitial) {
                luckysheet.pivotTable.changePivotTable(index);
            }
        }
        else {
            luckysheetcurrentisPivotTable = false;
            $("#luckysheet-modal-dialog-slider-pivot").hide();
            luckysheet.luckysheetsizeauto();
        }

        var _this = this;
        var load = file["load"];
        if (load != null) {
            _this.setSheetParam(true);
            _this.showSheet();

            setTimeout(function () {
                //luckysheet.flowdata = data;
                luckysheet.formula.execFunctionGroup();
                luckysheet.luckysheetrefreshgrid();
                luckysheet.server.saveParam("shs", null, luckysheet.currentSheetIndex);
            }, 1);
        }
        else {
            //$("#" + container + " div.luckysheetsheetchange").hide();
            var loadSheetUrl = luckysheet.server.loadSheetUrl;
            if(loadSheetUrl == "" || luckysheetcurrentisPivotTable || !!isNewSheet){
                //var row = file.row==null?defaultrowNum:file.row, column = file.cloumn==null?defaultcolumnNum:file.cloumn;
                var data = _this.buildGridData(file);

                file["data"] = data;
                file["load"] = "1";

                _this.setSheetParam();
                _this.showSheet();

                setTimeout(function () {
                    luckysheet.sheetmanage.restoreCache();
                    luckysheet.formula.execFunctionGroup();
                    luckysheet.sheetmanage.restoreSheetAll(luckysheet.currentSheetIndex);
                    luckysheet.luckysheetrefreshgrid();
                }, 1);

                luckysheet.server.saveParam("shs", null, luckysheet.currentSheetIndex);
            }
            else{
                $("#luckysheet-grid-window-1").append('<div id="luckysheetloadingdata" style="width:100%;text-align:center;position:absolute;top:0px;height:100%;font-size: 16px;z-index:1000000000;background:#fff;"><div style="position:relative;top:45%;width:100%;"> <div class="luckysheetLoaderGif"></div> <span>渲染中...</span></div></div>');

                var sheetindex = this.checkLoadSheetIndex(file);
                
                $.post(loadSheetUrl, {"gridKey" : luckysheet.server.gridKey, "index": sheetindex.join(",")}, function (d) {
                    var dataset = eval("(" + d + ")");
                    file.celldata = dataset[index.toString()];
                    var data = _this.buildGridData(file);

                    setTimeout(function(){
                        $("#luckysheetloadingdata").fadeOut().remove();
                    }, 500);

                    for(var item in dataset){
                        if(item == index){
                            continue;
                        }

                        var otherfile = luckysheetfile[_this.getSheetIndex(item)];
                        
                        if(otherfile["load"] == null || otherfile["load"] == "0"){
                            otherfile.celldata = dataset[item.toString()];
                            otherfile["data"] = _this.buildGridData(otherfile);
                            otherfile["load"] = "1";
                        }
                    }

                    file["data"] = data;
                    file["load"] = "1";

                    _this.setSheetParam();
                    _this.showSheet();

                    setTimeout(function () {
                        luckysheet.sheetmanage.restoreCache();
                        luckysheet.formula.execFunctionGroup();
                        luckysheet.sheetmanage.restoreSheetAll(luckysheet.currentSheetIndex);
                        luckysheet.luckysheetrefreshgrid();
                    }, 1);

                    luckysheet.server.saveParam("shs", null, luckysheet.currentSheetIndex);
                });
            }
        }

        $("#luckysheet-cell-main .luckysheet-datavisual-selection-set").hide();
        $("#luckysheet-datavisual-selection-set-" + index).show();
        //隐藏其他sheet的图表，显示当前sheet的图表 chartMix
        !!window.generator && generator.renderChartShow(index);
        // $("#luckysheet-cell-main .luckysheet-data-visualization-chart[sheetIndex!='" + index + "']").hide();
        // $("#luckysheet-cell-main .luckysheet-data-visualization-chart[sheetIndex='" + index + "']").show();
        luckysheetFreezen.initialFreezen(index);

        this.restoreselect();
    },
    checkLoadSheetIndex:function(file){
    	var calchain = file.calcChain; //index
    	var chart = file.chart; //dataSheetIndex
    	var pivotTable = file.pivotTable; //pivotDataSheetIndex

    	var ret= [], cache={};
    	ret.push(file.index);
    	cache[file.index.toString()] = 1;

        if(calchain != null){
        	for(var i = 0; i < calchain.length; i++){
        		var func = calchain[i];
        		var dataindex = func.index;
                if(dataindex == null){
                    continue;
                }
        		if(cache[dataindex.toString()] == null){
        			ret.push(dataindex);
        			cache[dataindex.toString()] = 1;
        		}
        	}
        }

        if(chart != null){
            for(var i = 0; i < chart.length; i++){
                var cc = chart[i];
                var dataindex = cc.dataSheetIndex;
                if(dataindex == null){
                    continue;
                }
                if(cache[dataindex.toString()] == null){
                    ret.push(dataindex);
                    cache[dataindex.toString()] = 1;
                }
            } 
        }

        if(pivotTable != null){
        	var dataindex = pivotTable.pivotDataSheetIndex;
    		if(dataindex != null && cache[dataindex.toString()] == null){
    			ret.push(dataindex);
    			cache[dataindex.toString()] = 1;
    		}
        }

    	return ret;
    },
    showSheet: function () {
        //$("#" + container + " div.luckysheetsheetchange").hide();
        // $("#luckysheetrowHeader_" + luckysheet.currentSheetIndex).show();
        // $("#luckysheet-cell-flow_" + luckysheet.currentSheetIndex).show();
        // $("#luckysheet-cols-h-cells_" + luckysheet.currentSheetIndex).show();
        $("#luckysheet-cell-flow_0").css({ "width": ch_width, "top": "-1px" }); //width更新
        $("#luckysheet-sheettable_0").css({ "width": ch_width - 1, "height": rh_height });
        $("#luckysheetrowHeader_0").css("height", rh_height);
        $("#luckysheet-cols-h-cells_0").css("width", ch_width); //width更新

        $("#luckysheet-scrollbar-x div").width(ch_width);
        $("#luckysheet-scrollbar-y div").height(rh_height - 30);
    },
    setCurSheet: function (index) {
        for (var i = 0; i < luckysheetfile.length; i++) {
            if (luckysheetfile[i]["index"] == index) {
                luckysheetfile[i].status = 1;
            }
            else {
                luckysheetfile[i].status = 0;
            }
        }
        luckysheet.currentSheetIndex = index;
    },
    getSheetIndex: function (index) {
        for (var i = 0; i < luckysheetfile.length; i++) {
            if (luckysheetfile[i]["index"] == index) {
                return i;
            }
        }
        return null;
    },
    changeSheetExec: function (index, isPivotInitial, isNewSheet) {
        var $sheet = $("#luckysheet-sheets-item" + index);
        //sheet-filter切换
        //$('#luckysheet-filter-selected-sheet'+ luckysheet.currentSheetIndex +', #luckysheet-filter-options-sheet'+ luckysheet.currentSheetIndex).hide();
        //$('#luckysheet-filter-selected-sheet'+ index +', #luckysheet-filter-options-sheet'+ index).show();
        //$("#luckysheet-cell-main").append('<div id="luckysheet-datavisual-selection-set-' + i + '" class="luckysheet-datavisual-selection-set"></div>');
        window.luckysheet_getcelldata_cache = null;
        $("#luckysheet-sheet-area div.luckysheet-sheets-item").removeClass("luckysheet-sheets-item-active");
        $sheet.addClass("luckysheet-sheets-item-active").show();
        luckysheet.cleargridelement();
        this.changeSheet(index, isPivotInitial, isNewSheet);
        $("#luckysheet-sheet-list, #luckysheet-rightclick-sheet-menu").hide();

        if (luckysheet.formula.rangestart) {
            luckysheet.formula.createRangeHightlight();
        }

        var $c = $("#luckysheet-sheet-container-c");
        $c.scrollLeft($sheet.offset().left);

        var c_width = $c.width(), c_srollwidth = $c[0].scrollWidth, scrollLeft = $c.scrollLeft();

        if (scrollLeft <= 0) {
            $("#luckysheet-sheet-container .docs-sheet-fade-left").hide();
        }
        else {
            $("#luckysheet-sheet-container .docs-sheet-fade-left").show();
        }

        if (c_width + scrollLeft >= c_srollwidth) {
            $("#luckysheet-sheet-container .docs-sheet-fade-right").hide();
        }
        else {
            $("#luckysheet-sheet-container .docs-sheet-fade-right").show();
        }
    },
    delChart: function (chart_id, sheetIndex) {
        var index = this.getSheetIndex(sheetIndex);
        var file = luckysheetfile[index];
        if (file.chart == null) {
            file.chart = [];
        }
        else {
            for (var i = 0; i < file.chart.length; i++) {
                if (file.chart[i].chart_id == chart_id) {
                    luckysheetfile[index].chart.splice(i, 1);
                    break;
                }
            }
        }
    },
    saveChart: function (json) {//采用chartMix store存储，弃用luckysheetfile存储，防止重复存储
        var index = this.getSheetIndex(json.sheetIndex);
        var file = luckysheetfile[index];
        if (file.chart == null) {
            file.chart = [];
            file.chart.push(json);
        }
        else {
            for (var i = 0; i < file.chart.length; i++) {
                if (file.chart[i].chart_id == json.chart_id) {
                    var old = $.extend(true, {}, file.chart[i]);
                    file.chart[i] = $.extend(true, {}, old, json);
                    return;
                }
            }
            file.chart.push(json);
        }
    },
    getChart: function (sheetIndex, chart_id) {
        var index = getSheetIndex(sheetIndex);
        var file = luckysheetfile[index];
        if (file.chart == null) {
            return null;
        }
        else {
            for (var i = 0; i < file.chart.length; i++) {
                if (file.chart[i].chart_id == chart_id) {
                    return file.chart[i];
                }
            }
            return null;
        }
    },
    restoreChart: function (sheetIndex) {
        if (luckysheet.chartparam.luckysheet_chartIns_index == -1) {
            luckysheet.chartparam.luckysheet_chartIns_index = 0;
            for (var i = 0; i < luckysheetfile.length; i++) {
                var chart = luckysheetfile[i].chart;
                if (chart != null) {
                    luckysheet.chartparam.luckysheet_chartIns_index += chart.length;
                }
            }
        }

        var index = this.getSheetIndex(sheetIndex);
        var file = luckysheetfile[index];
        if (file.chart != null) {
            for (var i = 0; i < file.chart.length; i++) {
                var c = file.chart[i];
                if(c.sheetIndex == null || c.dataSheetIndex == null || c.row == null || c.column == null){
                    continue;
                }
                
                if ($("#" + c.chart_id).length == 0) {
                    var chart_selection_color = null;
                    var chart_id = null;
                    var chart_selection_id = null;

                    if(c.chart_id != null){
                        chart_id = c.chart_id;
                        var chart_id_index = parseInt(chart_id);
                        if(isNaN(chart_id_index)){
                            chart_id_index = luckysheet.chartparam.luckysheet_chartIns_index++;
                        }
                        else{
                            if(chart_id_index>luckysheet.chartparam.luckysheet_chartIns_index ){
                                luckysheet.chartparam.luckysheet_chartIns_index = chart_id_index;
                            }
                        }
                        chart_selection_color = luckyColor[chart_id_index];
                        chart_selection_id = chart_id + "_selection";
                    }
                    else{
                        chart_selection_color = luckyColor[luckysheet.chartparam.luckysheet_chartIns_index];
                        chart_id = "luckysheet-datav-chart-" + luckysheet.chartparam.luckysheet_chartIns_index++;
                        chart_selection_id = chart_id + "_selection";
                        c.chart_id = chart_id;
                    }

                    var chartTheme = c.chartTheme;
                    chartTheme = chartTheme == null ? "default0000" : chartTheme;

                    luckysheet.insertChartTosheet(c.sheetIndex, c.dataSheetIndex, c.option, c.chartType, c.selfOption, c.defaultOption, c.row, c.column, chart_selection_color, chart_id, chart_selection_id, c.chartStyle, c.rangeConfigCheck, c.rangeRowCheck, c.rangeColCheck, c.chartMarkConfig, c.chartTitleConfig, c.winWidth, c.winHeight, c.scrollLeft, c.scrollTop, chartTheme, c.myWidth, c.myHeight, c.myLeft!=null?parseFloat(c.myLeft):null, c.myTop!=null?parseFloat(c.myTop):null, c.myindexrank, true);
                }
            }
        }
    },
    getRangetxt: function (sheetIndex, range, currentIndex) {
        var sheettxt = "";

        if (currentIndex == null) {
            currentIndex = luckysheet.currentSheetIndex;
        }

        if (sheetIndex != currentIndex) {
            sheettxt = luckysheetfile[this.getSheetIndex(sheetIndex)].name + "!";
        }

        var row0 = range["row"][0], row1 = range["row"][1];
        var column0 = range["column"][0], column1 = range["column"][1];

        if (row0 == null && row1 == null) {
            return sheettxt + luckysheet.luckysheetchatatABC(column0) + ":" + luckysheet.luckysheetchatatABC(column1);
        }
        else if (column0 == null && column1 == null) {
            return sheettxt + (row0 + 1) + ":" + (row1 + 1);
        }
        else {
            if (column0 == column1 && row0 == row1) {
                return sheettxt + luckysheet.luckysheetchatatABC(column0) + (row0 + 1);
            }
            else {
                return sheettxt + luckysheet.luckysheetchatatABC(column0) + (row0 + 1) + ":" + luckysheet.luckysheetchatatABC(column1) + (row1 + 1);
            }
        }
    },
    getSheetName: function (sheetIndex) {
        if (sheetIndex == null) {
            sheetIndex = luckysheet.currentSheetIndex;
        }

        return luckysheetfile[this.getSheetIndex(sheetIndex)].name;
    },
    getSheetMerge: function () {
        if(config.merge == null){
        	return null;
        }
        return config.merge;
    },
    getSheetData: function (sheetIndex) {
        if (sheetIndex == null) {
            sheetIndex = luckysheet.currentSheetIndex;
        }

        return luckysheetfile[this.getSheetIndex(sheetIndex)].data;
    },
    getSheetConfig: function (sheetIndex) {
        if (sheetIndex == null) {
            sheetIndex = luckysheet.currentSheetIndex;
        }

        var config = luckysheetfile[this.getSheetIndex(sheetIndex)].config;
        if(config == null){
        	luckysheetfile[this.getSheetIndex(sheetIndex)].config = {};
        }
        return luckysheetfile[this.getSheetIndex(sheetIndex)].config;
    },
    restoreFilter: function(sheetIndex){
        var index = this.getSheetIndex(sheetIndex);
        var file = luckysheetfile[index];

        if($('#luckysheet-filter-selected-sheet' + sheetIndex).length > 0 || file.filter_select == null || JSON.stringify(file.filter_select) == "{}"){
            if(file.config != null && file.config.rowhidden != null){
                file.config.rowhidden =  {};
                config = file.config;

                luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);
            }

            return;
        }

        if(luckysheet.getObjType(file.filter_select) != "object"){
            file.filter_select = JSON.parse(file.filter_select);
        }

        if(file.filter_select == null || file.filter_select.row == null || file.filter_select.column == null){
            return;
        }

        luckysheet.createFilterOptions(file.filter_select);

        if(luckysheet.getObjType(file.filter) != "object"){
            if(file.filter != null && luckysheet.getObjType(file.filter) == "string"){ 
                file.filter = JSON.parse(file.filter);
            }
        }

        var rowhidden = {};
        if(file.config != null && file.config.rowhidden != null){
            rowhidden =  file.config.rowhidden;
        }

        $("#luckysheet-filter-options-sheet" + sheetIndex + " .luckysheet-filter-options").each(function(i){
            if(file.filter == null){
                return false;
            }

            var $top = $(this);
            var item = file.filter[i];

            if(item == null){
                return true;
            }

            if(luckysheet.getObjType(item) != "object"){
                item = JSON.parse(item);
            }

            luckysheet.labelFilterOptionState($top, item.optionstate, item.rowhidden, item.caljs, false, item.st_r, item.ed_r, item.cindex, item.st_c, item.ed_c);

            rowhidden = $.extend(true, rowhidden, item.rowhidden);
        });

        if(file.config == null){
            file.config = {};
        }

        file.config["rowhidden"] = rowhidden;
        config = file.config;

        luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);
        
        // var $t = $("#luckysheet-filter-options-sheet" + sheetIndex + " .luckysheet-filter-options").eq(0);
        // luckysheet.filterseletedbyindex($t.data("str"), $t.data("edr"), $t.data("stc"), $t.data("edc"));
    },
    restorePivot:function(sheetIndex){
        var index = this.getSheetIndex(sheetIndex);
        var file = luckysheetfile[index];
        if (!file.isPivotTable) {
            return;
        }
        luckysheet.pivotTable.getCellData(sheetIndex);
        luckysheet.pivotTable.initialPivotManage(true);
        luckysheet.pivotTable.refreshPivotTable();
    },
    restoreSheetAll:function(sheetIndex){
        var _this= this;
        _this.restorePivot(sheetIndex);
        _this.restoreFilter(sheetIndex);
        // _this.restoreChart(sheetIndex);//TODO:chartMix重写restoreChart方法
        _this.restoreFreezen(sheetIndex);
    },
    restoreFreezen:function(sheetIndex){
        luckysheetFreezen.initialFreezen(sheetIndex);
    },
    restoreCache:function(){
        var key = luckysheet.server.gridKey;
        var cahce_key = key + "__qkcache";
        var _this = this;

        var data = _this.CacheNotLoadControll;
        //.concat(ret);
        _this.CacheNotLoadControll = [];
        if(data.length == 0){
            return;
        }
        console.log(data);
        for(var i = 0; i < data.length; i++){
            var item = data[i];
            _this.execCache(item);
        }

        // localforage.getItem(cahce_key).then(function(readValue) {
        //     if(readValue!=null){
        //         _this.CacheNotLoadControll = readValue;
        //     }
            
        //     luckysheet.server.getlocaldata(function(ret){
        //         if(ret==null){
        //             ret = [];
        //         }
        //         var data = _this.CacheNotLoadControll;
        //         //.concat(ret);
        //         _this.CacheNotLoadControll = [];
        //         if(data.length==0){
        //             return;
        //         }

        //         for(var i=0;i<data.length;i++){
        //             var item = data[i];
        //             _this.execCache(item);
        //         }
                

        //         luckysheet.server.clearcachelocaldata(function(){
        //             $("#luckysheet_info_detail_save").html("已恢复本地缓存");
        //         });
        //     });
        // });
    },
    CacheNotLoadControll:[],
    execCache:function(item){
        var type = item.t;
        var index = item.i;
        var value = item.v;
        var _this = this;
        var file = luckysheetfile[_this.getSheetIndex(index)];

        if(type == "sha"){
            luckysheetfile.push(value);
        }
        else if(type == "shc"){
            var copyjson = $.extend(true, {}, luckysheetfile[_this.getSheetIndex(value.copyindex)]);
            copyjson.index = index;
            luckysheetfile.push(copyjson);
        }
        else if(type == "shd"){
            luckysheetfile.splice(value.deleIndex, 1);
        }
        else if(type == "shr"){
            for(var pos in value){
                luckysheetfile[_this.getSheetIndex(pos)].order = value[pos];
            }
        }

        if((file == null || file.load != "1") && !(type in {"sha":0, "shc":0, "shd":0, "shr":0}) ){
            _this.CacheNotLoadControll.push(item);
            return;
        }

        if(type == "v"){
            var r = item.r, c = item.c, v = item.v;
            var data = _this.getSheetData(index);
            file.data[r][c] = v;
        }
        else if(type == "fc"){
            var op = item.op, pos = item.pos;

            if(luckysheet.getObjType(value) != "object"){
                value = eval('('+ value +')');
            }

            var r = value.r, c = value.c;
            var func = value.func;

            if(op == "del" ){
                luckysheet.formula.delFunctionGroup(r, c, index);
            }
            else {
                luckysheet.formula.insertUpdateFunctionGroup(r, c, func, index);
            }
        }
        else if(type == "cg"){
            var v = value, k = item.k;
            var config1 = _this.getSheetConfig(index);;
            
            if(!(k in config1)){
                config1[k] = {};
            }

            for(var key in v){
                config1[k][key] = v[key];
            }

            config = config1;

            // else if(rc=="c"){
            //     for(var key in v){
            //         if(config.columlen==null){
            //             config.columlen = {};
            //         }
            //         config.columlen[key] = v[key];
            //     }
            // }
        }
        else if(type == "f"){
            var v = value, op = item.op, pos = item.pos;
            var filter = file.filter;
            if(filter == null){
                filter = {};
            }

            if(op == "upOrAdd"){
                filter[pos] =  v;
            }
            else if(op == "del"){
                delete filter[pos];
            }
        }
        else if(type == "fsc"){
            file.filter = null;
            file.filter_select = null;
        }
        else if(type == "fsr"){
            var v = value;
            file.filter = v.filter;
            file.filter_select = v.filter_select;
        }
        else if(type == "sh"){
            var op = item.op, cur = item.cur, v = value;       
            if(op == "hide"){
                file.status = 0;
                luckysheetfile[_this.getSheetIndex(cur)].status = 1;
            }
            else if(op == "show"){
                for(var i = 0; i < luckysheetfile.length; i++){
                    luckysheetfile[i].status = 0;
                }
                file.status = 1;
            }
        }
        else if(type == "all"){
            var k = item.k, s = item.s;
            if(s && luckysheet.getObjType(value) != "object"){
                file[k] = JSON.stringify(value);
            }
            else{
                file[k] = value;
            }

            
        }
        // else if(type=="fs"){
        //     var v = value;
        //     file.filter_select = v;
        // }
        // else if(op=="color"){
        //     file.color = v;
        // }
        // if(op=="name"){
        //     file.name = v;
        // }
        // else if(type=="p"){
        //     file.pivotTable = value;
        // }
        else if(type == "c"){
            var op = item.op, cid = item.cid;
            if(op == "add"){
                file.chart.push(value);
            }
            else if(op == "xy" || op == "wh" || op == "update"){
                for(var i = 0; i < file.chart.length; i++){
                    if(file.chart[i].chart_id == cid){
                        for(var item in file.chart[i]){
                            for(var vitem in value){
                                if(item == vitem){
                                    file.chart[i][item] = value[vitem];
                                }
                            }
                        }
                        return;
                    }
                }
            }
            else if(op == "del"){
                for(var i = 0; i < file.chart.length; i++){
                    if(file.chart[i].chart_id == cid){
                        file.chart.splice(i, 1); 
                        return;
                    }
                }
            }
        }
        else if(type == "drc"){
            var rc = item.rc, index = value.index, len = value.len;
            var celldata = file.celldata;
            if(rc == "r"){
                // for(var i = 0; celldata.length < 0; i++){
                //     var cell = celldata[i];
                //     if(cell.r >= index && cell.r < index + len){
                //         delete cell;
                //     }
                //     else if(cell.r >= index + len){
                //         cell.r -= len;
                //     }
                // }
                for(var i = 0; celldata.length == 0; i++){
                    var cell = celldata[i];
                    if(cell.r >= index && cell.r < index + len){
                        // delete cell;
                        delete celldata[i];
                    }
                    else if(cell.r >= index + len){
                        cell.r -= len;
                    }
                }
                file.row -= len;
            }
            else{
                // for(var i = 0; celldata.length < 0; i++){
                //     var cell = celldata[i];
                //     if(cell.c >= index && cell.c < index + len){
                //         delete cell;
                //     }
                //     else if(cell.c >= index + len){
                //         cell.c -= len;
                //     }
                // }
                for(var i = 0; celldata.length == 0; i++){
                    var cell = celldata[i];
                    if(cell.c >= index && cell.c < index + len){
                        // delete cell;
                        delete celldata[i];
                    }
                    else if(cell.c >= index + len){
                        cell.c -= len;
                    }
                }
                file.column -= len;
            }

            var ret = [];
            for(var i = 0; i < celldata.length; i++){
                if(celldata[i] != null){
                    ret.push(celldata[i]);
                }
            }
            file.celldata = ret;
            
            var mtype, mst, med;
            if(rc == "r"){
                mtype = "row";
            }
            else{
                mtype = "column";
            }
            mst = index;
            med = index + len - 1;

            luckysheet.luckysheetdeletetable(mtype, mst, med, true);
            // setTimeout(function(){
            //     luckysheet.jfrefreshgridall(luckysheet.flowdata[0].length, luckysheet.flowdata.length, luckysheet.flowdata);
            // }, 10);
        }
        else if(type=="arc"){
            var rc = item.rc, index = value.index, len = value.len;
            var celldata = file.celldata;
            if(rc == "r"){
                // for(var i = 0; celldata.length < 0; i++){
                //     var cell = celldata[i];
                //     if(cell.r > index){
                //         cell.r += len;
                //     }
                // }
                for(var i = 0; i < celldata.length; i++){
                    var cell = celldata[i];
                    if(cell.r > index){
                        cell.r += len;
                    }
                }
                file.row += len;
            }
            else{
                // for(var i = 0; celldata.length < 0; i++){
                //     var cell = celldata[i];
                //     if(cell.c > index){
                //         cell.c += len;
                //     }
                // }
                for(var i = 0; i < celldata.length; i++){
                    var cell = celldata[i];
                    if(cell.c > index){
                        cell.c += len;
                    }
                }
                file.column += len;
            }

            var mtype;
            if(rc == "r"){
                mtype = "row";
            }
            else{
                mtype = "column";
            }
            // mst = index;
            // med = index + len - 1;
            //console.log(rc,mtype, mst, med);
            luckysheet.luckysheetextendtable(mtype, index, len, true);

            // var ret = [];
            // for(var i=0;i<celldata.length;i++){
            //     if(celldata[i]!=null){
            //         ret.push(celldata[i]);
            //     }
            // }
            // file.celldata = ret;
        }
        else if(type == "na"){
            luckysheet.server.saveParam("na", null, value);
        }
        else if(type == "thumb"){
            setTimeout(function(){
                _this.imageRequest();
            }, 2000);
        }
    }
}