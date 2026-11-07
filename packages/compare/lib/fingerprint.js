import {template} from '@putout/engine-parser';

const isUndefined = (a) => typeof a === 'undefined';
const isString = (a) => typeof a === 'string';
const {extractExpression} = template;
const {keys} = Object;
const {isArray} = Array;

const isObject = (a) => a && typeof a === 'object';
const hasMarker = (a) => isString(a) && a.includes('__');

const MAX_DEPTH = 4;

const isNode = (a) => isString(a.type);

const isPlain = (node) => {
    if (!isNode(node) || node.type === 'BlockStatement')
        return false;
    
    for (const key of keys(node))
        if (hasMarker(node[key]))
            return false;
    
    return true;
};

const collect = (node, ignore, path, leaves) => {
    if (path.length === MAX_DEPTH)
        return leaves;
    
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

const get = (current, path) => {
    for (const key of path) {
        if (!isObject(current))
            return;
        
        current = extractExpression(current[key]);
    }
    
    return current;
};

const findMismatch = (node, leaves) => leaves.find(([path, value]) => get(node, path) !== value);

const cache = new WeakMap();

const getLeaves = (templateNode, ignore) => {
    if (!isNode(templateNode))
        return [];
    
    if (cache.has(templateNode))
        return cache.get(templateNode);
    
    const leaves = collect(templateNode, ignore, [], []);
    
    cache.set(templateNode, leaves);
    
    return leaves;
};

export const matchFingerprint = (node, templateNode, ignore) => {
    const leaves = getLeaves(templateNode, ignore);
    const mismatch = findMismatch(node, leaves);
    
    if (!mismatch)
        return true;
    
    const [path, value] = mismatch;
    
    if (get(templateNode, path) === value)
        return false;
    
    cache.delete(templateNode);
    
    const freshLeaves = getLeaves(templateNode, ignore);
    
    return !findMismatch(node, freshLeaves);
};
