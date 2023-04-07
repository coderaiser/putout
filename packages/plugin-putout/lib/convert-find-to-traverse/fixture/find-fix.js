module.exports.traverse = ({push, traverse}) => {
    const traverseFn = traverseFunction(push);
    
    return {
        FunctionExpression: traverseFn,
        FunctionDeclaration: traverseFn,
    };
};
