# @putout/cli-match [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-match.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-match "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/cli-match
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/cli-match

Read `.putout.json` and convert `rules`  into `match`;

## Install

```
npm i @putout/cli-match
```

```diff
{
-   "rules": {
-       "remove-debugger": "on"
+    "match": {
+        "*.md": {
+            "remove-debugger": "on"
+        }
    }
}
```

## Example

```js
import match from 'match';
await match(name);
```

## License

MIT
