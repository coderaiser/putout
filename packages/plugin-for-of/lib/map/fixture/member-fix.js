{
    const funcs = [];
    
    for (const {value} of node.funcs) {
        funcs.push(identifier(value));
    }
}
{
    node.leadingComments = [];
    
    for (const field of comments) {
        node.leadingComments.push({
            type: 'CommentLine',
            value: field.value,
        });
    }
}
