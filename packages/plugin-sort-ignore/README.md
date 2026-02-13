# @putout/plugin-sort-ignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-sort-ignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-sort-ignore "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin sorts ignore.

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c60c3474a65e446538b23f7a7e8b56c2/dc40475d61d8cff56b85ab10d49eddfbeb86cb52).

## Install

```
npm i @putout/plugin-sort-ignore -D
```

## Rules

```json
{
    "rules": {
        "sort-ignore": "on"
    }
}
```

## ❌ Example of incorrect code

```ignore
node_modules
*.swp
yarn-error.log
yarn.lock
.idea
.DS_Store
deno.lock

coverage
.filesystem.json
```

## ✅ Example of correct code

```ignore
.idea
.filesystem.json
.DS_Store

*.swp

yarn-error.log
yarn.lock
deno.lock

node_modules
coverage
```

## License

MIT
