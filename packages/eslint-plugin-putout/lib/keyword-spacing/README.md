# keyword-spacing

When 🐊[**Putout**](https://github.com/coderaiser/putout) removes unused variable in `catch` [eslint keyword spacing](https://eslint.org/docs/rules/keyword-spacing) can't handle [optional catch binding](https://github.com/tc39/proposal-optional-catch-binding) correctly. This rule adds spaces around `catch`.

Part of [**eslint-plugin-putout**](https://github.com/coderaiser/putout/tree/master/packages/eslint-plugin-putout#rules).

## ❌ Example of incorrect code

```js
try{
} catch{
}

try {
}catch{
}

try {
}catch(error) {
}

if(a) {
}

for(i = 0; i < n; i++) {}

for(x of y) {}

async () => {
    for await(x of y) {}
};
```

## ✅ Example of correct code

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
