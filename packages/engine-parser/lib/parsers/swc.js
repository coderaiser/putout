const once = require('once');
const initSwc = once(() => require('@swc/core'));
const initSwcToBabel = once(() => require('swc-to-babel'));

module.exports.parse = (source) => {
    const swc = initSwc();
    const swcToBabel = initSwcToBabel();

    const ast = swc.parseSync(source, {
        syntax: 'typescript',
        target: 'es2022',
    });
    
    const result = swcToBabel(ast, source);
    
    console.log(JSON.stringify(result, null, 4));
    
    return result;
};
