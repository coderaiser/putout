import putoutPrinter from '@putout/printer';
import * as babelPrinter from './printers/babel.js';

const {isArray} = Array;

const maybeArray = (a) => isArray(a) ? a : [a, {}];

export const print = (ast, options = {}) => {
    const [printer = 'putout', printerOptions] = maybeArray(options.printer);
    
    if (printer === 'babel')
        return babelPrinter.print(ast, {
            ...options,
            ...printerOptions,
        });
    
    return putoutPrinter.print(ast, printerOptions);
};
