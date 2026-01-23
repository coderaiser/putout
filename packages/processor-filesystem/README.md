# @putout/processor-filesystem [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/processor-filesystem.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/processor-filesystem "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) processor adds support of `.filesystem.json` files.

## Install

```
npm i @putout/processor-filesystem -D
```

## Usage

```json
{
    "processors": ["filesystem"]
}
```

## API

### `create(options)`

```
import {create} from '@putout/process-filesystem/create'

const {branch, merge} = create({
    cli: true,
    maybeSimple: true,
});
```

## License

MIT
