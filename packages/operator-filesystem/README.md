# @putout/operator-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-filesystem "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint filesystem.

## Install

```
npm i putout @putout/operator-filesystem
```

## API

## `findFile(path: Path, name: string)`

```js
const {operator} = require('putout');
const {finedFiles} = operator;

const [filePath] = findFile(ast, 'hello');
```

### `getFilename(path: Path)`

```js
const {operator} = require('putout');
const {getFilename} = operator;

const name = getFilename(filePath);
```

### `removeFile(filePath: Path)`

```js
const {operator} = require('putout');
const {removeFile} = operator;

removeFile(filePath);
```

### `renameFile(filePath: Path, name: string)`

```js
const montag = require('montag');
const {
    parse,
    print,
    operator,
} = require('putout');

const {renameFile} = operator;

const ast = parse(montag`
    putout_processor_filesystem({
        "type": "directory",
        "filename": "/hello",
        "files": []
    });
`);

const [filePath] = findFile(ast, 'hello');

renameFile(filePath, 'world');

print(ast);
// returns
`
putout_processor_filesystem({
    "type": "directory",
    "filename": "/hello",
    "files": []
});
`;
```

## License

MIT