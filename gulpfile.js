/**************** Global Imports ****************/

const { series, parallel, watch, src, dest } = require('gulp')
const browserSync = require('browser-sync').create()
const autoprefixer = require('autoprefixer')
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
const eslint = require('gulp-eslint')
const pjson = require('./package.json')

/**************** Functions ****************/

// Check Node Env
const isDev = process.env.NODE_ENV === 'development' ? true : false

/**
 * Paths to project folders
 */

const paths = {
  input: 'src/',
  output: 'dist/',
  assets: 'src/assets',
  website: pjson.homepage
}

// Watch SCSS files -> sourcemap, autroprefixer, minify with cssnano, rename .css to .min.css
const cssPlugins = [autoprefixer(), cssnano()]
const scss = () => {
  return src('src/scss/main.scss', { sourcemaps: isDev })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(cssPlugins))
    .pipe(
      rename(function(path) {
        if (path.extname === '.css') {
          path.basename = 'styles'
          path.basename += '.min'
        }
      })
    )
    .pipe(dest(paths.output, { sourcemaps: isDev }))
    .pipe(browserSync.stream())
}

// Watch JS files -> sourcemap, minifiy with uglify, concat
const js = () => {
  return src('src/js/**/*.js', { sourcemaps: isDev })
    .pipe(eslint())
    .pipe(concat('scripts.js'))
    .pipe(
      rename(function(path) {
        if (path.extname === '.js') {
          path.basename += '.min'
        }
      })
    )
    .pipe(dest(paths.output, { sourcemaps: isDev }))
    .pipe(browserSync.stream())
}

// Concat Minified JS libraries
const jsLibs = () => {
  const libPaths = []

  return src(libPaths)
    .pipe(concat('libs.js'))
    .pipe(
      rename(function(path) {
        if (path.extname === '.js') {
          path.basename += '.min'
        }
      })
    )
    .pipe(dest(paths.output))
}

// Delete all files in the dist folder
const clean = () => {
  del.sync([`${paths.output}/**/*`, `${paths.assets}/**/*`])
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
    .pipe(dest(paths.output))
}

// Create sitemap.xml
const generateSitemap = () => {
  return src('src/**/*.html', {
    read: false
  })
    .pipe(
      sitemap({
        siteUrl: paths.website
      })
    )
    .pipe(dest(paths.output))
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
    .pipe(dest(paths.output))
}

// Optimize Images - PNG
const optimizePng = () => {
  return src('src/**/*.png')
    .pipe(imagemin([imageminPngquant()]))
    .pipe(dest(paths.output))
}

// Optimize Images - JPG ang JPEG
const optimizeJpg = () => {
  return src('src/**/*.{jpg,jpeg}')
    .pipe(imagemin([imageminGuetzli()]))
    .pipe(dest(paths.output))
}

// Copy remaining files to dist
const copy = () => {
  return src([
    'src/**/*.{xml,txt,eot,ttf,woff,woff2,otf,ttf,php,css,js,json,map}',
    '!src/js/**/*',
    '!src/scss/**/*'
  ]).pipe(dest(paths.output))
}

// Watch
const watchFiles = () => {
  watch('src/**/*.html').on('change', browserSync.reload)
  watch('src/images/**/*').on('change', browserSync.reload)
  watch('src/scss/**/*.scss', scss)
  watch('src/js/**/*.js', js)
  watch('node_modules/**/*', jsLibs)
}

// Serve
const startServer = () => {
  browserSync.init({
    server: {
      baseDir: './src/'
    }
  })

  watchFiles()
}

/**************** Gulp Tasks ****************/

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
    optimizeJpg
  ),
  copy
)

// Start Dev Environment
exports.watch = series(exports.default, startServer)
