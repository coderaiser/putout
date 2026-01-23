import test from 'supertape';
import {__filesystem_name} from '@putout/operator-json';
import {create} from './create.js';

const {stringify} = JSON;

test('putout: processor-filesystem: create', (t) => {
    const {branch} = create({
        cli: false,
        maybeSimple: false,
    });
    
    const source = stringify(['/']);
    const result = branch(source);
    
    const expected = [{
        source: `${__filesystem_name}(["/"]);\n`,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: processor-filesystem: create: maybeSimple', (t) => {
    const {branch} = create({
        cli: false,
        maybeSimple: true,
    });
    
    const source = stringify(['/']);
    const result = branch(source);
    
    const fs = stringify({
        filename: '/',
        type: 'directory',
        files: [],
    }, null, 4);
    
    const expected = [{
        source: `${__filesystem_name}(${fs});\n`,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});
