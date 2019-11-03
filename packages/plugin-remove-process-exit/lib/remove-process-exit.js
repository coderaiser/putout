'use strict';

module.exports.report = () => '"process.exit" should not be used';

module.exports.replace = () => ({
    'process.exit()':'',
    'process["exit"]()': '',
});

