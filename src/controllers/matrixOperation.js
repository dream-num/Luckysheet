import selection from './selection';
import { 
    getObjType,
    chatatABC,
    numFormat,
    luckysheetContainerFocus,
} from '../utils/util';
import { hasPartMC, isEditMode } from '../global/validate';
import { getdatabyselection, getcellvalue } from '../global/getdata';
import tooltip from '../global/tooltip';
import editor from '../global/editor';
import locale from '../locale/locale';
import Store from '../store';

export function initialMatrixOperation(){
    const locale_drag = locale().drag;

    //右键功能键
    //复制为json格式字符串，首行为标题
    $("#luckysheet-copy-json-head").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");   
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        if (getdata.length == 1) {
            let obj = {};
            for (let i = 0; i < getdata[0].length; i++) {
                obj[getcellvalue(0, i, getdata)] = "";
            }
            arr.push(obj);
        }
        else {
            for (let r = 1; r < getdata.length; r++) {
                let obj = {};
                for (let c = 0; c < getdata[0].length; c++) {
                    if(getcellvalue(0, c, getdata) == undefined){
                        obj[""] = getcellvalue(r, c, getdata);
                    }else{
                        obj[getcellvalue(0, c, getdata)] = getcellvalue(r, c, getdata);
                    }
                }
                arr.push(obj);
            }
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为json格式字符串，无标题，采用ABCD作为标题
    $("#luckysheet-copy-json-nohead").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();


        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        let st = Store.luckysheet_select_save[0]["column"][0];
        for (let r = 0; r < getdata.length; r++) {
            let obj = {};
            for (let c = 0; c < getdata[0].length; c++) {
                obj[chatatABC(c + st)] = getcellvalue(r, c, getdata);
            }
            arr.push(obj);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为一维数组
    $("#luckysheet-copy-array1").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (let r = 0; r < getdata.length; r++) {
            for (let c = 0; c < getdata[0].length; c++) {
                arr.push(getcellvalue(r, c, getdata));
            }
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为二维数组
    $("#luckysheet-copy-array2").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();


        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (let r = 0; r < getdata.length; r++) {
            let a = [];
            for (let c = 0; c < getdata[0].length; c++) {
                a.push(getcellvalue(r, c, getdata));
            }
            arr.push(a);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为多维数组
    $("#luckysheet-copy-arraymore-confirm").click(function (event) {

        // Click input element, don't comfirm 
        if(event.target.nodeName === 'INPUT'){
            return;
        }

        $("body .luckysheet-cols-menu").hide();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        for (let r = 0; r < getdata.length; r++) {
            for (let c = 0; c < getdata[0].length; c++) {
                arr.push(getdata[r][c]);
            }
        }

        let row = $("#luckysheet-copy-arraymore-row").val(), col = $("#luckysheet-copy-arraymore-col").val();

        if (row == "" && col == "") {
            selection.copybyformat(event, JSON.stringify(arr));
            $("body .luckysheet-cols-menu").hide();
            return;
        }

        if (row == "") {
            row = 1;
        }
        else {
            row = parseInt(row);
            if (row == null) {
                row = 1;
            }
        }

        if (col == "") {
            col = 1;
        }
        else {
            col = parseInt(col);
            if (col == null) {
                col = 1;
            }
        }

        if(row.toString() == "NaN" || col.toString() == "NaN"){
            if(isEditMode()){
                alert(locale_drag.inputCorrect);
            }
            else{
                tooltip.info(locale_drag.inputCorrect, "");
            }
            return;
        }

        if(row < 1 || col < 1){
            if(isEditMode()){
                alert(locale_drag.notLessOne);
            }
            else{
                tooltip.info(locale_drag.notLessOne, "");
            }
            return;
        }

        let arrlen = arr.length, i = 0, ret = [];
        for (let r = 0; r < row; r++) {
            let a = [];
            for (let c = 0; c < col; c++) {
                a.push(arr[i++]);
                if (i >= arrlen) {
                    selection.copybyformat(event, JSON.stringify(ret));
                    $("body .luckysheet-cols-menu").hide();
                    return;
                }
            }
            ret.push(a);
        }

        selection.copybyformat(event, JSON.stringify(ret));
    });

    //复制为对角线
    $("#luckysheet-copy-diagonal").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        let clen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            if (r >= clen) {
                break;
            }
            arr.push(getdata[r][r]);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为反对角线
    $("#luckysheet-copy-antidiagonal").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();


        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        let clen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            if (r >= clen) {
                break;
            }
            arr.push(getdata[r][clen - r - 1]);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为对角偏移n列
    $("#luckysheet-copy-diagonaloffset").click(function (event) {

        // Click input element, don't comfirm 
        if(event.target.nodeName === 'INPUT'){
            return;
        }
        
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }

        let clen = getdata[0].length, 
            offset = parseInt($("#luckysheet-copy-diagonaloffset-value").val());

        if(offset.toString() == "NaN"){
            if(isEditMode()){
                alert(locale_drag.inputCorrect);
            }
            else{
                tooltip.info(locale_drag.inputCorrect, "");
            }
            return;
        }

        if(offset < 0){
            if(isEditMode()){
                alert(locale_drag.offsetColumnLessZero);
            }
            else{
                tooltip.info(locale_drag.offsetColumnLessZero, "");
            }
            return;
        }

        if (offset == null) {
            offset = 1;
        }

        for (let r = 0; r < getdata.length; r++) {
            if (r + offset >= clen) {
                break;
            }
            arr.push(getdata[r][r + offset]);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //复制为布尔值
    $("#luckysheet-copy-boolvalue").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();


        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        //复制范围内包含部分合并单元格，提示
        if(Store.config["merge"] != null){
            let has_PartMC = false;

            for(let s = 0; s < Store.luckysheet_select_save.length; s++){
                let r1 = Store.luckysheet_select_save[s].row[0], 
                    r2 = Store.luckysheet_select_save[s].row[1];
                let c1 = Store.luckysheet_select_save[s].column[0], 
                    c2 = Store.luckysheet_select_save[s].column[1];

                has_PartMC = hasPartMC(Store.config, r1, r2, c1, c2);

                if(has_PartMC){
                    break;
                }
            }

            if(has_PartMC){
                if(isEditMode()){
                    alert(locale_drag.noPartMerge);
                }
                else{
                    tooltip.info(locale_drag.noPartMerge, ""); 
                }
                return;    
            }
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        let arr = [];
        if (getdata.length == 0) {
            return;
        }
        for (let r = 0; r < getdata.length; r++) {
            let a = [];
            for (let c = 0; c < getdata[0].length; c++) {
                let bool = false;

                let v;
                if(getObjType(getdata[r][c]) == "object"){
                    v = getdata[r][c].v;
                }
                else{
                    v = getdata[r][c];
                }

                if (v == null || v == "") {
                    bool = false;
                }
                else {
                    v = parseInt(v);
                    if (v == null || v > 0) {
                        bool = true;
                    }
                    else {
                        bool = false;
                    }
                }
                a.push(bool);
            }
            arr.push(a);
        }

        selection.copybyformat(event, JSON.stringify(arr));
    });

    //矩阵操作选区 翻转 上下
    $("#luckysheet-matrix-turn-up").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let r = getdata.length - 1; r >= 0; r--) {
            let a = [];
            for (let c = 0; c < getdata[0].length; c++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 翻转 左右
    $("#luckysheet-matrix-turn-left").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let r = 0; r < getdata.length; r++) {
            let a = [];
            for (let c = getdata[0].length - 1; c >= 0; c--) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 翻转 顺时针
    $("#luckysheet-matrix-turn-cw").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let c = 0; c < getdata[0].length; c++) {
            let a = [];
            for (let r = getdata.length - 1; r >= 0; r--) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandlerD(arr);
    });

    //矩阵操作选区 翻转 逆时针
    $("#luckysheet-matrix-turn-anticw").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }
        
        let arr = [];
        for (let c = getdata[0].length - 1; c >= 0; c--) {
            let a = [];
            for (let r = 0; r < getdata.length; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandlerD(arr);
    });

    //矩阵操作选区 转置
    $("#luckysheet-matrix-turn-trans").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        for (let c = 0; c < getdata[0].length; c++) {
            let a = [];
            for (let r = 0; r < getdata.length; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandlerD(arr);
    });

    let jfnqrt = function (x, p) {
        if (x == 0)
            return 0;
        let x0, x1;
        x0 = x;
        x1 = ((p - 1) * x0 / p) + (x / (Math.pow(x0, p - 1) * p));//利用迭代法求解
        while (Math.abs(x1 - x0) > 0.000001) {
            x0 = x1;
            x1 = ((p - 1) * x0 / p) + (x / (Math.pow(x0, p - 1) * p));
        }
        return x1;
    }

    //矩阵操作选区 矩阵计算
    $("#luckysheet-matrix-cal-confirm").click(function (event) {

        // Click input element, don't comfirm 
        if(event.target.nodeName === 'INPUT' || event.target.nodeName === 'SELECT'){
            return;
        }

        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let caltype = $("#luckysheet-matrix-cal-type").val(), 
            calvalue = parseInt($("#luckysheet-matrix-cal-value").val());

        if(calvalue.toString() == "NaN"){
            if(isEditMode()){
                alert(locale_drag.inputCorrect);
            }
            else{
                tooltip.info(locale_drag.inputCorrect, "");
            }
            return;
        }

        if (calvalue == null) {
            calvalue = 2;
        }

        let arr = [];

        for (let r = 0; r < getdata.length; r++) {
            let a = [];

            for (let c = 0; c < getdata[0].length; c++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                    if (parseInt(value) != null && getdata[r][c].ct != undefined && getdata[r][c].ct.t == "n") {
                        if (caltype == "minus") {
                            value.v = value.v - calvalue;
                        }
                        else if (caltype == "multiply") {
                            value.v = value.v * calvalue;
                        }
                        else if (caltype == "divided") {
                            value.v = numFormat(value.v / calvalue, 4);
                        }
                        else if (caltype == "power") {
                            value.v = Math.pow(value.v, calvalue);
                        }
                        else if (caltype == "root") {
                            if (calvalue == 2) {
                                value.v = numFormat(Math.sqrt(value.v), 4);
                            }
                            else if (calvalue == 3 && Math.cbrt) {
                                value.v = numFormat(Math.cbrt(value.v), 4);
                            }
                            else {
                                value.v = numFormat(jfnqrt(value.v, calvalue), 4);
                            }
                        }
                        else if (caltype == "log") {
                            value.v = numFormat(Math.log(value.v) * 10000 / Math.log(Math.abs(calvalue)), 4);
                        }
                        else {
                            value.v = value.v + calvalue;
                        }

                        if(value.v == null){
                            value.m = "";
                        }
                        else{
                            value.m = value.v.toString();
                        }
                    }
                }
                a.push(value);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 删除两端0值 按行
    $("#luckysheet-matrix-delezero-row").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }
        
        let arr = [];
        let getdatalen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            let a = [], stdel = true, eddel = true;
            for (let c = 0; c < getdatalen; c++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                    if ((value.v == "0" || value.v == 0) && stdel) {
                        continue;
                    }
                    else {
                        stdel = false;
                    }
                }
                a.push(value);
            }

            let a1 = [];
            if (a.length == getdatalen) {
                a1 = a;
            }
            else {
                for (let c = a.length - 1; c >= 0; c--) {
                    let value = "";
                    if (a[c] != null) {
                        value = a[c];
                        if ((value.v == "0" || value.v == 0) && eddel) {
                            continue;
                        }
                        else {
                            eddel = false;
                        }
                    }
                    a1.unshift(value);
                }

                let l = getdatalen - a1.length;
                for (let c1 = 0; c1 < l; c1++) {
                    a1.push("");
                }
            }
            arr.push(a1);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 删除两端0值 按列
    $("#luckysheet-matrix-delezero-column").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        let getdatalen = getdata.length, collen = getdata[0].length;
        for (let c = 0; c < collen; c++) {
            let a = [], stdel = true, eddel = true;
            for (let r = 0; r < getdatalen; r++) {
                let value = "";
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];
                    if ((value.v == "0" || value.v == 0) && stdel) {
                        continue;
                    }
                    else {
                        stdel = false;
                    }
                }
                a.push(value);
            }

            let a1 = [];
            if (a.length == getdatalen) {
                a1 = a;
            }
            else {
                for (let r = a.length - 1; r >= 0; r--) {
                    let value = "";
                    if (a[r] != null) {
                        value = a[r];
                        if ((value.v == "0" || value.v == 0) && eddel) {
                            continue;
                        }
                        else {
                            eddel = false;
                        }
                    }
                    a1.unshift(value);
                }

                let l = getdatalen - a1.length;
                for (let r1 = 0; r1 < l; r1++) {
                    a1.push("");
                }
            }
            arr.push(a1);
        }

        let arr1 = [];
        for (let c = 0; c < arr[0].length; c++) {
            let a = [];
            for (let r = 0; r < arr.length; r++) {
                let value = "";
                if (arr[r] != null && arr[r][c] != null) {
                    value = arr[r][c];
                }
                a.push(value);
            }
            arr1.push(a);
        }

        editor.controlHandler(arr1);
    });

    //矩阵操作选区 删除重复值 按行
    $("#luckysheet-matrix-delerpt-row").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        let getdatalen = getdata[0].length;
        for (let r = 0; r < getdata.length; r++) {
            let a = [], repeat = {};

            for (let c = 0; c < getdatalen; c++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(value.v in repeat){
                        repeat[value.v].push(value);
                    }
                    else{
                        repeat[value.v] = [];
                        repeat[value.v].push(value);
                    }
                }
            }

            for (let c = 0; c < getdatalen; c++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(repeat[value.v].length == 1){
                        a.push(value);
                    }
                }
            }

            let l = getdatalen - a.length;
            for (let c1 = 0; c1 < l; c1++) {
                a.push(null);
            }
            arr.push(a);
        }

        editor.controlHandler(arr);
    });

    //矩阵操作选区 删除重复值 按列
    $("#luckysheet-matrix-delerpt-column").click(function (event) {
        $("body .luckysheet-cols-menu").hide();
        luckysheetContainerFocus();

        if(Store.luckysheet_select_save.length > 1){
            if(isEditMode()){
                alert(locale_drag.noMulti);
            }
            else{
                tooltip.info(locale_drag.noMulti, "");
            }
            return;
        }

        let getdata = getdatabyselection(Store.luckysheet_select_save[0]);
        if (getdata.length == 0) {
            return;
        }

        let arr = [];
        let getdatalen = getdata.length, collen = getdata[0].length;
        for (let c = 0; c < collen; c++) {
            let a = [], repeat = {};

            for (let r = 0; r < getdatalen; r++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(value.v in repeat){
                        repeat[value.v].push(value);
                    }
                    else{
                        repeat[value.v] = [];
                        repeat[value.v].push(value);
                    }
                }
            }

            for (let r = 0; r < getdatalen; r++) {
                let value = null;
                if (getdata[r] != null && getdata[r][c] != null) {
                    value = getdata[r][c];

                    if(repeat[value.v].length == 1){
                        a.push(value);
                    }
                }
            }

            a1 = a;
            let l = getdatalen - a1.length;
            for (let r1 = 0; r1 < l; r1++) {
                a1.push(null);
            }
            arr.push(a1);
        }

        let arr1 = [];
        for (let c = 0; c < arr[0].length; c++) {
            let a = [];
            for (let r = 0; r < arr.length; r++) {
                let value = null;
                if (arr[r] != null && arr[r][c] != null) {
                    value = arr[r][c];
                }
                a.push(value);
            }
            arr1.push(a);
        }

        editor.controlHandler(arr1);
    });
}