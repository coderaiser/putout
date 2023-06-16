'use strict';

const {types, operator} = require('putout');

const {StringLiteral} = types;

const {
    replaceWith,
    getTemplateValues,
    isSimpleRegExp,
} = operator;

const decode = (a) => {
    return a
        .replaceAll('\\\\/', '\\/')
        .replaceAll('\\\\(', '\\(')
        .replaceAll('\\(', '(')
        .replaceAll('\\n', '\n')
        .replaceAll('\\\\^', '\\^')
        .replaceAll('\\\\:', '\\:')
        .replaceAll('\\\\+', '\\+')
        .replaceAll('\\\\,', '\\,')
        .replaceAll('\\\\', '\\');
};

module.exports.report = () => `Use 'replaceAll()' instead of 'replace()'`;

module.exports.fix = ({path, pattern}) => {
    const regExpPath = path.get('arguments.0');
    const calleePath = path.get('callee.property');
    
    replaceWith(regExpPath, StringLiteral(decode(pattern)));
    calleePath.node.name = 'replaceAll';
    
    return path;
};

module.exports.traverse = ({push}) => ({
    '__a.replace(/__b/g, __c)': (path) => {
        const {__b} = getTemplateValues(path, '__a.replace(/__b/g, __c)');
        
        const {
            flags,
            raw,
            pattern,
        } = __b;
        
        if (flags !== 'g')
            return false;
        
        if (!isSimpleRegExp(raw))
            return;
        
        push({
            path,
            pattern,
        });
        
        return;
    },
});
