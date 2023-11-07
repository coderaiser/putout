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
