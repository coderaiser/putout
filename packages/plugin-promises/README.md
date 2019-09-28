# putout-plugin-promises [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-promises.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-promises"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-promises
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-promises

`putout` plugin adds ability to work with promises.

## Install

```
npm i @putout/plugin-promises -D
```

## Rule

```json
{
    "rules": {
        "promises/add-return-await": "on",
        "promises/remove-useless-resolve": "on",
        "promises/convert-reject-to-throw": "on"
    }
}
```

## Add-return-await
### ❌ Incorrect

```js
async function hello() {
    return world;
}

async function world() {
}
```

## ✅ Correct

```js
async function hello() {
    return world;
}

async function world() {
}
```

## remove-useless-resolve
### ❌ Incorrect

```js
async function hello() {
    return Promise.resolve('hello');
}
```

## ✅ Correct

```js
async function hello() {
    return 'hello';
}
```

## convert-reject-to-throw
### ❌ Incorrect

```js
async function hello() {
    return Promise.reject(Error('error'));
}
```

## ✅ Correct

```js
async function hello() {
    throw Error('error');
}
```

## License

MIT

