import {createDebug} from '../debug.js';
import maybeArray from '../maybe-array.js';
import {validate} from '../validate.js';

const log = createDebug('putout:runner:include');
const stub = () => [];
const good = () => true;

export const include = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include,
        exclude = stub,
        filter = good,
    } = plugin;
    
    validate('include', include);
    validate('report', report);
    
    const includeItems = include();
    
    validate('include-items', includeItems);
    
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
