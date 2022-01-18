import { luckysheet_searcharray } from '../controllers/sheetSearch';
import Store from '../store';

function rowLocationByIndex(row_index) {
    let row = 0, row_pre = 0;
    row = Store.visibledatarow[row_index];

    if (row_index == 0) {
        row_pre = 0;
    }
    else {
        row_pre = Store.visibledatarow[row_index - 1];
    }

    return [row_pre, row, row_index];
}

function rowLocation(y) {
    let row_index = luckysheet_searcharray(Store.visibledatarow, y);

    if (row_index == -1 && y > 0) {
        row_index = Store.visibledatarow.length - 1;
    }
    else if (row_index == -1 && y <= 0) {
        row_index = 0;
    }

    return rowLocationByIndex(row_index);
}

function colLocationByIndex(col_index){
    let col = 0, col_pre = 0;
    col = Store.visibledatacolumn[col_index];

    if (col_index == 0) {
        col_pre = 0;
    }
    else {
        col_pre = Store.visibledatacolumn[col_index - 1];
    }

    return [col_pre, col, col_index];
}

function colSpanLocationByIndex(col_index, span){
    let col = 0, col_pre = 0;
    col = Store.visibledatacolumn[col_index + span - 1];

    if (col_index == 0) {
        col_pre = 0;
    }
    else {
        col_pre = Store.visibledatacolumn[col_index - 1];
    }

    return [col_pre, col, col_index];
}

function colLocation(x) {
    let col_index = luckysheet_searcharray(Store.visibledatacolumn, x);

    if (col_index == -1 && x > 0) {
        col_index = Store.visibledatacolumn.length - 1;
    }
    else if (col_index == -1 && x <= 0) {
        col_index = 0;
    }

    return colLocationByIndex(col_index);
}

function mouseposition(x, y) {
    let container_offset = $("#" + Store.container).offset();

    let newX = x - container_offset.left - Store.rowHeaderWidth,
        newY = y - container_offset.top - Store.infobarHeight - Store.toolbarHeight - Store.calculatebarHeight - Store.columnHeaderHeight;

    return [newX, newY];
}

export {
    rowLocationByIndex,
    rowLocation,
    colLocationByIndex,
    colSpanLocationByIndex,
    colLocation,
    mouseposition,
}
