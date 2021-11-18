# Use spaces around "catch" (keyword-spacing)

When `putout` removes unused variable in `catch` [eslint keyword spacing](https://eslint.org/docs/rules/keyword-spacing) can't handle [optional catch binding](https://github.com/tc39/proposal-optional-catch-binding) correctly.

## Rule Details

This rule aims to add spaces around `catch`

Examples of **incorrect** code for this rule:

```js
try {
} catch {
}

try {
} catch {
}

try {
} catch(error) {
}

if(a) {
}

for(i = 0; i < n; i++) {}

for(x of y) {}

async () => {
    for await(x of y) {}
};
```

Examples of **correct** code for this rule:

```js
try {
}catch {
}

try {
} catch(error) {
}

if (a) {
}

for (i = 0; i < n; i++) {}

for (x of y) {}

async () => {
    for await (x of y) {}
};
```
