# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]: https://github.com/coderaiser/putout/workflows/Node%20CI/badge.svg
[NPMURL]: https://npmjs.org/package/putout "npm"
[BuildStatusURL]: https://github.com/coderaiser/putout/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[CoverageURL]: https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

![putout](https://github.com/coderaiser/putout/blob/master/images/putout-logo.svg)

🐊[`Putout`](https://github.com/coderaiser/putout) is a tool for identifying, reporting and fixing patterns found in JavaScript/JSX/Typescript/Flow code. It can:

- remove unused `variables`;
- remove unused `for-of variables`;
- remove unused `typescripts` types;
- remove unreferenced `variables`;
- remove unused `private fields`;
- remove unused `expressions`;
- remove useless `variables`;
- remove useless `map`;
- remove useless `mapped types`;
- remove useless `mapping modifiers`;
- remove useless `continue`;
- remove useless `operand`;
- remove useless `array constructor`;
- remove useless `conditions`;
- remove useless `type conversion`;
- remove useless `functions`;
- remove useless `Array.from`;
- remove useless `spread`;
- remove useless `arguments`;
- remove useless `escape`;
- remove useless `async`;
- remove useless `await`;
- remove useless `typeof`;
- remove useless `template expressions`;
- remove useless `for-of`;
- remove `debugger` statement;
- remove `iife`;
- remove nested blocks;
- remove `process.exit` call;
- remove `console.log` calls;
- remove `empty block statements`;
- remove `empty patterns`;
- remove `strict mode` directive from `esm`;
- remove `constant conditions`;
- remove `boolean` from `assertion`;
- remove `boolean` from `logical expressions`;
- remove `duplicates` from `logical expressions`;
- remove `duplicates` from TypeScript `Union`;
- remove `unreachable code`;
- remove `duplicate keys`;
- remove useless `typescripts` types;
- remove duplicate `typescripts` interface keys;
- replace `test.only` to `test` calls;
- replace `test.skip` to `test` calls;
- reuse duplicate `init`;
- split `variable declarations`;
- split `nested destructuring`;
- simplify `assignment`;
- simplify `ternary`;
- simplify `logical expressions`;
- if absent `strict mode` directive in `commonjs` add it;
- convert `apply` to `spread`;
- convert `bitwise` to `logical` operator;
- convert `concat` to `flat`;
- convert `esm` to `commonjs` (enabled for `*.cjs`);
- convert `commonjs` to `esm` (enabled for `*.mjs`);
- convert `template` with one `expression` to `string`;
- convert `equal` to `strict equal`;
- convert `indexOf` to `includes`;
- convert `replace` to `replaceAll` (disabled, [stage 4](https://github.com/tc39/proposal-string-replaceall));
- convert `assignment` to `arrow function`;
- convert `forEach` to `for-of`;
- convert `map` to `for-of`;
- extract sequence expressions;
- extract object properties;
- add `return await`;
- remove useless `Promise.resolve`;
- convert `Promise.reject` to `throw`;
- declare `undefined variables`;
- apply `as` type assertions;
- apply `utility types`;
- apply `array.at` ([disabled](https://github.com/nodejs/node/blob/master/doc/changelogs/CHANGELOG_V16.md#2021-07-29-version-1660-current-bethgriggs));
- apply `filter(Boolean)`;
- apply [isArray](https://web.mit.edu/jwalden/www/isArray.html);
- apply `if condition`;

## Why?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [pretier](https://github.com/prettier/prettier) it is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support.

The main difference of `putout` is saving code transformation results directly into source code in a day-to-day baisis.

## Install

```
npm i putout -D
```

## Usage

```
Usage: putout [options] [path]
Options:
   -h, --help                  display this help and exit
   -v, --version               output version information and exit
   -f, --format [formatter]    use a specific output format, the default is: 'progress-bar' localy and 'dump' on CI
   -s, --staged                add staged files when in git repository
   --fix                       apply fixes of errors to code
   --fix-count [count = 10]    count of fixes rounds
   --rulesdir                  use additional rules from directory
   --transform [replacer]      apply Replacer, for example 'var __a = __b -> const __a = __b', read about Replacer https://git.io/JqcMn
   --plugins [plugins]         a comma-separated list of plugins to use
   --enable [rule]             enable the rule and save it to '.putout.json' walking up parent directories
   --disable [rule]            disable the rule and save it to '.putout.json' walking up parent directories
   --enable-all                enable all found rules and save them to '.putout.json' walking up parent directories
   --disable-all               disable all found rules (set baseline) and save them '.putout.json' walking up parent directories
   --match [pattern]           read .putout.json and convert 'rules' to 'match' according to 'pattern'
   --flow                      enable flow
   --fresh                     generate a fresh cache
   --no-config                 avoid reading '.putout.json'
   --no-ci                     disable the CI detection
   --no-cache                  disable the cache
```

To find erros:

```
putout lib test
```

To fix errors:

```
putout lib test --fix
```

## Plugins

By default 🐊`Putout` uses all enabled by default plugins, anyways it can be run with a couple mentioned plugins (splitted with ","):

```sh
putout lib --plugins remove-debugger,remove-unused-variables
```

## Environment variables

🐊`Putout` supports next `environment variables`:

- `PUTOUT_FILES` - files that should be processed by putout, divided by ",";

```sh
PUTOUT_FILES=lib,test putout --fix
```

## Configuration

To configure create `.putout.json` file and override any of [default options](/packages/putout/putout.json).

### Match

When you need to match paths to rules you can use `match` section for this purpose in `.putout.json`:

```json
{
    "match": {
        "server": {
            "remove-process-exit": true
        }
    }
}
```

### Ignore

When you need to ignore some routes no metter what, you can use `ignore` section in `.putout.json`:

```json
{
    "ignore": [
        "test/fixture"
    ]
}
```

## Plugins

🐊`Putout` supports `plugins`, there is two types: with prefix official `@putout/plugin-` and user plugins with prefix `putout-plugin-`. To use your plugin create plugin as `npm` package with keywords `putout`, `putout-plugin` and add it to `.putout.json`.

For example if you need to `remove-something` create `putout` plugin with name `putout-plugin-remove-something` and it to `package.json`:

```json
{
    "plugins": [
        "remove-something"
    ]
}
```

## Codemods

🐊`Putout` supports `codemodes` in the similar to plugins way, just create a directory `~/.putout` and put your plugins there. Here is example: [convert-tape-to-supertape](https://github.com/coderaiser/putout/tree/master/codemods/plugin-convert-tape-to-supertape) and [this is example of work](https://github.com/coderaiser/putout/commit/ad02cebc344ce73cdee668cffc5078bf08830d52).

## API

### putout(source, options)

```js
const putout = require('putout');

const source = `
const t = 'hello';
const m = t + '!';
console.log(t);
`;

putout(source, {
    plugins: [
        'remove-unused-variables',
    ],
});
// returns
`
const t = 'hello';
console.log(t);
`;
```

## License

MIT
