# @putout/operator-sort-ignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-sort-ignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-sort-ignore "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator simplify ability to create plugins that sorts `ignore`.

## Install

```
npm i putout @putout/operator-sort-ignore
```

## Rule

### ❌ Example of incorrect code

```ignore
node_modules
*.swp
yarn-error.log
yarn.lock
.idea
.DS_Store
deno.lock

coverage
.filesystem.json
```

### ✅ Example of correct code

```ignore
.idea
.filesystem.json
.DS_Store

*.swp

yarn-error.log
yarn.lock
deno.lock

node_modules
coverage
```

## API

### `sortIgnore`

```js
import {operator} from 'putout';

const {sortIgnore} = operator;

export const {
    report,
    fix,
    traverse,
} = sortIgnore({
    name: '.gitignore',
});
```

### `type`

```js
import {operator} from 'putout';

const {__json, sortIgnore} = operator;

export const {
    report,
    fix,
    traverse,
} = sortIgnore({
    type: __json,
    name: '.nycrc.json',
    field: 'exclude',
});
```

## License

MIT
