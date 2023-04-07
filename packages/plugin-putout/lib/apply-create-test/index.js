'use strict';

module.exports.report = () => `Apply 'createTest'`;

module.exports.replace = () => ({
    'require("@putout/test")(__dirname, __a)': `createTest(__dirname, __a)`,
});
