'use strict';

const {types, operator} = require('putout');

const {replaceWith, compute} = operator;

const {isIdentifier, booleanLiteral} = types;

module.exports.report = () => 'Avoid constant conditions';

module.exports.fix = ({path, value}) => {
    replaceWith(path, booleanLiteral(value));
};

module.exports.traverse = ({push}) => ({
    BinaryExpression(path) {
        const {
            left,
            right,
            operator,
        } = path.node;
        
        if (!/<|>|===?|!===?/.test(operator))
            return;
        
        if (/<<|>>/.test(operator))
            return;
        
        const [confident, value] = compute(path);
        
        if (confident)
            return push({
                path,
                value,
            });
        
        if (sameIdentifiers(left, right))
            return push({
                path,
                value: /^===?$/.test(operator),
            });
    },
});

function sameIdentifiers(left, right) {
    if (!isIdentifier(left))
        return false;
    
    if (!isIdentifier(right))
        return false;
    
    return left.name === right.name;
}
