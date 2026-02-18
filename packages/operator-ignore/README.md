# @putout/operator-ignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-ignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-ignore "npm"

> A `.gitignore` file specifies intentionally untracked files that Git should ignore.
>
> (c) [git-scm.com](https://git-scm.com/docs/gitignore)

🐊[**Putout**](https://github.com/coderaiser/putout) operator simplifies creating `ignore`-plugins.

## Install

```
npm i putout @putout/operator-ignore
```

## API

### `ignore`

```js
import {operator} from 'putout';

const {ignore} = operator;

export const {
    report,
    fix,
    traverse,
} = ignore({
    name: '.npmignore',
    list: [
        '.*',
        'yarn-error.log',
        'coverage',
        '*.config.*',
    ],
});
```

### `type`

```js
import {operator} from 'putout';

const {__json, ignore} = operator;

export const {
    report,
    fix,
    traverse,
} = ignore({
    type: __json,
    name: '.nycrc.json',
    field: 'exclude',
    list: ['*.config.*'],
});
```

If file and passed in list mask overlaps, only mask saved, and list name removed:

```
-yarn-error.log
+*.log
```

## License

MIT
