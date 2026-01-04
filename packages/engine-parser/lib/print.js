import {print as putoutPrint} from '@putout/printer';
import {print as babelPrint} from './printers/babel.js';

const {isArray} = Array;

const maybeArray = (a) => isArray(a) ? a : [a, {}];

export const print = (ast, options = {}) => {
    const [printer = 'putout', printerOptions] = maybeArray(options.printer);
    
    if (printer === 'babel')
        return babelPrint(ast, {
            ...options,
            ...printerOptions,
        });
    
    return putoutPrint(ast, printerOptions);
};
