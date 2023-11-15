import {createTest} from '@putout/test/processor';
import montag from 'montag';
import {merge} from '../lib/json.js';

const {stringify} = JSON;

const test = createTest(import.meta.url, {
    extension: 'json',
    processors: ['json'],
    plugins: ['eslint'],
});

test('putout: processor: json: eslintrc', async ({process}) => {
    await process('eslintrc');
});

test('putout: processor: json: package', async ({process}) => {
    await process('package', ['package-json']);
});

test('putout: processor: json : merge: a couple items in list: not last', (t) => {
    const rawSource = montag`
        __putout_processor_json({
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
    
    const expected = stringify({
        filename: '/hello',
        files: [],
    }, null, 4) + '\n';
    
    t.equal(result, expected);
    t.end();
});
