const CallExpression = {
    print(path, {indent, print, maybe}) {
        traverse(path.get('callee'));
    }
};