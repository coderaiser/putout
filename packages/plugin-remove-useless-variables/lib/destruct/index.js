'use strict';

const {
    types,
    operator,
} = require('putout');

const {isIdentifier} = types;

const {replaceWith} = operator;

const sum = (a, b) => a + b.key.name.length;

module.exports.report = (path) => {
    return `Remove useless variable '${path.node.declarations[0].init.name}'`;
};

module.exports.match = () => ({
    'const __object = __a': ({__a, __object}, path) => {
        const {parentPath} = path.parentPath;
        
        if (!parentPath)
            return false;
        
        if (!parentPath.isFunction())
            return false;
        
        if (path.node !== parentPath.node.body.body[0])
            return false;
        
        const {params} = parentPath.node;
        
        if (params.length !== 1)
            return false;
        
        const [first] = params;
        
        if (__object.properties.length > 3)
            return false;
        
        if (!isIdentifier(first))
            return false;
        
        if (__a.name !== first.name)
            return false;
        
        if (path.scope.bindings[first.name].references > 1)
            return false;
        
        const namesLength = __object.properties.reduce(sum, 0);
        
        return namesLength < 20;
    },
});

module.exports.replace = () => ({
    'const __object = __a': ({__object}, path) => {
        replaceWith(path.parentPath.parentPath.get('params.0'), __object);
    },
});

