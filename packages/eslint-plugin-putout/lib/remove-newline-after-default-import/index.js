export const category = 'import';
export const report = () => 'Keep opening curly brace on one line with default import';

const regExp = /,\n\s*{/;

export const filter = ({text}) => {
    return regExp.test(text);
};

export const fix = ({text}) => {
    return text.replace(regExp, ', {');
};

export const include = () => [
    'ImportDeclaration',
];
