# @putout/engine-processor [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/engine-loader.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/engine-loader"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) processor that runs all engines according to supported file types.

```
npm i @putout/engine-processor
```

## Code Example

```js
const {
    getProcessorRunners,
    runProcessors,
} = require('@putout/engine-processor');

const processorRunners = await getProcessorRunners(processors);
const optionalLoader = async (a) => await import(a);

await getProcessorRunners(processors, optionalLoader);

await runProcessors({
    name,
    process,
    options,
    rawSource,
    index,
    length,
    processorRunners, // optional
    load, // when you need to override 'import()'
});

// returns
({
    isProcessed,
    places,
    processedSource,
});
```

## Processor Example

Simplest possible processor example can be written in both
**CommonJS** or **ESM** and look like this:

```js
export const files = ['*.js'];

export const find = (source) => {
    return places;
};

export const fix = (source) => {
    return `modified ${source}`;
};

export const branch = (source) => {
    return [{
        source,
        startLine: 0,
    }];
};

export const merge = (source, list) => {
    return list[0];
};
```

Instead of `find` and `fix` you can export `lint`:

```js
import eslint from '@putout/eslint';

export const files = ['*.js'];

export const lint = async (source, {fix}) => {
    const [code, places] = await eslint(source, {
        fix,
    });
    
    return [code, places];
};
```

## License

MIT

## License

MIT
