# @putout/operator-add-args [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-add-args.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-add-args "npm"

🐊**Putout** operator adds ability to add argument that was not defined before.

## Install

```
npm i putout @putout/operator-add-args
```

## API

If you want to create 🐊**Putout** `plugin` that will add `args` according to your needs just:

```js
const {operator} = require('putout');
const {addArgs} = operator;

module.exports = addArgs({
    comparePlaces: ['{comparePlaces}', 'test("__a", (__args) => __body)'],
    t: ['{comparePlaces}', [
        'test("__a", (__args) => __body)',
        'test.only("__a", (__args) => __body)',
    ]],
    maybe: ['{maybe}', [
        'module.exports.__a = (__args) => __body',
    ]],
});
```

If you have a file `index.spec.js`:

```diff
-test('', () => {
+test('', ({comparePlaces}) => {
    comparePlaces();
});
```

Plugin supports options, so you can pass it in `.putout.json`:

```json
{
    "rules": {
        "tape/add-args": ["on", {
            "args": {
                "comparePlaces": ["{comparePlaces}", "test('__a', (__args) => __body)"]
            }
        }]
    }
}
```

## License

MIT
