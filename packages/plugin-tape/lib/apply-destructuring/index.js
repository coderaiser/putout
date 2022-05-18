'use strict';

module.exports.report = () => `Use destructuring when using 'stub()' in 'test()'`;

module.exports.match = () => ({
    'const test = require("supertape")': (vars, path) => path.scope.bindings.stub,
});

module.exports.replace = () => ({
    'const test = require("supertape")': (vars, path) => {
        path.scope.bindings.stub.path.remove();
        return 'const {test, stub} = require("supertape")';
    },
});

