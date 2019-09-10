'use strict';

const pushVisitor = (name) => ({push}) => {
    return {
        [name](path) {
            push(path);
        },
    };
};

const merge = () => (a, b) => ({
    ...a,
    ...b,
});

module.exports = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include,
        exclude = [],
    } = plugin;
    const traverse = getTraverse(include);
    
    return {
        rule,
        msg,
        options: {
            exclude,
            ...options,
        },
        plugin: {
            report,
            fix,
            traverse,
        },
    };
};

function getTraverse(include) {
    if (!include.length)
        return pushVisitor('enter');
    
    const fns = include.map(pushVisitor);
    return fns.reduce(merge);
}

