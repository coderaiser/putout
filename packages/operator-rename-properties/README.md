# @putout/operator-rename-property [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-rename-property.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-rename-property "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator add ability to create rules that renames properties.

## Install

```
npm i putout @putout/operator-rename-property
```

## API

### rename

When you want to rename property:

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

const {renameProperty} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperty([
    ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
]);
```

### remove

When you whant to remove property:

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

const {renameProperty} = operator;

export const {
    report,
    fix,
    traverse,
} = renameProperty([
    ['merge-duplicate-imports', ''],
]);
```

## License

MIT
