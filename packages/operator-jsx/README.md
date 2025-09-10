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

### getAttributeNode(path: Path|Node, name: string): Node | null

Get `node` of an `attribute`

```js
const classNameNode = getAttributeNode(node, 'className');
```

### getAttributeValue(path: Path | Node, name: string): string

Get `value` of an `attribute`

```js
const className = getAttributeValue(node, 'className');
```

### addAttributeValue(path: Path | Node, name: string, value: string)

Add `value` to `attribute`

```js
addAttributeValue(node, 'className', 'hello');
```

### removeAttributeValue(path: Path | Node, name: string)

Remove `attribute` value:

```js
removeAttributeValue(node, 'className', 'hello');
```

Works this way:

```diff
-<section className="hello world"/>
+<section className="world"/>
```

### setAttributeValue(path: Path | Node, name: string, value: string)

Set `attribute` value:

```js
setAttributeValue(node, 'className', 'hello');
```

Works this way:

```diff
-<section className="world"/>
+<section className="hello"/>
```

## License

MIT
