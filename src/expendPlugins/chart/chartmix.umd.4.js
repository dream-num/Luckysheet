((typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] = (typeof self !== 'undefined' ? self : this)["webpackJsonpchartmix"] || []).push([[4],{

/***/ "02ce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"4cda0323-vue-loader-template"}!./node_modules/_vue-loader@15.9.5@vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.5@vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/base/ChartBaseLabel.vue?vue&type=template&id=60c9ecbe&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('el-row',{staticStyle:{"margin-top":"15px"}},[_c('el-col',{staticClass:"title",attrs:{"span":8}},[_vm._t("title")],2),_c('el-col',{attrs:{"span":16}},[_c('chart-base-box',{attrs:{"boxData":_vm.baseLabelOptionData.fontGroup,"checkboxOption":_vm.fontStyleObj,"prop":_vm.prop + '.fontGroup'},on:{"update:boxData":function($event){return _vm.$set(_vm.baseLabelOptionData, "fontGroup", $event)},"update:box-data":function($event){return _vm.$set(_vm.baseLabelOptionData, "fontGroup", $event)},"summit":function($event){return _vm.summit(arguments)}}}),_c('el-row',{staticStyle:{"margin-top":"5px"}},[_c('el-col',{attrs:{"span":12}},[_c('chart-base-select',{attrs:{"hideCol":true,"prop":_vm.prop + '.fontSize',"selectOption":_vm.fontSizeList,"selectValue":_vm.baseLabelOptionData.fontSize,"tooltip":'选择字体大小'},on:{"update:selectValue":function($event){return _vm.$set(_vm.baseLabelOptionData, "fontSize", $event)},"update:select-value":function($event){return _vm.$set(_vm.baseLabelOptionData, "fontSize", $event)},"summit":function($event){return _vm.summit(arguments)}}})],1),_c('el-col',{attrs:{"offset":2,"span":8}},[_c('el-color-picker',{attrs:{"size":"mini"},on:{"change":_vm.changeStyle},model:{value:(_vm.baseLabelOptionData.color),callback:function ($$v) {_vm.$set(_vm.baseLabelOptionData, "color", $$v)},expression:"baseLabelOptionData.color"}})],1)],1)],1)],1),(_vm.baseLabelOptionData.fontSize === 'custom')?_c('chart-base-slider',{attrs:{"baseSliderOption":_vm.baseLabelOptionData.cusFontSize,"content":'滑动修改字体大小',"prop":_vm.prop + '.cusFontSize',"unit":'px'},on:{"update:baseSliderOption":function($event){return _vm.$set(_vm.baseLabelOptionData, "cusFontSize", $event)},"update:base-slider-option":function($event){return _vm.$set(_vm.baseLabelOptionData, "cusFontSize", $event)},"summit":function($event){return _vm.summit(arguments)}}}):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseLabel.vue?vue&type=template&id=60c9ecbe&

// EXTERNAL MODULE: ./node_modules/_core-js@3.8.1@core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("c726");

// EXTERNAL MODULE: ./node_modules/_core-js@3.8.1@core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("b784");

// EXTERNAL MODULE: ./node_modules/_@babel_runtime@7.12.5@@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__("d211");

// EXTERNAL MODULE: ./src/utils/importUtil.js
var importUtil = __webpack_require__("1540");

// EXTERNAL MODULE: ./src/data/chartJson.js
var chartJson = __webpack_require__("b4cc");

// CONCATENATED MODULE: ./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--12-0!./node_modules/_thread-loader@2.1.3@thread-loader/dist/cjs.js!./node_modules/_babel-loader@8.2.2@babel-loader/lib!./node_modules/_cache-loader@4.1.0@cache-loader/dist/cjs.js??ref--0-0!./node_modules/_vue-loader@15.9.5@vue-loader/lib??vue-loader-options!./src/packages/ChartMix/chartChips/base/ChartBaseLabel.vue?vue&type=script&lang=js&



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


/* harmony default export */ var ChartBaseLabelvue_type_script_lang_js_ = ({
  name: 'chart-base-label',
  props: {
    router: String,
    baseLabelOption: Object,
    prop: String
  },
  components: {
    'chart-base-slider': importUtil["ChartBaseSlider"],
    'chart-base-select': importUtil["ChartBaseSelect"],
    'chart-base-box': importUtil["ChartBaseBox"]
  },
  data: function data() {
    return {
      baseLabelOptionData: {},
      //整个label设置
      fontSizeList: importUtil["deepCopy"](chartJson["f" /* fontSizeList */]),
      //位置选择数组
      fontStyleObj: {},
      //字体样式:数据=>DOM转换
      propPlace: null
    };
  },
  watch: {
    baseLabelOption: {
      handler: function handler(newVal) {
        if (importUtil["isEqual"](this.baseLabelOptionData, newVal)) {
          return;
        }

        this.baseLabelOptionData = importUtil["deepCopy"](newVal); //传过来的值需要深拷贝防止数据流向父组件传递
        //根据在不同的组件内渲染不同的结构

        if (this.router.includes('title')) {
          //在主标题/副标题组件内
          this.fontStyleObj = importUtil["deepCopy"](chartJson["i" /* fontStyleIBV */]);
        } else {
          //鼠标提示组件内
          this.fontStyleObj = importUtil["deepCopy"](chartJson["h" /* fontStyleIB */]);
        }
      },
      immediate: true,
      deep: true
    },
    baseLabelOptionData: {
      handler: function handler(newVal, oldVal) {
        if (oldVal) {
          this.changeStyle();
          this.$emit('summit', this.prop, oldVal);
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: Object(objectSpread2["a" /* default */])(Object(objectSpread2["a" /* default */])({}, importUtil["mapActions"]('chartSetting', ['updateChartItem', 'updateCurrentProp'])), {}, {
    changeStyle: function changeStyle() {
      var prop = {
        prop: this.propPlace,
        oldValue: this.oldVal,
        value: this.curVal
      };
      var updateObj = {
        updateObj: importUtil["deepCopy"](this.baseLabelOptionData),
        router: this.router
      };
      this.updateCurrentProp(prop);
      this.updateChartItem(updateObj);
    },
    summit: function summit(val) {
      this.propPlace = val[0];
      this.curVal = val[1];
      this.oldVal = val[2];
    }
  })
});
// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseLabel.vue?vue&type=script&lang=js&
 /* harmony default export */ var base_ChartBaseLabelvue_type_script_lang_js_ = (ChartBaseLabelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/_vue-loader@15.9.5@vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("c701");

// CONCATENATED MODULE: ./src/packages/ChartMix/chartChips/base/ChartBaseLabel.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  base_ChartBaseLabelvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ChartBaseLabel = __webpack_exports__["default"] = (component.exports);

/***/ })

}]);
//# sourceMappingURL=chartmix.umd.4.js.map