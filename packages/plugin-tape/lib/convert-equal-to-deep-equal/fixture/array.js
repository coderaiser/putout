test('putout: operate: replaceWith: comments', (t) => {
    const comments = [];
    const isExpressionStatement = stub().returns(false);
    
    const parentPath = {
        isExpressionStatement,
    };
    
    const node = {
        comments,
    };
    
    const newNode = {};
    
    const path = {
        node,
        parentPath,
        replaceWith: stub(),
    };
    
    replaceWith(path, newNode);
    
    t.equal(path.node.comments, comments);
    t.end();
});

