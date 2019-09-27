'use strict';

const generate = require('@babel/generator').default;
const store = new Map();

module.exports = (node) => {
    if (store.has(node))
        return store.get(node);
    
    const str = generate(node, {
        comments: false,
    });
    
    store.set(node, str);
    
    return str;
};

