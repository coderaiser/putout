import {createTest} from '@putout/test/processor';
import montag from 'montag';
import {merge} from '../lib/yaml.js';

const test = createTest(import.meta.url, {
    processors: ['yaml'],
});

test('putout: processor: yaml', async ({process}) => {
    await process('travis.yml', ['travis']);
});

test('putout: processor: yaml: long', async ({process}) => {
    await process('long.yml');
});

test('putout: processor: yaml: actions', async ({noProcess}) => {
    await noProcess('actions.yml');
});

test('putout: processor: yaml: duplicate', async ({comparePlaces}) => {
    await comparePlaces('duplicate.yml', [{
        position: {
            column: 3,
            line: 4,
        },
        message: 'Map keys must be unique',
        rule: 'yaml-parse-error (yaml)',
    }]);
});

test('putout: processor: yaml: no startLine', async ({comparePlaces}) => {
    await comparePlaces('travis.yml', []);
});

test('putout: processor: yaml: duplicate: file content', async ({noProcess}) => {
    await noProcess('duplicate.yml');
});

test('putout: processor: yaml: merge: a couple items in list: not last', (t) => {
    const rawSource = montag`
        __putout_processor_yaml({
            "filename": "/hello",
            "files": []
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
        filename: /hello
        files: []
    ` + '\n';
    
    t.equal(result, expected);
    t.end();
});
