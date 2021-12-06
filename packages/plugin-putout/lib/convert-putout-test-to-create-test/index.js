'use strict';

module.exports.report = () => `Use 'createTest' instead of 'putoutTest'`;

module.exports.replace = () => ({
    'import putoutTest from "@putout/test"': (vars, path) => {
        path.scope.rename('putoutTest', 'createTest');
        return path;
    },
});

