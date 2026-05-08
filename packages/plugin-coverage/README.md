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

- ✅ [add-to-exclude](#add-to-exclude);
- ✅ [apply-camel-case](#apply-camel-case);
- ✅ [sort-ignore](#sort-ignore);

## File rules

- ✅ [remove-files](#remove-files)

## Config

```json
{
    "rules": {
        "coverage/apply-camel-case": "on",
        "coverage/add-to-exclude": ["on", {
            "dismiss": ["*.spec.*"]
        }],
        "coverage/sort-ignore": "on",
        "coverage/remove-files": "on"
    }
}
```

## apply-camel-case

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c6bbe7a8e10566a418dcd3f3a3412f92/2d4d05a2e5340466c50fbb3eaf35dd92dac82f0a).

```diff
{
-   "check-coverage": true
+   "checkCoverage": true
}
```

## add-to-exclude

```diff
{
    "exclude": [
-       "test"
+       "test",
+       *.config.*
    ]
}
```

## sort-ignore

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

## remove-files

```diff
/
-├── .nyc_output
-└── coverage
```

## License

MIT
