__putout_processor_markdown([
    heading(2, 'Rules'),
    ul(li('✅ ', link('remove-useless-promisify', 'remove-useless-promisify'), ';'), li('✅ ', link('apply-privately-required-to-file', 'apply-privately-required-to-file'), ';')),
    heading(2, 'apply-privately-required-to-file'),
    blockquote(paragraph('Entries in the imports field must be strings starting with ', code('#'), `
        .
        Package imports permit mapping to external packages.
        This field defines subpath imports for the current package.
    `), paragraph('(c) ', link('nodejs.org', 'https://nodejs.org/api/packages.html#imports'))),
    paragraph('Let\'s consider file structure:'),
    codeblock('', `
        /
        |-- package.json {"imports": {"#is: {"default": "./lib/tokenize/is.js"}}}
        |-- lib/
        |  \`-- tokenize/
        |     \`-- is.js "export const isPrev = () => {}"
        |     \`-- expressions/
                \`-- spread-element.js "const {isPrev} = require('../is.js')"
    `),
    paragraph('In this case ', code('spread-element.js'), ' can be fixed:'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', 'const {isPrev} = require(\'../is.js\');'),
    heading(3, '✅ Example of correct code'),
    codeblock('js', 'const {isPrev} = require(\'#is\');'),
    heading(2, 'remove-useless-promisify'),
    blockquote(paragraph('Takes a function following the common error-first callback style, i.e. taking an (err, value) => ... callback as the last argument, and returns a version that returns promises.'), paragraph('(c) ', link('nodejs.org', 'https://nodejs.org/dist/latest-v21.x/docs/api/util.html#utilpromisifyoriginal'))),
    paragraph('Remove useless ', link(code('promisify()'), 'https://nodejs.org/dist/latest-v21.x/docs/api/util.html#utilpromisifyoriginal'), '. Checkout in 🐊', link(bold('Putout Editor'), 'https://putout.cloudcmd.io/#/gist/31000391865a36dfec2f8db5c2e98601/ce8867f83a84ecbe073637b9ceae58a443817187'), '.'),
    heading(3, '❌ Example of incorrect code'),
    codeblock('js', 'export const readSize = promisify(async (dir, options, callback) => {});'),
    heading(3, '✅ Example of correct code'),
    codeblock('js', 'export const readSize = async (dir, options, callback) => {};'),
]);
