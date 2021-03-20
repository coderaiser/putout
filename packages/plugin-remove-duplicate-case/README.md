# @putout/plugin-remove-duplicate-case [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-case.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-case"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-duplicate-case
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-duplicate-case

`putout` plugin adds ability to find and remove duplecate case.

## Install

```
npm i @putout/plugin-remove-duplicate-case
```

## Rule

```json
{
    "rules": {
        "remove-duplicate-case": "on"
    }
}
```

## ❌ Incorrect code example

```js
switch(x) {
case 5:
    console.log('hello');
    break;
case 5:
    console.log('zz');
    break;
}
```

## ✅ Correct code Example

```js
switch(x) {
case 5:
    console.log('hello');
    break;
}
```

## License

MIT
