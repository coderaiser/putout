# @putout/operator-find-file-up [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-find-file-up.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-find-file-up "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to find file up.

## Install

```
npm i putout @putout/operator-find-file-up
```

## API

```js
import {operator} from 'putout';

const {findFileUp} = operator;
const [directory, filePath] = findFileUp(filePath, 'package.json');
```

## License

MIT
