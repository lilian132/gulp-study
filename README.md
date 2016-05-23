# gulp

>
## 什么是gulp
 gulp是基于nodejs的项目自动化构建工具，开发者可以使用它在项目开发过程中自动执行常见任务。

## 特点
- 文件配置化的项目管理
- 丰富的功能插件
- API简单易于学习，快速构建

## 如何利用gulp构建项目
### 1.安装nodejs
安装地址： [https://nodejs.org/en/](https://nodejs.org/en/ "nodejs官网下载")

检测是否安装成功,打开cmd命令提示符窗口
<pre>$node -v</pre>
能够正常返回版本号则安装成功

### 2.安装gulp
npm的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已

### 全局安装：
<pre>$ npm install gulp -g</pre>
该模块包将默认被安装在%userprofile%\AppData\Roaming\npm 下，并且自动加到系统PATH下，这样cmd命令将能直接调用到gulp命令。

### 作为项目的开发依赖（devDependencies）安装：
全局安装成功之后，我们还需要本地安装gulp作为项目依赖模块使用。这里首先创建一个简单的测试项目gulpStydy。

<li>进入项目目录 
<li>项目初始化，生成package.json文件
<pre>$npm init</pre>
<li>本地安装
<pre>$ npm install gulp --save-dev</pre>
成功之后该模块包将在当前目录下被安装，并且作为项目的依赖模块使用。同时，项目更目录中将自动生成一个package.json文件，这个文件将记录该项目的重要信息，尤其是项目的依赖模块

### 3.配置gulp文件
在项目根目录下创建一个名为 gulpfile.js 的文件：

<pre>var gulp = require('gulp');
gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});</pre>

### 4.运行gulp
<pre>$ gulp</pre>
默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。
想要单独执行特定的任务（task），请输入 gulp。

### 5.API
gulp的API非常简单：[http://www.gulpjs.com.cn/docs/api/](http://www.gulpjs.com.cn/docs/api/)

### 6.gulp插件
实际上，完整的构建一个项目依靠的往往不是gulp本身，而是依靠全球范围内的gulp插件开发者上传的众多优秀模块，而gulp更像一个平台。想了解最新的gulp可以参照：[http://gulpjs.com/plugins/](http://gulpjs.com/plugins/)

这里，将为大家介绍一些常见的插件极其使用方法：

#### 安装插件 ####
简单安装一个插件，比如：
<pre>$ npm install gulp-uglify --save-dev</pre>
这里推荐将--save-dev加上，它将自动将依赖添加到项目的package.json文件中。

你也可以一次性安装多个插件，比如
<pre>$ npm install gulp-uglify gulp-minify-css gulp-imagemin --save-dev</pre>

#### 使用插件 ####
安装完插件之后，就可以在配置文件中使用插件，比如使用js压缩插件：
<pre>
//js压缩
gulp.task('jsmin', function() {
    return gulp.src('js/*.js')
    	.pipe(rename({suffix: '.min'}))
    	.pipe(uglify())
    	.pipe(gulp.dest('assets/js/'))
});
</pre>

一个压缩任务就已经写完了，这样，所有js目录下的js文件都将被压缩，最后我们可以直接通过命令去执行它
<pre>$gulp jsmin</pre>

### 7.完整配置文件
<pre>var gulp = require('gulp');
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
  gulp.src('app/page/*.html')
    .pipe(swig({defaults: { cache: false }})) //注意这里如果不加cache false,watch将失效
    .pipe(gulp.dest('app/views'));
});

//css压缩
gulp.task('cssmin', function() {
  gulp.src('app/css/*.css')
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
  gulp.src('app/js/*.js')
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

</pre>