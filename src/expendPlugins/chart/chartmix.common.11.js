((typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] || []).push([[11],{

/***/ "9e1a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"3da76939-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/base/ChartBaseSwitch.vue?vue&type=template&id=c152a4dc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('el-row',{staticStyle:{"margin-top":"15px"}},[_c('el-col',{staticClass:"title",attrs:{"span":8}},[_vm._t("title")],2),_c('el-col',{attrs:{"span":16}},[_c('el-switch',{attrs:{"active-color":"#13ce66","inactive-color":"#d8d8d8"},on:{"change":_vm.changeSwitch},model:{value:(_vm.switchData),callback:function ($$v) {_vm.switchData=$$v},expression:"switchData"}})],1)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseSwitch.vue?vue&type=template&id=c152a4dc&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/base/ChartBaseSwitch.vue?vue&type=script&lang=js&
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
/* harmony default export */ var ChartBaseSwitchvue_type_script_lang_js_ = ({
  name: "chart-base-switch",
  props: {
    switchValue: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      switchData: false
    };
  },
  mounted: function mounted() {
    this.switchData = this.switchValue ? this.switchValue : false;
  },
  methods: {
    changeSwitch: function changeSwitch(val) {
      this.$emit('update:switchValue', val);
    }
  }
});
// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseSwitch.vue?vue&type=script&lang=js&
 /* harmony default export */ var base_ChartBaseSwitchvue_type_script_lang_js_ = (ChartBaseSwitchvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseSwitch.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  base_ChartBaseSwitchvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ChartBaseSwitch = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chartmix.common.11.js.map