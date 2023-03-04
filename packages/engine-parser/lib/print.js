'use strict';

const {print} = require('@putout/recast');
const generate = require('@babel/generator').default;
const tryCatch = require('try-catch');

const parse = require('./parse');
const {stringify} = JSON;
const btoa = (a) => Buffer.from(a, 'binary').toString('base64');
const {assign} = Object;
const addSourceMap = (sourceMapName, {code, map}) => !sourceMapName ? code : `${code}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(stringify(map))}\n`;
const fixStrictMode = (a) => a.replace(`\n\n\n'use strict'`, `\n\n'use strict'`);

module.exports = (ast, options = {}) => {
    const {sourceMapName} = options;
    const printOptions = {
        quote: 'single',
        objectCurlySpacing: false,
        wrapColumn: Infinity,
        ...options,
    };
    const printed = print(ast, printOptions);
    
    if (!canParse(printed.code))
        assign(printed, {
            code: generate(ast, {
                indent: {
                    style: '    ',
                },
            }).code,
        });
    
    const {map} = printed;
    const code = fixStrictMode(printed.code);
    
    return addSourceMap(sourceMapName, {
        code,
        map,
    });
};

function canParse(source) {
    const [error] = tryCatch(parse, source, {
        isTS: true,
    });
    return !error;
}
