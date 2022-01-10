'use strict';

module.exports.rules = {
    block: require(`./block`),
    pattern: require('@putout/plugin-remove-empty-pattern'),
    argument: require('./argument'),
    import: require('./import'),
};

