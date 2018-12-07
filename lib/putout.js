'use strict';

const recast = require('recast');
const espree = require('espree');
const {parse: babelParse} = require('@babel/parser');
const alignSpaces = require('align-spaces');

const getVars = require('./get-vars');
const transform = require('./transform');
const getUnused = require('./get-unused');
const removeUnused = require('./remove-unused');
const cutShebang = require('./cut-shebang');

const parser = {
    parse(source) {
        return babelParse(source, {
        //return espree.parse(source, {
            loc: true,
            ecmaVersion: 2019,
        });
    }
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
    });
    
    return ast;
}

