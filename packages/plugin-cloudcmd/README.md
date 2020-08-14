# @putout/plugin-cloudcmd [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL]

[NPMIMGURL]:                https://img.shields.io/npm/v/@putout/plugin-cloudcmd.svg?style=flat&longCache=true
[NPMURL]:                   https://npmjs.org/package/@putout/plugin-cloudcmd"npm"

[DependencyStatusURL]:      https://david-dm.org/coderaiser/putout?path=packages/plugin-cloudcmd
[DependencyStatusIMGURL]:   https://david-dm.org/coderaiser/putout.svg?path=packages/plugin-cloudcmd

`putout` plugin adds ability to transform to new [Cloud Commander](https://cloudcmd.io) API.

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
        "cloudcmd/convert-io-mv-to-io-move": "on"
    }
}
```

# convert-io-mv-to-io-move

## ❌ Incorrect code example

```js
await IO.mv({
    from: dirPath,
    to: mp3Dir,
    names: mp3Names,
});
```

## ✅ Correct code Example

```js
await IO.move(dirPath, mp3Dir, mp3Names);
```

# convert-io-cp-to-io-copy

## ❌ Incorrect code example

```js
await IO.cp({
    from: dirPath,
    to: mp3Dir,
    names: mp3Names,
});
```

## ✅ Correct code Example

```js
await IO.copy(dirPath, mp3Dir, mp3Names);
```


## License

MIT

