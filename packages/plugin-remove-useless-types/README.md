# @putout/plugin-remove-useless-types [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-useless-types.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-useless-types "npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-types
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-types

`putout` plugin adds ability to find and remove `useless types`.

## Install

```
npm i @putout/plugin-remove-useless-types -D
```

## Rule

```json
{
    "rules": {
        "remove-useless-types": "on"
    }
}
```

## ❌ Incorrect code example

```js
type oldType = {
    a: number,
    b: string,
};

type newType = oldType;

const x:newType = 5;
```

## ✅ Correct code Example

```js
type oldType = {
    a: number,
    b: string,
};

const x:oldType = 5;
```

## License

MIT

