# 📦 Gulp Boilerplate

Minimal Gulp 4 boilerplate with Babel, Sass, ESLint, Live Reload, and development/production optimization.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Installation

```
git clone git@github.com:renansigolo/gulp-boilerplate.git
npm i
```

## Usage

### Development server

```bash
npm start
```

### Production build

```bash
npm run build
```

## Features

- [Gulp](https://gulpjs.com/)
- [Babel](https://babeljs.io/)
- [Prettier](https://prettier.io/)
- [Sass](https://sass-lang.com/)
- [PostCSS](https://postcss.org/)
- [ESLint](https://eslint.org/)
- [Normalize.css](https://necolas.github.io/normalize.css/)

## Dependencies

### Gulp

- [`gulp`](https://github.com/gulpjs/gulp) - The streaming build system.

### Babel

- [`@babel/core`](https://www.npmjs.com/package/@babel/core) - Transpile ES6+ to backwards compatible JavaScript.
- [`@babel/preset-env`](https://babeljs.io/docs/en/babel-preset-env) - Smart defaults for Babel.

### Plugins

- [`browser-sync`](https://github.com/Browsersync/browser-sync) - Keep multiple browsers & devices in sync when building websites.
- [`cssnano`](https://github.com/cssnano/cssnano) - A modular minifier, built on top of the PostCSS ecosystem.
- [`del`](https://github.com/sindresorhus/del) - Delete files and directories
- [`gulp-autoprefixer`](https://github.com/sindresorhus/gulp-autoprefixer) - Prefix CSS
- [`gulp-babel`](https://github.com/babel/gulp-babel) - Gulp plugin for Babel
- [`gulp-concat`](https://github.com/gulp-community/gulp-concat) - Streaming concat middleware for gulp
- [`gulp-eslint`](https://github.com/babel/babel-eslint) - A Gulp plugin for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- [`gulp-htmlmin`](https://github.com/jonschlinkert/gulp-htmlmin) - Minify HTML
- [`gulp-imagemin`](https://github.com/sindresorhus/gulp-imagemin) - Minify PNG, JPEG, GIF and SVG images
  - [`imagemin-guetzli`](https://github.com/imagemin/imagemin-guetzli) - Imagemin plugin for guetzli
  - [`imagemin-pngquant`](https://github.com/imagemin/imagemin-pngquant) - Imagemin plugin for pngquant
- [`gulp-postcss`](https://github.com/postcss/gulp-postcss) - Pipe CSS through PostCSS processors with a single parse
- [`gulp-rename`](https://github.com/hparra/gulp-rename) - Rename files easily
- [`gulp-sass`](https://github.com/dlmanning/gulp-sass) - SASS plugin for gulp
- [`gulp-sitemap`](https://github.com/pgilad/gulp-sitemap) - Generate a search engine friendly sitemap.xml using a Gulp stream
- [`gulp-sourcemaps`](https://github.com/gulp-sourcemaps/gulp-sourcemaps) - Sourcemap support for gulpjs.
- [`gulp-uglify`](https://github.com/terinjokes/gulp-uglify) - Minify files with UglifyJS

## Bonus

Generate your `site.manifest` file at [Web App Manifest Generator](https://app-manifest.firebaseapp.com/)
Generate your `favicons` at [RealFaviconGenerator](https://realfavicongenerator.net/)

## Author

- [Renan Sigolo](https://www.renansigolo.com/)

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgement

- A huge thanks to [Tania Rascia](https://www.taniarascia.com) 👍🏻
