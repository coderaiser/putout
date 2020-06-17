'use strict';

module.exports.report = () => `Promise.resolve has no sense in async function`;

module.exports.fix = (path) => {
    const {node} = path;
    const [declaratorPath, declarationPath] = parseParent(path);
    
    const [oldArg] = node.arguments;
    const newArg = declarationPath.node.id;
    
    declaratorPath.node.argument = oldArg;
    path.scope.rename(newArg.name, oldArg.name);
    declarationPath.remove();
};

module.exports.traverse = ({push}) => {
    return {
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
    };
};

function parseParent(path) {
    return [
        path.parentPath,
        path.parentPath.parentPath,
    ];
}
