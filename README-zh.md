<div align="center">

![logo](/docs/.vuepress/public/img/logo_text.png)


</div>

简体中文 | [English](./README.md)

## 介绍
🚀Luckysheet ，一款纯前端类似excel的在线表格，功能强大、配置简单、完全开源。

## 招聘
字节跳动靠谱内推 - 前端工程师（上海 · 飞书）
30 – 60K · 15薪
1. 简历优先筛选
2. 面试过程及时跟进
3. 凭实力说话，薪资在行业有很强竞争力
4. 包三餐和下午茶
5. 有意向可以先咨询
6. 框架: React、Electron

<img src="https://minio.cnbabylon.com/public/luckysheet/feishu_jd.jpg" width = "250" alt="微信群" align="center" />

## 相关链接
 | 源码   | 文档 | Demo | 插件Demo | 论坛 |
 | ------ | -------- | ------ | ------ | ------ |
 | [Github](https://github.com/mengshukeji/Luckysheet)| [在线文档](https://mengshukeji.github.io/LuckysheetDocs/zh/) | [在线Demo](https://mengshukeji.github.io/LuckysheetDemo) / [协同编辑Demo](http://luckysheet.lashuju.com/demo/) | [导入Excel Demo](https://mengshukeji.github.io/LuckyexcelDemo/) | [中文论坛](https://support.qq.com/product/288322) |
 | [Gitee镜像](https://gitee.com/mengshukeji/Luckysheet)| [Gitee在线文档](https://mengshukeji.gitee.io/LuckysheetDocs/zh/) | [Gitee在线Demo](https://mengshukeji.gitee.io/luckysheetdemo/) | [Gitee导入Excel Demo](https://mengshukeji.gitee.io/luckyexceldemo/) | [Google Group](https://groups.google.com/g/luckysheet) |

![演示](/docs/.vuepress/public/img/LuckysheetDemo.gif)

## 插件
- [Luckyexcel](https://gitee.com/mengshukeji/Luckyexcel)：excel导入导出库 
- [chartMix](https://gitee.com/mengshukeji/chartMix)：图表插件

## 生态

| 工程 | 描述 |
|---------|-------------|
| [Luckysheet Vue]          | 在vue cli 3项目中使用Luckysheet和Luckyexcel|
| [Luckysheet React]          | 在React项目中使用Luckysheet |
| [Luckyexcel Node]          | 在koa2中使用Luckyexcel |
| [Luckysheet Server]          | Java后台Luckysheet Server |
| [Luckysheet Server Starter]          | LuckysheetServer 一键docker部署 |

[Luckysheet Vue]: https://gitee.com/mengshukeji/luckysheet-vue
[Luckysheet React]: https://gitee.com/mengshukeji/luckysheet-react
[Luckyexcel Node]: https://gitee.com/mengshukeji/Luckyexcel-node
[Luckysheet Server]: https://gitee.com/mengshukeji/LuckysheetServer
[Luckysheet Server Starter]: https://gitee.com/mengshukeji/LuckysheetServerStarter

## 特性

- **格式设置**：样式，条件格式，文本对齐及旋转，文本截断、溢出、自动换行，多种数据类型，单元格内多样式
- **单元格**：拖拽，下拉填充，多选区，查找和替换，定位，合并单元格，数据验证
- **行和列操作**：隐藏、插入、删除行或列，冻结，文本分列
- **操作体验**：撤销、重做，复制、粘贴、剪切，快捷键，格式刷，选区拖拽
- **公式和函数**：内置公式，远程公式，自定义公式
- **表格操作**：筛选，排序
- **增强功能**：数据透视表，图表，评论，共享编辑，插入图片，矩阵计算，截图，复制到其他格式，EXCEL导入及导出等

更详细的功能列表，请查阅：[特性](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/#%E7%89%B9%E6%80%A7)

## 📖 学习资源

- 新用户优先阅读：[用户指引](https://github.com/mengshukeji/Luckysheet/wiki/User-Guide)
- 社区提供的教程、学习资料及配套解决方案请查阅：[教程与资源](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/resource.html)

## 📜 更新日志

每个版本的详细更改都记录在 [CHANGELOG.md](CHANGELOG.md) 中。

## ❗️ 问题反馈

在反馈问题之前，请确保仔细阅读 [如何提交问题](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/contribute.html#如何提交问题)。 不符合准则的问题可能会立即被移除。

## ✅ 开发计划

通过 [GitHub Projects](https://github.com/mengshukeji/Luckysheet/projects/1) 管理

## 💪 贡献

在提交PR之前，请确保仔细阅读 [贡献指南](https://mengshukeji.github.io/LuckysheetDocs/zh/guide/contribute.html)。

## 用法

### 第一步
通过CDN引入依赖

```
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/css/pluginsCss.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/plugins.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/css/luckysheet.css' />
<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/assets/iconfont/iconfont.css' />
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/plugins/js/plugin.js"></script>
<script src="https://cdn.jsdelivr.net/npm/luckysheet@latest/dist/luckysheet.umd.js"></script>
```
### 第二步
指定一个表格容器
```
<div id="luckysheet" style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"></div>
```
### 第三步
创建一个表格
```
<script>
    $(function () {
        //配置项
        var options = {
            container: 'luckysheet' //luckysheet为容器id
        }
        luckysheet.create(options)
    })
</script>
```
## 开发

### 环境
[Node.js](https://nodejs.org/en/) Version >= 6 

### 安装
```
npm install
npm install gulp -g
```
### 开发
```
npm run dev
```
### 打包
```
npm run build
```

## 合作项目

- [鲁班h5](https://github.com/ly525/luban-h5)
- [h5-Dooring](https://github.com/MrXujiang/h5-Dooring)
- [Furion](https://gitee.com/monksoul/Furion)

## 交流

- [Github 论坛](https://github.com/mengshukeji/Luckysheet/discussions)
- 添加小编微信,拉你进Luckysheet开发者交流微信群,备注:加群

  <img src="/docs/.vuepress/public/img/%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg" width = "200" alt="微信群" align="center" />

或者

- 加入Luckysheet开发者交流QQ群
  
  <img src="/docs/.vuepress/public/img/QQ%E7%BE%A4%E4%BA%8C%E7%BB%B4%E7%A0%81.jpg" width = "200" alt="微信群" align="center" />

[英文社群](./README.md)

## 赞助

Luckysheet是MIT许可的开源项目，其持续稳定的开发离不开这些优秀的 [**支持者**](https://mengshukeji.github.io/LuckysheetDocs/zh/about/sponsor.html#%E8%B5%9E%E5%8A%A9%E8%80%85%E5%88%97%E8%A1%A8)。 如果您想加入他们，请考虑：

- [成为Patreon的支持者或赞助商](https://www.patreon.com/mengshukeji)
- [成为Open Collective的支持者或赞助商](https://opencollective.com/luckysheet)
- 通过PayPal，微信或支付宝一次性捐赠

| PayPal |  微信  | 支付宝 |
|---|---|---|
| [Paypal Me](https://www.paypal.me/wbfsa) | <img src="https://minio.cnbabylon.com/public/luckysheet/wechat.jpg" width="140" />| <img src="https://minio.cnbabylon.com/public/luckysheet/alipay.jpg" width="130" /> |

### Patreon和OpenCollective有什么区别？

通过Patreon捐赠的资金将直接用于支持menshshukeji在Luckysheet上的工作。 通过OpenCollective捐赠的资金由透明费用管理，将用于补偿核心团队成员的工作和费用或赞助社区活动。 通过在任一平台上捐款，您的姓名/徽标将得到适当的认可和曝光。

## 赞助者列表

（按时间顺序排列）
- *勇 ¥ 30
- 虚我 ¥ 200
- 甜党 ¥ 50
- Alphabet(Google)-gcf ¥ 1
- **平 ¥ 100
- **东 ¥ 10
- debugger ¥ 20
- 烦了烦 ¥ 10
- 文顶顶 ¥ 200
- yangxshn ¥ 10
- 爱乐 ¥ 100
- 小李飞刀刀 ¥ 66
- 张铭 ¥ 200
- 曹治军 ¥ 1
- *特 ¥ 10
- **权 ¥ 9.9
- **sdmq ¥ 20
- *旭 ¥ 10
- Quentin ¥ 20
- 周宇凡 ¥ 100
- *超 ¥ 10
- 维宁 ¥ 100
- hyy ¥ 20
- 雨亭寒江月 ¥ 50

## 贡献者和感谢

### 核心团队活跃成员
- [@wbfsa](https://github.com/wbfsa)
- [@iamxuchen800117](https://github.com/iamxuchen800117)
- [@wpxp123456](https://github.com/wpxp123456)
- [@tonytonychopper123](https://github.com/tonytonychopper123)
- [@Dushusir](https://github.com/Dushusir)
- [@c19c19i](https://weibo.com/u/3884623955)
- [@zhangchen915](https://github.com/zhangchen915)
- [@jerry-f](https://github.com/jerry-f)
- [@flowerField](https://github.com/flowerField)

### 社区伙伴
- [@danielcai1987](https://github.com/danielcai1987)
- [@qq6690876](https://github.com/qq6690876)
- [@javahuang](https://github.com/javahuang)
- [@TimerGang](https://github.com/TimerGang)
- [@gsw945](https://github.com/gsw945)
- [@swen-xiong](https://github.com/swen-xiong)
- [@lzmch](https://github.com/lzmch)
- [@kdevilpf](https://github.com/kdevilpf)
- [@WJWM0316](https://github.com/WJWM0316)

## 版权信息
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, mengshukeji
