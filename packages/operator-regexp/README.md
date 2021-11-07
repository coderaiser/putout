# @putout/operator-regexp [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-regexp.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-regexp "npm"

`putout` operator adds ability to determine is provided [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp) can be
converted to [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) without loosing it's sense.

It is used for example in [regexp/convert-replace-to-relace-all](https://github.com/coderaiser/putout/tree/master/packages/plugin-regexp#regexpconvert-replace-to-replace-all):

```diff
-'hello'.replace(/hello/g, 'world');
+'hello'.replaceAll('hello', 'world');
```

## Install

```
npm i putout @putout/operator-regexp
```

## API

### isSimpleRegexp(regexp: RegExp)

```js
const {operator} = require('putout');
const {isSimpleRegExp} = operator;

isSimpleRegExp(/hello world/);
// returns
true;

isSimpleRegExp(/^hello/);
// returns
false;
```

## License

MIT
