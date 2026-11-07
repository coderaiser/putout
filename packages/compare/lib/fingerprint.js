import {template} from '@putout/engine-parser';

const isUndefined = (a) => typeof a === 'undefined';
const isString = (a) => typeof a === 'string';
const {extractExpression} = template;
const {keys} = Object;
const {isArray} = Array;

const isObject = (a) => a && typeof a === 'object';
const hasMarker = (a) => isString(a) && a.includes('__');

const STOP = new Set([
    'ClassBody',
    'TemplateElement',
    'JSXText',
    'BlockStatement',
]);

const isNode = (a) => isString(a.type);

const isPlain = (node) => {
    if (!isNode(node) || STOP.has(node.type))
        return false;
    
    for (const key of keys(node))
        if (hasMarker(node[key]))
            return false;
    
    return true;
};

const collect = (node, ignore, path, leaves) => {
    for (const key of keys(node)) {
        if (ignore.has(key))
            continue;
        
        const value = extractExpression(node[key]);
        
        if (isArray(value))
            continue;
        
        if (isObject(value)) {
            if (isPlain(value))
                collect(value, ignore, [...path, key], leaves);
            
            continue;
        }
        
        if (isUndefined(value) || hasMarker(value))
            continue;
        
        leaves.push([[...path, key], value]);
    }
    
    return leaves;
};

const cache = new WeakMap();

const getLeaves = (templateNode, ignore) => {
    if (!cache.has(templateNode))
        cache.set(templateNode, isNode(templateNode) ? collect(templateNode, ignore, [], []) : []);
    
    return cache.get(templateNode);
};

export const matchFingerprint = (node, templateNode, ignore) => {
    for (const [path, value] of getLeaves(templateNode, ignore)) {
        let current = node;
        
        for (const key of path) {
            if (!isObject(current))
                return false;
            
            current = extractExpression(current[key]);
        }
        
        if (current !== value)
            return false;
    }
    
    return true;
};
