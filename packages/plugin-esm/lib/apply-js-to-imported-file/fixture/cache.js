__putout_processor_filesystem([
    '/',
    ['/package.json', `{
        "type": "commonjs"
    }`],
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
        import {isPrev} from '../is.cjs';
    `],
    ['/lib/tokenize/expressions/rest-element.js', `
        import {isPrev} from '../is.cjs';
    `],
]);
