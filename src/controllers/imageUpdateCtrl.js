// 自定义图片的更新方法例如: customImageUpdate("POST", "http://127.0.0.1:8000/luckysheetimageprocess/", d)
function customImageUpdate(method, url, obj) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest() || new ActiveXObject("Microsoft.XMLHTTP");
        xhr.open(method, url);
        xhr.send(JSON.stringify(obj)); // 发送 POST/GET 数据
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(xhr.responseText);
                } else {
                    reject("error");
                }
            }
        };
    });
}

export {
    customImageUpdate
}