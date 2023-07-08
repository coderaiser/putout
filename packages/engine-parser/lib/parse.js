'use strict';

const recast = require('@putout/recast');
const toBabel = require('estree-to-babel');
const customParser = require('./custom-parser');
const moveOutDirectives = require('./recast/move-out-directives');

module.exports = (source, options) => {
    const {
        parser,
        printer = 'putout',
        isTS,
        isFlow,
        isJSX,
        sourceFileName,
    } = options || {};
    
    const cookedParser = getParser({
        printer,
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

function getParser({parser = 'babel', isTS, isFlow, isJSX, printer}) {
    return {
        parse(source) {
            const ast = toBabel(customParser(source, parser, {
                isTS,
                isFlow,
                isJSX,
            }));
            
            if (printer === 'recast')
                moveOutDirectives(ast);
            
            return ast;
        },
    };
}
