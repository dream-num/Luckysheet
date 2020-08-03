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
        sheettxt = Store.luckysheetfile[getSheetIndex(sheetIndex)].name + "!";
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

export {
    getSheetIndex,
    getRangetxt,
    getluckysheet_select_save,
    getluckysheet_scroll_status,
    getluckysheetfile,
    getconfig,
    getvisibledatarow,
    getvisibledatacolumn,
}