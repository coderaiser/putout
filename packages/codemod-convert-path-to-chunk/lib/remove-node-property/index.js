'use strict';

module.exports.report = () => {
    return `"path.property should be used instead of "path.get('property')"`;
};

module.exports.find = (ast, {push, traverse}) => {
    traverse(ast, {
        MemberExpression(chunk) {
            if (chunk.property.name === 'node')
                push(chunk);
        },
    });
};

module.exports.fix = (chunk) => {
    chunk.replaceWith(chunk.object);
};

