export const category = 'layout';
export const report = () => 'Add newlines between specifiers';

export const include = () => [
    'ExportNamedDeclaration',
];

export const fix = ({text}) => {
    return text
        .replace(/,\s+/g, ',\n    ')
        .replace(/{/g, '{\n')
        .replace(/}/g, '\n}')
        .replace(/{\n+/g, '{\n')
        .replace(/\n+}/g, '\n}');
};

export const filter = ({text, node}) => {
    const regExp = /, +?[a-zA-Z]/g;
    
    if (node.specifiers.length < 4)
        return false;
    
    return regExp.test(text);
};
