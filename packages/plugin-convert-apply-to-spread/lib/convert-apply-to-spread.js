'use strict';

const {replaceWith} = require('putout').operate;

const {
    generate,
    types,
} = require('putout');

const {spreadElement} = types;

module.exports.report = () => '"spread" should be used instead of "apply"';

module.exports.fix = (path) => {
    const calleePath = path.get('callee');
    replaceWith(calleePath, calleePath.get('object'));
    const [, argumentsPath] = path.get('arguments');
    
    replaceWith(path.get('arguments.0'), spreadElement(argumentsPath.node));
    argumentsPath.remove();
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
    const comments = false;
    const objectCode = generate(object, {comments}).code;
    const contextCode = generate(context, {comments}).code;
    
    return !objectCode.indexOf(contextCode);
}

