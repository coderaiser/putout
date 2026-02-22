import {traverse} from '@putout/babel';
import {generate} from '@putout/engine-parser';
import runFix from './run-fix.js';
import {getPosition} from './get-position.js';
import maybeArray from './maybe-array.js';
import {validate} from './validate.js';
import {
    listStore,
    mapStore,
    upStore,
    upListStore,
    pathStore,
} from './store.js';

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

export default (pluginsToMerge, {fix, template}) => {
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

function getStore(plugin, {fix, rule, msg, options}) {
    const store = mapStore();
    const list = listStore();
    const upstore = upStore();
    const placesStore = listStore();
    const uplist = upListStore();
    const paths = pathStore();
    
    const push = (path, pathOptions) => {
        const position = getPosition(path);
        const message = msg || plugin.report(path, {
            ...options,
            ...pathOptions,
        });
        
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
