# @putout/plugin-remove-madrun-from-gitignore [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-madrun-from-gitignore.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-madrun-from-gitignore"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-madrun-from-gitignore
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-madrun-from-gitignore

`putout` codemod helps to remove `madrun`  from '.gitignore'.

## Rules

```json
{
    "rules": {
        "remove-madrun-from-gitignore": "on"
    }
}
```

## Remove madrun from .gitignore

```diff
-madrun.js
```

## License

MIT

