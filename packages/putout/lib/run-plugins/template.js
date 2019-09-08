'use strict';

const template = require('@babel/template').default;
const {isIdentifier} = require('@babel/types');

const isObject = (a) => typeof a === 'object';
const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);

const generate = templater();

module.exports = (visitor) => {
    const entries = Object.entries(visitor);
    const parsed = [];
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed.push({
                [tmpl]: fn,
            });
            continue;
        }
        
        const result = generate(tmpl);
        const node = result.expression || result;
        const {type} = node;
        
        const visit = wrapWithCheck(node, fn);
        parsed.push({
            [type]: visit,
        });
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
        
        if (value === pathValue)
            continue;
        
        if (isIdentifier(value, {name: '__'}))
            continue;
        
        if (value && isObject(value) && compare(value, pathValue))
            continue;
        
        return false;
    }
    
    return true;
}

function templater() {
    const cache = {};
    
    return (value) => {
        if (cache[value])
            return cache[value];
        
        cache[value] = template.ast(value);
        
        return cache[value];
    };
}

