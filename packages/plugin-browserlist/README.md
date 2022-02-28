# @putout/plugin-browserlist [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-browserlist.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-browserlist"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps with [browserlist](https://github.com/browserslist/browserslist).

## Install

```
npm i @putout/plugin-browserlist -D
```

## Rules

```json
{
    "rules": {
        "browserlist/remove-node-versions": "on"
    }
}
```

## Remove node versions

Fixes webpack error [Universal Chunk Loading is not implemented yet](https://github.com/webpack/webpack/issues/11660).
Removes `maintained node versions`` from `.browserlist`.

```diff
node_modules
last 2 Chrome versions
last 2 Safari versions
Firefox ESR
-maintained node versions
not dead
```

## License

MIT
