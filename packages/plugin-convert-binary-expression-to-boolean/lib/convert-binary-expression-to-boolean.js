'use strict';

const {
    types,
    operator,
    template,
} = require('putout');

const {replaceWith} = operator;
const {isIdentifier} = types;

module.exports.report = () => 'constant conditions should be avoided';

module.exports.fix = ({path, value}) => {
    replaceWith(path, template.ast(String(value)));
};

module.exports.traverse = ({push}) => {
    return {
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
            
            const {confident, value} = path.evaluate();
            
            if (confident) {
                return push({
                    path,
                    value,
                });
            }
            
            if (sameIdentifiers(left, right))
                return push({
                    path,
                    value: /^===?$/.test(operator),
                });
        },
    };
};

function sameIdentifiers(left, right) {
    if (!isIdentifier(left))
        return false;
    
    if (!isIdentifier(right))
        return false;
    
    return left.name === right.name;
}
