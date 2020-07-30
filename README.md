# As One - Starter

This repository contains the ideal configuration to start projects on HTML, CSS, JS, and framework agnostic.

## Quick Start

```
npm i
npm run dev
npm run build
```

## Status

[![npm version](https://img.shields.io/badge/npm-v6.13.4-blue)]()
[![peerDependencies Status](https://img.shields.io/badge/peer%20dependencies-up%20to%20date-brightgreen)]()
[![devDependency Status](https://img.shields.io/badge/dev--dependencies-up%20to%20date-brightgreen)]()

## Explanation

In this accelerated world of web development is important to stay on the shoulders of non-depreciable dependencies. Likewise, it's to keep focused on having core technologies (HTML, CSS, JS, git) and core companies (GitHub, NPM).

That's why the dependencies were chosen carefully to prevent rework.

## Development

```
npm run dev
```

This command will initialize at the same time:

- A server on port 3000: http://localhost:3000;
- A watcher SASS to CSS from folder ./src;
- A watcher TS to JS from the root ./;

## Production

```
npm run build
```

This command will initialize sequentially:

- CSS: Compilation of each SASS to CSS from folder ./src;
- CSS: Compilation of all CSS to one file named ./src/style.min.css from folder ./src;
- CSS: Compilation of the ./src/style.min.css using PostCSS and its plugin Autoprefixer;
- JS: Compilation from TS to JS from the root ./;
- JS: Uglify of each JS aiming minification.

## Details

In any command, there will be no creation of additional folders (like ./dist): all files created will be in the same folder of its references. If it's necessary, understand carefully and update the scripts object in package.json.

## Need something else?

If you have questions or suggestions please open an issue!
