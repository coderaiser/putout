'use strict';

module.exports.category = 'layout';
module.exports.report = () => 'Add newlines between specifiers';

module.exports.include = () => [
    'ExportNamedDeclaration',
];

module.exports.fix = ({text}) => {
    return text
        .replace(/,\s+/g, ',\n    ')
        .replace(/{/g, '{\n')
        .replace(/}/g, '\n}')
        .replace(/{\n+/g, '{\n')
        .replace(/\n+}/g, '\n}');
};

module.exports.filter = ({text, node}) => {
    const regExp = /, +?[a-zA-Z]/g;
    
    if (node.specifiers.length < 4)
        return false;
    
    return regExp.test(text);
};

