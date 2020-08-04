import { replaceHtml } from '../utils/util';
import { modelHTML } from './constant';
import { selectHightlightShow } from './select';
import tooltip from '../global/tooltip';
import editor from '../global/editor';
import { setcellvalue } from '../global/setdata';
import { getcellvalue } from '../global/getdata';
import { jfrefreshgrid } from '../global/refresh';
import Store from '../store';
import locale from '../locale/locale';

//分列
const luckysheetSplitColumn = {
    createDialog: function(){
        let _this = this;

        const _locale = locale();
        const locale_splitText = _locale.splitText;
        const locale_punctuation = _locale.punctuation;
        const locale_button = _locale.button;

        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-splitColumn-dialog").remove();

        let content = '<div class="box">' +
                        '<div class="boxTitle">'+locale_splitText.splitDelimiters+'</div>' +
                        '<div class="boxMain">' +
                            '<div style="height: 22px;line-height: 22px;">' +
                                '<input id="splitColumn_type_01" type="checkbox"/>' +
                                '<label for="splitColumn_type_01">'+ locale_punctuation.tab +'</label>' +
                            '</div>' +
                            '<div style="height: 22px;line-height: 22px;">' +
                                '<input id="splitColumn_type_02" type="checkbox"/>' +
                                '<label for="splitColumn_type_02">'+ locale_punctuation.semicolon +'</label>' +
                            '</div>' +
                            '<div style="height: 22px;line-height: 22px;">' +
                                '<input id="splitColumn_type_03" type="checkbox"/>' +
                                '<label for="splitColumn_type_03">'+ locale_punctuation.comma +'</label>' +
                            '</div>' +
                            '<div style="height: 22px;line-height: 22px;">' +
                                '<input id="splitColumn_type_04" type="checkbox"/>' +
                                '<label for="splitColumn_type_04">'+ locale_punctuation.space +'</label>' +
                            '</div>' +
                            '<div style="height: 22px;line-height: 22px;">' +
                                '<input id="splitColumn_type_05" type="checkbox"/>' +
                                '<label for="splitColumn_type_05">'+ locale_splitText.splitOther +'</label>' +
                                '<input type="text" class="formulaInputFocus" maxlength="1"/>' +
                            '</div>' +
                        '</div>' +
                        '<div style="height: 22px;line-height: 22px;">' +
                            '<input id="splitColumn_type_06" type="checkbox"/>' +
                            '<label for="splitColumn_type_06">'+ locale_splitText.splitContinueSymbol +'</label>' +
                        '</div>' +
                        '<div class="boxTitle" style="margin-top: 10px;">'+ locale_splitText.splitDataPreview +'</div>' +
                        '<div class="boxMain" id="splitColumnData">' +

                        '</div>' +
                      '</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-splitColumn-dialog", 
            "addclass": "luckysheet-splitColumn-dialog", 
            "title": locale_splitText.splitTextTitle, 
            "content": content, 
            "botton": '<button id="luckysheet-splitColumn-dialog-confirm" class="btn btn-primary">'+ locale_button.confirm +'</button><button class="btn btn-default luckysheet-model-close-btn">'+ locale_button.cancel +'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-splitColumn-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 400).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-splitColumn-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();

        let dataArr = _this.getDataArr();
        _this.dataPreview(dataArr);
    },
    init: function(){
        let _this = this;
        const _locale = locale();
        const locale_splitText = _locale.splitText;

        //数据预览
        $(document).off("change.SPCinpcheckbox").on("change.SPCcheckbox", "#luckysheet-splitColumn-dialog .box input[type='checkbox']", function(){
            let regStr = _this.getRegStr();
            let dataArr = _this.getDataArr(regStr);
            _this.dataPreview(dataArr);
        });
        $(document).off("keyup.SPCinptext").on("keyup.SPCinptext", "#luckysheet-splitColumn-dialog .box input[type='text']", function(){
            if($(this).siblings("input[type='checkbox']").is(":checked")){
                let regStr = _this.getRegStr();
                let dataArr = _this.getDataArr(regStr);
                _this.dataPreview(dataArr);
            }
        })

        //确定按钮
        $(document).off("click.SPCconfirm").on("click.SPCconfirm", "#luckysheet-splitColumn-dialog #luckysheet-splitColumn-dialog-confirm", function(){
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-splitColumn-dialog").hide();

            let regStr = _this.getRegStr();
            let dataArr = _this.getDataArr(regStr);

            let r = Store.luckysheet_select_save[0].row[0];
            let c = Store.luckysheet_select_save[0].column[0];

            if(dataArr[0].length == 1){
                return;
            }

            let dataCover = false;
            for(let i = 0; i < dataArr.length; i++){
                for(let j = 1; j < dataArr[0].length; j++){
                    let cell = Store.flowdata[r + i][c + j];

                    if(cell != null && cell.v != null){
                        dataCover = true;
                        break;
                    }
                }
            }

            if(dataCover){
                let func1 = function(){
                    _this.update(r, c, dataArr);
                } 

                tooltip.confirm("", locale_splitText.splitConfirmToExe, func1);
            }
            else{
                _this.update(r, c, dataArr);
            }
        });
    },
    update: function(r, c, dataArr){
        let d = editor.deepCopyFlowData(Store.flowdata);

        for(let i = 0; i < dataArr.length; i++){
            for(let j = 0; j < dataArr[0].length; j++){
                let v = dataArr[i][j];
                setcellvalue(r + i, c + j, d, v);
            }
        }

        let st_r = Store.luckysheet_select_save[0].row[0], 
            st_c = Store.luckysheet_select_save[0].column[0];

        let range = [{ "row": [st_r, st_r + dataArr.length - 1], "column": [st_c, st_c + dataArr[0].length - 1] }]

        jfrefreshgrid(d, range);
        selectHightlightShow();
    },
    dataPreview: function(dataArr){
        $("#luckysheet-splitColumn-dialog #splitColumnData").empty();

        let trHtml = '';

        for(let i = 0; i < dataArr.length; i++){
            let tdHtml = '';

            for(let j = 0; j < dataArr[0].length; j++){
                tdHtml += '<td>' + dataArr[i][j] + '</td>';
            }

            trHtml += '<tr>' + tdHtml + '</tr>';
        }

        let tableHtml = '<table>' + trHtml + '</table>';

        $("#luckysheet-splitColumn-dialog #splitColumnData").append(tableHtml);
    },
    getRegStr: function(){
        let regStr = '', mark = 0;

        $("#luckysheet-splitColumn-dialog .box input[type='checkbox']:checked").each(function(i, e){
            let $id = $(e).attr("id");

            if($id == "splitColumn_type_01"){ //Tab键
                regStr += "\\t";
                mark++;
            }
            else if($id == "splitColumn_type_02"){ //分号
                if(mark > 0){
                    regStr += "|";
                }

                regStr += ";";
                mark++;
            }
            else if($id == "splitColumn_type_03"){ //逗号
                if(mark > 0){
                    regStr += "|";
                }

                regStr += ",";
                mark++;
            }
            else if($id == "splitColumn_type_04"){ //空格
                if(mark > 0){
                    regStr += "|";
                }

                regStr += "\\s";
                mark++;
            }
            else if($id == "splitColumn_type_05"){ //其它
                let txt = $(e).siblings("input[type='text']").val().trim();

                if(txt != ""){
                    if(mark > 0){
                        regStr += "|";
                    }

                    regStr += txt;
                }
            }
            else if($id == "splitColumn_type_06"){ //连续分隔符号视为单个处理
                regStr = "[" + regStr + "]+";
            }
        })

        return regStr;
    },
    getDataArr: function(regStr){
        let _this = this;

        let arr = [];

        let r1 = Store.luckysheet_select_save[0].row[0];
        let r2 = Store.luckysheet_select_save[0].row[1];
        let c = Store.luckysheet_select_save[0].column[0];

        if(regStr != null && regStr != ""){
            let reg = new RegExp(regStr, "g");

            let dataArr = [];

            for(let r = r1; r <= r2; r++){
                let rowArr = [];

                let cell = Store.flowdata[r][c];

                let value;
                if(cell != null && cell["m"] != null){
                    value = cell["m"];
                }
                else{
                    value = getcellvalue(r, c, Store.flowdata);
                }

                if(value == null){
                    value = "";
                }

                rowArr = value.toString().split(reg);

                dataArr.push(rowArr);
            }

            let rlen = dataArr.length;
            let clen = 0;

            for(let i = 0; i < rlen; i++){
                if(dataArr[i].length > clen){
                    clen = dataArr[i].length;
                }
            }

            arr = _this.getNullData(rlen, clen);

            for(let i = 0; i < arr.length; i++){
                for(let j = 0; j < arr[0].length; j++){
                    if(dataArr[i][j] != null){
                        arr[i][j] = dataArr[i][j];
                    }
                }
            }
        }
        else{
            for(let r = r1; r <= r2; r++){
                let rowArr = [];

                let cell = Store.flowdata[r][c];

                let value;
                if(cell != null && cell["m"] != null){
                    value = cell["m"];
                }
                else{
                    value = getcellvalue(r, c, Store.flowdata);
                }

                if(value == null){
                    value = "";
                }

                rowArr.push(value);

                arr.push(rowArr);
            }
        }

        return arr;
    },
    getNullData: function(rlen, clen){
        let arr = [];

        for(let r = 0; r < rlen; r++){
            let rowArr = [];

            for(let c = 0; c < clen; c++){
                rowArr.push("");
            }

            arr.push(rowArr);
        }

        return arr;
    }
}

export default luckysheetSplitColumn;