'use strict';

module.exports.report = () => 'Unexpected "console" call';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.filter = ({scope}) => !scope.hasBinding('console');

module.exports.include = () => [
    `console.log(__args)`,
    `console.error(__args)`,
    `console.warn(__args)`,
    `console.time(__args)`,
    `console.timeEnd(__args)`,
    'console.dir(__args)',
    
    `console["log"](__args)`,
    `console["error"](__args)`,
    `console["warn"](__args)`,
    `console["time"](__args)`,
    `console["timeEnd"](__args)`,
    'console["dir"](__args)',
];

