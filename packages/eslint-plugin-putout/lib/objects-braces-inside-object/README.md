# keep braces on the same line as brackets (object-braces-inside-object)

## Rule Details

Examples of **incorrect** code for this rule:

```js
const expected = {
    hello: {world: 'x'},
};
```

Examples of **correct** code for this rule:

```js
const expected = {
    hello: {
        world: 'x',
    },
};
```
