((typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] || []).push([[8],{

/***/ "3f9f":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3da76939-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/base/ChartBaseBox.vue?vue&type=template&id=78fe7fa8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-row',[_c('el-checkbox-group',{attrs:{"size":"mini"},on:{"change":_vm.changeStyle},model:{value:(_vm.boxValue),callback:function ($$v) {_vm.boxValue=$$v},expression:"boxValue"}},_vm._l((_vm.checkboxOption),function(value,name){return _c('el-tooltip',{key:name,attrs:{"open-delay":500,"content":value.des,"effect":"dark","placement":"bottom"}},[_c('el-checkbox-button',{attrs:{"label":name}},[_vm._v(" "+_vm._s(value.text)+" ")])],1)}),1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseBox.vue?vue&type=template&id=78fe7fa8&

// EXTERNAL MODULE: ./src/utils/util.js + 4 modules
var util = __webpack_require__("ca00");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/base/ChartBaseBox.vue?vue&type=script&lang=js&
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

/* harmony default export */ var ChartBaseBoxvue_type_script_lang_js_ = ({
  props: {
    checkboxOption: [Object, Array],
    boxData: {
      type: Array,
      default: []
    }
  },
  data: function data() {
    return {
      boxValue: ''
    };
  },
  mounted: function mounted() {
    this.boxValue = this.boxData ? Object(util["b" /* deepCopy */])(this.boxData) : [];
  },
  methods: {
    changeStyle: function changeStyle(val) {
      this.$emit('update:boxData', val);
    }
  }
});
// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseBox.vue?vue&type=script&lang=js&
 /* harmony default export */ var base_ChartBaseBoxvue_type_script_lang_js_ = (ChartBaseBoxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseBox.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  base_ChartBaseBoxvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ChartBaseBox = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chartmix.umd.8.js.map