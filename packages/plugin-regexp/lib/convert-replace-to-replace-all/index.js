'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith, isSimpleRegExp} = operator;
const {StringLiteral} = types;

module.exports.report = () => 'String should be used instead of RegExp';

module.exports.match = () => ({
    '__a.replace(/__b/g, __c)': ({__b}) => {
        const {flags} = __b;
        
        if (flags !== 'g')
            return false;
        
        const {raw} = __b.extra;
        
        return isSimpleRegExp(raw);
    },
});

module.exports.replace = () => ({
    '__a.replace(/__b/g, __c)': ({__b}, path) => {
        const {pattern} = __b;
        const regExpPath = path.get('arguments.0');
        const calleePath = path.get('callee.property');
        
        replaceWith(regExpPath, StringLiteral(pattern));
        calleePath.node.name = 'replaceAll';
        
        return path;
    },
});

