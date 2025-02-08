'use strict';

const {generate} = require('@putout/babel');
const align = require('align-spaces');

const defaultOptions = {
    alignSpaces: true,
};

module.exports.print = (ast, options) => {
    const {source, alignSpaces} = {
        ...defaultOptions,
        ...options,
    };
    
    let {code} = generate(ast, {
        ...source && {
            experimental_preserveFormat: true,
            retainLines: true,
        },
    }, source);
    
    if (code[0] === '\n')
        code = code.trimStart();
    
    code += '\n';
    
    if (!alignSpaces)
        return code;
    
    return align(code);
};
