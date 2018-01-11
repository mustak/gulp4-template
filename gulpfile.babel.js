'use strict';

import gulp from 'gulp';
import plugins from 'gulp-load-plugins';
import yargs from 'yargs';
import rimraf from 'rimraf';
import config from './config';
import panini from 'panini';
import webpackStream from 'webpack-stream';
import webpack3 from 'webpack';
import named from 'vinyl-named';
import browser from 'browser-sync';

const $ = plugins();
const PRODUCTION = !!(yargs.argv.production);
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, WEBPACKCONFIG } = config;

// Setup Tasks
function clean(done) {
    rimraf(PATHS.dist, done);
}
function copy() {
    return gulp.src(PATHS.assets.src)
        .pipe(gulp.dest(PATHS.assets.dest));
}

// Main Tasks
function html() {
    return gulp.src(PATHS.html.src)
        .pipe(panini(PATHS.html.paniniInit))
        .pipe(gulp.dest(PATHS.html.dest));
}

function sass() {
    return gulp.src(PATHS.sass.src)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass.resolve
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))
        //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
        .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.sass.dest))
}

function script() {
    return gulp.src(PATHS.scripts.src)
        .pipe(named())
        .pipe(webpackStream(null, webpack3))
        .pipe($.sourcemaps.init())
        .pipe($.if(PRODUCTION, $.uglify()
            .on('error', e => { console.log(e); })
        ))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.scripts.dest));
}

function images() {
    return gulp.src(PATHS.images.src)
        .pipe($.if(PRODUCTION, $.imagemin({
            progressive: true
        })))
        .pipe(gulp.dest(PATHS.images.dest));
}

// Dev Tasks
function server(done) {
    browser.init({
        server: PATHS.dist,
        port: PORT,
        notify: false
    });
    done();
}
function reload(done) {
    browser.reload();
    done();
}
function reloadPanini(done) {
    panini.refresh();
    html();
    done();
  }
function watchTasks() {
    wTask(PATHS.assets.src, copy);
    wTask(PATHS.images.src, images);
    wTask(PATHS.sass.watch, sass);
    wTask(PATHS.scripts.watch, script);
    wTask(PATHS.html.src, html);
    wTask(PATHS.html.watch, reloadPanini)
}
function wTask(path, tsk){
    gulp.watch(path).on('all', gulp.series(tsk, reload));
}

gulp.task('build',
    gulp.series(clean, gulp.parallel(html, sass, script, images, copy)));

gulp.task('default', gulp.series('build', server, watchTasks));