'use strict';

module.exports.report = () => 'Empty import statement';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ImportDeclaration(path) {
            const {specifiers} = path.node;
            
            if (!specifiers.length)
                push(path);
        },
    });
};

