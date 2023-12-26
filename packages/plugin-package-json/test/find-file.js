import {createTest} from '@putout/test';
import * as packageJson from '../lib/index.js';

const [, findFile] = packageJson.rules['find-file'];

const test = createTest(import.meta.url, {
    printer: 'putout',
    rules: {
        'package-json/find-file': 'on',
    },
    plugins: [
        ['package-json/find-file', findFile],
    ],
});

test('putout: plugin-package-json: findFile: transform', (t) => {
    t.transform('find-file');
    t.end();
});
