# deploy Demo
npm run build
cd dist
git init
git remote add origin https://github.com/mengshukeji/LuckysheetDemo.git
git add .
git commit -m 'deploy Luckysheet demo'
git push -f origin master:gh-pages

# deploy Docs
npm run docs:build
cd docs/.vuepress/dist
git init
git remote add origin https://github.com/mengshukeji/LuckysheetDocs.git
git add .
git commit -m 'deploy Luckysheet docs'
git push -f origin master:gh-pages




