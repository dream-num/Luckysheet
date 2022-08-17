
import { getSheetIndex, getRangetxt } from '../methods/get';
import { replaceHtml } from '../utils/util';
import formula from '../global/formula';
import { isEditMode } from '../global/validate';
import tooltip from '../global/tooltip';
import { luckysheetrefreshgrid } from '../global/refresh';
import { luckysheetAlternateformatHtml, modelHTML } from './constant';
import luckysheetsizeauto from './resize';
import server from './server';
import { selectHightlightShow } from './select';
import Store from '../store';
import locale from '../locale/locale';

//交替颜色
const alternateformat = {
    rangefocus: false,
    modelfocusIndex: null,
    FixedModelColor: [
        {
            "head": { "fc": "#000", "bc": "#bfbdbe" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f8f3f7" },
            "foot": { "fc": "#000", "bc": "#dde2de" }
        },
        {
            "head": { "fc": "#000", "bc": "#4bd4e7" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#eaf7ff" },
            "foot": { "fc": "#000", "bc": "#aae9f8" }
        },
        {
            "head": { "fc": "#000", "bc": "#5ed593" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#e5fbee" },
            "foot": { "fc": "#000", "bc": "#a5efcc" }
        },
        {
            "head": { "fc": "#000", "bc": "#f6cb4b" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#fff9e7" },
            "foot": { "fc": "#000", "bc": "#ffebac" }
        },
        {
            "head": { "fc": "#000", "bc": "#f96420" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#ffe5d9" },
            "foot": { "fc": "#000", "bc": "#ffcfba" }
        },
        {
            "head": { "fc": "#000", "bc": "#5599fc" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#ecf2fe" },
            "foot": { "fc": "#000", "bc": "#afcbfa" }
        },
        {
            "head": { "fc": "#000", "bc": "#22a69b" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#dff2f8" },
            "foot": { "fc": "#000", "bc": "#8dd4d0" }
        },
        {
            "head": { "fc": "#000", "bc": "#7a939a" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f0eff7" },
            "foot": { "fc": "#000", "bc": "#bdcad0" }
        },
        {
            "head": { "fc": "#000", "bc": "#d7a270" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#fdf3f1" },
            "foot": { "fc": "#000", "bc": "#ead2b6" }
        },
        {
            "head": { "fc": "#000", "bc": "#89c54b" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f1f7e9" },
            "foot": { "fc": "#000", "bc": "#c5e3a7" }
        },
        {
            "head": { "fc": "#000", "bc": "#8f88f0" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f0e5ff" },
            "foot": { "fc": "#000", "bc": "#c6c4f6" }
        },
        {
            "head": { "fc": "#000", "bc": "#fd1664" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#feddee" },
            "foot": { "fc": "#000", "bc": "#f98ab5" }
        },
        {
            "head": { "fc": "#000", "bc": "#da96d3" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#fce8fb" },
            "foot": { "fc": "#000", "bc": "#f2caee" }
        },
        {
            "head": { "fc": "#000", "bc": "#b49191" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f5ebe8" },
            "foot": { "fc": "#000", "bc": "#d8c3c3" }
        },
        {
            "head": { "fc": "#000", "bc": "#91b493" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f0fbf0" },
            "foot": { "fc": "#000", "bc": "#b4cfb6" }
        },
        {
            "head": { "fc": "#000", "bc": "#b4a891" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f8f6f1" },
            "foot": { "fc": "#000", "bc": "#d3cab8" }
        },
        {
            "head": { "fc": "#000", "bc": "#91abb4" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#eff7fa" },
            "foot": { "fc": "#000", "bc": "#b7cbd3" }
        },
        {
            "head": { "fc": "#000", "bc": "#b7ba82" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#fafbeb" },
            "foot": { "fc": "#000", "bc": "#dadcb4" }
        },
        {
            "head": { "fc": "#000", "bc": "#df3e3e" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#fde9e9" },
            "foot": { "fc": "#000", "bc": "#f89292" }
        },
        {
            "head": { "fc": "#000", "bc": "#f2711c" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#fef0d7" },
            "foot": { "fc": "#000", "bc": "#fbb335" }
        },
        {
            "head": { "fc": "#000", "bc": "#b5cc18" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f9fbd4" },
            "foot": { "fc": "#000", "bc": "#e2ed2a" }
        },
        {
            "head": { "fc": "#000", "bc": "#00b5ad" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#ccfaf9" },
            "foot": { "fc": "#000", "bc": "#00e4df" }
        },
        {
            "head": { "fc": "#000", "bc": "#2185d0" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#d8f3fc" },
            "foot": { "fc": "#000", "bc": "#3cc4f0" }
        },
        {
            "head": { "fc": "#000", "bc": "#a5673f" },
            "one":  { "fc": "#000", "bc": "#ffffff" },
            "two":  { "fc": "#000", "bc": "#f6ede5" },
            "foot": { "fc": "#000", "bc": "#d3a47c" }
        }            
    ],
    getModelBox: function(hasRowHeader, hasRowFooter){
        let _this = this;

        $("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelList").empty();
        $("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelCustom").empty();

        //格式样式 模板
        let modelListHtml = '';

        for(let i = 0; i < _this.FixedModelColor.length; i++){
            let obj = _this.FixedModelColor[i];

            let color1, color2, color3, color4;

            if(hasRowHeader && hasRowFooter){
                color1 = obj["head"];
                color2 = obj["one"];
                color3 = obj["two"];
                color4 = obj["foot"];
            }
            else if(hasRowHeader){
                color1 = obj["head"];
                color2 = obj["one"];
                color3 = obj["two"];
                color4 = obj["one"];
            }
            else if(hasRowFooter){
                color1 = obj["one"];
                color2 = obj["two"];
                color3 = obj["one"];
                color4 = obj["foot"];
            }
            else{
                color1 = obj["one"];
                color2 = obj["two"];
                color3 = obj["one"];
                color4 = obj["two"];
            }

            modelListHtml += '<div class="modelbox">'+
                                '<div class="box">'+
                                    '<span style="color:'+ color1["fc"] +';background-color:'+ color1["bc"] +'"> — </span>'+
                                    '<span style="color:'+ color2["fc"] +';background-color:'+ color2["bc"] +'"> — </span>'+
                                    '<span style="color:'+ color3["fc"] +';background-color:'+ color3["bc"] +'"> — </span>'+
                                    '<span style="color:'+ color4["fc"] +';background-color:'+ color4["bc"] +'"> — </span>'+
                                '</div>'+
                             '</div>';
        }

        $("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelList").append(modelListHtml);

        //自定义 模板
        let modelCustom = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_alternateformat_save_modelCustom"];
        if(modelCustom != null && modelCustom.length > 0){
            let modelCustomHtml = '';

            for(let i = 0; i < modelCustom.length; i++){
                let obj = modelCustom[i];

                let color1, color2, color3, color4;

                if(hasRowHeader && hasRowFooter){
                    color1 = obj["head"];
                    color2 = obj["one"];
                    color3 = obj["two"];
                    color4 = obj["foot"];
                }
                else if(hasRowHeader){
                    color1 = obj["head"];
                    color2 = obj["one"];
                    color3 = obj["two"];
                    color4 = obj["one"];
                }
                else if(hasRowFooter){
                    color1 = obj["one"];
                    color2 = obj["two"];
                    color3 = obj["one"];
                    color4 = obj["foot"];
                }
                else{
                    color1 = obj["one"];
                    color2 = obj["two"];
                    color3 = obj["one"];
                    color4 = obj["two"];
                }

                modelCustomHtml +=  '<div class="modelbox">'+
                                        '<div class="box">'+
                                            '<span style="color:'+ color1["fc"] +';background-color:'+ color1["bc"] +'"> — </span>'+
                                            '<span style="color:'+ color2["fc"] +';background-color:'+ color2["bc"] +'"> — </span>'+
                                            '<span style="color:'+ color3["fc"] +';background-color:'+ color3["bc"] +'"> — </span>'+
                                            '<span style="color:'+ color4["fc"] +';background-color:'+ color4["bc"] +'"> — </span>'+
                                        '</div>'+
                                    '</div>';
            }

            $("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-modelCustom").append(modelCustomHtml);
        }
    },
    init: function(){
        let _this = this;

        $("#luckysheet-modal-dialog-slider-alternateformat").remove();
        $("body").append(luckysheetAlternateformatHtml());
        luckysheetsizeauto();

        //关闭
        $("#luckysheet-modal-dialog-slider-alternateformat .luckysheet-model-close-btn").click(function () {
            $("#luckysheet-modal-dialog-slider-alternateformat").hide();
            luckysheetsizeauto();
        });

        //应用范围
        $(document).off("focus.AFrangeInput").on("focus.AFrangeInput", "#luckysheet-alternateformat-range input", function(){
            _this.rangefocus = true;
        });
        $(document).off("blur.AFrangeInput").on("blur.AFrangeInput", "#luckysheet-alternateformat-range input", function(){
            _this.rangefocus = false;
        });

        $(document).off("keydown.AFrangeInput").on("keydown.AFrangeInput", "#luckysheet-alternateformat-range input", function(e){
            let rangeValue = $(this).val().trim();
            if(e.keyCode == 13){
                _this.update();
            }
        });
        $(document).off("click.AFrangeIcon").on("click.AFrangeIcon", "#luckysheet-alternateformat-range .fa-table", function(){
            $("#luckysheet-modal-dialog-slider-alternateformat").hide();
            luckysheetsizeauto();

            let rangeValue = $(this).parents("#luckysheet-alternateformat-range").find("input").val().trim();
            _this.rangeDialog(rangeValue);
        });
        $(document).off("click.AFrDCf").on("click.AFrDCf", "#luckysheet-alternateformat-rangeDialog-confirm", function(){
            let rangeValue = $(this).parents("#luckysheet-alternateformat-rangeDialog").find("input").val().trim();
            $("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-range input").val(rangeValue);

            $(this).parents("#luckysheet-alternateformat-rangeDialog").hide();
            $("#luckysheet-modal-dialog-slider-alternateformat").show();
            luckysheetsizeauto();

            _this.update();
        });
        $(document).off("click.AFrDCl").on("click.AFrDCl", "#luckysheet-alternateformat-rangeDialog-close", function(){
            $(this).parents("#luckysheet-alternateformat-rangeDialog").hide();
            $("#luckysheet-modal-dialog-slider-alternateformat").show();
            luckysheetsizeauto();
        });
        $(document).off("click.AFrDTitle").on("click.AFrDTitle", "#luckysheet-alternateformat-rangeDialog .luckysheet-modal-dialog-title-close", function(){
            $(this).parents("#luckysheet-alternateformat-rangeDialog").hide();
            $("#luckysheet-modal-dialog-slider-alternateformat").show();
            luckysheetsizeauto();
        });

        //页眉、页脚选中
        $(document).off("change.AFrowHeader").on("change.AFrowHeader", "#luckysheet-alternateformat-rowHeader", function(){
            let hasRowHeader;
            if($(this).is(":checked")){
                hasRowHeader = true;
            }
            else{
                hasRowHeader = false;   
            }

            let hasRowFooter;
            if($("#luckysheet-alternateformat-rowFooter").is(":checked")){
                hasRowFooter = true;
            }
            else{
                hasRowFooter = false;   
            }

            _this.checkboxChange(hasRowHeader, hasRowFooter);
            _this.modelboxOn();
            _this.update();
        });
        $(document).off("change.AFrowFooter").on("change.AFrowFooter", "#luckysheet-alternateformat-rowFooter", function(){
            let hasRowHeader;
            if($("#luckysheet-alternateformat-rowHeader").is(":checked")){
                hasRowHeader = true;
            }
            else{
                hasRowHeader = false;   
            }

            let hasRowFooter;
            if($(this).is(":checked")){
                hasRowFooter = true;
            }
            else{
                hasRowFooter = false;   
            }

            _this.checkboxChange(hasRowHeader, hasRowFooter);
            _this.modelboxOn();
            _this.update();
        });

        //点击样式模板
        $(document).off("click.AFmodelbox").on("click.AFmodelbox", "#luckysheet-modal-dialog-slider-alternateformat .modelbox", function(){
            let index = $(this).index();
            let $id = $(this).parents(".cf").attr("id");

            if($id == "luckysheet-alternateformat-modelList"){
                _this.modelfocusIndex = index;
            }
            else if($id == "luckysheet-alternateformat-modelCustom"){
                let len = _this.FixedModelColor.length;
                _this.modelfocusIndex = index + len;
            }

            _this.modelboxOn();
            _this.update();
        });

        //点击选择文本/单元格颜色
        $(document).off("click.AFselectColor").on("click.AFselectColor", "#luckysheet-modal-dialog-slider-alternateformat .luckysheet-color-menu-button-indicator", function(){
            let $parent = $(this).closest(".toningbox");

            let colorType, currenColor;
            if($(this).find(".luckysheet-icon-img").hasClass("luckysheet-icon-text-color")){
                colorType = "fc";
                currenColor = $parent.find(".toningShow").data("fc");
            }
            else if($(this).find(".luckysheet-icon-img").hasClass("luckysheet-icon-cell-color")){
                colorType = "bc";
                currenColor = $parent.find(".toningShow").data("bc");
            }

            //source
            let source;
            if($parent.hasClass("header")){
                source = "0";
            }
            else if($parent.hasClass("ctOne")){
                source = "1";
            }
            else if($parent.hasClass("ctTwo")){
                source = "2";
            }
            else if($parent.hasClass("footer")){
                source = "3";
            }

            _this.colorSelectDialog(currenColor, colorType, source);
        });

        //选择颜色 确定 添加自定义模板
        $(document).off("click.AFselectColorConfirm").on("click.AFselectColorConfirm", "#luckysheet-alternateformat-colorSelect-dialog-confirm", function(){
            let $parent = $(this).parents("#luckysheet-alternateformat-colorSelect-dialog");
            const _locale = locale()
            const alternatingColors =_locale.alternatingColors;
            $("#luckysheet-modal-dialog-mask").hide();
            $parent.hide();

            //获取currenColor colorType source
            let currenColor = $parent.find(".currenColor span").attr("title");

            let colorType;
            if($parent.find(".luckysheet-modal-dialog-title-text").text() == alternatingColors.selectionTextColor){
                colorType = "fc";
            }
            else if($parent.find(".luckysheet-modal-dialog-title-text").text() == alternatingColors.selectionCellColor){
                colorType = "bc";
            }

            let source = $parent.find(".currenColor").attr("data-source");
            
            //赋给颜色
            if(source == "0"){
                if(colorType == "fc"){
                    $("#luckysheet-alternateformat-modelToning .header .toningShow").css("color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .header .toningShow").data("fc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .header .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
                if(colorType == "bc"){
                    $("#luckysheet-alternateformat-modelToning .header .toningShow").css("background-color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .header .toningShow").data("bc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .header .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
            }
            else if(source == "1"){
                if(colorType == "fc"){
                    $("#luckysheet-alternateformat-modelToning .ctOne .toningShow").css("color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctOne .toningShow").data("fc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
                if(colorType == "bc"){
                    $("#luckysheet-alternateformat-modelToning .ctOne .toningShow").css("background-color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctOne .toningShow").data("bc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
            }
            else if(source == "2"){
                if(colorType == "fc"){
                    $("#luckysheet-alternateformat-modelToning .ctTwo .toningShow").css("color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctTwo .toningShow").data("fc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
                if(colorType == "bc"){
                    $("#luckysheet-alternateformat-modelToning .ctTwo .toningShow").css("background-color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctTwo .toningShow").data("bc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
            }
            else if(source == "3"){
                if(colorType == "fc"){
                    $("#luckysheet-alternateformat-modelToning .footer .toningShow").css("color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .footer .toningShow").data("fc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
                if(colorType == "bc"){
                    $("#luckysheet-alternateformat-modelToning .footer .toningShow").css("background-color", currenColor);
                    $("#luckysheet-alternateformat-modelToning .footer .toningShow").data("bc", currenColor);
                    $("#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", currenColor);
                }
            }
            
            //若模板聚焦在固有模板，则新加模板；若模板聚焦在自定义模板，则修改该模板
            let hasRowHeader;
            if($("#luckysheet-alternateformat-rowHeader").is(":checked")){
                hasRowHeader = true;
            }
            else{
                hasRowHeader = false;   
            }

            let hasRowFooter;
            if($("#luckysheet-alternateformat-rowFooter").is(":checked")){
                hasRowFooter = true;
            }
            else{
                hasRowFooter = false;   
            }

            let index = _this.modelfocusIndex;
            let len = _this.FixedModelColor.length;

            let format, file;
            if(index < len){
                format = $.extend(true, {}, _this.getFormatByIndex());
            }
            else{
                file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
                let modelCustom = file["luckysheet_alternateformat_save_modelCustom"];

                format = $.extend(true, {}, modelCustom[index - len]);
            }

            if(source == "0"){
                if(colorType == "fc"){
                    format["head"]["fc"] = currenColor;
                }
                else if(colorType == "bc"){
                    format["head"]["bc"] = currenColor;
                }
            }
            else if(source == "1"){
                if(colorType == "fc"){
                    format["one"]["fc"] = currenColor;
                }
                else if(colorType == "bc"){
                    format["one"]["bc"] = currenColor;
                }
            }
            else if(source == "2"){
                if(colorType == "fc"){
                    format["two"]["fc"] = currenColor;
                }
                else if(colorType == "bc"){
                    format["two"]["bc"] = currenColor;
                }
            }
            else if(source == "3"){
                if(colorType == "fc"){
                    format["foot"]["fc"] = currenColor;
                }
                if(colorType == "bc"){
                    format["foot"]["bc"] = currenColor;
                }
            }

            if(_this.modelfocusIndex < len){
                _this.addCustomModel(format);
                _this.modelfocusIndex = _this.getIndexByFormat(format);
            }
            else{
                file["luckysheet_alternateformat_save_modelCustom"][index - len] = format;

                if(server.allowUpdate){
                    server.saveParam("all", Store.currentSheetIndex, file["luckysheet_alternateformat_save_modelCustom"], { "k": "luckysheet_alternateformat_save_modelCustom" });
                }
            }

            _this.getModelBox(hasRowHeader, hasRowFooter);
            _this.modelboxOn();
            _this.update();
        });
        
        //点击 移除交替颜色 按钮
        $(document).off("click.AFremove").on("click.AFremove", "#luckysheet-alternateformat-remove", function(){
            let dataIndex = $(this).data("index");

            let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

            let ruleArr = file["luckysheet_alternateformat_save"];

            //保存之前的规则
            let historyRules = $.extend(true, [], ruleArr);

            //保存当前的规则
            if(ruleArr.length > 1){
                ruleArr.splice(dataIndex, 1);
            }
            else{
                ruleArr = [];
            }

            let currentRules = $.extend(true, [], ruleArr);
            
            //刷新一次表格
            _this.ref(historyRules, currentRules);

            if(server.allowUpdate){
                server.saveParam("all", Store.currentSheetIndex, ruleArr, { "k": "luckysheet_alternateformat_save" });
            }

            //隐藏一些dom
            $("#luckysheet-modal-dialog-mask").hide();
            $("#luckysheet-modal-dialog-slider-alternateformat").hide();

            luckysheetsizeauto();
        });
    },
    perfect: function(){
        let _this = this;

        let range = $.extend(true, {}, Store.luckysheet_select_save[0]);
        let existsIndex = _this.rangeIsExists(range)[1];
        
        let obj = $.extend(true, {}, Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_alternateformat_save"][existsIndex]);
        
        //应用范围
        let cellrange = obj["cellrange"];
        $("#luckysheet-alternateformat-range input").val(getRangetxt(Store.currentSheetIndex, { "row": cellrange["row"], "column": cellrange["column"] }, Store.currentSheetIndex));
        
        Store.luckysheet_select_save = [{ "row": cellrange["row"], "column": cellrange["column"] }];
        selectHightlightShow();

        //页眉、页脚
        let hasRowHeader = obj["hasRowHeader"];
        let hasRowFooter = obj["hasRowFooter"];
        
        //模板聚焦
        let format = obj["format"];
        _this.modelfocusIndex = _this.getIndexByFormat(format);

        if(_this.modelfocusIndex == null){
            _this.addCustomModel(format);
            _this.modelfocusIndex = _this.getIndexByFormat(format);
        }

        _this.checkboxChange(hasRowHeader, hasRowFooter);
        _this.modelboxOn();

        //标识 交替颜色的index
        $("#luckysheet-alternateformat-remove").data("index", existsIndex);
    },
    checkboxChange: function(hasRowHeader, hasRowFooter){
        if(hasRowHeader){
            $("#luckysheet-alternateformat-rowHeader").prop("checked", true);
            $("#luckysheet-alternateformat-modelToning .header").show();
        }
        else{
            $("#luckysheet-alternateformat-rowHeader").removeAttr("checked");  
            $("#luckysheet-alternateformat-modelToning .header").hide(); 
        }

        if(hasRowFooter){
            $("#luckysheet-alternateformat-rowFooter").prop("checked", true);
            $("#luckysheet-alternateformat-modelToning .footer").show();
        }
        else{
            $("#luckysheet-alternateformat-rowFooter").removeAttr("checked"); 
            $("#luckysheet-alternateformat-modelToning .footer").hide();  
        }

        this.getModelBox(hasRowHeader, hasRowFooter);
    },
    modelboxOn: function(){
        let _this = this;

        //模板 foucs
        $("#luckysheet-modal-dialog-slider-alternateformat .modelbox").removeClass("on");

        let index = _this.modelfocusIndex;
        let len = _this.FixedModelColor.length;
        
        if(index < len){
            $("#luckysheet-alternateformat-modelList .modelbox").eq(index).addClass("on");
        }
        else{
            $("#luckysheet-alternateformat-modelCustom .modelbox").eq(index - len).addClass("on");
        }

        //编辑 对应颜色改变
        _this.modelToningColor();
    },
    modelToningColor: function(){
        let format = this.getFormatByIndex();

        //页眉
        $("#luckysheet-alternateformat-modelToning .header .toningShow").css({"color": format["head"].fc, "background-color": format["head"].bc});
        $("#luckysheet-alternateformat-modelToning .header .toningShow").data("fc", format["head"].fc).data("bc", format["head"].bc);
        $("#luckysheet-alternateformat-modelToning .header .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["head"].fc);
        $("#luckysheet-alternateformat-modelToning .header .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["head"].bc);

        //颜色1
        $("#luckysheet-alternateformat-modelToning .ctOne .toningShow").css({"color": format["one"].fc, "background-color": format["one"].bc});
        $("#luckysheet-alternateformat-modelToning .ctOne .toningShow").data("fc", format["one"].fc).data("bc", format["one"].bc);
        $("#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["one"].fc);
        $("#luckysheet-alternateformat-modelToning .ctOne .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["one"].bc);

        //颜色2
        $("#luckysheet-alternateformat-modelToning .ctTwo .toningShow").css({"color": format["two"].fc, "background-color": format["two"].bc});
        $("#luckysheet-alternateformat-modelToning .ctTwo .toningShow").data("fc", format["two"].fc).data("bc", format["two"].bc);
        $("#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["two"].fc);
        $("#luckysheet-alternateformat-modelToning .ctTwo .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["two"].bc);

        //页脚
        $("#luckysheet-alternateformat-modelToning .footer .toningShow").css({"color": format["foot"].fc, "background-color": format["foot"].bc});
        $("#luckysheet-alternateformat-modelToning .footer .toningShow").data("fc", format["foot"].fc).data("bc", format["foot"].bc);
        $("#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-text-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["foot"].fc);
        $("#luckysheet-alternateformat-modelToning .footer .luckysheet-icon-cell-color").parents(".luckysheet-color-menu-button-indicator").css("border-bottom-color", format["foot"].bc);
    },
    addCustomModel: function(format){
        let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];

        if(file["luckysheet_alternateformat_save_modelCustom"] == null){
            file["luckysheet_alternateformat_save_modelCustom"] = [];
        }

        file["luckysheet_alternateformat_save_modelCustom"].push(format);

        if(server.allowUpdate){
            server.saveParam("all", Store.currentSheetIndex, file["luckysheet_alternateformat_save_modelCustom"], { "k": "luckysheet_alternateformat_save_modelCustom" });
        }
    },
    colorSelectDialog: function(currenColor, colorType, source){
        $("#luckysheet-modal-dialog-mask").show();
        $("#luckysheet-alternateformat-colorSelect-dialog").remove();

        const _locale = locale()
        const alternatingColors =_locale.alternatingColors;
        const locale_button = _locale.button;
        const locale_toolbar = _locale.toolbar;

        let title;
        if(colorType == "fc"){
            title = alternatingColors.selectionTextColor;
        }
        else if(colorType == "bc"){
            title = alternatingColors.selectionCellColor;
        }

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-alternateformat-colorSelect-dialog", 
            "addclass": "luckysheet-alternateformat-colorSelect-dialog", 
            "title": title, 
            "content": "<div class='currenColor' data-source='"+ source +"'>"+ alternatingColors.currentColor +"：<span title='"+ currenColor +"' style='background-color:"+ currenColor +"'></span></div><div class='colorshowbox'></div>", 
            "botton": '<button id="luckysheet-alternateformat-colorSelect-dialog-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button class="btn btn-default luckysheet-model-close-btn">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-alternateformat-colorSelect-dialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-alternateformat-colorSelect-dialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
        
        //初始化选择颜色插件
        $("#luckysheet-alternateformat-colorSelect-dialog").find(".colorshowbox").spectrum({
            showPalette: true,
            showPaletteOnly: true,
            preferredFormat: "hex",
            clickoutFiresChange: false,
            showInitial: true,
            showInput: true,
            flat: true,
            hideAfterPaletteSelect: true,
            showSelectionPalette: true,
            showButtons: false,//隐藏选择取消按钮
            maxPaletteSize: 8,
            maxSelectionSize: 8,
            color: currenColor,
            cancelText: locale_button.cancel,
            chooseText: locale_toolbar.confirmColor,
            togglePaletteMoreText: locale_toolbar.customColor,
            togglePaletteLessText: locale_toolbar.collapse,
            togglePaletteOnly: true,
            clearText: locale_toolbar.clearText,
            noColorSelectedText: locale_toolbar.noColorSelectedText,
            localStorageKey: "spectrum.textcolor" + server.gridKey,
            palette: [
                ["#000", "#444", "#666", "#999", "#ccc", "#eee", "#f3f3f3", "#fff"],
                ["#f00", "#f90", "#ff0", "#0f0", "#0ff", "#00f", "#90f", "#f0f"],
                ["#f4cccc", "#fce5cd", "#fff2cc", "#d9ead3", "#d0e0e3", "#cfe2f3", "#d9d2e9", "#ead1dc"],
                ["#ea9999", "#f9cb9c", "#ffe599", "#b6d7a8", "#a2c4c9", "#9fc5e8", "#b4a7d6", "#d5a6bd"],
                ["#e06666", "#f6b26b", "#ffd966", "#93c47d", "#76a5af", "#6fa8dc", "#8e7cc3", "#c27ba0"],
                ["#c00", "#e69138", "#f1c232", "#6aa84f", "#45818e", "#3d85c6", "#674ea7", "#a64d79"],
                ["#900", "#b45f06", "#bf9000", "#38761d", "#134f5c", "#0b5394", "#351c75", "#741b47"],
                ["#600", "#783f04", "#7f6000", "#274e13", "#0c343d", "#073763", "#20124d", "#4c1130"]
            ],
            move: function(color){
                if (color != null) {
                    color = color.toHexString();
                }
                else {
                    color = "#000";
                }

                $("#luckysheet-alternateformat-colorSelect-dialog .currenColor span").css("background-color", color).attr("title", color);
            }
        });
    },
    rangeDialog: function(value){
        $("#luckysheet-modal-dialog-mask").hide();
        $("#luckysheet-alternateformat-rangeDialog").remove();

        const _locale = locale()
        const alternatingColors =_locale.alternatingColors;
        const locale_button = _locale.button;

        $("body").append(replaceHtml(modelHTML, { 
            "id": "luckysheet-alternateformat-rangeDialog", 
            "addclass": "luckysheet-alternateformat-rangeDialog", 
            "title": alternatingColors.selectRange, 
            "content": '<input readonly="readonly" placeholder="'+alternatingColors.tipSelectRange+'" value="'+value+'"/>', 
            "botton": '<button id="luckysheet-alternateformat-rangeDialog-confirm" class="btn btn-primary">'+locale_button.confirm+'</button><button id="luckysheet-alternateformat-rangeDialog-close" class="btn btn-default">'+locale_button.cancel+'</button>', 
            "style": "z-index:100003" 
        }));
        let $t = $("#luckysheet-alternateformat-rangeDialog")
                .find(".luckysheet-modal-dialog-content")
                .css("min-width", 300)
                .end(), 
            myh = $t.outerHeight(), 
            myw = $t.outerWidth();
        let winw = $(window).width(), winh = $(window).height();
        let scrollLeft = $(document).scrollLeft(), scrollTop = $(document).scrollTop();
        $("#luckysheet-alternateformat-rangeDialog").css({ 
            "left": (winw + scrollLeft - myw) / 2, 
            "top": (winh + scrollTop - myh) / 3 
        }).show();
    },
    rangeIsExists: function(range, index){
        let _this = this;

        let isExists = false;
        let existsIndex = null;

        //获取已有交替颜色所有应用范围
        let AFarr = $.extend(true, [], Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_alternateformat_save"]);

        if(index != undefined && index != null){
            if(AFarr.length > 1){
                AFarr.splice(index, 1);
            }
            else{
                AFarr = [];
            }
        }

        if(AFarr.length > 0){
            let arr = [];
            for(let i = 0; i < AFarr.length; i++){
                let obj = {
                    "index": i,
                    "map": _this.getRangeMap(AFarr[i]["cellrange"]["row"], AFarr[i]["cellrange"]["column"])
                }

                arr.push(obj);
            }
            
            //获取当前选区
            let rangeMap = _this.getRangeMap(range["row"], range["column"]);
            
            //遍历
            for(let x in rangeMap){
                if(isExists){
                    break;
                } 

                for(let j = 0; j < arr.length; j++){
                    if(x in arr[j]["map"]){
                        isExists = true;
                        existsIndex = arr[j]["index"];
                        break;
                    }
                }
            }
        }

        return [isExists, existsIndex];
    },
    getRangeMap: function(row, column){
        let map = {};
        let st_r = row[0], ed_r = row[1], st_c = column[0], ed_c = column[1];
        
        for(let r = st_r; r <= ed_r; r++){
            for(let c = st_c; c <= ed_c; c++){
                map[r + "_" + c] = 0;
            }
        }
        
        return map;
    },
    getIndexByFormat: function(format){
        let _this = this;
        let index = null;

        //格式样式 模板
        let modelList = _this.FixedModelColor;
        for(let i = 0; i < modelList.length; i++){
            let obj = modelList[i];

            if(format["head"].fc == obj["head"].fc && format["head"].bc == obj["head"].bc){
                if(format["one"].fc == obj["one"].fc && format["one"].bc == obj["one"].bc){
                    if(format["two"].fc == obj["two"].fc && format["two"].bc == obj["two"].bc){
                        if(format["foot"].fc == obj["foot"].fc && format["foot"].bc == obj["foot"].bc){
                            index = i;
                            break;
                        }
                    }
                }
            }
        }
        
        //自定义 模板
        let modelCustom = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_alternateformat_save_modelCustom"];
        if(modelCustom != null && modelCustom.length > 0){
            for(let j = 0; j < modelCustom.length; j++){
                let obj = modelCustom[j];

                if(format["head"].fc == obj["head"].fc && format["head"].bc == obj["head"].bc){
                    if(format["one"].fc == obj["one"].fc && format["one"].bc == obj["one"].bc){
                        if(format["two"].fc == obj["two"].fc && format["two"].bc == obj["two"].bc){
                            if(format["foot"].fc == obj["foot"].fc && format["foot"].bc == obj["foot"].bc){
                                index = modelList.length + j;
                                break;
                            }
                        }
                    }
                }
            }
        }
       
        return index;
    },
    getFormatByIndex: function(){
        let _this = this;

        let index = _this.modelfocusIndex;
        let len = _this.FixedModelColor.length;

        let format = {};

        if(index < len){
            format = _this.FixedModelColor[index];
        }
        else{
            format = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)]["luckysheet_alternateformat_save_modelCustom"][index - len];
        }

        return format;
    },
    new: function(cellrange){
        let _this = this;

        let format = _this.getFormatByIndex();

        let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
        let ruleArr = file["luckysheet_alternateformat_save"];
        
        if(ruleArr == null){
            ruleArr = [];
        }

        //保存之前的规则
        let historyRules = $.extend(true, [], ruleArr);
        
        //保存当前的规则
        let obj = {
            "cellrange": {
                "row": cellrange["row"],
                "column": cellrange["column"]
            },
            "format": format,
            "hasRowHeader": true,
            "hasRowFooter": false
        }

        ruleArr.push(obj);

        let currentRules = $.extend(true, [], ruleArr);
        
        //刷新一次表格
        _this.ref(historyRules, currentRules);

        if(server.allowUpdate){
            server.saveParam("all", Store.currentSheetIndex, ruleArr, { "k": "luckysheet_alternateformat_save" });
        }
    },
    update: function(){
        let _this = this;
        const _locale = locale()
        const alternatingColors =_locale.alternatingColors;
        //获取标识
        let dataIndex = $("#luckysheet-alternateformat-remove").data("index");
        
        //应用范围
        let rangeValue = $("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-range input").val().trim();
        
        if(!formula.iscelldata(rangeValue)){
            if(isEditMode()){
                alert(alternatingColors.errorNoRange);
            }
            else{
                tooltip.info(alternatingColors.errorNoRange, "");
            }

            return;
        }
        
        let cellrange = formula.getcellrange(rangeValue);
        let isExists = _this.rangeIsExists(cellrange, dataIndex)[0];

        if(isExists){
            if(isEditMode()){
                alert(alternatingColors.errorExistColors);
            }
            else{
                tooltip.info(alternatingColors.errorExistColors, ""); 
            }

            return;
        }

        //页眉、页脚
        let hasRowHeader;
        if($("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-rowHeader").is(":checked")){
            hasRowHeader = true;
        }
        else{
            hasRowHeader = false;    
        }

        let hasRowFooter;
        if($("#luckysheet-modal-dialog-slider-alternateformat #luckysheet-alternateformat-rowFooter").is(":checked")){
            hasRowFooter = true;
        }
        else{
            hasRowFooter = false;    
        }

        //获取选中样式模板的颜色
        let format = _this.getFormatByIndex();
        let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
        
        let ruleArr = file["luckysheet_alternateformat_save"];
        if(ruleArr == null){
            ruleArr = [];
        }
        
        //保存之前的规则
        let historyRules = $.extend(true, [], ruleArr);
        
        //保存当前的规则
        let obj = {
            "cellrange": {
                "row": cellrange["row"],
                "column": cellrange["column"]
            },
            "format": format,
            "hasRowHeader": hasRowHeader,
            "hasRowFooter": hasRowFooter
        }
        
        ruleArr[dataIndex] = obj;

        let currentRules = $.extend(true, [], ruleArr);
        
        //刷新一次表格
        _this.ref(historyRules, currentRules);

        if(server.allowUpdate){
            server.saveParam("all", Store.currentSheetIndex, ruleArr, { "k": "luckysheet_alternateformat_save" });
        }
    },
    checksAF: function(r, c, computeMap){
        if((r + "_" + c) in computeMap){
            //返回值（fc  bc）
            return computeMap[r + "_" + c];
        }
        else{
            return null;
        }
    },
    getComputeMap: function(){
        let file = Store.luckysheetfile[getSheetIndex(Store.currentSheetIndex)];
        let ruleArr = file["luckysheet_alternateformat_save"];

        let computeMap = this.compute(ruleArr);

        return computeMap;
    },
    compute: function(obj){
        //计算存储
        let computeMap = {};

        if(obj != null && obj.length > 0){
            for(let i = 0; i < obj.length; i++){
                let cellrange = obj[i]["cellrange"];
                let format = obj[i]["format"];
                let hasRowHeader = obj[i]["hasRowHeader"];
                let hasRowFooter = obj[i]["hasRowFooter"];
                let st_r = cellrange["row"][0], 
                    ed_r = cellrange["row"][1], 
                    st_c = cellrange["column"][0], 
                    ed_c = cellrange["column"][1];
                
                if(hasRowHeader && hasRowFooter){
                    //页眉所在行
                    for(let c = st_c; c <= ed_c; c++){
                        computeMap[st_r + "_" + c] = [format["head"].fc, format["head"].bc];
                    }

                    //中间行
                    if(ed_r - st_r > 1){
                        for(let r = st_r + 1; r < ed_r; r++){
                            let fc, bc;
                            if((r - st_r) % 2 != 0){
                                fc = format["one"].fc;
                                bc = format["one"].bc;
                            }
                            else{
                                fc = format["two"].fc;
                                bc = format["two"].bc;
                            }

                            for(let c = st_c; c <= ed_c; c++){
                                computeMap[r + "_" + c] = [fc, bc];
                            } 
                        }
                    }

                    //页脚所在行
                    if(ed_r > st_r){
                        for(let c = st_c; c <= ed_c; c++){
                            computeMap[ed_r + "_" + c] = [format["foot"].fc, format["foot"].bc];
                        }
                    }
                }
                else if(hasRowHeader){
                    //页眉所在行
                    for(let c = st_c; c <= ed_c; c++){
                        computeMap[st_r + "_" + c] = [format["head"].fc, format["head"].bc];
                    }

                    //中间行
                    if(ed_r > st_r){
                        for(let r = st_r + 1; r <= ed_r; r++){
                            let fc, bc;
                            if((r - st_r) % 2 != 0){
                                fc = format["one"].fc;
                                bc = format["one"].bc;
                            }
                            else{
                                fc = format["two"].fc;
                                bc = format["two"].bc;
                            }

                            for(let c = st_c; c <= ed_c; c++){
                                computeMap[r + "_" + c] = [fc, bc];
                            } 
                        }
                    }
                }
                else if(hasRowFooter){
                    //中间行
                    if(ed_r > st_r){
                        for(let r = st_r; r < ed_r; r++){
                            let fc, bc;
                            if((r - st_r) % 2 == 0){
                                fc = format["one"].fc;
                                bc = format["one"].bc;
                            }
                            else{
                                fc = format["two"].fc;
                                bc = format["two"].bc;
                            }

                            for(let c = st_c; c <= ed_c; c++){
                                computeMap[r + "_" + c] = [fc, bc];
                            }
                        }
                    }

                    //页脚所在行
                    for(let c = st_c; c <= ed_c; c++){
                        computeMap[ed_r + "_" + c] = [format["foot"].fc, format["foot"].bc];
                    }
                }
                else{
                    //中间行
                    for(let r = st_r; r <= ed_r; r++){
                        let fc, bc;
                        if((r - st_r) % 2 == 0){
                            fc = format["one"].fc;
                            bc = format["one"].bc;
                        }
                        else{
                            fc = format["two"].fc;
                            bc = format["two"].bc;
                        }

                        for(let c = st_c; c <= ed_c; c++){
                            computeMap[r + "_" + c] = [fc, bc];
                        } 
                    }
                }
            }
        }

        return computeMap;
    },
    ref: function(historyRules, currentRules){
        if (Store.clearjfundo) {
            Store.jfundo.length  = 0;

            let redo = {};
            redo["type"] = "updateAF";
            redo["sheetIndex"] = Store.currentSheetIndex;
            redo["data"] = {"historyRules": historyRules, "currentRules": currentRules};
            Store.jfredo.push(redo); 
        }

        let index = getSheetIndex(Store.currentSheetIndex);
        Store.luckysheetfile[index]["luckysheet_alternateformat_save"] = currentRules;

        setTimeout(function () {
            luckysheetrefreshgrid();
        }, 1);
    }
}

export default alternateformat;