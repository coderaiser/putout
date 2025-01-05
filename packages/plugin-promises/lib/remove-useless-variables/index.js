'use strict';

const {operator} = require('putout');
const {remove, rename} = operator;

module.exports.report = () => `'Promise.resolve()' has no sense in async function`;

module.exports.fix = (path) => {
    const {node} = path;
    const [declaratorPath, declarationPath] = parseParent(path);
    
    const [oldArg] = node.arguments;
    const newArg = declarationPath.node.id;
    
    declaratorPath.node.argument = oldArg;
    rename(path, newArg.name, oldArg.name);
    remove(declarationPath);
};

module.exports.traverse = ({push}) => ({
    AwaitExpression(path) {
        const argumentPath = path.get('argument');
        const declaratorPath = path.parentPath;
        
        if (!declaratorPath.isVariableDeclarator())
            return;
        
        if (!argumentPath.isCallExpression())
            return;
        
        if (!argumentPath.get('callee').matchesPattern('Promise.resolve'))
            return;
        
        push(argumentPath);
    },
});

const parseParent = (path) => [
    path.parentPath,
    path.parentPath.parentPath,
];
