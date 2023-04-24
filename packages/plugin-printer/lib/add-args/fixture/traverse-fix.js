module.exports.ForOfStatement = {
    print(path, {indent, print, maybe, traverse}) {
        const bodyPath = path.get('body');
        
        if (bodyPath.isExpressionStatement()) {
            traverse(bodyPath);
        }
    },
};
