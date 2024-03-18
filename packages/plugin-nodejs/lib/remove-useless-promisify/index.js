'use strict';

module.exports.report = () => `Calling 'promisify' on a function that returns a Promise is likely a mistake`;

module.exports.replace = () => ({
    'promisify(async (__args) => __body)': 'async (__args) => __body',
});
