# @putout/plugin-remove-putoutcache-from-gitignore [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-remove-putoutcache-from-gitignore.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-remove-putoutcache-from-gitignore"npm"

`putout` codemod helps to remove `.putoutcache`  from '.gitignore'.

## Rules

```json
{
    "rules": {
        "remove-putoutcache-from-gitignore": "on"
    }
}
```

## Remove putoutcache from .gitignore

```diff
-.putoutcache
```

## License

MIT
