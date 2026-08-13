import {createTest} from '@putout/test/processor';
import {montag} from 'montag';
import {merge} from '../lib/yaml.js';

const test = createTest(import.meta.url, {
    extension: 'yml',
    processors: ['yaml'],
});

test('putout: processor: yaml', async ({process}) => {
    await process('travis', ['travis']);
});

test('putout: processor: yaml: long', async ({noProcess}) => {
    await noProcess('long');
});

test('putout: processor: yaml: actions', async ({noProcess}) => {
    await noProcess('actions');
});

test('putout: processor: yaml: duplicate', async ({comparePlaces}) => {
    await comparePlaces('duplicate', [{
        position: {
            column: 3,
            line: 4,
        },
        message: 'Map keys must be unique',
        rule: 'yaml-parse-error (yaml)',
    }]);
});

test('putout: processor: yaml: travis', async ({comparePlaces}) => {
    await comparePlaces('travis', []);
});

test('putout: processor: yaml: duplicate: file content', async ({noProcess}) => {
    await noProcess('duplicate');
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
    ` +
        '\n';
    
    t.equal(result, expected);
    t.end();
});
