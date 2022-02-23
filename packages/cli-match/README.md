# @putout/cli-match [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-match.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-match "npm"

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
import {cwd} from 'process';
import {
    readFile,
    writeFile,
} from 'fs/promises';

import match from '@putout/cli-match';

await match({
    pattern,
    cwd: cwd(),
    readFile,   // optional
    writeFile,  // optional
});
```

## License

MIT
