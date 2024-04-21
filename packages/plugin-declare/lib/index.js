'use strict';

const object = require('./object');
const wrap = require('./wrap');
const freshImport = require('./fresh-import');
const fixtures = require('./fixtures');

module.exports.declare = () => ({
    ...object,
    ...wrap,
    ...freshImport,
    ...fixtures,
    parse: 'const {parse} = JSON',
    stringify: 'const {stringify} = JSON',
    
    noop: 'const noop = () => {}',
    
    once: `import once from 'once'`,
    putout: `import putout from 'putout'`,
    eslint: `import eslint from 'putout/eslint'`,
    currify: `import currify from 'currify'`,
    wraptile: `import wraptile from 'wraptile'`,
    fullstore: `import fullstore from 'fullstore'`,
    pipe: `import pipe from 'pipe-io'`,
    pullout: `import pullout from 'pullout'`,
    chalk: `import chalk from 'chalk'`,
    table: `import table from 'table'`,
    wait: `import wait from '@iocmd/wait'`,
    
    createSimport: `import {createSimport} from 'simport'`,
    simport: {
        esm: `const simport = createSimport(import.meta.url)`,
        commonjs: `const simport = createSimport(__filename)`,
    },
});
