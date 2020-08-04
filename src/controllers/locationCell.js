import { replaceHtml } from '../utils/util';
import { getSheetIndex } from '../methods/get';
import { isRealNull } from '../global/validate';
import { isEditMode } from '../global/validate';
import tooltip from '../global/tooltip';
import { modelHTML } from './constant';
import { selectHightlightShow } from './select';
import conditionformat from './conditionformat';
import Store from '../store';
import locale from '../locale/locale';

//定位
const luckysheetLocationCell = {
    createDialog: function(){
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-locationCell-dialog").remove();

        const _locale = locale();
        const locale_location = _locale.findAndReplace;
        const locale_button = _locale.button;

        let content = '<div class="listbox">'+
                        '<div class="listItem">'+
                            '<input type="radio" name="locationType" checked="checked" id="locationConstant">'+
                            '<label for="locationConstant">'+locale_location.locationConstant+'</label>'+
                            '<div class="subbox">'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="date" id="locationConstantDate">'+
                                    '<label for="locationConstantDate">'+locale_location.locationDate+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="number" id="locationConstantNumber">'+
                                    '<label for="locationConstantNumber">'+locale_location.locationDigital+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="string" id="locationConstantString">'+
                                    '<label for="locationConstantString">'+locale_location.locationString+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="boolean" id="locationConstantBoolean">'+
                                    '<label for="locationConstantBoolean">'+locale_location.locationBool+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="error" id="locationConstantError">'+
                                    '<label for="locationConstantError">'+locale_location.locationBool+'</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="listItem">'+
                            '<input type="radio" name="locationType" id="locationFormula">'+
                            '<label for="locationFormula">'+locale_location.locationFormula+'</label>'+
                            '<div class="subbox">'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="date" id="locationFormulaDate" disabled="true">'+
                                    '<label for="locationFormulaDate" style="color: #666">'+locale_location.locationDate+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="number" id="locationFormulaNumber" disabled="true">'+
                                    '<label for="locationFormulaNumber" style="color: #666">'+locale_location.locationDigital+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="string" id="locationFormulaString" disabled="true">'+
                                    '<label for="locationFormulaString" style="color: #666">'+locale_location.locationString+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="boolean" id="locationFormulaBoolean" disabled="true">'+
                                    '<label for="locationFormulaBoolean" style="color: #666">'+locale_location.locationBool+'</label>'+
                                '</div>'+
                                '<div class="subItem">'+
                                    '<input type="checkbox" checked="checked" class="error" id="locationFormulaError" disabled="true">'+
                                    '<label for="locationFormulaError" style="color: #666">'+locale_location.locationError+'</label>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="listItem">'+
                            '<input type="radio" name="locationType" id="locationNull">'+
                            '<label for="locationNull">'+locale_location.locationNull+'</label>'+
                        '</div>'+
                        '<div class="listItem">'+
                            '<input type="radio" name="locationType" id="locationCF">'+
                            '<label for="locationCF">'+locale_location.locationCondition+'</label>'+
                        '</div>'+
                        '<div class="listItem">'+
                            '<input type="radio" name="locationType" id="locationStepRow">'+
                            '<label for="locationStepRow">'+locale_location.locationRowSpan+'</label>'+
                        '</div>'+
                        '<div class="listItem">'+
                            '<input type="radio" name="locationType" id="locationStepColumn">'+
                            '<label for="locationStepColumn">'+locale_location.locationColumnSpan+'</label>'+
                        '</div>'+
                      '</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-locationCell-dialog", 
            "addclass": "luckysheet-locationCell-dialog", 
            "title": locale_location.location, 
            "content": content, 
            "botton": '<button id="luckysheet-locationCell-dialog-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button class="btn btn-default luckysheet-model-close-btn">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-locationCell-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 400).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-locationCell-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
    },
    init: function(){
        let _this = this;

        const locale_location = locale().findAndReplace;

        $(document).on("click", "#luckysheet-locationCell-dialog .listItem input:radio", function(e){
            $("#luckysheet-locationCell-dialog .listItem input:checkbox").prop("disabled", true);
            $("#luckysheet-locationCell-dialog .listItem .subbox label").css("color", "#666");

            $(this).siblings(".subbox").find("input:checkbox").removeAttr("disabled");
            $(this).siblings(".subbox").find("label").css("color", "#000");
        });

        $(document).off("click.locationCellConfirm").on("click.locationCellConfirm", "#luckysheet-locationCell-dialog #luckysheet-locationCell-dialog-confirm", function(){
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-locationCell-dialog").hide();

            let $radio = $("#luckysheet-locationCell-dialog .listItem input:radio:checked");
            let id = $radio.attr("id");

            if(id == "locationConstant" || id == "locationFormula"){
                let $checkbox = $radio.siblings(".subbox").find("input:checkbox:checked");

                let value;
                if($checkbox.length == 0){
                    return;
                }
                else if($checkbox.length == 5){
                    value = "all";
                }
                else{
                    let arr = [];
                    
                    for(let i = 0; i < $checkbox.length; i++){
                        if($($checkbox[i]).hasClass("date")){
                            arr.push("d");
                        }
                        else if($($checkbox[i]).hasClass("number")){
                            arr.push("n");
                        }
                        else if($($checkbox[i]).hasClass("string")){
                            arr.push("s,g");
                        }
                        else if($($checkbox[i]).hasClass("boolean")){
                            arr.push("b");
                        }
                        else if($($checkbox[i]).hasClass("error")){
                            arr.push("e");
                        }
                    }

                    value = arr.join(",");
                }

                let range;
                if(Store.luckysheet_select_save.length == 0 || (Store.luckysheet_select_save.length == 1 && Store.luckysheet_select_save[0].row[0] == Store.luckysheet_select_save[0].row[1] && Store.luckysheet_select_save[0].column[0] == Store.luckysheet_select_save[0].column[1])){
                    //单个单元格
                    range = [{"row": [0, Store.flowdata.length - 1], "column": [0, Store.flowdata[0].length - 1]}];
                }
                else{
                    range = $.extend(true, [], Store.luckysheet_select_save);
                }

                _this.apply(range, id, value);
            }
            else if(id == "locationStepRow"){
                if(Store.luckysheet_select_save.length == 0 || (Store.luckysheet_select_save.length == 1 && Store.luckysheet_select_save[0].row[0] == Store.luckysheet_select_save[0].row[1])){
                    if(isEditMode()){
                        alert(locale_location.locationTiplessTwoRow);
                    }
                    else{
                        tooltip.info("", locale_location.locationTiplessTwoRow); 
                    }
                    return;                            
                }

                let range = $.extend(true, [], Store.luckysheet_select_save);

                _this.apply(range, "locationStepRow");
            }
            else if(id == "locationStepColumn"){
                if(Store.luckysheet_select_save.length == 0 || (Store.luckysheet_select_save.length == 1 && Store.luckysheet_select_save[0].column[0] == Store.luckysheet_select_save[0].column[1])){
                    if(isEditMode()){
                        alert(locale_location.locationTiplessTwoColumn);
                    }
                    else{
                        tooltip.info("", locale_location.locationTiplessTwoColumn);    
                    }
                    return;                            
                }

                let range = $.extend(true, [], Store.luckysheet_select_save);

                _this.apply(range, "locationStepColumn");
            }
            else{
                let range;
                if(Store.luckysheet_select_save.length == 0 || (Store.luckysheet_select_save.length == 1 && Store.luckysheet_select_save[0].row[0] == Store.luckysheet_select_save[0].row[1] && Store.luckysheet_select_save[0].column[0] == Store.luckysheet_select_save[0].column[1])){
                    //单个单元格
                    range = [{"row": [0, Store.flowdata.length - 1], "column": [0, Store.flowdata[0].length - 1]}];
                }
                else{
                    range = $.extend(true, [], Store.luckysheet_select_save);
                }

                _this.apply(range, id);
            }
        });
    },
    apply: function(range, type, value){
        const locale_location = locale().findAndReplace; 
        let rangeArr = [];

        if(type == "locationFormula" || type == "locationConstant" || type == "locationNull"){ //公式 常量 空值
            let minR = null, maxR = null, minC = null, maxC = null, cellSave = {};

            for(let s = 0; s < range.length; s++){
                let st_r = range[s].row[0],
                    ed_r = range[s].row[1],
                    st_c = range[s].column[0],
                    ed_c = range[s].column[1];

                if(minR == null || minR < st_r){
                    minR = st_r;
                }
                if(maxR == null || maxR > ed_r){
                    maxR = ed_r;
                }
                if(minC == null || minC < st_c){
                    minC = st_c;
                }
                if(maxC == null || maxC > ed_c){
                    maxC = ed_c;
                }

                for(let r = st_r; r <= ed_r; r++){
                    for(let c = st_c; c <= ed_c; c++){
                        let cell = Store.flowdata[r][c];

                        if(cell != null && cell.mc != null){
                            cell = Store.flowdata[cell.mc.r][cell.mc.c];
                        }

                        if(type == 'locationFormula' && cell != null && !isRealNull(cell.v) && cell.f != null && (value == 'all' || (cell.ct != null && value.indexOf(cell.ct.t) > -1))){
                            cellSave[r + '_' + c] = 0;
                        }
                        else if(type == 'locationConstant' && cell != null && !isRealNull(cell.v) && (value == 'all' || (cell.ct != null && value.indexOf(cell.ct.t) > -1))){
                            cellSave[r + '_' + c] = 0;
                        }
                        else if(type == 'locationNull' && (cell == null || isRealNull(cell.v))){
                            cellSave[r + '_' + c] = 0;
                        }
                    }
                }
            }

            rangeArr = this.getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr);
        }
        else if(type == "locationCF"){ //条件格式
            let index = getSheetIndex(Store.currentSheetIndex);
            let ruleArr = Store.luckysheetfile[index]["luckysheet_conditionformat_save"];
            let data = Store.luckysheetfile[index]["data"];

            if(ruleArr == null || ruleArr.length == 0){
                if(isEditMode()){
                    alert(locale_location.locationTipNotFindCell);
                }
                else{
                    tooltip.info("", locale_location.locationTipNotFindCell);
                }

                return;
            }

            computeMap = conditionformat.compute(ruleArr, data);

            if(Object.keys(computeMap).length == 0){
                if(isEditMode()){
                    alert(locale_location.locationTipNotFindCell);
                }
                else{
                    tooltip.info("", locale_location.locationTipNotFindCell);
                }

                return;
            }

            let minR = null, maxR = null, minC = null, maxC = null, cellSave = {};

            for(let s = 0; s < range.length; s++){
                let st_r = range[s].row[0],
                    ed_r = range[s].row[1],
                    st_c = range[s].column[0],
                    ed_c = range[s].column[1];

                if(minR == null || minR < st_r){
                    minR = st_r;
                }
                if(maxR == null || maxR > ed_r){
                    maxR = ed_r;
                }
                if(minC == null || minC < st_c){
                    minC = st_c;
                }
                if(maxC == null || maxC > ed_c){
                    maxC = ed_c;
                }

                for(let r = st_r; r <= ed_r; r++){
                    for(let c = st_c; c <= ed_c; c++){
                        if((r + '_' + c) in computeMap){
                            cellSave[r + '_' + c] = 0;
                        }
                    }
                }
            }

            rangeArr = this.getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr);
        }
        else if(type == "locationStepRow"){ //间隔行
            for(let s = 0; s < range.length; s++){
                if(range[s].row[0] == range[s].row[1]){
                    continue;
                }

                let st_r = range[s].row[0], ed_r = range[s].row[1];
                let st_c = range[s].column[0], ed_c = range[s].column[1];

                for(let r = st_r; r <= ed_r; r++){
                    if((r - st_r) % 2 == 0){
                        rangeArr.push({"row": [r, r], "column": [st_c, ed_c]});
                    }
                }
            }
        }
        else if(type == "locationStepColumn"){ //间隔列
            for(let s = 0; s < range.length; s++){
                if(range[s].column[0] == range[s].column[1]){
                    continue;
                }

                let st_r = range[s].row[0], ed_r = range[s].row[1];
                let st_c = range[s].column[0], ed_c = range[s].column[1];

                for(let c = st_c; c <= ed_c; c++){
                    if((c - st_c) % 2 == 0){
                        rangeArr.push({"row": [st_r, ed_r], "column": [c, c]});
                    }
                }
            }
        }

        if(rangeArr.length == 0){
            if(isEditMode()){
                alert(locale_location.locationTipNotFindCell);
            }
            else{
                tooltip.info("", locale_location.locationTipNotFindCell);  
            }
        }
        else{
            Store.luckysheet_select_save = rangeArr;
            selectHightlightShow(); 

            let scrollLeft = $("#luckysheet-cell-main").scrollLeft(), 
                scrollTop = $("#luckysheet-cell-main").scrollTop();
            let winH = $("#luckysheet-cell-main").height(), 
                winW = $("#luckysheet-cell-main").width();

            let r1 = Store.luckysheet_select_save[0]["row"][0],
                r2 = Store.luckysheet_select_save[0]["row"][1],
                c1 = Store.luckysheet_select_save[0]["column"][0],
                c2 = Store.luckysheet_select_save[0]["column"][1];

            let row = Store.visibledatarow[r2], 
                row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
            let col = Store.visibledatacolumn[c2], 
                col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

            if (col - scrollLeft - winW + 20 > 0) {
                $("#luckysheet-scrollbar-x").scrollLeft(col - winW + 20);
            }
            else if (col_pre - scrollLeft - 20 < 0) {
                $("#luckysheet-scrollbar-x").scrollLeft(col_pre - 20);
            }

            if (row - scrollTop - winH + 20 > 0) {
                $("#luckysheet-scrollbar-y").scrollTop(row - winH + 20);
            }
            else if (row_pre - scrollTop - 20 < 0) {
                $("#luckysheet-scrollbar-y").scrollTop(row_pre - 20);
            }
        }
    },
    getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr){
        if(Object.keys(cellSave).length == 0){
            return rangeArr;
        }

        let _this = this;

        let stack_str = null, 
            stack_edr = null, 
            stack_stc = null, 
            stack_edc = null;

        for(let r = minR; r <= maxR; r++){
            for(let c = minC; c <= maxC; c++){
                let cell = Store.flowdata[r][c];
                
                if((r + '_' + c) in cellSave){
                    if(cell != null && cell.mc != null){
                        if(stack_stc == null){
                            let range = {
                                'row': [cell.mc.r, cell.mc.r + cell.mc.rs - 1],
                                'column': [cell.mc.c, cell.mc.c + cell.mc.cs - 1]
                            };
                            rangeArr.push(range);
                            cellSave = _this.deleteCellInSave(cellSave, range);
                            return _this.getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr);
                        }
                        else if(c < stack_edc){
                            let range = {
                                'row': [stack_str, stack_edr],
                                'column': [stack_stc, stack_edc]
                            }
                            rangeArr.push(range);
                            cellSave = _this.deleteCellInSave(cellSave, range);
                            return _this.getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr);
                        }
                        else{
                            break;
                        }
                    }
                    else if(stack_stc == null){
                        stack_stc = c;
                        stack_edc = c;

                        stack_str = r;
                        stack_edr = r;
                    }
                    else if(c > stack_edc){
                        stack_edc = c;
                    }
                }
                else if(stack_stc != null){
                    if(cell != null && cell.mc != null){
                        break;
                    }
                    else if(c < stack_stc){

                    }
                    else if(c <= stack_edc){
                        let range = {
                            'row': [stack_str, stack_edr],
                            'column': [stack_stc, stack_edc]
                        }
                        rangeArr.push(range);
                        cellSave = _this.deleteCellInSave(cellSave, range);
                        return _this.getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr);
                    }
                    else{
                        stack_edr = r;
                    }
                }
            }
        }

        if(stack_stc != null){
            let range = {
                'row': [stack_str, stack_edr],
                'column': [stack_stc, stack_edc]
            }
            rangeArr.push(range);
            cellSave = _this.deleteCellInSave(cellSave, range);
            return _this.getRangeArr(minR, maxR, minC, maxC, cellSave, rangeArr);
        }
    },
    deleteCellInSave(cellSave, range){
        for(let r = range.row[0]; r <= range.row[1]; r++){
            for(let c = range.column[0]; c <= range.column[1]; c++){
                delete cellSave[r + '_' + c];
            }
        }

        return cellSave;
    }
}

export default luckysheetLocationCell;