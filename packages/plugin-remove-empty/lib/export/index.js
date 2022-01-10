'use strict';

module.exports.report = () => 'Remove empty export';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.include = () => [
    'ExportNamedDeclaration',
];

module.exports.filter = (path) => {
    const {specifiers, declaration} = path.node;
    return !declaration && !specifiers.length;
};

