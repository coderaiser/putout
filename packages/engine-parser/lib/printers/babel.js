'use strict';

const {generate} = require('@putout/babel');
const align = require('align-spaces');

const defaultOptions = {
    alignSpaces: true,
};

module.exports.print = (ast, options) => {
    const {source, alignSpaces} = {
        ...options,
        ...defaultOptions,
    };
    
    let {code} = generate(ast, {
        ...source && {
            experimental_preserveFormat: true,
            retainLines: true,
        },
    }, source);
    
    code += '\n';
    
    if (!alignSpaces)
        return code;
    
    return align(code);
};
