'use strict';

module.exports.report = () => 'Commonjs should be used insted of ESM';

module.exports.fix = require('./fix');

module.exports.find = (ast, {traverse}) => {
    const places = [];
    
    traverse(ast, {
        ExportNamedDeclaration(path) {
            places.push(path);
        },
        ExportDefaultDeclaration(path) {
            places.push(path);
        },
        ImportDeclaration(path) {
            places.push(path);
        },
    });
    
    return places;
};

