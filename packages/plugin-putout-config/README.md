# @putout/plugin-putout-config [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout-config"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin helps with [`putout`](https://github.com/coderaiser/putout) plugins development.

## Install

```
npm i @putout/plugin-putout-config -D
```

## Rules

```json
{
    "rules": {
        "putout-config/convert-boolean-to-string": "on",
        "putout-config/remove-empty": "on"
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

## remove-empty

### ❌ Incorrect code example

```json
{
    "rules": {},
    "plugins": [],
    "match": {
        "*.js": {
            "remove-unused-variables": "off"
        }
    }
}
```

### ✅ Correct code Example

```json
{
    "match": {
        "*.js": {
            "remove-unused-variables": "off"
        }
    }
}
```

## License

MIT
