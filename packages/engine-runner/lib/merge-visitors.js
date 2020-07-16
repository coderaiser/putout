'use strict';

const traverse = require('@babel/traverse').default;
const {generate} = require('@putout/engine-parser');

const runFix = require('./run-fix');
const {getPosition} = require('./get-position');
const maybeArray = require('./maybe-array');
const listStore = require('./list-store');

const shouldSkip = (a) => !a.parent;
const {merge} = traverse.visitors;

const {assign} = Object;
const parse = (name, plugin, options) => {
    const list = [];
    
    if (plugin[name])
        list.push(...plugin[name]());
    
    if (options[name])
        list.push(...maybeArray(options[name]));
    
    return list;
};

module.exports = (pluginsToMerge, {fix, shebang, template}) => {
    const mergeItems = [];
    const pushed = {};
    
    for (const {rule, plugin, msg, options} of pluginsToMerge) {
        const {
            push,
            pull,
            store,
        } = getStore(
            plugin,
            {
                fix,
                rule,
                shebang,
                msg,
            },
        );
        
        pushed[rule] = pull;
        
        const visitor = plugin.traverse({
            push,
            store,
            generate,
            options,
        });
        
        assign(options, {
            include: parse('include', plugin, options),
            exclude: parse('exclude', plugin, options),
        });
        
        mergeItems.push(...template({
            rule,
            visitor,
            options,
            store,
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

function getStore(plugin, {fix, rule, shebang, msg}) {
    const store = listStore();
    const placesStore = listStore();
    
    const push = (path) => {
        const position = getPosition(path, shebang);
        const message = msg || plugin.report(path);
        
        placesStore ({
            message,
            position,
        });
        
        runFix(fix, plugin.fix, {
            path,
            rule,
            position,
        });
    };
    
    const pull = () => {
        store.clear();
        return placesStore.clear();
    };
    
    return {
        push,
        pull,
        store,
    };
}

