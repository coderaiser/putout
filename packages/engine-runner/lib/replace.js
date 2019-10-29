'use strict';

const {template} = require('@putout/engine-parser');
const {replaceWith} = require('@putout/operate');
const {compare} = require('@putout/compare');

const stub = () => [];
const packKeys = (a) => () => Object.keys(a);

module.exports = ({rule, plugin, msg, options}) => {
    const {
        report,
        exclude = stub,
        replace,
    } = plugin;
    
    const replaceItems = replace();
    const fix = getFix(replaceItems);
    const include = packKeys(replaceItems);
    
    return {
        rule,
        msg,
        options: {
            ...options,
            exclude: [
                ...exclude(),
                ...options.exclude || [],
            ],
        },
        plugin: {
            report,
            fix,
            include,
        },
    };
};

const fix = (from, to, path) => {
    if (!compare(path, from))
        return;
    
    replaceWith(path, template.ast(to));
};

const getFix = (items) => (path) => {
    for (const [from, to] of Object.entries(items))
        fix(from, to, path);
};

