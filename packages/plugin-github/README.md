# @putout/plugin-github [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-github.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-github"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-github
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-github

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-github -D
```

## Rules

```json
{
    "rules": {
        "github/set-node-versions": "on",
        "github/set-checkout-version": "on"
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


## License

MIT

