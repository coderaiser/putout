'use strict';

const {operator} = require('putout');
const {remove} = operator;

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
        const initPath = mainPath.get('right');
        const leftPath = mainPath.get('left');
        
        if (isNestedMemberExpression(leftPath))
            return;
        
        check({
            mainPath,
            initPath,
            push,
        });
    },
    VariableDeclarator(mainPath) {
        const initPath = mainPath.get('init');
        check({
            mainPath,
            initPath,
            push,
        });
    },
});

function check({mainPath, initPath, push}) {
    if (!initPath.isIdentifier())
        return;
    
    const {name} = initPath.node;
    
    if (name === 'React')
        return;
    
    const binding = initPath.scope.bindings[name];
    
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
    
    const idName = binding.path.node.id.name;
    push({
        mainPath,
        idName,
        path: binding.path,
    });
}
