'use strict';

module.exports.report = () => '"throw" should be used without body';

module.exports.replace = () => ({
    '(__args) => {throw __a}': '(__args) => throw __a',
});

