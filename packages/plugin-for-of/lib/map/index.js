import {
    types,
    operator,
    template,
} from 'putout';

const {
    compare,
    replaceWith,
    insertAfter,
} = operator;

const {
    isReturnStatement,
    isBlockStatement,
    isTryStatement,
    isArrayPattern,
    isCallExpression,
    blockStatement,
    continueStatement,
    expressionStatement,
    identifier,
} = types;

const createPush = template('%%ARRAY%%.push(%%ARGUMENT%%)');
const createLoop = template('for (const %%ITEM%% of %%LIST%%) %%BODY%%');

const createBody = (array, body) => {
    if (isBlockStatement(body))
        return body;
    
    const push = createPush({
        ARRAY: array,
        ARGUMENT: body,
    });
    
    return blockStatement([
        expressionStatement(push),
    ]);
};

const tail = (body) => body.at(-1);

export const report = () => `Use 'for..of' instead of 'map'`;

export const match = () => ({
    '__a.map((__b) => __c)': ({__c}, path) => {
        if (!path.parentPath.isExpressionStatement())
            return false;
        
        if (!isBlockStatement(__c))
            return false;
        
        const last = tail(__c.body);
        
        if (isTryStatement(last))
            return false;
        
        return !isReturnStatement(last);
    },
    'const __a = __b.map((__c) => __d)': ({__a, __b, __c, __d}) => {
        if (isCallExpression(__b))
            return false;
        
        if (compare(__c, __d))
            return false;
        
        return !isArrayPattern(__a);
    },
    '__a = __b.map((__c) => __d)': ({__a, __b}) => {
        if (compare(__a, __b))
            return false;
        
        return !isCallExpression(__b);
    },
});

export const replace = () => ({
    '__a.map((__b) => __c)': (vars, path) => {
        const a = path.get('callee.object');
        const b = path.get('arguments.0.params.0');
        
        return `for (const ${b} of ${a}) __c`;
    },
    'const __a = __b.map((__c) => __d)': ({__a, __b, __c, __d}, path) => {
        if (isBlockStatement(__d))
            path.traverse(createVisitor(__a, __d));
        
        insertAfter(path, createLoop({
            ITEM: __c,
            LIST: __b,
            BODY: createBody(__a, __d),
        }));
        
        return 'const __a = []';
    },
    '__a = __b.map((__c) => __d)': ({__a, __d}, path) => {
        if (isBlockStatement(__d)) {
            path.traverse(createVisitor(__a, __d));
            return `{
                 __a = [];
                for (const __c of __b) __d;
            }`;
        }
        
        return `{
            __a = [];
            for (const __c of __b) {
                __a.push(__d);
            }
        }`;
    },
});

const isTail = (path, body) => {
    if (path.parentPath.node !== body)
        return false;
    
    return tail(body.body) === path.node;
};

const skipNested = (body) => (path) => {
    if (path.node.body !== body)
        path.skip();
};

const createVisitor = (__a, body) => ({
    Function: skipNested(body),
    ReturnStatement: createReplaceWithPush(__a, body),
});

const createReplaceWithPush = (__a, body) => (path) => {
    const argument = path.node.argument || identifier('undefined');
    const push = createPush({
        ARRAY: __a,
        ARGUMENT: argument,
    });
    
    if (isTail(path, body)) {
        replaceWith(path, push);
        return;
    }
    
    replaceWith(path, blockStatement([
        expressionStatement(push),
        continueStatement(),
    ]));
};
