import { getSheetIndex, getRangetxt } from '../methods/get';
import { replaceHtml, getObjType, chatatABC } from '../utils/util';
import formula from '../global/formula';
import { isRealNull, isEditMode } from '../global/validate';
import tooltip from '../global/tooltip';
import { luckysheetrefreshgrid } from '../global/refresh';
import { getcellvalue } from '../global/getdata';
import { genarate } from '../global/format';
import { modelHTML, luckysheet_CFiconsImg } from './constant';
import server from './server';
import { selectionCopyShow } from './select';
import sheetmanage from './sheetmanage';
import Store from '../store';

//条件格式
const conditionformat = {
    fileClone: [],
    editorRule: null, //{"sheetIndex": sheetIndex,"itemIndex": itemIndex,"data": luckysheetfile[sheetIndex].luckysheet_conditionformat_save[itemIndex]}
    ruleTypeHtml: '<div class="ruleTypeBox"><div class="ruleTypeItem"><span class="icon">► </span><span>基于各自值设置所有单元格的格式</span></div><div class="ruleTypeItem"><span class="icon">► </span><span>只为包含以下内容的单元格设置格式</span></div><div class="ruleTypeItem"><span class="icon">► </span><span>仅对排名靠前或靠后的数值设置格式</span></div><div class="ruleTypeItem"><span class="icon">► </span><span>仅对高于或低于平均值的数值设置格式</span></div><div class="ruleTypeItem"><span class="icon">► </span><span>仅对唯一值或重复值设置格式</span></div></div>',
    textCellColorHtml: '<div id="textCellColor"><div class="colorbox"><input id="checkTextColor" type="checkbox" checked="checked"><label for="checkTextColor">文本颜色：</label><input id="textcolorshow" data-tips="文本颜色" data-func="background" class="luckysheet-conditionformat-config-color" type="text" value="#9c0006" style="display: none;"></div><div class="colorbox"><input id="checkCellColor" type="checkbox" checked="checked"><label for="checkCellColor">单元格颜色：</label><input id="cellcolorshow" data-tips="单元格颜色" data-func="background" class="luckysheet-conditionformat-config-color" type="text" value="#ffc7ce" style="display: none;"></div></div>',
    selectRange: [],
    selectStatus: false,
    dataBarList: [
        { "format": ["#638ec6", "#ffffff"] },  //蓝-白渐变 数据条
        { "format": ["#63c384", "#ffffff"] },  //绿-白渐变 数据条
        { "format": ["#ff555a", "#ffffff"] },  //红-白渐变 数据条
        { "format": ["#ffb628", "#ffffff"] },  //橙-白渐变 数据条
        { "format": ["#008aef", "#ffffff"] },  //浅蓝-白渐变 数据条
        { "format": ["#d6007b", "#ffffff"] },  //紫-白渐变 数据条

        { "format": ["#638ec6"] },  //蓝色 数据条
        { "format": ["#63c384"] },  //绿色 数据条
        { "format": ["#ff555a"] },  //红色 数据条
        { "format": ["#ffb628"] },  //橙色 数据条
        { "format": ["#008aef"] },  //浅蓝色 数据条
        { "format": ["#d6007b"] }   //紫色 数据条
    ],
    colorGradationList: [
        { "format": ["rgb(99, 190, 123)", "rgb(255, 235, 132)", "rgb(248, 105, 107)"] },  //绿-黄-红色阶
        { "format": ["rgb(248, 105, 107)", "rgb(255, 235, 132)", "rgb(99, 190, 123)"] },  //红-黄-绿色阶

        { "format": ["rgb(99, 190, 123)", "rgb(252, 252, 255)", "rgb(248, 105, 107)"] },  //绿-白-红色阶
        { "format": ["rgb(248, 105, 107)", "rgb(252, 252, 255)", "rgb(99, 190, 123)"] },  //红-白-绿色阶
        
        { "format": ["rgb(90, 138, 198)", "rgb(252, 252, 255)", "rgb(248, 105, 107)"] },  //蓝-白-红色阶
        { "format": ["rgb(248, 105, 107)", "rgb(252, 252, 255)", "rgb(90, 138, 198)"] },  //红-白-蓝色阶
        
        { "format": ["rgb(252, 252, 255)", "rgb(248, 105, 107)"] },  //白-红色阶
        { "format": ["rgb(248, 105, 107)", "rgb(252, 252, 255)"] },  //红-白色阶

        { "format": ["rgb(99, 190, 123)", "rgb(252, 252, 255)"] },  //绿-白色阶
        { "format": ["rgb(252, 252, 255)", "rgb(99, 190, 123)"] },  //白-绿色阶

        { "format": ["rgb(99, 190, 123)", "rgb(255, 235, 132)"] },  //绿-黄色阶
        { "format": ["rgb(255, 235, 132)", "rgb(99, 190, 123)"] }   //黄-绿色阶
    ],
    init: function(){
        let _this = this;

        // 管理规则
        $(document).off("change.CFchooseSheet").on("change.CFchooseSheet", "#luckysheet-administerRule-dialog .chooseSheet", function(){
            let index = $("#luckysheet-administerRule-dialog .chooseSheet option:selected").val();
            _this.getConditionRuleList(index);
        });
        $(document).off("click.CFadministerRuleItem").on("click.CFadministerRuleItem", "#luckysheet-administerRule-dialog .ruleList .listBox .item", function(){
            $(this).addClass("on").siblings().removeClass("on");
        });

        $(document).off("click.CFadministerRuleConfirm").on("click.CFadministerRuleConfirm", "#luckysheet-administerRule-dialog-confirm", function(){
            //保存之前的规则
            let fileH = $.extend(true, [], Store.luckysheetfile);
            let historyRules = _this.getHistoryRules(fileH);
            
            //保存当前的规则
            let fileClone = $.extend(true, [], _this.fileClone);
            for(let c = 0; c < fileClone.length; c++){
                let sheetIndex = fileClone[c]["index"];
                Store.luckysheetfile[getSheetIndex(sheetIndex)]["luckysheet_conditionformat_save"] = fileClone[getSheetIndex(sheetIndex)]["luckysheet_conditionformat_save"];
            }

            let fileC = $.extend(true, [], Store.luckysheetfile);
            let currentRules = _this.getCurrentRules(fileC);
            
            //刷新一次表格
            _this.ref(historyRules, currentRules);
            
            //隐藏一些dom
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-administerRule-dialog").hide();

            //发送给后台
            if(server.allowUpdate){
                let files = $.extend(true, [], Store.luckysheetfile);
                for(let i = 0; i < files.length; i++){
                    server.saveParam("all", files[i]["index"], files[i]["luckysheet_conditionformat_save"], { "k": "luckysheet_conditionformat_save" });
                }
            }
        });

        $(document).off("click.CFadministerRuleClose").on("click.CFadministerRuleClose", "#luckysheet-administerRule-dialog-close", function(){
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-administerRule-dialog").hide();
            _this.fileClone = [];
        });
        $(document).off("click.CFadministerRuleFa").on("click.CFadministerRuleFa", "#luckysheet-administerRule-dialog .item .fa-table", function(){
            $(this).parents("#luckysheet-administerRule-dialog").hide();

            let sheetIndex = $("#luckysheet-administerRule-dialog .chooseSheet select option:selected").val();
            if(sheetIndex != Store.currentSheetIndex){
                sheetmanage.changeSheetExec(sheetIndex);
            }

            let txt = $(this).siblings("input").val().trim();
            let dataItem = $(this).parents(".item").attr("data-item");

            _this.multiRangeDialog(dataItem, txt);

            _this.selectRange = [];

            let range = _this.getRangeByTxt(txt);
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
        $(document).off("click.CFmultiRangeConfirm").on("click.CFmultiRangeConfirm", "#luckysheet-multiRange-dialog-confirm", function(){
            $(this).parents("#luckysheet-multiRange-dialog").hide();

            let dataItem = $(this).attr("data-item");
            let v = $(this).parents("#luckysheet-multiRange-dialog").find("input").val();
            $("#luckysheet-administerRule-dialog .item[data-item="+dataItem+"] input").val(v);

            let sheetIndex = $("#luckysheet-administerRule-dialog .chooseSheet option:selected").val();
            _this.fileClone[getSheetIndex(sheetIndex)]["luckysheet_conditionformat_save"][dataItem].cellrange = _this.getRangeByTxt(v);
            
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-administerRule-dialog").show();

            let range = [];
            selectionCopyShow(range);
        });
        $(document).off("click.CFmultiRangeClose").on("click.CFmultiRangeClose", "#luckysheet-multiRange-dialog-close", function(){
            $(this).parents("#luckysheet-multiRange-dialog").hide();
            $("#luckysheet-modal-dialog-mask").show();
            $("#luckysheet-administerRule-dialog").show();

            $("#luckysheet-formula-functionrange-select").hide();
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();

            let range = [];
            selectionCopyShow(range);
        });
        
        // 新建规则
        $(document).off("click.CFnewConditionRule").on("click.CFnewConditionRule", "#newConditionRule", function(){
            if(Store.luckysheet_select_save.length == 0){
                if(isEditMode()){
                    alert("请选择应用范围");
                }
                else{
                    tooltip.info("请选择应用范围", "");
                }
                return;
            }
            
            _this.newConditionRuleDialog(1);
        });
        $(document).off("click.CFnewConditionRuleConfirm").on("click.CFnewConditionRuleConfirm", "#luckysheet-newConditionRule-dialog-confirm", function(){
            let index = $("#luckysheet-newConditionRule-dialog .ruleTypeItem.on").index();
            let type1 = $("#luckysheet-newConditionRule-dialog #type1 option:selected").val();
            let type2 = $("#luckysheet-newConditionRule-dialog ." + type1 + "Box #type2 option:selected").val();
            
            let format, rule;
            if(index == 0){
                if(type1 == "dataBar"){ //数据条
                    let color = $(this).parents("#luckysheet-newConditionRule-dialog").find(".dataBarBox .luckysheet-conditionformat-config-color").spectrum("get").toHexString();

                    if(type2 == "gradient"){ //渐变填充
                        format = [color, "#ffffff"];
                    }
                    else if(type2 == "solid"){ //实心填充
                        format = [color];
                    }

                    rule = {
                        "type": "dataBar", 
                        "cellrange": $.extend(true, [], Store.luckysheet_select_save), 
                        "format": format
                    };
                }
                else if(type1 == "colorGradation"){ //色阶
                    let maxcolor = $(this).parents("#luckysheet-newConditionRule-dialog").find(".colorGradationBox .maxVal .luckysheet-conditionformat-config-color").spectrum("get").toRgbString();
                    let midcolor = $(this).parents("#luckysheet-newConditionRule-dialog").find(".colorGradationBox .midVal .luckysheet-conditionformat-config-color").spectrum("get").toRgbString();
                    let mincolor = $(this).parents("#luckysheet-newConditionRule-dialog").find(".colorGradationBox .minVal .luckysheet-conditionformat-config-color").spectrum("get").toRgbString();

                    if(type2 == "threeColor"){ //三色
                        format = [maxcolor, midcolor, mincolor];
                    }
                    else if(type2 == "twoColor"){ //双色
                        format = [maxcolor, mincolor];
                    }

                    rule = {
                        "type": "colorGradation", 
                        "cellrange": $.extend(true, [], Store.luckysheet_select_save), 
                        "format": format
                    };
                }
                else if(type1 == "icons"){ //图标集
                    let len = $(this).parents("#luckysheet-newConditionRule-dialog").find(".iconsBox .model").attr("data-len");
                    let leftMin = $(this).parents("#luckysheet-newConditionRule-dialog").find(".iconsBox .model").attr("data-leftmin");
                    let top = $(this).parents("#luckysheet-newConditionRule-dialog").find(".iconsBox .model").attr("data-top");

                    format = {
                        "len": len, 
                        "leftMin": leftMin,
                        "top": top
                    };

                    rule = {
                        "type": "icons", 
                        "cellrange": $.extend(true, [], Store.luckysheet_select_save), 
                        "format": format
                    };
                }
            }
            else{
                let conditionName = "", conditionRange = [], conditionValue = [];

                if(index == 1){
                    if(type1 == "number"){ //单元格值
                        conditionName = type2;

                        if(type2 == "betweenness"){
                            let v1 = $("#luckysheet-newConditionRule-dialog #conditionVal input").val().trim();
                            let v2 = $("#luckysheet-newConditionRule-dialog #conditionVal2 input").val().trim();

                            //条件值是否是选区
                            let rangeArr1 = _this.getRangeByTxt(v1);
                            if(rangeArr1.length > 1){
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                            else if(rangeArr1.length == 1){
                                let r1 = rangeArr1[0].row[0], r2 = rangeArr1[0].row[1];
                                let c1 = rangeArr1[0].column[0], c2 = rangeArr1[0].column[1];

                                if(r1 == r2 && c1 == c2){
                                    v1 = getcellvalue(r1, c1, Store.flowdata);
                                    
                                    conditionRange.push({ "row": rangeArr1[0].row, "column": rangeArr1[0].column });
                                    conditionValue.push(v1);
                                }
                                else{
                                    _this.infoDialog("只能对单个单元格进行引用", "");
                                    return;
                                }
                            }
                            else if(rangeArr1.length == 0){
                                if(isNaN(v1) || v1 == ""){
                                    _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                    return;
                                }
                                else{
                                    conditionValue.push(v1);
                                }
                            }

                            let rangeArr2 = _this.getRangeByTxt(v2);
                            if(rangeArr2.length > 1){
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                            else if(rangeArr2.length == 1){
                                let r1 = rangeArr2[0].row[0], r2 = rangeArr2[0].row[1];
                                let c1 = rangeArr2[0].column[0], c2 = rangeArr2[0].column[1];

                                if(r1 == r2 && c1 == c2){
                                    v2 = getcellvalue(r1, c1, Store.flowdata);
                                    
                                    conditionRange.push({ "row": rangeArr2[0].row, "column": rangeArr2[0].column });
                                    conditionValue.push(v2);
                                }
                                else{
                                    _this.infoDialog("只能对单个单元格进行引用", "");
                                    return;
                                }
                            }
                            else if(rangeArr2.length == 0){
                                if(isNaN(v2) || v2 == ""){
                                    _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                    return;
                                }
                                else{
                                    conditionValue.push(v2);
                                }
                            }
                        }
                        else{
                            //条件值
                            let v = $("#luckysheet-newConditionRule-dialog #conditionVal input").val().trim();

                            //条件值是否是选区
                            let rangeArr = _this.getRangeByTxt(v);
                            if(rangeArr.length > 1){
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                            else if(rangeArr.length == 1){
                                let r1 = rangeArr[0].row[0], r2 = rangeArr[0].row[1];
                                let c1 = rangeArr[0].column[0], c2 = rangeArr[0].column[1];

                                if(r1 == r2 && c1 == c2){
                                    v = getcellvalue(r1, c1, Store.flowdata);
                                    
                                    conditionRange.push({ "row": rangeArr[0].row, "column": rangeArr[0].column });
                                    conditionValue.push(v);
                                }
                                else{
                                    _this.infoDialog("只能对单个单元格进行引用", "");
                                    return;
                                }
                            }
                            else if(rangeArr.length == 0){
                                if(isNaN(v) || v == ""){
                                    _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                    return;
                                }
                                else{
                                    conditionValue.push(v);
                                }
                            }
                        }
                    }
                    else if(type1 == "text"){ //特定文本
                        conditionName = "textContains";

                        //条件值
                        let v = $("#luckysheet-newConditionRule-dialog #conditionVal input").val().trim();

                        //条件值是否是选区
                        let rangeArr = _this.getRangeByTxt(v);
                        if(rangeArr.length > 1){
                            _this.infoDialog("只能对单个单元格进行引用", "");
                            return;
                        }
                        else if(rangeArr.length == 1){
                            let r1 = rangeArr[0].row[0], r2 = rangeArr[0].row[1];
                            let c1 = rangeArr[0].column[0], c2 = rangeArr[0].column[1];

                            if(r1 == r2 && c1 == c2){
                                v = getcellvalue(r1, c1, Store.flowdata);
                                
                                conditionRange.push({ "row": rangeArr[0].row, "column": rangeArr[0].column });
                                conditionValue.push(v);
                            }
                            else{
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                        }
                        else if(rangeArr.length == 0){
                            if(isNaN(v) || v == ""){
                                _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                return;
                            }
                            else{
                                conditionValue.push(v);
                            }
                        }
                    }
                    else if(type1 == "date"){ //发生日期
                        conditionName = "occurrenceDate";

                        //条件值
                        let v = $("#luckysheet-newConditionRule-dialog #daterange-btn").val();

                        if(v == "" || v == null){
                            _this.infoDialog("请选择日期", "");
                            return;
                        }
                        
                        conditionValue.push(v);
                    }
                }
                else if(index == 2){ //排名靠前靠后
                    //条件名称
                    if(type1 == "top"){
                        if($("#luckysheet-newConditionRule-dialog #isPercent").is(":selected")){
                            conditionName = "top10%";
                        }
                        else{
                            conditionName = "top10";
                        }
                    }
                    else if(type1 == "last"){
                        if($("#luckysheet-newConditionRule-dialog #isPercent").is(":selected")){
                            conditionName = "last10%";
                        }
                        else{
                            conditionName = "last10";
                        }
                    }

                    //条件值
                    let v = $("#luckysheet-newConditionRule-dialog #conditionVal input").val().trim();

                    if(parseInt(v) != v || parseInt(v) < 1 || parseInt(v) > 1000){
                        _this.infoDialog("请输入一个介于 1 和 1000 之间的整数", "");
                        return;
                    }
                    
                    conditionValue.push(v);
                }
                else if(index == 3){ //平均值
                    if(type1 == "AboveAverage"){
                        conditionName = "AboveAverage";
                        conditionValue.push("AboveAverage");
                    }
                    else if(type1 == "SubAverage"){
                        conditionName = "SubAverage";
                        conditionValue.push("SubAverage");
                    }
                }
                else if(index == 4){ //重复值
                    conditionName = "duplicateValue";
                    conditionValue.push(type1);
                }

                //格式颜色
                let textcolor;
                if($("#luckysheet-newConditionRule-dialog #checkTextColor").is(":checked")){
                    textcolor = $("#luckysheet-newConditionRule-dialog #textcolorshow").spectrum("get").toHexString();
                }
                else{
                    textcolor = null;    
                }
                
                let cellcolor;
                if($("#luckysheet-newConditionRule-dialog #checkCellColor").is(":checked")){
                    cellcolor = $("#luckysheet-newConditionRule-dialog #cellcolorshow").spectrum("get").toHexString();
                }
                else{
                    cellcolor = null;    
                }

                format = {
                    "textColor": textcolor, 
                    "cellColor": cellcolor
                };

                rule = {
                    "type": "default",
                    "cellrange": $.extend(true, [], Store.luckysheet_select_save),
                    "format": format, 
                    "conditionName": conditionName, 
                    "conditionRange": conditionRange, 
                    "conditionValue": conditionValue 
                };
            }

            $("#luckysheet-newConditionRule-dialog").hide();
            
            //新建规则的入口
            let source = $(this).attr("data-source");
            
            if(source == 0){
                $("#luckysheet-modal-dialog-mask").hide();
                
                //保存之前的规则
                let fileH = $.extend(true, [], Store.luckysheetfile);
                let historyRules = _this.getHistoryRules(fileH);
                
                //保存当前的规则
                let ruleArr = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] == undefined ? [] : Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"];
                ruleArr.push(rule);
                Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] = ruleArr;

                let fileC = $.extend(true, [], Store.luckysheetfile);
                let currentRules = _this.getCurrentRules(fileC);
                
                //刷新一次表格
                _this.ref(historyRules, currentRules);

                //发送给后台
                if(server.allowUpdate){
                    server.saveParam("all", Store.currentSheetIndex, ruleArr, { "k": "luckysheet_conditionformat_save" });
                }
            }
            else if(source == 1){
                //临时存储新规则
                let ruleArr = !!_this.fileClone[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] ? _this.fileClone[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] : [];
                ruleArr.push(rule);
                _this.fileClone[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] = ruleArr;
                
                //新建规则隐藏，管理规则显示
                _this.administerRuleDialog();
            }
        });
        $(document).off("click.CFnewConditionRuleClose").on("click.CFnewConditionRuleClose", "#luckysheet-newConditionRule-dialog-close", function(){
            //新建规则的入口
            let source = $(this).attr("data-source");
            if(source == 0){
                $("#luckysheet-modal-dialog-mask").hide();
            }
            if(source == 1){
                $("#luckysheet-administerRule-dialog").show();
            }
            
            //新建规则隐藏
            $("#luckysheet-newConditionRule-dialog").hide();
            
            //隐藏虚线框
            $("#luckysheet-formula-functionrange-select").hide();
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide(); 
        });
        
        // 编辑规则
        $(document).off("click.CFeditorConditionRule").on("click.CFeditorConditionRule", "#editorConditionRule", function(){
            let sheetIndex = $("#luckysheet-administerRule-dialog .chooseSheet option:selected").val();
            let itemIndex = $("#luckysheet-administerRule-dialog .ruleList .listBox .item.on").attr("data-item");
            let rule = {
                "sheetIndex": sheetIndex,
                "itemIndex": itemIndex,
                "data": _this.fileClone[getSheetIndex(sheetIndex)]["luckysheet_conditionformat_save"][itemIndex]
            };
            _this.editorRule = rule;
            _this.editorConditionRuleDialog();
        });
        $(document).off("click.CFeditorConditionRuleConfirm").on("click.CFeditorConditionRuleConfirm", "#luckysheet-editorConditionRule-dialog-confirm",function(){
            let index = $("#luckysheet-editorConditionRule-dialog .ruleTypeItem.on").index();
            let type1 = $("#luckysheet-editorConditionRule-dialog #type1 option:selected").val();
            let type2 = $("#luckysheet-editorConditionRule-dialog ." + type1 + "Box #type2 option:selected").val();

            let cellrange = _this.editorRule["data"].cellrange;
            
            let format, rule;
            if(index == 0){
                if(type1 == "dataBar"){ //数据条
                    let color = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".dataBarBox .luckysheet-conditionformat-config-color").spectrum("get").toHexString();

                    if(type2 == "gradient"){ //渐变填充
                        format = [color, "#ffffff"];
                    }
                    else if(type2 == "solid"){ //实心填充
                        format = [color];
                    }

                    rule = {
                        "type": "dataBar", 
                        "cellrange": cellrange, 
                        "format": format
                    };
                }
                else if(type1 == "colorGradation"){ //色阶
                    let maxcolor = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".colorGradationBox .maxVal .luckysheet-conditionformat-config-color").spectrum("get").toRgbString();
                    let midcolor = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".colorGradationBox .midVal .luckysheet-conditionformat-config-color").spectrum("get").toRgbString();
                    let mincolor = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".colorGradationBox .minVal .luckysheet-conditionformat-config-color").spectrum("get").toRgbString();

                    if(type2 == "threeColor"){ //三色
                        format = [maxcolor, midcolor, mincolor];
                    }
                    else if(type2 == "twoColor"){ //双色
                        format = [maxcolor, mincolor];
                    }

                    rule = {
                        "type": "colorGradation", 
                        "cellrange": cellrange, 
                        "format": format
                    };
                }
                else if(type1 == "icons"){ //图标集
                    let len = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".iconsBox .model").attr("data-len");
                    let leftMin = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".iconsBox .model").attr("data-leftmin");
                    let top = $(this).parents("#luckysheet-editorConditionRule-dialog").find(".iconsBox .model").attr("data-top");

                    format = {
                        "len": len, 
                        "leftMin": leftMin,
                        "top": top
                    };

                    rule = {
                        "type": "icons", 
                        "cellrange": cellrange, 
                        "format": format
                    };
                }
            }
            else{
                let conditionName = "", conditionRange = [], conditionValue = [];

                if(index == 1){
                    if(type1 == "number"){ //单元格值
                        conditionName = type2;

                        if(type2 == "betweenness"){
                            let v1 = $("#luckysheet-editorConditionRule-dialog #conditionVal input").val().trim();
                            let v2 = $("#luckysheet-editorConditionRule-dialog #conditionVal2 input").val().trim();

                            //条件值是否是选区
                            let rangeArr1 = _this.getRangeByTxt(v1);
                            if(rangeArr1.length > 1){
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                            else if(rangeArr1.length == 1){
                                let r1 = rangeArr1[0].row[0], r2 = rangeArr1[0].row[1];
                                let c1 = rangeArr1[0].column[0], c2 = rangeArr1[0].column[1];

                                if(r1 == r2 && c1 == c2){
                                    v1 = getcellvalue(r1, c1, Store.flowdata);
                                    
                                    conditionRange.push({ "row": rangeArr1[0].row, "column": rangeArr1[0].column });
                                    conditionValue.push(v1);
                                }
                                else{
                                    _this.infoDialog("只能对单个单元格进行引用", "");
                                    return;
                                }
                            }
                            else if(rangeArr1.length == 0){
                                if(isNaN(v1) || v1 == ""){
                                    _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                    return;
                                }
                                else{
                                    conditionValue.push(v1);
                                }
                            }

                            let rangeArr2 = _this.getRangeByTxt(v2);
                            if(rangeArr2.length > 1){
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                            else if(rangeArr2.length == 1){
                                let r1 = rangeArr2[0].row[0], r2 = rangeArr2[0].row[1];
                                let c1 = rangeArr2[0].column[0], c2 = rangeArr2[0].column[1];

                                if(r1 == r2 && c1 == c2){
                                    v2 = getcellvalue(r1, c1, Store.flowdata);
                                    
                                    conditionRange.push({ "row": rangeArr2[0].row, "column": rangeArr2[0].column });
                                    conditionValue.push(v2);
                                }
                                else{
                                    _this.infoDialog("只能对单个单元格进行引用", "");
                                    return;
                                }
                            }
                            else if(rangeArr2.length == 0){
                                if(isNaN(v2) || v2 == ""){
                                    _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                    return;
                                }
                                else{
                                    conditionValue.push(v2);
                                }
                            }
                        }
                        else{
                            //条件值
                            let v = $("#luckysheet-editorConditionRule-dialog #conditionVal input").val().trim();

                            //条件值是否是选区
                            let rangeArr = _this.getRangeByTxt(v);
                            if(rangeArr.length > 1){
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                            else if(rangeArr.length == 1){
                                let r1 = rangeArr[0].row[0], r2 = rangeArr[0].row[1];
                                let c1 = rangeArr[0].column[0], c2 = rangeArr[0].column[1];

                                if(r1 == r2 && c1 == c2){
                                    v = getcellvalue(r1, c1, Store.flowdata);
                                    
                                    conditionRange.push({ "row": rangeArr[0].row, "column": rangeArr[0].column });
                                    conditionValue.push(v);
                                }
                                else{
                                    _this.infoDialog("只能对单个单元格进行引用", "");
                                    return;
                                }
                            }
                            else if(rangeArr.length == 0){
                                if(isNaN(v) || v == ""){
                                    _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                    return;
                                }
                                else{
                                    conditionValue.push(v);
                                }
                            }
                        }
                    }
                    else if(type1 == "text"){ //特定文本
                        conditionName = "textContains";

                        //条件值
                        let v = $("#luckysheet-editorConditionRule-dialog #conditionVal input").val().trim();

                        //条件值是否是选区
                        let rangeArr = _this.getRangeByTxt(v);
                        if(rangeArr.length > 1){
                            _this.infoDialog("只能对单个单元格进行引用", "");
                            return;
                        }
                        else if(rangeArr.length == 1){
                            let r1 = rangeArr[0].row[0], r2 = rangeArr[0].row[1];
                            let c1 = rangeArr[0].column[0], c2 = rangeArr[0].column[1];

                            if(r1 == r2 && c1 == c2){
                                v = getcellvalue(r1, c1, Store.flowdata);
                                
                                conditionRange.push({ "row": rangeArr[0].row, "column": rangeArr[0].column });
                                conditionValue.push(v);
                            }
                            else{
                                _this.infoDialog("只能对单个单元格进行引用", "");
                                return;
                            }
                        }
                        else if(rangeArr.length == 0){
                            if(isNaN(v) || v == ""){
                                _this.infoDialog("条件值只能是数字或者单个单元格", "");
                                return;
                            }
                            else{
                                conditionValue.push(v);
                            }
                        }
                    }
                    else if(type1 == "date"){ //发生日期
                        conditionName = "occurrenceDate";

                        //条件值
                        let v = $("#luckysheet-editorConditionRule-dialog #daterange-btn").val();

                        if(v == "" || v == null){
                            _this.infoDialog("请选择日期", "");
                            return;
                        }
                        
                        conditionValue.push(v);
                    }
                }
                else if(index == 2){ //排名靠前靠后
                    //条件名称
                    if(type1 == "top"){
                        if($("#luckysheet-editorConditionRule-dialog #isPercent").is(":selected")){
                            conditionName = "top10%";
                        }
                        else{
                            conditionName = "top10";
                        }
                    }
                    else if(type1 == "last"){
                        if($("#luckysheet-editorConditionRule-dialog #isPercent").is(":selected")){
                            conditionName = "last10%";
                        }
                        else{
                            conditionName = "last10";
                        }
                    }

                    //条件值
                    let v = $("#luckysheet-editorConditionRule-dialog #conditionVal input").val().trim();

                    if(parseInt(v) != v || parseInt(v) < 1 || parseInt(v) > 1000){
                        _this.infoDialog("请输入一个介于 1 和 1000 之间的整数", "");
                        return;
                    }
                    
                    conditionValue.push(v);
                }
                else if(index == 3){ //平均值
                    if(type1 == "AboveAverage"){
                        conditionName = "AboveAverage";
                        conditionValue.push("AboveAverage");
                    }
                    else if(type1 == "SubAverage"){
                        conditionName = "SubAverage";
                        conditionValue.push("SubAverage");
                    }
                }
                else if(index == 4){ //重复值
                    conditionName = "duplicateValue";
                    conditionValue.push(type1);
                }

                //格式颜色
                let textcolor;
                if($("#luckysheet-editorConditionRule-dialog #checkTextColor").is(":checked")){
                    textcolor = $("#luckysheet-editorConditionRule-dialog #textcolorshow").spectrum("get").toHexString();
                }
                else{
                    textcolor = null;    
                }
                
                let cellcolor;
                if($("#luckysheet-editorConditionRule-dialog #checkCellColor").is(":checked")){
                    cellcolor = $("#luckysheet-editorConditionRule-dialog #cellcolorshow").spectrum("get").toHexString();
                }
                else{
                    cellcolor = null;    
                }

                format = {
                    "textColor": textcolor, 
                    "cellColor": cellcolor
                };

                rule = {
                    "type": "default",
                    "cellrange": cellrange,
                    "format": format, 
                    "conditionName": conditionName, 
                    "conditionRange": conditionRange, 
                    "conditionValue": conditionValue 
                };
            }

            //修改编辑的规则
            let sheetIndex = _this.editorRule["sheetIndex"];
            let itemIndex = _this.editorRule["itemIndex"];
            _this.fileClone[getSheetIndex(sheetIndex)]["luckysheet_conditionformat_save"][itemIndex] = rule;
            
            //编辑规则隐藏，管理规则显示
            $("#luckysheet-editorConditionRule-dialog").hide();
            _this.administerRuleDialog();
        });
        $(document).off("click.CFeditorConditionRuleClose").on("click.CFeditorConditionRuleClose", "#luckysheet-editorConditionRule-dialog-close",function(){
            //编辑规则隐藏，管理规则显示
            $("#luckysheet-editorConditionRule-dialog").hide();
            $("#luckysheet-administerRule-dialog").show();
            //隐藏虚线框
            $("#luckysheet-formula-functionrange-select").hide();
            $("#luckysheet-row-count-show").hide();
            $("#luckysheet-column-count-show").hide();
        });

        // 新建规则、编辑规则 类型切换
        $(document).off("click.CFnewEditorRuleItem").on("click.CFnewEditorRuleItem", ".luckysheet-newEditorRule-dialog .ruleTypeItem", function(){
            $(this).addClass("on").siblings().removeClass("on");
            
            let index = $(this).index();
            $(this).parents(".luckysheet-newEditorRule-dialog").find(".ruleExplainBox").html(_this.getRuleExplain(index));

            _this.colorSelectInit();
        });
        $(document).off("change.CFnewEditorRuleType1").on("change.CFnewEditorRuleType1", ".luckysheet-newEditorRule-dialog #type1", function(){
            let optionVal = $(this).find("option:selected").val();

            if(optionVal == "dataBar" || optionVal == "colorGradation" || optionVal == "icons" || optionVal == "number" || optionVal == "text" || optionVal == "date"){
                $(this).parents(".luckysheet-newEditorRule-dialog").find("." + optionVal + "Box").show().siblings().hide();
            }

            if(optionVal == "date"){
                _this.daterangeInit($(this).parents(".luckysheet-newEditorRule-dialog").attr("id"));
            }
        });
        $(document).off("change.CFnewEditorRuleType2").on("change.CFnewEditorRuleType2", ".luckysheet-newEditorRule-dialog #type2", function(){
            let type1 = $(this).parents(".luckysheet-newEditorRule-dialog").find("#type1 option:selected").val();

            if(type1 == "colorGradation"){ 
                let type2 = $(this).find("option:selected").val();

                if(type2 == "threeColor"){
                    $(this).parents(".luckysheet-newEditorRule-dialog").find(".midVal").show();
                }
                else{
                    $(this).parents(".luckysheet-newEditorRule-dialog").find(".midVal").hide();
                }
            }
            else if(type1 == "number"){
                let type2 = $(this).find("option:selected").val();

                if(type2 == "betweenness"){
                    $(this).parents(".luckysheet-newEditorRule-dialog").find(".txt").show();
                    $(this).parents(".luckysheet-newEditorRule-dialog").find("#conditionVal2").show();
                }
                else{
                    $(this).parents(".luckysheet-newEditorRule-dialog").find(".txt").hide();
                    $(this).parents(".luckysheet-newEditorRule-dialog").find("#conditionVal2").hide();
                }
            }
        });
        $(document).off("click.CFiconsShowbox").on("click.CFiconsShowbox", ".luckysheet-newEditorRule-dialog .iconsBox .showbox", function(){
            $(this).parents(".iconsBox").find("ul").toggle();
        });
        $(document).off("click.CFiconsLi").on("click.CFiconsLi", ".luckysheet-newEditorRule-dialog .iconsBox li", function(){
            let len = $(this).find("div").attr("data-len");
            let leftmin = $(this).find("div").attr("data-leftmin");
            let top = $(this).find("div").attr("data-top");
            let title = $(this).find("div").attr("title");
            let position = $(this).find("div").css("background-position");

            $(this).parents(".iconsBox").find(".showbox .model").css("background-position", position);
            $(this).parents(".iconsBox").find(".showbox .model").attr("data-len", len);
            $(this).parents(".iconsBox").find(".showbox .model").attr("data-leftmin", leftmin);
            $(this).parents(".iconsBox").find(".showbox .model").attr("data-top", top);
            $(this).parents(".iconsBox").find(".showbox .model").attr("title", title);

            $(this).parents("ul").hide();
        });

        // 删除规则
        $(document).off("click.CFdeleteConditionRule").on("click.CFdeleteConditionRule", "#deleteConditionRule", function(){
            let sheetIndex = $("#luckysheet-administerRule-dialog .chooseSheet option:selected").val();
            let itemIndex = $("#luckysheet-administerRule-dialog .ruleList .listBox .item.on").attr("data-item");
            _this.fileClone[getSheetIndex(sheetIndex)]["luckysheet_conditionformat_save"].splice(itemIndex, 1);
            _this.administerRuleDialog();
        });
        
        // 规则子菜单弹出层 点击确定修改样式
        $(document).off("click.CFdefault").on("click.CFdefault", "#luckysheet-conditionformat-dialog-confirm", function(){
            //条件名称
            let conditionName = $("#luckysheet-conditionformat-dialog .box").attr("data-itemvalue");
            
            //条件单元格
            let conditionRange = [];
            
            //条件值
            let conditionValue = [];
            if(conditionName == "greaterThan" || conditionName == "lessThan" || conditionName == "equal" || conditionName == "textContains"){
                let v = $("#luckysheet-conditionformat-dialog #conditionVal").val().trim();
                
                //条件值是否是选区
                let rangeArr = _this.getRangeByTxt(v);
                if(rangeArr.length > 1){
                    _this.infoDialog("只能对单个单元格进行引用", "");
                    return;
                }
                else if(rangeArr.length == 1){
                    let r1 = rangeArr[0].row[0], r2 = rangeArr[0].row[1];
                    let c1 = rangeArr[0].column[0], c2 = rangeArr[0].column[1];

                    if(r1 == r2 && c1 == c2){
                        v = getcellvalue(r1, c1, Store.flowdata);
                        
                        conditionRange.push({ "row": rangeArr[0].row, "column": rangeArr[0].column });
                        conditionValue.push(v);
                    }
                    else{
                        _this.infoDialog("只能对单个单元格进行引用", "");
                        return;
                    }
                }
                else if(rangeArr.length == 0){
                    if(isNaN(v) || v == ""){
                        _this.infoDialog("条件值只能是数字或者单个单元格", "");
                        return;
                    }
                    else{
                        conditionValue.push(v);
                    }
                }
            }
            else if(conditionName == "betweenness"){//介于
                let v1 = $("#luckysheet-conditionformat-dialog #conditionVal").val().trim();
                let v2 = $("#luckysheet-conditionformat-dialog #conditionVal2").val().trim();

                //条件值是否是选区
                let rangeArr1 = _this.getRangeByTxt(v1);
                if(rangeArr1.length > 1){
                    _this.infoDialog("只能对单个单元格进行引用", "");
                    return;
                }
                else if(rangeArr1.length == 1){
                    let r1 = rangeArr1[0].row[0], r2 = rangeArr1[0].row[1];
                    let c1 = rangeArr1[0].column[0], c2 = rangeArr1[0].column[1];

                    if(r1 == r2 && c1 == c2){
                        v1 = getcellvalue(r1, c1, Store.flowdata);
                        
                        conditionRange.push({ "row": rangeArr1[0].row, "column": rangeArr1[0].column });
                        conditionValue.push(v1);
                    }
                    else{
                        _this.infoDialog("只能对单个单元格进行引用", "");
                        return;
                    }
                }
                else if(rangeArr1.length == 0){
                    if(isNaN(v1) || v1 == ""){
                        _this.infoDialog("条件值只能是数字或者单个单元格", "");
                        return;
                    }
                    else{
                        conditionValue.push(v1);
                    }
                }

                let rangeArr2 = _this.getRangeByTxt(v2);
                if(rangeArr2.length > 1){
                    _this.infoDialog("只能对单个单元格进行引用", "");
                    return;
                }
                else if(rangeArr2.length == 1){
                    let r1 = rangeArr2[0].row[0], r2 = rangeArr2[0].row[1];
                    let c1 = rangeArr2[0].column[0], c2 = rangeArr2[0].column[1];

                    if(r1 == r2 && c1 == c2){
                        v2 = getcellvalue(r1, c1, Store.flowdata);
                        
                        conditionRange.push({ "row": rangeArr2[0].row, "column": rangeArr2[0].column });
                        conditionValue.push(v2);
                    }
                    else{
                        _this.infoDialog("只能对单个单元格进行引用", "");
                        return;
                    }
                }
                else if(rangeArr2.length == 0){
                    if(isNaN(v2) || v2 == ""){
                        _this.infoDialog("条件值只能是数字或者单个单元格", "");
                        return;
                    }
                    else{
                        conditionValue.push(v2);
                    }
                }
            }
            else if(conditionName == "occurrenceDate"){//日期
                let v = $("#luckysheet-conditionformat-dialog #daterange-btn").val();

                if(v == "" || v == null){
                    _this.infoDialog("请选择日期", "");
                    return;
                }

                conditionValue.push(v);
            }
            else if(conditionName == "duplicateValue"){//重复值
                conditionValue.push($("#luckysheet-conditionformat-dialog #conditionVal option:selected").val());
            }
            else if(conditionName == "top10" || conditionName == "top10%" || conditionName == "last10" || conditionName == "last10%"){
                let v = $("#luckysheet-conditionformat-dialog #conditionVal").val().trim();

                if(parseInt(v) != v || parseInt(v) < 1 || parseInt(v) > 1000){
                    _this.infoDialog("请输入一个介于 1 和 1000 之间的整数", "");
                    return;
                }

                conditionValue.push(v);
            }
            else if(conditionName == "AboveAverage"){ //高于平均值
                conditionValue.push("AboveAverage");
            }
            else if(conditionName == "SubAverage"){ //低于平均值
                conditionValue.push("SubAverage");
            }

            //格式颜色
            let textcolor;
            if($("#checkTextColor").is(":checked")){
                textcolor = $("#textcolorshow").spectrum("get").toHexString();
            }
            else{
                textcolor = null;    
            }

            let cellcolor;
            if($("#checkCellColor").is(":checked")){
                cellcolor = $("#cellcolorshow").spectrum("get").toHexString();
            }
            else{
                cellcolor = null;    
            }

            //保存之前的规则
            let fileH = $.extend(true, [], Store.luckysheetfile);
            let historyRules = _this.getHistoryRules(fileH);
            
            //保存当前的规则
            let rule = {
                "type": "default",
                "cellrange": $.extend(true, [], Store.luckysheet_select_save),
                "format": {
                    "textColor": textcolor, 
                    "cellColor": cellcolor
                }, 
                "conditionName": conditionName, 
                "conditionRange": conditionRange, 
                "conditionValue": conditionValue 
            };
            let ruleArr = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] == undefined ? [] : Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"];
            ruleArr.push(rule);
            Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_conditionformat_save"] = ruleArr;

            let fileC = $.extend(true, [], Store.luckysheetfile);
            let currentRules = _this.getCurrentRules(fileC);
            
            //刷新一次表格
            _this.ref(historyRules, currentRules);
            
            //隐藏一些dom
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-conditionformat-dialog").hide();

            //发送给后台
            if(server.allowUpdate){
                server.saveParam("all", Store.currentSheetIndex, ruleArr, { "k": "luckysheet_conditionformat_save" });
            }
        });
        
        // 图标集弹出层 选择
        $(document).off("click.CFicons").on("click.CFicons", "#luckysheet-CFicons-dialog .item", function(){
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-CFicons-dialog").hide();

            if(Store.luckysheet_select_save.length > 0){
                let cellrange = $.extend(true, [], Store.luckysheet_select_save);
                let format = {
                    "len": $(this).attr("data-len"), 
                    "leftMin": $(this).attr("data-leftMin"),
                    "top": $(this).attr("data-top")
                }

                _this.updateItem("icons", cellrange, format);
            }
        });
        
        // 选择单元格
        $(document).on("click", ".range .fa-table", function(){
            let id = $(this).parents(".luckysheet-modal-dialog").attr("id");
            $("#" + id).hide();
            //入口
            let source;
            if(id == "luckysheet-conditionformat-dialog"){
                if($(this).siblings("input").attr("id") == "conditionVal"){
                    source = "0_1";
                }
                else{
                    source = "0_2";    
                }
            }
            else if(id == "luckysheet-newConditionRule-dialog"){
                if($(this).parents(".range").attr("id") == "conditionVal"){
                    source = "1_1";    
                }
                else{
                    source = "1_2";
                }
            }
            else if(id == "luckysheet-editorConditionRule-dialog"){
                if($(this).parents(".range").attr("id") == "conditionVal"){
                    source = "2_1";    
                }
                else{
                    source = "2_2";
                }
            }
            //input值
            let v = $(this).siblings("input").val();

            _this.singleRangeDialog(source, v);
            selectionCopyShow(_this.getRangeByTxt(v));
        });
        $(document).on("click", "#luckysheet-singleRange-dialog-confirm", function(){
            $("#luckysheet-modal-dialog-mask").show();
            $(this).parents("#luckysheet-singleRange-dialog").hide();

            let source = $(this).attr("data-source");
            let v = $(this).parents("#luckysheet-singleRange-dialog").find("input").val();
            
            if(source == "0_1"){
                $("#luckysheet-conditionformat-dialog").show();
                $("#luckysheet-conditionformat-dialog #conditionVal").val(v);
            }
            else if(source == "0_2"){
                $("#luckysheet-conditionformat-dialog").show();
                $("#luckysheet-conditionformat-dialog #conditionVal2").val(v);
            }
            else if(source == "1_1"){
                $("#luckysheet-newConditionRule-dialog").show();
                $("#luckysheet-newConditionRule-dialog #conditionVal input").val(v);
            }
            else if(source == "1_2"){
                $("#luckysheet-newConditionRule-dialog").show();
                $("#luckysheet-newConditionRule-dialog #conditionVal2 input").val(v);
            }
            else if(source == "2_1"){
                $("#luckysheet-editorConditionRule-dialog").show();
                $("#luckysheet-editorConditionRule-dialog #conditionVal input").val(v);
            }
            else if(source == "2_2"){
                $("#luckysheet-editorConditionRule-dialog").show();
                $("#luckysheet-editorConditionRule-dialog #conditionVal2 input").val(v);
            }

            let range = [];
            selectionCopyShow(range);
        });
        $(document).on("click", "#luckysheet-singleRange-dialog-close", function(){
            $("#luckysheet-modal-dialog-mask").show();
            $(this).parents("#luckysheet-singleRange-dialog").hide();

            let source = $(this).attr("data-source");
            if(source == "0_1" || source == "0_2"){
                $("#luckysheet-conditionformat-dialog").show();
            }
            else if(source == "1_1" || source == "1_2"){
                $("#luckysheet-newConditionRule-dialog").show();
            }
            else if(source == "2_1" || source == "2_2"){
                $("#luckysheet-editorConditionRule-dialog").show();
            }

            let range = [];
            selectionCopyShow(range);
        });
        
        // 弹出层右上角关闭按钮
        $(document).on("click", ".luckysheet-modal-dialog-title-close", function(){
            let id = $(this).parents(".luckysheet-modal-dialog").attr("id");
            
            //新建规则弹出层
            if(id == "luckysheet-newConditionRule-dialog"){
                let source=$("#" + id).find("#luckysheet-newConditionRule-dialog-close").attr("data-source");
                //新建规则入口
                if(source == 1){
                    $("#luckysheet-administerRule-dialog").show();
                }
            }
            
            //编辑规则弹出层
            if(id == "luckysheet-editorConditionRule-dialog"){
                $("#luckysheet-administerRule-dialog").show();
            }

            //选择单元格弹出层
            if(id == "luckysheet-singleRange-dialog"){
                $("#luckysheet-modal-dialog-mask").show();

                let source = $(this).parents("#luckysheet-singleRange-dialog").find("#luckysheet-singleRange-dialog-confirm").attr("data-source");
                if(source == "0_1" || source == "0_2"){
                    $("#luckysheet-conditionformat-dialog").show();
                }
                else if(source == "1_1" || source == "1_2"){
                    $("#luckysheet-newConditionRule-dialog").show();
                }
                else if(source == "2_1" || source == "2_2"){
                    $("#luckysheet-editorConditionRule-dialog").show();
                }

                let range = [];
                selectionCopyShow(range);
            }

            //选择应用范围弹出层
            if(id == "luckysheet-multiRange-dialog"){
                $("#luckysheet-modal-dialog-mask").show();

                $("#luckysheet-administerRule-dialog").show();

                let range = [];
                selectionCopyShow(range);
            }

            //提示框
            if(id == "luckysheet-conditionformat-info-dialog"){
                $("#luckysheet-modal-dialog-mask").show();
            }
        });

        //提示框
        $(document).on("click", "#luckysheet-conditionformat-info-dialog-close", function(){
            $(this).parents("#luckysheet-conditionformat-info-dialog").hide();
        });
    },
    singleRangeDialog: function(source, value){
        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-singleRange-dialog").remove();

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-singleRange-dialog", 
            "addclass": "luckysheet-singleRange-dialog", 
            "title": "选择单元格", 
            "content": '<input readonly="readonly" placeholder="请选择单元格" value="'+value+'"/>', 
            "botton": '<button id="luckysheet-singleRange-dialog-confirm" class="btn btn-primary" data-source="'+source+'">确定</button><button id="luckysheet-singleRange-dialog-close" class="btn btn-default" data-source="'+source+'">取消</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-singleRange-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-singleRange-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
    },
    multiRangeDialog: function(dataItem, value){
        let _this = this;

        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-multiRange-dialog").remove();

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-multiRange-dialog", 
            "addclass": "luckysheet-multiRange-dialog", 
            "title": "选择应用范围", 
            "content": '<input readonly="readonly" placeholder="请选择应用范围" value="'+value+'"/>', 
            "botton": '<button id="luckysheet-multiRange-dialog-confirm" class="btn btn-primary" data-item="'+dataItem+'">确定</button><button id="luckysheet-multiRange-dialog-close" class="btn btn-default">取消</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-multiRange-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-multiRange-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();

        selectionCopyShow(_this.getRangeByTxt(value));
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
    colorSelectInit: function(){
        $(".luckysheet-conditionformat-config-color").spectrum({
            showPalette: true,
            showPaletteOnly:true,
            preferredFormat: "hex",
            clickoutFiresChange: false,
            showInitial: true,
            showInput: true,
            // flat: true,
            hideAfterPaletteSelect: true,
            showSelectionPalette: true,
            // showButtons: false,//隐藏选择取消按钮
            maxPaletteSize: 8,
            maxSelectionSize: 8,
            // color: currenColor,
            cancelText: "取消",
            chooseText: "确定颜色",
            togglePaletteMoreText: "自定义",
            togglePaletteLessText: "收起",
            togglePaletteOnly: true,
            clearText: "清除颜色选择",
            noColorSelectedText: "没有颜色被选择",
            localStorageKey: "spectrum.textcolor" + server.gridKey,
            palette: [["#000","#444","#666","#999","#ccc","#eee","#f3f3f3","#fff"],
            ["#f00","#f90","#ff0","#0f0","#0ff","#00f","#90f","#f0f"],
            ["#f4cccc","#fce5cd","#fff2cc","#d9ead3","#d0e0e3","#cfe2f3","#d9d2e9","#ead1dc"],
            ["#ea9999","#f9cb9c","#ffe599","#b6d7a8","#a2c4c9","#9fc5e8","#b4a7d6","#d5a6bd"],
            ["#e06666","#f6b26b","#ffd966","#93c47d","#76a5af","#6fa8dc","#8e7cc3","#c27ba0"],
            ["#c00","#e69138","#f1c232","#6aa84f","#45818e","#3d85c6","#674ea7","#a64d79"],
            ["#900","#b45f06","#bf9000","#38761d","#134f5c","#0b5394","#351c75","#741b47"],
            ["#600","#783f04","#7f6000","#274e13","#0c343d","#073763","#20124d","#4c1130"]],
            change: function(color){
                if (color != null) {
                    color = color.toHexString();
                }
            }
        });
    },
    conditionformatDialog: function(title, content){
        let _this = this;

        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-conditionformat-dialog").remove();

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-conditionformat-dialog", 
            "addclass": "luckysheet-conditionformat-dialog", 
            "title": title, 
            "content": content, 
            "botton": '<button id="luckysheet-conditionformat-dialog-confirm" class="btn btn-primary">确定</button><button class="btn btn-default luckysheet-model-close-btn">取消</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-conditionformat-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-conditionformat-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
    
        _this.init();
        _this.colorSelectInit();
        
        if(title == "条件格式——发生日期"){
            _this.daterangeInit("luckysheet-conditionformat-dialog");
        }
    },
    CFiconsDialog: function(){　
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-CFicons-dialog").remove();

        let content = '<div class="box">'+
                        '<div style="margin-bottom: 10px;">请点击选择一组图标：</div>'+
                        '<div class="title">方向</div>'+
                        '<div class="list">'+
                            '<div class="left">'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="0" title="三向箭头(彩色)"><div style="background-position:0 0;"></div></div>'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="1" title="3个三角形"><div style="background-position:0 -20px;"></div></div>'+
                                '<div class="item" data-len="4" data-leftMin="0" data-top="2" title="四向箭头(彩色)"><div style="background-position:0 -40px;"></div></div>'+
                                '<div class="item" data-len="5" data-leftMin="0" data-top="3" title="五向箭头(彩色)"><div style="background-position:0 -60px;"></div></div>'+
                            '</div>'+
                            '<div class="right">'+
                                '<div class="item" data-len="3" data-leftMin="5" data-top="0" title="三向箭头(灰色)"><div style="background-position:-131px 0;"></div></div>'+
                                '<div class="item" data-len="4" data-leftMin="5" data-top="1" title="四向箭头(灰色)"><div style="background-position:-131px -20px;"></div></div>'+
                                '<div class="item" data-len="5" data-leftMin="5" data-top="2" title="五向箭头(灰色)"><div style="background-position:-131px -40px;"></div></div>'+
                            '</div>'+
                            '<div style="clear:both;"></div>'+
                        '</div>'+
                        '<div class="title">形状</div>'+
                        '<div class="list">'+
                            '<div class="left">'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="4" title="三色交通灯(无边框)"><div style="background-position:0 -80px;"></div></div>'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="5" title="三标志"><div style="background-position:0 -100px;"></div></div>'+
                                '<div class="item" data-len="4" data-leftMin="0" data-top="6" title="绿-红-黑渐变"><div style="background-position:0 -120px;"></div></div>'+
                            '</div>'+
                            '<div class="right">'+
                                '<div class="item" data-len="3" data-leftMin="5" data-top="4" title="三色交通灯(有边框)"><div style="background-position:-131px -80px;"></div></div>'+
                                '<div class="item" data-len="4" data-leftMin="5" data-top="5" title="四色交通灯"><div style="background-position:-131px -100px;"></div></div>'+
                            '</div>'+
                            '<div style="clear:both;"></div>'+
                        '</div>'+
                        '<div class="title">标记</div>'+
                        '<div class="list">'+
                            '<div class="left">'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="7" title="三个符号(有圆圈)"><div style="background-position:0 -140px;"></div></div>'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="8" title="三色旗"><div style="background-position:0 -160px;"></div></div>'+
                            '</div>'+
                            '<div class="right">'+
                                '<div class="item" data-len="3" data-leftMin="5" data-top="7" title="三个符号(无圆圈)"><div style="background-position:-131px -140px;"></div></div>'+
                            '</div>'+
                            '<div style="clear:both;"></div>'+
                        '</div>'+
                        '<div class="title">等级</div>'+
                        '<div class="list">'+
                            '<div class="left">'+
                                '<div class="item" data-len="3" data-leftMin="0" data-top="9" title="3个星形"><div style="background-position:0 -180px;"></div></div>'+
                                '<div class="item" data-len="5" data-leftMin="0" data-top="10" title="五象限图"><div style="background-position:0 -200px;"></div></div>'+
                                '<div class="item" data-len="5" data-leftMin="0" data-top="11" title="5个框"><div style="background-position:0 -220px;"></div></div>'+
                            '</div>'+
                            '<div class="right">'+
                                '<div class="item" data-len="4" data-leftMin="5" data-top="9" title="四等级"><div style="background-position:-131px -180px;"></div></div>'+
                                '<div class="item" data-len="5" data-leftMin="5" data-top="10" title="五等级"><div style="background-position:-131px -200px;"></div></div>'+
                            '</div>'+
                            '<div style="clear:both;"></div>'+
                        '</div>'+
                      '</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-CFicons-dialog", 
            "addclass": "luckysheet-CFicons-dialog", 
            "title": "图标集", 
            "content": content, 
            "botton": '<button class="btn btn-default luckysheet-model-close-btn">关闭</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-CFicons-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 400)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-CFicons-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
    },
    administerRuleDialog: function(){
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-administerRule-dialog").remove();
        
        //工作表
        let opHtml = ''; 
        for(let j = 0; j < Store.luckysheetfile.length; j++){
            if(Store.luckysheetfile[j].status == "1"){
                opHtml += '<option value="' + Store.luckysheetfile[j]["index"] + '" selected="selected">当前工作表：' + Store.luckysheetfile[j]["name"] + '</option>';
            }
            else{
                opHtml += '<option value="' + Store.luckysheetfile[j]["index"] + '">表：' + Store.luckysheetfile[j]["name"] + '</option>';
            }
        }

        let content = '<div class="chooseSheet">' +
                        '<label>显示其格式规则：</label>' +
                        '<select>' + opHtml + '</select>' +
                      '</div>' +
                      '<div class="ruleBox">' +
                        '<div class="ruleBtn">' +
                            '<button id="newConditionRule" class="btn btn-default">新建规则</button>' +
                            '<button id="editorConditionRule" class="btn btn-default">编辑规则</button>' +
                            '<button id="deleteConditionRule" class="btn btn-default">删除规则</button>' +
                        '</div>' +
                        '<div class="ruleList">' +
                            '<div class="listTitle">' +
                                '<span>规则</span>' +
                                '<span>格式</span>' +
                                '<span>应用范围</span>' +
                            '</div>' +
                            '<div class="listBox"></div>' +
                        '</div>' +
                      '</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-administerRule-dialog", 
            "addclass": "luckysheet-administerRule-dialog", 
            "title": "条件格式规则管理器", 
            "content": content, 
            "botton": '<button id="luckysheet-administerRule-dialog-confirm" class="btn btn-primary">确定</button><button id="luckysheet-administerRule-dialog-close" class="btn btn-default">关闭</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-administerRule-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 400)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-administerRule-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();

        //当前工作表的规则列表
        let index = $("#luckysheet-administerRule-dialog .chooseSheet option:selected").val();
        this.getConditionRuleList(index);
    },
    getConditionRuleList: function(index){
        let _this = this;

        $("#luckysheet-administerRule-dialog .ruleList .listBox").empty();

        let ruleArr = _this.fileClone[getSheetIndex(index)].luckysheet_conditionformat_save; //条件格式规则集合
        if(ruleArr != null && ruleArr.length > 0){
            let textColorHtml = ''; //文本颜色dom
            let cellColorHtml = ''; //单元格颜色dom

            for(let i = 0; i < ruleArr.length; i++){
                let type = ruleArr[i]["type"];            //规则类型
                let format = ruleArr[i]["format"];        //规则样式
                let cellrange = ruleArr[i]["cellrange"];  //规则应用范围

                let ruleName;         //规则名称
                let formatHtml = '';  //样式dom
                if(type == "dataBar"){
                    ruleName = "数据条";

                    formatHtml = '<canvas width="46" height="18" style="width: 46px;height: 18px;margin: 3px 0 0 5px;"></canvas>';
                }
                else if(type == "colorGradation"){
                    ruleName = "色阶";

                    formatHtml = '<canvas width="46" height="18" style="width: 46px;height: 18px;margin: 3px 0 0 5px;"></canvas>';
                }
                else if(type == "icons"){
                    ruleName = "图标集";

                    formatHtml = '<canvas width="46" height="18" style="width: 46px;height: 18px;margin: 3px 0 0 5px;"></canvas>';
                }
                else{
                    ruleName = _this.getConditionRuleName(ruleArr[i].conditionName, ruleArr[i].conditionRange, ruleArr[i].conditionValue);
                
                    if(format["textColor"] != null){
                        formatHtml += '<span class="colorbox" title="文本颜色" style="background-color:' + format["textColor"] + '"></span>';
                    }

                    if(format["cellColor"] != null){
                        formatHtml += '<span class="colorbox" title="单元格颜色" style="background-color:' + format["cellColor"] + '"></span>';
                    }
                }
                
                //应用范围dom
                let rangeTxtArr = [];
                for(let s = 0; s < cellrange.length; s++){
                    let r1 = cellrange[s].row[0], r2 = cellrange[s].row[1];
                    let c1 = cellrange[s].column[0], c2 = cellrange[s].column[1];

                    rangeTxtArr.push(chatatABC(c1) + (r1 + 1) + ":" + chatatABC(c2) + (r2 + 1));
                }
                
                //条件格式规则列表dom
                let itemHtml =  '<div class="item" data-item="' + i + '">' +
                                    '<div class="ruleName" title="' + ruleName + '">' + ruleName + '</div>' +
                                    '<div class="format">' + formatHtml + '</div>' +
                                    '<div class="ruleRange">' +
                                        '<input class="formulaInputFocus" readonly="true" value="' + rangeTxtArr.join(",") + '"/>' +
                                        '<i class="fa fa-table" aria-hidden="true" title="点击选择应用范围"></i>' +
                                    '</div>' +
                                '</div>';

                $("#luckysheet-administerRule-dialog .ruleList .listBox").prepend(itemHtml);
            }

            $("#luckysheet-administerRule-dialog .ruleList .listBox .item canvas").each(function(i){
                let x = $(this).closest(".item").attr("data-item");
                
                let type = ruleArr[x]["type"];
                let format = ruleArr[x]["format"];

                let can = $(this).get(0).getContext("2d");
                if(type == "dataBar"){
                    if(format.length == 2){
                        let my_gradient = can.createLinearGradient(0, 0, 46, 0);
                        my_gradient.addColorStop(0, format[0]);
                        my_gradient.addColorStop(1, format[1]);
                        can.fillStyle = my_gradient;
                        can.fillRect(0, 0, 46, 18);

                        can.beginPath();
                        can.moveTo(0, 0);
                        can.lineTo(0, 18);
                        can.lineTo(46, 18);
                        can.lineTo(46, 0);
                        can.lineTo(0, 0);
                        can.lineWidth = Store.devicePixelRatio;
                        can.strokeStyle = format[0];
                        can.stroke();
                        can.closePath();
                    }
                    else if(format.length == 1){
                        can.fillStyle = format[0];
                        can.fillRect(0, 0, 46, 18);

                        can.beginPath();
                        can.moveTo(0, 0);
                        can.lineTo(0, 18);
                        can.lineTo(46, 18);
                        can.lineTo(46, 0);
                        can.lineTo(0, 0);
                        can.lineWidth = Store.devicePixelRatio;
                        can.strokeStyle = format[0];
                        can.stroke();
                        can.closePath();
                    }
                }
                else if(type == "colorGradation"){
                    let my_gradient = can.createLinearGradient(0, 0, 46, 0);

                    if(format.length == 3){
                        my_gradient.addColorStop(0, format[0]);
                        my_gradient.addColorStop(0.5, format[1]);
                        my_gradient.addColorStop(1, format[2]);
                    }
                    else if(format.length == 2){
                        my_gradient.addColorStop(0, format[0]);
                        my_gradient.addColorStop(1, format[1]);
                    }

                    can.fillStyle = my_gradient;
                    can.fillRect(0, 0, 46, 18);
                }
                else if(type == "icons"){
                    let len = format["len"];
                    let l = format["leftMin"];
                    let t = format["top"];

                    let w1 = 32 * len + 10 * (len - 1);
                    let h1 = 32;
                    let w2 = 46;
                    let h2 = 46 * 32 / w1;

                    if(l == "0"){
                        can.drawImage(luckysheet_CFiconsImg, 0, t * 32, w1, h1, 0, (18 - h2) / 2, w2, h2);
                    }
                    else if(l == "5"){
                        can.drawImage(luckysheet_CFiconsImg, 210, t * 32, w1, h1, 0, (18 - h2) / 2, w2, h2);
                    }
                }
            })

            $("#luckysheet-administerRule-dialog .ruleList .listBox .item").eq(0).addClass("on");
        }
    },
    getConditionRuleName: function(conditionName, conditionRange, conditionValue){
        //v 有条件单元格取条件单元格，若无取条件值
        let v
        if(conditionRange[0]!=null){
            v = chatatABC(conditionRange[0]["column"][0]) + (conditionRange[0]["row"][0] + 1);
        }
        else{
            v = conditionValue[0];
        }

        //返回条件格式规则名称
        if(conditionName == "greaterThan"){
            return "单元格值 > " + v;
        }
        else if(conditionName == "lessThan"){
            return "单元格值 < " + v;
        }
        else if(conditionName == "betweenness"){
            let v2;
            if(conditionRange[1] != null){
                v2 = chatatABC(conditionRange[1]["column"][0]) + (conditionRange[1]["row"][0] + 1);
            }
            else{
                v2 = conditionValue[1];
            }
            return "单元格值介于 "+ v +" 和 "+ v2 +" 之间";
        }
        else if(conditionName == "equal"){
            return "单元格值 = " + v;
        }
        else if(conditionName == "textContains"){
            return "单元格值包含 =" + v;
        }
        else if(conditionName == "occurrenceDate"){
            return conditionValue;
        }
        else if(conditionName == "duplicateValue"){
            if(conditionValue == "0"){
                return "重复值";
            }
            if(conditionValue == "1"){
                return "唯一值";
            }
        }
        else if(conditionName == "top10"){
            return "前 "+ v +" 个";
        }
        else if(conditionName == "top10%"){
            return "前 "+ v +"% 个";
        }
        else if(conditionName == "last10"){
            return "后 "+ v +" 个";
        }
        else if(conditionName == "last10%"){
            return "后 "+ v +"% 个";
        }
        else if(conditionName == "AboveAverage"){
            return "高于平均值";
        }
        else if(conditionName == "SubAverage"){
            return "低于平均值";
        }
    },
    newConditionRuleDialog: function(source){
        let _this = this;

        //规则说明
        let ruleExplainHtml = _this.getRuleExplain(0);
        
        //弹出层
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-administerRule-dialog").hide();
        $("#luckysheet-newConditionRule-dialog").remove();

        let content = '<div>' +
                        '<div class="boxTitle">选择规则类型：</div>' +
                        _this.ruleTypeHtml +
                        '<div class="boxTitle">编辑规则说明：</div>' +
                        '<div class="ruleExplainBox">' +
                            ruleExplainHtml +
                        '</div>' +
                      '</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-newConditionRule-dialog", 
            "addclass": "luckysheet-newEditorRule-dialog", 
            "title": "新建格式规则", 
            "content": content, 
            "botton": '<button id="luckysheet-newConditionRule-dialog-confirm" class="btn btn-primary" data-source="'+source+'">确定</button><button id="luckysheet-newConditionRule-dialog-close" class="btn btn-default" data-source="'+source+'">取消</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-newConditionRule-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 400)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-newConditionRule-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
        
        //index的规则类型focus
        $("#luckysheet-newConditionRule-dialog .ruleTypeBox .ruleTypeItem:eq(0)").addClass("on").siblings().removeClass("on");
    
        _this.colorSelectInit();
    },
    editorConditionRuleDialog: function(){
        let _this = this;

        let rule = _this.editorRule.data;
        let ruleType = rule["type"], ruleFormat = rule["format"];
        
        let index, type1;
        if(ruleType == "dataBar" || ruleType == "colorGradation" || ruleType == "icons"){
            index = 0;
            type1 = ruleType;
        }
        else{
            let conditionName = rule["conditionName"];

            if(conditionName == "greaterThan" || conditionName == "lessThan" || conditionName == "betweenness" || conditionName == "equal" || conditionName == "textContains" || conditionName == "occurrenceDate"){
                index = 1;

                if(conditionName == "greaterThan" || conditionName == "lessThan" || conditionName == "betweenness" || conditionName == "equal"){
                    type1 = "number";
                }
                else if(conditionName == "textContains"){
                    type1 = "text";
                }
                else if(conditionName == "occurrenceDate"){
                    type1 = "date";
                }
            }
            else if(conditionName == "top10" || conditionName == "top10%" || conditionName == "last10" || conditionName == "last10%"){
                index = 2;

                if(conditionName == "top10" || conditionName == "top10%"){
                    type1 = "top";
                }
                else if(conditionName == "last10" || conditionName == "last10%"){
                    type1 = "last";
                }
            }
            else if(conditionName == "AboveAverage" || conditionName == "SubAverage"){
                index = 3;
                type1 = conditionName;
            }
            else if(conditionName == "duplicateValue"){
                index = 4;
                type1 = rule["conditionValue"];
            }
        }

        //规则说明
        let ruleExplainHtml = _this.getRuleExplain(index);
        
        //弹出层
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-administerRule-dialog").hide();
        $("#luckysheet-editorConditionRule-dialog").remove();

        let content = '<div>' +
                        '<div class="boxTitle">选择规则类型：</div>' +
                        _this.ruleTypeHtml +
                        '<div class="boxTitle">编辑规则说明：</div>' +
                        '<div class="ruleExplainBox">' +
                            ruleExplainHtml +
                        '</div>' +
                      '</div>';

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-editorConditionRule-dialog", 
            "addclass": "luckysheet-newEditorRule-dialog", 
            "title": "编辑格式规则", 
            "content": content, 
            "botton": '<button id="luckysheet-editorConditionRule-dialog-confirm" class="btn btn-primary">确定</button><button id="luckysheet-editorConditionRule-dialog-close" class="btn btn-default">取消</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-editorConditionRule-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 400)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-editorConditionRule-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
        
        _this.colorSelectInit();

        //规则类型focus
        $("#luckysheet-editorConditionRule-dialog .ruleTypeBox .ruleTypeItem:eq(" + index + ")").addClass("on").siblings().removeClass("on");
        
        //type1
        $("#luckysheet-editorConditionRule-dialog #type1").val(type1);
        if(type1 == "dataBar" || type1 == "colorGradation" || type1 == "icons" || type1 == "number" || type1 == "text" || type1 == "date"){
            $("#luckysheet-editorConditionRule-dialog ." + type1 + "Box").show();
            $("#luckysheet-editorConditionRule-dialog ." + type1 + "Box").siblings().hide();
        }

        if(type1 == "date"){
            _this.daterangeInit("luckysheet-editorConditionRule-dialog");
        }

        //type2  format  value
        if(ruleType == "dataBar" || ruleType == "colorGradation" || ruleType == "icons"){
            if(type1 == "dataBar"){
                if(ruleFormat.length == 2){
                    $("#luckysheet-editorConditionRule-dialog .dataBarBox #type2").val("gradient");
                }
                else if(ruleFormat.length == 1){
                    $("#luckysheet-editorConditionRule-dialog .dataBarBox #type2").val("solid");
                }

                $("#luckysheet-editorConditionRule-dialog .dataBarBox .luckysheet-conditionformat-config-color").spectrum("set", ruleFormat[0]);                
            }
            else if(type1 == "colorGradation"){
                if(ruleFormat.length == 3){
                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox #type2").val("threeColor");

                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .midVal").show();

                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .maxVal .luckysheet-conditionformat-config-color").spectrum("set", ruleFormat[0]);
                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .midVal .luckysheet-conditionformat-config-color").spectrum("set", ruleFormat[1]);
                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .minVal .luckysheet-conditionformat-config-color").spectrum("set", ruleFormat[2]);                    
                }
                else if(ruleFormat.length == 2){
                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox #type2").val("twoColor");

                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .midVal").hide();

                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .maxVal .luckysheet-conditionformat-config-color").spectrum("set", ruleFormat[0]);
                    $("#luckysheet-editorConditionRule-dialog .colorGradationBox .minVal .luckysheet-conditionformat-config-color").spectrum("set", ruleFormat[1]);
                }
            }
            else if(type1 == "icons"){
                let len = ruleFormat["len"];
                let l = ruleFormat["leftMin"];
                let t = ruleFormat["top"];

                $("#luckysheet-editorConditionRule-dialog .iconsBox li").each(function(i, e){
                    if($(e).find("div").attr("data-len") == len && $(e).find("div").attr("data-leftmin") == l && $(e).find("div").attr("data-top") == t){
                        $("#luckysheet-editorConditionRule-dialog .iconsBox .showbox .model").css("background-position", $(e).find("div").css("background-position"));
                        $("#luckysheet-editorConditionRule-dialog .iconsBox .showbox .model").attr("data-len", $(e).find("div").attr("data-len"));
                        $("#luckysheet-editorConditionRule-dialog .iconsBox .showbox .model").attr("data-leftmin", $(e).find("div").attr("data-leftmin"));
                        $("#luckysheet-editorConditionRule-dialog .iconsBox .showbox .model").attr("data-top", $(e).find("div").attr("data-leftmin"));
                        $("#luckysheet-editorConditionRule-dialog .iconsBox .showbox .model").attr("title", $(e).find("div").attr("title"));

                        return true;
                    }
                });
            }
        }
        else{
            if(type1 == "number"){
                $("#luckysheet-editorConditionRule-dialog .numberBox #type2").val(conditionName);

                let val1;
                if(rule.conditionRange[0] != null){
                    val1 = getRangetxt(Store.currentSheetIndex, { "row": rule.conditionRange[0]["row"], "column": rule.conditionRange[0]["column"] }, Store.currentSheetIndex);
                }
                else{
                    val1 = rule.conditionValue[0];
                }

                $("#luckysheet-editorConditionRule-dialog .numberBox #conditionVal input").val(val1);

                if(conditionName == "betweenness"){
                    $("#luckysheet-editorConditionRule-dialog .numberBox .txt").show();
                    $("#luckysheet-editorConditionRule-dialog .numberBox #conditionVal2").show();

                    let val2;
                    if(rule.conditionRange[1] != null){
                        val2 = getRangetxt(Store.currentSheetIndex, { "row": rule.conditionRange[1]["row"], "column": rule.conditionRange[1]["column"] }, Store.currentSheetIndex);
                    }
                    else{
                        val2 = rule.conditionValue[1];
                    }

                    $("#luckysheet-editorConditionRule-dialog .numberBox #conditionVal2 input").val(val2);
                }
                else{
                    $("#luckysheet-editorConditionRule-dialog .numberBox .txt").hide();
                    $("#luckysheet-editorConditionRule-dialog .numberBox #conditionVal2").hide();
                }
            }
            else if(type1 == "text"){
                let val1;
                if(rule.conditionRange[0] != null){
                    val1 = getRangetxt(Store.currentSheetIndex, { "row": rule.conditionRange[0]["row"], "column": rule.conditionRange[0]["column"] }, Store.currentSheetIndex);
                }
                else{
                    val1 = rule.conditionValue[0];
                }

                $("#luckysheet-editorConditionRule-dialog .textBox #conditionVal input").val(val1);
            }
            else if(type1 == "date"){
                _this.daterangeInit("luckysheet-editorConditionRule-dialog");

                let val1 = rule.conditionValue[0];
                $("#luckysheet-editorConditionRule-dialog .dateBox #daterange-btn").val(val1);
            }
            else if(type1 == "top" || type1 == "last"){
                let val1 = rule.conditionValue[0];

                if(conditionName == "top10%" || conditionName == "last10%"){
                    $("#luckysheet-editorConditionRule-dialog #isPercent").attr("checked", "checked");
                }
            }
        }
    },
    infoDialog: function(title, content){
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-conditionformat-info-dialog").remove();
        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-conditionformat-info-dialog", 
            "addclass": "", 
            "title": title, 
            "content": content, 
            "botton": '<button id="luckysheet-conditionformat-info-dialog-close" class="btn btn-default">&nbsp;&nbsp;关闭&nbsp;&nbsp;</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-conditionformat-info-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-conditionformat-info-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
    },
    getRuleExplain: function(index){
        let textCellColorHtml = this.textCellColorHtml;
        
        let ruleExplainHtml;
        switch(index){
            case 0: //基于各自值设置所有单元格的格式
                ruleExplainHtml = '<div class="title">基于各自值设置所有单元格的格式：</div>' +
                                      '<div style="height: 30px;margin-bottom: 5px;">' +
                                        '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">格式样式：</label>' +
                                        '<select id="type1">' +
                                            '<option value="dataBar">数据条</option>' +
                                            '<option value="colorGradation">色阶</option>' +
                                            '<option value="icons">图标集</option>' +
                                        '</select>' +
                                      '</div>' +
                                      '<div>' +
                                        '<div class="type1Box dataBarBox">' +
                                            '<div style="height: 30px;margin-bottom: 5px;">' +
                                                '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">填充类型：</label>' +
                                                '<select id="type2">' +
                                                    '<option value="gradient">渐变</option>' +
                                                    '<option value="solid">实心</option>' +
                                                '</select>' +
                                            '</div>' +
                                            '<div style="height: 30px;margin-bottom: 5px;">' +
                                                '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">颜色：</label>' +
                                                '<input data-tips="数据条颜色" data-func="background" class="luckysheet-conditionformat-config-color" type="text" value="#638ec6" style="display: none;">' +    
                                            '</div>' +
                                        '</div>' +
                                        '<div class="type1Box colorGradationBox" style="display: none;">' +
                                            '<div style="height: 30px;margin-bottom: 5px;">' +
                                                '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">填充类型：</label>' +
                                                '<select id="type2">' +
                                                    '<option value="threeColor">三色</option>' +
                                                    '<option value="twoColor">双色</option>' +
                                                '</select>' +
                                            '</div>' +
                                            '<div class="maxVal" style="height: 30px;margin-bottom: 5px;">' +
                                                '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">最大值：</label>' +
                                                '<input data-tips="最大值颜色" data-func="background" class="luckysheet-conditionformat-config-color" type="text" value="rgb(99, 190, 123)" style="display: none;">' +
                                            '</div>' +
                                            '<div class="midVal" style="height: 30px;margin-bottom: 5px;">' +
                                                '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">中间值：</label>' +
                                                '<input data-tips="中间值颜色" data-func="background" class="luckysheet-conditionformat-config-color" type="text" value="rgb(255, 235, 132)" style="display: none;">' +
                                            '</div>' +
                                            '<div class="minVal" style="height: 30px;margin-bottom: 5px;">' +
                                                '<label style="display: block;width: 80px;height: 30px;line-height: 30px;float: left;">最小值：</label>' +
                                                '<input data-tips="最小值颜色" data-func="background" class="luckysheet-conditionformat-config-color" type="text" value="rgb(248, 105, 107)" style="display: none;">' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="type1Box iconsBox" style="display: none;">' +
                                            '<label>填充类型：</label>' +
                                            '<div class="showbox">' +
                                                '<div class="model" data-len="3" data-leftmin="0" data-top="0" title="三向箭头(彩色)" style="background-position: 0 0;"></div>' +
                                                '<span class="ui-selectmenu-icon ui-icon ui-icon-triangle-1-s" style="margin-top: 2px;"></span>' +
                                            '</div>' +
                                            '<ul>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="0" title="三向箭头(彩色)" style="background-position: 0 0;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="5" data-top="0" title="三向箭头(灰色)" style="background-position: -131px 0;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="1" title="3个三角形" style="background-position: 0 -20px;"></div></li>' +
                                                '<li><div data-len="4" data-leftmin="0" data-top="2" title="四向箭头(彩色)" style="background-position: 0 -40px;"></div></li>' +
                                                '<li><div data-len="4" data-leftmin="5" data-top="1" title="四向箭头(灰色)" style="background-position: -131px -20px;"></div></li>' +
                                                '<li><div data-len="5" data-leftmin="0" data-top="3" title="五向箭头(彩色)" style="background-position: 0 -60px;"></div></li>' +
                                                '<li><div data-len="5" data-leftmin="5" data-top="2" title="五向箭头(灰色)" style="background-position: -131px -40px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="4" title="三色交通灯(无边框)" style="background-position: 0 -80px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="5" data-top="4" title="三色交通灯(有边框)" style="background-position: -131px -80px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="5" title="三标志" style="background-position: 0 -100px;"></div></li>' +
                                                '<li><div data-len="4" data-leftmin="5" data-top="5" title="四色交通灯" style="background-position: -131px -100px;"></div></li>' +
                                                '<li><div data-len="4" data-leftmin="0" data-top="6" title="绿-红-黑渐变" style="background-position: 0 -120px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="7" title="三个符号(有圆圈)" style="background-position: 0 -140px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="5" data-top="7" title="三个符号(无圆圈)" style="background-position: -131px -140px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="8" title="三色旗" style="background-position: 0 -160px;"></div></li>' +
                                                '<li><div data-len="3" data-leftmin="0" data-top="9" title="3个星形" style="background-position: 0 -180px;"></div></li>' +
                                                '<li><div data-len="5" data-leftmin="0" data-top="10" title="五象限图" style="background-position: 0 -200px;"></div></li>' +
                                                '<li><div data-len="5" data-leftmin="0" data-top="11" title="5个框" style="background-position: 0 -220px;"></div></li>' +
                                                '<li><div data-len="4" data-leftmin="5" data-top="9" title="四等级" style="background-position: -131px -180px;"></div></li>' +
                                                '<li><div data-len="5" data-leftmin="5" data-top="10" title="五等级" style="background-position: -131px -200px;"></div></li>' +
                                            '</ul>' +
                                        '</div>' +
                                      '</div>';
                break;
            case 1: //只为包含以下内容的单元格设置格式
                ruleExplainHtml = '<div class="title">只为满足以下条件的单元格：</div>' +
                                      '<div style="height: 30px;margin-bottom: 10px;">' +
                                        '<select id="type1">' +
                                            '<option value="number">单元格值</option>' +
                                            '<option value="text">特定文本</option>' +
                                            '<option value="date">发生日期</option>' +
                                        '</select>'+
                                        '<div>' +
                                            '<div class="type1Box numberBox">' +
                                                '<select id="type2">' +
                                                    '<option value="greaterThan">大于</option>' +
                                                    '<option value="lessThan">小于</option>' +
                                                    '<option value="betweenness">介于</option>' +
                                                    '<option value="equal">等于</option>' +
                                                '</select>' +
                                                '<div class="inpbox range" id="conditionVal">' +
                                                    '<input class="formulaInputFocus"/><i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                '</div>' +
                                                '<span class="txt" style="display: none;">到</span>' +
                                                '<div class="inpbox range" id="conditionVal2" style="display: none;">' +
                                                    '<input class="formulaInputFocus"/><i class="fa fa-table" aria-hidden="true" title="点击选择数据范围"></i>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="type1Box textBox" style="display: none;">' +
                                                '<select id="type2">' +
                                                    '<option value="">包含</option>' +
                                                '</select>' +
                                                '<div class="inpbox range" id="conditionVal">' +
                                                    '<input class="formulaInputFocus"/><i class="fa fa-table" aria-hidden="true" title="点击选择单元格"></i>' +
                                                '</div>' +
                                            '</div>' +
                                            '<div class="type1Box dateBox" style="display: none;">' +
                                                '<div style="width: 162px;" class="inpbox">' +
                                                    '<input style="width: 150px;" id="daterange-btn" readonly="readonly" placeholder="请选择日期"/>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                      '</div>' +
                                      '<div class="title">设置格式：</div>' + textCellColorHtml;
                break;
            case 2: //仅对排名靠前或靠后的数值设置格式
                ruleExplainHtml = '<div class="title">为以下排名内的值：</div>'+
                                      '<div style="height: 30px;margin-bottom: 10px;">'+
                                        '<select id="type1">'+
                                            '<option value="top">前</option>'+
                                            '<option value="last">后</option>'+
                                        '</select>'+
                                        '<div class="inpbox" id="conditionVal">'+
                                            '<input class="formulaInputFocus" type="number" value="10"/>'+
                                        '</div>'+
                                        '<input id="isPercent" type="checkbox"/>'+
                                        '<label for="isPercent" class="txt">所选范围的百分比</label>'+
                                      '</div>'+
                                      '<div class="title">设置格式：</div>' + textCellColorHtml;
                break;
            case 3: //仅对高于或低于平均值的数值设置格式
                ruleExplainHtml = '<div class="title">为满足以下条件的值：</div>'+
                                      '<div style="height: 30px;margin-bottom: 10px;">'+
                                        '<select id="type1">'+
                                            '<option value="AboveAverage">高于</option>'+
                                            '<option value="SubAverage">低于</option>'+
                                        '</select>'+
                                        '<span class="txt">选定范围的平均值</span>'+
                                      '</div>'+
                                      '<div class="title">设置格式：</div>' + textCellColorHtml;
                break;
            case 4: //仅对唯一值或重复值设置格式
                ruleExplainHtml = '<div class="title">全部：</div>'+
                                      '<div style="height: 30px;margin-bottom: 10px;">'+
                                        '<select id="type1">'+
                                            '<option value="0">重复</option>'+
                                            '<option value="1">唯一</option>'+
                                        '</select>'+
                                        '<span class="txt">选定范围中的数值</span>'+
                                      '</div>'+
                                      '<div class="title">设置格式：</div>' + textCellColorHtml;
                break;
        }

        return ruleExplainHtml;
    },
    daterangeInit: function(id){
        //日期选择插件
        $('.ranges_1 ul').remove();
        $('#' + id).find("#daterange-btn").daterangepicker({
            ranges: 
                {
                    // '全部': [moment(), moment().subtract(-1, 'days')],
                    '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '今天': [moment(), moment()],
                    // '明天': [moment().subtract(-1, 'days'), moment().subtract(-1, 'days')],
                    '上周': [moment(moment().subtract(1, 'week')).subtract(new Date().getDay() - 1, 'days'), moment().subtract(new Date().getDay(), 'days')],
                    '本周': [moment().subtract(new Date().getDay() - 1, 'days'), moment().add(7 - new Date().getDay(), 'days')],
                    '上月': [moment(moment().format('YYYY-MM')).subtract(1, 'month'), moment(moment().format('YYYY-MM')).subtract(1, 'day')],
                    '本月': [moment().format('YYYY-MM'), moment(moment(moment().format('YYYY-MM')).add(1, 'month')).subtract(1, 'day')],
                    '去年': [moment(moment(moment().format('YYYY'))).subtract(1, 'years').format('YYYY'), moment(moment().format('YYYY')).subtract(1, 'day')],
                    '本年': [moment().format('YYYY'), moment(moment(moment().add(1, 'years')).format('YYYY')).subtract(1, 'day')],
                    '最近7天': [moment().subtract(6, 'days'), moment()],
                    '最近30天': [moment().subtract(29, 'days'), moment()]
                    // '未来七天': [moment(),moment().subtract(-6, 'days')],
                    // '未来30天': [moment(),moment().subtract(-29, 'days')],
                    // '未来60天': [moment(),moment().subtract(-59, 'days'), ]
                },
                startDate: moment(),
                endDate: moment()
            },
            function(start, end,label) {
                //label:通过它来知道用户选择的是什么，传给后台进行相应的展示
                if(label == '全部'){
                    $('#daterange-btn').val('');
                }
                else if(label == '昨天' || label == '今天'){
                    $('#daterange-btn').val(start.format('YYYY/MM/DD'));
                }
                else if(label == '上周' || label == '本周' || label == '上月' || label == '本月' || label == '去年' || label == '本年' || label == '最近7天' || label == '最近30天'){
                    $('#daterange-btn').val(start.format('YYYY/MM/DD')+'-'+end.format('YYYY/MM/DD'));
                }
            }
        ); 
    },
    CFSplitRange: function(range1, range2, range3, type){
        let range = [];

        let offset_r = range3["row"][0] - range2["row"][0];
        let offset_c = range3["column"][0] - range2["column"][0];
        
        let r1 = range1["row"][0], r2 = range1["row"][1];
        let c1 = range1["column"][0], c2 = range1["column"][1];

        if(r1 >= range2["row"][0] && r2 <= range2["row"][1] && c1 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 全部

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(r1 >= range2["row"][0] && r1 <= range2["row"][1] && c1 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 行贯穿 条件格式应用范围 上部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(r2 >= range2["row"][0] && r2 <= range2["row"][1] && c1 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 行贯穿 条件格式应用范围 下部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(r1 < range2["row"][0] && r2 > range2["row"][1] && c1 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 行贯穿 条件格式应用范围 中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(c1 >= range2["column"][0] && c1 <= range2["column"][1] && r1 >= range2["row"][0] && r2 <= range2["row"][1]){
            //选区 列贯穿 条件格式应用范围 左部分 

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, r2], "column": [range2["column"][1] + 1, c2] },
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, r2], "column": [range2["column"][1] + 1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(c2 >= range2["column"][0] && c2 <= range2["column"][1] && r1 >= range2["row"][0] && r2 <= range2["row"][1]){
            //选区 列贯穿 条件格式应用范围 右部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, r2], "column": [c1, range2["column"][0] - 1] },
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, r2], "column": [c1, range2["column"][0] - 1] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(c1 < range2["column"][0] && c2 > range2["column"][1] && r1 >= range2["row"][0] && r2 <= range2["row"][1]){
            //选区 列贯穿 条件格式应用范围 中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, r2], "column": [c1, range2["column"][0] - 1] },
                    { "row": [r1, r2], "column": [range2["column"][1] + 1, c2] },
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, r2], "column": [c1, range2["column"][0] - 1] },
                    { "row": [r1, r2], "column": [range2["column"][1] + 1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(r1 >= range2["row"][0] && r1 <= range2["row"][1] && c1 >= range2["column"][0] && c1 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 左上角部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(r1 >= range2["row"][0] && r1 <= range2["row"][1] && c2 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 右上角部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(r2 >= range2["row"][0] && r2 <= range2["row"][1] && c1 >= range2["column"][0] && c1 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 左下角部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], r2], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], r2], "column": [range2["column"][1] + 1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(r2 >= range2["row"][0] && r2 <= range2["row"][1] && c2 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 右下角部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], r2], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], r2], "column": [c1, range2["column"][0] - 1] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(r1 < range2["row"][0] && r2 > range2["row"][1] && c1 >= range2["column"][0] && c1 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 左中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [c1 + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(r1 < range2["row"][0] && r2 > range2["row"][1] && c2 >= range2["column"][0] && c2 <= range2["column"][1]){
            //选区 包含 条件格式应用范围 右中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, c2 + offset_c] }
                ];
            }
        }
        else if(c1 < range2["column"][0] && c2 > range2["column"][1] && r1 >= range2["row"][0] && r1 <= range2["row"][1]){
            //选区 包含 条件格式应用范围 上中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [r1, range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ]; 
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [r1, range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [r1 + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(c1 < range2["column"][0] && c2 > range2["column"][1] && r2 >= range2["row"][0] && r2 <= range2["row"][1]){
            //选区 包含 条件格式应用范围 下中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], r2], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][0], r2], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], r2], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][0], r2], "column": [range2["column"][1] + 1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, r2 + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else if(r1 < range2["row"][0] && r2 > range2["row"][1] && c1 < range2["column"][0] && c2 > range2["column"][1]){
            //选区 包含 条件格式应用范围 正中间部分

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] },
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, range2["row"][0] - 1], "column": [c1, c2] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [c1, range2["column"][0] - 1] },
                    { "row": [range2["row"][0], range2["row"][1]], "column": [range2["column"][1] + 1, c2] },
                    { "row": [range2["row"][1] + 1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [
                    { "row": [range2["row"][0] + offset_r, range2["row"][1] + offset_r], "column": [range2["column"][0] + offset_c, range2["column"][1] + offset_c] }
                ];
            }
        }
        else{
            //选区 在 条件格式应用范围 之外

            if(type == "allPart"){ //所有部分
                range = [
                    { "row": [r1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "restPart"){ //剩余部分
                range = [
                    { "row": [r1, r2], "column": [c1, c2] }
                ];
            }
            else if(type == "operatePart"){ //操作部分
                range = [];
            }
        }

        return range;
    },
    getcolorGradation: function(color1, color2, value1, value2, value){
        let rgb1 = color1.split(',');
        let r1 = parseInt(rgb1[0].split('(')[1]);
        let g1 = parseInt(rgb1[1]);
        let b1 = parseInt(rgb1[2].split(')')[0]);

        let rgb2 = color2.split(',');
        let r2 = parseInt(rgb2[0].split('(')[1]);
        let g2 = parseInt(rgb2[1]);
        let b2 = parseInt(rgb2[2].split(')')[0]);

        let r = Math.round(r1 - (r1 - r2) / (value1 - value2) * (value1 - value));
        let g = Math.round(g1 - (g1 - g2) / (value1 - value2) * (value1 - value));
        let b = Math.round(b1 - (b1 - b2) / (value1 - value2) * (value1 - value));

        return "rgb("+ r +", "+ g +", "+ b +")";
    },
    getCFPartRange: function(sheetIndex, range1, range2){
        let ruleArr = [];

        let cf = Store.luckysheetfile[getSheetIndex(sheetIndex)].luckysheet_conditionformat_save;
        if(cf != null && cf.length > 0){
            label:  for(let i = 0; i < cf.length; i++){
                        let cellrange = cf[i].cellrange;

                        for(let j = 0; j < cellrange.length; j++){
                            let r1 = cellrange[j].row[0], r2 = cellrange[j].row[1];
                            let c1 = cellrange[j].column[0], c2 = cellrange[j].column[1];

                            for(let s = 0; s < range.length; s++){
                                if((range[s].row[0] >= r1 && range[s].row[0] <= r2) || (range[s].row[1] >= r1 && range[s].row[1] <= r2) || (range[s].column[0] >= c1 && range[s].column[0] <= c2) || (range[s].column[1] >= c1 && range[s].column[1] <= c2)){
                                    ruleArr.push(cf[i]);

                                    continue label;
                                }
                            }
                        }
                    }
        }

        return ruleArr;
    },
    checksCF: function(r, c, computeMap){
        if(computeMap != null &&　(r + "_" + c) in computeMap){
            return computeMap[r + "_" + c];
        }
        else{
            return null;
        }
    },
    getComputeMap: function(){
        let index = getSheetIndex(Store.currentSheetIndex);

        let ruleArr = Store.luckysheetfile[index]["luckysheet_conditionformat_save"];
        let data = Store.luckysheetfile[index]["data"];

        if(data == null){
            return null;
        }

        let computeMap = this.compute(ruleArr, data);

        return computeMap;
    },
    compute: function(ruleArr, d){
        let _this = this;

        if(ruleArr == null){
            ruleArr = [];
        }

        //条件计算存储
        let computeMap = {};

        if(ruleArr.length > 0){
            for(let i = 0; i < ruleArr.length; i++){
                let type = ruleArr[i]["type"];
                let cellrange = ruleArr[i]["cellrange"];
                let format = ruleArr[i]["format"];

                if(type == "dataBar"){ //数据条
                    let max = null, min = null;

                    for(let s = 0; s < cellrange.length; s++){
                        for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                            for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                if(d[r] == null || d[r][c] == null){
                                    continue;
                                }

                                let cell = d[r][c];

                                if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                    if(max == null || parseInt(cell.v) > max){
                                        max = parseInt(cell.v);
                                    }

                                    if(min == null || parseInt(cell.v) < min){
                                        min = parseInt(cell.v);
                                    }
                                }
                            }
                        }
                    }

                    if(max != null && min != null){
                        if(min < 0){ //选区范围内有负数
                            let plusLen = Math.round(max / (max - min) * 10) / 10;                //正数所占比
                            let minusLen = Math.round(Math.abs(min) / (max - min) * 10) / 10;     //负数所占比

                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            if(parseInt(cell.v) < 0){ //负数
                                                let valueLen = Math.round(Math.abs(parseInt(cell.v)) / Math.abs(min) * 100) / 100;

                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["dataBar"] = { "valueType": "minus", "minusLen": minusLen, "valueLen": valueLen, "format": format };
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "dataBar": { "valueType": "minus", "minusLen": minusLen, "valueLen": valueLen, "format": format } };    
                                                }
                                            }

                                            if(parseInt(cell.v) > 0){ //正数
                                                let valueLen = Math.round(parseInt(cell.v) / max * 100) / 100;

                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["dataBar"] = { "valueType": "plus", "plusLen": plusLen, "minusLen": minusLen, "valueLen": valueLen, "format": format };
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "dataBar": { "valueType": "plus", "plusLen": plusLen, "minusLen": minusLen, "valueLen": valueLen, "format": format } };    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else{
                            let plusLen = 1;

                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            let valueLen;
                                            if(max == 0){
                                                valueLen = 1;
                                            }
                                            else{
                                                valueLen = Math.round(parseInt(cell.v) / max * 100) / 100;
                                            }

                                            if((r + "_" + c) in computeMap){
                                                computeMap[r + "_" + c]["dataBar"] = { "valueType": "plus", "plusLen": plusLen, "valueLen": valueLen, "format": format };
                                            }
                                            else{
                                                computeMap[r + "_" + c] = { "dataBar": { "valueType": "plus", "plusLen": plusLen, "valueLen": valueLen, "format": format } };    
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(type == "colorGradation"){ //色阶
                    let max = null, min = null, sum = 0, count = 0;

                    for(let s = 0; s < cellrange.length; s++){
                        for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                            for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                if(d[r] == null || d[r][c] == null){
                                    continue;
                                }

                                let cell = d[r][c];

                                if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                    count++;
                                    sum += parseInt(cell.v);

                                    if(max == null || parseInt(cell.v) > max){
                                        max = parseInt(cell.v);
                                    }

                                    if(min == null || parseInt(cell.v) < min){
                                        min = parseInt(cell.v);
                                    }
                                }
                            }
                        }
                    }

                    if(max != null && min != null){
                        if(format.length == 3){ //三色色阶
                            let avg = Math.floor(sum / count);

                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            if(parseInt(cell.v) == min){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = format[2];
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": format[2] };    
                                                }
                                            }
                                            else if(parseInt(cell.v) > min && parseInt(cell.v) < avg){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = _this.getcolorGradation(format[2], format[1], min, avg, parseInt(cell.v));
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": _this.getcolorGradation(format[2], format[1], min, avg, parseInt(cell.v)) };    
                                                }
                                            }
                                            else if(parseInt(cell.v) == avg){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = format[1];
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": format[1] };    
                                                }
                                            }
                                            else if(parseInt(cell.v) > avg && parseInt(cell.v) < max){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = _this.getcolorGradation(format[1], format[0], avg, max, parseInt(cell.v));
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": _this.getcolorGradation(format[1], format[0], avg, max, parseInt(cell.v)) };    
                                                }
                                            }
                                            else if(parseInt(cell.v) == max){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = format[0];
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": format[0] };    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }   
                        else if(format.length == 2){ //两色色阶
                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            if(parseInt(cell.v) == min){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = format[1];
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": format[1] };    
                                                }
                                            }
                                            else if(parseInt(cell.v) > min && parseInt(cell.v) < max){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = _this.getcolorGradation(format[1], format[0], min, max, parseInt(cell.v));
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": _this.getcolorGradation(format[1], format[0], min, max, parseInt(cell.v)) };    
                                                }
                                            }
                                            else if(parseInt(cell.v) == max){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["cellColor"] = format[0];
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "cellColor": format[0] };    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else if(type == "icons"){ //图标集
                    let len = parseInt(format["len"]);
                    let leftMin = parseInt(format["leftMin"]);
                    let top = parseInt(format["top"]);

                    let max = null, min = null;

                    for(let s = 0; s < cellrange.length; s++){
                        for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                            for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                if(d[r] == null || d[r][c] == null){
                                    continue;
                                }

                                let cell = d[r][c];

                                if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                    if(max == null || parseInt(cell.v) > max){
                                        max = parseInt(cell.v);
                                    }

                                    if(min == null || parseInt(cell.v) < min){
                                        min = parseInt(cell.v);
                                    }
                                }
                            }
                        }
                    }

                    if(max != null && min != null){
                        let a = Math.floor((max - min + 1) / len);
                        let b = (max - min + 1) % len;

                        if(len == 3){ //一组图标有三个
                            let v1, v2, v3;
                            if(b == 2){
                                v1 = [min, min + a];
                                v2 = [min + a + 1, min + a * 2];
                                v3 = [min + a * 2 + 1, max];
                            }
                            else{
                                v1 = [min, min + a - 1];
                                v2 = [min + a, min + a * 2 - 1];
                                v3 = [min + a * 2, max];   
                            }

                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            if(parseInt(cell.v) >= v1[0] && parseInt(cell.v) <= v1[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 2, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 2, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v2[0] && parseInt(cell.v) <= v2[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 1, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 1, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v3[0] && parseInt(cell.v) <= v3[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin, "top": top} };    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if(len == 4){ //一组图标有四个
                            let v1, v2, v3, v4;
                            if(b == 2){
                                v1 = [min, min + a];
                                v2 = [min + a + 1, min + a * 2];
                                v3 = [min + a * 2 + 1, min + a * 3];
                                v4 = [min + a * 3 + 1, max];
                            }
                            else if(b == 3){
                                v1 = [min, min + a];
                                v2 = [min + a + 1, min + a * 2];
                                v3 = [min + a * 2 + 1, min + a * 3 + 1];
                                v4 = [min + a * 3 + 2, max];
                            }
                            else{
                                v1 = [min, min + a - 1];
                                v2 = [min + a, min + a * 2 - 1];
                                v3 = [min + a * 2, min + a * 3 - 1];
                                v4 = [min + a * 3, max];
                            }

                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            if(parseInt(cell.v) >= v1[0] && parseInt(cell.v) <= v1[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 3, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 3, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v2[0] && parseInt(cell.v) <= v2[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 2, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 2, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v3[0] && parseInt(cell.v) <= v3[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 1, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 1, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v4[0] && parseInt(cell.v) <= v4[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin, "top": top} };    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if(len == 5){ //一组图标有五个
                            let v1, v2, v3, v4, v5;
                            if(b == 2){
                                v1 = [min, min + a];
                                v2 = [min + a + 1, min + a * 2];
                                v3 = [min + a * 2 + 1, min + a * 3];
                                v4 = [min + a * 3 + 1, min + a * 4];
                                v5 = [min + a * 4 + 1, max];
                            }
                            else if(b == 3){
                                v1 = [min, min + a];
                                v2 = [min + a + 1, min + a * 2];
                                v3 = [min + a * 2 + 1, min + a * 3 + 1];
                                v4 = [min + a * 3 + 2, min + a * 4 + 1];
                                v5 = [min + a * 4 + 2, max];
                            }
                            else if(b == 4){
                                v1 = [min, min + a];
                                v2 = [min + a + 1, min + a * 2 + 1];
                                v3 = [min + a * 2 + 2, min + a * 3 + 1];
                                v4 = [min + a * 3 + 2, min + a * 4 + 2];
                                v5 = [min + a * 4 + 3, max];
                            }
                            else{
                                v1 = [min, min + a - 1];
                                v2 = [min + a, min + a * 2 - 1];
                                v3 = [min + a * 2, min + a * 3 - 1];
                                v4 = [min + a * 3, min + a * 4 - 1];
                                v5 = [min + a * 4, max];
                            }

                            for(let s = 0; s < cellrange.length; s++){
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        let cell = d[r][c];

                                        if(getObjType(cell) == "object" && cell["ct"] != null && cell["ct"].t == "n" && cell.v != null){
                                            if(parseInt(cell.v) >= v1[0] && parseInt(cell.v) <= v1[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 4, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 4, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v2[0] && parseInt(cell.v) <= v2[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 3, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 3, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v3[0] && parseInt(cell.v) <= v3[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 2, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 2, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v4[0] && parseInt(cell.v) <= v4[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin + 1, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin + 1, "top": top} };    
                                                }
                                            }
                                            else if(parseInt(cell.v) >= v5[0] && parseInt(cell.v) <= v5[1]){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["icons"] = {"left": leftMin, "top": top};
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "icons": {"left": leftMin, "top": top} };    
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else{
                    //获取变量值
                    let conditionName = ruleArr[i].conditionName,         //条件名称
                        conditionValue0 = ruleArr[i].conditionValue[0],   //条件值1
                        conditionValue1 = ruleArr[i].conditionValue[1],   //条件值2
                        textColor = format.textColor,          //条件格式文本颜色 fc
                        cellColor = format.cellColor;          //条件格式单元格颜色 bg
                    
                    for(let s = 0; s < cellrange.length; s++){
                        //条件类型判断    
                        if(conditionName == "greaterThan" || conditionName == "lessThan" || conditionName == "equal" || conditionName == "textContains"){
                            //循环应用范围计算
                            for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                    if(d[r] == null || d[r][c] == null){
                                        continue;
                                    }

                                    //单元格值
                                    let cell = d[r][c];

                                    if(getObjType(cell) != "object" || isRealNull(cell.v)){
                                        continue;
                                    }

                                    //符合条件
                                    if(conditionName == "greaterThan" && cell.v > conditionValue0){
                                        if((r + "_" + c) in computeMap){
                                            computeMap[r + "_" + c]["textColor"] = textColor;
                                            computeMap[r + "_" + c]["cellColor"] = cellColor;    
                                        }
                                        else{
                                            computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                        }
                                    }
                                    else if(conditionName == "lessThan" && cell.v < conditionValue0){
                                        if((r + "_" + c) in computeMap){
                                            computeMap[r + "_" + c]["textColor"] = textColor;
                                            computeMap[r + "_" + c]["cellColor"] = cellColor;    
                                        }
                                        else{
                                            computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                        }
                                    }
                                    else if(conditionName == "equal" && cell.v == conditionValue0){
                                        if((r + "_" + c) in computeMap){
                                            computeMap[r + "_" + c]["textColor"] = textColor;
                                            computeMap[r + "_" + c]["cellColor"] = cellColor;    
                                        }
                                        else{
                                            computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                        }
                                    }
                                    else if(conditionName == "textContains" && cell.v.toString().indexOf(conditionValue0) != -1){
                                        if((r + "_" + c) in computeMap){
                                            computeMap[r + "_" + c]["textColor"] = textColor;
                                            computeMap[r + "_" + c]["cellColor"] = cellColor;    
                                        }
                                        else{
                                            computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                        }
                                    }
                                }
                            }
                        }
                        else if(conditionName == "betweenness"){
                            //比较条件值1和条件值2的大小
                            let vBig, vSmall;
                            if(conditionValue0 > conditionValue1){
                                vBig = conditionValue0;
                                vSmall = conditionValue1;
                            }
                            else{
                                vBig = conditionValue1;
                                vSmall = conditionValue0;
                            }
                            //循环应用范围计算
                            for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                    if(d[r] == null || d[r][c] == null){
                                        continue;
                                    }

                                    //单元格值
                                    let cell = d[r][c];

                                    if(getObjType(cell) != "object" || isRealNull(cell.v)){
                                        continue;
                                    }

                                    //符合条件
                                    if(cell.v >= vSmall && cell.v <= vBig){
                                        if((r + "_" + c) in computeMap){
                                            computeMap[r + "_" + c]["textColor"] = textColor;
                                            computeMap[r + "_" + c]["cellColor"] = cellColor;    
                                        }
                                        else{
                                            computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                        }
                                    }
                                }
                            }
                        }
                        else if(conditionName == "occurrenceDate"){
                            //获取日期所对应的数值
                            let dBig, dSmall;
                            if(conditionValue0.toString().indexOf("-") == -1){
                                dBig = genarate(conditionValue0)[2];
                                dSmall = genarate(conditionValue0)[2];
                            }
                            else{
                                dBig = genarate(conditionValue0.toString().split("-")[1])[2];   
                                dSmall = genarate(conditionValue0.toString().split("-")[0])[2];
                            }
                            //循环应用范围计算
                            for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                    if(d[r] == null || d[r][c] == null){
                                        continue;
                                    }

                                    //单元格值类型为日期类型
                                    if(d[r][c].ct != null && d[r][c].ct.t == "d"){
                                        //单元格值
                                        let cellVal = getcellvalue(r, c, d); 
                                        //符合条件
                                        if(cellVal >= dSmall && cellVal <= dBig){
                                            if((r + "_" + c) in computeMap){
                                                computeMap[r + "_" + c]["textColor"] = textColor;
                                                computeMap[r + "_" + c]["cellColor"] = cellColor;    
                                            }
                                            else{
                                                computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        else if(conditionName == "duplicateValue"){
                            //应用范围单元格值处理
                            let dmap = {};
                            for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                    let item = getcellvalue(r, c, d);
                                    if(!(item in dmap)){
                                        dmap[item] = [];
                                    }
                                    dmap[item].push({"r": r, "c": c});
                                }
                            }
                            //循环应用范围计算
                            if(conditionValue0 == "0"){//重复值
                                for(let x in dmap){
                                    if(x != "null" && x != "undefined" && dmap[x].length > 1){
                                        for(let j = 0; j < dmap[x].length; j++){
                                            if((dmap[x][j].r + "_" + dmap[x][j].c) in computeMap){
                                                computeMap[dmap[x][j].r + "_" + dmap[x][j].c]["textColor"] = textColor;
                                                computeMap[dmap[x][j].r + "_" + dmap[x][j].c]["cellColor"] = cellColor;    
                                            }
                                            else{
                                                computeMap[dmap[x][j].r + "_" + dmap[x][j].c] = { "textColor": textColor, "cellColor": cellColor };
                                            }
                                        }
                                    }
                                }    
                            }
                            if(conditionValue0 == "1"){//唯一值
                                for(let x in dmap){
                                    if(x != "null" && x != "undefined" && dmap[x].length == 1){
                                        if((dmap[x][0].r + "_" + dmap[x][0].c) in computeMap){
                                            computeMap[dmap[x][0].r + "_" + dmap[x][0].c]["textColor"] = textColor;
                                            computeMap[dmap[x][0].r + "_" + dmap[x][0].c]["cellColor"] = cellColor;    
                                        }
                                        else{
                                            computeMap[dmap[x][0].r + "_" + dmap[x][0].c] = { "textColor": textColor, "cellColor": cellColor };
                                        }
                                    }
                                }    
                            }
                        }
                        else if(conditionName == "top10" || conditionName == "top10%" || conditionName == "last10" || conditionName == "last10%" || conditionName == "AboveAverage" || conditionName == "SubAverage"){
                            //应用范围单元格值(数值型)
                            let dArr=[]; 
                            for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                    if(d[r] == null || d[r][c] == null){
                                        continue;
                                    }

                                    //单元格值类型为数字类型
                                    if(d[r][c].ct != null && d[r][c].ct.t == "n"){
                                        dArr.push(getcellvalue(r, c, d));
                                    }
                                }
                            }
                            //数组处理
                            if(conditionName == "top10" || conditionName == "top10%" || conditionName == "last10" || conditionName == "last10%"){
                                //从大到小排序
                                for(let j = 0; j < dArr.length; j++){
                                    for(let k = 0; k < dArr.length - 1 - j; k++){
                                        if(dArr[k]<dArr[k+1]){
                                            let temp=dArr[k];
                                            dArr[k]=dArr[k+1];
                                            dArr[k+1]=temp;
                                        }
                                    }
                                }
                                //取条件值数组
                                let cArr
                                if(conditionName == "top10"){
                                    cArr = dArr.slice(0, conditionValue0); //前10项数组
                                }
                                else if(conditionName == "top10%"){
                                    cArr = dArr.slice(0, Math.floor(conditionValue0*dArr.length/100)); //前10%数组
                                }
                                else if(conditionName == "last10"){
                                    cArr = dArr.slice((dArr.length-conditionValue0), dArr.length); //最后10项数组
                                }
                                else if(conditionName == "last10%"){
                                    cArr = dArr.slice((dArr.length-Math.floor(conditionValue0*dArr.length/100)), dArr.length); //最后10%数组
                                }
                                //循环应用范围计算
                                for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                    for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                        if(d[r] == null || d[r][c] == null){
                                            continue;
                                        }

                                        //单元格值
                                        let cellVal = getcellvalue(r, c, d);
                                        //符合条件
                                        if(cArr.indexOf(cellVal) != -1){
                                            if((r + "_" + c) in computeMap){
                                                computeMap[r + "_" + c]["textColor"] = textColor;
                                                computeMap[r + "_" + c]["cellColor"] = cellColor;
                                            }
                                            else{
                                                computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                            }
                                        }
                                    }
                                }
                            }
                            else if(conditionName == "AboveAverage" || conditionName == "SubAverage"){
                                //计算数组平均值
                                let sum = 0;
                                for(let j = 0; j < dArr.length; j++){  
                                    sum += dArr[j];
                                }
                                let averageNum = sum / dArr.length;
                                //循环应用范围计算
                                if(conditionName == "AboveAverage"){ //高于平均值
                                    for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                        for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                            if(d[r] == null || d[r][c] == null){
                                                continue;
                                            }

                                            //单元格值
                                            let cellVal = getcellvalue(r, c, d);
                                            //符合条件
                                            if(cellVal > averageNum){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["textColor"] = textColor;
                                                    computeMap[r + "_" + c]["cellColor"] = cellColor;
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                                }
                                            }
                                        }
                                    }
                                }
                                else if(conditionName == "SubAverage"){ //低于平均值
                                    for(let r = cellrange[s].row[0]; r <= cellrange[s].row[1]; r++){
                                        for(let c = cellrange[s].column[0]; c <= cellrange[s].column[1]; c++){
                                            if(d[r] == null || d[r][c] == null){
                                                continue;
                                            }

                                            //单元格值
                                            let cellVal = getcellvalue(r, c, d);
                                            //符合条件
                                            if(cellVal < averageNum){
                                                if((r + "_" + c) in computeMap){
                                                    computeMap[r + "_" + c]["textColor"] = textColor;
                                                    computeMap[r + "_" + c]["cellColor"] = cellColor;
                                                }
                                                else{
                                                    computeMap[r + "_" + c] = { "textColor": textColor, "cellColor": cellColor };
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return computeMap;
    },
    updateItem: function(type, cellrange, format){
        let _this = this;
        let index = getSheetIndex(Store.currentSheetIndex);

        //保存之前的规则
        let fileH = $.extend(true, [], Store.luckysheetfile);
        let historyRules = _this.getHistoryRules(fileH);
        
        //保存当前的规则
        let ruleArr;
        if(type == "delSheet"){
            ruleArr = [];
        }
        else{
            let rule = {
                "type": type, 
                "cellrange": cellrange, 
                "format": format
            };
            ruleArr = Store.luckysheetfile[index]["luckysheet_conditionformat_save"] == null ? [] : Store.luckysheetfile[index]["luckysheet_conditionformat_save"];
            ruleArr.push(rule);
        }

        Store.luckysheetfile[index]["luckysheet_conditionformat_save"] = ruleArr;

        let fileC = $.extend(true, [], Store.luckysheetfile);
        let currentRules = _this.getCurrentRules(fileC);

        //刷新一次表格
        _this.ref(historyRules, currentRules);

        //发送给后台
        if(server.allowUpdate){
            server.saveParam("all", Store.currentSheetIndex, ruleArr, { "k": "luckysheet_conditionformat_save" });
        }
    },
    getHistoryRules: function(fileH){
        let historyRules = [];

        for(let h = 0; h < fileH.length; h++){
            historyRules.push({"sheetIndex": fileH[h]["index"], "luckysheet_conditionformat_save": fileH[h]["luckysheet_conditionformat_save"]});
        }

        return historyRules;
    },
    getCurrentRules: function(fileC){
        let currentRules = [];

        for(let c = 0; c < fileC.length; c++){
            currentRules.push({"sheetIndex": fileC[c]["index"], "luckysheet_conditionformat_save": fileC[c]["luckysheet_conditionformat_save"]});
        }

        return currentRules;
    },
    ref: function(historyRules, currentRules){
        if (Store.clearjfundo) {
            Store.jfundo = [];

            let redo = {};
            redo["type"] = "updateCF";
            redo["data"] = {"historyRules": historyRules, "currentRules": currentRules};
            Store.jfredo.push(redo); 
        }

        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    }
}

export default conditionformat;