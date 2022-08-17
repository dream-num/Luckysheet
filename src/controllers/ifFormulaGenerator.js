import formula from '../global/formula';
import editor from '../global/editor';
import {luckysheetupdateCell} from './updateCell';
import { modelHTML } from './constant';
import { replaceHtml } from '../utils/util';
import Store from '../store';
import locale from '../locale/locale';

//if公式生成器
const ifFormulaGenerator = {
    singleRangeFocus: false,
    init: function(){
        let _this = this;
        const _locale = locale();
        const locale_formula = _locale.formula;
        const locale_button = _locale.button;
        //点击选择单元格
        $(document).off("focus.IFcompareValue").on("focus.IFcompareValue", "#luckysheet-ifFormulaGenerator-dialog #compareValue", function(){
            $("#luckysheet-modal-dialog-mask").hide();
            _this.singleRangeFocus = true;
        });
        $(document).off("click.IFsingRange").on("click.IFsingRange", "#luckysheet-ifFormulaGenerator-dialog .singRange", function(){
            let value = $("#luckysheet-ifFormulaGenerator-dialog #compareValue").val().trim();

            if(formula.iscelldata(value)){
                _this.singleRangeDialog(value);
            }
            else{
                _this.singleRangeDialog();
            }
        });
        $(document).off("click.IFsingRangeConfirm").on("click.IFsingRangeConfirm", "#luckysheet-ifFormulaGenerator-singleRange-confirm", function(){
            $("#luckysheet-formula-functionrange-select").hide();

            $("#luckysheet-ifFormulaGenerator-singleRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-ifFormulaGenerator-dialog").show();

            let value = $(this).parents("#luckysheet-ifFormulaGenerator-singleRange-dialog").find("input").val().trim();
            $("#luckysheet-ifFormulaGenerator-dialog #compareValue").val(value);

            _this.singleRangeFocus = false;                 
        });
        $(document).off("click.IFsingRangeCancel").on("click.IFsingRangeCancel", "#luckysheet-ifFormulaGenerator-singleRange-cancel", function(){
            $("#luckysheet-formula-functionrange-select").hide();

            $("#luckysheet-ifFormulaGenerator-singleRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-ifFormulaGenerator-dialog").show();

            _this.singleRangeFocus = false;                 
        });
        $(document).off("click.IFsingRangeClose").on("click.IFsingRangeClose", "#luckysheet-ifFormulaGenerator-singleRange-dialog .luckysheet-modal-dialog-title-close", function(){
            $("#luckysheet-formula-functionrange-select").hide();

            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-ifFormulaGenerator-dialog").show();

            _this.singleRangeFocus = false;
        });

        //点击选择范围
        $(document).off("click.IFmultiRange").on("click.IFmultiRange", "#luckysheet-ifFormulaGenerator-dialog .multiRange", function(){
            _this.multiRangeDialog();

            _this.singleRangeFocus = false;
        });
        $(document).off("click.IFmultiRangeConfirm").on("click.IFmultiRangeConfirm", "#luckysheet-ifFormulaGenerator-multiRange-confirm", function(){
            $("#luckysheet-formula-functionrange-select").hide();
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();

            $("#luckysheet-ifFormulaGenerator-multiRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-ifFormulaGenerator-dialog").show();

            let value = $(this).parents("#luckysheet-ifFormulaGenerator-multiRange-dialog").find("input").val().trim();
            let cellrange = formula.getcellrange(value);
            let str_r = cellrange["row"][0], 
                end_r = cellrange["row"][1], 
                str_c = cellrange["column"][0], 
                end_c = cellrange["column"][1];
            let d = editor.deepCopyFlowData(Store.flowdata);//取数据
            let arr = [];
            
            //获取范围内所有数值
            for(let r = str_r; r <= end_r; r++){
                for(let c = str_c; c <= end_c; c++){
                    if(d[r] != null && d[r][c] != null && d[r][c]["ct"] != null && d[r][c]["ct"]["t"] == "n"){
                        arr.push(d[r][c]["v"]);
                    }
                }
            }

            //从大到小排序
            for(let j = 0; j < arr.length; j++){
                for(let k = 0; k < arr.length - 1 - j; k++){
                    if(arr[k] < arr[k + 1]){
                        let temp = arr[k];
                        arr[k] = arr[k + 1];
                        arr[k + 1] = temp;
                    }
                }
            }

            let largeNum = arr[0];
            let smallNum = arr[arr.length - 1];
            
            //赋值
            $("#luckysheet-ifFormulaGenerator-dialog #smallRange").val(smallNum);
            $("#luckysheet-ifFormulaGenerator-dialog #largeRange").val(largeNum);
        });
        $(document).off("click.IFmultiRangeCancel").on("click.IFmultiRangeCancel", "#luckysheet-ifFormulaGenerator-multiRange-cancel", function(){
            $("#luckysheet-formula-functionrange-select").hide();
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();

            $("#luckysheet-ifFormulaGenerator-multiRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-ifFormulaGenerator-dialog").show();
        });
        $(document).off("click.IFmultiRangeClose").on("click.IFmultiRangeClose", "#luckysheet-ifFormulaGenerator-multiRange-dialog .luckysheet-modal-dialog-title-close", function(){
            $("#luckysheet-formula-functionrange-select").hide();
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();

            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-ifFormulaGenerator-dialog").show();
        });

        //选择 划分方式
        $(document).on("change", "#DivisionMethod", function(){
            let value = $(this).find("option:selected").val();

            if(value == "2"){
                $("#DivisionMethodVal").hide();
            }
            else{
                $("#DivisionMethodVal").show();   
            }

            $("#luckysheet-ifFormulaGenerator-dialog .ifList").empty();
        });

        //点击 生成 按钮
        $(document).off("click.IFcreateBtn").on("click.IFcreateBtn", "#luckysheet-ifFormulaGenerator-dialog #createBtn", function(){
            let compareValue = $(this).parents("#luckysheet-ifFormulaGenerator-dialog").find("#compareValue").val().trim();
            if(compareValue == ""){
                _this.info(locale_formula.ifGenTipNotNullValue);
                return;
            }

            let method = $(this).parents("#luckysheet-ifFormulaGenerator-dialog").find("#DivisionMethod option:selected").val();
            if(method == "2"){
                let itemHtml =  '<div class="item">'+
                                    '<input type="number" class="smallNum formulaInputFocus"/>'+
                                    '<select class="operator">'+
                                        '<option value="0"> <= </option>'+
                                        '<option value="1"> < </option>'+
                                    '</select>'+
                                    '<span class="compareValue">'+ compareValue +'</span>'+
                                    '<select class="operator2">'+
                                        '<option value="0"> <= </option>'+
                                        '<option value="1" selected="selected"> < </option>'+
                                    '</select>'+
                                    '<input type="number" class="largeNum formulaInputFocus"/>'+
                                    '<span>'+locale_formula.ifGenTipLableTitile+'：</span>'+
                                    '<input type="text" class="markText formulaInputFocus" value="">'+
                                    '<i class="fa fa-remove" aria-hidden="true"></i>'+
                                '</div>';
                $("#luckysheet-ifFormulaGenerator-dialog .ifList").append(itemHtml);                
            }
            else{
                let smallRange = $(this).parents("#luckysheet-ifFormulaGenerator-dialog").find("#smallRange").val().trim();
                let largeRange = $(this).parents("#luckysheet-ifFormulaGenerator-dialog").find("#largeRange").val().trim();
                let DivisionMethodVal = $(this).parents("#luckysheet-ifFormulaGenerator-dialog").find("#DivisionMethodVal").val().trim();
                
                if(smallRange == "" || largeRange == ""){
                    _this.info(locale_formula.ifGenTipRangeNotforNull);
                    return;
                }
                else if(DivisionMethodVal == ""){
                    _this.info(locale_formula.ifGenTipCutValueNotforNull);
                    return;
                }

                _this.getIfList(compareValue, smallRange, largeRange, method, DivisionMethodVal);
            }
        });

        //点击 删除条件
        $(document).on("click", "#luckysheet-ifFormulaGenerator-dialog .item .fa-remove", function(){
            $(this).parents(".item").remove();
        });

        //点击 确认 按钮
        $(document).off("click.IFconfirmBtn").on("click.IFconfirmBtn", "#luckysheet-ifFormulaGenerator-dialog-confirm", function(){
            let $item = $(this).parents("#luckysheet-ifFormulaGenerator-dialog").find(".ifList .item");
            let str = '';

            $($item.toArray().reverse()).each(function(i, e){
                let smallNum = $(e).find(".smallNum").val().trim();
                let largeNum = $(e).find(".largeNum").val().trim();
                let operator = $(e).find(".operator option:selected").val();
                let operator2 = $(e).find(".operator2 option:selected").val();
                let compareValue = $(e).find(".compareValue").text();

                let markText = $(e).find(".markText").val().trim();
                if(markText == ""){
                    markText = locale_formula.ifGenTipLableTitile + (i + 1);
                }

                if(smallNum == "" && largeNum == ""){
                    return true;
                }

                let s;
                if(operator == "0"){
                    s = compareValue + ">=" + smallNum;
                }
                else{
                    s = compareValue + ">" + smallNum;
                }

                let l;
                if(operator2 == "0"){
                    l = compareValue + "<=" + largeNum;
                }
                else{
                    l = compareValue + "<" + largeNum;
                }

                let a;
                if(i == 0 && largeNum == ""){
                    a = s;
                }
                else if(i == ($item.length - 1) && smallNum == ""){
                    a = l;
                }
                else{
                    a = "and("+s+","+l+")";
                }

                if(i == 0){
                    str = 'if('+ a +',"'+ markText +'")';
                }
                else{
                    str = 'if('+ a +',"'+ markText +'",'+ str +')';
                }
            })
            
            if(str.length == 0){
                _this.info(locale_formula.ifGenTipNotGenCondition);
                return;
            }

            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-ifFormulaGenerator-dialog").hide();

            let last = Store.luckysheet_select_save[Store.luckysheet_select_save.length - 1];
            let row_index = last["row_focus"], 
                col_index = last["column_focus"];
            
            luckysheetupdateCell(row_index, col_index, Store.flowdata);

            $("#luckysheet-rich-text-editor").html("=" + str);
            $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());

            $("#luckysheet-wa-functionbox-confirm").click();
        });

        //info
        $(document).on("click", "#luckysheet-ifFormulaGenerator-info .luckysheet-model-close-btn", function(){
            $("#luckysheet-modal-dialog-mask").show();
        });
        $(document).on("click", "#luckysheet-ifFormulaGenerator-info .luckysheet-modal-dialog-title-close", function(){
            $("#luckysheet-modal-dialog-mask").show();
        });
    },
    ifFormulaDialog: function(fp){
        let _this = this;

        const _locale = locale();
        const locale_formula = _locale.formula;
        const locale_button = _locale.button;

        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-ifFormulaGenerator-dialog").remove();

        let compareValue = "";
        let ifListHtml = '';

        if(!!fp){
            let arr = fp.split("if(");

            for(let i = 1; i < arr.length; i++){
                let txt = arr[i].replace("and(","").replace(/\)/g,"").replace(/\"/g,"");
                let arr2 = txt.split(",");
                arr2 = _this.clearArr(arr2);
                
                compareValue = _this.splitTxt(arr2[0])[0];

                let smallNum, largeNum, markText;
                if(arr2.length == 3){
                    smallNum = _this.splitTxt(arr2[0])[1];
                    largeNum = _this.splitTxt(arr2[1])[2];
                    markText = arr2[2];
                }
                else{
                    smallNum = _this.splitTxt(arr2[0])[1];
                    largeNum = _this.splitTxt(arr2[0])[2];
                    markText = arr2[1];
                }

                let itemHtml =  '<div class="item">'+
                                    '<input type="number" class="smallNum formulaInputFocus" value="'+ smallNum +'"/>'+
                                    '<select class="operator">'+
                                        '<option value="0"> <= </option>'+
                                        '<option value="1"> < </option>'+
                                    '</select>'+
                                    '<span class="compareValue">'+ compareValue +'</span>'+
                                    '<select class="operator2">'+
                                        '<option value="0"> <= </option>'+
                                        '<option value="1" selected="selected"> < </option>'+
                                    '</select>'+
                                    '<input type="number" class="largeNum formulaInputFocus" value="'+ largeNum +'"/>'+
                                    '<span>'+locale_formula.ifGenTipLableTitile+'：</span>'+
                                    '<input type="text" class="markText formulaInputFocus" value="'+ markText +'">'+
                                    '<i class="fa fa-remove" aria-hidden="true"></i>'+
                                '</div>'; 
                ifListHtml += itemHtml;                             
            }
        }

        let content = '<div class="ifAttr">'+
                        '<div class="attrBox">'+
                            '<label for="compareValue"> '+ locale_formula.ifGenCompareValueTitle +' </label>'+
                            '<div class="inpBox">'+
                                '<input id="compareValue" class="formulaInputFocus" value="'+ compareValue +'"/>'+
                                '<i class="singRange fa fa-table" aria-hidden="true" title="'+ locale_formula.ifGenSelectCellTitle +'"></i>'+
                            '</div>'+
                        '</div>'+
                        '<div class="attrBox">'+
                            '<label for="smallRange"> '+ locale_formula.ifGenRangeTitle +' </label>'+
                            '<input type="number" id="smallRange" class="formulaInputFocus"/>'+
                            '<span class="text"> '+ locale_formula.ifGenRangeTo +' </span>'+
                            '<input type="number" id="largeRange" class="formulaInputFocus"/>'+
                            '<div id="rangeAssess">'+
                                '<span> '+ locale_formula.ifGenRangeEvaluate +' </span>'+
                                '<i class="multiRange fa fa-table" aria-hidden="true" title="'+ locale_formula.ifGenSelectRangeTitle +'"></i>'+
                            '</div>'+
                        '</div>'+
                        '<div class="attrBox">'+
                            '<label for="DivisionMethod"> '+ locale_formula.ifGenCutWay +' </label>'+
                            '<select id="DivisionMethod">'+
                                '<option value="0"> '+ locale_formula.ifGenCutSame +' </option>'+
                                '<option value="1"> '+ locale_formula.ifGenCutNpiece +' </option>'+
                                '<option value="2"> '+ locale_formula.ifGenCutCustom +' </option>'+
                            '</select>'+
                            '<input id="DivisionMethodVal" class="formulaInputFocus"/>'+
                            '<div id="createBtn"> '+ locale_formula.ifGenCutSame +' </div>'+
                        '</div>'+
                      '</div>'+
                      '<div class="ifList">'+ifListHtml+'</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-ifFormulaGenerator-dialog", 
            "addclass": "luckysheet-ifFormulaGenerator-dialog", 
            "title": locale_formula.ifGenerate, 
            "content": content, 
            "botton": '<button id="luckysheet-ifFormulaGenerator-dialog-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button class="btn btn-default luckysheet-model-close-btn">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-ifFormulaGenerator-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 590).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-ifFormulaGenerator-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
    },
    clearArr: function(arr){
        for(let i = 0; i < arr.length; i++){
            if(arr[i] == "" || arr[i] == null || arr[i] == undefined){
                arr.splice(i, 1);
            }
        }

        return arr;
    },
    splitTxt: function(txt){
        let compareValue, smallNum, largeNum;
        
        if(txt.indexOf(">=") != -1){
            compareValue = txt.split(">=")[0];
            smallNum = txt.split(">=")[1];

            return [compareValue, smallNum, largeNum];
        }
        else if(txt.indexOf(">") != -1){
            compareValue = txt.split(">")[0];
            smallNum = txt.split(">")[1];

            return [compareValue, smallNum, largeNum];
        }
        else if(txt.indexOf("<=") != -1){
            compareValue = txt.split("<=")[0];
            largeNum = txt.split("<=")[1];

            return [compareValue, smallNum, largeNum];
        }
        else if(txt.indexOf("<") != -1){
            compareValue = txt.split("<")[0];
            largeNum = txt.split("<")[1];

            return [compareValue, smallNum, largeNum];
        }
    },
    singleRangeDialog: function(value){
        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-ifFormulaGenerator-dialog").hide();
        $("#luckysheet-ifFormulaGenerator-singleRange-dialog").remove();

        const _locale = locale();
        const locale_formula = _locale.formula;
        const locale_button = _locale.button;

        if(value == null){
            value = "";
        }

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-ifFormulaGenerator-singleRange-dialog", 
            "addclass": "luckysheet-ifFormulaGenerator-singleRange-dialog", 
            "title": locale_formula.ifGenTipSelectCell, 
            "content": '<input readonly="readonly" placeholder="'+locale_formula.ifGenTipSelectCellPlace+'" value="'+ value +'">', 
            "botton": '<button id="luckysheet-ifFormulaGenerator-singleRange-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button id="luckysheet-ifFormulaGenerator-singleRange-cancel" class="btn btn-default">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-ifFormulaGenerator-singleRange-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 400).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-ifFormulaGenerator-singleRange-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
    },
    multiRangeDialog: function(){
        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-ifFormulaGenerator-dialog").hide();
        $("#luckysheet-ifFormulaGenerator-multiRange-dialog").remove();

        const _locale = locale();
        const locale_formula = _locale.formula;
        const locale_button = _locale.button;

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-ifFormulaGenerator-multiRange-dialog", 
            "addclass": "luckysheet-ifFormulaGenerator-multiRange-dialog", 
            "title": locale_formula.ifGenTipSelectRange, 
            "content": '<input readonly="readonly" placeholder="'+locale_formula.ifGenTipSelectRangePlace+'" value="">', 
            "botton": '<button id="luckysheet-ifFormulaGenerator-multiRange-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button id="luckysheet-ifFormulaGenerator-multiRange-cancel" class="btn btn-default">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-ifFormulaGenerator-multiRange-dialog").find(".luckysheet-modal-dialog-content").css("min-width", 400).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-ifFormulaGenerator-multiRange-dialog").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
    },
    getIfList: function(compareValue, smallRange, largeRange, method, methodVal){
        const locale_formula = locale().formula;

        $("#luckysheet-ifFormulaGenerator-dialog .ifList").empty();

        smallRange = parseInt(smallRange);
        largeRange = parseInt(largeRange);
        methodVal = parseInt(methodVal);

        let arr = [];

        if(method == "0"){
            let len = Math.ceil((largeRange - smallRange) / methodVal); 
            for(let i = 0; i <= len; i++){
                let num = smallRange + methodVal * i;
                if(i == 0 || num >= largeRange){
                    arr.push("");
                }
                else{
                    arr.push(num);
                }
            }
            
        }
        else if(method == "1"){
            let addnum = Math.ceil((largeRange - smallRange) / methodVal);
            for(let i = 0; i <= methodVal; i++){
                let num = smallRange + addnum * i;
                if(i == 0 || num >= largeRange){
                    arr.push("");
                }
                else{
                    arr.push(num);
                }
            }
        }
        for(let j = 0; j < arr.length - 1; j++){
            let markText;
            if(j == 0){
                markText = "小于" + arr[j + 1];
            }
            else if(j == arr.length - 2){
                markText = "大于等于" + arr[j];
            }
            else{
                markText = arr[j] + "到" + arr[j + 1];
            }

            let itemHtml =  '<div class="item">'+
                                '<input type="number" class="smallNum formulaInputFocus" value="'+ arr[j] +'"/>'+
                                '<select class="operator">'+
                                    '<option value="0"> <= </option>'+
                                    '<option value="1"> < </option>'+
                                '</select>'+
                                '<span class="compareValue">'+ compareValue +'</span>'+
                                '<select class="operator2">'+
                                    '<option value="0"> <= </option>'+
                                    '<option value="1" selected="selected"> < </option>'+
                                '</select>'+
                                '<input type="number" class="largeNum formulaInputFocus" value="'+ arr[j + 1] +'"/>'+
                                '<span>'+locale_formula.ifGenTipLableTitile+'：</span>'+
                                '<input type="text" class="markText formulaInputFocus" value="'+ markText +'">'+
                                '<i class="fa fa-remove" aria-hidden="true"></i>'+
                            '</div>';
            $("#luckysheet-ifFormulaGenerator-dialog .ifList").append(itemHtml);
        }
    },
    info: function(title){
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-ifFormulaGenerator-info").remove();

        const _locale = locale();
        const locale_button = _locale.button;

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-ifFormulaGenerator-info", 
            "addclass": "", 
            "title": title, 
            "content": "", 
            "botton": '<button class="btn btn-default luckysheet-model-close-btn">&nbsp;&nbsp;'+locale_button.close+'&nbsp;&nbsp;</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-ifFormulaGenerator-info").find(".luckysheet-modal-dialog-content").css("min-width", 300).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-ifFormulaGenerator-info").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
    }
}

export default ifFormulaGenerator;