'use strict';

const {runInNewContext} = require('vm');

module.exports.report = () => 'constant conditions should not be used';

module.exports.fix = ({path, consequentPath, result}) => {
    if (!result)
        return path.remove();
    
    path.replaceWithMultiple(consequentPath.node.body);
};

module.exports.find = (ast, {push, generate, traverse}) => {
    traverse(ast, {
        IfStatement(path) {
            const testPath = path.get('test');
            const consequentPath = path.get('consequent');
            
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

