'use strict';

const Clean = require('clean-css');

module.exports.minify = (data, config) => {
    const {styles} = new Clean(config).minify(data);
    return styles;
};
