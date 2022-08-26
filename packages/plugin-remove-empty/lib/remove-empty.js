'use strict';

const getRule = (a) => ({
    [a]: require(`./${a}`),
});

module.exports.rules = {
    ...getRule('block'),
    ...getRule('pattern'),
    ...getRule('nested-pattern'),
    ...getRule('argument'),
    ...getRule('import'),
    ...getRule('export'),
};

