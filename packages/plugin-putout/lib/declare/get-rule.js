'use strict';

const getRule = (name, options = 'on') => ({
    [name]: [options, require(`./${name}`)],
});

module.exports.getRule = getRule;
