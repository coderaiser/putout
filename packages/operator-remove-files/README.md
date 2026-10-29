# @putout/operator-remove-files [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-remove-files.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-remove-files "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to create plugins that removes files.

## Install

```
npm i putout @putout/operator-remove-files
```

## API

```js
import {operator} from 'putout';

const {removeFiles} = operator;

export const {
    report,
    fix,
    scan,
} = removeFiles(['.DS_Store']);
```

### `dismiss`

Any rule that uses this operator can pass `dismiss` to avoid removing files:

```json
{
    "rules": {
        "putout/remove-files": ["on", {
            "dismiss": [".DS_Store"]
        }]
    }
}
```

## License

MIT
