'use strict';

const stylelint = require('stylelint');
const {cosmiconfig} = require('cosmiconfig');
const {createConfigLoader} = require('./config-loader');

const loadConfig = createConfigLoader({
    cosmiconfig,
});

module.exports.files = [
    '*.css',
];

module.exports.find = async (code) => {
    const config = await loadConfig();
    const {results} = await stylelint.lint({
        code,
        config,
    });
    
    const {warnings} = results[0];
    const places = warnings.map(toPlace);
    
    return places;
};

module.exports.fix = async (code) => {
    const stylelint = require('stylelint');
    const config = await loadConfig();
    const {output} = await stylelint.lint({
        fix: true,
        code,
        config,
    });
    
    return output;
};

function toPlace({line, column, rule, text}) {
    return {
        message: text,
        rule: `${rule} (stylelint)`,
        position: {
            line,
            column,
        },
    };
}

