

# 更新日志

### 2024/01/10 
+ 新建测试目录 ./demo
  + demo01.html 直接打开，测试源码
  + demo02_vu2.html 应用vue2, 测试源码
+ 发现问题1，页面数据不会自动存储，刷新页面数据丢失
  + 解决，增加存储按钮，手动或者自动存储，sheet数据到localStore



### 2024/01/11

+ 阅读源码，理清代码执行逻辑
  
```html
src/core.js			//入口程序
src/controllers/sheetmanage.js	 
	sheetmanage()	//单元格操作类
	initialjfFile() //初始页面数据
srec/global/createdom.js  //创建页面DMO
	luckysheetcreatedom()
src/controllers/constant.js
```

### 2024/01/12
+ 增加了定时自动保存，刷新页面数据不丢失 `core.js 文件中`

### 2024/01/15
+ 增加了新建，完善了自动保存


