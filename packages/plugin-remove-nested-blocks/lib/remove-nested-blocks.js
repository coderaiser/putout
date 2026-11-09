import {operator} from 'putout';

const {
    replaceWithMultiple,
    createTypeChecker,
} = operator;

const {keys} = Object;
const is = (name) => (a) => a === name;

const isBlockedByPrev = createTypeChecker([
    ['+: -> ExportNamedDeclaration'],
    ['+: node.expression.name', is('assert')],
    ['-: -> !ReturnStatement'],
    ['+: node.argument', isMissing],
]);

const isSwitchCase = createTypeChecker([
    ['+: parentPath -> SwitchCase'],
]);

const isSingleStatement = createTypeChecker([
    ['-: container.length', '>', 1],
    ['+: container.length', '>', 0],
]);

const isParentBlock = createTypeChecker([
    ['+: parentPath -> BlockStatement'],
    ['+: parentPath -> Program'],
]);

function isMissing(a) {
    return !a;
}

export const report = () => 'Avoid nested blocks';

export const fix = (path) => {
    replaceWithMultiple(path, path.node.body);
};

export const include = () => [
    'BlockStatement',
];

const callWithPrev = (fn) => (path) => fn(path.getPrevSibling());

const isSwitchBinding = (path) => {
    const {bindings} = path.scope;
    
    if (!isSwitchCase(path))
        return false;
    
    return !keys(bindings).length;
};

export const filter = createTypeChecker([
    ['-', callWithPrev(isBlockedByPrev)],
    ['+', isSwitchBinding],
    ['-: -> !', isParentBlock],
    ['+: -> !', isIntersect],
    ['+', isSingleStatement],
]);

function isIntersect(path) {
    const {bindings} = path.scope;
    
    for (const key of keys(bindings)) {
        if (path.parentPath.scope.hasBinding(key))
            return true;
    }
    
    return false;
}
