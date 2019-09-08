'use strict';

const template = require('@babel/template').default;
const {isIdentifier} = require('@babel/types');

const isObject = (a) => typeof a === 'object';
const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);

module.exports = (visitor) => {
    const entries = Object.entries(visitor);
    const parsed = {};
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed[tmpl] = fn;
            continue;
        }
        
        const result = template.ast(tmpl);
        const node = result.expression || result;
        const {type} = node;
        
        const visit = wrapWithCheck(node, fn);
        parsed[type] = visit;
    }
    
    return parsed;
};

function wrapWithCheck(node, fn) {
    return (path) => {
        if (!compare(node, path.node))
            return;
        
        fn(path);
    };
}

function compare(baseNode, pathNode) {
    for (const key of Object.keys(baseNode)) {
        if (key === 'loc')
            continue;
        
        const value = baseNode[key];
        const pathValue = pathNode[key];
        
        if (isIdentifier(value, {name: '__'}))
            continue;
        
        if (value === pathValue)
            continue;
        
        if (isObject(value) && compare(value, pathValue))
            continue;
        
        return false;
    }
    
    return true;
}

