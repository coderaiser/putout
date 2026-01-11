export const category = 'import';
export const report = () => 'Remove newline after last specifier';

const regExp = /\n\n(\s+)?}/;

export const filter = ({text}) => {
    return regExp.test(text);
};

export const fix = ({text}) => {
    return text.replace(regExp, '\n}');
};

export const include = () => [
    'ImportDeclaration',
    'ObjectExpression',
];
