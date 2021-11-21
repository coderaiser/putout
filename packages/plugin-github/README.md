# @putout/plugin-github [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-github.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-github"npm"

🐊[`Putout`](https://github.com/coderaiser/putout) plugin helps with 🐊[`Putout`](https://github.com/coderaiser/putout) plugins development.

## Install

```
npm i @putout/plugin-github -D
```

## Rules

```json
{
    "rules": {
        "github/set-node-versions": "on",
        "github/set-checkout-version": "on",
        "github/set-setup-node-version": "on"
    }
}
```

## set-node-versions

```diff
jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
-       node-version: [14.x, 15.x]
+       node-version: [14.x, 16.x]
```

## set-checkout-version

```diff
  steps:
-      - uses: actions/checkout@v1
+      - uses: actions/checkout@v2
```

## set-checkout-version

```diff
  steps:
-      - uses: actions/setup-node@v1
+      - uses: actions/setup-node@v2
```

## License

MIT
