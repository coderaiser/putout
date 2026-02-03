# @putout/plugin-cloudcmd [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-cloudcmd.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-cloudcmd "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new [Cloud Commander](https://cloudcmd.io) API.

## Install

```
npm i putout @putout/plugin-cloudcmd -D
```

## Rules

- ✅ [apply-init-module](#apply-init-module);
- ✅ [convert-io-mv-to-io-move](#convert-io-mv-to-io-move);
- ✅ [convert-io-cp-to-io-copy](#convert-io-cp-to-io-copy);
- ✅ [convert-io-delete-to-io-remove](#convert-io-delete-to-io-remove);
- ✅ [convert-load-dir-to-change-dir](#convert-load-dir-to-change-dir);
- ✅ [convert-arrow-to-declaration](#convert-arrow-to-declaration);

## Config

```json
{
    "rules": {
        "cloudcmd/apply-init-module": "on",
        "cloudcmd/convert-io-mv-to-io-move": "on",
        "cloudcmd/convert-io-cp-to-io-copy": "on",
        "cloudcmd/convert-io-delete-to-io-remove": "on",
        "cloudcmd/convert-load-dir-to-change-dir": "on",
        "cloudcmd/convert-arrow-to-declaration": "on"
    },
    "plugins": {
        "cloudcmd": "on"
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

# convert-io-delete-to-io-remove

## ❌ Example of incorrect code

```js
await IO.delete('/tmp', ['1.txt']);
await IO.delete('/tmp');
```

## ✅ Example of correct code

```js
await IO.remove('/tmp', ['1.txt']);
await IO.remove('/tmp');
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

# apply-init-module

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c36edca65befaf11028c3f0863528a8a/e90bd5a9c6423c5e64c44f00bd6c204c695904a4).

## ❌ Example of incorrect code

```js
CloudCmd.EditFileVim = exports;
CloudCmd[NAME] = exports;
```

## ✅ Example of correct code

```js
CloudCmd.EditFileVim = {
    init,
    show,
    hide,
};
CloudCmd.NAME = {
    init,
    show,
    hide,
};
```

# convert-arrow-to-declaration

Because right now all exported methods saved to global variable on top of a file.

```js
CloudCmd.EditNamesVim = {
    init,
    show,
    hide,
};
```

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/8c21c0599b5d4d7c5faf49f3da604c9e/04a71d323fe1b0c25c1f34635c6f15eff805eff7).

## ❌ Example of incorrect code

```js
export const init = async (hello) => {
    await CloudCmd.EditNames();
};

export const show = () => {
    Events.addKey(listener);
};

export const hide = () => {
    CloudCmd.Edit.hide();
};
```

## ✅ Example of correct code

```js
export async function init(hello) {
    await CloudCmd.EditNames();
}

export function show() {
    Events.addKey(listener);
}

export function hide() {
    CloudCmd.Edit.hide();
}
```

## License

MIT
