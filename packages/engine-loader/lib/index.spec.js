'use strict';

const test = require('supertape');
const {loadPlugins} = require('.');

test('engine-loader: load-plugins', (t) => {
    const result = loadPlugins({
        pluginNames: ['remove-unused-variables'],
    });
    
    t.equal(result.length, 1);
    t.end();
});
