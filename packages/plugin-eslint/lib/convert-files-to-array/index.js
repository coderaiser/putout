'use strict';

const {types, operator} = require('putout');

const {
    isArrayExpression,
    ArrayExpression,
} = types;

const {
    traverseProperties,
    __json,
} = operator;

module.exports.report = () => `Convert 'files' to an array to simplify migrating to FlatConfig`;

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
        });
    }
};
