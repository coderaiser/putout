# @putout/plugin-css [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-css.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-css "npm"

> Cascading Style Sheets (CSS) is a stylesheet language used to describe the presentation of a document written in HTML.
>
> (c) [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to improve css. *Not bundled*.

## Install

```
npm i @putout/plugin-css -D
```

## Rules

- ✅ [apply-shorthand](#apply-shorthand)

## Config

```json
{
    "rules": {
        "css/apply-shorthand": "on"
    }
}
```

## apply-shorthand

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/c27bb67e494b72a72e71d2a9f5545956/7c72513810929dacaf4ed06d2b7d2d0402340407).

### ❌ Example of incorrect code

```css
.bar {
    margin: 1px 1px 1px 1px;
}
```

### ✅ Example of correct code

```css
.bar {
    margin: 1px;
}
```

### Comparison

Linter | Rule | Fix
--------|-------|------------|
🐊 **Putout** | [`css/apply-shorthand`](https://github.com/coderaiser/putout/tree/master/packages/plugin-css#apply-shorthand) | ✅
🤵🏻‍♂️ **Stylelint** | [`shorthand-property-no-redundant-values`](https://stylelint.io/user-guide/rules/shorthand-property-no-redundant-values/) | ✅

## License

MIT
