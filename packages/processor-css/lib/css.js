'use strict';

const {cosmiconfig} = require('cosmiconfig');
const stylelint = require('stylelint');
const once = require('once');
const config = require('../stylelintrc');

module.exports.files = [
    '*.css',
];

const loadConfig = once(async () => {
    const explorer = cosmiconfig('stylelint');
    const result = await explorer.search();
    
    return {
        ...config,
        ...result && result.config,
    };
});

module.exports.process = async (code, {fix}) => {
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

