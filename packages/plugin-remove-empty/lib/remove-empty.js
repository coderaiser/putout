'use strict';

module.exports.rules = {
    block: require(`./remove-empty-block`),
    pattern: require('@putout/plugin-remove-empty-pattern'),
    argument: require('./remove-empty-argument'),
    import: require('./remove-empty-import'),
};

