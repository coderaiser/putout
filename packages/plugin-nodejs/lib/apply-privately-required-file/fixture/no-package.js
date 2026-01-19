__putout_processor_filesystem([
    '/',
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
        const {hasTrailingComment} = require('../is.js');
    `],
]);

__putout_processor_filesystem([
    '/hello/',
    ['/hello/is.js', `
        export const isPrev = (path) => {
            const next = path.getPrevSibling();
            return next.node;
        };
    `],
    ['/hello/spread-element.js', `
        const {hasTrailingComment} = require('./is.js');
    `],
]);
