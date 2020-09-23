import browser from './browser';
import formula from './formula';
import { datagridgrowth } from './getdata';
import { jfrefreshgrid, jfrefreshgridall, jfrefreshrange } from './refresh';
import { getSheetIndex } from '../methods/get';
import Store from '../store';

const editor = {
    //worker+blob实现深拷贝替换extend
    deepCopyFlowDataState:false,
    deepCopyFlowDataCache:"",
    deepCopyFlowDataWorker:null,
    deepCopyFlowData:function(flowData){
        let _this = this;

        if(_this.deepCopyFlowDataState){
            if(_this.deepCopyFlowDataWorker != null){
                _this.deepCopyFlowDataWorker.terminate();  
            }
            return _this.deepCopyFlowDataCache;
        }
        else{
            if(flowData == null){
                flowData = Store.flowdata;
            }

            return $.extend(true, [], flowData);
        }
    },
    webWorkerFlowDataCache:function(flowData){
        let _this = this;

        try{
            if(_this.deepCopyFlowDataWorker != null){//存新的webwork前先销毁以前的
                _this.deepCopyFlowDataWorker.terminate();
            }

            let funcTxt = 'data:text/javascript;chartset=US-ASCII,onmessage = function (e) { postMessage(e.data); };';
            _this.deepCopyFlowDataState = false;

            //适配IE
            let worker;
            if(browser.isIE() == 1){
                let response = "self.onmessage=function(e){postMessage(e.data);}";
                worker = new Worker('./plugins/Worker-helper.js');
                worker.postMessage(response);
            }
            else{
                worker = new Worker(funcTxt);
            }

            _this.deepCopyFlowDataWorker = worker;
            worker.postMessage(flowData);
            worker.onmessage = function(e) { 
                _this.deepCopyFlowDataCache = e.data;
                _this.deepCopyFlowDataState = true;
            };
        }
        catch(e){
            _this.deepCopyFlowDataCache = $.extend(true, [], flowData);
        }
    },

    /**
     * @param {Array} dataChe 
     * @param {Object} range 是否指定选区，默认为当前选区
     * @since Add range parameter. Update by siwei@2020-09-10. 
     */
    controlHandler: function (dataChe, range) {
        let _this = this;

        let d = _this.deepCopyFlowData(Store.flowdata);//取数据

        // let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let last = range || Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let curR = last["row"] == null ? 0 : last["row"][0];
        let curC = last["column"] == null ? 0 : last["column"][0];
        let rlen = dataChe.length, clen = dataChe[0].length;

        let addr = curR + rlen - d.length, addc = curC + clen - d[0].length;
        if(addr > 0 || addc > 0){
            d = datagridgrowth([].concat(d), addr, addc, true);
        }

        for (let r = 0; r < rlen; r++) {
            let x = [].concat(d[r + curR]);
            for (let c = 0; c < clen; c++) {
                let value = "";
                if (dataChe[r] != null && dataChe[r][c] != null) {
                    value = dataChe[r][c];
                }
                x[c + curC] = value;
            }
            d[r + curR] = x;
        }

        if (addr > 0 || addc > 0) {
            jfrefreshgridall(d[0].length, d.length, d, null, Store.luckysheet_select_save, "datachangeAll");
        }
        else {
            jfrefreshrange(d, Store.luckysheet_select_save);
        }
    },
    clearRangeByindex: function (st_r, ed_r, st_c, ed_c, sheetIndex) {
        let index = getSheetIndex(sheetIndex);
        let d = $.extend(true, [], Store.luckysheetfile[index]["data"]);
        
        for (let r = st_r; r <= ed_r; r++) {
            let x = [].concat(d[r]);
            for (let c = st_c; c <= ed_c; c++) {
                formula.delFunctionGroup(r, c);
                formula.execFunctionGroup(r, c, "");
                x[c] = null;
            }
            d[r] = x;
        }

        if(sheetIndex == Store.currentSheetIndex){
            let rlen = ed_r - st_r + 1, 
                clen = ed_c - st_c + 1;
            
            if (rlen > 5000) {
                jfrefreshgrid(d, [{ "row": [st_r, ed_r], "column": [st_c, ed_c] }]);
            }
            else {
                jfrefreshrange(d, { "row": [st_r, ed_r], "column": [st_c, ed_c] });
            }
        }
        else{
            Store.luckysheetfile[index]["data"] = d;
        }
    },
    controlHandlerD: function (dataChe) {
        let _this = this;

        let d = _this.deepCopyFlowData(Store.flowdata);//取数据

        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let r1 = last["row"][0], r2 = last["row"][1];
        let c1 = last["column"][0], c2 = last["column"][1];
        let rlen = dataChe.length, clen = dataChe[0].length;

        let addr = r1 + rlen - d.length, addc = c1 + clen - d[0].length;
        if(addr >0 || addc > 0){
            d = datagridgrowth([].concat(d), addr, addc, true);
        }

        for(let r = r1; r <= r2; r++){
            for(let c = c1; c <= c2; c++){
                d[r][c] = null;
            }
        }

        for(let i = 0; i < rlen; i++){
            for(let j = 0; j < clen; j++){
                d[r1 + i][c1 + j] = dataChe[i][j];
            }
        }

        let range = [
            { "row": [r1, r2], "column": [c1, c2] },
            { "row": [r1, r1 + rlen - 1], "column": [c1, c1 + clen - 1] }
        ];

        jfrefreshgrid(d, range);
    }
};

export default editor;