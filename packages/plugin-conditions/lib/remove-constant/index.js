'use strict';

const {runInNewContext} = require('node:vm');
const {types, operator} = require('putout');

const {
    replaceWith,
    replaceWithMultiple,
    remove,
} = operator;

const {isIdentifier} = types;

module.exports.report = () => 'Avoid constant conditions';

module.exports.fix = ({path, result}) => {
    const {alternate, consequent} = path.node;
    
    const {body = [consequent]} = consequent;
    
    if (result)
        return replaceWithMultiple(path, body);
    
    if (!alternate)
        return remove(path);
    
    replaceWith(path, alternate);
};

module.exports.traverse = ({push, generate}) => ({
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
});

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
