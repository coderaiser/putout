'use strict';

const putoutPrinter = require('@putout/printer');
const {generate} = require('@putout/babel');

const {isArray} = Array;

const maybeArray = (a) => isArray(a) ? a : [a, {}];

module.exports = (ast, options = {}) => {
    const [printer = 'putout', printerOptions] = maybeArray(options.printer);
    
    if (printer === 'babel')
        return babelPrint(ast, options);
    
    return putoutPrinter.print(ast, printerOptions);
};

function babelPrint(ast, {source}) {
    const {code} = generate(ast, {
        ...source && {
            experimental_preserveFormat: true,
            retainLines: true,
        },
    }, source);
    
    return `${code}\n`;
}
