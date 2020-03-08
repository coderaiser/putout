'use strict';

const {
    types,
    operator,
} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
} = operator;

const {isIdentifier} = types;

const {runInNewContext} = require('vm');

module.exports.report = () => 'constant conditions should not be used';

module.exports.fix = ({path, result}) => {
    const {
        alternate,
        consequent,
    } = path.node;
    
    if (result)
        return replaceWithMultiple(path, consequent.body);
    
    if (!alternate)
        return path.remove();
    
    replaceWith(path, alternate);
};

module.exports.traverse = ({push, generate}) => {
    return {
        IfStatement(path) {
            const testPath = path.get('test');
            const {
                left,
                right,
                operator,
            } = testPath.node;
            
            if (!containsIdentifiers(testPath)) {
                const {node} = testPath;
                const {code} = generate(node);
                const result = runInNewContext(code);
                
                return push({
                    path,
                    result,
                });
            }
            
            if (isIdentifier(left) && isIdentifier(right) && left.name === right.name)
                return push({
                    path,
                    result: /^===?$/.test(operator),
                });
        },
    };
};

function containsIdentifiers(testPath) {
    if (testPath.isIdentifier())
        return true;
    
    let is = false;
    
    testPath.traverse({
        Identifier(path) {
            is = true;
            path.stop();
        },
    });
    
    return is;
}

