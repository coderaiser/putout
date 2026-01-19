__putout_processor_filesystem([
    '/',
    ['/package.json', `
        {
            "imports": {
                "#hello-world-long": {
                    "default": "./lib/tokenize/expressions/is.js"
                }
            }
        }
    `],
    '/lib/',
    '/lib/tokenize/',
    '/lib/tokenize/expressions/',
    ['/lib/tokenize/expressions/is.js', `
        export const isPrev = (path) => {
            const next = path.getPrevSibling();
            return next.node;
        };
    `],
    '/lib/tokenize/expressions/',
    ['/lib/tokenize/expressions/spread-element.js', `
        const {isPrev} = require('./is.js');
    `],
]);
