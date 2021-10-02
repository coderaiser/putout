'use strict';

const {dirname} = require('path');
const putout = require('putout');

module.exports.category = 'evaluate';
module.exports.report = () => 'Evaluate expression';
module.exports.include = () => ['ImportDeclaration'];

module.exports.filter = ({node}) => {
    const {value} = node.source;
    
    if (!/^__putout_evaluate:/.test(value))
        return false;
    
    return true;
};

module.exports.fix = ({text, node, filename}) => {
    const {value} = node.source;
    
    const result = evaluate({
        value,
        filename,
    });
    
    return text.replace(value, result);
};

function evaluate({value, filename}) {
    value = value.replace(/__putout_evaluate:\s?/, 'return ');
    const {code} = putout(value, {
        rules: {
            'convert-esm-to-commonjs': 'on',
        },
        plugins: [
            'declare-undefined-variables',
            'convert-esm-to-commonjs',
        ],
    });
    
    const fn = Function('__filename', '__dirname', 'require', code);
    return fn(filename, dirname(__filename), require);
}
