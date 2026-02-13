# @putout/plugin-socket-io [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-socket-io-hooks.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-socket-io-hooks "npm"

> The library for web and native user interfaces
>
> (c) [socket-io.dev](https://socket-io.dev)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin helps to migrate to new version of [socket.io](https://socket.io/). *Not bundled*.

## Install

```
npm i putout @putout/plugin-socket-io-hooks -D
```

Add `.putout.json` with:

```json
{
    "plugins": ["socket-io"]
}
```

## Rules

- ✅ [convert-io-listen-to-new-server](#convert-io-listen-to-new-server);
- ✅ [declare](#declare);

## Config

```json
{
    "rules": {
        "socket-io/convert-io-listen-to-new-server": "on",
        "socket-io/declare": "on"
    }
}
```

## declare

```diff
+import {Server} from 'socket.io';
new Server(server);
```

## convert-io-listen-to-new-server

ESM has no `listen` exported, only `Server`. So it is better to change it to simplify migration.
Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/5348f80f9fea90155ca3a91a56bad498/7fd768e92dd2effd40cd7c1491bdbfc2cd5bff5c).

### ❌ Example of incorrect code

```
io.listen(server);
```

### ✅ Example of correct code

```js
new Server(server);
```

## License

MIT
