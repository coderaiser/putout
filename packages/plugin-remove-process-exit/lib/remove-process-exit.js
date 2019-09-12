'use strict';

module.exports.report = () => '"process.exit" should not be used';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.include = () => [
    `process.exit()`,
    `process['exit']()`,
];

