'use strict';

module.exports.report = () => `Use 'return' instead of 'yield'`;

module.exports.fix = (path) => {
    if (isFunction(path))
        return path.node.generator = false;
    
    const {argument} = path.node;
    replaceWith(path, ReturnStatement(argument));
};

module.exports.traverse = ({push}) => ({
    YieldExpression(path) {
        push(path);
    },
    
    Program: {
        exit(path) {
            path.traverse({
                Function(path) {
                    push(path);
                },
            });
        },
    },
});
