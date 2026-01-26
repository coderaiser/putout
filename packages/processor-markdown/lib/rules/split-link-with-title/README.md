# Split link with title (split-link-with-title)

Add space between title and link.

```diff
# @putout/plugin-apply-replace-all [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-apply-replace-all.svg?style=flat&longCache=true
-[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-replace-all"npm"
+[NPMURL]:                   https://npmjs.org/package/@putout/plugin-apply-replace-all "npm"

-[hello](https://google.com"Google")
+[hello](https://google.com "Google")
```
