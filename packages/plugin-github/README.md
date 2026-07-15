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

- ✅ [add-continue-on-error-to-add-and-commit](#add-continue-on-error-to-add-and-commit);
- ✅ [add-continue-on-error-to-coveralls](#add-continue-on-error-to-coveralls);
- ✅ [add-madrun-init](#add-madrun-init);
- ✅ [convert-npm-to-bun](#convert-npm-to-bun);
- ✅ [convert-typos-to-typos-ai](#convert-typos-to-typos-ai);
- ✅ [insert-rust](#insert-rust);
- ✅ [install-bun](#install-bun);
- ✅ [set-contents-permissions](#set-contents-permissions);
- ✅ [set-node-versions](#set-node-versions);
- ✅ [set-message-of-commit-fixes](#set-message-of-commit-fixes);
- ✅ [update-actions](#update-actions);
- ✅ [remove-empty-needs](#remove-empty-needs);

## Config

```json
{
    "rules": {
        "github/add-continue-on-error-to-coveralls": "on",
        "github/add-continue-on-error-to-add-and-commit": "on",
        "github/add-madrun-init": "on",
        "github/set-contents-permissions": "on",
        "github/convert-npm-to-bun": "on",
        "github/convert-typos-to-typos-ai": "on",
        "github/set-node-versions": "on",
        "github/set-message-of-commit-fixes": "on",
        "github/install-bun": "on",
        "github/install-rust": "on",
        "github/update-actions": "on",
        "github/remove-empty-needs": "on"
    }
}
```

## add-madrun-init

Checkout int 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/9c9416fc9e68cb0d5d4c8c651585a150/0d0ddc337d20dd492e950a066c0f3d00ecda2eba).

Add [`madrun init`](https://github.com/coderaiser/madrun):

```diff
  - name: Install redrun
-   run: bun i redrun -g
+   run: bun i redrun madrun -g
+ - name: Init madrun
+   run: madrun init
```

## add-continue-on-error-to-coveralls

Add ability to continue when cannot submit coverage to Coveralls using [`continue-on-error`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepscontinue-on-error).

```diff
  - name: Commit fixes
    continue-on-error: true
    uses: EndBug/add-and-commit@v10
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

## set-contents-permissions

To use [`EndBug/and-end-commit`](https://github.com/EndBug/add-and-commit) you need to set content permissions.

Checkout int 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/22f1abf3f448061e9e2d2bca6f5a612c/70a3b71c6445a8f3b3b8ee59ed9132e5edcb3eea).

```diff
name: Node CI
+permissions:
+  contents: write
```

## set-message-of-commit-fixes

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/0379415220b31bbbab2d29c155b5b7eb/08839962bed379f7169e05a30ae5e082d9731c75).

```diff
  uses: EndBug/add-and-commit@v9
         continue-on-error: true
         with:
-          message: chore(${{ env.NAME }}) lint using actions
+          message: "chore: ${{ env.NAME }}: actions: lint ☘️"
```

You can override message with:

```json
{
    "rules": {
        "github/set-message-of-commit-fixes": ["on", {
            "message": "✅ fixed with github actions"
        }]
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
-       node-version: [20.x, 22.x, 24.x]
+       node-version: [22.x, 24.x, 26.x]
```

You can override versions with:

```json
{
    "rules": {
        "github/set-node-versions": ["on", {
            "versions": [
                "16.x",
                "18.x",
                "20.x",
                "25.x"
            ]
        }]
    }
}
```

## update-actions

`coverallsapp/github-action@master`:

```diff
      - name: Coveralls
-       uses: coverallsapp/github-action@master
+       uses: coverallsapp/github-action@v2
```

`docker/login-action`:

```diff
      - name: Login to Docker Hub
-       uses: docker/login-action@v2
+       uses: docker/login-action@v4
```

`docker/build-push`:

```diff
      - name: Build and push alpine-image
-       uses: docker/build-push-action@v4
+       uses: docker/build-push-action@v7
```

`docker/setup-buildx`:

```diff
      - name: Set up Docker Buildx
-       uses: docker/setup-buildx-action@v2
+       uses: docker/setup-buildx-action@v4
```

`actions/checkout`:

```diff
  steps:
-      - uses: actions/checkout@v2
+      - uses: actions/checkout@v3
```

`actions/cache`:

```diff
  steps:
-      - uses: actions/cache@v4
+      - uses: actions/checkout@v5
```

`actions/setup-node`:

```diff
  steps:
-      - uses: actions/setup-node@v2
+      - uses: actions/setup-node@v3
```

`docker/setup-quemu`:

```diff
  steps:
        - name: Set up QEMU
-         uses: docker/setup-qemu-action@v2
+         uses: docker/setup-qemu-action@v4
```

`EndBug/add-and-commit`:

```diff
  steps:
-      uses: EndBug/add-and-commit@v7
+      uses: EndBug/add-and-commit@v9
```

`oven-sh/setup-bun@v1`:

```diff
  steps:
-      uses: oven-sh/setup-bun@v1
+      uses: oven-sh/setup-bun@v2
```

## install-bun

> Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called bun.
>
> At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.
>
> (c) [bun.sh](https://bun.sh).

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2d10cb903c532df454a8dfd6de2780c3/ee6b347faef340f20b7c1aa53564f72572c493df).

```diff
steps:
  - uses: actions/checkout@v3
  - name: Use Node.js ${{ matrix.node-version }}
    uses: actions/setup-node@v3
    with:
      node-version: ${{ matrix.node-version }}
+  - uses: oven-sh/setup-bun@v2
+    with:
+      bun-version: latest
```

## install-rust

> A language empowering everyone to build reliable and efficient software.
>
> (c) [Rust](https://rust-lang.orgh).

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/ad1fbd14cf16ce2e0ebf768fbfc07387/ec47bc0fe622b0001070c871e423979f7d29cbfb).

```diff
steps:
  - uses: actions-rs/toolchain@v1
    with:
      toolchain: stable
+  - name: Install Rust
+    run: runstup update
```

## install-bun

> Bun is an all-in-one toolkit for JavaScript and TypeScript apps. It ships as a single executable called bun.
>
> At its core is the Bun runtime, a fast JavaScript runtime designed as a drop-in replacement for Node.js. It's written in Zig and powered by JavaScriptCore under the hood, dramatically reducing startup times and memory usage.
>
> (c) [bun.sh](https://bun.sh).

Bun install works much faster: 40s before - 2s after.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e03cc6ff4d9927568dc4f6f608be10ef/52146f4cbbc02c5bc8d7242af94d37f8734b3b36).

```diff
- name: Install Redrun
-    run: npm i redrun -g
+    run: bun i redrun -g --no-save
- name: Install
-    run: npm install
+    run: bun i --no-save
```

## convert-typos-to-typos-ai

Use [typos.ai](https://github.com/coderaiser/typos.ai) action, it is much simpler and also clever.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/05457ee0a03ac861e0a12a35ce1f78db/8195c4f3c8ee83be9d9b33756ea329cfc688d7c4).

```diff
- - name: Install Rust
-   run: rustup update
- - uses: actions/cache@v5
-   with:
-     path: |
-       ~/.cargo/bin/
-       ~/.cargo/registry/index/
-       ~/.cargo/registry/cache/
-       ~/.cargo/git/db/
-       target/
-     key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}
- - name: Typos Install
-   run: which typos || cargo install typos-cli
  - name: Typos
-   run: typos --write-changes
+   uses: coderaiser/typos.ai@v1.1.8
+   with:
+     key: ${{ secrets.TYPOS_AI_KEY }}
```

## convert-npm-to-bun

```diff
  - name: Install Redrun
-   run: npm install redrun -g --no-save
+   run: bun install redrun -g --no-save
  - name: Install
-   run: npm i -f --no-save
+   run: bun i -f --no-save
```

## remove-empty-needs

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e861cfee107252f80025d4ccdab46be3/a96d306968b07edcf61e44ad9eddab1e0da94642).

```diff
jobs:
  deploy-test:
    runs-on: ubuntu-latest
-   needs: []
```

## License

MIT
