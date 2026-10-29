# @putout/operator-watermark [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/operator-watermark.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/operator-watermark "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) operator adds ability to use watermark.

## Install

```
npm i putout @putout/operator-watermark
```

## API

```js
import {watermark} from '@putout/operator-watermark';

watermark.init();

if (!watermark.has())
    watermark.add();

clearWatermark(node);
```

## License

MIT
