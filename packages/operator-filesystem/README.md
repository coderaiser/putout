# @putout/operator-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-filesystem "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to lint filesystem.

## Install

```
npm i putout @putout/operator-filesystem
```

## API

### renameFile(filePath: Path, name: string)

```js
const montag = require('montag');
const {
    parse,
    print,
    operator,
} = require('putout');

const {filesystem} = operator;

const ast = parse(montag`
    putout_processor_filesystem({
        "type": "directory",
        "filename": "/hello",
        "files": []
    });
`);

const [filePath] = findFiles(ast, 'hello');

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
