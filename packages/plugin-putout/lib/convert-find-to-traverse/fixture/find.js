module.exports.find = (ast, {push, traverse}) => {
    const traverseFn = traverseFunction(push);

    traverse(ast, {
        FunctionExpression: traverseFn,
        FunctionDeclaration: traverseFn,
    });
};
