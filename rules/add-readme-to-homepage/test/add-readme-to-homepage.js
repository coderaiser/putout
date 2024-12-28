import {createTest} from '@putout/test';
import * as setHomepage from '../lib/add-readme-to-homepage.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-readme-to-homepage', setHomepage],
    ],
});

test('rules: add-readme-to-homepage: report', (t) => {
    t.report('homepage', `Add anchor '#readme' to 'homepage' in package.json`);
    t.end();
});

test('rules: add-readme-to-homepage: transform', (t) => {
    t.transform('homepage');
    t.end();
});
