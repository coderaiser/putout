# @putout/plugin-cloudcmd [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-cloudcmd.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-cloudcmd"npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new [Cloud Commander](https://cloudcmd.io) API.

## Install

```
npm i putout @putout/plugin-cloudcmd -D
```

Add `.putout.json` with:

```json
{
    "plugins": {
        "cloudcmd": "on"
    }
}
```

## Rules

```json
{
    "rules": {
        "cloudcmd/convert-io-mv-to-io-move": "on",
        "cloudcmd/convert-io-cp-to-io-copy": "on",
        "cloudcmd/convert-load-dir-to-change-dir": "on"
    }
}
```

# convert-io-mv-to-io-move

## ❌ Example of incorrect code

```js
await IO.mv({
    from: dirPath,
    to: mp3Dir,
    names: mp3Names,
});
```

## ✅ Example of correct code

```js
await IO.move(dirPath, mp3Dir, mp3Names);
```

# convert-io-cp-to-io-copy

## ❌ Example of incorrect code

```js
await IO.cp({
    from: dirPath,
    to: mp3Dir,
    names: mp3Names,
});
```

## ✅ Example of correct code

```js
await IO.copy(dirPath, mp3Dir, mp3Names);
```

# convert-io-write-to-io-create-directory

## ❌ Example of incorrect code

```js
await IO.write(`${mp3Dir}?dir`);
```

## ✅ Example of correct code

```js
await IO.createDirectory(mp3Dir);
```

# convert-load-dir-to-change-dir

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c840227d624971e9f3a9c5f368f1dd53/9c488f0809b4684a78866bc252a115cf83a65a79).

## ❌ Example of incorrect code

```js
await CloudCmd.loadDir({
    path: '/',
    panel,
});
```

## ✅ Example of correct code

```js
await CloudCmd.changeDir('/', {
    panel,
});
```

## License

MIT
