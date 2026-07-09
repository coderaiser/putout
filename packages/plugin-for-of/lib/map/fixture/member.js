const funcs = node.funcs.map(({value}) => identifier(value));

node.leadingComments = comments.map((field) => ({
    type: 'CommentLine',
    value: field.value,
}));
