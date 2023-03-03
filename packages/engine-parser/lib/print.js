'use strict';

const {print} = require('@putout/recast');
const generate = require('@babel/generator').default;
const fixStrictMode = (a) => a.replace(`\n\n\n'use strict'`, `\n\n'use strict'`);
const btoa = (a) => Buffer.from(a, 'binary').toString('base64');
const addSourceMap = (sourceMapName, {code, map}) => !sourceMapName ? code : `${code}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(stringify(map))}\n`;
const {stringify} = JSON;
const {assign} = Object;
module.exports = (ast, options = {}) => {
    const {sourceMapName} = options;
    const printOptions = {
        quote: 'single',
        objectCurlySpacing: false,
        wrapColumn: Infinity,
        ...options,
    };
    const printed = print(ast, printOptions);
    
    if (checkBrackets(printed.code))
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
function checkBrackets(source) {
    const brackets = [];
    let i = source.length;
    
    if (!i)
        return false;
    
    while (--i) {
        const current = source[i];
        
        if (current === ')') {
            brackets.push(current);
            continue;
        }
        
        if (current === '(') {
            brackets.pop();
            continue;
        }
    }
    
    return brackets.length;
}
