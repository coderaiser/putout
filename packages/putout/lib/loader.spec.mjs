import {join} from 'path';

import {test} from 'supertape';

import {createCommons} from 'simport';

import {transformSource} from './loader.mjs';

const {__dirname} = createCommons(import.meta.url);

test('putout: loader: transformSource', (t) => {
    const context = {
        url: `file://hello.js`,
    };
    
    const code = 'const a = 5;';
    const {source} = transformSource(code, context);
    const expected = `'use strict';`;
    
    t.equal(source, expected);
    t.end();
});

test('putout: loader: transformSource: ignore: no mock', (t) => {
    const name = join(__dirname, '../test/fixture/debugger.js');
    const context = {
        url: `file://${name}`,
    };
    
    const code = 'const a = 5;';
    const {source} = transformSource(code, context);
    
    t.equal(source, code);
    t.end();
});

