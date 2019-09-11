'use strict';

const stub = () => [];
const filterStub = () => true;

module.exports = ({rule, plugin, msg, options}) => {
    const {
        fix,
        report,
        include = stub,
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

const prePush = ({filter, push}) => (path) => {
    if (!filter(path))
        return;
    
    push(path);
};

const oneTraverse = (filter) => ({push}) => ({
    enter: prePush({
        filter,
        push,
    })
});

const manyTraverse = (include, filter) => ({push}) => {
    const result = {};
    const visitor = prePush({
        filter,
        push,
    });
    
    for (const str of include)
        result[str] = visitor;
    
    return result;
};

function getTraverse(include, filter) {
    if (!include.length)
        return oneTraverse(filter);
    
    return manyTraverse(include, filter);
}

