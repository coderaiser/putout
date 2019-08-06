'use strict';

const {types: t} = require('putout');

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
            const {node} = path;
            const {argument} = node;
            const declaratorPath = path.parentPath;
            
            if (!declaratorPath.isVariableDeclarator())
                return;
            
            if (!t.isCallExpression(argument))
                return;
            
            const {callee} = argument;
            
            if (!t.isMemberExpression(callee))
                return;
            
            if (!isPromiseResolve(argument.callee))
                return;
            
            const argumentPath = path.get('argument');
            push(argumentPath);
        },
    };
};

function isPromiseResolve({object, property}) {
    const isPromise = t.isIdentifier(object, {name: 'Promise'});
    const isResolve = t.isIdentifier(property, {name: 'resolve'});
    
    return isPromise && isResolve;
}

function parseParent(path) {
    return [
        path.parentPath,
        path.parentPath.parentPath,
    ];
}
