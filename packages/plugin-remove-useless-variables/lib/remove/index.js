'use strict';

const {operator} = require('putout');
const {remove, compare} = operator;

const isNestedMemberExpression = (path) => {
    return path.isMemberExpression() && path.get('object').isMemberExpression();
};

module.exports.report = ({idName}) => `Useless variable declaration with name "${idName}"`;

module.exports.fix = ({mainPath, path}) => {
    const {init} = path.node;
    remove(path);
    
    if (mainPath.isAssignmentExpression()) {
        mainPath.node.right = init;
        return;
    }
    
    mainPath.node.init = init;
};

module.exports.traverse = ({push}) => ({
    AssignmentExpression(mainPath) {
        const leftPath = mainPath.get('left');
        const rightPath = mainPath.get('right');
        
        if (isNestedMemberExpression(leftPath))
            return;
        
        check({
            mainPath,
            rightPath,
            leftPath,
            push,
        });
    },
    VariableDeclarator(mainPath) {
        const leftPath = mainPath.get('id');
        const rightPath = mainPath.get('init');
        
        check({
            mainPath,
            leftPath,
            rightPath,
            push,
        });
    },
});

function check({mainPath, leftPath, rightPath, push}) {
    if (!rightPath.isIdentifier())
        return;
    
    const {name} = rightPath.node;
    
    if (name === 'React')
        return;
    
    const binding = rightPath.scope.bindings[name];
    
    if (!binding)
        return;
    
    if (binding.constantViolations.length)
        return;
    
    if (binding.references > 1)
        return;
    
    if (!binding.path.isVariableDeclarator())
        return;
    
    if (!binding.path.get('id').isIdentifier())
        return;
    
    if (compare(leftPath, binding.path.node.init))
        return;
    
    if (binding.path.get('init').isMemberExpression())
        return;
    
    const idName = binding.path.node.id.name;
    
    push({
        mainPath,
        idName,
        path: binding.path,
    });
}
