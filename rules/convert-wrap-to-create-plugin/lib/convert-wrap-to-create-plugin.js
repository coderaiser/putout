'use strict';

module.exports.report = () => `Use 'createPlugin()' instead of 'wrap()'`;

module.exports.replace = () => ({
    'const wrap = require("../wrap")': (vars, path) => {
        path.scope.rename('wrap', 'createPlugin');
        return 'const {createPlugin} = require("@putout/eslint/create-plugin")';
    },
});

