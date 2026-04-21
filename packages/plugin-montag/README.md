# @putout/plugin-apply-montag [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-apply-montag.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-apply-montag "npm"

> Format multiline strings using tagged templates, instead of putting all lines into an array and joining to a string.
>
> (c) [**Montag**](https://github.com/coderaiser/montag)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to apply [**Montag**](https://github.com/coderaiser/montag).

## Install

```
npm i @putout/plugin-apply-montag
```

## Rules

- ✅ [add-newline-before-text](#add-newline-before-text);
- ✅ [convert-default-to-named](#convert-default-to-named);
- ✅ [apply](#apply);
- ✅ [declare](#declare);
- ✅ [remove-useless-space](#remove-useless-space);

## Config

```json
{
    "rules": {
        "montag/add-newline-before-text": "on",
        "montag/apply": "on",
        "montag/declare": "on",
        "montag/convert-default-to-named": "on",
        "montag/remove-useless-space": "on"
    }
}
```

## add-newline-before-text

Checkout in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/cc3fc17690b0367cfeaba0f1bc889ec3/c462eeeaeb38bdd3fe87bc2a26c838793c993b50).

### ❌ Example of incorrect code

```js
montag`hello`;
```

### ✅ Example of correct code

```js
const a = montag`
    hello
`;
```

## apply

### ❌ Example of incorrect code

```js
const a = [
    'hello',
    'world',
].join('\n');
```

### ✅ Example of correct code

```js
const a = montag`
    hello
    world
`;
```

## declare

### ❌ Example of incorrect code

```js
const a = montag`
    hello
    world
`;
```

### ✅ Example of correct code

```js
import montag from 'montag';

const a = montag`
    hello
    world
`;
```

## convert-default-to-named

Checkout in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/729cfa698dd42d2f5a70d6646af37942/c908d7e03a986f39973a66e3899be3ce7e9bc9ba).

### ❌ Example of incorrect code

```js
import montag from 'montag';
```

### ✅ Example of correct code

```js
import {montag} from 'montag';
```

## remove-useless-space

Checkout in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/fab78f67eb09a050e8517e5db27a0b38/e086519f13dce90899a5d6a9123c6919a6a73a9c).

### ❌ Example of incorrect code

```js
const a = montag`.
    hello
`;
```

### ✅ Example of correct code

```js
const a = montag`
    hello
`;
```

## License

MIT
