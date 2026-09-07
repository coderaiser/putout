__putout_processor_filesystem(["/", "/plugin-variables/", [
    "/plugin-variables/README.md",
    `
## Rules

- ✅ [remove-useless-promisify](#remove-useless-promisify);
- ✅ [apply-privately-required-to-file](#apply-privately-required-to-file);

## remove-useless-promisify

> Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.
>
> (c) [nodejs.org](https://nodejs.org/dist/latest-v21.x/docs/api/util.html#utilpromisifyoriginal)

Remove useless [\`promisify()\`](https://nodejs.org/dist/latest-v21.x/docs/api/util.html#utilpromisifyoriginal). Checkout in 🐊[**Putout Editor**](https://putout.cloudcmd.io/#/gist/31000391865a36dfec2f8db5c2e98601/ce8867f83a84ecbe073637b9ceae58a443817187).

### ❌ Example of incorrect code

\`\`\`js
export const readSize = promisify(async (dir, options, callback) => {});
\`\`\`

### ✅ Example of correct code

\`\`\`js
export const readSize = async (dir, options, callback) => {};
\`\`\`

## apply-privately-required-to-file

> Entries in the imports field must be strings starting with \`#\`.
> Package imports permit mapping to external packages.
> This field defines subpath imports for the current package.
>
> (c) [nodejs.org](https://nodejs.org/api/packages.html#imports)

Let's consider file structure:

\`\`\`
/
|-- package.json {"imports": {"#is": {"default": "./lib/tokenize/is.js"}}}
|-- lib/
|  \`-- tokenize/
|     \`-- is.js "export const isPrev = () => {}"
|     \`-- expressions/
        \`-- spread-element.js "const {isPrev} = require('../is.js')"
\`\`\`

In this case \`spread-element.js\` can be fixed:

### ❌ Example of incorrect code

\`\`\`js
const {isPrev} = require('../is.js');
\`\`\`

### ✅ Example of correct code

\`\`\`js
const {isPrev} = require('#is');
\`\`\`
`
]]);
