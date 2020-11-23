'use strict';

const {types} = require('putout');
const regexpTree = require('regexp-tree');
const isSimpleRegExp = require('../is-simple-regexp');

const {StringLiteral} = types;

const match = (flags) => ({__b}) => {
    if (__b.flags === flags) {
        const {raw} = __b.extra;
        return isSimpleRegExp(raw);
    }
    
    return false;
};

const replace = ({__b}, path) => {
    const {pattern} = __b;
    const regExpPath = path.get('arguments.0');
    
    regExpPath.replaceWith(StringLiteral(pattern));
    
    return path;
};

module.exports.report = () => 'String should be used instead of RegExp';

module.exports.match = () => ({
    '__a.replace(/__b/, __c)': match(''),
    '__a.replaceAll(/__b/g, __c)': match('g'),
});

module.exports.replace = () => ({
    '__a.replace(/__b/, __c)': replace,
    '__a.replaceAll(/__b/g, __c)': replace,
});

