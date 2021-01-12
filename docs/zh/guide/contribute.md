
# 贡献指南  

  欢迎！我们很高兴您能来到这里，并非常期待您能有兴趣参与 Luckysheet 贡献。当然，在您参与 Luckysheet 贡献之前，请确保通读以下全文：

## 我们的行为准则

1. 我们保证尊重所有参与贡献的人，不限于提出问题、文档和代码贡献、解决bug以及其它贡献的人；

2. 我们有义务遵守当地法律法规，所有的附带法律风险的行为我们都是拒绝的；
3. 我们反对任何参与者存在贬损评论、人身攻击、骚扰或侮辱他人以及其他非专业行为；
4. 我们有权并有责任删除或编辑与此行为准则不符的内容，不限于代码、Issues、wiki、文档以及其它。不遵守行为准则的参与者可能会被移除团队；
5. 我们接受任何人的监督，任何人可通过问题反馈，向我们报告发现的与此行为准则不符的事实存在。

## 如何参与贡献？

* 贡献文档：浏览文档可以加深您对 Luckysheet 的了解，一旦发现文档写得不清晰或逻辑混乱的地方，可以订正、修改、补充，您可以通过 [中文论坛](https://support.qq.com/products/288322)或者 [谷歌论坛](https://groups.google.com/g/luckysheet)给予反馈
* 贡献代码：欢迎大家为 Luckysheet 社区贡献代码，欢迎您认领Open状态的 [Issues](https://github.com/mengshukeji/Luckysheet/issues) 和未完成的特性，提交PR，成为贡献者之一如果您在使用过程中发现有些功能无法满足您的需求或出现问题，请在Issues中记录
* 参与Issue讨论：您可以在任一 [Issues](https://github.com/mengshukeji/Luckysheet/issues) 下发表您的建议
* Review代码：您可以在 [Github](https://github.com/mengshukeji/Luckysheet)上看到所有贡献者提交的PR，您可以Review他们的代码并发表您的建议


## 如何提交 Issues

在您提交特性/改进前，应该注意以下几点：

* 请先确认该特性/改进是否被其他人已经提交
* 一个通俗易懂的标题来阐述你提交的Bug/提交特性/改进
* 如果是Bug则详细描述该bug产生的原因，如果能够复现，请尽量提供完整的重现步骤
* 如果是特性，那么该特性应该有广泛的适用性，适用于大部分用户，最好能够提供详尽的设计文档
* 如果是改进，尽可能描述清楚此改进所带来的益处

具体步骤：

* 创建 [Issues](https://github.com/mengshukeji/Luckysheet/issues) ，描述清楚问题
* 如果你要解决该issue则将issue assign到自己名下，如果你仅仅是提交Bug/特性/改进，并没有时间去贡献代码，则assignne设置为空
* 如果是比较大的特性/改进，尽量先输出设计文档，走 [Luckysheet RFC](https://github.com/mengshukeji/Luckysheet-rfcs) 流程，供其他人review

## 如何认领 Issues

在 Luckysheet 的 [Issues](https://github.com/mengshukeji/Luckysheet/issues) 列表中，有很多由其他人创建的issue并未被修复，如果你感兴趣的话，可以认领这些issue。认领步骤如下：

* 在该issue下留言，表达想认领该任务的想法，另注明 **@I can solve it** 即可
* 如果提交者没有意见，则将该issue assign到自己名下并及时更新进度
* 如果是比较大的特性，尽量先输出设计文档，走 [Luckysheet RFC](https://github.com/mengshukeji/Luckysheet-rfcs) 流程，供其他人review
* 开发代码并提交代码至github


## 如何提交代码

1. fork 到自己的仓库

进入  [Luckysheet](https://github.com/mengshukeji/Luckysheet)  的Github页面 ，点击右上角按钮 Fork 进行 Fork。

2. git clone 到本地

```shell
git clone https://github.com/<your_github_name>/Luckysheet.git
```

3. 上游建立连接

```shell

cd Luckysheet
git remote add upstream https://github.com/mengshukeji/Luckysheet.git
```
4. 创建开发分支

```shell
git checkout -b dev
```

5. 修改提交代码

```shell
git add . 
npm run commit
git push origin dev
```

6. 同步代码，将最新代码同步到本地

```shell
git fetch upstream 
git rebase upstream/master
```

7. 如果有冲突（没有可以忽略）

```shell
git status # 查看冲突文件，并修改冲突
git add .
git rebase --continue
```
提交git rebase --continue命令的时候，如果弹出vim提示编辑commit信息，则可以添加你的修改，然后保存退出
> vim命令请参考阅读[vim](https://www.runoob.com/linux/linux-vim.html)

8. 提交分支代码

```shell
git push origin dev
```

如果提示需要先pull 可以先拉取在提交
```shell
git pull origin dev
git push origin dev
```
若弹出vim提示编辑commit信息，可以直接通过vim命令退出
> vim命令请参考阅读[vim](https://www.runoob.com/linux/linux-vim.html)

9. 提交pr
去自己github仓库对应fork的项目，切换到刚刚创建修改的分支，点击new pull request，并添加上对应的描述，最后点击Create pull request进行提交
    
## 代码规范

> 一般性的代码规范示例

* 保持块深度最小。尽可能避免嵌套If条件
```js
// CORRECT
if (!comparison) return

if (variable) {
  for (const item of items) {}
} else if (variable2) {
  // Do something here
}

// INCORRECT
if (comparison) {
  if (variable) {
    for (const item in items) {}
  } else if (variable2) {
    // Do something here
  }
} else {
  return
}
```

* 不要使用操作数进行链比较
```js
// CORRECT

if (cb) cb()
if (!cb || (cb === fn)) cb()

// INCORRECT

cb && cb()
(!cb || (cb === fn)) && cb()
```

* 所有变量都应该按字母顺序在块的开头声明
```js
// CORRECT
function foo () {
  const foo = 'bar'
  const bar = 'foo'

        if (conditional) {}

  ...

  return foo
}

// INCORRECT

function foo () {
  const foo = 'bar'

        if (conditional) {}

  const bar = 'foo'

  ...

  return foo
}
```

* 尽快返回
```js
// CORRECT
if (condition) return 'foo'
if (condition2) return 'bar'
// Return must have a blank line above
return 'fizz'

// INCORRECT
const variable = ''

if (condition) {
  variable = 'foo'
} else if (condition2) {
  variable = 'bar'
} else {
  variable = 'fizz'
}

return variable
```

## 如何贡献文档

## 如何成为Luckysheet Committer

任何人只要对 Luckysheet 项目做了贡献，那您就是官方承认的 Luckysheet 项目的Contributor了，从Contributor成长为Committer并没有一个确切的标准， 也没有任何预期的时间表，但是Committer的候选人一般都是长期活跃的贡献者，成为Committer并没有要求必须有巨大的架构改进贡献， 或者多少行的代码贡献，贡献代码、贡献文档、参与邮件列表的讨论、帮助回答问题等等都提升自己影响力的方式。

潜在贡献清单（无特定顺序）：

* 提交自己发现的Bug、特性、改进到issue
* 更新官方文档使项目的文档是最近的、撰写 Luckysheet 的最佳实践、特性剖析的各种对用户有用的文档
* 执行测试并报告测试结果，性能测试与其他MQ的性能对比测试等
* 审查(Review)其他人的工作（包括代码和非代码）并发表你自己的建议
* 指导新加入的贡献者，熟悉社区流程
* 发表关于 Luckysheet 的博客
* 有利于 Luckysheet 社区发展的任何贡献
* ......
