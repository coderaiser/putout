# @putout/operator-sort-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-sort-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-sort-properties "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator simplify ability to create plugins that sorts `properties`.

## Install

```
npm i putout @putout/operator-sort-properties
```

## Rule

### ❌ Example of incorrect code

```json
{
    "rules": {
        "remove-useless": "on",
        "add-missing": "on"
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "add-missing": "on",
        "remove-useless": "on"
    }
}
```

## API

```js
import {operator} from 'putout';

const {sortProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = sortProperties('rules');
```

## License

MIT
