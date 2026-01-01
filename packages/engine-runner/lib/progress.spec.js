import {once} from 'node:events';
import montag from 'montag';
import {test} from 'supertape';
import putout from 'putout';
import {runPlugins} from './index.js';
import {createProgress} from './progress.js';

test('putout: runner: progress: start', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsCount}]] = await Promise.all([
        once(progress, 'start'),
        putout(source, {
            progress,
            rules: {
                'filesystem': 'off',
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 1);
    t.end();
});

test('putout: runner: progress: end', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsCount}]] = await Promise.all([
        once(progress, 'end'),
        putout(source, {
            progress,
            rules: {
                'filesystem': 'off',
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 1);
    t.end();
});

test('putout: runner: progress: push', async (t) => {
    const progress = createProgress();
    const source = montag`
        __putout_processor_filesystem([
            '/coverage/'
        ]);
    `;
    
    const [[{pluginsCount}]] = await Promise.all([
        once(progress, 'push'),
        putout(source, {
            runPlugins,
            progress,
            rules: {
                'filesystem': 'off',
                'filesystem/remove-files': ['on', {
                    names: ['coverage'],
                }],
            },
            plugins: ['filesystem'],
        }),
    ]);
    
    t.equal(pluginsCount, 1);
    t.end();
});
