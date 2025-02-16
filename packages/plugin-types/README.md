# @putout/plugin-types [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-types.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-types "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to help with transforming code related to types.

## Install

```
npm i putout @putout/plugin-types -D
```

## Rules

- ✅ [apply-is-array](#apply-is-array);
- ✅ [convert-typeof-to-is-type](#convert-typeof-to-is-type);
- ✅ [declare](#declare);
- ✅ [remove-double-negations](#remove-double-negations);
- ✅ [remove-useless-conversion](#remove-useless-conversion);
- ✅ [remove-useless-constructor](#remove-useless-constructor);
- ✅ [remove-useless-typeof](#remove-useless-typeof);

## Config

```json
{
    "rules": {
        "types/declare": "on",
        "types/convert-typeof-to-istype": "on",
        "types/remove-useless-conversion": "on",
        "types/remove-useless-constructor": "on",
        "types/remove-double-negations": "on",
        "types/remove-useless-typeof": "on",
        "types/apply-is-array": "on"
    }
}
```

## declare

Based on [`@putout/operator-declare`](https://github.com/coderaiser/putout/tree/master/packages/operator-declare#putoutoperator-declare-).
Supported assertions:

- `isString`;
- `isEmptyString`;
- `isNumber`;
- `isNumberLike` - checks if `a` can be convert to `Number` from `String`;
- `isFn`;
- `isBool`;
- `isObject`;
- `isUndefined`;
- `isSymbol`;
- `isNull`;
- `isBigInt`;
- `isArray`;
- `isEmptyArray`;
- `isError`;

### ❌ Example of incorrect code

```js
isString('hello');
isNumber('a' - 5);
```

### ✅ Example of correct code

```js
const isString = (a) => typeof a === 'string';
const isNumber = (a) => !Number.isNaN(a) && typeof a === 'number';

isString('hello');

isNumber('a' - 5);
```

When you want to skip some declaration use `dismiss`:

```json
{
    "rules": {
        "types/declare": ["on", {
            "dismiss": ["isString"]
        }]
    }
}
```

## convert-typeof-to-is-type

> The `typeof` operator returns a string indicating the type of the unevaluated operand.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

### ❌ Example of incorrect code

```js
if (typeof a === 'boolean')
    return x;
```

### ✅ Example of correct code

```js
const isBool = (a) => typeof a === 'boolean';

if (isBool(a))
    return x;
```

## remove-useless-conversion

### ❌ Example of incorrect code

```js
const a = !![1].includes(1);
const b = Boolean([1].includes(1));
```

### ✅ Example of correct code

```js
const a = [1].includes(1);
```

## remove-useless-constructor

> Wrapper classes have surprising behaviour, such as `new Boolean(false)` evaluating to `true`.
>
> (c) [Google TypeScript Style Guide](https://google.github.io/styleguide/tsguide.html#primitive-types-wrapper-classes)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to remove useless `constructor`. Use with [`new/remove-useless`](https://github.com/coderaiser/putout/tree/master/packages/plugin-new#readme).

### ❌ Example of incorrect code

```js
const s = String('hello');
const b = Boolean(false);
const n = Number(5);
```

### ✅ Example of correct code

```js
const s = 'hello';
const b = false;
const n = 5;
```

## remove-double-negations

> It is possible to use a couple of **NOT** operators (`!!`) in series to explicitly force the conversion of any value to the corresponding boolean primitive. The conversion is based on the "truthyness" or "falsyness" of the value.
>
> The same conversion can be done through the `Boolean` function.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_NOT)

### ❌ Example of incorrect code

```js
if (!!a)
    console.log('hi');
```

### ✅ Example of correct code

```js
if (a)
    console.log('hi');
```

## remove-useless-typeof

> The `typeof` operator returns a string indicating the type of the unevaluated operand.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

### ❌ Example of incorrect code

```js
typeof typeof 'hello';
```

### ✅ Example of correct code

```js
typeof 'hello';
```

## apply-is-array

> The `Array.isArray()` method determines whether the passed value is an `Array`.
> When checking for `Array` instance, `Array.isArray()` is preferred over `instanceof` because it works through `iframes`.

### ❌ Example of incorrect code

```js
x instanceof Array;
```

### ✅ Example of correct code

```js
const {isArray} = Array;
isArray(x);
```

In case of using `inline` option:

```json
{
    "rules": {
        "types/apply-is-array": ["on", {
            "inline": true
        }]
    }
}
```

`Array.isArray` will be inlined:

```js
Array.isArray(x);
```

## License

MIT

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`types`](https://github.com/coderaiser/putout/tree/master/packages/plugin-types#readme)| ✅
⏣ **ESLint** | [`no-implicit-coercion`](https://eslint.org/docs/rules/no-implicit-coercion) | ✅

## License

MIT
