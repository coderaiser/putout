__putout_processor_filesystem([
    '/',
    ['/package.json', `{
        "type": "module"
    }`],
    '/lib/',
    '/lib/tokenize/',
    ['/lib/tokenize/is.jsx', `
        export const isPrev = (path) => {
            return <h1>hello</h1>;
        };
    `],
    '/lib/tokenize/expressions/',
    ['/lib/tokenize/expressions/spread-element.js', `
        import {isPrev} from '../is.js';
    `],
]);
