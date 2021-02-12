'use strict';

const test = require('supertape');
const {loadProcessors} = require('..');

test('putout: engine-loader: load processors', (t) => {
    const processorJavascript = require('@putout/processor-javascript');
    
    const list = loadProcessors({
        processors: [
            'javascript',
        ],
    });
    
    const expected = [
        processorJavascript,
    ];
    
    t.deepEqual(list, expected);
    t.end();
});

test('putout: engine-loader: load processors: no processors', (t) => {
    const list = loadProcessors({});
    
    t.deepEqual(list, []);
    t.end();
});

test('putout: engine-loader: load processors: function', (t) => {
    const throwProcessor = {
        preProcess() {
            throw'Preprocess error';
        },
    };
    
    const list = loadProcessors({
        processors: [
            ['throwProcessor', throwProcessor],
        ],
    });
    
    const expected = [
        throwProcessor,
    ];
    
    t.deepEqual(list, expected);
    t.end();
});

