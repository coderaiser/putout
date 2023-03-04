# @putout/rule-remove-only

🐊[**Putout**](https://github.com/coderaiser/putout) rule adds ability to remove `.only` from any object:

Similar to `remove-only` from [`@putout/plugin-tape`](https://github.com/coderaiser/putout/tree/master/packages/plugin-tape#remove-only), but for any object.

```diff
- hello.only('world', (t) => {
+ hello('world', (t) => {
});
```

# License

MIT
