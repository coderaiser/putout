'use strict';

const {
    types,
    operator,
} = require('putout');

const {replaceWith} = operator;

const {
    isIdentifier,
    BooleanLiteral,
} = types;

const {runInNewContext} = require('vm');

module.exports.report = () => 'constant conditions should be avoided';

module.exports.fix = ({path, boolean}) => {
    replaceWith(path, BooleanLiteral(boolean));
};

module.exports.traverse = ({push, generate}) => {
    return {
        BinaryExpression(path) {
            const {node} = path;
            const {
                left,
                right,
                operator,
            } = path.node;
            
            if (!/<|>|===?|!===?/.test(operator))
                return;
            
            if (operator === '<<' || operator === '>>')
                return;
            
            if (!containsIdentifiers(path)) {
                const {code} = generate(node);
                const boolean = runInNewContext(code);
                
                return push({
                    path,
                    boolean,
                });
            }
            
            if (sameIdentifiers(left, right))
                return push({
                    path,
                    boolean: /^===?$/.test(operator),
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

function containsIdentifiers(testPath) {
    let is = false;
    
    testPath.traverse({
        Identifier(path) {
            is = true;
            path.stop();
        },
    });
    
    return is;
}
