# @putout/operator-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-filesystem "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint filesystem.

## Install

```
npm i putout @putout/operator-filesystem
```

## API

### `createFile(directoryPath: DirectoryPath, name: string, content?: string): FilePath`

```js
const {operator} = require('putout');
const {findFile, createFile} = operator;

const [dirPath] = findFile(ast, 'hello');
const filePath = createFile(dirPath, 'world.txt', 'hello world');
```

### `createDirectory(directoryPath: DirectoryPath, name: string): DirectoryPath`

```js
const {operator} = require('putout');
const {
    createDirectory,
    findFile,
} = operator;

const [dirPath] = findFile(ast, 'hello');

const newDirectoryPath = createDirectory(dirPath, 'world');
```

### `readDirectory(directoryPath: DirectoryPath): (FilePath | DirectoryPath)[]`

```js
const {operator} = require('putout');
const {
    finedFiles,
    findFile,
    readDirectory,
} = operator;

const [dirPath] = findFile(ast, '/bin');

readDirectory(dirPath);
// returns list of files
[];
```

### `createNestedDirectory(path: FilePath|DirectoryPath, name: string): DirectoryPath`

```js
const {operator} = require('putout');
const {
    createDirectory,
    findFile,
    createNestedDirectory,
} = operator;

const newDirectoryPath = createNestedDirectory(ast, '/hello/world');
```

### `removeEmptyDirectory(DirectoryPath)`

```js
const {operator} = require('putout');
const {
    removeEmptyDirectory,
    createNestedDirectory,
} = operator;

const newDirectoryPath = createNestedDirectory(ast, '/hello/world');

removeEmptyDirectory(newDirectoryPath);
```

### `readDirectory(directoryPath: DirectoryPath): (FilePath | DirectoryPath)[]`

```js
const {operator} = require('putout');
const {
    finedFiles,
    findFile,
    readDirectory,
} = operator;

const [dirPath] = findFile(ast, '/bin');

readDirectory(dirPath);
// returns list of files
[];
```

### `findFile(directoryPath: DirectoryPath, name: string | string[], exclude?: string[]): (FilePath | DirectoryPath)[]`

```js
const {operator} = require('putout');
const {finedFiles, findFile} = operator;

const [filePath] = findFile(ast, 'hello');
```

You can also pass array of file masks:

```js
import {operator} from 'putout';

const {findFile} = operator;
const coupleFiles = findFile(ast, ['*.js', '*.ts']);
```

Or `exclude` some files:

```js
import {operator} from 'putout';

const {findFile, getFilename} = operator;

const coupleFilesWithExcludeArray = findFile(ast, '*.ts', ['*.d.ts']);
```

And even search for a directory:

```js
import {operator} from 'putout';

const {findFile} = operator;
const coupleFiles = findFile(ast, ['/home/coderaiser', '/home/coderaiser/putout']);
```

### `getParentDirectory(path: FilePath | DirectoryPath): FilePath | null`

```js
const {operator} = require('putout');
const {
    createDirectory,
    findFile,
    getParentDirectory,
} = operator;

const [dirPath] = findFile(ast, 'hello');

const newDirectoryPath = createDirectory(dirPath, 'world');

dirPath === getParentDirectory(newDirectoryPath);
// returns
true;
```

### `getRootDirectory(path: FilePath | DirectoryPath): DrectoryPath`

```js
const {operator} = require('putout');
const {
    findFile,
    getRootDirectory,
} = operator;

const [filePath] = findFile(ast, 'hello');

getRootDirectory(dirPath);
```

### `getFilename(path: FilePath | DirectoryPath): string`

```js
const {operator} = require('putout');
const {getFilename} = operator;

const name = getFilename(filePath);
```

### `getFileType(path: FilePath): string`

```js
const {operator} = require('putout');
const {getFilename, getFileType} = operator;

getFileType(filePath);
// returns
'file';
```

### `getFileContent(path: FilePath): [is: boolean, content: string]`

Get `content` property if it exists, use [`readFileContent`](#read-file-content) to read file from **Filesystem**.

```js
const {operator} = require('putout');
const {getFileContent} = operator;

getFileContent(filePath);
// returns
[true, 'hello world'];
```

### `removeFile(filePath: Path)`

```js
const {operator} = require('putout');
const {removeFile} = operator;

removeFile(filePath);
```

### `copyFile(path: FilePath | DirectoryPath, directoryPath: DirectoryPath)`

```js
const {operator} = require('putout');
const {moveFile, copyFile} = operator;

copyFile(filePath, dirPath);
```

### `moveFile(path: FilePath | DirectoryPath, directoryPath: DirectoryPath)`

```js
const {operator} = require('putout');
const {moveFile} = operator;

moveFile(filePath, dirPath);
```

### `readFileContent(filePath: FilePath): string`

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

### `renameFile(path: FilePath | DirectoryPath, name: string)`

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
