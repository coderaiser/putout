'use strict';

module.exports.report = () => 'Unexpected "console" call';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.filter = ({scope}) => !scope.hasBinding('console');

module.exports.include = () => [
    `console.log()`,
    `console.error()`,
    `console.warn()`,
    `console.time()`,
    `console.timeEnd()`,
    
    `console["log"]()`,
    `console["error"]()`,
    `console["warn"]()`,
    `console["time"]()`,
    `console["timeEnd"]()`,
];

