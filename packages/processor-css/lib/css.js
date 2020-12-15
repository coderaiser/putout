'use strict';

const stylelint = require('stylelint');
const config = require('../stylelintrc');

const configBasedir = process.cwd();

module.exports.files = [
    '*.css',
];

module.exports.process = async (code, {fix}) => {
    const {output, results} = await stylelint.lint({
        fix,
        code,
        config,
        configBasedir,
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

