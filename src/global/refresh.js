function jfrefreshgrid(data, range, cfg, cdformat, RowlChange) {
    //单元格数据更新联动
    luckysheet.formula.execFunctionExist = [];
    for(var s = 0; s < range.length; s++){
        for(var r = range[s].row[0]; r <= range[s].row[1]; r++){
            for(var c = range[s].column[0]; c <= range[s].column[1]; c++){
                luckysheet.formula.execFunctionExist.push({ "r": r, "c": c, "i": luckysheet.currentSheetIndex });
            }
        }
    }
    luckysheet.formula.execFunctionExist.reverse();
    luckysheet.formula.execFunctionGroup(null, null, null, null, data);
    luckysheet.formula.execFunctionGroupData = null;

    if (clearjfundo) {
        luckysheet.jfundo = [];

        if(cfg == null){
            var curConfig = $.extend(true, {}, config);
        }
        else{
            var curConfig = $.extend(true, {}, cfg);
        }

        if(cdformat == null){
            var curCdformat = $.extend(true, [], luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"]);
        }
        else{
            var curCdformat = cdformat;
        }
        
        luckysheet.jfredo.push({ 
            "type": "datachange", 
            "data": luckysheet.flowdata, 
            "curdata": data, 
            "sheetIndex": luckysheet.currentSheetIndex, 
            "range": range, 
            "config": $.extend(true, {}, config), 
            "curConfig": curConfig,
            "cdformat":  $.extend(true, [], luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"]),
            "curCdformat": curCdformat,
            "RowlChange": RowlChange
        });
    }

    //luckysheet.flowdata
    luckysheet.flowdata = data;
    luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据

    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].data = luckysheet.flowdata;

    //config
    if(cfg != null){
        config = cfg;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

        luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, cfg, { "k": "config" });

        if(RowlChange != null){
            luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);
        }
    }

    //条件格式
    if(cdformat != null){
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"] = cdformat;

        luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, cdformat, { "k": "luckysheet_conditionformat_save" });
    }

    //更新数据的范围
    for(var s = 0; s < range.length; s++){
        var r1 = range[s].row[0];
        var c1 = range[s].column[0];

        if(luckysheet.flowdata[r1][c1] != null && luckysheet.flowdata[r1][c1].spl != null){
            window.luckysheetCurrentRow = r1;
            window.luckysheetCurrentColumn = c1;
            window.luckysheetCurrentFunction = luckysheet.flowdata[r1][c1].f;

            var fp = $.trim(luckysheet.formula.functionParser(luckysheet.flowdata[r1][c1].f));
            var sparklines = eval(fp);
            luckysheet.flowdata[r1][c1].spl = sparklines;
        }

        if(luckysheet.server.allowUpdate){ //共享编辑模式
            luckysheet.server.historyParam(luckysheet.flowdata, luckysheet.currentSheetIndex, range[s]);
        }

        luckysheet.jfrefreshchartall(luckysheet.flowdata, range[s].row[0], range[s].row[1], range[s].column[0], range[s].column[1]);
    }

    //刷新表格
    setTimeout(function () {
        luckysheet.luckysheetrefreshgrid();
    }, 1);

    window.luckysheet_getcelldata_cache = null;

    //编辑器qksheet表格编辑时
    if(luckysheetConfigsetting.pointEdit){
        luckysheet.pointEdit_updateData();
    }
}

function jfrefreshgridall(colwidth, rowheight, data, cfg, range, ctrlType, ctrlValue, cdformat, changeSize) {
    var redo = {};

    if (ctrlType == "cellRowChange") {
        redo["type"] = "cellRowChange";
        redo["config"] = $.extend(true, {}, config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        var setfield = cfg["rowlen"];

        if(setfield == null){
            setfield = {};
        }

        luckysheet.server.saveParam("cg", luckysheet.currentSheetIndex, setfield, { "k": "rowlen" });
    }
    else if (ctrlType.indexOf("extend")>-1) {
        redo["type"] = "extend";
        redo["config"] = $.extend(true, {}, config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        luckysheet.server.saveParam("arc", luckysheet.currentSheetIndex, {"index": ctrlValue.index, "len": ctrlValue.len, "direction": ctrlValue.direction, "mc": cfg.merge }, { "rc": ctrlValue.type });
    }
    else if (ctrlType.indexOf("dele")>-1) {
        redo["type"] = "dele";
        redo["config"] = $.extend(true, {}, config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        luckysheet.server.saveParam("drc", luckysheet.currentSheetIndex, {"index": ctrlValue.index, "len":ctrlValue.len, "mc": cfg.merge, "borderInfo": cfg.borderInfo }, { "rc": ctrlValue.type});
    }
    else {
        //单元格数据更新联动
        luckysheet.formula.execFunctionExist = [];
        for(var s = 0; s < range.length; s++){
            for(var r = range[s].row[0]; r <= range[s].row[1]; r++){
                for(var c = range[s].column[0]; c <= range[s].column[1]; c++){
                    luckysheet.formula.execFunctionExist.push({ "r": r, "c": c, "i": luckysheet.currentSheetIndex });
                }
            }
        }
        luckysheet.formula.execFunctionExist.reverse();
        luckysheet.formula.execFunctionGroup(null, null, null, null, data);
        luckysheet.formula.execFunctionGroupData = null;

        redo["type"] = "datachangeAll";

        redo["range"] = $.extend(true, [], luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        for(var s = 0; s < range.length; s++){
            luckysheet.server.historyParam(data, luckysheet.currentSheetIndex, range[s]);    
        }
    }

    if (clearjfundo) {
        luckysheet.jfundo = [];

        redo["data"] = luckysheet.flowdata;
        redo["curdata"] = data;
        redo["sheetIndex"] = luckysheet.currentSheetIndex;

        redo["cdformat"] = $.extend(true, [], luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"]);
        redo["curCdformat"] = cdformat;

        luckysheet.jfredo.push(redo);
    }

    //luckysheet.flowdata
    luckysheet.flowdata = data;
    luckysheet.editor.webWorkerFlowDataCache(data);//worker存数据
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].data = luckysheet.flowdata;

    //config
    if (cfg != null) {
        config = cfg;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].config = config;

        luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, cfg, { "k": "config" });
    }

    //条件格式
    if(cdformat != null){
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)]["luckysheet_conditionformat_save"] = cdformat;
    
        luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, cdformat, { "k": "luckysheet_conditionformat_save" });
    }

    //选区
    luckysheet_select_save = $.extend(true, [], range);
    if(luckysheet_select_save.length > 0){
        //有选区时，刷新一下选区
        luckysheet.selectHightlightShow();
    }

    //行高、列宽 刷新  
    luckysheet.jfrefreshgrid_rhcw(rowheight, colwidth);

    setTimeout(function () {
        luckysheet.luckysheetrefreshgrid();
    }, 1);

    luckysheet.sheetmanage.storeSheetParamALL();

    if (cfg == null) {
        for(var s = 0; s < range.length; s++){
            luckysheet.jfrefreshchartall(luckysheet.flowdata, range[s].row[0], range[s].row[1], range[s].column[0], range[s].column[1]);
        }
    }
    
    window.luckysheet_getcelldata_cache = null;

    //编辑器qksheet表格编辑时
    if(luckysheetConfigsetting.pointEdit){
        luckysheet.pointEdit_updateData();
    }
}

//删除、增加行列 刷新表格
function jfrefreshgrid_adRC(data, cfg, ctrlType, ctrlValue, calc, filterObj, cf, af, freezen){
    var file = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)];

    //merge改变对应的单元格值改变
    var mcData = [];
    for(var m in cfg["merge"]){
        var mc = cfg["merge"][m];

        for(var r = mc.r; r <= mc.r + mc.rs - 1; r++){
            for(var c = mc.c; c <= mc.c + mc.cs - 1; c++){
                if(data[r][c] == null){
                    data[r][c] = {};
                }

                if(r == mc.r && c == mc.c){
                    data[r][c].mc = mc;
                }
                else{
                    data[r][c].mc = { "r": mc.r, "c": mc.c };
                }

                mcData.push({ "r": r, "c": c });                       
            }
        }
    }

    //公式链中公式范围改变对应单元格值的改变
    var funcData = [];
    if(calc.length > 0){
        luckysheet.formula.execFunctionGroupData = data;

        for(var i = 0; i < calc.length; i++){
            var clc = calc[i];
            var clc_r = clc.r, clc_c = clc.c, clc_i = clc.index, clc_funcStr = clc.func[2];
            var clc_result = luckysheet.formula.execfunction(clc_funcStr, clc_r, clc_c, null, true);
            clc.func = clc_result;

            if(data[clc_r][clc_c].f == clc_funcStr){
                luckysheet.setcellvalue(clc_r, clc_c, data, clc_result[1]);
                funcData.push({ "r": clc_r, "c": clc_c });
            }
        }
    }

    if(clearjfundo){
        luckysheet.jfundo = [];

        luckysheet.jfredo.push({
            "type": ctrlType,
            "sheetIndex": luckysheet.currentSheetIndex,
            "data": luckysheet.flowdata,
            "curData": data,
            "config": $.extend(true, {}, config),
            "curConfig": cfg,
            "ctrlValue": ctrlValue,
            "mcData": mcData,
            "calc": $.extend(true, [], file.calcChain),
            "curCalc": calc,
            "funcData": funcData,
            "filterObj": { "filter_select": $.extend(true, {}, file.filter_select), "filter": $.extend(true, {}, file.filter) },
            "curFilterObj": filterObj,
            "cf": $.extend(true, [], file.luckysheet_conditionformat_save),
            "curCf": cf,
            "af": $.extend(true, [], file.luckysheet_alternateformat_save),
            "curAf": af,
            "freezen": { "freezenhorizontaldata": luckysheetFreezen.freezenhorizontaldata, "freezenverticaldata": luckysheetFreezen.freezenverticaldata },
            "curFreezen": freezen
        });
    }

    var index = ctrlValue.index,
        len = ctrlValue.len,
        rc = ctrlValue.rc;

    if(ctrlType == "addRC"){
        var direction = ctrlValue.direction,
            restore = ctrlValue.restore;

        var addData = [];
        if(restore){
            if(rc == "r"){
                if(direction == "lefttop"){
                    var st_r = index;
                }
                else if(direction == "rightbottom"){
                    var st_r = index + 1;
                }
                var ed_r = st_r + len - 1;

                for(var r = st_r; r <= ed_r; r++){
                    var row = [];
                    for(var c = 0; c < data[0].length; c++){
                        var cell = data[r][c];
                        row.push(cell);
                    }
                    addData.push(row);
                }
            }
            else if(rc == "c"){
                if(direction == "lefttop"){
                    var st_c = index;
                }
                else if(direction == "rightbottom"){
                    var st_c = index + 1;
                }
                var ed_c = st_c + len - 1;

                for(var r = 0; r < data.length; r++){
                    var row = [];
                    for(var c = st_c; c <= ed_c; c++){
                        var cell = data[r][c];
                        row.push(cell);
                    }
                    addData.push(row);
                }
            }
        }

        luckysheet.server.saveParam("arc", luckysheet.currentSheetIndex, {"index": index, "len": len, "direction": direction, "data": addData }, { "rc": rc });
    }
    else if(ctrlType == "delRC"){
        luckysheet.server.saveParam("drc", luckysheet.currentSheetIndex, {"index": index, "len": len }, { "rc": rc });
    }

    //luckysheet.flowdata
    luckysheet.flowdata = data;
    luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据
    file.data = data;

    //config
    config = cfg;
    file.config = config;
    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, cfg, { "k": "config" });

    //mcData
    for(var i = 0; i < mcData.length; i++){
        var mcData_r = mcData[i].r,
            mcData_c = mcData[i].c;

        luckysheet.server.saveParam("v", luckysheet.currentSheetIndex, luckysheet.flowdata[mcData_r][mcData_c], { "r": mcData_r, "c": mcData_c });
    }

    //calc函数链
    file.calcChain = calc;
    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, calc, { "k": "calcChain" });
    for(var i = 0; i < funcData.length; i++){
        var funcData_r = funcData[i].r,
            funcData_c = funcData[i].c;

        luckysheet.server.saveParam("v", luckysheet.currentSheetIndex, luckysheet.flowdata[funcData_r][funcData_c], { "r": funcData_r, "c": funcData_c });
    }

    //筛选配置
    if(filterObj != null){
        file.filter_select = filterObj.filter_select;
        file.filter = filterObj.filter;
    }
    else{
        file.filter_select = null;
        file.filter = null;
    }
    luckysheet.createFilterOptions(file.filter_select, file.filter);
    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, file.filter_select, { "k": "filter_select" });
    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, file.filter, { "k": "filter" });

    //条件格式配置
    file.luckysheet_conditionformat_save = cf;
    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, file.luckysheet_conditionformat_save, { "k": "luckysheet_conditionformat_save" });

    //交替颜色配置
    file.luckysheet_alternateformat_save = af;
    luckysheet.server.saveParam("all", luckysheet.currentSheetIndex, file.luckysheet_alternateformat_save, { "k": "luckysheet_alternateformat_save" });

    //冻结配置
    if(freezen != null){
        luckysheetFreezen.freezenhorizontaldata = freezen.freezenhorizontaldata;
        luckysheetFreezen.freezenverticaldata = freezen.freezenverticaldata;
    }
    else{
        luckysheetFreezen.freezenhorizontaldata = null;
        luckysheetFreezen.freezenverticaldata = null;
    }

    //行高、列宽刷新
    luckysheet.jfrefreshgrid_rhcw(luckysheet.flowdata.length, luckysheet.flowdata[0].length);
}

//复制剪切 刷新表格
function jfrefreshgrid_pastcut(source, target, RowlChange){
    //单元格数据更新联动
    var execF_rc = {};
    luckysheet.formula.execFunctionExist = [];

    for(var r = source["range"].row[0]; r <= source["range"].row[1]; r++){
        for(var c = source["range"].column[0]; c <= source["range"].column[1]; c++){
            if((r + "_" + c + "_" + source["sheetIndex"]) in execF_rc){
                continue;
            }

            execF_rc[r + "_" + c + "_" + source["sheetIndex"]] = 0;
            luckysheet.formula.execFunctionExist.push({ "r": r, "c": c, "i": source["sheetIndex"] });
        }
    }

    for(var r = target["range"].row[0]; r <= target["range"].row[1]; r++){
        for(var c = target["range"].column[0]; c <= target["range"].column[1]; c++){
            if((r + "_" + c + "_" + target["sheetIndex"]) in execF_rc){
                continue;
            }

            execF_rc[r + "_" + c + "_" + target["sheetIndex"]] = 0;
            luckysheet.formula.execFunctionExist.push({ "r": r, "c": c, "i": target["sheetIndex"] });
        }
    }

    luckysheet.formula.execFunctionExist.reverse();
    luckysheet.formula.execFunctionGroup(null, null, null, null, target["curData"]);
    luckysheet.formula.execFunctionGroupData = null;

    if(clearjfundo){
        luckysheet.jfundo = [];

        luckysheet.jfredo.push({
            "type": "pasteCut",
            "source": source,
            "target": target,
            "RowlChange": RowlChange
        })
    }

    //config
    if(luckysheet.currentSheetIndex == source["sheetIndex"]){
        config = source["curConfig"];
        var rowHeight = source["curData"].length;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(target["sheetIndex"])]["config"] = target["curConfig"];
    }
    else if(luckysheet.currentSheetIndex == target["sheetIndex"]){
        config = target["curConfig"];
        var rowHeight = target["curData"].length;
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(source["sheetIndex"])]["config"] = source["curConfig"];
    }

    if(RowlChange){
        visibledatarow = [];
        rh_height = 0;
        for (var i = 0; i < rowHeight; i++) {
            var rowlen = defaultrowlen;
            if (config["rowlen"] != null && config["rowlen"][i] != null) {
                rowlen = config["rowlen"][i];
            }
            if (config["rowhidden"] != null && config["rowhidden"][i] != null) {
                rowlen = config["rowhidden"][i];
                visibledatarow.push(rh_height);
                continue;
            }
            else {
                rh_height += rowlen + 1;
            }
            visibledatarow.push(rh_height);//行的临时长度分布
        }
        rh_height += 110;
        luckysheet.sheetmanage.showSheet();

        if(luckysheet.currentSheetIndex == source["sheetIndex"]){
            var rowlenArr = luckysheet.computeRowlenArr(target["curData"].length, target["curConfig"]);
            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(target["sheetIndex"])]["visibledatarow"] = rowlenArr;
        }
        else if(luckysheet.currentSheetIndex == target["sheetIndex"]){
            var rowlenArr = luckysheet.computeRowlenArr(source["curData"].length, source["curConfig"]);
            luckysheetfile[luckysheet.sheetmanage.getSheetIndex(source["sheetIndex"])]["visibledatarow"] = rowlenArr;
        }
    }

    //luckysheet.flowdata
    if(luckysheet.currentSheetIndex == source["sheetIndex"]){
        luckysheet.flowdata = source["curData"];
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(target["sheetIndex"])]["data"] = target["curData"];
    }
    else if(luckysheet.currentSheetIndex == target["sheetIndex"]){
        luckysheet.flowdata = target["curData"];
        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(source["sheetIndex"])]["data"] = source["curData"];
    }
    luckysheet.editor.webWorkerFlowDataCache(luckysheet.flowdata);//worker存数据
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].data = luckysheet.flowdata;
    
    //luckysheet_select_save
    if(luckysheet.currentSheetIndex == target["sheetIndex"]){
        luckysheet_select_save = [{"row": target["range"].row, "column": target["range"].column}];
    }
    else{
        luckysheet_select_save = [{"row": source["range"].row, "column": source["range"].column}];
    }
    if(luckysheet_select_save.length > 0){
        //有选区时，刷新一下选区
        luckysheet.selectHightlightShow();
    }

    //条件格式
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(source["sheetIndex"])].luckysheet_conditionformat_save = source["curCdformat"];
    luckysheetfile[luckysheet.sheetmanage.getSheetIndex(target["sheetIndex"])].luckysheet_conditionformat_save = target["curCdformat"];

    setTimeout(function () {
        luckysheet.luckysheetrefreshgrid();
    }, 1);

    luckysheet.sheetmanage.storeSheetParamALL();

    luckysheet.jfrefreshchartall(luckysheet.flowdata, 0, luckysheet.flowdata.length - 1, 0, luckysheet.flowdata[0].length - 1);

    //saveparam
    //来源表
    luckysheet.server.saveParam("all", source["sheetIndex"], source["curConfig"], { "k": "config" });
    //目的表
    luckysheet.server.saveParam("all", target["sheetIndex"], target["curConfig"], { "k": "config" });
    
    //来源表
    luckysheet.server.historyParam(source["curData"], source["sheetIndex"], {"row": source["range"]["row"], "column": source["range"]["column"]});
    //目的表
    luckysheet.server.historyParam(target["curData"], target["sheetIndex"], {"row": target["range"]["row"], "column": target["range"]["column"]});

    //编辑器qksheet表格编辑时
    if(luckysheetConfigsetting.pointEdit){
        luckysheet.pointEdit_updateData();
    }
}

//行高、列宽改变 刷新表格
function jfrefreshgrid_rhcw = function(rowheight, colwidth){
    //行高
    if(rowheight != null){
        visibledatarow = [];
        rh_height = 0;

        for (var i = 0; i < rowheight; i++) {
            var rowlen = defaultrowlen;

            if (config["rowlen"] != null && config["rowlen"][i] != null) {
                rowlen = config["rowlen"][i];
            }

            if (config["rowhidden"] != null && config["rowhidden"][i] != null) {
                rowlen = config["rowhidden"][i];
                visibledatarow.push(rh_height);
                continue;
            }
            else {
                rh_height += rowlen + 1;
            }

            visibledatarow.push(rh_height); //行的临时长度分布
        }

        if(!luckysheetConfigsetting.pointEdit){
            //非编辑器qksheet表格编辑状态
            rh_height += 110;
        }
    }

    //列宽
    if(colwidth != null){
        visibledatacolumn = [];
        ch_width = 0;

        var maxColumlen = 120;

        for (var i = 0; i < colwidth; i++) {
            var firstcolumlen = defaultcollen;

            if (config["columlen"] != null && config["columlen"][i] != null) {
                firstcolumlen = config["columlen"][i];
            }
            else {
                if (luckysheet.flowdata[0] != null && luckysheet.flowdata[0][i] != null) {
                    if (firstcolumlen > 300) {
                        firstcolumlen = 300;
                    }
                    else if (firstcolumlen < defaultcollen) {
                        firstcolumlen = defaultcollen;
                    }

                    if (firstcolumlen != defaultcollen) {
                        if (config["columlen"] == null) {
                            config["columlen"] = {};
                        }

                        config["columlen"][i] = firstcolumlen;
                    }
                }
            }

            ch_width += firstcolumlen + 1;

            visibledatacolumn.push(ch_width);//列的临时长度分布

            if(maxColumlen < firstcolumlen + 1){
                maxColumlen = firstcolumlen + 1;
            }
        }

        if(!luckysheetConfigsetting.pointEdit){
            //非编辑器qksheet表格编辑状态
            // ch_width += 120;
            ch_width += maxColumlen;
        }
    }

    luckysheet.sheetmanage.storeSheetParam();

    //行高列宽改变时 重新计算sparklines
    var calcChain = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].calcChain;
    
    if(calcChain != null && calcChain.length > 0){
        if(config["rowlen"] == null){
            config["rowlen"] = {};
        }

        if(config["columlen"] == null){
            config["columlen"] = {};
        }            

        for(var i = 0; i < calcChain.length; i++){
            var r = calcChain[i].r, c = calcChain[i].c, index = calcChain[i].index;

            if(index == luckysheet.currentSheetIndex && luckysheet.flowdata[r][c] != null && luckysheet.flowdata[r][c].spl != null && ((r in config["rowlen"]) || (c in config["columlen"]))){
                window.luckysheetCurrentRow = r;
                window.luckysheetCurrentColumn = c;
                window.luckysheetCurrentFunction = luckysheet.flowdata[r][c].f;

                var fp = $.trim(luckysheet.formula.functionParser(luckysheet.flowdata[r][c].f));
                var sparklines = eval(fp);
                luckysheet.flowdata[r][c].spl = sparklines;

                luckysheet.server.saveParam("v", luckysheet.currentSheetIndex, luckysheet.flowdata[r][c], { "r": r, "c": c });
            }
        }

        luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].data = luckysheet.flowdata;
    }

    //批注框同步
    luckysheet.postil.positionSync();

    //选区同步
    luckysheet.selectHightlightShow();

    //改变单元格行高，复制虚线框同步
    if($(".luckysheet-selection-copy").is(":visible")){
        luckysheet.selectionCopyShow();
    }

    //改变单元格行高，选区下拉icon隐藏
    if($("#luckysheet-dropCell-icon").is(":visible")){
        $("#luckysheet-dropCell-icon").remove();
    }

    //有冻结状态时，同步行高、列宽
    if(luckysheetFreezen.freezenhorizontaldata != null && luckysheetFreezen.freezenverticaldata != null){
        var row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;
        var col_st = luckysheetFreezen.freezenverticaldata[1] - 1;

        var scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
        var scrollLeft = luckysheetFreezen.freezenverticaldata[2];

        var top = visibledatarow[row_st] - 2 - scrollTop + columeHeaderHeight;
        var freezenhorizontaldata = [visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_st + 1), top];
        var left = visibledatacolumn[col_st] - 2 - scrollLeft + rowHeaderWidth;
        var freezenverticaldata = [visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_st + 1), left];

        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, freezenverticaldata, left);
        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
        luckysheetFreezen.createAssistCanvas();
    }
    else if(luckysheetFreezen.freezenhorizontaldata != null){
        var row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;
        var scrollTop = luckysheetFreezen.freezenhorizontaldata[2];

        var top = visibledatarow[row_st] - 2 - scrollTop + columeHeaderHeight;
        var freezenhorizontaldata = [visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(visibledatarow, row_st + 1), top];

        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);
        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
        luckysheetFreezen.createAssistCanvas();
    }
    else if(luckysheetFreezen.freezenverticaldata != null){
        var col_st = luckysheetFreezen.freezenverticaldata[1] - 1;
        var scrollLeft = luckysheetFreezen.freezenverticaldata[2];

        var left = visibledatacolumn[col_st] - 2 - scrollLeft + rowHeaderWidth;
        var freezenverticaldata = [visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(visibledatacolumn, col_st + 1), left];

        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);
        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
        luckysheetFreezen.createAssistCanvas();
    }
    else{
        //有筛选标志时，同步筛选按钮和筛选范围位置
        if($("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").length > 0){
            $("#luckysheet-filter-options-sheet" + luckysheet.currentSheetIndex + " .luckysheet-filter-options").each(function(i, e){
                var str = $(e).data("str"), cindex = $(e).data("cindex");

                var left = visibledatacolumn[cindex] - 20;
                var top = str - 1 == -1 ? 0 : visibledatarow[str - 1];

                $(e).css({ "left": left, "top": top });
            });
        }
    }

    if($("#luckysheet-filter-selected-sheet" + luckysheet.currentSheetIndex).length > 0){
        var luckysheet_filter_save = luckysheetfile[luckysheet.sheetmanage.getSheetIndex(luckysheet.currentSheetIndex)].filter_select;

        var r1 = luckysheet_filter_save.row[0], r2 = luckysheet_filter_save.row[1];
        var c1 = luckysheet_filter_save.column[0], c2 = luckysheet_filter_save.column[1];

        var row = visibledatarow[r2], row_pre = r1 - 1 == -1 ? 0 : visibledatarow[r1 - 1];
        var col = visibledatacolumn[c2], col_pre = c1 - 1 == -1 ? 0 : visibledatacolumn[c1 - 1];

        $("#luckysheet-filter-selected-sheet" + luckysheet.currentSheetIndex).css({
            "left": col_pre,
            "width": col - col_pre - 1,
            "top": row_pre,
            "height": row - row_pre - 1
        });
    }

    luckysheet.sheetmanage.showSheet();

    setTimeout(function () {
        luckysheet.luckysheetrefreshgrid();
    }, 1);

    //编辑器qksheet表格编辑时
    if(luckysheetConfigsetting.pointEdit){
        luckysheet.pointEdit_updateData();
    }
}

//按照scrollHeight, scrollWidth刷新canvas展示数据
function luckysheetrefreshgrid = function (scrollWidth, scrollHeight) {
    luckysheet.formula.groupValuesRefresh();
    
    if (scrollWidth == null) {
        scrollWidth = $("#luckysheet-cell-main").scrollLeft();
    }
    if (scrollHeight == null) {
        scrollHeight = $("#luckysheet-cell-main").scrollTop();
    }

    if (luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null) {
        var freezen_horizon_px, freezen_horizon_ed, freezen_horizon_scrollTop;
        var freezen_vertical_px, freezen_vertical_ed, freezen_vertical_scrollTop;
        var drawWidth = luckysheetTableContentHW[0], drawHeight = luckysheetTableContentHW[1];
        
        if (luckysheetFreezen.freezenverticaldata != null && luckysheetFreezen.freezenhorizontaldata != null) {
            freezen_horizon_px = luckysheetFreezen.freezenhorizontaldata[0];
            freezen_horizon_ed = luckysheetFreezen.freezenhorizontaldata[1];
            freezen_horizon_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];

            freezen_vertical_px = luckysheetFreezen.freezenverticaldata[0];
            freezen_vertical_ed = luckysheetFreezen.freezenverticaldata[1];
            freezen_vertical_scrollTop = luckysheetFreezen.freezenverticaldata[2];

            //左上canvas freezen_3
            luckysheetDrawMain(
                freezen_vertical_scrollTop, 
                freezen_horizon_scrollTop, 
                freezen_vertical_px, 
                freezen_horizon_px, 
                1, 
                1, 
                null, 
                null, 
                "freezen_3"
            );

            //上右canvas freezen_4
            luckysheetDrawMain(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                freezen_horizon_scrollTop, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                freezen_horizon_px, 
                1, 
                1, 
                null, 
                null, 
                "freezen_4"
            );

            //左下canvas freezen_7
            luckysheetDrawMain(
                freezen_vertical_scrollTop, 
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                freezen_vertical_px, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                1, 
                1, 
                null, 
                null, 
                "freezen_7"
            );

            //右下canvas luckysheetTableContent
            luckysheetDrawMain(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                freezen_vertical_px - freezen_vertical_scrollTop + rowHeaderWidth, 
                freezen_horizon_px - freezen_horizon_scrollTop + columeHeaderHeight
            );

            //标题
            luckysheetDrawgridColumnTitle(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                freezen_vertical_px - freezen_vertical_scrollTop + rowHeaderWidth
            );
            luckysheetDrawgridColumnTitle(freezen_vertical_scrollTop, freezen_vertical_px, rowHeaderWidth);
            
            luckysheetDrawgridRowTitle(
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                freezen_horizon_px - freezen_horizon_scrollTop + columeHeaderHeight
            );
            luckysheetDrawgridRowTitle(freezen_horizon_scrollTop, freezen_horizon_px, columeHeaderHeight);
        }
        else if (luckysheetFreezen.freezenhorizontaldata != null) {
            freezen_horizon_px = luckysheetFreezen.freezenhorizontaldata[0];
            freezen_horizon_ed = luckysheetFreezen.freezenhorizontaldata[1];
            freezen_horizon_scrollTop = luckysheetFreezen.freezenhorizontaldata[2];

            luckysheetDrawMain(
                scrollWidth, 
                freezen_horizon_scrollTop, 
                drawWidth, 
                freezen_horizon_px, 
                1, 
                1, 
                null, 
                null, 
                "freezen_h"
            );
            luckysheetDrawMain(
                scrollWidth, 
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                drawWidth, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                null, 
                freezen_horizon_px - freezen_horizon_scrollTop + columeHeaderHeight
            );
        
            luckysheetDrawgridColumnTitle(scrollWidth, drawWidth, null);
            
            luckysheetDrawgridRowTitle(
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                freezen_horizon_px - freezen_horizon_scrollTop + columeHeaderHeight
            );
            luckysheetDrawgridRowTitle(freezen_horizon_scrollTop, freezen_horizon_px, columeHeaderHeight);
        }
        else if (luckysheetFreezen.freezenverticaldata != null) {
            freezen_vertical_px = luckysheetFreezen.freezenverticaldata[0];
            freezen_vertical_ed = luckysheetFreezen.freezenverticaldata[1];
            freezen_vertical_scrollTop = luckysheetFreezen.freezenverticaldata[2];
            
            luckysheetDrawMain(
                freezen_vertical_scrollTop, 
                scrollHeight, 
                freezen_vertical_px, 
                drawHeight, 
                1, 
                1, 
                null, 
                null, 
                "freezen_v"
            );
            luckysheetDrawMain(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                scrollHeight, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                drawHeight, 
                freezen_vertical_px - freezen_vertical_scrollTop + rowHeaderWidth, 
                null
            );
            
            luckysheetDrawgridRowTitle(scrollHeight, drawHeight, null);
            
            luckysheetDrawgridColumnTitle(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                freezen_vertical_px - freezen_vertical_scrollTop + rowHeaderWidth
            );
            luckysheetDrawgridColumnTitle(freezen_vertical_scrollTop, freezen_vertical_px, rowHeaderWidth);
        }
    }
    else {
        luckysheetDrawgrid(scrollWidth, scrollHeight);
    }
}

export {
    jfrefreshgrid,
    jfrefreshgridall,
    jfrefreshgrid_adRC,
    jfrefreshgrid_pastcut,
    jfrefreshgrid_rhcw,
    luckysheetrefreshgrid,
}