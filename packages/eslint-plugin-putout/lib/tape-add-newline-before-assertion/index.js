export const category = 'tape';
export const report = () => 'Add newline before assertion';

const regexp = /;\n +?t\..*;\n +?t.end\(\);/;

export const filter = ({text}) => {
    if (!/^test(\.only|\.skip)?\(/.test(text))
        return false;
    
    const assertions = text.match(/\st\..*/g);
    
    if (!assertions)
        return false;
    
    if (assertions.length > 2)
        return false;
    
    return regexp.test(text);
};

export const fix = ({text}) => {
    const [assertion] = text.match(/\st\..*/);
    return text.replace(assertion, `\n${assertion}`);
};

export const include = () => [
    'CallExpression',
];
