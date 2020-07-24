export function showloading(txt) {
    $("#luckysheet-cell-loading").find("span").text(txt).end().show();
};

export function hideloading() {
    $("#luckysheet-cell-loading").hide();
};