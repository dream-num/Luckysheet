import Store from "../store";
import { getObjType } from "../utils/util";
import formula from './formula';
import { getSheetIndex, getluckysheet_select_save } from "../methods/get";
import { isRealNull, valueIsError, isRealNum, isEditMode } from "./validate";
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
import { getdatabyselection } from "./getdata";

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
 * @param {Number} row 单元格所在行数；从0开始的整数，0表示第一行
 * @param {Number} column 单元格所在列数；从0开始的整数，0表示第一列
 * @param {Object | String | Number} value 要设置的值；可以为字符串或数字，或为符合Luckysheet单元格格式的对象
 * @param {Object} options 可选参数
 * @param {Number} options.order 工作表索引；默认值为当前工作表索引
 * @param {Function} options.success 操作结束的回调函数
 */
export function setCellValue(row, column, value, options = {}) {
    if (row == null && column == null) {
        return console.error('Arguments row or column cannot be null or undefined.')
    }
    let curSheetOrder = getSheetIndex(Store.currentSheetIndex);
    let {
        order = curSheetOrder,
        success
    } = {...options}
    let targetSheetData = Store.luckysheetfile[order].data;
    let cell = targetSheetData[row][column];
    let vupdate;

    if (getObjType(value) == 'object') {
        cell = value;

        if (getObjType(value.v) == 'object') {
            vupdate = vaule.v.v;
        } else {
            vupdate = value.v;
        }
    } else {
        vupdate = value;
    }

    if (isRealNull(vupdate)) {
        if (getObjType(cell) == 'object') {
            delete cell.m;
            delete cell.v;
        } else {
            cell = null;
        }
        return;
    }

    if (isRealNull(cell)) {
        cell = {}
    }

    if (vupdate.toString().substring(0, 1) == "'") {
        cell.m = vupdate.toString().substring(1);
        cell.ct = { "fa": "@", "t": "s" };
        cell.v = vupdate.toString().substring(1);
    } else if (vupdate.toString().toUpperCase() === 'TRUE') {
        cell.m = "TRUE";
        cell.ct = { "fa": "General", "t": "b" };
        cell.v = true;
    } else if (vupdate.toString().toUpperCase() === 'FALSE') {
        cell.m = "FALSE";
        cell.ct = { "fa": "General", "t": "b" };
        cell.v = false;
    } else if (valueIsError(vupdate)) {
        cell.m = vupdate.toString();
        cell.ct = { "fa": "General", "t": "e" };
        cell.v = vupdate;
    } else {
        if (cell.f != null && isRealNum(vupdate) && !IDCardReg.test(vupdate)) {
            cell.v = parseFloat(vupdate);
            if (cell.ct == null) {
                cell.ct = {
                    'fa': 'General',
                    't': 'n'
                }
            }

            if (cell.v == Infinity || cell.v == -Infinity) {
                cell.m = cell.v.toString();
            } else {
                if (cell.v.toString().indexOf('e') > -1) {
                    let len = cell.v.toString().split('.')[1].split('e')[0].length;
                    if (len > 5) {
                        len = 5;
                    }

                    cell.m = cell.v.toExponential(len).toString();
                } else {
                    let v_p = Math.round(cell.v * 1000000000) / 1000000000;
                    if (cell.ct == null) {
                        let mask = genarate(v_p);
                        cell.m = mask[0].toString();
                    } else {
                        let mask = update(cell.ct.fa, v_p);
                        cell.m = mask.toString();
                    }
                }
            }
        } else if (cell.ct != null && cell.ct.fa == '@') {
            cell.m = vupdate.toString();
            cell.v = vupdate;
        } else if (cell.ct != null && cell.ct.fa != null && cell.ct.fa != 'General') {
            if (isRealNum(vupdate)) {
                vupdate = parseFloat(vupdate);
            }

            let mask = update(cell.ct.fa, vupdate);

            if (mask === vupdate) {// 若原来单元格格式 应用不了 要更新的值，则获取更新值的 格式
                mask = genarate(vupdate);

                cell.m = mask[0].toString();
                cell.ct = mask[1];
                cell.v = mask[2];
            } else {
                cell.m = mask.toString();
                cell.v = vupdate;
            }
        } else {
            if (isRealNum(vupdate) && !IDCardReg.test(vupdate)) {
                vupdate = parseFloat(vupdate);
                cell.v = parseFloat(vupdate);
                cell.ct = {
                    'fa': 'General',
                    't': 'n'
                }
                if (cell.v == Infinity || cell.v == -Infinity) {
                    cell.m = cell.v.toString();
                } else {
                    let mask = genarate(cell.v);
                    cell.m = mask[0].toString();
                }
            } else {
                let mask = genarate(vupdate);
                cell.m = mask[0].toString();
                cell.ct = mask[1];
                cell.v = mask[2];
            }
        }
    }
    if (!server.allowUpdate && !luckysheetConfigsetting.pointEdit) {
        if (cell.ct != null && !/^(w|W)((0?)|(0\.0+))$/.test(cell.ct.fa) && cell.ct.t == 'n' && cell.v != null && parseInt(cell.v).toString().length > 4) {
            let autoFormatw = luckysheetConfigsetting.autoFormatw.toString().toUpperCase();
            let accuracy = luckysheetConfigsetting.accuracy;
            let sfmt = setAccuracy(autoFormatw, accuracy);

            if (sfmt != 'General') {
                cell.ct.fa = sfmt;
                cell.m = update(sfmt, cell.v);
            }
        }
    }
    // refresh
    jfrefreshgrid(targetSheetData, {
        row: [row],
        column: [column]
    })

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
