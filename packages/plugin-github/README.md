# @putout/plugin-github [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-github.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-github"npm"

> Automate, customize, and execute your software development workflows right in your repository with **GitHub Actions**.
>
> (c) [github.com](https://docs.github.com/en/actions)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with [**Github Actions**](https://github.com/features/actions).

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
-       node-version: [16.x, 18.x]
+       node-version: [16.x, 18.x, 19.x]
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
