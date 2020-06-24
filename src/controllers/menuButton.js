export const menuButton = {
    "menu":'<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-menuButton ${subclass} luckysheet-mousedown-cancel" id="luckysheet-icon-${id}-menuButton">${item}</div>',
    "item":'<div itemvalue="${value}" itemname="${name}" class="luckysheet-cols-menuitem ${sub} luckysheet-mousedown-cancel"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel" style="padding: 3px 0px 3px 1px;"><span style="margin-right:3px;width:13px;display:inline-block;" class="icon luckysheet-mousedown-cancel"></span> ${name} <span class="luckysheet-submenu-arrow luckysheet-mousedown-cancel" style="user-select: none;">${example}</span></div></div>',
    "split":'<div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div>',
    "color":'<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-mousedown-cancel luckysheet-menuButton ${sub}" id="${id}"><div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel luckysheet-color-reset"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">重置颜色</div></div> <div class="luckysheet-mousedown-cancel"> <div class="luckysheet-mousedown-cancel"> <input type="text" class="luckysheet-color-selected" /> </div> </div> <div class="luckysheet-menuseparator luckysheet-mousedown-cancel" role="separator"></div> ${coloritem}</div>',
    "coloritem":'<div class="luckysheet-cols-menuitem luckysheet-mousedown-cancel ${class}"><div class="luckysheet-cols-menuitem-content luckysheet-mousedown-cancel">${name}</div></div>',
    "subcolor":'<div id="luckysheet-icon-${id}-menuButton" class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-rightgclick-menu-sub luckysheet-menuButton-sub luckysheet-mousedown-cancel"> <div class="luckysheet-mousedown-cancel"> <div class="luckysheet-mousedown-cancel"> <input type="text" class="luckysheet-color-selected" /> </div> </div></div>',
    "rightclickmenu":null,
    "submenuhide":null,
    "focus":function($obj, value){
        $obj.find(".luckysheet-cols-menuitem").find("span.icon").html("");
        if(value==null){
            $obj.find(".luckysheet-cols-menuitem").eq(0).find("span.icon").html('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
        }
        else{
            $obj.find(".luckysheet-cols-menuitem[itemvalue='"+ value +"']").find("span.icon").html('<i class="fa fa-check luckysheet-mousedown-cancel"></i>');
        }
    },
    "createButtonMenu":function(itemdata){
        var itemset = "";
        var _this = this;
        for(var i=0;i<itemdata.length;i++){
            var item = itemdata[i];
            if(item.value=="split"){
                itemset += _this.split;
            }
            else{
                if(item.example=="more"){
                    itemset += luckysheet.replaceHtml(_this.item, {"value":item.value, "name":item.text, "example":"►", "sub":"luckysheet-cols-submenu"});
                }
                else{
                    itemset += luckysheet.replaceHtml(_this.item, {"value":item.value, "name":item.text, "example":item.example, "sub":""});
                }
            }
        }
        return itemset;
    },
    cancelPaintModel:function(){
        var _this = this;
        $("#luckysheet-sheettable_0").removeClass("luckysheetPaintCursor");

        if(luckysheet_copy_save["dataSheetIndex"] == luckysheet.currentSheetIndex){
            luckysheet_selection_range = [];
            luckysheet.selectionCopyShow();
        }
        else{
            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet_copy_save["dataSheetIndex"])].luckysheet_selection_range = [];
        }
        
        luckysheet_copy_save = {};

        _this.luckysheetPaintModelOn = false;
        $("#luckysheetpopover").fadeOut(200,function(){
            $("#luckysheetpopover").remove();
        });
    },
    luckysheetPaintModelOn:false,
    luckysheetPaintSingle: false,
    "initialMenuButton": function(){
        
        var _this = this;

        //格式刷
        $("#luckysheet-icon-paintformat").click(function(){
            if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
                if(luckysheet.isEditMode()){
                    alert("请选择需要复制格式的区域");
                }
                else{
                    luckysheet.tooltip.info("提示","请选择需要复制格式的区域");
                }
                return;
            }
            else if(luckysheet_select_save.length > 1){
                if(luckysheet.isEditMode()){
                    alert("无法对多重选择区域执行此操作");
                }
                else{
                    luckysheet.tooltip.info("提示","无法对多重选择区域执行此操作");
                }
                return;
            }

            luckysheet.tooltip.popover("<i class='fa fa-paint-brush'></i> 格式刷开启", "topCenter", true, null, "ESC键退出",function(){
                //alert("关闭格式刷");
                // $("#luckysheet-sheettable_0").removeClass("luckysheetPaintCursor");
                // $("#luckysheet-selection-copy").hide();
                // luckysheet_selection_range=null;
                _this.cancelPaintModel();
            });
            $("#luckysheet-sheettable_0").addClass("luckysheetPaintCursor");

            luckysheet_selection_range = [{ "row": luckysheet_select_save[0].row, "column": luckysheet_select_save[0].column }];
            luckysheet.selectionCopyShow();

            var RowlChange = false, HasMC = false;
            for(var r = luckysheet_select_save[0].row[0]; r <= luckysheet_select_save[0].row[1]; r++){
                if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                    continue;
                }

                if (config["rowlen"] != null && (r in config["rowlen"])){
                    RowlChange = true;
                }

                for(var c = luckysheet_select_save[0].column[0]; c <= luckysheet_select_save[0].column[1]; c++){
                    var cell = luckysheet.flowdata[r][c];
                    
                    if(luckysheet.getObjType(cell) == "object" && ("mc" in cell) && cell.mc.rs != null){
                        HasMC = true;
                    }
                }
            }
            luckysheet_copy_save = { "dataSheetIndex": luckysheet.currentSheetIndex, "copyRange": [{ "row": luckysheet_select_save[0].row, "column": luckysheet_select_save[0].column }], "RowlChange": RowlChange, "HasMC": HasMC };

            _this.luckysheetPaintModelOn = true;
            _this.luckysheetPaintSingle = true;
        });
        $("#luckysheet-icon-paintformat").dblclick(function(){
            if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
                if(luckysheet.isEditMode()){
                    alert("请选择需要复制格式的区域");
                }
                else{
                    luckysheet.tooltip.info("提示","请选择需要复制格式的区域");  
                }
                return;
            }
            else if(luckysheet_select_save.length > 1){
                if(luckysheet.isEditMode()){
                    alert("无法对多重选择区域执行此操作");
                }
                else{
                    luckysheet.tooltip.info("提示","无法对多重选择区域执行此操作");
                }
                return;
            }

            luckysheet.tooltip.popover("<i class='fa fa-paint-brush'></i> 格式刷开启", "topCenter", true, null, "ESC键退出",function(){
                //alert("关闭格式刷");
                // $("#luckysheet-sheettable_0").removeClass("luckysheetPaintCursor");
                // $("#luckysheet-selection-copy").hide();
                // luckysheet_selection_range=null;
                _this.cancelPaintModel();
            });
            $("#luckysheet-sheettable_0").addClass("luckysheetPaintCursor");

            luckysheet_selection_range = [{ "row": luckysheet_select_save[0].row, "column": luckysheet_select_save[0].column }];
            luckysheet.selectionCopyShow();

            var RowlChange = false, HasMC = false;
            for(var r = luckysheet_select_save[0].row[0]; r <= luckysheet_select_save[0].row[1]; r++){
                if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                    continue;
                }

                if (config["rowlen"] != null && (r in config["rowlen"])){
                    RowlChange = true;
                }

                for(var c = luckysheet_select_save[0].column[0]; c <= luckysheet_select_save[0].column[1]; c++){
                    var cell = luckysheet.flowdata[r][c];
                    
                    if(luckysheet.getObjType(cell) == "object" && ("mc" in cell) && cell.mc.rs != null){
                        HasMC = true;
                    }
                }
            }
            luckysheet_copy_save = { "dataSheetIndex": luckysheet.currentSheetIndex, "copyRange": [{ "row": luckysheet_select_save[0].row, "column": luckysheet_select_save[0].column }], "RowlChange": RowlChange, "HasMC": HasMC };
            
            _this.luckysheetPaintModelOn = true;
            _this.luckysheetPaintSingle = false;
        });

        //货币格式
        $("#luckysheet-icon-currency").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);//取数据

            _this.updateFormat(d, "ct", "¥ #.00");
        });

        //百分比
        $("#luckysheet-icon-percent").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);//取数据

            _this.updateFormat(d, "ct", "0.00%");
        });

        //减少小数位数
        $("#luckysheet-icon-fmt-decimal-decrease").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);//取数据
            var row_index = luckysheet_select_save[0]["row_focus"], 
                col_index = luckysheet_select_save[0]["column_focus"];
            var foucsStatus = _this.checkstatus(d, row_index, col_index, "ct");
            var cell = d[row_index][col_index];

            if(foucsStatus == null || foucsStatus.t != "n"){
                return;
            }

            if(foucsStatus.fa == "General"){
                var mask = luckysheet.mask.genarate(cell.v);
                foucsStatus = mask[1];
            }

            //万亿格式
            var reg = /^(w|W)((0?)|(0\.0+))$/;
            if(reg.test(foucsStatus.fa)){
                if(foucsStatus.fa.indexOf(".") > -1){
                    if(foucsStatus.fa.substr(-2) == ".0"){
                        _this.updateFormat(d, "ct", foucsStatus.fa.split(".")[0]);
                    }
                    else{
                        _this.updateFormat(d, "ct", foucsStatus.fa.substr(0, foucsStatus.fa.length - 1));   
                    }
                }
                else{
                    _this.updateFormat(d, "ct", foucsStatus.fa);
                }

                return;
            }

            var prefix = "", main = "";
            if(foucsStatus.fa.indexOf(".")>-1){
                fa = foucsStatus.fa.split(".");
                prefix = fa[0];
                main = fa[1];
            }
            else{
                return;
            }

            var fa = main.split("");
            var tail = "";
            for(i=fa.length-1;i>=0;i--){
                var c = fa[i];
                if((c!="#" && c!="0" && c!="," && isNaN(parseInt(c)))) {
                    tail = c + tail;
                }
                else{
                    break;
                }
            }

            var fmt = "";
            if(foucsStatus.fa.indexOf(".")>-1){
                var suffix = main;
                if(tail.length>0){
                    suffix = main.replace(tail, "");
                }

                var pos = suffix.replace(/#/g, "0");
                pos = pos.substr(0, pos.length-1);
                if(pos==""){
                    fmt = prefix + tail;
                }
                else{
                    fmt = prefix + "." + pos + tail;
                }
            }

            _this.updateFormat(d, "ct", fmt);
        });

        //增加小数位数
        $("#luckysheet-icon-fmt-decimal-increase").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);//取数据
            var row_index = luckysheet_select_save[0]["row_focus"], 
                col_index = luckysheet_select_save[0]["column_focus"];
            var foucsStatus = _this.checkstatus(d, row_index, col_index, "ct");
            var cell = d[row_index][col_index];

            if(foucsStatus== null || foucsStatus.t != "n"){
                return;
            }

            if(foucsStatus.fa == "General"){
                var mask = luckysheet.mask.genarate(cell.v);
                foucsStatus = mask[1];
            }

            if(foucsStatus.fa == "General"){
                _this.updateFormat(d, "ct", "#.0");
                return;
            }

            //万亿格式
            var reg = /^(w|W)((0?)|(0\.0+))$/;
            if(reg.test(foucsStatus.fa)){
                if(foucsStatus.fa.indexOf(".") > -1){
                    _this.updateFormat(d, "ct", foucsStatus.fa + "0");
                }
                else{
                    if(foucsStatus.fa.substr(-1) == "0"){
                        _this.updateFormat(d, "ct", foucsStatus.fa + ".0");
                    }
                    else{
                        _this.updateFormat(d, "ct", foucsStatus.fa + "0.0");
                    }
                }

                return;
            }

            var prefix = "", main = "";
            if(foucsStatus.fa.indexOf(".")>-1){
                fa = foucsStatus.fa.split(".");
                prefix = fa[0];
                main = fa[1];
            }
            else{
                main = foucsStatus.fa;
            }

            var fa = main.split("");
            var tail = "";
            for(i=fa.length-1;i>=0;i--){
                var c = fa[i];
                if(( c!="#" && c!="0" && c!="," && isNaN(parseInt(c)))) {
                    tail = c + tail;
                }
                else{
                    break;
                }
            }

            var fmt = "";
            if(foucsStatus.fa.indexOf(".")>-1){
                var suffix = main;
                if(tail.length>0){
                    suffix = main.replace(tail, "");
                }

                var pos = suffix.replace(/#/g, "0");
                pos += "0";
                fmt = prefix + "." + pos + tail;
            }
            else{
                if(tail.length>0){
                    fmt = main.replace(tail, "") + ".0" + tail;
                }
                else{
                    fmt = main + ".0" + tail;
                }
            }


            _this.updateFormat(d, "ct", fmt);
        });

        //更多格式
        $("#luckysheet-icon-fmt-other").click(function(){
            var menuButtonId = $(this).attr("id")+"-menuButton";
            var $menuButton = $("#"+menuButtonId);
            if($menuButton.length == 0){
                var itemdata = [
                    { "text": "自动", "value": "General", "example": "" },
                    { "text": "纯文本", "value": "@", "example": "" },
                    { "text": "", "value": "split", "example": "" },
                    { "text": "数字", "value": "##0.00", "example": "1000.12" },
                    { "text": "百分比", "value": "#0.00%", "example": "12.21%" },
                    { "text": "科学计数", "value": "0.00E+00", "example": "1.01E+5" },
                    { "text": "", "value": "split", "example": "" },
                    { "text": "会计", "value": "¥(0.00)", "example": "¥(1200.09)" },
                    //{ "text": "财务", "value": "(#.####)", "example": "(1200.09)" },
                    { "text": "万元", "value": "w", "example": "1亿2000万2500" },
                    { "text": "货币", "value": "¥0.00", "example": "¥1200.09" },
                    //{ "text": "货币整数", "value": "¥####", "example": "¥1200" },
                    { "text": "万元2位小数", "value": "w0.00", "example": "2万2500.55" },
                    { "text": "", "value": "split", "example": "" },
                    { "text": "日期", "value": "yyyy-MM-dd", "example": "2017-11-29" },
                    { "text": "时间", "value": "hh:mm AM/PM", "example": "3:00 PM" },
                    { "text": "时间24H", "value": "hh:mm", "example": "15:00" },
                    { "text": "日期时间", "value": "yyyy-MM-dd hh:mm AM/PM", "example": "2017-11-29 3:00 PM" },
                    { "text": "日期时间24H", "value": "yyyy-MM-dd hh:mm", "example": "2017-11-29 15:00" },
                    { "text": "", "value": "split", "example": "" },
                    { "text": "自定义格式", "value": "fmtOtherSelf", "example": "more" }
                ];

                var itemset = _this.createButtonMenu(itemdata);

                // luckysheet-menuButton-sub
                var menu = luckysheet.replaceHtml(_this.menu, {"id":"fmt-other", "item": itemset, "subclass":"", "sub":""});

                var subitemdata = [
                    {"text":"更多货币格式...", "value":"morecurrency", "example":""},
                    {"text":"更多日期与时间格式...", "value":"moredatetime", "example":""},
                    {"text":"更多数字格式...", "value":"moredigit", "example":""}
                ];
                var subitemset = _this.createButtonMenu(subitemdata);
                var submenu = luckysheet.replaceHtml(_this.menu, {"id":"fmtOtherSelf", "item": subitemset, "subclass":"luckysheet-menuButton-sub"});
                //luckysheet-icon-fmt-other-menuButton_sub
                $("body").append(menu+submenu);
                $menuButton = $("#"+menuButtonId).width(250);
                _this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(itemvalue == "fmtOtherSelf"){
                        return;
                    }

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);//取数据
                    _this.focus($menuButton, itemvalue);

                    _this.updateFormat(d, "ct", itemvalue);
                });

                //更多格式
                $("#luckysheet-icon-fmtOtherSelf-menuButton").find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#luckysheet-icon-fmtOtherSelf-menuButton").hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var itemvalue = $(this).attr("itemvalue");

                    luckysheet.moreFormat.createDialog(itemvalue);
                    luckysheet.moreFormat.init();
                })
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen>userlen && (tlen + menuleft)>$("#"+container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top+25, "lefttop");
        });

        //字体设置
        $("#luckysheet-icon-font-family").click(function(){
            var menuButtonId = $(this).attr("id")+"-menuButton";
            var $menuButton = $("#"+menuButtonId);
            if($menuButton.length == 0){
                var itemdata = [
                    { "value": "0", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:微软雅黑'>微软雅黑</span>", "example": "" },
                    { "value": "1", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:宋体'>宋体</span>", "example": "" },
                    { "value": "2", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:黑体'>黑体</span>", "example": "" },
                    { "value": "3", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:楷体'>楷体</span>", "example": "" },
                    { "value": "4", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:仿宋'>仿宋</span>", "example": "" },
                    { "value": "5", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:新宋体'>新宋体</span>", "example": "" },
                    { "value": "6", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:华文新魏'>华文新魏</span>", "example": "" },
                    { "value": "7", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:华文行楷'>华文行楷</span>", "example": "" },
                    { "value": "8", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:华文隶书'>华文隶书</span>", "example": "" },
                    { "value": "9", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:Arial'>Arial</span>", "example": "" },
                    { "value": "10", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:Times New Roman'>Times New Roman</span>", "example": "" },
                    { "value": "11", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:Tahoma'>Tahoma</span>", "example": "" },
                    { "value": "12", "text": "<span class='luckysheet-mousedown-cancel' style='font-size:16px;font-family:Verdana'>Verdana</span>", "example": "" }
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, {"id": "font-family", "item": itemset, "subclass":"", "sub": ""});

                $("body").append(menu);
                $menuButton = $("#"+menuButtonId).width(150);
                _this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue"), itemname = $t.attr("itemname");
                    _this.focus($menuButton, itemvalue);
                    $("#luckysheet-icon-font-family").find(".luckysheet-toolbar-menu-button-caption").html(" "+ itemname +" ");

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

                    _this.updateFormat(d, "ff", itemvalue);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen>userlen && (tlen + menuleft)>$("#"+container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top+25, "lefttop");
        });

        //字体颜色
        $("#luckysheet-icon-text-color").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var color =  $(this).attr("color");
            if(color==null){
                color = "#000000";
            }
            _this.updateFormat(d, "fc", color);
        });

        
        $("#luckysheet-icon-text-color-menu").click(function(){
            var menuButtonId = $(this).attr("id")+"-menuButton";
            var $menuButton = $("#"+menuButtonId);
            console.log($menuButton.length);
            if($menuButton.length==0){
                var itemdata = [
                    {"name":"交替颜色...", "id":"luckysheet-color-alternate", "example":""}
                ];

                var itemset = _this.createButtonMenu(itemdata);
                var subid = "text-color-self";
                var coloritem = luckysheet.replaceHtml(_this.coloritem, {"class":"luckysheet-icon-alternateformat", "name":"交替颜色..."});
                // luckysheet-menuButton-sub
                var menu = luckysheet.replaceHtml(_this.color, {"id":menuButtonId, "coloritem": coloritem, "colorself":subid, "sub":""});

                //var submenu = luckysheet.replaceHtml(_this.subcolor, {"id": subid,  "subclass":"luckysheet-menuButton-sub"});
                //luckysheet-icon-fmt-other-menuButton_sub
                $("body").append(menu);
                $menuButton = $("#"+menuButtonId);

                // $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                //     var $t = $(this), itemvalue = $t.attr("itemvalue");
                //     if(itemvalue=="fmtOtherSelf"){
                //         return;
                //     }
                //     _this.focus($menuButton, itemvalue);
                //     $menuButton.hide();
                // });

                //console.log(111)

                $("#"+ menuButtonId).find(".luckysheet-color-selected").spectrum({
                    showPalette: true,
                    showPaletteOnly:true,
                    preferredFormat: "hex",
                    clickoutFiresChange: false,
                    showInitial: true,
                    showInput: true,
                    flat: true,
                    hideAfterPaletteSelect: true,
                    showSelectionPalette: true,
                    maxPaletteSize: 8,
                    maxSelectionSize: 8,
                    cancelText: "取消",
                    chooseText: "确定颜色",
                    togglePaletteMoreText: "自定义",
                    togglePaletteLessText: "收起",
                    togglePaletteOnly: true,
                    clearText: "清除颜色选择",
                    color:"#000",
                    noColorSelectedText: "没有颜色被选择",
                    localStorageKey: "spectrum.textcolor" + luckysheet.server.gridKey,
                    palette: [["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
                    ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
                    ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
                    ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
                    ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
                    ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
                    ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
                    ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]],
                    change: function (color) {
                        var $input = $(this);
                        if (color != null) {
                            color = color.toHexString();
                        }
                        else {
                            color = "#000";
                        }

                        var oldcolor = null;
                        $("#luckysheet-icon-text-color .luckysheet-color-menu-button-indicator").css("border-bottom-color", color);
                        // var $input = $("#"+ menuButtonId).find(".luckysheet-color-selected");
                        // $input.spectrum("set", $input.val());
                        $("#luckysheet-icon-text-color").attr("color", color);

                        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                        _this.updateFormat(d, "fc", color);

                        $menuButton.hide();
                        $("#" + container).attr("tabindex", 0).focus();
                    },
                });

                $menuButton.find(".luckysheet-color-reset").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $input = $("#"+ menuButtonId).find(".luckysheet-color-selected");
                    $input.val("#000000");
                    $("#luckysheet-icon-text-color").attr("color", null);
                    $input.spectrum("set", "#000000");
                    $("#luckysheet-icon-text-color .luckysheet-color-menu-button-indicator").css("border-bottom-color", "#000000");
                    
                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "fc", null);
                });

                //交替颜色
                $menuButton.find(".luckysheet-icon-alternateformat").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    if(luckysheet_select_save.length > 1){
                        if(luckysheet.isEditMode()){
                            alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                        }
                        else{
                            luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                        }
                        return;
                    }

                    var range = $.extend(true, {}, luckysheet_select_save[0]);

                    var isExists = luckysheet.alternateformat.rangeIsExists(range)[0];
                    if(!isExists){
                        luckysheet.alternateformat.modelfocusIndex = 0;
                        luckysheet.alternateformat.new(range);    
                    }

                    luckysheet.alternateformat.init();
                    luckysheet.alternateformat.perfect();
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen>userlen && (tlen + menuleft)>$("#"+container).width()){
                menuleft = menuleft - tlen + userlen;
            }

            var offsetTop = $(this).offset().top+26;
            setTimeout(function(){
                var $input = $("#"+ menuButtonId).find(".luckysheet-color-selected");
                $input.spectrum("set", $input.val());
                mouseclickposition($menuButton, menuleft-28, offsetTop, "lefttop");
            }, 1);
            
        });

        
        //背景颜色
        $("#luckysheet-icon-cell-color").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var color =  $(this).attr("color");
            if(color == null){
                color = "#ffffff";
            }
            _this.updateFormat(d, "bg", color);
        });


        $("#luckysheet-icon-cell-color-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var subid = "cell-color-self";
                var coloritem = luckysheet.replaceHtml(_this.coloritem, { "class": "luckysheet-icon-alternateformat", "name": "交替颜色..." });
                var menu = luckysheet.replaceHtml(_this.color, { "id": menuButtonId, "coloritem": coloritem, "colorself": subid, "sub": "" });
                
                $("body").append(menu);
                $menuButton = $("#" + menuButtonId);

                $("#" + menuButtonId).find(".luckysheet-color-selected").spectrum({
                    showPalette: true,
                    showPaletteOnly: true,
                    preferredFormat: "hex",
                    clickoutFiresChange: false,
                    showInitial: true,
                    showInput: true,
                    flat: true,
                    hideAfterPaletteSelect: true,
                    showSelectionPalette: true,
                    maxPaletteSize: 8,
                    maxSelectionSize: 8,
                    color: "#fff",
                    cancelText: "取消",
                    chooseText: "确定颜色",
                    togglePaletteMoreText: "自定义",
                    togglePaletteLessText: "收起",
                    togglePaletteOnly: true,
                    clearText: "清除颜色选择",
                    noColorSelectedText: "没有颜色被选择",
                    localStorageKey: "spectrum.bgcolor" + luckysheet.server.gridKey,
                    palette: [
                        ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                        ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                        ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                        ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                        ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                        ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                        ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                        ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                    ],
                    change: function (color) {
                        var $input = $(this);
                        if (color != null) {
                            color = color.toHexString();
                        }
                        else {
                            color = "#fff";
                        }

                        var oldcolor = null;
                        $("#luckysheet-icon-cell-color .luckysheet-color-menu-button-indicator").css("border-bottom-color", color);
                        
                        $("#luckysheet-icon-cell-color").attr("color", color);
                        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                        _this.updateFormat(d, "bg", color);

                        $menuButton.hide();
                        $("#" + container).attr("tabindex", 0).focus();
                    }
                });

                $menuButton.find(".luckysheet-color-reset").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $input = $("#" + menuButtonId).find(".luckysheet-color-selected");
                    $input.val("#ffffff");
                    $("#luckysheet-icon-cell-color").attr("color", null);
                    $input.spectrum("set", "#ffffff");
                    $("#luckysheet-icon-cell-color .luckysheet-color-menu-button-indicator").css("border-bottom-color", "#ffffff");
                    
                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "bg", null);
                });

                //交替颜色
                $menuButton.find(".luckysheet-icon-alternateformat").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    if(luckysheet_select_save.length > 1){
                        if(luckysheet.isEditMode()){
                            alert("不能对多重选择区域执行此操作，请选择单个区域，然后再试");
                        }
                        else{
                            luckysheet.tooltip.info("不能对多重选择区域执行此操作，请选择单个区域，然后再试", "");
                        }
                        return;
                    }

                    var range = $.extend(true, {}, luckysheet_select_save[0]);

                    var isExists = luckysheet.alternateformat.rangeIsExists(range)[0];
                    if(!isExists){
                        luckysheet.alternateformat.modelfocusIndex = 0;
                        luckysheet.alternateformat.new(range);    
                    }

                    luckysheet.alternateformat.init();
                    luckysheet.alternateformat.perfect();
                });

                $("#" + menuButtonId).find(".luckysheet-color-selected").val("#fff");
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }

            var offsetTop = $(this).offset().top + 26;
            setTimeout(function(){
                var $input = $("#"+ menuButtonId).find(".luckysheet-color-selected");
                $input.spectrum("set", $input.val());
                mouseclickposition($menuButton, menuleft - 28, offsetTop, "lefttop");
            }, 1);
        });


        //字体大小
        var luckysheet_fs_setTimeout = null;
        $("#luckysheet-icon-font-size").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    { "text": "9", "value": "9", "example": "" },
                    { "text": "10", "value": "10", "example": "" },
                    { "text": "11", "value": "11", "example": "" },
                    { "text": "12", "value": "12", "example": "" },
                    { "text": "14", "value": "14", "example": "" },
                    { "text": "16", "value": "16", "example": "" },
                    { "text": "18", "value": "18", "example": "" },
                    { "text": "20", "value": "20", "example": "" },
                    { "text": "22", "value": "22", "example": "" },
                    { "text": "24", "value": "24", "example": "" },
                    { "text": "26", "value": "26", "example": "" },
                    { "text": "28", "value": "28", "example": "" },
                    { "text": "36", "value": "36", "example": "" },
                    { "text": "48", "value": "48", "example": "" },
                    { "text": "72", "value": "72", "example": "" }
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "font-size", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(150);
                _this.focus($menuButton, 10);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue"), $input = $("#luckysheet-icon-font-size input");
                    $("#luckysheet-icon-font-size").attr("itemvalue", itemvalue);
                    _this.focus($menuButton, itemvalue);
                    $input.val(itemvalue);

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "fs", itemvalue);
                    
                    clearTimeout(luckysheet_fs_setTimeout);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var defualtvalue = $("#luckysheet-icon-font-size").attr("itemvalue");
            if(defualtvalue == null){
                defualtvalue = 10;
            }
            _this.focus($menuButton, defualtvalue);

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top + 25, "lefttop");
        })
        // .find("input.luckysheet-toolbar-textinput").blur(function(){
        //     var itemvalue = parseInt($(this).val());
        //     var $menuButton = $("#luckysheet-icon-font-size-menuButton");
        //     _this.focus($menuButton, itemvalue);
        //     var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
        //     _this.updateFormat(d, "fs", itemvalue);
        //     luckysheet_fs_setTimeout = setTimeout(function(){
        //         $menuButton.hide();
        //     }, 200);
        // });

        //边框设置
        $("#luckysheet-icon-border-all").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

            var type = $(this).attr("type");
            if(type == null){
                type = "border-all";
            }

            var subcolormenuid = "luckysheet-icon-borderColor-menuButton";
            var color = $("#" + subcolormenuid).find(".luckysheet-color-selected").val();
            var style = $("#luckysheetborderSizepreview").attr("itemvalue");

            if(color == null || color == ""){
                color = "#000";
            }

            if(style == null || style == ""){
                style = "1";
            }

            var cfg = $.extend(true, {}, config);
            if(cfg["borderInfo"] == null){
                cfg["borderInfo"] = [];
            }

            var borderInfo = {
                "rangeType": "range",
                "borderType": type,
                "color": color,
                "style": style,
                "range": luckysheet_select_save
            }

            cfg["borderInfo"].push(borderInfo);

            if (clearjfundo) {
                luckysheet.jfundo = [];

                var redo = [];

                redo["type"] = "borderChange";

                redo["config"] = $.extend(true, {}, config);
                redo["curconfig"] = $.extend(true, {}, cfg);
                
                redo["sheetIndex"] = luckysheet.currentSheetIndex;

                luckysheet.jfredo.push(redo);
            }

            luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["borderInfo"], { "k": "borderInfo" });

            config = cfg;
            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

            setTimeout(function () {
                luckysheet.luckysheetrefreshgrid();
            }, 1);
        });

        $("#luckysheet-icon-border-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);

            if($menuButton.length == 0){
                var canvasH = 10, canvasW = 120;

                var itemdata = [
                    {"text": "上框线", "value": "border-top", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-top" style="user-select: none;"> </div> </div>'},
                    {"text": "下框线", "value":"border-bottom", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-bottom" style="user-select: none;"> </div> </div>'},
                    {"text": "左框线", "value":"border-left", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-left" style="user-select: none;"> </div> </div>'},
                    {"text": "右框线", "value":"border-right", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-right" style="user-select: none;"> </div> </div>'},
                    {"text": "", "value": "split", "example":""},
                    {"text": "无", "value": "border-none", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-none" style="user-select: none;"> </div> </div>'},
                    {"text": "所有", "value": "border-all", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-all" style="user-select: none;"> </div> </div>'},
                    {"text": "外侧", "value": "border-outside", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-outside" style="user-select: none;"> </div> </div>'},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "内侧", "value": "border-inside", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-inside" style="user-select: none;"> </div> </div>'},
                    {"text": "内侧横线", "value": "border-horizontal", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-horizontal" style="user-select: none;"> </div> </div>'},
                    {"text": "内侧竖线", "value": "border-vertical", "example": '<div class="luckysheet-icon luckysheet-inline-block luckysheet-material-icon luckysheet-mousedown-cancel" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-border-vertical" style="user-select: none;"> </div> </div>'},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "<span id='luckysheet-icon-borderColor-linecolor' class='luckysheet-mousedown-cancel' style='border-bottom:3px solid #000;'>边框颜色</span>", "value":"borderColor", "example":"more"},
                    {"text": "边框粗细<img id='luckysheetborderSizepreview' width=100 height=10 src='data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' style='position:absolute;bottom:-5px;right:0px;width:100px;height:10px;'>", "value":"borderSize", "example":"more"}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "border-menu", "item": itemset, "subclass": "", "sub": "" });

                var subitemdata = [
                    {"text": "无边框", "value": "0", "example": ""},
                    {"text": "<canvas type='Thin' class='border-Thin' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "1", "example": ""},
                    {"text": "<canvas type='Hair' class='border-Hair' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "2", "example": ""},
                    {"text": "<canvas type='Dotted' class='border-Dotted' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "3", "example": ""},
                    {"text": "<canvas type='Dashed' class='border-Dashed' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "4", "example": ""},
                    {"text": "<canvas type='DashDot' class='border-DashDot' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "5", "example": ""},
                    {"text": "<canvas type='DashDotDot' class='border-DashDotDot' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "6", "example": ""},
                    // {"text":"<canvas type='Double' class='border-Double' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value":"7", "example":""},
                    {"text": "<canvas type='Medium' class='border-Medium' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "8", "example": ""},
                    {"text": "<canvas type='MediumDashed' class='border-MediumDashed' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "9", "example": ""},
                    {"text": "<canvas type='MediumDashDot' class='border-MediumDashDot' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "10", "example": ""},
                    {"text": "<canvas type='MediumDashDotDot' class='border-MediumDashDotDot' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "11", "example": ""},
                    // {"text":"<canvas type='SlantedDashDot' class='border-SlantedDashDot' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value":"12", "example":""},
                    {"text": "<canvas type='Thick' class='border-Thick' width="+ canvasW +" height="+ canvasH +" style='width:"+ canvasW +"px;height:"+ canvasH +"px;position:static;'></canvas>", "value": "13", "example": ""}
                ];

                var subitemset = _this.createButtonMenu(subitemdata);
                var submenu = luckysheet.replaceHtml(_this.menu, { "id": "borderSize", "item": subitemset, "subclass": "luckysheet-menuButton-sub" });
                var submenuid = "luckysheet-icon-borderSize-menuButton";
                var subcolormenuid = "luckysheet-icon-borderColor-menuButton";
                var colormenu = luckysheet.replaceHtml(_this.color, { "id": subcolormenuid, "coloritem": "", "colorself": "", "sub": "luckysheet-menuButton-sub" });

                $("body").append(menu + colormenu + submenu);
                $menuButton = $("#" + menuButtonId).width(150);
                _this.focus($menuButton, "border-all");

                $("#" + submenuid + " canvas").each(function(i){
                    var type = $(this).attr("type");
                    var itemvalue = $(this).closest(".luckysheet-cols-menuitem").attr("itemvalue");
                    var canvasborder = $(this).addClass("luckysheet-mousedown-cancel").get(0).getContext("2d");
                    canvasborder.translate(0.5, 0.5);

                    _this.setLineDash(canvasborder, itemvalue, "h", 0, 5, 100, 5);
                    
                    canvasborder.strokeStyle = "#000000";
                    canvasborder.stroke();
                    canvasborder.closePath();
                });

                $("#" + submenuid + " .luckysheet-cols-menuitem").click(function(){
                    $("#"+ submenuid).hide();

                    var $t = $(this), 
                        itemvalue = $t.attr("itemvalue");
                    
                    if(itemvalue == 0){
                        $("#luckysheetborderSizepreview").attr("src", "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==").attr("itemvalue", null);
                    }
                    else{
                        var bg = $t.find("canvas").get(0).toDataURL("image/png");
                        $("#luckysheetborderSizepreview").attr("src", bg).attr("itemvalue", itemvalue);
                    }
                    
                    _this.focus($("#" + submenuid), itemvalue);
                });

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    if(itemvalue == "borderColor" || itemvalue == "borderSize"){
                        return;
                    }

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);

                    var color = $("#"+ subcolormenuid).find(".luckysheet-color-selected").val();
                    var style = $("#luckysheetborderSizepreview").attr("itemvalue");

                    if(color == null || color == ""){
                        color = "#000";
                    }

                    if(style == null || style == ""){
                        style = "1";
                    }

                    var cfg = $.extend(true, {}, config);
                    if(cfg["borderInfo"] == null){
                        cfg["borderInfo"] = [];
                    }

                    var borderInfo = {
                        "rangeType": "range",
                        "borderType": itemvalue,
                        "color": color,
                        "style": style,
                        "range": luckysheet_select_save
                    }

                    cfg["borderInfo"].push(borderInfo);

                    if (clearjfundo) {
                        luckysheet.jfundo = [];

                        var redo = [];

                        redo["type"] = "borderChange";

                        redo["config"] = $.extend(true, {}, config);
                        redo["curconfig"] = $.extend(true, {}, cfg);
                        
                        redo["sheetIndex"] = luckysheet.currentSheetIndex;

                        luckysheet.jfredo.push(redo);
                    }

                    luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, cfg["borderInfo"], { "k": "borderInfo" });

                    config = cfg;
                    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

                    setTimeout(function () {
                        luckysheet.luckysheetrefreshgrid();
                    }, 1);

                    $("#luckysheet-icon-border-all").attr("type", itemvalue);

                    var $icon = $("#luckysheet-icon-border-all").find(".luckysheet-icon-img-container");
                    $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-" + itemvalue);

                    _this.focus($menuButton, itemvalue);
                });


                $("#" + subcolormenuid).find(".luckysheet-color-selected").spectrum({
                    showPalette: true,
                    showPaletteOnly: true,
                    preferredFormat: "hex",
                    clickoutFiresChange: false,
                    showInitial: true,
                    showInput: true,
                    flat: true,
                    hideAfterPaletteSelect: true,
                    showSelectionPalette: true,
                    maxPaletteSize: 8,
                    maxSelectionSize: 8,
                    color: "#000",
                    cancelText: "取消",
                    chooseText: "确定颜色",
                    togglePaletteMoreText: "自定义",
                    togglePaletteLessText: "收起",
                    togglePaletteOnly: true,
                    clearText: "清除颜色选择",
                    noColorSelectedText: "没有颜色被选择",
                    localStorageKey: "spectrum.bordercolor" + luckysheet.server.gridKey,
                    palette: [
                        ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                        ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                        ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                        ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                        ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                        ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                        ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                        ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
                    ],
                    change: function (color) {
                        var $input = $(this);
                        if (color != null) {
                            color = color.toHexString();
                        }
                        else {
                            color = "#000";
                        }

                        var oldcolor = null;
                        $("#luckysheet-icon-borderColor-linecolor").css("border-bottom-color", color);
                        $("#"+ subcolormenuid).find(".luckysheet-color-selected").val(color);
                    }
                });

                $("#"+ subcolormenuid).find(".luckysheet-color-reset").click(function(){
                    var $input = $("#"+ subcolormenuid).find(".luckysheet-color-selected");
                    $input.val("#000");
                    $("#luckysheet-icon-cell-color").attr("color", null);
                    $input.spectrum("set", "#000");
                    $("#luckysheet-icon-borderColor-linecolor").css("border-bottom-color", "#000");
                    // var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    // _this.updateFormat(d, "bg", null);
                    // $menuButton.hide();
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen>userlen && (tlen + menuleft)>$("#"+container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft-28, $(this).offset().top+25, "lefttop");
        });

        //合并单元格
        $("#luckysheet-icon-merge-button").click(function(){
            if(luckysheet.selectIsOverlap()){
                if(luckysheet.isEditMode()){
                    alert("不能合并重叠区域");
                }
                else{
                    luckysheet.tooltip.info("不能合并重叠区域", "");
                }
                return;
            }

            if(config["merge"] != null){
                var hasPartMC = false;

                for(var s = 0; s < luckysheet_select_save.length; s++){
                    var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                    var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                    hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                    if(hasPartMC){
                        break;
                    }
                }

                if(hasPartMC){
                    if(luckysheet.isEditMode()){
                        alert("无法对部分合并单元格执行此操作");
                    }
                    else{
                        luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                    }
                    return;    
                }
            }

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            _this.updateFormat_mc(d, "mergeAll");
        });

        $("#luckysheet-icon-merge-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "全部合并", "value": "mergeAll", "example": ""},
                    {"text": "垂直合并", "value": "mergeV", "example": ""},
                    {"text": "水平合并", "value": "mergeH", "example": ""},
                    {"text": "取消合并", "value": "mergeCancel", "example": ""}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "merge-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#"+menuButtonId).width(100);
                _this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    if(luckysheet.selectIsOverlap()){
                        if(luckysheet.isEditMode()){
                            alert("不能合并重叠区域");
                        }
                        else{
                            luckysheet.tooltip.info("不能合并重叠区域", "");
                        }
                        return;
                    }

                    if(config["merge"] != null){
                        var hasPartMC = false;

                        for(var s = 0; s < luckysheet_select_save.length; s++){
                            var r1 = luckysheet_select_save[s].row[0], r2 = luckysheet_select_save[s].row[1];
                            var c1 = luckysheet_select_save[s].column[0], c2 = luckysheet_select_save[s].column[1];

                            hasPartMC = luckysheet.hasPartMC(config, r1, r2, c1, c2);

                            if(hasPartMC){
                                break;
                            }
                        }

                        if(hasPartMC){
                            if(luckysheet.isEditMode()){
                                alert("无法对部分合并单元格执行此操作");
                            }
                            else{
                                luckysheet.tooltip.info("无法对部分合并单元格执行此操作", ""); 
                            }
                            return;    
                        }
                    }

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    _this.focus($menuButton, itemvalue);

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat_mc(d, itemvalue);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft - 28, $(this).offset().top + 25, "lefttop");
        });

        //水平对齐
        $("#luckysheet-icon-align").click(function(){
        	var itemvalue = $("#luckysheet-icon-align").attr("type");
        	if(itemvalue == null){
        		itemvalue = "left";
        	}

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            _this.updateFormat(d, "ht", itemvalue);
        });

        $("#luckysheet-icon-align-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "左对齐", "value": "left", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-align-left" style="user-select: none;"> </div> </div>'},
                    {"text": "中间对齐", "value": "center", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-align-center" style="user-select: none;"> </div> </div>'},
                    {"text": "右对齐", "value": "right", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-align-right" style="user-select: none;"> </div> </div>'}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "align-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(120);
                _this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    _this.focus($menuButton, itemvalue);

                    var $icon = $("#luckysheet-icon-align").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                    $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-align-" + itemvalue);

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "ht", itemvalue);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft - 28, $(this).offset().top + 25, "lefttop");
        });

        //垂直对齐
        $("#luckysheet-icon-valign").click(function(){
        	var itemvalue = $("#luckysheet-icon-valign").attr("type");
        	if(itemvalue == null){
        		itemvalue = "bottom";
        	}

            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            _this.updateFormat(d, "vt", itemvalue);
        });

        $("#luckysheet-icon-valign-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "顶部对齐", "value": "top", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-valign-top" style="user-select: none;"> </div> </div>'},
                    {"text": "居中对齐", "value": "middle", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-valign-middle" style="user-select: none;"> </div> </div>'},
                    {"text": "底部对齐", "value": "bottom", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-valign-bottom" style="user-select: none;"> </div> </div>'}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "valign-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(120);
                _this.focus($menuButton, "bottom");

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    _this.focus($menuButton, itemvalue);

                    var $icon = $("#luckysheet-icon-valign").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                    $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-valign-" + itemvalue);

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "vt", itemvalue);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft - 28, $(this).offset().top + 25, "lefttop");
        });

        //文本换行
        $("#luckysheet-icon-textwrap-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "溢出", "value": "overflow", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-textwrap-overflow" style="user-select: none;"> </div> </div>'},
                    {"text": "自动换行", "value": "wrap", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-textwrap-wrap" style="user-select: none;"> </div> </div>'},
                    {"text": "截断", "value": "clip", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-textwrap-clip" style="user-select: none;"> </div> </div>'}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "textwrap-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(120);
                _this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    _this.focus($menuButton, itemvalue);

                    var $icon = $("#luckysheet-icon-textwrap").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                    $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-textwrap-" + itemvalue);

                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "tb", itemvalue);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft - 28, $(this).offset().top + 25, "lefttop");
        });

        //文本旋转
        $("#luckysheet-icon-rotation-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "无旋转", "value": "none", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-none" style="user-select: none;"> </div> </div>'},
                    {"text": "向上倾斜", "value": "angleup", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-angleup" style="user-select: none;"> </div> </div>'},
                    {"text": "向下倾斜", "value": "angledown", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-angledown" style="user-select: none;"> </div> </div>'},
                    {"text": "竖排文字", "value": "vertical", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-vertical" style="user-select: none;"> </div> </div>'},
                    {"text": "向上90°", "value": "rotation-up", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-rotation-up" style="user-select: none;"> </div> </div>'},
                    {"text": "向下90°", "value": "rotation-down", "example": '<div class="luckysheet-icon luckysheet-inline-block" style="user-select: none;opacity:1;"> <div aria-hidden="true" class="luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-rotation-down" style="user-select: none;"> </div> </div>'},
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "rotation-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(120);
                _this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    _this.focus($menuButton, itemvalue);

                    var $icon = $("#luckysheet-icon-rotation").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                    $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-" + itemvalue);
                    
                    var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
                    _this.updateFormat(d, "tr", itemvalue);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft - 28, $(this).offset().top + 25, "lefttop");
        });

        //冻结行列
        $("#luckysheet-icon-freezen-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "冻结首行", "value": "freezenRow", "example": ''},
                    {"text": "冻结首列", "value": "freezenColumn", "example": ''},
                    {"text": "冻结行列", "value": "freezenRC", "example": ''},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "冻结行到选区", "value": "freezenRowRange", "example": ''},
                    {"text": "冻结列到选区", "value": "freezenColumnRange", "example": ''},
                    {"text": "冻结行列到选区", "value": "freezenRCRange", "example": ''},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "取消冻结", "value": "freezenCancel", "example": ''}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "freezen-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(130);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    _this.focus($menuButton, itemvalue);

                    if(itemvalue == "freezenRow"){ //首行冻结
                        var scrollTop = $("#luckysheet-cell-main").scrollTop();
                        var row_st = luckysheet_searcharray(visibledatarow, scrollTop);
                        if(row_st == -1){
                            row_st = 0;
                        }
                        var top = visibledatarow[row_st] - 2 - scrollTop + columeHeaderHeight;
                        var freezenhorizontaldata = [visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_st + 1), top];
                        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

                        if (luckysheetFreezen.freezenverticaldata != null) {
                            luckysheetFreezen.cancelFreezenVertical();
                            luckysheetFreezen.createAssistCanvas();
                            luckysheet.luckysheetrefreshgrid();
                        }

                        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
                        luckysheetFreezen.createAssistCanvas();
                        luckysheet.luckysheetrefreshgrid();
                    }
                    else if(itemvalue == "freezenColumn"){ //首列冻结
                        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                        var col_st = luckysheet_searcharray(visibledatacolumn, scrollLeft);
                        if(col_st == -1){
                            col_st = 0;
                        }
                        var left = visibledatacolumn[col_st] - 2 - scrollLeft + rowHeaderWidth;
                        var freezenverticaldata = [visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_st + 1), left];
                        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

                        if (luckysheetFreezen.freezenhorizontaldata != null) {
                            luckysheetFreezen.cancelFreezenHorizontal();
                            luckysheetFreezen.createAssistCanvas();
                            luckysheet.luckysheetrefreshgrid();
                        }

                        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
                        luckysheetFreezen.createAssistCanvas();
                        luckysheet.luckysheetrefreshgrid();
                    }
                    else if(itemvalue == "freezenRC"){ //首行列冻结
                        var scrollTop = $("#luckysheet-cell-main").scrollTop();
                        var row_st = luckysheet_searcharray(visibledatarow, scrollTop);
                        if(row_st == -1){
                            row_st = 0;
                        }
                        var top = visibledatarow[row_st] - 2 - scrollTop + columeHeaderHeight;
                        var freezenhorizontaldata = [visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_st + 1), top];
                        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

                        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);

                        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                        var col_st = luckysheet_searcharray(visibledatacolumn, scrollLeft);
                        if(col_st == -1){
                            col_st = 0;
                        }
                        var left = visibledatacolumn[col_st] - 2 - scrollLeft + rowHeaderWidth;
                        var freezenverticaldata = [visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_st + 1), left];
                        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

                        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);

                        luckysheetFreezen.createAssistCanvas();
                        luckysheet.luckysheetrefreshgrid();
                    }
                    else if(itemvalue == "freezenRowRange"){ //选区行冻结
                        if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
                            if(luckysheet.isEditMode()){
                                alert("没有选区");
                            }
                            else{
                                luckysheet.tooltip.info("没有选区", "");
                            }

                            return;
                        }
                        
                        var scrollTop = $("#luckysheet-cell-main").scrollTop();
                        var row_st = luckysheet_searcharray(visibledatarow, scrollTop);

                        var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                        var row_focus = last["row_focus"] == null ? last["row"][0] : last["row_focus"];

                        if(row_focus > row_st){
                            row_st = row_focus;
                        }
                        
                        if(row_st == -1){
                            row_st = 0;
                        }

                        var top = visibledatarow[row_st] - 2 - scrollTop + columeHeaderHeight;
                        var freezenhorizontaldata = [visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_st + 1), top];
                        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

                        if (luckysheetFreezen.freezenverticaldata != null) {
                            luckysheetFreezen.cancelFreezenVertical();
                            luckysheetFreezen.createAssistCanvas();
                            luckysheet.luckysheetrefreshgrid();
                        }

                        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
                        luckysheetFreezen.createAssistCanvas();
                        luckysheet.luckysheetrefreshgrid();
                    }
                    else if(itemvalue == "freezenColumnRange"){ //选区列冻结
                        if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
                            if(luckysheet.isEditMode()){
                                alert("没有选区");
                            }
                            else{
                                luckysheet.tooltip.info("没有选区","");
                            }

                            return;
                        }
                        
                        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                        var col_st = luckysheet_searcharray(visibledatacolumn, scrollLeft);

                        var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                        var column_focus = last["column_focus"] == null ? last["column"][0] : last["column_focus"];

                        if(column_focus > col_st){
                            col_st = column_focus;
                        }

                        if(col_st == -1){
                            col_st = 0;
                        }

                        var left = visibledatacolumn[col_st] - 2 - scrollLeft + rowHeaderWidth;
                        var freezenverticaldata = [visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_st + 1), left];
                        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

                        if (luckysheetFreezen.freezenhorizontaldata != null) {
                            luckysheetFreezen.cancelFreezenHorizontal();
                            luckysheetFreezen.createAssistCanvas();
                            luckysheet.luckysheetrefreshgrid();
                        }

                        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
                        luckysheetFreezen.createAssistCanvas();
                        luckysheet.luckysheetrefreshgrid();
                    }
                    else if(itemvalue == "freezenRCRange"){ //选区行列冻结
                        if(luckysheet_select_save == null || luckysheet_select_save.length == 0){
                            if(luckysheet.isEditMode()){
                                alert("没有选区");
                            }
                            else{
                                luckysheet.tooltip.info("没有选区","");
                            }

                            return;
                        }
                        
                        var scrollTop = $("#luckysheet-cell-main").scrollTop();
                        var row_st = luckysheet_searcharray(visibledatarow, scrollTop);

                        var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                        var row_focus = last["row_focus"] == null ? last["row"][0] : last["row_focus"];

                        if(row_focus > row_st){
                            row_st = row_focus;
                        }
                        
                        if(row_st == -1){
                            row_st = 0;
                        }

                        var top = visibledatarow[row_st] - 2 - scrollTop + columeHeaderHeight;
                        var freezenhorizontaldata = [visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_st + 1), top];
                        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

                        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);

                        var scrollLeft = $("#luckysheet-cell-main").scrollLeft();
                        var col_st = luckysheet_searcharray(visibledatacolumn, scrollLeft);

                        var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                        var column_focus = last["column_focus"] == null ? last["column"][0] : last["column_focus"];

                        if(column_focus > col_st){
                            col_st = column_focus;
                        }

                        if(col_st == -1){
                            col_st = 0;
                        }
                        
                        var left = visibledatacolumn[col_st] - 2 - scrollLeft + rowHeaderWidth;
                        var freezenverticaldata = [visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_st + 1), left];
                        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

                        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
                        
                        luckysheetFreezen.createAssistCanvas();
                        luckysheet.luckysheetrefreshgrid();
                    }
                    else if(itemvalue == "freezenCancel"){ //取消冻结
                        if (luckysheetFreezen.freezenverticaldata != null) {
                            luckysheetFreezen.cancelFreezenVertical();
                            luckysheetFreezen.createAssistCanvas();
                            luckysheet.luckysheetrefreshgrid();
                        }

                        if (luckysheetFreezen.freezenhorizontaldata != null) {
                            luckysheetFreezen.cancelFreezenHorizontal();
                            luckysheetFreezen.createAssistCanvas();
                            luckysheet.luckysheetrefreshgrid();
                        }

                        luckysheetFreezen.scrollAdapt();
                    }

                    setTimeout(function(){
                        luckysheet.luckysheetsizeauto();
                    },0);
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft - 68, $(this).offset().top + 25, "lefttop");
        });

        //过滤和排序
        $("#luckysheet-icon-autofilter").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "升序", "value": "asc", "example": '<i style="font-size:14px;" class="fa fa-sort-numeric-asc" aria-hidden="true"></i>'},
                    {"text": "降序", "value": "desc", "example": '<i style="font-size:14px;" class="fa fa-sort-numeric-desc" aria-hidden="true"></i>'},
                    {"text": "自定义排序...", "value": "diysort", "example": '<i style="font-size:14px;" class="fa fa-sort" aria-hidden="true"></i>'},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "筛选", "value": "filter", "example": '<i style="font-size:14px;" class="fa fa-filter" aria-hidden="true"></i>'},
                    {"text": "清除筛选", "value": "clearfilter", "example": '<i style="font-size:14px;" class="fa fa-window-close" aria-hidden="true"></i>'}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, {"id":"autofilter", "item": itemset, "subclass":"", "sub":""});

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(150);
                //_this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    //_this.focus($menuButton, itemvalue);

                    if(itemvalue == "diysort"){
                        $("#luckysheetorderby").click();
                    }
                    else if(itemvalue == "asc"){
                        luckysheet.sortSelection(true);
                    }
                    else if(itemvalue == "desc"){
                        luckysheet.sortSelection(false);
                    }
                    else if(itemvalue == "filter"){
                        if($('#luckysheet-filter-options-sheet' + luckysheet.currentSheetIndex).length > 0){
                            $("#luckysheet-filter-initial").click();
                        }
                        else{
                            luckysheet.createFilter();
                        }
                    }
                    else if(itemvalue == "clearfilter"){
                        $("#luckysheet-filter-initial").click();
                    }
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top + 25, "lefttop");
        });

        //查找和替换
        $("#luckysheet-icon-seachmore").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "查找 ...", "value": "search", "example": '<i style="font-size:14px;" class="fa fa-search" aria-hidden="true"></i>'},
                    {"text": "替换 ...", "value": "replace", "example": '<i style="font-size:14px;" class="fa fa-files-o" aria-hidden="true"></i>'},
                    {"text": "转到 ...", "value": "goto", "example": '<i style="font-size:14px;" class="fa fa-arrow-right" aria-hidden="true"></i>'},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "定位条件 ...", "value": "location", "example": '<i style="font-size:14px;" class="fa fa-location-arrow" aria-hidden="true"></i>'},
                    {"text": "公式", "value": "locationFormula", "example": '定位'},
                    {"text": "日期", "value": "locationConstantDate", "example": '定位'},
                    {"text": "数字", "value": "locationConstantNumber", "example": '定位'},
                    {"text": "字符", "value": "locationConstantString", "example": '定位'},
                    {"text": "错误", "value": "locationConstantError", "example": '定位'},
                    {"text": "条件格式", "value": "locationCF", "example": '定位'},
                    {"text": "间隔行", "value": "locationStepRow", "example": '定位'},
                    {"text": "间隔列", "value": "locationStepColumn", "example": '定位'}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "seachmore", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(150);
                //_this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    //_this.focus($menuButton, itemvalue);

                    if(itemvalue == "search" || itemvalue == "replace"){ //查找替换
                        if(itemvalue == "search"){
                            luckysheet.searchReplace.createDialog(0);
                        }
                        else if(itemvalue == "replace"){
                            luckysheet.searchReplace.createDialog(1);    
                        }
                        
                        luckysheet.searchReplace.init();

                        $("#luckysheet-search-replace #searchInput input").focus();
                    }
                    else if(itemvalue == "location"){ //定位条件
                        luckysheet.locationCell.createDialog();
                        luckysheet.locationCell.init();
                    }
                    else if(itemvalue == "locationFormula" || itemvalue == "locationConstantDate" || itemvalue == "locationConstantNumber" || itemvalue == "locationConstantString" || itemvalue == "locationConstantError" || itemvalue == "locationCF"){ 
                        if(luckysheet_select_save.length == 0 || (luckysheet_select_save.length == 1 && luckysheet_select_save[0].row[0] == luckysheet_select_save[0].row[1] && luckysheet_select_save[0].column[0] == luckysheet_select_save[0].column[1])){
                            //单个单元格
                            var range = [{"row": [0, luckysheet.flowdata.length - 1], "column": [0, luckysheet.flowdata[0].length - 1]}];
                        }
                        else{
                            var range = $.extend(true, [], luckysheet_select_save);
                        }

                        if(itemvalue == "locationFormula"){               //公式
                            luckysheet.locationCell.apply(range, "locationFormula", "all");
                        }
                        else if(itemvalue == "locationConstantDate"){     //日期
                            luckysheet.locationCell.apply(range, "locationConstant", "d");
                        }
                        else if(itemvalue == "locationConstantNumber"){   //数字
                            luckysheet.locationCell.apply(range, "locationConstant", "n");
                        }
                        else if(itemvalue == "locationConstantString"){   //字符
                            luckysheet.locationCell.apply(range, "locationConstant", "s,g");
                        }
                        else if(itemvalue == "locationConstantError"){    //错误
                            luckysheet.locationCell.apply(range, "locationConstant", "e");
                        }
                        else if(itemvalue == "locationCF"){               //条件格式
                            luckysheet.locationCell.apply(range, "locationCF");
                        }
                    }
                    else if(itemvalue == "locationStepRow"){ //间隔行
                        if(luckysheet_select_save.length == 0 || (luckysheet_select_save.length == 1 && luckysheet_select_save[0].row[0] == luckysheet_select_save[0].row[1])){
                            if(luckysheet.isEditMode()){
                                alert("请选择最少两行");
                            }
                            else{
                                luckysheet.tooltip.info("提示", "请选择最少两行"); 
                            }
                            return;                            
                        }

                        var range = $.extend(true, [], luckysheet_select_save);

                        luckysheet.locationCell.apply(range, "locationStepRow");
                    }
                    else if(itemvalue == "locationStepColumn"){ //间隔列
                        if(luckysheet_select_save.length == 0 || (luckysheet_select_save.length == 1 && luckysheet_select_save[0].column[0] == luckysheet_select_save[0].column[1])){
                            if(luckysheet.isEditMode()){
                                alert("请选择最少两列");
                            }
                            else{
                                luckysheet.tooltip.info("提示", "请选择最少两列"); 
                            }
                            return;                            
                        }

                        var range = $.extend(true, [], luckysheet_select_save);

                        luckysheet.locationCell.apply(range, "locationStepColumn");
                    }
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top + 25, "lefttop");
        });

        //公式
        $("#luckysheet-icon-function").click(function(){
            _this.autoSelectionFormula("SUM");
        });

        //公式菜单
        $("#luckysheet-icon-function-menu").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "求和", "value": "SUM", "example": 'SUM'},
                    {"text": "平均值", "value": "AVERAGE", "example": 'AVERAGE'},
                    {"text": "计数", "value": "COUNT", "example": 'COUNT'},
                    {"text": "最大值", "value": "MAX", "example": 'MAX'},
                    {"text": "最小值", "value": "MIN", "example": 'MIN'},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "if公式生成器", "value": "if", "example": 'IF'},
                    {"text": "函数查找 ...", "value": "formula", "example": ""}
                ];

                var itemset = _this.createButtonMenu(itemdata);

                var menu = luckysheet.replaceHtml(_this.menu, { "id": "function-menu", "item": itemset, "subclass": "", "sub": "" });

                $("body").append(menu);
                $menuButton = $("#" + menuButtonId).width(150);
                //_this.focus($menuButton);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    //_this.focus($menuButton, itemvalue);

                    if(itemvalue == "if"){
                        var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                        var r = last["row_focus"] == null ? last["row"][0] : last["row_focus"];
                        var c = last["column_focus"] == null ? last["column"][0] : last["column_focus"];

                        if(!!luckysheet.flowdata[r] && !!luckysheet.flowdata[r][c] && !!luckysheet.flowdata[r][c]["f"]){
                            var fp = luckysheet.flowdata[r][c]["f"].toString();
                            if(fp.indexOf("=if(") != -1){
                                luckysheet.ifFormulaGenerator.ifFormulaDialog(fp);
                            }
                            else{
                                if(luckysheet.isEditMode()){
                                    alert("该单元格函数不属于if公式！");
                                }
                                else{
                                    luckysheet.tooltip.info("该单元格函数不属于if公式！","");
                                }
                                return;
                            }
                        }
                        else{
                            luckysheet.ifFormulaGenerator.ifFormulaDialog();
                        }

                        luckysheet.ifFormulaGenerator.init();
                    }
                    else if(itemvalue == "formula"){
                        //点击函数查找弹出框
                        if(luckysheet_select_save.length == 0){
                            if(luckysheet.isEditMode()){
                                alert("请选择单元格插入函数");
                            }
                            else{
                                luckysheet.tooltip.info("请选择单元格插入函数","");
                            }

                            return;
                        }

                        var last = luckysheet_select_save[luckysheet_select_save.length - 1];

                        var row_index = last["row_focus"], col_index = last["column_focus"];
                        var row = visibledatarow[row_index], row_pre = row_index - 1 == -1 ? 0 : visibledatarow[row_index - 1];
                        var col = visibledatacolumn[col_index], col_pre = col_index - 1 == -1 ? 0 : visibledatacolumn[col_index - 1];

                        luckysheet.luckysheetupdateCell(row, row_pre, row_index, col, col_pre, col_index, luckysheet.flowdata);
                        
                        var cell = luckysheet.flowdata[row_index][col_index];
                        if(cell != null && cell.f != null){
                            //单元格有计算
                            var functionStr = luckysheet.formula.getfunctionParam(cell.f);
                            if(functionStr.fn != null){
                                //有函数公式
                                luckysheet.insertFormula.formulaParmDialog(functionStr.fn, functionStr.param);
                            }
                            else{
                                //无函数公式
                                luckysheet.insertFormula.formulaListDialog();
                            }
                        }
                        else{
                            //单元格无计算
                            $("#luckysheet-rich-text-editor").html('<span dir="auto" class="luckysheet-formula-text-color">=</span>');
                            $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
                            luckysheet.insertFormula.formulaListDialog();
                        }

                        luckysheet.insertFormula.init();
                    }
                    else {
                        _this.autoSelectionFormula(itemvalue);
                    }
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen>userlen && (tlen + menuleft)>$("#"+container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft-48, $(this).offset().top+25, "lefttop");
        });

        //加粗
        $("#luckysheet-icon-bold").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var row_index = luckysheet_select_save[0]["row_focus"], col_index = luckysheet_select_save[0]["column_focus"];
            var foucsStatus = _this.checkstatus(d, row_index, col_index, "bl");

            if(foucsStatus == 1){
                foucsStatus = 0;
            }
            else{
                foucsStatus = 1;
            }

            _this.updateFormat(d, "bl", foucsStatus);

            luckysheet.menuButton.menuButtonFocus(d, row_index, col_index);
        });

        //斜体
        $("#luckysheet-icon-italic").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var row_index = luckysheet_select_save[0]["row_focus"], col_index = luckysheet_select_save[0]["column_focus"];
            var foucsStatus = _this.checkstatus(d, row_index, col_index, "it");

            if(foucsStatus == 1){
                foucsStatus = 0;
            }
            else{
                foucsStatus = 1;
            }

            _this.updateFormat(d, "it", foucsStatus);

            luckysheet.menuButton.menuButtonFocus(d, row_index, col_index);
        });

        //删除线
        $("#luckysheet-icon-strikethrough").click(function(){
            var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
            var row_index = luckysheet_select_save[0]["row_focus"], col_index = luckysheet_select_save[0]["column_focus"];
            var foucsStatus = _this.checkstatus(d, row_index, col_index, "cl");

            if(foucsStatus == 1){
                foucsStatus = 0;
            }
            else{
                foucsStatus = 1;
            }

            _this.updateFormat(d, "cl", foucsStatus);

            luckysheet.menuButton.menuButtonFocus(d, row_index, col_index);
        });

        //条件格式
        $("#luckysheet-icon-conditionformat").click(function(){
            var menuButtonId = $(this).attr("id") + "-menuButton";
            var $menuButton = $("#" + menuButtonId);
            
            if($menuButton.length == 0){
                var itemdata = [
                    {"text": "突出显示单元格规则", "value": "highlightCellRule", "example": "more"},
                    {"text": "项目选取规则", "value": "projectSelectRule", "example": "more"},
                    {"text": "数据条", "value": "dataBar", "example": "more"},
                    {"text": "色阶", "value": "colorGradation", "example": "more"},
                    {"text": "图标集", "value": "icons", "example": ""},
                    {"text": "", "value": "split", "example": ""},
                    {"text": "新建规则", "value": "newRule", "example": ""},
                    {"text": "清除规则", "value": "deleteRule", "example": "more"},
                    {"text": "管理规则", "value": "administerRule", "example": ""}
                ];
                var itemset = _this.createButtonMenu(itemdata);
                var menu = luckysheet.replaceHtml(_this.menu, {"id": "conditionformat", "item": itemset, "subclass": "", "sub": ""});
                
                //突出显示单元格规则子菜单
                var subitemdata = [
                    {"text": "大于", "value": "greaterThan", "example": ">"},
                    {"text": "小于", "value": "lessThan", "example": "<"},
                    {"text": "介于", "value": "betweenness", "example": "[]"},
                    {"text": "等于", "value": "equal", "example": "="},
                    {"text": "文本包含", "value": "textContains", "example": "()"},
                    {"text": "发生日期", "value": "occurrenceDate", "example": "昨天"},
                    {"text": "重复值", "value": "duplicateValue", "example": "##"}
                ];
                var subitemset = _this.createButtonMenu(subitemdata);
                var submenu = luckysheet.replaceHtml(_this.menu, {"id": "highlightCellRule", "item": subitemset, "subclass": "luckysheet-menuButton-sub"});
                
                //项目选取规则子菜单
                var subitemdata2 = [
                    {"text": "前 10 项", "value": "top10", "example": "前10项"},
                    {"text": "前 10%", "value": "top10%", "example": "前10%"},
                    {"text": "最后 10 项", "value": "last10", "example": "后10项"},
                    {"text": "最后 10%", "value": "last10%", "example": "后10%"},
                    {"text": "高于平均值", "value": "AboveAverage", "example": "高于均值"},
                    {"text": "低于平均值", "value": "SubAverage", "example": "低于均值"}
                ];
                var subitemset2 = _this.createButtonMenu(subitemdata2);
                var submenu2 = luckysheet.replaceHtml(_this.menu, {"id": "projectSelectRule", "item": subitemset2, "subclass": "luckysheet-menuButton-sub"});
                
                //数据条子菜单
                var submenu3 = '<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-menuButton luckysheet-menuButton-sub luckysheet-mousedown-cancel" id="luckysheet-icon-dataBar-menuButton" style="width: 126px;padding: 5px;top: 118.5px;left: 1321.48px;display: none;">' +
                                '<div itemvalue="0" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 0;" title="蓝-白渐变数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="1" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px 0;" title="绿-白渐变数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="2" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px 0;" title="红-白渐变数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="3" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 -36px;" title="橙-白渐变数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="4" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px -36px;" title="浅蓝-白渐变数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="5" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px -36px;" title="紫-白渐变数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="6" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 -72px;" title="蓝色数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="7" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px -72px;" title="绿色数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="8" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px -72px;" title="红色数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="9" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 -108px;" title="橙色数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="10" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px -108px;" title="浅蓝色数据条"></div>' +
                                '</div>' +
                                '<div itemvalue="11" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px -108px;" title="紫色数据条"></div>' +
                                '</div>' +
                               '</div>';

                //色阶
                var submenu4 = '<div class="luckysheet-cols-menu luckysheet-rightgclick-menu luckysheet-menuButton luckysheet-menuButton-sub luckysheet-mousedown-cancel" id="luckysheet-icon-colorGradation-menuButton" style="width: 126px;padding: 5px;top: 143.5px;left: 1321.48px;display: none;">' +
                                '<div itemvalue="0" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 0;" title="绿-黄-红色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="1" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px 0;" title="红-黄-绿色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="2" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px 0;" title="绿-白-红色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="3" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -114px 0;" title="红-白-绿色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="4" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 -36px;" title="蓝-白-红色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="5" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px -36px;" title="红-白-蓝色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="6" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px -36px;" title="白-红色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="7" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -114px -36px;" title="红-白色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="8" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: 0 -72px;" title="绿-白色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="9" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -38px -72px;" title="白-绿色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="10" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -76px -72px;" title="绿-黄色阶"></div>' +
                                '</div>' +
                                '<div itemvalue="11" class="luckysheet-cols-menuitem luckysheet-mousedown-cancel" style="width: 28px; height: 26px;padding: 5px;float: left;">' +
                                    '<div class="luckysheet-mousedown-cancel bgImgBox" style="background-position: -114px -72px;" title="黄-绿色阶"></div>' +
                                '</div>' +
                               '</div>';

                //清除规则子菜单
                var subitemdata6 = [
                    // {"text":"清除所选单元格的规则", "value":"", "example":""},
                    {"text":"清除整个工作表的规则", "value":"delSheet", "example":""}
                ];
                var subitemset6 = _this.createButtonMenu(subitemdata6);
                var submenu6 = luckysheet.replaceHtml(_this.menu, {"id": "deleteRule", "item": subitemset6, "subclass":"luckysheet-menuButton-sub"});

                $("body").append(menu + submenu + submenu2 + submenu3 + submenu4 + submenu6);
                $menuButton = $("#"+menuButtonId).width(190);
                $("#luckysheet-icon-highlightCellRule-menuButton").width(130);
                $("#luckysheet-icon-projectSelectRule-menuButton").width(170);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(itemvalue == "icons"){
                        if(luckysheet_select_save.length == 0){
                            if(luckysheet.isEditMode()){
                                alert("请选择应用范围");
                            }
                            else{
                                luckysheet.tooltip.info("请选择应用范围", "");
                            }
                            return;
                        }

                        luckysheet.conditionformat.CFiconsDialog();
                        luckysheet.conditionformat.init();
                    }
                    else if(itemvalue == "newRule"){
                        if(luckysheet_select_save.length == 0){
                            if(luckysheet.isEditMode()){
                                alert("请选择应用范围");
                            }
                            else{
                                luckysheet.tooltip.info("请选择应用范围", "");
                            }
                            return;
                        }

                        luckysheet.conditionformat.newConditionRuleDialog(0);
                        luckysheet.conditionformat.init();
                    }
                    else if(itemvalue == "administerRule"){
                        var loadSheetUrl = luckysheet.server.loadSheetUrl;
                        var file = luckysheet.getluckysheetfile();

                        if(loadSheetUrl != "" && loadSheetUrl != null){
                            var sheetindex = [];
                            for(var i = 0; i < file.length; i++){
                                sheetindex.push(file[i].index);
                            }

                            $.post(loadSheetUrl, {"gridKey" : luckysheet.server.gridKey, "index": sheetindex.join(",")}, function (d) {
                                var dataset = eval("(" + d + ")");

                                setTimeout(function(){
                                    $("#luckysheetloadingdata").fadeOut().remove();
                                }, 500);

                                for(var item in dataset){
                                    if(item == luckysheet.currentSheetIndex){
                                        continue;
                                    }

                                    var otherfile = file[luckysheet.sheetmanage.getSheetIndex(item)];

                                    otherfile.celldata = dataset[item.toString()];
                                    otherfile["data"] = luckysheet.sheetmanage.buildGridData(otherfile);
                                }

                                luckysheet.setluckysheetfile(file);

                                luckysheet.conditionformat.fileClone =  $.extend(true, [], file);
                                luckysheet.conditionformat.administerRuleDialog();
                                luckysheet.conditionformat.init();
                            });
                        }
                        else{
                            luckysheet.conditionformat.fileClone =  $.extend(true, [], file);
                            luckysheet.conditionformat.administerRuleDialog();
                            luckysheet.conditionformat.init();
                        }
                    }
                });

                //突出显示单元格规则子菜单点击事件
                $(document).off("click.CFhighlightCellRule").on("click.CFhighlightCellRule", "#luckysheet-icon-highlightCellRule-menuButton .luckysheet-cols-menuitem", function(){
                    $menuButton.hide();
                    $("#luckysheet-icon-highlightCellRule-menuButton").hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(luckysheet_select_save.length == 0){
                        if(luckysheet.isEditMode()){
                            alert("请选择条件格式的应用范围");
                        }
                        else{
                            luckysheet.tooltip.info("请选择条件格式的应用范围", ""); 
                        }
                        return;
                    }
                    else{
                        var textCellColorHtml = luckysheet.conditionformat.textCellColorHtml;

                        switch(itemvalue){
                            case "greaterThan":
                                var title = "条件格式——大于";
                                var content = '<div class="box" data-itemvalue="greaterThan">' +
                                                '<div class="boxTitleOne">为大于以下值的单元格设置格式：</div>' +
                                                '<div class="inpbox range">' +
                                                    '<input id="conditionVal" class="formulaInputFocus"/>' +
                                                    '<i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' + 
                                                textCellColorHtml + 
                                              '</div>';
                                break;
                            case "lessThan":
                                var title = "条件格式——小于";
                                var content = '<div class="box" data-itemvalue="lessThan">' +
                                                '<div class="boxTitleOne">为小于以下值的单元格设置格式：</div>' +
                                                '<div class="inpbox range">' +
                                                    '<input id="conditionVal" class="formulaInputFocus"/>' +
                                                    '<i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "betweenness":
                                var title = "条件格式——介于";
                                var content = '<div class="box" data-itemvalue="betweenness">' +
                                                '<div class="boxTitleOne">为介于以下值的单元格设置格式：</div>' +
                                                '<div style="height: 30px;line-height: 30px;">' +
                                                    '<div class="inpbox2 range">' +
                                                        '<input id="conditionVal" class="formulaInputFocus"/>' +
                                                        '<i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                    '</div>' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">到</div>' +
                                                    '<div class="inpbox2 range">' +
                                                        '<input id="conditionVal2" class="formulaInputFocus"/>' +
                                                        '<i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "equal":
                                var title = "条件格式——等于";
                                var content = '<div class="box" data-itemvalue="equal">' +
                                                '<div class="boxTitleOne">为等于以下值的单元格设置格式：</div>' +
                                                '<div class="inpbox range">' +
                                                    '<input id="conditionVal" class="formulaInputFocus"/>' +
                                                    '<i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "textContains":
                                var title = "条件格式——文本包含";
                                var content = '<div class="box" data-itemvalue="textContains">' +
                                                '<div class="boxTitleOne">为包含以下文本的单元格设置格式：</div>' +
                                                '<div class="inpbox range">' +
                                                    '<input id="conditionVal" class="formulaInputFocus"/>' +
                                                    '<i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break; 
                            case "occurrenceDate":
                                var title = "条件格式——发生日期";
                                var content = '<div class="box" data-itemvalue="occurrenceDate">' +
                                                '<div class="boxTitleOne">为包含以下日期的单元格设置格式：</div>' +
                                                '<div class="inpbox">' +
                                                    '<input id="daterange-btn" class="formulaInputFocus" readonly="readonly" placeholder="请选择日期"/>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break; 
                            case "duplicateValue":
                                var title = "条件格式——重复值";
                                var content = '<div class="box" data-itemvalue="duplicateValue">' +
                                                '<div class="boxTitleOne">为包含以下类型值的单元格设置格式：</div>' +
                                                '<select id="conditionVal" class="selectbox">' +
                                                    '<option value="0">重复</option>' +
                                                    '<option value="1">唯一</option>' +
                                                '</select>' +
                                                '<span style="margin-left: 5px;">值</span>' +
                                                '<div style="margin:5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;      
                        }

                        luckysheet.conditionformat.conditionformatDialog(title, content); 
                    }
                });

                //项目选取规则子菜单点击事件
                $(document).off("click.CFprojectSelectRule").on("click.CFprojectSelectRule", "#luckysheet-icon-projectSelectRule-menuButton .luckysheet-cols-menuitem", function(){
                    $menuButton.hide();
                    $("#luckysheet-icon-projectSelectRule-menuButton").hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(luckysheet_select_save.length == 0){
                        if(luckysheet.isEditMode()){
                            alert("请选择条件格式的应用范围");
                        }
                        else{
                            luckysheet.tooltip.info("请选择条件格式的应用范围", ""); 
                        }
                        return;
                    }
                    else{
                        var textCellColorHtml = luckysheet.conditionformat.textCellColorHtml;

                        switch(itemvalue){
                            case "top10":
                                var title = "条件格式——前 10 项";
                                var content = '<div class="box" data-itemvalue="top10">' +
                                                '<div class="boxTitleOne">为值最大的那些单元格设置格式：</div>' +
                                                '<div style="height: 30px;line-height: 30px;">' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">前</div>' +
                                                    '<div class="inpbox2">' +
                                                        '<input id="conditionVal" class="formulaInputFocus" type="number" value="10"/>' +
                                                    '</div>' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">项</div>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "top10%":
                                var title = "条件格式——前 10%";
                                var content = '<div class="box" data-itemvalue="top10%">' +
                                                '<div class="boxTitleOne">为值最大的那些单元格设置格式：</div>' +
                                                '<div style="height: 30px;line-height: 30px;">' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">前</div>' +
                                                    '<div class="inpbox2">' +
                                                        '<input id="conditionVal" class="formulaInputFocus" type="number" value="10"/>' +
                                                    '</div>' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">%</div>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "last10":
                                var title = "条件格式——最后 10 项";
                                var content = '<div class="box" data-itemvalue="last10">' +
                                                '<div class="boxTitleOne">为值最小的那些单元格设置格式：</div>' +
                                                '<div style="height: 30px;line-height: 30px;">' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">最后</div>' +
                                                    '<div class="inpbox2">' +
                                                        '<input id="conditionVal" class="formulaInputFocus" type="number" value="10"/>' +
                                                    '</div>' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">项</div>' +
                                                '</div>' +
                                                '<div style="margin: 5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "last10%":
                                var title = "条件格式——最后 10%";
                                var content = '<div class="box" data-itemvalue="last10%">' +
                                                '<div class="boxTitleOne">为值最小的那些单元格设置格式：</div>' +
                                                '<div style="height: 30px;line-height: 30px;">' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">最后</div>' +
                                                    '<div class="inpbox2">' +
                                                        '<input id="conditionVal" class="formulaInputFocus" type="number" value="10"/>' +
                                                    '</div>' +
                                                    '<div style="float: left;height: 30px;line-height: 30px;margin: 0 5px;">%</div>' +
                                                '</div>' +
                                                '<div style="margin:5px 0;">设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break;
                            case "AboveAverage":
                                var title = "条件格式——高于平均值";
                                var content = '<div class="box" data-itemvalue="AboveAverage">' +
                                                '<div class="boxTitleOne">为高于平均值的单元格设置格式：</div>' +
                                                '<div style="margin: 5px 0;">针对选定区域，设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break; 
                            case "SubAverage":
                                var title = "条件格式——低于平均值";
                                var content = '<div class="box" data-itemvalue="SubAverage">' +
                                                '<div class="boxTitleOne">为低于平均值的单元格设置格式：</div>' +
                                                '<div style="margin: 5px 0;">针对选定区域，设置为：</div>' +
                                                textCellColorHtml +
                                              '</div>';
                                break; 
                        }

                        luckysheet.conditionformat.conditionformatDialog(title,content);
                    }
                });

                //数据条子菜单点击事件
                $(document).off("click.CFdataBar").on("click.CFdataBar", "#luckysheet-icon-dataBar-menuButton .luckysheet-cols-menuitem", function(){
                    $menuButton.hide();
                    $("#luckysheet-icon-dataBar-menuButton").hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(luckysheet_select_save.length > 0){
                        var cellrange = $.extend(true, [], luckysheet_select_save);
                        var format = luckysheet.conditionformat.dataBarList[itemvalue]["format"];

                        luckysheet.conditionformat.updateItem("dataBar", cellrange, format);
                    }
                });

                //色阶子菜单点击事件
                $(document).off("click.CFcolorGradation").on("click.CFcolorGradation", "#luckysheet-icon-colorGradation-menuButton .luckysheet-cols-menuitem", function(){
                    $menuButton.hide();
                    $("#luckysheet-icon-colorGradation-menuButton").hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(luckysheet_select_save.length > 0){
                        var cellrange = $.extend(true, [], luckysheet_select_save);
                        var format = luckysheet.conditionformat.colorGradationList[itemvalue]["format"];

                        luckysheet.conditionformat.updateItem("colorGradation", cellrange, format);
                    }
                });

                //清除规则子菜单点击事件
                $(document).off("click.CFdeleteRule").on("click.CFdeleteRule", "#luckysheet-icon-deleteRule-menuButton .luckysheet-cols-menuitem", function(){
                    $menuButton.hide();
                    $("#luckysheet-icon-deleteRule-menuButton").hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");

                    if(itemvalue == "delSheet"){
                        luckysheet.conditionformat.updateItem("delSheet");
                    }
                });
            }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top + 25, "lefttop");
        });

        //批注
        $("#luckysheet-icon-postil").click(function(){
            var menuButtonId = $(this).attr("id")+"-menuButton";
            var $menuButton = $("#" + menuButtonId);

            $menuButton.remove();

            // if($menuButton.length == 0){
                luckysheet.postil.removeActivePs();

                var last = luckysheet_select_save[luckysheet_select_save.length - 1];
                
                var row_index = last["row_focus"];
                if(row_index == null){
                    row_index = last["row"][0];
                }

                var col_index = last["column_focus"];
                if(col_index == null){
                    col_index = last["column"][0];
                }

                if(luckysheet.flowdata[row_index][col_index] != null && luckysheet.flowdata[row_index][col_index].ps != null){
                    var itemdata = [
                        {"text": "编辑批注", "value": "editPs", "example": ""},
                        {"text": "删除", "value": "delPs", "example": ""},
                        {"text": "", "value": "split", "example": ""},
                        {"text": "显示/隐藏批注", "value": "showHidePs", "example": ""},
                        {"text": "显示/隐藏所有批注", "value": "showHideAllPs", "example": ""}
                    ];
                }
                else{
                    var itemdata = [
                        {"text": "新建批注", "value": "newPs", "example": ""},
                        {"text": "", "value": "split", "example": ""},
                        {"text": "显示/隐藏所有批注", "value": "showHideAllPs", "example": ""}
                    ];
                }
                
                var itemset = _this.createButtonMenu(itemdata);
                var menu = luckysheet.replaceHtml(_this.menu, {"id": "postil", "item": itemset, "subclass": "", "sub": ""});
                
                $("body").append(menu);
                $menuButton = $("#"+menuButtonId).width(150);

                $menuButton.find(".luckysheet-cols-menuitem").click(function(){
                    $menuButton.hide();
                    $("#" + container).attr("tabindex", 0).focus();

                    var $t = $(this), itemvalue = $t.attr("itemvalue");
                    
                    if(itemvalue == "newPs"){
                        luckysheet.postil.newPs(row_index, col_index);
                    }
                    else if(itemvalue == "editPs"){
                        luckysheet.postil.editPs(row_index, col_index);
                    }
                    else if(itemvalue == "delPs"){
                        luckysheet.postil.delPs(row_index, col_index);
                    }
                    else if(itemvalue == "showHidePs"){
                        luckysheet.postil.showHidePs(row_index, col_index);
                    }
                    else if(itemvalue == "showHideAllPs"){
                        luckysheet.postil.showHideAllPs();
                    }
                });
            // }

            var userlen = $(this).outerWidth();
            var tlen = $menuButton.outerWidth();

            var menuleft = $(this).offset().left;
            if(tlen > userlen && (tlen + menuleft) > $("#" + container).width()){
                menuleft = menuleft - tlen + userlen;
            }
            mouseclickposition($menuButton, menuleft, $(this).offset().top + 25, "lefttop");
        });
        
        $("body").on("mouseover mouseleave",".luckysheet-menuButton .luckysheet-cols-submenu", function(e){
            var $t = $(this), attrid = $t.attr("itemvalue"), $attr = $("#luckysheet-icon-" + attrid + "-menuButton");
            //clearTimeout(_this.submenuhide);
            if (e.type === "mouseover") {
                var $con = $t.parent();
                var winW = $(window).width(), winH = $(window).height();
                var menuW = $con.width(), attrH = $attr.height() + 25, attrW = $attr.width() + 5;
                var offset = $t.offset();
                var top = offset.top, left = offset.left + menuW;

                if (left + attrW > winW) {
                    left = offset.left - attrW;
                }

                if (top + attrH > winH) {
                    top = winH - attrH;
                }

                $attr.css({ "top": top, "left": left }).show();
                _this.rightclickmenu = $t;
            } else {
                //var $t = $(this), attrid = $t.attr("itemvalue"), $attr = $("#" + attrid + "_sub");
                _this.submenuhide = setTimeout(function () { $attr.hide(); }, 200);
            }
        }).on("mouseover mouseleave",".luckysheet-menuButton-sub", function(e){
            if (e.type === "mouseover") {
                _this.rightclickmenu.addClass("luckysheet-cols-menuitem-hover");
                clearTimeout(_this.submenuhide);
            } else {
                _this.rightclickmenu.removeClass("luckysheet-cols-menuitem-hover");
                $(this).hide();
            }
        });
    },
    fontarray:["微软雅黑","宋体","黑体","楷体","仿宋","新宋体","华文新魏","华文行楷","华文隶书","Arial","Times New Roman","Tahoma","Verdana"],
    fontjson:{"微软雅黑":0,"microsoft yahei":0,"宋体":1,"simsun":1,"黑体":2,"simhei":2,"楷体":3,"kaiti":3,"仿宋":4,"fangsong":4,"新宋体":5,"nsimsun":5,"华文新魏":6,"stxinwei":6,"华文行楷":7,"stxingkai":7,"华文隶书":8,"stliti":8,"arial":9,"times new roman":10,"tahoma":11,"verdana":12},
    getQKBorder:function(width, type, color){
        var borderType = {"0":"none", "1":"Thin", "2":"Hair", "3":"Dotted", "4":"Dashed", "5":"DashDot", "6":"DashDotDot", "7":"Double", "8":"Medium", "9":"MediumDashed", "10":"MediumDashDot", "11":"MediumDashDotDot", "12":"SlantedDashDot", "13":"Thick"};
        var style = 0;

        type = type.toLowerCase();

        // var bordertype = "solid";
        // if(type=="double"){
        //     style = 2;
        // }
        // else if(type=="dotted"){
        //     style = 2;
        // }
        // else if(type=="dashed"){
        //     style = 2;
        // }
        // else if(type=="solid"){
        //     style = 2;
        // }
        // else{
        //     style = 0;
        // }

        var bordertype = "";
        if(width.indexOf("pt")>-1){
            var width = parseFloat(width);
            if(width<1){

            }
            else if(width<1.5){
                bordertype = "Medium";
            }
            else{
                bordertype = "Thick";
            }
        }
        else{
            var width = parseFloat(width);
            if(width<2){

            }
            else if(width<3){
                bordertype = "Medium";
            }
            else{
                bordertype = "Thick";
            }
        }

        var bordertype = "solid";
        if(type=="double"){
            style = 2;
        }
        else if(type=="dotted"){
            if(bordertype=="Medium" || bordertype=="Thick"){
                style = 3;
            }
            else{
                style = 10;
            }
        }
        else if(type=="dashed"){
            if(bordertype=="Medium" || bordertype=="Thick"){
                style = 4;
            }
            else{
                style = 9;
            }
        }
        else if(type=="solid"){
            if(bordertype=="Medium"){
                style = 8;
            }
            else if(bordertype=="Thick"){
                style = 13;
            }
            else{
                style = 1;
            }
        }

        
        // if(color.indexOf("rgb")>-1){
        //     color = luckysheet.rgbTohex(color);
        // }
        //console.log([style, color]);
        return [style, color];
    },
    updateFormat:function(d, attr, foucsStatus){
        var _this = this;

        var canvasElement = document.createElement('canvas');
        var canvas = canvasElement.getContext("2d");

        var cfg = $.extend(true, {}, config);
        if(cfg["rowlen"] == null){
            cfg["rowlen"] = {};
        }

        for(var s = 0; s < luckysheet_select_save.length; s++){
            var row_st = luckysheet_select_save[s]["row"][0], row_ed = luckysheet_select_save[s]["row"][1];
            var col_st = luckysheet_select_save[s]["column"][0], col_ed = luckysheet_select_save[s]["column"][1];

            if(attr == "ct"){
                for (var r = row_st; r <= row_ed; r++) {
                    if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                        continue;
                    }

                    for (var c = col_st; c <= col_ed; c++) {
                        var cell = d[r][c], value = null;
                        
                        if (luckysheet.getObjType(cell) == "object") {
                            value = d[r][c]["v"];
                        }
                        else{
                            value = d[r][c];
                        }

                        if(foucsStatus != "@" && luckysheet.func_methods.isRealNum(value)){
                            value = parseFloat(value);
                        }

                        var mask = luckysheet.mask.update(foucsStatus, value);
                        var type = "n";
                        if(luckysheet.mask.is_date(foucsStatus) || foucsStatus === 14 || foucsStatus === 15 || foucsStatus === 16 || foucsStatus === 17 || foucsStatus === 18 || foucsStatus === 19 || foucsStatus === 20 || foucsStatus === 21 || foucsStatus === 22 || foucsStatus === 45 || foucsStatus === 46 || foucsStatus === 47){
                            type = "d";
                        }
                        else if(foucsStatus == "@" || foucsStatus === 49){
                            type = "s"
                        }
                        else if(foucsStatus == "General" || foucsStatus === 0){
                            type = "g";
                        }

                        if (luckysheet.getObjType(cell) == "object") {
                            d[r][c]["m"] = mask;
                            if(d[r][c]["ct"] == null){
                                d[r][c]["ct"] = {};
                            }
                            d[r][c]["ct"]["fa"] = foucsStatus;
                            d[r][c]["ct"]["t"] = type;
                        }
                        else{
                            d[r][c] = { "ct":{"fa":foucsStatus, "t":type}, "v": value, "m": mask };
                        }
                    }
                }
            }
            else{
                if(attr == "ht"){
                    if(foucsStatus == "left"){
                        foucsStatus = "1";
                    }
                    else if(foucsStatus == "center"){
                        foucsStatus = "0";
                    }
                    else if(foucsStatus == "right"){
                        foucsStatus = "2";
                    }
                }
                else if(attr == "vt"){
                    if(foucsStatus == "top"){
                        foucsStatus = "1";
                    }
                    else if(foucsStatus == "middle"){
                        foucsStatus = "0";
                    }
                    else if(foucsStatus == "bottom"){
                        foucsStatus = "2";
                    }
                }
                else if(attr == "tb"){
                    if(foucsStatus == "overflow"){
                        foucsStatus = "1";
                    }
                    else if(foucsStatus == "clip"){
                        foucsStatus = "0";
                    }
                    else if(foucsStatus == "wrap"){
                        foucsStatus = "2";
                    }
                }
                else if(attr == "tr"){
                    if(foucsStatus == "none"){
                        foucsStatus = "0";
                    }
                    else if(foucsStatus == "angleup"){
                        foucsStatus = "2";
                    }
                    else if(foucsStatus == "angledown"){
                        foucsStatus = "1";
                    }
                    else if(foucsStatus == "vertical"){
                        foucsStatus = "3";
                    }
                    else if(foucsStatus == "rotation-up"){
                        foucsStatus = "5";
                    }
                    else if(foucsStatus == "rotation-down"){
                        foucsStatus = "4";
                    }
                }

                for (var r = row_st; r <= row_ed; r++) {
                    if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                        continue;
                    }

                    for (var c = col_st; c <= col_ed; c++) {
                        var value = d[r][c];
                        
                        if (luckysheet.getObjType(value) == "object") {
                            d[r][c][attr] = foucsStatus;
                        }
                        else{
                            d[r][c] = { v: value };
                            d[r][c][attr] = foucsStatus;
                        }

                        if(attr == "tr" && d[r][c].tb != null){
                            d[r][c].tb = "0";
                        }
                    }
                }
            }

            if(attr == "tb" && foucsStatus == "2"){
                //自动换行
                for (var r = row_st; r <= row_ed; r++) {
                    if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                        continue;
                    }

                    var currentRowLen = defaultrowlen;
                    if(cfg["rowlen"][r] != null){
                        currentRowLen = cfg["rowlen"][r];
                    }

                    for (var c = col_st; c <= col_ed; c++) {
                        var cell = d[r][c];

                        if(cell != null && !luckysheet.func_methods.isRealNull(cell.v)){
                            var fontset = luckysheetfontformat(cell);
                            var oneLineTextHeight = luckysheet.menuButton.getTextSize("田", fontset)[1];
                            canvas.font = fontset;

                            var strValue = cell.m.toString();
                            var tbWidth = canvas.measureText(strValue).width;
                            var cellWidth = luckysheet.colLocationByIndex(c)[1] - luckysheet.colLocationByIndex(c)[0] - 8;

                            if(tbWidth > cellWidth){
                                var strArr = [];//文本截断数组
                                for(var strI = 1; strI <= strValue.length; strI++){
                                    var strV = strValue.substring(strArr.join("").length, strI);
                                    var strtextMetrics = canvas.measureText(strV).width;
                                    if(strtextMetrics > cellWidth){
                                        strArr.push(strValue.substring(strArr.join("").length, strI-1));
                                        strI = strI - 2;
                                    }
                                    else if(strtextMetrics <= cellWidth && strI == strValue.length){
                                        strArr.push(strV);
                                    }
                                }
                                var computeRowlen = oneLineTextHeight * strArr.length;
                                //比较计算高度和当前高度取最大高度
                                if(computeRowlen > currentRowLen){
                                    currentRowLen = computeRowlen;
                                }
                            }
                        }
                    }

                    if(currentRowLen != defaultrowlen){
                        cfg["rowlen"][r] = currentRowLen;
                    }
                }
            }
            else if(attr == "tr"){
                //文本旋转
                for (var r = row_st; r <= row_ed; r++) {
                    if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                        continue;
                    }

                    var currentRowLen = defaultrowlen;
                    if(cfg["rowlen"][r] != null){
                        currentRowLen = cfg["rowlen"][r];
                    }

                    for (var c = col_st; c <= col_ed; c++) {
                        var cell = d[r][c];

                        if(cell != null && !luckysheet.func_methods.isRealNull(cell.v)){
                            var fontset = luckysheetfontformat(cell);
                            var oneLineTextHeight = luckysheet.menuButton.getTextSize("田", fontset)[1];
                            canvas.font = fontset;
                            
                            var value = cell.m.toString();
                            var textMetrics = canvas.measureText(value).width;

                            var computeRowlen; //计算高度
                            if(foucsStatus == "0"){
                                //无旋转
                                computeRowlen = oneLineTextHeight;    
                            }
                            else if(foucsStatus == "1" || foucsStatus == "2"){
                                //向下倾斜（45 旋转）----向上倾斜（-45 旋转）
                                computeRowlen = 0.707 * (textMetrics + oneLineTextHeight) + 4;
                            }
                            else if(foucsStatus == "3"){
                                //竖排文字
                                computeRowlen = value.length * oneLineTextHeight + 4;
                            }
                            else if(foucsStatus == "4" || foucsStatus == "5"){
                                //向下90（90 旋转）----向上90（-90 旋转）
                                computeRowlen = textMetrics + 4;
                            }
                            computeRowlen = Math.round(computeRowlen);
                            //比较计算高度和当前高度取最大高度
                            if(computeRowlen > currentRowLen){
                                currentRowLen = computeRowlen;
                            }
                        }
                    }

                    if(currentRowLen != defaultrowlen){
                        cfg["rowlen"][r] = currentRowLen;
                    }
                }
            }
            else if(attr == "fs"){
                //字体大小
                for (var r = row_st; r <= row_ed; r++) {
                    if (config["rowhidden"] != null && config["rowhidden"][r] != null) {
                        continue;
                    }

                    var currentRowLen = defaultrowlen;
                    if(cfg["rowlen"][r] != null){
                        currentRowLen = cfg["rowlen"][r];
                    }

                    for (var c = col_st; c <= col_ed; c++) {
                        var cell = d[r][c];

                        if(cell == null){
                            continue;
                        }

                        var fontset = luckysheetfontformat(cell);
                        var oneLineTextHeight = luckysheet.menuButton.getTextSize("田", fontset)[1];
                        canvas.font = fontset;

                        //计算高度
                        var computeRowlen;
                        if(luckysheet.func_methods.isRealNull(cell.v)){
                            computeRowlen = oneLineTextHeight;
                        }
                        else{
                            if(cell.tb == "2"){
                                //单元格有自动换行标示
                                var strValue = cell.m.toString();
                                var tbWidth = canvas.measureText(strValue).width;
                                var cellWidth = luckysheet.colLocationByIndex(c)[1] - luckysheet.colLocationByIndex(c)[0] - 8;

                                if(tbWidth > cellWidth){
                                    var strArr = [];//文本截断数组
                                    for(var strI = 1; strI <= strValue.length; strI++){
                                        var strV = strValue.substring(strArr.join("").length, strI);
                                        var strtextMetrics = canvas.measureText(strV).width;
                                        if(strtextMetrics > cellWidth){
                                            strArr.push(strValue.substring(strArr.join("").length, strI-1));
                                            strI = strI - 2;
                                        }
                                        else if(strtextMetrics <= cellWidth && strI == strValue.length){
                                            strArr.push(strV);
                                        }
                                    }
                                    
                                    computeRowlen = oneLineTextHeight * strArr.length;
                                }
                                else{
                                    computeRowlen = oneLineTextHeight;
                                }
                            }
                            else if(cell.tr != null){
                                //单元格有旋转标示
                                var tr = cell.tr;
                                var value = cell.m.toString();
                                var textMetrics = canvas.measureText(value).width;

                                if(tr == "0"){
                                    //无旋转
                                    computeRowlen = oneLineTextHeight;    
                                }
                                else if(tr == "1" || tr == "2"){
                                    //向下倾斜（45 旋转）----向上倾斜（-45 旋转）
                                    computeRowlen = 0.707 * (textMetrics + oneLineTextHeight) + 4;
                                }
                                else if(tr == "3"){
                                    //竖排文字
                                    computeRowlen = value.length * oneLineTextHeight + 4;
                                }
                                else if(tr == "4" || tr == "5"){
                                    //向下90（90 旋转）----向上90（-90 旋转）
                                    computeRowlen = textMetrics + 4;
                                }

                                computeRowlen = Math.round(computeRowlen);
                            }
                            else{
                                computeRowlen = oneLineTextHeight;
                            }
                        }

                        //比较计算高度和当前高度取最大高度
                        if(computeRowlen > currentRowLen){
                            currentRowLen = computeRowlen;
                        }
                    }

                    if(currentRowLen != defaultrowlen){
                        cfg["rowlen"][r] = currentRowLen;
                    }
                }
            }
        }

        if((attr == "tb" && foucsStatus == "2") || attr == "tr" || attr == "fs"){
            luckysheet.jfrefreshgrid(d, luckysheet_select_save, cfg, null, true);
        }
        else{
            luckysheet.jfrefreshgrid(d, luckysheet_select_save);
        }
    },
    updateFormat_mc: function(d, foucsStatus){
        var cfg = $.extend(true, {}, config);
        if(cfg["merge"] == null){
            cfg["merge"] = {};
        }

        if(foucsStatus == "mergeCancel"){
            for(var i = 0; i < luckysheet_select_save.length; i++){
                var range = luckysheet_select_save[i];
                var r1 = range["row"][0], r2 = range["row"][1];
                var c1 = range["column"][0], c2 = range["column"][1];

                if(r1 == r2 && c1 == c2){
                    continue;
                }

                var fv = {};

                for(var r = r1; r <= r2; r++){
                    for(var c = c1; c <= c2; c++){
                        var cell = d[r][c];

                        if(cell != null && cell.mc != null){
                            var mc_r = cell.mc.r, mc_c = cell.mc.c;

                            if("rs" in cell.mc){
                                delete cell.mc;
                                delete cfg["merge"][mc_r + "_" + mc_c];

                                fv[mc_r + "_" + mc_c] = $.extend(true, {}, cell);
                            }
                            else{
                                var cell_clone = fv[mc_r + "_" + mc_c];

                                delete cell_clone.v;
                                delete cell_clone.m;
                                delete cell_clone.ct;
                                delete cell_clone.f;
                                delete cell_clone.spl;

                                d[r][c] = cell_clone;
                            }
                        }
                    }
                }
            }
        }
        else{
            var isHasMc = false; //选区是否含有 合并的单元格
            for(var i = 0; i < luckysheet_select_save.length; i++){
                var range = luckysheet_select_save[i];
                var r1 = range["row"][0], r2 = range["row"][1];
                var c1 = range["column"][0], c2 = range["column"][1];

                for(var r = r1; r <= r2; r++){
                    for(var c = c1; c <= c2; c++){
                        var cell = d[r][c];

                        if(luckysheet.getObjType(cell) == "object" && ("mc" in cell)){
                            isHasMc = true;
                            break;
                        }
                    }
                }
            }

            if(isHasMc){//选区有合并单元格（选区都执行 取消合并）
                for(var i = 0; i < luckysheet_select_save.length; i++){
                    var range = luckysheet_select_save[i];
                    var r1 = range["row"][0], r2 = range["row"][1];
                    var c1 = range["column"][0], c2 = range["column"][1];

                    if(r1 == r2 && c1 == c2){
                        continue;
                    }

                    var fv = {};

                    for(var r = r1; r <= r2; r++){
                        for(var c = c1; c <= c2; c++){
                            var cell = d[r][c];

                            if(cell != null && cell.mc != null){
                                var mc_r = cell.mc.r, mc_c = cell.mc.c;

                                if("rs" in cell.mc){
                                    delete cell.mc;
                                    delete cfg["merge"][mc_r + "_" + mc_c];

                                    fv[mc_r + "_" + mc_c] = $.extend(true, {}, cell);
                                }
                                else{
                                    var cell_clone = fv[mc_r + "_" + mc_c];

                                    delete cell_clone.v;
                                    delete cell_clone.m;
                                    delete cell_clone.ct;
                                    delete cell_clone.f;
                                    delete cell_clone.spl;

                                    d[r][c] = cell_clone;
                                }
                            }
                        }
                    }
                }
            }
            else{
                for(var i = 0; i < luckysheet_select_save.length; i++){
                    var range = luckysheet_select_save[i];
                    var r1 = range["row"][0], r2 = range["row"][1];
                    var c1 = range["column"][0], c2 = range["column"][1];

                    if(r1 == r2 && c1 == c2){
                        continue;
                    }

                    if(foucsStatus == "mergeAll"){
                        var fv = {}, isfirst = false;

                        for(var r = r1; r <= r2; r++){
                            for(var c = c1; c <= c2; c++){
                                var cell = d[r][c];

                                if(cell != null && (!luckysheet.func_methods.isRealNull(cell.v) || cell.f != null) && !isfirst){
                                    fv = $.extend(true, {}, cell);
                                    isfirst = true;
                                }

                                d[r][c] = { "mc": { "r": r1, "c": c1 } };
                            }
                        }

                        d[r1][c1] = fv;
                        d[r1][c1].mc = { "r": r1, "c": c1, "rs": r2 - r1 + 1, "cs": c2 - c1 + 1 };

                        cfg["merge"][r1 + "_" + c1] = { "r": r1, "c": c1, "rs": r2 - r1 + 1, "cs": c2 - c1 + 1 };
                    }
                    else if(foucsStatus == "mergeV"){
                        for(var c = c1; c <= c2; c++){
                            var fv = {}, isfirst = false;

                            for(var r = r1; r <= r2; r++){
                                var cell = d[r][c];

                                if(cell != null && (!luckysheet.func_methods.isRealNull(cell.v) || cell.f != null) && !isfirst){
                                    fv = $.extend(true, {}, cell);
                                    isfirst = true;
                                }

                                d[r][c] = { "mc": { "r": r1, "c": c } };
                            }

                            d[r1][c] = fv;
                            d[r1][c].mc = { "r": r1, "c": c, "rs": r2 - r1 + 1, "cs": 1 };

                            cfg["merge"][r1 + "_" + c] = { "r": r1, "c": c, "rs": r2 - r1 + 1, "cs": 1 };
                        }
                    }
                    else if(foucsStatus == "mergeH"){
                        for(var r = r1; r <= r2; r++){
                            var fv = {}, isfirst = false;

                            for(var c = c1; c <= c2; c++){
                                var cell = d[r][c];

                                if(cell != null && (!luckysheet.func_methods.isRealNull(cell.v) || cell.f != null) && !isfirst){
                                    fv = $.extend(true, {}, cell);
                                    isfirst = true;
                                }

                                d[r][c] = { "mc": { "r": r, "c": c1 } };
                            }

                            d[r][c1] = fv;
                            d[r][c1].mc = { "r": r, "c": c1, "rs": 1, "cs": c2 - c1 + 1 };

                            cfg["merge"][r + "_" + c1] = { "r": r, "c": c1, "rs": 1, "cs": c2 - c1 + 1 };
                        }
                    }
                }
            }
        }

        if (clearjfundo) {
            luckysheet.jfundo = [];
            luckysheet.jfredo.push({
                "type": "mergeChange",
                "sheetIndex": luckysheet.currentSheetIndex,
                "data": luckysheet.flowdata,
                "curData": d,
                "range": $.extend(true, [], luckysheet_select_save),
                "config": $.extend(true, {}, config),
                "curConfig": cfg
            });
        }

        clearjfundo = false;
        luckysheet.jfrefreshgrid(d, luckysheet_select_save, cfg);
        clearjfundo = true;
    },
    borderfix:function(d, r, c){
        return [-1, -1, 2, 2];

        var cell = d[r][c];
        var bg = null;
        
        if(cell == null){
            return [0, 0, 0, 0];
        }
        else if(d[r][c].bg == null || d[r][c].bg == ""){
            return [0, 0, 0, 0];
        }
        else {
            return [-1, -1, 2, 2];
        }
    },
    menuButtonFocus:function(d, r, c){
        var foucsList = ["bl", "it", "cl", "ff", "ht", "vt", "fs", "tb", "tr"];
        var _this = this;

        for(var i = 0; i < foucsList.length; i++){
            var attr = foucsList[i];
            var foucsStatus = _this.checkstatus(d, r, c, attr);

            if(attr == "bl"){
                if(foucsStatus != "0"){
                    $("#luckysheet-icon-bold").addClass("luckysheet-toolbar-button-hover");
                }
                else{
                    $("#luckysheet-icon-bold").removeClass("luckysheet-toolbar-button-hover");
                }
            }
            else if(attr == "it"){
                if(foucsStatus != "0"){
                    $("#luckysheet-icon-italic").addClass("luckysheet-toolbar-button-hover");
                }
                else{
                    $("#luckysheet-icon-italic").removeClass("luckysheet-toolbar-button-hover");
                }
            }
            else if(attr == "cl"){
                if(foucsStatus != "0"){
                    $("#luckysheet-icon-strikethrough").addClass("luckysheet-toolbar-button-hover");
                }
                else{
                    $("#luckysheet-icon-strikethrough").removeClass("luckysheet-toolbar-button-hover");
                }
            }
            else if(attr == "ff"){
                var menuButtonId = "luckysheet-icon-font-family-menuButton";
                var $menuButton = $("#"+menuButtonId);
                var itemname = "微软雅黑", itemvalue = 0;
                
                if(foucsStatus != null){
                    var fontfamily = null;
                    
                    if(luckysheet.isdatatypemulti(foucsStatus)["num"]){
                        itemvalue = parseInt(foucsStatus);
                        itemname = _this.fontarray[itemvalue];
                    }
                    else{
                        itemvalue = _this.fontjson[foucsStatus];
                        itemname = _this.fontarray[itemvalue];
                    }   
                }

                _this.focus($menuButton, itemvalue);
                $("#luckysheet-icon-font-family").find(".luckysheet-toolbar-menu-button-caption").html(" "+ itemname +" ");
            }
            else if(attr == "fs"){
                var $menuButton = $("#luckysheet-icon-font-size-menuButton");
                var itemvalue = foucsStatus, $input = $("#luckysheet-icon-font-size input");
                _this.focus($menuButton, itemvalue);
                $("#luckysheet-icon-font-size").attr("itemvalue", itemvalue);
                $input.val(itemvalue);
            }
            else if(attr == "ht"){
                var $menuButton = $("#luckysheet-icon-align-menu-menuButton");
                var $t = $("luckysheet-icon-align"), itemvalue = "left";
                
                if(foucsStatus == "0"){
                    itemvalue = "center";
                }
                else if(foucsStatus == "2"){
                    itemvalue = "right";
                }

                _this.focus($menuButton, itemvalue);

                var $icon = $("#luckysheet-icon-align").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-align-" + itemvalue);
                $menuButton.hide();
            }
            else if(attr == "vt"){
                var $menuButton = $("#luckysheet-icon-valign-menu-menuButton");
                var $t = $("luckysheet-icon-valign"), itemvalue = "bottom";
                
                if(foucsStatus == "1"){
                    itemvalue = "top";
                }
                else if(foucsStatus == "0"){
                    itemvalue = "middle";
                }

                _this.focus($menuButton, itemvalue);

                var $icon = $("#luckysheet-icon-valign").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-valign-" + itemvalue);
                $menuButton.hide();
            }
            else if(attr == "tb"){
                var $menuButton = $("#luckysheet-icon-textwrap-menu-menuButton");
                var $t = $("luckysheet-icon-textwrap"), itemvalue = "clip";
                
                if(foucsStatus == "1"){
                    itemvalue = "overflow";
                }
                else if(foucsStatus == "2"){
                    itemvalue = "wrap";
                }

                _this.focus($menuButton, itemvalue);

                var $icon = $("#luckysheet-icon-textwrap").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-textwrap-" + itemvalue);
                $menuButton.hide();
            }
            else if(attr == "tr"){
                var $menuButton = $("#luckysheet-icon-rotation-menu-menuButton");
                var $t = $("luckysheet-icon-rotation"), itemvalue = "none";
                
                if(foucsStatus == "1"){
                    itemvalue = "angledown";
                }
                else if(foucsStatus == "2"){
                    itemvalue = "angleup";
                }
                else if(foucsStatus == "3"){
                    itemvalue = "vertical";
                }
                else if(foucsStatus == "4"){
                    itemvalue = "rotation-down";
                }
                else if(foucsStatus == "5"){
                    itemvalue = "rotation-up";
                }

                _this.focus($menuButton, itemvalue);

                var $icon = $("#luckysheet-icon-rotation").attr("type", itemvalue).find(".luckysheet-icon-img-container");
                $icon.removeAttr("class").addClass("luckysheet-icon-img-container luckysheet-icon-img luckysheet-icon-rotation-" + itemvalue);
                $menuButton.hide();
            }
        }
    },
    checkstatus:function(d, r, c, a){
        var foucsStatus = d[r][c];
        var tf = {"bl":1, "it":1 , "ff":1, "cl":1};
        if(a in tf){
            if(foucsStatus==null){
                foucsStatus = "0";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus="0";
                }
            }
        }
        else if(a == "fc"){
            if(foucsStatus == null){
                foucsStatus = "#000000";
            }
            else{
                foucsStatus = foucsStatus[a];

                if(foucsStatus == null){
                    foucsStatus = "#000000";
                }

                if(foucsStatus.indexOf("rgba") > -1){
                    foucsStatus = luckysheet.rgbTohex(foucsStatus);
                }
            }
        }
        else if(a == "bg"){
            if(foucsStatus == null){
                foucsStatus = "#ffffff";
            }
            else{
                foucsStatus = foucsStatus[a];

                if(foucsStatus == null){
                    foucsStatus = "#ffffff";
                }
                
                if(foucsStatus.toString().indexOf("rgba") > -1){
                    foucsStatus = luckysheet.rgbTohex(foucsStatus);
                }
            }
        }
        else if(a.substr(0, 2) == "bs"){
            if(foucsStatus==null){
                foucsStatus = "none";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus = "none";
                }
            }
        }
        else if(a.substr(0, 2) == "bc"){
            //console.log(foucsStatus[a]);
            if(foucsStatus==null){
                foucsStatus = "#000000";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus = "#000000";
                }
            }
        }
        else if(a == "ht"){
            if(foucsStatus == null){
                foucsStatus = "1";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus == null){
                    foucsStatus = "1";
                }
            }

            if(["0", "1", "2"].indexOf(foucsStatus) == -1){
                foucsStatus = "1";
            }
        }
        else if(a == "vt"){
            if(foucsStatus == null){
                foucsStatus = "2";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus == null){
                    foucsStatus = "2";
                }
            }

            if(["0", "1", "2"].indexOf(foucsStatus) == -1){
                foucsStatus = "2";
            }
        }
        else if(a == "ct"){
            if(foucsStatus==null){
                foucsStatus = null;
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus = null;
                }
            }
        }
        else if(a == "fs"){
            if(foucsStatus==null){
                foucsStatus = "10";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus = "10";
                }
            }
        }
        else if(a == "tb"){
            if(foucsStatus==null){
                foucsStatus = "0";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus = "0";
                }
            }
        }
        else if(a == "tr"){
            if(foucsStatus==null){
                foucsStatus = "0";
            }
            else{
                foucsStatus = foucsStatus[a];
                if(foucsStatus==null){
                    foucsStatus = "0";
                }
            }
        }


        return foucsStatus;
    },
    setLineDash:function(canvasborder, type, hv, m_st, m_ed, line_st, line_ed){
    
    	var borderType = {"0":"none", "1":"Thin", "2":"Hair", "3":"Dotted", "4":"Dashed", "5":"DashDot", "6":"DashDotDot", "7":"Double", "8":"Medium", "9":"MediumDashed", "10":"MediumDashDot", "11":"MediumDashDotDot", "12":"SlantedDashDot", "13":"Thick"};

    	type = borderType[type.toString()];

    	try {
        	if(type=="Hair"){
                canvasborder.setLineDash([1, 2]);
            }
            else if(type.indexOf("DashDotDot")>-1){
                canvasborder.setLineDash([2, 2, 5, 2, 2]);
            }
            else if(type.indexOf("DashDot")>-1){
                canvasborder.setLineDash([2, 5, 2]);
            }
            else if(type.indexOf("Dotted")>-1){
                canvasborder.setLineDash([2]);
            }
            else if(type.indexOf("Dashed")>-1){
                canvasborder.setLineDash([3]);
            }
            else{
            	canvasborder.setLineDash([0]);
            }
        } catch(e) {
    		console.log(e);
    	}

        canvasborder.beginPath();

        if(type.indexOf("Medium")>-1){
        	if(hv=="h"){
        		canvasborder.moveTo(m_st, m_ed-0.5);
            	canvasborder.lineTo(line_st, line_ed-0.5);
        	}
        	else{
        		canvasborder.moveTo(m_st-0.5, m_ed);
            	canvasborder.lineTo(line_st-0.5, line_ed);
        	}
            
            canvasborder.lineWidth = 2*devicePixelRatio;
        }
        else if(type=="Thick"){
            canvasborder.moveTo(m_st, m_ed);
            canvasborder.lineTo(line_st, line_ed);
            canvasborder.lineWidth = 3*devicePixelRatio;
        }
        else {
            canvasborder.moveTo(m_st, m_ed);
            canvasborder.lineTo(line_st, line_ed);
            canvasborder.lineWidth = devicePixelRatio;
        }
    },
    moveMergeData:function(d, offset_r, offset_c){
        if(luckysheet.func_methods.isRealNull(d)){
            return d;
        }

        var deleMC = [], insertMC=[], hasMC = false;
        for(var r = 0; r < d.length; r++){
            for(var c = 0; c < d[0].length; c++){
                var cell = d[r][c];
                
                if(luckysheet.getObjType(cell) == "object" && ("mc" in cell)){
                    if(cell.mc.rs != null){
                        //deleMC.push(cell.mc.r + "_" + cell.mc.c);
                        deleMC.push({ rs: cell.mc.rs, cs: cell.mc.cs, r: cell.mc.r, c: cell.mc.c});
                        //insertMC.push((cell.mc.r+offset_r) + "_" + (cell.mc.c+offset_c));
                        insertMC.push({ rs: cell.mc.rs, cs: cell.mc.cs, r: cell.mc.r+offset_r, c: cell.mc.c+offset_c});

                        hasMC= true;
                    }

                    d[r][c].mc.r += offset_r;
                    d[r][c].mc.c += offset_c;
                }
            }
        }

        return {"deleMC":deleMC, "insertMC":insertMC, "hasMC": hasMC};
    },
    getRangeInMerge:function(st_r, rlen, st_c, clen, sheetIndex){
        var mergelist = [];
        var cfg = null;
        if(sheetIndex!=null){
            //cfg = $.extend(true, {}, luckysheetfile[luckysheet.sheetmanage.getSheetIndex(sheetIndex)].config);
            cfg = $.extend(true, {}, luckysheet.sheetmanage.getSheetConfig());
        }
        else{
            cfg = $.extend(true, {}, config)
        }

        //console.log(cfg);

        if(cfg!=null && cfg["merge"]!=null){
            for(var key in cfg["merge"]){
                var mc = cfg["merge"][key];
                //console.log(!( (st_r+rlen-1) < mc.r || st_r>(mc.r+mc.rs-1)), !((st_c+clen-1) < mc.c || st_c>(mc.c+mc.cs-1)));
                if( !( (st_r+rlen-1) < mc.r || st_r>(mc.r+mc.rs-1)) && !((st_c+clen-1) < mc.c || st_c>(mc.c+mc.cs-1)) ){
                    mergelist.push(mc);
                }
            }
        }
        return mergelist;
    },
    mergeborer:function(d, row_index, col_index){
        var value = d[row_index][col_index];
        
        if(luckysheet.getObjType(value) == "object" && ("mc" in value)){
            var margeMaindata = value["mc"];
            col_index = margeMaindata.c;
            row_index = margeMaindata.r;

            var col_rs = d[row_index][col_index].mc.cs;
            var row_rs = d[row_index][col_index].mc.rs;

            var scrollWidth = $("#luckysheet-cell-main").scrollLeft();

            var scrollHeight = $("#luckysheet-cell-main").scrollTop();

            var start_r, end_r;
            //var r= row_index, c = col_index;
            var margeMain = d[row_index][col_index].mc;
            
            var row_pre , row , col , col_pre;
            for(var r = row_index; r < margeMain.rs + row_index; r++){
                if (r == 0) {
                    start_r = - 1;
                }
                else {
                    start_r = visibledatarow[r - 1] - 1;
                }

                end_r = visibledatarow[r];

                if(row_pre == null){
                    row_pre = start_r;
                    row = end_r;
                }
                else{
                    row += end_r - start_r - 1;
                }
            }

            var start_c, end_c; 
            for(var c = col_index; c < margeMain.cs + col_index; c++){
                if (c == 0) {
                    start_c = 0;
                }
                else {
                    start_c = visibledatacolumn[c - 1];
                }

                end_c = visibledatacolumn[c];

                if(col_pre == null){
                    col_pre = start_c;
                    col = end_c;
                }
                else{
                    col += end_c - start_c;
                }
            }

            return {"row": [row_pre , row, row_index, row_index + row_rs - 1], "column": [col_pre, col , col_index, col_index + col_rs - 1]};
        }
        else{
            return null;
        }
    },
    mergeMoveData:{},
    mergeMoveMain:function(columnseleted, rowseleted, s, top , height, left , width){
        var mergesetting = luckysheet.sheetmanage.getSheetMerge();
        var _this = this;
        
        if(mergesetting==null){
            return;
        }

        var mcset = [];
        for(var key in mergesetting){
            mcset.push(key);
        }

        if(rowseleted[0]>rowseleted[1]){
            rowseleted[1] = rowseleted[0];
        }

        if(columnseleted[0]>columnseleted[1]){
            columnseleted[1] = columnseleted[0];
        }

        var columnseleted1 = [].concat(columnseleted);
        var rowseleted1= [].concat(rowseleted);
        var top1 = top;
        var height1 = height;
        var left1 = left;
        var width1 = width;

        //var anchor = mcset.length;
        var offloop = true;
        _this.mergeMoveData = {};

        //console.log(rowseleted1);

        while (offloop) {
            offloop = false;
            for(var i=0;i<mcset.length;i++){
                var key = mcset[i];
                var mc = mergesetting[key];
                if(key in _this.mergeMoveData){
                    continue;
                }
                //console.log(rowseleted[0],row_ed , rowseleted[1],row_st , columnseleted[0],col_ed , columnseleted[1],col_st);
                //!(columnseleted[0]<=col_st && columnseleted[1]>=col_ed && rowseleted[0]<=row_st && rowseleted[1]>=row_ed) &&
                var changeparam  = _this.mergeMove(mc, columnseleted, rowseleted, s, top , height, left , width);

                //console.log(key, changeparam);
                if(changeparam!=null){
                    _this.mergeMoveData[key] = mc;
                    
                    columnseleted = changeparam[0];
                    rowseleted= changeparam[1];
                    top = changeparam[2];
                    height = changeparam[3];
                    left = changeparam[4];
                    width = changeparam[5];

                    offloop = true;
                }
                else{
                    delete _this.mergeMoveData[key];
                }
            }

        }
        
        //console.log(rowseleted);
        // if(rowseleted[0]>rowseleted[1]){
        //     rowseleted =  rowseleted1;
        //     height = height1;
        //     top = top1;
        // }
        return [columnseleted, rowseleted, top , height, left , width];
    },
    mergeMove:function(mc, columnseleted, rowseleted, s, top , height, left , width){
        var row_st = mc.r, row_ed = mc.r + mc.rs - 1;
        var col_st = mc.c, col_ed = mc.c + mc.cs - 1;

        var ismatch = false;
        var _this = this;

        if(columnseleted[1] < columnseleted[0]){
            columnseleted[0] = columnseleted[1];
        }

        if(rowseleted[1] < rowseleted[0]){
            rowseleted[0] = rowseleted[1];
        }

        if( (columnseleted[0] <= col_st && columnseleted[1] >= col_ed && rowseleted[0] <= row_st && rowseleted[1] >= row_ed) || (!(columnseleted[1] < col_st || columnseleted[0] > col_ed) && !(rowseleted[1] < row_st || rowseleted[0] > row_ed))){
            var margeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, mc.r, mc.c);
            if(!!margeset){
                var row = margeset.row[1],
                    row_pre = margeset.row[0],
                    row_index = margeset.row[2],
                    col = margeset.column[1],
                    col_pre = margeset.column[0],
                    col_index = margeset.column[2];

                // var row_edc = row_ed, row_stc = row_st;
                // var col_edc = col_ed, col_stc = col_st;
                // for(var key in _this.mergeMoveData){
                //     var othermc = _this.mergeMoveData[key];
                //     var otherMargeset = luckysheet.menuButton.mergeborer(luckysheet.flowdata, othermc.r, othermc.c);
                //     //console.log(row, otherMargeset.row[1], row_pre, otherMargeset.row[0]);
                //     // row = row>otherMargeset.row[1]?row:otherMargeset.row[1];
                //     // row_pre = row_pre<otherMargeset.row[0]?row_pre:otherMargeset.row[0];

                //     // col = col>otherMargeset.column[1]?col:otherMargeset.column[1];
                //     // col_pre = col_pre<otherMargeset.column[0]?col_pre:otherMargeset.column[0];
                //     //console.log(row, otherMargeset.row[1], row_pre, otherMargeset.row[0]);

                //     var row_ed1 = othermc.r + othermc.rs - 1, row_st1 = othermc.r;
                //     var col_ed1 = othermc.c + othermc.cs - 1, col_st1 = othermc.c;

                //     row_edc = row_edc>row_ed1?row_edc:row_ed1;
                //     row_stc = row_stc<row_st1?row_stc:row_st1;

                //     col_edc = col_edc>col_ed1?col_edc:col_ed1;
                //     col_stc = col_stc<col_st1?col_stc:col_st1;

                // }

                
                // if(row_stc > rowseleted[0] && luckysheet_select_save.row_focus > row_stc){
                //     rowseleted[0] = row_stc;
                // }

                // if(row_edc < rowseleted[1] && luckysheet_select_save.row_focus < row_edc){
                //     rowseleted[1] = row_edc;
                // }

                

                //console.log(rowseleted, row_st, row_ed, columnseleted, col_st, col_ed);
                //console.log("sssss");
                //_this.mergeMoveData[key] = "1";

                var top1 = null , height1 = null, left1 = null, width1 = null;
                if(!(columnseleted[1] < col_st || columnseleted[0] > col_ed)){
                    //向上滑动
                    if(rowseleted[0] <= row_ed && rowseleted[0] >= row_st){
                        // var fix = luckysheet_select_save.height;
                        // if(luckysheet_select_save.row_focus>=row_st && luckysheet_select_save.row_focus<=row_ed){
                        //     fix = height;
                        // }
                        // height = luckysheet_select_save.top + fix - row_pre;
                        height += top - row_pre;
                        top = row_pre;
                        rowseleted[0] = row_st;
                        //console.log("向上滑动");
                    }
                    
                    //向下滑动或者居中时往上滑动的向下补齐
                    if(rowseleted[1] >= row_st && rowseleted[1] <= row_ed){
                        if(s.row_focus >= row_st && s.row_focus <= row_ed){
                            //height =  height + row - luckysheet_select_save.top-luckysheet_select_save.height;
                            height = row - top;
                        }
                        else{
                            height = row - top;
                        }
                        
                        rowseleted[1] = row_ed;
                        //console.log("向下滑动");
                    }
                    // if(rowseleted[0]>=row_st && rowseleted[1]<=row_ed){
                    //     top = row_pre;
                    //     height = row - top;

                    //     rowseleted[0] = row_st;
                    //     rowseleted[1] = row_ed;
                    //     console.log("居中");
                    // }
                    // else if(rowseleted[0]>=row_st){
                    //     top = row_pre;
                    //     height = luckysheet_select_save.top + height - row_pre;

                    // }
                    // else if(rowseleted[1]<=row_ed){
                    //     height =  height + row - luckysheet_select_save.top;
                    // }
                }
                
                if(!(rowseleted[1] < row_st || rowseleted[0] > row_ed)){
                    //console.log(columnseleted, col_st, col_ed);
                    if(columnseleted[0] <= col_ed && columnseleted[0] >= col_st){
                        // left = col_pre;
                        // var fix = luckysheet_select_save.width;
                        // if(luckysheet_select_save.column_focus>=col_st && luckysheet_select_save.column_focus<=col_ed){
                        //     fix = width;
                        // }
                        // width = luckysheet_select_save.left + fix - col_pre;
                        width += left - col_pre;
                        left = col_pre;
                        columnseleted[0] = col_st;
                    }
                    
                    //向右滑动或者居中时往左滑动的向下补齐
                    if(columnseleted[1] >= col_st && columnseleted[1] <= col_ed){
                        if(s.column_focus >= col_st && s.column_focus <= col_ed){
                            //width =  width + col - luckysheet_select_save.left-luckysheet_select_save.width;
                            width = col - left;
                        }
                        else{
                            width = col - left;
                        }
                        
                        columnseleted[1] = col_ed;
                    }
                    // if(columnseleted[0]>=col_st && columnseleted[1]<=col_ed){
                    //     left = col_pre;
                    //     width = col - left;

                    //     columnseleted[0] = col_st;
                    //     columnseleted[1] = col_ed;
                    // }
                }

                ismatch = true;
            }
        }
       
        if(ismatch){
            return [columnseleted, rowseleted, top , height, left , width];
        }
        else{
            return null;
        }
    },
    getCellRealSize:function(d, cell_r, cell_c){
        var width = luckysheet.defaultcollen;
        var height = luckysheet.defaultrowlen;
        var celldata = d[cell_r][cell_c];
        if(!!celldata && celldata["mc"]!=null){
            var mc = celldata["mc"];
            var margeset = luckysheet.menuButton.mergeborer(d, mc.r, mc.c);
            if(!!margeset){
                var row = margeset.row[1];
                var row_pre = margeset.row[0];
                var row_index = margeset.row[2];
                var row_index_ed = margeset.row[3];

                var col = margeset.column[1];
                var col_pre = margeset.column[0];
                var col_index = margeset.column[2];
                var col_index_ed = margeset.column[3];                    

                width = col - col_pre - 1;
                height = row - row_pre - 1;
            }
        }
        else{
            var config=luckysheet.getluckysheetfile()[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["config"];
            
            if (config["columlen"] != null && config["columlen"][cell_c] != null) {
                width = config["columlen"][cell_c];
            }
            
            if (config["rowlen"] != null && config["rowlen"][cell_r] != null) {
                height = config["rowlen"][cell_r];
            }
        }

        return [width, height];
    },
    getTextHeightCache:{},
    getTextSize:function(text, font){
        var f = font || '10pt 微软雅黑';
        var _this = this;
        if (f in _this.getTextHeightCache){
            return _this.getTextHeightCache[f];
        }

        if($("#luckysheetTextSizeTest").length==0){
            $('<span id="luckysheetTextSizeTest" style="float:left;white-space:nowrap;visibility:hidden">' + text + '</span>').appendTo($('body'));
        }

        var o = $("#luckysheetTextSizeTest").text(text).css({'font': f}),
            w = o.width(), h = o.height();
        _this.getTextHeightCache[f] = [w, h];
        return [w, h];
    },
    activeFormulaInput:function(row_index, col_index, rowh, columnh, formula, isnull){
        if(isnull==null){
            isnull = false;
        }
        var row_range = luckysheet.rowLocationByIndex(row_index);
        var col_range = luckysheet.colLocationByIndex(col_index);

        luckysheet.luckysheetupdateCell(row_range[1], row_range[0], row_index, col_range[1], col_range[0], col_index, luckysheet.flowdata, true);

        //console.log(row_index, col_index, row, column);
        if(isnull){
            var formulaTxt = '<span dir="auto" class="luckysheet-formula-text-color">=</span><span dir="auto" class="luckysheet-formula-text-color">'+ formula.toUpperCase() +'</span><span dir="auto" class="luckysheet-formula-text-color">(</span><span dir="auto" class="luckysheet-formula-text-color">)</span>';

            $("#luckysheet-rich-text-editor").html(formulaTxt);

            var currSelection = window.getSelection();
            var $span = $("#luckysheet-rich-text-editor").find("span");
            luckysheet.formula.setCaretPosition($span.get($span.length-2), 0, 1);

            return;
        }

        var row_pre = luckysheet.rowLocationByIndex(rowh[0])[0], row = luckysheet.rowLocationByIndex(rowh[1])[1], col_pre = luckysheet.colLocationByIndex(columnh[0])[0], col = luckysheet.colLocationByIndex(columnh[1])[1];

        var formulaTxt = '<span dir="auto" class="luckysheet-formula-text-color">=</span><span dir="auto" class="luckysheet-formula-text-color">'+ formula.toUpperCase() +'</span><span dir="auto" class="luckysheet-formula-text-color">(</span><span class="luckysheet-formula-functionrange-cell" rangeindex="0" dir="auto" style="color:'+ luckyColor[0] +';">'+ luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, {"row":rowh, "column":columnh }, luckysheet.currentSheetIndex) +'</span><span dir="auto" class="luckysheet-formula-text-color">)</span>';

        $("#luckysheet-rich-text-editor").html(formulaTxt);
        //$("#luckysheet-rich-text-editor").html("=" + formula.toUpperCase() + "(" + luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, {"row":row, "column":column }, luckysheet.currentSheetIndex) + ")");

        luckysheet.formula.israngeseleciton();
        luckysheet.formula.rangestart = true;
        luckysheet.formula.rangedrag_column_start = false;
        luckysheet.formula.rangedrag_row_start = false;
        luckysheet.formula.rangechangeindex = 0;
        luckysheet.formula.rangeSetValue({ "row": rowh, "column": columnh });


        luckysheet.formula.func_selectedrange = { "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1, "left_move": col_pre, "width_move": col - col_pre - 1, "top_move": row_pre, "height_move": row - row_pre - 1, "row": [row_index, row_index], "column": [col_index, col_index] };
        
        $("#luckysheet-formula-functionrange-select").css({ "left": col_pre, "width": col - col_pre - 1, "top": row_pre, "height": row - row_pre - 1 }).show();

        $("#luckysheet-formula-help-c").hide();
    },
    backFormulaInput:function(d, r, c, rowh, columnh, formula){
        var f = '='+ formula.toUpperCase() +'('+ luckysheet.sheetmanage.getRangetxt(luckysheet.currentSheetIndex, {"row":rowh, "column":columnh }, luckysheet.currentSheetIndex) +')';
        var v = luckysheet.formula.execfunction(f, r, c);
        var value = { "v": v[1], "f": v[2] };
        luckysheet.setcellvalue(r, c, d, value);
        luckysheet.formula.execFunctionExist.push({ "r": r, "c": c, "i": luckysheet.currentSheetIndex });

        luckysheet.server.historyParam(d, luckysheet.currentSheetIndex, {"row": [r, r], "column": [c, c]});
    },
    checkNoNullValue:function(cell){
        var v = cell;
        if(luckysheet.getObjType(v) == "object"){
            v = v.v;
        }

        if(!luckysheet.func_methods.isRealNull(v) && luckysheet.isdatatypemulti(v).num && (cell.ct == null || cell.ct.t == null || cell.ct.t == "n"  || cell.ct.t == "g")   ){
            return true;
        }
        else{
            return false;
        }
    },
    checkNoNullValueAll:function(cell){
        var v = cell;
        if(luckysheet.getObjType(v) == "object"){
            v = v.v;
        }

        if(!luckysheet.func_methods.isRealNull(v)){
            return true;
        }
        else{
            return false;
        }
    },
    getNoNullValue:function(d, st_x, ed, type){
        var hasValueSum = 0, hasValueStart = null;
        var nullNum = 0, nullTime = 0;
        var _this = this;

        for(var r = ed - 1 ; r >= 0; r--){
            var cell;
            if(type == "c"){
                cell = d[st_x][r];
            }
            else{
                cell = d[r][st_x];
            }

            if(_this.checkNoNullValue(cell)){
                hasValueSum++;
                hasValueStart = r;
            }
            else if(cell == null || cell.v == null || cell.v == ""){
                nullNum++;
                if(nullNum >= 40){
                    if(nullTime <= 0){
                        nullTime = 1;
                    }
                    else{
                        break;
                    }
                }
            }
            else{
                break;
            }
        }

        return hasValueStart;
    },
    singleFormulaInput:function(d, _index, fix, st_m, ed_m, formula, type, noNum, noNull){
        if(type == null){
            type="r";
        }

        if(noNum == null){
            noNum = true;
        }

        if(noNull == null){
            noNull = true;
        }

        var _this = this;
        var isNull = true, isNum= false;
        
        for(var c = st_m; c <= ed_m; c++){
            var cell = null;
            if(type == "c"){
                cell = d[c][fix];
            }
            else{
                cell = d[fix][c];
            }
            if(_this.checkNoNullValue(cell)){
                isNull = false;
                isNum= true;
            }
            else if(_this.checkNoNullValueAll(cell)){
                isNull = false;
            }
        } 

        if(isNull && noNull){
            var st_r_r = _this.getNoNullValue(d, _index, fix, type);
            if(st_r_r == null){
                if(type == "c"){
                    _this.activeFormulaInput(_index, fix, null, null, formula, true);
                }
                else{
                    _this.activeFormulaInput(fix, _index, null, null, formula, true);
                }
            }
            else{
                if(_index==st_m){
                    for(var c = st_m; c <= ed_m; c++){
                        var st_r_r = _this.getNoNullValue(d, c, fix, type);
                        if(st_r_r==null){
                            break;
                        }

                        if(type == "c"){
                            _this.backFormulaInput(d, c, fix, [c, c], [st_r_r, fix-1], formula);
                        }
                        else{
                            _this.backFormulaInput(d, fix, c, [st_r_r, fix-1], [c, c], formula);
                        }
                        
                    }
                }
                else{
                    for(var c = ed_m; c >= st_m; c--){
                        var st_r_r = _this.getNoNullValue(d, c, fix, type);
                        if(st_r_r==null){
                            break;
                        }
                        //_this.backFormulaInput(d, st_r, c, [st_r_r, ed_r-1], [c, c], formula);
                        if(type=="c"){
                            _this.backFormulaInput(d, c, fix, [c, c], [st_r_r, fix-1], formula);
                        }
                        else{
                            _this.backFormulaInput(d, fix, c, [st_r_r, fix-1], [c, c], formula);
                        }
                    }
                }
            }
        }
        else if(isNum && noNum){
            var cell = null;
            if(type=="c"){
                cell = d[ed_m][fix];
            }
            else{
                cell = d[fix][ed_m];
            }
            if(cell!=null && cell.v!=null && cell.v.toString().length>0){
                var c = ed_m;
                if(type=="c"){
                    cell = d[ed_m][fix];
                }
                else{
                    cell = d[fix][ed_m];
                }

                while ( cell!=null && cell.v!=null && cell.v.toString().length>0) {
                    c++;
                    var len = null;
                    if(type=="c"){
                        len = d.length;
                    }
                    else{
                        len = d[0].length;
                    }

                    if(c >= len){
                        return;
                    }
                    //cell = d[fix][c];
                    if(type=="c"){
                        cell = d[c][fix];
                    }
                    else{
                        cell = d[fix][c];
                    }
                }

                if(type=="c"){
                    //_this.backFormulaInput(d, c, fix, [c, c], [st_r_r, fix-1], formula);
                    _this.backFormulaInput(d, c, fix, [st_m, ed_m], [fix ,fix], formula);
                }
                else{
                    _this.backFormulaInput(d, fix, c, [fix ,fix], [st_m, ed_m], formula);
                }
            }
            else{
                if(type=="c"){
                    //_this.backFormulaInput(d, c, fix, [c, c], [st_r_r, fix-1], formula);
                    _this.backFormulaInput(d, ed_m, fix, [st_m, ed_m], [fix ,fix], formula);
                }
                else{
                    _this.backFormulaInput(d, fix, ed_m, [fix ,fix], [st_m, ed_m], formula);
                }
            }
        }
        else{
            return true;
        }

        // luckysheet.formula.execFunctionExist.reverse();
        // luckysheet.formula.execFunctionGroup(null, null, null, null, d);
        // luckysheet.jfrefreshgrid(d, st_r, ed_r, st_c, ed_c);

        // clearTimeout(jfcountfuncTimeout);
        // jfcountfunc();
    },
    autoSelectionFormula:function(formula){
        var _this = this;
        var d = luckysheet.editor.deepCopyFlowData(luckysheet.flowdata);
        var nullfindnum = 40;
        var isfalse = true;
        luckysheet.formula.execFunctionExist = [];

        var execFormulaInput_c = function(){
            var st_c_c = _this.getNoNullValue(d, st_r, ed_c, "c");
            if(st_c_c == null){
                _this.activeFormulaInput(st_r, st_c, null, null, formula, true);
            }
            else{
                _this.activeFormulaInput(st_r, st_c, [st_r ,ed_r], [st_c_c, ed_c-1], formula);
            }
        }

        var execFormulaInput = function(){
            var st_r_c = _this.getNoNullValue(d, st_c, ed_r, "r");
            if(st_r_c == null){
                execFormulaInput_c();
            }
            else{
                _this.activeFormulaInput(st_r, st_c, [st_r_c, ed_r-1], [st_c ,ed_c], formula);
            }
        }

        for(var s = 0; s < luckysheet_select_save.length; s++){
            var st_r = luckysheet_select_save[s].row[0], ed_r = luckysheet_select_save[s].row[1];
            var st_c = luckysheet_select_save[s].column[0], ed_c = luckysheet_select_save[s].column[1];
            var row_index = luckysheet_select_save[s].row_focus, col_index = luckysheet_select_save[s].column_focus;

            if(st_r == ed_r && st_c == ed_c){
                if(ed_r - 1 < 0 && ed_c - 1 < 0){
                    _this.activeFormulaInput(st_r, st_c, null, null, formula, true);
                    return;
                }

                if(ed_r - 1 >= 0 && _this.checkNoNullValue(d[ed_r - 1][st_c])){
                    execFormulaInput();
                }
                else if(ed_c - 1 >= 0 && _this.checkNoNullValue(d[st_r][ed_c - 1])){
                    execFormulaInput_c();
                }
                else{
                    execFormulaInput();
                }
            }
            else if(st_r == ed_r){
                isfalse = _this.singleFormulaInput(d, col_index, st_r, st_c, ed_c, formula, "r");
            }
            else if(st_c == ed_c){
                isfalse = _this.singleFormulaInput(d, row_index, st_c, st_r, ed_r, formula, "c");
            }
            else{
                var r_false = true;
                for(var r = st_r; r <= ed_r; r++){
                    r_false = _this.singleFormulaInput(d, col_index, r, st_c, ed_c, formula, "r",true, false) && r_false;
                }

                var c_false = true;
                for(var c = st_c; c <= ed_c; c++){
                    c_false = _this.singleFormulaInput(d, row_index, c, st_r, ed_r, formula, "c", true, false) && c_false;
                }

                isfalse = !!r_false && !!c_false;
            }
            isfalse = isfalse && isfalse;
        }

        if(!isfalse){
            luckysheet.formula.execFunctionExist.reverse();
            luckysheet.formula.execFunctionGroup(null, null, null, null, d);
            luckysheet.jfrefreshgrid(d, [{"row": [st_r, ed_r], "column": [st_c, ed_c]}]);

            clearTimeout(jfcountfuncTimeout);
            jfcountfuncTimeout = setTimeout(function () { luckysheet.jfcountfunc() }, 500);
        }
    },
    getStyleByCell:function(d, r, c){
        var style = "";
        
        //交替颜色
        var af_compute = luckysheet.alternateformat.getComputeMap();
        var checksAF = luckysheet.alternateformat.checksAF(r, c, af_compute);

        //条件格式
        var cf_compute = luckysheet.conditionformat.getComputeMap();
        var checksCF = luckysheet.conditionformat.checksCF(r, c, cf_compute);

        var cell = d[r][c];
        for(var key in cell){
            var value = luckysheet.menuButton.checkstatus(d, r, c , key);

            if(checksAF != null || (checksCF != null && checksCF["cellColor"] != null)){
                if(checksCF != null && checksCF["cellColor"] != null){
                    style += "background: " + checksCF["cellColor"] + ";";
                }
                else if(checksAF != null){
                    style += "background: " + checksAF[1] + ";";
                }
            }

            if(luckysheet.getObjType(value) == "object"){
                continue;
            }

            if(key == "bg" || checksAF != null || (checksCF != null && checksCF["cellColor"] != null)){
                if(checksCF != null && checksCF["cellColor"] != null){
                    style += "background: " + checksCF["cellColor"] + ";";
                }
                else if(checksAF != null){
                    style += "background: " + checksAF[1] + ";";
                }
                else{
                    style += "background: " + value + ";";
                }
            }

            if(key == "bl" && value != "0"){
                style += "font-weight: bold;";
            }

            if(key == "it" && value != "0"){
                style += "font-style:italic;";
            }

            if(key == "ff" && value != "0"){
                var f = value;
                if(!isNaN(parseInt(value))){
                    f = luckysheet.menuButton.fontarray[parseInt(value)];
                }
                style += "font-family: " + f + ";";
            }

            if(key == "fs" && value != "10"){
                style += "font-size: "+ value + "pt;";
            }

            if((key == "fc" && value != "#000000") || checksAF != null || (checksCF != null && checksCF["textColor"] != null)){
                if(checksCF != null && checksCF["textColor"] != null){
                    style += "color: " + checksCF["textColor"] + ";";
                }
                else if(checksAF != null){
                    style += "color: " + checksAF[0] + ";";
                }
                else{
                    style += "color: " + value + ";";  
                }
            }

            if(key == "ht" && value != "1"){
                if(value == "0"){
                    style += "text-align: center;";
                }
                else if(value == "2"){
                    style += "text-align: right;";
                }
            }

            if(key == "vt" && value != "0"){
                if(value == "1"){
                    style += "vertical-align: top;";
                }
                else if(value == "2"){
                    style += "vertical-align: bottom;";
                }
            }
        }

        return style;
    }
}