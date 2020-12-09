# @putout/plugin-putout-config [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout-config"npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/plugin-putout-config
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-putout-config

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-putout-config -D
```

## Rules

```json
{
    "rules": {
        "putout/convert-boolean-to-string": "on"
    }
}
```

## convert-boolean-to-string

### ❌ Incorrect code example

```json
{
    "rules": {
        "remove-unused-variables": true,
        "remove-debugger": false
    }
}
```

### ✅ Correct code Example

```json
{
    "rules": {
        "remove-unused-variables": "on",
        "remove-debugger": "off"
    }
}
```

## License

MIT
