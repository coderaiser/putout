# 🦎 PutoutScript

> **Among the maxims on Lord Naoshige’s wall there was this one: ”Matters of’ great concern should be treated lightly.”
> Master lttei commented, “Matters of small concern should be treated seriously.”**
>
> **(c) Yamamoto Tsunetomo "Hagakure"**

🦎**PutoutScript** — **JavaScript**-compatible language which adds additional meaning to [`Identifiers`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#identifier) in AST-template. It is supported by all types of [**🐊Putout plugins**](https://github.com/coderaiser/putout/tree/master/packages/engine-runner#supported-plugin-types).
Take a look at [rule syntax](https://github.com/coderaiser/putout/tree/master/packages/compare#supported-template-variables) for more information.

- ☝️ *In the command line, patterns are specified with a flag `--transform`.*
- ☝️ *Read more about AST nodes in [**The Book of AST**](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#the-book-of-ast)*.

## Pattern matching

Pattern matching searches code for a given pattern. For example, the expression pattern `say('hello 🐊')` can match a full expression or be part of a subexpression:

`loud(say('hello 🐊'))`

In the same way, the **Statement Pattern** `return __` can match a [**Statement**](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#expression-and-statement) in a `function` or on any level of nesting:

```js
const when = () => {
    if (isTime())
        return 'now';
    
    return 'later';
};
```

## `__`

The double low dush template value (`__`) abstracts away [`Identifiers`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#identifier), [`Expressions`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#expression-and-statement) and [`Literals`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#literal).

## `__a`

**Linked Value** (`__a`) abstracts away [`Identifiers`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#identifier), [`Expressions`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#expression-and-statement) and [`Literals`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#literal).

## `__args`

The `__args` value abstracts away a sequence of zero or more arguments, for `(__args) => __a`:

```js
(a, b, c) => a + b + c;
```

## `__args__a`

`__args` can be linked. **Linked args** can be used to link to values with the same [`Expressions`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#expression-and-statement), [`Identifiers`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#identifier) or [`Literals`](https://github.com/coderaiser/putout/blob/master/docs/the-book-of-ast.md#literal)): `((__args__a) => __c(__args__a))(__args__b)` will find:

```js
fn(value);
```

But not:

```js
((a) => fn(42))(value);
```

## Function calls

Use the `__args` template value to search for function calls with arguments. For example, the pattern `sey(__args)` finds calls regardless of its arguments.

```js
say('hello 🐊');
```

## Method calls

The `__args` template value can also be used to search for method calls. For example, the pattern `__object.say(__args)` matches:

```js
crocodile.say('hello 🐊');
```

The `__` template value can also be used for the function name. Indeed, In some cases, you may want to match any function definitions: regular functions, methods, but also arrow functions.
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

The `"__a"` template value can be used to search for strings containing any data. The pattern `crocodile.say("__a")` matches:

```js
crocodile.say('hello 🐊');
```

This also works with constant propagation.

T he pattern `/__a/` will match any regular expression construct:

```js
const animalRegExp = /🐊|🦛/;
```

## JSX

There is a base support of JSX in template values, this template `<h1>__a</h1>` will find:

```js
<h1>hello world</h1>;
```

When you need to find one or more children, `<h1>__jsx_children</h1>` will find:

```js
<h1>hello world</h1>;
<h1></h1>;
```

## Binary operations

The `__a` can match arguments to binary operations. The pattern `const __a = __b + __c` matches:

```js
const friends = '🐊' + '🦛';
```

## Containers

The `__array` and `__object` template values can match container data structures like, arrays, objects.

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

The `__` can be used inside conditionals or loops. 🦎 **PutoutScript**:

```js
if (__a)
    __b;
```

matches:

```js
if (friends.includes('🐊'))
    return `🐊 friend of 🦛`;
```

Template variables can match a conditional or loop body if the body statement information is re-used later. 🦎 **PutoutScript**:

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
Template variables can be used to track values across a specific code scope. This includes variables, functions, arguments, classes, object methods, imports and more.

Template variables look like `__a`, `__b`, etc. They begin with a `__` and can only contain one character.

## Expression template variable

🦎 **PutoutScript** `__a + __b` matches the following code examples:

```js
'🐊' + '📼';
```

## Import template variable

Template variable `__imports` can be used to match imports. For example, `import __imports` matches:

```js
import fs from 'node:fs/promises';
```

## Reoccurring template variable

Re-using template variables shows their true power. Detect assignment of sum of duplicate nodes:

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

## Statements and expressions

JavaScript differentiate between expressions and statements. Expressions can appear inside `if` conditions, in `function` call `arguments`, etc. Statements can not appear everywhere; they are sequence of operations (using `;` as a separator/terminator) or special control flow constructs (`if`, `while`, etc.):

- ✅ `say()` is an expression;
- ✅ `say();` is a statement;

When you write the expression `foo()` in a pattern, 🦎`PutoutScript` will visit every expression and sub-expression in your program and try to find a match.

## Partial expressions

Partial expressions are not valid patterns. For example, the following is invalid:

```
'🐊' +
```

A complete expression is needed (like `'🐊' + __a`). Same with partial statements.

☝️ *Find what you needed in this doc? [Create an issue](https://github.com/coderaiser/putout/issues/new) if you need any help 😏!*
