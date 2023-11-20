# @putout/operator-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-filesystem "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint filesystem.

## Install

```
npm i putout @putout/operator-filesystem
```

## API

## `createDirectory(directoryPath: FilePath, name: string): FilePath`

```js
const {operator} = require('putout');
const {
    createDirectory,
    findFile,
} = operator;

const [dirPath] = findFile(ast, 'hello');

const newDirectoryPath = createDirectory(dirPath, 'world');
```

## `findFile(path: Path, name: string): FilePath[]`

```js
const {operator} = require('putout');
const {finedFiles, findFile} = operator;

const [filePath] = findFile(ast, 'hello');
```

### `getFilename(path: FilePath)`

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

### `moveFile(filePath: FilePath, dirPath: FilePath)`

```js
const {operator} = require('putout');
const {moveFile} = operator;

moveFile(filePath, dirPath);
```

### `readFileContent(filePath: FilePath)`

```js
const {operator} = require('putout');
const {readFileContent} = operator;

readFileContent(filePath);
// returns
'hello';
```

### `writeFileContent(filePath: FilePath, content: string)`

```js
const {operator} = require('putout');
const {
    writeFileContent,
    readFileContent,
} = operator;

writeFileContent(filePath, 'hello');
readFileContent(filePath);
// returns
'hello';
```

### `renameFile(filePath: FilePath, name: string)`

```js
const {operator} = require('putout');
const {renameFile, findFile} = operator;

const [filePath] = findFile(path, 'README.md');

renameFile(filePath, 'readme.md');
```

this is the same as:

```
renameFile(filePath, '/any/path/here/readme.md');
```

Since `basename` is used.

> The `path.basename()` method returns the last portion of a path, similar to the Unix basename command. Trailing directory separators are ignored.
>
> (c) [nodejs.org](https://nodejs.org/api/path.html#pathbasenamepath-suffix)

To move file use [`moveFile()`](#movefilefilepath-filepath-dirpath-filepath).

## Example

```js
const montag = require('montag');
const {
    parse,
    print,
    operator,
} = require('putout');

const {renameFile, findFile} = operator;

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
