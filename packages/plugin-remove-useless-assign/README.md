# @putout/plugin-remove-useless-assign [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-assign.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-assign "npm"

> The `Object.assign()` method copies all enumerable own properties from one or more source objects to a target object. It returns the modified target object.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `assign`.
Check it out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/04c18d7d2302e0a3cc543c7c83adeaf2/ddb38d94dcc6425fc944e3b130837739f916c7df).

## Install

```
npm i @putout/plugin-remove-useless-assign
```

## Rule

```json
{
    "rules": {
        "remove-useless-assign": "on"
    }
}
```

## ❌ Example of incorrect code

```js
const load = stub().rejects(assign(Error('LOAD USED')));
```

## ✅ Example of correct code

```js
const load = stub().rejects(Error('LOAD USED'));
```

## License

MIT
