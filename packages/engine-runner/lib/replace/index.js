'use strict';

const {template} = require('@putout/engine-parser');
const {
    remove,
    replaceWith,
} = require('@putout/operate');
const {
    compare,
    findVarsWays,
    getValues,
    setValues,
} = require('@putout/compare');

const maybeArray = require('../maybe-array');
const watermark = require('./watermark');

const {keys, entries} = Object;
const {stringify} = JSON;

const stub = () => [];
const stubMatch = () => ({});
const packKeys = (a) => () => keys(a);
const isObj = (a) => typeof a === 'object';

const validateTemplateValues = (a, b) => {
    for (const key of keys(a)) {
        if (!b[key])
            throw Error(`☝️ Looks like template values not linked: ${stringify(keys(a))} ${stringify(keys(b))}`);
    }
};

module.exports = ({rule, plugin, msg, options}) => {
    const {
        report,
        exclude = stub,
        replace,
        filter = getFilter(plugin.match, options),
    } = plugin;
    
    const replaceItems = replace({options});
    const fix = getFix(replaceItems);
    const include = packKeys(replaceItems);
    
    return {
        rule,
        msg,
        options: {
            ...options,
            exclude: [
                ...exclude(),
                ...maybeArray(options.exclude),
            ],
        },
        plugin: {
            report,
            fix,
            filter,
            include,
        },
    };
};

const isFn = (a) => typeof a === 'function';

const fix = (from, to, path) => {
    const nodeFrom = template.ast(from);
    const mark = watermark(from, to, path);
    
    mark.init();
    
    if (mark.has())
        return;
    
    if (!compare(path, nodeFrom))
        return;
    
    const waysFrom = findVarsWays(nodeFrom);
    const {node} = path;
    
    const values = getValues({
        waysFrom,
        node,
    });
    
    const nodeTo = parseTo(to, values, path);
    
    if (!nodeTo)
        return remove(path);
    
    const waysTo = findVarsWays(nodeTo);
    const newPath = replaceWith(path, nodeTo);
    
    validateTemplateValues(waysTo, waysFrom);
    
    setValues({
        waysTo,
        values,
        path: newPath,
    });
    
    mark.add();
    path.scope.getBlockParent().crawl();
    path.scope.getProgramParent().crawl();
};

const getFix = (items) => (path) => {
    for (const [from, to] of entries(items))
        fix(from, to, path);
};

const getFilter = (match = stubMatch, options) => (path) => {
    const all = entries(match({options}));
    
    for (const [from, fn] of all) {
        const nodeFrom = template.ast(from);
        
        if (!compare(path.node, nodeFrom)) {
            continue;
        }
        
        const waysFrom = findVarsWays(nodeFrom);
        const {node} = path;
        
        const values = getValues({
            waysFrom,
            node,
        });
        
        return fn(values, path);
    }
    
    return true;
};

function parseTo(to, values, path) {
    const toStr = isFn(to) ? to(values, path) : to;
    
    if (!toStr)
        return null;
    
    if (isObj(toStr))
        return toStr;
    
    return template.ast.fresh(toStr);
}

