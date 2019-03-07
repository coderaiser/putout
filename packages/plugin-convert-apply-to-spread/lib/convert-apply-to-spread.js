'use strict';

const {
    generate,
    types,
} = require('putout');

const {spreadElement} = types;

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
            
            const [context] = path.node.arguments;
            const {node} = calleePath.get('object');
            
            const is = compare(node, context);
            
            if (!is)
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

function compare(object, context) {
    const objectCode = generate(object).code;
    const contextCode = generate(context).code;
    
    return !objectCode.indexOf(contextCode);
}

