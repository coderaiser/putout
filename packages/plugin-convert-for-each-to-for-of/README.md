# @putout/plugin-convert-for-each-to-for-of [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-convert-for-each-to-for-of.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-convert-for-each-to-for-of "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to convert `Math.pow` to `exponentiation operator`.

## Install

```
npm i @putout/plugin-convert-for-each-to-for-of -D
```

## Rule

Rule `convert-for-each-to-for-of` is enabled by default, to disable add to `.putout.json`:

```json
{
    "rules": {
        "convert-for-each-to-for-of": "off"
    }
}
```

## ❌ Example of incorrect code

```js
Object.keys(json).forEach((name) => {
    manage(name, json[name]);
});

[].forEach.call(arguments, (item) => {
    console.log(item);
});
```

## ✅ Example of correct code

```js
for (const name of Object.keys(json)) {
    manage(name, json[name]);
}

for (const name of arguments) {
    console.log(item);
}
```

## License

MIT
