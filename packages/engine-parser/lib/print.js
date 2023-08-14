'use strict';

const recast = require('@putout/recast');
const putoutPrinter = require('@putout/printer');
const {generate} = require('@putout/babel');

const {stringify} = JSON;
const {isArray} = Array;

const maybeArray = (a) => isArray(a) ? a : [a, {}];

const btoa = (a) => Buffer.from(a, 'binary').toString('base64');

const addSourceMap = (sourceMapName, {code, map}) => !sourceMapName ? code : `${code}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(stringify(map))}\n`;
const fixStrictMode = (a) => a.replace(`\n\n\n'use strict'`, `\n\n'use strict'`);

module.exports = (ast, options = {}) => {
    const {sourceMapName} = options;
    const [printer = 'putout', printerOptions] = maybeArray(options.printer);
    
    if (printer === 'recast') {
        const printOptions = {
            quote: 'single',
            objectCurlySpacing: false,
            wrapColumn: Infinity,
            ...options,
            ...printerOptions,
        };
        
        const printed = recast.print(ast, printOptions);
        const {map} = printed;
        const code = fixStrictMode(printed.code);
        
        return addSourceMap(sourceMapName, {
            code,
            map,
        });
    }
    
    if (printer === 'babel')
        return babelPrint(ast);
    
    return putoutPrinter.print(ast, printerOptions);
};

function babelPrint(ast) {
    const {code} = generate(ast, {
        indent: {
            style: '    ',
        },
    });
    
    return `${code}\n`;
}
