# @putout/plugin-package-json [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-package-json.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-package-json"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to automate fixing `package.json`.

## Install

```
npm i @putout/plugin-package-json -D
```

## Rules

- ✅ [add-type](#add-type);
- ✅ [apply-https-to-repository-url](#apply-https-to-repository-url);
- ✅ [find-file](#find-file);
- ✅ [remove-nyc](#remove-nyc);
- ✅ [remove-commit-type](#remove-commit-type);
- ✅ [remove-duplicate-keywords](#remove-duplicate-keywords);
- ✅ [remove-exports-with-missing-files](#remove-exports-with-missing-files);

## Config

```json
{
    "rules": {
        "package-json/add-type": "on",
        "package-json/apply-https-to-repository-url": "on",
        "package-json/remove-nyc": "on",
        "package-json/remove-commit-type": "on",
        "package-json/remove-exports-with-missing-files": "off",
        "package-json/find-file": "off"
    }
}
```

## add-type

Add [`type`](https://nodejs.org/dist/latest-v17.x/docs/api/packages.html#type) field to `package.json`:

```diff
{
    "name": "hello",
    "version": "1.0.0",
+   "type": "commonjs"
}
```

## apply-https-to-repository-url

The `git://` protocol for GitHub repos should not be used due [security concerns](https://github.blog/security/application-security/improving-git-protocol-security-github/).

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/63ab077723e3ff368fa4e3472f9a36f3/048984adbf078a7d153ea44100d3f03676aa02d5).

```diff
{
  "repository": {
    "type": "git",
-   "url": "git://github.com/coderaiser/putout.git"
+   "url": "git+https://github.com/coderaiser/putout.git"
  }
```

## remove-nyc

- additional fields in `package.json` produces more traffic then users of your package really need;
- [c8](https://github.com/bcoe/c8) uses [same config name and format](https://github.com/bcoe/c8/blob/v7.3.5/lib/parse-args.js#L8) so transition between tools will be much easier;

### ❌ Example of incorrect code

`nyc` section in `package.json`:

```json
{
    "nyc": {
        "check-coverage": "on",
        "all": "on",
        "exclude": [
            "**/*.spec.js",
            "**/fixture",
            "test",
            ".*.js"
        ],
        "branches": 100,
        "lines": 100,
        "functions": 100,
        "statements": 100
    }
}
```

### ✅ Example of correct code

File `.nycrc.json`:

```json
{
    "check-coverage": "on",
    "all": "on",
    "exclude": [
        "**/*.spec.js",
        "**/fixture",
        "test",
        ".*.js"
    ],
    "branches": 100,
    "lines": 100,
    "functions": 100,
    "statements": 100
}
```

## remove-commit-type

Since 🎁**Wisdom** [v14](https://github.com/coderaiser/wisdom/releases/tag/v14.0.0) `commitType` set to `colon` be default, so it can be dropped from `package.json` if it's value not `paren`:
Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/eb12c902c8e99effc91ae44119d625d7/8e60d60b2c2e7bb28ca5b2eba61715a062ac5319).

```diff
{
    "name": "hello",
    "version": "1.0.0",
    "commitType": "colon"
}
```

## remove-duplicate-keywords

Check out in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/eb12c902c8e99effc91ae44119d625d7/8e60d60b2c2e7bb28ca5b2eba61715a062ac5319).

```diff
__putout_processor_json({
    "keywords": [
     "putout",
     "putout-plugin",
-    "plugin",
-    "putout"
+    "plugin"
   ],
});
```

## find-file

Find `package.json` inside of `.filesystem.json` and applies all other `package-json` rules.
Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/325233d19fde0acacadbcf1f42dd3bb2/124a50fe0e92c6c3cab24f8b87c33b202dc3e540).

```diff
{
    "name": "hello",
    "version": "1.0.0",
+   "type": "commonjs"
}
```

## remove-exports-with-missing-files

Find `package.json` inside of `.filesystem.json` and removes `exports` with missing files.

Checkout in 🐊**Putout Editor**:

- [`remove-exports-with-missing-files`](https://putout.cloudcmd.io/#/gist/c79a69b797ccd2d94499349150e65f7c/37a48a054b98299cb15e71c3eaeb23b0b919d62c);
- [`find-keys`](https://putout.cloudcmd.io/#/gist/b138e991aa21ad0ffb562b4c6fe6290f/cca92b8b87ca9d91c0a280991a1558a5e3fc260b);
- [`remove-keys`](https://putout.cloudcmd.io/#/gist/b2fa6fba917a22bfc676f01532b4794e/e5970eb901ef5b29f7c143f76df9a10148b69d9e);

```diff
__putout_processor_filesystem([
    "/",
    ["/package.json", `{
        "exports": {
            "./parse-options": "./lib/parse-options/index.js",
-            "./loader": "./lib/loader.mjs"
        }
    }`],
    "/lib/",
    "/lib/parse-options/",
    ["/lib/parse-options/index.js", "export const a = 5"],
]);
```

## License

MIT
