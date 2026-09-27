# @putout/operator-css [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-css.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-css "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint css.

## Install

```
npm i putout @putout/operator-css
```

## API

### `convertJsToCss`

```js
import {operator} from 'putout';

const {convertJsToCss} = operator;

convertJsToCss(`
    [
        rule(selector([
            typeSelector('button'),
        ]), [
            declaration('color', string('red')),
        ]),
    ];
`);
```

### `convertCssToJs`

```js
import {operator} from 'putout';

const {convertCssToJs} = operator;

convertCssToJs(`
    button {
        color: "red";
    }
`);
```

## License

MIT
