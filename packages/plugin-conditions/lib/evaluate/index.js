'use strict';

module.exports.report = () => 'Avoid useless conditions';

module.exports.match = () => ({
    'if (__a) __b': (vars, path) => {
        const testPath = path.get('test');
        const {confident} = testPath.evaluate();
        
        return confident;
    },
});

module.exports.replace = () => ({
    'if (__a) __b': (vars, path) => {
        const testPath = path.get('test');
        const {value} = testPath.evaluate();
        
        if (!value)
            return '';
        
        return '__b';
    },
});
