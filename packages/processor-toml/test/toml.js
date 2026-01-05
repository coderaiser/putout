import {createTest} from '@putout/test/processor';
import montag from 'montag';
import {merge} from '../lib/toml.js';

const test = createTest(import.meta.url, {
    processors: ['toml'],
});

test('putout: processor: toml', async ({noProcess}) => {
    await noProcess('bunfig.toml');
});

test('putout: processor: toml: no places', async ({comparePlaces}) => {
    await comparePlaces('bunfig.toml', []);
});

test('putout: processor: toml: duplicate', async ({comparePlaces}) => {
    await comparePlaces('duplicate.toml', [{
        position: {
            column: 2,
            line: 4,
        },
        message: 'Invalid TOML document: trying to redefine an already defined table or value',
        rule: 'toml-parse-error (toml)',
    }]);
});

test('putout: processor: toml: merge: a couple items in list: not last', (t) => {
    const rawSource = montag`
        __putout_processor_toml({
            "hello": {
                "world": "hello"
            }
        });\n
    `;
    
    const filesystem = montag`
        __putout_processor_filesystem({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const list = [
        filesystem,
        rawSource,
        filesystem,
    ];
    
    const result = merge(rawSource, list);
    
    const expected = montag`
        [hello]
        world = "hello"
    ` + '\n';
    
    t.equal(result, expected);
    t.end();
});
