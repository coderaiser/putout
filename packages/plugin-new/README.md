# @putout/plugin-new [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-new.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-new "npm"

> The `new` operator lets developers create an instance of a user-defined object type or of one of the built-in object types that has a constructor function.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to add missing and remove useless operator `new`.

## Install

```
npm i @putout/plugin-new
```

## Rule

```json
{
    "rules": {
        "new/remove-useless": "on",
        "new/add-missing": "on"
    }
}
```

## remove-useless

Operator `new` has no sense for `Boolean`, `String`, `Number`, `Object`, `RegExp`, `Math`, `Reflect`, `Error`, `TypeError`:

> Thus the function call `Error(…)` is equivalent to the object creation expression `new Error(…)` with the same arguments.
>
> (c) https://262.ecma-international.org/12.0/#sec-error-constructor

And [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol), [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt) cannot be used with `new`, as it is primitive.

### ❌ Example of incorrect code

```js
new Error('Something whent wrong');
new new Boolean()();
```

### ✅ Example of correct code

```js
Error('Something whent wrong');
Boolean();
```

## add-missing

> The `Set` constructor lets you create Set objects that store unique values of any type, whether primitive values or object references.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set)

Missing operator `new` should be added since built-in objects:

- `Set`;
- `WeakSet`;
- `Map`;
- `WeakMap`;
- `Int8Array`;
- `Uint8Array`;
- `Uint8ClampedArray`;
- `Int16Array`;
- `Uint16Array`;
- `Int32Array`;
- `Uint32Array`;
- `Float32Array`;
- `Float64Array`;
- `BigInt64Array`;
- `BigUint64Array`;

Produces [`TypeError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypeError) when called without `new`:

```
Uncaught TypeError: Constructor Set requires 'new'
```

### ❌ Example of incorrect code

```js
const map = Map();
```

### ✅ Example of correct code

```js
const map = new Map();
```

## Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`remove-useless-new`](https://github.com/coderaiser/putout/tree/master/packages/plugin-remove-useless-new#readme)| ✅
⏣ **ESLint** | [`no-new-wrappers`](https://eslint.org/docs/rules/no-new-wrappers) | ❌
⠀| [`no-new-object`](https://eslint.org/docs/rules/no-new-object) | ❌
⠀| [`no-array-constructor`](https://eslint.org/docs/rules/no-array-constructor) | ❌
⠀| [`no-new-symbol`](https://eslint.org/docs/rules/no-new-symbol) | ❌
⠀| [`no-new-native-constructor`](https://eslint.org/docs/rules/https://eslint.org/docs/latest/rules/no-new-native-nonconstructor) | ❌

## License

MIT
