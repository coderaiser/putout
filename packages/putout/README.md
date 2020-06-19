# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/putout
[NPMURL]:                   https://npmjs.org/package/putout "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/putout  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/putout "Dependency Status"

[CoverageURL]:              https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

Putout is a tool for identifying, reporting and fixing patterns found in JavaScript/JSX/Typescript/Flow code. It can:
- find and remove unused `variables`;
- find and remove unused `private fields`;
- find and remove unused `expressions`;
- find and remove useless `variables`;
- find and remove useless `functions`;
- find and remove useless `Array.from`;
- find and remove useless `spread`;
- find and remove useless `arguments`;
- find and remove useless `escape`;
- find and remove useless `async`;
- find and remove useless `await`;
- find and remove useless `typeof`;
- find and remove `debugger` statement;
- find and remove nested blocks;
- find and remove `process.exit` call;
- find and remove `console.log` calls;
- find and remove `empty block statements`;
- find and remove `empty patterns`;
- find and remove `strict mode` directive from `esm`;
- find and remove `constant conditions`;
- find and remove `boolean` from `logical expressions`;
- find and remove `double negations`;
- find and remove `unreachable code`;
- find and remove `duplicate keys`;
- find and replace `test.only` to `test` calls;
- find and replace `test.skip` to `test` calls;
- reuse duplicate `init`;
- find and split `variable declarations`;
- find and split `nested destructuring`;
- find and simplify ternary;
- if absent `strict mode` directive in `commonjs` add it;
- convert `esm` to `commonjs` (disabled);
- convert `commonjs` to `esm` (disabled);
- convert `template` with one `expression` to `string`;
- convert `equal` to `strict equal`;
- convert `indexOf` to `includes`;
- apply destructuring;
- apply `top-level await` (disabled, [stage 3](https://github.com/tc39/proposal-top-level-await));
- convert `throw` statement into expression (disabled, [stage 2](https://github.com/tc39/proposal-throw-expressions));
- apply shorthand properties;
- apply `optional chaining` (disabled [stage4](https://github.com/tc39/proposal-optional-chaining));
- apply `nullish coalescing` (disabled [stage4](https://github.com/tc39/proposal-nullish-coalescing));
- merge destructuring properties;
- merge duplicate imports;
- merge `if` statements;
- convert `Math.pow` to `exponentiation operator`;
- convert `anonymous` to `arrow function`;
- convert `for` to `for-of`;
- convert `forEach` to `for-of`;
- convert `for-in` to `for-of`;
- convert `apply` to `spread`;
- convert `arguments` to `rest`;
- convert `Object.assign` to `merge spread`;
- convert `binary expression` to `boolean`;
- convert `top-level return` into `process.exit()`;
- convert `spread` to `Array.from`;
- convert typescripts' generic `<Array>` to shorthand `[]`;
- extract sequence expressions;
- extract object properties;
- add `return await`;
- remove useless `Promise.resolve`;
- convert `Promise.reject` to `throw`;

## Why?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [pretier](https://github.com/prettier/prettier) it is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support.

The main difference of `putout` is saving code transformation results directly into source code in a day-to-day baisis.

## Install

```
npm i putout -g
```

## Usage

```
Usage: putout [options] [path]
Options
   -h, --help                  display this help and exit
   -v, --version               output version information and exit
   -f, --format                use a specific output format - default: dump
   -s, --staged                add staged files when in git repository
   -d, --debug                 show internal information on crash
   --fix                       apply fixes of errors to code
   --fix-count                 count of fixes rounds (defaults to 10)
   --rulesdir                  use additional rules from directory
   --transform                 apply inline transform
   --enable                    enable rule by name in .putout.json
   --disable                   disable rule by name in .putout.json
   --enable-all                enable all rules in .putout.json
   --disable-all               disable all rules in .putout.json
   --ext                       specify JavaScript file extensions
   --jsx                       enable jsx (try to determine by default)
   --flow                      enable flow
   --no-jsx                    disable jsx
   --no-flow                   disable flow (default)
   --cache                     enable .putoutcache to speed up processing
   --fresh, --update-cache     enable .putoutcache to speed up processing from scratch
   --remove-cache              remove .putoutcache file
```

To find erros:

```
putout lib test
```

To fix errors:

```
putout lib test --fix
```

## Environment variables

`Putout` supports next `environment variables`:
- `PUTOUT_FILES` - files that should be processed by putout, divided by ",";

```js
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

`Putout` supports `plugins`, there is two types: with prefix official `@putout/plugin-` and user plugins with prefix `putout-plugin-`. To use your plugin create plugin as `npm` package with keywords `putout`, `putout-plugin` and add it to `.putout.json`.

For example if you need to `remove-something` create `putout` plugin with name `putout-plugin-remove-something` and it to `package.json`:

```json
{
    "plugins": [
        "remove-something"
    ]
}
```

## Codemods

`putout` supports `codemodes` in the similar to plugins way, just create a directory `~/.putout` and put your plugins there. Here is example: [convert-tape-to-supertape](https://github.com/coderaiser/putout/tree/master/codemods/plugin-convert-tape-to-supertape) and [this is example of work](https://github.com/coderaiser/putout/commit/ad02cebc344ce73cdee668cffc5078bf08830d52).

## API

### putout(source, options)

```js
const putout = require('putout');

const source = `
const t = 'hello';
const m = t + '!';
console.log(t);
`;

const result = putout(source, {
    plugins: [
        'remove-unused-variables',
    ]
});
// returns
`
const t = 'hello';
console.log(t);
`
```

## License

MIT

