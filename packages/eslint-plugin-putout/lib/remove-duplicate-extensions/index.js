const getValue = ({source}) => source?.value;

export const category = 'errors';
export const report = () => 'Avoid duplicate extensions in relative imports';
export const include = () => [
    'ImportDeclaration',
    'ImportExpression',
    'ExportAllDeclaration',
    'ExportNamedDeclaration',
];

export const fix = ({text}) => {
    return text.replace('.js.js', '.js');
};

export const filter = ({node}) => {
    const value = getValue(node);
    return /\.js\.js/.test(value);
};
