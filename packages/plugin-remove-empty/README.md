# @putout/plugin-remove-empty [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-empty"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove:

- `empty block statements`;
- `empty patterns`;
- `empty imports`;
- `empty arguments`;

## Install

```
npm i @putout/plugin-remove-empty
```

## Rules

```json
{
    "rules": {
        "remove-empty/block": "on",
        "remove-empty/pattern": "on",
        "remove-empty/argument": "on",
        "remove-empty/import": ["on", {
            "ignore": []
        }]
    }
}
```

## ❌ Incorrect code example

```js
import 'hello';
import world from 'world';

if (2 > 3) {}

if (a > 3) {
    world();
}
```

## ✅ Correct code Example

```js
import world from 'world';

if (a > 3) {
    world();
}
```

## License

MIT
