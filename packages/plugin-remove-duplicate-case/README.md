# @putout/plugin-remove-duplicate-case [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-duplicate-case.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-duplicate-case"npm"

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
