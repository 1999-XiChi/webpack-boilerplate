About Gulp

## 安装

1. `yarn install` 安装依赖
2. `yarn build` 本地服务

```bash
【备忘录】我这个项目是如何构建的：
1. npm init -y
2. yarn install gulp -D
```

## gulp命令

`npx gulp --tasks`

自定义命令

`npx gulp scripts`  
`npx gulp styles`  
`npx gulp clean`  
`npx gulp`  

```javascript
exports.scripts = js
exports.styles = css
exports.html = html
exports.clean = clean
exports.default = series([
  clean,
  html,
  js,
  css,
  serve,
  watcher
])
``` 


## 常见plugins

1. gulp-uglify
2. gulp-rename
3. gulp-del
4. gulp-autoprefixer
5. gulp-sass
6. gulp-load-plugins
