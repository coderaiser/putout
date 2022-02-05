module.exports = (node) => {
    const {
        tokens,
        ...program
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

