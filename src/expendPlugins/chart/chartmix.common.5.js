((typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] || []).push([[5],{

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

/***/ "954f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3da76939-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/chart/ChartLegend.vue?vue&type=template&id=9e7569a0&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-collapse-item',{attrs:{"name":"3","title":"图例设置"}},[_c('chart-base-switch',{attrs:{"switchValue":_vm.legend.show},on:{"update:switchValue":function($event){return _vm.$set(_vm.legend, "show", $event)},"update:switch-value":function($event){return _vm.$set(_vm.legend, "show", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("显示图例")])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.legend.show),expression:"legend.show"}]},[_c('chart-base-label',{attrs:{"router":_vm.router + '/label',"baseLabelOption":_vm.legend.label},on:{"update:baseLabelOption":function($event){return _vm.$set(_vm.legend, "label", $event)},"update:base-label-option":function($event){return _vm.$set(_vm.legend, "label", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("图例样式")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.positionOption,"selectValue":_vm.legend.position.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.legend.position, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.legend.position, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("图例位置")])]),(_vm.legend.position.value === 'custom')?_c('el-row',[_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.legend.position.offsetX,"unit":'%',"content":'滑动修改水平偏移量'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.legend.position, "offsetX", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.legend.position, "offsetX", $event)}}}),_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.legend.position.offsetY,"unit":'%',"content":'滑动修改垂直偏移量'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.legend.position, "offsetY", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.legend.position, "offsetY", $event)}}})],1):_vm._e(),_c('chart-base-select',{attrs:{"selectOption":_vm.dirOptions,"selectValue":_vm.legend.position.direction},on:{"update:selectValue":function($event){return _vm.$set(_vm.legend.position, "direction", $event)},"update:select-value":function($event){return _vm.$set(_vm.legend.position, "direction", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("图例朝向")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.sizeOption,"selectValue":_vm.legend.width.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.legend.width, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.legend.width, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("图例宽度")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.sizeOption,"selectValue":_vm.legend.height.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.legend.height, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.legend.height, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("图例高度")])]),(_vm.legend.width.value == 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.legend.width.cusSize,"unit":'px',"content":'滑动修改图例宽度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.legend.width, "cusSize", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.legend.width, "cusSize", $event)}}}):_vm._e(),(_vm.legend.height.value == 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.legend.height.cusSize,"unit":'px',"content":'滑动修改图例高度'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.legend.height, "cusSize", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.legend.height, "cusSize", $event)}}}):_vm._e(),_c('chart-base-select',{attrs:{"selectOption":_vm.distanceOption,"selectValue":_vm.legend.distance.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.legend.distance, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.legend.distance, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("图例间距")])]),(_vm.legend.distance.value == 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.legend.distance.cusGap,"unit":'px',"content":'滑动修改图例间距'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.legend.distance, "cusGap", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.legend.distance, "cusGap", $event)}}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("图例样式")])]):_vm._e()],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartLegend.vue?vue&type=template&id=9e7569a0&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/data/chartJson.js
var chartJson = __webpack_require__("b4cc");

// EXTERNAL MODULE: ./src/utils/importUtil.js
var importUtil = __webpack_require__("1540");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/chart/ChartLegend.vue?vue&type=script&lang=js&

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


/* harmony default export */ var ChartLegendvue_type_script_lang_js_ = ({
  props: {
    legendOption: Object,
    chartAllType: String,
    router: String
  },
  data: function data() {
    return {
      legend: {},
      //图例设置
      positionOption: importUtil["deepCopy"](chartJson["m" /* positionOption */]),
      sizeOption: importUtil["deepCopy"](chartJson["o" /* sizeOption */]),
      distanceOption: importUtil["deepCopy"](chartJson["d" /* distanceOption */]),
      dirOptions: [{
        value: "horizontal",
        label: "水平"
      }, {
        value: "vertical",
        label: "垂直"
      }]
    };
  },
  components: Object(objectSpread2["a" /* default */])({}, importUtil["importComp"](importUtil)),
  watch: {
    legendOption: {
      handler: function handler(newVal) {
        if (importUtil["isEqual"](this.legend, newVal)) {
          return;
        }

        this.legend = importUtil["deepCopy"](newVal);
      },
      immediate: true,
      deep: true
    },
    legend: {
      handler: function handler(newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeLegend();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, importUtil["mapActions"]('chartSetting', ['updateChartItem'])), {}, {
    changeLegend: function changeLegend() {
      var updateObj = {
        updateObj: importUtil["deepCopy"](this.legend),
        router: this.router
      };
      this.updateChartItem(updateObj);
    }
  })
});
// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartLegend.vue?vue&type=script&lang=js&
 /* harmony default export */ var chart_ChartLegendvue_type_script_lang_js_ = (ChartLegendvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartLegend.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chart_ChartLegendvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ChartLegend = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chartmix.common.5.js.map