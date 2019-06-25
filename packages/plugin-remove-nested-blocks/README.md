# putout-plugin-remove-nested-blocks [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-nested-blocks.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-nested-blocks"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-nested-blocks
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-nested-blocks

`putout` plugin adds ability to find and remove `empty pattern statements`.

## Install

```
npm i @putout/plugin-remove-nested-blocks
```

## Rule

Rule `remove-nested-blocks` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "remove-nested-blocks": false
    }
}
```

## ❌ Incorrect code example

```js
for (const x of Object.keys(a)) {
    {
        console.log(x);
        console.log(xxx);
    }
}
```

## ✅ Correct code Example

```js
for (const x of Object.keys(a)) {
    console.log(x);
    console.log(xxx);
}

switch (x) {
  case 1: {
    let m = 5;
  }
}
```

## License

MIT

