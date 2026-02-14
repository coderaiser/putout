# @putout/plugin-coverage [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-coverage.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-coverage "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with coverage configuration files, like :`.nycrc.json`, `c8rc.json`.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/104468b5dc2f2f39bbddd327bbcfc8cf/494e50c1c06a1626f24ac948a0685ccc711be97d).

## Install

```
npm i @putout/plugin-coverage -D
```

## Rules

- ✅ [add](#add);
- ✅ [sort](#sort);

## Config

```json
{
    "rules": {
        "coverage/add": ["on", {
            "dismiss": ["*.spec.*"]
        }],
        "coverage/sort": "on"
    }
}
```

## add

```diff
{
    "exclude": [
-       "test"
+       "test",
+       *.config.*
    ]
}
```

## sort

### ❌ Example of incorrect code

```json
{
    "exclude": [
        "**/*.spec.*",
        "**/fixture",
        "test",
        ".*.*",
        "**/*.config.*"
    ]
}
```

### ✅ Example of correct code

```json
{
    "exclude": [
        "**/*.spec.*",
        "**/fixture",
        "**/*.config.*",
        ".*.*",
        "test"
    ]
}
```

## License

MIT
