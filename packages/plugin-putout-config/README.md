# @putout/plugin-putout-config [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-putout-config.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-putout-config"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with 🐊[**Putout Config**](https://github.com/coderaiser/putout#-configuration).

## Install

```
npm i @putout/plugin-putout-config -D
```

## Rules

- ✅ [apply-labels][#apply-labels];
- ✅ [apply-nodejs][#apply-nodejs];
- ✅ [convert-boolean-to-string][#convert-boolean-to-string];
- ✅ [move-formatter-up][#move-formatter-up];
- ✅ [remove-empty][#remove-empty];
- ✅ [rename-property.js][#rename-property.js];

## Config

```json
{
    "rules": {
        "putout-config/apply-labels": "on",
        "putout-config/apply-nodejs": "on",
        "putout-config/convert-boolean-to-string": "on",
        "putout-config/move-formatter-up": "on",
        "putout-config/remove-empty": "on"
    }
}
```

## apply-labels

Apply [`labels`](https://github.com/coderaiser/putout/tree/master/packages/plugin-labels#readme) according to 🐊[**Putout v36**](https://github.com/coderaiser/putout/releases/tag/v36.0.0). Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9a3493fedfafdb25e86cf76af69dd003/8678f3b271ee6f6d13bceeedbe3b143f34be9f55).

### ❌ Example of incorrect code

```json
{
    "rules": {
        "remove-unused-labels": "on",
        "convert-label-to-object": "on"
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "labels/remove-unused": "on",
        "labels/convert-to-object": "on"
    }
}
```

## apply-nodejs

Apply [`nodejs`](https://github.com/coderaiser/putout/tree/master/packages/plugin-nodejs#readme) according to:

- 🐊[**Putout v33**](https://github.com/coderaiser/putout/releases/tag/v33.0.0);
- 🐊[**Putout v34**](https://github.com/coderaiser/putout/releases/tag/v34.0.0);

### ❌ Example of incorrect code

```json
{
    "rules": {
        "strict-mode/add-missing": "off",
        "strict-mode/remove-useless": "off",
        "convert-esm-to-commonjs": "off",
        "convert-commonjs-to-esm": "off"
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "nodejs/add-missing-strict-mode": "off",
        "nodejs/remove-useless-strict-mode": "off",
        "nodejs/convert-esm-to-commonjs": "off",
        "nodejs/convert-commonjs-to-esm": "off"
    }
}
```

## convert-boolean-to-string

### ❌ Example of incorrect code

```json
{
    "rules": {
        "remove-unused-variables": true,
        "remove-debugger": false
    }
}
```

### ✅ Example of correct code

```json
{
    "rules": {
        "remove-unused-variables": "on",
        "remove-debugger": "off"
    }
}
```

## move-formatter-up

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/48ce05b358a9118250acdc0b35df0fc8/50aeb680193ab4cd5d247e098ff90be8d4092111).

### ❌ Example of incorrect code

```json
{
    "parser": "babel",
    "rules": {
        "remove-unused-variables": "off"
    },
    "formatter": "progress-bar"
}
```

### ✅ Example of correct code

```json
{
    "parser": "babel",
    "formatter": "progress-bar",
    "rules": {
        "remove-unused-variables": "off"
    }
}
```

## remove-empty

### ❌ Example of incorrect code

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

### ✅ Example of correct code

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
