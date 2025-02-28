'use strict';

const toBabel = require('estree-to-babel');
const customParser = require('./custom-parser');
const {tryThrowWithReason} = require('./try-throw-with-reason');
const {assign} = Object;

module.exports = (source, options) => {
    const {
        parser,
        printer = 'putout',
        isTS,
        isJSX,
    } = options || {};
    
    const {parse} = getParser({
        printer,
        parser,
        isTS,
        isJSX,
    });
    
    return tryThrowWithReason(parse, source);
};

const getParser = ({parser = 'babel', isTS, isJSX, printer}) => ({
    parse(source) {
        const options = {};
        
        if (printer === 'babel')
            assign(options, {
                convertParens: false,
            });
        
        const ast = toBabel(customParser(source, parser, {
            isTS,
            isJSX,
            printer,
        }), options);
        
        return ast;
    },
});
