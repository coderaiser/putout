import module from 'node:module';
import * as acorn from './parsers/acorn.cjs';
import * as babel from './parsers/babel/index.js';
import * as espree from './parsers/espree.cjs';
import * as esprima from './parsers/esprima.cjs';
import * as tenko from './parsers/tenko.cjs';
import * as hermes from './parsers/hermes.cjs';
import {secondChance} from './second-chance.js';

const isObject = (a) => typeof a === 'object';

const MESSAGES = [
    'has already been declared',
];

export default (source, parser, {isTS, isJSX, printer}) => {
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
    
    const require = module.createRequire(import.meta.url);
    
    return require(parser).parse(source);
}
