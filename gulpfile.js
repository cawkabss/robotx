'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const cssMin = require('gulp-cssmin');
const rename = require('gulp-rename');
const htmlMin = require('gulp-minify-html');
const imglMin = require('gulp-imagemin');
const del = require('del');
const watch = require('gulp-watch');
const jsMin = require('gulp-uglify');

const path = {
    build: {
        html: './build/',
        css: './build/css/',
        js: './build/js/',
        img: './build/img/',
        fonts: './build/fonts/'
    },
    src: {
        html: './src/*.html',
        scss: './src/scss/main.scss',
        js: './src/js/**/*.js',
        img: './src/img/*.*',
        fonts: './src/fonts/**/*.*'
    },
    bootstrap: {
        scss: './node_modules/bootstrap-sass/assets/stylesheets/',
        js: './node_modules/bootstrap-sass/assets/javascripts/',
        fonts: './node_modules/bootstrap-sass/assets/fonts/**/*.*'
    },
    fontAwesome: {
        scss: './node_modules/font-awesome/scss/',
        fonts: './node_modules/font-awesome/fonts/*.*'
    },
    rj: {
        js: './node_modules/requirejs/*.js'
    },
    jq: {
        js: './node_modules/jquery/dist/jquery.js'
    }
};
gulp.task('clean', function(){
    return del(['build']);
});

gulp.task('html:dev', ['clean'], function(){
    return gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
});

gulp.task('html:build', ['clean'], function(){
    return gulp.src(path.src.html)
        .pipe(htmlMin())
        .pipe(gulp.dest(path.build.html))
});

gulp.task('sass:dev', ['clean'], function(){
    return gulp.src(path.src.scss)
        .pipe(sass({
            includePaths: [path.bootstrap.scss, path.fontAwesome.scss]
        }).on('error', sass.logError))
        .pipe(rename('style.css'))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('sass:build', ['clean'], function(){
    return gulp.src(path.src.scss)
        .pipe(sass({
            includePaths: [path.bootstrap.scss, path.fontAwesome.scss]
        }))
        .pipe(rename('style.css'))
        .pipe(cssMin())
        .pipe(gulp.dest(path.build.css))
});

gulp.task('img', ['clean'], function(){
    return gulp.src(path.src.img)
        .pipe(imglMin())
        .pipe(gulp.dest(path.build.img))
});

gulp.task('fonts', ['clean'], function(){
    return gulp.src([path.src.fonts, path.fontAwesome.fonts, path.bootstrap.fonts])
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('js:dev', ['clean'], function(){
   return gulp.src(path.src.js)
       .pipe(gulp.dest(path.build.js))
});

gulp.task('js:build', ['clean'], function(){
    return gulp.src(path.src.js)
        .pipe(jsMin())
        .pipe(gulp.dest(path.build.js))
});


gulp.task('dev', ['html:dev', 'sass:dev', 'img', 'fonts', 'js:dev'], function(){
    gulp.watch('./src/**/*.*', function(event){
        gulp.run('dev');
    });
});
gulp.task('build', ['html:build', 'sass:build', 'img', 'fonts', 'js:build']);