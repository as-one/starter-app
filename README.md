<br>
<br>

<p align="center">
  <a href="https://github.com/as-one/starter-app">
    <img src="https://raw.githubusercontent.com/as-one/starter-app/master/starter.png" alt="As One - Starter App" width="330" height="128">
  </a>
</p>

<br>
<br>

<p align="center">
  The ideal boilerplate to start MPA projects with HTML, CSS/SCSS, Vanilla JS, and TypeScript.
  <br>
  <br>
  <a href="https://github.com/as-one/starter-app/issues/new">Report bug</a>
  ·
  <a href="https://github.com/as-one/starter-app/issues/new">Request feature</a>
</p>

## Quick Start

```
npm i -g as-one/starter-app
create-starter-app
```

## Status

[![npm version](https://img.shields.io/badge/npm-v6.13.4-blue)]()
[![peerDependencies Status](https://img.shields.io/badge/peer%20dependencies-up%20to%20date-brightgreen)]()
[![devDependency Status](https://img.shields.io/badge/dev--dependencies-up%20to%20date-brightgreen)]()

## Overview

In this accelerated world of web development is key to stay on the shoulders of non-depreciable dependencies. Likewise, it's important keeping close to core technologies (like HTML, CSS, JS, git) and companies (as GitHub, NPM).

## Development

```
npm run dev
```

This command will initialize at the same time:

- A server on port 3000: http://localhost:3000;
- A watcher SASS to CSS from ./src;
- A watcher TS to JS from ./src;

Options:

- --input or -i: Defines the input folder starting from the --root. Default: src;
- --output or -o: Defines the output folder starting from the --root. Default: dist;
- --root or -r: Defines the root folder to run the server. Default: /;

Examples:

```
npm run dev --i newSrc --o newDist -r src
npm run dev --input newSrc --output newDist --root src
```

## Production

```
npm run build
```

This command will initialize sequentially:

- HTML: Conversion from .css to .min.css;
- HTML: Minification from ./src to ./dist;
- CSS: Compilation of all SASS in ./src to one minified CSS file ./dist/style.min.css;
- CSS: Parsing of minified CSS using PostCSS's Autoprefixer;
- JS: Compilation from TS to JS in ./src;
- JS: Parsing using Babel in ./src;
- JS: Uglify of each JS aiming minification which will be sent to ./dist.

Options:

- --input or -i: Defines the input folder. Default: src;
- --output or -o: Defines the output folder. Default: dist;

Examples:

```
npm run build --i newSrc --o newDist
npm run build --input newSrc --output newDist
```

## Details

- All CSS, SASS, JavaScript, and TypeScript files should be in ./src;
- The build process outputs all files in the ./dist;
- The build process bundles CSS files into one named style.min.css;
- The build process outputs JS files separately;
- If something different is necessary, read carefully and update the scripts object in the package.json file.

## Need something else?

If you have questions or suggestions please open an issue.
