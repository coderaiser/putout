'use strict';

const {codeframe} = require('putout');
const {stringify} = JSON;
const {entries} = Object;

module.exports.createError = (help, source, values) => {
    const argsBoxStart = '\n    ╔══\n';
    const argsBoxLine = '    ║';
    const argsBoxEnd = '\n    ╚══\n';
    
    const args = [];
    
    for (const [name, value] of entries(values)) {
        args.push(`${argsBoxLine}    ${name} = ${stringify(value) || typeof value}`);
    }
    
    const error = Error(`${help}${argsBoxStart}${args.join('\n')}${argsBoxEnd}`);
    
    error.loc = {
        line: 1,
        column: 1,
    };
    
    throw Error('\n' + codeframe({
        source,
        error,
    }));
};
