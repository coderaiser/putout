export const category = 'array';
export const report = () => 'Remove newline after last element';

const regExp = /\n\n(\s+)?]/;

export const filter = ({text}) => {
    return regExp.test(text);
};

export const fix = ({text}) => {
    return text.replace(regExp, '\n]');
};

export const include = () => [
    'ArrayExpression',
];
