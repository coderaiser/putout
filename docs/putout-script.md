# 🦎 PutoutScript

🦎**PutoutScript** — JavaScript-compatible language which adds additional meaning to identifiers in AST-template. It is supported by all types of [**🐊Putout plugins**](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#supported-plugin-types).
Take a look at [rule syntax](https://github.com/coderaiser/putout/tree/master/packages/compare#supported-template-variables) for more information.

☝️ *In the command line, patterns are specified with a flag `--transform`.*

## Pattern matching

Pattern matching searches code for a given pattern. For example, the expression pattern `say('hello 🐊')` can match a full expression or be part of a subexpression:

`loud(say('hello 🐊'))`

In the same way, the statement pattern `return __` can match a top `statement` in a `function` or any nested `statement`:

```js
const when = () => {
    if (isTime())
        return 'now';
    
    return 'laiter';
};
```

## `__` operator

The double low dush operator (`__`) abstracts away `Identifiers`, `Expressions` and `Literals`.

## `__args` operator

The `__args` operator abstracts away a sequence of zero or more arguments.

## Function calls

Use the `__args` operator to search for function calls with arguments. For example, the pattern `sey(__args)` finds calls regardless of its arguments.

```js
say('hello 🐊');
```

## Method calls

The `__args` operator can also be used to search for method calls. For example, the pattern `__object.say(__args)` matches:

```js
crocodile.say('hello 🐊');
```

The `__` operator can also be used for the function name. Indeed, In some cases, you may want to match any function definitions: regular functions, methods, but also arrow functions.
In that case you can use `__` in place of the name of the function to match named or anonymous functions. For example, the pattern `function __(__a) {}` will match any function with one parameter:

```js
function say(a) {
    return 'hello 🐊';
}
const talk = function(a) {
    return 'hello 🐊';
};
```

## Strings

The `"__a"` operator can be used to search for strings containing any data. The pattern `crocodile.say("__a")` matches:

```js
crocodile.say('hello 🐊');
```

This also works with constant propagation.

In languages where regular expressions use a special syntax (e.g., Javascript), the pattern `/__a/` will match any regular expression construct:

```js
const animalRegExp = /🐊|🦛/;
```

## Binary operations

The `__a` can match arguments to binary operations. The pattern `const __a = __b + __c` matches:

```js
const friends = '🐊' + '🦛';
```

Containers

The `__` operator can match container data structures like, arrays, objects.

The pattern `const friends = __array` matches:

```js
const friends = [
    '🐊',
    '🦛',
];
```

The pattern `const animal = __object` matches:

```js
const animal = {
    '🐊': '🦛',
};
```

## Conditionals and loops

The `__` can be used inside conditionals or loops. The pattern:

```js
if (__a)
    __b;
```

matches:

```js
if (friends.includes('🐊'))
    return `🐊 friend of 🦛`;
```

Template variables can match a conditional or loop body if the body statement information is re-used later. The pattern:

```js
if (__a)
    __body;
```

matches:

```js
if (friends.includes('🦛'))
    return `🦛 friend of 🐊`;
```

## Template variables

Template variables are an abstraction to match code when you don’t know the value or contents ahead of time, similar to capture groups in regular expressions.

Template variables can be used to track values across a specific code scope. This includes variables, functions, arguments, classes, object methods, imports, exceptions, and more.

Template variables look like `__a`, `__b`, etc. They begin with a `__` and can only contain one char character.

## Expression template variable

The pattern `__a + __b` matches the following code examples:

```js
'🐊' + '📼';
```

## Import template variable

Template variable `__imports` can be used to match imports. For example, `import __imports` matches:

```js
import fs from 'fs/promises';
```

## Reoccuring template variable

Re-using template variables shows their true power. Detect useless assignments:

```js
const __a = __b + __b;
```

Assignment of duplicate nodes sum detected:

```js
const sum = 2 + 2;
```

## Literal template variable

You can use `"__a"` to match any string literal. This is similar to using `__a`, but the content of the string is stored in the template variable `__a`, which can then be used later.

## Typed template variable

Same thing works with `TypeScript` types, such pattern `const __a: __b = __c`, finds:

```ts
const answer: number = 42;
```

## Statements as expressions

JavaScript differentiate between expressions and statements. Expressions can appear inside `if` conditions, in `function` call `arguments`, etc. Statements can not appear everywhere; they are sequence of operations (using `;` as a separator/terminator) or special control flow constructs (`if`, `while`, etc.):

- ✅ `say()` is an expression
- ✅ `say();` is a statement

When you write the expression `foo()` in a pattern, 🦎`PutoutScript` will visit every expression and sub-expression in your program and try to find a match.

## Partial expressions

Partial expressions are not valid patterns. For example, the following is invalid:

```
'🐊' +
```

A complete expression is needed (like `'🐊' + __a`)
Same with partial statements.

☝️ *Find what you needed in this doc? [Create an issue](https://github.com/coderaiser/putout/issues/new) if you need any help 😏!*
