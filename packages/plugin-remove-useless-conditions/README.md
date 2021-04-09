# @putout/plugin-remove-useless-condition [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-useless-condition.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-useless-condition"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-useless-condition
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-useless-condition

`putout` plugin adds ability to remove useless `condition`.

## Install

```
npm i @putout/plugin-remove-useless-condition
```

## Rule

```json
{
    "rules": {
        "remove-useless-condition": "on"
    }
}
```

## ❌ Incorrect code example

```js
if (zone?.tooltipCallback) {
    zone.tooltipCallback(e);
}

if (a)
    alert('hello');
else
    alert('hello');
```

## ✅ Correct code Example

```js
zone?.tooltipCallback(e);

alert('hello');
```

## License

MIT
