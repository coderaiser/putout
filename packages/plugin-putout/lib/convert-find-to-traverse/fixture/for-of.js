module.exports.find = (ast, {traverse, push}) => {
    const members = [];
    const initPaths = [];
    
    traverse(ast, {
        VariableDeclarator(path) {},
    });
    
    for (const [currentCode, expandPath] of members) {}};
