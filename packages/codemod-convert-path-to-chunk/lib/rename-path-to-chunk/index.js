'use strict';

module.exports.report = () => {
    return `"path.property should be used instead of "path.get('property')"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        Identifier(chunk) {
            if (chunk.name === 'path')
                push(chunk);
        },
    });
};

module.exports.fix = (chunk) => {
    chunk.name = 'chunk';
};

