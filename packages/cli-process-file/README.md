# @putout/cli-process-file [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-process-file.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-process-file "npm"

Process file using 🐊**Putout**, **Samadhi** and **ESLint**.

## Install

```
npm i @putout/cli-process-file
```

## Example

```js
import initProcessFile from '@putout/cli-process-file';

const processFile = initProcessFile({
    fix: true,
});

const {code, places} = await processFile({
    source: `
        const a = b.a
    `,
});

// returns
['const {a} = b;', [{
    rule: 'no-undef (eslint)',
    message: '\'b\' is not defined.',
    position: {
        line: 2,
        column: 13,
    },
}]];
```

## License

MIT
