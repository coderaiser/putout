'use strict';

module.exports.report = () => 'Use addArgs instead of addArgument';

module.exports.replace = () => ({
    'addArgument(__args)': (vars, path) => {
        path.scope.rename('addArgument', 'addArgs');
        return path;
    },
});

