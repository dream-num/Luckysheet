import server from '../controllers/server';
import { luckysheetlodingHTML, luckyColor } from '../controllers/constant';
import sheetmanage from '../controllers/sheetmanage';
import luckysheetFreezen from '../controllers/freezen';
import { getSheetIndex } from '../methods/get';
import { luckysheetextendData } from './extend';
import editor from './editor';
import luckysheetcreatesheet from './createsheet';
import Store from '../store';

const method = {
    //翻页
    addDataAjax: function(param, index, url, func){
        let _this = this;

        if(index == null){
            index = Store.currentSheetIndex;
        }

        if(url == null){
            url = server.loadSheetUrl;
        }

        $("#luckysheet-grid-window-1").append(luckysheetlodingHTML());
        param.currentPage++;
        
        let dataType = 'application/json;charset=UTF-8';
        let token = sessionStorage.getItem('x-auth-token');

        $.ajax({
            method: 'POST',
            url: url,
            headers: { "x-auth-token": token },
            data: JSON.stringify(param),
            contentType: dataType,
            success: function(d) {
                //d可能为json字符串
                if(typeof d == "string"){
                    d = JSON.parse(d);
                }

                let dataset = d.data;
                
                // rptapp
                let newData = dataset.celldata;
                luckysheetextendData(dataset["row"], newData);

                setTimeout(function(){
                    $("#luckysheetloadingdata").fadeOut().remove();
                }, 500);

                if(func && typeof(func)=="function"){ 
                    func(dataset);
                }
            }
        })
    },
    //重载
    reload: function(param, index, url, func){
        let _this = this;

        if(index == null){
            index = Store.currentSheetIndex;
        }

        if(url == null){
            url = server.loadSheetUrl;
        }

        $("#luckysheet-grid-window-1").append(luckysheetlodingHTML());

        let arg = {"gridKey" : server.gridKey, "index": index};
        param = $.extend(true, param, arg);
        let file = Store.luckysheetfile[getSheetIndex(index)];

        $.post(url, param, function (d) {
            let dataset = eval("(" + d + ")");
            file.celldata = dataset[index.toString()];
            let data = sheetmanage.buildGridData(file);

            setTimeout(function(){
                $("#luckysheetloadingdata").fadeOut().remove();
            }, 500);

            file["data"] = data;
            Store.flowdata = data;
            editor.webWorkerFlowDataCache(data);//worker存数据

            luckysheetcreatesheet(data[0].length, data.length, data, null, false);
            file["load"] = "1";

            Store.luckysheet_select_save = [];
            Store.luckysheet_selection_range = [];

            server.saveParam("shs", null, Store.currentSheetIndex);

            sheetmanage.changeSheet(index);

            if(func && typeof(func)=="function"){ 
                func();
            }
        });
    },
    clearSheetByIndex: function(i){
        let index = getSheetIndex(i);
        let sheetfile = Store.luckysheetfile[index];

        if(!sheetfile.isPivotTable){
            sheetfile.data = [];
            sheetfile.row = Store.defaultrowNum;
            sheetfile.column = Store.defaultcolumnNum;

            sheetfile.chart = [];
            sheetfile.config = null;
            sheetfile.filter = null;
            sheetfile.filter_select = null;
            sheetfile.celldata = [];
            sheetfile.pivotTable = {};
            sheetfile.calcChain = [];
            sheetfile.status = 0;
            sheetfile.load = 0;

            Store.flowdata = [];
            editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据

            $("#"+ Store.container +" .luckysheet-data-visualization-chart").remove();
            $("#"+ Store.container +" .luckysheet-datavisual-selection-set").remove();

            $("#luckysheet-row-count-show, #luckysheet-formula-functionrange-select, #luckysheet-row-count-show, #luckysheet-column-count-show, #luckysheet-change-size-line, #luckysheet-cell-selected-focus, #luckysheet-selection-copy, #luckysheet-cell-selected-extend, #luckysheet-cell-selected-move, #luckysheet-cell-selected").hide();

            delete sheetfile.load;
        }
        else {
            delete Store.luckysheetfile[index];
        }
    },
    clear: function(index){
        let _this = this;

        if(index == "all"){
            for(let i = 0; i < Store.luckysheetfile.length; i++){
                let sheetfile = Store.luckysheetfile[i];
                _this.clearSheetByIndex(sheetfile.index);
            }
            
        }
        else{
            if(index == null){
                index = Store.currentSheetIndex;
            }
            _this.clearSheetByIndex(index);
        }

        sheetmanage.changeSheet(Store.luckysheetfile[0].index);
    },
    destroy:function(){
        $("#" + Store.container).empty();
        $("body > .luckysheet-cols-menu").remove();

        $("#luckysheet-modal-dialog-mask, #luckysheetTextSizeTest, #luckysheet-icon-morebtn-div").remove();
        $("#luckysheet-input-box").parent().remove();
        $("#luckysheet-formula-help-c").remove();
        $(".chartSetting").remove();

        //document event release
        $(document).off(".luckysheetEvent");
        
        //参数重置
        Store.jfredo = [];
        Store.jfundo = [];

        luckysheetFreezen.initialHorizontal = true;
        luckysheetFreezen.initialVertical = true;
    },
    editorChart:function(c){
        let chart_selection_color = luckyColor[0];
        let chart_id = "luckysheetEditMode-datav-chart";
        let chart_selection_id = chart_id + "_selection";
        c.chart_id = chart_id;
        let chartTheme = c.chartTheme;
        chartTheme = chartTheme == null ? "default0000" : chartTheme;

        luckysheet.insertChartTosheet(c.sheetIndex, c.dataSheetIndex, c.option, c.chartType, c.selfOption, c.defaultOption, c.row, c.column, chart_selection_color, chart_id, chart_selection_id, c.chartStyle, c.rangeConfigCheck, c.rangeRowCheck, c.rangeColCheck, c.chartMarkConfig, c.chartTitleConfig, c.winWidth, c.winHeight, c.scrollLeft, c.scrollTop, chartTheme, c.myWidth, c.myHeight, c.myLeft!=null?parseFloat(c.myLeft):null, c.myTop!=null?parseFloat(c.myTop):null, c.myindexrank, true);

        $("#"+chart_id).find(".luckysheet-modal-controll-update").click();
    }
}

export default method;