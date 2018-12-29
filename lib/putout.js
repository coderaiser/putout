'use strict';

const recast = require('recast');
const alignSpaces = require('align-spaces');
const cherow = require('cherow');

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');
const cutShebang = require('./cut-shebang');

const parser = {
    parse(source) {
        return cherow.parse(source, {
            loc: true,
        });
    },
};

module.exports = (source) => {
    const [clearSource, shebang] = cutShebang(source);
    
    const ast = parse(clearSource);
    const vars = getVars(ast, {
        setLoc: true,
        setPath: true,
    });
    
    const transformed = transform(vars);
    const unused = getUnused(transformed);
    
    removeUnused(unused);
    
    const {code} = recast.print(ast, {
        trailingComma: true,
    });
    
    const result = alignSpaces(code);
    
    return {
        code: `${shebang}${result}`,
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

