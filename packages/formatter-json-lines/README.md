# @putout/formatter-json-lines [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/formatter-json-lines.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/formatter-json-lines "npm"

> **JSON Lines** is a convenient format for storing structured data that may be processed one record at a time. It works well with unix-style text processing tools and shell pipelines. It's a great format for log files. It's also a flexible format for passing messages between cooperating processes.
>
> (c) [jsonlines.org](https://jsonlines.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) formatter output **JSON Lines**.

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
