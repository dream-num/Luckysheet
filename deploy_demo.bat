npm run build
cd dist
git init
git add -A
git commit -m 'deploy Luckysheet demo'
git push -f https://github.com/mengshukeji/LuckysheetDemo.git master:gh-pages