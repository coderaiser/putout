# @putout/cli-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/cli-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/cli-filesystem "npm"

API to lint filesystem.

## Install

```
npm i @putout/cli-filesystem
```

## API

### `renameFile(from: string, to: string)`

```js
renameFile('/hello/world.txt', '/hello/hello.txt');
```

### `removeFile(filename: string)`

```js
removeFile('/hello/world.txt');
```

### `copyFile(from: string, to: string)`

```js
copyFile('/hello/world.txt', '/hello/hello.txt');
```

### `createDirectory(name: string)`

```js
createDirectory('/hello/world');
```

### `readFileContent(name: string)`

```js
readFileContent('/hello/world');
// returns
'hello';
```

### `writeFileContent(name: string, content: string)`

If parent directory not exists - creates it.

```js
writeFileContent('/hello/world', 'hello');
readFileContent('/hello/world');
// returns
'hello';
```

## License

MIT
