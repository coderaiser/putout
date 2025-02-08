'use strict';

const putoutPrinter = require('@putout/printer');
const babelPrinter = require('./printers/babel');

const {isArray} = Array;

const maybeArray = (a) => isArray(a) ? a : [a, {}];

module.exports = (ast, options = {}) => {
    const [printer = 'putout', printerOptions] = maybeArray(options.printer);
    
    if (printer === 'babel')
        return babelPrinter.print(ast, {
            ...options,
            ...printerOptions,
        });
    
    return putoutPrinter.print(ast, printerOptions);
};
