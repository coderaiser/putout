'use strict';

module.exports.report = () => 'Apply "filter(Boolean)"';

module.exports.replace = () => ({
    '__a.filter(__b => __b)': '__a.filter(Boolean)',
});

