'use strict';

const acorn = require('./parsers/acorn');
const babel = require('./parsers/babel');
const espree = require('./parsers/espree');
const esprima = require('./parsers/esprima');
const tenko = require('./parsers/tenko');
const hermes = require('./parsers/hermes');
const secondChance = require('./second-chance');

const isObject = (a) => typeof a === 'object';

module.exports = (source, parser, {isTS, isFlow, isJSX}) => {
    const options = {
        parser,
        isTS,
        isFlow,
        isJSX,
    };
    
    return secondChance(customParse, source, options, {
        ...options,
        isJSX: false,
    });
};

function customParse(source, {parser, isTS, isFlow, isJSX}) {
    if (parser === 'babel')
        return babel.parse(source, {
            isTS,
            isFlow,
            isJSX,
        });
    
    if (isObject(parser))
        return parser.parse(source, {
            isJSX,
            isTS,
        });
    
    if (parser === 'espree')
        return espree.parse(source);
    
    if (parser === 'acorn')
        return acorn.parse(source);
    
    if (parser === 'esprima')
        return esprima.parse(source);
    
    if (parser === 'tenko')
        return tenko.parse(source);
    
    if (parser === 'hermes')
        return hermes.parse(source);
    
    return require(parser).parse(source);
}

