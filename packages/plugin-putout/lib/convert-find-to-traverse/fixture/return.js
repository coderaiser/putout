module.exports.find = (ast, {push}) => {
    const traverseFn = traverseFunction(push);
    
    traverse(ast, {
        FunctionExpression: traverseFn,
        FunctionDeclaration: traverseFn,
    });
    
    return 'hi';
};
