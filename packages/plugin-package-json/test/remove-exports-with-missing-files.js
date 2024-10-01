import {createTest} from '@putout/test';
import * as packageJson from '../lib/index.js';

const [, findFile] = packageJson.rules['remove-exports-with-missing-files'];

const test = createTest(import.meta.url, {
    printer: 'putout',
    rules: {
        'package-json/remove-exports-with-missing-files': 'on',
    },
    plugins: [
        ['package-json/remove-exports-with-missing-files', findFile],
    ],
});

test('putout: plugin-package-json: remove-exports-with-missing-files: transform', (t) => {
    t.transform('remove-exports-with-missing-files');
    t.end();
});
