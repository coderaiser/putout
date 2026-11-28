import {types, operator} from 'putout';

const {
    variableDeclarator,
    variableDeclaration,
    isBinaryExpression,
} = types;

const {
    replaceWith,
    getBinding,
    isKeyword,
    compareAny,
    createTypeChecker,
} = operator;

export const report = (path) => {
    const {name} = path.node.left;
    return `Declare '${name}' before assignment`;
};

export const include = () => [
    'AssignmentExpression',
];

export const filter = createTypeChecker([
    ['-: node.left -> !Identifier'],
    ['-: parentPath -> !ExpressionStatement'],
    ['-', isKeywordBefore],
    ['-', isSameOperand],
    ['-: node.left.name', '=', 'exports'],
    ['-', isDeclared],
    ['+: -> +'],
]);

export const fix = (path) => {
    const {left, right} = path.node;
    const node = variableDeclaration('const', [
        variableDeclarator(left, right),
    ]);
    
    replaceWith(path, node);
};

function isKeywordBefore(path) {
    const prevPath = path.parentPath.getPrevSibling();
    
    if (!prevPath.isVariableDeclaration())
        return false;
    
    const {name} = prevPath.node.declarations.at(-1).id;
    
    return isKeyword(name);
}

function isDeclared(path) {
    const {name} = path.node.left;
    return getBinding(path, name);
}

function isSameOperand({node}) {
    const {left, right} = node;
    
    if (!isBinaryExpression(right))
        return false;
    
    return compareAny(left, [
        right.left,
        right.right,
    ]);
}
