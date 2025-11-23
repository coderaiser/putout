'use strict';

const {createDebug} = require('../debug');

const maybeArray = require('../maybe-array');
const {validate} = require('../validate');
const log = createDebug('putout:runner:include');
const stub = () => [];
const good = () => true;

module.exports.include = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include,
        exclude = stub,
        filter = good,
    } = plugin;
    
    validate('include', include);
    validate('report', report);
    
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
