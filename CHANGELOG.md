# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.1.0](https://github.com/mengshukeji/Luckysheet/compare/v2.0.0...v2.1.0) (2020-10-10)


### ⚠ BREAKING CHANGES

* **frozen,docs:** when init workbook and sheet has frozen row or column,you need init sheet's
property frozen

### Features

* **add autocalculationmerge sheet attribute:** it can auto calculate merge infomation ([f7e30cf](https://github.com/mengshukeji/Luckysheet/commit/f7e30cf946f9c5945fd7e69bf4a3273f54e2616f))
* **add force cacultion  formula:** add forceCaculate parameter ([4dd82ad](https://github.com/mengshukeji/Luckysheet/commit/4dd82ad131e0a936c040852657b05ffd53e4b465))
* **api:** add some api functions ([37910ab](https://github.com/mengshukeji/Luckysheet/commit/37910abea38dc37fcb5cc5b905c7b028e3390c10))
* **api:** api ([6f7ca26](https://github.com/mengshukeji/Luckysheet/commit/6f7ca26ba22c47ed0746363dccfd1e392040aed9))
* **api:** api ([66aecbe](https://github.com/mengshukeji/Luckysheet/commit/66aecbe7fe16be03c9c62e1ebbf941c1a9f4bac7))
* **api:** provides an api for users ([b176753](https://github.com/mengshukeji/Luckysheet/commit/b176753ceacba3ab8a243bfe27c5ea8d9455d617))
* **api add:** api add ([e4198fa](https://github.com/mengshukeji/Luckysheet/commit/e4198fa5bda4f6787a3153a113d2be10cfe64fd5))
* **api add:** deleteRangeConditionalFormat clearRange deleteRange ([44cf72a](https://github.com/mengshukeji/Luckysheet/commit/44cf72a1c7592ac5227a92c3e325e7f5088bca30))
* **api add:** setSheetDelete setSheetCopy setSheetHide setSheetShow setSheetName setSheetColor ([62f641f](https://github.com/mengshukeji/Luckysheet/commit/62f641fe7f519b8679c4e006427a74e2e17a8f98))
* **data verification:** data verification ([a661d30](https://github.com/mengshukeji/Luckysheet/commit/a661d303101ee6ebedf22aabb60f7a5a50722b0e))
* **data verification:** data verification ([9cbbbce](https://github.com/mengshukeji/Luckysheet/commit/9cbbbce556444182536bf0a0641c5db22d4a6007))
* **delete cell:** delete cell ([d7de718](https://github.com/mengshukeji/Luckysheet/commit/d7de718d5e6e6308cae1ccf7a7699c3f7d790d8f))
* **draw use sacle:** cancel manual devicePixRatio, use context sacle ([c832283](https://github.com/mengshukeji/Luckysheet/commit/c832283c9709a8393f2c6b74d50e984c7720bb34))
* **drawmain efficiency optimization:** efficiency optimization ([37080fa](https://github.com/mengshukeji/Luckysheet/commit/37080faa39dccb23539d346080baf07ad367c2d7))
* **editor box position fit:** show diffrent position acording to align ([636046d](https://github.com/mengshukeji/Luckysheet/commit/636046dbb2f005c2e6110b3559b72a59a7c67d87))
* **fix:** fix ([9830714](https://github.com/mengshukeji/Luckysheet/commit/983071467d21a5eb1a35c0c427005e95364128db))
* **hide column:** hide column ([9f05959](https://github.com/mengshukeji/Luckysheet/commit/9f05959d4d5fea7fc26e0cedb7217f0be92bcae9))
* **image:** copy and paste ([33d6c96](https://github.com/mengshukeji/Luckysheet/commit/33d6c961bb2d88fa1ba73448c2b808957f750544))
* **image insert:** image insert ([4232dfc](https://github.com/mengshukeji/Luckysheet/commit/4232dfc7832846013e623d13f6157ee1e371bda3))
* **inline string:** finished ([325b66c](https://github.com/mengshukeji/Luckysheet/commit/325b66ccd0e7508535f16a7dfc51acba622cfc14))
* **inline string:** operation like excel ([9ac9f08](https://github.com/mengshukeji/Luckysheet/commit/9ac9f08acf088b614b5318000df2e0d442df21fd))
* **inline string:** when focus cell, show inline string content ([713805c](https://github.com/mengshukeji/Luckysheet/commit/713805cd031ccdf3e5ef1b70da504b635fed85fa))
* **inline string render finished:** begin to develop edit feature ([2ffd9ae](https://github.com/mengshukeji/Luckysheet/commit/2ffd9aedd82e9abaf32b374337503f25d56fd9da))
* **insert image:** insert image ([cf3ba93](https://github.com/mengshukeji/Luckysheet/commit/cf3ba930cadc90e3fc753ac30154974e74089cfc))
* **insert image perfect:** insert image perfect ([ad0a88a](https://github.com/mengshukeji/Luckysheet/commit/ad0a88a8d412202692ce1611f6ac7fe4ac30d2e9))
* **mobile touch event optimized:** very smooth, good experience ([0ed0bf6](https://github.com/mengshukeji/Luckysheet/commit/0ed0bf63ba06895a2ea39c581d0180db6c0d9266))
* **new style:** new style ([5c8d603](https://github.com/mengshukeji/Luckysheet/commit/5c8d603fc41e9c214cb3dca84a147b39f2f6ce06))
* **optimization function:** setCellvalue support any cell param ([9b208e4](https://github.com/mengshukeji/Luckysheet/commit/9b208e4e2eeeaae09dbe75b245c989f98747613a))
* **protection feature:** protection feature similar to Excel ([a71c92a](https://github.com/mengshukeji/Luckysheet/commit/a71c92a5f05aaed6c3df1556a81fc1b2ed97419a))
* **zoom feature beta:** zoom in and zoom out sheet ([249aa02](https://github.com/mengshukeji/Luckysheet/commit/249aa02fa6c74eb854034ee0913a73267b6057cc))
* **zoom gui:** zoom plus and minus, restore origin, slider ([d70dab4](https://github.com/mengshukeji/Luckysheet/commit/d70dab4938ff33e1fcefdd15492279347efe6b33))
* **zoom redo undo suport:** redo undo ([4d03906](https://github.com/mengshukeji/Luckysheet/commit/4d0390675f3aa021f7e15bf529a8102830878202))


### Bug Fixes

* **a few bug fix:** fix ([f07e25d](https://github.com/mengshukeji/Luckysheet/commit/f07e25d0010775b71c1e73cd3ed2db6413d661ca))
* **add button bug:** fix ([3250ef6](https://github.com/mengshukeji/Luckysheet/commit/3250ef69606d24518d7b615806c1210c2ce0a684))
* **allowedit dont work ,when press del:** allowEdit dont work ,when press DEL ([10dccec](https://github.com/mengshukeji/Luckysheet/commit/10dcceccc7f5f04afe70adebb4db59046382abb6))
* **array unique very slow:** fix it ([20f3cb3](https://github.com/mengshukeji/Luckysheet/commit/20f3cb3e2028e455b49a4d1947ac8f02186363af))
* **big data slowly:** speed up ([5109873](https://github.com/mengshukeji/Luckysheet/commit/5109873500996ac4e17abb95899f1fe5950f33b9))
* **blank border position:** fix ([d285d9f](https://github.com/mengshukeji/Luckysheet/commit/d285d9fb5e3ff74385debaf493ad6125173644a4))
* **bug:** bug ([6bb113b](https://github.com/mengshukeji/Luckysheet/commit/6bb113bb4421fc0497f7cf833975e4e2e7544aaa))
* **bug:** bug ([4806de8](https://github.com/mengshukeji/Luckysheet/commit/4806de8de501c08bde6e69be1779b3327ecf2364))
* **bug:** bug ([0cb1ec2](https://github.com/mengshukeji/Luckysheet/commit/0cb1ec23c26e2393a14475d982349a310587e7a7))
* **bug:** bug ([735d1c8](https://github.com/mengshukeji/Luckysheet/commit/735d1c8b5c3777615b20795f70e867e576b8afbf))
* **bug:** bug ([ad1ac61](https://github.com/mengshukeji/Luckysheet/commit/ad1ac6154502193a7e34177a08ce678522d08a03))
* **bug:** bug ([27d1be0](https://github.com/mengshukeji/Luckysheet/commit/27d1be0037c2bd5ba290e7b0f9db229de04582d9))
* **bug:** bug ([dea7bbf](https://github.com/mengshukeji/Luckysheet/commit/dea7bbf44414be31191841443119a3505003522e))
* **bug:** bug ([061ea20](https://github.com/mengshukeji/Luckysheet/commit/061ea2003dca838dffb9ee92d1c43f28c64a9978))
* **bug:** bug ([ba0b047](https://github.com/mengshukeji/Luckysheet/commit/ba0b04752f35f32df82229339bdb3f295fbcecb2))
* **bug:** bug ([7263008](https://github.com/mengshukeji/Luckysheet/commit/726300811a9fdb6e36d19187764aa73daacfc7b7))
* **bug:** bug ([c578c0e](https://github.com/mengshukeji/Luckysheet/commit/c578c0e34b6e589dba2ef29146d894b5c6333676))
* **bug:** bug ([fc8f61b](https://github.com/mengshukeji/Luckysheet/commit/fc8f61b0154f2220c233e680eaf814edfce3a52b))
* **bug:** bug ([fb3b512](https://github.com/mengshukeji/Luckysheet/commit/fb3b5122a5f4e333cca581251ef6d672da767b37))
* **bug:** bug ([6236e5e](https://github.com/mengshukeji/Luckysheet/commit/6236e5e8d6621c0ad829206704bdc2fac684d3bc))
* **bug:** bug ([f057d7d](https://github.com/mengshukeji/Luckysheet/commit/f057d7d281fccc7094c4f806c4590dca39cfbaa0))
* **bug fix:** [#55](https://github.com/mengshukeji/Luckysheet/issues/55) [#50](https://github.com/mengshukeji/Luckysheet/issues/50) [#54](https://github.com/mengshukeji/Luckysheet/issues/54) ([5caf2b0](https://github.com/mengshukeji/Luckysheet/commit/5caf2b028c962e8ca2e6bd1c92fed3e6a9fb462d))
* **bug fix:** pivotTable blank title disapear, merge cell is recognized as range ([47fe25c](https://github.com/mengshukeji/Luckysheet/commit/47fe25c32107e719115a98ceef2ed97ae6161f3b))
* **bugs:** fix issue [#27](https://github.com/mengshukeji/Luckysheet/issues/27) [#29](https://github.com/mengshukeji/Luckysheet/issues/29) ([5d57267](https://github.com/mengshukeji/Luckysheet/commit/5d572676d46692719309c20e536d001ccfe2cd2f))
* **celloverflow border bug:** celloverflow border bug ([86403c2](https://github.com/mengshukeji/Luckysheet/commit/86403c20b329ea4106d6498c33927b714e22941b))
* **change sheet:** change sheet must setTimeOut ([e51457e](https://github.com/mengshukeji/Luckysheet/commit/e51457ef492ae74b77a0298931268b9f14feaa44))
* **change sheet bug:** multiple refresh canvas bug ([7a625e0](https://github.com/mengshukeji/Luckysheet/commit/7a625e0dae187cc7af8e10e3449abf666fd332eb))
* **change sheet scroll bar fix:** change sheet scroll bar dont restore ([02d2655](https://github.com/mengshukeji/Luckysheet/commit/02d26557a52b7cef0cb3b2b8d14996eb29fafa51))
* **chart:** chart ([2be467d](https://github.com/mengshukeji/Luckysheet/commit/2be467d6a4b385d7d7bb0585c9be7a227614a04b))
* **cloumn and row highlight bug:** column and row highlight bar disapear ([c806211](https://github.com/mengshukeji/Luckysheet/commit/c80621118e28f711b1513c869da36989c1a70c8f))
* **columlen:** columlen ([b656c27](https://github.com/mengshukeji/Luckysheet/commit/b656c27a3971b756ea809f4c1010ae28310569da))
* **copy cut paste bug:** bug fix ([ade56d5](https://github.com/mengshukeji/Luckysheet/commit/ade56d5b5ff38dd5095234b71bc89927841fa387))
* **demo fix:** fix ([3d17426](https://github.com/mengshukeji/Luckysheet/commit/3d174260e27793d1634c5f15b83a4aa9ca4100de))
* **demo fix:** fix ([732f678](https://github.com/mengshukeji/Luckysheet/commit/732f6788bcff9ddcf4b0e6bc266b3be9e28eea41))
* **demo fontlist url change:** local path ([feb89b3](https://github.com/mengshukeji/Luckysheet/commit/feb89b301b116745e82a2b17071909d7a4873562))
* **filter option bug:** position error ([3324512](https://github.com/mengshukeji/Luckysheet/commit/33245124be8972d1e011c047caf657275ac76916))
* **fix:** bug fix ([52375dc](https://github.com/mengshukeji/Luckysheet/commit/52375dcb416f435a1adea1fa3abeb486a73d513f))
* **fix:** fix ([194dea1](https://github.com/mengshukeji/Luckysheet/commit/194dea17672cc15e76b364b788f0818299b5e64c))
* **fix bug:** param dont remenber change ([0425e4e](https://github.com/mengshukeji/Luckysheet/commit/0425e4eef2c585873a61efe9ee34496aab40b810))
* **fix bugs:** fix ([bbaafe0](https://github.com/mengshukeji/Luckysheet/commit/bbaafe0d68d670b7621d616db5f91394ded8f573))
* **fix index.html:** fix ([e980cd9](https://github.com/mengshukeji/Luckysheet/commit/e980cd91afee781a004d7e207283e41990b4e45c))
* **fix number to column title bug:** if column title is big , it will show undefined ([2d6e73e](https://github.com/mengshukeji/Luckysheet/commit/2d6e73eb3fba5ebd85b76d22ba4ffdc9c5197b58))
* **fix touch:** touch fix ([d884a69](https://github.com/mengshukeji/Luckysheet/commit/d884a698d6f62aa21bea7d76705682e7406e7973))
* **fix wrap bug:** alt + enter twice bug ([789bab5](https://github.com/mengshukeji/Luckysheet/commit/789bab5e5d712af889577ed141387c02a049f21f))
* **float calculate bug:** fix it ([ef2a96a](https://github.com/mengshukeji/Luckysheet/commit/ef2a96a7cd6d341810b99698f26063862cf33e35))
* **fonts bug on ie:** fit it ([f9a1546](https://github.com/mengshukeji/Luckysheet/commit/f9a1546ca783c058994759dc3443d2e0d9929267))
* **format of  formula cell bug fix:** if cell has format , it is no effect ([1f6ebad](https://github.com/mengshukeji/Luckysheet/commit/1f6ebad36da9de608bc32bddc945a5e3bb68528d))
* **formula -(1-2) error:** fix it ([dee2333](https://github.com/mengshukeji/Luckysheet/commit/dee2333b295aa63fae544c075a98f993c1c3e84c))
* **formula bug:** formula bug ([6c84420](https://github.com/mengshukeji/Luckysheet/commit/6c84420ad4461281ba87378af41cde0e5a7fee93))
* **formula efficiency up:** speed up ([d05151f](https://github.com/mengshukeji/Luckysheet/commit/d05151f474145cb765a60b2f118c222f8b488efb))
* **formula initialization bug:** if formula has cross sheet param, initial this ([c5f6254](https://github.com/mengshukeji/Luckysheet/commit/c5f6254bccd89a90abfa3a6d6728416983ebbb4c))
* **frozen bug:** fix ([91daa07](https://github.com/mengshukeji/Luckysheet/commit/91daa07ec94255f9135d423aa17d9425c0ffe58d))
* **frozen bug and style change:** fix bug ([7cfd0d9](https://github.com/mengshukeji/Luckysheet/commit/7cfd0d914c8999cfd4dbb2bca50f5766645cb108))
* **frozen,docs:** frozen,docs ([e1bd844](https://github.com/mengshukeji/Luckysheet/commit/e1bd844749fa05a7b178565a90bbdba0c81ce1fe))
* **function box input bug:** editor box and function box fix ([4ebb79d](https://github.com/mengshukeji/Luckysheet/commit/4ebb79d67f50dc46f97bc64a0cef0ba8d44e5c12))
* **green label size fix:** fix ([b0734b5](https://github.com/mengshukeji/Luckysheet/commit/b0734b57bb42c55e99eb831c0ca24053ea4aa6a8))
* **hide row and column fix:** add lines ([c430d66](https://github.com/mengshukeji/Luckysheet/commit/c430d6625a23b0f4b8ef903ae62e82833ed0618f))
* **hot key bug fix:** range bug when formula move selection ([f4625d1](https://github.com/mengshukeji/Luckysheet/commit/f4625d1dc38d6f69fddb0ae131d54f65bd7bcbd7))
* **image background opacity:** fix ([d61d3a0](https://github.com/mengshukeji/Luckysheet/commit/d61d3a07e55978350e9e5171537fee1457847209))
* **image,config:** image,config ([2dddfaa](https://github.com/mengshukeji/Luckysheet/commit/2dddfaa8f1a13476f512db0e0d27742ebebb7f35))
* **inline string bug:** style lost when change cell to inline string, input error ([405d90b](https://github.com/mengshukeji/Luckysheet/commit/405d90bfec0c7b47dee64e2034aeec8686c53e32))
* **inline string finished:** fix some bus ([57e7518](https://github.com/mengshukeji/Luckysheet/commit/57e75188ffb718e92251cb9813ae47b467410889))
* **inline string space dont recognize:** fix it ([ddc5c5d](https://github.com/mengshukeji/Luckysheet/commit/ddc5c5dde9a4d4db2ee42207383d696c12c58249))
* **input range bug:** fix it ([5412721](https://github.com/mengshukeji/Luckysheet/commit/5412721675598979689e4de31ec37c2e807c7c16))
* **jquery error:** jquery error ([1a2fed9](https://github.com/mengshukeji/Luckysheet/commit/1a2fed99871d79bcb895af1796909ee3e286e05f))
* **menubutton.js fonts:** fix bug ([1e62de3](https://github.com/mengshukeji/Luckysheet/commit/1e62de3d2f358e99373259600c736ca83601d2ba))
* **mobile text dose not display:** fix bug ([19922c7](https://github.com/mengshukeji/Luckysheet/commit/19922c76dd6afc4991ca3816262d40a6659baa5f))
* **mobile touch:** moubile touch fix ([04e2b8e](https://github.com/mengshukeji/Luckysheet/commit/04e2b8e06965673f807a46fbcda2a403711ec7ea))
* **my english is pool:** fix ([26ff1fd](https://github.com/mengshukeji/Luckysheet/commit/26ff1fd21180e2c795dcc24ed4d4aa2d5ba1f689))
* **no fullscreen bug:** when no fullscreen , div go to top ([64f7d0e](https://github.com/mengshukeji/Luckysheet/commit/64f7d0e6c44c24f21e6e7d8d16beac6f23a5d770))
* **normal style change bug:** fit error ([f24eb7f](https://github.com/mengshukeji/Luckysheet/commit/f24eb7f69c5c9ae53832f130a27473a686720e72))
* **offset indirect formula fix:** fix bug ([d8dfe50](https://github.com/mengshukeji/Luckysheet/commit/d8dfe50782108745e5f132c0bbb1438f7180d198))
* **old chrome dont surport actualboundingboxascent:** fix it and make it beautiful ([5c503d8](https://github.com/mengshukeji/Luckysheet/commit/5c503d851945d5ece1d69c2da8fa26c330d13930))
* **paste bug:** fixed ([76d966f](https://github.com/mengshukeji/Luckysheet/commit/76d966f27eb7632061b97a438d07a63f88704878))
* **pivot table bug:** bug ([9fcc209](https://github.com/mengshukeji/Luckysheet/commit/9fcc209b936eed2057a09b1f070d62832c9801b1))
* **pivot table change sheet bug:** if prevous sheet is pivot table and pennel is closed, change bug ([7cac8e6](https://github.com/mengshukeji/Luckysheet/commit/7cac8e62631d90bea0521498e9980234fde88fc3))
* **pivot table filter bug:** change sheet bug ,after filter pivot table ([c7c1999](https://github.com/mengshukeji/Luckysheet/commit/c7c1999081289c70b6e575e9e37fae82bdfe438c))
* **pivot table show error:** when column area have field and row area is null,pivot table show error ([04bc51c](https://github.com/mengshukeji/Luckysheet/commit/04bc51cf8dc5ff24fc5d71b3bbf755a9787ca57d))
* **remain cell style in inline string mode:** click cell and change cell style like to Excel ([7d0438a](https://github.com/mengshukeji/Luckysheet/commit/7d0438a10db44f371c23daccb9c066f30773e307))
* **render:** render ([40550d6](https://github.com/mengshukeji/Luckysheet/commit/40550d6e59c44e0f47e23f8b5fac4c5e79a5c122))
* **render bug fix:** new render method ([a1bcf81](https://github.com/mengshukeji/Luckysheet/commit/a1bcf81562ebc8c8327baad01d5e814e23fae647))
* **rotate text position mistake, when sheet zoom:** fix zoom bug, fix strike and underline bug ([6680a13](https://github.com/mengshukeji/Luckysheet/commit/6680a134252a65b346b0a99142998ced277e8adf))
* **scroll bug:** scroll bug ([3637fa4](https://github.com/mengshukeji/Luckysheet/commit/3637fa4121340e6278f12104e7877c450e92d511))
* **several bug and new feature:** formula calculation , quotePrefix add ([5a95304](https://github.com/mengshukeji/Luckysheet/commit/5a95304289714d130501faae352dc07fb21dbf68))
* **sheet change arrow:** fix bug ([4a7850b](https://github.com/mengshukeji/Luckysheet/commit/4a7850b86ef1086fe18fa7961a62bbc622ed760d))
* **splines and dynamicarray bug fix:** formula calculation update is finished ([a59aa04](https://github.com/mengshukeji/Luckysheet/commit/a59aa04e4db70e3d90c6109a18ea6a7d2747c156))
* **ssf column resize:** change ([2a09f59](https://github.com/mengshukeji/Luckysheet/commit/2a09f5977e35a388c42d4b43d7fbe6df891234db))
* **store cache:** bug fix ([cbd9014](https://github.com/mengshukeji/Luckysheet/commit/cbd90140e0aae293b40724bce692b861047d47c3))
* **text get wrong height when zoom:** fix height ([106f1fd](https://github.com/mengshukeji/Luckysheet/commit/106f1fd111a75778a2c61424290f33295cec9964))
* **toolbar:** menu button style ([d18478c](https://github.com/mengshukeji/Luckysheet/commit/d18478c0e11cdce994d585be216b9ad95836f073))
* **underline and cancelline:** add and fix ([d3f23ff](https://github.com/mengshukeji/Luckysheet/commit/d3f23fffd72f95b241710e9fdf1a70113502a815))
* **undo redo bug fix:** formula update bug ([373dc4f](https://github.com/mengshukeji/Luckysheet/commit/373dc4f464d8bd106408ce28bd48b9e44b310b5f))
* **update demo:** fix ([e101b91](https://github.com/mengshukeji/Luckysheet/commit/e101b91c4a4a427a83ef727f2e8c2e8166124485))
* **updatecell bug fix:** fix undo redo ([d8b76ce](https://github.com/mengshukeji/Luckysheet/commit/d8b76ce52f25d9fc487ca62b7007c049a4a80160))
* **websocket bux:** bug ([4eda52a](https://github.com/mengshukeji/Luckysheet/commit/4eda52ac89587515d6a20574c0711fe22de0a8c0))
* **zoom scroll position wrong:** fix ([5830e9a](https://github.com/mengshukeji/Luckysheet/commit/5830e9af5a9c8757f55a18b34af2f08ce02f2351))
* **zoom slider drag lag:** fix lag ([17ddd13](https://github.com/mengshukeji/Luckysheet/commit/17ddd13b2e87d3879fa49e1f3569f062400eb251))

## [2.0.0](https://github.com/mengshukeji/Luckysheet/compare/v2.0.0-0...v2.0.0) (2020-07-31)


### ⚠ BREAKING CHANGES

* **api:** 1. luckysheet.flowdata change to luckysheet.flowdata() 2.all apis list in
documentation
* **gulp:** demo index.html's js and css refrence change
* **bug:** bug

bug
* **chart:** add new config : plugins, array
* **main:** bug

### Features

* **cell overflow:** cell overflow ([c3e4f39](https://github.com/mengshukeji/Luckysheet/commit/c3e4f39919e68d99ad72c6a0ae104926acce6b23))
* **chart:** chart ([9991702](https://github.com/mengshukeji/Luckysheet/commit/999170251810720fc4d44012bcc7c70c124463fd))
* **chart:** chart plugin ([196362d](https://github.com/mengshukeji/Luckysheet/commit/196362db053a25ea0deaff14b5019e1450902ceb))
* d ([07d004f](https://github.com/mengshukeji/Luckysheet/commit/07d004f9d63962dc3ad09a32a1d3c61866de5525))
* **allowedit support:** allowEdit support ([59561bb](https://github.com/mengshukeji/Luckysheet/commit/59561bb3453469cbf86703672ec770187545459d))
* **bug fix:** bu ([f23ba5d](https://github.com/mengshukeji/Luckysheet/commit/f23ba5df9b967cd9d8188680723c903ee467bb29))
* **canvas:** canvas ([c63871f](https://github.com/mengshukeji/Luckysheet/commit/c63871fbeabb47d766320800d3bb8be47604690b))
* **chart:** add chart ([139bc6e](https://github.com/mengshukeji/Luckysheet/commit/139bc6ea8510667c4900db6d1b5b26a33fb52734))
* **gloabe improve and bug fix:** global improve and bug fix,include formula,find and replace,filter ([e6cfa31](https://github.com/mengshukeji/Luckysheet/commit/e6cfa3156ac2ec8989f3716601dc27bcfbdc4d13))
* **globalization fix:** pivot table , drop cell ([55d4cf2](https://github.com/mengshukeji/Luckysheet/commit/55d4cf29868787a94377ea2e659da9e74e062628))
* **locale:** locale ([4cd2ee4](https://github.com/mengshukeji/Luckysheet/commit/4cd2ee4cb3f115be9e2455a626469711d8be2c2e))
* **move:** move chart ([cda6df0](https://github.com/mengshukeji/Luckysheet/commit/cda6df0209fb1d440e54d663de682f4749660917))
* **optimiz:** optimization ([abbf592](https://github.com/mengshukeji/Luckysheet/commit/abbf592d2df320d8a44eb5375075cd65f4ef4066))
* **rightclick menu perfect:** add rows and cols  delete rows and cols  hide rows and cols ([32f94a7](https://github.com/mengshukeji/Luckysheet/commit/32f94a72285d6051df87ce45390cb4e5a4cc49b2))
* **scroll style fix beautify:** scroll,sheet color and style ([63f2630](https://github.com/mengshukeji/Luckysheet/commit/63f2630b95ab811807199670db6eee332af882a8))
* **split handler.js to small file:** split handler.js file to seven files ([0a62ff0](https://github.com/mengshukeji/Luckysheet/commit/0a62ff0565d4116ae66a758386ef8d84dcfceba5))
* **zh en:** zh en ([040bfe4](https://github.com/mengshukeji/Luckysheet/commit/040bfe4b456eb910dc7ddbcc3f5ae0e42d440951))
* **zh-cn:** zh-cn ([907226c](https://github.com/mengshukeji/Luckysheet/commit/907226c74297882896f527b9c54a88a11d592a4d))
* **zh-cn:** zh-cn ([01f9521](https://github.com/mengshukeji/Luckysheet/commit/01f9521ed37e11b2e9630b01b84583a45302fc77))


### Bug Fixes

* **bug:** bug ([7dff640](https://github.com/mengshukeji/Luckysheet/commit/7dff64086aaf034a8c427e37ef7b15da96e1123c))
* **bug:** bug ([8baf378](https://github.com/mengshukeji/Luckysheet/commit/8baf378407f67684b77e62bacf6894e4359ed2d3))
* **bug:** bug ([5ebd31e](https://github.com/mengshukeji/Luckysheet/commit/5ebd31e4a455c7547e46c418838e2e3a16def6a7))
* **bug:** bug ([f53addb](https://github.com/mengshukeji/Luckysheet/commit/f53addbf70e96b45d73014d8e181c2712820b5c3))
* **bug:** bug ([9cc36cf](https://github.com/mengshukeji/Luckysheet/commit/9cc36cf40ebb5a4f41b52f230e35d253f8261f69))
* **bug:** bug ([186e3c9](https://github.com/mengshukeji/Luckysheet/commit/186e3c9a557a555d1737d456abf872622004f052))
* **bug:** bug ([447735c](https://github.com/mengshukeji/Luckysheet/commit/447735c7ea365c2c292dd98a4fba8813a9a62d34))
* **bug:** bug ([74639a8](https://github.com/mengshukeji/Luckysheet/commit/74639a8b719db028ab856f95a80d82553c0d919c))
* **bug:** bug ([1082ab0](https://github.com/mengshukeji/Luckysheet/commit/1082ab0e2e84c7863ab29c7b68bb2d9934dcf11c))
* **bug fix:** sparkLines, pivot Table, change to sheet ([69aee1a](https://github.com/mengshukeji/Luckysheet/commit/69aee1aec3200c75cb4897f0f782a945c2ef9fd1))
* **canvas:** canvas,function ([2445ff5](https://github.com/mengshukeji/Luckysheet/commit/2445ff5094fe8da9f7d56612ceb06dd86b75b30e))
* **fix:** fix ([bd6a9bd](https://github.com/mengshukeji/Luckysheet/commit/bd6a9bdd31cefe00a6470fbec9d10471d21fac9f))
* **fix:** fix byg ([d9fb5fe](https://github.com/mengshukeji/Luckysheet/commit/d9fb5fe4c48637d2ac947fe8aa21d6a7ccde0264))
* **fix allowedit:** fix allowEdit attribute ([35820b3](https://github.com/mengshukeji/Luckysheet/commit/35820b3c2ea8437036cfc32911acde9ff32c2fea))
* **from github:** github ([abd44e8](https://github.com/mengshukeji/Luckysheet/commit/abd44e882e39bfb85c0e213e049325754bc3ba4f))
* **hot key and mousemove:** hot key fix ([1ad40cf](https://github.com/mengshukeji/Luckysheet/commit/1ad40cf5521b7b3bd804c2c1f5f13fe6860ab95e))
* **internationalization:** internationalization,formula ([c6901fc](https://github.com/mengshukeji/Luckysheet/commit/c6901fc884d14c5fb8f48a60192f1eb8ad26a485))
* **linestyle bug:** lineStyle ([27ba0a3](https://github.com/mengshukeji/Luckysheet/commit/27ba0a3010865aa0e28158e661bcd6196bc1cfe4))
* **locale:** locale bug ([3bd0cae](https://github.com/mengshukeji/Luckysheet/commit/3bd0cae0502e14c329304bfbf8c0f98c8e7b284e))
* **locale finished and bug fix:** locale finished, condition bug fix , multi range bug fix ([0aa9b3b](https://github.com/mengshukeji/Luckysheet/commit/0aa9b3baa51c818ec2415b9d1c2e838ef32bdc85))
* **locale,formula:** locale,formula ([b11b862](https://github.com/mengshukeji/Luckysheet/commit/b11b86295108d8b25ad2cd7b1ba016b3555cee0d))
* **mac scroll x reverse fix:** mac scroll x reverse fix and scroll optimization ([8eb68e8](https://github.com/mengshukeji/Luckysheet/commit/8eb68e82e2898b1be2702f463c326a304bc96106))
* **main:** bug ([67ebe19](https://github.com/mengshukeji/Luckysheet/commit/67ebe1978bf067c17c74e5b3b7b048055c53c0b4))
* **pivot table bug:** uni ([56181e6](https://github.com/mengshukeji/Luckysheet/commit/56181e610085604666d96aa6068944e05355ec7d))


### build

* **gulp:** gulpfile,index.html,pack js css ([8be0467](https://github.com/mengshukeji/Luckysheet/commit/8be0467dea483be7be2a5af1bc3545a04a67ea72))


* **api:** api ([f19a26e](https://github.com/mengshukeji/Luckysheet/commit/f19a26eab08bc44a5c380afd883d4e730f681062))

### [1.0.1-6](https://github.com/mengshukeji/Luckysheet/compare/v1.0.1-2...v1.0.1-6) (2020-07-14)


### Bug Fixes

* **core.js:** core function ([6e63969](https://github.com/mengshukeji/Luckysheet/commit/6e639699e117abd241532de5530a533b80d547bb))

### [1.0.1-2](https://github.com/mengshukeji/Luckysheet/compare/v1.0.1-1...v1.0.1-2) (2020-07-14)

### [1.0.1-1](https://github.com/mengshukeji/Luckysheet/compare/v1.0.1-0...v1.0.1-1) (2020-07-14)

### 1.0.1-0 (2020-07-14)

## 2.0.0-0 (2020-07-24)


### ⚠ BREAKING CHANGES

* **all project:** File name change

* **all project:** modular,Document promotion,Some bugs ([37c3070](https://github.com/mengshukeji/Luckysheet/commit/37c307087cb50efa9eb3e1f3a22a356024aa43b5)), closes [#11](https://github.com/mengshukeji/Luckysheet/issues/11) [#2](https://github.com/mengshukeji/Luckysheet/issues/2)
