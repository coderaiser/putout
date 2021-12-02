'use strict';

const {join} = require('path');

const {test, stub} = require('supertape');
const mockRequire = require('mock-require');

const {reRequire, stopAll} = mockRequire;

test('putout: cli: get-options: PUTOUT_CONFIG_FILE', (t) => {
    const {PUTOUT_CONFIG_FILE} = process.env;
    
    process.env.PUTOUT_CONFIG_FILE = './hello-config';
    
    mockRequire('../parse-options', stub().returns({
        from: 'parse-options',
        plugins: [],
    }));
    
    mockRequire(join(process.cwd(), './hello-config'), {
        hello: 'world',
    });
    
    const getOptions = reRequire('./get-options');
    const result = getOptions({});
    
    if (!PUTOUT_CONFIG_FILE)
        delete process.env.PUTOUT_CONFIG_FILE;
    else
        process.env.PUTOUT_CONFIG_FILE = PUTOUT_CONFIG_FILE;
    
    stopAll();
    reRequire('./get-options');
    
    const expected = {
        hello: 'world',
        from: 'parse-options',
        plugins: [],
    };
    
    t.deepEqual(result, expected);
    t.end();
});

