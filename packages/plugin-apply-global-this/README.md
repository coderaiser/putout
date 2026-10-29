# @putout/plugin-apply-global-this [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-global-this.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-global-this "npm"

> Historically, accessing the global object has required different syntax in different JavaScript environments. On the web you can use `window`, `self`, or frames - but in Web Workers only `self` will work. In Node.js none of these work, and you must instead use `global`
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to find and apply `globalThis`.

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c72c8e1b1d0c2b45fd0d15d837dcae52/c7f33d77d19efe962339debbcf20f68bf2159aee).

## Install

```
npm i @putout/plugin-apply-global-this
```

## Rule

```json
{
    "rules": {
        "apply-global-this": "on"
    }
}
```

### ❌ Example of incorrect code

```js
globalThis.__putout_debug = debugFn;
globalThis.CloudCmd = {};
```

### ✅ Example of correct code

```js
globalThis.__putout_debug = debugFn;
globalThis.CloudCmd = {};
```

### Comparison

Linter | Rule | Fix
-------|------|------------|
🐊 **Putout** | [`apply-global-this`](https://github.com/coderaiser/putout/tree/master/packages/plugin-apply-global-this#readme) | ✅
⏣ **ESLint**  | [`no-node-globals`](https://docs.deno.com/lint/rules/no-node-globals/)  | ❌

## License

MIT
