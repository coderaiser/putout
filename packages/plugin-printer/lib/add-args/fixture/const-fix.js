const CallExpression = {
    print(path, {indent, print, maybe, traverse}) {
        traverse(path.get('callee'));
    },
};
