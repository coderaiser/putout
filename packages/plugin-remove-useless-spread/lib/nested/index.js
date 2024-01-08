'use strict';

const {operator} = require('putout');
const {remove, insertAfter} = operator;

module.exports.report = () => `Remove useless nested spread`;

module.exports.fix = ({path, argPath}) => {
    const elements = argPath.get('elements');
    
    for (const element of elements.reverse())
        insertAfter(path, element.node);
    
    remove(path);
};

module.exports.traverse = ({push}) => ({
    SpreadElement(path) {
        const {parentPath} = path;
        const argPath = path.get('argument');
        
        if (parentPath.isCallExpression())
            return;
        
        if (!argPath.isArrayExpression())
            return;
        
        push({
            path,
            argPath,
        });
    },
});
