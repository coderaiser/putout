'use strict';

const {types, operator} = require('putout');
const {remove} = operator;
const {
    ObjectExpression,
    ObjectProperty,
} = types;

module.exports.report = () => `Merge 'return' with next sibling`;

module.exports.fix = ({path, nextPath}) => {
    let {node} = nextPath;
    
    if (!nextPath.isBlockStatement()) {
        node = node.expression;
    } else {
        const properties = [];
        
        for (const {label, body} of nextPath.node.body) {
            const property = ObjectProperty(label, body.expression);
            properties.push(property);
        }
        
        node = ObjectExpression(properties);
    }
    
    path.node.argument = node;
    remove(nextPath);
};
module.exports.traverse = ({push}) => ({
    ReturnStatement(path) {
        if (path.node.argument)
            return false;
        
        const nextPath = path.getNextSibling();
        
        if (!nextPath.isExpressionStatement() && !nextPath.isBlockStatement())
            return;
        
        push({
            path,
            nextPath,
        });
    },
});
