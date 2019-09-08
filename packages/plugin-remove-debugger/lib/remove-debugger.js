'use strict';

module.exports.report = () => 'Unexpected "debugger" statement';

module.exports.fix = (path) => {
    path.remove();
};

module.exports.traverse = ({push}) => {
    return {
        'debugger'(path) {
            push(path);
        },
    };
};

