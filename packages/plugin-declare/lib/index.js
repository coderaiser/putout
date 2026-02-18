import object from './object.json' with {
    type: 'json',
};
import string from './string.json' with {
    type: 'json',
};
import wrap from './wrap.js';
import freshImport from './fresh-import.js';
import fixtures from './fixtures.json' with {
    type: 'json',
};
import set from './set.json' with {
    type: 'json',
};

export const declare = () => ({
    ...object,
    ...string,
    ...wrap,
    ...freshImport,
    ...fixtures,
    ...set,
    parse: 'const {parse} = JSON',
    stringify: 'const {stringify} = JSON',
    
    noop: 'const noop = () => {}',
    
    once: `import once from 'once'`,
    jessy: `import {jessy} from 'jessy'`,
    nessy: `import {nessy} from 'nessy'`,
    putout: `import {putout} from 'putout'`,
    eslint: `import {eslint} from 'putout/eslint'`,
    currify: `import currify from 'currify'`,
    wraptile: `import wraptile from 'wraptile'`,
    fullstore: `import {fullstore} from 'fullstore'`,
    pipe: `import pipe from 'pipe-io'`,
    pullout: `import pullout from 'pullout'`,
    chalk: `import chalk from 'chalk'`,
    table: `import table from 'table'`,
    wait: `import wait from '@iocmd/wait'`,
});
