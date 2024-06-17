let is;

traverse(ast, {
    AssignmentExpression(path) {
        const leftPath = path.get('left');
        
        is = operate.isModuleExports(leftPath);
        
        path.stop();
    },
});
