'use strict';

const {types, operator} = require('putout');

const {
    isArrayExpression,
    ArrayExpression,
    isObjectExpression,
} = types;

const {
    traverseProperties,
    __json,
} = operator;

module.exports.report = ({main}) => {
    const message = `Convert 'files' to an array`;
    
    if (isObjectExpression(main))
        return `${message}, this is the only type support by FlatConfig`;
    
    return `${message} to simplify migrating to FlatConfig`;
};

module.exports.fix = ({path, value}) => {
    path.node.value = ArrayExpression([value]);
};

module.exports.traverse = ({push}) => ({
    __object: traverseFiles(push),
    [__json]: traverseFiles(push),
});

const traverseFiles = (push) => (path) => {
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
