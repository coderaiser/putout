'use strict';

const {once} = require('node:events');
const montag = require('montag');
const {test} = require('supertape');
const putout = require('putout');

const {runPlugins} = require('./index');
const {createProgress} = require('./progress');

test('putout: runner: progress: start', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsIndex, pluginsCount}]] = await Promise.all([
        once(progress, 'start'),
        putout(source, {
            progress,
            rules: {
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 2);
    t.end();
});

test('putout: runner: progress: end', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsIndex, pluginsCount}]] = await Promise.all([
        once(progress, 'end'),
        putout(source, {
            progress,
            rules: {
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 2);
    t.end();
});

test('putout: runner: progress: push', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsIndex, pluginsCount}]] = await Promise.all([
        once(progress, 'push'),
        putout(source, {
            runPlugins,
            progress,
            rules: {
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 2);
    t.end();
});
