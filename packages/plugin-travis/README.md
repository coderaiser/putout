# @putout/plugin-travis [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-travis.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-travis"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-travis
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-travis

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-travis -D
```

## Rules

```json
{
    "rules": {
        "travis/set-node-versions": "on",
        "travis/disable-cache": "on"
    }
}
```

## Set node versions

```diff
language: node_js
node_js:
+ - 15
  - 15
  - 14
  - 12
- - 10
```

## Disable cache

```diff
language: node_js
+cache: false
```

## License

MIT

