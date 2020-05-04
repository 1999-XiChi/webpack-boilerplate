const { src, dest, series, watch} = require('gulp');
const plugins = require('gulp-load-plugins')()
const del = require('del');
const browserSync = require('browser-sync')
const reload = browserSync.reload

// 压缩js uglifyjs
function js (cb){
  src('js/*.js')
    // 下一个处理环节
    .pipe(plugins.uglify())
    .pipe(dest('./dist/js'))
    .pipe(reload({ stream: true}))
  cb()
}

// 对less/stylus...编译，压缩
function css(cb){
  src('css/*.sass')
    .pipe(plugins.sass({ outputStyle: 'compressed'}))
    .pipe(plugins.autoprefixer({
      cascade: false,
      remove: false
    }))
    .pipe(dest('./dist/css'))
    .pipe(reload({ stream: true}))
  cb();
}

// 监听这些文件的变化
function watcher(){
  watch('js/*js', js)
  watch('css/*.sass', css)
}

// 删除dist目录中的内容
function clean(cb){
  del('./dist')
  cb()
}

function serve(){
  browserSync.init({
    serve:{
      baseDir: './'
    }
  })
}

exports.scripts = js
exports.styles = css
exports.clean = clean
exports.default = series([
  clean,
  js,
  css,
  serve,
  watcher
])