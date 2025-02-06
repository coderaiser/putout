'use strict';

const toBabel = require('estree-to-babel');
const customParser = require('./custom-parser');

module.exports = (source, options) => {
    const {
        parser,
        printer = 'putout',
        isTS,
        isFlow,
        isJSX,
    } = options || {};
    
    const cookedParser = getParser({
        printer,
        parser,
        isTS,
        isFlow,
        isJSX,
    });
    
    return cookedParser.parse(source);
};

const getParser = ({parser = 'babel', isTS, isFlow, isJSX}) => ({
    parse(source) {
        const ast = toBabel(customParser(source, parser, {
            isTS,
            isFlow,
            isJSX,
        }));
        
        return ast;
    },
});
