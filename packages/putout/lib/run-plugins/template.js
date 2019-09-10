'use strict';

const template = require('@babel/template').default;
const {
    isIdentifier,
    isLiteral,
} = require('@babel/types');

const isObject = (a) => typeof a === 'object';
const isTemplate = (a) => /[(;={]/.test(a) || !/[A-Z]/.test(a);

const generate = templater();

const generateNode = ({exclude}) => {
    if (!exclude)
        return null;
    
    return generate(exclude);
};

module.exports = (visitor, options) => {
    const parsed = [];
    const entries = Object.entries(visitor);
    const nodeExclude = generateNode(options);
    
    for (const [tmpl, fn] of entries) {
        if (!isTemplate(tmpl)) {
            parsed.push({
                [tmpl]: fn,
            });
            continue;
        }
        
        const nodeInclude = generate(tmpl);
        const {type} = nodeInclude;
        
        const visit = wrapWithCheck({
            nodeInclude,
            nodeExclude,
            fn,
        });
        
        parsed.push({
            [type]: visit,
        });
    }
    
    return parsed;
};

function wrapWithCheck({nodeInclude, nodeExclude, fn}) {
    return (path) => {
        if (compare(nodeExclude, path.node))
            return path.skip();
        
        if (!compare(nodeInclude, path.node))
            return;
        
        fn(path);
    };
}

function compare(baseNode, pathNode) {
    if (!baseNode)
        return;
    
    for (const key of Object.keys(baseNode)) {
        if (key === 'loc')
            continue;
        
        const value = baseNode[key];
        const pathValue = pathNode[key];
        
        if (value === pathValue)
            continue;
        
        if (isIdentifier(value, {name: '__'}))
            continue;
        
        if (isLiteral(value, {value: '__'}))
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
        
        const result = template.ast(value);
        cache[value] = result.expression || result;
        
        return cache[value];
    };
}

