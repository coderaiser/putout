# @putout/operator-regexp [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-regexp.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-regexp "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator operator adds methods that simplifies JSX transformations.

## Install

```
npm i putout @putout/operator-regexp
```

## API

### hasTagName(path: Path | Node): boolean

Check `tagName` of given `Path`, for next `jsx`:

```jsx
<li>hello</li>;
```

It will work this way:

```js
hasTagName(path, 'li');
// returns
true;
```

### getAttributePath(path: Path, name: string): Path | null

Get `path` of an `attribute`

```js
const classNamePath = getAttributePath(path, 'className');
```

## License

MIT
