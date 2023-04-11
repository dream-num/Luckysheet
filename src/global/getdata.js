import { getObjType,rgbTohex } from '../utils/util';
import { getSheetIndex } from '../methods/get';
import server from '../controllers/server';
import formula from './formula';
import editor from './editor';
import { dynamicArrayCompute } from './dynamicArray';
import sheetmanage from '../controllers/sheetmanage';
import { isInlineStringCT,isInlineStringCell,convertCssToStyleList } from '../controllers/inlineString';
import locale from '../locale/locale';
import Store from '../store';

//Get selection range value
export function getdatabyselection(range, sheetIndex) {
    if(range == null){
        range = Store.luckysheet_select_save[0];
    }

    if (range["row"] == null || range["row"].length == 0) {
        return [];
    }

    //取数据
    let d, cfg;
    if(sheetIndex != null && sheetIndex != Store.currentSheetIndex){
        d = Store.luckysheetfile[getSheetIndex(sheetIndex)]["data"];
        cfg = Store.luckysheetfile[getSheetIndex(sheetIndex)]["config"];
    }
    else{
        d = editor.deepCopyFlowData(Store.flowdata);
        cfg = Store.config;    
    }

    let data = [];

    for (let r = range["row"][0]; r <= range["row"][1]; r++) {
        if(d[r] == null){
            continue;
        }

        if (cfg["rowhidden"] != null && cfg["rowhidden"][r] != null) {
            continue;
        }

        let row = [];

        for (let c = range["column"][0]; c <= range["column"][1]; c++) {
            row.push(d[r][c]);
        }

        data.push(row);
    }

    return data;
}

export function getdatabyselectionD(d, range) {
    if (range == null || range["row"] == null || range["row"].length == 0) {
        return [];
    }
    
    let dynamicArray_compute = dynamicArrayCompute(Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["dynamicArray"]);
    let data = [];

    if(d==null){
        return data;
    }

    for (let r = range["row"][0]; r <= range["row"][1]; r++) {
        if(d[r] == null){
            continue;
        }

        // if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {
        //     continue;
        // }

        let row = [];

        for (let c = range["column"][0]; c <= range["column"][1]; c++) {
            let value;
            
            if((r + "_" + c) in dynamicArray_compute){
                value = dynamicArray_compute[r + "_" + c];
            }
            else{
                value = d[r][c];
            }

            row.push(value);
        }

        data.push(row);
    }

    return data;
}

export function getdatabyselectionNoCopy(range) {
    if (range == null || range["row"] == null || range["row"].length == 0) {
        return [];
    }

    let data = [];

    for (let r = range["row"][0]; r <= range["row"][1]; r++) {
        let row = [];
        
        if (Store.config["rowhidden"] != null && Store.config["rowhidden"][r] != null) {
            continue;
        }

        for (let c = range["column"][0]; c <= range["column"][1]; c++) {
            let value = "";

            if (Store.flowdata[r] != null && Store.flowdata[r][c] != null) {
                value = Store.flowdata[r][c];
            }

            row.push(value);
        }
        
        data.push(row);
    }

    return data;
}

//Get the value of the cell
export function getcellvalue(r, c, data, type) {
    if (type == null) {
        type = "v";
    }

    if (data == null) {
        data = Store.flowdata;
    }

    let d_value;

    if (r != null && c != null) {
        d_value = data[r][c];
    }
    else if (r != null) {
        d_value = data[r];
    }
    else if (c != null) {
        let newData = data[0].map(function(col, i) {
            return data.map(function(row) {
                return row[i];
            })
        });
        d_value = newData[c];
    }
    else {
        return data;
    }

    let retv = d_value;

    if(getObjType(d_value) == "object"){
        retv = d_value[type];

        if (type == "f" && retv != null) {
            retv = formula.functionHTMLGenerate(retv);
        }
        else if(type == "f") {
            retv = d_value["v"];
        }
        else if(d_value && d_value.ct && d_value.ct.t == 'd') {
            retv = d_value.m;
        }
    }

    if(retv == undefined){
        retv = null;
    }

    return retv;
}

//Data increase in rows and columns
export function datagridgrowth(data, addr, addc, iscallback) {
    if (addr <= 0 && addc <= 0) {
        return data;
    }

    if (addr <= 0) {
        addr = 0;
    }

    if (addc <= 0) {
        addc = 0;
    }

    let dataClen = 0;
    if (data.length == 0) {
        data = [];
        dataClen = 0;
    }
    else {
        dataClen = data[0].length;
    }

    let coladd = [];//需要额外增加的空列
    for (let c = 0; c < addc; c++) {
        coladd.push(null);
    }

    let rowadd = [];//完整的一个空行
    for (let r = 0; r < dataClen + addc; r++) {
        rowadd.push(null);
    }

    for (let r = 0; r < data.length; r++) {
        data[r] = [].concat(data[r].concat(coladd));
    }

    for (let r = 0; r < addr; r++) {
        data.push([].concat(rowadd));
    }

    if(!!iscallback){
        server.saveParam("all", Store.currentSheetIndex, data.length, { "k": "row" });
        server.saveParam("all", Store.currentSheetIndex, data[0].length, { "k": "column" });
    }

    return data;
}


//Get the formula of the cell
export function getcellFormula(r, c, i, data) {
    let cell;
    if(data!=null){
        cell = data[r][c];
    }
    else{
        cell = getOrigincell(r,c,i);
    }

    
    if(cell==null){
        return null;
    }

    return cell.f;
}


export function getOrigincell(r, c, i) {
    if(r==null || c==null){
        return;
    }
    let data;
    if (i == null) {
        data = Store.flowdata;
    }
    else{
        let sheet = sheetmanage.getSheetByIndex(i);
        data = sheet.data;
    }

    if(!data || !data[r] || !data[r][c]){
        return;
    }

    return data[r][c];


}

export function getRealCellValue(r, c){
    let value = getcellvalue(r, c, null, "m");
    if(value == null){
        value = getcellvalue(r, c);
        if(value==null){
            let ct = getcellvalue(r, c, null, "ct");
            if(isInlineStringCT(ct)){
                value = ct.s;
            }
        }
    }

    return value;
}

export function getInlineStringNoStyle(r, c){
    let ct = getcellvalue(r, c, null, "ct");
    if(isInlineStringCT(ct)){
        let strings = ct.s, value="";
        for(let i=0;i<strings.length;i++){
            let strObj = strings[i];
            if(strObj.v!=null){
                value += strObj.v;
            }
        }
        return value;
    }

    return "";
}

export function getInlineStringStyle(r, c, data){
    let ct = getcellvalue(r, c, data, "ct");
    if (data == null) {
        data = Store.flowdata;
    }
    let cell = data[r][c];
    if(isInlineStringCT(ct)){
        let strings = ct.s, value="";
        for(let i=0;i<strings.length;i++){
            let strObj = strings[i];
            if(strObj.v!=null){
                let style = getFontStyleByCell(strObj);
                value += "<span index='"+ i +"' style='"+ style +"'>" + strObj.v + "</span>";
            }
        }
        return value;
    }

    return "";
}

export function getFontStyleByCell(cell,checksAF,checksCF, isCheck=true){
    if(cell==null){
        return;
    }
    let style = "";
    const _locale = locale();
    const locale_fontarray = _locale.fontarray;
    for(let key in cell){
        let value = cell[key];
        if(isCheck){
            value = checkstatusByCell(cell, key);
        }
        if(key == "bl" && value != "0"){
            style += "font-weight: bold;";
        }

        if(key == "it" && value != "0"){
            style += "font-style:italic;";
        }

        if(key == "ff"){
            let f = value;
            if(!isNaN(parseInt(value))){
                f = locale_fontarray[parseInt(value)];
            }
            else{
                f = value;
            }
            style += "font-family: " + f + ";";
        }

        if(key == "fs"){
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

        if(key == "cl" && value != "0"){
            style += "text-decoration: line-through;";
        }

    }
    return style;
}

export function checkstatusByCell(cell, a){
    let foucsStatus =cell;
    let tf = {"bl":1, "it":1 , "ff":1, "cl":1, "un":1};

    if(a in tf || (a=="fs" && isInlineStringCell(cell)) ){
        if(foucsStatus == null){
            foucsStatus = "0";
        }
        else{
            // var  w = window.getSelection(), isInlineEdit=false; 
            // if(w.type!="None"){
            //     var range = w.getRangeAt(0);
            //     let startContainer = range.startContainer;
            //     if (parseInt($("#luckysheet-input-box").css("top")) > 0 && startContainer.parentNode.tagName=="SPAN" && !range.collapsed) {
            //         let span = startContainer.parentNode;
            //         let styleList = convertCssToStyleList(span.style.cssText);
            //         foucsStatus = styleList[a];
            //         isInlineEdit = true;
            //     }
            // }
            
            // if(!isInlineEdit){       
            //     if(isInlineStringCell(cell)){
            //         foucsStatus = cell.ct.s[0][a];
            //     }
            //     else{
            //         foucsStatus = foucsStatus[a];
            //     }
            // }   
            
            foucsStatus = foucsStatus[a];
            
            if(foucsStatus == null){
                foucsStatus = "0";
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
                foucsStatus = rgbTohex(foucsStatus);
            }
        }
    }
    else if(a == "bg"){
        if(foucsStatus == null){
            foucsStatus = null;
        }
        else{
            foucsStatus = foucsStatus[a];

            if(foucsStatus == null){
                foucsStatus = null;
            }
            else if(foucsStatus.toString().indexOf("rgba") > -1){
                foucsStatus = rgbTohex(foucsStatus);
            }
        }
    }
    else if(a.substr(0, 2) == "bs"){
        if(foucsStatus == null){
            foucsStatus = "none";
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = "none";
            }
        }
    }
    else if(a.substr(0, 2) == "bc"){
        if(foucsStatus == null){
            foucsStatus = "#000000";
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
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

        if(["0", "1", "2"].indexOf(foucsStatus.toString()) == -1){
            foucsStatus = "1";
        }
    }
    else if(a == "vt"){//默认垂直居中
        if(foucsStatus == null){
            foucsStatus = "0";
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = "0";
            }
        }

        if(["0", "1", "2"].indexOf(foucsStatus.toString()) == -1){
            foucsStatus = "0";
        }
    }
    else if(a == "ct"){
        if(foucsStatus == null){
            foucsStatus = null;
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = null;
            }
        }
    }
    else if(a == "fs"){
        if(foucsStatus == null){
            foucsStatus = String(Store.defaultFontSize);
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = String(Store.defaultFontSize);
            }
        }
    }
    else if(a == "tb"){
        if(foucsStatus == null){
            foucsStatus = "0";
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = "0";
            }
        }
    }
    else if(a == "tr"){
        if(foucsStatus == null){
            foucsStatus = "0";
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = "0";
            }
        }
    }
    else if(a == "rt"){
        if(foucsStatus == null){
            foucsStatus = null;
        }
        else{
            foucsStatus = foucsStatus[a];
            if(foucsStatus == null){
                foucsStatus = null;
            }
        }
    }

    return foucsStatus;
}

export function textTrim(x) {
    if(x==null || x.length==0){
        return x;
    }
    return x.replace(/^\s+|\s+$/gm,'');
}