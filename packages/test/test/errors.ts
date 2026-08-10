import {createTest} from '../lib/test.js';

// THROWS Expected 2-3 arguments, but got 1
createTest('fixture');

const test = createTest(import.meta.url, {
    plugins: [],
});

test('hello', (t) => {
    // THROWS Property 'hello' does not exist on type 'PutoutTest'.
    t.hello();
    t.end();
});

// THROWS Property 'extend' does not exist on type 'PutoutTestFunction'.
test.extend();
