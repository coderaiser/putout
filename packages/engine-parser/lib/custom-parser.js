'use strict';

const acorn = require('./parsers/acorn');
const babel = require('./parsers/babel');
const espree = require('./parsers/espree');
const esprima = require('./parsers/esprima');
const tenko = require('./parsers/tenko');
const secondChance = require('./second-chance');

const isObject = (a) => typeof a === 'object';
const putoutEditorDefaults = {
    isTS: true,
};

module.exports = (source, parser, {isTS, isFlow} = putoutEditorDefaults) => {
    const options = {
        parser,
        isTS,
        isFlow,
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
    
    return require(parser).parse(source);
}

