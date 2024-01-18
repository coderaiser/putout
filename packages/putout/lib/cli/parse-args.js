'use strict';

const yargsParser = require('yargs-parser');
const {isArray} = Array;
const maybeFirst = (a) => isArray(a) ? a.pop() : a;
const maybeArray = (a) => isArray(a) ? a : a.split(',');

const argvConfig = {
    configuration: {
        'strip-aliased': true,
        'strip-dashed': true,
    },
    coerce: {
        format: maybeFirst,
        plugins: maybeArray,
    },
    boolean: [
        'ci',
        'cache',
        'version',
        'help',
        'fix',
        'fresh',
        'raw',
        'worker',
        'enable-all',
        'disable-all',
        'flow',
        'config',
        'staged',
        'interactive',
    ],
    number: ['fix-count'],
    string: [
        'format',
        'disable',
        'enable',
        'rulesdir',
        'transform',
        'plugins',
        'match',
    ],
    alias: {
        version: 'v',
        help: 'h',
        format: 'f',
        staged: 's',
        transform: 't',
        interactive: 'i',
    },
    default: {
        ci: true,
        fix: false,
        fixCount: 10,
        config: true,
        cache: true,
        fresh: false,
        enable: '',
        disable: '',
        disableAll: false,
        enableAll: false,
        worker: true,
        plugins: [],
    },
};

module.exports.argvConfig = argvConfig;
module.exports.parseArgs = (argv) => yargsParser(argv, argvConfig);
