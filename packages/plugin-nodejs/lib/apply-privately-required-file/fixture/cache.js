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
    ['/lib/tokenize/expressions/array-expression.js', `
        const {isPrev}  = require('../is.js');
    `],
]);

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
    ['/lib/tokenize/expressions/rest-element.js', `
        const {isPrev} = require('../is.js');
    `],
    ['/lib/tokenize/expressions/array-expression.js', `
        const {isPrev} = require('../is.js');
    `],
]);
