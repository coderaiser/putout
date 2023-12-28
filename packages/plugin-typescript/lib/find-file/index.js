'use strict';

const {operator} = require('putout');
const typescript = require('../typescript');

const {matchFiles} = operator;
const plugin = {
    rules: typescript,
};

const {
    scan,
    fix,
    report,
} = matchFiles({
    '*.ts': plugin,
});

module.exports = {
    scan,
    fix,
    report,
};
