__putout_processor_filesystem([
    '/',
    ['/package.json', `
        {
            "imports": {
                "#is": {
                    "default": "./lib/tokenize/is.ts"
                }
            }
        }
    `],
    '/lib/',
    '/lib/tokenize/',
    ['/lib/tokenize/is.ts', `
        export const isPrev = (path) => {
            const next = path.getPrevSibling();
            return next.node;
        };
    `],
    '/lib/tokenize/expressions/',
    ['/lib/tokenize/expressions/spread-element.ts', `
        import {isPrev} from '../is.ts';
    `],
]);
