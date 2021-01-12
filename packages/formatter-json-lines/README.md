# @putout/putout-formatter-json-lines [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/formatter-json-lines.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/formatter-json-lines "npm"
[DependencyStatusURL]: https://david-dm.org/coderaiser/putout?path=packages/formatter-json-lines
[DependencyStatusIMGURL]: https://david-dm.org/coderaiser/putout.svg?path=packages/formatter-json-lines

`putout` formatter output [json lines](https://jsonlines.org/).

## Install

```
npm i putout @putout/formatter-json-lines
```

## Usage

```sh
putout --format json-lines lib
```

Result example:

```
 {"name":"hello.js","source":"const t = 'hello';\n\n","places":[{"rule":"remove-unused-variables","message":"\"t\" is defined but never used","position":{"line":1,"column":6}}],"index":0,"count":2,"filesCount":1,"errorsCount":1}
 {"name":"world.js","source":"const t = 'world';\n\n","places":[{"rule":"remove-unused-variables","message":"\"t\" is defined but never used","position":{"line":1,"column":6}}],"index":1,"count":2,"filesCount":2,"errorsCount":2}
```

## License

MIT
