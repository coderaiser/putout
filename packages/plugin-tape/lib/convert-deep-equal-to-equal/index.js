import {types, operator} from 'putout';

const PRIMITIVES = new Set([
    'string',
    'number',
    'boolean',
    'undefined',
]);

const isPrimitive = (a) => a === null || PRIMITIVES.has(typeof a);

const {
    compute,
    compare,
    createTypeChecker,
} = operator;

const {isIdentifier} = types;

export const report = (path) => {
    const args = path.get('arguments');
    
    if (args.length === 2)
        return `Use 't.equal(${args[0]}, ${args[1]})' instead of '${path}' when comparing with primitive`;
    
    return `Use 't.equal(${args[0]}, ${args[1]}, ${args[2]})' instead of '${path} when comparing with primitive'`;
};

const isUndefinedName = (a) => isIdentifier(a, {
    name: 'undefined',
});

const isPrimitiveExpected = (path) => {
    const [is, value] = compute(path.get('arguments.1'));
    
    return is && isPrimitive(value);
};

const check = createTypeChecker([
    ['-: node.arguments.1 -> RegExpLiteral'],
    ['+: node.arguments.1 -> StringLiteral'],
    ['+: node.arguments.1 -> NumericLiteral'],
    ['+: node.arguments.1 -> BooleanLiteral'],
    ['+: node.arguments.1 -> NullLiteral'],
    ['+: node.arguments.1 -> BigIntLiteral'],
    ['+: node.arguments.1 -> TemplateLiteral'],
    ['+: node.arguments.1', isUndefinedName],
    ['+', isExpected],
    ['+', isPrimitiveExpected],
]);

export const match = () => ({
    't.deepEqual(__a, __b)': (vars, path) => check(path),
    't.deepEqual(__a, __b, __c)': (vars, path) => check(path),
});

export const replace = () => ({
    't.deepEqual(__a, __b)': 't.equal(__a, __b)',
    't.deepEqual(__a, __b, __c)': 't.equal(__a, __b, __c)',
});

function isExpected(path) {
    const secondArg = path.get('arguments.1');
    
    if (!secondArg.isIdentifier())
        return false;
    
    const {name} = secondArg.node;
    const binding = secondArg.scope.bindings[name];
    
    if (!binding)
        return false;
    
    if (!binding.path.isVariableDeclarator())
        return false;
    
    const initPath = binding.path.get('init');
    
    if (initPath.isTaggedTemplateExpression())
        return true;
    
    return compare(initPath, '__array.join(__b)');
}
