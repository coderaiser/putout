'use strict';

module.exports.getRule = (name, options = 'on') => ({
    [name]: [options, require(`./${name}`)],
});
