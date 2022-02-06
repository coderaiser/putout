module.exports = (node) => {
    const {
        tokens,
        hello = 'world',
    } = node;
    
    const ast = {
        type: 'File',
        program: {
            ...program,
            directives: [],
        },
        comments: [],
        tokens,
    };
    
    return ast;
};

