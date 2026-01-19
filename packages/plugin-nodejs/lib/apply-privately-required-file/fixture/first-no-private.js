__putout_processor_filesystem([
    '/',
    ['/package.json', `
        {
            "imports": {
                "#is": {
                    "default": "./lib/tokenize/is.js"
                }
            }
        }
    `],
    '/lib/',
    '/lib/tokenize/',
    '/lib/tokenize/statements/',
    '/lib/tokenize/statements/variable-declaration/',
    ['/lib/tokenize/statements/variable-declaration/package.json', '{}'],
    ['/lib/tokenize/statements/variable-declaration/variable-declaration.js', `
        const {isPrev} = require('../../is.js');
    `],
    ['/lib/tokenize/is.js', `
        export const isPrev = (path) => {
            const next = path.getPrevSibling();
            return next.node;
        };
    `],
    '/lib/tokenize/expressions/',
    ['/lib/tokenize/expressions/spread-element.js', `
        const {isPrev} = require('../is.js');
    `],
]);
