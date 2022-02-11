# @putout/plugin-cut-legacy

Cut suffix `/legacy` from an argument of require calls.

## Install

```
npm i putout -g
git clone https://github.com/coderaiser/putout
mkdir ~/.putout
ln -s ~/putout/codemods/convert-tape-to-supertape ~/.putout/convert-tape-to-supertape
```

## ❌ Example of incorrect code

```js
const fullstore = require('fullstore/legacy');
```

## ✅ Example of correct code

```js
const fullstore = require('fullstore');
```

## License

MIT
