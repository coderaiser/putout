'use strict';

const recast = require('recast');
const toBabel = require('estree-to-babel');
const customParser = require('./custom-parser');
const memo = require('micro-memoize');

module.exports = memo((source, {parser, isTS, isFlow, isJSX} = {}) => {
    const ast = recast.parse(source, {
        parser: getParser({
            parser,
            isTS,
            isFlow,
            isJSX,
        }),
    });
    
    return ast;
});

module.exports.getParser = getParser;
function getParser({parser = 'babel', isTS, isFlow, isJSX} = {}) {
    return {
        parse(source) {
            return toBabel(customParser(source, {
                parser,
                isTS,
                isFlow,
                isJSX,
            }));
        },
    };
}
