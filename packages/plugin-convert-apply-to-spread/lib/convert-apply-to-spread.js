'use strict';

const {
    spreadElement,
    isIdentifier,
} = require('putout').types;

module.exports.report = () => '"spread" should be used instead of "apply"';

module.exports.fix = (path) => {
    const calleePath = path.get('callee');
    calleePath.replaceWith(calleePath.get('object'));
    const [, argumentsPath] = path.get('arguments');
    
    path.node.arguments = [
        spreadElement(argumentsPath.node),
    ];
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        CallExpression(path) {
            const calleePath = path.get('callee');
            
            if (!calleePath.isMemberExpression())
                return;
            
            const {name} = calleePath.get('object').node;
            const [context] = path.node.arguments;
            
            if (!isIdentifier(context, {name}))
                return;
            
            const isApply = calleePath
                .get('property')
                .isIdentifier({
                    name: 'apply',
                });
            
            if (!isApply)
                return;
            
            push(path);
        },
    });
};

