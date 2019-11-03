'use strict';

const stub = () => [];
const filterStub = () => true;
const maybeArray = require('./maybe-array');

module.exports = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include,
        exclude = stub,
        filter = filterStub,
    } = plugin;
    
    const traverse = getTraverse(include(), filter);
    
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

const prePush = ({filter, push, options}) => (path) => {
    if (!filter(path, {options}))
        return;
    
    push(path);
};

const getTraverse = (include, filter) => ({push, options}) => {
    const result = {};
    const visitor = prePush({
        filter,
        push,
        options,
    });
    
    for (const str of include)
        result[str] = visitor;
    
    return result;
};

