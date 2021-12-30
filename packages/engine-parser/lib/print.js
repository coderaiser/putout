'use strict';

const {print} = require('@putout/recast');

const fixStrictMode = (a) => a.replace(`\n\n\n'use strict'`, `\n\n'use strict'`);
const addSourceMap = (sourceMapName, {code, map}) => !sourceMapName ? code : `${code}\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,${btoa(stringify(map))}\n`;

const {stringify} = JSON;

module.exports = (ast, options = {}) => {
    const {sourceMapName} = options;
    const printOptions = {
        quote: 'single',
        objectCurlySpacing: false,
        wrapColumn: Infinity,
        ...options,
    };
    
    const printed = print(ast, printOptions);
    const {map} = printed;
    const code = fixStrictMode(printed.code);
    
    return addSourceMap(sourceMapName, {
        code,
        map,
    });
};

