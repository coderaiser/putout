'use strict';

const once = require('once');
const deepmerge = require('deepmerge');

module.exports.files = [
    '*.css',
];

const loadConfig = once(async () => {
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
});

module.exports.process = async (code, {fix}) => {
    const stylelint = require('stylelint');
    const config = await loadConfig();
    const {output, results} = await stylelint.lint({
        fix,
        code,
        config,
    });
    
    const {warnings} = results[0];
    
    return [
        output,
        warnings.map(toPlace),
    ];
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

