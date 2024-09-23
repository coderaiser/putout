'use strict';

const {operator, types} = require('putout');
const {isCallExpression} = types;
const {remove} = operator;

module.exports.report = () => `Avoid useless constructor`;

module.exports.fix = (path) => {
    remove(path);
};

module.exports.traverse = ({push}) => ({
    ClassMethod(path) {
        const {node} = path;
        
        if (node.key.name !== 'constructor')
            return;
        
        if (node.body.body.length > 1)
            return;
        
        const [first] = node.body.body;
        
        if (!isCallExpression(first?.expression) || first.expression.callee.type !== 'Super')
            return;
        
        push(path);
    },
});
