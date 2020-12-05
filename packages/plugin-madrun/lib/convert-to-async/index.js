'use strict';

module.exports.report = () => 'Async functions should be used';

module.exports.exclude = () => [
    'await run(__args)',
    '() => run(__args)',
];

module.exports.replace = () => ({
    'run(__args)': (vars, path) => {
        path.scope.block.async = true;
        return 'await run(__args)';
    },
});

