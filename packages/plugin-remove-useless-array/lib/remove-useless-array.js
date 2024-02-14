'use strict';

module.exports.report = () => `Avoid array inside property accessors`;

module.exports.replace = () => ({
    '__a[[__b]]': '__a[__b]',
});

