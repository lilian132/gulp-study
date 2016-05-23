var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');//html压缩
var autoprefixer = require('gulp-autoprefixer');//css后缀
var minifycss = require('gulp-minify-css');//css压缩
var uglify = require('gulp-uglify');//js压缩
var concat = require('gulp-concat');//文件合并
var watch = require('gulp-watch');//文件修改监听
var swig = require('gulp-swig');//模板引擎

gulp.task('default', function() {
  gulp.run('watch','swig','concat'); 
});
gulp.task('build', function() {
  gulp.run('htmlmin','cssmin','jsmin'); 
});

//html压缩
gulp.task('htmlmin', function() {
  gulp.src('app/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('output/'));
  gulp.src('app/views/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('output/views/'))
});
//swig 
gulp.task('swig', function() {
  return gulp.src('app/page/*.html')
    .pipe(swig({defaults: { cache: false }})) //注意这里如果不加cache false,watch将失效
    .pipe(gulp.dest('app/views'));
});

//css压缩
gulp.task('cssmin', function() {
  return gulp.src('app/css/*.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'Android >= 4.0'],//主流浏览器的最新两个版本
        cascade: false, //是否美化属性值 默认：true 
        remove:true //是否去掉不必要的前缀 默认：true 
     }))
    .pipe(minifycss())
    .pipe(gulp.dest('output/css/'))
});

//js压缩
gulp.task('jsmin', function() {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('output/js/'))
});

//文件合并
gulp.task('concat', function() {
   gulp.src(['app/js/a.js','app/js/b.js'])
  .pipe(concat({ path: 'all.js', stat: { mode: 0666 }}))
  .pipe(gulp.dest('app/js/'));
});

//watch
gulp.task('watch',function(){
  gulp.watch('app/page/*.html',['swig']);
  gulp.watch('app/js/*.js',['concat']);
});