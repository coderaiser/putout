'use strict';

const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;
const {merge} = traverse.visitors;

const runFix = require('./run-fix');
const getPosition = require('./get-position');

const shouldSkip = (a) => !a.parent;

module.exports = (pluginsToMerge, {fix, shebang}) => {
    const mergeItems = [];
    const pushed = {};
    
    for (const [rule, plugin] of pluginsToMerge) {
        const {push, pull} = getStore(plugin, {
            fix,
            shebang,
        });
        
        pushed[rule] = pull;
        
        mergeItems.push(plugin.traverse({
            push,
            generate,
        }));
    }
    
    const entries = Object.entries(pushed);
    const visitor = {
        shouldSkip,
        ...merge(mergeItems),
    };
    
    return {
        entries,
        visitor,
    };
};

function getStore(plugin, {fix, shebang}) {
    let value = [];
    
    const push = (path) => {
        const position = getPosition(path, shebang);
        const message = plugin.report(path);
        
        value.push({
            message,
            position,
        });
        
        runFix(fix, plugin.fix, {
            path,
            position,
        });
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

