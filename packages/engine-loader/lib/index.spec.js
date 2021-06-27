'use strict';

const test = require('supertape');
const mockRequire = require('mock-require');
const {reRequire, stopAll} = mockRequire;

test('engine-loader: load-plugins', (t) => {
    mockRequire('module', {
        _findPath: () => {},
        plugins: {
            'remove-unused-variables': require('@putout/plugin-remove-unused-variables'),
        },
    });
    
    const {loadPlugins} = reRequire('.');
    const result = loadPlugins({
        pluginNames: [
            'remove-unused-variables',
        ],
    });
    
    stopAll();
    
    t.equal(result.length, 1);
    t.end();
});

