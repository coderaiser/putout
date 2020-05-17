'use strict';

const test = require('supertape');
const {isJS, getJSGlob} = require('./supported-files');

test('putout: supported files isJS: tsx', (t) => {
    const result = isJS('index.tsx');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: isJS: mjs', (t) => {
    const result = isJS('index.mjs');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: isJS: cjs', (t) => {
    const result = isJS('index.cjs');
    
    t.ok(result);
    t.end();
});

test('putout: supported files: getJSGlob: mjs, tsx', (t) => {
    const result = getJSGlob('get-files');
    const expected = 'get-files/**/*.{js,mjs,cjs,jsx,ts,tsx}';
    
    t.equal(result, expected);
    t.end();
});

