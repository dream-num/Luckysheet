import { luckysheet_searcharray } from '../controllers/sheetSearch';
import Store from '../store';

let visibledatarow = Store.visibledatarow;
let visibledatacolumn = Store.visibledatacolumn;
let container = Store.container;
let rowHeaderWidth = Store.rowHeaderWidth;
let infobarHeight = Store.infobarHeight;
let toolbarHeight = Store.toolbarHeight;
let calculatebarHeight = Store.calculatebarHeight;
let columeHeaderHeight = Store.columeHeaderHeight;

function rowLocationByIndex(row_index) {
    let row = 0, row_pre = 0;
    row = visibledatarow[row_index];

    if (row_index == 0) {
        row_pre = 0;
    }
    else {
        row_pre = visibledatarow[row_index - 1];
    }

    return [row_pre, row, row_index];
}

function rowLocation(y) {
    let row_index = luckysheet_searcharray(visibledatarow, y);

    if (row_index == -1 && y > 0) {
        row_index = visibledatarow.length - 1;
    }
    else if (row_index == -1 && y <= 0) {
        row_index = 0;
    }
    
    return rowLocationByIndex(row_index);
}

function colLocationByIndex(col_index){
    let col = 0, col_pre = 0;            
    col = visibledatacolumn[col_index];

    if (col_index == 0) {
        col_pre = 0;
    }
    else {
        col_pre = visibledatacolumn[col_index - 1];
    }

    return [col_pre, col, col_index];
}

function colLocation(x) {
    let col_index = luckysheet_searcharray(visibledatacolumn, x);

    if (col_index == -1 && x > 0) {
        col_index = visibledatacolumn.length - 1;
    }
    else if (col_index == -1 && x <= 0) {
        col_index = 0;
    }

    return colLocationByIndex(col_index);
}

function mouseposition(x, y) {
    let container_offset = $("#" + container).offset();
    
    let newX = x - container_offset.left - rowHeaderWidth,
        newY = y - container_offset.top - infobarHeight - toolbarHeight - calculatebarHeight - columeHeaderHeight;

    return [newX, newY];
}

export {
    rowLocationByIndex,
    rowLocation,
    colLocationByIndex,
    colLocation,
    mouseposition,
}