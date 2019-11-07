'use strict';

module.exports.report = () => 'Empty import statement';

module.exports.fix = (path) => {
    path.remove();
};

const isCSS = (a) => /\.css/.test(a);
const isMin = (a) => /\.min\./.test(a);

module.exports.include = () => [
    'ImportDeclaration',
];

module.exports.filter = (path, {options}) => {
    const {
        specifiers,
        source,
    } = path.node;
    
    const {ignore = []} = options;
    const {value} = source;
    
    if (ignore.includes(value))
        return false;
    
    if (specifiers.length) {
        return false;
    }
    
    if (isCSS(value))
        return false;
    
    if (isMin(value))
        return false;
    
    return true;
};

