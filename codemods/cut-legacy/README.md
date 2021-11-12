# @putout/plugin-cut-legacy

Cut suffix `/legacy` from an argument of require calls.

## Install

```
npm i putout -g
git clone https://github.com/coderaiser/putout
mkdir ~/.putout
ln -s ~/putout/codemods/convert-tape-to-supertape ~/.putout/convert-tape-to-supertape
```

## ❌ Incorrect code example

```js
const fullstore = require('fullstore/legacy');
```

## ✅ Correct code Example

```js
const fullstore = require('fullstore');
```

## License

MIT
