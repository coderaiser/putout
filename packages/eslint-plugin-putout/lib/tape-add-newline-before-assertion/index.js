'use strict';

module.exports.category = 'tape';
module.exports.report = () => 'Add new line before assertion';

const regexp = /;\n +?t\..*;\n +?t.end\(\);/;

module.exports.filter = ({text}) => {
    if (!/^test\(/.test(text))
        return false;
    
    const assertions = text.match(/t\..*/g);
    
    if (!assertions)
        return false;
    
    if (assertions.length > 2)
        return false;
    
    return regexp.test(text);
};

module.exports.fix = ({text}) => {
    const [assertion] = text.match(/t\..*/);
    return text.replace(assertion, `\n${assertion}`);
};

module.exports.include = () => [
    'CallExpression',
];
