'use strict';

const {
    types,
    operator,
} = require('putout');

const {traverseProperty} = require('./traverse-property');

const {
    replaceWith,
    getTemplateValues,
} = operator;

const {StringLiteral} = types;
const cutV = (a) => Number(a.slice(1));

module.exports.createUsesFixer = (name, version) => {
    const full = `${name}@${version}`;
    const checkoutNode = StringLiteral(full);
    
    return {
        traverse: traverse(name, version),
        fix: fix(checkoutNode),
        report: report(name),
    };
};

const report = (name) => () => `Latest version of ${name} is missing`;

const fix = (checkoutNode) => (path) => {
    replaceWith(path, checkoutNode);
};

const traverse = (name, version) => ({push}) => ({
    '__putout_processor_json(__a)'(path) {
        const {__a} = getTemplateValues(path, '__putout_processor_json(__a)');
        
        for (const propertyPath of traverseProperty(__a, 'uses')) {
            const valuePath = propertyPath.get('value');
            const {value} = valuePath.node;
            const full = `${name}@${version}`;
            
            if (!value.startsWith(name))
                continue;
            
            if (value === full)
                continue;
            
            const [, valueVersion] = value.split('@');
            const versionNumber = cutV(version);
            const valueVersionNumber = cutV(valueVersion);
            
            if (versionNumber > valueVersionNumber)
                push(valuePath);
        }
    },
});
