# Putout [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/putout.svg?style=flat&longCache=true
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/putout/master.svg?style=flat&longCache=true
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/putout.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/putout "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/putout  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout "Dependency Status"

[CoverageURL]:              https://coveralls.io/github/coderaiser/putout?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/putout/badge.svg?branch=master&service=github

Putout is a tool for identifying, reporting and fixing patterns found in JavaScript code. It can:

- find and remove unused variables;
- find and remove unused private fields;
- find and remove unused expressions;
- find and remove useless variables;
- find and remove `debugger` statement;
- find and replace `test.only` to `test` calls;
- find and replace `test.skip` to `test` calls;
- find and remove `process.exit` call;
- find and split variable declarations;
- find and remove `console.log` calls;
- find and remove `empty block statements`;
- find and remove `empty patterns`;
- find and remove `strict mode` directive from `esm`;
- find and remove `constant conditions`;
- find and remove `boolean` from `logical expressions`;
- if absent `strict mode` directive in `commonjs` add it;
- convert `esm` to `commonjs`;
- apply destructuring;
- merge destructuring properties;
- convert `Math.pow` to `exponentiation operator`;
- convert `apply` to `spread`;
- convert `arguments` to `rest`;
- convert `Object.assign` to `merge spread`;
- convert `binary expression` to `boolean`;

## Configuration

To configure create `.putout.json` file and override any option:

```json
{
    "formatter": "dump",
    "match": {
        "madrun.js": {
            "madrun/*": true
        },
        "bin": {
            "remove-process-exit": false,
            "remove-console": false
        },
        "test|.spec.js": {
            "remove-only": true,
            "remove-skip": true
        }
    },
    "ignore": [
        "node_modules"
    ],
    "rules": {
        "madrun/*": false,
        "convert-esm-to-commonjs": false,
        "remove-only": false,
        "remove-skip": false
    },
    "plugins": [
        "madrun",
        "remove-debugger",
        "remove-only",
        "remove-skip",
        "remove-process-exit",
        "remove-console",
        "remove-empty",
        "remove-unused-variables",
        "remove-unused-private-fields",
        "remove-unused-expressions",
        "remove-useless-variables",
        "remove-constant-conditions",
        "remove-boolean-from-logical-expressions",
        "split-variable-declarations",
        "convert-esm-to-commonjs",
        "convert-apply-to-spread",
        "convert-arguments-to-rest",
        "convert-object-assign-to-merge-spread",
        "convert-math-pow",
        "convert-binary-expression-to-boolean",
        "apply-destructuring",
        "merge-destructuring-properties",
        "strict-mode"
    ]
}
```

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

`Putout` supports `plugins`, there is to types: with prefix official `@putout/plugin-` and user plugins with prefix `putout-plugin-`. To use your plugin create plugin as `npm` package with keywords `putout`, `putout-plugin` and add it to `.putout.json`.

For example if you need to `remove-something` create `putout` plugin with name `putout-plugin-remove-something` and it to `.putout.json`:

```json
{
    "plugins": [
        "remove-something"
    ]
}
```

## Codemods

`putout` supports `codemodes` in the similar to plugins way, just create a directory `~/.putout` and put your plugins there. Here is example: [convert-tape-to-supertape](https://github.com/coderaiser/putout/tree/master/codemods/plugin-convert-tape-to-supertape) and [this is example of work](https://github.com/coderaiser/putout/commit/ad02cebc344ce73cdee668cffc5078bf08830d52).

## Why?

- because [eslint](https://eslint.org) avoids [fixes that could change the runtime behavior](https://eslint.org/docs/developer-guide/working-with-rules#applying-fixes).
- because [babel](https://babeljs.io) produces [throw-away code](https://github.com/babel/babel/issues/5139);
- because [pretier](https://github.com/prettier/prettier) it is a formatter;
- because [jscodeshift](https://github.com/facebook/jscodeshift) has no `config` and `plugins` support.

The main difference of `putout` is saving code transformation results directly in a source code in a day-to-day baisis.

## Install

```
npm i putout -g
```

## Usage

```
Usage: putout [options] [path]
Options:
  -h, --help              display this help and exit
  -v, --version           output version information and exit
  -f, --format            use a specific output format - default: dump
  --fix                   aply found fixes of errors to code
  --fix-count             count of fixes rounds (defaults to 10)
```

To see unused variables use:

```
putout lib test
```

To remove `unused variables` use:

```
putout lib test --fix
```

## API

### putout(source)

```js
const {readFileSync} = require('fs');
const source = readFileSync('./1.js', 'utf8');
console.log(source);
// outputs
`
const t = 'hello';
const m = t + '!';
`

const result = putout(source);
// returns
`
const t = 'hello';
`

const result2 = putout(result);
// returns
``
```

## License

MIT

