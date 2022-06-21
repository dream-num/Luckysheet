import { getObjType } from '../utils/util';
import { isRealNull, isRealNum, isEditMode } from './validate';
import { isdatetime, diff } from './datecontroll';
import tooltip from './tooltip';
import editor from './editor';
import { rowlenByRange } from './getRowlen';
import { jfrefreshgrid } from './refresh';
import {checkProtectionAuthorityNormal} from '../controllers/protection';
import Store from '../store';
import locale from '../locale/locale';
import numeral from 'numeral';

//数据排序方法
function orderbydata(data, index, isAsc) {
    if (isAsc == null) {
        isAsc = true;
    }

    let a = function (x, y) {
        let x1 = x[index] , y1 = y[index];

        if(getObjType(x[index]) == "object"){
            x1 = x[index].v;
        }

        if(getObjType(y[index]) == "object"){
            y1 = y[index].v;
        }

        if(isRealNull(x1)){
            return 1;
        }

        if(isRealNull(y1)){
            return -1;
        }

        if (isdatetime(x1) && isdatetime(y1)) {
            return diff(x1, y1);
        }
        else if (isRealNum(x1) && isRealNum(y1)) {
            return numeral(x1).value() - numeral(y1).value();
        }
        else if (!isRealNum(x1) && !isRealNum(y1)) {
            return x1.localeCompare(y1, "zh");
        }
        else if (!isRealNum(x1)) {
            return 1;
        }
        else if (!isRealNum(y1)) {
            return -1;
        }
    }

    let d = function (x, y) {
        let x1 = x[index] , y1 = y[index];

        if(getObjType(x[index]) == "object"){
            x1 = x[index].v;
        }

        if(getObjType(y[index]) == "object"){
            y1 = y[index].v;
        }

        if(isRealNull(x1)){
            return 1;
        }

        if(isRealNull(y1)){
            return -1;
        }

        if (isdatetime(x1) && isdatetime(y1)) {
            return diff(y1, x1);
        }
        else if (isRealNum(x1) && isRealNum(y1)) {
            return numeral(y1).value() - numeral(x1).value();
        }
        else if (!isRealNum(x1) && !isRealNum(y1)) {
            return y1.localeCompare(x1, "zh");
        }
        else if (!isRealNum(x1)) {
            return -1;
        }
        else if (!isRealNum(y1)) {
            return 1;
        }
    }

    if (isAsc) {
        return data.sort(a);
    }
    else {
        return data.sort(d);
    }
}

function orderbydata1D(data, isAsc) {
    if (isAsc == null) {
        isAsc = true;
    }

    let a = function (x, y) {
        let x1 = x, y1 = y;

        if(getObjType(x) == "object"){
            x1 = x.v;
        }

        if(getObjType(y) == "object"){
            y1 = y.v;
        }

        if(x1 == null){
            x1 = "";
        }

        if(y1 == null){
            y1 = "";
        }

        if (isdatetime(x1) && isdatetime(y1)) {
            return diff(x1, y1);
        }
        else if (isRealNum(x1) && isRealNum(y1)) {
            return numeral(x1).value() - numeral(y1).value();
        }
        else if (!isRealNum(x1) && !isRealNum(y1)) {
            return x1.localeCompare(y1, "zh");
        }
        else if (!isRealNum(x1)) {
            return 1;
        }
        else if (!isRealNum(y1)) {
            return -1;
        }
    }

    let d = function (x, y) {
        let x1 = x, y1 = y;

        if(getObjType(x) == "object"){
            x1 = x.v;
        }

        if(getObjType(y) == "object"){
            y1 = y.v;
        }

        if(x1 == null){
            x1 = "";
        }

        if(y1 == null){
            y1 = "";
        }

        if (isdatetime(x1) && isdatetime(y1)) {
            return diff(y1, x1);
        }
        else if (isRealNum(x1) && isRealNum(y1)) {
            return numeral(y1).value() - numeral(x1).value();
        }
        else if (!isRealNum(x1) && !isRealNum(y1)) {
            return y1.localeCompare(x1, "zh");
        }
        else if (!isRealNum(x1)) {
            return -1;
        }
        else if (!isRealNum(y1)) {
            return 1;
        }
    }

    if (isAsc) {
        return data.sort(a);
    }
    else {
        return data.sort(d);
    }
}

//排序选区数据
function sortSelection(isAsc) {
    if(!checkProtectionAuthorityNormal(Store.currentSheetIndex, "sort")){
        return;
    }

    const _locale = locale();
    const locale_sort = _locale.sort;

    if(Store.luckysheet_select_save.length > 1){
        if(isEditMode()){
            alert(locale_sort.noRangeError);
        }
        else{
            tooltip.info(locale_sort.noRangeError, "");
        }

        return;
    }

    if(isAsc == null){
        isAsc = true;
    }

    let d = editor.deepCopyFlowData(Store.flowdata);

    let r1 = Store.luckysheet_select_save[0].row[0], 
        r2 = Store.luckysheet_select_save[0].row[1];
    let c1 = Store.luckysheet_select_save[0].column[0], 
        c2 = Store.luckysheet_select_save[0].column[1];

    let str, edr;

    for(let r = r1; r <= r2; r++){
        if(d[r] != null && d[r][c1] != null){
            let cell = d[r][c1];

            if(cell.mc != null || isRealNull(cell.v)){
                continue;
            }

            if(str == null && /[\u4e00-\u9fa5]+/g.test(cell.v)){
                str = r + 1;
                edr = r + 1;
                continue;
            }
            
            if(str == null){
                str = r;    
            }

            edr = r;
        }
    }

    if(str == null || str > r2){
        return;
    }

    let hasMc = false; //排序选区是否有合并单元格
    let data = [];

    for(let r = str; r <= edr; r++){
        let data_row = [];

        for(let c = c1; c <= c2; c++){
            if(d[r][c] != null && d[r][c].mc != null){
                hasMc = true;
                break;
            }

            data_row.push(d[r][c]);
        }

        data.push(data_row);
    }

    if(hasMc){
        if(isEditMode()){
            alert(locale_sort.mergeError);
        }
        else{
            tooltip.info(locale_sort.mergeError, "");
        }

        return;
    }

    data = orderbydata(data, 0, isAsc);

    for(let r = str; r <= edr; r++){
        for(let c = c1; c <= c2; c++){
            d[r][c] = data[r - str][c - c1];
        }
    }

    let allParam = {};
    if(Store.config["rowlen"] != null){
        let cfg = $.extend(true, {}, Store.config);
        cfg = rowlenByRange(d, str, edr, cfg);

        allParam = {
            "cfg": cfg,
            "RowlChange": true
        }
    }

    jfrefreshgrid(d, [{ "row": [str, edr], "column": [c1, c2] }], allParam);
}

//排序一列数据
function sortColumnSeletion(colIndex, isAsc) {
    if(!checkProtectionAuthorityNormal(Store.currentSheetIndex, "sort")){
        return;
    }
    if(isAsc == null){
        isAsc = true;
    }

    const _locale = locale();
    const locale_sort = _locale.sort;

    let d = editor.deepCopyFlowData(Store.flowdata);

    let r1 = 0, r2 = d.length - 1;
    let c1 = 0, c2 = d[0].length - 1;

    let str, edr;

    for(let r = r1; r <= r2; r++){
        if(d[r][colIndex] != null && d[r][colIndex].mc != null){
            continue;
        }

        if(d[r][colIndex] != null && !isRealNull(d[r][colIndex].v) && /[\u4e00-\u9fa5]+/g.test(d[r][colIndex].v) && str == null){
            str = r + 1;
            edr = r + 1;
            continue;
        }

        if(str == null){
            str = r;    
        }

        if(d[r][colIndex] != null && !isRealNull(d[r][colIndex].v)){
            edr = r;
        }
    }

    if(str == null || str > r2){
        return;
    }

    let hasMc = false; //排序选区是否有合并单元格
    let data = [];

    for(let r = str; r <= edr; r++){
        let data_row = [];

        for(let c = c1; c <= c2; c++){
            if(d[r][c] != null && d[r][c].mc != null){
                hasMc = true;
                break;
            }

            data_row.push(d[r][c]);
        }

        data.push(data_row);
    }

    if(hasMc){
        if(isEditMode()){
            alert(locale_sort.columnSortMergeError);
        }
        else{
            tooltip.info(locale_sort.columnSortMergeError, "");
        }

        return;
    }

    data = orderbydata(data, colIndex, isAsc);

    for(let r = str; r <= edr; r++){
        for(let c = c1; c <= c2; c++){
            d[r][c] = data[r - str][c - c1];
        }
    }

    let allParam = {};
    if(Store.config["rowlen"] != null){
        let cfg = $.extend(true, {}, Store.config);
        cfg = rowlenByRange(d, str, edr, cfg);

        allParam = {
            "cfg": cfg,
            "RowlChange": true
        }
    }

    jfrefreshgrid(d, [{ "row": [str, edr], "column": [c1, c2] }], allParam);
}

export {
    orderbydata,
    orderbydata1D,
    sortSelection,
    sortColumnSeletion,
}