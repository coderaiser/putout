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

- ✅ [add-continue-on-error-to-add-and-commit][#add-continue-on-error-to-add-and-commit];
- ✅ [add-continue-on-error-to-coveralls][#add-continue-on-error-to-coveralls];
- ✅ [add-property.js][#add-property.js];
- ✅ [convert-npm-to-bun][#convert-npm-to-bun];
- ✅ [insert-rust][#insert-rust];
- ✅ [install-bun][#install-bun];
- ✅ [set-node-versions][#set-node-versions];
- ✅ [update-actions][#update-actions];

## Config

```json
{
    "rules": {
        "github/add-continue-on-error-to-coveralls": "on",
        "github/add-continue-on-error-to-add-and-commit": "on",
        "github/set-node-versions": "on",
        "github/install-bun": "on",
        "github/install-rust": "on",
        "github/convert-npm-to-bun": "on",
        "github/update-actions": "on"
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
-       node-version: [16.x, 18.x, 20.x, 21.x]
+       node-version: [18.x, 20.x, 21.x, 22.x, 23.x]
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
                "21.x"
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
+       uses: docker/login-action@v3
```

`docker/build-push`:

```diff
      - name: Build and push alpine-image
-       uses: docker/build-push-action@v4
+       uses: docker/build-push-action@v5
```

`docker/setup-buildx`:

```diff
      - name: Set up Docker Buildx
-       uses: docker/setup-buildx-action@v2
+       uses: docker/setup-buildx-action@v3
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
-      - uses: actions/cache@v3
+      - uses: actions/checkout@v4
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
+         uses: docker/setup-qemu-action@v3
```

`EndBug/add-and-commit`:

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

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/2d10cb903c532df454a8dfd6de2780c3/ee6b347faef340f20b7c1aa53564f72572c493df).

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

MIT
