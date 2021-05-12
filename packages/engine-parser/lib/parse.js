'use strict';

const recast = require('@putout/recast');
const toBabel = require('estree-to-babel');

const customParser = require('./custom-parser');

module.exports = parse;

function parse(source, options) {
    const {
        parser,
        isTS,
        isFlow,
    } = options || {};
    
    const ast = recast.parse(source, {
        parser: getParser({
            parser,
            isTS,
            isFlow,
        }),
    });
    
    return ast;
}

function getParser({parser = 'babel', isTS, isFlow}) {
    return {
        parse(source) {
            return toBabel(customParser(source, parser, {
                isTS,
                isFlow,
            }));
        },
    };
}
