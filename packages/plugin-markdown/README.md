# @putout/plugin-markdown [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/plugin-markdown.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/plugin-markdown "npm"

> Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.
>
> (c) [markdownguide.org](https://www.markdownguide.org/getting-started/)

🐊[**Putout**](https://github.com/coderaiser/putout) plugin adds ability to improve markdown.

## Install

```
npm i @putout/plugin-markdown -D
```

## Rules

- ✅ [merge-heading-spaces](#merge-heading-spaces);

## Config

```json
{
    "rules": {
        "markdown/merge-heading-spaces": "on"
    }
}
```

### merge-heading-spaces

Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/f06796710b86267ac94715381e5d2217/8e05a45fe260926959ba4289c7d692b0597c94e1).

## ❌ Example of incorrect code

```markdown
# hello  world
```

## ✅ Example of correct code

```markdown
# hello world
```

## License

MIT
