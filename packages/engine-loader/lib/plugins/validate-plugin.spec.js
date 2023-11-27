'use strict';

const tryCatch = require('try-catch');
const {test} = require('supertape');
const validatePlugin = require('./validate-plugin');

test('putout: engine-loader: validate-plugin', (t) => {
    const plugin = {
        report: () => {},
        fix: () => {},
        scan: () => {},
    };
    
    const [error] = tryCatch(validatePlugin, {
        plugin,
    });
    
    t.notOk(error);
    t.end();
});
