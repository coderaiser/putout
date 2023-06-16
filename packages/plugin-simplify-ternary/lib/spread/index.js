'use strict';

const {types} = require('putout');
const {
    isNullLiteral,
    isObjectExpression,
    LogicalExpression,
} = types;

module.exports.report = () => 'Simplify ternary';

module.exports.fix = (path) => {
    const {test, consequent} = path.node.argument;
    
    path.node.argument = LogicalExpression('&&', test, consequent);
};
module.exports.traverse = ({push}) => ({
    SpreadElement(path) {
        const argPath = path.get('argument');
        
        if (!argPath.isConditionalExpression())
            return;
        
        const {alternate} = path.node.argument;
        
        if (isObjectExpression(alternate) && !alternate.properties.length)
            push(path);
        
        if (isNullLiteral(alternate))
            push(path);
    },
});
