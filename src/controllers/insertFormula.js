import { luckysheet_getcelldata } from '../function/func';
// import functionlist from '../function/functionlist';
// import Store.luckysheet_function from '../function/Store.luckysheet_function';
import formula from '../global/formula';
import { isRealNum, isRealNull } from '../global/validate';
import { modelHTML } from './constant';
import { luckysheet_count_show } from './select';
import { replaceHtml, getObjType } from '../utils/util';
import Store from '../store';
import locale from '../locale/locale';

//插入函数
const insertFormula = {
    init: function(){
        let _this = this;
        let _locale = locale();
        let locale_formulaMore = _locale.formulaMore;
        let locale_button = _locale.button;

        $(document).off("keyup.fxSFLI").on("keyup.fxSFLI", "#searchFormulaListInput", function(){
            $("#formulaTypeList").empty();
            let txt = $(this).val().toUpperCase();
            let functionlist = Store.functionlist;

            if(txt == ""){
                //若没有查找内容则根据类别筛选
                _this.formulaListByType($("#formulaTypeSelect option:selected").val());
            }
            else{
                for(let i = 0; i < functionlist.length; i++){
                    if(/^[a-zA-Z]+$/.test(txt)){
                        if(functionlist[i].n.indexOf(txt) != "-1"){
                            $('<div class="listBox" name="'+ functionlist[i].n +'"><span>'+ functionlist[i].n +'</span><span>'+ functionlist[i].a +'</span></div>').appendTo($("#formulaTypeList"));
                        }
                    }
                    else if(functionlist[i].a.indexOf(txt) != "-1"){
                        $('<div class="listBox" name="'+ functionlist[i].n +'"><span>'+ functionlist[i].n +'</span><span>'+ functionlist[i].a +'</span></div>').appendTo($("#formulaTypeList"));
                    }
                }
            }
            
            $("#formulaTypeList .listBox:first-child").addClass("on"); //默认公式列表第一个为选中状态
        });

        $(document).off("change.fxFormulaTS").on("change.fxFormulaTS", "#formulaTypeSelect", function(){
            let type = $("#formulaTypeSelect option:selected").val();
            _this.formulaListByType(type);
        });

        $(document).off("click.fxListbox").on("click.fxListbox", "#formulaTypeList .listBox", function(){
            $(this).addClass("on").siblings().removeClass("on");
        });

        //选择公式后弹出参数栏弹框
        $(document).off("click.fxFormulaCf").on("click.fxFormulaCf", "#luckysheet-search-formula-confirm", function(){
            let formula = $("#luckysheet-search-formula .listBox.on").attr("name");
            let formulaTxt = '<span dir="auto" class="luckysheet-formula-text-color">=</span><span dir="auto" class="luckysheet-formula-text-color">'+ formula.toUpperCase() +'</span><span dir="auto" class="luckysheet-formula-text-color">(</span><span dir="auto" class="luckysheet-formula-text-color">)</span>';
            
            $("#luckysheet-rich-text-editor").html(formulaTxt);
            $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());

            _this.formulaParmDialog(formula);
        });

        //公式参数框
        $(document).off("focus.fxParamInput").on("focus.fxParamInput", "#luckysheet-search-formula-parm .parmBox input", function(){
            let parmIndex = $(this).parents(".parmBox").index();
            formula.data_parm_index = parmIndex;

            let formulatxt = $(this).parents("#luckysheet-search-formula-parm").find(".luckysheet-modal-dialog-title-text").text();
            let parmLen = Store.luckysheet_function[formulatxt].p.length;

            let parmDetail, parmRepeat;
            if(parmIndex >= parmLen){
                parmDetail = Store.luckysheet_function[formulatxt].p[parmLen - 1].detail;
                parmRepeat = Store.luckysheet_function[formulatxt].p[parmLen - 1].repeat;
            }
            else{
                parmDetail = Store.luckysheet_function[formulatxt].p[parmIndex].detail;
                parmRepeat = Store.luckysheet_function[formulatxt].p[parmIndex].repeat;
            }

            //参数选区显示，参数值显示
            _this.parmTxtShow($(this).val());
            
            //计算结果
            _this.functionStrCompute();
            
            //参数名称和释义切换
            $("#luckysheet-search-formula-parm .parmDetailsBox").empty();

            let parmName = $(this).parents(".parmBox").find(".name").text();
            $('<span>'+ parmName +':</span><span>'+ parmDetail +'</span>').appendTo($("#luckysheet-search-formula-parm .parmDetailsBox"));
            
            //公式参数可自增（参数自增最多5个）
            if(parmRepeat == "y"){
                let parmCount = $("#luckysheet-search-formula-parm .parmBox").length;

                if(parmCount < 5 && parmIndex == (parmCount - 1)){
                    $('<div class="parmBox"><div class="name">'+ locale_formulaMore.valueTitle +''+ (parmCount + 1) +'</div><div class="txt"><input class="formulaInputFocus" /><i class="fa fa-table" aria-hidden="true" title="'+locale_formulaMore.tipSelectDataRange+'"></i></div><div class="val">=</div></div>').appendTo($("#luckysheet-search-formula-parm .parmListBox"));
                }
            }
        });

        $(document).off("blur.fxParamInput").on("blur.fxParamInput", "#luckysheet-search-formula-parm .parmBox input", function(){
            let txt = $(this).val();

            if(formula.getfunctionParam(txt).fn == null && !formula.iscelldata(txt)){
                if(!isRealNum(txt) && txt != "" && txt.length <= 2 && txt.indexOf('"') != 0 && txt.lastIndexOf('"') != 0){
                    txt = '"' + txt + '"';
                    $(this).val(txt);

                    _this.parmTxtShow(txt);
                    _this.functionStrCompute();
                }
            }
        });
        
        $(document).off("keyup.fxParamInput").on("keyup.fxParamInput", "#luckysheet-search-formula-parm .parmBox input", function(){
            //参数选区显示，参数值显示
            _this.parmTxtShow($(this).val());

            //计算结果
            _this.functionStrCompute();
        });

        //点击图标选取数据范围
        $(document).off("click.fxParamI").on("click.fxParamI", "#luckysheet-search-formula-parm .parmBox i", function(){
            formula.data_parm_index = $(this).parents(".parmBox").index();
            
            //选取范围弹出框
            $("#luckysheet-search-formula-parm").hide();
            $("#luckysheet-modal-dialog-mask").hide();

            $("#luckysheet-search-formula-parm-select").remove();
            
            if($(this).parents(".parmBox").find(".txt input").val() == ""){
                $("body").append(replaceHtml(modelHTML, { 
                    "id": "luckysheet-search-formula-parm-select", 
                    "addclass": "luckysheet-search-formula-parm-select", 
                    "title": locale_formulaMore.tipSelectDataRange, 
                    "content": "<input id='luckysheet-search-formula-parm-select-input' class='luckysheet-datavisual-range-container' style='font-size: 14px;padding:5px;max-width:none;' spellcheck='false' aria-label='"+ locale_formulaMore.tipDataRangeTile +"' readonly='true' placeholder='"+ locale_formulaMore.tipDataRangeTile +"'>", 
                    "botton": '<button id="luckysheet-search-formula-parm-select-confirm" class="btn btn-primary">'+locale_button.confirm+'</button>', 
                    "style": "z-index:100003" 
                }));
            }
            else{
                $("body").append(replaceHtml(modelHTML, { 
                    "id": "luckysheet-search-formula-parm-select", 
                    "addclass": "luckysheet-search-formula-parm-select", 
                    "title": locale_formulaMore.tipSelectDataRange, 
                    "content": "<input id='luckysheet-search-formula-parm-select-input' class='luckysheet-datavisual-range-container' style='font-size: 14px;padding:5px;max-width:none;' spellcheck='false' aria-label='"+ locale_formulaMore.tipDataRangeTile +"' readonly='true' value='"+ $(this).parents(".parmBox").find(".txt input").val() +"'>", 
                    "botton": '<button id="luckysheet-search-formula-parm-select-confirm" class="btn btn-primary">'+locale_button.confirm+'</button>', 
                    "style": "z-index:100003" 
                }));
            }

            let $t = $("#luckysheet-search-formula-parm-select").find(".luckysheet-modal-dialog-content").css("min-width", 300).end(), 
                myh = $t.outerHeight(), 
                myw = $t.outerWidth();
            let winw = $(window).width(), winh = $(window).height();
            let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
            $("#luckysheet-search-formula-parm-select").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
            
            //参数选区虚线框
            _this.parmTxtShow($(this).parents(".parmBox").find(".txt input").val());
        });

        //点击确定
        $(document).off("click.fxParamCf").on("click.fxParamCf", "#luckysheet-search-formula-parm-confirm", function(){
            $("#luckysheet-wa-functionbox-confirm").click();
        });

        //选取范围后传回参数栏弹框
        $(document).off("click.fxParamSelectCf").on("click.fxParamSelectCf", "#luckysheet-search-formula-parm-select-confirm", function(){
            let parmIndex = $("#luckysheet-search-formula-parm-select-input").attr("data_parm_index");

            $("#luckysheet-search-formula-parm-select").hide();
            $("#luckysheet-search-formula-parm").show();
            $("#luckysheet-search-formula-parm .parmBox").eq(parmIndex).find(".txt input").focus();
        });
    },
    formulaListDialog: function(){
        let _this = this;

        let _locale = locale();
        let locale_formulaMore = _locale.formulaMore;
        let locale_button = _locale.button

        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-search-formula").remove();

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-search-formula", 
            "addclass": "luckysheet-search-formula", 
            "title": "", 
            "content": "<div class='inpbox'><label for='searchFormulaListInput'>"+ locale_formulaMore.findFunctionTitle +"：</label><input class='formulaInputFocus' id='searchFormulaListInput' placeholder='"+ locale_formulaMore.tipInputFunctionName +"' spellcheck='false'/></div><div class='selbox'><label>"+locale_formulaMore.selectCategory+"：</label><select id='formulaTypeSelect'><option value='0'>"+locale_formulaMore.Math+"</option><option value='1'>"+locale_formulaMore.Statistical+"</option><option value='2'>"+locale_formulaMore.Lookup+"</option><option value='3'>"+locale_formulaMore.luckysheet+"</option><option value='4'>"+locale_formulaMore.dataMining+"</option><option value='5'>"+locale_formulaMore.Database+"</option><option value='6'>"+locale_formulaMore.Date+"</option><option value='7'>"+locale_formulaMore.Filter+"</option><option value='8'>"+locale_formulaMore.Financial+"</option><option value='9'>"+locale_formulaMore.Engineering+"</option><option value='10'>"+locale_formulaMore.Logical+"</option><option value='11'>"+locale_formulaMore.Operator+"</option><option value='12'>"+locale_formulaMore.Text+"</option><option value='13'>"+locale_formulaMore.Parser+"</option><option value='14'>"+locale_formulaMore.Array+"</option><option value='-1'>"+locale_formulaMore.other+"</option></select></div><div class='listbox'><label>"+locale_formulaMore.selectFunctionTitle+"：</label><div id='formulaTypeList'></div></div>", 
            "botton": '<button id="luckysheet-search-formula-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button class="btn btn-default luckysheet-model-close-btn">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-search-formula").find(".luckysheet-modal-dialog-content").css("min-width", 300).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-search-formula").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3, "user-select": "none" }).show();
        
        _this.formulaListByType("0"); //默认公式列表为类型0
        $("#searchFormulaListInput").focus();
    },
    formulaListByType: function(type){
        $("#formulaTypeList").empty();
        let functionlist = Store.functionlist;
                    
        for(let i = 0; i < functionlist.length; i++){
            if((type == "-1" && functionlist[i].t > 14) || functionlist[i].t == type){
                $('<div class="listBox" name="'+ functionlist[i].n +'"><span>'+ functionlist[i].n +'</span><span>'+ functionlist[i].a +'</span></div>').appendTo($("#formulaTypeList"));
            }
        }

        $("#formulaTypeList .listBox:first-child").addClass("on"); //默认公式列表第一个为选中状态
    },
    formulaParmDialog: function(formulaTxt, parm){ //参数弹出框
        let parm_title = '',
            parm_content = '',
            parm_list_content = '';

        let _locale = locale();
        let locale_formulaMore = _locale.formulaMore;
        let locale_button = _locale.button;
        let functionlist = Store.functionlist;

        for(let i = 0; i < functionlist.length; i++){
            if(functionlist[i].n == formulaTxt.toUpperCase()){
                parm_title = functionlist[i].n;

                for(let j = 0; j < functionlist[i].p.length; j++){
                    if(parm == null){
                        //无参数
                        parm_list_content += '<div class="parmBox">'+
                                                '<div class="name">'+ functionlist[i].p[j].name +'</div>'+
                                                '<div class="txt">'+
                                                    '<input class="formulaInputFocus" spellcheck="false"/>' +
                                                    '<i class="fa fa-table" aria-hidden="true" title="'+locale_formulaMore.tipSelectDataRange+'"></i>'+
                                                '</div>'+
                                                '<div class="val">=</div>'+
                                             '</div>';
                    }
                    else{
                        //有参数
                        if(parm[j] == null){
                            parm[j] = "";
                        }

                        parm_list_content += '<div class="parmBox">'+
                                                '<div class="name">'+ functionlist[i].p[j].name +'</div>'+
                                                '<div class="txt">'+
                                                    '<input class="formulaInputFocus" value="'+ parm[j] +'" spellcheck="false"/>'+
                                                    '<i class="fa fa-table" aria-hidden="true" title="'+locale_formulaMore.tipSelectDataRange+'"></i>'+
                                                '</div>'+
                                                '<div class="val">=</div>'+
                                             '</div>';
                    }
                }

                parm_content =  '<div>'+
                                    '<div class="parmListBox">'+ parm_list_content +'</div>'+
                                    '<div class="formulaDetails">'+ functionlist[i].d +'</div>'+
                                    '<div class="parmDetailsBox"></div>'+
                                    '<div class="result">'+locale_formulaMore.calculationResult+' = <span></span></div>'+
                                '</div>';
            }
        }

        $("#luckysheet-search-formula").hide();
        $("#luckysheet-modal-dialog-mask").hide();
        
        $("#luckysheet-search-formula-parm").remove();
        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-search-formula-parm", 
            "addclass": "luckysheet-search-formula-parm", 
            "title": parm_title, 
            "content": parm_content, 
            "botton": '<button id="luckysheet-search-formula-parm-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button class="btn btn-default luckysheet-model-close-btn">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-search-formula-parm").find(".luckysheet-modal-dialog-content").css("min-width", 300).end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-search-formula-parm").css({ "left": (winw + scrollLeft - myw) / 2, "top": (winh + scrollTop - myh) / 3 }).show();
        
        //参数栏第一个参数聚焦，显示选取虚线框
        $("#luckysheet-search-formula-parm .parmBox:eq(0) input").focus();

        //遍历参数，有参数显示值，无显示空
        $("#luckysheet-search-formula-parm .parmBox").each(function(index,e){
            let parmtxt = $(e).find(".txt input").val();
            
            if(formula.getfunctionParam(parmtxt).fn == null){ //参数不是公式
                if(formula.iscelldata(parmtxt)){ //参数是选区
                    let txtdata = luckysheet_getcelldata(parmtxt).data;

                    if(getObjType(txtdata) == "array"){ //参数为多个单元格选区
                        let txtArr = [];
                        
                        for(let i = 0; i < txtdata.length; i++){
                            for(let j = 0; j < txtdata[i].length; j++){
                                let cell = txtdata[i][j];

                                if(cell == null || isRealNull(cell.v)){
                                    txtArr.push(null);
                                }
                                else{
                                    txtArr.push(cell.v);
                                }
                            }
                        }

                        $("#luckysheet-search-formula-parm .parmBox").eq(index).find(".val").text(" = {"+ txtArr.join(",") +"}");
                    }
                    else{ //参数为单个单元格选区
                        $("#luckysheet-search-formula-parm .parmBox").eq(index).find(".val").text(" = {"+ txtdata.v +"}");
                    }
                }
                else{ //参数不是选区
                    $("#luckysheet-search-formula-parm .parmBox").eq(index).find(".val").text(" = {"+ parmtxt +"}");
                }
            }
            else{ //参数是公式
                $("#luckysheet-search-formula-parm .parmBox").eq(index).find(".val").text(" = {"+ (new Function("return " + $.trim(formula.functionParserExe("=" + parmtxt)))()) +"}");
            }
        })

        $("#luckysheet-formula-functionrange .luckysheet-formula-functionrange-highlight").remove();                        
        formula.data_parm_index = 0;
        formula.rangestart = true;
    },
    parmTxtShow: function(parmtxt){
        if(formula.getfunctionParam(parmtxt).fn == null){ //参数不是公式
            if(formula.iscelldata(parmtxt)){ //参数是选区
                let cellrange = formula.getcellrange(parmtxt);
                let r1 = cellrange.row[0], 
                    r2 = cellrange.row[1], 
                    c1 = cellrange.column[0], 
                    c2 = cellrange.column[1];
                let row = Store.visibledatarow[r2], 
                    row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
                let col = Store.visibledatacolumn[c2], 
                    col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

                $("#luckysheet-formula-functionrange-select").css({ 
                    "left": col_pre, 
                    "width": col - col_pre - 1, 
                    "top": row_pre, 
                    "height": row - row_pre - 1 
                }).show();
                $("#luckysheet-formula-help-c").hide();

                luckysheet_count_show(col_pre, row_pre, col - col_pre - 1, row - row_pre - 1, cellrange.row, cellrange.column);

                let txtdata = luckysheet_getcelldata(parmtxt).data;
                if(getObjType(txtdata) == "array"){ //参数为多个单元格选区
                    let txtArr = [];
                    
                    for(let i = 0; i < txtdata.length; i++){
                        for(let j = 0; j < txtdata[i].length; j++){
                            let cell = txtdata[i][j];

                            if(cell == null || isRealNull(cell.v)){
                                txtArr.push(null);
                            }
                            else{
                                txtArr.push(cell.v);
                            }
                        }
                    }

                    $("#luckysheet-search-formula-parm .parmBox").eq(formula.data_parm_index).find(".val").text(" = {"+ txtArr.join(",") +"}");
                }
                else{ //参数为单个单元格选区
                    $("#luckysheet-search-formula-parm .parmBox").eq(formula.data_parm_index).find(".val").text(" = {"+ txtdata.v +"}");
                }
            }
            else{ //参数不是选区
                $("#luckysheet-search-formula-parm .parmBox").eq(formula.data_parm_index).find(".val").text(" = {"+ parmtxt +"}");

                $("#luckysheet-formula-functionrange-select").hide();
            }
        }
        else{   
            //参数是公式
            let txt;
            for(let k = 0; k < formula.getfunctionParam(parmtxt).param.length; k++){
                if(formula.iscelldata(formula.getfunctionParam(parmtxt).param[k])){
                    txt = formula.getfunctionParam(parmtxt).param[k];
                    break;
                }
            }

            let cellrange = formula.getcellrange(txt);
            let r1 = cellrange.row[0], 
                r2 = cellrange.row[1], 
                c1 = cellrange.column[0], 
                c2 = cellrange.column[1];
            let row = Store.visibledatarow[r2], 
                row_pre = r1 - 1 == -1 ? 0 : Store.visibledatarow[r1 - 1];
            let col = Store.visibledatacolumn[c2], 
                col_pre = c1 - 1 == -1 ? 0 : Store.visibledatacolumn[c1 - 1];

            $("#luckysheet-formula-functionrange-select").css({ 
                "left": col_pre, 
                "width": col - col_pre - 1, 
                "top": row_pre, 
                "height": row - row_pre - 1 
            }).show();
            $("#luckysheet-formula-help-c").hide();

            luckysheet_count_show(col_pre, row_pre, col - col_pre - 1, row - row_pre - 1, cellrange.row, cellrange.column);

            $("#luckysheet-search-formula-parm .parmBox").eq(formula.data_parm_index).find(".val").text(" = {"+ (new Function("return " + $.trim(formula.functionParserExe("=" + parmtxt)))()) +"}");
        }
    },
    functionStrCompute: function(){
        let isVal = true; //参数不为空
        let parmValArr = []; //参数值集合
        let lvi = -1; //最后一个有值的参数索引

        let formulatxt = $("#luckysheet-search-formula-parm").find(".luckysheet-modal-dialog-title-text").text();
        let p = Store.luckysheet_function[formulatxt].p;
        
        $("#luckysheet-search-formula-parm .parmBox").each(function(i, e){
            let parmtxt = $(e).find(".txt input").val();

            let parmRequire;
            if(i < p.length){
                parmRequire = p[i].require;
            }
            else{
                parmRequire = p[p.length - 1].require;
            }

            if(parmtxt == "" && parmRequire == "m"){
                isVal = false;
            }

            if(parmtxt != ""){
                lvi = i;
            }
        });

        //单元格显示
        let functionHtmlTxt;
        if(lvi == -1){
            functionHtmlTxt = "=" + $("#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text").text() + "()"; 
        }
        else if(lvi == 0){
            functionHtmlTxt = "=" + $("#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text").text() + "(" + $("#luckysheet-search-formula-parm .parmBox").eq(0).find(".txt input").val() + ")"; 
        }
        else{
            for(let j = 0; j <= lvi; j++){
                parmValArr.push($("#luckysheet-search-formula-parm .parmBox").eq(j).find(".txt input").val());
            }

            functionHtmlTxt = "=" + $("#luckysheet-search-formula-parm .luckysheet-modal-dialog-title-text").text() + "(" + parmValArr.join(",") + ")";    
        }

        let function_str = formula.functionHTMLGenerate(functionHtmlTxt);
        $("#luckysheet-rich-text-editor").html(function_str);
        $("#luckysheet-functionbox-cell").html($("#luckysheet-rich-text-editor").html());
        
        if(isVal){ //公式计算
            let fp = $.trim(formula.functionParserExe($("#luckysheet-rich-text-editor").text()));
            
            let result = null;

            try {
                result = new Function("return " + fp)();
            } 
            catch (e) {
                result = formula.error.n;
            }

            $("#luckysheet-search-formula-parm .result span").text(result);
        }
    }
}

export default insertFormula;