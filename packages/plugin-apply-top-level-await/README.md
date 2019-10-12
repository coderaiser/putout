# putout-plugin-apply-top-level-await [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-apply-top-level-await.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-top-level-await"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-apply-top-level-await
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-apply-top-level-await

`putout` plugin apply `top-level-await`.

## Install

```
npm i @putout/plugin-apply-top-level-await
```

## Rule

```json
{
    "rules": {
        "apply-top-level-await": true
    }
}
```

## ❌ Incorrect code example

```js
import fs = from 'fs';
(async () => {
    const data = await fs.promises.readFile('hello.txt');
})();
```

## ✅ Correct code Example

```js
import fs = from 'fs';
const data = await fs.promises.readFile('hello.txt');
```

## License

MIT

