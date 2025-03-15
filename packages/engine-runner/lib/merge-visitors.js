'use strict';

const {traverse} = require('@putout/babel');
const {generate} = require('@putout/engine-parser');

const runFix = require('./run-fix');
const {getPosition} = require('./get-position');
const maybeArray = require('./maybe-array');
const {validate} = require('./validate');

const {
    listStore,
    mapStore,
    upStore,
    upListStore,
    pathStore,
} = require('./store');

const {merge} = traverse.visitors;
const {assign} = Object;

const parse = (name, plugin, options) => {
    const list = [];
    
    if (plugin[name]) {
        validate(name, plugin[name]);
        list.push(...maybeArray(plugin[name]()));
    }
    
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
            upstore,
            listStore,
            pathStore,
            uplist,
        } = getStore(plugin, {
            fix,
            rule,
            shebang,
            msg,
            options,
        });
        
        pushed[rule] = pull;
        
        const visitor = plugin.traverse({
            push,
            store,
            listStore,
            pathStore,
            upstore,
            uplist,
            generate,
            options,
        });
        
        if (!visitor)
            throw Error(`☝️ Visitors cannot be empty in "${rule}"`);
        
        assign(options, {
            include: parse('include', plugin, options),
            exclude: parse('exclude', plugin, options),
        });
        
        mergeItems.push(...template({
            rule,
            visitor,
            options,
        }));
    }
    
    const entries = Object.entries(pushed);
    
    const visitor = merge(mergeItems);
    
    return {
        entries,
        visitor,
    };
};

function getStore(plugin, {fix, rule, shebang, msg, options}) {
    const store = mapStore();
    const list = listStore();
    const upstore = upStore();
    const placesStore = listStore();
    const uplist = upListStore();
    const paths = pathStore();
    
    const push = (path, pathOptions) => {
        const position = getPosition(path, shebang);
        const message = msg || plugin.report(path, pathOptions);
        
        placesStore({
            message,
            position,
        });
        
        runFix(fix, plugin.fix, {
            path,
            pathOptions,
            rule,
            position,
            options,
        });
    };
    
    const pull = () => {
        store.clear();
        list.clear();
        upstore.clear();
        uplist.clear();
        paths.clear();
        
        return placesStore.clear();
    };
    
    return {
        push,
        pull,
        store,
        listStore: list,
        upstore,
        uplist,
        pathStore: paths,
    };
}
