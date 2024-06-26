# @putout/operator-ignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-ignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-ignore "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator simplify ability to create Ignore-plugins.

## Install

```
npm i putout @putout/operator-ignore
```

## API

### `__ignore`

```js
const {operator, ignore} = require('putout');
const {__ignore} = operator;

module.exports = ignore(__ignore, {
    name: '.npmignore',
    field: 'exclude',
    list: [
        '.*',
        'yarn-error.log',
        'coverage',
        '*.config.*',
    ],
});
```

### `__json`

```js
const {operator, ignore} = require('putout');
const {__json} = operator;

module.exports = ignore(__json, {
    name: '.nycrc.json',
    field: 'exclude',
    list: ['*.config.*'],
});
```

## License

MIT
