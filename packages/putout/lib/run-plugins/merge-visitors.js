'use strict';

const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const {merge} = traverse.visitors;

module.exports = (pluginsToMerge) => {
    const mergeItems = [];
    const pushed = {};
    
    for (const [rule, plugin] of pluginsToMerge) {
        const {push, pull} = getStore();
        
        pushed[rule] = {
            pull,
            plugin,
        };
        
        mergeItems.push(plugin.traverse({
            push,
            generate,
        }));
    }
    
    const entries = Object.entries(pushed);
    const visitor = merge(mergeItems);
    
    return {
        entries,
        visitor,
    };
};

function getStore() {
    let value = [];
    
    const push = (a) => {
        value.push(a);
    };
    
    const pull = () => {
        const a = value;
        value = [];
        return a;
    };
    
    return {
        push,
        pull,
    };
}

