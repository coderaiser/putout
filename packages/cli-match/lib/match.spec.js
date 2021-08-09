import {createMockImport} from 'mock-import';

import {
    stub,
    test,
} from 'supertape';

import {
    READ_ERROR,
    PARSE_ERROR,
    WRITE_ERROR,
    NO_RULES,
} from './codes.js';

const {
    mockImport,
    reImport,
    stopAll,
} = createMockImport(import.meta.url);

const {stringify} = JSON;

test('putout: match: read error', async (t) => {
    const noEntryError = Error('ENOENT');
    const readFile = stub().rejects(noEntryError);
    
    mockImport('fs/promises', {
        readFile,
    });
    
    const {match} = await reImport('./match');
    const code = await match({
        name: '*.md',
        cwd: '/',
    });
    stopAll();
    
    t.equal(code, READ_ERROR);
    t.end();
});

test('putout: match: parse error', async (t) => {
    const readFile = stub().resolves('hello');
    
    mockImport('fs/promises', {
        readFile,
    });
    
    const {match} = await reImport('./match');
    const code = await match({
        name: '*.md',
        cwd: '/',
    });
    stopAll();
    
    t.equal(code, PARSE_ERROR);
    t.end();
});

test('putout: match: no rules', async (t) => {
    const readFile = stub().resolves(stringify({
    }));
    
    mockImport('fs/promises', {
        readFile,
    });
    
    const {match} = await reImport('./match');
    const code = await match({
        name: '*.md',
        cwd: '/',
    });
    stopAll();
    
    t.equal(code, NO_RULES);
    t.end();
});

test('putout: match: write error', async (t) => {
    const writeError = Error('Write error');
    
    const writeFile = stub().rejects(writeError);
    const readFile = stub().resolves(stringify({
        rules: {
            'remove-debugger': 'on',
        },
    }));
    
    mockImport('fs/promises', {
        readFile,
        writeFile,
    });
    
    const {match} = await reImport('./match');
    const code = await match({
        name: '*.md',
        cwd: '/',
    });
    stopAll();
    
    t.equal(code, WRITE_ERROR);
    t.end();
});

test('putout: match: success', async (t) => {
    const writeFile = stub().resolves();
    const readFile = stub().resolves(stringify({
        rules: {
            'remove-debugger': 'on',
        },
    }));
    
    mockImport('fs/promises', {
        readFile,
        writeFile,
    });
    
    const {match} = await reImport('./match');
    await match({
        name: '*.md',
        cwd: '/',
    });
    
    stopAll();
    
    const expected = stringify({
        match: {
            '*.md': {
                'remove-debugger': 'on',
            },
        },
    }, null, 4) + '\n';
    
    t.calledWith(writeFile, ['/.putout.json', expected]);
    t.end();
});

test('putout: match: exist', async (t) => {
    const writeFile = stub().resolves();
    const readFile = stub().resolves(stringify({
        match: {
            '*.js': {
                'remove-unused-variables': 'off',
            },
        },
        rules: {
            'remove-debugger': 'on',
        },
    }));
    
    mockImport('fs/promises', {
        readFile,
        writeFile,
    });
    
    const {match} = await reImport('./match');
    await match({
        name: '*.md',
        cwd: '/',
    });
    
    stopAll();
    
    const expected = stringify({
        match: {
            '*.js': {
                'remove-unused-variables': 'off',
            },
            '*.md': {
                'remove-debugger': 'on',
            },
        },
    }, null, 4) + '\n';
    
    t.calledWith(writeFile, ['/.putout.json', expected]);
    t.end();
});

