'use strict';

const {operator, types} = require('putout');
const {
    isCallExpression,
    isIdentifier,
} = types;

const {remove} = operator;

module.exports.report = () => `Avoid useless 'printer' option`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ObjectProperty(path) {
        const {value} = path.node;
        
        if (value.value !== 'putout')
            return;
        
        const {parentPath} = path.parentPath;
        
        if (!isCallExpression(parentPath))
            return;
        
        const name = 'createTest';
        
        if (!isIdentifier(parentPath.node.callee, {name}))
            return;
        
        push(path);
    },
});
