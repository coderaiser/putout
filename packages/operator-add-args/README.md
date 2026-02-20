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

export const {
    report,
    fix,
    traverse,
} = addArgs({
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

For couple args it will look this way:

```
export const {
    report,
    fix,
    traverse,
} = addArgs({
    path: ['vars, path', [
        '(__a) => __body',
        '() => __body',
    ]],
});
```

It will set `vars` if absent, or keep used name.
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

### Exclude

If you want exclude `index.spec.js`:

```diff
test('', (path, printer, semantics, {printComment} => {
    comparePlaces();
});
```

You can use `exclude` list:

```json
{
    "rules": {
        "tape/add-args": ["on", {
            "args": {
                "comparePlaces": ["{comparePlaces}", {
                    "include": "test('__a', (__args) => __body)",
                    "exclude": [
                        "(__a, __b, __c, __object) => __object"
                    ]
                }]
            }
        }]
    }
}
```

## License

MIT
