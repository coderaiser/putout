'use strict';

const recast = require('@putout/recast');
const toBabel = require('estree-to-babel');
const {File} = require('@babel/core');

const customParser = require('./custom-parser');

const fixTraverseHubError = (ast, code = '') => new File({filename: '__putout.js'}, {code, ast});


module.exports = (code, options) => {
    const {
        parser,
        isTS,
        isFlow,
        isJSX,
    } = options || {};

    const ast = recast.parse(code, {
        parser: getParser({
            parser,
            isTS,
            isFlow,
            isJSX,
        }),
    });

    const {path} = fixTraverseHubError(ast);
    ast.path = path;
    console.log(ast);

    return ast;
};

function getParser({parser = 'babel', isTS, isFlow, isJSX}) {
    return {
        parse(code) {
            return toBabel(customParser(code, {
                parser,
                isTS,
                isFlow,
                isJSX,
            }));
        },
    };
}

