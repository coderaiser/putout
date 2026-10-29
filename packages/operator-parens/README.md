# @putout/operator-parens [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-parens.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-parens "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint parens.

## Install

```
npm i putout @putout/operator-parens
```

## API

### `addParens(path: Path): Path`

Add parens around expression depending on used `printer`:

- ✅ set `node.extra.parenthesized: true` when `@putout/printer` used;
- ✅ set add `ParenthesizedExpression` or `TSParenthesizedType` when `babel` used;

```js
import {operator} from 'putout';

const {addParens} = operator;

addParens(path);
```

### `removeParens(path: Path): Path`

Remove parens around expression depending on used `printer`:

- ✅ set `node.extra.parenthesized: false` when `@putout/printer` used;
- ✅ remove `ParenthesizedExpression` or `TSParenthesizedType` when `babel` used;

```js
import {operator} from 'putout';

const {removeParens} = operator;

removeParens(path);
```

### `hasParens(path: Path): Boolean`

Check if `path` has parens around expression depending on used `printer`:

- ✅ checks `node.extra.parenthesized` when `@putout/printer` used;
- ✅ check if parent node type is `ParenthesizedExpression` or `TSParenthesizedType` when `babel` used;

```js
import {operator} from 'putout';

const {hasParens} = operator;

hasParens(path);
```

## License

MIT
