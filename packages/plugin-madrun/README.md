# putout-plugin-madrun [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-madrun.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-madrun"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-madrun
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-madrun

`putout` plugin adds ability to fix issues with [madrun](https://github.com/coderaiser/madrun) config file.

## Install

```
npm i putout @putout/plugin-madrun -D
```

Add `.putout.json` with:

```json
{
    "plugins": [
        "madrun"
    ]
}
```

## Rules

All Rules of `madrun` is enabled by default, to disable any of them modify `.putout.json`:

```json
{
    "rules": {
        "madrun/add-function": false,
        "madrun/call-series": false,
    }
}
```

## Example

Consider example of `.madrun.js`:

```js
module.exports = {
    'hello': 'world'
};

```

After `putout --fix` transform, you will receive:

```js
module.exports = {
    'hello': () => 'world'
};
```

## License

MIT

