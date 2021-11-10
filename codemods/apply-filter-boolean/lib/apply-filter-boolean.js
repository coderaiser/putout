'use strict';

module.exports.report = () => 'Use Boolean constructor';

module.exports.replace = () => ({
    '__a.filter(__b => __b)': '__a.filter(Boolean)',
    '__a.find(__b => __b)': '__a.find(Boolean)',
});

