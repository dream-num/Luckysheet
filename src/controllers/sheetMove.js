import { getObjType } from '../utils/util';
import formula from '../global/formula';
import { isRealNull } from '../global/validate';
import { countfunc } from '../global/count';
import menuButton from './menuButton';
import { selectHightlightShow } from './select';
import pivotTable from './pivotTable';
import Store from '../store';
import server from './server';

function luckysheetMoveEndCell(postion, type, isScroll, terminal, onlyvalue) {
    if (isScroll == null) {
        isScroll = true;
    }

    if (!postion) {
        postion = "down";
    }

    if (!type) {
        type = "cell";
    }

    if (onlyvalue == null) {
        onlyvalue = false;
    }

    let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

    let curR = last["row"] == null ? 0 : last["row"][0];
    let curC = last["column"] == null ? 0 : last["column"][0];

    let startR = last["row"] == null ? 0 : last["row"][0];
    let startC = last["column"] == null ? 0 : last["column"][0];

    let endR = last["row"] == null ? 0 : last["row"][1];
    let endC = last["column"] == null ? 0 : last["column"][1];

    formula.fucntionboxshow(curR, curC);

    if (type == "range") {
        // need var
        var p_startR = Store.luckysheet_shiftpositon["row"][0];
        var p_startC = Store.luckysheet_shiftpositon["column"][0];

        let p_endR = Store.luckysheet_shiftpositon["row"][1];
        let p_endC = Store.luckysheet_shiftpositon["column"][1];

        if (postion == "down" || postion == "up") {
            if (p_endR < endR) {
                curR = last["row"] == null ? 0 : last["row"][1];
            }
            else if (p_startR > startR) {
                curR = last["row"] == null ? 0 : last["row"][0];
            }
            else if (p_endR == endR && p_startR == startR) {
                if (postion == "down") {
                    curR = last["row"] == null ? 0 : last["row"][1];
                }
                else {
                    curR = last["row"] == null ? 0 : last["row"][0];
                }
            }
        }
        else if (postion == "right" || postion == "left") {
            if (p_endC < endC) {
                curC = last["column"] == null ? 0 : last["column"][1];
            }
            else if (p_startC > startC) {
                curC = last["column"] == null ? 0 : last["column"][0];
            }
            else if (p_endC == endC && p_startC == startC) {
                if (postion == "right") {
                    curC = last["column"] == null ? 0 : last["column"][1];
                }
                else {
                    curC = last["column"] == null ? 0 : last["column"][0];
                }
            }
        }
    }

    let datarowlen = Store.flowdata.length, 
        datacolumnlen = Store.flowdata[0].length;

    let data = Store.flowdata, moveP = "", moveV = 0;

    if (postion == "up") {
        if (curR == 0) {
            return;
        }
        else {
            let stvalue = [], p = null, i = 0, p_pre = null;
            for (let c = startC; c <= endC; c++) {
                stvalue = [];
                i = 0;

                for (let r = curR - 1; r >= 0; r--) {
                    let cell = data[r][c];

                    if (getObjType(cell) == "object" && isRealNull(cell.v)) {
                        stvalue.push(false);
                    }
                    else if (isRealNull(cell)) {
                        stvalue.push(false);
                    }
                    else {
                        stvalue.push(true);
                    }

                    if (stvalue.length > 1) {
                        if (stvalue[i] == true && stvalue[i - 1] == false) {
                            p = r;
                            break
                        }
                        else if (stvalue[i] == false && stvalue[i - 1] == true) {
                            p = r + 1;
                            break
                        }
                    }

                    i++;
                }

                if(p == null){
                    p = 0;
                }

                if (p_pre == null || p < p_pre) {
                    p_pre = p;
                }
            }
            
            moveP = "down";
            moveV = p_pre - curR;
        }
    }
    else if (postion == "down") {
        if (curR == datarowlen - 1) {
            return;
        }
        else {
            let stvalue = [], p = null, i = 0, p_pre = null;
            for (let c = startC; c <= endC; c++) {
                stvalue = [];
                i = 0;

                for (let r = curR + 1; r < data.length; r++) {
                    let cell = data[r][c];

                    if (getObjType(cell) == "object" && isRealNull(cell.v)) {
                        stvalue.push(false);
                    }
                    else if (isRealNull(cell)) {
                        stvalue.push(false);
                    }
                    else {
                        stvalue.push(true);
                    }
                    
                    if (stvalue.length > 1) {
                        if (stvalue[i] == true && stvalue[i - 1] == false) {
                            p = r;
                            break
                        }
                        else if (stvalue[i] == false && stvalue[i - 1] == true) {
                            p = r - 1;
                            break
                        }
                    }

                    i++;
                }

                if(p == null){
                    p = data.length - 1;
                }

                if (p_pre == null || p > p_pre) {
                    p_pre = p;
                }
            }
            
            moveP = "down";
            moveV = p_pre - curR;
        }
    }
    else if (postion == "left") {
        if (curC == 0) {
            return;
        }
        else {
            let stvalue = [], p = null, i = 0, p_pre = null;
            for (let r = startR; r <= endR; r++) {
                stvalue = [];
                i = 0;
                for (let c = curC - 1; c >= 0; c--) {
                    let cell = data[r][c];

                    if (getObjType(cell) == "object" && isRealNull(cell.v)) {
                        stvalue.push(false);
                    }
                    else if (isRealNull(cell)) {
                        stvalue.push(false);
                    }
                    else {
                        stvalue.push(true);
                    }

                    if (stvalue.length > 1) {
                        if (stvalue[i] == true && stvalue[i - 1] == false) {
                            p = c;
                            break
                        }
                        else if (stvalue[i] == false && stvalue[i - 1] == true) {
                            p = c + 1;
                            break
                        }
                    }

                    i++;
                }

                if(p == null){
                    p = 0;
                }

                if (p_pre == null || p < p_pre) {
                    p_pre = p;
                }
            }
            
            moveP = "right";
            moveV = p_pre - curC;
        }
    }
    else if (postion == "right") {
        if (curC == datacolumnlen - 1) {
            return;
        }
        else {
            let stvalue = [], p = null, i = 0, p_pre = null;
            for (let r = startR; r <= endR; r++) {
                stvalue = [];
                i = 0;

                for (let c = curC + 1; c < data[0].length; c++) {
                    let cell = data[r][c];

                    if (getObjType(cell) == "object" && isRealNull(cell.v)) {
                        stvalue.push(false);
                    }
                    else if (isRealNull(cell)) {
                        stvalue.push(false);
                    }
                    else {
                        stvalue.push(true);
                    }

                    if (stvalue.length > 1) {
                        if (stvalue[i] == true && stvalue[i - 1] == false) {
                            p = c;
                            break
                        }
                        else if (stvalue[i] == false && stvalue[i - 1] == true) {
                            p = c - 1;
                            break
                        }
                    }

                    i++;
                }

                if(p == null){
                    p = data[0].length - 1;
                }

                if (p_pre == null || p > p_pre) {
                    p_pre = p;
                }
            }

            moveP = "right";
            moveV = p_pre - curC;
        }
    }

    if (type == "range") {
        if (postion == "up") {
            if (p_endR < endR) {
                if (moveV + curR < p_endR) {
                    moveV = p_endR - curR;
                }
            }
        }
        else if (postion == "down") {
            if (p_startR > startR) {
                if (moveV + curR > p_startR) {
                    moveV = p_startR - curR;
                }
            }
        }
        else if (postion == "left") {
            if (p_endC < endC) {
                if (moveV + curC < p_endC) {
                    moveV = p_endC - curC;
                }
            }
        }
        else if (postion == "right") {
            if (p_startC > startC) {
                if (moveV + curC > p_startC) {
                    moveV = p_startC - curC;
                }
            }
        }

        if (terminal != null && Math.abs(moveV) > Math.abs(terminal)) {
            moveV = terminal;
        }
    }

    if (!onlyvalue) {
        if (type == "cell") {
            luckysheetMoveHighlightCell(moveP, moveV, "rangeOfSelect", isScroll);
        }
        else if (type == "range") {
            luckysheetMoveHighlightRange(moveP, moveV, "rangeOfSelect", isScroll);
        }
    }
    else {
        return moveV;
    }
}

//方向键  调整单元格
function luckysheetMoveHighlightCell(postion, index, type, isScroll) {
    if (isScroll == null) {
        isScroll = true;
    }

    if (!postion) {
        postion == "down";
    }

    let datarowlen = Store.flowdata.length, 
        datacolumnlen = Store.flowdata[0].length;

    let row, row_pre, row_index, row_index_ed;
    let col, col_pre, col_index, col_index_ed;

    if(type == "rangeOfSelect"){
        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        
        let curR;
        if(last["row_focus"] == null){
            curR = last["row"][0];    
        }
        else{
            curR = last["row_focus"];    
        }

        let curC;
        if(last["column_focus"] == null){
            curC = last["column"][0];
        }
        else{
            curC = last["column_focus"];    
        }
        
        //focus单元格 是否是合并单元格
        let margeset = menuButton.mergeborer(Store.flowdata, curR, curC);
        if(!!margeset){
            let str_r = margeset.row[2];
            let end_r = margeset.row[3];

            let str_c = margeset.column[2];
            let end_c = margeset.column[3];

            if(index > 0){
                if(postion == "down"){
                    curR = end_r;
                    curC = str_c;
                }
                else if(postion == "right"){
                    curR = str_r;
                    curC = end_c;
                }
            }
            else{
                curR = str_r;
                curC = str_c;
            }
        }

        let moveX = last["moveXY"] == null ? curR : last["moveXY"].x;
        let moveY = last["moveXY"] == null ? curC : last["moveXY"].y;

        if (postion == "down") {
            curR += index;
            moveX = curR;
        }
        else if (postion == "right") {
            curC += index;
            moveY = curC;
        }

        if (curR >= datarowlen) {
            curR = datarowlen - 1;
            moveX = curR;
        }

        if (curR < 0) {
            curR = 0;
            moveX = curR;
        }

        if (curC >= datacolumnlen) {
            curC = datacolumnlen - 1;
            moveY = curC;
        }

        if (curC < 0) {
            curC = 0;
            moveY = curC;
        }

        //移动的下一个单元格是否是合并的单元格
        let margeset2 = menuButton.mergeborer(Store.flowdata, curR, curC);
        if(!!margeset2){
            row = margeset2.row[1];
            row_pre = margeset2.row[0];
            row_index = margeset2.row[2];
            row_index_ed = margeset2.row[3];

            col = margeset2.column[1];
            col_pre = margeset2.column[0];
            col_index = margeset2.column[2];
            col_index_ed = margeset2.column[3];
        }
        else{
            row = Store.visibledatarow[moveX]; 
            row_pre = moveX - 1 == -1 ? 0 : Store.visibledatarow[moveX - 1];
            // row_index = moveX;
            // row_index_ed = moveX;

            col = Store.visibledatacolumn[moveY]; 
            col_pre = moveY - 1 == -1 ? 0 : Store.visibledatacolumn[moveY - 1];
            // col_index = moveY;
            // col_index_ed = moveY;
            
            row_index = row_index_ed = curR;
            col_index = col_index_ed = curC;
        }

        last["row"] = [row_index, row_index_ed];
        last["column"] = [col_index, col_index_ed];
        last["row_focus"] = row_index;
        last["column_focus"] = col_index;
        last["moveXY"] = {"x": moveX,"y": moveY};

        selectHightlightShow();
        pivotTable.pivotclick(row_index, col_index);
        formula.fucntionboxshow(row_index, col_index);
    }
    else if(type == "rangeOfFormula"){
        let last = formula.func_selectedrange;
        
        let curR;
        if(last["row_focus"] == null){
            curR = last["row"][0];    
        }
        else{
            curR = last["row_focus"];    
        }

        let curC;
        if(last["column_focus"] == null){
            curC = last["column"][0];
        }
        else{
            curC = last["column_focus"];    
        }
        
        //focus单元格 是否是合并单元格
        let margeset = menuButton.mergeborer(Store.flowdata, curR, curC);
        if(!!margeset){
            let str_r = margeset.row[2];
            let end_r = margeset.row[3];

            let str_c = margeset.column[2];
            let end_c = margeset.column[3];

            if(index > 0){
                if(postion == "down"){
                    curR = end_r;
                    curC = str_c;
                }
                else if(postion == "right"){
                    curR = str_r;
                    curC = end_c;
                }
            }
            else{
                curR = str_r;
                curC = str_c;
            }
        }

        let moveX = last["moveXY"] == null ? curR : last["moveXY"].x;
        let moveY = last["moveXY"] == null ? curC : last["moveXY"].y;

        if (postion == "down") {
            curR += index;
            moveX = curR;
        }
        else if (postion == "right") {
            curC += index;
            moveY = curC;
        }

        if (curR >= datarowlen) {
            curR = datarowlen - 1;
            moveX = curR;
        }

        if (curR < 0) {
            curR = 0;
            moveX = curR;
        }

        if (curC >= datacolumnlen) {
            curC = datacolumnlen - 1;
            moveY = curC;
        }

        if (curC < 0) {
            curC = 0;
            moveY = curC;
        }

        //移动的下一个单元格是否是合并的单元格
        let margeset2 = menuButton.mergeborer(Store.flowdata, curR, curC);
        if(!!margeset2){
            row = margeset2.row[1];
            row_pre = margeset2.row[0];
            row_index = margeset2.row[2];
            row_index_ed = margeset2.row[3];

            col = margeset2.column[1];
            col_pre = margeset2.column[0];
            col_index = margeset2.column[2];
            col_index_ed = margeset2.column[3];
        }
        else{
            row = Store.visibledatarow[moveX]; 
            row_pre = moveX - 1 == -1 ? 0 : Store.visibledatarow[moveX - 1];
            row_index = moveX;
            row_index_ed = moveX;

            col = Store.visibledatacolumn[moveY];
            col_pre = moveY - 1 == -1 ? 0 : Store.visibledatacolumn[moveY - 1];
            col_index = moveY;
            col_index_ed = moveY;
        }

        formula.func_selectedrange = {
            "left": col_pre,
            "width": col - col_pre - 1,
            "top": row_pre,
            "height": row - row_pre - 1,
            "left_move": col_pre,
            "width_move": col - col_pre - 1,
            "top_move": row_pre,
            "height_move": row - row_pre - 1,
            "row": [row_index, row_index_ed],
            "column": [col_index, col_index_ed],
            "row_focus": row_index,
            "column_focus": col_index,
            "moveXY": {"x": moveX, "y": moveY}
        };

        $("#luckysheet-formula-functionrange-select").css({
            "left": col_pre,
            "width": col - col_pre - 1,
            "top": row_pre,
            "height": row - row_pre - 1
        }).show();

        formula.rangeSetValue({
            "row": [row_index, row_index_ed],
            "column": [col_index, col_index_ed]
        });
    }

    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();
    let winH = $("#luckysheet-cell-main").height(), winW = $("#luckysheet-cell-main").width();

    let sleft = 0, stop = 0;
    if (col - scrollLeft - winW + 20 > 0) {
        sleft = col - winW + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }
    else if (col_pre - scrollLeft - 20 < 0) {
        sleft = col_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }

    if (row - scrollTop - winH + 20 > 0) {
        stop = row - winH + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }
    else if (row_pre - scrollTop - 20 < 0) {
        stop = row_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }

    clearTimeout(Store.countfuncTimeout);
    countfunc();
    
    // 移动单元格通知后台
    server.saveParam("mv", Store.currentSheetIndex, Store.luckysheet_select_save);
}

//ctrl + 方向键  调整单元格
function luckysheetMoveHighlightCell2(postion, type, isScroll) {
    if(!isScroll){
        isScroll = true;
    }

    let row, row_pre;
    let col, col_pre;

    if(type == "rangeOfSelect"){
        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let rf = last["row_focus"], cf = last["column_focus"];

        let focusIsMerge = false, mc = {};
        if(Store.config["merge"] != null && (rf + "_" + cf) in Store.config["merge"]){
            focusIsMerge = true;
            mc = Store.config["merge"][rf + "_" + cf];
        }

        if(postion == "down"){
            if(rf == Store.flowdata.length - 1){
                return;
            }

            if(focusIsMerge){
                rf = getNextIndex("down", cf, mc.r + mc.rs - 1, Store.flowdata.length - 1);
            }
            else{
                rf = getNextIndex("down", cf, rf, Store.flowdata.length - 1);
            }
        }
        else if(postion == "up"){
            if(rf == 0){
                return;
            }

            if(focusIsMerge){
                rf = getNextIndex("up", cf, 0, mc.r);
            }
            else{
                rf = getNextIndex("up", cf, 0, rf);
            }
        }
        else if(postion == "right"){
            if(cf == Store.flowdata[0].length - 1){
                return;
            }

            if(focusIsMerge){
                cf = getNextIndex("right", rf, mc.c + mc.cs - 1, Store.flowdata[0].length - 1);
            }
            else{
                cf = getNextIndex("right", rf, cf, Store.flowdata[0].length - 1);
            }
        }
        else if(postion == "left"){
            if(cf == 0){
                return;
            }

            if(focusIsMerge){
                cf = getNextIndex("left", rf, 0, mc.c);
            }
            else{
                cf = getNextIndex("left", rf, 0, cf);
            }
        }

        let rowseleted = [rf, rf];
        let columnseleted = [cf, cf];

        row = Store.visibledatarow[rf];
        row_pre = rf - 1 == -1 ? 0 : Store.visibledatarow[rf - 1];
        col = Store.visibledatacolumn[cf];
        col_pre = cf - 1 == -1 ? 0 : Store.visibledatacolumn[cf - 1];

        let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, row_pre, row - row_pre - 1, col_pre, col - col_pre - 1);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            // top = changeparam[2];
            // height = changeparam[3];
            // left = changeparam[4];
            // width = changeparam[5];
        }

        Store.luckysheet_select_save = [{"row": rowseleted, "column": columnseleted}];
        selectHightlightShow();
        pivotTable.pivotclick(rf, cf);
        formula.fucntionboxshow(rf, cf);
    }
    else if(type == "rangeOfFormula"){
        let last = formula.func_selectedrange;
        let rf = last["row_focus"], cf = last["column_focus"];

        let focusIsMerge = false, mc = {};
        if(Store.config["merge"] != null && (rf + "_" + cf) in Store.config["merge"]){
            focusIsMerge = true;
            mc = Store.config["merge"][rf + "_" + cf];
        }

        if(postion == "down"){
            if(rf == Store.flowdata.length - 1){
                return;
            }

            if(focusIsMerge){
                rf = getNextIndex("down", cf, mc.r + mc.rs - 1, Store.flowdata.length - 1);
            }
            else{
                rf = getNextIndex("down", cf, rf, Store.flowdata.length - 1);
            }
        }
        else if(postion == "up"){
            if(rf == 0){
                return;
            }

            if(focusIsMerge){
                rf = getNextIndex("up", cf, 0, mc.r);
            }
            else{
                rf = getNextIndex("up", cf, 0, rf);
            }
        }
        else if(postion == "right"){
            if(cf == Store.flowdata[0].length - 1){
                return;
            }

            if(focusIsMerge){
                cf = getNextIndex("right", rf, mc.c + mc.cs - 1, Store.flowdata[0].length - 1);
            }
            else{
                cf = getNextIndex("right", rf, cf, Store.flowdata[0].length - 1);
            }
        }
        else if(postion == "left"){
            if(cf == 0){
                return;
            }

            if(focusIsMerge){
                cf = getNextIndex("left", rf, 0, mc.c);
            }
            else{
                cf = getNextIndex("left", rf, 0, cf);
            }
        }

        let rowseleted = [rf, rf];
        let columnseleted = [cf, cf];

        row = Store.visibledatarow[rf];
        row_pre = rf - 1 == -1 ? 0 : Store.visibledatarow[rf - 1];
        col = Store.visibledatacolumn[cf]; 
        col_pre = cf - 1 == -1 ? 0 : Store.visibledatacolumn[cf - 1];

        let top = row_pre, height = row - row_pre - 1;
        let left = col_pre, width = col - col_pre - 1;

        let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            top = changeparam[2];
            height = changeparam[3];
            left = changeparam[4];
            width = changeparam[5];
        }

        formula.func_selectedrange = {
            "left": left,
            "width": width,
            "top": top,
            "height": height,
            "left_move": left,
            "width_move": width,
            "top_move": top,
            "height_move": height,
            "row": rowseleted,
            "column": columnseleted,
            "row_focus": rf,
            "column_focus": cf
        };

        $("#luckysheet-formula-functionrange-select").css({
            "left": left,
            "width": width,
            "top": top,
            "height": height
        }).show();

        formula.rangeSetValue({
            "row": rowseleted,
            "column": columnseleted
        });
    }

    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();
    let winH = $("#luckysheet-cell-main").height(), winW = $("#luckysheet-cell-main").width();

    let sleft = 0, stop = 0;
    if (col - scrollLeft - winW + 20 > 0) {
        sleft = col - winW + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }
    else if (col_pre - scrollLeft - 20 < 0) {
        sleft = col_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }

    if (row - scrollTop - winH + 20 > 0) {
        stop = row - winH + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }
    else if (row_pre - scrollTop - 20 < 0) {
        stop = row_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }

    clearTimeout(Store.countfuncTimeout);
    countfunc();
}

//shift + 方向键  调整选区
function luckysheetMoveHighlightRange(postion, index, type, isScroll) {
    if (isScroll == null) {
        isScroll = true;
    }

    if (!postion) {
        postion == "down";
    }

    let row, row_pre;
    let col, col_pre;

    if(type == "rangeOfSelect"){
        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];

        let curR = last["row"][0], endR = last["row"][1];
        let curC = last["column"][0], endC = last["column"][1];
        let rf = last["row_focus"], cf = last["column_focus"];

        let datarowlen = Store.flowdata.length, 
            datacolumnlen = Store.flowdata[0].length;

        if(postion == "down"){ //选区上下变动
            if(rowHasMerge(rf, curC, endC)){ //focus单元格所在行有合并单元格
                let rfMerge = getRowMerge(rf, curC, endC);
                let rf_str = rfMerge[0], rf_end = rfMerge[1];

                if(rf_str > curR && rf_end == endR){
                    if(index > 0 && rowHasMerge(curR, curC, endC)){
                        curR = getRowMerge(curR, curC, endC)[1];
                    }

                    curR += index;
                }
                else if(rf_end < endR && rf_str == curR){
                    if(index < 0 && rowHasMerge(endR, curC, endC)){
                        endR = getRowMerge(endR, curC, endC)[0];
                    }

                    endR += index;
                }
                else{
                    if(index > 0){
                        endR += index;
                    }
                    else{
                        curR += index;
                    }
                }
            }
            else{
                if(rf > curR && rf == endR){
                    if(index > 0 && rowHasMerge(curR, curC, endC)){
                        curR = getRowMerge(curR, curC, endC)[1];
                    }

                    curR += index;
                }
                else if(rf < endR && rf == curR){
                    if(index < 0 && rowHasMerge(endR, curC, endC)){
                        endR = getRowMerge(endR, curC, endC)[0];
                    }

                    endR += index;
                }
                else if(rf == curR && rf == endR){
                    if(index > 0){
                        endR += index;
                    }
                    else{
                        curR += index;
                    }
                }
            }

            if (endR >= datarowlen) {
                endR = datarowlen - 1;
            }

            if (endR < 0) {
                endR = 0;
            }

            if (curR >= datarowlen) {
                curR = datarowlen - 1;
            }

            if (curR < 0) {
                curR = 0;
            }
        }
        else{
            if(colHasMerge(cf, curR, endR)){ //focus单元格所在列有合并单元格
                let cfMerge = getColMerge(cf, curR, endR);
                let cf_str = cfMerge[0], cf_end = cfMerge[1];

                if(cf_str > curC && cf_end == endC){
                    if(index > 0 && colHasMerge(curC, curR, endR)){
                        curC = getColMerge(curC, curR, endR)[1];
                    }

                    curC += index;
                }
                else if(cf_end < endC && cf_str == curC){
                    if(index < 0 && colHasMerge(endC, curR, endR)){
                        endC = getColMerge(endC, curR, endR)[0];
                    }

                    endC += index;
                }
                else{
                    if(index > 0){
                        endC += index;
                    }
                    else{
                        curC += index;
                    }
                }
            }
            else{
                if(cf > curC && cf == endC){
                    if(index > 0 && colHasMerge(curC, curR, endR)){
                        curC = getColMerge(curC, curR, endR)[1];
                    }

                    curC += index;
                }
                else if(cf < endC && cf == curC){
                    if(index < 0 && colHasMerge(endC, curR, endR)){
                        endC = getColMerge(endC, curR, endR)[0];
                    }

                    endC += index;
                }
                else if(cf == curC && cf == endC){
                    if(index > 0){
                        endC += index;
                    }
                    else{
                        curC += index;
                    }
                }
            } 

            if (endC >= datacolumnlen) {
                endC = datacolumnlen - 1;
            }

            if (endC < 0) {
                endC = 0;
            }

            if (curC >= datacolumnlen) {
                curC = datacolumnlen - 1;
            }

            if (curC < 0) {
                curC = 0;
            }
        }

        let rowseleted = [curR, endR];
        let columnseleted = [curC, endC];

        row = Store.visibledatarow[endR]; 
        row_pre = curR - 1 == -1 ? 0 : Store.visibledatarow[curR - 1];
        col = Store.visibledatacolumn[endC]; 
        col_pre = curC - 1 == -1 ? 0 : Store.visibledatacolumn[curC - 1];

        let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, row_pre, row - row_pre - 1, col_pre, col - col_pre - 1);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            // top = changeparam[2];
            // height = changeparam[3];
            // left = changeparam[4];
            // width = changeparam[5];
        }

        last["row"] = rowseleted;
        last["column"] = columnseleted;

        selectHightlightShow();
    }
    else if(type == "rangeOfFormula"){
        let last = formula.func_selectedrange;

        let curR = last["row"][0], endR = last["row"][1];
        let curC = last["column"][0], endC = last["column"][1];
        let rf = last["row_focus"], cf = last["column_focus"];

        let datarowlen = Store.flowdata.length, 
            datacolumnlen = Store.flowdata[0].length;

        if(postion == "down"){ //选区上下变动
            if(rowHasMerge(rf, curC, endC)){ //focus单元格所在行有合并单元格
                let rfMerge = getRowMerge(rf, curC, endC);
                let rf_str = rfMerge[0], rf_end = rfMerge[1];

                if(rf_str > curR && rf_end == endR){
                    if(index > 0 && rowHasMerge(curR, curC, endC)){
                        curR = getRowMerge(curR, curC, endC)[1];
                    }

                    curR += index;
                }
                else if(rf_end < endR && rf_str == curR){
                    if(index < 0 && rowHasMerge(endR, curC, endC)){
                        endR = getRowMerge(endR, curC, endC)[0];
                    }

                    endR += index;
                }
                else{
                    if(index > 0){
                        endR += index;
                    }
                    else{
                        curR += index;
                    }
                }
            }
            else{
                if(rf > curR && rf == endR){
                    if(index > 0 && rowHasMerge(curR, curC, endC)){
                        curR = getRowMerge(curR, curC, endC)[1];
                    }

                    curR += index;
                }
                else if(rf < endR && rf == curR){
                    if(index < 0 && rowHasMerge(endR, curC, endC)){
                        endR = getRowMerge(endR, curC, endC)[0];
                    }

                    endR += index;
                }
                else if(rf == curR && rf == endR){
                    if(index > 0){
                        endR += index;
                    }
                    else{
                        curR += index;
                    }
                }
            }

            if (endR >= datarowlen) {
                endR = datarowlen - 1;
            }

            if (endR < 0) {
                endR = 0;
            }

            if (curR >= datarowlen) {
                curR = datarowlen - 1;
            }

            if (curR < 0) {
                curR = 0;
            }
        }
        else{
            if(colHasMerge(cf, curR, endR)){ //focus单元格所在列有合并单元格
                let cfMerge = getColMerge(cf, curR, endR);
                let cf_str = cfMerge[0], cf_end = cfMerge[1];

                if(cf_str > curC && cf_end == endC){
                    if(index > 0 && colHasMerge(curC, curR, endR)){
                        curC = getColMerge(curC, curR, endR)[1];
                    }

                    curC += index;
                }
                else if(cf_end < endC && cf_str == curC){
                    if(index < 0 && colHasMerge(endC, curR, endR)){
                        endC = getColMerge(endC, curR, endR)[0];
                    }

                    endC += index;
                }
                else{
                    if(index > 0){
                        endC += index;
                    }
                    else{
                        curC += index;
                    }
                }
            }
            else{
                if(cf > curC && cf == endC){
                    if(index > 0 && colHasMerge(curC, curR, endR)){
                        curC = getColMerge(curC, curR, endR)[1];
                    }

                    curC += index;
                }
                else if(cf < endC && cf == curC){
                    if(index < 0 && colHasMerge(endC, curR, endR)){
                        endC = getColMerge(endC, curR, endR)[0];
                    }

                    endC += index;
                }
                else if(cf == curC && cf == endC){
                    if(index > 0){
                        endC += index;
                    }
                    else{
                        curC += index;
                    }
                }
            } 

            if (endC >= datacolumnlen) {
                endC = datacolumnlen - 1;
            }

            if (endC < 0) {
                endC = 0;
            }

            if (curC >= datacolumnlen) {
                curC = datacolumnlen - 1;
            }

            if (curC < 0) {
                curC = 0;
            }
        }

        let rowseleted = [curR, endR];
        let columnseleted = [curC, endC];

        row = Store.visibledatarow[endR]; 
        row_pre = curR - 1 == -1 ? 0 : Store.visibledatarow[curR - 1];
        col = Store.visibledatacolumn[endC]; 
        col_pre = curC - 1 == -1 ? 0 : Store.visibledatacolumn[curC - 1];

        let top = row_pre, height = row - row_pre - 1;
        let left = col_pre, width = col - col_pre - 1;

        let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            top = changeparam[2];
            height = changeparam[3];
            left = changeparam[4];
            width = changeparam[5];
        }

        formula.func_selectedrange = {
            "left": left,
            "width": width,
            "top": top,
            "height": height,
            "left_move": left,
            "width_move": width,
            "top_move": top,
            "height_move": height,
            "row": rowseleted,
            "column": columnseleted,
            "row_focus": rf,
            "column_focus": cf
        };

        $("#luckysheet-formula-functionrange-select").css({
            "left": left,
            "width": width,
            "top": top,
            "height": height
        }).show();

        formula.rangeSetValue({
            "row": rowseleted,
            "column": columnseleted
        });
    }

    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();
    let winH = $("#luckysheet-cell-main").height(), winW = $("#luckysheet-cell-main").width();

    let sleft = 0, stop = 0;
    if (col - scrollLeft - winW + 20 > 0) {
        sleft = col - winW + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }
    else if (col_pre - scrollLeft - 20 < 0) {
        sleft = col_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }

    if (row - scrollTop - winH + 20 > 0) {
        stop = row - winH + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }
    else if (row_pre - scrollTop - 20 < 0) {
        stop = row_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }

    clearTimeout(Store.countfuncTimeout);
    countfunc();
}

//ctrl + shift + 方向键  调整选区
function luckysheetMoveHighlightRange2(postion, type, isScroll) {
    if(!isScroll){
        isScroll = true;
    }

    let row, row_pre;
    let col, col_pre;

    if(type == "rangeOfSelect"){
        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let rf = last["row_focus"], cf = last["column_focus"];

        let r1 = last["row"][0], r2 = last["row"][1];
        let c1 = last["column"][0], c2 = last["column"][1];

        if(postion == "down"){
            if(r2 == Store.flowdata.length - 1){
                return;
            }

            if(rowHasMerge(rf, c1, c2)){ //focus所在行有合并单元格
                let rfMerge = getRowMerge(rf, c1, c2);
                let rf_str = rfMerge[0], rf_end = rfMerge[1];

                if(rf_str > r1 && rf_end == r2){
                    r1 = getNextIndex("down", cf, r1, r2);
                }
                else{
                    r2 = getNextIndex("down", cf, r2, Store.flowdata.length - 1);
                }
            }
            else{
                if(rf > r1 && rf == r2){
                    r1 = getNextIndex("down", cf, r1, r2);
                }
                else{
                    r2 = getNextIndex("down", cf, r2, Store.flowdata.length - 1);
                }
            }
        }
        else if(postion == "up"){
            if(r1 == 0){
                return;
            }

            if(rowHasMerge(rf, c1, c2)){ //focus所在行有合并单元格
                let rfMerge = getRowMerge(rf, c1, c2);
                let rf_str = rfMerge[0], rf_end = rfMerge[1];

                if(rf_end < r2 && rf_str == r1){
                    r2 = getNextIndex("up", cf, r1, r2);
                }
                else{
                    r1 = getNextIndex("up", cf, 0, r1);
                }
            }
            else{
                if(rf < r2 && rf == r1){
                    r2 = getNextIndex("up", cf, r1, r2);
                }
                else{
                    r1 = getNextIndex("up", cf, 0, r1);
                }
            }
        }
        else if(postion == "right"){
            if(c2 == Store.flowdata[0].length - 1){
                return;
            }

            if(colHasMerge(cf, r1, r2)){ //focus所在行有合并单元格
                let cfMerge = getColMerge(cf, r1, r2);
                let cf_str = cfMerge[0], cf_end = cfMerge[1];

                if(cf_str > c1 && cf_end == c2){
                    c1 = getNextIndex("right", rf, c1, c2);
                }
                else{
                    c2 = getNextIndex("right", rf, c2, Store.flowdata[0].length - 1);
                }
            }
            else{
                if(cf > c1 && cf == c2){
                    c1 = getNextIndex("right", rf, c1, c2);
                }
                else{
                    c2 = getNextIndex("right", rf, c2, Store.flowdata[0].length - 1);
                }
            }
        }
        else if(postion == "left"){
            if(c1 == 0){
                return;
            }

            if(colHasMerge(cf, r1, r2)){ //focus所在行有合并单元格
                let cfMerge = getColMerge(cf, r1, r2);
                let cf_str = cfMerge[0], cf_end = cfMerge[1];

                if(cf_end < c2 && cf_str == c1){
                    c2 = getNextIndex("left", rf, c1, c2);
                }
                else{
                    c1 = getNextIndex("left", rf, 0, c1);
                }
            }
            else{
                if(cf < c2 && cf == c1){
                    c2 = getNextIndex("left", rf, c1, c2);
                }
                else{
                    c1 = getNextIndex("left", rf, 0, c1);
                }
            }
        }

        let rowseleted = [r1, r2];
        let columnseleted = [c1, c2];

        row = Store.visibledatarow[r2]; 
        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
        col = Store.visibledatacolumn[c2]; 
        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

        let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, row_pre, row - row_pre - 1, col_pre, col - col_pre - 1);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            // top = changeparam[2];
            // height = changeparam[3];
            // left = changeparam[4];
            // width = changeparam[5];
        }

        last["row"] = rowseleted;
        last["column"] = columnseleted;

        selectHightlightShow();
    }
    else if(type == "rangeOfFormula"){
        let last = formula.func_selectedrange;
        let rf = last["row_focus"], cf = last["column_focus"];

        let r1 = last["row"][0], r2 = last["row"][1];
        let c1 = last["column"][0], c2 = last["column"][1];

        if(postion == "down"){
            if(r2 == Store.flowdata.length - 1){
                return;
            }

            if(rowHasMerge(rf, c1, c2)){ //focus所在行有合并单元格
                let rfMerge = getRowMerge(rf, c1, c2);
                let rf_str = rfMerge[0], rf_end = rfMerge[1];

                if(rf_str > r1 && rf_end == r2){
                    r1 = getNextIndex("down", cf, r1, r2);
                }
                else{
                    r2 = getNextIndex("down", cf, r2, Store.flowdata.length - 1);
                }
            }
            else{
                if(rf > r1 && rf == r2){
                    r1 = getNextIndex("down", cf, r1, r2);
                }
                else{
                    r2 = getNextIndex("down", cf, r2, Store.flowdata.length - 1);
                }
            }
        }
        else if(postion == "up"){
            if(r1 == 0){
                return;
            }

            if(rowHasMerge(rf, c1, c2)){ //focus所在行有合并单元格
                let rfMerge = getRowMerge(rf, c1, c2);
                let rf_str = rfMerge[0], rf_end = rfMerge[1];

                if(rf_end < r2 && rf_str == r1){
                    r2 = getNextIndex("up", cf, r1, r2);
                }
                else{
                    r1 = getNextIndex("up", cf, 0, r1);
                }
            }
            else{
                if(rf < r2 && rf == r1){
                    r2 = getNextIndex("up", cf, r1, r2);
                }
                else{
                    r1 = getNextIndex("up", cf, 0, r1);
                }
            }
        }
        else if(postion == "right"){
            if(c2 == Store.flowdata[0].length - 1){
                return;
            }

            if(colHasMerge(cf, r1, r2)){ //focus所在行有合并单元格
                let cfMerge = getColMerge(cf, r1, r2);
                let cf_str = cfMerge[0], cf_end = cfMerge[1];

                if(cf_str > c1 && cf_end == c2){
                    c1 = getNextIndex("right", rf, c1, c2);
                }
                else{
                    c2 = getNextIndex("right", rf, c2, Store.flowdata[0].length - 1);
                }
            }
            else{
                if(cf > c1 && cf == c2){
                    c1 = getNextIndex("right", rf, c1, c2);
                }
                else{
                    c2 = getNextIndex("right", rf, c2, Store.flowdata[0].length - 1);
                }
            }
        }
        else if(postion == "left"){
            if(c1 == 0){
                return;
            }

            if(colHasMerge(cf, r1, r2)){ //focus所在行有合并单元格
                let cfMerge = getColMerge(cf, r1, r2);
                let cf_str = cfMerge[0], cf_end = cfMerge[1];

                if(cf_end < c2 && cf_str == c1){
                    c2 = getNextIndex("left", rf, c1, c2);
                }
                else{
                    c1 = getNextIndex("left", rf, 0, c1);
                }
            }
            else{
                if(cf < c2 && cf == c1){
                    c2 = getNextIndex("left", rf, c1, c2);
                }
                else{
                    c1 = getNextIndex("left", rf, 0, c1);
                }
            }
        }

        let rowseleted = [r1, r2];
        let columnseleted = [c1, c2];

        row = Store.visibledatarow[r2]; 
        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
        col = Store.visibledatacolumn[c2]; 
        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

        let top = row_pre, height = row - row_pre - 1;
        let left = col_pre, width = col - col_pre - 1;

        let changeparam = menuButton.mergeMoveMain(columnseleted, rowseleted, last, top, height, left, width);
        if(changeparam != null){
            columnseleted = changeparam[0];
            rowseleted= changeparam[1];
            top = changeparam[2];
            height = changeparam[3];
            left = changeparam[4];
            width = changeparam[5];
        }

        formula.func_selectedrange = {
            "left": left,
            "width": width,
            "top": top,
            "height": height,
            "left_move": left,
            "width_move": width,
            "top_move": top,
            "height_move": height,
            "row": rowseleted,
            "column": columnseleted,
            "row_focus": rf,
            "column_focus": cf
        };

        $("#luckysheet-formula-functionrange-select").css({
            "left": left,
            "width": width,
            "top": top,
            "height": height
        }).show();

        formula.rangeSetValue({
            "row": rowseleted,
            "column": columnseleted
        });
    }

    let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
    let scrollTop = $("#luckysheet-cell-main").scrollTop();
    let winH = $("#luckysheet-cell-main").height(), winW = $("#luckysheet-cell-main").width();

    let sleft = 0, stop = 0;
    if (col - scrollLeft - winW + 20 > 0) {
        sleft = col - winW + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }
    else if (col_pre - scrollLeft - 20 < 0) {
        sleft = col_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-x").scrollLeft(sleft);
        }
    }

    if (row - scrollTop - winH + 20 > 0) {
        stop = row - winH + 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }
    else if (row_pre - scrollTop - 20 < 0) {
        stop = row_pre - 20;
        if (isScroll) {
            $("#luckysheet-scrollbar-y").scrollTop(stop);
        }
    }

    clearTimeout(Store.countfuncTimeout);
    countfunc();
}

//shift + 方向键 / ctrl + shift + 方向键 功能
function rowHasMerge(r, c1, c2){
    let rowHasMerge = false;

    for(let c = c1; c <= c2; c++){
        let cell = Store.flowdata[r][c];

        if(getObjType(cell) == "object" && ("mc" in cell)){
            rowHasMerge = true;
            break;
        }
    }

    return rowHasMerge;
}
function colHasMerge(c, r1, r2){
    let colHasMerge = false;

    for(let r = r1; r <= r2; r++){
        let cell = Store.flowdata[r][c];

        if(getObjType(cell) == "object" && ("mc" in cell)){
            colHasMerge = true;
            break;
        }
    }

    return colHasMerge;
}
function getRowMerge(rIndex, c1, c2){
    let r1 = 0, r2 = Store.flowdata.length - 1;

    let str = null;
    if(rIndex > r1){
        for(let r = rIndex; r >= r1; r--){
            for(let c = c1; c <= c2; c++){
                let cell = Store.flowdata[r][c];
                
                if(getObjType(cell) == "object" && ("mc" in cell)){
                    let mc = Store.config["merge"][cell["mc"].r + "_" + cell["mc"].c];

                    if(str == null || mc.r < str){
                        str = mc.r;
                    }
                }    
            }

            if(rowHasMerge(str - 1, c1, c2) && str > r1){
                r = str;
            }
            else{
                break;
            }
        }
    }
    else{
        str = r1;
    }

    let end = null;
    if(rIndex < r2){
        for(let r = rIndex; r <= r2; r++){
            for(let c = c1; c <= c2; c++){
                let cell = Store.flowdata[r][c];
                
                if(getObjType(cell) == "object" && ("mc" in cell)){
                    let mc = Store.config["merge"][cell["mc"].r + "_" + cell["mc"].c];

                    if(end == null || (mc.r + mc.rs - 1) > end){
                        end = mc.r + mc.rs - 1;
                    }
                }
            }

            if(rowHasMerge(end + 1, c1, c2) && end < r2){
                r = end;
            }
            else{
                break;
            }
        }
    }
    else{
        end = r2;
    }

    return [str, end];
}
function getColMerge(cIndex, r1, r2){
    let c1 = 0, c2 = Store.flowdata[0].length - 1;

    let str = null;
    if(cIndex > c1){
        for(let c = cIndex; c >= c1; c--){
            for(let r = r1; r <= r2; r++){
                let cell = Store.flowdata[r][c];
                
                if(getObjType(cell) == "object" && ("mc" in cell)){
                    let mc = Store.config["merge"][cell["mc"].r + "_" + cell["mc"].c];

                    if(str == null || mc.c < str){
                        str = mc.c;
                    }
                }    
            }

            if(colHasMerge(str - 1, r1, r2) && str > c1){
                c = str;
            }
            else{
                break;
            }
        }
    }
    else{
        str = c1;
    }

    let end = null;
    if(cIndex < c2){
        for(let c = cIndex; c <= c2; c++){
            for(let r = r1; r <= r2; r++){
                let cell = Store.flowdata[r][c];
                
                if(getObjType(cell) == "object" && ("mc" in cell)){
                    let mc = Store.config["merge"][cell["mc"].r + "_" + cell["mc"].c];

                    if(end == null || (mc.c + mc.cs - 1) > end){
                        end = mc.c + mc.cs - 1;
                    }
                }
            }

            if(colHasMerge(end + 1, r1, r2) && end < c2){
                c = end;
            }
            else{
                break;
            }
        }
    }
    else{
        end = c2;
    }

    return [str, end];
}
function getNextIndex(direction, focusIndex, strIndex, endIndex) {
    let index = null;

    let stNull;
    if(direction == "down"){
        let stValue = Store.flowdata[strIndex][focusIndex];

        if(getObjType(stValue) == "object" && isRealNull(stValue.v)){
            stNull = true;
        }
        else if(isRealNull(stValue)){
            stNull = true;
        }
        else{
            stNull = false;
        }

        console.log(stNull, "stNull");

        let cellNull = [], i = 0;
        for(let r = strIndex + 1; r <= endIndex; r++){
            let cell = Store.flowdata[r][focusIndex];

            if(getObjType(cell) == "object" && isRealNull(cell.v)){
                cellNull.push(true);
            }
            else if(isRealNull(cell)){
                cellNull.push(true);
            }
            else{
                cellNull.push(false);
            }

            if(cellNull.length == 1 && stNull==true && cellNull[i] == false){
                index = strIndex + i + 1;
                break;
            }
            else if(cellNull.length > 1){
                if(stNull && cellNull[i] == false){ //起始是空，找第一个有值的位置
                    index = strIndex + i + 1;
                    break;
                }
                else if(!stNull){ //起始有值，找一个有值的位置
                    if(cellNull[i] == false && cellNull[i - 1] == true){ //前面为空
                        index = strIndex + i + 1;
                        break;
                    }
                    else if(cellNull[i] == true && cellNull[i - 1] == false){ //后面为空
                        index = strIndex + i;
                        break;
                    }
                }
            }

            if(r == endIndex){
                index = endIndex;
            }

            i++;
        }
    }
    else if(direction == "up"){
        let stValue = Store.flowdata[endIndex][focusIndex];

        if(getObjType(stValue) == "object" && isRealNull(stValue.v)){
            stNull = true;
        }
        else if(isRealNull(stValue)){
            stNull = true;
        }
        else{
            stNull = false;
        }

        let cellNull = [], i = 0;
        for(let r = endIndex - 1; r >= strIndex; r--){
            let cell = Store.flowdata[r][focusIndex];

            if(getObjType(cell) == "object" && isRealNull(cell.v)){
                cellNull.push(true);
            }
            else if(isRealNull(cell)){
                cellNull.push(true);
            }
            else{
                cellNull.push(false);
            }

            if(cellNull.length == 1 && stNull && cellNull[i] == false){
                index = endIndex - (i + 1);
                break;
            }
            else if(cellNull.length > 1){
                if(stNull && cellNull[i] == false){ //起始是空，找第一个有值的位置
                    index = endIndex - (i + 1);
                    break;
                }
                else if(!stNull){ //起始有值，找一个有值的位置
                    if(cellNull[i] == false && cellNull[i - 1] == true){ //前面为空
                        index = endIndex - (i + 1);
                        break;
                    }
                    else if(cellNull[i] == true && cellNull[i - 1] == false){ //后面为空
                        index = endIndex - i;
                        break;
                    }
                }
            }

            if(r == strIndex){
                index = strIndex;
            }

            i++;
        }
    }
    else if(direction == "right"){
        let stValue = Store.flowdata[focusIndex][strIndex];

        if(getObjType(stValue) == "object" && isRealNull(stValue.v)){
            stNull = true;
        }
        else if(isRealNull(stValue)){
            stNull = true;
        }
        else{
            stNull = false;
        }

        let cellNull = [], i = 0;
        for(let c = strIndex + 1; c <= endIndex; c++){
            let cell = Store.flowdata[focusIndex][c];

            if(getObjType(cell) == "object" && isRealNull(cell.v)){
                cellNull.push(true);
            }
            else if(isRealNull(cell)){
                cellNull.push(true);
            }
            else{
                cellNull.push(false);
            }

            if(cellNull.length == 1 && stNull && cellNull[i] == false){
                index = strIndex + i + 1;
                break;
            }
            else if(cellNull.length > 1){
                if(stNull && cellNull[i] == false){ //起始是空，找第一个有值的位置
                    index = strIndex + i + 1;
                    break;
                }
                else if(!stNull){ //起始有值，找一个有值的位置
                    if(cellNull[i] == false && cellNull[i - 1] == true){ //前面为空
                        index = strIndex + i + 1;
                        break;
                    }
                    else if(cellNull[i] == true && cellNull[i - 1] == false){ //后面为空
                        index = strIndex + i;
                        break;
                    }
                }
            }

            if(c == endIndex){
                index = endIndex;
            }

            i++;
        }
    }
    else if(direction == "left"){
        let stValue = Store.flowdata[focusIndex][endIndex];

        if(getObjType(stValue) == "object" && isRealNull(stValue.v)){
            stNull = true;
        }
        else if(isRealNull(stValue)){
            stNull = true;
        }
        else{
            stNull = false;
        }

        let cellNull = [], i = 0;
        for(let c = endIndex - 1; c >= strIndex; c--){
            let cell = Store.flowdata[focusIndex][c];

            if(getObjType(cell) == "object" && isRealNull(cell.v)){
                cellNull.push(true);
            }
            else if(isRealNull(cell)){
                cellNull.push(true);
            }
            else{
                cellNull.push(false);
            }

            if(cellNull.length == 1 && stNull && cellNull[i] == false){
                index = endIndex - (i + 1);
                break;
            }
            else if(cellNull.length > 1){
                if(stNull && cellNull[i] == false){ //起始是空，找第一个有值的位置
                    index = endIndex - (i + 1);
                    break;
                }
                else if(!stNull){ //起始有值，找一个有值的位置
                    if(cellNull[i] == false && cellNull[i - 1] == true){ //前面为空
                        index = endIndex - (i + 1);
                        break;
                    }
                    else if(cellNull[i] == true && cellNull[i - 1] == false){ //后面为空
                        index = endIndex - i;
                        break;
                    }
                }
            }

            if(c == strIndex){
                index = strIndex;
            }

            i++;
        }
    }

    return index;
}

export {
    luckysheetMoveEndCell,
    luckysheetMoveHighlightCell,
    luckysheetMoveHighlightCell2,
    luckysheetMoveHighlightRange,
    luckysheetMoveHighlightRange2,
}