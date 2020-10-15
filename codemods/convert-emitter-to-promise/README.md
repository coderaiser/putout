# @putout/plugin-convert-emitter-to-promise [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=codemods/convert-emitter-to-promise
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=codemods/convert-emitter-to-promise

Avoid mixing callbacks with promises (https://github.com/substack/tape/pull/503).

## Install

```
npm i putout -g
git clone https://github.com/coderaiser/putout
mkdir ~/.putout
ln -s ~/putout/codemods/convert-emitter-to-promise ~/.putout/convert-emitter-to-promise
```

## ❌ Incorrect code example

```js
test('copymitter', (t) => {
    const cp = copymitter(from, to, ['1']);
    
    cp.on('end', (t) => {
        t.end();
    });
});
```

## ✅ Correct code Example

```js
const {once} = require('events');
test('copymitter', async (t) => {
    const cp = copymitter(from, to, ['1']);
    
    await once(cp, 'end');
    t.end();
});
```

## License

MIT

