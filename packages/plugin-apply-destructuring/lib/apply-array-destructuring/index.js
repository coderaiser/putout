'use strict';

const {
    types,
    operate,
} = require('putout');

const {replaceWith} = operate;
const {arrayPattern} = types;

module.exports.fix = ({path, initPath}) => {
    replaceWith(initPath, initPath.node.object);
    
    replaceWith(path, arrayPattern([
        path.node,
    ]));
};

module.exports.report = ({path}) => {
    const {name} = path.node;
    return `Array destructuring should be used for "${name}"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        AssignmentExpression(path) {
            destructure(push, path.get('left'), path.get('right'));
        },
        VariableDeclarator(path) {
            destructure(push, path.get('id'), path.get('init'));
        },
    });
};

function destructure(push, path, initPath) {
    if (!initPath.isMemberExpression())
        return;
    
    if (!initPath.get('property').isLiteral({value: 0}))
        return;
    
    if (!path.isIdentifier())
        return;
    
    push({
        path,
        initPath,
    });
}

