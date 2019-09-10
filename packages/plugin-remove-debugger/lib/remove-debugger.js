'use strict';

module.exports.report = () => 'Unexpected "debugger" statement';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.include = [
    'debugger',
];

