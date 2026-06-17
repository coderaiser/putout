# @putout/processor-markdown [![NPM version][NPMIMGURL]][NPMURL]

[NPMIMGURL]: https://img.shields.io/npm/v/@putout/processor-markdown.svg?style=flat&longCache=true
[NPMURL]: https://npmjs.org/package/@putout/processor-markdown "npm"

> **Markdown**, the simple and easy-to-use markup language you can use to format virtually any document.
>
> (c) [markdownguide.org](https://www.markdownguide.org/)

🐊[**Putout**](https://github.com/coderaiser/putout) processor adds ability to get **JavaScript**, **JSX**, **JSON** and **TypeScript** code from **Markdown** files.

## Install

```
npm i @putout/processor-markdown -D
```

## Config

```json
{
    "processors": ["markdown"]
}
```

## Usage

Processor converts `markdown` to JavaScript, it looks like this.

```yaml
# hello
```

Became:

```js
__putout_processor_markdown([
    header(1, 'hello'),
]);
```

### Writing Putout Plugins for Markdown

#### The core idea

Under the hood, `@putout/processor-markdown` uses a small library called [`happy-mark`](https://github.com/coderaiser/happy-mark) to turn your document into nested function calls. A heading becomes a call to `heading(...)`, a paragraph becomes `paragraph(...)`, a link becomes `link(...)`, and so on. For example, this Markdown:

```md
# Hello world

Some *emphasis* and a [link](https://example.com).
```

turns into this JavaScript:

```js
heading(1, 'Hello world');
paragraph('Some ', italic('emphasis'), ' and a ', link('link', 'https://example.com'), '.');
```

## Rules

Checkout `markdown`-related rules in [`@putout/plugin-markdown`](https://github.com/coderaiser/putout/tree/master/packages/plugin-markdown)

## License

MIT
