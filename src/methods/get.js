import { chatatABC } from '../utils/util';
import Store from '../store';

function getSheetIndex(index) {
    for (let i = 0; i < Store.luckysheetfile.length; i++) {
        if (Store.luckysheetfile[i]["index"] == index) {
            return i;
        }
    }

    return null;
}

function getRangetxt(sheetIndex, range, currentIndex) {
    let sheettxt = "";

    if (currentIndex == null) {
        currentIndex = Store.currentSheetIndex;
    }

    if (sheetIndex != currentIndex) {
        //sheet名字包含'的，引用时应该替换为''
        sheettxt = Store.luckysheetfile[getSheetIndex(sheetIndex)].name.replace(/'/g,"''");
        //如果包含除a-z、A-Z、0-9、下划线等以外的字符那么就用单引号包起来
        if(/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/.test(sheettxt))
        {
            sheettxt = sheettxt+"!";
        }
        else
        {
            sheettxt="'"+sheettxt+"'!";
        }
    }

    let row0 = range["row"][0], row1 = range["row"][1];
    let column0 = range["column"][0], column1 = range["column"][1];

    if (row0 == null && row1 == null) {
        return sheettxt + chatatABC(column0) + ":" + chatatABC(column1);
    }
    else if (column0 == null && column1 == null) {
        return sheettxt + (row0 + 1) + ":" + (row1 + 1);
    }
    else {
        if (column0 == column1 && row0 == row1) {
            return sheettxt + chatatABC(column0) + (row0 + 1);
        }
        else {
            return sheettxt + chatatABC(column0) + (row0 + 1) + ":" + chatatABC(column1) + (row1 + 1);
        }
    }
}

function getluckysheet_select_save() {
    return Store.luckysheet_select_save;
}

function getluckysheet_scroll_status() {
    return Store.luckysheet_scroll_status;
}

function getluckysheetfile(plugin) {
    // 获取图表数据
    if(plugin){
        Store.luckysheetfile.forEach(file => {
            if(!!file.chart){
                file.chart.forEach((chartObj)=>{
                    const chartJson = Store.getChartJson(chartObj.chart_id);
                    chartObj.chartOptions = chartJson;
                })
            }
        });
    }
    
    return Store.luckysheetfile;
}

function getconfig() {
    return Store.config;
}

function getvisibledatarow() {
    return Store.visibledatarow;
}

function getvisibledatacolumn() {
    return Store.visibledatacolumn;
}

function getConditionFormatCells() {
    return Store.conditionFormatCells;
}

export {
    getSheetIndex,
    getRangetxt,
    getluckysheet_select_save,
    getluckysheet_scroll_status,
    getluckysheetfile,
    getconfig,
    getvisibledatarow,
    getvisibledatacolumn,
    getConditionFormatCells,
}
