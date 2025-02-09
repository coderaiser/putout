'use strict';

const toBabel = require('estree-to-babel');
const customParser = require('./custom-parser');

module.exports = (source, options) => {
    const {
        parser,
        printer = 'putout',
        isTS,
        isJSX,
    } = options || {};
    
    const cookedParser = getParser({
        printer,
        parser,
        isTS,
        isJSX,
    });
    
    return cookedParser.parse(source);
};

const getParser = ({parser = 'babel', isTS, isJSX, printer}) => ({
    parse(source) {
        const ast = toBabel(customParser(source, parser, {
            isTS,
            isJSX,
            printer,
        }));
        
        return ast;
    },
});
