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

// Load all plugins using 'gulp-load-plugins'
const $ = plugins();
// Check --production flag
const PRODUCTION = !!(yargs.argv.production);
// Destructure  settings from config.js
const { COMPATIBILITY, PORT, UNCSS_OPTIONS, PATHS, WEBPACKCONFIG } = config;

// Delete the PATHS.dist folder for evey build
gulp.task('clean', (done) => {
    rimraf(PATHS.dist, done);
});
// Copy the contents of PATHS.assets folder
// NOTE: task depends on 'clean' task
gulp.task('copy', ['clean'], () => {
    return gulp.src(PATHS.assets.src)
        .pipe(gulp.dest(PATHS.assets.dest));
});

// Generate the html pages
gulp.task('html', ['copy'], () => {
    return gulp.src(PATHS.html.src)
        .pipe(panini({
            root: 'src/pages/',
            layouts: 'src/layouts/',
            partials: 'src/partials/',
            data: 'src/data/',
            helpers: 'src/helpers/'
        }))
        .pipe(gulp.dest(PATHS.html.dest));
});

// In production, the CSS is compressed
gulp.task('sass', ['copy'], () => {
    return gulp.src(PATHS.sass.src)
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            includePaths: PATHS.sass.resolve
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: COMPATIBILITY
        }))
        // uncomment to run UnCSS in production
        //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
        .pipe($.if(PRODUCTION, $.cleanCss({ compatibility: 'ie9' })))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.sass.dest))
    //.pipe(browser.reload({ stream: true }));
});

gulp.task('script', ['copy'], () => {
    return gulp.src(PATHS.scripts.src)
        .pipe(named())
        .pipe($.sourcemaps.init())
        .pipe(webpackStream(null, webpack3))
        .pipe($.if(PRODUCTION, $.uglify()
            .on('error', e => { console.log(e); })
        ))
        .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
        .pipe(gulp.dest(PATHS.scripts.dest));
});

gulp.task('images', ['copy'], () => {
    return gulp.src(PATHS.images.src)
      .pipe($.if(PRODUCTION, $.imagemin({
        progressive: true
      })))
      .pipe(gulp.dest(PATHS.images.dest));
  });

  gulp.task('server',['build'], (done) => {
    browser.init({
      server: PATHS.dist, 
      port: PORT,
      notify: false
    });
    done();
  });


//pages, sass, javascript, images,
gulp.task('build', ['clean', 'copy', 'images', 'html', 'sass','script']);
gulp.task('default', ['build', 'server'], () => {
    console.log(WEBPACKCONFIG);
    return true;
});