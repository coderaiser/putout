'use strict';

const {print} = require('recast');

const addNewLine = ([char, ...line]) => `${char}\n\n${line.join('')}`;
const fixStrictMode = (a) => a.replace(/[a-z]'use strict'/, addNewLine);

module.exports = (ast) => {
    const printOptions = {
        quote: 'single',
        objectCurlySpacing: false,
    };
    
    const printed = print(ast, printOptions).code;
    const code = fixStrictMode(printed);
    
    return code;
};

