'use strict';

const acorn = require('./parsers/acorn');
const babel = require('./parsers/babel');
const espree = require('./parsers/espree');
const esprima = require('./parsers/esprima');
const tenko = require('./parsers/tenko');

module.exports = (source, {parser, isTS, isFlow, isJSX}) => {
    if (parser === 'babel')
        return babel.parse(source, {
            isTS,
            isFlow,
            isJSX,
        });
    
    if (parser === 'espree')
        return espree.parse(source);
    
    if (parser === 'acorn')
        return acorn.parse(source);
    
    if (parser === 'esprima')
        return esprima.parse(source);
    
    if (parser === 'tenko')
        return tenko.parse(source);
    
    return require(parser).parse(source);
};

