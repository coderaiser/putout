'use strict';

module.exports.rules = {
    block: require(`./remove-empty-block`),
    pattern: require('@putout/plugin-remove-empty-pattern'),
    import: require('./remove-empty-import'),
};

