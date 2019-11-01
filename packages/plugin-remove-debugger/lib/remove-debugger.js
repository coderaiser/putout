'use strict';

module.exports.report = () => 'Unexpected "debugger" statement';

module.exports.replace = () => ({
    debugger: '',
});

