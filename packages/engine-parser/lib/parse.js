'use strict';

const recast = require('recast');
const toBabel = require('estree-to-babel');
const memo = require('nano-memoize');

const customParser = require('./custom-parser');

module.exports = memo((source, options) => {
    const {
        parser,
        isTS,
        isFlow,
        isJSX,
    } = options || {};
    
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

function getParser({parser = 'babel', isTS, isFlow, isJSX}) {
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
