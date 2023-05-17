
// Initialize the export xlsx api
function exportXlsx(options, config, isDemo) {

}

function downloadXlsx(data, filename) {
    const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}

function fetchAndDownloadXlsx(url,success,fail) {
    const luckyJson = luckysheet.toJson();

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(luckyJson)
    })
        .then((response) => response.blob())
        .then((blob) => {
            const filename = luckyJson.title + '.xlsx';
            downloadXlsx(blob, filename);
            success && success()
        })
        .catch((error) => {
            console.error('fetch error:', error);
            fail && fail()
        });
}


export { exportXlsx,downloadXlsx,fetchAndDownloadXlsx }
