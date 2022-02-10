# function-declaration-paren-newline

Remove newlines between parens in function declaration. Similar to `ESLint` rule [function-paren-newline](https://eslint.org/docs/rules/function-declaration-paren-newline), but forbids new lines in function declarations and expressions arguments.
Part of [`eslint-plugin-putout`](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Incorrect code example

```js
function f(
    {a, b, c},
) {}

const fn = (
    {a, b, c},
) => {};

regexpTree.traverse(ast, {
    RegExp(
        {node},
    ) {
        const {body} = node;
    },
});
```

## ✅ Correct code example

```js
function f({a, b, c}) {}

const fn = ({a, b, c}) => {};

const fnWithCall = ({a, b, c}) => {
    return x(
        a,
        b,
    );
};

regexpTree.traverse(ast, {
    RegExp({node}) {
        const {body} = node;
    },
});
```
