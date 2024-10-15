
import pkg from 'gulp'
const { gulp, src, dest, parallel, series, watch: gulpWatch } = pkg

import browserSync from 'browser-sync'
import bssi from 'browsersync-ssi'
import pug from 'gulp-pug'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import named from 'vinyl-named'
import TerserPlugin from 'terser-webpack-plugin'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import sassglob from 'gulp-sass-glob'
const sass = gulpSass(dartSass)
import postCss from 'gulp-postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import del from 'del'
import formatHTML from 'gulp-format-html'
import webp from 'gulp-webp';
const pathCurrent = process.cwd();


function browsersync() {
  browserSync.init({
    server: {
      baseDir: './dist/',
      middleware: bssi({ baseDir: './dist/', ext: '.html' })
    },
    notify: false,
    online: true,
    ghostMode: false,
  })
}

function buildPug() {
  return src(['app/**/*.pug'])
    .pipe(pug({
      pretty: true
    }))
    .pipe(formatHTML({
      indent_size: 4,
      indent_with_tabs: true,
    }))
    .pipe(dest('./dist/'))
    .pipe(browserSync.stream())
}

function styles() {
  return src(['app/scss/**/style.scss'])
    .pipe(sassglob())
    .pipe(sass({
      'include css': true,
      outputStyle: 'expanded'
    }))
    .pipe(postCss([
      autoprefixer({
        grid: 'autoplace',
        overrideBrowserslist: ['last 3 versions'],
        cascade: false
      }),
    ]))
    .pipe(dest('./dist/css/'))
    .pipe(postCss([
      cssnano({ preset: ['default', { discardComments: { removeAll: true } }] })
    ]))
    .pipe(concat('style.min.css'))
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src(['app/js/*.js'])
    .pipe(named())
    .pipe(dest('./dist/js/'))
    .pipe(browserSync.stream())
}

function images() {
  return src(['app/img/**/*'])
    .pipe(changed('./dist/img/'))
    .pipe(imagemin([
      gifsicle({ interlaced: true }),
      mozjpeg({
        progressive: true,
        quality: 80
      }),
      optipng(),
      svgo({
        plugins: [
          {
            name: 'removeViewBox',
            active: true
          },
          {
            name: 'cleanupIDs',
            active: false
          }
        ]
      })
    ], {
      verbose: true
    }))
    .pipe(dest('./dist/img/'))
    .pipe(webp())
    .pipe(dest('./dist/img/webp'))
    .pipe(browserSync.stream())
}

function fonts() {
  return src(['app/fonts/**/*'])
    .pipe(dest('./dist/css/fonts/'))
    .pipe(browserSync.stream())
}

async function cleandist() {
  del('./dist/**/*', { force: true })
}

function startwatch() {
  gulpWatch(['./app/**/*.pug'], { usePolling: true }, buildPug)
  gulpWatch(['./app/scss/**/*.scss'], { usePolling: true }, styles)
  gulpWatch(['./app/js/**/*.js'], { usePolling: true }, scripts)
  gulpWatch(['./app/img/**/*'], { usePolling: true }, images)
  gulpWatch(['./app/fonts/**/*'], { usePolling: true }, fonts)
  gulpWatch(['./dist/**/*.*'], { usePolling: true }).on('change', browserSync.reload)
}

const build = series(cleandist, parallel(images, scripts, buildPug, styles, fonts))
const watch = series(parallel(images, scripts, buildPug, styles, fonts), parallel(browsersync, startwatch))


export { build, watch }
export default watch;