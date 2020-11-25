# @putout/plugin-remove-legacy-from-gitignore [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-remove-legacy-from-gitignore.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-remove-legacy-from-gitignore"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-remove-legacy-from-gitignore
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-remove-legacy-from-gitignore

`putout` codemod helps to remove `legacy`  from '.gitignore'.

## Rules

```json
{
    "rules": {
        "remove-legacy-from-gitignore": "on"
    }
}
```

## Remove legacy from .gitignore

```diff
-legacy
```

## License

MIT

