# @putout/operator-rename-properties [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-rename-properties.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-rename-properties "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator add ability to create rules that renames properties.

## Install

```
npm i putout @putout/operator-rename-properties
```

## API

### rename

When you want to rename properties:

```diff
{
    "rules": {
-       "merge-duplicate-imports": "off"
+       "esm/merge-duplicate-imports": "off"
    },
}
```

Use:

```js
import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
]);
```

### remove

When you want to remove properties:

```diff
{
    "rules": {
-       "merge-duplicate-imports": "off"
    },
}
```

Use:

```js
import {operator} from 'putout';

const {renameProperties} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperties([
    ['merge-duplicate-imports', ''],
]);
```

## License

MIT
