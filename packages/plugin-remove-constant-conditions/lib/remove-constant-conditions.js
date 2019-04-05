'use strict';

const {runInNewContext} = require('vm');

module.exports.report = () => 'constant conditions should not be used';

module.exports.fix = ({path, consequentPath, result}) => {
    const {alternate} = path.node;
    
    if (result)
        return path.replaceWithMultiple(consequentPath.node.body);
    
    if (!alternate)
        return path.remove();
    
    path.replaceWith(alternate);
};

module.exports.find = (ast, {push, generate, traverse}) => {
    traverse(ast, {
        IfStatement(path) {
            const testPath = path.test;
            const consequentPath = path.consequent;
            
            if (containsIdentifiers(testPath))
                return;
            
            const {node} = testPath;
            const {code} = generate(node);
            const result = runInNewContext(code);
            
            push({
                path,
                result,
                consequentPath,
            });
        },
    });
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

