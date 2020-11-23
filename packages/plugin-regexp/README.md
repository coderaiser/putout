# @putout/plugin-gitignore [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-gitignore.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-gitignore"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-gitignore
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-gitignore

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-gitignore -D
```

## Rules

```json
{
    "rules": {
        "gitignore/add-putoutcache": "on"
    }
}
```

## Add Putoutcache

Adds `.putoutcache` into .gitignore.

```diff
node_modules
+.putoutcache
```

## License

MIT

