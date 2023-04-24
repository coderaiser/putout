module.exports.ForOfStatement = {
    print(path, {indent, print, maybe}) {
        const bodyPath = path.get('body');
        
        if (bodyPath.isExpressionStatement()) {
            traverse(bodyPath);
        }
    }
}