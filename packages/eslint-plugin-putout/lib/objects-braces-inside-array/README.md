# Keep braces on the same line as brackets (`object-braces-inside-array`)

## Rule Details

Examples of **incorrect** code for this rule:

```js
const expected = [
    {
        hello: 'world',
    },
    {
        how: 'come',
    },
];
```

Examples of **correct** code for this rule:

```js
const expected = [{
    hello: 'world',
}, {
    how: 'come',
}];
```
