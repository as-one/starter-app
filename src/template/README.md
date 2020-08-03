# Starter App - Template

## Development

```
npm run dev
```

This command will initialize at the same time:

- A server on port 3000: http://localhost:3000;
- A watcher SASS to CSS from ./src;
- A watcher TS to JS from ./src;

## Production

```
npm run build
```

This command will initialize sequentially:

- HTML: Conversion from .css to .min.css;
- HTML: Minification of index.html to ./dist;
- CSS: Compilation of all SASS in ./src to to one minified CSS file ./dist/style.min.css;
- CSS: Parsing of minified CSS using PostCSS's Autoprefixer;
- JS: Compilation from TS to JS in ./src;
- JS: Parsing using Babel in ./src;
- JS: Uglify of each JS aiming minification which will be sent to ./dist.

For more informations please access https://github.com/as-one/starter-app.
