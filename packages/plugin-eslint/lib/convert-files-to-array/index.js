'use strict';

const {types, operator} = require('putout');
const {
    isArrayExpression,
    isObjectExpression,
    arrayExpression,
} = types;

const {
    traverseProperties,
    __json,
    compare,
} = operator;

module.exports.report = ({main}) => {
    const message = `Convert 'files' to an array`;
    
    if (isObjectExpression(main))
        return `${message}, this is the only type support by FlatConfig`;
    
    return `${message} to simplify migrating to FlatConfig`;
};

module.exports.fix = ({path, value}) => {
    path.node.value = arrayExpression([value]);
};

module.exports.traverse = ({push}) => ({
    __object: traverseFiles(push, 'flat'),
    [__json]: traverseFiles(push),
});

const traverseFiles = (push, type) => (path) => {
    if (type === 'flat' && compare(path, __json))
        return;
    
    const filesList = traverseProperties(path, 'files');
    
    for (const files of filesList) {
        const {value} = files.node;
        
        if (isArrayExpression(value))
            continue;
        
        push({
            path: files,
            value,
            main: path,
        });
    }
};
