'use strict';

const recast = require('recast');
const alignSpaces = require('align-spaces');
const cherow = require('cherow');
const toBabel = require('estree-to-babel');

const cutShebang = require('./cut-shebang');
const removeUnusedVariables = require('./rm-unused-vars');

const parser = {
    parse(source) {
        return toBabel(cherow.parse(source, {
            loc: true,
        }));
    },
};

const getOpts= () => ({
    fix: true,
});

module.exports = (source, opts = getOpts()) => {
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource);
    const {
        unused,
        fix
    } = removeUnusedVariables(ast);
    
    if (opts.fix)
        fix();
    
    const {code} = recast.print(ast);
    const aligned = alignSpaces(code);
    
    return {
        code: `${shebang}${aligned}`,
        unused,
    };
};

module.exports.parse = parse;
function parse(source) {
    const ast = recast.parse(source, {
        parser,
        tokens: false,
    });
    
    return ast;
}

