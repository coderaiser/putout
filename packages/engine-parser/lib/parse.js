'use strict';

const {estreeToBabel} = require('estree-to-babel');
const customParser = require('./custom-parser');
const {tryThrowWithReason} = require('./try-throw-with-reason');
const {assign} = Object;
const isString = (a) => typeof a === 'string';

module.exports = (source, options) => {
    check(source);
    
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
        
        const ast = estreeToBabel(customParser(source, parser, {
            isTS,
            isJSX,
            printer,
        }), options);
        
        return ast;
    },
});

function check(source) {
    if (!isString(source))
        throw Error(`☝️ Looks like type of 'source' is not 'string', but '${typeof source}'`);
}
