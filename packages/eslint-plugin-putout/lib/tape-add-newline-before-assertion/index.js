'use strict';

module.exports.category = 'tape';
module.exports.report = () => 'Add newline before assertion';

const regexp = /;\n +?t\..*;\n +?t.end\(\);/;

module.exports.filter = ({text}) => {
    if (!/^test(\.only|\.skip)?\(/.test(text))
        return false;
    
    const assertions = text.match(/\st\..*/g);
    
    if (!assertions)
        return false;
    
    if (assertions.length > 2)
        return false;
    
    return regexp.test(text);
};

module.exports.fix = ({text}) => {
    const [assertion] = text.match(/\st\..*/);
    return text.replace(assertion, `\n${assertion}`);
};

module.exports.include = () => [
    'CallExpression',
];
