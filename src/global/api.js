import Store from "../store";
import { getObjType, chatatABC } from "../utils/util";
import formula from './formula';
import { getSheetIndex, getluckysheet_select_save } from "../methods/get";
import { isRealNull, valueIsError, isRealNum, isEditMode, hasPartMC } from "./validate";
import { genarate, update } from './format';
import server from "../controllers/server";
import luckysheetConfigsetting from "../controllers/luckysheetConfigsetting";
import { setAccuracy } from "./setdata";
import func_methods from "./func_methods";
import luckysheetFreezen from "../controllers/freezen";
import { luckysheetrefreshgrid, jfrefreshgrid, jfrefreshgrid_rhcw } from "./refresh";
import locale from "../locale/locale";
import tooltip from "./tooltip";
import { luckysheet_searcharray } from "../controllers/sheetSearch";
import { luckysheetDeleteCell, luckysheetextendtable, luckysheetdeletetable } from "./extend";
import { getdatabyselection, getcellvalue } from "./getdata";
import selection from "../controllers/selection";
import json from "./json";
import { orderbydata } from "./sort";
import editor from "./editor";
import { rowlenByRange } from "./getRowlen";
import luckysheetformula from './formula';
import luckysheetsizeauto from '../controllers/resize';

const IDCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;


/**
 * 获取单元格的值
 * @param {Number} row 单元格所在行数；从0开始的整数，0表示第一行
 * @param {Number} column 单元格所在列数；从0开始的整数，0表示第一列
 * @param {Object} options 可选参数
 * @param {String} options.type 单元格的值类型，可以设置为原始值"v"或者显示值"m"；默认值为'v',表示获取单元格的实际值
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
export function getCellValue(row, column, options = {}) {
    if (row == null && column == null) {
        return console.error('Arguments row or column cannot be null or undefined.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        type = 'v',
        order = curSheetOrder
    } = { ...options };
    let targetSheetData = Store.luckysheetfile[order].data;
    let cellData = targetSheetData[row][column];
    let return_v;

    if(getObjType(cellData) == "object"){
        return_v = cellData[type];

        if (type == "f" && return_v != null) {
            return_v = formula.functionHTMLGenerate(return_v);
        }
        else if(type == "f") {
            return_v = cellData["v"];
        }
        else if(cellData && cellData.ct && cellData.ct.fa == 'yyyy-MM-dd') {
            return_v = cellData.m;
        }
    }

    if(return_v == undefined){
        return_v = null;
    }

    return return_v;
}

/**
 * 设置单元格的值
 * 
 * 关键点：如果设置了公式，则需要更新公式链insertUpdateFunctionGroup，如果设置了不是公式，判断之前是公式，则需要清除公式delFunctionGroup
 * 
 * @param {Number} row 单元格所在行数；从0开始的整数，0表示第一行
 * @param {Number} column 单元格所在列数；从0开始的整数，0表示第一列
 * @param {Object | String | Number} value 要设置的值；可以为字符串或数字，或为符合Luckysheet单元格格式的对象
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Boolean} options.isRefresh 是否刷新界面；默认为`true`
 * @param {Function} options.success 操作结束的回调函数
 */
// export function setCellValue(row, column, value, options = {}) {
//     if (row == null && column == null) {
//         return console.error('Arguments row or column cannot be null or undefined.')
//     }
//     let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
//     let {
//         order = curSheetOrder,
//         success
//     } = {...options}
//     let targetSheetData = Store.luckysheetfile[order].data;
//     let cell = targetSheetData[row][column];
//     let vupdate;

//     if (getObjType(value) == 'object') {
//         cell = value;

//         if (getObjType(value.v) == 'object') {
//             vupdate = vaule.v.v;
//         } else {
//             vupdate = value.v;
//         }
//     } else {
//         vupdate = value;
//     }

//     if (isRealNull(vupdate)) {
//         if (getObjType(cell) == 'object') {
//             delete cell.m;
//             delete cell.v;
//         } else {
//             cell = null;
//         }
//         return;
//     }

//     if (isRealNull(cell)) {
//         cell = {}
//     }

//     if (vupdate.toString().substring(0, 1) == "'") {
//         cell.m = vupdate.toString().substring(1);
//         cell.ct = { "fa": "@", "t": "s" };
//         cell.v = vupdate.toString().substring(1);
//     } else if (vupdate.toString().toUpperCase() === 'TRUE') {
//         cell.m = "TRUE";
//         cell.ct = { "fa": "General", "t": "b" };
//         cell.v = true;
//     } else if (vupdate.toString().toUpperCase() === 'FALSE') {
//         cell.m = "FALSE";
//         cell.ct = { "fa": "General", "t": "b" };
//         cell.v = false;
//     } else if (valueIsError(vupdate)) {
//         cell.m = vupdate.toString();
//         cell.ct = { "fa": "General", "t": "e" };
//         cell.v = vupdate;
//     } else {
//         if (cell.f != null && isRealNum(vupdate) && !IDCardReg.test(vupdate)) {
//             cell.v = parseFloat(vupdate);
//             if (cell.ct == null) {
//                 cell.ct = {
//                     'fa': 'General',
//                     't': 'n'
//                 }
//             }

//             if (cell.v == Infinity || cell.v == -Infinity) {
//                 cell.m = cell.v.toString();
//             } else {
//                 if (cell.v.toString().indexOf('e') > -1) {
//                     let len = cell.v.toString().split('.')[1].split('e')[0].length;
//                     if (len > 5) {
//                         len = 5;
//                     }

//                     cell.m = cell.v.toExponential(len).toString();
//                 } else {
//                     let v_p = Math.round(cell.v * 1000000000) / 1000000000;
//                     if (cell.ct == null) {
//                         let mask = genarate(v_p);
//                         cell.m = mask[0].toString();
//                     } else {
//                         let mask = update(cell.ct.fa, v_p);
//                         cell.m = mask.toString();
//                     }
//                 }
//             }
//         } else if (cell.ct != null && cell.ct.fa == '@') {
//             cell.m = vupdate.toString();
//             cell.v = vupdate;
//         } else if (cell.ct != null && cell.ct.fa != null && cell.ct.fa != 'General') {
//             if (isRealNum(vupdate)) {
//                 vupdate = parseFloat(vupdate);
//             }

//             let mask = update(cell.ct.fa, vupdate);

//             if (mask === vupdate) {// 若原来单元格格式 应用不了 要更新的值，则获取更新值的 格式
//                 mask = genarate(vupdate);

//                 cell.m = mask[0].toString();
//                 cell.ct = mask[1];
//                 cell.v = mask[2];
//             } else {
//                 cell.m = mask.toString();
//                 cell.v = vupdate;
//             }
//         } else {
//             if (isRealNum(vupdate) && !IDCardReg.test(vupdate)) {
//                 vupdate = parseFloat(vupdate);
//                 cell.v = parseFloat(vupdate);
//                 cell.ct = {
//                     'fa': 'General',
//                     't': 'n'
//                 }
//                 if (cell.v == Infinity || cell.v == -Infinity) {
//                     cell.m = cell.v.toString();
//                 } else {
//                     let mask = genarate(cell.v);
//                     cell.m = mask[0].toString();
//                 }
//             } else {
//                 let mask = genarate(vupdate);
//                 cell.m = mask[0].toString();
//                 cell.ct = mask[1];
//                 cell.v = mask[2];
//             }
//         }
//     }
//     if (!server.allowUpdate && !luckysheetConfigsetting.pointEdit) {
//         if (cell.ct != null && !/^(w|W)((0?)|(0\.0+))$/.test(cell.ct.fa) && cell.ct.t == 'n' && cell.v != null && parseInt(cell.v).toString().length > 4) {
//             let autoFormatw = luckysheetConfigsetting.autoFormatw.toString().toUpperCase();
//             let accuracy = luckysheetConfigsetting.accuracy;
//             let sfmt = setAccuracy(autoFormatw, accuracy);

//             if (sfmt != 'General') {
//                 cell.ct.fa = sfmt;
//                 cell.m = update(sfmt, cell.v);
//             }
//         }
//     }
//     // refresh
//     jfrefreshgrid(targetSheetData, {
//         row: [row],
//         column: [column]
//     })

//     if (success && typeof success === 'function') {
//         success();
//     }
// }
export function setCellValue(row, column, value, options = {}) {
    if (row == null && column == null) {
        return console.error('Arguments row or column cannot be null or undefined.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}
    
    
    luckysheetformula.updatecell(row, column, value);
    

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 清除指定工作表指定单元格的内容，返回清除掉的数据，不同于删除单元格的功能，不需要设定单元格移动情况
 * @param {Number} row 单元格所在行数；从0开始的整数，0表示第一行
 * @param {Number} column 单元格所在列数；从0开始的整数，0表示第一列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function clearCell(row, column, options = {}) {
    if (row == null || column == null) {
        return console.error('Arguments row and column cannot be null or undefined.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}
    let targetSheetData = Store.luckysheetfile[order].data;
    let cell = targetSheetData[row][column];

    if(getObjType(targetSheetData[row][column]) == "object"){
        delete targetSheetData[row][column]["m"];
        delete targetSheetData[row][column]["v"];

        if(targetSheetData[row][column]["f"] != null){
            delete targetSheetData[row][column]["f"];
            formula.delFunctionGroup(row, column, order);

            delete targetSheetData[row][column]["spl"];
        }
    }
    else{
        targetSheetData[row][column] = null;
    }
    // 若操作为当前sheet页，则刷新当前sheet页
    if (order === curSheetOrder) {
        jfrefreshgrid(targetSheetData, [{
            row: [row, row], 
            column: [column, column]
        }])
    }
    if (success && typeof success === 'function') {
        success(cell)
    }
}

/**
 * 删除指定工作表指定单元格，返回删除掉的数据，同时，指定是右侧单元格左移还是下方单元格上移
 * @param {String} move 删除后，右侧还是下方的单元格移动。可选值为 'left'、'up'
 * @param {Number} row 单元格所在行数；从0开始的整数，0表示第一行
 * @param {Number} column 单元格所在列数；从0开始的整数，0表示第一列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function deleteCell(move, row, column, options = {}) {
    let moveTypes = ['left', 'up'];
    if (!move || moveTypes.indexOf(move) < 0) {
        return console.error('Arguments move cannot be null or undefined and its value must be \'left\' or \'up\'')
    }
    if (row == null || column == null) {
        return console.error('Arguments row and column cannot be null or undefined.')
    }

    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}

    let moveType = 'move' + move.replace(move[0], move[0].toUpperCase()); // left-moveLeft;  up-moveUp
    luckysheetDeleteCell(moveType, row, row, column, column, order);
    if (success && typeof success === 'function') {
        success()
    }
}

/**
 * 设置某个单元格的属性，如果要设置单元格的值或者同时设置多个单元格属性，推荐使用setCellValue
 * @param {Number} row 单元格所在行数；从0开始的整数，0表示第一行
 * @param {Number} column 单元格所在列数；从0开始的整数，0表示第一列
 * @param {String} attr 
 * @param {Number | String | Object} value 具体的设置值，一个属性会对应多个值，参考 单元格属性表的值示例，特殊情况：如果属性类型attr是单元格格式ct，则设置值value应提供ct.fa，比如设置A1单元格的格式为百分比格式：luckysheet.setCellFormat(0, 0, "ct", "0.00%")
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数, callback参数为改变后的cell对象
 */
export function setCellFormat(row, column, attr, value, options = {}) {
    if (row == null && column == null) {
        return console.error('Arguments row or column cannot be null or undefined.')
    }
    if (!attr) {
        return console.error('Arguments attr cannot be null or undefined.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = { ...options };
    let targetSheetData = Store.luckysheetfile[order].data;
    let cellData = targetSheetData[row][column];

    // 特殊格式
    if (attr == 'ct' && (!value || !value.hasOwnProperty('fa') || !value.hasOwnProperty('t'))) {
        return new TypeError('While set attribute \'ct\' to cell, the value must have property \'fa\' and \'t\'')
        cellData.m = update(value.fa, cellData.v)
    }

    cellData[attr] = value;
    // refresh
    jfrefreshgrid(targetSheetData, {
        row: [row],
        column: [column]
    })
    if (success && typeof success === 'function') {
        success(cellData);
    }
}

/**
 * 查找一个工作表中的指定内容，返回查找到的内容组成的单元格一位数组，数据格式同celldata
 * @param {String} content 要查找的内容 可以为正则表达式（不包含前后'/')
 * @param {Object} options 可选参数
 * @param {Boolean} options.isRegularExpression 是否正则表达式匹配；默认为 false. 注意：正则中的规则需要转义，如\S需要写成 \\S
 * @param {Boolean} options.isWholeWord 是否整词匹配；默认为 false
 * @param {Boolean} options.isCaseSensitive 是否区分大小写匹配；默认为 false
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
export function find(content, options = {}) {
    if (!content && content != 0) {
        return console.error('Search content cannot be null or empty')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        isRegularExpression = false,
        isWholeWord = false,
        isCaseSensitive = false,
        order = curSheetOrder
    } = { ...options };
    let targetSheetData = Store.luckysheetfile[order].data;

    let result = [];
    for (let i = 0; i < targetSheetData.length; i++) {
        const rowArr = targetSheetData[i];
        for (let j = 0; j < rowArr.length; j++) {
            const cell = rowArr[j];
            if (!cell) {
                continue;
            }

            // 添加cell的row, column属性   
            // replace方法中的setCellValue中需要使用该属性
            cell.row = i;
            cell.column = j;

            if (isWholeWord) {
                if (isCaseSensitive) {
                    if (content.toString() == cell.m) {
                        result.push(cell)
                    }
                } else {
                    if (cell.m && content.toString().toLowerCase() == cell.m.toLowerCase()) {
                        result.push(cell)
                    }
                }
            } else if (isRegularExpression) {
                let reg;
                if (isCaseSensitive) {
                    reg = new RegExp(func_methods.getRegExpStr(content), 'g')
                } else {
                    reg = new RegExp(func_methods.getRegExpStr(content), 'ig')
                }
                if (reg.test(cell.m)) {
                    result.push(cell)
                }
            } else if (isCaseSensitive) {
                let reg = new RegExp(func_methods.getRegExpStr(content), 'g');
                if (reg.test(cell.m)) {
                    result.push(cell);
                }
            } else {
                let reg = new RegExp(func_methods.getRegExpStr(content), 'ig');
                if (reg.test(cell.m)) {
                    result.push(cell);
                }
            }
        }
    }
    return result;
}

/**
 * 查找一个工作表中的指定内容并替换成新的内容，返回替换后的内容组成的单元格一位数组，数据格式同celldata。
 * @param {String} content 要查找的内容
 * @param {String} replaceContent 要替换的内容
 * @param {Object} options 可选参数
 * @param {Boolean} options.isRegularExpression 是否正则表达式匹配；默认为 false
 * @param {Boolean} options.isWholeWord 是否整词匹配；默认为 false
 * @param {Boolean} options.isCaseSensitive 是否区分大小写匹配；默认为 false
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数, callback参数为替换后的cell集合
 */
export function replace(content, replaceContent, options = {}) {
    let matchCells = find(content, options)
    matchCells.forEach(cell => {
        cell.m = replaceContent;
        setCellValue(cell.row, cell.column, replaceContent, options);
    })
    if (options.success && typeof options.success === 'function') {
        options.success(matchCells)
    }
    return matchCells;
}

/**
 * 冻结首行
 * 若设置冻结的sheet不是当前sheet页，只设置参数不渲染
 * @param {Number | String} order 工作表索引
 */
export function frozenFirstRow(order) {
    // store frozen
    luckysheetFreezen.saveFrozen("freezenRow", order);

    // 冻结为当前sheet页
    if (!order || order == getSheetIndex(Store.currentSheetIndex)) {
        let scrollTop = $("#luckysheet-cell-main").scrollTop();
        let row_st = luckysheet_searcharray(Store.visibledatarow, scrollTop);
        if(row_st == -1){
            row_st = 0;
        }
        let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columeHeaderHeight;
        let freezenhorizontaldata = [Store.visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1), top];
        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

        if (luckysheetFreezen.freezenverticaldata != null) {
            luckysheetFreezen.cancelFreezenVertical();
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
        luckysheetFreezen.createAssistCanvas();
        luckysheetrefreshgrid();
    }
}

/**
 * 冻结首列
 * 若设置冻结的sheet不是当前sheet页，只设置参数不渲染
 * @param {Number | String} order 工作表索引
 */
export function frozenFirstColumn(order) {
    // store frozen
    luckysheetFreezen.saveFrozen("freezenColumn", order);

    // 冻结为当前sheet页
    if (!order || order == getSheetIndex(Store.currentSheetIndex)) {
        let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        let col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollLeft);
        if(col_st == -1){
            col_st = 0;
        }
        let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
        let freezenverticaldata = [Store.visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1), left];
        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

        if (luckysheetFreezen.freezenhorizontaldata != null) {
            luckysheetFreezen.cancelFreezenHorizontal();
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
        luckysheetFreezen.createAssistCanvas();
        luckysheetrefreshgrid();
    }
}

/**
 * 冻结行选区
 * @param {Object} range 行选区范围的focus单元格的行列值构成的对象；格式为{ row_focus:0, column_focus:0 }
 * @param {Number | String} order 工作表索引
 */
export function frozenRowRange(range, order) {
    const locale_frozen = locale().freezen;
    if (!range || (!range.hasOwnProperty('row_focus') && !formula.iscelldata(range))) {
        if(isEditMode()){
            alert(locale_frozen.noSeletionError);
        } else{
            tooltip.info(locale_frozen.noSeletionError, "");
        }
        return
    }
    if (typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
        range = {
            row_focus: range.row[0],
            column_focus: range.column[0]
        }
    }
    // store frozen
    luckysheetFreezen.saveFrozen("freezenRowRange", order, range);

    if (!order || order == getSheetIndex(Store.currentSheetIndex)) {
        let scrollTop = $("#luckysheet-cell-main").scrollTop();
        let row_st = luckysheet_searcharray(Store.visibledatarow, scrollTop);

        let row_focus = range.row_focus;
        if(row_focus > row_st){
            row_st = row_focus;
        }
        if(row_st == -1){
            row_st = 0;
        }

        let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columeHeaderHeight;
        let freezenhorizontaldata = [Store.visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1), top];
        luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

        if (luckysheetFreezen.freezenverticaldata != null) {
            luckysheetFreezen.cancelFreezenVertical();
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);
        luckysheetFreezen.createAssistCanvas();
        luckysheetrefreshgrid();
    }

}

/**
 * 冻结列选区
 * @param {Object} range 列选区范围的focus单元格的行列值构成的对象；格式为{ row_focus:0, column_focus:0 }
 * @param {Number | String} order 工作表索引
 */
export function frozenColumnRange(range, order) {
    const locale_frozen = locale().freezen;
    let isStringRange = typeof range === 'string' && formula.iscelldata(range);
    if (!range || (!range.hasOwnProperty('column_focus') && !isStringRange)) {
        if(isEditMode()){
            alert(locale_frozen.noSeletionError);
        } else{
            tooltip.info(locale_frozen.noSeletionError, "");
        }
        return
    }
    if (isStringRange) {
        range = formula.getcellrange(range)
        range = {
            row_focus: range.row[0],
            column_focus: range.column[0]
        }
    }
    // store frozen
    luckysheetFreezen.saveFrozen("freezenColumnRange", order, range);

    if (!order || order == getSheetIndex(Store.currentSheetIndex)) {
        let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
        let col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollLeft);

        let column_focus = range.column_focus;
        if(column_focus > col_st){
            col_st = column_focus;
        }
        if(col_st == -1){
            col_st = 0;
        }

        let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
        let freezenverticaldata = [Store.visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1), left];
        luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

        if (luckysheetFreezen.freezenhorizontaldata != null) {
            luckysheetFreezen.cancelFreezenHorizontal();
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }

        luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
        luckysheetFreezen.createAssistCanvas();
        luckysheetrefreshgrid();
    }
}

/**
 * 取消冻结
 * @param {Number | String} order 
 */
export function cancelFrozen(order) {
    luckysheetFreezen.saveFrozen("freezenCancel", order);

    // 取消当前sheet冻结时，刷新canvas
    if (!order || order == getSheetIndex(Store.currentSheetIndex)) {
        if (luckysheetFreezen.freezenverticaldata != null) {
            luckysheetFreezen.cancelFreezenVertical();
        }
        if (luckysheetFreezen.freezenhorizontaldata != null) {
            luckysheetFreezen.cancelFreezenHorizontal();
        }
        luckysheetFreezen.createAssistCanvas();
        luckysheetrefreshgrid();
    }
}

/**
 * 冻结行操作。特别注意，只有在isRange设置为true的时候，才需要设置setting中的range，且与一般的range格式不同。
 * @param {Boolean} isRange 是否冻结行到选区 true-冻结行到选区  false-冻结首行
 * @param {Object} options 可选参数
 * @param {Object} options.range isRange为true的时候设置，开启冻结的单元格位置，格式为{ row_focus:0, column_focus:0 }，意为当前激活的单元格的行数和列数；默认从当前选区最后的一个选区中取得
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setHorizontalFrozen(isRange, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        range,
        order = curSheetOrder,
        success
    } = { ...options };

    // 若已存在冻结，取消之前的冻结效果
    cancelFrozen(order);

    if (!isRange) {
        frozenFirstRow(order)
    } else { // 选区行冻结
        frozenRowRange(range, order);
    }

    if (success && typeof success === 'function') {
        success()
    }
}

/**
 * 冻结列操作。特别注意，只有在isRange设置为true的时候，才需要设置setting中的range，且与一般的range格式不同。
 * @param {Boolean} isRange 是否冻结列到选区 true-冻结列到选区  false-冻结首列
 * @param {Object} options 可选参数
 * @param {Object} options.range isRange为true的时候设置，开启冻结的单元格位置，格式为{ row_focus:0, column_focus:0 }，意为当前激活的单元格的行数和列数；默认从当前选区最后的一个选区中取得
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setVerticalFrozen(isRange, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        range,
        order = curSheetOrder,
        success
    } = { ...options };

    // 若已存在冻结，取消之前的冻结效果
    cancelFrozen(order);

    if (!isRange) {
        frozenFirstColumn(order);
    } else {
        frozenColumnRange(range, order);
    }

    if (success && typeof success === 'function') {
        success()
    }
}

/**
 * 冻结行列操作。特别注意，只有在isRange设置为true的时候，才需要设置setting中的range，且与一般的range格式不同。
 * @param {Boolean} isRange 是否冻结行列到选区 true-冻结行列到选区  false-冻结首行列
 * @param {Object} options 可选参数
 * @param {Object} options.range isRange为true的时候设置，开启冻结的单元格位置，格式为{ row_focus:0, column_focus:0 }，意为当前激活的单元格的行数和列数；默认从当前选区最后的一个选区中取得
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setBothFrozen(isRange, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        range,
        order = curSheetOrder,
        success
    } = { ...options };

    let isCurrentSheet = !order || order == getSheetIndex(Store.currentSheetIndex);
    const locale_frozen = locale().freezen;

    // 若已存在冻结，取消之前的冻结效果
    cancelFrozen(order);

    // 冻结首行列
    if (!isRange) {
        // store frozen
        luckysheetFreezen.saveFrozen("freezenRC", order)

        if (isCurrentSheet) {
            let scrollTop = $("#luckysheet-cell-main").scrollTop();
            let row_st = luckysheet_searcharray(Store.visibledatarow, scrollTop);
            if(row_st == -1){
                row_st = 0;
            }
            let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columeHeaderHeight;
            let freezenhorizontaldata = [Store.visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1), top];
            luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

            luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);

            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollLeft);
            if(col_st == -1){
                col_st = 0;
            }
            let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
            let freezenverticaldata = [Store.visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1), left];
            luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

            luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);

            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }
    } else {   // 冻结行列到选区
        // store frozen
        luckysheetFreezen.saveFrozen("freezenRCRange", order, range)

        let isStringRange = typeof range === 'string' && formula.iscelldata(range);
        if (isCurrentSheet) {
            if ((!range || !(range.hasOwnProperty('column_focus') && range.hasOwnProperty('row_focus'))) && !isStringRange) {
                if(isEditMode()){
                    alert(locale_frozen.noSeletionError);
                } else{
                    tooltip.info(locale_frozen.noSeletionError, "");
                }
                return
            }

            if (isStringRange) {
                range = formula.getcellrange(range)
                range = {
                    row_focus: range.row[0],
                    column_focus: range.column[0]
                }
            }

            let scrollTop = $("#luckysheet-cell-main").scrollTop();
            let row_st = luckysheet_searcharray(Store.visibledatarow, scrollTop);

            let row_focus = range.row_focus;

            if(row_focus > row_st){
                row_st = row_focus;
            }
            
            if(row_st == -1){
                row_st = 0;
            }

            let top = Store.visibledatarow[row_st] - 2 - scrollTop + Store.columeHeaderHeight;
            let freezenhorizontaldata = [Store.visibledatarow[row_st], row_st + 1, scrollTop, luckysheetFreezen.cutVolumn(Store.visibledatarow, row_st + 1), top];
            luckysheetFreezen.saveFreezen(freezenhorizontaldata, top, null, null);

            luckysheetFreezen.createFreezenHorizontal(freezenhorizontaldata, top);

            let scrollLeft = $("#luckysheet-cell-main").scrollLeft();
            let col_st = luckysheet_searcharray(Store.visibledatacolumn, scrollLeft);

            let column_focus = range.column_focus;

            if(column_focus > col_st){
                col_st = column_focus;
            }

            if(col_st == -1){
                col_st = 0;
            }
            
            let left = Store.visibledatacolumn[col_st] - 2 - scrollLeft + Store.rowHeaderWidth;
            let freezenverticaldata = [Store.visibledatacolumn[col_st], col_st + 1, scrollLeft, luckysheetFreezen.cutVolumn(Store.visibledatacolumn, col_st + 1), left];
            luckysheetFreezen.saveFreezen(null, null, freezenverticaldata, left);

            luckysheetFreezen.createFreezenVertical(freezenverticaldata, left);
            
            luckysheetFreezen.createAssistCanvas();
            luckysheetrefreshgrid();
        }
    }
}

/**
 * 在第index行或列的位置，插入number行或列
 * @param {String} type 插入行或列 row-行  column-列
 * @param {Number} index 在第几行插入空白行，从0开始
 * @param {Object} options 可选参数
 * @param {Number} options.number 插入的空白行数；默认为 1
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function insertRowOrColumn(type, index = 0, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        number = 1,
        order = curSheetOrder,
        success
    } = {...options}

    if (!isRealNum(number)) {
        if(isEditMode()){
            alert(locale_info.tipInputNumber);
        } else{
            tooltip.info(locale_info.tipInputNumber, "");
        }
        return;
    }
    number = parseInt(number);
    if (number < 1 || number > 100) {
        if(isEditMode()){
            alert(locale_info.tipInputNumberLimit);
        } else{
            tooltip.info(locale_info.tipInputNumberLimit, ""); 
        }
        return;
    }
    // 默认在行上方增加行，列左侧增加列
    luckysheetextendtable(type, index, number, "lefttop", order);

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 在第row行的位置，插入number行空白行
 * @param {Number} row 在第几行插入空白行，从0开始
 * @param {Object} options 可选参数
 * @param {Number} options.number 插入的空白行数；默认为 1
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function insertRow(row = 0, options = {}) {
    insertRowOrColumn('row', row, options)
}

/**
 * 在第column列的位置，插入number列空白列
 * @param {Number} column 在第几列插入空白列，从0开始
 * @param {Object} options 可选参数
 * @param {Number} options.number 插入的空白列数；默认为 1
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function insertColumn(column = 0, options = {}) {
    insertRowOrColumn('column', column, options)
}

/**
 * 删除指定的行或列。删除行列之后，行列的序号并不会变化，下面的行（右侧的列）会补充到上（左）面，注意观察数据是否被正确删除即可。
 * @param {String} type 删除行或列 row-行  column-列
 * @param {Number} startIndex 要删除的起始行或列
 * @param {Number} endIndex 要删除的结束行或列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function deleteRowOrColumn(type, startIndex, endIndex, options = {}) {
    if (startIndex == null || endIndex == null) {
        return console.error('Please enter the index for deleting rows or columns correctly.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}
    luckysheetdeletetable(type, startIndex, endIndex, order)
    
    if (success && typeof success === 'function') {
        success()
    }
}

/**
 * 删除指定的行。
 * @param {Number} rowStart 要删除的起始行
 * @param {Number} rowEnd 要删除的结束行
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function deleteRow(rowStart, rowEnd, options = {}) {
    deleteRowOrColumn('row', rowStart, rowEnd, options)
}

/**
 * 删除指定的列。
 * @param {Number} columnStart 要删除的起始列
 * @param {Number} columnEnd 要删除的结束列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function deleteColumn(columnStart, columnEnd, options = {}) {
    deleteRowOrColumn('column', columnStart, columnEnd, options)
}

/**
 * 隐藏行或列
 * @param {String} type 隐藏行或列  row-隐藏行  column-隐藏列
 * @param {Number} startIndex 起始行或列
 * @param {Number} endIndex 结束行或列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function hideRowOrColumn(type, startIndex, endIndex, options = {}) {
    if (startIndex == null || endIndex == null) {
        return console.error('Please enter the index for deleting rows or columns correctly.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}

    let file = Store.luckysheetfile[order];
    let cfgKey = type === 'row' ? 'rowhidden': 'colhidden';
    let cfg = $.extend(true, {}, file.config);
    if(cfg[cfgKey] == null) {
        cfg[cfgKey] = {};
    }

    for (let i = startIndex; i <= endIndex; i++) {
        cfg[cfgKey][i] = 0;
    }

    //保存撤销
    if(Store.clearjfundo){
        let redo = {};
        redo["type"] = type === 'row' ? 'showHidRows' : 'showHidCols';
        redo["sheetIndex"] = order;
        redo["config"] = $.extend(true, {}, file.config);
        redo["curconfig"] = cfg;

        Store.jfundo = [];
        Store.jfredo.push(redo);
    }
    
    Store.luckysheetfile[order].config = cfg;
    server.saveParam("cg", order, cfg[cfgKey], { "k": cfgKey });
    
    // 若操作sheet为当前sheet页，行高、列宽 刷新  
    if (order == curSheetOrder) {
        //config
        Store.config = cfg;
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    }

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 显示隐藏的行或列
 * @param {String} type 显示行或列  row-显示行  column-显示列
 * @param {Number} startIndex 起始行或列
 * @param {Number} endIndex 结束行或列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function showRowOrColumn(type, startIndex, endIndex, options = {}) {
    if (startIndex == null || endIndex == null) {
        return console.error('Please enter the index for deleting rows or columns correctly.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}

    let cfgKey = type === 'row' ? 'rowhidden': 'colhidden';
    let cfg = $.extend(true, {}, Store.config);
    if(cfg[cfgKey] == null) {
        return;
    }

    for (let i = startIndex; i <= endIndex; i++) {
        delete cfg[cfgKey][i];
    }

    //保存撤销
    if(Store.clearjfundo){
        let redo = {};
        redo["type"] = type === 'row' ? 'showHidRows' : 'showHidCols';
        redo["sheetIndex"] = order;
        redo["config"] = $.extend(true, {}, Store.config);
        redo["curconfig"] = cfg;

        Store.jfundo = [];
        Store.jfredo.push(redo);
    }

    //config
    Store.config = cfg;
    Store.luckysheetfile[order].config = Store.config;

    server.saveParam("cg", order, cfg[cfgKey], { "k": cfgKey });

    // 若操作sheet为当前sheet页，行高、列宽 刷新  
    if (order === curSheetOrder) {
        jfrefreshgrid_rhcw(Store.flowdata.length, Store.flowdata[0].length);
    }

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 隐藏行
 * @param {Number} startIndex 起始行
 * @param {Number} endIndex 结束行
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function hideRow(startIndex, endIndex, options = {}) {
    hideRowOrColumn('row', startIndex, endIndex, options);
}

/**
 * 显示行
 * @param {Number} startIndex 起始行
 * @param {Number} endIndex 结束行
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function showRow(startIndex, endIndex, options = {}) {
    showRowOrColumn('row', startIndex, endIndex, options);
}

/**
 * 隐藏列
 * @param {Number} startIndex 起始列
 * @param {Number} endIndex 结束列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function hideColumn(startIndex, endIndex, options = {}) {
    hideRowOrColumn('column', startIndex, endIndex, options);
}

/**
 * 显示列
 * @param {Number} startIndex 起始列
 * @param {Number} endIndex 结束列
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function showColumn(startIndex, endIndex, options = {}) {
    showRowOrColumn('column', startIndex, endIndex, options);
}

/**
 * 返回当前选区对象的数组，可能存在多个选区。
 * 每个选区的格式为row/column信息组成的对象{row:[0,1],column:[0,1]}
 * @returns {Array}
 */
export function getRange() {
    let rangeArr = Store.luckysheet_select_save;
    let result = [];
    for (let i = 0; i < rangeArr.length; i++) {
        let rangeItem = rangeArr[i];
        let temp = {
            row: rangeItem.row,
            column: rangeItem.column
        }
        result.push(temp)
    }
    return result;
}

/**
 * 返回指定工作表指定范围的单元格二维数组数据，每个单元格为一个对象
 * @param {Object} options 
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
export function getRangeValue(options = {}) {
    let {
        range,
        order
    } = {...options}

    if (!range || typeof range === 'object') {
        return getdatabyselection(range, order);
    } else if (typeof range === 'string') {
        if (formula.iscelldata(range)) {
            return getdatabyselection(formula.getcellrange(range), order)
        } else {
            console.error('The range is invalid, please check range parameter.')
        }
    }
}

/**
 * @todo 核心功能未实现，to be continue
 * @description 复制指定工作表指定单元格区域的数据，返回一维、二维或者自定义行列数的二维数组的数据。只有在dimensional设置为custom的时候，才需要设置setting中的row和column
 * @param {String} dimensional 数组维度。可选值为：oneDimensional-一维数组；twoDimensional-二维数组； custom-自定义行列数的二维数组
 * @param {Object} options 可选参数
 * @param {Number} options.row dimensional为custom的时候设置，多维数组的行数
 * @param {Number} options.column dimensional为custom的时候设置，多维数组的列数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
function getRangeArray(dimensional, options = {}) {
    let dimensionalArray = ['oneDimensional', 'twoDimensional', 'custom']
    if (dimensionalArray.indexOf(dimensional) < 0) {
        return console.error('Argument dimensional is invalid, the value can be \'oneDimensional\', \'twoDimensional\', \'custom\'')
    }
    let {
        row,
        column,
        range,
        order
    } = {...options}

    let realRange = range;

    if (typeof range === 'string') {
        if (formula.iscelldata(range)) {
            realRange = formula.getcellrange(range)
        } else {
            return console.error('The range is invalid, please check range parameter.')
        }
    }

    if (dimensional === 'oneDimensional') {
        formula.getRangeArray(realRange)
    } else if (dimensional === 'twoDimensional') {
        formula.getRangeArrayTwo(realRange)
    } else if (dimensional === 'custom') {
        // TODO
    }
}

/**
 * 复制指定工作表指定单元格区域的数据，返回json格式的数据
 * @param {Boolean} isFirstRowTitle 是否首行为标题
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
export function getRangeJson(isFirstRowTitle, options = {}) {
    let curRange = Store.luckysheet_select_save;
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        range = curRange,
        order = curSheetOrder
    } = {...options}
    let file = Store.luckysheetfile[order];
    let config = file.config;

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }
    if (!range || range.length > 1) {
        if(isEditMode()){
            alert(locale_drag.noMulti);
        } else{
            tooltip.info(locale_drag.noMulti, "");   
        }
        return;
    }

    //复制范围内包含部分合并单元格，提示
    if(config["merge"] != null) {
        let has_PartMC = false;
        let r1 = range[0].row[0],
        r2 = range[0].row[1],
        c1 = range[0].column[0],
        c2 = range[0].column[1];
        has_PartMC = hasPartMC(config, r1, r2, c1, c2);
        
        if(has_PartMC){
            if(isEditMode()){
                alert(locale().drag.noPartMerge);
            } else{
                tooltip.info(locale().drag.noPartMerge, ""); 
            }
            return;    
        }
    }
    let getdata = getdatabyselection(range, order);
    let arr = [];
    if (getdata.length === 0) {
        return;
    }
    if (isFirstRowTitle) {
        if (getdata.length === 1) {
            let obj = {};
            for (let i = 0; i < getdata[0].length; i++) {
                obj[getcellvalue(0, i, getdata)] = "";
            }
            arr.push(obj);
        } else {
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
    } else {
        let st = range[0]["column"][0];
        for (let r = 0; r < getdata.length; r++) {
            let obj = {};
            for (let c = 0; c < getdata[0].length; c++) {
                obj[chatatABC(c + st)] = getcellvalue(r, c, getdata);
            }
            arr.push(obj);
        }
    }
    selection.copybyformat(new Event(), JSON.stringify(arr));
}

/**
 * 
 * @param {String} type 对角线还是对角线偏移 "normal"-对角线  "anti"-反对角线
"offset"-对角线偏移
 * @param {Object} options 可选参数
 * @param {Number} options.column type为offset的时候设置，对角偏移的列数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
export function getRangeDiagonal(type, options = {}) {
    let typeValues = ['normal', 'anti', 'offset'];
    if (typeValues.indexOf(type) < 0) {
        return console.error('The type parameter must be included in [\'normal\', \'anti\', \'offset\']')
    }

    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let curRange = Store.luckysheet_select_save;
    let {
        column = 1,
        range = curRange,
        order = curSheetOrder
    } = {...options}

    let file = Store.luckysheetfile[order];
    let config = file.config;

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }
    if (!range || range.length > 1) {
        if(isEditMode()){
            alert(locale().drag.noMulti);
        } else{
            tooltip.info(locale().drag.noMulti, "");   
        }
        return;
    }

    //复制范围内包含部分合并单元格，提示
    if(config["merge"] != null) {
        let has_PartMC = false;
        let r1 = range[0].row[0],
        r2 = range[0].row[1],
        c1 = range[0].column[0],
        c2 = range[0].column[1];
        has_PartMC = hasPartMC(config, r1, r2, c1, c2);
        
        if(has_PartMC){
            if(isEditMode()){
                alert(locale().drag.noPartMerge);
            } else{
                tooltip.info(locale().drag.noPartMerge, ""); 
            }
            return;    
        }
    }
    let getdata = getdatabyselection(range, order);
    let arr = [];
    if (getdata.length === 0) {
        return;
    }

    let clen = getdata[0].length;
    switch (type) {
        case 'normal':
            for (let r = 0; r < getdata.length; r++) {
                if (r >= clen) {
                    break;
                }
                arr.push(getdata[r][r]);
            }
            break;
        case 'anti':
            for (let r = 0; r < getdata.length; r++) {
                if (r >= clen) {
                    break;
                }
                arr.push(getdata[r][clen - r - 1]);
            }
            break;
        case 'offset':
            if(column.toString() == "NaN"){
                if(isEditMode()){
                    alert(locale().drag.inputCorrect);
                } else{
                    tooltip.info(locale().drag.inputCorrect, "");
                }
                return;
            }

            if(column < 0){
                if(isEditMode()){
                    alert(locale().drag.offsetColumnLessZero);
                } else{
                    tooltip.info(locale().drag.offsetColumnLessZero, "");
                }
                return;
            }

            for (let r = 0; r < getdata.length; r++) {
                if (r + column >= clen) {
                    break;
                }
                arr.push(getdata[r][r + column]);
            }
            break;
    }
    selection.copybyformat(new Event(), JSON.stringify(arr));
}

/**
 * 复制指定工作表指定单元格区域的数据，返回布尔值的数据
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引 
 */
export function getRangeBoolean(options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let curRange = Store.luckysheet_select_save;
    let {
        range = curRange,
        order = curSheetOrder
    } = {...options}

    let file = Store.luckysheetfile[order];
    let config = file.config;

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }

    if (!range || range.length > 1) {
        if(isEditMode()){
            alert(locale().drag.noMulti);
        } else{
            tooltip.info(locale().drag.noMulti, "");   
        }
        return;
    }

    //复制范围内包含部分合并单元格，提示
    if(config["merge"] != null) {
        let has_PartMC = false;
        let r1 = range[0].row[0],
        r2 = range[0].row[1],
        c1 = range[0].column[0],
        c2 = range[0].column[1];
        has_PartMC = hasPartMC(config, r1, r2, c1, c2);
        
        if(has_PartMC){
            if(isEditMode()){
                alert(locale().drag.noPartMerge);
            } else{
                tooltip.info(locale().drag.noPartMerge, ""); 
            }
            return;    
        }
    }
    let getdata = getdatabyselection(range, order);
    let arr = [];
    if (getdata.length === 0) {
        return;
    }
    for (let r = 0; r < getdata.length; r++) {
        let a = [];
        for (let c = 0; c < getdata[0].length; c++) {
            let bool = false;

            let v;
            if(getObjType(getdata[r][c]) == "object"){
                v = getdata[r][c].v;
            } else{
                v = getdata[r][c];
            }

            if (v == null || v == "") {
                bool = false;
            } else {
                v = parseInt(v);
                if (v == null || v > 0) {
                    bool = true;
                } else {
                    bool = false;
                }
            }
            a.push(bool);
        }
        arr.push(a);
    }

    selection.copybyformat(event, JSON.stringify(arr));
}

/**
 * 将一个单元格数组数据赋值到指定的区域，数据格式同getRangeValue方法取到的数据。
 * @param {Array[Array]} data 要赋值的单元格二维数组数据，每个单元格的值，可以为字符串或数字，或为符合Luckysheet格式的对象
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setRangeValue(data, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let curRange = Store.luckysheet_select_save;
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    if (data == null) {
        return console.error('The data which will be set to range cannot be null.')
    }
    if (range instanceof Array) {
        return console.error('setRangeValue only supports a single selection.')
    }
    if (typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }
    let rowCount = range.row[1] - range.row[0] + 1,
        columnCount = range.column[1] - range.column[0] + 1;
    if (data.length !== rowCount || data[0].length !== columnCount) {
        return console.error('The data to be set does not match the selection.')
    }

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            let row = range.row[0] + i,
                column = range.column[0] + j;
            setCellValue(row, column, data[i][j], {order: order})
        }
    }
    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 设置指定范围的单元格格式，一般用作处理格式，赋值操作推荐使用setRangeValue方法
 * @param {String} attr 要赋值的单元格二维数组数据，每个单元格的值，可以为字符串或数字，或为符合Luckysheet格式的对象
 * @param {Number | String | Object} value 具体的设置值
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 设置参数的目标选区范围，支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 */
export function setSingleRangeFormat(attr, value, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let curRange = Store.luckysheet_select_save;
    let {
        range = curRange,
        order = curSheetOrder,
    } = {...options}
    if (attr == null) {
        return console.error('Arguments attr cannot be null or undefined.')
    }
    if (range instanceof Array) {
        return console.error('setRangeValue only supports a single selection.')
    }
    if (typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }
    let rowCount = range.row[1] - range.row[0] + 1,
        columnCount = range.column[1] - range.column[0] + 1;
    if (data.length !== rowCount || data[0].length !== columnCount) {
        return console.error('The data to be set does not match the selection')
    }

    for (let i = 0; i < rowCount; i++) {
        for (let j = 0; j < columnCount; j++) {
            let row = range.row[0] + i,
                column = range.column[0] + j;
            setCellFormat(row, column, attr, value, {order: order})
        }
    }
}

/**
 * 设置指定范围的单元格格式，一般用作处理格式。支持多选区设置
 * @param {String} attr 要赋值的单元格二维数组数据，每个单元格的值，可以为字符串或数字，或为符合Luckysheet格式的对象
 * @param {Number | String | Object} value 具体的设置值
 * @param {Object} options 可选参数
 * @param {Array | Object | String} options.range 设置参数的目标选区范围，支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setRangeFormat(attr, value, options = {}) {
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let curRange = Store.luckysheet_select_save;
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    if (range instanceof Array) {
        for (let i = 0; i < range.length; i++) {
            setSingleRangeFormat(range[i])
        }
    }
    if (success && typeof success === 'function') {
        success()
    }
}

/**
 * 为指定索引的工作表，选定的范围开启或关闭筛选功能
 * @param {String} type 打开还是关闭筛选功能  open-打开筛选功能，返回当前筛选的范围对象；close-关闭筛选功能，返回关闭前筛选的范围对象 
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围
 * @param {Number} options.order 
 * @param {Object} options.success 
 */
function setRangeFilter(type, options = {}) {
    let typeValues = ['open', 'close'];
    if (typeValues.indexOf(type) < 0) {
        return console.error('The type parameter must be included in [\'open\', \'close\']')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex),
        curRange = Store.luckysheet_select_save;
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    if(range > 1){
        const locale_splitText = locale().splitText;
        if(isEditMode()){
            alert(locale_splitText.tipNoMulti);
        } else{
            tooltip.info(locale_splitText.tipNoMulti, "");
        }
        return;
    }

    if(Store.luckysheetfile[order].isPivotTable){
        return;
    }
    // TODO to be continue
}

/**
 * 为指定索引的工作表，选定的范围设定合并单元格
 * @param {String} type 合并类型 all-全部合并  horizontal-水平合并  vertical-垂直合并
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Object} options.success 操作结束的回调函数
 */
export function setRangeMerge(type, options = {}) {
    let typeValues = ['all', 'horizontal', 'vertical'];
    if (typeValues.indexOf(type) < 0) {
        return console.error('The type parameter must be included in [\'all\', \'horizontal\', \'vertical\']')
    }

    let curSheetOrder = getSheetIndex(Store.currentSheetIndex),
        curRange = Store.luckysheet_select_save;
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    let file = luckysheetfile[order],
        cfg = file.config,
        data = file.data;

    if (!(range instanceof Array)) {
        range = [range]
    }

    let isHasMc = false; //选区是否含有 合并的单元格
    for (let i = 0; i < range.length; i++) {
        let rangeItem = range[i];
        if (rangeItem && typeof rangeItem === 'string' && formula.iscelldata(rangeItem)) {
            rangeItem = formula.getcellrange(rangeItem)
        }
        let r1 = rangeItem.row[0],
            r2 = rangeItem.row[1],
            c1 = rangeItem.column[0],
            c2 = rangeItem.column[1];

        for(let r = r1; r <= r2; r++){
            for(let c = c1; c <= c2; c++){
                let cell = data[r][c];
                if(getObjType(cell) == "object" && ("mc" in cell)){
                    isHasMc = true;
                    break;
                }
            }
            if (isHasMc) {
                break;
            }
        }
        if (isHasMc) {
            break;
        }
    }

    if (isHasMc) {
        cancelRangeMerge({
            range: range,
            order: order
        })
    } else {
        for (let i = 0; i < range.length; i++) {
            let rangeItem = range[i];
            if (rangeItem && typeof rangeItem === 'string' && formula.iscelldata(rangeItem)) {
                rangeItem = formula.getcellrange(rangeItem)
            }
            let r1 = rangeItem.row[0],
                r2 = rangeItem.row[1],
                c1 = rangeItem.column[0],
                c2 = rangeItem.column[1];
            
            if (type === 'all') {
                let fv = {}, 
                    isfirst = false;
                for(let r = r1; r <= r2; r++){
                    for(let c = c1; c <= c2; c++){
                        let cell = data[r][c];

                        if(cell != null && (!isRealNull(cell.v) || cell.f != null) && !isfirst){
                            fv = $.extend(true, {}, cell);
                            isfirst = true;
                        }

                        data[r][c] = { "mc": { "r": r1, "c": c1 } };
                    }
                }

                data[r1][c1] = fv;
                data[r1][c1].mc = { "r": r1, "c": c1, "rs": r2 - r1 + 1, "cs": c2 - c1 + 1 };

                cfg["merge"][r1 + "_" + c1] = { "r": r1, "c": c1, "rs": r2 - r1 + 1, "cs": c2 - c1 + 1 };
            } else if (type === 'vertical') {
                for(let c = c1; c <= c2; c++){
                    let fv = {}, 
                        isfirst = false;

                    for(let r = r1; r <= r2; r++){
                        let cell = data[r][c];

                        if(cell != null && (!isRealNull(cell.v) || cell.f != null) && !isfirst){
                            fv = $.extend(true, {}, cell);
                            isfirst = true;
                        }

                        data[r][c] = { "mc": { "r": r1, "c": c } };
                    }

                    data[r1][c] = fv;
                    data[r1][c].mc = { "r": r1, "c": c, "rs": r2 - r1 + 1, "cs": 1 };

                    cfg["merge"][r1 + "_" + c] = { "r": r1, "c": c, "rs": r2 - r1 + 1, "cs": 1 };
                }
            } else if (type === 'horizontal') {
                for(let r = r1; r <= r2; r++){
                    let fv = {}, 
                        isfirst = false;

                    for(let c = c1; c <= c2; c++){
                        let cell = data[r][c];

                        if(cell != null && (!isRealNull(cell.v) || cell.f != null) && !isfirst){
                            fv = $.extend(true, {}, cell);
                            isfirst = true;
                        }

                        data[r][c] = { "mc": { "r": r, "c": c1 } };
                    }

                    data[r][c1] = fv;
                    data[r][c1].mc = { "r": r, "c": c1, "rs": 1, "cs": c2 - c1 + 1 };

                    cfg["merge"][r + "_" + c1] = { "r": r, "c": c1, "rs": 1, "cs": c2 - c1 + 1 };
                }
            }
        }
    }

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 为指定索引的工作表，选定的范围取消合并单元格
 * @param {Object} options 可选参数
 * @param {Array | Object | String} options.range 选区范围
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Object} options.success 操作结束的回调函数
 */
export function cancelRangeMerge(options = {}) {
    let curRange = Store.luckysheet_select_save[0],
        curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    let file = luckysheetfile[order],
        cfg = file.config,
        data = file.data;

    if (!(range instanceof Array)) {
        range = [range]
    }

    for (let i = 0; i < range.length; i++) {
        let rangeItem = range[i];
        if (rangeItem && typeof rangeItem === 'string' && formula.iscelldata(rangeItem)) {
            rangeItem = formula.getcellrange(rangeItem)
        }
        let r1 = rangeItem.row[0],
            r2 = rangeItem.row[1],
            c1 = rangeItem.column[0],
            c2 = rangeItem.column[1];
        if (r1 == r2 && c1 == c2) {
            continue;
        }
    
        let fv = {}
        for(let r = r1; r <= r2; r++){
            for(let c = c1; c <= c2; c++){
                let cell = data[r][c];
    
                if(cell != null && cell.mc != null){
                    let mc_r = cell.mc.r, mc_c = cell.mc.c;
    
                    if("rs" in cell.mc){
                        delete cell.mc;
                        delete cfg["merge"][mc_r + "_" + mc_c];
    
                        fv[mc_r + "_" + mc_c] = $.extend(true, {}, cell);
                    }
                    else{
                        let cell_clone = fv[mc_r + "_" + mc_c];
                        delete cell_clone.v;
                        delete cell_clone.m;
                        delete cell_clone.ct;
                        delete cell_clone.f;
                        delete cell_clone.spl;
                        data[r][c] = cell_clone;
                    }
                }
            }
        }
    }

    // 当前sheet页合并时刷新
    if (order === curSheetOrder) {
        jfrefreshgrid(data, range, cfg)
    }
}

/**
 * 为指定索引的工作表，选定的范围开启排序功能，返回选定范围排序后的数据。
 * @param {String} type 排序类型 asc-升序 desc-降序
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setRangeSort(type, options = {}) {
    let typeValues = ['asc', 'desc']
    if (typeValues.indexOf(type) < 0) {
        return console.error('The type parameter must be included in [\'asc\', \'desc\'')
    }

    let curSheetOrder = getSheetIndex(Store.currentSheetIndex),
        curRange = Store.luckysheet_select_save[0];
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    let file = Store.luckysheetfile[order],
        cfg = file.config,
        fileData = file.data;

    if(range instanceof Array && range.length > 1){
        if(isEditMode()){
            alert(locale().sort.noRangeError);
        } else{
            tooltip.info(locale().sort.noRangeError, "");
        }
        return;
    }

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }
    let r1 = range.row[0],
        r2 = range.row[1],
        c1 = range.column[0],
        c2 = range.column[1];
        
    let hasMc = false; //Whether the sort selection has merged cells
    let data = [];
    for(let r = r1; r <= r2; r++){
        let data_row = [];
        for(let c = c1; c <= c2; c++){
            if(fileData[r][c] != null && fileData[r][c].mc != null){
                hasMc = true;
                break;
            }
            data_row.push(fileData[r][c]);
        }
        data.push(data_row);
    }
    if(hasMc){
        if(isEditMode()){
            alert(locale().sort.mergeError);
        } else{
            tooltip.info(locale().sort.mergeError, "");
        }
        return;
    }
    data = orderbydata([].concat(data), 0, type === 'asc');

    for(let r = r1; r <= r2; r++){
        for(let c = c1; c <= c2; c++){
            fileData[r][c] = data[r - r1][c - c1];
        }
    }
    if(cfg["rowlen"] != null){
        let config = $.extend(true, {}, cfg);
        config = rowlenByRange(fileData, r1, r2, config);
        
        if (order == Store.currentSheetIndex) {
            jfrefreshgrid(fileData, [{ "row": [r1, r2], "column": [c1, c2] }], config, null, true);
        }
    } else{
        if (order == Store.currentSheetIndex) {
            jfrefreshgrid(fileData, [{ "row": [r1, r2], "column": [c1, c2] }]);
        }
    }

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 为指定索引的工作表，选定的范围开启多列自定义排序功能，返回选定范围排序后的数据。
 * @param {Boolean} hasTitle 数据是否具有标题行
 * @param {Array} sort 列设置，设置需要排序的列索引和排序方式，格式如：[{ i:0,sort:'asc' },{ i:1,sort:'des' }]
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setRangeSortMulti(hasTitle, sort, options = {}) {
    if (!sort || !(sort instanceof Array)) {
        return console.error('The sort parameter is invalid.')
    }

    let curSheetOrder = getSheetIndex(Store.currentSheetIndex),
        curRange = Store.luckysheet_select_save[0];
    let {
        range = curRange,
        order = curSheetOrder,
        success
    } = {...options}
    let file = Store.luckysheetfile[order],
        cfg = file.config,
        fileData = file.data;

    if(range instanceof Array && range.length > 1){
        if(isEditMode()){
            alert(locale().sort.noRangeError);
        } else{
            tooltip.info(locale().sort.noRangeError, "");
        }
        return;
    }

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }
    let r1 = range.row[0],
        r2 = range.row[1],
        c1 = range.column[0],
        c2 = range.column[1];
        
    let str;
    if(hasTitle){
        str = r1 + 1;
    } else{
        str = r1;
    }
    let hasMc = false; //Whether the sort selection has merged cells
    let data = [];
    for(let r = str; r <= r2; r++){
        let data_row = [];
        for(let c = c1; c <= c2; c++){
            if(fileData[r][c] != null && fileData[r][c].mc != null){
                hasMc = true;
                break;
            }
            data_row.push(fileData[r][c]);
        }
        data.push(data_row);
    }
    if(hasMc){
        if(isEditMode()){
            alert(locale().sort.mergeError);
        } else{
            tooltip.info(locale().sort.mergeError, "");
        }
        return;
    }
    sort.forEach(sortItem => {
        let i = sortItem.i;
        i -= c1;
        data = orderbydata([].concat(data), i, sortItem.sort === 'asc');
    })

    for(let r = str; r <= r2; r++){
        for(let c = c1; c <= c2; c++){
            fileData[r][c] = data[r - str][c - c1];
        }
    }
    if(cfg["rowlen"] != null){
        let config = $.extend(true, {}, cfg);
        config = rowlenByRange(fileData, str, r2, config);

        if (order === Store.currentSheetIndex) {
            jfrefreshgrid(fileData, [{ "row": [str, r2], "column": [c1, c2] }], config, null, true);
        }
    } else{
        if (order === Store.currentSheetIndex) {
            jfrefreshgrid(fileData, [{ "row": [str, r2], "column": [c1, c2] }]);
        }
    }

    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 
 * @param {String} move 删除后，右侧还是下方的单元格移动
 * @param {Object} options 可选参数
 */
function deleteRange(move, options = {}) {

}

/**
 * 指定工作表指定单元格区域的数据进行矩阵操作，返回操作成功后的结果数据
 * @param {String} type 矩阵操作的类型
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Function} options.success 操作结束的回调函数
 */
export function matrixOperation(type, options = {}) {
    let typeValues = [
        'flipUpDown',               // 上下翻转
        'flipLeftRight',            // 左右翻转
        'flipClockwise',            // 顺时针旋转
        'flipCounterClockwise',     // 逆时针旋转
        'transpose',                // 转置
        'deleteZeroByRow',          // 按行删除两端0值
        'deleteZeroByColumn',       // 按列删除两端0值
        'removeDuplicateByRow',     // 按行删除重复值
        'removeDuplicateByColumn',  // 按列删除重复值
        'newMatrix'                 // 生产新矩阵
    ]
    if (!type || typeValues.indexOf(type) < 0) {
        return console.error('The type parameter is invalid.')
    }

    let curRange = Store.luckysheet_select_save[0];
    let {
        range = curRange,
        success
    } = {...options}

    if(range instanceof Array && range.length > 1){
        if(isEditMode()){
            alert(locale().drag.noMulti);
        } else{
            tooltip.info(locale().drag.noMulti, "");
        }
        return;
    }

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }

    let getdata = getdatabyselection(range);
    let arr = [];
    if (getdata.length === 0) {
        return;
    }

    let getdatalen, collen, arr1;
    switch (type) {
        case 'flipUpDown':
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
            break;
        case 'flipLeftRight':
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
            break;
        case 'flipClockwise':
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
            break;
        case 'flipCounterClockwise':
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
            break;
        case 'transpose':
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
            break;
        case 'deleteZeroByRow':
            getdatalen = getdata[0].length;
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
                } else {
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
            break;
        case 'deleteZeroByColumn':
            getdatalen = getdata.length;
            collen = getdata[0].length;
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

            arr1 = [];
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
            break;
        case 'removeDuplicateByRow':
            getdatalen = getdata[0].length;
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
            break;
        case 'removeDuplicateByColumn':
            collen = getdata[0].length;
            getdatalen = getdata.length;
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

            arr1 = [];
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
            break;
        case 'newMatrix':
            // TODO
            console.log("TODO")
            break;
    }
    editor.controlHandler(arr, range)
    
    if (success && typeof success === 'function') {
        success();
    }
}

/**
 * 指定工作表指定单元格区域的数据进行矩阵计算，返回计算成功后的结果数据
 * @param {String} type 计算方式
 * @param {Number} number 计算数值
 * @param {Object} options 可选参数
 * @param {Object | String} options.range 选区范围,支持选区的格式为"A1:B2"、"sheetName!A1:B2"或者{row:[0,1],column:[0,1]}，只能为单个选区；默认为当前选区
 * @param {Function} options.success 操作结束的回调函数
 */
export function matrixCalculation(type, number, options = {}) {
    let typeValues = [
        'plus',     // 加
        'minus',    // 减
        'multiply', // 乘
        'divided',  // 除
        'power',    // 幂
        'root',     // 次方根
        'log'       // 对数log
    ]
    if (!type || typeValues.indexOf(type) < 0) {
        return console.error('The type parameter is invalid.')
    }
    if(number.toString() == "NaN"){
        return console.error('The number parameter is invalid.')
    }

    let curRange = Store.luckysheet_select_save[0];
    let {
        range = curRange,
        success
    } = {...options}

    if(range instanceof Array && range.length > 1){
        if(isEditMode()){
            alert(locale().drag.noMulti);
        } else{
            tooltip.info(locale().drag.noMulti, "");
        }
        return;
    }

    if (range && typeof range === 'string' && formula.iscelldata(range)) {
        range = formula.getcellrange(range)
    }

    let getdata = getdatabyselection(range);
    if (getdata.length == 0) {
        return;
    }
    let arr = [];
    for (let r = 0; r < getdata.length; r++) {
        let a = [];
        for (let c = 0; c < getdata[0].length; c++) {
            let value = "";
            if (getdata[r] != null && getdata[r][c] != null) {
                value = getdata[r][c];
                if (parseInt(value) != null && getdata[r][c].ct != undefined && getdata[r][c].ct.t == "n") {
                    if (type == "minus") {
                        value.v = value.v - number;
                    }
                    else if (type == "multiply") {
                        value.v = value.v * number;
                    }
                    else if (type == "divided") {
                        value.v = numFormat(value.v / number, 4);
                    }
                    else if (type == "power") {
                        value.v = Math.pow(value.v, number);
                    }
                    else if (type == "root") {
                        if (number == 2) {
                            value.v = numFormat(Math.sqrt(value.v), 4);
                        }
                        else if (number == 3 && Math.cbrt) {
                            value.v = numFormat(Math.cbrt(value.v), 4);
                        }
                        else {
                            value.v = numFormat(jfnqrt(value.v, number), 4);
                        }
                    }
                    else if (type == "log") {
                        value.v = numFormat(Math.log(value.v) * 10000 / Math.log(Math.abs(number)), 4);
                    }
                    else {
                        value.v = value.v + number;
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

    editor.controlHandler(arr, range);

    if (success && typeof success === 'function') {
        success();
    }
}


/**
 * 根据窗口大小自动resize画布
 * 
 * @param {Object} options 可选参数
 * @param {Function} options.success 操作结束的回调函数
 */
export function resize(options = {}){
    luckysheetsizeauto();

    let {
        success
    } = {...options}
    if (success && typeof success === 'function') {
        success();
    }
}
