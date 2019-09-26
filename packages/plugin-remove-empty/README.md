# putout-plugin-remove-empty [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-empty.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-empty"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-empty
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-empty

`putout` plugin adds ability to find and remove:
- `empty block statements`;
- `empty patterns`;
- `empty imports`;

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
        "remove-empty/import": ["on", {
            "ignore": []
        }]
    }
}
```

## ❌ Incorrect code example

```js
import "hello";

if (2 > 3) {}
```

## ✅ Correct code Example

```js
import hello from "hello";

if (2 > 3) {
    hello();
}
```

## License

MIT

