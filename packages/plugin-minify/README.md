# @putout/plugin-minify [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds support of minifiers.

## Install

```
npm i @putout/plugin-putout -D
```

## Rules

```json
{
    "rules": {
        "minify/remove-return-undefined": "on",
        "minify/mangle-names": "on"
    }
}
```

## remove-return-undefined

### ❌ Example of incorrect code

```js
const fn = () => {
    if (a)
        return undefined;
    
    return undefined;
};
```

### ✅ Example of correct code

```js
const fn = () => {
    if (a)
        return;
};
```

## mangle-names

### ❌ Example of incorrect code

```js
function generate() {
    const hello = 'hi';
    return hello;
}
```

### ✅ Example of correct code

```js
function generate() {
    const a = 'hi';
    return a;
}
```

## License

MIT
