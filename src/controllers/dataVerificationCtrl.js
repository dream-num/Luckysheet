import { replaceHtml } from '../utils/util';
import formula from '../global/formula';
import { isRealNum, isRealNull } from '../global/validate';
import { isdatetime, diff } from '../global/datecontroll';
import { luckysheetrefreshgrid } from '../global/refresh';
import tooltip from '../global/tooltip';
import { setcellvalue } from '../global/setdata';
import { getcellvalue } from '../global/getdata';
import editor from '../global/editor';
import { modelHTML } from './constant';
import { selectionCopyShow } from './select';
import server from './server';
import menuButton from './menuButton';
import sheetmanage from './sheetmanage';
import { getSheetIndex, getRangetxt } from '../methods/get';
import locale from '../locale/locale';
import Store from '../store';

const dataVerificationCtrl = {
    defaultItem: {
        type: 'dropdown',  //类型
        type2: null,  //
        value1: '',  //
        value2: '',  //
        checked: false,
        remote: false,  //自动远程获取选项
        prohibitInput: false,  //输入数据无效时禁止输入
        hintShow: false,  //选中单元格时显示提示语
        hintText: '',  //
    },
    curItem: null,
    dataVerification: null,
    selectRange: [],
    selectStatus: false,
    optionLabel: {
        'number': '数值',
        'number_integer': '整数',
        'number_decimal': '小数',
        'bw': '介于',
        'nb': '不介于',
        'eq': '等于',
        'ne': '不等于',
        'gt': '大于',
        'lt': '小于',
        'gte': '大于等于',
        'lte': '小于等于',
        'include': '包括',
        'exclude': '不包括',
        'equal': '等于',
        'bf': '早于',
        'nbf': '不早于',
        'af': '晚于',
        'naf': '不晚于',
        'card': '身份证号码',
        'phone': '手机号'
    },
    optionLabel_en: {
        'number': 'numeric',
        'number_integer': 'integer',
        'number_decimal': 'decimal',
        'bw': 'between',
        'nb': 'not between',
        'eq': 'equal to',
        'ne': 'not equal to',
        'gt': 'greater',
        'lt': 'less than',
        'gte': 'greater or equal to',
        'lte': 'less than or equal to',
        'include': 'include',
        'exclude': 'not include',
        'equal': 'equal to',
        'bf': 'earlier than',
        'nbf': 'not earlier than',
        'af': 'later than',
        'naf': 'not later than',
        'card': 'identification number',
        'phone': 'phone number'
    },
    createDialog: function(){
        let _this = this;

        const _locale = locale();
        const dvText = _locale.dataVerification;
        const toolbarText = _locale.toolbar;
        const buttonText = _locale.button;

        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-dataVerification-dialog").remove();

        let content =  `<div class="box">
                            <div class="box-item" style="border-top:1px solid #E1E4E8;">
                                <div class="box-item-title">${dvText.cellRange}</div>
                                <div id="data-verification-range" class="range">
                                    <input class="formulaInputFocus" spellcheck="false">
                                    <i class="fa fa-table" aria-hidden="true" title="${dvText.selectCellRange}"></i>
                                </div>
                            </div>
                            <div class="box-item">
                                <div class="box-item-title">${dvText.verificationCondition}</div>
                                <select id="data-verification-type-select">
                                    <option value="dropdown">${dvText.dropdown}</option>
                                    <option value="checkbox">${dvText.checkbox}</option>
                                    <option value="number">${dvText.number}</option>
                                    <option value="number_integer">${dvText.number_integer}</option>
                                    <option value="number_decimal">${dvText.number_decimal}</option>
                                    <option value="text_content">${dvText.text_content}</option>
                                    <option value="text_length">${dvText.text_length}</option>
                                    <option value="date">${dvText.date}</option>
                                    <option value="validity">${dvText.validity}</option>
                                </select>
                                <div class="show-box">
                                    <div class="show-box-item show-box-item-dropdown">
                                        <div class="range">
                                            <input class="formulaInputFocus data-verification-value1" placeholder="${dvText.placeholder1}" spellcheck="false">
                                            <i class="fa fa-table" aria-hidden="true" title="${dvText.selectCellRange}"></i>
                                        </div>
                                        <div class="multi">
                                            <input type="checkbox" id="data-verification-multi" class="data-verification-multi">
                                            <label for="data-verification-multi">${dvText.allowMultiSelect}</label>
                                        </div>
                                    </div>
                                    <div class="show-box-item show-box-item-checkbox">
                                        <div class="check-box">
                                            <span>${dvText.selected} ——</span>
                                            <input type="text" class="data-verification-value1" placeholder="${dvText.placeholder2}">
                                        </div>
                                        <div class="check-box">
                                            <span>${dvText.notSelected} ——</span>
                                            <input type="text" class="data-verification-value2" placeholder="${dvText.placeholder2}">
                                        </div>
                                    </div>
                                    <div class="show-box-item show-box-item-number">
                                        <select id="data-verification-number-select">
                                            <option value="bw">${dvText.between}</option>
                                            <option value="nb">${dvText.notBetween}</option>
                                            <option value="eq">${dvText.equal}</option>
                                            <option value="ne">${dvText.notEqualTo}</option>
                                            <option value="gt">${dvText.moreThanThe}</option>
                                            <option value="lt">${dvText.lessThan}</option>
                                            <option value="gte">${dvText.greaterOrEqualTo}</option>
                                            <option value="lte">${dvText.lessThanOrEqualTo}</option>
                                        </select>
                                        <div class="input input1">
                                            <input type="number" class="data-verification-value1" placeholder="1">
                                            <span>-</span>
                                            <input type="number" class="data-verification-value2" placeholder="100">
                                        </div>
                                        <div class="input input2">
                                            <input type="number" class="data-verification-value1" placeholder="${dvText.placeholder3}">
                                        </div>
                                    </div>
                                    <div class="show-box-item show-box-item-text">
                                        <select id="data-verification-text-select">
                                            <option value="include">${dvText.include}</option>
                                            <option value="exclude">${dvText.exclude}</option>
                                            <option value="equal">${dvText.equal}</option>
                                        </select>
                                        <div class="input input2">
                                            <input type="text" class="data-verification-value1" placeholder="${dvText.placeholder4}"/>
                                        </div>
                                    </div>
                                    <div class="show-box-item show-box-item-textLength">
                                        <select id="data-verification-textLength-select">
                                            <option value="bw">${dvText.between}</option>
                                            <option value="nb">${dvText.notBetween}</option>
                                            <option value="eq">${dvText.equal}</option>
                                            <option value="ne">${dvText.notEqualTo}</option>
                                            <option value="gt">${dvText.moreThanThe}</option>
                                            <option value="lt">${dvText.lessThan}</option>
                                            <option value="gte">${dvText.greaterOrEqualTo}</option>
                                            <option value="lte">${dvText.lessThanOrEqualTo}</option>
                                        </select>
                                        <div class="input input1">
                                            <input type="number" class="data-verification-value1" placeholder="1">
                                            <span>-</span>
                                            <input type="number" class="data-verification-value2" placeholder="100">
                                        </div>
                                        <div class="input input2">
                                            <input type="number" class="data-verification-value1" placeholder="${dvText.placeholder3}">
                                        </div>
                                    </div>
                                    <div class="show-box-item show-box-item-date">
                                        <select id="data-verification-date-select">
                                            <option value="bw">${dvText.between}</option>
                                            <option value="nb">${dvText.notBetween}</option>
                                            <option value="eq">${dvText.equal}</option>
                                            <option value="ne">${dvText.notEqualTo}</option>
                                            <option value="bf">${dvText.earlierThan}</option>
                                            <option value="nbf">${dvText.noEarlierThan}</option>
                                            <option value="af">${dvText.laterThan}</option>
                                            <option value="naf">${dvText.noLaterThan}</option>
                                        </select>
                                        <div class="input input1">
                                            <input type="date" class="data-verification-value1" placeholder="2020/9/10">
                                            <span>-</span>
                                            <input type="date" class="data-verification-value2" placeholder="2020/9/10">
                                        </div>
                                        <div class="input input2">
                                            <input type="date" class="data-verification-value1" placeholder="2020/9/10">
                                        </div>
                                    </div>
                                    <div class="show-box-item show-box-item-validity">
                                        <select id="data-verification-validity-select">
                                            <option value="card">${dvText.identificationNumber}</option>
                                            <option value="phone">${dvText.phoneNumber}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="box-item">
                                <div class="check">
                                    <input type="checkbox" id="data-verification-remote" class="data-verification-remote">
                                    <label for="data-verification-remote">${dvText.remote}</label>
                                </div>
                                <div class="check">
                                    <input type="checkbox" id="data-verification-prohibitInput">
                                    <label for="data-verification-prohibitInput">${dvText.prohibitInput}</label>
                                </div>
                                <div class="check">
                                    <input type="checkbox" id="data-verification-hint-show">
                                    <label for="data-verification-hint-show">${dvText.hintShow}</label>
                                </div>
                                <div class="data-verification-hint-text">
                                    <input type="text" placeholder="${dvText.placeholder5}">
                                </div>
                            </div>
                        </div>`;

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-dataVerification-dialog", 
            "addclass": "luckysheet-dataVerification-dialog", 
            "title": toolbarText.dataVerification, 
            "content": content, 
            "botton":  `<button id="luckysheet-dataVerification-dialog-confirm" class="btn btn-primary">${buttonText.confirm}</button>
                        <button id="luckysheet-dataVerification-dialog-delete" class="btn btn-default">${dvText.deleteVerification}</button>
                        <button class="btn btn-default luckysheet-model-close-btn">${buttonText.cancel}</button>`, 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-dataVerification-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 350).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), 
            winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), 
            scrollTop = $(document).scrollTop();
        $("#luckysheet-dataVerification-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();

        _this.dataAllocation();
    },
    init: function(){
        let _this = this;

        const dvText = locale().dataVerification; 

        //单元格数据验证 类型是 下拉列表
        $(document).off("click.dropdownBtn").on("click.dropdownBtn", "#luckysheet-dataVerification-dropdown-btn", function(e) {
            _this.dropdownListShow();
            e.stopPropagation();
        });
        $(document).off("click.dropdownListItem").on("click.dropdownListItem", "#luckysheet-dataVerification-dropdown-List .dropdown-List-item", function(e) {
            var $item = $(this);
            let value = e.target.innerText;
            if ($item.hasClass('multi')) {
                $item.toggleClass('checked');
                value = $.map($("#luckysheet-dataVerification-dropdown-List").children().filter('.checked'), function(el) {
                    return el.innerText;
                }).join(',');
            } else {
                $("#luckysheet-dataVerification-dropdown-List").hide();
            }
            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let rowIndex = last.row_focus;
            let colIndex = last.column_focus;

            $("#luckysheet-rich-text-editor").text(value);
            formula.updatecell(rowIndex, colIndex);

            e.stopPropagation();
        });

        //单元格范围
        $(document).off("click.dvRange").on("click.dvRange", "#data-verification-range .fa-table", function(e) {
            $("#luckysheet-dataVerification-dialog").hide();

            let dataSource = "0";
            let txt = $(this).siblings("input").val().trim(); 

            _this.rangeDialog(dataSource, txt);

            _this.selectRange = [];

            let range = _this.getRangeByTxt(txt);

            formula.rangetosheet = Store.currentSheetIndex;

            if(range[0].sheetIndex != Store.currentSheetIndex){
                sheetmanage.changeSheetExec(range[0].sheetIndex);
            }

            if(range.length > 0){
                for(let s = 0; s < range.length; s++){
                    let r1 = range[s].row[0], r2 = range[s].row[1];
                    let c1 = range[s].column[0], c2 = range[s].column[1];

                    let row = Store.visibledatarow[r2], 
                        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
                    let col = Store.visibledatacolumn[c2], 
                        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

                    _this.selectRange.push({ 
                        "left": col_pre, 
                        "width": col - col_pre - 1, 
                        "top": row_pre, 
                        "height": row - row_pre - 1, 
                        "left_move": col_pre, 
                        "width_move": col - col_pre - 1, 
                        "top_move": row_pre, 
                        "height_move": row - row_pre - 1, 
                        "row": [r1, r2], 
                        "column": [c1, c2], 
                        "row_focus": r1, 
                        "column_focus": c1 
                    });
                }
            }
            
            selectionCopyShow(_this.selectRange);
        }); 
        $(document).off("click.dvRange2").on("click.dvRange2", "#luckysheet-dataVerification-dialog .show-box-item-dropdown .range .fa-table", function(e) {
            $("#luckysheet-dataVerification-dialog").hide();

            let dataSource = "1";
            let txt = $(this).siblings("input").val().trim(); 

            _this.rangeDialog(dataSource, txt);

            _this.selectRange = [];

            let range = _this.getRangeByTxt(txt);

            formula.rangetosheet = Store.currentSheetIndex;

            if(range[0].sheetIndex != Store.currentSheetIndex){
                sheetmanage.changeSheetExec(range[0].sheetIndex);
            }

            if(range.length > 0){
                for(let s = 0; s < range.length; s++){
                    let r1 = range[s].row[0], r2 = range[s].row[1];
                    let c1 = range[s].column[0], c2 = range[s].column[1];

                    let row = Store.visibledatarow[r2], 
                        row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
                    let col = Store.visibledatacolumn[c2], 
                        col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

                    _this.selectRange.push({ 
                        "left": col_pre, 
                        "width": col - col_pre - 1, 
                        "top": row_pre, 
                        "height": row - row_pre - 1, 
                        "left_move": col_pre, 
                        "width_move": col - col_pre - 1, 
                        "top_move": row_pre, 
                        "height_move": row - row_pre - 1, 
                        "row": [r1, r2], 
                        "column": [c1, c2], 
                        "row_focus": r1, 
                        "column_focus": c1 
                    });
                }
            }
            
            selectionCopyShow(_this.selectRange);
        });
        $(document).off("click.dvRangeConfirm").on("click.dvRangeConfirm", "#luckysheet-dataVerificationRange-dialog-confirm", function(e) {
            let dataSource = $(this).attr("data-source");
            let txt = $(this).parents("#luckysheet-dataVerificationRange-dialog").find("input").val();

            if(_this.getRangeByTxt(txt).length > 1){
                tooltip.info('<i class="fa fa-exclamation-triangle"></i>', '不能对多重选择区域执行此操作，请选择单个区域，然后再试');
                return;
            }

            if(dataSource == '0'){
                $("#luckysheet-dataVerification-dialog #data-verification-range input").val(txt);
            }
            else if(dataSource == '1'){
                $("#luckysheet-dataVerification-dialog .show-box-item-dropdown .range input").val(txt);
            }
            
            $("#luckysheet-dataVerificationRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-dataVerification-dialog").show();

            if(formula.rangetosheet != null && formula.rangetosheet != Store.currentSheetIndex){
                sheetmanage.changeSheetExec(formula.rangetosheet);
                formula.rangetosheet = null;
            }

            let range = [];
            selectionCopyShow(range);
        });
        $(document).off("click.dvRangeClose").on("click.dvRangeClose", "#luckysheet-dataVerificationRange-dialog-close", function(e) {
            $("#luckysheet-dataVerificationRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-dataVerification-dialog").show();

            if(formula.rangetosheet != null && formula.rangetosheet != Store.currentSheetIndex){
                sheetmanage.changeSheetExec(formula.rangetosheet);
                formula.rangetosheet = null;
            }

            let range = [];
            selectionCopyShow(range);
        });
        $(document).on("click", "#luckysheet-dataVerificationRange-dialog .luckysheet-modal-dialog-title-close", function(e) {
            $("#luckysheet-dataVerificationRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-dataVerification-dialog").show();

            if(formula.rangetosheet != null && formula.rangetosheet != Store.currentSheetIndex){
                sheetmanage.changeSheetExec(formula.rangetosheet);
                formula.rangetosheet = null;
            }

            let range = [];
            selectionCopyShow(range);
        })

        //验证条件 下拉框
        $(document).off("change.typeSelect").on("change.typeSelect", "#data-verification-type-select", function(e) {
            $("#luckysheet-dataVerification-dialog .show-box .show-box-item").hide();

            let value = this.value;
            let item = _this.curItem;

            if(value == 'dropdown'){
                $("#luckysheet-dataVerification-dialog .show-box .show-box-item-dropdown").show();

                let value1 = "";

                if(value == item.type){
                    value1 = item.value1;
                }

                $("#luckysheet-dataVerification-dialog .show-box-item-dropdown .data-verification-value1").val(value1);
                
                $('#luckysheet-dataVerification-dialog #data-verification-multi').prop('checked', item.type2 ? true : false);
            }
            else if(value == 'checkbox'){
                $("#luckysheet-dataVerification-dialog .show-box .show-box-item-checkbox").show();

                let value1 = "";
                let value2 = "";

                if(value == item.type){
                    value1 = item.value1;
                    value2 = item.value2;
                }

                $("#luckysheet-dataVerification-dialog .show-box-item-checkbox .data-verification-value1").val(value1);
                $("#luckysheet-dataVerification-dialog .show-box-item-checkbox .data-verification-value2").val(value2);
            }
            else if(value == 'number' || value == 'number_integer' || value == 'number_decimal'){
                $("#luckysheet-dataVerification-dialog .show-box-item-number").show();
                $("#luckysheet-dataVerification-dialog .show-box-item-number .input").hide();

                let type2 = "bw";
                let value1 = "";
                let value2 = "";

                if(item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal'){
                    type2 = item.type2;
                    value1 = item.value1;
                    value2 = item.value2;
                }

                $("#luckysheet-dataVerification-dialog #data-verification-number-select").val(type2);
            
                if(type2 == 'bw' || type2 == 'nb'){
                    $("#luckysheet-dataVerification-dialog .show-box-item-number .input1").show();
                }
                else{
                    $("#luckysheet-dataVerification-dialog .show-box-item-number .input2").show();
                }

                $("#luckysheet-dataVerification-dialog .show-box-item-number .data-verification-value1").val(value1);
                $("#luckysheet-dataVerification-dialog .show-box-item-number .data-verification-value2").val(value2);
            }
            else if(value == 'text_content'){
                $("#luckysheet-dataVerification-dialog .show-box-item-text").show();

                let type2 = "include";
                let value1 = "";
                
                if(value == item.type){
                    type2 = item.type2;
                    value1 = item.value1;
                }
                
                $("#luckysheet-dataVerification-dialog #data-verification-text-select").val(type2);
                $("#luckysheet-dataVerification-dialog .show-box-item-text .data-verification-value1").val(value1);
            }
            else if(value == 'text_length'){
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength").show();
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input").hide();

                let type2 = "bw";
                let value1 = "";
                let value2 = "";

                if(value == item.type){
                    type2 = item.type2;
                    value1 = item.value1;
                    value2 = item.value2;
                }

                $("#luckysheet-dataVerification-dialog #data-verification-textLength-select").val(type2);
            
                if(type2 == 'bw' || type2 == 'nb'){
                    $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input1").show();
                }
                else{
                    $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input2").show();
                }

                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .data-verification-value1").val(value1);
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .data-verification-value2").val(value2);
            }
            else if(value == 'date'){
                $("#luckysheet-dataVerification-dialog .show-box-item-date").show();
                $("#luckysheet-dataVerification-dialog .show-box-item-date .input").hide();

                let type2 = "bw";
                let value1 = "";
                let value2 = "";

                if(value == item.type){
                    type2 = item.type2;
                    value1 = item.value1;
                    value2 = item.value2;
                }

                $("#luckysheet-dataVerification-dialog #data-verification-date-select").val(type2);

                if(type2 == 'bw' || type2 == 'nb'){
                    $("#luckysheet-dataVerification-dialog .show-box-item-date .input1").show();
                }
                else{
                    $("#luckysheet-dataVerification-dialog .show-box-item-date .input2").show();
                }

                $("#luckysheet-dataVerification-dialog .show-box-item-date .data-verification-value1").val(value1);
                $("#luckysheet-dataVerification-dialog .show-box-item-date .data-verification-value2").val(value2);
            }
            else if(value == 'validity'){
                $("#luckysheet-dataVerification-dialog .show-box .show-box-item-validity").show();

                let type2 = "card";

                if(value == item.type){
                    type2 = item.type2;
                }

                $("#luckysheet-dataVerification-dialog #data-verification-validity-select").val(type2);
            }
        });

        $(document).off("change.numberSelect").on("change.numberSelect", "#data-verification-number-select", function(e) {
            $("#luckysheet-dataVerification-dialog .show-box-item-number .input").hide();

            let value = this.value;

            if(value == 'bw' || value == 'nb'){
                $("#luckysheet-dataVerification-dialog .show-box-item-number .input1").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .show-box-item-number .input2").show();
            }
        });
        // 文本长度选择变化
        $(document).off("change.textLengthSelect").on("change.textLengthSelect", "#data-verification-textLength-select", function(e) {
            $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input").hide();

            let value = this.value;

            if(value == 'bw' || value == 'nb'){
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input1").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input2").show();
            }
        });

        $(document).off("change.dateSelect").on("change.dateSelect", "#data-verification-date-select", function(e) {
            $("#luckysheet-dataVerification-dialog .show-box-item-date .input").hide();

            let value = this.value;

            if(value == 'bw' || value == 'nb'){
                $("#luckysheet-dataVerification-dialog .show-box-item-date .input1").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .show-box-item-date .input2").show();
            }
        });

        //选中单元格时显示提示语
        $(document).off("change.hintShow").on("change.hintShow", "#data-verification-hint-show", function(e) {
            if(this.checked){
                $("#luckysheet-dataVerification-dialog .data-verification-hint-text").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .data-verification-hint-text").hide();
            }
        });

        //确认按钮
        $(document).off("click.dvSaveConfirm").on("click.dvSaveConfirm", "#luckysheet-dataVerification-dialog-confirm", function(e) {
            let rangeTxt = $("#luckysheet-dataVerification-dialog #data-verification-range input").val().trim();
            let range = _this.getRangeByTxt(rangeTxt);

            if(range.length == 0){
                tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.selectCellRange2);
                return;
            }

            let str = range[range.length - 1].row[0],
                edr = range[range.length - 1].row[1],
                stc = range[range.length - 1].column[0],
                edc = range[range.length - 1].column[1];
            let d = editor.deepCopyFlowData(Store.flowdata);

            if(str < 0){
                str = 0;
            }

            if(edr > d.length - 1){
                edr = d.length - 1;
            }

            if(stc < 0){
                stc = 0;
            }

            if(edc > d[0].length - 1){
                edc = d[0].length - 1;
            }

            let type = $("#luckysheet-dataVerification-dialog #data-verification-type-select").val();
            let type2 = null, value1 = "", value2 = "";

            if(type == 'dropdown'){
                value1 = $("#luckysheet-dataVerification-dialog .show-box-item-dropdown .data-verification-value1").val().trim();
            
                if(value1.length == 0){
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo1);
                    return;
                }
                type2 = $("#luckysheet-dataVerification-dialog #data-verification-multi").is(':checked');
            }
            else if(type == 'checkbox'){
                value1 = $("#luckysheet-dataVerification-dialog .show-box-item-checkbox .data-verification-value1").val().trim();
                value2 = $("#luckysheet-dataVerification-dialog .show-box-item-checkbox .data-verification-value2").val().trim();
            
                if(value1.length == 0 || value2.length == 0){
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo2);
                    return;
                }
            }
            else if(type == 'number' || type == 'number_integer' || type == 'number_decimal'){
                type2 = $("#luckysheet-dataVerification-dialog #data-verification-number-select").val();
                value1 = $("#luckysheet-dataVerification-dialog .show-box-item-number .input:visible .data-verification-value1").val().trim();
                
                if(!isRealNum(value1)){
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo3);
                    return;
                }

                if(type2 == 'bw' || type2 == 'nb'){
                    value2 = $("#luckysheet-dataVerification-dialog .show-box-item-number .input:visible .data-verification-value2").val().trim();
                
                    if(!isRealNum(value2)){
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo3);
                        return;
                    }

                    if(Number(value2) < Number(value1)){
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo4);
                        return;
                    }
                }
            }
            else if(type == 'text_content'){
                type2 = $("#luckysheet-dataVerification-dialog #data-verification-text-select").val();
                value1 = $("#luckysheet-dataVerification-dialog .show-box-item-text .data-verification-value1").val().trim();
            
                if(value1.length == 0){
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo5);
                    return;
                }
            }
            else if(type == 'text_length'){
                type2 = $("#luckysheet-dataVerification-dialog #data-verification-textLength-select").val();
                value1 = $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input:visible .data-verification-value1").val().trim();
                
                if(!isRealNum(value1)){
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo3);
                    return;
                }

                if (!Number.isInteger(Number(value1)) || Number(value1) < 0) {
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.textlengthInteger);
                    return;
                }

                if(type2 == 'bw' || type2 == 'nb'){
                    value2 = $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input:visible .data-verification-value2").val().trim();
                
                    if(!isRealNum(value2)){
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo3);
                        return;
                    }
                    if (!Number.isInteger(Number(value2)) || Number(value2) < 0) {
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.textlengthInteger);
                        return;
                    }

                    if(Number(value2) < Number(value1)){
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo4);
                        return;
                    }
                }
            }
            else if(type == 'date'){
                type2 = $("#luckysheet-dataVerification-dialog #data-verification-date-select").val();
                value1 = $("#luckysheet-dataVerification-dialog .show-box-item-date .input:visible .data-verification-value1").val().trim();
                
                if(!isdatetime(value1)){
                    tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo6);
                    return;
                }

                if(type2 == 'bw' || type2 == 'nb'){
                    value2 = $("#luckysheet-dataVerification-dialog .show-box-item-date .input:visible .data-verification-value2").val().trim();
                
                    if(!isdatetime(value2)){
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo6);
                        return;
                    }

                    if(diff(value1, value2) > 0){
                        tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.tooltipInfo7);
                        return;
                    }
                }
            }
            else if(type == 'validity'){
                type2 = $("#luckysheet-dataVerification-dialog #data-verification-validity-select").val();
            }

            let remote = $("#luckysheet-dataVerification-dialog #data-verification-remote").is(":checked");
            let prohibitInput = $("#luckysheet-dataVerification-dialog #data-verification-prohibitInput").is(":checked");
            let hintShow = $("#luckysheet-dataVerification-dialog #data-verification-hint-show").is(":checked");
            let hintText = "";

            if(hintShow){
                hintText = $("#luckysheet-dataVerification-dialog .data-verification-hint-text input").val().trim();
            }

            let item = {
                type: type,
                type2: type2,  
                value1: value1,  
                value2: value2, 
                checked: false, 
                remote: remote, 
                prohibitInput: prohibitInput,  
                hintShow: hintShow, 
                hintText: hintText,
            }
           
            let historyDataVerification = $.extend(true, {}, _this.dataVerification);
            let currentDataVerification = $.extend(true, {}, _this.dataVerification);

            for(let r = str; r <= edr; r++){
                for(let c = stc; c <= edc; c++){
                    currentDataVerification[r + '_' + c] = item;

                    if(type == 'checkbox'){
                        setcellvalue(r, c, d, item.value2);
                    }
                }
            }

            if(type == 'checkbox'){
                _this.refOfCheckbox(historyDataVerification, currentDataVerification, Store.currentSheetIndex, d, range[range.length - 1]);
            }
            else{
                _this.ref(historyDataVerification, currentDataVerification, Store.currentSheetIndex);
            }
            
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-dataVerification-dialog").hide();
        });

        //删除验证按钮
        $(document).off("click.delete").on("click.delete", "#luckysheet-dataVerification-dialog-delete", function(e) {
            let rangeTxt = $("#luckysheet-dataVerification-dialog #data-verification-range input").val().trim();
            let range = _this.getRangeByTxt(rangeTxt);

            if(range.length == 0){
                tooltip.info('<i class="fa fa-exclamation-triangle"></i>', dvText.selectCellRange2);
                return;
            }
            
            let historyDataVerification = $.extend(true, {}, _this.dataVerification);
            let currentDataVerification = $.extend(true, {}, _this.dataVerification);

            let str = range[range.length - 1].row[0],
                edr = range[range.length - 1].row[1],
                stc = range[range.length - 1].column[0],
                edc = range[range.length - 1].column[1];

            for(let r = str; r <= edr; r++){
                for(let c = stc; c <= edc; c++){
                    delete currentDataVerification[r + '_' + c];
                }
            }

            _this.ref(historyDataVerification, currentDataVerification, Store.currentSheetIndex);
            
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-dataVerification-dialog").hide();
        });

        //info提示弹框 关闭
        $(document).on("click", "#luckysheet-info .luckysheet-modal-dialog-title-close, #luckysheet-info .luckysheet-model-close-btn", function(e) {
            $(this).parents("#luckysheet-info").hide();

            if($("#luckysheet-dataVerification-dialog").is(":visible")){
                $("#luckysheet-modal-dialog-mask").show();
            }
            e.stopPropagation();
        });
    },
    dataAllocation: function(){
        let _this = this;

        //单元格范围
        let range = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let rangeTxt = getRangetxt(Store.currentSheetIndex, range, Store.currentSheetIndex);
        $("#luckysheet-dataVerification-dialog #data-verification-range input").val(rangeTxt);

        //focus单元格
        let rowIndex = range.row_focus || range.row[0];
        let colIndex = range.column_focus || range.column[0];
        let dataVerification = $.extend(true, {}, _this.dataVerification); 
        let item = dataVerification[rowIndex + '_' + colIndex];

        if(item == null){
            item = $.extend(true, {}, _this.defaultItem);
        }

        _this.curItem = item;
        
        //验证条件
        $("#luckysheet-dataVerification-dialog #data-verification-type-select").val(item.type);
        $("#luckysheet-dataVerification-dialog .show-box .show-box-item").hide();

        if(item.type == 'dropdown'){
            $("#luckysheet-dataVerification-dialog .show-box .show-box-item-dropdown").show();
            $("#luckysheet-dataVerification-dialog .show-box-item-dropdown .data-verification-value1").val(item.value1);
            $('#luckysheet-dataVerification-dialog #data-verification-multi').prop('checked', item.type2 ? true : false);
        }
        else if(item.type == 'checkbox'){
            $("#luckysheet-dataVerification-dialog .show-box .show-box-item-checkbox").show();
            $("#luckysheet-dataVerification-dialog .show-box-item-checkbox .data-verification-value1").val(item.value1);
            $("#luckysheet-dataVerification-dialog .show-box-item-checkbox .data-verification-value2").val(item.value2);
        }
        else if(item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal'){
            $("#luckysheet-dataVerification-dialog .show-box-item-number").show();
            $("#luckysheet-dataVerification-dialog #data-verification-number-select").val(item.type2);
            $("#luckysheet-dataVerification-dialog .show-box-item-number .input").hide();
            
            if(item.type2 == 'bw' || item.type2 == 'nb'){
                $("#luckysheet-dataVerification-dialog .show-box-item-number .input1").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .show-box-item-number .input2").show();
            }

            $("#luckysheet-dataVerification-dialog .show-box-item-number .data-verification-value1").val(item.value1);
            $("#luckysheet-dataVerification-dialog .show-box-item-number .data-verification-value2").val(item.value2);
        }
        else if(item.type == 'text_content'){
            $("#luckysheet-dataVerification-dialog .show-box-item-text").show();
            $("#luckysheet-dataVerification-dialog #data-verification-text-select").val(item.type2);
            $("#luckysheet-dataVerification-dialog .show-box-item-text .data-verification-value1").val(item.value1);
        }
        else if(item.type == 'text_length'){
            $("#luckysheet-dataVerification-dialog .show-box-item-textLength").show();
            $("#luckysheet-dataVerification-dialog #data-verification-textLength-select").val(item.type2);
            $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input").hide();

            if(item.type2 == 'bw' || item.type2 == 'nb'){
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input1").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .show-box-item-textLength .input2").show();
            }

            $("#luckysheet-dataVerification-dialog .show-box-item-textLength .data-verification-value1").val(item.value1);
            $("#luckysheet-dataVerification-dialog .show-box-item-textLength .data-verification-value2").val(item.value2);
        }
        else if(item.type == 'date'){
            $("#luckysheet-dataVerification-dialog .show-box-item-date").show();
            $("#luckysheet-dataVerification-dialog #data-verification-date-select").val(item.type2);
            $("#luckysheet-dataVerification-dialog .show-box-item-date .input").hide();

            if(item.type2 == 'bw' || item.type2 == 'nb'){
                $("#luckysheet-dataVerification-dialog .show-box-item-date .input1").show();
            }
            else{
                $("#luckysheet-dataVerification-dialog .show-box-item-date .input2").show();
            }

            $("#luckysheet-dataVerification-dialog .show-box-item-date .data-verification-value1").val(item.value1);
            $("#luckysheet-dataVerification-dialog .show-box-item-date .data-verification-value2").val(item.value2);
        }
        else if(item.type == 'validity'){
            $("#luckysheet-dataVerification-dialog .show-box .show-box-item-validity").show();
            $("#luckysheet-dataVerification-dialog #data-verification-validity-select").val(item.type2);
        }

        //自动远程获取选项
        $("#luckysheet-dataVerification-dialog #data-verification-remote").prop("checked", item.remote);

        //输入数据无效时禁止输入
        $("#luckysheet-dataVerification-dialog #data-verification-prohibitInput").prop("checked", item.prohibitInput);

        //选中单元格时显示提示语
        $("#luckysheet-dataVerification-dialog #data-verification-hint-show").prop("checked", item.hintShow);
        
        if(item.hintShow){
            $("#luckysheet-dataVerification-dialog .data-verification-hint-text").show();
        }
        else{
            $("#luckysheet-dataVerification-dialog .data-verification-hint-text").hide();
        }
        
        $("#luckysheet-dataVerification-dialog .data-verification-hint-text input").val(item.hintText);
    },
    rangeDialog: function(dataSource, txt){
        let _this = this;

        const _locale = locale();
        const dvText = _locale.dataVerification;
        const buttonText = _locale.button;

        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-dataVerificationRange-dialog").remove();

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-dataVerificationRange-dialog", 
            "addclass": "luckysheet-dataVerificationRange-dialog", 
            "title": dvText.selectCellRange, 
            "content": `<input readonly="readonly" placeholder="${dvText.selectCellRange2}" value="${txt}"/>`, 
            "botton":  `<button id="luckysheet-dataVerificationRange-dialog-confirm" class="btn btn-primary" data-source="${dataSource}">${buttonText.confirm}</button>
                        <button id="luckysheet-dataVerificationRange-dialog-close" class="btn btn-default">${buttonText.close}</button>`, 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-dataVerificationRange-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-dataVerificationRange-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
    },
    getTxtByRange: function(range){
        if(range.length > 0){
            let txt = [];

            for(let s = 0; s < range.length; s++){
                let r1 = range[s].row[0], r2 = range[s].row[1];
                let c1 = range[s].column[0], c2 = range[s].column[1];
                
                txt.push(getRangetxt(Store.currentSheetIndex, { "row": [r1, r2], "column": [c1, c2] }, Store.currentSheetIndex));
            }

            return txt.join(",");
        }
    },
    getRangeByTxt: function(txt){
        let range = [];

        if(txt.indexOf(",") != -1){
            let arr = txt.split(",");
            for(let i = 0; i < arr.length; i++){
                if(formula.iscelldata(arr[i])){
                    range.push(formula.getcellrange(arr[i]));
                }
                else{
                    range = [];
                    break;    
                }
            }
        }
        else{
            if(formula.iscelldata(txt)){
                range.push(formula.getcellrange(txt));
            }
        }

        return range;
    },
    cellFocus: function(r, c, clickMode){
        $("#luckysheet-dataVerification-dropdown-btn").hide();
        $("#luckysheet-dataVerification-showHintBox").hide();

        let _this = this;

        if(_this.dataVerification == null || _this.dataVerification[r + '_' + c] == null){
            $("#luckysheet-dataVerification-dropdown-List").hide();
            return;
        }

        let row = Store.visibledatarow[r],
            row_pre = r == 0 ? 0 : Store.visibledatarow[r - 1];
        let col = Store.visibledatacolumn[c],
            col_pre = c == 0 ? 0 : Store.visibledatacolumn[c - 1];

        let margeset = menuButton.mergeborer(Store.flowdata, r, c);
        if(!!margeset){
            row = margeset.row[1];
            row_pre = margeset.row[0];
            
            col = margeset.column[1];
            col_pre = margeset.column[0];
        }

        let item = _this.dataVerification[r + '_' + c];

        //单元格数据验证 类型是 复选框
        if(clickMode && item.type == 'checkbox'){
            _this.checkboxChange(r, c);
            return;
        }

        //单元格数据验证 类型是 下拉列表
        if(item.type == 'dropdown'){
            $("#luckysheet-dataVerification-dropdown-btn").show().css({
                'max-width': col - col_pre,
                'max-height': row - row_pre,
                'left': col - 20,
                'top': row_pre + (row - row_pre - 20) / 2
            })

            if($("#luckysheet-dataVerification-dropdown-List").is(":visible")){
                let dataIndex = $("#luckysheet-dataVerification-dropdown-List").prop("data-index");
                
                if(dataIndex != (r + '_' + c)){
                    $("#luckysheet-dataVerification-dropdown-List").hide();
                }
            }
        }
        else{
            $("#luckysheet-dataVerification-dropdown-List").hide();
        }

        //提示语
        if(item.hintShow){
            let hintText;

            if(Store.lang == 'en'){
                hintText = '<span style="color:#f5a623;">Hint: </span>';
            }
            else{
                hintText = '<span style="color:#f5a623;">提示：</span>';
            }

            hintText += _this.getHintText(item);

            $("#luckysheet-dataVerification-showHintBox").html(hintText).show().css({
                'left': col_pre,
                'top': row
            });

            return;
        }
        
        //数据验证未通过
        let cellValue = getcellvalue(r, c, null);

        if(isRealNull(cellValue)){
            return;
        }

        let validate = _this.validateCellData(cellValue, item);

        if(!validate){
            let failureText;

            if(Store.lang == 'en'){
                failureText = '<span style="color:#f72626;">Failure: </span>';
            }
            else{
                failureText = '<span style="color:#f72626;">失效：</span>';
            }

            failureText += _this.getFailureText(item);

            $("#luckysheet-dataVerification-showHintBox").html(failureText).show().css({
                'left': col_pre,
                'top': row
            });
        }
    },
    getHintText: function(item) {
        let _this = this;

        let hintText = item.hintText || '';

        if(hintText.length == 0){
            if(Store.lang == 'en'){
                if(item.type == 'dropdown'){
                    hintText += 'please select an option in the drop-down list';
                }
                else if(item.type == 'checkbox'){

                }
                else if(item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal'){
                    hintText += 'please enter a ' + _this.optionLabel_en[item.type] + ' ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;

                    if(item.type2 == 'bw' || item.type2 == 'nb'){
                        hintText += ' and ' + item.value2;
                    }
                }
                else if(item.type == 'text_content'){
                    hintText += 'please enter text ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                }
                else if(item.type == 'text_length'){
                    hintText += 'please enter text with length ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                    
                    if(item.type2 == 'bw' || item.type2 == 'nb'){
                        hintText += ' and ' + item.value2;
                    }
                }
                else if(item.type == 'date'){
                    hintText += 'please enter a date ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;

                    if(item.type2 == 'bw' || item.type2 == 'nb'){
                        hintText += ' and ' + item.value2;
                    }
                }
                else if(item.type == 'validity'){
                    hintText += 'please enter the correct ' + _this.optionLabel_en[item.type2];
                }
            }
            else{
                if(item.type == 'dropdown'){
                    hintText += '请选择下拉列表中的选项';
                }
                else if(item.type == 'checkbox'){

                }
                else if(item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal'){
                    hintText += '请输入' + _this.optionLabel[item.type2] + item.value1;

                    if(item.type2 == 'bw' || item.type2 == 'nb'){
                        hintText += '和' + item.value2 + '之间';
                    }

                    hintText += '的' + _this.optionLabel[item.type];
                }
                else if(item.type == 'text_content'){
                    hintText += '请输入内容' + _this.optionLabel[item.type2] + item.value1 + '的文本';
                }
                else if(item.type == 'text_length'){
                    hintText += '请输入长度' + _this.optionLabel[item.type2] + item.value1;
                    
                    if(item.type2 == 'bw' || item.type2 == 'nb'){
                        hintText += '和' + item.value2 + '之间';
                    }

                    hintText += '的文本';
                }
                else if(item.type == 'date'){
                    hintText += '请输入' + _this.optionLabel[item.type2] + item.value1;

                    if(item.type2 == 'bw' || item.type2 == 'nb'){
                        hintText += '和' + item.value2 + '之间';
                    }

                    hintText += '的日期';
                }
                else if(item.type == 'validity'){
                    hintText += '请输入正确的' + _this.optionLabel[item.type2];
                }
            }
        }

        return hintText;
    },
    getFailureText: function(item) {
        let _this = this;

        let failureText = '';

        if(Store.lang == 'en'){
            if(item.type == 'dropdown'){
                failureText += 'what you selected is not an option in the drop-down list';
            }
            else if(item.type == 'checkbox'){

            }
            else if(item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal'){
                failureText += 'what you entered is not a ' + _this.optionLabel_en[item.type] + ' ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;

                if(item.type2 == 'bw' || item.type2 == 'nb'){
                    failureText += ' and ' + item.value2;
                }
            }
            else if(item.type == 'text_content'){
                failureText += 'what you entered is not text that ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
            }
            else if(item.type == 'text_length'){
                failureText += 'the text you entered is not length ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;
                
                if(item.type2 == 'bw' || item.type2 == 'nb'){
                    failureText += ' and ' + item.value2;
                }
            }
            else if(item.type == 'date'){
                failureText += 'the date you entered is not ' + _this.optionLabel_en[item.type2] + ' ' + item.value1;

                if(item.type2 == 'bw' || item.type2 == 'nb'){
                    failureText += ' and ' + item.value2;
                }
            }
            else if(item.type == 'validity'){
                failureText += 'what you entered is not a correct ' + _this.optionLabel_en[item.type2];
            }
        }
        else{
            if(item.type == 'dropdown'){
                failureText += '你选择的不是下拉列表中的选项';
            }
            else if(item.type == 'checkbox'){

            }
            else if(item.type == 'number' || item.type == 'number_integer' || item.type == 'number_decimal'){
                failureText += '你输入的不是' + _this.optionLabel[item.type2] + item.value1;

                if(item.type2 == 'bw' || item.type2 == 'nb'){
                    failureText += '和' + item.value2 + '之间';
                }

                failureText += '的' + _this.optionLabel[item.type];
            }
            else if(item.type == 'text_content'){
                failureText += '你输入的不是内容' + _this.optionLabel[item.type2] + item.value1 + '的文本';
            }
            else if(item.type == 'text_length'){
                failureText += '你输入的不是长度' + _this.optionLabel[item.type2] + item.value1;
                
                if(item.type2 == 'bw' || item.type2 == 'nb'){
                    failureText += '和' + item.value2 + '之间';
                }

                failureText += '的文本';
            }
            else if(item.type == 'date'){
                failureText += '你输入的不是' + _this.optionLabel[item.type2] + item.value1;

                if(item.type2 == 'bw' || item.type2 == 'nb'){
                    failureText += '和' + item.value2 + '之间';
                }

                failureText += '的日期';
            }
            else if(item.type == 'validity'){
                failureText += '你输入的不是一个正确的' + _this.optionLabel[item.type2];
            }
        }

        return failureText;
    },
    validateCellData: function(cellValue, item){
        let _this = this;

        let type = item.type,
            type2 = item.type2,
            value1 = item.value1,
            value2 = item.value2;

        if(type == 'dropdown'){
            let list = _this.getDropdownList(value1);

            // 多选的情况 检查每个都在下拉列表中
            if(type2 && cellValue){
                return cellValue.split(',').every(function (i) {
                    return list.indexOf(i) !== -1;
                });
            }

            let result = false;

            for(let i = 0; i < list.length; i++){
                if(list[i] == cellValue){
                    result = true;
                    break;
                }
            }

            return result;
        }
        else if(type == 'checkbox'){

        }
        else if(type == 'number' || type == 'number_integer' || type == 'number_decimal'){
            if(!isRealNum(cellValue)){
                return false;
            }
            
            cellValue = Number(cellValue);

            if(type == 'number_integer' && cellValue % 1 !== 0){
                return false;
            }

            if(type == 'number_decimal' && cellValue % 1 === 0){
                return false;
            }

            value1 = Number(value1);
            value2 = Number(value2);

            if(type2 == 'bw' && (cellValue < value1 || cellValue > value2)){
                return false;
            }

            if(type2 == 'nb' && (cellValue >= value1 && cellValue <= value2)){
                return false;
            }

            if(type2 == 'eq' && cellValue != value1){
                return false;
            }

            if(type2 == 'ne' && cellValue == value1){
                return false;
            }

            if(type2 == 'gt' && cellValue <= value1){
                return false;
            }

            if(type2 == 'lt' && cellValue >= value1){
                return false;
            }

            if(type2 == 'gte' && cellValue < value1){
                return false;
            }

            if(type2 == 'lte' && cellValue > value1){
                return false;
            }
        }
        else if(type == 'text_content'){
            cellValue = cellValue.toString();
            value1 = value1.toString();

            if(type2 == 'include' && cellValue.indexOf(value1) == -1){
                return false;
            }

            if(type2 == 'exclude' && cellValue.indexOf(value1) > -1){
                return false;
            }

            if(type2 == 'equal' && cellValue != value1){
                return false;
            }
        }
        else if(type == 'text_length'){
            cellValue = cellValue.toString().length;

            value1 = Number(value1);
            value2 = Number(value2);

            if(type2 == 'bw' && (cellValue < value1 || cellValue > value2)){
                return false;
            }

            if(type2 == 'nb' && (cellValue >= value1 && cellValue <= value2)){
                return false;
            }

            if(type2 == 'eq' && cellValue != value1){
                return false;
            }

            if(type2 == 'ne' && cellValue == value1){
                return false;
            }

            if(type2 == 'gt' && cellValue <= value1){
                return false;
            }

            if(type2 == 'lt' && cellValue >= value1){
                return false;
            }

            if(type2 == 'gte' && cellValue < value1){
                return false;
            }

            if(type2 == 'lte' && cellValue > value1){
                return false;
            }
        }
        else if(type == 'date'){
            if(!isdatetime(cellValue)){
                return false;
            }

            if(type2 == 'bw' && (diff(cellValue, value1) < 0 || diff(cellValue, value2) > 0)){
                return false;
            }

            if(type2 == 'nb' && (diff(cellValue, value1) >= 0 && diff(cellValue, value2) <= 0)){
                return false;
            }

            if(type2 == 'eq' && diff(cellValue, value1) != 0){
                return false;
            }

            if(type2 == 'ne' && diff(cellValue, value1) == 0){
                return false;
            }

            if(type2 == 'bf' && diff(cellValue, value1) >= 0){
                return false;
            }

            if(type2 == 'nbf' && diff(cellValue, value1) < 0){
                return false;
            }

            if(type2 == 'af' && diff(cellValue, value1) <= 0){
                return false;
            }

            if(type2 == 'naf' && diff(cellValue, value1) > 0){
                return false;
            }
        }
        else if(type == 'validity'){
            if(type2 == 'card' && !validateIdCard(cellValue)){
                return false;
            }

            if(type2 == 'phone' && !/^1[3456789]\d{9}$/.test(cellValue)){
                return false;
            }
        }

        return true;
    },
    dropdownListShow: function(){
        $("#luckysheet-dataVerification-showHintBox").hide();

        let _this = this;

        let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
        let rowIndex = last.row_focus;
        let colIndex = last.column_focus;

        let row = Store.visibledatarow[rowIndex],
            row_pre = rowIndex == 0 ? 0 : Store.visibledatarow[rowIndex - 1];
        let col = Store.visibledatacolumn[colIndex],
            col_pre = colIndex == 0 ? 0 : Store.visibledatacolumn[colIndex - 1];

        let margeset = menuButton.mergeborer(Store.flowdata, rowIndex, colIndex);
        if(!!margeset){
            row = margeset.row[1];
            row_pre = margeset.row[0];
            
            col = margeset.column[1];
            col_pre = margeset.column[0];
        }

        let item = _this.dataVerification[rowIndex + '_' + colIndex];
        let list = _this.getDropdownList(item.value1);

        let optionHtml = '';
        if (item.type === 'dropdown' && item.type2) {
            // 下拉多选的情况下 将已经选择的标出来
            let cellValue = getcellvalue(rowIndex, colIndex, null);
            let valueArr = isRealNull(cellValue) ? [] : cellValue.split(',');
            list.forEach(i => {
                let checked = valueArr.indexOf(i) !== -1;
                optionHtml += `<div class="dropdown-List-item  luckysheet-mousedown-cancel multi${checked ? ' checked': ''}">${i}</div>`;
            });
        } else {
            list.forEach(i => {
                optionHtml += `<div class="dropdown-List-item luckysheet-mousedown-cancel">${i}</div>`;
            });
        }

        $("#luckysheet-dataVerification-dropdown-List")
        .html(optionHtml)
        .prop("data-index", rowIndex + '_' + colIndex)
        .show()
        .css({
            'width': col - col_pre - 1,
            'left': col_pre,
            'top': row,
        });

        let myh = $("#luckysheet-dataVerification-dropdown-List").outerHeight();
        let currentWinH = $("#luckysheet-cell-main")[0].scrollHeight;

        if(row + myh > currentWinH - 42 - 6){
            $("#luckysheet-dataVerification-dropdown-List").css({
                'top': row_pre - myh,
            })
        }
    },
    getDropdownList: function(txt){
        let list = [];

        if(formula.iscelldata(txt)){
            let range = formula.getcellrange(txt);
            let d = Store.luckysheetfile[getSheetIndex(range.sheetIndex)].data;

            for(let r = range.row[0]; r <= range.row[1]; r++){
                for(let c = range.column[0]; c <= range.column[1]; c++){
                    if(d[r] == null){
                        continue;
                    }

                    let cell = d[r][c];

                    if(cell == null || cell.v == null){
                        continue;
                    }

                    let v = cell.m || cell.v;

                    if(!list.includes(v)){
                        list.push(v);
                    }
                }
            }
        }
        else{
            let arr = txt.split(",");

            for(let i = 0; i < arr.length; i++){
                let v = arr[i];

                if(v.length == 0){
                    continue;
                }

                if(!list.includes(v)){
                    list.push(v);
                }
            }
        }

        return list;
    },
    checkboxChange: function(r, c){
        let _this = this;

        let historyDataVerification = $.extend(true, {}, _this.dataVerification);
        let currentDataVerification = $.extend(true, {}, _this.dataVerification);

        let item = currentDataVerification[r + '_' + c];
        item.checked = !item.checked;

        let value = item.value2;
        if(item.checked){
            value = item.value1;
        }

        let d = editor.deepCopyFlowData(Store.flowdata);
        setcellvalue(r, c, d, value);

        _this.refOfCheckbox(
            historyDataVerification, 
            currentDataVerification, 
            Store.currentSheetIndex, 
            d, 
            { "row": [r, r], "column": [c, c] }
        );
    },
    ref: function(historyDataVerification, currentDataVerification, sheetIndex){
        let _this = this;

        if (Store.clearjfundo) {
            Store.jfundo.length  = 0;

            let redo = {};
            redo["type"] = "updateDataVerification";
            redo["sheetIndex"] = sheetIndex;
            redo["historyDataVerification"] = historyDataVerification;
            redo["currentDataVerification"] = currentDataVerification;
            Store.jfredo.push(redo); 
        }
        
        _this.dataVerification = currentDataVerification;
        Store.luckysheetfile[getSheetIndex(sheetIndex)].dataVerification = currentDataVerification;

        //共享编辑模式
        if(server.allowUpdate){ 
            server.saveParam("all", sheetIndex, currentDataVerification, { "k": "dataVerification" });
        }

        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    },
    refOfCheckbox: function(historyDataVerification, currentDataVerification, sheetIndex, d, range){
        let _this = this;

        if (Store.clearjfundo) {
            Store.jfundo.length  = 0;

            let redo = {};
            redo["type"] = "updateDataVerificationOfCheckbox";
            redo["sheetIndex"] = sheetIndex;
            redo["historyDataVerification"] = historyDataVerification;
            redo["currentDataVerification"] = currentDataVerification;
            redo["data"] = Store.flowdata; 
            redo["curData"] = d;
            redo["range"] = range; 
            Store.jfredo.push(redo); 
        }

        _this.dataVerification = currentDataVerification;
        Store.luckysheetfile[getSheetIndex(sheetIndex)].dataVerification = currentDataVerification;

        Store.flowdata = d;
        editor.webWorkerFlowDataCache(Store.flowdata);//worker存数据
        Store.luckysheetfile[getSheetIndex(sheetIndex)].data = Store.flowdata;

        //共享编辑模式
        if(server.allowUpdate){ 
            server.saveParam("all", sheetIndex, currentDataVerification, { "k": "dataVerification" });
            server.historyParam(Store.flowdata, sheetIndex, range);
        }

        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    },
}

function validateIdCard(idCard) {
    // 15位和18位身份证号码的正则表达式
    var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

    // 如果通过该验证，说明身份证格式正确，但准确性还需计算
    if (regIdCard.test(idCard)) {
        if (idCard.length == 18) {
            var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); // 将前17位加权因子保存在数组里
            var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); // 这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; // 用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11; // 计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17); // 得到最后一位身份证号码

            // 如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return true;
                } else {
                    return false;
                }
            } else {
                // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    } else {
        return false;
    }
}

export default dataVerificationCtrl;