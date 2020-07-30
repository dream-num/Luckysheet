((typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] || []).push([[3],{

/***/ "1540":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartBaseLabel", function() { return ChartBaseLabel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartBaseSwitch", function() { return ChartBaseSwitch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartBaseInput", function() { return ChartBaseInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartBaseSelect", function() { return ChartBaseSelect; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartBaseSlider", function() { return ChartBaseSlider; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChartBaseBox", function() { return ChartBaseBox; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importComp", function() { return importComp; });
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d3b7");
/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("e6cf");
/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("2f62");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "mapActions", function() { return vuex__WEBPACK_IMPORTED_MODULE_2__["b"]; });

/* harmony import */ var _utils_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("ca00");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "deepCopy", function() { return _utils_util__WEBPACK_IMPORTED_MODULE_3__["b"]; });

/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("2ef0");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "isEqual", function() { return lodash__WEBPACK_IMPORTED_MODULE_4__["isEqual"]; });




// 复用的组件和方法
var ChartBaseLabel = function ChartBaseLabel() {
  return __webpack_require__.e(/* import() */ 2).then(__webpack_require__.bind(null, "02ce"));
};

var ChartBaseSwitch = function ChartBaseSwitch() {
  return __webpack_require__.e(/* import() */ 11).then(__webpack_require__.bind(null, "9e1a"));
};

var ChartBaseInput = function ChartBaseInput() {
  return __webpack_require__.e(/* import() */ 9).then(__webpack_require__.bind(null, "37cd"));
};

var ChartBaseSelect = function ChartBaseSelect() {
  return __webpack_require__.e(/* import() */ 10).then(__webpack_require__.bind(null, "138b"));
};

var ChartBaseSlider = function ChartBaseSlider() {
  return __webpack_require__.e(/* import() */ 1).then(__webpack_require__.bind(null, "b57e"));
};

var ChartBaseBox = function ChartBaseBox() {
  return __webpack_require__.e(/* import() */ 8).then(__webpack_require__.bind(null, "3f9f"));
};



 // 重复引入的组件

var importComp = function importComp(t) {
  return {
    'chart-base-label': t.ChartBaseLabel,
    'chart-base-input': t.ChartBaseInput,
    'chart-base-switch': t.ChartBaseSwitch,
    'chart-base-slider': t.ChartBaseSlider,
    'chart-base-select': t.ChartBaseSelect
  };
};



/***/ }),

/***/ "e078":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3da76939-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/chart/ChartAxis.vue?vue&type=template&id=728665dc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-collapse-item',{attrs:{"name":"6","title":"XY轴设置"}},[_c('chart-base-select',{attrs:{"selectOption":_vm.axisGroup,"selectValue":_vm.axis.axisType},on:{"update:selectValue":function($event){return _vm.$set(_vm.axis, "axisType", $event)},"update:select-value":function($event){return _vm.$set(_vm.axis, "axisType", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("选择坐标轴")])]),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.series, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v(_vm._s(_vm.series.name))])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.series.show),expression:"series.show"}]},[_c('chart-base-input',{attrs:{"inputValue":_vm.series.title.text,"placeholder":'请输入标题内容'},on:{"update:inputValue":function($event){return _vm.$set(_vm.series.title, "text", $event)},"update:input-value":function($event){return _vm.$set(_vm.series.title, "text", $event)}}},[_c('div',{attrs:{"slot":"input"},slot:"input"},[_vm._v("标题内容")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.series.title.text),expression:"series.title.text"}],staticStyle:{"margin-top":"15px"}},[_c('chart-base-label',{attrs:{"router":_vm.router + '/label',"baseLabelOption":_vm.series.title.label},on:{"update:baseLabelOption":function($event){return _vm.$set(_vm.series.title, "label", $event)},"update:base-label-option":function($event){return _vm.$set(_vm.series.title, "label", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("文本样式")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.fzPosOption,"selectValue":_vm.series.title.fzPosition},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.title, "fzPosition", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.title, "fzPosition", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("文本对齐方式")])])],1),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.inverse},on:{"update:switchValue":function($event){return _vm.$set(_vm.series, "inverse", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series, "inverse", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("反向坐标轴")])]),_c('chart-base-slider',{attrs:{"hideCol":true,"max":10,"baseSliderOption":_vm.series.tickLabel.optimize,"unit":'个',"content":'滑动修改坐标轴间隔个数'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.tickLabel, "optimize", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.tickLabel, "optimize", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("坐标轴间隔个数")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.series.title.text),expression:"series.title.text"}]},[_c('chart-base-slider',{attrs:{"hideCol":true,"baseSliderOption":_vm.series.title.nameGap,"unit":'px',"content":'滑动修改标题与轴线距离'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.title, "nameGap", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.title, "nameGap", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("标题与轴线距离")])]),_c('chart-base-slider',{attrs:{"hideCol":true,"format":_vm.formatRotation+'',"max":180,"min":-180,"baseSliderOption":_vm.series.title.rotate,"unit":'°',"content":'滑动修改标题与轴线距离'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.title, "rotate", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.title, "rotate", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("倾斜轴标题")])])],1),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.tickLine.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.series.tickLine, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series.tickLine, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("显示刻度线")])]),_c('chart-base-slider',{attrs:{"hideCol":true,"min":1,"baseSliderOption":_vm.series.tickLine.width,"unit":'px',"content":'滑动修改刻度线宽度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.tickLine, "width", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.tickLine, "width", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("刻度线宽度")])]),_c('el-row',{staticStyle:{"margin-top":"15px"}},[_c('el-col',{staticClass:"title",attrs:{"span":7}},[_vm._v("刻度线颜色")]),_c('el-col',{attrs:{"push":14,"span":3}},[_c('el-tooltip',{attrs:{"open-delay":500,"content":"刻度线颜色","effect":"dark","placement":"bottom"}},[_c('el-color-picker',{attrs:{"size":"mini"},model:{value:(_vm.series.tickLine.color),callback:function ($$v) {_vm.$set(_vm.series.tickLine, "color", $$v)},expression:"series.tickLine.color"}})],1)],1)],1),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.tick.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.series.tick, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series.tick, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("显示刻度")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.orient,"selectValue":_vm.series.tick.position},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.tick, "position", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.tick, "position", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("刻度位置")])]),_c('chart-base-slider',{attrs:{"hideCol":true,"min":1,"baseSliderOption":_vm.series.tick.length,"unit":'px',"content":'滑动修改刻度长度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.tick, "length", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.tick, "length", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("刻度长度")])]),_c('chart-base-slider',{attrs:{"hideCol":true,"max":20,"min":1,"baseSliderOption":_vm.series.tick.width,"unit":'px',"content":'滑动修改刻度宽度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.tick, "width", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.tick, "width", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("刻度宽度")])]),_c('el-row',{staticStyle:{"margin-top":"15px"}},[_c('el-col',{staticClass:"title",attrs:{"span":6}},[_vm._v("刻度颜色")]),_c('el-col',{attrs:{"push":14,"span":4}},[_c('el-tooltip',{attrs:{"open-delay":500,"content":"刻度颜色","effect":"dark","placement":"bottom"}},[_c('el-color-picker',{attrs:{"size":"mini"},model:{value:(_vm.series.tick.color),callback:function ($$v) {_vm.$set(_vm.series.tick, "color", $$v)},expression:"series.tick.color"}})],1)],1)],1),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.tickLabel.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.series.tickLabel, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series.tickLabel, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("显示刻度标签")])]),_c('chart-base-slider',{attrs:{"hideCol":true,"format":_vm.formatRotation,"max":180,"min":-180,"baseSliderOption":_vm.series.tickLabel.rotate,"unit":'°',"content":'滑动修改标签倾斜角度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.tickLabel, "rotate", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.tickLabel, "rotate", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("倾斜标签")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showLabel),expression:"showLabel"}]},[_c('chart-base-input',{attrs:{"type":'text',"inputValue":_vm.series.tickLabel.min,"placeholder":'请输入刻度最小值'},on:{"update:inputValue":function($event){return _vm.$set(_vm.series.tickLabel, "min", $event)},"update:input-value":function($event){return _vm.$set(_vm.series.tickLabel, "min", $event)}}},[_c('div',{attrs:{"slot":"input"},slot:"input"},[_vm._v("刻度最小值")])]),_c('chart-base-input',{attrs:{"type":'text',"inputValue":_vm.series.tickLabel.max,"placeholder":'请输入刻度最大值且最大值不能小于最小值'},on:{"update:inputValue":function($event){return _vm.$set(_vm.series.tickLabel, "max", $event)},"update:input-value":function($event){return _vm.$set(_vm.series.tickLabel, "max", $event)}}},[_c('div',{attrs:{"slot":"input"},slot:"input"},[_vm._v("刻度最大值")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.ratioOption,"selectValue":_vm.series.tickLabel.ratio},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.tickLabel, "ratio", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.tickLabel, "ratio", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("数值缩放比例")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.digitOption,"selectValue":_vm.series.tickLabel.digit},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.tickLabel, "digit", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.tickLabel, "digit", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("小数位数")])])],1),_c('chart-base-input',{attrs:{"inputValue":_vm.series.tickLabel.prefix,"placeholder":'请输入标签前缀'},on:{"update:inputValue":function($event){return _vm.$set(_vm.series.tickLabel, "prefix", $event)},"update:input-value":function($event){return _vm.$set(_vm.series.tickLabel, "prefix", $event)}}},[_c('div',{attrs:{"slot":"input"},slot:"input"},[_vm._v("标签前缀")])]),_c('chart-base-input',{attrs:{"inputValue":_vm.series.tickLabel.suffix,"placeholder":'请输入标签后缀'},on:{"update:inputValue":function($event){return _vm.$set(_vm.series.tickLabel, "suffix", $event)},"update:input-value":function($event){return _vm.$set(_vm.series.tickLabel, "suffix", $event)}}},[_c('div',{attrs:{"slot":"input"},slot:"input"},[_vm._v("标签后缀")])]),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.netLine.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.series.netLine, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series.netLine, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("显示网格线")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.series.netLine.show),expression:"series.netLine.show"}]},[_c('chart-base-slider',{attrs:{"hideCol":true,"max":20,"min":1,"baseSliderOption":_vm.series.netLine.width,"unit":'px',"content":'滑动修改网格线宽度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.netLine, "width", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.netLine, "width", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("网格线宽度")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.lineStyleOption,"selectValue":_vm.series.netLine.type},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.netLine, "type", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.netLine, "type", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("网格线类型")])]),_c('el-row',{staticStyle:{"margin-top":"15px"}},[_c('el-col',{staticClass:"title",attrs:{"span":8}},[_vm._v("网格线颜色")]),_c('el-col',{attrs:{"push":13,"span":3}},[_c('el-tooltip',{attrs:{"open-delay":500,"content":"网格线颜色","effect":"dark","placement":"bottom"}},[_c('el-color-picker',{attrs:{"label":true,"size":"mini"},model:{value:(_vm.series.netLine.color),callback:function ($$v) {_vm.$set(_vm.series.netLine, "color", $$v)},expression:"series.netLine.color"}})],1)],1)],1),_c('chart-base-select',{attrs:{"selectOption":_vm.intervalOption,"selectValue":_vm.series.netLine.interval.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.netLine.interval, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.netLine.interval, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("网格线分割间隔数")])]),(_vm.series.netLine.interval.value == 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.series.netLine.interval.cusNumber,"unit":'个',"content":'滑动修改间隔数'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.netLine.interval, "cusNumber", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.netLine.interval, "cusNumber", $event)}}}):_vm._e()],1),_c('chart-base-switch',{attrs:{"switchValue":_vm.series.netArea.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.series.netArea, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.series.netArea, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("显示网格区域")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.series.netArea.show),expression:"series.netArea.show"}]},[_c('chart-base-select',{attrs:{"selectOption":_vm.intervalOption,"selectValue":_vm.series.netArea.interval.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.series.netArea.interval, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.series.netArea.interval, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("网格区域分割间隔数")])]),(_vm.series.netArea.interval.value == 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.series.netArea.interval.cusNumber,"unit":'个',"content":'滑动修改间隔数'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.series.netArea.interval, "cusNumber", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.series.netArea.interval, "cusNumber", $event)}}}):_vm._e(),_c('el-row',{staticStyle:{"margin-top":"15px"}},[_c('el-col',{attrs:{"span":6}},[_vm._v("网格区域第一颜色")]),_c('el-col',{attrs:{"span":3}},[_c('el-color-picker',{attrs:{"size":"mini"},model:{value:(_vm.series.netArea.colorOne),callback:function ($$v) {_vm.$set(_vm.series.netArea, "colorOne", $$v)},expression:"series.netArea.colorOne"}})],1),_c('el-col',{attrs:{"span":6}},[_vm._v("网格区域第二颜色")]),_c('el-col',{attrs:{"span":3}},[_c('el-color-picker',{attrs:{"size":"mini"},model:{value:(_vm.series.netArea.colorTwo),callback:function ($$v) {_vm.$set(_vm.series.netArea, "colorTwo", $$v)},expression:"series.netArea.colorTwo"}})],1)],1)],1)],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartAxis.vue?vue&type=template&id=728665dc&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/utils/importUtil.js
var importUtil = __webpack_require__("1540");

// EXTERNAL MODULE: ./src/data/chartJson.js
var chartJson = __webpack_require__("b4cc");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/chart/ChartAxis.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ChartAxisvue_type_script_lang_js_ = ({
  name: 'ChartXaxis',
  props: {
    chartAllType: String,
    axisOption: Object,
    router: String
  },
  components: Object(objectSpread2["a" /* default */])({}, importUtil["importComp"](importUtil)),
  data: function data() {
    return {
      axis: {},
      series: {},
      //具体坐标轴配置
      fontSizeOption: '',
      lineStyleOption: '',
      ratioOption: '',
      digitOption: '',
      fzPosOption: [{
        value: 'middle',
        label: '居中'
      }, {
        value: 'start',
        label: '头部'
      }, {
        value: 'end',
        label: '尾部'
      }, {
        value: 'hidden',
        label: '隐藏'
      }],
      orient: [{
        label: '朝内',
        value: 'inside'
      }, {
        label: '朝外',
        value: 'outside'
      }],
      formatRotation: function formatRotation(val) {
        return val + ' °';
      }
    };
  },
  watch: {
    axisOption: {
      handler: function handler(newVal) {
        if (importUtil["isEqual"](this.axis, this.axisOption)) {
          return;
        }

        this.axis = importUtil["deepCopy"](this.axisOption);
        this.series = this.axis[newVal.axisType];
        this.fontSizeOption = importUtil["deepCopy"](chartJson["g" /* fontSizeOption */]);
        this.lineStyleOption = importUtil["deepCopy"](chartJson["k" /* lineStyleOption */]);
        this.intervalOption = importUtil["deepCopy"](chartJson["j" /* intervalOption */]);
        this.ratioOption = importUtil["deepCopy"](chartJson["o" /* ratioOption */]);
        this.digitOption = importUtil["deepCopy"](chartJson["d" /* digitOption */]);
      },
      immediate: true,
      deep: true
    },
    series: {
      handler: function handler(newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeAxis();
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    chartType: function chartType() {
      return this.chartAllType.split('|')[1];
    },
    chartStyle: function chartStyle() {
      return this.chartAllType.split('|')[2];
    },
    axisGroup: function axisGroup() {
      if (this.chartType == 'bar' && this.chartStyle != 'compare') {
        return [{
          value: 'xAxisDown',
          label: 'Y轴(左侧垂直)'
        }, {
          value: 'xAxisUp',
          label: 'Y轴(左侧垂直)'
        }, {
          value: 'yAxisLeft',
          label: 'X轴(下方水平)'
        }, {
          value: 'yAxisRight',
          label: 'X轴(上方水平)'
        }];
      } else if (this.chartStyle == 'compare') {
        return [{
          value: 'xAxisDown',
          label: 'Y轴(右侧坐标轴)'
        }, {
          value: 'xAxisUp',
          label: 'Y轴(左侧坐标轴)'
        }, {
          value: 'yAxisLeft',
          label: 'X轴(右侧坐标轴)'
        }, {
          value: 'yAxisRight',
          label: 'X轴(左侧坐标轴)'
        }];
      } else {
        return [{
          value: 'xAxisDown',
          label: 'X轴(下方水平)'
        }, {
          value: 'xAxisUp',
          label: 'X轴(上方水平)'
        }, {
          value: 'yAxisLeft',
          label: 'Y轴(左侧垂直)'
        }, {
          value: 'yAxisRight',
          label: 'Y轴(右侧垂直)'
        }];
      }
    },
    showLabel: function showLabel() {
      if (this.chartType == 'bar' && this.axis.axisType.slice(0, 1) == 'x' || this.chartType != 'bar' && this.axis.axisType.slice(0, 1) == 'y') {
        return true;
      }
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, importUtil["mapActions"]('chartSetting', ['updateChartItem'])), {}, {
    changeAxis: function changeAxis() {
      var updateObj = {
        updateObj: importUtil["deepCopy"](this.series),
        router: this.router + '/' + this.axis.axisType
      };
      this.updateChartItem(updateObj);
    }
  })
});
// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartAxis.vue?vue&type=script&lang=js&
 /* harmony default export */ var chart_ChartAxisvue_type_script_lang_js_ = (ChartAxisvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartAxis.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chart_ChartAxisvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ChartAxis = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chartmix.common.3.js.map