# @putout/plugin-remove-skip [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-skip.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-skip"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-skip
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-skip

`putout` plugin adds ability to find and remove `test.skip` calls.

## Install

```
npm i @putout/plugin-remove-skip -D
```

## Rule

Rule `remove-skip` enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-skip": "off"
    }
}
```

## ❌ Incorrect code example

```js
test.skip('some', (t) => {
    t.end();
});
```

## ✅ Correct code Example

```js
test('some', (t) => {
    t.end();
});
```

## License

MIT
