# @putout/plugin-npmignore [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-npmignore.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-npmignore"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-npmignore
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-npmignore

`putout` plugin helps with `putout` plugins development.

## Install

```
npm i @putout/plugin-npmignore -D
```

## Rules

```json
{
    "rules": {
        "npmignore/add-dot-files": "on"
    }
}
```

## Add dot files

Adds `.*` into .npmignore.

```diff
+.*
test
```

## License

MIT

