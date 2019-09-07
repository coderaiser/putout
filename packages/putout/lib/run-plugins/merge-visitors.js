'use strict';

const generate = require('@babel/generator').default;
const traverse = require('@babel/traverse').default;

const {merge} = traverse.visitors;

const runFix = require('./run-fix');
const {getPosition} = require('./get-position');
const template = require('./template');

const shouldSkip = (a) => !a.parent;

module.exports = (pluginsToMerge, {fix, parser}) => {
    const mergeItems = [];
    const pushed = {};
    
    for (const {rule, plugin, msg, options} of pluginsToMerge) {
        const {push, pull} = getStore(plugin, {
            fix,
            parser,
            msg,
        });
        
        pushed[rule] = pull;
        
        const visitor = plugin.traverse({
            push,
            generate,
            options,
        });
        
        mergeItems.push(template(visitor));
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

function getStore(plugin, {fix, parser, msg}) {
    let value = [];
    
    const push = (path) => {
        const position = getPosition(path, parser);
        const message = msg || plugin.report(path);
        
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

