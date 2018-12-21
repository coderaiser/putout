'use strict';

const recast = require('recast');
const {parse: babelParse} = require('@babel/parser');
const alignSpaces = require('align-spaces');

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');
const cutShebang = require('./cut-shebang');

const parser = {
    tokens: false,
    parse(source) {
        return babelParse(source);
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
    });
    
    return ast;
}

