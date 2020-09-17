import rhchInit from './rhchInit';
import formula from './formula';
import editor from './editor';
import { setcellvalue } from './setdata';
import { getcellFormula } from './getdata';
import { computeRowlenArr } from './getRowlen';
import { 
    luckysheetDrawMain, 
    luckysheetDrawgridRowTitle, 
    luckysheetDrawgridColumnTitle 
} from './draw';
import luckysheetFreezen from '../controllers/freezen';
import server from '../controllers/server';
import sheetmanage from '../controllers/sheetmanage';
import luckysheetPostil from '../controllers/postil';
import dataVerificationCtrl from '../controllers/dataVerificationCtrl';
import { selectHightlightShow, selectionCopyShow } from '../controllers/select';
import { createFilterOptions } from '../controllers/filter';
import { getSheetIndex } from '../methods/get';
import Store from '../store';

function jfrefreshgrid(data, range, cfg, cdformat, RowlChange, dataVerification, isRunExecFunction=true, isRefreshCanvas=true) {
    if(data == null){
        data = Store.flowdata;
    }
    if(range == null){
        range = Store.luckysheet_select_save;
    }
    //单元格数据更新联动
    if (isRunExecFunction) {
        formula.execFunctionExist = [];
        for(let s = 0; s < range.length; s++){
            for(let r = range[s].row[0]; r <= range[s].row[1]; r++){
                for(let c = range[s].column[0]; c <= range[s].column[1]; c++){
                    formula.execFunctionExist.push({ "r": r, "c": c, "i": Store.currentSheetIndex });
                }
            }
        }
        formula.execFunctionExist.reverse();
        formula.execFunctionGroup(null, null, null, null, data);
        formula.execFunctionGroupData = null;
    }

    if (Store.clearjfundo) {
        Store.jfundo = [];

        let curConfig;
        if(cfg == null){
            curConfig = $.extend(true, {}, Store.config);
        }
        else{
            curConfig = $.extend(true, {}, cfg);
        }

        let curCdformat;
        if(cdformat == null){
            curCdformat = $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"]);
        }
        else{
            curCdformat = cdformat;
        }

        let curDataVerification;
        if(dataVerification == null){
            curDataVerification = $.extend(true, {}, Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dataVerification"])
        }
        else{
            curDataVerification = dataVerification;
        }
        
        Store.jfredo.push({ 
            "type": "datachange", 
            "data": Store.flowdata, 
            "curdata": data, 
            "sheetIndex": Store.currentSheetIndex, 
            "range": range, 
            "config": $.extend(true, {}, Store.config), 
            "curConfig": curConfig,
            "cdformat":  $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"]),
            "curCdformat": curCdformat,
            "RowlChange": RowlChange,
            "dataVerification": $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dataVerification"]),
            "curDataVerification": curDataVerification
        });
    }

    //Store.flowdata
    Store.flowdata = data;
    editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;

    //config
    if(cfg != null){
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

        server.saveParam("all", Store.currentSheetIndex, cfg, { "k": "config" });

        if(RowlChange != null){
            jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
        }
    }

    //条件格式
    if(cdformat != null){
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] = cdformat;

        server.saveParam("all", Store.currentSheetIndex, cdformat, { "k": "luckysheet_conditionformat_save" });
    }

    //数据验证
    if(dataVerification != null){
        dataVerificationCtrl.dataVerification = dataVerification;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dataVerification"] = dataVerification;
        server.saveParam("all", Store.currentSheetIndex, dataVerification, { "k": "dataVerification" });
    }

    //更新数据的范围
    for(let s = 0; s < range.length; s++){
        let r1 = range[s].row[0];
        let c1 = range[s].column[0];

        if(Store.flowdata[r1][c1] != null && Store.flowdata[r1][c1].spl != null){
            window.luckysheetCurrentRow = r1;
            window.luckysheetCurrentColumn = c1;
            window.luckysheetCurrentFunction = Store.flowdata[r1][c1].f;

            let fp = $.trim(formula.functionParser(Store.flowdata[r1][c1].f));
            let sparklines = eval(fp);
            Store.flowdata[r1][c1].spl = sparklines;
        }

        if(server.allowUpdate){ //共享编辑模式
            server.historyParam(Store.flowdata, Store.currentSheetIndex, range[s]);
        }
        // 刷新图表
        if(typeof(Store.chartparam.jfrefreshchartall)=="function"){
            Store.chartparam.jfrefreshchartall(Store.flowdata,range[s].row[0],range[s].row[1],range[s].column[0],range[s].column[1]);
        }
    }

    //刷新表格
    if(isRefreshCanvas){
        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    }

    window.luckysheet_getcelldata_cache = null;
}

function jfrefreshgridall(colwidth, rowheight, data, cfg, range, ctrlType, ctrlValue, cdformat, isRefreshCanvas=true) {
    let redo = {};

    if (ctrlType == "cellRowChange") {
        redo["type"] = "cellRowChange";
        redo["config"] = $.extend(true, {}, Store.config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], Store.luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        let setfield = cfg["rowlen"];

        if(setfield == null){
            setfield = {};
        }

        server.saveParam("cg", Store.currentSheetIndex, setfield, { "k": "rowlen" });
    }
    else if (ctrlType == "resizeC") {
        redo["type"] = "resize";
        redo["config"] = $.extend(true, {}, Store.config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], Store.luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        let setfield = cfg["columnlen"];

        if(setfield == null){
            setfield = {};
        }

        server.saveParam("cg", Store.currentSheetIndex, setfield, { "k": "columnlen" });
    }
    else if (ctrlType.indexOf("extend")>-1) {
        redo["type"] = "extend";
        redo["config"] = $.extend(true, {}, Store.config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], Store.luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        server.saveParam("arc", Store.currentSheetIndex, {"index": ctrlValue.index, "len": ctrlValue.len, "direction": ctrlValue.direction, "mc": cfg.merge }, { "rc": ctrlValue.type });
    }
    else if (ctrlType.indexOf("dele")>-1) {
        redo["type"] = "dele";
        redo["config"] = $.extend(true, {}, Store.config);
        redo["curconfig"] = $.extend(true, {}, cfg);

        redo["range"] = $.extend(true, [], Store.luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        server.saveParam("drc", Store.currentSheetIndex, {"index": ctrlValue.index, "len":ctrlValue.len, "mc": cfg.merge, "borderInfo": cfg.borderInfo }, { "rc": ctrlValue.type});
    }
    else {
        //单元格数据更新联动
        formula.execFunctionExist = [];
        for(let s = 0; s < range.length; s++){
            for(let r = range[s].row[0]; r <= range[s].row[1]; r++){
                for(let c = range[s].column[0]; c <= range[s].column[1]; c++){
                    formula.execFunctionExist.push({ "r": r, "c": c, "i": Store.currentSheetIndex });
                }
            }
        }
        formula.execFunctionExist.reverse();
        formula.execFunctionGroup(null, null, null, null, data);
        formula.execFunctionGroupData = null;

        redo["type"] = "datachangeAll";

        redo["range"] = $.extend(true, [], Store.luckysheet_select_save);
        redo["currange"] = range;

        redo["ctrlType"] = ctrlType;
        redo["ctrlValue"] = ctrlValue;

        for(let s = 0; s < range.length; s++){
            server.historyParam(data, Store.currentSheetIndex, range[s]);    
        }
    }

    if (Store.clearjfundo) {
        Store.jfundo = [];

        redo["data"] = Store.flowdata;
        redo["curdata"] = data;
        redo["sheetIndex"] = Store.currentSheetIndex;
        redo["cdformat"] = $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"]);
        redo["curCdformat"] = cdformat;

        Store.jfredo.push(redo);
    }

    //Store.flowdata
    Store.flowdata = data;
    editor.webWorkerFlowDataCache(data);//worker存数据
    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;

    //config
    if (cfg != null) {
        Store.config = cfg;
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].config = Store.config;

        server.saveParam("all", Store.currentSheetIndex, cfg, { "k": "config" });
    }

    //条件格式
    if(cdformat != null){
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] = cdformat;
    
        server.saveParam("all", Store.currentSheetIndex, cdformat, { "k": "luckysheet_conditionformat_save" });
    }

    //选区
    Store.luckysheet_select_save = $.extend(true, [], range);
    if(Store.luckysheet_select_save.length > 0){
        //有选区时，刷新一下选区
        selectHightlightShow();
    }

    //行高、列宽 刷新  
    jfrefreshgrid_rhcw(rowheight, colwidth);

    if(isRefreshCanvas){
        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    }
    

    sheetmanage.storeSheetParamALL();
    
    window.luckysheet_getcelldata_cache = null;
}

function jfrefreshrange(data, range, cdformat) {
    //单元格数据更新联动
    formula.execFunctionExist = [];
    for(let s = 0; s < range.length; s++){
        for(let r = range[s].row[0]; r <= range[s].row[1]; r++){
            for(let c = range[s].column[0]; c <= range[s].column[1]; c++){
                formula.execFunctionExist.push({ "r": r, "c": c, "i": Store.currentSheetIndex });
            }
        }
    }
    formula.execFunctionExist.reverse();
    formula.execFunctionGroup(null, null, null, null, data);
    formula.execFunctionGroupData = null;

    if (Store.clearjfundo) {
        Store.jfundo = [];

        Store.jfredo.push({ 
            "type": "rangechange", 
            "data": Store.flowdata, 
            "curdata": data, 
            "range": range, 
            "sheetIndex": Store.currentSheetIndex,
            "cdformat":  $.extend(true, [],  Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"]),
            "curCdformat": cdformat 
        });
    }

    //flowdata
    Store.flowdata = data;
    editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;

    //条件格式
    if(cdformat != null){
        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] = cdformat;
    }

    //刷新表格
    setTimeout(function () {
        luckysheetrefreshgrid();
    }, 1);

    //发送给后台
    for(let s = 0; s < range.length; s++){
        server.historyParam(Store.flowdata, Store.currentSheetIndex, range[s]);
    }
}

//删除、增加行列 刷新表格
function jfrefreshgrid_adRC(data, cfg, ctrlType, ctrlValue, calc, filterObj, cf, af, freezen, dataVerification){
    let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

    //merge改变对应的单元格值改变
    let mcData = [];
    for(let m in cfg["merge"]){
        let mc = cfg["merge"][m];

        for(let r = mc.r; r <= mc.r + mc.rs - 1; r++){
            for(let c = mc.c; c <= mc.c + mc.cs - 1; c++){
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
    let funcData = [];
    if(calc.length > 0){
        formula.execFunctionGroupData = data;

        for(let i = 0; i < calc.length; i++){
            let clc = calc[i];
            let clc_r = clc.r, clc_c = clc.c, clc_i = clc.index, clc_funcStr =  getcellFormula(clc_r, clc_c, clc_i);
            let clc_result = formula.execfunction(clc_funcStr, clc_r, clc_c, null, true);
            clc.func = clc_result;

            if(data[clc_r][clc_c].f == clc_funcStr){
                setcellvalue(clc_r, clc_c, data, clc_result[1]);
                funcData.push({ "r": clc_r, "c": clc_c });
            }
        }
    }

    if(Store.clearjfundo){
        Store.jfundo = [];

        Store.jfredo.push({
            "type": ctrlType,
            "sheetIndex": Store.currentSheetIndex,
            "data": Store.flowdata,
            "curData": data,
            "config": $.extend(true, {}, Store.config),
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
            "curFreezen": freezen,
            "dataVerification": $.extend(true, {}, file.dataVerification),
            "curDataVerification": dataVerification
        });
    }

    let index = ctrlValue.index,
        len = ctrlValue.len,
        rc = ctrlValue.rc;

    if(ctrlType == "addRC"){
        let direction = ctrlValue.direction,
            restore = ctrlValue.restore;

        let addData = [];
        if(restore){
            if(rc == "r"){
                let st_r;
                if(direction == "lefttop"){
                    st_r = index;
                }
                else if(direction == "rightbottom"){
                    st_r = index + 1;
                }
                let ed_r = st_r + len - 1;

                for(let r = st_r; r <= ed_r; r++){
                    let row = [];
                    for(let c = 0; c < data[0].length; c++){
                        let cell = data[r][c];
                        row.push(cell);
                    }
                    addData.push(row);
                }
            }
            else if(rc == "c"){
                let st_c;
                if(direction == "lefttop"){
                    st_c = index;
                }
                else if(direction == "rightbottom"){
                    st_c = index + 1;
                }
                let ed_c = st_c + len - 1;

                for(let r = 0; r < data.length; r++){
                    let row = [];
                    for(let c = st_c; c <= ed_c; c++){
                        let cell = data[r][c];
                        row.push(cell);
                    }
                    addData.push(row);
                }
            }
        }

        server.saveParam("arc", Store.currentSheetIndex, {"index": index, "len": len, "direction": direction, "data": addData }, { "rc": rc });
    }
    else if(ctrlType == "delRC"){
        server.saveParam("drc", Store.currentSheetIndex, {"index": index, "len": len }, { "rc": rc });
    }

    //Store.flowdata
    Store.flowdata = data;
    editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
    file.data = data;

    //config
    Store.config = cfg;
    file.config = Store.config;
    server.saveParam("all", Store.currentSheetIndex, cfg, { "k": "config" });

    //mcData
    for(let i = 0; i < mcData.length; i++){
        let mcData_r = mcData[i].r,
            mcData_c = mcData[i].c;

        server.saveParam("v", Store.currentSheetIndex, Store.flowdata[mcData_r][mcData_c], { "r": mcData_r, "c": mcData_c });
    }

    //calc函数链
    file.calcChain = calc;
    server.saveParam("all", Store.currentSheetIndex, calc, { "k": "calcChain" });
    for(let i = 0; i < funcData.length; i++){
        let funcData_r = funcData[i].r,
            funcData_c = funcData[i].c;

        server.saveParam("v", Store.currentSheetIndex, Store.flowdata[funcData_r][funcData_c], { "r": funcData_r, "c": funcData_c });
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
    createFilterOptions(file.filter_select, file.filter);
    server.saveParam("all", Store.currentSheetIndex, file.filter_select, { "k": "filter_select" });
    server.saveParam("all", Store.currentSheetIndex, file.filter, { "k": "filter" });

    //条件格式配置
    file.luckysheet_conditionformat_save = cf;
    server.saveParam("all", Store.currentSheetIndex, file.luckysheet_conditionformat_save, { "k": "luckysheet_conditionformat_save" });

    //交替颜色配置
    file.luckysheet_alternateformat_save = af;
    server.saveParam("all", Store.currentSheetIndex, file.luckysheet_alternateformat_save, { "k": "luckysheet_alternateformat_save" });

    //冻结配置
    if(freezen != null){
        luckysheetFreezen.freezenhorizontaldata = freezen.freezenhorizontaldata;
        luckysheetFreezen.freezenverticaldata = freezen.freezenverticaldata;
    }
    else{
        luckysheetFreezen.freezenhorizontaldata = null;
        luckysheetFreezen.freezenverticaldata = null;
    }

    //数据验证
    dataVerificationCtrl.dataVerification = dataVerification;
    file.dataVerification = dataVerification;
    server.saveParam("all", Store.currentSheetIndex, file.dataVerification, { "k": "dataVerification" });

    //行高、列宽刷新
    jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
}

//删除单元格 刷新表格
function jfrefreshgrid_deleteCell(data, cfg, ctrl, calc, filterObj, cf, dataVerification){
    let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

    //merge改变对应的单元格值改变
    let mcData = [];
    if(JSON.stringify(cfg["merge"]) == "{}"){
        for(let r = 0; r < data.length; r++){
            for(let c = 0; c < data[0].length; c++){
                let cell = data[r][c];
    
                if(cell != null && cell.mc != null){
                    delete cell.mc;
                    mcData.push({ "r": r, "c": c });
                }
            }
        }
    }
    else{
        for(let m in cfg["merge"]){
            let mc = cfg["merge"][m];
    
            for(let r = mc.r; r <= mc.r + mc.rs - 1; r++){
                for(let c = mc.c; c <= mc.c + mc.cs - 1; c++){
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
    }

    //公式链中公式范围改变对应单元格值的改变
    let funcData = [];
    if(calc.length > 0){
        formula.execFunctionGroupData = data;

        for(let i = 0; i < calc.length; i++){
            let clc = calc[i];
            let clc_r = clc.r, clc_c = clc.c, clc_i = clc.index, clc_funcStr =  getcellFormula(clc_r, clc_c, clc_i);
            let clc_result = formula.execfunction(clc_funcStr, clc_r, clc_c, null, true);
            clc.func = clc_result;

            if(data[clc_r][clc_c].f == clc_funcStr){
                setcellvalue(clc_r, clc_c, data, clc_result[1]);
                funcData.push({ "r": clc_r, "c": clc_c });
            }
        }
    }

    if(Store.clearjfundo){
        Store.jfundo = [];

        Store.jfredo.push({
            "type": "deleteCell",
            "sheetIndex": Store.currentSheetIndex,
            "ctrl": ctrl,
            "data": Store.flowdata,
            "curData": data,
            "config": $.extend(true, {}, Store.config),
            "curConfig": cfg,
            "mcData": mcData,
            "calc": $.extend(true, [], file.calcChain),
            "curCalc": calc,
            "funcData": funcData,
            "filterObj": { "filter_select": $.extend(true, {}, file.filter_select), "filter": $.extend(true, {}, file.filter) },
            "curFilterObj": filterObj,
            "cf": $.extend(true, [], file.luckysheet_conditionformat_save),
            "curCf": cf,
            "dataVerification": $.extend(true, {}, file.dataVerification),
            "curDataVerification": dataVerification
        });
    }

    //Store.flowdata
    Store.flowdata = data;
    editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
    file.data = data;

    //共享编辑模式
    if(server.allowUpdate){
        let type = ctrl.type,
            str = ctrl.str,
            edr = ctrl.edr,
            stc = ctrl.stc,
            edc = ctrl.edc;

        let range;
        if(type == 'moveUp'){
            range = {
                "row": [str, data.length - 1],
                "column": [stc, edc]
            }
        }
        else if(type == 'moveLeft'){
            range = {
                "row": [str, edr],
                "column": [stc, data[0].length - 1]
            };
        }

        server.historyParam(Store.flowdata, Store.currentSheetIndex, range);
    }

    //config
    Store.config = cfg;
    file.config = Store.config;
    server.saveParam("all", Store.currentSheetIndex, cfg, { "k": "config" });

    //mcData
    for(let i = 0; i < mcData.length; i++){
        let mcData_r = mcData[i].r,
            mcData_c = mcData[i].c;

        server.saveParam("v", Store.currentSheetIndex, Store.flowdata[mcData_r][mcData_c], { "r": mcData_r, "c": mcData_c });
    }

    //calc函数链
    file.calcChain = calc;
    server.saveParam("all", Store.currentSheetIndex, calc, { "k": "calcChain" });
    for(let i = 0; i < funcData.length; i++){
        let funcData_r = funcData[i].r,
            funcData_c = funcData[i].c;

        server.saveParam("v", Store.currentSheetIndex, Store.flowdata[funcData_r][funcData_c], { "r": funcData_r, "c": funcData_c });
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
    createFilterOptions(file.filter_select, file.filter);
    server.saveParam("all", Store.currentSheetIndex, file.filter_select, { "k": "filter_select" });
    server.saveParam("all", Store.currentSheetIndex, file.filter, { "k": "filter" });

    //条件格式配置
    file.luckysheet_conditionformat_save = cf;
    server.saveParam("all", Store.currentSheetIndex, file.luckysheet_conditionformat_save, { "k": "luckysheet_conditionformat_save" });

    //数据验证
    dataVerificationCtrl.dataVerification = dataVerification;
    file.dataVerification = dataVerification;
    server.saveParam("all", Store.currentSheetIndex, file.dataVerification, { "k": "dataVerification" });

    setTimeout(function () {
        luckysheetrefreshgrid();
    }, 1);
}

//复制剪切 刷新表格
function jfrefreshgrid_pastcut(source, target, RowlChange){
    //单元格数据更新联动
    let execF_rc = {};
    formula.execFunctionExist = [];

    for(let r = source["range"].row[0]; r <= source["range"].row[1]; r++){
        for(let c = source["range"].column[0]; c <= source["range"].column[1]; c++){
            if((r + "_" + c + "_" + source["sheetIndex"]) in execF_rc){
                continue;
            }

            execF_rc[r + "_" + c + "_" + source["sheetIndex"]] = 0;
            formula.execFunctionExist.push({ "r": r, "c": c, "i": source["sheetIndex"] });
        }
    }

    for(let r = target["range"].row[0]; r <= target["range"].row[1]; r++){
        for(let c = target["range"].column[0]; c <= target["range"].column[1]; c++){
            if((r + "_" + c + "_" + target["sheetIndex"]) in execF_rc){
                continue;
            }

            execF_rc[r + "_" + c + "_" + target["sheetIndex"]] = 0;
            formula.execFunctionExist.push({ "r": r, "c": c, "i": target["sheetIndex"] });
        }
    }

    formula.execFunctionExist.reverse();
    formula.execFunctionGroup(null, null, null, null, target["curData"]);
    formula.execFunctionGroupData = null;

    if(Store.clearjfundo){
        Store.jfundo = [];

        Store.jfredo.push({
            "type": "pasteCut",
            "source": source,
            "target": target,
            "RowlChange": RowlChange
        })
    }

    //config
    let rowHeight;
    if(Store.currentSheetIndex == source["sheetIndex"]){
        Store.config = source["curConfig"];
        rowHeight = source["curData"].length;
        Store.luckysheetfile[getSheetIndex(target["sheetIndex"])]["config"] = target["curConfig"];
    }
    else if(Store.currentSheetIndex == target["sheetIndex"]){
        Store.config = target["curConfig"];
        rowHeight = target["curData"].length;
        Store.luckysheetfile[getSheetIndex(source["sheetIndex"])]["config"] = source["curConfig"];
    }

    if(RowlChange){
        Store.visibledatarow = [];
        Store.rh_height = 0;
        
        for (let i = 0; i < rowHeight; i++) {
            let rowlen = Store.defaultrowlen;
            
            if (Store.config["rowlen"] != null && Store.config["rowlen"][i] != null) {
                rowlen = Store.config["rowlen"][i];
            }

            if (Store.config["rowhidden"] != null && Store.config["rowhidden"][i] != null) {
                rowlen = Store.config["rowhidden"][i];
                Store.visibledatarow.push(Store.rh_height);
                continue;
            }
            else {
                Store.rh_height += rowlen + 1;
            }

            Store.visibledatarow.push(Store.rh_height);//行的临时长度分布
        }
        Store.rh_height += 110;
        sheetmanage.showSheet();

        if(Store.currentSheetIndex == source["sheetIndex"]){
            let rowlenArr = computeRowlenArr(target["curData"].length, target["curConfig"]);
            Store.luckysheetfile[getSheetIndex(target["sheetIndex"])]["visibledatarow"] = rowlenArr;
        }
        else if(Store.currentSheetIndex == target["sheetIndex"]){
            let rowlenArr = computeRowlenArr(source["curData"].length, source["curConfig"]);
            Store.luckysheetfile[getSheetIndex(source["sheetIndex"])]["visibledatarow"] = rowlenArr;
        }
    }

    //Store.flowdata
    if(Store.currentSheetIndex == source["sheetIndex"]){
        Store.flowdata = source["curData"];
        Store.luckysheetfile[getSheetIndex(target["sheetIndex"])]["data"] = target["curData"];
    }
    else if(Store.currentSheetIndex == target["sheetIndex"]){
        Store.flowdata = target["curData"];
        Store.luckysheetfile[getSheetIndex(source["sheetIndex"])]["data"] = source["curData"];
    }
    editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
    Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;
    
    //luckysheet_select_save
    if(Store.currentSheetIndex == target["sheetIndex"]){
        Store.luckysheet_select_save = [{"row": target["range"].row, "column": target["range"].column}];
    }
    else{
        Store.luckysheet_select_save = [{"row": source["range"].row, "column": source["range"].column}];
    }
    if(Store.luckysheet_select_save.length > 0){
        //有选区时，刷新一下选区
        selectHightlightShow();
    }

    //条件格式
    Store.luckysheetfile[getSheetIndex(source["sheetIndex"])].luckysheet_conditionformat_save = source["curCdformat"];
    Store.luckysheetfile[getSheetIndex(target["sheetIndex"])].luckysheet_conditionformat_save = target["curCdformat"];

    //数据验证
    if(Store.currentSheetIndex == source["sheetIndex"]){
        dataVerificationCtrl.dataVerification = source["curDataVerification"];
    }
    else if(Store.currentSheetIndex == target["sheetIndex"]){
        dataVerificationCtrl.dataVerification = target["curDataVerification"]
    }
    Store.luckysheetfile[getSheetIndex(source["sheetIndex"])].dataVerification = source["curDataVerification"];
    Store.luckysheetfile[getSheetIndex(target["sheetIndex"])].dataVerification = target["curDataVerification"];

    setTimeout(function () {
        luckysheetrefreshgrid();
    }, 1);

    sheetmanage.storeSheetParamALL();

    //saveparam
    //来源表
    server.saveParam("all", source["sheetIndex"], source["curConfig"], { "k": "config" });
    //目的表
    server.saveParam("all", target["sheetIndex"], target["curConfig"], { "k": "config" });
    
    //来源表
    server.historyParam(source["curData"], source["sheetIndex"], {"row": source["range"]["row"], "column": source["range"]["column"]});
    //目的表
    server.historyParam(target["curData"], target["sheetIndex"], {"row": target["range"]["row"], "column": target["range"]["column"]});

    //来源表
    server.saveParam("all", source["sheetIndex"], source["curCdformat"], { "k": "luckysheet_conditionformat_save" });
    //目的表
    server.saveParam("all", target["sheetIndex"], target["curCdformat"], { "k": "luckysheet_conditionformat_save" });

    //来源表
    server.saveParam("all", source["sheetIndex"], source["curDataVerification"], { "k": "dataVerification" });
    //目的表
    server.saveParam("all", target["sheetIndex"], target["curDataVerification"], { "k": "dataVerification" });
}

//行高、列宽改变 刷新表格
function jfrefreshgrid_rhcw(rowheight, colwidth, isRefreshCanvas=true){
    rhchInit(rowheight, colwidth);

    sheetmanage.storeSheetParam();

    //行高列宽改变时 重新计算sparklines
    let calcChain = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].calcChain;
    
    if(calcChain != null && calcChain.length > 0){
        if(Store.config["rowlen"] == null){
            Store.config["rowlen"] = {};
        }

        if(Store.config["columnlen"] == null){
            Store.config["columnlen"] = {};
        }            

        for(let i = 0; i < calcChain.length; i++){
            let r = calcChain[i].r, c = calcChain[i].c, index = calcChain[i].index;

            if(index == Store.currentSheetIndex && Store.flowdata[r][c] != null && Store.flowdata[r][c].spl != null && ((r in Store.config["rowlen"]) || (c in Store.config["columnlen"]))){
                window.luckysheetCurrentRow = r;
                window.luckysheetCurrentColumn = c;
                window.luckysheetCurrentFunction = Store.flowdata[r][c].f;

                let fp = $.trim(formula.functionParser(Store.flowdata[r][c].f));
                let sparklines = eval(fp);
                Store.flowdata[r][c].spl = sparklines;

                server.saveParam("v", Store.currentSheetIndex, Store.flowdata[r][c], { "r": r, "c": c });
            }
        }

        Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].data = Store.flowdata;
    }

    //批注框同步
    luckysheetPostil.positionSync();

    //选区同步
    selectHightlightShow();

    //改变单元格行高，复制虚线框同步
    if($(".luckysheet-selection-copy").is(":visible")){
        selectionCopyShow();
    }

    //改变单元格行高，选区下拉icon隐藏
    if($("#luckysheet-dropCell-icon").is(":visible")){
        $("#luckysheet-dropCell-icon").remove();
    }

    //有冻结状态时，同步行高、列宽
    if(luckysheetFreezen.freezenhorizontaldata != null && luckysheetFreezen.freezenverticaldata != null){
        let row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;
        let col_st = luckysheetFreezen.freezenverticaldata[1] - 1;

        let scrollTop = luckysheetFreezen.freezenhorizontaldata[2];
        let scrollLeft = luckysheetFreezen.freezenverticaldata[2];

        let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columeHeaderHeight;
        let freezenhorizontaldata = [
            Store.visibledatarow[row_st], 
            row_st + 1, 
            scrollTop, 
            luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1), 
            top
        ];
        let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
        let freezenverticaldata = [
            Store.visibledatacolumn[col_st], 
            col_st + 1, 
            scrollLeft, 
            luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1), 
            left
        ];

        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, freezenverticaldata, left);
        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
        luckysheetFreezen.createAssistCanvas();
    }
    else if(luckysheetFreezen.freezenhorizontaldata != null){
        let row_st = luckysheetFreezen.freezenhorizontaldata[1] - 1;
        let scrollTop = luckysheetFreezen.freezenhorizontaldata[2];

        let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columeHeaderHeight;
        let freezenhorizontaldata = [
            Store.visibledatarow[row_st], 
            row_st + 1, 
            scrollTop, 
            luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1), 
            top
        ];

        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);
        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
        luckysheetFreezen.createAssistCanvas();
    }
    else if(luckysheetFreezen.freezenverticaldata != null){
        let col_st = luckysheetFreezen.freezenverticaldata[1] - 1;
        let scrollLeft = luckysheetFreezen.freezenverticaldata[2];

        let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
        let freezenverticaldata = [
            Store.visibledatacolumn[col_st], 
            col_st + 1, 
            scrollLeft, 
            luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1), 
            left
        ];

        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);
        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
        luckysheetFreezen.createAssistCanvas();
    }
    else{
        //有筛选标志时，同步筛选按钮和筛选范围位置
        if($("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").length > 0){
            $("#luckysheet-filter-options-sheet" + Store.currentSheetIndex + " .luckysheet-filter-options").each(function(i, e){
                let str = $(e).data("str"), cindex = $(e).data("cindex");

                let left = Store.visibledatacolumn[cindex] - 20;
                let top = str - 1 == -1 ? 0 : Store.visibledatarow[str - 1];

                $(e).css({ "left": left, "top": top });
            });
        }
    }

    if($("#luckysheet-filter-selected-sheet" + Store.currentSheetIndex).length > 0){
        let luckysheet_filter_save = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)].filter_select;

        let r1 = luckysheet_filter_save.row[0], 
            r2 = luckysheet_filter_save.row[1];
        let c1 = luckysheet_filter_save.column[0], 
            c2 = luckysheet_filter_save.column[1];

        let row = Store.visibledatarow[r2], 
            row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
        let col = Store.visibledatacolumn[c2], 
            col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

        $("#luckysheet-filter-selected-sheet" + Store.currentSheetIndex).css({
            "left": col_pre,
            "width": col - col_pre - 1,
            "top": row_pre,
            "height": row - row_pre - 1
        });
    }

    sheetmanage.showSheet();

    if(isRefreshCanvas){
        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    }
   
}

//Refresh the canvas display data according to scrollHeight and scrollWidth
function luckysheetrefreshgrid(scrollWidth, scrollHeight) {
    formula.groupValuesRefresh();
    
    if (scrollWidth == null) {
        scrollWidth = $("#luckysheet-cell-main").scrollLeft();
    }
    if (scrollHeight == null) {
        scrollHeight = $("#luckysheet-cell-main").scrollTop();
    }

    if (luckysheetFreezen.freezenverticaldata != null || luckysheetFreezen.freezenhorizontaldata != null) {
        let freezen_horizon_px, freezen_horizon_ed, freezen_horizon_scrollTop;
        let freezen_vertical_px, freezen_vertical_ed, freezen_vertical_scrollTop;
        let drawWidth = Store.luckysheetTableContentHW[0], drawHeight = Store.luckysheetTableContentHW[1];
        
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
                freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth, 
                freezen_horizon_px - freezen_horizon_scrollTop + Store.columeHeaderHeight
            );

            //标题
            luckysheetDrawgridColumnTitle(freezen_vertical_scrollTop, freezen_vertical_px, Store.rowHeaderWidth);
            luckysheetDrawgridColumnTitle(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth
            );
            
            luckysheetDrawgridRowTitle(freezen_horizon_scrollTop, freezen_horizon_px, Store.columeHeaderHeight);
            luckysheetDrawgridRowTitle(
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                freezen_horizon_px - freezen_horizon_scrollTop + Store.columeHeaderHeight
            );
           
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
                freezen_horizon_px - freezen_horizon_scrollTop + Store.columeHeaderHeight
            );
        
            luckysheetDrawgridColumnTitle(scrollWidth, drawWidth, null);
            
            luckysheetDrawgridRowTitle(freezen_horizon_scrollTop, freezen_horizon_px, Store.columeHeaderHeight);
            luckysheetDrawgridRowTitle(
                scrollHeight + freezen_horizon_px - freezen_horizon_scrollTop, 
                drawHeight - freezen_horizon_px + freezen_horizon_scrollTop, 
                freezen_horizon_px - freezen_horizon_scrollTop + Store.columeHeaderHeight
            );
            
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
                freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth, 
                null
            );
            
            luckysheetDrawgridRowTitle(scrollHeight, drawHeight, null);
            
            luckysheetDrawgridColumnTitle(freezen_vertical_scrollTop, freezen_vertical_px, Store.rowHeaderWidth);
            luckysheetDrawgridColumnTitle(
                scrollWidth + freezen_vertical_px - freezen_vertical_scrollTop, 
                drawWidth - freezen_vertical_px + freezen_vertical_scrollTop, 
                freezen_vertical_px - freezen_vertical_scrollTop + Store.rowHeaderWidth
            );
            
        }
    }
    else {
        if($("#luckysheetTableContent").length == 0){
            return;
        }
        let luckysheetTableContent = $("#luckysheetTableContent").get(0).getContext("2d");
        luckysheetDrawMain(scrollWidth, scrollHeight);
    
        // luckysheetTableContent.clearRect(0, 0, 46, 20);
        
        luckysheetDrawgridColumnTitle(scrollWidth);
        luckysheetDrawgridRowTitle(scrollHeight);

        //清除canvas左上角区域 防止列标题栏序列号溢出显示
        
        luckysheetTableContent.clearRect(0, 0, (Store.rowHeaderWidth* Store.devicePixelRatio-1) , (Store.columeHeaderHeight* Store.devicePixelRatio-1) );
    }
}

export {
    jfrefreshgrid,
    jfrefreshgridall,
    jfrefreshrange,
    jfrefreshgrid_adRC,
    jfrefreshgrid_deleteCell,
    jfrefreshgrid_pastcut,
    jfrefreshgrid_rhcw,
    luckysheetrefreshgrid,
}