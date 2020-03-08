'use strict';

const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const {
    compare,
    findVarsWays,
    getValues,
    setValues,
} = require('@putout/compare');

const maybeArray = require('./maybe-array');

const {keys, entries} = Object;

const stub = () => [];
const packKeys = (a) => () => keys(a);

module.exports = ({rule, plugin, msg, options}, {}) => {
    const {
        report,
        exclude = stub,
        replace,
        filter,
    } = plugin;
    
    const replaceItems = replace({findVarsWays, getValues});
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
const parseTo = (to, values) => isFn(to) ? to(values) : to;

const fix = (from, to, path) => {
    const nodeFrom = template.ast(from);
    const watermark = `${from} -> ${to}`;
    
    path._putout = path._putout || [];
    
    if (path._putout.includes(watermark))
        return;
    
    if (!compare(path, nodeFrom))
        return;
    
    if (!to)
        return path.remove();
    
    const waysFrom = findVarsWays(nodeFrom);
    const {node} = path;
    
    const values = getValues({
        waysFrom,
        node,
    });
    
    const toStr = parseTo(to, values);
    const nodeTo = template.ast.fresh(toStr);
    const waysTo = findVarsWays(nodeTo);
    const newPath = replaceWith(path, nodeTo);
    
    setValues({
        waysTo,
        values,
        path: newPath,
    });
    
    path._putout.push(watermark);
};

const getFix = (items) => (path) => {
    for (const [from, to] of entries(items))
        fix(from, to, path);
};

