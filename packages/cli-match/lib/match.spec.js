import {
    stub,
    test,
} from 'supertape';

import {
    NO_PATTERN,
    READ_ERROR,
    PARSE_ERROR,
    WRITE_ERROR,
    NO_RULES,
} from './codes.js';

import {match} from './match.js';

const {stringify} = JSON;

test('putout: match: pattern', async (t) => {
    const code = await match({
        cwd: '/',
    });
    
    t.equal(code, NO_PATTERN);
    t.end();
});

test('putout: match: read error: no pass readFile', async (t) => {
    const code = await match({
        pattern: '*.md',
        cwd: '/',
    });
    
    t.equal(code, READ_ERROR);
    t.end();
});

test('putout: match: read error', async (t) => {
    const noEntryError = Error('ENOENT');
    const readFile = stub().rejects(noEntryError);
    
    const code = await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
    });
    
    t.equal(code, READ_ERROR);
    t.end();
});

test('putout: match: parse error', async (t) => {
    const readFile = stub().resolves('hello');
    
    const code = await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
    });
    
    t.equal(code, PARSE_ERROR);
    t.end();
});

test('putout: match: no rules', async (t) => {
    const readFile = stub().resolves(stringify({
    }));
    
    const code = await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
    });
    
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
    
    const code = await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
        writeFile,
    });
    
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
    
    await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
        writeFile,
    });
    
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
    
    await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
        writeFile,
    });
    
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

test('putout: match: pass readFile and writeFile', async (t) => {
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
    
    await match({
        pattern: '*.md',
        cwd: '/',
        readFile,
        writeFile,
    });
    
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

