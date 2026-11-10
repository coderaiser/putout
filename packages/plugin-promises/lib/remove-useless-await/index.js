import {operator} from 'putout';

const {
    superTraverse,
    createTypeChecker,
    getBinding,
} = operator;

const isNotFunction = (a) => !a.isFunction();

const isTypePromise = createTypeChecker([
    [
        '+: node.returnType.typeAnnotation.typeName.name',
        '=',
        'Promise',
    ],
]);

const isSyncFunction = createTypeChecker([
    ['-: path', isNotFunction],
    ['-: path', looksLikePromise],
    ['-: path', isTypePromise],
    ['-: path.node.async', Boolean],
    ['+', Boolean],
]);

const isSyncCallee = (path) => {
    const {name} = path.node.argument.callee;
    const binding = getBinding(path, name);
    
    if (!binding)
        return false;
    
    return isSyncFunction(binding);
};

export const report = () => `Avoid useless 'await'`;

export const exclude = () => [
    'await new Promise(__args)',
    'await __a.__b?.(__args)',
    'await __a?.(__args)',
    'await __a(__args)?.__b(__args)',
    'await __a?.(__args).catch(__args)',
    'await import(__a)',
    'await import(__a, __b)',
];

export const replace = () => ({
    'await await __a': 'await __a',
    'await __a': '__a',
});

export const filter = createTypeChecker([
    ['-: node.argument -> TaggedTemplateExpression'],
    ['+: node.argument -> AwaitExpression'],
    ['-: node.argument -> Identifier'],
    ['-: node.argument -> LogicalExpression'],
    ['-: node.argument -> MemberExpression'],
    ['+: node.argument -> !CallExpression'],
    ['-: node.argument.callee -> !Identifier'],
    ['+', isSyncCallee],
]);

function looksLikePromise(path) {
    let is = false;
    
    const markFound = (path) => {
        is = true;
        path.stop();
    };
    
    superTraverse(path.node, {
        'new Promise(__a)': markFound,
        'Promise.__(__args)': markFound,
    });
    
    return is;
}
