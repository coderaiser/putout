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

## License

MIT
