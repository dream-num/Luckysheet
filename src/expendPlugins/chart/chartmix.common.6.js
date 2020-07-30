((typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] || []).push([[6],{

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

/***/ "969a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3da76939-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/chart/ChartSubTitle.vue?vue&type=template&id=60e525b6&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-collapse-item',{attrs:{"name":"2"}},[_c('template',{slot:"title"},[_vm._v(" 副标题设置 "),_c('i',{staticClass:"iconfont icon-biaoti"})]),_c('chart-base-input',{attrs:{"inputValue":_vm.subTitle.text,"placeholder":'请输入副标题内容'},on:{"update:inputValue":function($event){return _vm.$set(_vm.subTitle, "text", $event)},"update:input-value":function($event){return _vm.$set(_vm.subTitle, "text", $event)}}},[_c('div',{attrs:{"slot":"input"},slot:"input"},[_vm._v("副标题内容")])]),_c('chart-base-label',{attrs:{"router":_vm.router + '/label',"baseLabelOption":_vm.subTitle.label}},[_c('div',{attrs:{"slot":"title"},slot:"title"},[_vm._v("文本样式")])]),_c('chart-base-select',{attrs:{"selectOption":_vm.distanceOption,"selectValue":_vm.subTitle.distance.value},on:{"update:selectValue":function($event){return _vm.$set(_vm.subTitle.distance, "value", $event)},"update:select-value":function($event){return _vm.$set(_vm.subTitle.distance, "value", $event)}}},[_c('div',{attrs:{"slot":"select"},slot:"select"},[_vm._v("主副标题间距")])]),(_vm.subTitle.distance.value === 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.subTitle.distance.cusGap,"unit":'px',"content":'滑动修改间距'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.subTitle.distance, "cusGap", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.subTitle.distance, "cusGap", $event)}}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartSubTitle.vue?vue&type=template&id=60e525b6&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("5530");

// EXTERNAL MODULE: ./src/utils/importUtil.js
var importUtil = __webpack_require__("1540");

// EXTERNAL MODULE: ./src/data/chartJson.js
var chartJson = __webpack_require__("b4cc");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/chart/ChartSubTitle.vue?vue&type=script&lang=js&

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


/* harmony default export */ var ChartSubTitlevue_type_script_lang_js_ = ({
  name: 'ChartSubTitle',
  props: {
    router: String,
    chartAllType: String,
    subTitleOption: Object
  },
  components: Object(objectSpread2["a" /* default */])({}, importUtil["importComp"](importUtil)),
  data: function data() {
    return {
      subTitle: {},
      //整个title设置
      distanceOption: importUtil["deepCopy"](chartJson["e" /* distanceOption */]) //位置选择数组

    };
  },
  watch: {
    subTitleOption: {
      handler: function handler(newVal) {
        if (importUtil["isEqual"](this.subTitle, newVal)) {
          return;
        }

        this.subTitle = importUtil["deepCopy"](newVal); //传过来的值需要深拷贝防止数据流向父组件传递
      },
      immediate: true,
      deep: true
    },
    subTitle: {
      handler: function handler(newVal, oldVal) {
        // 改变值就重新渲染
        if (oldVal) {
          this.changeTitle();
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, importUtil["mapActions"]('chartSetting', ['updateChartItem'])), {}, {
    changeTitle: function changeTitle() {
      var updateObj = {
        updateObj: importUtil["deepCopy"](this.subTitle),
        router: this.router
      };
      this.updateChartItem(updateObj);
    }
  })
});
// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartSubTitle.vue?vue&type=script&lang=js&
 /* harmony default export */ var chart_ChartSubTitlevue_type_script_lang_js_ = (ChartSubTitlevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/chart/ChartSubTitle.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  chart_ChartSubTitlevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ChartSubTitle = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chartmix.common.6.js.map