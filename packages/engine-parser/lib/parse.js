'use strict';

const recast = require('@putout/recast');
const toBabel = require('estree-to-babel');
const customParser = require('./custom-parser');

module.exports = (source, options) => {
    const {
        parser,
        printer = 'recast',
        isTS,
        isFlow,
        isJSX,
        sourceFileName,
    } = options || {};
    
    const cookedParser = getParser({
        parser,
        isTS,
        isFlow,
        isJSX,
        sourceFileName,
    });
    
    if (printer !== 'recast')
        return cookedParser.parse(source);
    
    return recast.parse(source, {
        sourceFileName,
        parser: cookedParser,
    });
};

function getParser({parser = 'babel', isTS, isFlow, isJSX}) {
    return {
        parse(source) {
            return toBabel(customParser(source, parser, {
                isTS,
                isFlow,
                isJSX,
            }));
        },
    };
}
