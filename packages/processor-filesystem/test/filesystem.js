import {test} from 'supertape';
import montag from 'montag';
import {
    merge,
    branch,
} from '../lib/filesystem.js';

const {stringify} = JSON;

test('putout: processor: filesystem: merge', (t) => {
    const rawSource = montag`
        __putout_processor_filesystem({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const list = [rawSource];
    const result = merge(rawSource, list);
    
    const expected = stringify({
        filename: '/',
        files: [],
    }, null, 4) + '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: processor: filesystem: branch', (t) => {
    const rawSource = stringify({
        filename: '/',
        files: [],
    }, null, 4);
    
    const result = branch(rawSource);
    const source = montag`
        __putout_processor_filesystem({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const expected = [{
        startLine: 0,
        source,
    }];
    
    t.deepEqual(result, expected);
    t.end();
});

test('putout: processor: filesystem: merge: a couple items in list', (t) => {
    const jsonSource = montag`
        __putout_processor_json({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const rawSource = montag`
        __putout_processor_filesystem({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const list = [jsonSource, rawSource];
    const result = merge(rawSource, list);
    
    const expected = stringify({
        filename: '/',
        files: [],
    }, null, 4) + '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: processor: filesystem: merge: a couple items in list: not last', (t) => {
    const jsonSource = montag`
        __putout_processor_json({
            "filename": "/",
            "files": []
        });\n
    `;
    const rawSource = montag`
        __putout_processor_filesystem({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const list = [jsonSource, rawSource, jsonSource];
    const result = merge(rawSource, list);
    
    const expected = stringify({
        filename: '/',
        files: [],
    }, null, 4) + '\n';
    
    t.equal(result, expected);
    t.end();
});
