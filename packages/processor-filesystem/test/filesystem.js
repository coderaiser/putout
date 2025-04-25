import {readFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {test} from 'supertape';
import montag from 'montag';
import {fromJS, __filesystem} from '@putout/operator-json';
import filesystem from '@putout/operator-filesystem';
import {merge, branch} from '../lib/filesystem.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readFixtureJSON = (a) => readFileSync(join(__dirname, 'fixture', `${a}.json`), 'utf8');
const readFixtureJS = (a) => readFileSync(join(__dirname, 'fixture', `${a}.js`), 'utf8');

const {stringify, parse} = JSON;

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
    filesystem.deinit();
    
    const source = montag`
        __putout_processor_filesystem({
            "filename": "/",
            "files": []
        });\n
    `;
    
    const expected = [{
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
    
    const list = [
        jsonSource,
        rawSource,
        jsonSource,
    ];
    
    const result = merge(rawSource, list);
    
    const expected = stringify({
        filename: '/',
        files: [],
    }, null, 4) + '\n';
    
    t.equal(result, expected);
    t.end();
});

test('putout: processor: filesystem: branch: big', (t) => {
    const rawSource = readFixtureJSON('big');
    const expected = parse(fromJS(
        readFixtureJS('big-fix'),
        __filesystem,
    ));
    
    const [{source}] = branch(rawSource);
    
    filesystem.deinit();
    
    const result = parse(fromJS(
        source,
        __filesystem,
    ));
    
    t.deepEqual(result, expected);
    t.end();
});
