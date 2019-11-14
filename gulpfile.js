'use strict'

/**************** Global Imports ****************/

const { series, parallel, watch, src, dest } = require('gulp')
const browserSync = require('browser-sync').create()
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const cssnano = require('cssnano')
const del = require('del')
const htmlmin = require('gulp-htmlmin')
const imagemin = require('gulp-imagemin')
const imageminGuetzli = require('imagemin-guetzli')
const imageminPngquant = require('imagemin-pngquant')
const postcss = require('gulp-postcss')
const rename = require('gulp-rename')
const sass = require('gulp-sass')
const sitemap = require('gulp-sitemap')
const uglify = require('gulp-uglify')

/**************** Functions ****************/

// Watch SCSS files -> sourcemap, autroprefixer, minify with cssnano, rename .css to .min.css
const scss = () => {
  return src('src/styles/main.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
        remove: true
      })
    )
    .pipe(
      postcss([
        cssnano({
          discardComments: {
            removeAll: true
          }
        })
      ])
    )
    .pipe(
      rename(function(path) {
        if (path.extname === '.css') {
          path.basename = 'styles'
          path.basename += '.min'
        }
      })
    )
    .pipe(dest('src/assets/', { sourcemaps: true }))
    .pipe(browserSync.stream())
}

// Watch JS files -> sourcemap, minifiy with uglify, concat
const js = () => {
  return src('src/js/**/*.js', { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(
      rename(function(path) {
        if (path.extname === '.js') {
          path.basename += '.min'
        }
      })
    )
    .pipe(dest('src/assets/', { sourcemaps: true }))
    .pipe(browserSync.stream())
}

// Concat Minified JS libraries
const jsLibs = () => {
  const libPaths = [
    // ADD YOUR JS LIBRARIES HERE
  ]

  return src(libPaths)
    .pipe(concat('libs.js'))
    .pipe(
      rename(function(path) {
        if (path.extname === '.js') {
          path.basename += '.min'
        }
      })
    )
    .pipe(dest('src/assets/'))
}

// Delete all files in the dist folder
const clean = () => {
  del.sync(['dist/**/*'])
  return Promise.resolve()
}

// Minify HTML files
const minifyHtml = () => {
  return src('src/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true
      })
    )
    .pipe(dest('dist/'))
}

// Create sitemap.xml
const generateSitemap = () => {
  return src('src/**/*.html', {
    read: false
  })
    .pipe(
      sitemap({
        siteUrl: 'https://www.INSERT_YOUR_WEBSITE_ADDRESS_HERE.com.br'
      })
    )
    .pipe(dest('dist'))
}

// Optimize Images - GIF, SVG and ICO
const optimizeGif = () => {
  return src('src/**/*.{gif,svg,ico}')
    .pipe(
      imagemin([
        imagemin.gifsicle({
          interlaced: true,
          optimizationLevel: 3
        })
      ])
    )
    .pipe(dest('dist/'))
}

// Optimize Images - PNG
const optimizePng = () => {
  return src('src/**/*.png')
    .pipe(imagemin([imageminPngquant()]))
    .pipe(dest('dist/'))
}

// Optimize Images - JPG ang JPEG
const optimizeJpg = () => {
  return src('src/**/*.{jpg,jpeg}')
    .pipe(imagemin([imageminGuetzli()]))
    .pipe(dest('dist/'))
}

// Copy remaining files to dist
const copy = () => {
  return src([
    'src/**/*.{xml,txt,eot,ttf,woff,woff2,otf,ttf,php,css,js,json,map}',
    '!src/js/**/*',
    '!src/styles/**/*'
  ]).pipe(dest('dist/'))
}

// Watch
const watchFiles = () => {
  watch('src/**/*.html').on('change', browserSync.reload)
  watch('src/styles/**/*.scss', scss)
  watch('src/js/**/*.js', js)
  watch('node_modules/**/*', jsLibs)
}

// Serve
const serve = () => {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  })

  watchFiles()
}

/**************** Gulp Tasks ****************/

// Start Dev Environment
exports.start = serve

// Build Production files
exports.default = series(
  clean,
  parallel(
    minifyHtml,
    scss,
    js,
    // jsLibs,
    generateSitemap,
    optimizeGif,
    optimizePng,
    optimizeJpg,
    copy
  )
)
