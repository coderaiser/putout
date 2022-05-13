'use strict';

const deepmerge = require('deepmerge');

module.exports.files = [
    '*.css',
];

const loadConfig = async () => {
    const {cosmiconfig} = require('cosmiconfig');
    const config = require('../stylelintrc');
    
    const explorer = cosmiconfig('stylelint');
    const result = await explorer.search();
    const newConfig = result?.config;
    
    if (!newConfig)
        return config;
    
    return deepmerge.all([
        config,
        newConfig,
    ]);
};

module.exports.find = async (code) => {
    const stylelint = require('stylelint');
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

