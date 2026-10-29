# @putout/plugin-docker [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-docker.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-docker "npm"

> A Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image. This page describes the commands you can use in a Dockerfile.
>
> (c) [docker.com](https://docs.docker.com/reference/dockerfile/)

🐊[**Putout**](https://docker.com/coderaiser/putout) plugin helps with `Dockerfile`.

## Install

```
npm i @putout/plugin-docker -D
```

## Rules

- ✅ [convert-maintainer-to-label](#convert-maintainer-to-label);

## Config

```json
{
    "rules": {
        "docker/convert-maintainer-to-label": "on"
    }
}
```

## convert-maintainer-to-label

> The `MAINTAINER` instruction, used historically for specifying the author of the Dockerfile, is deprecated. To set author metadata for an image, use the `org.opencontainers.image.authors` [OCI label](https://github.com/opencontainers/image-spec/blob/main/annotations.md#pre-defined-annotation-keys).
>
> (c) [docker.com](https://docs.docker.com/reference/build-checks/maintainer-deprecated/)

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/e8ba5e086a6bd2e33a8782c25b228100/e4cc634582c83ffb3876932be19505946c12226e).

```diff
-MAINTAINER hello
+LABEL hello
```

## License

MIT
