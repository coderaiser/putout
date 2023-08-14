# @putout/plugin-github [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-github.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-github "npm"

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
        "github/add-continue-on-error-to-coveralls": "on",
        "github/add-continue-on-error-to-add-and-commit": "on",
        "github/set-node-versions": "on",
        "github/set-coveralls": "on",
        "github/set-checkout-version": "on",
        "github/set-setup-node-version": "on",
        "github/set-add-and-commit": "on",
        "github/install-bun": "on"
    }
}
```

## add-continue-on-error-to-coveralls

Add ability to continue when cannot submit coverage to Coveralls using [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error).

```diff
  - name: Commit fixes
    continue-on-error: true
    uses: EndBug/add-and-commit@v9
    with:
      fetch: --force
      message: "chore: ${{ env.NAME }}: actions: lint ☘️"
      pull: --rebase --autostash
+   continue-on-error: true
```

## add-continue-on-error-to-coveralls

Add ability to continue when cannot submit coverage to Coveralls using [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error).

```diff
  - name: Coveralls
    uses: coverallsapp/github-action@v2
    with:
      github-token: ${{ secrets.GITHUB_TOKEN }}
+   continue-on-error: true
```

## set-node-versions

```diff
jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
-       node-version: [16.x, 18.x, 19.x]
+       node-version: [16.x, 18.x, 20.x]
```

You can override versions with:

```json
{
    "rules": {
        "github/set-node-versions": ["on", {
            "versions": [
                "18.x",
                "20.x"
            ]
        }]
    }
}
```

## set-covveralls-versions

```diff
    - name: Coveralls
-       uses: coverallsapp/github-action@master
+       uses: coverallsapp/github-action@v2
```

## set-checkout-version

```diff
  steps:
-      - uses: actions/checkout@v2
+      - uses: actions/checkout@v3
```

## set-setup-node-version

```diff
  steps:
-      - uses: actions/setup-node@v2
+      - uses: actions/setup-node@v3
```

## set-add-and-commit

```diff
  steps:
-      uses: EndBug/add-and-commit@v7
+      uses: EndBug/add-and-commit@v9
```

## install-bun

> Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called bun.
>
> At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.
>
> (c) [bun.sh](https://bun.sh).

```diff
steps:
  - uses: actions/checkout@v3
  - name: Use Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.node-version }}
+  - uses: oven-sh/setup-bun@v1
+    with:
+      bun-version: latest
```

## License

MIT
