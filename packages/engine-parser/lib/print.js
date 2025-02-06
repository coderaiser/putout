'use strict';

const putoutPrinter = require('@putout/printer');
const {generate} = require('@putout/babel');

const {isArray} = Array;

const maybeArray = (a) => isArray(a) ? a : [a, {}];

module.exports = (ast, options = {}) => {
    const [printer = 'putout', printerOptions] = maybeArray(options.printer);
    
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
