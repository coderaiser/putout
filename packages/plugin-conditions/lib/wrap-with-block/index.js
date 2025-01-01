'use strict';

module.exports.report = () => `Lexical declaration cannot appear in single-statement-context`;

module.exports.match = () => ({
    'const __a = __b': (vars, path) => {
        return path.parentPath.isIfStatement();
    },
});

module.exports.replace = () => ({
    'const __a = __b': '{const __a = __b}',
});
