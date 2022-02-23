'use strict';

const object = require('./object');
const isType = require('./is-type');
const maybe = require('./maybe');
const wrap = require('./wrap');
const freshImport = require('./fresh-import');
const fixtures = require('./fixtures');

module.exports = {
    ...object,
    ...isType,
    ...maybe,
    ...wrap,
    ...freshImport,
    ...fixtures,
    
    isArray: 'const {isArray} = Array',
    
    parse: 'const {parse} = JSON',
    stringify: 'const {stringify} = JSON',
    
    noop: 'const noop = () => {}',
    
    montag: `import montag from 'montag'`,
    once: `import once from 'once'`,
    putout: `import putout from 'putout'`,
    eslint: `import eslint from 'putout/eslint'`,
    currify: `import currify from 'currify'`,
    wraptile: `import wraptile from 'wraptile'`,
    pipe: `import pipe from 'pipe-io'`,
    pullout: `import pullout from 'pullout'`,
    chalk: `import chalk from 'chalk'`,
    table: `import table from 'table'`,
    
    createSimport: `import {createSimport} from 'simport'`,
    simport: {
        esm: `const simport = createSimport(import.meta.url)`,
        commonjs: `const simport = createSimport(__filename)`,
    },
};
