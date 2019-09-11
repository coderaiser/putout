'use strict';

const stub = () => [];

module.exports = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include = stub,
        exclude = stub,
    } = plugin;
    
    const traverse = getTraverse(include());
    
    return {
        rule,
        msg,
        options: {
            ...options,
            exclude: [
                exclude(),
                ...options.exclude || [],
            ],
        },
        plugin: {
            report,
            fix,
            traverse,
        },
    };
};

const oneTraverse = ({push}) => ({
    enter: push,
});

const manyTraverse = (include) => ({push}) => {
    const result = {};
    
    for (const str of include)
        result[str] = push;
    
    return result;
};

function getTraverse(include) {
    if (!include.length)
        return oneTraverse;
    
    return manyTraverse(include);
}

