# @putout/plugin-remove-nested-blocks [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-nested-blocks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-nested-blocks"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin adds ability to find and remove `nested bocks`.

## Install

```
npm i @putout/plugin-remove-nested-blocks
```

## Rule

```json
{
    "rules": {
        "remove-nested-blocks": "on"
    }
}
```

## ❌ Example of incorrect code

```js
for (const x of Object.keys(a)) {
    {
        console.log(x);
        console.log(xxx);
    }
}
```

## ✅ Example of correct code

```js
for (const x of Object.keys(a)) {
    console.log(x);
    console.log(xxx);
}

switch(x) {
case 1: {
    const m = 5;
}
}
```

## License

MIT
