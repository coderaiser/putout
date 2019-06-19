'use strict';

module.exports.report = () => 'Commonjs should be used insted of ESM';

module.exports.fix = require('./fix');

module.exports.traverse = ({
    push,
}) => {
    return {
        ExportNamedDeclaration(path) {
            push(path);
        },
        ExportDefaultDeclaration(path) {
            push(path);
        },
        ImportDeclaration(path) {
            push(path);
        },
    };
};

