'use strict';

const test = require('supertape');

const {loadProcessorsAsync} = require('..');

test('putout: engine-loader: load processors', async (t) => {
    const processorJavascript = await import('@putout/processor-javascript');
    
    const list = await loadProcessorsAsync({
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

test('putout: engine-loader: load processors: no processors', async (t) => {
    const list = await loadProcessorsAsync({});
    
    t.deepEqual(list, []);
    t.end();
});

test('putout: engine-loader: load processors: function', async (t) => {
    const throwProcessor = {
        preProcess() {
            throw'Preprocess error';
        },
    };
    
    const list = await loadProcessorsAsync({
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

test('putout: engine-loader: load processors: off', async (t) => {
    const list = await loadProcessorsAsync({
        processors: [
            ['markdown', 'off'],
        ],
    });
    
    const expected = [
    ];
    
    t.deepEqual(list, expected);
    t.end();
});

test('putout: engine-loader: load processors: on', async (t) => {
    const markdown = await import('@putout/processor-markdown');
    const list = await loadProcessorsAsync({
        processors: [
            ['markdown', 'on'],
        ],
    });
    
    const expected = [
        markdown,
    ];
    
    t.deepEqual(list, expected);
    t.end();
});

