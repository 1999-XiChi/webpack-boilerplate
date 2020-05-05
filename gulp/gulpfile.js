const { src, dest, series, watch } = require('gulp')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload
const del = require('del')
// gulp-uglify => plugins.uglify = require('gulp-uglify')
const plugins = require('gulp-load-plugins')()

// 压缩js uglifyjs
function js(cb) {
  src('js/*.js')
    .pipe(plugins.plumber())
    // 下一个处理环节
    .pipe(plugins.uglify())
    .pipe(dest('./dist/js'))
    .pipe(reload({ stream: true }))
  cb()
}

// 对scss/less编译，压缩，输出css文件
function css(cb) {
  src('css/*.scss')
    .pipe(plugins.plumber())
    .pipe(plugins.sass({ outputStyle: 'compressed' }))
    .pipe(plugins.autoprefixer({
      cascade: false,
      remove: false
    }))
    .pipe(dest('./dist/css'))
    .pipe(reload({ stream: true }))
  cb()
}

function html(cb) {
  console.log('watch')
  src('./*.html')
    .pipe(plugins.plumber())
    .pipe(dest('./dist'))
    .pipe(reload({ stream: true }))
  cb()
}

// 监听这些文件的变化
function watcher() {
  watch('js/*.js', js)
  watch('css/*.scss', css)
  watch('*.html', html)
}

// 删除dist目录中的内容
function clean(cb) {
  del('./dist')
  cb()
}

// server任务
function serve(cb) {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })
  cb()
}

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