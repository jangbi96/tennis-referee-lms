var gulp = require("gulp"),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass")(require("sass")),
    sourcemaps = require("gulp-sourcemaps"),
    ejs = require("gulp-ejs"),
    del = require("del"),
    rename = require("gulp-rename");
    // iconfont = require("gulp-iconfont"),
    // iconfontCss = require("gulp-iconfont-css");


var path = {
    src: {
        //개발
        html: "./src/ejs/*.ejs",
        scss: "./src/scss/**",
        js: "./src/js/**"
    },
    dist: {
        //배포
        html: "./dist/",
        css: "./dist/css/",
        js: "./dist/js/"
    }
};

gulp.task("gulp_html", function () {
    return gulp
        .src(path.src.html)
        .pipe(ejs({ title: "gulp-ejs" }))
        .pipe(rename({ extname: ".html" }))
        .pipe(gulp.dest(path.dist.html));
});

gulp.task("scripts", function () {
    return (
        gulp
            .src(path.src.js)
            // .pipe(sourcemaps.init())
            // .pipe(
            //     babel({
            //         presets: ["@babel/preset-env"]
            //     })
            // )
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest(path.dist.js))
    );
});

gulp.task("gulp_sass", function () {
    return gulp
        .src(path.src.scss)
        .pipe(sourcemaps.init())
        .pipe(sass({ sourceComments: true }).on("error", sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css));
});

// gulp.task("copyAssets", function () {
//     return gulp.src(["./src/assets/images/**", "./src/assets/fonts/**"]).pipe(
//         gulp.dest(function (file) {
//             var dest = file.base.replace("src", "dist");
//             return dest;
//         })
//     );
// });
gulp.task("copyAssets", function () {
    return gulp.src("./src/assets/**").pipe(gulp.dest("./dist/assets/"));
});
// gulp.task("iconfont", function () {
//     gulp.src(["./src/assets/icons/*.svg"])
//         .pipe(iconfontCss({ fontName: "iconfont", targetPath: "iconfont.css" }))
//         .pipe(iconfont({ fontName: "iconfont" }))
//         .on("glyphs", function (glyphs, options) {
//             console.log(glyphs, options);
//         })
//         .pipe(gulp.dest("./dist/assets/iconfont/"));
// });
// 파일 변경 감지
gulp.task("watch", function () {
    gulp.watch(path.src.html, gulp.series("gulp_html")).on("change", browserSync.reload);
    gulp.watch(path.src.scss, gulp.series("gulp_sass")).on("change", browserSync.reload);
    gulp.watch(path.src.js, gulp.series("scripts")).on("change", browserSync.reload);
    gulp.watch("./src/assets/", gulp.series("copyAssets")).on("change", browserSync.reload);
    gulp.watch("./src/includes/", gulp.series("gulp_html")).on("change", browserSync.reload);
});

gulp.task("browserSync", function () {
    return browserSync.init({
        port: 3003,
        server: { baseDir: "./dist" }
    });
});

// gulp.src("./src/assets/**/*").pipe(gulp.dest("./dist/assets"))

gulp.task("clean", function () {
    return del(["dist/**", "!dist"]);
});

gulp.task(
    "default",
    gulp.parallel("watch", "browserSync", "gulp_html", "gulp_sass", "scripts", "copyAssets")
);
