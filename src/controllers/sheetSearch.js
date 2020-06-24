function luckysheetbinary_search(arr, key) {
    let low = 0, high = arr.length - 1;
    
    while (low <= high) {
        let mid = parseInt((high + low) / 2);
        
        if (key < arr[mid] && (mid == 0 || key >= arr[mid - 1])) {
            return mid;
        } 
        else if (key >= arr[mid]) {
            low = mid + 1;
        } 
        else if (key < arr[mid]) {
            high = mid - 1;
        }
        else {
            return -1;
        }
    }
}

function luckysheetorder_search(arr, y) {
    let i = 0, 
        row = 0, 
        row_pre = 0, 
        row_index = -1, 
        i_ed = arr.length - 1;

    while (i < arr.length && i_ed >= 0 && i_ed >= i) {
        row = arr[i_ed];

        if (i_ed == 0) {
            row_pre = 0;
        }
        else {
            row_pre = arr[i_ed - 1];
        }

        if (y >= row_pre && y < row) {
            row_index = i_ed;
            break;
        }

        row = arr[i];

        if (i == 0) {
            row_pre = 0;
        }
        else {
            row_pre = arr[i - 1];
        }

        if (y >= row_pre && y < row) {
            row_index = i;
            break;
        }

        i++;
        i_ed--;
    }

    return row_index;
}

function luckysheet_searcharray(arr, y) {
    let index = arr.length - 1;

    if (arr.length < 40 || y <= arr[20] || y >= arr[index - 20]) {
        index = luckysheetorder_search(arr, y);
    }
    else {
        index = luckysheetbinary_search(arr, y);
    }

    return index;
}

export {
    luckysheet_searcharray,
}