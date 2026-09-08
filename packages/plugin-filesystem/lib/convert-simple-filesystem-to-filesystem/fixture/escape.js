__putout_processor_filesystem(["/", "/plugin-variables/", [
    "/plugin-variables/README.md",
    `
# @putout/plugin-cloudcmd [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-cloudcmd.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-cloudcmd "npm"

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to transform to new [Cloud Commander](https://cloudcmd.io) API.

## Install

\`\`\`
npm i putout @putout/plugin-cloudcmd -D
\`\`\`

## Rules

- ✅ [apply-init-module](#apply-init-module);
- ✅ [convert-io-mv-to-io-move](#convert-io-mv-to-io-move);

## Config

\`\`\`json
{
    "rules": {
        "cloudcmd/apply-init-module": "on",
        "cloudcmd/convert-io-mv-to-io-move": "on",
    },
    "plugins": {
        "cloudcmd": "on"
    }
}
\`\`\`

# convert-io-mv-to-io-move

## ❌ Example of incorrect code

\`\`\`js
await IO.mv({
    from: dirPath,
    to: mp3Dir,
    names: mp3Names,
});
\`\`\`

## ✅ Example of correct code

\`\`\`js
await IO.move(dirPath, mp3Dir, mp3Names);
\`\`\`


# apply-init-module

Check out in 🐊[Putout Editor](https://putout.cloudcmd.io/#/gist/c36edca65befaf11028c3f0863528a8a/e90bd5a9c6423c5e64c44f00bd6c204c695904a4).

## ❌ Example of incorrect code

\`\`\`js
CloudCmd.EditFileVim = exports;
CloudCmd[NAME] = exports;
\`\`\`

## ✅ Example of correct code

\`\`\`js
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
\`\`\`

## License

MIT
`
]]);
