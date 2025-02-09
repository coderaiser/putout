'use strict';

const acorn = require('./parsers/acorn');
const babel = require('./parsers/babel');
const espree = require('./parsers/espree');
const esprima = require('./parsers/esprima');
const tenko = require('./parsers/tenko');
const hermes = require('./parsers/hermes');
const secondChance = require('./second-chance');
const isObject = (a) => typeof a === 'object';

const MESSAGES = [
    'has already been declared',
];

module.exports = (source, parser, {isTS, isJSX, printer}) => {
    const options = {
        parser,
        printer,
        isTS,
        isJSX,
    };
    
    const optionsB = {
        ...options,
        isJSX: false,
    };
    
    const optionsC = {
        ...options,
        isRecovery: true,
    };
    
    return secondChance(customParse, source, MESSAGES, [
        options,
        optionsB,
        optionsC,
    ]);
};

function customParse(source, {parser, printer, isTS, isJSX, isRecovery}) {
    if (parser === 'babel')
        return babel.parse(source, {
            isTS,
            isJSX,
            isRecovery,
            printer,
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
