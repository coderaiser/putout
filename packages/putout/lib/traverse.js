'use strict';

const traverse = require('@babel/traverse').default;

const {isArray} = Array;
const isObject = (a) => typeof a === 'object';

module.exports = (ast, nodes) => {
    const newNodes = initNodes(nodes);
    traverse(ast, newNodes);
};

function initNodes(nodes) {
    const keys = Object.keys(nodes);
    const newNodes = isArray(nodes) ? [] : {};
    
    for (const key of keys) {
        const value = nodes[key];
        
        if (typeof value === 'function')
            newNodes[key] = wrapNode(nodes[key]);
        else // :exit object
            newNodes[key] = initNodes(nodes[key]);
    }
    
    return newNodes;
}

const wrapNode = (fn) => (path) => fn(createProxy(path));

function createProxy(path) {
    const {node} = path;
    
    return new Proxy(node || path, {
        set(target, prop, value) {
            if (node && prop in node)
                return Reflect.set(path.node, prop, value);
            
            return Reflect.set(path, prop, value);
        },
        get(target, name) {
            if (typeof name === 'symbol')
                return (path.node || path)[name];
            
            if (/chunk|path/.test(name))
                return path;
            
            if (isNodeProp(node, name))
                return node[name];
            
            if (name === 'traverse') {
                return (nodes) => path.traverse(initNodes(nodes));
            }
            
            if (name in path && !(node && name in node)) {
                // array element
                if (typeof name !== 'symbol' && !isNaN(name))
                    return createProxy(path[name]);
                
                return path[name];
            }
            
            if (/raw|length|lines|loc/.test(name))
                return (node || {})[name];
            
            const result = path.get(name);
            return createProxy(result);
        },
    });
}

function isNodeProp(node, name) {
    if (!node)
        return false;
    
    if (!(name in node))
        return false;
    
    const value = node[name];
    
    if (isObject(value))
        return false;
    
    return true;
}

