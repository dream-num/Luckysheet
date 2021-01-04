# deploy Demo
npm run build
cd dist
git init
git remote add origin https://github.com/mengshukeji/LuckysheetDemo.git
git config --local user.email "1414556676@qq.com"
git config --local user.name "Dushusir"
git add .
git commit -m 'deploy Luckysheet demo'
git push -f origin master:gh-pages

# ===============================================

# deploy Docs
npm run docs:build
cd docs/.vuepress/dist
git init
git remote add origin https://github.com/mengshukeji/LuckysheetDocs.git
git add .
git commit -m 'deploy Luckysheet docs'
git push -f origin master:gh-pages

# ===============================================

# add a tags
git tag -a doc -m "doc"


# replease
npm run build
npm run release -- --release-as patch
git push --follow-tags origin master
npm publish

# only publish
npm run build
git add .
npm run commit
npm version patch
git push -u origin master
npm publish


# ==============================================

# test feature branch
git checkout -b fea origin/feature
git pull

## After some test, create PR merge feature to master branch

git checkout master
git branch -d fea

# ===============================================

# test pull request: https://docs.github.com/cn/free-pro-team@latest/github/collaborating-with-issues-and-pull-requests/checking-out-pull-requests-locally

# 139 is ID, dev is branch name
git fetch origin pull/139/head:test-139
git checkout test-139
# test code
git push origin test-139
# create new PR ,merge test-139 to master

# list all remote and local branchs
git branch -a
# delete remote branch
git push origin --delete dev
git checkout master
# delete local branch
git branch -d dev

# pr
## 1. fork 到自己的仓库

## 2. git clone 到本地

## 3. 上游建立连接
git remote add upstream https://github.com/mengshukeji/Luckysheet.git

## 4. 创建开发分支
git checkout -b dev

## 5. 修改提交代码
git add . 
git commit -m "add" 
git push origin dev

## 6. 同步代码，将最新代码同步到本地
git fetch upstream 
git rebase upstream/master

## 7. 如果有冲突（没有可以略过）
git status # 查看冲突文件，并修改冲突
git add .
git rebase --continue

## 8.提交分支代码
git push origin dev

## 7. 提交pr
去自己github仓库对应fork的项目下new pull request