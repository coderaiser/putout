'use strict';

const {parse} = require('@putout/recast');
const toBabel = require('estree-to-babel');

const customParser = require('./custom-parser');

module.exports = (source, options) => {
    const {
        parser,
        isTS,
        isFlow,
        isJSX,
        sourceFileName,
        recast = true,
    } = options || {};
    
    const cookedParser = getParser({
        parser,
        isTS,
        isFlow,
        isJSX,
        sourceFileName,
    });
    
    if (!recast)
        return cookedParser.parse(source);
    
    return parse(source, {
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
