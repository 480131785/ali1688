const gulp = require("gulp");

// 1.复制矢量图标
gulp.task("icon",function(){
    return gulp.src("font_9n2nh3bokv/**")
    .pipe(gulp.dest("dist/font_9n2nh3bokv"))
    .pipe(connect.reload())
})

gulp.task("icon",function(){
    return gulp.src("font_klmqtf9npye/**")
    .pipe(gulp.dest("dist/font_klmqtf9npye"))
    .pipe(connect.reload())
})

gulp.task("icon",function(){
    return gulp.src("font_vb6xfcewbp/**")
    .pipe(gulp.dest("dist/font_vb6xfcewbp"))
    .pipe(connect.reload())
})
// 2.复制html代码
const htmlmin = require("gulp-htmlmin");

gulp.task("copy-html",function(){
    return gulp.src("*.html")
    .pipe(htmlmin({
        removeComments:true,
        removeEmptyAttributes:true,
        collapseWhitespace:true,
    }))
    .pipe(gulp.dest("dist/"))
    .pipe(connect.reload())
})

// 3.复制图片
gulp.task("img",function(){
    return gulp.src("img/**")
    .pipe(gulp.dest("dist/img"))
    .pipe(connect.reload())
})

// 4.复制js文件
gulp.task("scripts",function(){
    return gulp.src(["*js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload())
})

// 5.处理json数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json","!package-lock.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload())
})

// 6.处理css样式
const sass = require("gulp-sass")
const minifycss = require("gulp-minify-css")
const rename = require("gulp-rename")
sass.compiler = require("node-sass")

gulp.task("sassIndex",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sassCommon",function(){
    return gulp.src("stylesheet/common.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("common.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sassLogin",function(){
    return gulp.src("stylesheet/login.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("login.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sassRegister",function(){
    return gulp.src("stylesheet/register.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sassGoods",function(){
    return gulp.src("stylesheet/goods.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("goods.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("sassGoodsCar",function(){
    return gulp.src("stylesheet/goodscar.scss")
    .pipe(sass().on("error",sass.logError))
    .pipe(gulp.dest("dist/css"))
    .pipe(minifycss())
    .pipe(rename("goodscar.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})
// 7.同时完成所有文件处理
gulp.task("build", ["copy-html", "icon","img", "scripts", "data", "sassIndex", "sassCommon","sassLogin","sassRegister","sassGoods","sassGoodsCar"]);

// 8.编写监听
gulp.task("watch",function(){
    gulp.watch("font_o8y1qronwh/**",["icon"])
    gulp.watch("*.html",["copy-html"])
    gulp.watch("img/**",["img"])
    gulp.watch(["*js","!gulpfile.js"],["scripts"])
    gulp.watch(["*.json","!package.json","!package-lock.json"],["data"])
    gulp.watch("stylesheet/index.scss",["sassIndex"])
    gulp.watch("stylesheet/common.scss",["sassCommon"])
    gulp.watch("stylesheet/login.scss",["sassLogin"])
    gulp.watch("stylesheet/register.scss",["sassRegister"])
    gulp.watch("stylesheet/goods.scss",["sassGoods"])
    gulp.watch("stylesheet/goodscar.scss",["sassGoodsCar"])
})

// 9.搭建服务器
const connect = require("gulp-connect");
gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})

// 10.同时启动服务器和监听
gulp.task("default",["watch","server"]);