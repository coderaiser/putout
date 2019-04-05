'use strict';

module.exports.report = () => 'Empty import statement';

module.exports.fix = (chunk) => {
    chunk.remove();
};

const isCSS = (a) => /\.css/.test(a);

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        ImportDeclaration(chunk) {
            const {
                specifiers,
                source,
            } = chunk.node;
            const {value} = source;
            
            if (!specifiers.length && !isCSS(value))
                push(chunk);
        },
    });
};

