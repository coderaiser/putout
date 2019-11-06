'use strict';

const {
    generate,
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;

const {
    spreadElement,
    isNullLiteral,
} = types;

module.exports.report = () => 'spread should be used instead of "apply"';

module.exports.fix = (path) => {
    const calleePath = path.get('callee');
    replaceWith(calleePath, calleePath.get('object'));
    const [, argumentsPath] = path.get('arguments');
    
    replaceWith(path.get('arguments.0'), spreadElement(argumentsPath.node));
    argumentsPath.remove();
};

module.exports.include = () => [
    '__.__(__args)',
];

module.exports.filter = (path) => {
    const calleePath = path.get('callee');
    
    const [context] = path.node.arguments;
    const {node} = calleePath.get('object');
    
    const is = isNullLiteral(context) || compare(node, context);
    
    if (!is)
        return false;
    
    const isApply = calleePath
        .get('property')
        .isIdentifier({
            name: 'apply',
        });
    
    if (!isApply)
        return false;
    
    return true;
};

function compare(object, context) {
    const comments = false;
    const objectCode = generate(object, {comments}).code;
    const contextCode = generate(context, {comments}).code;
    
    return !objectCode.indexOf(contextCode);
}

