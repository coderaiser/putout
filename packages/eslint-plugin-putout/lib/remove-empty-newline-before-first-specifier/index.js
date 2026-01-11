export const category = 'import';
export const report = () => 'Remove newline before first specifier';

const regExp = /{\n(\s+)?\n/;

export const filter = ({text}) => {
    return regExp.test(text);
};

export const fix = ({text}) => {
    return text.replace(regExp, '{\n');
};

export const include = () => [
    'ImportDeclaration',
    'ObjectExpression',
];
