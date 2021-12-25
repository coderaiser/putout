'use strict';

const log = require('debug')('putout:runner:include');
const maybeArray = require('./maybe-array');

const {stringify} = JSON;
const stub = () => [];
const good = () => true;
const isFn = (a) => typeof a === 'function';

module.exports = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include,
        exclude = stub,
        filter = good,
    } = plugin;

    if (!isFn(include))
        throw Error(`☝️ Looks like "include" is not a function: ${stringify(include)}. More on using Includer: https://git.io/JqcMn`);

    const traverse = getTraverse(include(), filter, rule);

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
            traverse,
        },
    };
};

const prePush = ({rule, filter, push, options}) => (path) => {
    log(rule);
    
    if (!filter(path, {options}))
        return;
    
    push(path);
};

const getTraverse = (include, filter, rule) => ({push, options}) => {
    const result = {};
    const visitor = prePush({
        rule,
        filter,
        push,
        options,
    });
    
    for (const str of include)
        result[str] = visitor;
    
    return result;
};

